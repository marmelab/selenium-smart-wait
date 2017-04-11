import expect, { createSpy } from 'expect';
import { By } from 'selenium-webdriver';
import { elementHasBeenFoundFn } from './elementHasBeenFound';

describe('elementHasBeenFound', () => {
    const locatedElement = 'an element';

    const driver = {
        findElement: createSpy().andReturn(Promise.resolve(locatedElement)),
    };

    it('calls findElement with a css locator if given a string', async () => {
        const locator = '.foo';

        await elementHasBeenFoundFn(locator)(driver);

        expect(driver.findElement).toHaveBeenCalledWith(By.css(locator));
    });

    it('waits for the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        await elementHasBeenFoundFn(locator)(driver);

        expect(driver.findElement).toHaveBeenCalledWith(locator);
    });

    it('returns the element with the given locator to be located', async () => {
        const locator = By.css('.foo');

        const result = await elementHasBeenFoundFn(locator)(driver);
        expect(result).toEqual(locatedElement);
    });
});
