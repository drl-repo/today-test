class WebUI{

	/*
	Due to device spec limitations, i'm not using java or katalon for this test :(
	so i choose JS and create a wrapper to boost code writing
	*/

	async openBrowser(path=''){
		await driver.get(baseUrl+path);
	}

  	async findWebElement(selector){
  		return await driver.wait(until.elementLocated(selector), waitTimeout);
  	}
  	/* find multiple element */
  	/* find element child */

  	async click(selector){
  		await driver.wait(async function(driver) {
				return await driver.findElements(selector).then(async function(elements){
					if(elements.length > 0){
						const element = await elements[0];
						if(await element.isEnabled()){
							await element.click();
							return true;
						}
					}
					return false;
				});
				
		}, waitTimeout)
		.catch(function(Ex){
				throw Error('click() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async xsetText(selector, text){
  		await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			await element.sendKeys(text);
		}).catch(function(Ex){
			throw Error('setText() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async setText(selector, text){
  		await driver.wait(async function(driver) {
				return await driver.findElements(selector).then(async function(elements){
					if(elements.length > 0){
						const element = await elements[0];
						if(await element.isDisplayed()){
							await element.sendKeys(text);
							return true;
						}
					}
					return false;
				});
				
		}, waitTimeout)
		.catch(function(Ex){
				throw Error('setText() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async clearText(selector){
  		await driver.wait(async function(driver) {
				return await driver.findElements(selector).then(async function(elements){
					if(elements.length > 0){
						const element = await elements[0];
						if(await element.isDisplayed()){
							await element.clear();
							return true;
						}
					}
					return false;
				});
				
		}, waitTimeout)
		.catch(function(Ex){
				throw Error('clearText() on '+selector+' failed with exception : '+Ex);
		});

  	}

  	/* tested on HTML based and dynamic select */
  	async selectOptionByLabel(selector, label){
		await driver.wait(async function(driver){
			return await driver.findElements(selector).then(async function(parent){
				const selectEl = parent[0];
				return await selectEl.findElements(By.xpath('./option[contains(text(),"'+label+'")]'))
	  				.then(async function(elements){
						if(elements.length > 0){
							const select = new Select(selectEl);
							await select.selectByVisibleText(label);
							return true;
						}
						return false;
				}).catch(function(Ex){
					console.log(Ex);
				})
			})
		}, waitTimeout)
		.catch(function(Ex){
			throw Error('selectOptionByLabel() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async oldSelectOptionByLabel(selector, label){
  		await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			const select = new Select(element);
			await select.selectByVisibleText(label);
		}).catch(function(Ex){
			throw Error('selectOptionByLabel() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async selectOptionByValue(selector, value){
  		await driver.wait(async function(driver){
			return await driver.findElements(selector).then(async function(parent){
				const selectEl = parent[0];
				return await selectEl.findElements(By.xpath('./option[contains(@value,"'+value+'")]'))
	  				.then(async function(elements){
						if(elements.length > 0){
							const select = new Select(selectEl);
							await select.selectByValue(value);
							return true;
						}
						return false;
				}).catch(function(Ex){
					console.log(Ex);
				})
			})
		}, waitTimeout)
  		.catch(function(Ex){
			throw Error('selectOptionByValue() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async check(selector){
  		await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			if(!await element.isSelected()){
				await element.click();
			}
		})
		.catch(function(Ex){
			throw Error('check() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async uncheck(selector){
  		await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			if(await element.isSelected()){
				await element.click();
			}
		}).catch(function(Ex){
			throw Error('uncheck() on '+selector+' failed with exception : '+Ex);
		});
  	}

  	async waitForPageLoad(timeout=0){
		let loadTimeout = timeout===0 ? waitTimeout : timeout;
		await driver.wait(async function(driver) {
				return await driver.executeScript('return document.readyState')==='complete';
		}, loadTimeout);
	}

  	async sleep(time) {
  		return new Promise(resolve => setTimeout(resolve, time));
	} 
	//to be continue

}

const verify = require('./verify')
Object.assign(WebUI.prototype, verify)

const getter = require('./getter')
Object.assign(WebUI.prototype, getter)

module.exports = WebUI;