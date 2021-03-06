// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

// Helper functions
// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max-min+1)) + min;

  return value;
};
// not enough money function
function notEnough() {
  window.alert("You don't have enough money!");
}
// fight or skip
var fightOrSkip = function() {
  // Ask the players would they like to figh or run
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

  // Conditional Recursive Function Call
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if player choses to skip
  if (promptFight.toLowerCase() === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(`${playerInfo.name} has decided to skip this fight. Goodbye!`);
      // subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, (playerInfo.money - 10));
      
      return true;
    }
  }
}

var fight = function(enemy) {

  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change order 
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  // repeat and execute as long as the enemy-robot is alive 
  while(enemy.health > 0 && playerInfo.health > 0) {
    
    if (isPlayerTurn) {
      
      // ask player would they like to fight of skip this round
      if (fightOrSkip()) {
        // if fightOrSkip() returns true then we break out of loop
        break;
      }

      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, (enemy.health - damage));
      console.log(
        `${playerInfo.name} attacked ${enemy.name}. ${enemy.name} still has ${enemy.health} health left.`
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        playerInfo.money += 25;
        break;
      } else {
        window.alert(`${enemy.name} still has ${enemy.health} health left.`);
      }

    } else {

      // remove player's health by subtracting the amount set in the enemyAttack variable
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, (playerInfo.health - damage));
      console.log(
        `${enemy.name} attacked ${playerInfo.name}. ${playerInfo.name} still has ${playerInfo.health} health left.`
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(`${playerInfo.name} has died!`);
        break;
      } else {
        window.alert(`${playerInfo.name} still has ${playerInfo.health} health left.`);
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// function to set name
var getPlayerName = function() {
  var name = "";

  while(name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }

  console.log(`Your Robot's name is ${name}`);
  return name;
};

// player object 
var playerInfo = {
  name: getPlayerName(),
  health: 100, 
  attack: 10, 
  money: 15,
  reset: function() {
  playerInfo.health = 100;
  playerInfo.attack = 10;
  playerInfo.money = 15;
  },
  refillHealth: function() {
    if (playerInfo.money >= 30) {
      window.alert("Refilling player's health by 40 for 30 dollars.");
      // increase health and decrease money
      playerInfo.health += 40;
      playerInfo.money -= 30;
    } else {
      notEnough();
    }
  },
  upgradeAttack: function() {
    if (playerInfo.money >= 30) {
      window.alert("Upgrading player's attack by 10 for 30 dollars.");
      // increase attack and decrease money 
      playerInfo.attack += 10;
      playerInfo.money -= 30;
    } else {
      notEnough();
    } 
  }
};

// enemy object array 
var enemyInfo = [
  {
    name: "Roboto",
    attack: randomNumber(10, 14)
  }, 
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  }, 
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

var startGame = function() {
  // resets players stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert(`Welcome to Robot Gladiators! Round ${(i+1)}`);
      var pickedEnemyObj = enemyInfo[i];
      pickedEnemyObj.health = randomNumber(40, 60);
      fight(pickedEnemyObj);
      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        // if yes, take them to the store() function
        if (storeConfirm) {
          shop();
        }
      }
    } else {
        window.alert(`${playerInfo.name} has died in battle! Game Over!`);
        break;
    }
  }
  // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
  endGame();
};

var endGame = function() {
  window.alert(`the game has ended, lets see how you did`);
  
  // check localStorage for high score, if it's not there, use 0
  var highScore = localStorage.getItem('highscore');
  if (highScore === null) {
    highScore = 0;
  }

  // if player has more money than the high score, player has new high score!
  if (playerInfo.money > highScore) {
    localStorage.setItem('highscore', playerInfo.money);
    localStorage.setItem('name', playerInfo.name);

    alert(`${playerInfo.name} now has the HighScore of ${playerInfo.money}!`);
  } else {
    alert(`${playerInfo.name} did not beat the HighScore of ${highScore}.`);
  }

  // ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }

};

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: '1' to REFILL, '2' to UPGRADE, or '3' to LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      // call shop() again to force player to pick a valid option
      shop();
      break;
  }
};

// start the game when the page loads
startGame();
