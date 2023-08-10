import { describe, it, expect } from 'vitest';
import { Response } from 'node-fetch';
import { handleError } from './Api';
import { getCategories } from './Api';


describe('handleError', () => {
  it('returns JSON data if response is ok', async () => {
    const response = new Response(JSON.stringify({ data: 'test' }), { status: 200 });
    const data = await handleError(response);
    expect(data).toEqual({ data: 'test' });
  });

  it('throws an error if response is not ok', () => {
    const response = new Response(null, { status: 404, statusText: 'Not Found' });
    expect(() => handleError(response)).toThrowError('Not Found');
  });
});
