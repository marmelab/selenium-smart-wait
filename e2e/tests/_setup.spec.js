import driver from '../chromeWebDriver';
import createServer from '../createServer';

before(async function before() {
    this.server = await createServer(3000);
});

after(async function after() {
    this.server.stop();
    await driver.quit();
});
