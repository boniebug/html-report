'use strict';

const addImageDetails = (data, detailsPopUp) => {
    const image = document.createElement('img');
    image.src = data.imageUrl || './src/images/pokeball.png';
    const imageDiv = detailsPopUp.querySelector('#fullDetails .sideRow .imageDiv');
    imageDiv.appendChild(image);
};

const addBasicDetails = (data, detailsPopUp) => {
    const id = document.createElement('h1');
    id.innerText = data.id;
    id.classList.add('id');
    const name = document.createElement('h1');
    name.innerText = data.name;
    name.classList.add('name');
    const types = document.createElement('p');
    types.classList.add('types');
    const typesArray = data.type;
    typesArray.forEach((typeName) => {
        const type = document.createElement('span');
        type.innerText = typeName;
        type.classList.add('type');
        type.style.backgroundColor = getcolors(typeName);
        types.appendChild(type);
    });
    detailsPopUp.querySelector('#fullDetails .sideRow .minorDetails').append(id, name, types)
};

const addCharacteristics = (data, detailsPopUp) => {
    const base = document.createElement('h1');
    base.classList.add('base');
    base.innerText = data.base;
    const weight = document.createElement('h1');
    weight.classList.add('weight');
    weight.innerText = data.weight;
    const height = document.createElement('h1');
    height.classList.add('height');
    height.innerText = data.height;
    detailsPopUp.querySelector('#fullDetails .sideRow .characteristics').append(base, weight, height);
};

const addMoves = (data, detailsPopUp) => {
    const movesList = detailsPopUp.querySelector('#fullDetails .row .column #moves');
    for(const move of data.moves){
        const listItem = document.createElement('li');
        listItem.innerText = move;
        movesList.appendChild(listItem);
    }
};
const addAbilities = (data, detailsPopUp) => {
    const abilityList = detailsPopUp.querySelector('#fullDetails .row .column #abilities');
    for(const ability of data.abilities){
        const listItem = document.createElement('li');
        listItem.innerText = ability;
        abilityList.appendChild(listItem);
    }
};
const addWeakness = (data, detailsPopUp) => {
    const weaknessList = detailsPopUp.querySelector('#fullDetails .row .column #weakness');
    for(const type of data.weakness){
        const listItem = document.createElement('li');
        listItem.innerText = type;
        weaknessList.appendChild(listItem);
    }
};

const toggleDetails = (isOpen) => {
    const detailsPopUp = document.getElementById('detailsPopUp');
    detailsPopUp.classList.toggle('hide');
    if(isOpen) {
        detailsPopUp.innerText = '';
    }
};

const getFullDetails = (data) => {
    const detailsPopUp = document.getElementById('detailsPopUp');
    addImageDetails(data, detailsPopUp);
    addBasicDetails(data, detailsPopUp);
    addCharacteristics(data, detailsPopUp);
    addMoves(data, detailsPopUp);
    addAbilities(data, detailsPopUp);
    addWeakness(data, detailsPopUp);
    toggleDetails();
    document.getElementById('detailsButton').onclick = () => {toggleDetails(true)};
};