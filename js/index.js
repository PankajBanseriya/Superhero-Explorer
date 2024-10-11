let searchString = "";
let characterContainer = document.querySelector('#character-container');
let searchBar = document.querySelector('#search-bar');
let searchSuggestions = document.querySelector('#search-suggestions>ul')


function showLoader() {
    document.getElementById('loader').style.display = 'block';
}


function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

let redirect = (type)=>{
    window.location.href = `./html/${type[0]}.html?id=${type[1]}`;
}

//display characters
const displayCharacters = (character)=>{
    
        hideLoader();
        let characterCard = `
            <div class = "character-card" id = "character-${character.id}">
                <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                <p class = "card-name">${character.name}</p>
                <div id = "favChar-${character.id}" class="favourite-btn">
                    <i class="fa-solid fa-star"></i>
                </div>
            </div>`
        characterContainer.innerHTML+=characterCard;
        isFavourite('favChar',character.id);
    
};



//display search suggestions
const displaySearchSuggestion = (searchSuggestion)=>{
    if(searchSuggestion.description.length>0){
        let suggestion = `
            <li class="list-group-item" onclick="redirect(['character',${searchSuggestion.id}])">
                <div style="display:flex">
                    <img src = "${searchSuggestion.thumbnail.path}.${searchSuggestion.thumbnail.extension}" width = 50>
                    <p>${searchSuggestion.name}</p>
                </div>
            </li>` 
       searchSuggestions.insertAdjacentHTML('afterbegin',suggestion)
    }
}

//fetch results from marvel api when search string changes
searchBar.addEventListener('keyup',()=>{
    hideLoader();
    searchString = searchBar.value;
    if(searchString.length>0){
        let marvelSearchURL = `${marvelURL}characters?nameStartsWith=${searchString}&${marvelURLHeader}`;
        searchSuggestions.innerHTML = "";
        getdata(marvelSearchURL).then((data)=>{data.map(displaySearchSuggestion)})
        hideLoader();
    }
    else{
        searchSuggestions.innerHTML = "";
    }
});

let pageNo = Math.floor(Math.random() * 1500);
console.log(pageNo);

//display characters
getdata(`${marvelURL}characters?${marvelURLHeader}&limit=20&offset=${pageNo}`).then((data)=>{
    showLoader();
    data.map(displayCharacters)
});


