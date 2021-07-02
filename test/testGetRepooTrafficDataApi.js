import assert from 'assert';

import request from '../utils/request.js'
import repooTrafficDataApi from '../config/getRepoTrafficDataApi.js';

describe('test get repoo traffic data api health', function() {
  it('api should return data successful', async function() {
    try {
      for (const api of repooTrafficDataApi) {
        const result = await request(api);
        assert.strictEqual(result.isSuccess, true);
        assert.strictEqual(result.data.viewsData.length, 1);
        assert.strictEqual(result.data.clonesData.length, 1);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});
