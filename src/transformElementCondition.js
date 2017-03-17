import { Condition } from 'selenium-webdriver';
import getWebElement from './getWebElement';

export const wrappedConditionFactory = getWebElementImpl =>
    (conditionRequiringElement, elementOrLocator, ...args) =>
        driver =>
            getWebElementImpl(elementOrLocator, driver)
                .then((element) => {
                    const timeout = args.slice(-1)[0];
                    const conditionArgs = args.slice(0, args.length - 1);

                    const condition = conditionRequiringElement(element, ...conditionArgs);

                    return driver.wait(condition, timeout);
                });

export const transformElementConditionFactory = getWebElementImpl =>
    conditionRequiringElement =>
        (elementOrLocator, ...args) =>
            new Condition('', wrappedConditionFactory(getWebElementImpl)(conditionRequiringElement, elementOrLocator, ...args));

export default transformElementConditionFactory(getWebElement);
