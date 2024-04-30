const TradingView = require('../main');
const groupingCandles = require('./groupCandles');
const findResults = require('./findResults');


async function processCurrencies(ListOfCurrencies) {
  const results = [];
  let client = new TradingView.Client();
  try {
    const indic = await TradingView.getIndicator('STD;Ichimoku%1Cloud');
    console.log("find result start ...")
    for (const item of ListOfCurrencies) {
      try {       
        const chart = new client.Session.Chart();
        
        let newDate = new Date();
        let toDate = Math.floor(newDate.setUTCHours(newDate.getUTCHours(), 0, 0, 0) / 1000) + 1;
        if (['15', '30', '45'].includes(item.timeframe) && newDate.getUTCMinutes() > Number(item.timeframe)) {
          toDate.setUTCMinutes(Number(item.timeframe))
        }
        chart.setMarket(item.symbolId, {
          timeframe: item.timeframe,
          range: Number(item.candleRange),
          to: toDate,
        });
        chart.setTimezone('Asia/Tehran')
        const SUPERTREND = new chart.Study(indic);
        const result = await new Promise((resolve) => {
          SUPERTREND.onUpdate(() => {
            const candles = SUPERTREND.periods;
            const baseLineResult = groupingCandles(item.timeframe, candles, 'Base_Line');
            const spanBResults = groupingCandles(item.timeframe, candles, 'Leading_Span_B');
            if (baseLineResult.length > 0 && spanBResults.length > 0) {
              const result = findResults(item, baseLineResult, spanBResults);
              resolve(result);
            } else {
              resolve(null)
            }
          });
          SUPERTREND.onError((e) => {
            // console.log('supertrend ',e)
            resolve(null)
          })
          chart.onError(() => {
            // console.log(item)
            resolve(null)
          })  
        });
        // Store the result
        if (result) {
          results.push(...result);
        }
      } catch (error) {
        client.end()
        client = new TradingView.Client();
      }
    }
    client.end();
    console.log("find result Finish ...")
    // End the client session after both loops have completed
    if(results.length < 1) {
      return ['notFound']
    }
    return results;
  } catch (error) {
    console.log('Error before starting: ', error)
    client.end()
    return ['error'];
  }
}


module.exports = processCurrencies;