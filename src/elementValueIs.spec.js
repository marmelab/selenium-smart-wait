import expect, { createSpy } from 'expect';
import { checkElementValueIsFactory } from './elementValueIs';

describe('elementValueIs', () => {
    const driver = 'driver';

    describe('checkElementValueIs', () => {
        it('gets the webelement', async () => {
            const element = {
                getAttribute: createSpy().andReturn(Promise.resolve('')),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementValueIs = checkElementValueIsFactory(getWebElement);

            await checkElementValueIs(element, 'foo')(driver);

            expect(getWebElement).toHaveBeenCalledWith(element, driver);
        });

        it('resolves to true if value matches expected one', async () => {
            const element = {
                getAttribute: createSpy().andReturn(Promise.resolve('foo')),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementValueIs = checkElementValueIsFactory(getWebElement);

            const result = await checkElementValueIs(element, 'foo')(driver);

            expect(result).toBe(true);
        });

        it('resolves to false if value does not match expected one', async () => {
            const element = {
                getAttribute: createSpy().andReturn(Promise.resolve('bar')),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementValueIs = checkElementValueIsFactory(getWebElement);

            const result = await checkElementValueIs(element, 'foo')(driver);

            expect(result).toBe(false);
        });
    });
});
