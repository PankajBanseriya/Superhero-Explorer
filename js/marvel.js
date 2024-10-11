var api = {
    marvelAPI:{
        apiKey:"f15fc35ccad41a7125ba9eca17a7f792",
        hash:"b7a63e3d31a2cfb32857406aab493945"
    }
}


var marvelAPI = api['marvelAPI'];
var marvelURL = 'https://gateway.marvel.com/v1/public/'
var marvelURLHeader=`ts=1&apikey=${marvelAPI.apiKey}&hash=${marvelAPI.hash}`;

const getdata = async (URL)=>{
    showLoader();
    let res = await fetch(URL);
    res = await res.json();
    let data = res.data.results;
    return data;
}

function showLoader() {
    document.getElementById('loader').style.display = 'block';
}


function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}
