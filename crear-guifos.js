window.addEventListener('load', ()=>{
    linkclickeado=localStorage.getItem('cg-mg');
    if (linkclickeado == "mg"){
        document.querySelector('.crear-gifs').style.display="none"
    }
});

document.getElementById('activarCamara').addEventListener('click', async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {height: 436, width: 834}
    })
    document.getElementById('videoElement').srcObject = stream;

    document.getElementById('backToSteps').addEventListener('click', ()=>{
        const tracks = stream.getTracks();
        tracks[0].stop();
    })


})

buttonCap=document.getElementById('cap-box');
buttonStop=document.getElementById('stop-box');
timer=document.getElementById('timer');                            
tituloACambiar=document.getElementById('antes-de-empezar');                            
lapsesBar=document.getElementById('lapses-bar');
buttonRepeat=document.getElementById('btn-repetir');
buttonUpload=document.getElementById('btn-subir');
buttonDownload=document.getElementById('btn-download');
buttonLink=document.getElementById('btn-copy-link');


buttonCap.addEventListener('click',  async function getStreamAndRecord(){ 

    buttonCap.style.display="none";
    buttonStop.style.display="block";
    timer.style.display="block";
    tituloACambiar.innerHTML="Capturando tu guifo";

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {height: 434, width: 832}
        })
        
        .then(function(stream,recorder) {
    
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 480,
                width: 832,
                height: 434,
                hidden: 240,
            })
    
            recorder.startRecording();

            buttonStop.addEventListener("click", ()=>{       

                recorder.stopRecording(function(){
                    let archivo = new Blob();
                    archivo = recorder.getBlob();  

                    var reader = new FileReader(); 
                    reader.readAsDataURL(archivo); 
                    reader.onloadend = function () { 
                        var base64String = reader.result;
                        var gifString=base64String.substring(22);
                        let order = localStorage.length + 1;
                        let gifOrder = 'gif ' + order;
                        localStorage.setItem(gifOrder, gifString);
                    }


                    document.getElementById('videoElement').style.display="none";
                    document.getElementById('imgElem').style.display="block";
                    document.getElementById('imgElem').setAttribute('src',`${URL.createObjectURL(archivo)}`);
                    
                    buttonStop.style.display="none";
            
                    lapsesBar.style.display="block";
                    buttonRepeat.style.display="block";
                    buttonUpload.style.display="block";
                    tituloACambiar.innerHTML="Vista previa";
            
                    buttonRepeat.addEventListener('click', () => {
                    
                        lapsesBar.style.display="none";
                        buttonRepeat.style.display="none";
                        buttonUpload.style.display="none";
                        document.getElementById('imgElem').style.display="none";
                        document.getElementById('videoElement').style.display="block";
            
                        //ver esta línea que va hacia atrás que seguramente trae CONFLICTOS
                        getStreamAndRecord();
                    });
            
                    buttonUpload.addEventListener('click', ()=> {
    
                        let archivo = new Blob();
                        archivo = recorder.getBlob();
                        console.log(archivo);

                        let form = new FormData();
                        form.append('file', recorder.getBlob(), 'myGif.gif');
                        console.log(form.get('file'));

                        var urlGif = URL.createObjectURL(archivo);
                        localStorage.setItem('urlGifForCopy', urlGif);
                        
                        let controller=new AbortController();
                        let signal=controller.signal;

                        fetch('https://upload.giphy.com/v1/gifs?' + 'api_key=MEzLGHsEgB21300IkEEPzSpYzn9V8brD' + '&source_image_url=' + urlGif,{
                            // headers: {'Content-Type': 'multipart/form-data'},
                            // mode:'no-cors',        
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
                            getGifById(response.data.id)
                        })
                        .catch(error => console.error('Error:', error));
                    
                        document.getElementById('img-globe').style.display="block";
                        document.getElementById('upload-bar').style.display="flex";
                        document.getElementById('texto-subiendo').style.display="block";
                        document.getElementById('tiempo-subiendo').style.display="block";
                        document.getElementById('btn-cancelarUp').style.display="block";
                        tituloACambiar.innerHTML="Subiendo Guifo";
                    
                        document.getElementById('imgElem').style.display="none";
                        document.getElementById('videoElement').style.display="none";
                        document.getElementById('btn-repetir').style.display="none"
                        document.getElementById('btn-subir').style.display="none"
                        lapsesBar.style.display="none"
                        document.getElementById('timer').style.display="none"
                    
                        //cuando termine de subir el guifo se tiene que mostrar
                        // lo siguiente...

                        waitingForUpload();

                        //por ahora configuro para que se vea cuando haga click en
                        // el botón "cancelar" de la etapa "subiendo el guifo"
                        buttonDownload.addEventListener('click', ()=>{
                            let order=localStorage.length
                            let gifOrder = 'gif ' + order
                            recorder.save(localStorage.getItem(gifOrder));
                        });
                        buttonLink.addEventListener('click', ()=>{
                            let linkCopied = JSON.parse(localStorage.getItem('gifById'));
                            navigator.clipboard.writeText(linkCopied.data.url);
                        });
                    

                        document.getElementById('btn-cancelarUp').addEventListener('click', ()=>{
                            controller.abort();
                            stopInterval();      
                        });
                    
                    })
                    
                    
            
                });
            
            });
                    
    
        })


    
})

var timeFractionArr = document.querySelectorAll('.time-fraction');
var c = 0;
var interval;

function waitingForUpload(){
    interval = setInterval(()=>{
        if( c > timeFractionArr.length){
            c = 0;
        }
        document.getElementById(timeFractionArr[c].id).style.background="#F7C9F3";
        c++
    }, 250);
}

function stopInterval() {
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
        localStorage.setItem('gifById',JSON.stringify(data));
        console.log(data);
        stopInterval();
        uploadSuccessfulScreen();
    })
    .catch(error => {
        return error;
    });
}
