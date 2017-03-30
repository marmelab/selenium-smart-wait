import { By, Key } from 'selenium-webdriver';

export const addTodo = async (driver, text = 'new') => {
    const newTodo = await driver.findElement(By.css('#new-todo'));
    await newTodo.sendKeys(text);
    newTodo.sendKeys(Key.ENTER); // do not wait for todo to be validated before returning
};
