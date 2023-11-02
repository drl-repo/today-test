/* Verify function as assertion with wait for condition */

let verify = {
	//VERIFY
	async verifyElementPresent(selector){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				return element.length;
			});
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" doesn't present");
		});
  	},

  	async verifyElementVisible(selector){
  		await driver.wait(until.elementLocated(selector), waitTimeout)
  		.catch(function(Ex){
			throw new Error("Element "+selector+" is not visible");
		});
  	},

  	async verifyElementText(selector, text){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				if(element.length > 0){
					return element[0].getText().then((t) => (t === text ? element : null));
				}
				return false;
			});
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" doesn't have text equal to "+text);
		});
  	},

  	async verifyElementTextContains(selector, text){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				if(element.length > 0){
					return await element[0]
				      .getText()
				      .then((t) => {
				      	return t.indexOf(text) != -1 ? element : null
				      });
			    }
			    
			})
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" not contains text "+text);
		});
  	},

  	async verifyElementHasAttribute(selector, attribute){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				if(element.length > 0){
					// will return string value of attribute or null
					return await element[0].getAttribute(attribute);
				}
				return false;
			});
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" doesn't has "+attribute+" attribute");
		});
  	},

  	async verifyElementAttributeValue(selector, attribute, value){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				if(element.length > 0){
					const attrVal = await element[0].getAttribute(attribute);
					return attrVal === value;
				}
				return false;
			});
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" doesn't have attribute "+attribute+" equal to "+value);
		});
  	},

  	async verifyElementAttributeContainValue(selector, attribute, oneOfThevalue){
  		await driver.wait(async function(driver) {
			return await driver.findElements(selector).then(async function(element){
				if(element.length > 0){
					return await element[0]
				      .getAttribute(attribute)
				      .then((attr) => {
				      	return attr.indexOf(oneOfThevalue) != -1 ? element : null
				      });
				}
				return false;
			});
		}, waitTimeout)
		.catch(function(Ex){
			throw new Error("Element "+selector+" doesn't have attribute "+attribute+" "+oneOfThevalue);
		});
  	}

  	//to be continue
}

module.exports = verify;