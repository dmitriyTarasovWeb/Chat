import { getMessages } from "./messages.js"
import { renderCurrenName } from "./settings.js"

const autorizationWindow = document.getElementById("autorization")
const confirmWindow = document.getElementById("confirm")
const inputCodeButton = document.querySelector(".form__input-code-button")

const confirmInput = document.getElementById("confirm-input")
const confirmForm = document.getElementById("confirm-form")

export let currentUserEmail = ""


inputCodeButton.addEventListener("click", function (){
    confirmWindow.classList.add("show-modal-window")
})


confirmForm.addEventListener("submit", function (currentForm){

    currentForm.preventDefault(); // Прерываем отправку формы
    Cookies.set('autentificationCode', confirmInput.value)
    confirmCode()
})



async function confirmCode(){    

    const url = 'https://edu.strada.one/api/user/me';
    try{

       let response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Access-Control-Allow-Headers": "*",
                'Authorization': `Bearer ${ Cookies.get("autentificationCode") }`
            }
        })

        if(response.ok){
            let json = await response.json() 
            
            currentUserEmail = json.email
            getMessages()
            
            renderCurrenName(json.name)

            confirmWindow.classList.remove("show-modal-window")
            autorizationWindow.classList.remove("show-modal-window")
        } else{
            alert("Ошибка авторизации")
            Cookies.remove('autentificationCode')
        }
      
            

    } catch (error) {
        alert(error);
      }
}   



