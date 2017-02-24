import getWebElement from './getWebElement';

export const transformElementConditionFactory = getWebElementImpl =>
    conditionRequiringElement =>
        (elementOrLocator, ...args) =>
            async (driver) => {
                let waitTimeout;
                let conditionArgs = [];

                if (args.length > 0) {
                    waitTimeout = args[args.length - 1];
                    conditionArgs = args.slice(0, args.length - 1);
                }
                const element = await getWebElementImpl(elementOrLocator, driver, waitTimeout);

                return conditionRequiringElement(element, ...conditionArgs);
            };

export default transformElementConditionFactory(getWebElement);
