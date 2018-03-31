
const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const createPlanetCards = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<div class="planet">`;
        string +=   `<div class='planet-name'>${data[i].name}</div>`;
        string +=   `<img class='planet-img' src='${data[i].imageUrl}'>`;
        string += `</div>`;
    }
    printToDom(string,'solar-system');
}   

const addEventListeners = () => {
    const planet_imgs = document.getElementsByClassName('planet-img');
    for(let i = 0; i < planet_imgs.length; i++){
        planet_imgs[i].addEventListener('click',zoomInImg);
    }
}

const hideOtherCards = (e) => {
    const elementsToHide = document.getElementsByClassName('planet');
    for(let i = 0; i < elementsToHide.length; i++){
        //hide elements that are not the one being clicked on
        if(e.target != elementsToHide[i].children[1]){
            elementsToHide[i].style.visibility = 'hidden';
        }
    }
}

const assignID = (e) => {
    e.target.parentNode.setAttribute('id','display-details');
}

const displayDetails = (e) => {
    assignID(e);
    let string = '';
    string += `<h2>Title</h2>`;
    string += `<img src>`;
    string += '<p>lorem jflsdjflajkdsfjalkdj</p>';
    printToDom(string,'display-details');
}

const zoomInImg = (e) => {
    hideOtherCards(e);
    displayDetails(e);
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