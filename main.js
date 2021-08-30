
/****************************************************************
 Create Page On Load
****************************************************************/
function pickLeagueSize() {
  const leagueSizeHeader = document.createElement('h2')
  leagueSizeHeader.textContent = 'Select League Size';

  const selectTeamsTitle = document.createElement('label');
  selectTeamsTitle.textContent = 'Select Number Of Teams';
  selectTeamsTitle.for = 'teams';

  const selectTeams = document.createElement('select');
  selectTeams.id = 'teams';
  selectTeams.name = 'teams';

  const option1 = document.createElement('option');
  option1.value = 8;
  option1.textContent = '8';

  const option2 = document.createElement('option');
  option2.value = 10;
  option2.textContent = '10';

  const option3 = document.createElement('option');
  option3.value = 12;
  option3.textContent = '12';

  selectTeams.appendChild(option1);
  selectTeams.appendChild(option2);
  selectTeams.appendChild(option3);

  const submitTeams = document.createElement('input');
  submitTeams.type = 'submit';
  submitTeams.id = 'submit-teams'

  // Create element to store number of teams element
  const teamsDiv = document.createElement('div');
  teamsDiv.id = 'teams-div';
  teamsDiv.appendChild(leagueSizeHeader);
  teamsDiv.appendChild(selectTeamsTitle);
  teamsDiv.appendChild(selectTeams);
  teamsDiv.appendChild(submitTeams);

  // Create Team Picker
  document.getElementById('app').appendChild(teamsDiv);
}

window.addEventListener('load', () => {
  pickLeagueSize()
}, false)


/****************************************************************************
Create Name Input Section On Submit
****************************************************************************/

// Create inputs for each team in the league after commissioner submits the number of teams
function createInput (teams) {
  const nameDiv = document.createElement('div');
  const nameTitle = document.createElement('h2');
  nameTitle.textContent = 'List Player Names';
  nameDiv.appendChild(nameTitle);
  nameDiv.id = 'name-div'
  for(let i = 1; i <= teams; i++) {
    /*
    const nameLabel = document.createElement('label');
    nameLabel.for = 'player' + i;
    nameLabel.textContent = `Player ${i} Name:`
    */
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'player' + i;
    nameInput.className = 'player';
    nameInput.placeholder = 'Player Name'
    // nameDiv.appendChild(nameLabel);
    nameDiv.appendChild(nameInput)
    document.getElementById('app').appendChild(nameDiv);
  }
  // Create submit for team names
  const submitNames = document.createElement('input');
  submitNames.type = 'submit';
  submitNames.id = 'submit-names';
  submitNames.className = 'button';
  nameDiv.appendChild(submitNames);

  // Add to DOM
  document.getElementById('app').appendChild(nameDiv);

  // Remove number selector
  const teamsDiv = document.getElementById('teams-div')
  document.getElementById('app').removeChild(teamsDiv)
};

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'submit-teams'){
    const teams = document.getElementById('teams').value;
    createInput(teams);
   }
});

/****************************************************************************
Select Draft Positions for Each Player and Display
****************************************************************************/

// Loop through names provided and asign a draft position
function showDraftPositions (playerCount) {
  // Create element to show other element created on page
  const draftPositionDiv = document.createElement('div');
  draftPositionDiv.id = 'draft-div';

  // Store each player name
  const playersId = [];
  const playersArray = document.getElementsByClassName('player');

  // Fill array of references to player locations in DOM
  for (let j = 0; j < playersArray.length; j++) {
    playersId.push(playersArray[j].id);
  }

  // Store Player Names
  const names = [];
  playersId.forEach(player => names.push(document.getElementById(player).value))


  for (let i = 1; i <= playerCount; i++) {
    const index = Math.floor(Math.random() * (names.length))
    const name = names[index];
    names.splice(index, 1)

    // Create element to show on page
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-name';
    playerDiv.textContent = `${i}: ${name}`;
    draftPositionDiv.appendChild(playerDiv);
  }

  // Create submit for team names
  const resetBtn = document.createElement('input');
  resetBtn.type = 'submit';
  resetBtn.value = 'Reset';
  resetBtn.id = 'reset';
  resetBtn.className = 'button';
  draftPositionDiv.appendChild(resetBtn);

  document.getElementById('app').appendChild(draftPositionDiv);
  // Remove Submission List
  const nameDiv = document.getElementById('name-div')
  document.getElementById('app').removeChild(nameDiv);
};

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'submit-names'){
    const playerCount = document.getElementsByClassName('player').length;
    showDraftPositions(playerCount)
   }
});

/****************************************************************************
RESET TOOL
****************************************************************************/
document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'reset'){
    pickLeagueSize();
    const draftDiv = document.getElementById('draft-div');
    document.getElementById('app').removeChild(draftDiv);
}});