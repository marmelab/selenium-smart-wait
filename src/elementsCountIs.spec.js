import expect, { createSpy } from 'expect';
import { checkElementsCountIsFactory } from './elementsCountIs';

describe('elementsCountIs', () => {
    const driver = 'driver';

    describe('checkElementsCountIs', () => {
        it('gets the webelements', async () => {
            const elements = [];
            const getWebElements = createSpy().andReturn(elements);
            const checkElementsCountIs = checkElementsCountIsFactory(getWebElements);

            await checkElementsCountIs(elements, 5)(driver);

            expect(getWebElements).toHaveBeenCalledWith(elements, driver);
        });

        it('resolves to true if count matches expected one', async () => {
            const elements = [{}, {}, {}, {}, {}];
            const getWebElements = createSpy().andReturn(elements);
            const checkElementsCountIs = checkElementsCountIsFactory(getWebElements);

            const result = await checkElementsCountIs(elements, 5)(driver);

            expect(result).toBe(true);
        });

        it('resolves to false if count does not match expected one', async () => {
            const elements = [{}, {}];
            const getWebElements = createSpy().andReturn(elements);
            const checkElementsCountIs = checkElementsCountIsFactory(getWebElements);

            const result = await checkElementsCountIs(elements, 5)(driver);

            expect(result).toBe(false);
        });
    });
});
