const axios = require('axios');
const fs = require('fs');

async function fetchTradingPairs() {
  try {
    // Fetch trading pairs from Binance Futures API
    const response = await axios.get(
      'https://fapi.binance.com/fapi/v1/exchangeInfo'
    );
    const symbols = response.data.symbols;

    // Filter and format USDT pairs
    const usdtPairs = symbols
      // .filter((symbol) => symbol.symbol.endsWith('USDT'))
      // tradingn pairs only
      .filter(
        (symbol) =>
          symbol.symbol.endsWith('USDT') && symbol.status === 'TRADING'
      )
      .map((symbol) => `BINANCE:${symbol.symbol}PERP`);

    // Write to a text file
    fs.writeFileSync('usdt_pairs.txt', usdtPairs.join('\n'));
    console.log('Trading pairs have been written to usdt_pairs.txt');
  } catch (error) {
    console.error('Error fetching trading pairs:', error);
  }
}

fetchTradingPairs();
