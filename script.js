
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
    /*
    const printBoard = () => 
    {
        const boardCell = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCell);
    }
    */


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

    const wonText = document.getElementById("won-text");

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


// Place the move of the player on the board
    const makeMove = (row, column) => 
    {
        console.log(`${currentPlayer.name} turn`);
        const cell = gameBoard.getCell(row, column);

        if (cell.getValue() == "")
        {
           cell.setValue(currentPlayer.move);

            setCurrentPlayer();

        }

        if(gameBoard.checkWin())
        {
            setCurrentPlayer();

            wonText.textContent = `${currentPlayer.name} won`;

            game.changeState();
        }
        else if(gameBoard.checkTie())
        {
            wonText.textContent = `It's a Tie!`;

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
        wonText.textContent = "";
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

            
            button.addEventListener("click", () => {

                // If the game is not over, then make the move
                if (!game.getState())
                      game.makeMove(indexR, indexC)
                else
                    game.restart();
            })
    
        })})

        



       // buttons.forEach(button => button.addEventListener("click", () => {console.log("2")}))
        

    }

    

    return {renderBoard};

})();

// Controls the flow of the game


domHandler.renderBoard();