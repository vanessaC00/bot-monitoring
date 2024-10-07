
// Function to fetch a JSON file and return its data
async function fetchJSONFile(fileName) {
    try {
    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}`);
    }

    const data = await response.json();
    return data;

    } catch (error) {
    console.error('Error fetching or processing data:', error);
    return null; 
    }
}
function getMonthName(dateString) {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getUTCMonth()]; 
}


async function displayNewUsersFromFiles() {
    const files = ['json_data/pistachioJune.json','json_data/pistachioJuly.json','json_data/pistachioAugust.json','json_data/pistachioSeptember.json','json_data/pistachioOctober.json']; 
    const listElement = document.getElementById('pistachioList'); 
    
    for (const file of files) {
    const data = await fetchJSONFile(file);

        if (data) {
            const newUsers = data.newUsers;

            const month = getMonthName(data.startDateTimeUtc); 

            const listItem = document.createElement('li');
            listItem.textContent = `${month}: New Users - ${newUsers}`; 

            listElement.appendChild(listItem);
        }
    }
}

window.onload = displayNewUsersFromFiles;
