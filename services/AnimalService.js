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

// Intake functions

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

        const newDog = new Dog(null, name, breed, gender, age, weight,
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

        const newMonkey = new Monkey(null, name, species, gender, age, weight,
            acquisitionDate, acquisitionCountry, trainingStatus, reserved, inServiceCountry,
            tailLength, height, bodyLength);
        
        await MonkeyDAO.addMonkey(newMonkey);

        runMenu();
    });
}


// Print functions

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

    const dogs = await DogDAO.getAvailableDogs();
    const monkeys = await MonkeyDAO.getAvailableMonkeys();

    console.log(" === Available Dogs === ");
    console.table(dogs);
    console.log();
    console.log(" === Available Monkeys === ");
    console.table(monkeys);
    runMenu();
}


// Search functions

// Function to reserve an animal
// This function prompts the user to select a dog or monkey and reserves it
export async function reserveAnimal(runMenu) {

    await DogDAO.createDogTable();
    await MonkeyDAO.createMonkeyTable();

    rl.question("Dog or monkey: ", async (input) => {
        const animalType = input.trim().toLowerCase();
        let animalId;

        // Logic to reserva a dog
        if (animalType === 'dog') {
            const dogs = await DogDAO.getAvailableDogs();
            
            // Condition if there are no dogs available
            if (dogs.length === 0) {
                console.log("No available dogs to reserve.");
                runMenu();
                return;
            }

            // Display available dogs in a table format
            console.table(dogs);
            rl.question("Enter the ID of the dog to reserve: ", async (idInput) => {
                animalId = parseInt(idInput, 10);
                await DogDAO.reserveDog(animalId);
                runMenu();
                return;
            });

        // Logic to reserve a monkey
        } else if (animalType === 'monkey') {
            const monkeys = await MonkeyDAO.getAvailableMonkeys();

            // Condition if there are no monkeys available
            if (monkeys.length === 0) {
                console.log("No available monkeys to reserve.");
                runMenu();
                return;
            }

            // Display available monkeys in a table format
            console.table(monkeys);
            rl.question("Enter the ID of the monkey to reserve: ", async (idInput) => {
                animalId = parseInt(idInput, 10);
                await MonkeyDAO.reserveMonkey(animalId);
                runMenu();
                return;
            });

        } else {
            console.log("Invalid animal type. Please enter 'dog' or 'monkey'.");
            reserveAnimal(runMenu);
        }
    });
}

// Function to unreserve an animal
// This function prompts the user to select a dog or monkey and unreserves it
export async function unreserveAnimal(runMenu) {

    await DogDAO.createDogTable();
    await MonkeyDAO.createMonkeyTable();

    rl.question("Dog or monkey: ", async (input) => {
        const animalType = input.trim().toLowerCase();
        let animalId;

        // Logic to unreserve a dog
        if (animalType === 'dog') {
            const dogs = await DogDAO.getUnavailableDogs();
            
            // Condition if there are no dogs reserved
            if (dogs.length === 0) {
                console.log("No dogs to unreserve.");
                runMenu();
                return;
            }

            // Display all reserved dogs in a table format
            console.table(dogs);
            rl.question("Enter the ID of the dog to unreserve: ", async (idInput) => {
                animalId = parseInt(idInput, 10);
                await DogDAO.unreserveDog(animalId);
                runMenu();
                return;
            });

        // Logic to unreserve a monkey
        } else if (animalType === 'monkey') {
            const monkeys = await MonkeyDAO.getUnavailableMonkeys();

            // Condition if there are no monkeys reserved
            if (monkeys.length === 0) {
                console.log("No monkeys to unreserve.");
                runMenu();
                return;
            }

            // Display all reserved monkeys in a table format
            console.table(monkeys);
            rl.question("Enter the ID of the monkey to unreserve: ", async (idInput) => {
                animalId = parseInt(idInput, 10);
                await MonkeyDAO.unreserveMonkey(animalId);
                runMenu();
                return;
            });
            
        } else {
            console.log("Invalid animal type. Please enter 'dog' or 'monkey'.");
            unreserveAnimal(runMenu);
        }
    });
}