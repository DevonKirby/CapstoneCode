import { RescueAnimal } from "../models/RescueAnimal.js";

/**
 * @classdesc
 * This class represents a trainer for rescue animals.
 * It is implemented as a queue
 */
class Trainer {

    /**
     * @constructor
     * Creates an instance of the Trainer class.
     * Initializes an empty array to hold the animals.
     */
    constructor() {
        this.animals = [];
    }

    /**
     * @param {RescueAnimal} animal - The animal to be added to the queue.
     * @description Adds an animal to the queue.
     */
    addAnimal(animal) {
        this.animals.push(animal);
    }

    /**
     * @returns {RescueAnimal} The trained animal.
     * @description Trains the first animal in the queue.
     * Removes the animal from the queue and updates its training status.
     */
    trainAnimal() {

        if (this.isEmpty()) {
            console.log("No animals available for training.");
            return;
        }

        const animal = this.animals.shift(); // Get the first animal in the array
        animal.trainingStatus = "Trained"; // Update the training status
        return animal; // Return the trained animal
    }

    /**
     * @returns {RescueAnimal} The animal that was skipped.
     * @description Skips the training of the first animal in the queue.
     * Removes the animal from the queue without training it.
     */
    skipTraining() {
        if (this.isEmpty()) {
            console.log("No animals available for training.");
            return;
        }

        const animal = this.animals.shift(); // Get the first animal in the array
        return animal; // Return the animal without training it
    }

    /**
     * @returns {RescueAnimal} The first animal in the queue.
     * @description Peeks at the first animal in the queue without removing it.
     * Returns null if the queue is empty.
     */
    peekAnimal() {
        return this.isEmpty() ? null : this.animals[0]; // Return the first animal without removing it from the array
    }

    /**
     * @returns {RescueAnimal[]} The array of animals in the queue.
     */
    getAnimals() {
        return this.animals;
    }

    /**
     * @returns {boolean} True if the queue is empty, false otherwise.
     * @description Checks if the queue is empty.
     */
    isEmpty() {
        return this.animals.length === 0;
    }

    /**
     * @returns {number} The number of animals in the queue.
     * @description Returns the number of animals in the queue.
     */
    getAnimalCount() {
        return this.animals.length;
    }
}

export { Trainer };