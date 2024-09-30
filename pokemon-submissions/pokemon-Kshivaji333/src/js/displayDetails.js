
const createTypeObject = async (element) => {
  const type = {};
  type.name = element.type.name;
  const response = await fetch(element.type.url);
  const typeDAta = await response.json();
  type.icon = typeDAta.sprites['generation-viii']['sword-shield']['name_icon'];

  return type;
}

const createPopUpForDetials = () => {
  const container = document.querySelector('main');
  const popUp = document.createElement('div');
  popUp.id = 'detailsPopUp';
  popUp.className = 'hide';
  container.appendChild(popUp);
  return popUp;
};

const showDetailsPopUp = () => {
  const popUp = document.getElementById('detailsPopUp');
  if (popUp.className === 'hide') {
    popUp.className = 'detailsPopUp'
  } else {
    popUp.className = 'hide';
  }
};

const createPTag = (text, lable) => {
  const pTag = document.createElement('p');
  if (lable) {
    const spanTag = document.createElement('span');
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

const createTatForAbilities = (abilities) => {
  const container = document.createElement('div');
  container.className = "ABILITIES";
  container.appendChild(createPTag('abilities'))
  for (const ability of abilities) {
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
const appendTags = (container,tags) => {
  for (const tag of tags) {
    container.appendChild(tag);
  }
}

const appendDetails = (details, id) => {
  const popUp = createPopUpForDetials();
  showDetailsPopUp();
  const imgTAg = createImgTag(dataOfAllpokemons[id].imageUrl, dataOfAllpokemons[id].name);
  const nameTag = createH2Tag(dataOfAllpokemons[id].name)
  const height = createPTag(details.height, "height");
  const weight = createPTag(details.weight, "weight");
  const types = createTagForTypes(details.types);
  const abilities = createTatForAbilities(details.abilities)
  const moves = createTatForMoves(details.moves);

  appendTags(popUp,[imgTAg,nameTag,types,abilities,height,weight,moves])

};




// const getWeakness = async (id) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`)
//   const data = await response.json();
//   console.log(data);
//   // return
// };

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

  const height = data.height;
  const weight = data.weight
  const moves = getNames(data.moves, 'move');
  const abilities = getNames(data.abilities, 'ability')
  // console.log(data)
  return { types, height, weight, moves, abilities }
};

const showDetails = async (id) => {
  const allDetails = await getDetail(id);
  // const weakness = await getWeakness(id);
  // allDetails.weakness = weakness;
  appendDetails(allDetails, id);
  return allDetails;
}

const addClickEvent = (card) => {
  const id = card.id;
  card.addEventListener('click', () => {
    showDetails(id);
  }
  )
}