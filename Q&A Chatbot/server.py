from flask import Flask, request, jsonify
#***********BEFORE TESTING PLEASE START THE SERVER BY RUNNING: python server.py    
app = Flask(__name__)

@app.route('/process-message', methods=['POST'])
def process_message():
    message = request.json['message']
    
    # Process the message using your Python logic
    response = "This is the response from the Python server."
    
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run()
