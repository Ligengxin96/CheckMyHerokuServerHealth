import axios from 'axios';

const request = async(url, retryCount = 16) => {
  try {
    let tryCount = 0;
    return new Promise((resolve) => {
      const timer = setInterval(async() => {
        const response = await axios.get(url);
        console.log(`Request ${url} ${tryCount + 1} times.`);
        if (++tryCount === retryCount) {
          clearInterval(timer);
          throw new Error('No response from server, please check your server health.');
        }
        clearInterval(timer);
        resolve(response.data);
      }, (tryCount + 1)  * 1 * 1000);
    });
  } catch (error) {
    clearInterval(timer);
    throw error;
  }
}

export default request;