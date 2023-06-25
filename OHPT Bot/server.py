#imports for posts/gets
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import openai
import featureform as ff
from featureform import local
import main

#***********BEFORE TESTING PLEASE START THE SERVER BY RUNNING: python server.py    
app = Flask(__name__)
CORS(app)


def query(message):
    global supportedClasses
    # global chapters
    # global edposts
    global client
    #check if class is in supportedClasses:
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




@app.route('/process', methods=['POST'])
def process():

    if request.method == 'POST':
        message = request.form.get('data')
        # print(dataProcess(classes_supported[0]))
        # return main.query(message)
        return query(message)

    return 'nothing is happening'
    # Process the message using your Python logic
    

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
