import expect, { createSpy } from 'expect';
import { transformElementConditionFactory } from './transformElementCondition';

describe('transformElementCondition', () => {
    const driver = 'driver';

    const waitTimeout = 10000;
    const element = 'element';
    const getWebElement = createSpy().andReturn(element);

    describe('transformElementCondition', () => {
        it('gets the webelement', async () => {
            const transformElementCondition = transformElementConditionFactory(getWebElement)(() => {});

            await transformElementCondition(element, waitTimeout)(driver);

            expect(getWebElement).toHaveBeenCalledWith(element, driver, waitTimeout);
        });

        it('calls the given condition with the retrieved element', async () => {
            const condition = createSpy();
            const transformElementCondition = transformElementConditionFactory(getWebElement)(condition);

            await transformElementCondition(element, waitTimeout)(driver);

            expect(condition).toHaveBeenCalledWith(element);
        });

        it('calls the given condition with the retrieved element and any additional arguments', async () => {
            const condition = createSpy();
            const transformElementCondition = transformElementConditionFactory(getWebElement)(condition);

            await transformElementCondition(element, 'foo', 'bar', waitTimeout)(driver);
            expect(condition).toHaveBeenCalledWith(element, 'foo', 'bar');
        });

        it('returns the given condition result', async () => {
            const condition = createSpy().andReturn(Promise.resolve('foo'));
            const transformElementCondition = transformElementConditionFactory(getWebElement)(condition);

            const result = await transformElementCondition(element, waitTimeout)(driver);

            expect(result).toEqual('foo');
        });
    });
});
