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
    square.style.backgroundColor=`rgb(${red}, ${green}, ${blue})`;
}

} );

}


