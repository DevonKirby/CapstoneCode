import readline from 'readline';
import * as DogDAO from '../dao/DogDAO.js';
import * as MonkeyDAO from '../dao/MonkeyDAO.js';
import { Dog } from '../models/Dog.js';
import { Monkey } from '../models/Monkey.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

// Function to intake a new dog
// This function prompts the user for dog information and adds it to the database
export async function intakeNewDog(runMenu) {

    await DogDAO.createDogTable();

    console.log("\nEnter Dog Information");
    console.log("Format: name, breed, gender[Male/Female], age,")
    console.log("weight, acquisitionDate[YYYY-MM-DD], acquisitionCountry,")
    console.log("trainingStatus[Trained/Untrained], reserved[true/false], inServiceCountry\n");

    rl.question("Input: ", async (input) => {

        const parts = input.split(',').map(part => part.trim());
        if (parts.length !== 10) {
            console.log("Invalid input. Please provide all 10 fields.");
            intakeNewDog(runMenu);
            return;
        }

        const [name, breed, gender, ageStr, weightStr, acquisitionDate,
            acquisitionCountry, trainingStatus, reservedStr, inServiceCountry] = parts;
        const age = parseInt(ageStr, 10);
        const weight = parseFloat(weightStr);
        const reserved = reservedStr.toLowerCase() === 'true';

        if (isNaN(age) || isNaN(weight)) {
            console.log("Invalid age or weight. Please enter valid numbers.");
            intakeNewDog(runMenu);
            return;
        }

        const newDog = new Dog(name, breed, gender, age, weight,
            acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry);
        
        await DogDAO.addDog(newDog);

        runMenu();
    });
}

// Function to intake a new monkey
// This function prompts the user for monkey information and adds it to the database
export async function intakeNewMonkey(runMenu) {

    await MonkeyDAO.createMonkeyTable();

    console.log("\nEnter Monkey Information");
    console.log("Format: name, species, gender[Male/Female], age,")
    console.log("weight, acquisitionDate[YYYY-MM-DD], acquisitionCountry,")
    console.log("trainingStatus[Trained/Untrained], reserved[true/false], inServiceCountry");
    console.log("tailLength, height, bodyLength\n");

    rl.question("Input: ", async (input) => {

        const parts = input.split(',').map(part => part.trim());
        if (parts.length !== 13) {
            console.log("Invalid input. Please provide all 13 fields.");
            intakeNewMonkey(runMenu);
            return;
        }

        const [name, species, gender, ageStr, weightStr, acquisitionDate,
            acquisitionCountry, trainingStatus, reservedStr, inServiceCountry,
            tailLengthStr, heightStr, bodyLengthStr] = parts;
        const age = parseInt(ageStr, 10);
        const weight = parseFloat(weightStr);
        const tailLength = parseFloat(tailLengthStr);
        const height = parseFloat(heightStr);
        const bodyLength = parseFloat(bodyLengthStr);
        const reserved = reservedStr.toLowerCase() === 'true';

        if (isNaN(age) || isNaN(weight) || isNaN(tailLength) || isNaN(height) || isNaN(bodyLength)) {
            console.log("Invalid age, weight, lengths, or height. Please enter valid numbers.");
            intakeNewMonkey(runMenu);
            return;
        }

        const newMonkey = new Monkey(name, species, gender, age, weight,
            acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry,
            tailLength, height, bodyLength);
        
        await MonkeyDAO.addMonkey(newMonkey);

        runMenu();
    });
}

// Function to print all dogs
// This function retrieves all dogs from the database and displays them in a table format
export async function printAllDogs(runMenu) {

    await DogDAO.createDogTable();

    const dogs = await DogDAO.getAllDogs();
    console.table(dogs);
    runMenu();
}

// Function to print all monkeys
// This function retrieves all monkeys from the database and displays them in a table format
export async function printAllMonkeys(runMenu) {

    await MonkeyDAO.createMonkeyTable();

    const monkeys = await MonkeyDAO.getAllMonkeys();
    console.table(monkeys);
    runMenu();
}

// Function to print available dogs
// This function retrieves all dogs from the database and filters out the reserved ones
export async function printAvailableAnimals(runMenu) {

    await DogDAO.createDogTable();
    await MonkeyDAO.createMonkeyTable();

    const dogs = await DogDAO.getAllDogs();
    const availableDogs = dogs.filter(dog => !dog.getReserved());

    const monkeys = await MonkeyDAO.getAllMonkeys();
    const availableMonkeys = monkeys.filter(monkey => !monkey.getReserved());

    console.log(" === Available Dogs === ");
    console.table(availableDogs);
    console.log();
    console.log(" === Available Monkeys === ");
    console.table(availableMonkeys);
    runMenu();
}