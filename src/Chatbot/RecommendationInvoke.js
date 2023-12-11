import axios from 'axios';
import querystring from 'querystring';

// fetch the backend recommendation engine result
export async function fetchQuestionResponse(question) {
    // url and query, it should be in the format of 'http://IP:PORT/route?question=...'
    const url = 'http://54.226.206.36:5000/process_user_question';
    const params = querystring.stringify({ question: question });

    try {
        const response = await axios.get(`${url}?${params}`);  // make request
        return response.data;  // return the jsonify(result)
    } catch (error) {
        console.error('Error:', error.message);  // handle error msg, like 500 status code
        return null;
    }
}
