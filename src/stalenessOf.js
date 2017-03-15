import { Condition, until } from 'selenium-webdriver';

import transformElementCondition from './transformElementCondition';

export const checkStalenessOfFactory = stalenessOfImpl => (element) =>
    async (driver) => {
        if (!element) {
            return Promise.resolve(true);
        }

        return stalenessOfImpl(element);
    };

export const stalenessOfCondition = (element) =>
    new Condition('until element is stale', checkStalenessOfFactory(until.stalenessOf)(element));

export default transformElementCondition(stalenessOfCondition);
