const displayDetails = function () {
  const content = getContentElements();
  for (let index = 0; index < content.length; index++) {
    const button = content[index].querySelector('button');
    button.addEventListener ('click', function () {
      showOnly(content[index], content);
    })
  }
};

const showOnly = function (one, content) {
  for (let index = 0; index < content.length; index++) {
    content[index].style.display = 'none';
  }
  one.style.display = 'block';
  one.classList.add('show-only');
  const hidden = one.querySelector('.hidden');
  const exit = one.querySelector('.button');
  exit.innerText = 'Exit';
  hidden.style.display = 'block';
  exit.addEventListener('click', function() {
    showAll(one, content, hidden, exit);
    exit.innerText = 'know more';
  })
}

const showAll = function (one, content, hidden, exit) {
  for (let index = 0; index < content.length; index++) {
    content[index].style.display = 'block';
  }
  one.classList.remove('show-only');
  hidden.style.display = 'none';
  exit.addEventListener('click', function () {
    showOnly(one, content);
  });
}