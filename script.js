"use strict"

const marginSLider = document.querySelector("#slider-marg");
const sizeSlider = document.querySelector("#slider-size");
const qrColor = document.querySelector("#qr-color");
const backgroundColor = document.querySelector("#bg-color");
const dataInput = document.querySelector("#detail");
const imageFormat = document.querySelector('input[name="img-format"]:checked');
const submitButton = document.querySelector("#finalSubmit");

const infoContainer = document.querySelector("#qr-code-info");
const resContainer = document.querySelector("#qr-code-result");
const qrCodeImg = document.querySelector("#qr-code-image");

const goBack = document.querySelector("#edit");

marginSLider.addEventListener("change",function(){
    const margVal = marginSLider.value; 
    document.querySelector("#marg-val").innerHTML = margVal + "px";
});

sizeSlider.addEventListener("change",function(){
    const sizeVal = sizeSlider.value; 
    document.querySelector("#size-val").innerHTML = sizeVal + " x " + sizeVal;
});

qrColor.addEventListener("change",function(){
    const qrColorVal = qrColor.value; 
    document.querySelector("#qr-color-val").innerHTML = qrColorVal;
});

backgroundColor.addEventListener("change",function(){
    const bgColorVal = backgroundColor.value; 
    document.querySelector("#bg-color-val").innerHTML = bgColorVal;
});


dataInput.addEventListener("input", function() {
    submitButton.disabled = dataInput.value.trim() === "";
});

const prepareParameters = (params) =>{
    return{
        data: params.data,
        size: params.size,
        color: params.color.replace('#',''),
        bgcolor: params.bgColor.replace('#',''),
        margin: params.margin,
        format: params.format
    }
}



const dsiplayQrCode = (imgURL) =>{
    infoContainer.classList.add("flipped");
    resContainer.classList.add("flipped");
    qrCodeImg.setAttribute('src', imgURL);
}


const getQrCode = (parameters) =>{
    const urlParams = new URLSearchParams(prepareParameters(parameters)).toString();
    const url = "https://api.qrserver.com/v1/create-qr-code/";
    fetch(`${url}?${urlParams}`).then(response=>{
        if(response.status===200){
            dsiplayQrCode(`${url}?${urlParams}`);
        }
    });
}

submitButton.addEventListener("click",function(e){
    e.preventDefault();
    console.log("clicked");
    const data = dataInput.value;
    const size = sizeSlider.value;
    const color = qrColor.value;
    const bgColor = backgroundColor.value;
    const margin = marginSLider.value;
    const format = imageFormat.id;
    const parameters = ({data, size, color, bgColor, margin, format});

    getQrCode(parameters);
});


goBack.addEventListener("click",function(){
    infoContainer.classList.remove("flipped");
    resContainer.classList.remove("flipped");
});


