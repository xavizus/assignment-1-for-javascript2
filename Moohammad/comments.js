/* Som en användare, skulle jag vilja kunna skriva kommentarer om kunden.
 
1. Textruta för kommentarer
2. Skicka-knapp för kommentaren
3. console.log textarea when pressing submit 
4. 

*/

import * as api from "../application/javascript/customFunctions/api.js"

//referens
let textarea = document.getElementById("textarea");
let btn = document.getElementById("btn");

btn.addEventListener("click", getComment);

function getComment() {
    console.log(textarea.value);
}

(async () => {
    let newComment = {
        name: "Moohammad",
        comment: "Detta är en kommenta22r",
        date: new Date()
    };
    let postComment = await api.postData("http://5dad9e39c7e88c0014aa2cda.mockapi.io/api//users/1/customers/1/comment", newComment);
    console.log(postComment);
})();

