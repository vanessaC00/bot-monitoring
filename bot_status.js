window.onload = function () {
    // Automatically send a message when the page loads.
    sendBotTriggerMessage();
};

function sendBotTriggerMessage() {
    window.botpressWebChat.sendEvent({
        type: 'message',
        text: 'Trigger data load',
        channel: 'web'
    });
}


let ellieData = {};
let pistachioData = {};
let studyGuideData = {};
let destinationGuideData = {};

function getEventData() {
    return new Promise((resolve, reject) => {
        window.botpressWebChat.onEvent(
            (event) => {
                if (event.type === 'TRIGGER') {
                    console.log('Received event:', event);
                    try {
                        // ellieData = event.value.elli;
                        // pistachioData = event.value.pistachio;
                        // studyGuideData = event.value.study_guide;
                        // destinationGuideData = event.value.destination_guide;

                        ellieData = event.value.elli || {};
                        pistachioData = event.value.pistachio || {};
                        studyGuideData = event.value.study_guide || {};
                        destinationGuideData = event.value.destination_guide || {};
                        
                        resolve();
                    } catch (error) {
                        reject('Error parsing event data');
                    }
                }
            }, ['TRIGGER']
        );
    });
}

async function processEventData() {
    await getEventData(); 
    console.log('Ellie Bot (after event):', ellieData);
    console.log('Pistachio Bot (after event):', pistachioData);
    console.log('Study Guide (after event):', studyGuideData);
    console.log('Destination Guide (after event):', destinationGuideData);

    document.getElementById('ellie-data').textContent = ellieData.bot_journey ? `Journey: ${ellieData.bot_journey}, Status: ${ellieData.status}` : 'No data available';
    document.getElementById('pistachio-data').textContent = pistachioData.bot_journey ? `Journey: ${pistachioData.bot_journey}, Status: ${pistachioData.status}` : 'No data available';
    document.getElementById('study-guide-data').textContent = studyGuideData.bot_journey ? `Journey: ${studyGuideData.bot_journey}, Status: ${studyGuideData.status}` : 'No data available';
    document.getElementById('destination-guide-data').textContent = destinationGuideData.bot_journey ? `Journey: ${destinationGuideData.bot_journey}, Status: ${destinationGuideData.status}` : 'No data available';

    updateStatusCircle('ellie-status-circle', ellieData.status);
    updateStatusCircle('pistachio-status-circle', pistachioData.status);
    updateStatusCircle('study-guide-status-circle', studyGuideData.status);
    updateStatusCircle('destination-guide-status-circle', destinationGuideData.status);
}

function updateStatusCircle(elementId, status) {
    const element = document.getElementById(elementId).firstElementChild; 
    
    element.classList.remove('bg-success', 'bg-danger', 'bg-dark');

    if (status === 'online') {
        element.classList.add('bg-success');
    } else if (status === 'offline') {
        element.classList.add('bg-danger');
    } else if (status === 'error') {
        element.classList.add('bg-dark'); 
    }
}

processEventData();
