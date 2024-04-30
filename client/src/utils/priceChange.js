const fixedItemValues = (item) => {
    const currentPrice = item.currentPrice;
    let decimalPlaces = 0
    const findDecimalNumbers = currentPrice.toString().split('.')
    if(findDecimalNumbers[1] ) {
        decimalPlaces = findDecimalNumbers[1].length
        if(decimalPlaces > 7) decimalPlaces = 6
    }
    const difference = item.currentPrice - item.Base_Line;

    // Calculate the percentage difference
    const percentageDifference = (difference / item.Base_Line) * 100;

    const fixedDifference = difference.toFixed(decimalPlaces)
    const fixedPercentageDifference = percentageDifference.toFixed(decimalPlaces > 2 ? 2 : decimalPlaces )

    return {
        targetChange: fixedDifference,
        targetPercentage: fixedPercentageDifference,
        decimalPlaces
    }

}

export default fixedItemValues;