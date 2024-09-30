const createPTagForDetails = (label, text, unit) => {
  const pTag = document.createElement('p');
  const spanTagForLabel = document.createElement('span');
  spanTagForLabel.classList.add('pop-up-label');
  spanTagForLabel.innerText = `${label}: `;
  pTag.append(spanTagForLabel, text, unit);
  return pTag;
};

const addmoreDetails = (label, array) => {
  const divTag = document.createElement('div');
  const spanTagForLabel = document.createElement('span');
  spanTagForLabel.classList.add('pop-up-label');
  spanTagForLabel.innerText = `${label}: `;
  divTag.append(spanTagForLabel, array.toString());
  return divTag;
};

const addSprites = (sprites) => {
  const container = document.createElement('div');
  for (const group in sprites) {
    const divTag = document.createElement('div');
    divTag.appendChild(createPTag(group, group));
    for (const img in sprites[group]) {
      const imgTag = document.createElement('img');
      imgTag.src = sprites[group][img];
      divTag.appendChild(imgTag);
    }
    container.appendChild(divTag);
  }
  return container;
};

const createCloseButton = (popup, overlay) => {
  const button = document.createElement('button');
  button.innerText = 'X';
  button.classList.add('close-button');
  button.addEventListener('click', () => {
    popup.remove();
    overlay.remove();
  });
  return button;
};

const createPopUp = (pokemon) => {
  const container = document.querySelector('.container');
  const divForPopUp = document.createElement('div');
  const divForOverlay = document.createElement('div');
  const divForSprites = addSprites(pokemon.sprites);
  const divForPrimaryDetails = document.createElement('div');
  const divForMoves = addmoreDetails('Moves', pokemon.moves);
  divForSprites.classList.add('pop-up-images');
  divForPrimaryDetails.classList.add('pop-up-details');
  divForMoves.classList.add('pop-up-moves');
  divForPrimaryDetails.append(createPTagForDetails('Name', pokemon.name, ''),
    createPTagForDetails('Id', pokemon.id, ''),
    createPTagForDetails('Height', pokemon.height, ' meter(s)'),
    createPTagForDetails('Weight', pokemon.weight, ' kg'),
    addmoreDetails('Types', pokemon.types),
    addmoreDetails('Abilities', pokemon.abilities),
    addmoreDetails('Statistics', pokemon.statistics),
    addmoreDetails('Weekness', pokemon.weekness));
  divForPopUp.append(divForSprites, divForPrimaryDetails, divForMoves, 
    createCloseButton(divForPopUp, divForOverlay));
  divForOverlay.classList.add('overlay');
  divForPopUp.classList.add('pop-up');
  container.append(divForOverlay, divForPopUp);
};

const displayPopUp = (tag) => {
  for (const pokemon of pokemons) {
    if (pokemon.name === tag.id) {
      createPopUp(pokemon);
      break;
    }
  }
};