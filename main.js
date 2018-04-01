const getData = (executeOnSuccess) => {
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener('load',executeOnSuccess);
    xhrRequest.addEventListener("error", executeThisCodeIfXHRFails);
    xhrRequest.open("GET","./planets.json");
    xhrRequest.send();
}

function executeThisCodeAfterFileLoaded(){
    // console.log(this);
    const data = JSON.parse(this.responseText);
    createPlanetCards(data.planets);
    addEventListeners('planet-img',zoomInImg);
}

function executeThisCodeIfXHRFails(){
    console.log('XHR error');
}

const printToDom = (string,id) => {
    document.getElementById(id).innerHTML = string;
}

const createPlanetCards = (data) => {
    string = '';
    for(let i = 0; i < data.length; i++){
        string += `<div class="planet" id="display-details">`;
        string +=   `<div class='planet-name'>${data[i].name}</div>`;
        string +=   `<img class='planet-img' src='${data[i].imageUrl}'>`;
        string += `</div>`;
    }
    printToDom(string,'solar-system');
}   

const addEventListeners = (className,callBackfunction) => {
    const allElements = document.getElementsByClassName(className);
    for(let i = 0; i < allElements.length; i++){
        allElements[i].addEventListener('click',callBackfunction);
    }
}

const hideOtherCards = (e) => {
    const elementsToHide = document.getElementsByClassName('planet');
    for(let i = 0; i < elementsToHide.length; i++){
        //hide elements that are not the one being clicked on
        if(e.target != elementsToHide[i].children[1]){
            elementsToHide[i].style.display = 'none';
        }
    }
}

function displayDetails(e){

    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        const returnedData = JSON.parse(this.responseText);
        let planetClickedOn = e.target.parentNode.children[0].innerHTML;

        let planetName = '';
        let planetImgPath = '';
        let planetDesc = '';

        for(let n = 0; n < returnedData.planets.length; n++){
            if(returnedData.planets[n].name === planetClickedOn){
                planetName = returnedData.planets[n].name;
                planetImgPath = returnedData.planets[n].imageUrl;
                planetDesc = returnedData.planets[n].description;
            }
        }

        let string = '';
        string += `<h2>${planetName}</h2>`;
        string += `<button class="cancel-btn">X</button>`
        string += `<img src='${planetImgPath}'>`;
        string += `<p>${planetDesc}</p>`;
        const planets = document.getElementsByClassName('planet');
        for(let i = 0; i < planets.length; i++){
            planets[i].innerHTML = string;
        }
    }
};
    xhttp.open("GET","./planets.json", true);
    xhttp.send();
}

const enlargeCard = (e) => {
    e.target.parentNode.classList.add('enlarge-card');
}

const zoomInImg = (e) => {
    hideOtherCards(e);
    enlargeCard(e);
    displayDetails(e);
    addEventListeners('cancel-btn',backToOriginal);
}

const showOtherCards = () => {
    getData(executeThisCodeAfterFileLoaded);
}

const backToOriginal = (e) => {
    e.target.parentNode.classList.remove('enlarge-card');
    showOtherCards(e);
}

const runApplication = () => {
    getData(executeThisCodeAfterFileLoaded);    
}

runApplication();