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