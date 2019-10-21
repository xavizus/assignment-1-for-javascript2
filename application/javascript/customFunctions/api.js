export {getData as default};

export function getAllUsers() {

}

async function getData(url) {
    let response = await fetch(url);
    return await response.json();
}

export async function getUserIdByFirstNameAndLastName(url,userName,password) {
    let users = await getData(url);

    for(let user of users) {
        if(userName == user.username && password == user.password) {
            return user.id;
        }
    }

    return false;
}