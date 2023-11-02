let getter = {
	
	async getText(selector){
  		return await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			return await element.getText();
		}).catch(function(Ex){
			throw new Error("Unable to get text from element "+selector);
		});

  	},

  	async getAttribute(selector, attribute){
  		return await driver.wait(until.elementLocated(selector), waitTimeout)
  		.then(async function(element){
			return await element.getAttribute(attribute);
		}).catch(function(Ex){
			throw new Error("Unable to get text from element "+selector);
		});

  	}

  	//to be continue
}

module.exports = getter