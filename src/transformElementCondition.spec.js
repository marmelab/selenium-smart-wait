import expect, { createSpy } from 'expect';
import { wrappedConditionFactory } from './transformElementCondition';

describe('transformElementCondition', () => {
    const driver = {
        wait: createSpy().andReturn(Promise.resolve()),
    };

    const element = 'element';
    const getWebElement = createSpy().andReturn(Promise.resolve(element));

    describe('wrappedConditionFactory', () => {
        it('gets the webelement', async () => {
            const transformElementCondition = wrappedConditionFactory(getWebElement);

            await transformElementCondition(() => {}, element)(driver);

            expect(getWebElement).toHaveBeenCalledWith(element, driver);
        });

        it('calls the given condition with the retrieved element', async () => {
            const condition = createSpy();
            const transformElementCondition = wrappedConditionFactory(getWebElement);

            await transformElementCondition(condition, element, 1000)(driver);

            expect(condition).toHaveBeenCalledWith(element);
        });

        it('calls the given condition with the retrieved element and any additional arguments', async () => {
            const condition = createSpy();
            const transformElementCondition = wrappedConditionFactory(getWebElement);

            await transformElementCondition(condition, element, 'foo', 'bar', 1000)(driver);
            expect(condition).toHaveBeenCalledWith(element, 'foo', 'bar');
        });
    });
});
