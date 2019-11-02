import * as api from '../customFunctions/api.js';
import Settings from './settings.js';
import Comment from './comments.js';
export { Customer as default };

class Customer {
    constructor(newCustomer) {
        if(newCustomer == undefined) {
            this.id = null;
            this.firstName = null;
            this.lastName = null;
            this.company = null;
            this.email = null;
            this.phoneNumber = null;
            this.hourlyPrice = null;
        } else {
            this.id = newCustomer.id;
            this.firstName = newCustomer.firstName;
            this.lastName = newCustomer.lastName;
            this.company = newCustomer.company;
            this.email = newCustomer.mail || newCustomer.email;
            this.phoneNumber = newCustomer.phone || newCustomer.phoneNumber;
            this.hourlyPrice = newCustomer.hourPrice || newCustomer.hourlyPrice;

            if(newCustomer.listOfCommunications == undefined || newCustomer.latestComment == undefined)   {
                this.listOfCommunications = [];
                this.latestComment = {
                    date: null,
                    comment: null
             };
            }
            else {
                this.listOfCommunications = newCustomer.listOfCommunications;
                this.latestComment = newCustomer.latestComment;
            }
        }

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
        this.getLatestComment();
        this.sortCommentList();
    }

    sortCommentList() {
        this.listOfCommunications.sort((a, b) => {
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

        if (this.listOfCommunications[latestCommentIndex] === undefined) {
            this.listOfCommunications[latestCommentIndex] = {
                comment: "No comments exists",
                date: null
            };
        }
        this.latestComment.date = this.listOfCommunications[latestCommentIndex].date;

        this.latestComment.comment = this.listOfCommunications[latestCommentIndex].comment;

        return this.listOfCommunications[latestCommentIndex];
    }
}