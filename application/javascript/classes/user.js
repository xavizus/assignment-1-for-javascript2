import Settings from './settings.js';
import * as api from '../customFunctions/api.js'
import Customer from './customer.js';
export { User as default };

class User {
    constructor(userId, cachedData = null) {
        this.id = userId;
        this.customers = [];
        if(cachedData == null) {
            this.firstName = "";
            this.lastName = "";
            this.userName = "";
        }
        else {
            this.firstName = cachedData.firstName;
            this.lastName = cachedData.lastName;
            this.userName = cachedData.userName;
            for(let customer of cachedData.customers) {
                this.customers.push(new Customer(customer));
            }
        }
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
            this.customers.push(new Customer(customer));

        }
    }

    async getCustomerComments() {
        await Promise.all(this.customers.map (async customer => {
            await customer.getCommentsForCustomer(this.id);
        }));
        this.sortCustomers();
    }

    sortCustomers() {
        this.customers.sort((a, b) => {
            return new Date(a.latestComment.date) < new Date(b.latestComment.date);
        });
    }

}