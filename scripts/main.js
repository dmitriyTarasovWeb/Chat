
const logoutButton = document.querySelector(".logout-button")
const closeButtons = document.querySelectorAll(".modal-window__close-button")

const autorizationWindow = document.getElementById("autorization")

logoutButton.addEventListener("click", function (){
    
    autorizationWindow.classList.add("show-modal-window")
    Cookies.remove('autentificationCode')
    location.reload();      ///перезагрузка страницы
})


closeButtons.forEach(closeButton => closeButton.addEventListener("click", function (closeButton){
    closeButton.target.parentNode.parentNode.parentNode.parentNode.classList.remove("show-modal-window")
    
}))






const messageTextarea = document.getElementById('message-textarea');

window.onload = () => messageTextarea.style.height = '35px'; messageTextarea.value = ""; ////////////после перезагрузки чтобы поле очищалось потому что после перезагрузки там криво функция увеличения поля работает
 

messageTextarea.addEventListener('input', () => dynamicTextArea(messageTextarea)) ///короче долюаеб это нахуй реализация увеличения и соответственно уменьшения поля ввода



function dynamicTextArea(messageTextarea){
    console.log
    // messageTextarea.style.height = (messageTextarea.scrollHeight) + 'px';

    if(messageTextarea.value === ""){     ////////здест нахуй если сразу все удаляешь оно ставит по умолчанию 28 пикселей
        messageTextarea.style.height = '28px';
    }
    
    if(messageTextarea.scrollHeight <= 290){  ////////////////// если размер поля равно этому значению (оно всегда через него проходит) то убирается скролл
        messageTextarea.style.overflowY = "hidden"
    }

    if(messageTextarea.scrollHeight >= 308){     /////////// здесь аналогично только скролл появляется
        messageTextarea.style.overflowY = "auto" 
    }

    messageTextarea.style.height = 'auto'; // Сбрасываем высоту
    messageTextarea.style.height = messageTextarea.scrollHeight + 'px'; // Устанавливаем высоту на основе содержимого
}

let mainBlock = document.querySelector(".main")


// Устанавливаем цвет полосы прокрутки
mainBlock.style.scrollbarColor = 'rgb(0, 149, 255) white';
mainBlock.style.scrollbarWidth = 'thin';
mainBlock.scrollIntoView({ behavior: "smooth" }); // плавный скролл до элемента

messageTextarea.style.scrollbarColor = 'rgb(0, 149, 255) white';
messageTextarea.style.scrollbarWidth = 'thin';
messageTextarea.scrollIntoView({ behavior: "smooth" }); // плавный скролл до элемента