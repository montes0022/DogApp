//UGLY WAY
// fetch("https://dog.ceo/api/breeds/list/all")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
//fetch returns a promise - letting operation run in background that doesnt block other code, asynchronous
//we dont know how long they will take
//.then() will run after promise is done
//.returns another promise, chain on another .then until no promises returned

//MODERN WAY
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  //code below will not run until await is completed
  const data = await response.json();
  //json data of the response, parsed

  createBreedList(data.message);
}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Choose A Dog Breed</option>
    ${Object.keys(breedList)
      .map(function (breed) {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>
  `;
}

async function loadByBreed(breed) {
  if (breed !== "Choose A Dog Breed") {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  `
}
