import readline from 'readline';
import * as DogDAO from '../dao/DogDAO.js';
import { Dog } from '../models/Dog.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

export async function intakeNewDog(runMenu) {
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

export async function printAllDogs(runMenu) {
    const dogs = await DogDAO.getAllDogs();
    console.table(dogs);
    runMenu();
}