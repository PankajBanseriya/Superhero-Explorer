let characterContainer = document.querySelector('#character-container');

let redirect = (type)=>{
    console.log('first')
    window.location.href = `./${type[0]}.html?id=${type[1]}`;
}

//display favourite characters
const displayCharacter = (character)=>{
    hideLoader();
    //fetch character details
    getdata(`${marvelURL}characters/${character}?${marvelURLHeader}`)
    .then((data)=>data[0])
    .then(character=>{
        let characterCard = `
            <div class = "character-card" id = "character-${character.id}">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                <p class = "card-name">${character.name}</p>
                <div id = "favChar-${character.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>`
        characterContainer.innerHTML+=characterCard;
    });
}



//fetch favourite characters from local storage
let charArray = JSON.parse(localStorage.getItem('favChar'));


charArray.map(character=>displayCharacter(character));
