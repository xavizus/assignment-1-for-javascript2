import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
export { Event as default };

class Event {
    constructor(id, date, description, content) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.content = content;
    }

    async loadEventData(userId) {
        let data = await api.getData(Settings.url + Settings.user + userId + '/' + Settings.event + this.id);
        this.id = data.id;
        this.date = data.date;
        this.description = data.description;
        this.content = data.content;
    }

    async getEvents() {
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth() + 1;
        let day = "";
        if(day < 10){
            day = "0" + newDate.getDay();
        } else {
            day = newDate.getDay();
        }
        let currentDate = year + "-" + month + "-" + day;

        let events = await api.default(Settings.url + 'users/' + this.id + '/events');
        for (i = 0; i < events.length; i++) {
            if (events[i].date == currentDate) {
                alert(events[i].date);
            }
        }
    }
}