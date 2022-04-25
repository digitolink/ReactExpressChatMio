const host = "https://web-develop-react-express-chat.herokuapp.com";
const htmlGetUsers = document.querySelector("#getUsers");
const htmlUpdateButton = document.querySelector("#updateButton");

async function get(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function getUsers () {
    const users = await get(host+"/users/");
    htmlGetUsers.innerText = JSON.stringify(users);
};

function updateButtonClickHandler() {
    getUsers();
}

async function postLogin(url, data){
    const response = await fetch(
        url,
        {method:'POST',
        body: data,
        headers: {
            "Content-Type":
            "application/json"
        }
    }
    );
    const responseData = await response.json();
    console.log(responseData);
    return responseData;

}

htmlUpdateButton.addEventListener("click", updateButtonClickHandler)

function authToken(identificador, password){
    const token=identificador + ":" + password;
    const base64token=btoa(token);
    return "Basic "+base64token;
}

async function seeMessages(url, token){
    const response=await fetch(
        url,
        {headers:{
            Authorization: token
            }
        }
    );
    const data=await response.json();
    console.log(data);
    return data;

}
async function postMessage(url,token, data){
    const response = await fetch(
        url,
        {method:"POST",
         body: data,
         headers:{
             "Content-Type":"application/json",
             Authorization: token
         }
        }
    );
    const responseData=await response.json();
    return responseData;

}

//caso de uso CREAR usuario (login post)
let url=host + "/login/";
const data = {
	"userName": "ms3",
	"password": "ms3"
};
postLogin(url, JSON.stringify(data));


/*
//caso de uso ver mensajes (message get)
let url2=host + "/messages/";
seeMessages(url2,authToken("1649055812003", "ms4"));



//caso de uso CREAR mensaje (message post)
let url3=host + "/message/";
const token=authToken("1649055812003", "ms4");
const data2=JSON.stringify({content:"contenido2"});

postMessage(url3,token, data2)
*/