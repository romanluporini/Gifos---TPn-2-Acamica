sailorDay=document.getElementById('light-style');
sailorNight=document.getElementById('dark-style');
themeList=document.getElementById('btn-theme-opt');
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
var suggestions = [];
var gifsFound;
var hashSearchSug;

//aplica modo light/dark
function theme() {
    mode=localStorage.getItem('darkMode');
    if(mode==='true'){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
}
//contador de visitas
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
//busca las tendencias sugeridas
function getTrendingSearchResults() {
    let found = fetch('https://api.giphy.com/v1/trending/searches?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD')
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
//busca según cada una de las 4 tendencias sugeridas
// y muestra los primeros resultados de cada una
function insertarSugeridos(){
    suggestions=JSON.parse(localStorage.getItem('gifsTrendingSearch'));
    srcSugArr=suggestions.data.splice(0,4);
    console.log(srcSugArr)

    for (i=0; i < srcSugArr.length; i++) {
        let v='gifsTrendSugeridos'+i;
        let found = fetch('https://api.giphy.com/v1/gifs/search?q=' + `${srcSugArr[i]}` + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&limit=10')
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
//busca las tendencias
function getTrendResults(){
    let found = fetch('https://api.giphy.com/v1/gifs/trending?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&limit=10')
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
//muestra las tendencias
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
//hover en tendencias
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
    themeList.checked=false;
})
sailorNight.addEventListener('click', ()=>{
    localStorage.setItem('darkMode', 'true');
    theme();
    themeList.checked=false;
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
    search=searchInput.value;
    console.log(search);
    getSearchResults(search);
    placeHashtags();
    title.innerHTML = (search + ':');
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
    let objSearchSug=JSON.parse(localStorage.getItem('gifsSearchSug'));
    sugResult.innerHTML= objSearchSug.data[0].name;
    simResult2.innerHTML= objSearchSug.data[1].name;
    simResult3.innerHTML= objSearchSug.data[2].name;
}
//busca y muestra según el tag sugerido clickeado
sugResult.addEventListener('click',()=>{
    searchInput.value = sugResult.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
});
simResult2.addEventListener('click',()=>{
    searchInput.value = simResult2.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
});
simResult3.addEventListener('click',()=>{
    searchInput.value = simResult3.innerHTML;
    placeHashtags();
    getSearchResults(searchInput.value);
    title.innerHTML = (searchInput.value + ':');
});
//coloca hashtags relacionados con las búsquedas
function placeHashtags() {
    nav.style.margin="0 0 16px 0";
    autocompleteBlock.style.height="160";
    autocompleteTags.style.display="none";
    
    hashSearchSug = JSON.parse(localStorage.getItem('gifsSearchSug'));
    hashtag1.innerHTML='#' + hashSearchSug.data[0].name;
    hashtag2.innerHTML='#' + hashSearchSug.data[1].name;
    hashtag3.innerHTML='#' + hashSearchSug.data[2].name;
}
//busca y muestra según el hashtag clickeado
hashtag1.addEventListener('click', ()=> {
    let hash1=hashSearchSug.data[0].name;
    getSearchResults(hash1);
    title.innerHTML = (hash1 + ':');
    searchInput.value = hash1;
});
hashtag2.addEventListener('click', ()=>{
    let hash2=hashSearchSug.data[1].name;
    getSearchResults(hash2);
    title.innerHTML = (hash2 + ':');
    searchInput.value = hash2;
})
hashtag3.addEventListener('click', ()=>{
    let hash3=hashSearchSug.data[2].name;
    getSearchResults(hash3);
    title.innerHTML = (hash3 + ':');
    searchInput.value = hash3;
})

//función de búsqueda
async function getSearchResults(searchValue) {    
    let found = fetch('https://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${searchValue}` + '&limit=10')
    .then(response => {
            return response.json();
        })
        .then(data =>{
        localStorage.setItem('gifsGuardados',JSON.stringify(data));
        gifsFound=JSON.parse(localStorage.getItem('gifsGuardados'))
        console.log('Resultados', gifsFound);
        insertarBuscados(gifsFound);
        })
        .catch(error => {
            return error;
        });
}
//muestra resultados de busqueda
function insertarBuscados(param){
    gifSuggestionsBlock.style.display="none";
    gifTrendsBlock.style.display="none";
    gifResultsBlock.style.display="flex";
    console.log('param', param)
    for (i = 0; i < 10; i++) {
        var ctrlId = `sr-${i}`;
        var tagId=`tag-${i+10}`
        if (document.getElementById(ctrlId) && document.getElementById(tagId))
        {
            var ctrlVal = param.data[i].id;
            document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
            var tagVal=param.data[i].title
            document.getElementById(tagId).innerHTML=tagVal;
        }
    }
}
//muestra resultados según el botón "ver más" clickeado
verMasButton1.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos0'));
    title.innerHTML = srcSugArr[0] + ':';
    insertarBuscados(gifsVerMas);
})
verMasButton2.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos1'));
    title.innerHTML = srcSugArr[1] + ':';
    insertarBuscados(gifsVerMas);
})
verMasButton3.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos2'));
    title.innerHTML = srcSugArr[2] + ':';
    insertarBuscados(gifsVerMas)
})
verMasButton4.addEventListener('click', ()=>{
    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";
    let gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos3'));
    title.innerHTML = srcSugArr[3] + ':';
    insertarBuscados(gifsVerMas);
})


