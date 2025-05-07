
function handleGame() {
    let dogList = ["dog1", "dog1", "dog2", "dog2", "dog3", "dog3", "dog4", "dog4", "dog5", "dog5", "dog6", "dog6"]
    let displayGame
    let card
    let countDisplayCards = 0;
    let checkList = [];
    let attempt = 0;

    console.log("ok");
    document.querySelector(".display-game").innerHTML = ""
    document.getElementById("display-rules").innerHTML = "     <p>Tentez de gagner avec le moins d'essais possible.<br>Appuyer sur la barre d'espace pour relancer le jeu.</p> "
    document.getElementById("attempt").innerHTML = "Nombre de coups : " + attempt
    attempt = 0

    for (let i = 0; i < 12; i++) {

        card = document.createElement("div");
        card.style.width = "100px";
        card.style.height = "100px";
        card.style.backgroundSize = "100px"
        card.style.backgroundColor = "white"
        card.style.border = "2px solid #857979"
        card.style.backgroundImage = "url('images/question.svg')"
        card.setAttribute('class', 'card')

        displayGame = document.querySelector(".display-game")
        displayGame.appendChild(card)
        let dogCard = document.createElement('div');

        dogCard.style.width = "100px";
        dogCard.style.height = "100px";
        card.appendChild(dogCard);
        let dogAleaList = dogList[Math.floor(Math.random() * dogList.length)];
        dogCard.setAttribute('class', dogAleaList);

        dogCard.style.backgroundSize = "100px"
        dogCard.style.backgroundImage = "url('images/" + dogAleaList + ".webp')";
        dogCard.style.display = 'none'
        let index = dogList.indexOf(dogAleaList);
        dogList.splice(index, 1);



    }
    console.log(displayGame);

    let cardList = document.querySelectorAll(".card");
    dogList = ["dog1", "dog1", "dog2", "dog2", "dog3", "dog3", "dog4", "dog4", "dog5", "dog5", "dog6", "dog6"]
    for (const card of cardList) {
        console.log(card);
        card.addEventListener("click", () => {

            for (const child of card.children) {
                let checkCard = child.className
                console.log(checkCard);

                if (countDisplayCards < 2 && dogList.includes(checkCard)) {
                    child.style.display = 'block'
                    countDisplayCards++;
                    checkList.push(checkCard)
                    if (checkList.length == 2) {
                        if (checkList[0] == checkList[1]) {

                            const listFilter = dogList.filter(card => card != checkCard)
                            dogList = listFilter
                            checkList = []
                            countDisplayCards = 0;
                            console.log(dogList);
                            attempt++
                            document.getElementById('attempt').innerHTML = "Nombre de coups :" + attempt

                            if (dogList.length == 0) {

                    
                                document.getElementById("display-rules").innerHTML = "<p> Bravo! vous avez gagné! </p> <p> Appuyer sur la barre d'espace pour relancer le jeu </p>"
                                document.getElementById("attempt").innerHTML = "<p> Votre score final : </p> " + attempt

                                
                                
                                let dataLocalStorage = {
                                    pseudo: sessionStorage.getItem("data"),
                                    mail: inputMail.value,
                                    score: attempt,
                                    date: getCurrentDateTime()
                                }

                                localStorage.setItem(getCurrentDateTime(), JSON.stringify(dataLocalStorage))

                                for (let i = 0; i < localStorage.length; i++) {
                                    let key = localStorage.key(i);
                                    let tabValue = localStorage.getItem(key);
                                    tabJSON = JSON.parse(tabValue)
                                    console.log(tabJSON);


                                }

                                document.addEventListener("keydown", (e)=> {
                                        if (e.key==" ") {
                                           
                                            handleGame()
                                        } 
                                })
                            }
                        

                        }
                        else {
                            attempt ++
                            document.getElementById('attempt').innerHTML = "Nombre de coups :" + attempt
                            console.log(checkList);

                            // setTimeout(()=>{
                            //     document.querySelector("."+checkList[0]).style.visibility = 'hidden'
                            //     document.querySelector("." + checkList[1]).style.visibility = 'hidden'
                            // },2000)
                            for (let i = 0; i < 2; i++) {
                                let checkListSelector = document.querySelectorAll("." + checkList[i]);
                                checkListSelector.forEach(card => {
                                    setTimeout(function () {

                                        card.style.display = 'none';

                                        checkList = [];
                                        countDisplayCards = 0;
                                        console.log(document.getElementById('#attempt'));

                                        
                                        // e.id = 'question';


                                    }, 1000)
                                });
                            }

                            
                        

                        }
                    }
               

                }



            }


        })
    }
}



handleGame()


console.log(sessionStorage.getItem("data"));
console.log(JSON.parse(sessionStorage.getItem("data")).pseudo);





