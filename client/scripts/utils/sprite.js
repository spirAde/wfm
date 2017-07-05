import 'isomorphic-fetch';

// TODO: add error control, also maybe keep svg sprite in localStorage
function loadSprite({ filename }) {
  const url = filename.replace(/([^:]\/)\/+/g, '$1');

  return fetch(url).then(response => response.text()).then(body => {
    const div = document.createElement('div');
    div.innerHTML = body;
    document.body.insertBefore(div, document.body.childNodes[0]);
  });
}

export default loadSprite;
