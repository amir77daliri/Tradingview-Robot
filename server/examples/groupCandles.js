function groupCandlesByBaseLineOrLeadingB(time, dataList, fieldName) {
    const groups = [];
    dataList.forEach((obj, index) => {
        // Check if this object is the first one or has a different price from the previous one
        if (index === 0 || obj[fieldName] !== dataList[index - 1][fieldName]) {
            groups.push([obj]); // Start a new group
        } else {

            groups[groups.length - 1].push(obj);
        }
    });

    // filter results 
    let filteredGroups;
    if (Number(time) < 60) {
        filteredGroups = groups.filter(group => group.length > 4)
    } else if (Number(time) === 60) {
        filteredGroups = groups.filter(group => group.length > 3)
    } else if (Number(time) === 240) {
        filteredGroups = groups.filter(group => group.length > 2)
    } else {
        filteredGroups = groups.filter(group => group.length > 1)
    }

    // find leadSpan lines length && filter red Clouds
    if (fieldName === 'Leading_Span_B') {
        const newSpanBGroups = []
        filteredGroups.forEach(group => {
            let count = 0
            let map = new Map()
            let newGroup = []
            for(let i=0; i< group.length; i++) {
                while(i<group.length && group[i]['Leading_Span_B'] > group[i]['Leading_Span_A']) {      
                    count += 1
                    newGroup.push(group[i])
                    i += 1
                }
                if(count > 1) {
                    map.set(count, newGroup)
                }
                count = 0
                newGroup = []

            }
            if(Array.from(map.keys()).length > 0) {
                const maxSize = Math.max(...Array.from(map.keys()))
                let newFilteredGroup = map.get(maxSize)
                newFilteredGroup = newFilteredGroup.map(item => {
                    return {
                        ...item,
                        leadLength : maxSize
                    }
                })
                newSpanBGroups.push(newFilteredGroup)
            }
            map.clear()
        })
        filteredGroups = newSpanBGroups;

    }

    return filteredGroups;


}


module.exports = groupCandlesByBaseLineOrLeadingB;
