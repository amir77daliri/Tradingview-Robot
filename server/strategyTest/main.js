const Test = require('../models/TestModel');
const Result = require('../models/testResultsModel');

const findPeriodsAndCandles = require('./toData');
const convertToUnixTime = require('./startTimeFinder');
const { DATE } = require('sequelize');

// main test function
async function testStrategy(symbol) {
    const { timeframe, startDate, candleRange } = symbol
    console.log(timeframe, " : ", startDate)
    const { unixDiffTime, periodCounts } = convertToUnixTime(startDate, timeframe)
    let newDate = new Date();
    let toDate = Math.floor(newDate.setUTCHours(newDate.getUTCHours(), 0, 0, 0) / 1000) + 1;
    if (['15', '30', '45'].includes(timeframe) && newDate.getUTCMinutes() > Number(timeframe)) {
        toDate.setUTCMinutes(Number(timeframe))
    }

    // Get Prices Preiods in wanted periods
    const prices = (await findPeriodsAndCandles(symbol, periodCounts, toDate, false)).reverse()

    // get the last time for fetching candles 
    const candleToDates = prices[0]['time'] - 1
    const lines = await findPeriodsAndCandles(symbol, candleRange, candleToDates, true)
    if (!lines || !prices) {
        return {
            'msg': 'خطا در دریافت داده ها. لطفا دوباره امتحان کنید'
        }
    }
    if (lines.length < 2) {
        return {
            'msg': 'تعداد خط کافی برای تست یافت نشد. رنج کندل ها یا بازه های زمانی را تغییر دهید'
        }
    }

    // First create a new Test instance :
    const newTest = await Test.create({
        currency: `${symbol.exchange}:${symbol.name}`,
        start_at: new Date(prices[0]['time'] * 1000),
        period: startDate,
        candleRange,
        timeframe
    })


    let i = 0
    const testResults = []
    let transaction = 'close'
    let targetLine = findTargetLine(prices[0]['open'], lines)
    if (targetLine === -1) {
        for (i; i < prices.length; i++) {
            if (prices[i]['close'] > lines[0]['Base_Line']) {
                targetLine = lines[0]
                console.log(prices[i])
                i += 1
                break;
            }
        }
    }

    for (i; i < prices.length - 1; i++) {
        if(i === prices.length) break;
        if (targetLine !== -1) {
            if (transaction === 'close') {
                if (prices[i]['min'] <= targetLine['Base_Line']) {
                    // Open Buy Transaction
                    transaction = 'open'
                    testResults.push({
                        TestId: newTest.id,
                        type: 'Buy',
                        time: new Date(prices[i]['time'] * 1000),
                        price: targetLine['Base_Line'],
                        status: 'open',
                        tpPrice: null
                    })
                } else if (prices[i]['close'] >= targetLine['Base_Line']) {
                    // update TargetLine
                    targetLine = findTargetLine(prices[i]['close'], lines)
                }
            } else {
                if (prices[i]['max'] >= targetLine['nextSR']) {
                    // Close Transaction - Sell 
                    transaction = 'close'
                    testResults[testResults.length - 1] = {
                        ...testResults[testResults.length - 1],
                        status: 'close',
                        tpPrice: targetLine['nextSR']
                    }
                    testResults.push({
                        TestId: newTest.id,
                        type: 'Sell',
                        time: new Date(prices[i]['time'] * 1000),
                        price: targetLine['nextSR'],
                    })
                    // update TargetLine
                    targetLine = findTargetLine(prices[i + 1]['open'], lines)
                }
            }
        } else {
            while(true) {
                if (prices[i]['close'] > lines[0]['Base_Line']) {
                    targetLine = lines[0]
                    console.log(prices[i])
                    break;
                }
                i += 1
            }
        }
    }

    // Save Results in db :
    await Result.bulkCreate(testResults)
    return {
        targetLine,
        newTest,
        testResults,
        length: prices.length,
        lines
    }
}

function findTargetLine(openPrice, lines) {
    let targetPrice;
    const sortAllPrices = [...lines.map(line => line['Base_Line']), openPrice].sort((a, b) => a - b)
    // console.log(sortAllPrices)
    const indexOfOpenPrice = sortAllPrices.findIndex(price => price === openPrice)
    // console.log('index= ', indexOfOpenPrice)
    if (indexOfOpenPrice === sortAllPrices.length - 1) {
        targetPrice = lines[lines.length - 2]
    } else if (indexOfOpenPrice === 0) {
        targetPrice = -1
    } else {
        targetPrice = lines[indexOfOpenPrice - 1]
    }

    return targetPrice;

}


module.exports = testStrategy;