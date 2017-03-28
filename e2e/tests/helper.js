import { By, Key } from 'selenium-webdriver';

export const addTodo = async (d, text = 'new') => {
    const newTodo = await d.findElement(By.css('#new-todo'));
    await newTodo.sendKeys(text);
    newTodo.sendKeys(Key.ENTER); // do not wait for todo to be validated before returning
};
