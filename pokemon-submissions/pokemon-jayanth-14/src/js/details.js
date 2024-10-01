'use strict';

const createImageDetails = (data) => {
    const image = document.createElement('img');
    image.src = data.imageUrl || './src/images/pokeball.png';
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('imageDiv');
    imageDiv.appendChild(image);
    return imageDiv;
};

const createIdDetails = (data) => {
    const id = document.createElement('h1');
    id.innerText = data.id;
    id.classList.add('idDetails');
    return id;
};
const createNameDetails = (data) => {
    const name = document.createElement('h1');
    name.innerText = data.name;
    name.classList.add('nameDetails');
    return name;
};
const createTypeDetails = (data) => {
    const types = document.createElement('p');
    types.classList.add('typesDetails');
    const typesArray = data.type;
    typesArray.forEach((typeName) => {
        const type = document.createElement('span');
        type.innerText = typeName;
        type.classList.add('type');
        type.style.backgroundColor = getcolors(typeName);
        types.appendChild(type);
    });
    return types;
}

const createBasicDetails = (data, detailsPopUp) => {
    const details = document.createElement('div');
    details.classList.add('.minorDetails');
    const id = createIdDetails(data);
    const name = createNameDetails(data);
    const types = createTypeDetails(data);
    details.append(id, name, types);
    return details;
};

const createBase = (data) => {
    const base = document.createElement('h1');
    base.classList.add('base');
    base.innerText = data.base;
    return base;
};
const createWeight = (data) => {
    const weight = document.createElement('h1');
    weight.classList.add('weight');
    weight.innerText = data.weight;
    return weight;
};
const createHeight = (data) => {
    const height = document.createElement('h1');
    height.classList.add('height');
    height.innerText = data.height;
    return height;
};

const createCharacteristics = (data) => {
    const characteristics = document.createElement('div');
    characteristics.classList.add('characteristics');
    const base = createBase(data);
    const weight = createWeight(data);
    const height = createHeight(data);
    characteristics.append(base, weight, height);
    return characteristics;
};

const createMovesDetails = (data) => {
    const container = document.createElement('div');
    container.classList.add('column');
    const title = document.createElement('h2');
    title.innerText = 'Moves :';
    const movesList = document.createElement('ul');
    movesList.classList.add('moves');
    for(const move of data.moves){
        const listItem = document.createElement('li');
        listItem.innerText = move;
        movesList.appendChild(listItem);
    }
    container.append(title, movesList);
    return container;
};
const createAbilityDetails = (data) => {
    const container = document.createElement('div');
    container.classList.add('column');
    const title = document.createElement('h2');
    title.innerText = 'Abilities :';
    const abilityList = document.createElement('ul');
    abilityList.classList.add('abilities');
    for(const ability of data.abilities){
        const listItem = document.createElement('li');
        listItem.innerText = ability;
        abilityList.appendChild(listItem);
    }
    container.append(title, abilityList);
    return container;
};
const createWeaknessDetails = (data) => {
    const container = document.createElement('div');
    container.classList.add('column');
    const title = document.createElement('h2');
    title.innerText = 'Weakness :';
    const weaknessList = document.createElement('ul');
    weaknessList.classList.add('weakness');
    for(const type of data.weakness){
        const listItem = document.createElement('li');
        listItem.innerText = type;
        weaknessList.appendChild(listItem);
    }
    container.append(title, weaknessList);
    return container;
};

const toggleDetails = (isOpen) => {
    const detailsPopUp = document.getElementById('detailsPopUp');
    detailsPopUp.classList.toggle('hide');
    if(isOpen) {
        detailsPopUp.querySelector('#fullDetails').innerText = '';
    }
};

const createDetailsDiv = (data) => {
    const imageDiv = createImageDetails(data);
    const basicDetails = createBasicDetails(data);
    const characteristics = createCharacteristics(data);
    const details = document.createElement('div');
    details.classList.add('sideRow');
    details.append(imageDiv, basicDetails, characteristics);
    return details;
} 

const createOtherDetails = (data) => {
    const moves = createMovesDetails(data);
    const abilities = createAbilityDetails(data);
    const weakness = createWeaknessDetails(data);
    const row = document.createElement('div');
    row.classList.add('row');
    row.append(moves, abilities, weakness);
    return row;
};
const createStats = (data) => {
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('statsDiv');
    data.stats.forEach((statObject) => {
        const statHoder = document.createElement('div');
        const name = document.createElement('p');
        name.innerText = statObject.name;
        const value = document.createElement('meter');
        value.min = 0;
        value.max = 100;
        value.low = 20;
        value.optimum = 40;
        value.high = 60;
        value.value = statObject.value;
        value.setAttribute('statValue', statObject.value);
        // value.statValue = statObject.value;
        statHoder.append(name, value);
        statsDiv.appendChild(statHoder);
    })
    return statsDiv;
};

const getFullDetails = (data) => {
    const detailsPopUp = document.getElementById('detailsPopUp');
   const details = createDetailsDiv(data);
   const stats = createStats(data);
   const others = createOtherDetails(data);
   const container = detailsPopUp.querySelector('#fullDetails');
   container.append(details, stats, others);
   detailsPopUp.appendChild(container);
    toggleDetails();
    document.getElementById('detailsButton').onclick = () => {toggleDetails(true)};
};