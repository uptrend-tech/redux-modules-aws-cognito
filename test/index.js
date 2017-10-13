import { selectors } from '../src';

describe('selectors.getInfo', () => {
  it('returns empty obj', () => {
    expect(selectors.info(selectors.initialState)).toEqual({});
  });
});
