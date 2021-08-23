// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
  // repeat and execute as long as the enemy-robot is alive 
  while(enemyHealth > 0 && playerHealth > 0) {

    // Ask the players would they like to figh or run
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    // if player choses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(`${playerName} has decided to skip this fight. Goodbye!`);
        // subtract money from playerMoney for skipping
        playerMoney -= 10;
        console.log(`playerMoney: ${playerMoney}`);
        break;
      }
      // if no (false), ask question again by running fight() again
      else {
        fight();
      }
    }
    // remove enemy's health by subtracting the amount set in the playerAttack variable
      enemyHealth -= playerAttack;
      console.log(
        `${playerName} attacked ${enemyName}.`
      );
      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        playerMoney += 20;
        break;
      } else {
        window.alert(`${enemyName} still has ${enemyHealth} health left.`);
      } 
      // remove player's health by subtracting the amount set in the enemyAttack variable
      playerHealth -= enemyAttack;
      console.log(
        `${enemyName} attacked ${playerName}.`
      );
      // check player's health
      if (playerHealth <= 0) {
        window.alert(`${playerName} has died!`);
        break;
      } else {
        window.alert(`${playerName} still has ${playerHealth} health left.`);
      }
  }
};

for (var i = 0; i < enemyNames.length; i++) {
    var pickedEnemyName = enemyNames[i];
    enemyHealth = 50;
    fight(pickedEnemyName);
}
