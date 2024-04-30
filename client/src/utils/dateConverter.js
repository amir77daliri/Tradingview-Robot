export const timeConverter = (unixTimeSeconds) => {
    // Multiply by 1000 to convert seconds to milliseconds
    const unixTimestamp = unixTimeSeconds * 1000;
    const date = new Date(unixTimestamp);

    // Options for formatting the date
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'Asia/Tehran',
    };

    // Format the date
    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
}


export function computeNotifedTime(lastDate) {
    const now = Date.now();
    const oneDaysMilliseconds = 1 * 24 * 60 * 60 * 1000;

    const lastNotifElapsedTime = now - lastDate;

    if(lastNotifElapsedTime >= oneDaysMilliseconds) {
        return true
    }
    return false;
}