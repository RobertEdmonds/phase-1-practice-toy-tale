let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
document.querySelector('.add-toy-form').addEventListener('submit', makeToy)
function makeToy(e){
  e.preventDefault()
  let toy = {
    name: e.target[0].value,
    image: e.target[1].value,
    likes: 0
  }
  console.log(toy)
  renderToy(toy)
  postToy(toy)
}
function renderToy(toy){
  let div = document.createElement('div')
  let h2 = document.createElement('h2')
  let img = document.createElement('img')
  let p = document.createElement('p')
  let btn = document.createElement('button')
  btn.className = 'like-btn'
  div.className = 'card'
  img.className = 'toy-avatar'
  h2.textContent = toy.name
  img.src = toy.image
  p.textContent = toy.likes
  btn.id = toy.id
  btn.textContent = 'Likes'
  btn.addEventListener('click',()=>{
    toy.likes += 1
    p.textContent = toy.likes
    updateLikes(toy)
  })
  div.append(h2, img, p, btn)
  document.querySelector('#toy-collection').appendChild(div)

}


function fetchToy(){
  const getToy = fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(renderToy))
  return getToy
}
fetchToy()

function postToy(toy){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'applications/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toy)

  } )
}
function updateLikes(like){
  fetch(`http://localhost:3000/toys/${like.id}`,{
    method: 'PATCH',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(like)
  })
}
