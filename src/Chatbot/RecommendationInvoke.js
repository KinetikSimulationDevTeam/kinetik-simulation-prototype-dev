import axios from 'axios';
import querystring from 'querystring';

// fetch the backend recommendation engine result
export async function fetchQuestionResponse(question) {
    // call AWS HTTP gateway to make sure the HTTPS 
    const url = 'https://p5svvptpnf.execute-api.us-east-2.amazonaws.com/get-recommendation-function'
    const params = querystring.stringify({ question: question})

    try {
        const response = await axios.get(`${url}?${params}`);  // make request
        
        // Check response status code 
        if (response.data.statuscode === 200) {  // usual resp
            return response.data.body.message;
        } else if (response.data.statuscode === 400) {  // usually caused by no question provided & recognized
            console.error('Error from API:', response.data.body.error);
            return response.data.body.error;
        } else {  // back-up for unhandled. should not happen
            console.error('Unhandled API error. Please double check question & lambda function to fix this');
            return 'Request failed: Unhandled Exceptions. Please contact developer for a fix.'
        }

    } catch (error) {
        // Handle any exception uncaught
        console.error('Error making the request:', error.message);
        return 'Request failed: Unhandled Exceptions. Please contact developer for a fix.';
    }
}
