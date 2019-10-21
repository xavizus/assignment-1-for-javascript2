import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';

document.addEventListener("DOMContentLoaded", customerOverview);

async function customerOverview() {
    let testUserName = "admin";
    let testPassword = "password";

    let userId = await api.getUserIdByFirstNameAndLastName(Settings.url+'users',testUserName,testPassword);
    
    let currentUser = new User(userId);
    await currentUser.getUserData();
    await currentUser.getCustomers();

    console.log(currentUser);
}