const settingsButton = document.querySelector(".settings-button")
const settingsWindow = document.getElementById("settings")


const changeNameForm = document.getElementById("name-form")
const changeNameInput = document.getElementById("settings-input")




settingsButton.addEventListener("click", function (){
    settingsWindow.classList.add("show-modal-window")
})



changeNameForm.addEventListener("submit", function(currentForm){

    currentForm.preventDefault(); // Прерываем отправку формы

    let nickName = changeNameInput.value.trim()

    if(!nickName == ""){
        changeName(nickName)
    } else{
      alert("Некорректный никнейм")  
    }
})


async function changeName(nickName){    

    const url = 'https://edu.strada.one/api/user';

    try{

        let responseChangeName = await fetch(url, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Access-Control-Allow-Headers": "*",
                'Authorization': `Bearer ${ Cookies.get("autentificationCode") }`
            },
            body: JSON.stringify({name: nickName})
        })
           let responseGetMe = await fetch(url+"/me", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${ Cookies.get("autentificationCode") }`
            }
        })


        if(!responseChangeName.ok){
            alert("Ошибка изменения имени")
        }


        if(responseGetMe.ok){
            let json = await responseGetMe.json()
            renderCurrenName(json.name)
        } else{
            alert("Ошибка получения информации о пользователе")
        }
        

    } catch (error) {
        alert(error);
      }
}   


export const renderCurrenName = function(name){

    const nickNameContainer = document.getElementById("current-nickname")
    nickNameContainer.textContent = "Текущее имя: " + name
}


