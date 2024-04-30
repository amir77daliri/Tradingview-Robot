const TradingView = require('../main');

/**
 * This example tests the searching functions such
 * as 'searchMarket' and 'searchIndicator'
 */

TradingView.searchMarket('CRYPTO:').then((rs) => {
  console.log('Found Markets:', rs);
  const item = rs[0]
  console.log(item.getTA().then(res => {
    console.log(res)
  }))
})

TradingView.searchIndicator('RSI').then((rs) => {
  console.log('Found Indicators:', rs);
});

