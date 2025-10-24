// Define the training plan as a dictionary
const trainingPlan = {
    1: "Walks and Sets",
    2: "Hand Blocks and Kick Blocks",
    3: "Stick and Knife Defense",
    4: "Kicks/Punches and Sets",
    5: "Conditioning and Sparring",
    6: "Hand Blocks and Kick Blocks",
    7: "Sets and Applications",
    8: "Walks, Knife and Stick Defense",
    9: "Kicks/Punches and Sparring",
    0: "Open Lesson",
};

// Define special weeks
const specialWeeks = {
    //"dd/MM/yyyy": "Open Session - Swords and Sticks",
    // Add more special dates if needed.
    "17/11/2025": "No Class"
};

const otherEvents = [ //american date format mm/dd/yyyy
    { date: new Date("11/23/2025"), description: "Instructor's Workshop. 11am - 3pm" , endDate: null},
];

// Define the seed date and starting week number
const seedDate = "10/20/2025"; // Define your seed date here american date format mm/dd/yyyy
const seedWeek = 1; // Define the starting week number here

// Function to calculate the next N Tuesdays based on the current date
function calculateTrainingSessions(seedDate, seedWeek, count) {
    const nextMondays = [];

    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    let sessionWeek = seedWeek;
    let sessionDate = new Date(seedDate);

    const timeDifference = currentDate.getTime() - sessionDate.getTime();

    //calculate number of weeks difference (-1 just incase today is tuesday)
    const weekDifference = Math.floor(timeDifference / (1000 * 3600 * 24 * 7)) -1;
    sessionWeek = (sessionWeek + weekDifference) % 10;
    sessionDate.setDate(sessionDate.getDate() + (weekDifference * 7));

    while (nextMondays.length < count) {
        //find if the sessiondate is a special week
        if (sessionDate.getDay() !== 1) //check that it is getting a monday if not move to the next loop
        {
            sessionDate.setDate(sessionDate.getDate() + 1);
            continue;
        }

        if (sessionDate < currentDate) {            
            sessionDate.setDate(sessionDate.getDate() + 7);
            sessionWeek = (sessionWeek + 1) % 10;
            //move to the next loop
            continue;
        }

        const dateString = sessionDate.toLocaleDateString('en-GB');

        

        //check for special weeks
        if (specialWeeks[dateString])
        {
            nextMondays.push({ date: new Date(sessionDate), session: specialWeeks[dateString]});
            sessionDate.setDate(sessionDate.getDate() + 7); //increment session date
        }
        else
        {
            nextMondays.push({ date: new Date(sessionDate), session: trainingPlan[sessionWeek]});
            //increment sessionweek and sessionDate
            sessionDate.setDate(sessionDate.getDate() + 7);
            sessionWeek = (sessionWeek + 1) % 10;
        }
    }

    return nextMondays;
}

// Call the function to calculate and update the training sessions when the page loads
window.addEventListener('load', () => {
    const sessionsContainer = document.querySelector(".sessionsContainer");
    sessionsContainer.innerHTML = ''; // Clear the existing content

    const nextSessions = calculateTrainingSessions(new Date(seedDate), seedWeek, 5);

    const table = document.createElement('table');
    table.classList.add('sessions-table');

    nextSessions.forEach((session) => {
        const row = table.insertRow();
        const dateCell = row.insertCell(0);
        const eventCell = row.insertCell(1);

        dateCell.textContent = session.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        eventCell.textContent = session.session;
    });

    sessionsContainer.appendChild(table);

    const eventsContainer = document.querySelector(".eventsContainer");

    const eventTable = document.createElement('table');
    eventTable.classList.add('sessions-table');
    otherEvents.sort((a,b) => a.date - b.date);
    let eventCount = 0;

    otherEvents.forEach((event) => {
        if (eventCount >= 5) return; //only show the next 5 events    
        if (event.date < new Date()) return;
        const row = eventTable.insertRow();
        const dateCell = row.insertCell(0);
        const eventCell = row.insertCell(1);

        dateCell.textContent = event.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        eventCell.textContent = event.description;

        eventCount++;
    });

    eventsContainer.appendChild(eventTable);
});
