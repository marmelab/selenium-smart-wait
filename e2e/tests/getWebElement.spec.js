import expect from 'expect';
import { By, Key } from 'selenium-webdriver';

import driver from '../chromeWebDriver';
import getWebElement from '../../src/getWebElement';

const addTodo = async (d, text = 'new') => {
    const newTodo = await d.findElement(By.css('#new-todo'));
    await newTodo.sendKeys(text);
    newTodo.sendKeys(Key.ENTER); // do not wait for todo to be validated before returning
};

describe('e2e', () => {
    describe('getWebElement', () => {
        before(async () => {
            await driver.get('http://localhost:3000');
        });

        it('should return element when given a css selector', async () => {
            const el1 = await getWebElement('#header h1', driver);

            expect(await el1.getText()).toEqual('todos');
        });

        it('should return element when given a locator', async () => {
            const el1 = await getWebElement(By.css('#header h1'), driver);

            expect(await el1.getText()).toEqual('todos');
        });

        it('should reject when no element correspond', async () => {
            const error = await getWebElement(By.css('.not-found'), driver).catch(e => e);

            expect(error.message).toContain('no such element: Unable to locate element: {"method":"css selector","selector":".not-found"}');
        });

        it('should return even element when it appear afterward', async () => {
            await addTodo(driver, 'new todo');
            const newTodo = await getWebElement('.view', driver);
            expect(await newTodo.getText()).toBe('new todo');
        });
    });
});
