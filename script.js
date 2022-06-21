const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')
const finalResult = document.querySelector('[data-final-result]')
let isHandled = false
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '👊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌',
        beats: 'paper'
    }

]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        if (!isHandled) makeSelection(selection)
    })
})

function makeSelection(selection)
{
    const computerSelection = randomSelection()
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

   if (yourWinner) incrementScore(yourScoreSpan)
   if (computerWinner)  incrementScore(computerScoreSpan)

   if(computerScoreSpan.innerText == 5 || yourScoreSpan.innerText == 5)
   {
    checkWinner(yourScoreSpan, computerScoreSpan)
    isHandled = true;
    setTimeout(() => {
            setTimeout(() => {reloadWebsite() });
    }, 1500);
        

   } 
}

function incrementScore(scorespan)
{
    scorespan.innerText = parseInt(scorespan.innerText) +1
}

function addSelectionResult(selection, winner)
{
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if(winner) div.classList.add('winner')
 finalColumn.after(div)
}

function isWinner(selection, opponentSelection)
{
    return selection.beats === opponentSelection.name
}

function randomSelection() 
{
    const RandomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[RandomIndex]
}


function checkWinner(YourScore, ComputerScore)
{
    const div = document.createElement('div')
    if (YourScore.innerText == 5) div.innerText += 'You have won'
    else if(ComputerScore.innerText == 5) div.innerText += 'Computer has won'
    div.classList.add('end-result')
finalResult.after(div)
    
}

function reloadWebsite()
{
    window.location.reload();
}



