import axios from 'axios';

const request = async(url, retryCount = 16) => {
  try {
    let tryCount = 0;
    return new Promise((resolve, reject) => {
      const timer = setInterval(async() => {
        try {
          const response = await axios.get(url);
          console.log(`${new Date()}: the ${tryCount + 1} times request ${url}`);
          if (++tryCount === retryCount) {
            clearInterval(timer);
            reject(new Error('No response from server, please check your server health.'));
          }
          clearInterval(timer);
          resolve(response.data);
        } catch (error) {
          console.log(`${new Date()}: the ${tryCount + 1} times request ${url} failed with error: ${error.message}`);
        }
      }, (tryCount + 1)  * 1 * 1000);
    });
  } catch (error) {
    console.log(`${new Date()}: error occurence, error: ${JSON.stringify(error)}`);
    clearInterval(timer);
    throw error;
  }
}

export default request;
