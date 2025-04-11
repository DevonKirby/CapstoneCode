import { Dog } from './models/Dog.js';
import { Monkey } from './models/Monkey.js';
import { Trainer } from './data_structures/Trainer.js';
import * as DogService from './services/DogService.js';
import * as MonkeyService from './services/MonkeyService.js';
import HelperFunctions from './helper_functions.js';
import readline from 'readline';

// Create a readline interface for user input
// This allows us to read input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Function to display the menu and handle user input
// This function will be called recursively to keep showing the menu until the user quits
function runMenu() { 
    HelperFunctions.displayMenu();
    rl.question("Enter a menu selection: ", (userInput) => {
        switch (userInput.trim().toLowerCase()) {
            case '1':
                // Code to intake a new dog
                DogService.intakeNewDog(runMenu);
                return;
            case '2':
                // Code to intake a new monkey
                MonkeyService.intakeNewMonkey(runMenu);
                return;
            case '3':
                // Code to reserve an animal
                console.log("Reserve an animal selected.");
                break;
            case '4':
                // Code to print a list of all dogs
                DogService.printAllDogs(runMenu);
                return;
            case '5':
                // Code to print a list of all monkeys
                MonkeyService.printAllMonkeys(runMenu);
                break;
            case '6':
                // Code to print a list of all that are not reserved
                console.log("Print a list of all that are not reserved selected.");
                break;
            case 'q':
                console.log("Quitting application.");
                rl.close();
                return;
            default:
                console.log("Invalid selection. Please try again.");
                runMenu();
                return;
        }
    });
}

const trainer = new Trainer();
runMenu();