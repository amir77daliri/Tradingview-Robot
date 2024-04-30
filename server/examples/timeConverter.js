function convertTime(time1, time2) {
    // Convert timestamps to milliseconds
const milliseconds1 = time1 * 1000;
const milliseconds2 = time2 * 1000;

// Create Date objects
const date1 = new Date(milliseconds1);
const date2 = new Date(milliseconds2);

// Calculate the time difference in milliseconds
const timeDifferenceInMilliseconds = Math.abs(date1 - date2);

// Convert milliseconds to minutes
const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

return timeDifferenceInMinutes
}

module.exports = convertTime;
