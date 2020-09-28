sailorDay=document.getElementById('light-style');
sailorNight=document.getElementById('dark-style');
searchInput=document.getElementById('sinput-d');
autocompleteBlock=document.getElementById('barra-busqueda');
autocompleteTags=document.getElementById('is-writing');
sugResult=document.getElementById('sug-result');
simResult2=document.getElementById('sim-result');
simResult3=document.getElementById('sim-result2');
searchButton=document.getElementById('search-button');
nav=document.getElementById('nav');
hashtag1=document.getElementById('eg1');
hashtag2=document.getElementById('eg2');
hashtag3=document.getElementById('eg3');
title=document.getElementById('title-resultados');
gifSuggestionsBlock=document.getElementById('suggested');
gifTrendsBlock=document.getElementById('trends');
gifResultsBlock=document.getElementById('results-found');
imgSuggestedTerm1=document.getElementById('sug-img1');
titleSuggestedTerm1=document.getElementById('title-sug1');
imgSuggestedTerm2=document.getElementById('sug-img2');
titleSuggestedTerm2=document.getElementById('title-sug2');
imgSuggestedTerm3=document.getElementById('sug-img3');
titleSuggestedTerm3=document.getElementById('title-sug3');
imgSuggestedTerm4=document.getElementById('sug-img4');
titleSuggestedTerm4=document.getElementById('title-sug4');
verMasButton1=document.getElementById('ver-mas1');
verMasButton2=document.getElementById('ver-mas2');
verMasButton3=document.getElementById('ver-mas3');
verMasButton4=document.getElementById('ver-mas4');


var search;// lo que se escriba en el input de búsqueda
var srcSugArr = []; 
var suggestions;
var gifsFound;

//se llama con el event 'load'
function theme() {
    mode=localStorage.getItem('darkMode')
    if(mode==='true'){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
}
//se llama con el event 'load'
function visitNumber() {    
    let counter;
    counter=JSON.parse(localStorage.getItem('visitCounter'));
    if(counter!==null){
        counter++;
        document.getElementById('visit-counter').innerHTML=counter;
        localStorage.setItem('visitCounter' , JSON.stringify(counter));
    }else{
        counter=1;
        document.getElementById('visit-counter').innerHTML=counter;
        localStorage.setItem('visitCounter' , JSON.stringify(counter));
    }
}
//se llama con el event 'load'
function getTrendingSearchResults() {
    let found = fetch('http://api.giphy.com/v1/trending/searches?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD')
    .then(response => {
            return response.json();
        })
        .then(data =>{
           localStorage.setItem('gifsTrendingSearch',JSON.stringify(data));
           console.log('estos son los trending search');
           console.log(data);
        })
        .catch(error => {
            return error;
        }); 
}
//se llama con el event 'load'
function insertarSugeridos(){
    suggestions=JSON.parse(localStorage.getItem('gifsTrendingSearch'));
    for(i=0; i<4; i++){
        srcSugArr.push(suggestions.data[i]);
        console.log(i,srcSugArr);
    }
    for (i=0; i < srcSugArr.length; i++) {
        let v='gifsTrendSugeridos'+i;
        let found = fetch('http://api.giphy.com/v1/gifs/search?q=' + `${srcSugArr[i]}` + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&limit=10')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            localStorage.setItem(v,JSON.stringify(data));  
            console.log(data);
        })
        .catch(error => {
            return error;
        });
    }
    let objSug0 = JSON.parse(localStorage.getItem('gifsTrendSugeridos0'));
    let objSug1 = JSON.parse(localStorage.getItem('gifsTrendSugeridos1'));
    let objSug2 = JSON.parse(localStorage.getItem('gifsTrendSugeridos2'));
    let objSug3 = JSON.parse(localStorage.getItem('gifsTrendSugeridos3'));
    imgSuggestedTerm1.setAttribute('src', 'https://media.giphy.com/media/' + `${objSug0.data[0].id}` + '/giphy.gif');
    titleSuggestedTerm1.innerHTML='#'+ srcSugArr[0];
    imgSuggestedTerm2.setAttribute('src', 'https://media.giphy.com/media/' + `${objSug1.data[1].id}` + '/giphy.gif');
    titleSuggestedTerm2.innerHTML='#'+ srcSugArr[1];
    imgSuggestedTerm3.setAttribute('src', 'https://media.giphy.com/media/' + `${objSug2.data[2].id}` + '/giphy.gif');
    titleSuggestedTerm3.innerHTML='#'+ srcSugArr[2];
    imgSuggestedTerm4.setAttribute('src', 'https://media.giphy.com/media/' + `${objSug3.data[3].id}` + '/giphy.gif');
    titleSuggestedTerm4.innerHTML='#'+ srcSugArr[3];
}       
//se llama con el event 'load'
function getTrendResults(){
    let found = fetch('http://api.giphy.com/v1/gifs/trending?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&limit=10')
    .then(response => {
        return response.json();
    })
    .then(data =>{
        localStorage.setItem('gifsTendencia',JSON.stringify(data));  
        console.log(data);
    })
    .catch(error => {
        return error;
    })
}
//se llama con el event 'load'
function insertarTendencias(){
    let objTrend = JSON.parse(localStorage.getItem('gifsTendencia'));
    for (i = 0; i < 10; i++) {
        var ctrlId = `trend-img${i}`;
        if (document.getElementById(ctrlId))
        {
            var ctrlVal = objTrend.data[i].id
            document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
        }
    }
}        
//se llama con el event 'load'
function hoverTags() {
    let objTrend=JSON.parse(localStorage.getItem('gifsTendencia'));
    for (i = 0; i < 10; i++) {
        var ctrlId = 'tag-' + i;
        if (document.getElementById(ctrlId))
        {
            var ctrlVal = objTrend.data[i].title
            document.getElementById(ctrlId).innerHTML=ctrlVal;
        }
    }
}


window.addEventListener('load', ()=>{
    console.log('me recargue XD');
    visitNumber();
    theme();
    getTrendingSearchResults();
    insertarSugeridos();
    getTrendResults();
    insertarTendencias();
    hoverTags();
})

sailorDay.addEventListener('click', ()=>{
    localStorage.setItem('darkMode', 'false');
    theme();
})
sailorNight.addEventListener('click', ()=>{
    localStorage.setItem('darkMode', 'true');
    theme();
})

searchInput.addEventListener('keyup', ()=>{
    search = searchInput.value;
    console.log(search);

    autocompleteBlock.style.height="225";
    autocompleteBlock.style.zIndex="2";
    autocompleteTags.style.display="flex";

    getSearchSug(search);
    placeTags();
});

searchButton.addEventListener('click', ()=>{
    autocompleteBlock.style.height="160";
    autocompleteBlock.style.zIndex="2";
    autocompleteTags.style.display="none";    
    getSearchResults(search);
})

//busca las sugerencias de autocompletado de búsqueda
function getSearchSug(term){
    let found = fetch('https://api.giphy.com/v1/tags/related/'+ `${term}` + '?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD')
    .then(response => {
        return response.json();
    })
    .then(data =>{
        localStorage.setItem('gifsSearchSug',JSON.stringify(data));  
        console.log(data);
    })
    .catch(error => {
        return error;
    })
}
//coloca las sugerencias de autocompletado de búsqueda
function placeTags() {
    objSearchSug=JSON.parse(localStorage.getItem('gifsSearchSug'));
    sugResult.innerHTML= objSearchSug.data[0].name;
    simResult2.innerHTML= objSearchSug.data[1].name;
    simResult3.innerHTML= objSearchSug.data[2].name;
}

sugResult.addEventListener('click',()=>{
    searchInput.value = sugResult.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
    insertarBuscados();
});
simResult2.addEventListener('click',()=>{
    searchInput.value = simResult2.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
    insertarBuscados();
});
simResult3.addEventListener('click',()=>{
    searchInput.value = simResult3.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
    insertarBuscados();
});

searchButton.addEventListener('click', ()=>{
    search=searchInput.value;
    console.log(search);
    placeHashtags();
    getSearchResults(search);
    title.innerHTML = (search + ':');
    insertarBuscados();
})

function placeHashtags() {
    nav.style.margin="0 0 16px 0";
    autocompleteBlock.style.height="160";
    autocompleteTags.style.display="none";
    
    let hashSearchSug = JSON.parse(localStorage.getItem('gifsSearchSug'));
    hashtag1.innerHTML='#' + hashSearchSug.data[0].name;
    hashtag2.innerHTML='#' + hashSearchSug.data[1].name;
    hashtag3.innerHTML='#' + hashSearchSug.data[2].name;
}

function getSearchResults(searchValue) {    
    let found = fetch('http://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${searchValue}` + '&limit=10')
    .then(response => {
            return response.json();
        })
        .then(data =>{
        localStorage.setItem('gifsGuardados',JSON.stringify(data));
        console.log('Resultados', data);
        })
        .catch(error => {
            return error;
        });
}
    
function insertarBuscados(){
    gifsFound= JSON.parse(localStorage.getItem('gifsGuardados'));
    gifSuggestionsBlock.style.display="none";
    gifTrendsBlock.style.display="none";
    gifResultsBlock.style.display="block";

    for (i = 0; i < 10; i++) {
        var ctrlId = `sr-${i}`;
        if (document.getElementById(ctrlId))
        {
            var ctrlVal = gifsFound.data[i].id;
            document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
        }
    }
}
//
//los botones "ver mas..."
verMasButton1.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos0'));
    title.innerHTML = suggestions.data[0] + ':';
    insertarVerMas(gifsVerMas);
})
verMasButton2.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos1'));
    title.innerHTML = suggestions.data[0] + ':';
    insertarVerMas(gifsVerMas);
})
verMasButton3.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos2'));
    title.innerHTML = suggestions.data[0] + ':';
    insertarVerMas(gifsVerMas)
})
verMasButton4.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos3'));
    title.innerHTML = suggestions.data[0] + ':';
    insertarVerMas(gifsVerMas);
})

function insertarVerMas(gifsVerMas){
    gifSuggestionsBlock.style.display="none";
    gifTrendsBlock.style.display="none";
    gifResultsBlock.style.display="block";
    for (i = 0; i < 10; i++) {
        var ctrlId = `sr-${i}`;
        var tagId=`tag-${i+10}`
        if (document.getElementById(ctrlId) && document.getElementById(tagId))
        {
            var ctrlVal = gifsVerMas.data[i].id
            document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
            var tagVal=gifsVerMas.data[i].title
            document.getElementById(tagId).innerHTML=tagVal;
        }
    }
}


//cuando cambie de tema está bueno que haga la transición,
//pero después cuando está seleccionado,no. CAMBIAR

//agregar el contenedor sr (search results o algo así) a la clase dark

//ver si se puede meterle a hacer todo con parametros las funciones de búsqueda
//etc... va a tomar su tiempo pero es lo mejor