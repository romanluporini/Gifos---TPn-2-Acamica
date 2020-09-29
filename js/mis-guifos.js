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
    document.getElementById('visit-counter').innerHTML=counter;
}
visitNumber();

var urlGifArr = []; 

function placeRecordedGifs() {
    if(localStorage.getItem('serverGifUrl')!==null){
        urlGifArr=JSON.parse(localStorage.getItem('serverGifUrl'));
            console.log(urlGifArr.length);
                console.log('placeRecordedGifs se está ejecutando')
                for(i=0; i<urlGifArr.length; i++){
                    let newGif = document.createElement("div");
                    let imgInside = document.createElement("img"); 
                    newGif.classList.add('gif');
                    newGif.appendChild(imgInside);
                    imgInside.setAttribute('src', urlGifArr[i]);
                    console.log(i);
                    document.querySelector('.mg__saved').appendChild(newGif);
                }
    }
}

placeRecordedGifs();