export const timeFrames = {
    'MINUTES': [
        ['1 minute', '1'],
        ['3 minute', '3'],
        ['5 minute', '5'],
        ['15 minute', '15'],
        ['30 minute', '30'],
        ['45 minute', '45'],
    ],
    'HOURS': [
        ['1 hour', '60'],
        ['2 hour', '120'],
        ['3 hour', '180'],
        ['4 hour', '240'],
    ],
    'DAYS': [
        ['1 day', 'D'],
        ['1 week', 'W'],
        ['1 month', 'M'],
        ['3 month', '3M'],
        ['6 month', '6M'],
        ['12 month', '12M']
    ]
}
export const timeframeFinder = (timeframe) => {
    let result = ''
    Object.values(timeFrames).map(timeList => {
        timeList.forEach(item => {
            if(item[1] === timeframe) {
                result = item[0]
            }
        })
    })
    return result
}

export const autoTimeframes = [
    {
      label: "1 hour",
      value: "60",
    },
    {
      label: "2 hour",
      value: "120",
    },
    {
      label: "3 hour",
      value: "180",
    },
    {
      label: "4 hour",
      value: "240",
    },
    {
      label: "1 Day",
      value: "D",
    },
    {
      label: "1 Week",
      value: "W",
    },
    {
      label: "1 Month",
      value: "M",
    },{
      label: "3 Month",
      value: "3M",
    },{
      label: "6 Month",
      value: "6M",
    },{
      label: "12 Month",
      value: "12M",
    },
  ];
  