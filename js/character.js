//get character id from url
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//marvel api urls
const characterURL = `${marvelURL}characters/${id}?${marvelURLHeader}`


const title = document.getElementsByTagName('title')[0];
const characterDescription = document.getElementById('character-description');


//redirect to different pages
let redirect = (type)=>{
    window.location.href = `./${type[0]}.html?id=${type[1]}`;
}

//check if the character is marked favourite
const checkFav = (id)=>{
    let charArray = JSON.parse(localStorage.getItem('favChar'));
    console.log(id)
    if(charArray.indexOf(id.toString())!=-1){
        document.querySelector('.char-fav-btn').innerHTML='Remove Favourite';
    }
}

//toggle favourite
const toggle = (id) =>{
    let charArray = JSON.parse(localStorage.getItem('favChar'));
    let idx =charArray.indexOf(id.toString());
    if(idx==-1){
        document.querySelector('.char-fav-btn').innerHTML='Remove Favourite';
        //add to favourite
        charArray.push(id.toString());
        localStorage.setItem('favChar',JSON.stringify(charArray));
    }
    else{
        document.querySelector('.char-fav-btn').innerHTML='Add Favourite';
        //if favourite remove from localstorage and unmark
        charArray.splice(idx,1);
        localStorage.setItem('favChar',JSON.stringify(charArray));
    }
}


//display character fetched from api
const displayCharacter = (character)=>{
    hideLoader();
    title.innerHTML = character.name;
    let description = `
                    <div class="character-desc-card mb-5">
                        <img src="${character.thumbnail.path}.${character.thumbnail.extension}">
                        <div>                    
                            <h3> ${character.name} </h3>
                            <p>${character.description}</p>
                            <a href='https://en.wikipedia.org/wiki/${character.name}' target="_blank">Read More <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div class="char-desc-fav">
                            <button class="char-fav-btn" onclick="toggle(${character.id})"> Add Favourite</button>
                        </div>
                    </div>`;
    characterDescription.innerHTML = description;
    checkFav(character.id);
} 


//fetch character details
getdata(characterURL).then((data)=>displayCharacter(data[0]));

