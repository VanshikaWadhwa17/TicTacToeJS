let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn= document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg= document.querySelector("#msg");

let turnOfO = true; 
let winPatterns=[
[0,1,2 ],
[0,3,6],
[0,4,8],
[1,4,7],
[2,5,8],
[3,4,5],
[6,7,8],
[6,4,2]
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log('box clicked');
        if(turnOfO){
            box.innerText="O";
            turnOfO =false
        }
        else{
            box.innerText="X";
            turnOfO =true;

        }
        box.disabled=true; //this is done so that once a value its set, button gets disabled and cant be clicked again to change the value

        checkWinner();
    });
});
////**** code for : once winner is detected , but still some places are empty, we need to disable those buttons so that person cannot continue to play the game and more winners in same game do not go on detecting. */

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true
    }
}

//code to enable boxes when a new game starts, we also need to reset the boxes 
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false
        box.innerText=""
    }
}

//to reset game we need to enable boxes and re hide the winner msg
const resetGame=()=>{
    turnOfO=true;
    enableBoxes()
    msgContainer.classList.add("hide")

}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`
    msgContainer.classList.remove("hide")
    disableBoxes()
}


const checkWinner = ()=>{
    for(pattern of winPatterns){
        // console.log(pattern[0],pattern[1],pattern[2])
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText) //indexes of patterns inside the boxes
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" &&pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val=== pos3Val){
                console.log("winner",pos1Val)
                showWinner(pos1Val)
                return
            } // once winner is detected , but still some places are empty, we need to disable those buttons so that person cannot continue to play the game and more winners in same game do not go on detecting.
        }
    }
    // case: till now we are showing if we have a winner, I want to add some code that in case of a tie , it gives an alert to reset game and try again 
    if([...boxes].every(box => box.innerText !== "")) {
        alert("It's a tie! Reset the game and try again.");
        resetGame();
    }

}

newGameBtn.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)


