const autorizationForm = document.getElementById('autorization-form')


let dateOfRequest = 0


autorizationForm.addEventListener('submit', function(currentForm) {

  currentForm.preventDefault(); // Прерываем отправку формы
  
  let currentDate = Date.now()
  

  if(currentDate - dateOfRequest > 60000 || dateOfRequest === 0){
      
    let email = document.getElementById("autorization-input").value
    sendAutentificationCode(email)
    dateOfRequest = Date.now()

  } else{

    alert("Повторный запрос можно отправить через:" + (60 - (currentDate - dateOfRequest)/1000) + "секунд")
  }

});

async function sendAutentificationCode(email){    

    const url = 'https://edu.strada.one/api/user';

    try{
        let response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                "Access-Control-Allow-Headers": "*"
              },
            body: JSON.stringify({email: email})
        })
        if(response.ok){
          alert("Запрос успешно отправлен")
        }

    } catch (error) {
        alert(error);
      }
}   




