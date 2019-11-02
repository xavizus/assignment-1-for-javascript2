import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
export { Reminder as default };

/* Skriven av Robin */

class Reminder {
    constructor(id, userId, date, description, content, checked) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.description = description;
        this.content = content;
        this.checked = checked
    }

    async loadEventData(userId, i, events) {
        let data = events;
        this.id = data[i].id;
        this.userId = userId
        this.date = data[i].date;
        this.description = data[i].description;
        this.content = data[i].content;
        this.checked = data[i].checked;
        console.log(this.checked);
    }

    async getEvents() {
        let newDate = new Date();
        let currentDate = newDate.toISOString().substring(0, 10);
        let currentDateMil = newDate.getTime();
        let thisDate = new Date();
        thisDate.setTime(Date.parse(this.date));
        let thisDateMil = thisDate.getTime();
        console.log(thisDateMil);
        console.log(currentDateMil);
        console.log(this.content);

        if (thisDate.toISOString().substring(0, 10) == currentDate || currentDateMil > thisDateMil) {            

            if (this.checked == false) {
                let updateEventObject = {
                    checked: true
                };
                api.updateData(`http://5dad9e39c7e88c0014aa2cda.mockapi.io/api/users/1/events/${this.id}`, updateEventObject);
                alert(this.description + "\n" + this.content);
            }
        }
    }

}