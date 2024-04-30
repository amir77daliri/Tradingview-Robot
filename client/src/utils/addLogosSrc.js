

const addLogosSrc = (symbols) => {
    const filteredSymbols = symbols.map(item => {
        let cLogo;
        if(item['base-currency-logoid']) {
            cLogo = `https://s3-symbol-logo.tradingview.com/${item['base-currency-logoid']}.svg`
        } else if (item['logoid']) {
            cLogo = `https://s3-symbol-logo.tradingview.com/${item['logoid']}.svg`
        } else if(item['currency-logoid']) {
            cLogo = `https://s3-symbol-logo.tradingview.com/${item['currency-logoid']}.svg`
        }
        return {
            ...item,
            cLogo: cLogo,
            bLogo: `https://s3-symbol-logo.tradingview.com/provider/${item['provider_id']}.svg`
        }
    })

    return filteredSymbols;
}

export default addLogosSrc;

// logo url :
// https://s3-symbol-logo.tradingview.com/tata.svg

// provider :
// src="https://s3-symbol-logo.tradingview.com/provider/blackbullmarkets.svg"
