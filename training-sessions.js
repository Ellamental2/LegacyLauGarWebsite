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
    { date: new Date("01/28/2024"), description:"Brown Sash Course 1, Holy Trinity Academy, Telford. 11am-3pm"},
    { date: new Date("02/11/2024"), description:"Brown Sash Course 2, Holy Trinity Academy, Telford, 11am-3pm"},
    { date: new Date("02/25/2024"), description: "Lau Gar in depth with Grandmaster Yau. Open to all BKFA students and Instructors. Please contact Pete Hornby to book your place. Email: pete_hornby@hotmail.com" },
    { date: new Date("03/03/2024"), description: "First Aid, Holy Trinity Academy, Telford. 10am-5pm"},
    { date: new Date("04/14/2024"), description: "Coaching Course 1, On-line Zoom Class, 9am-1pm"},
    { date: new Date("04/19/2024"), description: "Lau Family Training Weekend, Shropshire. Starts Friday 7pm, ends Sunday 5pm. For bookings and more information contact pete_hornby@hotmail.com. *A few twin rooms are available.  Early booking recommended."},
    { date: new Date("05/16/2024"), description: "Black Sash Grading, Holy Trinity Academy, Telford. From 10am"},
    { date: new Date("07/14/2024"), description: "Brown Sash Course 1, Holy Trinity Academy, Telford. 11am-3pm"},
    { date: new Date("07/28/2024"), description: "BFKA Summer Course, Llandudno. Starts Friday 28th July 10am, ends Saturday 3rd August 1pm. Please contact Pete Hornby to book your place Email: pete_hornby@hotmail.com"},
    { date: new Date("09/08/2024"), description: "Brown Sash Course 2, Holy Trinity Academy, Telford. 11am-3pm"},
    { date: new Date("09/22/2024"), description: "Weapons Workshop, Holy Trinity Academy, Telford. 11am-3pm. Ask Instructors for more details."},
    { date: new Date("10/06/2024"), description: "Coaching Course 2, On-line Zoom Class, 9am-1pm"},
    { date: new Date("10/20/2024"), description: "Black Sash Grading, Holy Trinity Academy, Telford. From 10am"},
    { date: new Date("11/24/2024"), description: "Instructor's Course, Holy Trinity Academy, Telford. 11am-5pm"},
];

// Define the seed date and starting week number
const seedDate = "03/04/2024"; // Define your seed date here american date format mm/dd/yyyy
const seedWeek = 5; // Define the starting week number here

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
        if (eventCount > 5) return; //only show the next 5 events    
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
