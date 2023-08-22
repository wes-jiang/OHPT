import data_extraction
import featureform as ff
from featureform import local
import io
from io import StringIO
import pandas as pd
from sentence_transformers import SentenceTransformer
# import dotenv
import os
import openai

#convert class reader PDF into CSV and edstem posts
def convertClassIntoCSV(className):
    global pdfPath
    global csvPath
    pdfPath = "/" + className + "/data/files/chap"

    csvPath = "/" + className + '/data/edstem'

    data_extraction.convert_pdf_to_csv(pdfPath, csvPath)



#data process
# def data_process(className):
className = '170'
chapters = local.register_directory(
    name="dpv-chapters",
    path=className+"/data/files",
    description="Text from DPV Chapters",
)
ed_posts = local.register_directory(
    name=className+' edstem',
    path=className+'/data/edstem',
    description=className+' Posts from edstem',
)
    # return chapters, ed_posts

def query(message):
    global supportedClasses
    # global chapters
    # global edposts
    global client
    #check if class is in supportedClasses:
    if className in supportedClasses:
        client = ff.Client(local=True)
        # chapters, edposts = data_process(className)
        client.apply()
        prompt = client.features([("contextualized_prompt", "ohpt")], {}, params={"query": message})[0]
        openai.organization = "org-V70xAGNCjfzw012seLYRWNTJ"
        openai.api_key = "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"
        return(openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=1000, # The max number of tokens to generate
            temperature=1.0 # A measure of randomness
        )["choices"][0]["text"])

    else: 
        return('Sorry. Not supported yet. Please check back in the future.')


supportedClasses = ["170"]

#concatenate chapters
@local.df_transformation(inputs=[chapters])
def process_chapter_files(dir_df):
    from io import StringIO
    chapter_dfs = []
    for i, row in dir_df.iterrows():
        csv_str = StringIO(row[1])
        r_df = pd.read_csv(csv_str, sep="⌘")
        r_df["filename"] = row[0]
        chapter_dfs.append(r_df)
    return pd.concat(chapter_dfs)

#concatenate edposts
@local.df_transformation(inputs=[ed_posts])
def process_edstem_files(ed_df):
    from io import StringIO
    csv_str = StringIO(ed_df.loc[0, "body"])
    r_df = pd.read_csv(csv_str, sep="⌘")
    print(r_df.head())

    return r_df

#entity ID transformation for chapters
@local.df_transformation(inputs=[process_chapter_files])
def excerpt_preprocess_df(chapter_df):
    # adding a unique identifier for every column
    chapter_df["PK"] = chapter_df.apply(lambda row: f"{row['Chapter']}_{row['Page']}", axis=1)
    
    # source column
    chapter_df["Source"] = ["Textbook"] * len(chapter_df)
    
    # more pre-processing - making columns generic across sources
    chapter_df = chapter_df[["PK", "Text", "Source"]]
    return chapter_df

# entity ID transformation for posts
@local.df_transformation(inputs=[process_edstem_files])
def post_preprocess_df(post_df):  
    # pk must be string
    print(post_df)
    post_df["PK"] = [str(pk) + "e" for pk in post_df["PK"]]

    # source column
    post_df["Source"] = ["Edstem"] * len(post_df)
    
    # more pre-processing - making columns generic across sources
    post_df = post_df[["PK", "Text", "Source"]]
    return post_df

#combine tables
@local.df_transformation(inputs=[excerpt_preprocess_df, post_preprocess_df])
def combine_dfs(excerpts_df, posts_df):
    return pd.concat([excerpts_df, posts_df])

#vectorize
@local.df_transformation(inputs=[combine_dfs])
def vectorize_excerpts(chapter_df):
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = model.encode(chapter_df["Text"].tolist())
    chapter_df["Vector"] = embeddings.tolist()
    
    return chapter_df

#register pinecone
# def register_pinecone():
    # global pinecone
    # dotenv.load_dotenv(".env")
    # pinecone = ff.register_pinecone(
    #     name="pinecone",
    #     project_id=os.getenv("PINECONE_PROJECT_ID", ""),
    #     environment=os.getenv("PINECONE_ENVIRONMENT", ""),
    #     api_key=os.getenv("PINECONE_API_KEY", ""),
    # )

pinecone = ff.register_pinecone(
    name="pinecone",
    project_id="59c003b",
    environment="northamerica-northeast1-gcp",
    api_key="ac43b8c2-f21e-4c29-bbb2-e8f5880175af",
)

@ff.entity
class Text_String:
    excerpt_embeddings = ff.Embedding(
        vectorize_excerpts[["PK", "Vector"]],
        dims=384,
        vector_db=pinecone,
        description="Embeddings from excerpts of chapters",
        variant="v1"
    )
    excerpts = ff.Feature(
        combine_dfs[["PK", "Text"]],
        type=ff.String,
        description="Excerpts' original text",
        variant="v1"
    )

@ff.ondemand_feature(variant="ohpt")
def relevant_excerpts(client, params, entity):
    from sentence_transformers import SentenceTransformer
    model = SentenceTransformer("all-MiniLM-L6-v2")
    search_vector = model.encode(params["query"])
    # print(search_vector)
    res = client.nearest("excerpt_embeddings", "v1", search_vector, k=5)
    return res

# creates the improved and contextualized prompt
@ff.ondemand_feature(variant="ohpt")
def contextualized_prompt(client, params, entity):
    pks = client.features([("relevant_excerpts", "ohpt")], {}, params=params)
    # print(pks)
    prompt = "Use the following pages from our textbook to answer the following question\n"
    for pk in pks[0]:
        prompt += "```"
        # print(client.features([("excerpts", "v1")], {"excerpt": pk}))
        prompt += client.features([("excerpts", "v1")], {"excerpt": pk})[0]
        prompt += "```\n"
    prompt += "Question: "
    prompt += params["query"]
    prompt += "?"
    return prompt
