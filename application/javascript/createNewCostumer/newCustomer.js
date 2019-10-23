//skapa en add new customers -knapp
//göra en eventhandler där jag har bakat in en funktion
//skapa input-element
//skapa en OK-knapp med en eventhandler

//skriv om allt som html-kod, lägg in det i en variabel. Använd sedan insertHTML-grejen på den variabeln.

import * as api from "../customFunctions/api.js"

window.addEventListener('DOMContentLoaded', (event) => {
    let btn = document.createElement("button");
    btn.setAttribute("id", "addNewCustomer");
    let btnText = document.createTextNode("Create a new customer");
    btn.appendChild(btnText);
    document.getElementById("content").appendChild(btn);

    let addNewCustomer = document.getElementById("addNewCustomer");

    addNewCustomer.addEventListener("click", function () {
        
        function buildForm() {
            let form = `
                <form>
                    <input type="text" id="firstName" placeholder="Firstname" value="firstname">
                    <br>
                    <input type="text" id="lastName" placeholder="Lastname" value="lastname">
                    <br>
                    <input type="text" id="company" placeholder="Company" value="companyname">
                    <br>
                    <input type="text" id="mail" placeholder="Mail" value="mailen">
                    <br>
                    <input type="text" id="phoneNumber" placeholder="Phone Number" value="nummer">
                    <br>
                    <input type="text" id="hourlyPrice" placeholder="Hourly Price" value="kronor">
                    <br><br>
                    <button id="createBtn">Create</button>
                </form> 
            `
            document.getElementById("content").insertAdjacentHTML("beforeend", form);
        }
        buildForm();
    });
    document.getElementById("content").addEventListener("click",(event)=> {
        event.preventDefault();
        if(event.target.id == "createBtn") {
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
            
            (async (input) => {
                let postNewCustomer = await api.postData("http://5dad9e39c7e88c0014aa2cda.mockapi.io/api/users/1/customers", input);
                console.log(postNewCustomer);
            })(newCustomer);
            
        }
    });
});


// let linebreak = document.createElement("br");
        // let firstName = document.createElement("input");
        // firstName.setAttribute("id", "firstNameInput");
        // firstName.setAttribute("class", "inputClass");
        // let lastName = document.createElement("input");
        // lastName.setAttribute("id", "lastNameInput");
        // lastName.setAttribute("class", "inputClass");
        // let company = document.createElement("input");
        // company.setAttribute("id", "companyInput");
        // company.setAttribute("class", "inputClass");
        // let mail = document.createElement("input");
        // mail.setAttribute("id", "mailInput");
        // mail.setAttribute("class", "inputClass");
        // let phone = document.createElement("input");
        // phone.setAttribute("id", "phoneInput");
        // phone.setAttribute("class", "inputClass");
        // let hourPrice = document.createElement("input");
        // hourPrice.setAttribute("id", "hourPriceInput");
        // hourPrice.setAttribute("class", "inputClass");
        // let btn2 = document.createElement("button");
        // btn2.setAttribute("id", "addNewCustomerBtn");
        
        // document.getElementById("content").appendChild(firstName);
        // document.getElementById("content").appendChild(linebreak);
        // document.getElementById("content").appendChild(lastName);
        // document.getElementById("content").appendChild(company);
        // document.getElementById("content").appendChild(phone);
        // document.getElementById("content").appendChild(hourPrice);
        // document.getElementById("content").appendChild(btn2);

//--------------------------------------------
// function buildTable(user) {
//     let table = `
//     <table>
//     `;

//     table += `
//     <tr>
//         <th>
//             Name
//         </th>

//         <th>
//             Company
//         </th>

//         <th>
//             E-mail
//         </th>
//         <th>
//             Phone
//         </th>
//         <th>
//             Hourly price
//         </th>
//         <th>
//             Latest Comment
//         </th>
//         <th>
//             Last Comment Date
//         </th>
//     </tr>
//     `;

//     for (let customer of user.customers) {
//         let latestComment = customer.getLatestComment();
//         let latestCommentDate = new Date(latestComment.date);
//         table += `
//         <tr>
//             <td>${customer.firstName} ${customer.lastName}</td>
//             <td>${customer.company}</td>
//             <td>${customer.email}</td>
//             <td>${customer.phoneNumber}</td>
//             <td>${customer.hourlyPrice}</td>
//             <td>${latestComment.comment}</td>
//             <td>${latestCommentDate.toISOString().substring(0, 10)}</td>
//         </tr>
//         `;

//     }
//     table += `</table>`;

//     document.getElementById("content").insertAdjacentHTML("beforeend", table);
// }






// "id": "1",
// "userId": "1",
// "firstName": "firstName 1",
// "lastName": "lastName 1",
// "company": "company 1",
// "mail": "mail 1",
// "phone": "phone 1",
// "hourPrice": "hourPrice 1"