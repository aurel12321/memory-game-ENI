function EmailValidator(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function PasswordValidator(password) {
    const passwordRegex = /^(?=.*\d)(?=.*?[#?!@$%^&*-]).{6,}$/;
    return passwordRegex.test(password);
}

function UserValidator(user) {
    const userRegex = /^.{3,}$/;
    return userRegex.test(user);
}



let data_form = document.querySelectorAll(".input-form");
let email
let password
let birth
let number

// console.log(data_form);
// console.log(document.getElementById('user'));

 let inputPseudo = document.getElementById('user')
inputPseudo.addEventListener("input",()=>{
   if (!UserValidator(inputPseudo.value)) {
    document.getElementById("alert-user").innerHTML="Le pseudo doit contenir au moins 3 caractères."
    document.getElementById("alert-user").style.color='red'
    
   }
   else{
       document.getElementById("alert-user").innerHTML = ""
   }
   
})

let inputMail = document.getElementById('email')
inputMail.addEventListener("input", () => {
    if (!EmailValidator(inputMail.value)) {
        document.getElementById("alert-email").innerHTML = "Email non valide."
        document.getElementById("alert-email").style.color = 'red'

    }
    else {
        document.getElementById("alert-email").innerHTML = ""
    }

})

let inputPassword = document.getElementById('password')
inputPassword.addEventListener("input", () => {
    if (!PasswordValidator(inputPassword.value)) {
        document.getElementById("alert-password").innerHTML = "Le mot de passe doit contenir au moins 6 caractères, dont un chiffre et un caractère spécial."
        document.getElementById("alert-password").style.color = 'red'

    }
    else {
        document.getElementById("alert-password").innerHTML = ""
    }

})

let inputPasswordConfirm = document.getElementById('password-confirm')
let tab = [];
document.getElementById("register-btn").addEventListener("click", () => {
    // if (UserValidator(inputPseudo.value) && EmailValidator(inputMail.value) && PasswordValidator(inputPassword.value) && inputPasswordConfirm.value==inputPassword.value) {
    //     alert("Inscription réalisée avec succès !")
    //     let dataLocalStorage= {
    //         pseudo: inputPseudo.value,
    //         mail: inputMail.value,
    //         password:inputPassword.value
    //     }
    //     localStorage.setItem(inputPseudo.value,JSON.stringify(dataLocalStorage))
    //     document.location="connexion.html"
    // }
    // else {
    //     alert("Merci de remplir tous les champs correctement.")
    // }

  
let tabJSON
let dataLocalStorage
let checkUniquePseudo=true
let checkUniqueMail=true
let checkUniquePassword=true

    if (localStorage.length===0) {
        if (!UserValidator(inputPseudo.value) || !EmailValidator(inputMail.value) || !PasswordValidator(inputPassword.value) || inputPasswordConfirm.value != inputPassword.value) {
            alert("Merci de remplir les champs correctement.")
        }

        if (UserValidator(inputPseudo.value) && EmailValidator(inputMail.value) && PasswordValidator(inputPassword.value) && inputPasswordConfirm.value == inputPassword.value) {
            alert("Inscription réalisée avec succès !")
            let dataLocalStorage = {
                pseudo: inputPseudo.value,
                mail: inputMail.value,
                password: inputPassword.value
            }
            localStorage.setItem(inputPseudo.value, JSON.stringify(dataLocalStorage))
            document.location = "connexion.html"
        }
    }

    else {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let tabValue = localStorage.getItem(key);
            tabJSON = JSON.parse(tabValue)
            console.log(tabJSON.password);

            if (tabJSON.pseudo == inputPseudo.value) {
                checkUniquePseudo=false

            }

            if (tabJSON.mail == inputMail.value) {
                checkUniqueMail=false

            }

            if (tabJSON.password == inputPassword.value) {
                checkUniquePassword=false

            }


        }

        if (!checkUniquePseudo) {
            alert("Le pseudo existe déjà")
        }
        if (!checkUniqueMail) {
            alert("Le mail existe déjà")
        }
        if (!checkUniquePassword) {
            alert("Le mot de passe existe déjà")
        }
        if (!UserValidator(inputPseudo.value) || !EmailValidator(inputMail.value) || !PasswordValidator(inputPassword.value) || inputPasswordConfirm.value != inputPassword.value) {
            alert("Merci de remplir les champs correctement.")
        }

        if (UserValidator(inputPseudo.value) && EmailValidator(inputMail.value) && PasswordValidator(inputPassword.value) && inputPasswordConfirm.value == inputPassword.value && checkUniquePseudo && checkUniquePassword && checkUniqueMail) {
            console.log(checkUniquePassword);
            
            alert("Inscription réalisée avec succès !")
            dataLocalStorage = {
                pseudo: inputPseudo.value,
                mail: inputMail.value,
                password: inputPassword.value,
                date: getCurrentDateTime()
            }
            localStorage.setItem("data", JSON.stringify(dataLocalStorage))
            sessionStorage.setItem("data", JSON.stringify(dataLocalStorage))
            // localStorage.setItem("currentUser", JSON.stringify(dataLocalStorage))
            document.location = "connexion.html"
        }
    }

    
   



    

  
    // if (tabJSON.mail == inputMail.value) {
    //     alert("Mail déjà connu.")

    // }
    // if (tabJSON.password == inputPassword.value) {
    //     alert("Mot de passe déjà connu.")

    // }
    // if (!UserValidator(inputPseudo.value) || !EmailValidator(inputMail.value) || !PasswordValidator(inputPassword.value) || inputPasswordConfirm.value != inputPassword.value) {
    //     alert("Merci de remplir les champs correctement.")
    // }

    // if (UserValidator(inputPseudo.value) && EmailValidator(inputMail.value) && PasswordValidator(inputPassword.value) && inputPasswordConfirm.value == inputPassword.value && checkUniqueProfil) {
    //     alert("Inscription réalisée avec succès !")
    //     let dataLocalStorage = {
    //         pseudo: inputPseudo.value,
    //         mail: inputMail.value,
    //         password: inputPassword.value
    //     }
    //     localStorage.setItem(inputPseudo.value, JSON.stringify(dataLocalStorage))
    //     document.location = "connexion.html"
    // }
//    console.log(datLocalStorage);
   
    
    // console.log(localStorage);
})

function getCurrentDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString();  // ex: "06/05/2025"
    const time = now.toLocaleTimeString();  // ex: "14:23:45"

    return `${date} ${time}`;
}