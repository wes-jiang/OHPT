#imports for posts/gets
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

#imports for ChatGPT
import featureform as ff
from featureform import local
from io import StringIO
import pandas as pd
from sentence_transformers import SentenceTransformer
import openai


classes_supported = ["170"]


def registerPinecone():
    pinecone = ff.register_pinecone(
        name="pinecone",
        project_id="56ea356",
        environment="asia-southeast1-gcp-free",
        api_key="6431441b-75f0-4de2-9619-04af57ab93dc",
    )


    @local.df_transformation(inputs=[chapters])
    def process_chapter_files(dir_df):
        
        chapter_dfs = []
        for i, row in dir_df.iterrows():
            print(row[0])
            
            csv_str = StringIO(row[1])
            r_df = pd.read_csv(csv_str, sep="⌘")
            r_df["filename"] = row[0]
            chapter_dfs.append(r_df)

        return pd.concat(chapter_dfs)

    @local.df_transformation(inputs=[ed_posts])
    def process_edstem_files(ed_df):
        csv_str = StringIO(ed_df.loc[0, "body"])
        r_df = pd.read_csv(csv_str, sep="⌘")
        print(r_df.head())

        return r_df


def hi():
    @local.df_transformation(inputs=[process_chapter_files])
    def excerpt_preprocess_df(chapter_df):
        # adding a unique identifier for every column
        chapter_df["PK"] = chapter_df.apply(lambda row: f"{row['Chapter']}_{row['Page']}", axis=1)
        
        # source column
        chapter_df["Source"] = ["Textbook"] * len(chapter_df)
        
        # more pre-processing - making columns generic across sources
        chapter_df = chapter_df[["PK", "Text", "Source"]]
        return chapter_df

    # entity ID transformation
    @local.df_transformation(inputs=[process_edstem_files])
    def post_preprocess_pf(post_df):    
        # source column
        post_df["Source"] = ["Edstem"] * len(post_df)
        
        # more pre-processing - making columns generic across sources
        post_df = post_df[["PK", "Text", "Source"]]
        return post_df


    # COMBINE TABLES ONCE WE HAVE MADE THEM GENERIC

    @local.df_transformation(inputs=[excerpt_preprocess_df, post_preprocess_pf])
    def combine_dfs2(excerpts_df, posts_df):
        import pandas as pd
        return pd.concat([excerpts_df, posts_df])

    # vectorize each excerpt
    @local.df_transformation(inputs=[combine_dfs2])
    def vectorize_excerpts(chapter_df):

        model = SentenceTransformer("all-MiniLM-L6-v2")
        embeddings = model.encode(chapter_df["Text"].tolist())
        chapter_df["Vector"] = embeddings.tolist()
        
        return chapter_df

    @ff.entity
    class Excerpt:
        excerpt_embeddings = ff.Embedding(
            vectorize_excerpts[["PK", "Vector"]],
            dims=384,
            vector_db=pinecone,
            description="Embeddings from excerpts of chapters",
            variant="v1"
        )
        excerpts = ff.Feature(
            combine_dfs2[["PK", "Text"]],
            type=ff.String,
            description="Excerpts' original text",
            variant="v1"
        )

    client.apply()

    @ff.ondemand_feature(variant="ohpt")
    def relevant_excerpts98(client, params, entity):

        model = SentenceTransformer("all-MiniLM-L6-v2")
        search_vector = model.encode(params["query"])
        res = client.nearest("excerpt_embeddings", "v1", search_vector, k=5)
        return res

    client.apply()

    @ff.ondemand_feature(variant="ohpt")
    def contextualized_prompt97(client, params, entity):
        pks = client.features([("relevant_excerpts98", "ohpt")], {}, params=params)
        print(pks)
        prompt = "Use the following pages from our textbook to answer the following question\n"
        for pk in pks[0]:
            prompt += "```"
            print(client.features([("excerpts", "v1")], {"excerpt": pk}))
            prompt += client.features([("excerpts", "v1")], {"excerpt": pk})[0]
            prompt += "```\n"
        prompt += "Question: "
        prompt += params["query"]
        prompt += "?"
        return prompt
    
    client.apply()


    prompt = client.features([("contextualized_prompt97", "ohpt")], {}, params={"query": message})[0]


    openai.organization = "org-V70xAGNCjfzw012seLYRWNTJ"
    openai.api_key = "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"

    return openai.Completion.create(
            model="text-davinci-003",
            prompt=prompt,
            max_tokens=1000, # The max number of tokens to generate
            temperature=1.0 # A measure of randomness
            )["choices"][0]["text"]


#***********BEFORE TESTING PLEASE START THE SERVER BY RUNNING: python server.py    
app = Flask(__name__)
CORS(app)



@app.route('/process', methods=['POST'])
def process():

    if request.method == 'POST':
        message = request.form.get('data')
        # print(dataProcess(classes_supported[0]))
        return "Hello"

    return 'nothing is happening'
    # Process the message using your Python logic
    

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
