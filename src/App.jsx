import React, { useEffect, useState } from 'react';
import './App.css';

const API_KEY = '460e7030f42a49159e52b48c73452704';

function App() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        `https://api.currencyfreaks.com/latest?apikey=${API_KEY}`
      );
      const data = await response.json();
      const rates = data.rates;
      
      const currenciesData = [
        { name: 'CAD', exchangeRate: rates.CAD, weBuy: rates.CAD * 1.05, weSell: rates.CAD * 0.95 },
        { name: 'EUR', exchangeRate: rates.EUR, weBuy: rates.EUR * 1.05, weSell: rates.EUR * 0.95 },
        { name: 'IDR', exchangeRate: rates.IDR, weBuy: rates.IDR * 1.05, weSell: rates.IDR * 0.95 },
        { name: 'JPY', exchangeRate: rates.JPY, weBuy: rates.JPY * 1.05, weSell: rates.JPY * 0.95 },
        { name: 'CHF', exchangeRate: rates.CHF, weBuy: rates.CHF * 1.05, weSell: rates.CHF * 0.95 },
        { name: 'GBP', exchangeRate: rates.GBP, weBuy: rates.GBP * 1.05, weSell: rates.GBP * 0.95 },
      ];

      setCurrencies(currenciesData);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  return (
    <div className="App">
      <style>
        {`
          body {
            background-color: orange;
            color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          a {
            text-decoration: none;
            color: white;
          }
          table {
            margin: 0 auto;
          }
        `}
      </style>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Exchange Rate</th>
            <th>We Buy</th>
            <th>We Sell</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency) => (
            <tr key={currency.name}>
              <td>{currency.name}</td>
              <td>{currency.exchangeRate}</td>
              <td>{currency.weBuy.toFixed(4)}</td>
              <td>{currency.weSell.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rate are based from 1 USD</p>
      <p>This application uses API from <a href="https://currencyfreaks.com">https://currencyfreaks.com</a>.</p>
    </div>
  );
}

export default App;
