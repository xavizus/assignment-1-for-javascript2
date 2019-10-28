/**
 * Skriven av Stephan Ljungros
 */
import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';
import Customer from './classes/customer.js';
import Reminder from './classes/events.js';

document.addEventListener("DOMContentLoaded", customerOverview);

async function customerOverview() {
    addEventListenerOnNavbar();
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

    var elements = document.getElementsByClassName('clickAble');

    for (let element of elements) {
        element.addEventListener("click", (event) => {
            let customerId = event.target.parentNode.attributes.data.nodeValue;
            viewCustomerCard(customerId, userId);
        });
    }

    /**
     * Skriven av Robin
     */
    let allEvents = [];
    let events = await api.default(Settings.url + Settings.user + userId + '/' + Settings.event);
    for (let i = 1; i < events.length + 1; i++) {
        let eventObj = new Reminder();
        await eventObj.loadEventData(userId, i);
        allEvents.push(eventObj);

    }

    for (let i = 0; i < allEvents.length; i++) {
        allEvents[i].getEvents();
    }

    //Slut av skriven av Robin.
}


function addEventListenerOnNavbar() {
    document.getElementById("home-icon").addEventListener("click", customerOverview);
}

/**
 * Skriven av Stephan Ljungros
 * @param {*} user 
 */

function buildTable(user) {
    let table = `
    <div id="overviewTable">
    <table class="table table-hover table-striped table-sm">
    `;

    table += `
    <thead class="sticky-header">
    <tr>
        <th scope="col">
            Name
        </th>

        <th scope="col">
            Company
        </th>

        <th scope="col">
            E-mail
        </th>
        <th scope="col">
            Phone
        </th>
        <th scope="col">
            Hourly price
        </th>
        <th scope="col">
            Latest Comment
        </th>
        <th scope="col">
            Last Comment Date
        </th>
    </tr>
    </thead>
    `;

    for (let customer of user.customers) {
        let latestComment = customer.getLatestComment();
        if (latestComment === undefined) {
            latestComment = {
                comment: "No comments exists",
                date: new Date()
            };
        }

        let latestCommentDate = new Date(latestComment.date);

        table += `
        <tr class="clickAble" data="${customer.id}">
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
    table += `</table> </div>`;

    document.getElementById("customerOverview").insertAdjacentHTML("afterbegin", table);
}

async function viewCustomerCard(idOfCustomer, idOfUser) {
    loading();
    let customer = new Customer(idOfCustomer);
    await customer.loadCustomerData(idOfUser);
    loading(false);

    let table = `
    <table class="table table-striped table-sm">
    `;

    table += `
    <tr>
        <td>Name</td>
        <td>${customer.firstName} ${customer.lastName}</td>
    </tr>
    <tr>
        <td>Company</td>
        <td>${customer.company}</td>
        </tr>
    <tr>
        <td>E-mail</td>
        <td>${customer.email}</td>
        </tr>
    <tr>
        <td>Phone</td>
        <td>${customer.phoneNumber}</td>
        </tr>
    <tr>
        <td>Price</td>
        <td>${customer.hourlyPrice}</td>
    </tr>
    `;

    table += `</table>`;

    document.getElementById("customerOverview").innerHTML = table;

    let commentsTable = `
        <h2>Comments</h2>
        <table class="table table-striped table-sm">
            <thead class="sticky-header">
                <tr>
                    <th>Comment</th>
                    <th>Created date</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let commentData of customer.listOfCommunications) {
        let commentDate = new Date(commentData.date);
        commentsTable += `
            <tr>
                <td>${commentData.comment}</td>
                <td>${commentDate.toISOString().substring(0, 10)}</td>
            </tr>
        `;
    }

    commentsTable += `</tbody></table>`;

    document.getElementById("customerOverview").insertAdjacentHTML("beforeend", commentsTable);
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
    document.getElementById("customerOverview").innerHTML = htmlLoadingIcon;
}

/**
 * Slut av skriven av Stephan Ljungros
 */


/**
 * Skriven av Patrik Johansson
 */
function addCustomer() {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let company = document.getElementById("company").value;
    let mail = document.getElementById("mail").value;
    let phone = document.getElementById("phoneNumber").value;
    let hourprice = document.getElementById("hourlyPrice").value;

    console.log(firstName + " " + lastName + " " + company + " " + mail + " " + phone + " " + hourprice);

    let newCustomer = {
        firstName: firstName,
        lastName: lastName,
        company: company,
        mail: mail,
        phone: phone,
        hourPrice: hourprice
    };

    (async(input) => {
        let postNewCustomer = await api.postData("http://5dad9e39c7e88c0014aa2cda.mockapi.io/api/users/1/customers", input);
        console.log(postNewCustomer);
        customerOverview();
    })(newCustomer);
}

window.addEventListener('DOMContentLoaded', (event) => {

    let addNewCustomerDiv = document.createElement("div");
    addNewCustomerDiv.setAttribute("id", "addNewCustomerDiv");
    document.getElementById("content").insertAdjacentElement("beforeend", addNewCustomerDiv);
    let btn = document.createElement("button");
    btn.setAttribute("id", "addNewCustomer");
    let btnText = document.createTextNode("+");
    btn.appendChild(btnText);
    document.getElementById("addNewCustomerDiv").appendChild(btn);

    let addNewCustomer = document.getElementById("addNewCustomer");

    function buildForm() {
        let form = `
            <form id="newCustomer" class="needs-validation" novalidate>
                <input type="text" id="firstName" class="form-control" placeholder="Firstname" required>
                <div class="invalid-feedback">
                    Ange ett förnamn
                </div>
                <input type="text" id="lastName" class="form-control" placeholder="Lastname" required>
                <div class="invalid-feedback">
                    Ange ett efternamn
                </div>
                <input type="text" id="company" class="form-control" placeholder="Company" required>
                <div class="invalid-feedback">
                    Ange ett företagsnamn
                </div>
                <input type="text" id="mail" class="form-control" placeholder="Mail" required>
                <div class="invalid-feedback">
                    Ange kundens mail-adress
                </div>
                <input type="text" id="phoneNumber" class="form-control" placeholder="Phone Number" required>
                <div class="invalid-feedback">
                    Ange kundens telefonnummer
                </div>
                <input type="text" id="hourlyPrice" class="form-control" placeholder="Hourly Price" required>
                <div class="invalid-feedback">
                    Ange tim-pris mot kunden.
                </div>
                <button id="createBtn">Add</button>
            </form> 
        `
        document.getElementById("addNewCustomerDiv").insertAdjacentHTML("beforeend", form);
    }


    addNewCustomer.addEventListener("click", function(event) {
        document.getElementById(event.target.id).disabled = "true"; //förebygger så inte man kan trycka på add new customer -knappen flera gånger
        buildForm();
        document.getElementById("addNewCustomerDiv").style.backgroundColor = "#0A5990";
        document.getElementById("addNewCustomer").style.visibility = "hidden";
        document.getElementById("addNewCustomer").style.position = "absolute";
    });
    document.getElementById("content").addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.id == "createBtn") {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                if (form.checkValidity() === true) {
                    addCustomer();
                }
                form.classList.add('was-validated');
            }, false);
        }
    });


});