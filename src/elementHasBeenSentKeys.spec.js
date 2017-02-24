import expect, { createSpy } from 'expect';
import { checkElementHasBeenSentKeysFactory } from './elementHasBeenSentKeys';

describe('elementHasBeenSentKeys', () => {
    const driver = 'driver';

    const waitTimeout = 10000;

    describe('checkElementHasBeenSentKeys', () => {
        it('gets the webelement', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve()),
                isEnabled: createSpy().andReturn(Promise.resolve()),
                getTagName: createSpy().andReturn(Promise.resolve('input')),
                sendKeys: createSpy().andReturn(Promise.resolve()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementHasBeenSentKeys = checkElementHasBeenSentKeysFactory(getWebElement);

            await checkElementHasBeenSentKeys(element, waitTimeout)(driver);

            expect(getWebElement).toHaveBeenCalledWith(element, driver, waitTimeout);
        });

        it('resolves to true if the call to element.sendKeys succeeds', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve(true)),
                isEnabled: createSpy().andReturn(Promise.resolve(true)),
                getTagName: createSpy().andReturn(Promise.resolve('input')),
                sendKeys: createSpy().andReturn(Promise.resolve()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementHasBeenSentKeys = checkElementHasBeenSentKeysFactory(getWebElement);

            const result = await checkElementHasBeenSentKeys(element, waitTimeout)(driver);

            expect(result).toBe(true);
        });

        it('resolves to false if the call to element.sendKeys fails', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve(true)),
                isEnabled: createSpy().andReturn(Promise.resolve(true)),
                getTagName: createSpy().andReturn(Promise.resolve('input')),
                sendKeys: createSpy().andReturn(Promise.reject()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementHasBeenSentKeys = checkElementHasBeenSentKeysFactory(getWebElement);

            const result = await checkElementHasBeenSentKeys(element, waitTimeout)(driver);

            expect(result).toBe(false);
        });
    });
});
