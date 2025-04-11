import { Dog } from './models/Dog.js';
import * as DogDAO from './dao/DogDAO.js';
import HelperFunctions from './helper_functions.js';
import readline from 'readline';

// Create a readline interface for user input
// This allows us to read input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function intakeNewDog() {
    console.log("\nEnter Dog Information");
    console.log("Format: name, breed, gender[Male/Female], age,")
    console.log("weight, acquisitionDate[YYYY-MM-DD], acquisitionCountry,")
    console.log("trainingStatus[Trained/Untrained], reserved[true/false], inServiceCountry\n");

    rl.question("Input: ", async (input) => {

        const parts = input.split(',').map(part => part.trim());
        if (parts.length !== 10) {
            console.log("Invalid input. Please provide all 10 fields.");
            runMenu();
            return;
        }

        const [name, breed, gender, ageStr, weightStr, acquisitionDate,
            acquisitionCountry, trainingStatus, reservedStr, inServiceCountry] = parts;
        const age = parseInt(ageStr, 10);
        const weight = parseFloat(weightStr);
        const reserved = reservedStr.toLowerCase() === 'true';

        if (isNaN(age) || isNaN(weight)) {
            console.log("Invalid age or weight. Please enter valid numbers.");
            runMenu();
            return;
        }

        const newDog = new Dog(name, breed, gender, age, weight,
            acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry);
        
        await DogDAO.addDog(newDog);

        runMenu();
    });
}

// Function to display the menu and handle user input
// This function will be called recursively to keep showing the menu until the user quits
function runMenu() { 
    HelperFunctions.displayMenu();
    rl.question("Enter a menu selection: ", (userInput) => {
        switch (userInput.trim().toLowerCase()) {
            case '1':
                // Code to intake a new dog
                intakeNewDog();
                return;
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
    });
}

await DogDAO.createDogTable();
runMenu();