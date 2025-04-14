import { RescueAnimal } from './RescueAnimal.js';

/**
 * @classdesc
 * Dog class that extends the RescueAnimal class.
 * This class represents a dog that is a rescue animal.
 */
class Dog extends RescueAnimal {

    /**
     * @param {int} id - The unique identifier for the dog
     * @param {string} name - The name of the dog
     * @param {string} breed - The breed of the dog
     * @param {string} gender - Male or Female
     * @param {int} age - The age of the dog in years
     * @param {float} weight - The weight of the dog in kg
     * @param {string} acquisitionDate - The date the dog was acquired (YYYY-MM-DD)
     * @param {string} acquisitionCountry - The country where the dog was acquired
     * @param {string} trainingStatus - The training status of the dog (e.g., trained, untrained)
     * @param {boolean} reserved - Indicates if the dog is reserved for service
     * @param {string} inServiceCountry - The country where the dog is in service
     */
    constructor(id, name, breed, gender, age, weight, acquisitionDate,
        acquisitionCountry, trainingStatus, reserved, inServiceCountry) {
            super(id, name, 'Dog', gender, age, weight, acquisitionDate,
                acquisitionCountry, trainingStatus, reserved, inServiceCountry);
            this.breed = breed;
        }

    // Accessor method for breed
    getBreed() {
        return this.breed;
    }

    // Mutator method for breed
    setBreed(breed) {
        this.breed = breed;
    }
}

export { Dog };