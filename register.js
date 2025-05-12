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


let inputPseudo = document.getElementById('user');
inputPseudo.addEventListener("input", () => {
    if (!UserValidator(inputPseudo.value)) {
        document.getElementById("alert-user").innerHTML = "Le pseudo doit contenir au moins 3 caractères.";
        document.getElementById("alert-user").style.color = 'red';

    }
    else {
        document.getElementById("alert-user").innerHTML = "";
    }

})

let inputMail = document.getElementById('email');
inputMail.addEventListener("input", () => {
    if (!EmailValidator(inputMail.value)) {
        document.getElementById("alert-email").innerHTML = "Email non valide.";
        document.getElementById("alert-email").style.color = 'red';

    }
    else {
        document.getElementById("alert-email").innerHTML = "";
    }

})

let inputPassword = document.getElementById('password');
inputPassword.addEventListener("input", () => {
    if (!PasswordValidator(inputPassword.value)) {
        document.getElementById("alert-password").innerHTML = "Le mot de passe doit contenir au moins 6 caractères, dont un chiffre et un caractère spécial.";
        document.getElementById("alert-password").style.color = 'red';

    }
    else {
        document.getElementById("alert-password").innerHTML = "";
    }



})



let inputPasswordConfirm = document.getElementById('password-confirm');
inputPasswordConfirm.addEventListener("input", () => {
    if (inputPassword.value != inputPasswordConfirm.value) {
        document.getElementById("alert-password-confirm").innerHTML = "Le mot de passe doit doit être le même.";
        document.getElementById("alert-password-confirm").style.color = 'red';

    }
    else {
        document.getElementById("alert-password-confirm").innerHTML = "";
    }


})




document.getElementById("register-btn").addEventListener("click", () => {


    let checkUniquePseudo = true;
    let checkUniqueMail = true;
    let checkUniquePassword = true;


    let datas = JSON.parse(localStorage.getItem('data')) || [];

    if (!UserValidator(inputPseudo.value) || !EmailValidator(inputMail.value) || !PasswordValidator(inputPassword.value) || inputPasswordConfirm.value !== inputPassword.value) {
        alert("Merci de remplir les champs correctement.");
    } else {

        for (let i = 0; i < datas.length; i++) {
            if (datas[i].pseudo === inputPseudo.value) {
                checkUniquePseudo = false;
            }

            if (datas[i].mail === inputMail.value) {
                checkUniqueMail = false;
            }

            if (datas[i].password === inputPassword.value) {
                checkUniquePassword = false;
            }

        }

        if (!checkUniquePseudo) {
            alert("Le pseudo existe déjà");
        }

        if (!checkUniqueMail) {
            alert("Le mail existe déjà");
        }

        if (!checkUniquePassword) {
            alert("Le mot de passe existe déjà");
        }



        if (checkUniquePseudo && checkUniqueMail && checkUniquePassword) {
            let newUser = {
                pseudo: inputPseudo.value,
                mail: inputMail.value,
                password: inputPassword.value,
                date: getCurrentDateTime()
            };

            datas.push(newUser);
            localStorage.setItem("data", JSON.stringify(datas));

            alert("Inscription réalisée avec succès !");
            document.location = "connexion.html";
        }
    }




})

function getCurrentDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    return `${date} ${time}`;
}