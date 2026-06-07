let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset_btn");

//we have 2 player: playerX & playerO, and each have one turn alternatively
let turnX = true;
let turnO = false;

let winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const leftImg = document.getElementById("left-img");
const rightImg = document.getElementById("right-img");
let isLeftGlowing = true;
let isRightGlowing = false;

updateGlow();


function updateGlow()
{
    if (turnX)
    {
        leftImg.classList.add("glow");
        rightImg.classList.remove("glow");
    }
    else
    {
        rightImg.classList.add("glow");
        leftImg.classList.remove("glow");
    }
}


boxes.forEach((box) => 
{
    box.addEventListener("click", () => 
    {
        box.style.backgroundColor = "rgb(255, 195, 190)";
        if(turnX === true && turnO === false)
        {
            box.innerText = "X";
            box.style.color = "rgba(255, 0, 0, 1)";
            box.style.backgroundColor = "rgba(228, 217, 116, 1)";
            turnX = false;
            turnO = true;
        }
        else if(turnO === true && turnX === false)
        {
            box.innerText = "O";
            box.style.color = "rgba(0, 21, 255, 1)";
            box.style.backgroundColor = "rgba(129, 222, 200, 1)";
            turnX = true;
            turnO = false;
        }
        box.disabled = true;
        updateGlow();
        checkWinner();
    })
});




const checkWinner = () => 
{
    let winnerFound = false;
    for(let p of winPattern)
    {
        //console.log(boxes[p[0]], boxes[p[1]], boxes[p[2]]);
        if(boxes[p[0]].innerText != "" && boxes[p[1]].innerText != "" && boxes[p[2]].innerText != "")
        {
            if(boxes[p[0]].innerText === "X" && boxes[p[1]].innerText === "X" && boxes[p[2]].innerText === "X")
            {
                winnerFound = true;
                setTimeout(() => {
                    alert("Player-X is Winner");
                    let choice = prompt("Do you want to reset the game? (Y/y)");
                    if (choice === "Y" || choice === "y")
                        resetGame();
                }, 100);
                break;
            }

            else if((boxes[p[0]].innerText === "O" && boxes[p[1]].innerText === "O" && boxes[p[2]].innerText === "O"))
            {
                winnerFound = true;
                setTimeout(() => {
                    alert("Player-O is Winner");
                    let choice = prompt("Do you want to reset the game? (Y/y)");
                    if (choice === "Y" || choice === "y")
                        resetGame();
                }, 100);
                break;
            }
        }
    }

    // Check for tie if no winner found
    if (!winnerFound)
    {
        let allFilled = true;
        boxes.forEach((box) => {
            if (box.innerText === "")
                allFilled = false;
        });

        if (allFilled)
        {
            setTimeout(() => {
                alert("It's a Tie!");
                let choice = prompt("Do you want to reset the game? (Y/y)");
                if (choice === "Y" || choice === "y")
                    resetGame();
            }, 100);
        }
    }
};




resetBtn.addEventListener("mouseover", () => {
    resetBtn.style.backgroundColor = "rgba(179, 220, 246, 1)"; // changed button color 
});
resetBtn.addEventListener("mouseout", () => {
    resetBtn.style.backgroundColor = "rgb(210, 251, 254)"; // original button color
});
resetBtn.addEventListener("click", () => {
    resetBtn.style.backgroundColor = "rgba(179, 220, 246, 1)"; // changed button color 
    //reset all boxes
    boxes.forEach((b) => {
        b.innerText = "";
        b.style.backgroundColor = "rgba(254, 213, 210)"; // original box color
        b.disabled = false;
    });
    // Reapply hover events
    addBoxHoverEffect();
    // reset turn
    turnX = true;
    turnO = false;
    // reset button
    setTimeout(() => {
        resetBtn.style.backgroundColor = "rgb(210, 251, 254)";  // original button color
    }, 200); // 200ms delay

    updateGlow();
});




let resetGame = () => {
    boxes.forEach((b) => {
        b.innerText = "";
        b.style.backgroundColor = "rgba(254, 213, 210)"; // original box color
        b.disabled = false;
    });
    turnX = true;
    turnO = false;
    resetBtn.style.backgroundColor = "rgb(210, 251, 254)"; // original button color
    // Reapply hover events
    addBoxHoverEffect();

    updateGlow();
};



let addBoxHoverEffect = () => {
    boxes.forEach((box) => {
        box.addEventListener("mouseover", () => {
            if (box.innerText === "") // only if box empty
                box.style.backgroundColor = "rgb(255, 195, 190)";
        });  
        box.addEventListener("mouseout", () => {
            if (box.innerText === "") // only if box empty
                box.style.backgroundColor = "rgb(254, 213, 210)";
        });
    });
};