const orderItems = [
    { value: "", label: "هیچکدام" },
    { value: "targetChange", label: "- بر اساس تفاوت قیمت" },
    { value: "targetPercentage", label: "- بر اساس تفاوت درصد" },
    { value: "baseLineLength", label: "- بر اساس تعداد کندل base" },
    { value: "spanBLineLength", label: "- بر اساس تعداد کندل spanB" },
    { value: "$time", label: "- بر اساس تاریخ" }
]

const orderItemsFn = (list, field, isAsc) => {
    const sortedList = [...list];
    //console.log('before = ', sortedList)
    switch (field) {
        case '$time':
            sortedList.sort((a, b) => {
                if (isAsc) {
                    return a['$time'] - b['$time']
                } else {
                    return b['$time'] - a['$time']
                }
            })
            break;
        case 'targetChange':
            sortedList.sort((a, b) => {
                if (isAsc) {
                    return Math.abs(a['targetChange']) - Math.abs(b['targetChange'])
                } else {
                    return Math.abs(b['targetChange']) - Math.abs(a['targetChange'])
                }
            })
            break;
        case 'targetPercentage':
            sortedList.sort((a, b) => {
                if (isAsc) {
                    return Math.abs(a['targetPercentage']) - Math.abs(b['targetPercentage'])
                } else {
                    return Math.abs(b['targetPercentage']) - Math.abs(a['targetPercentage'])
                }
            })
            break;
        case 'baseLineLength':
            sortedList.sort((a, b) => {
                if (isAsc) {
                    return Math.abs(a['baseLineLength']) - Math.abs(b['baseLineLength'])
                } else {
                    return Math.abs(b['baseLineLength']) - Math.abs(a['baseLineLength'])
                }
            })
            break;
        case 'spanBLineLength':
            sortedList.sort((a, b) => {
                if (isAsc) {
                    return Math.abs(a['spanBLineLength']) - Math.abs(b['spanBLineLength'])
                } else {
                    return Math.abs(b['spanBLineLength']) - Math.abs(a['spanBLineLength'])
                }
            })
            break;

    }
    //console.log('after = ', sortedList)
    return sortedList;
}


export { orderItems, orderItemsFn };