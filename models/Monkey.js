import { RescueAnimal } from './RescueAnimal.js';

/**
 * @classdesc
 * Monkey class that extends the RescueAnimal class.
 * This class represents a monkey that is a rescue animal.
 */
class Monkey extends RescueAnimal {

    /**
     * @param {string} name - The name of the monkey
     * @param {string} species - The species of the monkey
     * @param {string} gender - Male or Female
     * @param {int} age - The age of the monkey in years
     * @param {float} weight - The weight of the monkey in kg
     * @param {string} acquisitionDate - The date the monkey was acquired (YYYY-MM-DD)
     * @param {string} acquisitionCountry - The country where the monkey was acquired
     * @param {string} trainingStatus - The training status of the monkey (e.g., trained, untrained)
     * @param {boolean} reserved - Indicates if the monkey is reserved for service
     * @param {string} inServiceCountry - Indicates the country where the monkey is in service
     * @param {float} tailLength - The length of the monkey's tail in cm
     * @param {float} height - The height of the monkey in cm
     * @param {float} bodyLength - The body length of the monkey in cm
     */
    constructor(name, species, gender, age, weight, acquisitionDate,
        acquisitionCountry, trainingStatus, reserved, inServiceCountry,
        tailLength, height, bodyLength) {
            super(name, 'Monkey', gender, age, weight, acquisitionDate,
                acquisitionCountry, trainingStatus, reserved, inServiceCountry);
            this.species = species;
            this.tailLength = tailLength;
            this.height = height;
            this.bodyLength = bodyLength;
        }

    // Accessor methods for each Monkey property
    getSpecies() {
        return this.species;
    }
    getTailLength() {
        return this.tailLength;
    }
    getHeight() {
        return this.height;
    }
    getBodyLength() {
        return this.bodyLength;
    }

    // Mutator methods for each Monkey property
    setSpecies(species) {
        this.species = species;
    }
    setTailLength(tailLength) {
        this.tailLength = tailLength;
    }
    setHeight(height) {
        this.height = height;
    }
    setBodyLength(bodyLength) {
        this.bodyLength = bodyLength;
    }
}

export { Monkey };