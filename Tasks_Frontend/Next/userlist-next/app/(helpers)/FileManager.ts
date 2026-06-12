'use server'

import { readFile, writeFile } from "fs/promises"
import { User } from "./types"
import uniqid from "uniqid";

export const getAllUsers = async (): Promise<User[]> => {
    const rawData = await readFile("./data.json", "utf-8");
    if (!rawData) return [];

    return JSON.parse(rawData);
}

export const addNewUser = async (user: User): Promise<void> => {
    const users = await getAllUsers();
    users.push({
        ...user,
        id: uniqid("00"),
    })

    await writeFile("./data.json", JSON.stringify(users, null, 2));
}

export const updateUser = async (id: string, body: Partial<User>) => {
    const users = await getAllUsers();

    if (users.length) {
        const userIdx = users.findIndex(user =>
            user.id === id
        );

        if (userIdx !== -1) {
            users[userIdx] = {
                ...users[userIdx],
                ...body
            }
        }

        await writeFile("./data.json", JSON.stringify(users, null, 2));
    }
}

    

export const deleteUser = async (id: string) => {
    const users = await getAllUsers();

    if (users.length) {
        const filtered = users.filter(user =>
            user.id !== id
        );

        await writeFile("./data.json", JSON.stringify(filtered, null, 2));
    }
}