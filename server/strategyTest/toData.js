const TradingView = require('../main');
const groupingCandles = require('../examples/groupCandles');
const findResults = require('../examples/findResults');


async function findPeriodsAndCandles(item, range, toDate, isForCandles) {
    const results = [];
    let client = new TradingView.Client();
    try {
        const indic = await TradingView.getIndicator('STD;Ichimoku%1Cloud');
        console.log("find result start ...")
        const chart = new client.Session.Chart();
        chart.setMarket(`${item.exchange}:${item.name}`, {
            timeframe: item.timeframe,
            range: range,
            to: toDate,
        });
        const SUPERTREND = new chart.Study(indic);
        const result = await new Promise((resolve) => {
            SUPERTREND.onUpdate(() => {
                if (isForCandles) {
                    const candles = SUPERTREND.periods;
                    const baseLineResult = groupingCandles(item.timeframe, candles, 'Base_Line');
                    const spanBResults = groupingCandles(item.timeframe, candles, 'Leading_Span_B');
                    if (baseLineResult.length > 0 && spanBResults.length > 0) {
                        const result = findResults(item, baseLineResult, spanBResults);
                        resolve(result);
                    } else {
                        resolve(null)
                    }
                } else {
                    const result = chart.periods
                    resolve(result)
                }
            });
            SUPERTREND.onError((e) => {
                resolve(null)
            })
            chart.onError(() => {
                resolve(null)
            })
        });
        // Store the result
        if (result) {
            results.push(...result);
        }

        client.end();
        console.log("find result Finish ...")
        // End the client session after both loops have completed
        if (results.length < 1) {
            return ['notFound']
        }
        return results;
    } catch (error) {
        console.log('Error before starting: ', error)
        client.end()
        return ['error'];
    }
}


module.exports = findPeriodsAndCandles;