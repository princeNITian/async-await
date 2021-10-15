// USD CAD 20
// 20 USD is worth 26 CAD
const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=7b07a36a336411b2c3c0ee56847f2703&format=1';


const getExchangeRate = async (from, to) => {
        const response = await axios.get(url);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        return rate;
    
}

const getCountries = async (currencyCode) => {
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    const countries = response.data.map(country => country.name );
    return countries;
}

getExchangeRate('EUR','INR').then((rate) => {
    console.log(rate)
})

getCountries('INR').then((names) => console.log(names));