let usersDatas = JSON.parse(localStorage.getItem("data")) || [];

let sizeMemory=7;
let memory="Memory 4x3";
let level = document.getElementById("level");
level.addEventListener("change", () => {
    switch (level.value) {
        case "level1":
            sizeMemory = 7;
            memory=level.options[level.selectedIndex].text;
            handleGame();
            console.log(memory);
            
            break;
        case "level2":
            sizeMemory = 9;
            memory = level.options[level.selectedIndex].text;
            handleGame();
            break;
        case "level3":
            sizeMemory = 11;
            memory = level.options[level.selectedIndex].text;
            handleGame();
            break;
        default:
            break;
    }
})



function displayBoard() {

    let board = document.getElementById("tableau");

    if (usersDatas.length > 1) {

        while (board.rows.length > 1) {
            board.deleteRow(1);
        }


        let usersDatasSort = usersDatas
            .filter(user => user.score !== undefined)
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);





        for (let i = 0; i < usersDatasSort.length; i++) {

            let line = board.insertRow(-1);
            line.insertCell(0).innerHTML = usersDatasSort[i].pseudo;
            line.insertCell(1).innerHTML = usersDatasSort[i].difficulty;
            line.insertCell(2).innerHTML = usersDatasSort[i].score;
            line.insertCell(3).innerHTML = usersDatasSort[i].date.slice(0, 10);


        }
    }
    else {

        while (board.rows.length > 1) {
            board.deleteRow(1);
        }


    }
}
displayBoard();

function handleGame() {

    console.log(sizeMemory);
    
    let dogList=[];
    for (let i = 1; i < sizeMemory; i++) {
        dogList.push(`dog${i}`, `dog${i}`);
        
    }
    let displayGame;
    let card;
    let countDisplayCards = 0;
    let checkList = [];
    let attempt = 0;


    document.querySelector(".display-game").innerHTML = "";
    document.getElementById("display-rules").innerHTML = "     <p>Tentez de gagner avec le moins d'essais possible.<br>Appuyer sur la barre d'espace pour relancer le jeu.</p> ";
    document.getElementById("attempt").innerHTML = "Nombre de coups : " + attempt;
    attempt = 0;


    for (let i = 0; i < (sizeMemory-1)*2; i++) {

        card = document.createElement("div");
        card.style.width = "100px";
        card.style.height = "100px";
        card.style.backgroundSize = "100px";
        card.style.backgroundColor = "white";
        card.style.border = "2px solid #857979";
        card.style.backgroundImage = "url('images/question.svg')";
        card.setAttribute('class', 'card');

        displayGame = document.querySelector(".display-game");
        displayGame.appendChild(card);
        let dogCard = document.createElement('div');

        dogCard.style.width = "100px";
        dogCard.style.height = "100px";
        card.appendChild(dogCard);
        let dogAleaList = dogList[Math.floor(Math.random() * dogList.length)];
        dogCard.setAttribute('class', dogAleaList);

        dogCard.style.backgroundSize = "100px";
        dogCard.style.backgroundImage = "url('images/" + dogAleaList + ".webp')";
        dogCard.style.display = 'none';
        let index = dogList.indexOf(dogAleaList);
        dogList.splice(index, 1);



    }

    let cardList = document.querySelectorAll(".card");
    dogList = [];
    for (let i = 1; i < sizeMemory; i++) {
        dogList.push(`dog${i}`, `dog${i}`);

    }
    console.log(dogList);
    

    for (const card of cardList) {
        console.log(card);
        card.addEventListener("click", () => {


            for (const child of card.children) {
                let checkCard = child.className;
                console.log(checkCard);

                if (countDisplayCards < 2 && dogList.includes(checkCard)) {
                    child.style.display = 'block';
                    countDisplayCards++;
                    checkList.push(checkCard);
                    if (checkList.length == 2) {
                        if (checkList[0] == checkList[1]) {

                            const listFilter = dogList.filter(card => card != checkCard);
                            dogList = listFilter;
                            checkList = [];
                            countDisplayCards = 0;
                            console.log(dogList);
                            attempt++;
                            document.getElementById('attempt').innerHTML = "Nombre de coups :" + attempt;

                            if (dogList.length == 0) {


                                document.getElementById("display-rules").innerHTML = "<br>Bravo! vous avez gagné! <br> Appuyer sur la barre d'espace pour relancer le jeu <br> ";
                                document.getElementById("attempt").innerHTML = "Votre score final: " + attempt;

                                if (usersDatas.length != 0) {
                                    let lastDate = null;
                                    let currentUser;
                                    for (let i = 0; i < usersDatas.length; i++) {
                                        let currentDate = new Date(usersDatas[i].date);
                                        if (currentDate > lastDate) {
                                            lastDate = currentDate;
                                            currentUser = usersDatas[i];
                                        }
                                    }

                                    let newUser = {
                                        pseudo: currentUser.pseudo,
                                        mail: currentUser.mail,
                                        password: currentUser.password,
                                        score: attempt,
                                        difficulty: memory,
                                        date: getCurrentDateTime()
                                    };

                                    usersDatas.push(newUser);
                                    console.log(usersDatas);
                                    
                                    localStorage.setItem("data", JSON.stringify(usersDatas));

                                    displayBoard();
                                }

                            }


                        }
                        else {
                            attempt++
                            document.getElementById('attempt').innerHTML = "Nombre de coups : " + attempt;
                            console.log(checkList);


                            for (let i = 0; i < 2; i++) {
                                let checkListSelector = document.querySelectorAll("." + checkList[i]);
                                checkListSelector.forEach(card => {
                                    setTimeout(function () {

                                        card.style.display = 'none';

                                        checkList = [];
                                        countDisplayCards = 0;

                                    }, 1000);
                                });
                            }




                        }
                    }


                }



            }


        })
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == " ") {

            handleGame();
        }
    })
}



handleGame();


function getCurrentDateTime() {
    const now = new Date();

    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    return `${date} ${time}`;
}






