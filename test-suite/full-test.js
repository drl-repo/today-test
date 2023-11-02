module.exports = function(){
	describe('Scenario : Full e2e functional testing ...', function () {
		this.timeout(0);
		
		it('TC01 - ', async function(){
			
			await WebUI.openBrowser('/templates/agency/');

			//payment-form-6542d9fa5df1a id ini random ng sih ?
			await driver.wait(until.elementLocated(By.css('div[data-payment-page-component-loaded="1"]')), 10000);
			console.log('loaded');
			/* 
			agak sulit, saya pikir selector saya sudah sesuai
			but sepertinya element ini exist on the DOM only (3rd party page) berdasarkan yg saya liat
			waktu page dimuat (drender)
			tapi saya ng tau pasti apakah pakai iframe, attached via javascript
			atau Component
			ini wordpress ya? elementor? 
			Terima kasih	
			*/
			//const plaid = By.css('div[data-payment-page-component-payment-form-trigger="switch_payment_method_ach_direct_debit"]');
			const plaid = By.css('div img[alt="ACH Direct Debit"]');
			await WebUI.click(plaid);
			await WebUI.setText(By.css('input[name="email_address"]'), 'test@mail.com');
			//await WebUI.setText(By.id('payment-page-email_address-6542d9fa5df1a'), 'test@mail.com');
		
			await WebUI.setText(By.css('input[name="first_name"]'), 'Jhone');
			await WebUI.setText(By.css('input[name="last_name"]'), 'Doe');
			const orderBtn = 'form div[data-payment-page-component-payment-form-container="alternative_submit"]';
			await WebUI.click(By.css(orderBtn));			
			//await WebUI.setText(By.id('revealed'), 'New value');
			const loader = 'div[class="payment-page-application-loader-wrapper"]';
			await WebUI.verifyElementPresent(By.css(loader));
			

		});
		
		after(() => {
		 	setTimeout(async function(){
		 		//await driver.quit();
		 	}, 10000);
		})
		
	});
}