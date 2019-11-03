
//Get HTML elements
let todoUl = document.querySelector("ul");
let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");
let removeBtn = document.getElementById("removeBtn")

addBtn.addEventListener("click", function(e) {
    let item = input.value;
    let li = document.createElement("li");
    li.innerHTML = item;

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("id", "check");

    todoUl.appendChild(li);
    li.appendChild(checkbox);
}); 

removeBtn.addEventListener("click", function(e){
   
});

