import { openDB } from '../database.js';
import { Dog } from '../models/Dog.js';

// This function creates a new SQLite table for dogs if it doesn't already exist.
export async function createDogTable() {
    const db = await openDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS dogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        breed TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL,
        weight REAL NOT NULL,
        acquisition_date TEXT NOT NULL,
        acquisition_country TEXT NOT NULL,
        training_status TEXT NOT NULL,
        reserved BOOLEAN NOT NULL,
        in_service_country TEXT NOT NULL
        )
    `);
}

// This function adds a new dog to the database.
export async function addDog(dog) {
    const db = await openDB();

    try {
        await db.run(`
            INSERT INTO dogs (name, breed, gender, age, weight, acquisition_date,
            acquisition_country, training_status, reserved, in_service_country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [dog.getName(), dog.getBreed(), dog.getGender(), dog.getAge(),
            dog.getWeight(), dog.getAcquisitionDate(), dog.getAcquisitionCountry(),
            dog.getTrainingStatus(), dog.getReserved(), dog.getInServiceCountry()]
        );
        console.log(`Dog ${dog.getName()} added successfully.`);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            console.error(`Dog with name ${dog.getName()} already exists.`);
        }
        else {
            console.error('Error adding dog:', error.message);
        }
    }
}

// This function updates an existing dog's information in the database.
export async function updateDog(dog) {
    const db = await openDB();

    try {
        await db.run(`
            UPDATE dogs
            SET breed = ?, age = ?, weight = ?, acquisition_date = ?,
            acquisition_country = ?, training_status = ?, reserved = ?, in_service_country = ?
            WHERE name = ?`,
            [dog.getBreed(), dog.getAge(), dog.getWeight(), dog.getAcquisitionDate(),
            dog.getAcquisitionCountry(), dog.getTrainingStatus(), dog.getReserved(),
            dog.getInServiceCountry(), dog.getName()]
        )
    } catch (error) {
        console.error('Error updating dog:', error.message);
    }
}

// This function returns all dogs from the database.
// It retrieves all dogs and maps them to Dog objects.
export async function getAllDogs() {
    const db = await openDB();
    const rows = await db.all(`SELECT * FROM dogs`);

    return rows.map(row => new Dog(
        row.id,
        row.name,
        row.breed,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country
    ));
}

// This function returns a dog by its name from the database.
// It retrieves the dog with the specified name and maps it to a Dog object.
export async function getDogByName(name) {
    const db = await openDB();
    const row = await db.get(`SELECT * FROM dogs WHERE name = ?`, [name]);

    return row.map(row => new Dog(
        row.id,
        row.name,
        row.breed,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country
    ));
}

// This function returns a list of available dogs from the database.
// It retrieves all dogs that are not reserved and maps them to Dog objects.
export async function getAvailableDogs() {
    const db = await openDB();
    const rows = await db.all(`SELECT * FROM dogs WHERE reserved = 0`);

    return rows.map(row => new Dog(
        row.id,
        row.name,
        row.breed,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country
    ));
}

// This function returns a list of unavailable dogs from the database.
// It retrieves all dogs that are reserved and maps them to Dog objects.
export async function getUnavailableDogs() {
    const db = await openDB();
    const rows = await db.all(`SELECT * FROM dogs WHERE reserved = 1`);

    return rows.map(row => new Dog(
        row.id,
        row.name,
        row.breed,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country
    ));
}

// This function reserves a dog by its ID in the database.
// It updates the reserved status of the dog to true (1).
export async function reserveDog(id) {
    const db = await openDB();
    try {
        await db.run(`UPDATE dogs SET reserved = 1 WHERE id = ?`, [id]);
        console.log(`Dog with ID ${id} has been reserved.`);
    } catch (error) {
        console.error('Error reserving dog:', error.message);
    }
}

// This function unreserves a dog by its ID in the database.
// It updates the reserved status of the dog to false (0).
export async function unreserveDog(id) {
    const db = await openDB();
    try {
        await db.run(`UPDATE dogs SET reserved = 0 WHERE id = ?`, [id]);
        console.log(`Dog with ID ${id} has been unreserved.`);
    } catch (error) {
        console.error('Error unreserving dog:', error.message);
    }
}