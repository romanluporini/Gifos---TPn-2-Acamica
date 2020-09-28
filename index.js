sailorDay=document.getElementById('light-style');
sailorNight=document.getElementById('dark-style');
sailorDay.addEventListener('click', ()=>{
    localStorage.setItem('darkMode', 'false');
    theme();
})
sailorNight.addEventListener('click', ()=>{
    localStorage.setItem('darkMode', 'true');
    theme();
})
function theme() {
    mode=localStorage.getItem('darkMode')
    if(mode==='true'){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
}
theme();


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
window.addEventListener('load', ()=>{
    console.log('me recargue XD');
    visitNumber();
    theme();
})

//los hashtags

document.getElementById('eg1').addEventListener('click', ()=>{

    //document.getElementById('egs').style.display="none";
    document.getElementById('suggested').style.display="none";
    document.getElementById('trends').style.display="none";

    gifsHash=JSON.parse(localStorage.getItem('gifsSearchSug'));

    let search=gifsHash.data[0].name;

    document.getElementById('title-resultados').innerHTML = (search + ':');

    function getSearchResults(term) {
        
        let found = fetch('http://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${term}` + '&limit=10')
            
        .then(response => {
                return response.json();
            })
            .then(data =>{
            localStorage.setItem('gifsGuardados',JSON.stringify(data));
            console.log(data);
            })
            .catch(error => {
                return error;
            });

    }
    getSearchResults(search);
        

    let gifsFound = JSON.parse(localStorage.getItem('gifsGuardados'));
        
    function insertarBuscados(gifsFound){

        for (i = 0; i < 10; i++) {
            var ctrlId = `sr-${i}`;
            if (document.getElementById(ctrlId))
            {
                var ctrlVal = gifsFound.data[i].id
                document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
            }
        }

    }

    insertarBuscados(gifsFound);

})

document.getElementById('eg2').addEventListener('click', ()=>{

    //document.getElementById('egs').style.display="none";
    document.getElementById('suggested').style.display="none";
    document.getElementById('trends').style.display="none";

    gifsHash=JSON.parse(localStorage.getItem('gifsSearchSug'));

    let search=gifsHash.data[1].name;

    document.getElementById('title-resultados').innerHTML = (search + ':');

    function getSearchResults(term) {
        
        let found = fetch('http://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${term}` + '&limit=10')
            
        .then(response => {
                return response.json();
            })
            .then(data =>{
            localStorage.setItem('gifsGuardados',JSON.stringify(data));
            console.log(data);
            })
            .catch(error => {
                return error;
            });

    }
    getSearchResults(search);
        

    let gifsFound = JSON.parse(localStorage.getItem('gifsGuardados'));
        
    function insertarBuscados(gifsFound){

        for (i = 0; i < 10; i++) {
            var ctrlId = `sr-${i}`;
            if (document.getElementById(ctrlId))
            {
                var ctrlVal = gifsFound.data[i].id
                document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
            }
        }

    }

    insertarBuscados(gifsFound);

})

document.getElementById('eg3').addEventListener('click', ()=>{

    //document.getElementById('egs').style.display="none";
    document.getElementById('suggested').style.display="none";
    document.getElementById('trends').style.display="none";

    gifsHash=JSON.parse(localStorage.getItem('gifsSearchSug'));

    let search=gifsHash.data[2].name;

    document.getElementById('title-resultados').innerHTML = (search + ':');

    function getSearchResults(term) {
        
        let found = fetch('http://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${term}` + '&limit=10')
            
        .then(response => {
                return response.json();
            })
            .then(data =>{
            localStorage.setItem('gifsGuardados',JSON.stringify(data));
            console.log(data);
            })
            .catch(error => {
                return error;
            });

    }
    getSearchResults(search);
        

    let gifsFound = JSON.parse(localStorage.getItem('gifsGuardados'));
        
    function insertarBuscados(gifsFound){

        for (i = 0; i < 10; i++) {
            var ctrlId = `sr-${i}`;
            if (document.getElementById(ctrlId))
            {
                var ctrlVal = gifsFound.data[i].id
                document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
            }
        }

    }

    insertarBuscados(gifsFound);

})

//los hashtags


//despliega las sugerencias en el input mobile
document.getElementById('sinput-m').addEventListener('keyup', ()=>{
    let search = document.getElementById('sinput-m').value;
    console.log(search);

    let sugResult=document.getElementById('sug-result');
    let simResult2=document.getElementById('sim-result');
    let simResult3=document.getElementById('sim-result2');

    function getSearchSug(term){

        let found = fetch('https://api.giphy.com/v1/tags/related/'+ `${term}` + '?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD'  )
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

    getSearchSug(search);

    objSearchSug=JSON.parse(localStorage.getItem('gifsSearchSug'));
    let innerSearchSug = objSearchSug.data[0].name;
    let innerSearchSug2 = objSearchSug.data[1].name;
    let innerSearchSug3 = objSearchSug.data[2].name;
    sugResult.innerHTML= innerSearchSug;
    simResult2.innerHTML= innerSearchSug2;
    simResult3.innerHTML= innerSearchSug3;
    
});

//despliega las sugerencias en el input desktop
document.getElementById('sinput-d').addEventListener('keyup', ()=>{

    let search = document.getElementById('sinput-d').value;
    console.log(search);

    document.getElementById('barra-busqueda').style.height="225";
    document.getElementById('barra-busqueda').style.zIndex="2";
    document.getElementById('is-writing').style.display="flex";

    let sugResult=document.getElementById('sug-result');
    let simResult2=document.getElementById('sim-result');
    let simResult3=document.getElementById('sim-result2');

    document.getElementById('sinput-d').addEventListener('change', ()=>{
        document.getElementById('barra-busqueda').style.height="160";
        document.getElementById('barra-busqueda').style.zIndex="2";
        document.getElementById('is-writing').style.display="none";    
    })
    

    function getSearchSug(term){

        let found = fetch('https://api.giphy.com/v1/tags/related/'+ `${term}` + '?' + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD'  )
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

    getSearchSug(search);

    objSearchSug=JSON.parse(localStorage.getItem('gifsSearchSug'));
    let innerSearchSug = objSearchSug.data[0].name;
    let innerSearchSug2 = objSearchSug.data[1].name;
    let innerSearchSug3 = objSearchSug.data[2].name;
    sugResult.innerHTML= innerSearchSug;
    simResult2.innerHTML= innerSearchSug2;
    simResult3.innerHTML= innerSearchSug3;
});



//busca lo que se haya tipeado, lo muestra, inserta título y los hashtags
document.getElementById('search-button').addEventListener('click', ()=>{

    let searchD = document.getElementById('sinput-d').value;
    console.log(searchD);

    document.getElementById('nav').style.margin="0 0 16px 0";
    document.getElementById('barra-busqueda').style.height="160";
    document.getElementById('is-writing').style.display="none";
    
    let hashSearchSug = JSON.parse(localStorage.getItem('gifsSearchSug'));
    document.getElementById('eg1').innerHTML='#' + hashSearchSug.data[0].name;
    document.getElementById('eg2').innerHTML='#' + hashSearchSug.data[1].name;
    document.getElementById('eg3').innerHTML='#' + hashSearchSug.data[2].name;

    function getSearchResults(search) {
        
        let found = fetch('http://api.giphy.com/v1/gifs/search?' + 'api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + `&q=${search}` + '&limit=10')
            
        .then(response => {
                return response.json();
            })
            .then(data =>{
            localStorage.setItem('gifsGuardados',JSON.stringify(data));
            console.log(data);
            })
            .catch(error => {
                return error;
            });

        gifsFound=JSON.parse(localStorage.getItem('gifsGuardados'));
        
        let title = document.getElementById('title-resultados').innerHTML = (search + ':');

        function insertarBuscados(gifsFound){
            document.getElementById('suggested').style.display="none";
            document.getElementById('trends').style.display="none";
            document.getElementById('results-found').style.display="block";

            for (i = 0; i < 10; i++) {
                var ctrlId = `sr-${i}`;
                if (document.getElementById(ctrlId))
                {
                    var ctrlVal = gifsFound.data[i].id
                    document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
                }
            }
    }

        insertarBuscados(gifsFound);

    }

    getSearchResults(searchD);

})

// busca y muestra las tendencias sugeridas (los 4 primeros cuadros)
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
getTrendingSearchResults();

var suggestions=JSON.parse(localStorage.getItem('gifsTrendingSearch'));

function insertarSugeridos(suggestions){

    let srcSug0 = suggestions.data[0];
    let srcSug1 = suggestions.data[1];
    let srcSug2 = suggestions.data[2];
    let srcSug3 = suggestions.data[3];

    arrSrc=[srcSug0,srcSug1,srcSug2,srcSug3];

    for (i=0; i < arrSrc.length; i++) {

        console.log(arrSrc[i]);

        let v='gifsTrendSugeridos'+i;

        let found = fetch('http://api.giphy.com/v1/gifs/search?q=' + `${arrSrc[i]}` + '&api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&limit=10')
        .then(response => {
            return response.json();
        })
        .then(data =>{
            //console.log(v);  
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
    
    document.getElementById('sug-img1').setAttribute('src', 'https://media.giphy.com/media/' + `${objSug0.data[0].id}` + '/giphy.gif');
    document.getElementById('title-sug1').innerHTML='#'+ arrSrc[0];

    
    document.getElementById('sug-img2').setAttribute('src', 'https://media.giphy.com/media/' + `${objSug1.data[1].id}` + '/giphy.gif');
    document.getElementById('title-sug2').innerHTML='#'+ arrSrc[1];
    // document.getElementById('ver-mas2').addEventListener('click', ()=>{
    //     document.getElementById('ver-mas2').setAttribute('href', './sug-trend-results.html');
    // })
    document.getElementById('sug-img3').setAttribute('src', 'https://media.giphy.com/media/' + `${objSug2.data[2].id}` + '/giphy.gif');
    document.getElementById('title-sug3').innerHTML='#'+ arrSrc[2];
    // document.getElementById('ver-mas3').addEventListener('click', ()=>{
    //     document.getElementById('ver-mas3').setAttribute('href', './sug-trend-results.html');
    // })

    document.getElementById('sug-img4').setAttribute('src', 'https://media.giphy.com/media/' + `${objSug3.data[3].id}` + '/giphy.gif');
    document.getElementById('title-sug4').innerHTML='#'+ arrSrc[3];
    // document.getElementById('ver-mas4').addEventListener('click', ()=>{
    //     document.getElementById('ver-mas4').setAttribute('href', './sug-trend-results.html');
    // })

}        
insertarSugeridos(suggestions);

//los botones "ver mas..."
document.getElementById('ver-mas1').addEventListener('click', ()=>{

    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";

        gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos0'));

        let title=suggestions.data[0];

        document.getElementById('title-resultados').innerHTML = (title + ':');

        function insertarBuscados(gifsVerMas){
            document.getElementById('suggested').style.display="none";
            document.getElementById('trends').style.display="none";
            document.getElementById('results-found').style.display="block";

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


            // let srcFound0 = gifsVerMas.data[0].id;
            // let srcFound1 = gifsVerMas.data[1].id;
            // let srcFound2 = gifsVerMas.data[2].id;
            // let srcFound3 = gifsVerMas.data[3].id;
            // let srcFound4 = gifsVerMas.data[4].id;
            // let srcFound5 = gifsVerMas.data[5].id;
            // let srcFound6 = gifsVerMas.data[6].id;
            // let srcFound7 = gifsVerMas.data[7].id;
            // let srcFound8 = gifsVerMas.data[8].id;
            // let srcFound9 = gifsVerMas.data[9].id;
        
            // document.getElementById('sr-1').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound0}` + '/giphy.gif');
            // document.getElementById('sr-2').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound1}` + '/giphy.gif');
            // document.getElementById('sr-3').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound2}` + '/giphy.gif');
            // document.getElementById('sr-4').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound3}` + '/giphy.gif');
            // document.getElementById('sr-5').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound4}` + '/giphy.gif');
            // document.getElementById('sr-6').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound5}` + '/giphy.gif');
            // document.getElementById('sr-7').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound6}` + '/giphy.gif');
            // document.getElementById('sr-8').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound7}` + '/giphy.gif');
            // document.getElementById('sr-9').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound8}` + '/giphy.gif');
            // document.getElementById('sr-10').setAttribute('src', 'https://media.giphy.com/media/' + `${srcFound9}` + '/giphy.gif');

        }

        insertarBuscados(gifsVerMas);

})

document.getElementById('ver-mas2').addEventListener('click', ()=>{

    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";

        gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos1'));

        let title=suggestions.data[1];

        document.getElementById('title-resultados').innerHTML = (title + ':');

        function insertarBuscados(gifsVerMas){
            document.getElementById('suggested').style.display="none";
            document.getElementById('trends').style.display="none";
            document.getElementById('results-found').style.display="block";

            for (i = 0; i < 10; i++) {
                var ctrlId = `sr-${i}`;
                if (document.getElementById(ctrlId))
                {
                    var ctrlVal = gifsVerMas.data[i].id
                    document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
                }
            }

        }

        insertarBuscados(gifsVerMas);

})

document.getElementById('ver-mas3').addEventListener('click', ()=>{

    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";

        gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos2'));

        let title=suggestions.data[2];

        document.getElementById('title-resultados').innerHTML = (title + ':');

        function insertarBuscados(gifsVerMas){
            document.getElementById('suggested').style.display="none";
            document.getElementById('trends').style.display="none";
            document.getElementById('results-found').style.display="block";

            for (i = 0; i < 10; i++) {
                var ctrlId = `sr-${i}`;
                if (document.getElementById(ctrlId))
                {
                    var ctrlVal = gifsVerMas.data[i].id
                    document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
                }
            }

        }

        insertarBuscados(gifsVerMas);

})

document.getElementById('ver-mas4').addEventListener('click', ()=>{

    document.querySelector('.nav__arrow-back').style.display="block";
    document.getElementById('egs').style.display="none";

        gifsVerMas=JSON.parse(localStorage.getItem('gifsTrendSugeridos3'));

        let title=suggestions.data[3];

        document.getElementById('title-resultados').innerHTML = (title + ':');

        function insertarBuscados(gifsVerMas){
            document.getElementById('suggested').style.display="none";
            document.getElementById('trends').style.display="none";
            document.getElementById('results-found').style.display="block";

            for (i = 0; i < 10; i++) {
                var ctrlId = `sr-${i}`;
                if (document.getElementById(ctrlId))
                {
                    var ctrlVal = gifsVerMas.data[i].id
                    document.getElementById(ctrlId).setAttribute('src', 'https://media.giphy.com/media/' + `${ctrlVal}` + '/giphy.gif');
                }
            }
        }

        insertarBuscados(gifsVerMas);

})
//los botones "ver mas..."



//busca las tendencias
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
getTrendResults();

//muestra las tendencias
function insertarTendencias(){

    let objTrend = JSON.parse(localStorage.getItem('gifsTendencia'));

    let srcTrend0 = objTrend.data[0].id;
    let srcTrend1 = objTrend.data[1].id;
    let srcTrend2 = objTrend.data[2].id;
    let srcTrend3 = objTrend.data[3].id;
    let srcTrend4 = objTrend.data[4].id;
    let srcTrend5 = objTrend.data[5].id;
    let srcTrend6 = objTrend.data[6].id;
    let srcTrend7 = objTrend.data[7].id;
    let srcTrend8 = objTrend.data[8].id;
    let srcTrend9 = objTrend.data[9].id;

    document.getElementById('trend-img1').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend0}` + '/giphy.gif');
    document.getElementById('trend-img2').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend1}` + '/giphy.gif');
    document.getElementById('trend-img3').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend2}` + '/giphy.gif');
    document.getElementById('trend-img4').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend3}` + '/giphy.gif');
    document.getElementById('trend-img5').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend4}` + '/giphy.gif');
    document.getElementById('trend-img6').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend5}` + '/giphy.gif');
    document.getElementById('trend-img7').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend6}` + '/giphy.gif');
    document.getElementById('trend-img8').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend7}` + '/giphy.gif');
    document.getElementById('trend-img9').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend8}` + '/giphy.gif');
    document.getElementById('trend-img10').setAttribute('src', 'https://media.giphy.com/media/' + `${srcTrend9}` + '/giphy.gif');
}        
insertarTendencias();


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

hoverTags();