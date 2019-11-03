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

    // Loads class object data
    async loadEventData(userId, i, events) {
        let data = events;
        this.id = data[i].id;
        this.userId = userId
        this.date = data[i].date;
        this.description = data[i].description;
        this.content = data[i].content;
        this.checked = data[i].checked;
    }

    // Gets the API data stored in object
    async getEvents(mymodal) {
        let newDate = new Date();
        let currentDate = newDate.toISOString().substring(0, 10);
        let currentDateMil = newDate.getTime();
        let thisDate = new Date();
        thisDate.setTime(Date.parse(this.date));
        let thisDateMil = thisDate.getTime();
        // Checks if reminders are due at current date or has been due
        if (thisDate.toISOString().substring(0, 10) == currentDate || currentDateMil > thisDateMil) {            

            if (this.checked == false && mymodal.className != "modal fade show") {
                
                let updateEventObject = {
                    checked: true
                };
                api.updateData(`http://5dad9e39c7e88c0014aa2cda.mockapi.io/api/users/1/events/${this.id}`, updateEventObject);

                let newModal = `<div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Title: ${this.description}</h4>
                </div>
                <div class="modal-header">
                    <h4 class="modal-title">Duedate: ${thisDate.toISOString().substring(0, 10)}</h4>
                </div>
                <div class="modal-body">
                    <h5 class="modal-title">Reminder:</h5>
                    <p>${this.content}</p>
                </div>
            </div>`

                document.getElementById("modal-header").insertAdjacentHTML("afterend", newModal);
                $('#mymodal').modal(focus);
                
            }
        }
    }

}