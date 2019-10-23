//skapa en add new customers -knapp
//göra en eventhandler där jag har bakat in en funktion
//skapa input-element
//skapa en OK-knapp med en eventhandler

//skriv om allt som html-kod, lägg in det i en variabel. Använd sedan insertHTML-grejen på den variabeln.

window.addEventListener('DOMContentLoaded', (event) => {
    let btn = document.createElement("button");
    btn.setAttribute("id", "addNewCustomer");
    let btnText = document.createTextNode("testarrr");
    btn.appendChild(btnText);
    document.getElementById("content").appendChild(btn);

    let addNewCustomer = document.getElementById("addNewCustomer");

    addNewCustomer.addEventListener("click", function () {
        let linebreak = document.createElement("br");
        let firstName = document.createElement("input");
        firstName.setAttribute("id", "firstNameInput");
        firstName.setAttribute("class", "inputClass");
        let lastName = document.createElement("input");
        lastName.setAttribute("id", "lastNameInput");
        lastName.setAttribute("class", "inputClass");
        let company = document.createElement("input");
        company.setAttribute("id", "companyInput");
        company.setAttribute("class", "inputClass");
        let mail = document.createElement("input");
        mail.setAttribute("id", "mailInput");
        mail.setAttribute("class", "inputClass");
        let phone = document.createElement("input");
        phone.setAttribute("id", "phoneInput");
        phone.setAttribute("class", "inputClass");
        let hourPrice = document.createElement("input");
        hourPrice.setAttribute("id", "hourPriceInput");
        hourPrice.setAttribute("class", "inputClass");
        let btn2 = document.createElement("button");
        btn2.setAttribute("id", "addNewCustomerBtn");
        
        document.getElementById("content").appendChild(linebreak + "<br>");
        document.getElementById("content").appendChild(firstName);
        document.getElementById("content").appendChild(linebreak);
        document.getElementById("content").appendChild(lastName);
        document.getElementById("content").appendChild(company);
        document.getElementById("content").appendChild(phone);
        document.getElementById("content").appendChild(hourPrice);
        document.getElementById("content").appendChild(btn2);
    });
});







// "id": "1",
// "userId": "1",
// "firstName": "firstName 1",
// "lastName": "lastName 1",
// "company": "company 1",
// "mail": "mail 1",
// "phone": "phone 1",
// "hourPrice": "hourPrice 1"