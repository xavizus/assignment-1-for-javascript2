import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
export { Reminder as default };

class Reminder {
    constructor(id, userId, date, description, content, checked) {
        this.id = id;
        this.userId = userId;
        this.date = date;
        this.description = description;
        this.content = content;
        this.checked = checked
    }

    async loadEventData(userId, i) {
        let data = await api.getData(Settings.url + Settings.user + userId + '/' + Settings.event + i);
        this.id = data.id;
        this.userId = userId
        this.date = data.date;
        this.description = data.description;
        this.content = data.content;
        this.checked = data.checked;
        console.log(this.checked);
    }

    async getEvents() {
        let data = await api.getData(Settings.url + Settings.user + this.userId + '/' + Settings.event + this.id);
        let newDate = new Date();
        let currentDate = newDate.toISOString().substring(0, 10);
        let currentDateMil = newDate.getTime();
        let thisDate = new Date();
        thisDate.setTime(Date.parse(this.date));
        let thisDateMil = thisDate.getTime();
        console.log(thisDateMil);
        console.log(currentDateMil);
        console.log(this.content)

            if (thisDate.toISOString().substring(0, 10) == currentDate || currentDateMil > thisDateMil) {
                alert(this.content);
                data.checked = true;
            }
        }
    
}