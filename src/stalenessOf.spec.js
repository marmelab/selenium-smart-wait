import expect, { createSpy } from 'expect';

import { checkStalenessOfFactory } from './stalenessOf';

describe('stalenessOf', () => {
    const untilStalenessOf = createSpy().andReturn('until.stalenessOf result');
    const stalenessOf = checkStalenessOfFactory(untilStalenessOf);
    const driver = null;

    it('should return a promise resolving to true if called with no element', async () => {
        expect(await stalenessOf()(driver)).toBe(true);
    });

    it('should return result from untilStalenessOf', async () => {
        expect(await stalenessOf('element')(driver)).toBe('until.stalenessOf result');
        expect(untilStalenessOf).toHaveBeenCalledWith('element');
    });
});
