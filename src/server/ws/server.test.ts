import { parseUserId } from './server';

describe('Server - ws server - parseUserId()', () => {
    it('should return proper userId', () => {
        const input = '/foo/bar?token=xxx';
        const expected = 'xxx';
        const result = parseUserId(input);
        expect(result).toEqual(expected);
    });

    it('should return undefined for url without token', () => {
        const input = '/foo/bar';
        const result = parseUserId(input);
        expect(result).toBeUndefined();
    });
});