function togglePaymentDetails(e) {
    const theForm = document.querySelector('#checkoutForm');

    const creditCardContainer = document.querySelector('#creditCardNumberContainer');
    const paypalContainer = document.querySelector('#paypalUsernameContainer');
    const creditInput = document.querySelector('#creditCardNumberContainer input');
    const paypalInput = document.querySelector('#paypalUsernameContainer input');

    let value = e.target.value;
    paypalContainer.classList.add('hide');
    creditCardContainer.classList.add('hide');
    paypalInput.required = false;
    creditInput.required = false;

    if (value == 'creditCard') {
        creditCardContainer.classList.remove('hide');
        creditInput.required = true;
    } else if (value == 'paypal') {
        paypalContainer.classList.remove('hide');
        paypalInput.required = true;
    }
}