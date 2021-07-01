import assert from 'assert';

import request from '../utils/request.js'
import oursAlbumServerApi from '../config/oursAlbumServerApi.js';

describe('test ours album api health', function() {
  it('api should return data successful', async function() {
    this.retries(5);
    try {
      for (const api of oursAlbumServerApi) {
        const result = await request(api);
        const resData = result;
        assert.strictEqual(resData.isSuccess, true);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});
