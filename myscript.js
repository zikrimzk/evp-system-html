const homepageSection = document.getElementById('homepage-section');
const manageEventSection = document.getElementById('manage-event-section');
const homepageLink = document.getElementById('homepage');
const manageEventLink = document.getElementById('manage-event-page');
const eventList = document.getElementById('event-list');
const toggleBtn = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-nav');
const nav = document.getElementById('sidebar');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    nav.classList.add('active');
    body.classList.add('nav-open');
});

closeBtn.addEventListener('click', () => {
    nav.classList.remove('active');
    body.classList.remove('nav-open');
});

homepageLink.addEventListener('click', () => {
    homepageSection.style.display = 'block';
    manageEventSection.style.display = 'none';
});

manageEventLink.addEventListener('click', () => {
    homepageSection.style.display = 'none';
    manageEventSection.style.display = 'block';
});

function resetForm() {
    document.getElementById('event-name').value = '';
    document.getElementById('event-venue').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-start-time').value = '';
    document.getElementById('event-end-time').value = '';
}

function addEvent() {
    const name = document.getElementById('event-name').value;
    const venue = document.getElementById('event-venue').value;
    const date = document.getElementById('event-date').value;
    const startTime = document.getElementById('event-start-time').value;
    const endTime = document.getElementById('event-end-time').value;

    if (!name || !venue || !date || !startTime || !endTime)
        return alert("Please fill in all fields !");

    const formattedDate = new Date(date).toLocaleDateString('en-GB');
    const formattedStartTime = formatTime(startTime);
    const formattedEndTime = formatTime(endTime);

    const eventCard = document.createElement('div');
    eventCard.className = 'card';
    eventCard.innerHTML = `
                <div class="card-header">
                    <input type="checkbox" class="checkbox status-checkbox" onchange="handleStatusChange(this)">
                    <h4>${name}</h4>
                    <p>${venue} | ${formattedDate} | ${formattedStartTime} - ${formattedEndTime}</p>
                    <p>Status : <span class="status upcoming">Upcoming</span></p>
                    <button class="btn btn-delete" onclick="this.closest('.card').remove()">Delete Event</button>
                </div>
                <div class="card-body">
                    <input type="text" class="form-control" placeholder="Activity Name">
                    <input type="time" class="form-control" placeholder="Activity Time">
                    <button class="btn btn-add" onclick="addActivity(this)">Add Activity</button>
                    <div class="activity-list"></div>
                </div>
            `;

    eventList.appendChild(eventCard);
    resetForm();
}

function handleStatusChange(checkbox) {
    const card = checkbox.closest('.card');
    const statusSpan = card.querySelector('.status');
    const activitySection = card.querySelector('.card-body');

    if (checkbox.checked) {
        const confirmComplete = confirm("Are you sure you want to mark this event as completed?");
        if (confirmComplete) {
            statusSpan.textContent = "Completed";
            statusSpan.classList.add("completed");
            statusSpan.classList.remove("upcoming");
            activitySection.style.display = "none";
        } else {
            checkbox.checked = false;
        }
    } else {
        statusSpan.textContent = "Upcoming";
        statusSpan.classList.remove("completed");
        statusSpan.classList.add("upcoming");
        activitySection.style.display = "block";
    }
}

function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

function addActivity(button) {
    const cardBody = button.closest('.card-body');
    const nameInput = cardBody.querySelector('input[type="text"]');
    const timeInput = cardBody.querySelector('input[type="time"]');
    const activityList = cardBody.querySelector('.activity-list');

    const name = nameInput.value.trim();
    const time = timeInput.value;

    if (!name || !time) return alert("Please fill in activity name and time");

    const timeline = document.createElement('div');
    timeline.className = 'timeline-card';
    timeline.innerHTML = `
                <div class="timeline-time">${formatTime(time)}</div>
                <div class="timeline-details">
                    <div class="timeline-title">${name}</div>
                </div>
                <button class="timeline-delete-btn" onclick="this.closest('.timeline-card').remove()" title="Delete Activity">
                    &#10005;
                </button>
            `;

    activityList.appendChild(timeline);
    nameInput.value = '';
    timeInput.value = '';
}