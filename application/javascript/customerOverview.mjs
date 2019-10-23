import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';
import Customer from './classes/customer.js';

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

    var elements = document.getElementsByClassName('clickAble');

    for (let element of elements) {
        element.addEventListener("click", (event) => {
            let customerId = event.target.parentNode.attributes.data.nodeValue;
            viewCustomerCard(customerId, userId);
        });
    }
}


function buildTable(user) {
    let table = `
    <div class="table">
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
    console.log(idOfCustomer);
    let customer = new Customer(idOfCustomer);
    await customer.loadCustomerData(idOfUser);
    loading(false);

    let table = `
    <table>
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
    `

    table += `</table>`;

    document.getElementById("customerOverview").innerHTML = table;
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


window.addEventListener('DOMContentLoaded', (event) => {
    let addNewCustomerDiv = document.createElement("div");
    addNewCustomerDiv.setAttribute("id", "addNewCustomerDiv");
    document.getElementById("content").appendChild(addNewCustomerDiv);
    let btn = document.createElement("button");
    btn.setAttribute("id", "addNewCustomer");
    let btnText = document.createTextNode("+");
    btn.appendChild(btnText);
    document.getElementById("addNewCustomerDiv").appendChild(btn);

    let addNewCustomer = document.getElementById("addNewCustomer");

    addNewCustomer.addEventListener("click", function(event) {
        document.getElementById(event.target.id).disabled = "true"; //förebygger så inte man kan trycka på add new customer -knappen flera gånger
        function buildForm() {
            let form = `
                <form>
                    <input type="text" id="firstName" placeholder="Firstname">
                    <br>
                    <input type="text" id="lastName" placeholder="Lastname">
                    <br>
                    <input type="text" id="company" placeholder="Company">
                    <br>
                    <input type="text" id="mail" placeholder="Mail">
                    <br>
                    <input type="text" id="phoneNumber" placeholder="Phone Number">
                    <br>
                    <input type="text" id="hourlyPrice" placeholder="Hourly Price">
                    <br>
                    <button id="createBtn">Add</button>
                </form> 
            `
            document.getElementById("addNewCustomerDiv").insertAdjacentHTML("beforeend", form);
        }
        buildForm();
        document.getElementById("addNewCustomerDiv").style.backgroundColor = "#0A5990";
        document.getElementById("addNewCustomer").style.visibility = "hidden";
        document.getElementById("addNewCustomer").style.position = "absolute";
    });
    document.getElementById("content").addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.id == "createBtn") {
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
    });
});