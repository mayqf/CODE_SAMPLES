// Version 3

// 1.
// Make an API call using the Fetch API or the regular XMLHttpRequest (whichever one you're more comfortable with).
// Use the following URL: https://jsonplaceholder.typicode.com/users
// Parse the response and then display the "name" of the three people within the DOM (inside an unordered list)
'use strict';
{
  const RES_URL = 'https://jsonplaceholder.typicode.com/users';

  async function fetchJSON(url) {
    const body = document.body;
    const usersUl = document.createElement('ul');
    body.appendChild(usersUl);
    const response = await fetch(url).then(response => {
      if (!response.ok) {
        throw Error(`HTTP Error ${response.status} - ${response.statusText}`);
      }
      return response.json();
    });
    response.forEach((user, index) => {
      const li1 = document.createElement('li');
      usersUl.appendChild(li1);
      li1.innerText = 'Name: ' + user.name;
    });
  }
  async function main(url) {
    try {
      await fetchJSON(url);
    } catch (error) {
      const body = document.getElementsByTagName('body');
      const heading = document.createElement('h2');
      body.appendChild(heading);
      heading.innerText = error.message;
    }
  }
  window.onload = () => main(RES_URL);
}

// 2.
// Write a function that takes in an array of strings:
// Return an array with the fruits that start with the letter "P"
const fruits = ['Strawberry', 'Apple', 'Papaya', 'Banana', 'Apricot', 'Pear'];
const fruitsStartWithLetterP = fruits.filter(fruit => fruit[0] === 'P');
console.log(fruitsStartWithLetterP);
// 3.
// Using JavaScript only (adding HTML to index.html is NOT allowed), create a button element (with text "click me!") and an empty image element and add it to the document.
// When the button is clicked, insert an image URL into the <img> tag and remove the button
// Use the following image URL: https://thehub.dk/files/5ad4b4a9f9ac4aa13c3d2d58/logo_upload-6d537cf7e5de664db275b32b3c6ae12d.png

const IMG_URL =
  'https://thehub.dk/files/5ad4b4a9f9ac4aa13c3d2d58/logo_upload-6d537cf7e5de664db275b32b3c6ae12d.png';
const body = document.body;
const myButton = document.createElement('button');
myButton.innerText = 'Click Me!';
body.appendChild(myButton);
myButton.addEventListener('click', function() {
  const myImg = document.createElement('img');
  body.appendChild(myImg);
  myImg.setAttribute('src', IMG_URL);
  body.removeChild(myButton);
});
