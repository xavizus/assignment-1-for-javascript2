import Settings from './settings.js';
import * as api from '../customFunctions/api.js'
import Customer from './customer.js';
export { User as default };

class User {
    constructor(userId) {
        this.id = userId;
        this.firstName = "";
        this.lastName = "";
        this.userName = "";
        this.customers = [];
    }

    async getUserData() {
        let userdata = await api.default(Settings.url + 'users/' + this.id);
        this.firstName = userdata.firstName;
        this.lastName = userdata.lastName;
        this.userName = userdata.username;
    }

    async getCustomers() {
        let customers = await api.default(Settings.url + 'users/' + this.id + '/customers');
        for (let customer of customers) {
            this.customers.push(new Customer(customer.id, customer.firstName, customer.lastName, customer.company, customer.mail, customer.phone, customer.hourlyPrice));

        }
    }

    async getCustomerComments() {
        for (let customer of this.customers) {
            await customer.getCommentsForCustomer(this.id);
        }
    }

}