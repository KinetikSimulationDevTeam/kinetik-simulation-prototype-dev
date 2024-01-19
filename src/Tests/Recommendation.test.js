// Recommendation.test.js

import { expect } from 'chai';
import { fetchQuestionResponse } from '../Chatbot/RecommendationInvoke';
// this test normally takes ~35 seconds to run. Do not terminate the test before it finishes.
describe('fetchData', function() {
    // unit test for fetchQuestionResponse
    // test whether it fetch data successfully and get a string response
    // test whether it handle errors
    // the response time of the function is between 14 - 30 seconds
    // so the timeout is set to 30 seconds  
  this.timeout(30000);
// test whether it fetch data successfully and get a string response
  it('should fetch data successfully', async function() {
    const url = 'tactic: what are the benefits of AI generated deal insights?';
    const result = await fetchQuestionResponse(url);
  
    expect(typeof result).to.equal('string');
  });

  it('should handle errors', async function() {
  //test what if i give it an url instead of a question
  // and that will cause an error
    const url = 'https://api.example.com/invalidendpoint';
    
    try {
      await fetchQuestionResponse(url);
    } catch (error) {
      expect(error).to.be.an('error');
      expect(error.message).to.equal('Data fetching failed');
    }
  });
});