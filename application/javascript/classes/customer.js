import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
import Comment from './comments.js';
export { Customer as default };

class Customer {
    constructor(id, firstName, lastName, company, email, phonenumber = null, hourlyPrice = 0, listOfCommunications = null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.email = email;
        this.phonenumber = phonenumber;
        this.hourlyPrice = hourlyPrice;
        this.listOfCommunications = [];
    }

    async getCommentsForCustomer(userId) {
        console.log(Settings.url + Settings.user + userId + '/' + Settings.customer + this.id + '/' + Settings.comment);
        let customersComments = await api.getData(Settings.url + Settings.user + userId + '/' + Settings.customer + this.id + '/' + Settings.comment);
        console.log(customersComments);
        for (let customersComment of customersComments) {
            this.listOfCommunications.push(new Comment(customersComment));
        }
    }
}