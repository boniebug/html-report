/* form functionality */
const createForm = () => {
  const headings = getHeadings();
  for (const title of headings) {
    createInput(title);
  }
};

const createInput = (title) => {
  const myForm = document.getElementById('formInputs');
  const input = document.createElement('input');
  const label = document.createElement('label');
  input.type = 'text';
  input.id = `form-${title}`;
  input.required = true;
  input.placeholder = `Enter a ${title}`;
  label.for = title;
  label.innerText = `${title}:`;
  myForm.append(label, input);
};

const displayForm = () => {
  const addBookForm = document.getElementById('addBookDetails');
  addBookForm.style.display = 'flex';
  setLendButtonDisability(true, 0.5);
  document.body.style.backgroundColor = 'grey';
  document.getElementById('closeForm').addEventListener('click', closeForm);
  document.getElementById('addBookDetails').addEventListener('submit', (e) => {
    e.preventDefault();
    getFormData();
  });
  document.getElementById('refreshButton').onclick = refreshForm;
};

const setLendButtonDisability = (value, opacityValue) => {
  const lendButton = document.getElementsByClassName('lendButton');
  for (const element of lendButton) {
    element.disabled = value;
    element.style.opacity = opacityValue;
  }
};

const getFormData = () => {
  const object = {};
  const headings = getHeadings();
  for (const title of headings) {
    const inputElement = document.getElementById(`form-${title}`);
    object[title] = inputElement.value;
  }
  checkCategory(object);
  refreshForm();
  closeForm();
  categorize(document.getElementById('category').value);
};

const checkCategory = (object) => {
  const mainSection = document.getElementById('mainSection');
  let isinclude = false;
  for (const category in object) {
    if (!groupObject[category].includes(object[category])) {
      groupObject[category].push(object[category]);
      isinclude = true;
    }
  }
  if (isinclude && object['Name'] !== '') {
    createDiv(object, mainSection);
  }
};

const refreshForm = () => {
  document.getElementById('addBookDetails').reset();
};

const closeForm = () => {
  document.body.style.backgroundColor = 'white';
  document.getElementById('addBookDetails').style.display = 'none';
  setLendButtonDisability(false, 1);
};
