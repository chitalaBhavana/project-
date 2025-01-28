class Event {
    constructor(name, startTime, endTime) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}

class EventScheduler {
    constructor() {
        this.events = [];
    }

    addEvent(event) {
        this.events.push(event);
        this.events.sort((a, b) => a.startTime.localeCompare(b.startTime));
        return this.checkConflicts();
    }

    checkConflicts() {
        const conflicts = [];
        for (let i = 0; i < this.events.length - 1; i++) {
            if (this.events[i].endTime > this.events[i + 1].startTime) {
                conflicts.push({
                    event1: this.events[i],
                    event2: this.events[i + 1]
                });
            }
        }
        return conflicts;
    }
}

const scheduler = new EventScheduler();

document.getElementById('eventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('eventName').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (startTime >= endTime) {
        alert('End time must be after start time');
        return;
    }

    const event = new Event(name, startTime, endTime);
    const conflicts = scheduler.addEvent(event);
    
    updateEventList();
    updateConflictList(conflicts);
    
    this.reset();
});

function updateEventList() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';
    
    scheduler.events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-item';
        eventDiv.textContent = `${event.name}: ${formatTime(event.startTime)} - ${formatTime(event.endTime)}`;
        eventList.appendChild(eventDiv);
    });
}

function updateConflictList(conflicts) {
    const conflictList = document.getElementById('conflictList');
    conflictList.innerHTML = '';
    
    conflicts.forEach(conflict => {
        const conflictDiv = document.createElement('div');
        conflictDiv.className = 'conflict-item';
        conflictDiv.textContent = `Conflict between "${conflict.event1.name}" and "${conflict.event2.name}"`;
        conflictList.appendChild(conflictDiv);
    });
}

function formatTime(time) {
    return time.slice(0, 5); // Format HH:MM
}