import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios.get('https://api.currencyfreaks.com/latest?apikey=YOUR_API_KEY')
      .then(response => {
        const selectedRates = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'].map(currency => {
          const exchangeRate = parseFloat(response.data.rates[currency]);
          return {
            currency,
            weBuy: (exchangeRate * 1.05).toFixed(4),
            exchangeRate: exchangeRate.toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4),
          };
        });
        setRates(selectedRates);
      })
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy</th>
          <th>Exchange Rate</th>
          <th>We Sell</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate, index) => (
          <tr key={index}>
            <td>{rate.currency}</td>
            <td>{rate.weBuy}</td>
            <td>{rate.exchangeRate}</td>
            <td>{rate.weSell}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyRates;
