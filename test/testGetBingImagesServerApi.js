import assert from 'assert';

import request from '../utils/request.js'
import getBingImagesServerApi from '../config/getBingImagesServerApi.js';

describe('test get bing images api health', function() {
  it('api should return image info', async function() {
    try {
      for (const api of getBingImagesServerApi) {
        const result = await request(api);
        const imgs = result.data;
        assert.strictEqual(result.isSuccess, true);
        assert.strictEqual(Array.isArray(imgs), true);
        assert.notStrictEqual(imgs, undefined);
        assert.notStrictEqual(imgs, null);
      }
    } catch (error) {
      console.error(JSON.stringify(error));
      assert(false);
    }
  });
});