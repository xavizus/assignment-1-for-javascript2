import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';

document.addEventListener("DOMContentLoaded", customerOverview);

async function customerOverview() {
    let testUserName = "admin";
    let testPassword = "password";

    let userId = await api.getUserIdByFirstNameAndLastName(Settings.url + Settings.user, testUserName, testPassword);
    console.log(userId);
    let currentUser = new User(userId);
    await currentUser.getUserData();
    await currentUser.getCustomers();
    await currentUser.getCustomerComments(userId);
}