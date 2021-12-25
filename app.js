window.addEventListener('load', app, false);

function app (){

    const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");


const levels = Array.from (document.getElementsByClassName("mode"));
const squares = Array.from(document.getElementsByClassName("square"));


let gameLevel = levels.find((level) =>{
    const classList  = Array.from(level.classList)

 return   classList.includes('selected');

}).innerHTML;

levels.forEach(level =>{
    level.addEventListener("click", function() {
   levels.forEach(mode => mode.classList.remove("selected"));

   this.classList.add("selected");

   gameLevel = this.innerHTML;
    })
})


//Attempt to make all the square have background color: rgb(280,45,255)
const startButton = document.getElementById("reset");

startButton.addEventListener("click", function (){

for (let i=0; i< squares.length; i++){

    const red = Math.floor(Math.random()*256);    
    const green = Math.floor(Math.random()*256);   
    const blue = Math.floor(Math.random()*256);   

    const square = squares[i];
    
    square.dataset.rgb_value= JSON.stringify([red, green, blue]);

    const rgbString =`rgb(${red}, ${green}, ${blue})`;
    
    square.style.backgroundColor = rgbString;

}


//assign the Header a random rgb value from one of the square values
const randomSquareIndex = Math.floor(Math.random()*9);
const headerColorSquare = squares[randomSquareIndex];
setHeaderRgbBackgroundColor(headerColorSquare);

});

function setHeaderRgbBackgroundColor(squareElement){
     
    const setHeaderElementBgColor = (rgbValues, element) =>{
        const [r,g,b] = rgbValues;
        element.style.backgroundColor = `rgb(${r}, ${g},${b})`
    element.innerHTML = rgbValues.find( rgbValue =>{
        return rgbValue > 0;
    })
    }

    const rgbString = squareElement.dataset.rgb_value;
    const  [red, green , blue ] = JSON.parse(rgbString);
    
    //console.table({red, green , blue} );
    
    const redBackground = [red, 0,0];
    const greenBackground = [0, green,0];
    const blueBackground = [0, 0,blue];

    setHeaderElementBgColor(redBackground, rElement);
    setHeaderElementBgColor(greenBackground, gElement);
    setHeaderElementBgColor(blueBackground, bElement);
    }

}


