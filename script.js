
// Controls the board itself
const gameBoard = (function () 
{
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++)
    {
        board[i] = [];
        for (let j = 0; j < columns; j++)
        {
            board[i].push(Cell());
        }
    }

    const getCell = (row, column) => board[row][column];
    const getBoard = () => board;
    


    const checkWin = () =>
    {

        // Check rows and columns
        for (let i = 0; i < rows; i++) {

            if (
                board[i][0].getValue() !== "" &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {
                return true;
            }
    

            if (
                board[0][i].getValue() !== "" &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                return true;
            }
        }
    
        if (
            board[0][0].getValue() !== "" &&
            board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue()
        ) {
            return true;
        }
    

        if (
            board[0][2].getValue() !== "" &&
            board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue()
        ) {
            return true;
        }
    
        return false;
    };

    const checkTie = () =>
    {
        let empty = false;
        gameBoard.getBoard().forEach(row => row.forEach(cell => {
            
            if (cell.getValue() == "")
            {
                empty = true;
            }
               
                
        }))

        return !empty;
    }
    return {
        getCell,
        getBoard,
        checkWin,
        checkTie,
    };
})();


const game = (function ()
{

    

    const player1Name = "blurp";
    const player2Name = "blop";
    const players = [
        {
            name: player1Name,
            move: 'X',
        },
        {
            name: player2Name,
            move: 'O',
        }
    ]

    let over = false;
    let currentPlayer = players[0];

    const setCurrentPlayer = () => currentPlayer = currentPlayer == players[0] ? players[1] : players[0];
    const setPlayerName = (index, name) => players[index].name = name;

// Place the move of the player on the board
    const makeMove = (row, column) => 
    {
        
        const cell = gameBoard.getCell(row, column);

        // Check if you can make the move
        if (cell.getValue() == "")
        {
           cell.setValue(currentPlayer.move);



           domHandler.changeText(`${currentPlayer.name.toUpperCase()} TURN`);
           if(!over)
           {

            if(currentPlayer == players[0])
                  domHandler.changeColor("red");
            else
                  domHandler.changeColor("blue");
           }
            setCurrentPlayer();

        }

        if(gameBoard.checkWin())
        {
            setCurrentPlayer();

            displayText.textContent = `${currentPlayer.name.toUpperCase()} WON`;

            game.changeState();
        }
        else if(gameBoard.checkTie())
        {
            displayText.textContent = `IT'S A TIE!`;
            displayText.style.textShadow = "";

            game.changeState()
        }



    domHandler.renderBoard();
    }
    
    // Get or change if the game is over or not
    const getState = () => over;
    const changeState = () => {over = !over};


    // Restart the game
    const restart = () => {
        changeState();
        const board = gameBoard.getBoard();

        board.forEach(row => row.forEach(cell => cell.setValue("")))
        domHandler.changeText("");
        currentPlayer = players[0];
        if(over)
            changeState();
        domHandler.renderBoard()
        
    }
  

    document.getElementById("new-game").addEventListener("click", restart);

    
    return {
        makeMove,
        getState,
        changeState,
        restart,
        setPlayerName,
    }
})();


// Controls the function of a single cell
function Cell()
{
    let value = "";
    const getValue = () => value;
    const setValue = (move) => {value = move}; 

    return {
        getValue,
        setValue
    }
}


const domHandler = (function ()
{
    

    const renderBoard = () => {
        const container = document.getElementById("game-container")
        container.innerHTML = "";
        

        // Connect the board to the dom
        gameBoard.getBoard().forEach((row, indexR) => {row.forEach((cell, indexC) => {
           
            const button = document.createElement("button");
            button.className = "cell";
            button.textContent = cell.getValue();
            container.appendChild(button);

            
        

            button.addEventListener("mouseenter", () => {

                // If the game is not over, then make the move
                if (cell.getValue() == "")
                    button.style.backgroundColor = "#91b3b3";
            })

            button.addEventListener("mouseleave", () => {
               
                button.style.backgroundColor = "#2d3a3a";
        
            })

            button.addEventListener("click", () => {
                // If the game is not over, then make the move
                if (!game.getState())
                      game.makeMove(indexR, indexC)
                else
                    game.restart();
            })

        })})


        


    }

    const changeText = (text) => {

        document.getElementById("display-text").textContent = text;
    }
    
    const changeColor = (color) =>{
        displayText = document.getElementById("display-text");
        if (color == "red");
            displayText.style.textShadow = "3px 3px 3px rgb(167, 26, 26)";
        if(color == "blue")
            displayText.style.textShadow = "3px 3px 3px rgb(55, 59, 97)"

    }

    let state = 0;
    const getName = () => 
    {
        const nameInput = document.getElementById("name-input");

        nameInput.addEventListener("keydown", event => {
            if(event.key == "Enter")
            {
        
                const name = nameInput.value;
                nameInput.value = "";

                if (state == 0)
                {
                    game.setPlayerName(0, name);
                    state = 1;
                    document.querySelector("#names-container>p").textContent = "Player 2:";
                    return;
                }
                if(state == 1)
                {
                    game.setPlayerName(1, name);
                    

                    document.getElementById("names-input").style.display = "none";
                }
                    
                
                    
            }
        })
    }

    return {
        renderBoard,
        changeText,
        changeColor,
        getName,
    };

})();

// Controls the flow of the game


window.addEventListener("DOMContentLoaded", () => {
    domHandler.renderBoard();
    domHandler.getName();
})
