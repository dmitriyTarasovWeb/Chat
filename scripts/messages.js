
import { currentUserEmail } from "./confirm.js"
import {renderTwentyMessages} from "./dynamicLoad.js"

let socket //переменная для сокета

let dayOfMessage = new Date()

export let allMessages = []

export async function getMessages(){  

    allMessages = []
    const url = 'https://edu.strada.one/api/messages';

    try{

        let response = await fetch(url, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${ Cookies.get("autentificationCode") }`
            }
        })

        if(response.ok){

            let jsonMessages = await response.json()
            allMessages = jsonMessages.messages    

            renderTwentyMessages()
        } else{
            alert("Ошибка загрузки сообщений")
        }
        
    
    } catch (error) {
        alert(error);
      }

 
}  



const messageList = document.querySelector(".main__message-list")

export function renderMessages(allMessages){
    
   
    for (let i = 0; i < allMessages.length; i++){
       
        let messageTemplate = document.getElementById("message-template").content.cloneNode(true)

        let messageContainer =  messageTemplate.querySelector(".main__message-container")  

        let emailOfMessage = allMessages[i].user.email

        if(currentUserEmail === emailOfMessage){

            messageContainer.classList.add("ours-message")
        } else{
            messageContainer.classList.add("theirs-message")
        }
 
        let messageTextContainer =  messageTemplate.querySelector(".main__message-text")
        let nickNameContainer =  messageTemplate.querySelector(".main__nick-name-message")

        messageTextContainer.textContent = allMessages[i].text
        nickNameContainer.textContent = allMessages[i].user.name



        let timeOfMessageContainer = messageTemplate.querySelector(".time-of-message")

        let timeOfMessageUTC = new Date (allMessages[i].createdAt)
        let minutesOfMessage = (timeOfMessageUTC.getMinutes() < 10 ? '0' : '') + timeOfMessageUTC.getMinutes()
        let timeOfMessage = timeOfMessageUTC.getHours() + ":" + minutesOfMessage

        timeOfMessageContainer.textContent = timeOfMessage



      
        if(allMessages.length > 1){

            if (dayOfMessage.getDate() != timeOfMessageUTC.getDate()) {
                renderDaysOfMessages(timeOfMessageUTC , "first-render")
            }

            messageList.prepend(messageTemplate);
        } else{

            if (dayOfMessage.getDate() != timeOfMessageUTC.getDate()) {
                renderDaysOfMessages(timeOfMessageUTC , "second-new-message-render")
            }

            messageList.appendChild(messageTemplate);

            const mainContainer = document.querySelector(".main")   ////если новое сообщение пришло то скролл вниз
            mainContainer.scrollTop = mainContainer.scrollHeight
        }   
    }
}



const createNewBlock = () => document.getElementById("dateOfMessages").content.cloneNode(true)

function renderDaysOfMessages (timeOfMessageUTC, typeOfRender){

    let lineTemplate = createNewBlock()
    let lineContainer = lineTemplate.querySelector(".main__date-of-messages") 

    let dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    };
        
    timeOfMessageUTC.setDate(timeOfMessageUTC.getDate()) 
    lineContainer.textContent = dayOfMessage.toLocaleString("ru", dateOptions)

    if(typeOfRender === "first-render"){  /////если в реальном времени приходит сообщение первое за день то она корректно отобразится

        messageList.prepend(lineTemplate);
    } else{
        messageList.appendChild(lineTemplate);
    }

    dayOfMessage = timeOfMessageUTC
}

export function isMessageEnded (){

    let lineTemplate = createNewBlock()
    let lineContainer = lineTemplate.querySelector(".main__date-of-messages") 

    lineContainer.textContent = "Сообщения кончились"
    messageList.prepend(lineTemplate);
}


const renderNewMessages = (newMessage) => renderMessages([JSON.parse(newMessage)])
    
  

const sendMessageForm = document.querySelector(".footer__form")
const sendMessageTextArea = document.getElementById("message-textarea")


let isOnMessageActive = false

sendMessageForm.addEventListener("submit", function(currentForm){

    currentForm.preventDefault()

    socket = new WebSocket (`wss://edu.strada.one/websockets?${ Cookies.get("autentificationCode") }`)
    socket.onopen = () => sendMessage()

    if(!isOnMessageActive){
        socket.onmessage = (event) => renderNewMessages(event.data)
        isOnMessageActive = true
    }
})


const sendMessage = function (){

    
    let typedMessage = sendMessageTextArea.value.trim()


    if(!typedMessage == "" ){
       
        sendMessageTextArea.value = ""
        sendMessageTextArea.style.height = '30px';
        socket.send(JSON.stringify ({text: `${typedMessage}`}))
        
    } else{
      alert("Некорректное сообщение")  
    }


}