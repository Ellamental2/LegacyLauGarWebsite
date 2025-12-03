// Define the training plan as a dictionary
const trainingPlan = {
    0: "Walks and Sets",
    1: "Hand Blocks and Kick Blocks",
    2: "Stick and Knife Defense",
    3: "Kicks/Punches and Sets",
    4: "Conditioning and Sparring",
    5: "Hand Blocks and Kick Blocks",
    6: "Sets and Applications",
    7: "Walks, Knife and Stick Defense",
    8: "Kicks/Punches and Sparring",
    9: "Open Lesson",
};

// Define special weeks
const specialWeeks = {
    //"dd/MM/yyyy": "Open Session - Swords and Sticks",
    // Add more special dates if needed.
    "08/12/2025": "Open Lesson",
    "09/12/2025": "Christmas Meal",
    "15/12/2025": "No Class - Holiday Break",
    "22/12/2025": "No Class - Holiday Break",
    "29/12/2025": "No Class - Holiday Break",
};

const otherEvents = [ //UK date format dd/MM/yyyy
    { date: new Date("2026-01-18"), description: "Anatomy and Physiology. 9am - 1pm" , endDate: null},
    { date: new Date("2026-01-26"), description: "Brown Sash Course 1. 11am - 3pm" , endDate: null},
    { date: new Date("2026-02-26"), description: "Brown Sash Course 2. 11am - 3pm" , endDate: null},
    { date: new Date("2026-03-08"), description: "First Aid. 10am - 5pm" , endDate: null},
    { date: new Date("2026-03-26"), description: "Coaching 1. 9am - 1pm" , endDate: null},
    { date: new Date("2026-04-26"), description: "Lau Family Training Weekend" , endDate: new Date("2026-04-28")},
];

// Define the seed date and starting week number
const seedDate = "05/01/2026"; // UK format: DD/MM/YYYY
const seedWeek = 0; // Define the starting week number here

// Function to calculate the next N Tuesdays based on the current date
function calculateTrainingSessions(seedDate, seedWeek, count) {
    const nextMondays = [];

    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    let sessionWeek = seedWeek;
    // Parse UK format date (DD/MM/YYYY)
    const [day, month, year] = seedDate.split('/');
    let sessionDate = new Date(year, month - 1, day);

    const timeDifference = currentDate.getTime() - sessionDate.getTime();

    //calculate number of weeks difference (-1 just incase today is tuesday)
    const weekDifference = Math.floor(timeDifference / (1000 * 3600 * 24 * 7)) -1;
    // Handle negative modulo properly for JavaScript
    sessionWeek = ((seedWeek + weekDifference) % 10 + 10) % 10;
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
            sessionWeek = (sessionWeek + 1) % 10; // Increment week counter to keep rotation aligned
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

    const nextSessions = calculateTrainingSessions(seedDate, seedWeek, 5);

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
