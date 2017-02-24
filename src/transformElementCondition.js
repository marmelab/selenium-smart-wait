import getWebElement from './getWebElement';

export const transformElementConditionFactory = getWebElementImpl =>
    conditionRequiringElement =>
        (elementOrLocator, ...args) =>
            async (driver) => {
                const element = await getWebElementImpl(elementOrLocator, driver);

                return conditionRequiringElement(element, ...args);
            };

export default transformElementConditionFactory(getWebElement);
