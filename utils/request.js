import axios from 'axios';

const request = async(url, retryCount = 5, interval = 30) => {
  let tryCount = 0;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async() => {
        try {
          const response = await axios.get(url);
          console.log(`${new Date()}: the ${tryCount + 1} times retry request ${url} successfully.`);
          clearInterval(timer);
          resolve(response.data);
        } catch (error) {
          console.error(`${new Date()}: the ${tryCount + 1} times retry request ${url} failed with error: ${error.message}`);
        } finally {
          ++tryCount;
          if (tryCount === retryCount) {
            clearInterval(timer);
            reject(new Error('No response from server, please check your server health.'));
          }
        }
      }, interval * 1000);
    });
  }
}

export default request;
