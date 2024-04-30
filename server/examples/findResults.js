// find the prices that base_line & leading_line are along each other
function findResults(item, baseLines, leadingBLines) {
    const results = []
    for(const baseItem of baseLines) {
        for(const leadItem of leadingBLines) {

            if( baseItem[0]['Base_Line']  === leadItem[0]['Leading_Span_B'] && !baseItem[0]['Base_Line'].toString().includes('e')) {
                baseItem[0]['name'] = item.symbolId
                baseItem[0]['candleRange'] = item.candleRange
                baseItem[0]['candleTime'] = item.timeframe
                baseItem[0]['currentPrice'] = 0
                baseItem[0]['change'] = true
                baseItem[0]['active'] = false
                baseItem[0]['isNotifed'] = false
                baseItem[0]['slCount'] = item.slCount
                baseItem[0]['lastNotifedDate'] = null
                baseItem[0]['baseLineLength'] = baseItem.length
                baseItem[0]['spanBLineLength'] = leadItem[0]['leadLength']
                results.push(baseItem[0])
            }
        }
    }
    results.sort((a, b) => {
        return a.Base_Line - b.Base_Line
    })

    results.forEach((item, index, array) => {
        if(array[index + 1]) {
            item['nextSR'] = array[index+1]['Base_Line']
            const slDiffPrice = ( item['slCount'] / 100 ) * (item['nextSR'] - item['Base_Line'])
            item['slPrice'] = item['Base_Line'] - slDiffPrice
        }else{
            item['nextSR'] = -1
        }
        if(array[index -1]) {
            item['prevSR'] = array[index-1]['Base_Line']
            const tpDiffPrice = ( item['slCount'] / 100 ) * (item['Base_Line'] - item['prevSR'])
            item['tpPrice'] = item['Base_Line'] + tpDiffPrice
        }else {
            item['prevSR'] = -1
        }
    })

    return results
}

module.exports = findResults;