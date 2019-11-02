/**
 * Skriven av Stephan Ljungros
 */
import Settings from './classes/settings.js';
import User from './classes/user.js';
import * as api from './customFunctions/api.js';
import Customer from './classes/customer.js';
import Reminder from './classes/events.js';

document.addEventListener("DOMContentLoaded", main);
/**
 * Skriven av Robin
 */

async function events(userId) {

    let allEventsObj = [];
    let allEvents = [];
    let events = await api.default(Settings.url + Settings.user + userId + '/' + Settings.event);
    console.log(events);
    allEvents.push(events);
    for (let i = 0; i < events.length; i++) {
        let eventObj = new Reminder();
        await eventObj.loadEventData(userId, i, events);
        allEventsObj.push(eventObj);
    }

    for (let i = 0; i < allEventsObj.length; i++) {
        allEventsObj[i].getEvents();
    }

}

//Slut av skriven av Robin.

/**
 * Skriven av Stephan Ljungros
 * @param {*} user 
 */

async function main() {
    addEventListenerOnNavbar();

    //No security Risk here!
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
            viewCustomerCard(currentUser.customers, customerId, userId);
        });
    }

    events(userId)
}


function addEventListenerOnNavbar() {
    document.getElementById("home-icon").addEventListener("click", main);
}

function buildTable(user) {
    let table = `
    <div id="overviewTable">
    <table class="table table-hover table-striped table-sm">
    `;

    table += `
    <thead>
    <tr>
        <th scope="col" class="sticky-header">
            Name
        </th>

        <th scope="col" class="sticky-header">
            Company
        </th>

        <th scope="col" class="sticky-header">
            E-mail
        </th>
        <th scope="col" class="sticky-header">
            Phone
        </th>
        <th scope="col" class="sticky-header">
            Hourly price
        </th>
        <th scope="col" class="sticky-header">
            Latest Comment
        </th>
        <th scope="col" class="sticky-header">
            Last Comment Date
        </th>
    </tr>
    </thead>
    `;

    for (let customer of user.customers) {
        let latestComment = customer.getLatestComment();
        
        // Replace date with "--" if no date exisits.
        let latestCommentDate = (latestComment.date != null) ? 
        new Date(latestComment.date).toISOString().substring(0, 10) : 
        "--";

        table += `
        <tr class="clickAble" data="${customer.id}">
            <td>${customer.firstName} ${customer.lastName}</td>
            <td>${customer.company}</td>
            <td>${customer.email}</td>
            <td>${customer.phoneNumber}</td>
            <td>${customer.hourlyPrice}</td>
            <td>${latestComment.comment}</td>
            <td>${latestCommentDate}</td>
        </tr>
        `;

    }
    table += `</table> </div>`;

    if(!document.getElementById("customersOverview")) {
        let customersOverview = document.createElement("div");
        customersOverview.setAttribute("id","customersOverview");
        document.getElementById("content").insertAdjacentElement("beforeend",customersOverview);
    }
    document.getElementById("customersOverview").insertAdjacentHTML("afterbegin", table);
}

async function viewCustomerCard(customers, idOfCustomer, idOfUser) {
    loading();
    let customer = customers.find( (currentCustomer)=> {
        if(currentCustomer.id == idOfCustomer) {
            return currentCustomer;
        }
    });
    loading(false);

    let customerCard = document.createElement("div");
    customerCard.setAttribute("id","customerCard");
    document.getElementById("content").insertAdjacentElement("beforeend",customerCard);

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

    document.getElementById("customerCard").innerHTML = table;

    /**
     * Skriven av Moohammaad
     */

    //Form (Stephan har lagt till tillgänglighets riktlinjer. (Om du missat skriva kommentar så ska det tydligt visas.))
    let commentForm = `
        <form id="addComment" class="needs-validation" novalidate>
            <textarea class="form-control" name="textarea" id="textarea" placeholder="Comment here..." cols="30" rows="10" required></textarea>
            <div class="invalid-feedback">
                    Add a comment!
                </div>
                <div class="valid-feedback">
                   Valid!
                </div>
            <button id="btn" class="btn btn-primary" type="submit" >Add Comment</button>
        </form>

        <h2>Comments</h2>
    `;

    // Add the form to the page.
    document.getElementById("customerCard").insertAdjacentHTML("beforeend", commentForm);

    //Add listener for the click event.
    document.getElementById("content").addEventListener('click', event => {

        //Prevent to reload the webbrowser.
        event.preventDefault();

        // if the target with id is equal to btn.
        if (event.target.id === "btn") {

            //find all forms that need validation. (Probably overkill, when we know it's just one form.)
            let forms = document.getElementsByClassName("needs-validation");

            //Loop through all forms that's found
            for (let form of forms) {

                //Check if the form is filled (checks if required is filled)
                if (form.checkValidity() === true) {

                    //Get data from the textarea.
                    let textarea = document.getElementById("textarea");

                    //Anonumous function that's called directly.
                    (async() => {

                        //Packing our data to an object.
                        let newComment = {
                            name: `${customer.firstName} ${customer.lastName}`,
                            comment: textarea.value,
                            date: new Date()
                        };

                        //Posting data to the api.
                        let postComment = await api.postData(`http://5dad9e39c7e88c0014aa2cda.mockapi.io/api/users/${idOfUser}/customers/${idOfCustomer}/comment`, newComment);

                        //Added by Stephan for reloading the comment list.
                        //Pushing the new comment to our current list.
                        customer.listOfCommunications.push(newComment);
                        //sort the comment list.
                        customer.sortCommentList();
                        //Load our customer comments.
                        loadComments(customer);
                        // End of added code from Stephan.
                    })();
                }

                //This marks the form as validated, which also make sure to inform the user if the user missed to fill something, by making the class invalid-feedback, visible.
                form.classList.add('was-validated');
            }
        }
    });

    loadComments(customer);


}

/**
 * Skriven av Stephan
 */

function loadComments(customer) {

    if (document.getElementById("commentTable")) {
        document.getElementById("commentTable").remove();
    }

    let commentsTable = `
        <table id="commentTable" class="table table-striped table-sm">
            <thead>
                <tr>
                    <th class="sticky-header">Comment</th>
                    <th class="sticky-header">Created date</th>
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

    document.getElementById("customerCard").insertAdjacentHTML("beforeend", commentsTable);
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
        main();
    })(newCustomer);
}

window.addEventListener('DOMContentLoaded', (event) => {

    
    // let btn = document.createElement("button");
    // btn.setAttribute("id", "addNewCustomer");
    // let btnText = document.createTextNode("+");
    // btn.appendChild(btnText);
    // document.getElementById("addNewCustomerDiv").appendChild(btn);

    let addNewCustomer = document.getElementById("customers-icon");

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
        if (event.target.id == "customers-icon") {
            if (!document.getElementById("addNewCustomerDiv")) {
                let addNewCustomerDiv = document.createElement("div");
                addNewCustomerDiv.setAttribute("id", "addNewCustomerDiv");
                document.getElementById("customers-icon").insertAdjacentElement("beforeend", addNewCustomerDiv);
                document.getElementById(event.target.id).disabled = "true"; //förebygger så inte man kan trycka på add new customer -knappen flera gånger
                buildForm();
                document.getElementById("addNewCustomerDiv").style.backgroundColor = "#0A5990";
            } else {
                document.getElementById("addNewCustomerDiv").remove();
            }
        }
    });
    document.getElementById("customers-icon").addEventListener("click", (event) => {
        event.preventDefault();
        if (event.target.id == "createBtn") {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function(form) {
                if (form.checkValidity() === true) {
                    addCustomer();
                    document.getElementById("addNewCustomerDiv").remove();
                }
                form.classList.add('was-validated');
            }, false);
        }
    });
});