import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
import Comment from './comments.js';
export { Customer as default };

class Customer {
    constructor(id, firstName, lastName = null, company = null, email = null, phonenumber = null, hourlyPrice = 0, listOfCommunications = null) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.email = email;
        this.phoneNumber = phonenumber;
        this.hourlyPrice = hourlyPrice;
        this.listOfCommunications = [];
    }

    async loadCustomerData(userId) {
        await this.getCommentsForCustomer(userId);
        let data = await api.getData(Settings.url + Settings.user + userId + '/' + Settings.customer + this.id);
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.company = data.company;
        this.email = data.mail;
        this.phoneNumber = data.phone;
        this.hourlyPrice = data.hourPrice;
    }

    async getCommentsForCustomer(userId) {
        let customersComments = await api.getData(Settings.url + Settings.user + userId + '/' + Settings.customer + this.id + '/' + Settings.comment);
        for (let customersComment of customersComments) {
            this.listOfCommunications.push(new Comment(customersComment));
        }

        this.sortCommentList();
    }

    sortCommentList() {
        this.listOfCommunications.sort(function(a, b) {
            return new Date(a.date) < new Date(b.date);
        });
    }

    getLatestComment() {
        let latestCommentIndex = 0;
        let largestDate = 0;
        for (let comment in this.listOfCommunications) {
            if (this.listOfCommunications[comment].date > largestDate) {
                largestDate = this.listOfCommunications[comment].date;
                latestCommentIndex = comment;
            }
        }

        return this.listOfCommunications[latestCommentIndex];
    }
}