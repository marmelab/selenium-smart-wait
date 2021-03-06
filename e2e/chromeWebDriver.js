import webdriver from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import logging from 'selenium-webdriver/lib/logging';
import path from 'path';

const chromePath = path.join(__dirname, '/../', process.env.SELENIUM_BROWSER_BINARY_PATH);
const service = new chrome.ServiceBuilder(chromePath).build();
const DEFAULT_WAIT_TIMEOUT = 1000;

chrome.setDefaultService(service);

const chromeCapabilities = webdriver.Capabilities.chrome();
if (process.env.DEBUG) {
    const prefs = new logging.Preferences();
    prefs.setLevel(logging.Type.BROWSER, logging.Level.DEBUG);
    chromeCapabilities.setLoggingPrefs(prefs);
}

const chromeOptions = {
    args: ['--test-type', '--start-maximized', '--incognito'],
};

chromeCapabilities.set('chromeOptions', chromeOptions);

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

driver.manage()
    .timeouts()
    .implicitlyWait(DEFAULT_WAIT_TIMEOUT);

export default driver;
