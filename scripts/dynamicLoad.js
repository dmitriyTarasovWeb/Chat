import { allMessages } from "./messages.js"
import { renderMessages } from "./messages.js"
import { isMessageEnded } from "./messages.js"



const mainContainer = document.querySelector(".main")




mainContainer.addEventListener("scroll", renderTwentyMessages)


let currentQuantityOfMessages = 20
let previousQuantityOfMessages = 0



export function renderTwentyMessages(){

    

    const mainContainer = document.querySelector(".main")

    let currentScrollPosition = mainContainer.scrollTop

    if(currentScrollPosition === 0){
            
            let twentyMessages = allMessages.filter(function (element, index){
                if(index >= previousQuantityOfMessages && index < currentQuantityOfMessages) return element
            })
           
            if(twentyMessages.length === 0){
                isMessageEnded()
                return
            }

            previousQuantityOfMessages = currentQuantityOfMessages
            currentQuantityOfMessages += 20 

            let previousScrollposition = mainContainer.scrollHeight


            renderMessages(twentyMessages)


            let currentScrollPosition = mainContainer.scrollHeight - previousScrollposition
            mainContainer.scrollTop = currentScrollPosition


            if(previousQuantityOfMessages === 20){   /////////опускание вниз при первом запуске
                mainContainer.scrollTop = mainContainer.scrollHeight
            }

    }
}






 