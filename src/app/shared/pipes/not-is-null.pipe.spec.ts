import { NotIsNullPipe } from './not-is-null.pipe';

describe('NotIsNullPipe', () => {
  it('create an instance', () => {
    const pipe = new NotIsNullPipe();
    expect(pipe).toBeTruthy();
  });
});
