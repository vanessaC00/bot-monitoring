
//Function to fetch a JSON file and return its data
async function fetchJSONFile(fileName) {
    try {
    const response = await fetch(fileName);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${fileName}`);
    }

    const data = await response.json();
    console.log(data);
    
    return data;

    } catch (error) {
    console.error('Error fetching or processing data:', error);
    return null; 
    }
}// end fetchJSONFile()

function getMonthName(dateString) {
    const date = new Date(dateString);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[date.getUTCMonth()]; 
}// end getMonthName()

document.getElementById('monthSelector').addEventListener('change', function() {
    displayNewUsersFromFiles(this.value);
});

async function displayNewUsersFromFiles(selectedMonth) {
    const files = ['json_data/pistachioJune.json','json_data/pistachioJuly.json','json_data/pistachioAugust.json','json_data/pistachioSeptember.json','json_data/pistachioOctober.json']; 
    //const listElement = document.getElementById('pistachioList'); 
    const listElement = document.getElementById('monthList'); 
    const totalUsersElement = document.getElementById('totalUsers');
    listElement.innerHTML = '';

    let totalNewUsers = 0;
    let dataFound = false; 
    
    for (const file of files) {
    const data = await fetchJSONFile(file);

        if (data) {

            const month = getMonthName(data.startDateTimeUtc);

            if (!selectedMonth || selectedMonth === month) {
                const newUsers = data.newUsers;
                totalNewUsers += newUsers;

                const listItem = document.createElement('li');
               // const monthItem = document.createElement('li');
                listItem.innerHTML = `<strong>${month}</strong>: New Users - <strong>${newUsers}</strong>`;
                listElement.appendChild(listItem);
                dataFound = true;
            }
            // const newUsers = data.newUsers;

            // const month = getMonthName(data.startDateTimeUtc); 

            // const listItem = document.createElement('li');
            // listItem.textContent = `${month}: New Users - ${newUsers}`; 

            // listElement.appendChild(listItem);
        }
    }

    totalUsersElement.textContent = totalNewUsers;

    if (!dataFound) {
        const noDataItem = document.createElement('li');
        noDataItem.textContent = 'No data available for this month';
        listElement.appendChild(noDataItem);
    }
}// end displayNewUsersFromFiles()

// window.onload = displayNewUsersFromFiles;
window.addEventListener('load', displayNewUsersFromFiles);
window.addEventListener('load', function() {
    sendBotTriggerMessage();
});

function sendBotTriggerMessage() {
    window.botpressWebChat.sendEvent({
        type: 'message',
        text: 'Trigger data load',
        channel: 'web'
    });
}// end sendBotTriggerMessage()