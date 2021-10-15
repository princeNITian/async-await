// USD CAD 20
// 20 USD is worth 26 CAD
const axios = require('axios');
const url = 'http://data.fixer.io/api/latest?access_key=7b07a36a336411b2c3c0ee56847f2703&format=1';


const getExchangeRate = async (from, to) => {

    try{
        const response = await axios.get(url);
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if(isNaN(rate)){
            throw new Error();
        }
        return rate;
    }catch(e){
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
    }
        
    
}

const getCountries = async (currencyCode) => {
    
    try{
        const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    }catch(e){
        throw new Error(`Unable to get countries that use ${currencyCode}.`);
    }
}

// getExchangeRate('EUR','INR').then((rate) => {
//     console.log(rate)
// })

// getCountries('INR').then((names) => console.log(names));

// const convertCurrency = (from, to, amount) => {
//     let convertedAmt;
//     getExchangeRate(from,to).then((rate) => {
//         convertedAmt = (amount*rate).toFixed(2);
//         // console.log(convertedAmt);
//         return getCountries(to);
//     }).then((countries) => {
//         // console.log(countries);
//         console.log(`${amount} ${from} is worth ${convertedAmt} ${to}. You can spend it in the following countries: ${(countries.map(c => c.common)).join(', ')}.`);
//     })
// }


const convertCurrency = async (from, to, amount) => {
    
    const rate =  await getExchangeRate(from,to)
    const countries = await getCountries(to);
    const convertedAmt = (amount*rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmt} ${to}. \nYou can spend it in the following countries: ${(countries.map(c => c.common)).join(', ')}.`;
}


convertCurrency('USD','EUR',100).then((message) => console.log(message)).catch(e => console.log(e.message));