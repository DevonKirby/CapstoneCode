import readline from 'readline';
import * as MonkeyDAO from '../dao/MonkeyDAO.js';
import { Monkey } from '../models/Monkey.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

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

// Function to print all monkeys
// This function retrieves all monkeys from the database and displays them in a table format
export async function printAllMonkeys(runMenu) {

    await MonkeyDAO.createMonkeyTable();

    const monkeys = await MonkeyDAO.getAllMonkeys();
    console.table(monkeys);
    runMenu();
}