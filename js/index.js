document.addEventListener('DOMContentLoaded', ()=>{
loadMonsters();
createMonsters();

    let forwardButton = document.getElementById('forward');
    let backButton = document.getElementById('back');

    forwardButton.addEventListener('click', ()=> {
        click+=1;
        console.log("front clicks: " + click);
        monsterContainer.textContent='';
        loadMonsters(click);
    })
    backButton.addEventListener('click',()=> {
        if(click > 1){
            console.log("back clicks: " + click);
            click-=1;
            monsterContainer.textContent='';
            loadMonsters(click);
        }
    })
})

let monsterContainer;
let click = 1;

function loadMonsters(){
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${click}`)
    .then(response => response.json())
    .then(data => showMonsters(data))
}

function showMonsters(monsters){
    monsterContainer = document.getElementById('monster-container');
    monsters.forEach(monster => {
            const monsterProfile = document.createElement('div');
            const monsterName = document.createElement('h2');
            const monsterAge = document.createElement('h3');
            const monsterDescription = document.createElement('p');
            monsterName.innerHTML = monster.name;
            monsterAge.innerHTML = monster.age;
            monsterDescription.innerHTML = monster.description;
            monsterProfile.append(monsterName, monsterAge, monsterDescription);
            monsterContainer.appendChild(monsterProfile);    

            })
    }


function createMonsters(){
    const formDiv = document.getElementById('create-monster');
    const createMonsterForm = document.createElement('form');

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name-input');
    nameInput.setAttribute('placeholder', 'Name');

    const ageInput = document.createElement('input');
    ageInput.setAttribute('type', 'number');
    ageInput.setAttribute('id', 'age-input');
    ageInput.setAttribute('placeholder', 'Age');

    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('id', 'description-input');
    descriptionInput.setAttribute('placeholder', 'Description');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('id', 'submit');
    submitButton.textContent = 'Create Monster';
    

    createMonsterForm.append(nameInput, ageInput, descriptionInput, submitButton);
    formDiv.appendChild(createMonsterForm);

    createMonsterForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        //keeps adding old inputed data to json despite deleting.
        //Need to add create monster elements to the DOM
        fetch('http://localhost:3000/monsters/', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                'name': nameInput.value,
                'age': ageInput.value,
                'description': descriptionInput.value
            })
        })
        .then(response => response.json())
        .then(data => addMonstersToTheDOM(data))
})
}

function addMonstersToTheDOM(monster){
        const monsterContainer = document.getElementById('monster-container');
        const monsterProfile = document.createElement('div');
        const monsterName = document.createElement('h2');
        const monsterAge = document.createElement('h3');
        const monsterDescription = document.createElement('p');
        monsterName.innerHTML = monster.name;
        monsterAge.innerHTML = monster.age;
        monsterDescription.innerHTML = monster.description;
        monsterProfile.append(monsterName, monsterAge, monsterDescription);
        monsterContainer.appendChild(monsterProfile);
}