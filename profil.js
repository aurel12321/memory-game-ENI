let lastDate=null
let currentUser


for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let tabValue = localStorage.getItem(key);
    let tabJSON = JSON.parse(tabValue)
    console.log(tabJSON);
    let currentDate = new Date(tabJSON.date);
    if (currentDate > lastDate) {
        lastDate=currentDate
        currentUser={key,value:tabJSON}
    }
    
}






