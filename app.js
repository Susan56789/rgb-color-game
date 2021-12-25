window.addEventListener('load', app, false);

function app (){

const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");


const levels = Array.from (document.getElementsByClassName("mode"));



let gameLevel = levels.find((level) =>{
    const classList  = Array.from(level.classList)

 return   classList.includes('selected');

}).innerHTML;


let squares = getSquares();


levels.forEach(level =>{
    level.addEventListener("click", function() {
   levels.forEach(mode => mode.classList.remove("selected"));

   this.classList.add("selected");

   gameLevel = this.innerHTML;
   setTilesAccordingToGameLevel(gameLevel);
   squares = getSquares();
    })
})


function getSquares(){
    const allSquares = Array.from(document.getElementsByClassName('square'));

    if(gameLevel === 'Easy'){

        return allSquares.slice(0,3);

    }else if(gameLevel === 'Medium'){

        return allSquares.slice(0,6);

    }else{
     
      return allSquares;

    }   
}


function setTilesAccordingToGameLevel(currentGameLavel){
    const allSquares = Array.from(document.getElementsByClassName('square'));

 if(currentGameLavel === 'Easy'){
//set 3 squares on screen
const firstSquares = allSquares.slice(0,3);
const lastSquares= allSquares.slice(3,9);

lastSquares.forEach(sq => sq.classList.add('hidden') );

 } else if(currentGameLavel === 'Medium'){
//set 6 squares on screen
allSquares.forEach(sq => sq.classList.remove('hidden'));

const firstSquares = allSquares.slice(0,6);
const lastSquares= allSquares.slice(6,9);

lastSquares.forEach(sq => sq.classList.add('hidden') );


 }else{
// set 9 squares on screen
allSquares.forEach(sq => sq.classList.remove('hidden'))


 }
}

//Attempt to make all the square have background color: rgb(280,45,255)
const startButton = document.getElementById("reset");

startButton.addEventListener("click", function (){
     this.innerHTML= 'New Colors';

    //assign each individual square a background color
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
const randomSquareIndex = Math.floor(Math.random()* squares.length);
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
    colorDisplayElement.dataset.rgb_value= rgbString;
    //console.table({red, green , blue} );
    
    const redBackground = [red, 0,0];
    const greenBackground = [0, green,0];
    const blueBackground = [0, 0,blue];

    setHeaderElementBgColor(redBackground, rElement);
    setHeaderElementBgColor(greenBackground, gElement);
    setHeaderElementBgColor(blueBackground, bElement);
    }

//add event listener to squares so that it either disappears or change every squares's color
const allSquares = Array.from(document.getElementsByClassName('square'));
allSquares.forEach(square =>{
    square.addEventListener("click", function(){
    const headerRgbValue = colorDisplayElement.dataset.rgb_value;
    let squareRgbValue = this.dataset.rgb_value;

   // console.table(headerRgbValue, squareRgbValue)

   if (headerRgbValue === squareRgbValue){
       setSquareBackgroundAfterWin(headerRgbValue);
   } else{
       this.classList.add("hidden");
   }
    } )
})

function setSquareBackgroundAfterWin(headerRgbString){
 const [r, g, b] = JSON.parse(headerRgbString);
 const rgbString = `rgb(${r}, ${g}, ${b})`;

 squares.forEach(sq =>{
     sq.classList.remove('hidden');
     sq.style.backgroundColor = rgbString;
     sq.dataset.rgb_value = colorDisplayElement.dataset.rgb_value;
 })
}


}


