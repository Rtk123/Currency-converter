const apiUrl = `https://open.er-api.com/v6/latest/USD`; // Base URL

// Fetch available currencies and populate the select options
async function fetchCurrencies() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const currencyOptions = Object.keys(data.rates);

    const fromCurrencySelect = document.querySelector('select[name="from"]');
    const toCurrencySelect = document.querySelector('select[name="to"]');

    currencyOptions.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;
        toCurrencySelect.appendChild(optionTo);
    });

    // Set default values for the selects
    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'INR';
}

// Convert the currency based on the selected values
async function convertCurrency(event) {
    if (event) event.preventDefault(); // Prevent the form from submitting

    const fromCurrency = document.querySelector('select[name="from"]').value;
    const toCurrency = document.querySelector('select[name="to"]').value;
    const amount = document.querySelector('.amount input').value;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const rate = data.rates[toCurrency] / data.rates[fromCurrency];
    const result = (amount * rate).toFixed(2);
    
    // Display the result
    document.querySelector('.msg').textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
}

// Initialize the currency converter
fetchCurrencies().then(() => {
    convertCurrency(); // Call to set initial conversion
});

// Attach event listener to the form
document.querySelector('form').addEventListener('submit', convertCurrency);

