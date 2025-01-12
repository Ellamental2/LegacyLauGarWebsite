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
    //"05/12/2023": "Open Session - Swords and Sticks",
    // Add more special dates if needed.
    
};

const otherEvents = [ //american date format mm/dd/yyyy
    { date: new Date("01/12/2025"), description: "Anatomy & Physiology (Online). 9am - 1pm" , endDate: null},
    { date: new Date("01/26/2025"), description: "Brown Sash Course. 11am - 3pm" , endDate: null},
    { date: new Date("02/23/2025"), description: "Brown Sash Course. 11am - 3pm" , endDate: null},
    { date: new Date("03/09/2025"), description: "First Aid (with 3 year qualifiaction) 10am - 5pm" , endDate: null},
    { date: new Date("03/23/2025"), description: "1st Coaching Course (Online) 9am - 1pm" , endDate: null},
    { date: new Date("04/04/2025"), description: "Lau Family Training Weekend Lillishall", endDate: new Date("04/05/2025") },
    { date: new Date("10/05/2025"), description: "May 10th - 11th, Ireland", endDate: new Date("11/05/2025") },
    { date: new Date("11/05/2025"), description: "Referee Course (Northampton). 11am - 3pm" , endDate: null},
    { date: new Date("18/05/2025"), description: "Black Sash Grading (all grades). From 10am" , endDate: null},
    { date: new Date("20/07/2025"), description: "Brown Sash Course. 11am - 3pm" , endDate: null},
    { date: new Date("27/07/2025"), description: "Summer Course Llandudno (50th Year Celebration)", endDate: new Date("02/08/2025") },
    { date: new Date("07/09/2025"), description: "Brown Sash Course. 11am - 3pm" , endDate: null},
    { date: new Date("21/09/2025"), description: "Weapons Workshop. 10am - 4pm" , endDate: null},
    { date: new Date("05/10/2025"), description: "2nd Coaching Course (Online) 9am - 1pm" , endDate: null},
    { date: new Date("19/10/2025"), description: "Black Sash Grading (all grades). From 10am" , endDate: null},
    { date: new Date("23/11/2025"), description: "Instructor's Workshop. 11am - 3pm" , endDate: null},
];

// Define the seed date and starting week number
const seedDate = "13/01/2025"; // Define your seed date here american date format mm/dd/yyyy
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

        dateCell.textContent = event.date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
        if (event.endDate != null) dateCell.textContent += " - " + event.endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        eventCell.textContent = event.description;

        eventCount++;
    });

    eventsContainer.appendChild(eventTable);
});
