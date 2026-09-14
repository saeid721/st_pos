export function formateedDateTimeForDatePicker(dateString) {
    const parsedDate = new Date(dateString);
    if (!isNaN(parsedDate.getTime())) {
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(parsedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    } else {
        console.error('Invalid Date');
        return null;
    }
}