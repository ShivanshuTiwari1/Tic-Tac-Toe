const gameBoard = (() => {

    let arr = [];
    let cellsfilled = 0;
    let initializeArr = () => {
        for(let i=0;i<9;i++)
        {
            arr.push(null);
        }
    }
    let resetArr = () => {
        for(let i=0;i<9;i++)
        {
            arr[i] = null;
        }
        cellsfilled = 0;
    }
    let updateArr = (index, choice) => {
        
        if(arr[index] === null)
        {
            arr[index] = choice;
            cellsfilled++;
            return true;
        }
        else
        {
            return false;
        }  
        
    }
    let terminateGame = () => {
        
        //Horizontal match
        if((arr[0] !== null)&&(arr[0] === arr[1] && arr[0] === arr[2]))
        {
            return arr[0];
        }
        else if((arr[3] !== null)&&(arr[3] === arr[4] && arr[3] === arr[5]))
        {
            return arr[3];
        }
        else if((arr[6] !== null)&&(arr[6] === arr[7] && arr[6] === arr[8]))
        {
            return arr[6];
        }
        
        //Vertical match
        else if((arr[0] !== null)&&(arr[0] === arr[3] && arr[0] === arr[6]))
        {
            return arr[0];
        }
        else if((arr[1] !== null)&&(arr[1] === arr[4] && arr[1] === arr[7]))
        {
            return arr[1];
        }
        else if((arr[2] !== null)&&(arr[2] === arr[5] && arr[2] === arr[8]))
        {
            return arr[2];
        }
        
        //Diagonal match
        else if((arr[0] !== null)&&(arr[0] === arr[4] && arr[0] === arr[8]))
        {
            return arr[0];
        }
        else if((arr[2] !== null)&&(arr[2] === arr[4] && arr[2] === arr[6]))
        {
            return arr[2];
        }
        else if(cellsfilled === 9)
        {
            return 'draw';
        }
        else
        {
            return false;    
        }
        
    }
    initializeArr();
    return {arr, updateArr, terminateGame, resetArr,};
    
    
})();

const player = (name, char) => {
    
    let playerName = name;
    let playerChar = char;
    return {playerName, playerChar};
}

const displayManager = (() => {
    
    let resdiv = document.getElementById('result');
    let currPlayer = document.getElementById("pname");
    let modal = document.getElementById('myModal');
    let restartbtn = document.getElementById("modalbtn");
    
    let refreshContent = () => {
        
        currPlayer.textContent = "X";
        modal.style.display = "none";
        gameBoard.resetArr();
        for(let i=0;i<9;i++)
        {
            let temp = document.getElementById('cell'+i);
            temp.textContent = '';
        }
        control.p1turn = true;
    }
    
    restartbtn.addEventListener('click', refreshContent);
    
    let playerAction = (Event) => {
        
        let cell = Event.path[0];
        
        let cellindex = cell.getAttribute('id').substring(4);
        
        let char = (control.p1turn === true)?'X':'O';
        
        let updatebool = gameBoard.updateArr(parseInt(cellindex), char);
        
        if(updatebool === true)
        {
            updateDisplay(cell, cellindex);
        }
    }
    let updateDisplay = (cell, cellindex) => {
        
        if(control.p1turn === true)
        {
            cell.textContent = "X";
            currPlayer.textContent = "O";
            
        }
        else
        {
            cell.textContent = "O";    
            currPlayer.textContent = "X";
            
        }
        
        control.p1turn = (control.p1turn === true)?false:true;
        
        let retval = gameBoard.terminateGame();
        
        if(retval === 'X')
        {
            debugger;
            resdiv.textContent = "X Won!";
            modal.style.display = "flex";
        }
        else if(retval === 'O')
        {
            resdiv.textContent = "O Won!";
            modal.style.display = "flex";
            
        }
        else if(retval === 'draw')
        {
            resdiv.textContent = "Its a Draw";
            modal.style.display = "flex";
        }
        
        
        
    }
    return {playerAction, modal, refreshContent,}
    
})()

const control = (() => {
    
    let p1 = player("p1", 'x');
    let p2 = player("p2", 'o');
    let p1turn = true;
    
    let grid = document.getElementById("gameGrid");
    
    for(let i=0;i<9;i++)
    {
        let ele = document.createElement('div');
        ele.id = "cell" + i;
        ele.classList.add("cell");
        grid.appendChild(ele);
    }
    
    
    let cells = document.getElementsByClassName('cell');
    
    for(let i=0;i<cells.length;i++)
    {
        cells[i].addEventListener('click', displayManager.playerAction);
    }

    return {p1turn,}
    
})();

// console.log(gameBoard.arr);


window.onclick = () => {
    if(Event.target == displayManager.modal)
    {
        displayManager.refreshContent();
    }
}