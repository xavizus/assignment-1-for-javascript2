import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';

document.addEventListener("DOMContentLoaded", customerOverview);

async function customerOverview() {
    let testUserName = "admin";
    let testPassword = "password";

    loading();
    let userId = await api.getUserIdByFirstNameAndLastName(Settings.url + Settings.user, testUserName, testPassword);
    let currentUser = new User(userId);
    await currentUser.getUserData();
    await currentUser.getCustomers();
    await currentUser.getCustomerComments(userId);
    loading(false);

    buildTable(currentUser);
}


function buildTable(user) {
    let table = `
    <table>
    `;

    table += `
    <tr>
        <th>
            Name
        </th>

        <th>
            Company
        </th>

        <th>
            E-mail
        </th>
        <th>
            Phone
        </th>
        <th>
            Hourly price
        </th>
        <th>
            Latest Comment
        </th>
        <th>
            Last Comment Date
        </th>
    </tr>
    `;

    for (let customer of user.customers) {
        let latestComment = customer.getLatestComment();
        let latestCommentDate = new Date(latestComment.date);
        table += `
        <tr>
            <td>${customer.firstName} ${customer.lastName}</td>
            <td>${customer.company}</td>
            <td>${customer.email}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.hourlyPrice}</td>
            <td>${latestComment.comment}</td>
            <td>${latestCommentDate.toISOString().substring(0, 10)}</td>
        </tr>
        `;

    }
    table += `</table>`;

    document.getElementById("content").insertAdjacentHTML("beforeend", table);
}

function loading(isLoading = true) {
    if (!isLoading) {
        let elements = document.getElementsByClassName("loading");
        for (let element of elements) {
            element.remove();
        }
        return;
    }
    let htmlLoadingIcon = `<div class="lds-ring loading"><div></div><div></div><div></div><div></div></div>`;
    document.getElementById("content").innerHTML = htmlLoadingIcon;
}