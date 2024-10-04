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
}// end sendBotTriggerMessage()


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
}// end getEventData()

async function processEventData() {
    await getEventData(); 

    const page = window.location.pathname.split('/').pop();

    switch (page) {
        case 'analysis_ellibot.html':
            console.log('Ellie Bot (after event):', ellieData);
            updatePageForEllie();
            break;
        case 'analysis_pistachiobot.html':
            console.log('Pistachio Bot (after event):', pistachioData);
            updatePageForPistachio();
            break;
        case 'analysis_studyguidebot.html':
            console.log('Study Guide (after event):', pistachioData);
            updatePageForStudyGuide();
            break;
        case 'analysis_destinationguidebot.html':
            console.log('Destination Guide (after event):', pistachioData);
            updatePageForDestinationGuide();
            break;
        default:
            console.log('Ellie Bot (after event):', ellieData);
            console.log('Pistachio Bot (after event):', pistachioData);
            console.log('Study Guide (after event):', studyGuideData);
            console.log('Destination Guide (after event):', destinationGuideData);
            updateAll();
            break;
    }
}// end processEventData()


function updateAll() {
    document.getElementById('ellie-data').innerHTML = ellieData.version ? `Version:<br> ${ellieData.version}<br>Latest update:<br> ${ellieData.updatedAt}` : 'No data available';
    document.getElementById('pistachio-data').innerHTML = pistachioData.version ? `Version:<br> ${pistachioData.version}<br>Status:<br> ${pistachioData.status}` : 'No data available';
    document.getElementById('study-guide-data').innerHTML = studyGuideData.version ? `Version:<br> ${studyGuideData.version}<br>Status:<br> ${studyGuideData.status}` : 'No data available';
    document.getElementById('destination-guide-data').innerHTML = destinationGuideData.version ? `Version:<br> ${destinationGuideData.version}<br>Status:<br> ${destinationGuideData.status}` : 'No data available';

    updateStatusCircle('ellie-status-circle', ellieData.status);
    updateStatusCircle('pistachio-status-circle', pistachioData.status);
    updateStatusCircle('study-guide-status-circle', studyGuideData.status);
    updateStatusCircle('destination-guide-status-circle', destinationGuideData.status);

    attachClickEventToStatus('ellie-status-circle', ellieData.status);
    attachClickEventToStatus('pistachio-status-circle', pistachioData.status);
    attachClickEventToStatus('study-guide-status-circle', studyGuideData.status);
    attachClickEventToStatus('destination-guide-status-circle', destinationGuideData.status);
    
    if(ellieData.status === 'offline'){
        alert('Ellie bot is offline!');
        console.log("Ellie")
    }else if(pistachioData.status === 'offline'){
        alert('Pistachio bot is offline!');
        console.log("Pistachio")
    }else if(studyGuideData.status === 'offline'){
        alert('Study Guide bot is offline!');
        console.log("Study Guide")
    }else if(destinationGuideData.status === 'offline'){
        alert('Destination Guide is offline!');
        console.log("Destination Guide")
    }else{
        console.log("nothing happen")
    }
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
}// end updateStatusCircle()

function attachClickEventToStatus(elementId, status) {
    const statusCircle = document.getElementById(elementId);
    
    statusCircle.addEventListener('click', function() {
        openModal(status);
    });
}// end attachClickEventToStatus()

function openModal(status) {
    const modal = document.getElementById('statusModal');
    const statusMessage = document.getElementById('statusMessage');

    if (status === 'online') {
        statusMessage.textContent = 'The bot is currently online.';
    } else if (status === 'offline') {
        statusMessage.textContent = 'The bot is currently offline.';
    } else if (status === 'error') {
        statusMessage.textContent = 'There is an error with the bot.';
    } else {
        statusMessage.textContent = 'It appears that there is no payload for this bot';
    }

    modal.style.display = 'flex';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}// end openModal()

processEventData();
