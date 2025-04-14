import { openDB } from "../database.js";
import { Monkey } from "../models/Monkey.js";

// This function creates a new SQLite table for monkeys if it doesn't already exist.
export async function createMonkeyTable() {
    const db = await openDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS monkeys (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        species TEXT NOT NULL,
        gender TEXT NOT NULL,
        age INTEGER NOT NULL,
        weight REAL NOT NULL,
        acquisition_date TEXT NOT NULL,
        acquisition_country TEXT NOT NULL,
        training_status TEXT NOT NULL,
        reserved BOOLEAN NOT NULL,
        in_service_country TEXT NOT NULL,
        tail_length REAL NOT NULL,
        height REAL NOT NULL,
        body_length REAL NOT NULL
        )
    `);
}

// This function adds a new monkey to the database.
export async function addMonkey(monkey) {
    const db = await openDB();

    try {
        await db.run(`
            INSERT INTO monkeys (name, species, gender, age, weight, acquisition_date,
            acquisition_country, training_status, reserved, in_service_country,
            tail_length, height, body_length)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [monkey.getName(), monkey.getSpecies(), monkey.getGender(), monkey.getAge(),
            monkey.getWeight(), monkey.getAcquisitionDate(), monkey.getAcquisitionCountry(),
            monkey.getTrainingStatus(), monkey.getReserved(), monkey.getInServiceCountry(),
            monkey.getTailLength(), monkey.getHeight(), monkey.getBodyLength()]
        );
        console.log(`Monkey ${monkey.getName()} added successfully.`);
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            console.error(`Monkey with name ${monkey.getName()} already exists.`);
        }
        else {
            console.error('Error adding monkey:', error.message);
        }
    }
}

// This function updates an existing monkey's information in the database.
export async function updateMonkey(monkey) {
    const db = await openDB();

    try {
        await db.run(`
            UPDATE monkeys
            SET species = ?, age = ?, weight = ?, acquisition_date = ?,
            acquisition_country = ?, training_status = ?, reserved = ?, in_service_country = ?,
            tail_length = ?, height = ?, body_length = ?
            WHERE name = ?`,
            [monkey.getSpecies(), monkey.getAge(), monkey.getWeight(), monkey.getAcquisitionDate(),
            monkey.getAcquisitionCountry(), monkey.getTrainingStatus(), monkey.getReserved(),
            monkey.getInServiceCountry(), monkey.getTailLength(), monkey.getHeight(),
            monkey.getBodyLength(), monkey.getName()]
        )
    } catch (error) {
        console.error('Error updating monkey:', error.message);
    }
}

// This function returns all monkeys from the database.
// It retrieves all monkeys and maps them to Monkey objects.
export async function getAllMonkeys() {
    const db = await openDB();
    const rows = await db.all(`SELECT * FROM monkeys`);

    return rows.map(row => new Monkey(
        row.id,
        row.name,
        row.species,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country,
        row.tail_length,
        row.height,
        row.body_length
    ));
}

// This function returns a monkey by its name from the database.
// It retrieves the monkey and maps it to a Monkey object.
export async function getMonkeyByName(name) {
    const db = await openDB();
    const row = await db.get(`SELECT * FROM monkeys WHERE name = ?`, [name]);

    return row.map(row => new Monkey(
        row.id,
        row.name,
        row.species,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country,
        row.tail_length,
        row.height,
        row.body_length
    ));
}

// This function returns a list of available monkeys from the database.
// It retrieves all monkeys that are not reserved and maps them to Monkey objects.
export async function getAvailableMonkeys() {
    const db = await openDB();
    const rows = await db.all(`SELECT * FROM monkeys WHERE reserved = 0`);

    return rows.map(row => new Monkey(
        row.id,
        row.name,
        row.species,
        row.gender,
        row.age,
        row.weight,
        row.acquisition_date,
        row.acquisition_country,
        row.training_status,
        row.reserved === 1,
        row.in_service_country,
        row.tail_length,
        row.height,
        row.body_length
    ));
}

// This function reserves a monkey by its ID in the database.
// It updates the reserved status of the monkey to true (1).
export async function reserveMonkey(id) {
    const db = await openDB();
    try {
        await db.run(`UPDATE monkeys SET reserved = 1 WHERE id = ?`, [id]);
        console.log(`Monkey with ID ${id} has been reserved.`);
    } catch (error) {
        console.error('Error reserving monkey:', error.message);
    }
}