
const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const createPlanetCards = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<div class="planet">`;
        string +=   `<div>${data[i].name}</div>`;
        string +=   `<img class='img-planet' src='${data[i].imageUrl}'>`;
        string += `</div>`;
    }
    printToDom(string,'solar-system');
}   

const displayImgOnMouseHover = (e) => {
    e.target.parentNode.children[1].style.display = 'block';
}

const hideImgOnMouseOut = (e) => {
    e.target.parentNode.children[1].style.display = 'none';
}

const addEventListeners = () => {
    const planets = document.getElementsByClassName('planet');
    for(let i = 0; i < planets.length; i++){
        planets[i].addEventListener('mouseover',displayImgOnMouseHover);
        planets[i].addEventListener('mouseout',hideImgOnMouseOut);
    }
}



function executeThisCodeAfterFileLoaded(){
    const data = JSON.parse(this.responseText);
    createPlanetCards(data.planets);
    addEventListeners();
}

function executeThisCodeIfXHRFails(){
    
}

const runApplication = () => {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener("load", executeThisCodeAfterFileLoaded);
    xhrRequest.addEventListener("error", executeThisCodeIfXHRFails);
    xhrRequest.open("GET","./planets.json");
    xhrRequest.send();
}

runApplication();