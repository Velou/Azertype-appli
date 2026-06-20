
//Contient toutes les fonctions nécessaires au fonctionnement du jeu. 

// Cette fonction affiche dans la console le score de l'utilisateur
function afficherResultat(score, nbMotsProposes) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichage = `${score} / ${nbMotsProposes}`
    
    // Met le texte à l'intérieur du span
    spanScore.innerText = affichage
}


function afficherProposition(proposition){
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

//Fonction qui construit et affiche l'eamail

function afficherEmail(nom, mail, score){
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}



function validerNom(nom) {
    if (nom.length < 2) {
        throw new Error("Le nom est trop court.")
    }
}


function validerEmail(email) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("L'email n'est pas valide")
    }
    
}


function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        popup.append(spanErreurMessage)
    }

    spanErreurMessage.innerText = message
}


function gererFormulaire(scoreEmail){
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)
        
    } catch(erreur){
        afficherMessageErreur(erreur.message)
    }
    
}
// Cette fonction demande à l'utiisateur de choisir entre "mots" et "phrases" et lance la boucle
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0 
    let listeProposition = listeMots
    let btnValiderMot = document.getElementById("btnValiderMot");
    let inputEcriture = document.getElementById("inputEcriture");

    afficherProposition(listeProposition[i])

    // Gestion de l'évènement click sur le bouton valider
    btnValiderMot.addEventListener("click", () => {
        
        if(inputEcriture.value === listeProposition[i]){
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ""
        if(listeProposition[i] === undefined){
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }

        
    }) 
    
    // évènement change sur les boutons radios
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // premier élément selectionné alors on prends la liste de mots
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases
            }

            //modification de l'affichage si l'utilisateur veut changer ce qu'il a sélectionné
            afficherProposition(listeProposition[i])
        })
    }
    
    //Évènement submit sur le formulaire de partage
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)

        

    })
    
    
    

    afficherResultat(score, i)
}




