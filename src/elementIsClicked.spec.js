import expect, { createSpy } from 'expect';
import { checkElementIsClickedFactory } from './elementIsClicked';

describe('elementIsClicked', () => {
    const driver = 'driver';

    const waitTimeout = 10000;

    describe('checkElementIsClicked', () => {
        it('gets the webelement', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve()),
                isEnabled: createSpy().andReturn(Promise.resolve()),
                click: createSpy().andReturn(Promise.resolve()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementIsClicked = checkElementIsClickedFactory(getWebElement);

            await checkElementIsClicked(element, waitTimeout)(driver);

            expect(getWebElement).toHaveBeenCalledWith(element, driver, waitTimeout);
        });

        it('resolves to true if the call to element.click succeeds', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve(true)),
                isEnabled: createSpy().andReturn(Promise.resolve(true)),
                click: createSpy().andReturn(Promise.resolve()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementIsClicked = checkElementIsClickedFactory(getWebElement);

            const result = await checkElementIsClicked(element, waitTimeout)(driver);

            expect(result).toBe(true);
        });

        it('resolves to false if the call to element.click fails', async () => {
            const element = {
                isDisplayed: createSpy().andReturn(Promise.resolve(true)),
                isEnabled: createSpy().andReturn(Promise.resolve(true)),
                click: createSpy().andReturn(Promise.reject()),
            };
            const getWebElement = createSpy().andReturn(element);
            const checkElementIsClicked = checkElementIsClickedFactory(getWebElement);

            const result = await checkElementIsClicked(element, waitTimeout)(driver);

            expect(result).toBe(false);
        });
    });
});
