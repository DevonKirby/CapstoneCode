import { Dog } from './models/Dog.js';
import { Monkey } from './models/Monkey.js';
import * as DogDAO from './dao/DogDAO.js';
import * as MonkeyDAO from './dao/MonkeyDAO.js';
import HelperFunctions from './helper_functions.js';
import readline from 'readline';

// Create a readline interface for user input
// This allows us to read input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display the menu and handle user input
// This function will be called recursively to keep showing the menu until the user quits
function runMenu() { 
    HelperFunctions.displayMenu();
    rl.question("Enter a menu selection: ", (userInput) => {
        switch (userInput.trim().toLowerCase()) {
            case '1':
                // Code to intake a new dog
                console.log("Intake a new dog selected.");
                const myDog = new Dog('Jaxon', 'Mini', 'Male', 4,
                    10.5, '2023-01-01', 'USA', 'Trained', false, 'USA');
                DogDAO.addDog(myDog).then(() => {
                    console.log("Dog added successfully.");
                });
                break;
            case '2':
                // Code to intake a new monkey
                console.log("Intake a new monkey selected.");
                break;
            case '3':
                // Code to reserve an animal
                console.log("Reserve an animal selected.");
                break;
            case '4':
                // Code to print a list of all dogs
                console.log("Print a list of all dogs selected.");
                break;
            case '5':
                // Code to print a list of all monkeys
                console.log("Print a list of all monkeys selected.");
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
                break;
        }
        runMenu();
    });
}

await DogDAO.createDogTable();
runMenu();