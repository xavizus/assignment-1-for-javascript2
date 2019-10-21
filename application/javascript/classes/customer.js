export {Customer as default};

class Customer {
    constructor(firstName, lastName, company, email, phonenumber = null, hourlyPrice = 0,listOfCommunications = null) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
        this.email = email;
        this.phonenumber = phonenumber;
        this.hourlyPrice = hourlyPrice;
        this.listOfCommunications = listOfCommunications;
    }
}