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
let timer;
let deleteFirst;
//MODERN WAY
async function start() {

  try{
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    //code below will not run until await is completed
    const data = await response.json();
    //json data of the response, parsed

    createBreedList(data.message);
  }catch(e) {
    console.log("Error, problem fetching breed list.");
  }

}

start();

function createBreedList(breedList) {
  document.getElementById("breed").innerHTML = `
  <select onchange="loadByBreed(this.value)">
    <option>Choose A Dog Breed</option>
    ${Object.keys(breedList).map(function (breed) {
        return `<option>${breed}</option>`;
      }).join("")}
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
  let currentPos = 0;
  clearInterval(timer);
  clearTimeout(deleteFirst);

if(images.length > 1){
  document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide" style="background-image: url('${images[1]}')"></div>
  `
  currentPos += 2

  if(images.length == 2) currentPos = 0
  timer = setInterval(nextSlide, 3000)
}else{
  document.getElementById("slideshow").innerHTML = `
  <div class="slide" style="background-image: url('${images[0]}')"></div>
  <div class="slide"></div>
  `
}



  function nextSlide(){
    document.getElementById("slideshow").insertAdjacentHTML("beforeend", `<div class="slide" style="background-image: url('${images[currentPos]}')"></div>`)
    deleteFirst = setTimeout(function(){
      document.querySelector(".slide").remove()
    }, 1000)
    if(currentPos +1 >= images.length){
      currentPos = 0;
    }else{
      currentPos++;
    }
  }
}
