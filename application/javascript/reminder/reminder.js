document.addEventListener("DOMContentLoaded", function (e) {
    
    let newDate = new Date();
    let year = newDate.getFullYear();
    let month = newDate.getMonth() + 1;
    let day = "";
    if(day < 10){
        day = "0" + newDate.getDay();
    } else {
        day = newDate.getDay();
    }
    let currentDate = String(year + "-" + month + "-" + day);

    console.log(currentDate);

    function checkReminder(){
        
    }

})