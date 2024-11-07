// first call the api here
const dataRecord = []
// botIds = lead-gen-luca-uat and lead-gen-new-elli and qs ranking support
const botIds = ['a4acca45-aa89-4340-996f-e12b79cb2ab9', 'b73aeb28-640f-48a6-9b1f-46d84fc02e70','e036b5c1-6c4b-474f-80ec-985795748f01']
const YOUR_WORKSPACE_ID = "wkspace_01HMAJW0RD0NBS3N9MEDM111JF"  
const YOUR_PERSONAL_ACCESS_TOKEN = "bp_pat_dJS04K28LMhVf2gseZpKQIDq1bL0PqU9RJIc"  

const baseUrl = `https://api.botpress.cloud/v1/admin/bots`;
params = {
    'startDate': '2024-01-01',  
    'endDate': new Date().toISOString().split('T')[0]    
}

headers = {
    'Authorization': `Bearer bp_pat_dJS04K28LMhVf2gseZpKQIDq1bL0PqU9RJIc`, 
    'x-workspace-id': 'wkspace_01HMAJW0RD0NBS3N9MEDM111JF',
    'Content-Type': 'application/json'
}

function changeDateFormat(dates){
  const date = new Date(dates);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-US', options);
}

async function fetchBotData(bot_id) {
  const queryString = new URLSearchParams(params).toString();
  const fullUrl = `${baseUrl}/${bot_id}/analytics?${queryString}`;
  const response = await fetch(fullUrl, { headers });
  if (!response.ok) throw new Error(`HTTP error for bot ${bot_id}: ${response.status}`);
  const data = await response.json();

  // Add bot_id to each record
  if (Array.isArray(data.records)) {
    data.records.forEach(record => {
      record.bot_id = bot_id; // Attach the bot_id to each record
    });
  } else {
    console.warn(`No records found for bot_id: ${bot_id}`);
  }
  
  return data.records || []; 
}

async function fetchAndDisplayDataForAllBots() {
  try {
    const results = await Promise.all(botIds.map(bot_id => fetchBotData(bot_id)));
    const combinedRecords = results.flatMap(records => (Array.isArray(records) ? records : []));
    
    // Sum up values for the specified month
    let newUsers = 0;
    let returningUsers = 0;
    let userChoseUB = 0;

    combinedRecords.forEach(record => {
      newUsers += record.newUsers || 0;
      returningUsers += record.returningUsers || 0;
      userChoseUB += record.userChoseUB || 0;
    });

    // second set all date and bot name into it 
    combinedRecords.forEach(record => {

      if(record.bot_id == "a4acca45-aa89-4340-996f-e12b79cb2ab9"){
        record.botName = "Pistachio"
      }else if (record.bot_id == "b73aeb28-640f-48a6-9b1f-46d84fc02e70"){
        record.botName = "Elli"
      }else if(record.bot_id == "e036b5c1-6c4b-474f-80ec-985795748f01"){
        record.botName = "Ranking"
      }
      
      record.startDateFormatted = changeDateFormat(record.startDateTimeUtc) + " " + record.botName;
      record.endDateFormatted = changeDateFormat(record.endDateTimeUtc) + " " + record.botName;

      if (record.customEvents && typeof record.customEvents === "object") {
        const transformedCustomEvent = {};
        Object.keys(record.customEvents).forEach(key => {
          let transformedKey = key.toLowerCase(); // Convert key to lowercase
          transformedKey = transformedKey.replace(/\s+/g, "_"); // Replace spaces with underscores
          transformedKey = transformedKey.replace(/#-/g, "hashmin"); // Replace `#` with `hash`
          transformedCustomEvent[transformedKey] = record.customEvents[key]; // Assign value to transformed key
        });
        record.customEvents = transformedCustomEvent; // Replace original customEvent with transformed version
      } else {
        console.warn(`No valid customEvent for record with bot_id: ${record.bot_id}`);
        record.customEvents = {}; // Initialize as an empty object to avoid future errors
      }

      
    });

    dataRecord.push(...combinedRecords);
  } catch (error) {
    console.error('Error fetching data for bots:', error);
  }
}

// fourth set all id same with the value to display it in html
function populateDropdown(dataRecord) {
  const dropdown = document.getElementById("monthSelector");

  dataRecord.forEach(dataRecord => {
    const option = document.createElement("option");
    option.value = dataRecord.startDateFormatted; // Use unique startDateFormatted as the value
    option.textContent = dataRecord.startDateFormatted; // Display the same value as the text
    dropdown.appendChild(option);
  });
}

// Function to display details in the textbox based on the selected month
function updateTextbox(event) {
  const selectedValue = event.target.value; // Get selected value from dropdown
  const textbox = document.querySelector("span")

  console.log("Selected Value:", selectedValue); // Debug: Log the selected value
  console.log("Data Record:", dataRecord); // Debug: Log dataRecord

  // Find the matching record in dataRecord
  const selectedRecord = dataRecord.find(record => record.startDateFormatted === selectedValue);

  if (selectedRecord) {
    console.log("Selected Record:", selectedRecord); // Debug: Log the selected record

    if (document.getElementById("totalUser")) {
      document.getElementById("totalUser").textContent = selectedRecord.newUsers || 0;
      console.log(selectedRecord.newUsers)
    } else if (document.getElementById("studyUser")) {
      document.getElementById("studyUser").textContent = selectedRecord.customEvents.studyone || 0;
    } else if (document.getElementById("destiUser")) {
      document.getElementById("destiUser").textContent = selectedRecord.customEvents.destinationone || 0;
    } else if (document.getElementById("pistaUser")) {
      document.getElementById("pistaUser").textContent = selectedRecord.customEvents.user_chose_ubdp_hashmin1 + selectedRecord.customEvents.user_chose_ubsp_hashmin1 || 0;
    }

  } else {
    console.warn("No matching record found for:", selectedValue);
    textbox.textContent = 0; // Clear textbox if no match is found
  }
}

// Initialize the dropdown and event listener
function init() {
  fetchAndDisplayDataForAllBots();
  populateDropdown(dataRecord); // Populate the dropdown
  const dropdown = document.getElementById('monthSelector');
  if (dropdown) {
    dropdown.addEventListener('change', updateTextbox);
  } else {
    console.error('Dropdown element not found in the DOM.');
  }
}

// Call the init function on page load
init();




