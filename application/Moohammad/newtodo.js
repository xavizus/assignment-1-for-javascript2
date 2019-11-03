document.addEventListener("DOMContentLoaded", function(event){

//Get HTML elements
//let todoUl = document.querySelector("ul");
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn")

addBtn.addEventListener("click", function(e) {
    let item = input.value;
   /*  let li = document.createElement("li");
    li.innerHTML = item; */

    let checkbox = `
        <input type="checkbox" class="chkbox">
        <span class="item">${item}</span>
        </input>
        <br>
    `
    ;

    document.getElementById("todo-container").insertAdjacentHTML("beforeend", checkbox);

    /* todoUl.appendChild(li);
    li.appendChild(checkbox);
     */
}); 




removeBtn.addEventListener("click", function(e){
    
});

document.getElementById("todo-container").addEventListener("change", (event) => {
    if(event.target.className == "chkbox") {
        let item = document.getElementsByClassName("item");
item.setAttribute("class", "checkedItem");

    }
});


/* 
document.getElementsByClassName("chkbox").addEventListener('change', function() {
     if(this.checked) { */
});
