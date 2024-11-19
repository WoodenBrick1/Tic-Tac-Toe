

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

    const printBoard = () => 
    {
        const boardCell = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardCell);
    }


    const checkWin = () =>
    {
        let win;
        for (let i = 0; i < rows; i++)
            {
                win = true;
                for (let j = 1; j < columns; j++)
                    {
                        const horizontal = [board[i][j].getValue(), board[i][j - 1].getValue()];
                        const vertical = [board[j - 1][i].getValue(), board[j][i].getValue()];

    

                       if ((vertical[0] != vertical[1] || (vertical[0] == "")) && (horizontal[0] != horizontal[1] || (horizontal[0] == "")))
                       {
                          win = false;
                       }  
                       

                    }

                if (win)
                    return win;
                
            }

        win = true;
        for(let i = 1; i < rows; i++)
        {
         
            const diagonal = [board[i][i].getValue(), board[i - 1][i - 1].getValue()];
            const diagonalop = [board[i][rows - i - 1].getValue(), board[i - 1][rows - i].getValue()];

            if ((diagonal[0] != diagonal[1] || (diagonal[0] == "")) && (diagonalop[0] != diagonalop[1] || (diagonalop[0] == "")))
            {
                 win = false;
            }  
        }


        return win;


            
    }
    return {
        printBoard,
        getCell,
        checkWin
    };
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




// Controls the flow of the game
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

    let currentPlayer = players[0];

    const setCurrentPlayer = () => currentPlayer = currentPlayer == players[0] ? players[1] : players[0];


// Place the move of the player on the board
    const makeMove = () => 
    {
        console.log(`${currentPlayer.name} turn`);
        const cell = gameBoard.getCell(prompt("Row: "), prompt("Column: "));

        if (cell.getValue() == "")
        {
           cell.setValue(currentPlayer.move);

            setCurrentPlayer();

        }

        gameBoard.printBoard();
        if(gameBoard.checkWin())
        {
            console.log("Win");
        };

    }
    
    return {
        makeMove,
    }
})();
