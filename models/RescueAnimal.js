/**
 * @classdesc
 * Represents a rescue animal with various attributes
 * and methods to manage its information.
 * Parent class for all rescue animals.
 */
class RescueAnimal {

    /**
     * @param {int} id - The unique identifier for the animal
     * @param {string} name - The name of the animal
     * @param {string} animalType - The type of animal (e.g., dog, cat)
     * @param {string} gender - Male or Female
     * @param {int} age - The age of the animal in years
     * @param {float} weight - The weight of the animal in kg
     * @param {string} acquisitionDate - The date the animal was acquired (YYYY-MM-DD)
     * @param {string} acquisitionCountry - The country where the animal was acquired
     * @param {string} trainingStatus - The training status of the animal (e.g., trained, untrained)
     * @param {boolean} reserved - Indicates if the animal is reserved for service
     * @param {string} inServiceCountry - The country where the animal is in service
     */
    constructor(id, name, animalType, gender, age, weight, acquisitionDate,
        acquisitionCountry, trainingStatus, reserved, inServiceCountry) {
            this.id = id;
            this.name = name;
            this.animalType = animalType;
            this.gender = gender;
            this.age = age;
            this.weight = weight;
            this.acquisitionDate = acquisitionDate;
            this.acquisitionCountry = acquisitionCountry;
            this.trainingStatus = trainingStatus;
            this.reserved = reserved;
            this.inServiceCountry = inServiceCountry;
        }

    // Accessor methods for each property
    getName() {
        return this.name;
    }
    getAnimalType() {
        return this.animalType;
    }
    getGender() {
        return this.gender;
    }
    getAge() {
        return this.age;
    }
    getWeight() {
        return this.weight;
    }
    getAcquisitionDate() {
        return this.acquisitionDate;
    }
    getAcquisitionCountry() {
        return this.acquisitionCountry;
    }
    getTrainingStatus() {
        return this.trainingStatus;
    }
    getReserved() {
        return this.reserved;
    }
    getInServiceCountry() {
        return this.inServiceCountry;
    }

    // Mutator methods for each property
    setName(name) {
        this.name = name;
    }
    setAnimalType(animalType) {
        this.animalType = animalType;
    }
    setGender(gender) {
        this.gender = gender;
    }
    setAge(age) {
        this.age = age;
    }
    setWeight(weight) {
        this.weight = weight;
    }
    setAcquisitionDate(acquisitionDate) {
        this.acquisitionDate = acquisitionDate;
    }
    setAcquisitionCountry(acquisitionCountry) {
        this.acquisitionCountry = acquisitionCountry;
    }
    setTrainingStatus(trainingStatus) {
        this.trainingStatus = trainingStatus;
    }
    setReserved(reserved) {
        this.reserved = reserved;
    }
    setInServiceCountry(inServiceCountry) {
        this.inServiceCountry = inServiceCountry;
    }

    // Method to display animal information
    printInfo() {
        console.log(`Name: ${this.name}`);
        console.log(`Animal Type: ${this.animalType}`);
        console.log(`Status: ${this.trainingStatus}`);
        console.log(`acquisitionCountry: ${this.acquisitionCountry}`);
    }
}

export { RescueAnimal };