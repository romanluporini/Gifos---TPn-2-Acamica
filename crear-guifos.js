cameraActivated=document.getElementById('videoElement');
buttonClose=document.getElementById('backToSteps');
buttonCap=document.getElementById('cap-box');
buttonStop=document.getElementById('stop-box');
timer=document.getElementById('timer');                            
timerNumbers=document.getElementById('timer-numbers');
tituloACambiar=document.getElementById('antes-de-empezar');                            
lapsesBar=document.getElementById('lapses-bar');
timeLapsesArr=document.querySelectorAll('.time-lapses');//barra de duración del gif
gifPreview=document.getElementById('imgElem');
buttonRepeat=document.getElementById('btn-repetir');
buttonUpload=document.getElementById('btn-subir');
buttonCancel=document.getElementById('btn-cancelarUp');
timeFractionArr = document.querySelectorAll('.time-fraction'); //barra de carga del gif
buttonDownload=document.getElementById('btn-download');
buttonLink=document.getElementById('btn-copy-link');
buttonDone=document.getElementById('listo');

var recorder;
var stream;
var counter = 1;
var c = 0;
var interval;
var l = 0;
var gifOrder;
var archivo = new Blob();
var form = new FormData();
var controller=new AbortController();
var signal=controller.signal;
var urlGif;
var urlGifArr = [];

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

placeRecordedGifs();//gifs grabados y guardados en el localstorage

//--------------------listeners-------------------------

document.getElementById('activarCamara').addEventListener('click', async (e) => {
    var stream = await navigator.mediaDevices.getUserMedia({
      video: {height: 436, width: 834}
    })

    cameraActivated.srcObject = stream;

    buttonClose.addEventListener('click', ()=>{
        const tracks = stream.getTracks();
        tracks[0].stop();
    })
})

function recordingScreenElements() {   
    buttonCap.style.display="none";
    buttonStop.style.display="block";
    timer.style.display="block";
    tituloACambiar.innerHTML="Capturando tu guifo";
}

buttonCap.addEventListener('click', async function getStreamAndRecord(){
    console.log('la funcion "grabar" se está ejecutando');
    recordingScreenElements();
    await navigator.mediaDevices.getUserMedia({video: {height: 434, width: 832}})
    .then(function(stream) {
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 480,
            width: 832,
            height: 434,
            hidden: 240,
        })
        recorder.startRecording();
        recordTime();
    })
});

function previewScreenElements() {
    cameraActivated.style.display="none";
    gifPreview.style.display="block";
    gifPreview.setAttribute('src', urlGif);
    buttonStop.style.display="none";
    lapsesBar.style.display="block";
    buttonRepeat.style.display="block";
    buttonUpload.style.display="block";
    tituloACambiar.innerHTML="Vista previa";
};

buttonStop.addEventListener("click", ()=>{
    recorder.stopRecording(function(){
        let archivo = new Blob();
        archivo = recorder.getBlob();  
        urlGif = URL.createObjectURL(archivo);

        form.append('file', recorder.getBlob(), 'myGif.gif');
        console.log(form.get('file'));    

        var reader = new FileReader(); 
        reader.readAsDataURL(archivo); 
        reader.onloadend = function () { 
            var base64String = reader.result;
            var gifString=base64String.substring(22);
            let order = localStorage.length + 1;
            gifOrder = 'gif ' + order;
            localStorage.setItem(gifOrder, gifString);
        }
    });

    clearInterval(recordDuration);
    previewScreenElements();
});
        
function repeatScreenElements() {
    lapsesBar.style.display="none";
    buttonRepeat.style.display="none";
    buttonUpload.style.display="none";
    gifPreview.style.display="none";
    cameraActivated.style.display="block";
    buttonStop.style.display="block";
    timer.style.display="block";
    tituloACambiar.innerHTML="Capturando tu guifo";
};

buttonRepeat.addEventListener('click', async function getStreamAndRecord(){
    
    console.log('la funcion "grabar" se está ejecutando');
    repeatScreenElements();
    counter=1;
    l=0;
    stopLapses();
    let order = localStorage.length;
    let gifOrder = 'gif ' + order;
    localStorage.removeItem(gifOrder);
    await navigator.mediaDevices.getUserMedia({video: {height: 434, width: 832}})
    .then(function(stream) {
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 480,
            width: 832,
            height: 434,
            hidden: 240,
        })
        recorder.startRecording();
        recordTime();
    })
});

function backToPreviewScreenElements() {
    document.getElementById('img-globe').style.display="none";
    document.getElementById('upload-bar').style.display="none";
    document.getElementById('texto-subiendo').style.display="none";
    document.getElementById('tiempo-subiendo').style.display="none";
    buttonCancel.style.display="none";
    timer.style.display="block";
    previewScreenElements();
}

buttonCancel.addEventListener('click', ()=>{
    controller.abort();
    stopUpload();   
    backToPreviewScreenElements();
    c=0;
});

function uploadingScreenElements() {
    document.getElementById('img-globe').style.display="block";
    document.getElementById('upload-bar').style.display="flex";
    document.getElementById('texto-subiendo').style.display="block";
    document.getElementById('tiempo-subiendo').style.display="block";
    buttonCancel.style.display="block";
    tituloACambiar.innerHTML="Subiendo Guifo";

    gifPreview.style.display="none";
    cameraActivated.style.display="none";
    buttonRepeat.style.display="none";
    buttonUpload.style.display="none";
    lapsesBar.style.display="none";
    timer.style.display="none";
}

buttonUpload.addEventListener('click', ()=> {
    uploadGifo();
    uploadingScreenElements();
    waitingForUpload();
})

buttonDownload.addEventListener('click', ()=>{
    let order=localStorage.length
    let gifOrder = 'gif ' + order
    recorder.save(localStorage.getItem(gifOrder));
});

buttonLink.addEventListener('click', ()=>{
    let linkCopied = JSON.parse(localStorage.getItem('gifById'));
    navigator.clipboard.writeText(linkCopied.data.url);
});

buttonDone.addEventListener('click', ()=>{
    stopLapses();
    counter=0;
    localStorage.removeItem(gifOrder);
});
//-------------------listeners------------------------

function uploadGifo() {
    console.log('La función de carga se está ejecutando');
    fetch('https://upload.giphy.com/v1/gifs?' + 'api_key=MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&source_image_url=' + urlGif,{
        method: "POST",
        body: form,
        signal: signal
    })
    .then(response => {
        console.log(response.type)
        return response.json()
    })
    .then(response => {
        console.log(response)
        getGifById(response.data.id);
        uploadSuccessfulScreen();
    })
    .catch(error => console.error('Error:', error));
}

function lapsesPainter() {
    console.log('lapsesPainter se está ejecutando')
    if( l == timeLapsesArr.length){
        l = 0;
    } else{
        document.getElementById(timeLapsesArr[l].id).style.background="#F7C9F3";
        console.log(l)
        l++
    }
};
     
function recordTime() { 
    recordDuration = setInterval(()=>{
        if (counter<10){
            timerNumbers.innerHTML='00:00:0' + counter
        }else{
            timerNumbers.innerHTML='00:00:' + counter
        }
        counter++
        lapsesPainter();
    },1000)
}

function stopLapses() {
    for(i=0; i<timeLapsesArr.length; i++){
        document.getElementById(timeLapsesArr[i].id).style.background="#999999";
    }
}

function waitingForUpload(){
    interval = setInterval(()=>{
        if(c==timeFractionArr.length){
            c = 0;
        }else{
            document.getElementById(timeFractionArr[c].id).style.background="#F7C9F3";
            c++
        }
    }, 250);
}

function stopUpload() {
    clearInterval(interval);
    for(i=0; i< timeFractionArr.length; i++){
        document.getElementById(timeFractionArr[i].id).style.background="#999999";
    }
}

function uploadSuccessfulScreen() {
    tituloACambiar.innerHTML="Guifo subido con éxito!";
    document.getElementById('img-globe').style.display="none";
    document.getElementById('upload-bar').style.display="none";
    document.getElementById('texto-subiendo').style.display="none";
    document.getElementById('tiempo-subiendo').style.display="none";
    document.getElementById('btn-cancelarUp').style.display="none";
    document.querySelector('.camera-active').style.width="721px";
    document.querySelector('.camera-active').style.height="391px";
    frame=document.querySelector('.frame');
    frame.style.width="371px";
    frame.style.height="196px";
    frame.style.margin="unset";
    frame.style.position="absolute";
    frame.style.top="51px";
    frame.style.left="24px";
    document.getElementById('imgElem').style.display="block";
    document.querySelector('.copy-download').style.display="flex";
    document.getElementById('btn-listo').style.display="block";
}

function getGifById(id) {
        
    let found = fetch('http://api.giphy.com/v1/gifs/'+ id + '?api_key=' + 'MEzLGHsEgB21300IkEEPzSpYzn9V8brD&')
        
    .then(response => {
        return response.json();
    })
    .then(data =>{
        console.log(data);
        urlGifArr.push(data.data.images.downsized.url);
        console.log(urlGifArr);
        localStorage.setItem('serverGifUrl', JSON.stringify(urlGifArr));
        placeNewGif();
    })
    .catch(error => {
        return error;
    });
}

function placeNewGif() {
    console.log('placeNewGif se está ejecutando')
    let newGif = document.createElement("div");
    let imgInside = document.createElement("img"); 
    newGif.classList.add('gif');
    newGif.appendChild(imgInside);
    let newGifIndex = urlGifArr.length-1;
    imgInside.setAttribute('src', urlGifArr[newGifIndex]);
    document.querySelector('.mg__saved').appendChild(newGif);
}

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
