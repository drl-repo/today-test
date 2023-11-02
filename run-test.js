const { Builder, By, Key, until, Select } = require('selenium-webdriver');
const Chrome = require('selenium-webdriver/chrome');

//initialize
const options = new Chrome.Options();
const driver = new Builder()
		.forBrowser('chrome')
        .setChromeOptions(options.addArguments([
        	//argument -> https://peter.sh/experiments/chromium-command-line-switches/ 
        	'--start-maximized',
        	//'--disable-web-security'
        ]))
        .build();

let WebUI = require('./utils/WebUI');
global.command = require('./command/command');
global.WebUI = new WebUI(driver);

//global keyword
global.driver = driver;
global.By = By;
global.Key = Key;
global.until = until;
global.Select = Select;
global.waitTimeout = 7000;
global.baseUrl = 'https://payment.page'

const testSuiteDir = './test-suite';
const fullTest = require(testSuiteDir+'/full-test');

//call test by order
fullTest();

