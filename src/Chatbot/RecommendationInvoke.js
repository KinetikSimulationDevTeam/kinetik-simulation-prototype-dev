import axios from 'axios';
import querystring from 'querystring';

export async function fetchQuestionResponse(question) {
    const url = 'http://54.226.206.36:5000/process_user_question';
    const params = querystring.stringify({ question: question });

    try {
        const response = await axios.get(`${url}?${params}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// module.exports = fetchQuestionResponse;
