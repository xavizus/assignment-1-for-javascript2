document.addEventListener("DOMContentLoaded", function(event){


let input = document.getElementById("input");
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(e) {
    let item = input.value;

    let checkbox = `
        <div class="checkboxDiv"> 
            <input class="checkbox" type="checkbox"> 
            <span class="unchecked">${item}</span> 
        </div>
    `
    ;

    document.getElementById("todo-container").insertAdjacentHTML("beforeend", checkbox);

}); 




document.addEventListener("click", function(e) { 
    if(e.target.parentNode.className == "checkboxDiv") { 
        let item = e.target.parentNode.getElementsByTagName("span")[0]; 
        item.className = "checked"; 
    } 
});

});
