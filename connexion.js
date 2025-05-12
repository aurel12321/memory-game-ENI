let inputMailConnexion = document.getElementById('email-connexion');
let inputPasswordConnexion = document.getElementById('password-connexion');
let UsersDatas = JSON.parse(localStorage.getItem('data'));


let checkConnexion = false;

document.getElementById("connexion-btn").addEventListener("click", () => {
    for (let i = 0; i < UsersDatas.length; i++) {

        if (UsersDatas[i].mail == inputMailConnexion.value && UsersDatas[i].password == inputPasswordConnexion.value) {
            checkConnexion = true;
        }
    }



    if (checkConnexion) {
        alert("Vous êtes connecté");
        document.location = "jeu.html";


    }

    else {
        alert("identifiants incorrects");
    }
})
