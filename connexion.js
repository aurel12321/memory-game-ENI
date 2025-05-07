let inputMailConnexion = document.getElementById('email-connexion')
let inputPasswordConnexion = document.getElementById('password-connexion')
console.log(inputMailConnexion);

let checkConnexion=false;

document.getElementById("connexion-btn").addEventListener("click",()=> {
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let tabValue = localStorage.getItem(key);
        let tabJSON = JSON.parse(tabValue)
        console.log(tabJSON);

        if (tabJSON.mail == inputMailConnexion.value && tabJSON.password == inputPasswordConnexion.value) {
            checkConnexion=true
        }
      
       
        
    }
    if (checkConnexion) {
        alert("Vous êtes connecté")
        document.location = "profil.html"
        console.log(localStorage);
        
    }
    else {
        alert("identifiants incorrects")
    }
})
