// function to find the range of prices preiods from comming data 
function convertToUnixTime(startPeriod, timeframe) {
    let unixDiffTime, periodCounts;
    switch (startPeriod) {
        case '1D':
            unixDiffTime = 24 * 60 * 60
            switch (timeframe) {
                case '5':
                    periodCounts = (24 * 60) / 5
                    break;
                case '15':
                    periodCounts = (24 * 60) / 15
                    break
                case '30':
                    periodCounts = (24 * 60) / 30
                    break;
                case '45':
                    periodCounts = 32
                    break;
            }
            break;
        case '2W':
            unixDiffTime = 2 * 7 * 24 * 60 * 60
            switch (timeframe) {
                case '60':
                    periodCounts = 2 * 7 * 24
                    break;
                case '120':
                    periodCounts = 2 * 7 * 12
                    break;
                case '240':
                    periodCounts = 2 * 7 * 6
                    break
                case '1D':
                    periodCounts = 14
                    break;
            }
            break;
        case '1M':
            unixDiffTime = 1 * 30 * 24 * 60 * 60
            switch (timeframe) {
                case '60':
                    periodCounts = 1 * 30 * 24
                    break;
                case '120':
                    periodCounts = 1 * 30 * 12
                    break;
                case '240':
                    periodCounts = 1 * 30 * 6
                    break
                case '1D':
                    periodCounts = 30
                    break;
            }
            break;
        case '2M':
            unixDiffTime = 2 * 30 * 24 * 60 * 60
            switch (timeframe) {
                case '60':
                    periodCounts = 2 * 30 * 24
                    break;
                case '120':
                    periodCounts = 2 * 30 * 12
                    break;
                case '240':
                    periodCounts = 2 * 30 * 6
                    break
                case '1D':
                    periodCounts = 60
                    break;
            }
            break;
        case '3M':
            unixDiffTime = 3 * 30 * 24 * 60 * 60
            switch (timeframe) {
                case '60':
                    periodCounts = 3 * 30 * 24
                    break;
                case '120':
                    periodCounts = 3 * 30 * 12
                    break;
                case '240':
                    periodCounts = 3 * 30 * 6
                    break
                case '1D':
                    periodCounts = 90
                    break;
                case '1W':
                    periodCounts = 4
                    break;
            }
            break;
        case '6M':
            unixDiffTime = 6 * 30 * 24 * 60 * 60
            switch (timeframe) {
                case '240':
                    periodCounts = 6 * 30 * 6
                    break
                case '1D':
                    periodCounts = 180
                    break;
                case '1W':
                    periodCounts = 24
                    break;
            }
            break;
    }

    return { unixDiffTime, periodCounts }

}

module.exports = convertToUnixTime;