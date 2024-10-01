
const createTypeObject = async (element) => {
  const type = {};
  type.name = element.type.name;
  const response = await fetch(element.type.url);
  const typeData = await response.json();
  type.icon = typeData.sprites['generation-viii']['sword-shield']['name_icon'];

  return type;
};

const createPopUpCard = () => {
  const popUpCard = document.createElement('div');
  popUpCard.id = 'popUpCard';
  popUpCard.className = 'popUpCard';

  return popUpCard;
};

const createPopUpForDetails = () => {
  const container = document.querySelector('main');
  const popUpContainer = document.createElement('div')
  const popUpCard = createPopUpCard();

  popUpContainer.className = 'hide';
  popUpContainer.id = "popUpContainer";
  popUpContainer.addEventListener('click', closePopUp)

  popUpContainer.appendChild(popUpCard);
  container.appendChild(popUpContainer);

  return popUpContainer;
};

const showpopUpCard = () => {
  const popUp = document.getElementById('popUpContainer');
  if (popUp.className === 'hide') {
    popUp.className = 'popUpContainer';
  } else {
    popUp.className = 'hide';
  }
};

const closePopUp = (e) => {
  if (e.target.id === "popUpContainer" || e.target.id === "closePopUp") {
    showpopUpCard();
  }
};

const createPTag = (text, lable) => {
  const pTag = document.createElement('p');
  if (lable) {
    const spanTag = document.createElement('span');
    spanTag.className = lable;
    spanTag.innerText = `${lable} : `
    pTag.appendChild(spanTag);
  }
  pTag.className = text;
  pTag.innerText += text;
  return pTag;
};

const createTagForTypes = (types) => {
  const typeContainer = document.createElement('div');
  typeContainer.className = 'typeContainer'

  for (const type of types) {
    const imgTag = document.createElement('img');
    imgTag.src = type.icon;
    imgTag.alt = type.name;
    imgTag.className = 'typeIcon';
    typeContainer.appendChild(imgTag);
  }

  return typeContainer;
};

const createTatForAbilitiesOrWeakness = (data, className, heading) => {
  const container = document.createElement('div');
  container.className = className;
  container.appendChild(createPTag(heading))
  for (const ability of data) {
    container.appendChild(createPTag(ability));
  }
  return container;
};

const createTatForMoves = (moves) => {
  const container = document.createElement('div');
  container.className = "moves";
  container.appendChild(createPTag('MOVES'))
  for (let index = 0; index < 4; index++) {
    container.appendChild(createPTag(moves[index]));
  }
  return container;
}
const appendTags = (container, tags) => {
  container.innerHTML = ""
  for (const tag of tags) {
    container.appendChild(tag);
  }
};

const createCloseButton = () => {
  const closeButton = document.createElement('button');
  closeButton.id = 'closePopUp';
  closeButton.innerText = 'x';
  return closeButton;
};
const createTagForStats = (statistics) => {
  const container = document.createElement('div');
  container.appendChild(createPTag("STASTISTICS"))
  container.className = 'statistics';
  for (const element of statistics) {
    container.appendChild(createPTag(`base_stat = ${element.base_stat},   sata : ${element['stat'].name} `));
  }
  console.log(container);

  return container;
}
const appendDetails = (details, id) => {
  let popUp = document.getElementById('popUpCard');
  const closeButton = createCloseButton()
  const imgTAg = createImgTag(dataOfAllpokemons[id].imageUrl, dataOfAllpokemons[id].name);
  const nameTag = createH2Tag(dataOfAllpokemons[id].name)
  const height = createPTag(details.height, "height");
  const weight = createPTag(details.weight, "weight");
  const types = createTagForTypes(details.types);
  const abilities = createTatForAbilitiesOrWeakness(details.abilities, 'abilities', 'ABILITIES')
  const moves = createTatForMoves(details.moves);
  const weakness = createTatForAbilitiesOrWeakness(details.weakness, 'weakness', 'WEAKNESS')
  const statistics = createTagForStats(details.statistics)

  appendTags(popUp, [closeButton, imgTAg, nameTag, types, abilities, weakness, height, weight, moves, statistics])

};




const getWeakness = async (types) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${types[0].name}`)
  const data = await response.json();
  const weakness = data['damage_relations']['double_damage_from'].map((weaknes) => {
    return weaknes.name;
  });
  return weakness;
};

const getNames = (data, typeOfData) => {
  const names = [];
  for (const element of data) {
    names.push(element[typeOfData].name);
  }
  return names;
};

const getDetail = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  const types = [];
  for (const element of data.types) {
    const typeObject = await createTypeObject(element);
    types.push(typeObject);
  }
  const statistics = [];
  for (const element of data.stats) {
    statistics.push(element);
  }
  const height = data.height;
  const weight = data.weight
  const moves = getNames(data.moves, 'move');
  const abilities = getNames(data.abilities, 'ability');
  return { types, height, weight, moves, abilities, statistics };
};

const showDetails = async (id) => {
  const allDetails = await getDetail(id);
  const weakness = await getWeakness(allDetails.types);
  allDetails.weakness = weakness;
  appendDetails(allDetails, id);

  return allDetails;
}

const addClickEvent = (card) => {
  const id = card.id;
  card.addEventListener('click', () => {
    let popUp = document.getElementById('popUpCard')
    if (!popUp) {
      createPopUpForDetails();
      popUp = document.getElementById('popUpCard')
    }
    popUp.innerHTML = '';
    showpopUpCard();
    showLoader(popUp);
    showDetails(id);
  }
  )
}