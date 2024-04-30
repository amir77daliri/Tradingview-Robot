const EXCHANGES = {
    'CRYPTOCURRENCY': [
        {
            name: 'Binance',
            pathName: 'BINANCE',
            src: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg'
        },{
            name: 'Binance Us',
            pathName: 'BINANCEUS',
            src: 'https://s3-symbol-logo.tradingview.com/provider/binance.svg'
        },{
            name: 'BingX',
            pathName: 'BINGX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bingx.svg'
        },{
            name: 'Biswap (BNB chain)',
            pathName: 'BISWAP',
            src: 'https://s3-symbol-logo.tradingview.com/provider/biswap.svg'
        
        },{
            name: 'Bitfinex',
            pathName: 'BITFINEX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitfinex.svg'
        },{
            name: 'Bitget',
            pathName: 'BITGET',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitget.svg'
        },{
            name: 'Bithumb',
            pathName: '',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/bithumb.svg'
        },{
            name: 'Bitmart',
            pathName: 'BITMART',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitmart.svg'  
             
        },{
            name: 'bitMEX',
            pathName: 'BITMEX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitmex.svg'  
        },{
            name: 'Bitrue',
            pathName: 'BITRUE',
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitrue.svg'  
        },{
            name: 'Bitstamp',
            pathName: 'BITSTAMP',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/bitstamp.svg'
        },{
            name: 'Bittrex',
            pathName: 'BITTREX',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/bittrex.svg'
        },{
            name: 'Blofin',
            pathName: 'BLOFIN',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/blofin.svg'
        },{
            name: 'BTSE',
            pathName: 'BTSE',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/btse.svg'
        },{
            name: 'Bybit',
            pathName: 'BYBIT',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/bybit.svg'
        },{
            name: 'Coin Metrics',
            pathName: 'COINMETRICS',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/coinmetrics.svg'
        },{
            name: 'Coinbase',
            pathName: 'COINBASE',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/coinbase.svg'
        },{
            name: 'CoinEx',
            pathName: 'COINEX',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/coinex.svg'
        },{
            name: 'Gemini',
            pathName: 'GEMINI',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/gemini.svg'
        },{
            name: 'Kraken',
            pathName: 'KRAKEN',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/kraken.svg'
        },{
            name: 'KuCoin',
            pathName: 'KUCOIN',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/kucoin.svg'
        },{
            name: 'MEXC Global',
            pathName: 'MEXC',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/mexc.svg'
        },{
            name: 'PancakeSwap',
            pathName: 'PANCAKESWAP',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/pancakeswap.svg'
        },{
            name: 'Phemex',
            pathName: 'PHEMEX',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/phemex.svg'
        },{
            name: 'Pionex',
            pathName: 'PIONEX',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/pionex.svg'
        },{
            name: 'Poloniex',
            pathName: 'POLONIEX',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/poloniex.svg'
        },{
            name: 'Pyth',
            pathName: 'PYTH',
            src: 'https://s3-symbol-logo.tradingview.com/provider/pyth.svg'
        },{
            name: 'UpBit',
            pathName: 'UPBIT',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/upbit.svg'
        },{
            name: 'WhiteBIT',
            pathName: 'WHITEBIT',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/whitebit.svg'
        },{
            name: 'WOO',
            pathName: 'WOONETWORK',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/woonetwork.svg'
        },{
            name: 'xExchange',
            pathName: 'XEXCHANGE',  
            src: 'https://s3-symbol-logo.tradingview.com/provider/xexchange.svg'
        },{
            name: 'Zoomex',
            pathName:'ZOOMEX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/zoomex.svg'
        }
    ],

    'FOREX & CFD': [
        {
            name: 'ActivTrades',
            pathName: 'ACTIVETRADES',
            src: 'https://s3-symbol-logo.tradingview.com/provider/activtrades.svg'
        },
        {
            name: 'Afterprime',
            pathName: 'AFTERPRIME',
            src: 'https://s3-symbol-logo.tradingview.com/provider/afterprime.svg'
        },
        {
            name: 'BlackBull Markets',
            pathName: 'BLACKBULL',
            src: 'https://s3-symbol-logo.tradingview.com/provider/blackbull.svg'
        },
        {
            name: 'Capital.com',
            pathName: 'CAPITALCOM',
            src: 'https://s3-symbol-logo.tradingview.com/provider/capitalcom.svg'
        },
        {
            name: 'City index',
            pathName: 'CITYINDEX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/cityindex.svg'
        },
        {
            name: 'easyMarkets',
            pathName: 'EASYMARKETS',
            src: 'https://s3-symbol-logo.tradingview.com/provider/easymarkets.svg'
        },
        {
            name: 'Eightcap',
            pathName: 'EIGHTCAP',
            src: 'https://s3-symbol-logo.tradingview.com/provider/eightcap.svg'
        },
        {
            name: 'FOREX.com',
            pathName: 'FOREXCOM',
            src: 'https://s3-symbol-logo.tradingview.com/provider/gain.svg'
        },
        {
            name: 'FP Markets',
            pathName: 'FPMARKETS',
            src: 'https://s3-symbol-logo.tradingview.com/provider/fpmarkets.svg'
        },
        {
            name: 'FXCM',
            pathName: 'FXCM',
            src: 'https://s3-symbol-logo.tradingview.com/provider/fxcm.svg'
        },
        {
            name: 'FXOpen',
            pathName: 'FXOPEN',
            src: 'https://s3-symbol-logo.tradingview.com/provider/fxopen.svg'
        },
        {
            name: 'GBE brokers',
            pathName: 'GBEBROKERS',
            src: 'https://s3-symbol-logo.tradingview.com/provider/gbebrokers.svg'
        },
        {
            name: 'iBroker',
            pathName: 'IBROKER',
            src: 'https://s3-symbol-logo.tradingview.com/provider/ibkr.svg'
        },
        {
            name: 'ICE',
            pathName: 'ICE',
            src: 'https://s3-symbol-logo.tradingview.com/provider/ice.svg'
        },
        {
            name: 'Interctive Brokers',
            pathName: 'IBKR',
            src: 'https://s3-symbol-logo.tradingview.com/provider/ibkr.svg'
        },
        {
            name: 'JFX',
            pathName: 'JFX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/jfx.svg'
        },
        {
            name: 'OANDA',
            pathName: 'OANDA',
            src: 'https://s3-symbol-logo.tradingview.com/provider/oanda.svg'
        },
        {
            name: 'Pepperstone',
            pathName: 'PEPPERSTONE',
            src: 'https://s3-symbol-logo.tradingview.com/provider/pepperstone.svg'
        },
        {
            name: 'Phillip Nova',
            pathName: 'PHILLIPNOVA',
            src: 'https://s3-symbol-logo.tradingview.com/provider/phillipnova.svg'
        },
        {
            name: 'Saxo',
            pathName: 'SAXO',
            src: 'https://s3-symbol-logo.tradingview.com/provider/saxobank.svg'
        },
        {
            name: 'SKILLING',
            pathName: 'SKILLING',
            src: 'https://s3-symbol-logo.tradingview.com/provider/skilling.svg'
        },
        {
            name: 'Spreadex',
            pathName: 'SPREADEX',
            src: 'https://s3-symbol-logo.tradingview.com/provider/spreadex.svg'
        },
        {
            name: 'Vantage',
            pathName: 'VANTAGE',
            src: 'https://s3-symbol-logo.tradingview.com/provider/vantagefx.svg'
        },
        {
            name: 'Velocity Trade',
            pathName: 'VALOCITY',
            src: 'https://s3-symbol-logo.tradingview.com/provider/velocitytrade.svg'
        }
    ]
}

export default EXCHANGES;