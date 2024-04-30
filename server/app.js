const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Server } = require('ws');

const processCurrencies = require('./examples/FromToData');
const listenToPriceWs = require('./examples/listenToPrice');
const { default: axios } = require('axios');

// test functions :
const testStrategy = require('./strategyTest/main');

// Databse :
const sequelize = require('./database/database');
const Result = require('./models/testResultsModel');
const Test = require('./models/TestModel');

const app = express()
const server = http.createServer(app)
const appWs = new Server({ server })

app.use(bodyParser.json())
app.use(express.json())
app.use(cors())




appWs.on('connection', async (socket) => {
    console.log('websocket connected ...')
    let results = []
    socket.on('message', async (data) => {
        try {
            const { symbols } = JSON.parse(data)
            const currencies = []
            results = await processCurrencies(symbols)
            for (const item of results) {
                if (!currencies.includes(item.name)) {
                    currencies.push(item.name)
                }
            }
            // console.log(currencies)
            // console.log(results)
            if (results[0] !== 'notFound' && results[0] !== 'error') {
                socket.send(JSON.stringify({ code: 1, results }))
                listenToPriceWs(socket, Array.from(new Set(currencies)))
            } else if (results[0] === 'notFound') {
                socket.send(JSON.stringify({ code: 4 }))
            } else {
                socket.send(JSON.stringify({ code: 3 }))
            }
        } catch (error) {
            console.log(error)
            socket.send(JSON.stringify({ code: 3 }))
        }
    })
    socket.on('close', () => {
        console.log('closing socket')
    })

})


app.use('/symbol_search', async (req, res) => {
    console.log(req.query)
    try {
        const start = Number(req.query.start) * 50;
        let baseUrl = `https://symbol-search.tradingview.com/symbol_search/v3/?sort_by_country=US&start=${start}`
        if (req.query && req.query.text) {
            baseUrl += `&text=${req.query.text}`
        }
        if (req.query && req.query.searchType) {
            baseUrl += `&search_type=${req.query.searchType}`
        }
        const response = await axios.get(baseUrl)
        res.send(response.data)
    } catch (error) {
        // console.log(error)
        res.send(error)
    }
})

app.use('/auto_symbol_search', async (req, res) => {
    try {
        console.log(req.query)
        let { count, text, exchange, search_type } = req.query
        count = Number(count)
        const queryParams = {
            text,
            exchange,
            search_type,
            sort_by_country: 'US'
        }
        let start = 0
        let results = []
        const baseUrl = `https://symbol-search.tradingview.com/symbol_search/v3/`
        let errorCount = 0

        while (true) {
            try {
                let filteredItems = [];
                queryParams.start = start * 50
                const { data } = await axios.get(baseUrl, {
                    params: queryParams,
                    timeout: 3000
                })
                const { symbols_remaining, symbols } = data
                if (count < 50) {
                    filteredItems = symbols.slice(0, count)
                } else {
                    filteredItems = symbols
                }
                results.push(...filteredItems)
                count -= 50
                if (symbols_remaining === 0 || count < 1) {
                    break;
                }
                start += 1
            } catch (error) {
                errorCount += 1
                if (errorCount === 5) {
                    break;
                }
                console.log("error:", error.message)
            }
        }
        if (errorCount === 5) {
            res.status(500).send('Error')
        } else {
            res.send(results)
        }
    } catch (error) {
        // console.log(error)
        res.send(error)
    }
})


app.post('/testStrategy', async (req, res) => {
    const requiredFields = ['name', 'exchange', 'timeframe', 'startDate', 'candleRange']
    const missingFields = requiredFields.filter(fieled => !(fieled in req.body))
    if (missingFields.length > 0) {
        res.status(400).send({ error: `These fields Required : ${missingFields.join(', ')}` })
    } else {
        const result = await testStrategy(req.body)
        res.send(result)
    }

})

const port = 9000;

sequelize.sync().then(() => {
    server.listen(port, () => {
        console.log(`server running on ${port}`)
    })
}).catch(error => console.log(error))

