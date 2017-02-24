import { until } from 'selenium-webdriver';
import transformElementCondition from './transformElementCondition';

export { default as elementsCountIs } from './elementsCountIs';
export { default as elementHasBeenSentKeys } from './elementHasBeenSentKeys';
export { default as elementIsClicked } from './elementIsClicked';
export { default as elementValueIs } from './elementValueIs';

export const elementIsDisabled = transformElementCondition(until.elementIsDisabled);
export const elementIsEnabled = transformElementCondition(until.elementIsEnabled);
export const elementIsNotSelected = transformElementCondition(until.elementIsNotSelected);
export const elementIsNotVisible = transformElementCondition(until.elementIsNotVisible);
export const elementIsSelected = transformElementCondition(until.elementIsSelected);
export const elementIsVisible = transformElementCondition(until.elementIsVisible);
export const elementTextContains = transformElementCondition(until.elementTextContains);
export const elementTextIs = transformElementCondition(until.elementTextIs);
export const elementTextMatches = transformElementCondition(until.elementTextMatches);
export const stalenessOf = transformElementCondition(until.stalenessOf);
