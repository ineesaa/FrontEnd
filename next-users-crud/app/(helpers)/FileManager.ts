"use server"

import { readFile, writeFile } from "fs/promises"
import { User } from "./types"
import uniqid from "uniqid"

export const getAllUsers = async (): Promise<User[]> => {
    const rawData = await readFile("./data.json", "utf-8")

    if (!rawData)
        return []

    return JSON.parse(rawData)
}

export const getUserById = async (
    id: string
): Promise<User | undefined> => {

    const users = await getAllUsers()

    return users.find(user => user.id === id)
}

export const addNewUser = async (
    user: Partial<User>
): Promise<void> => {

    const users = await getAllUsers()

    users.push({
        ...user,
        id: uniqid("next_111")
    } as User)

    await writeFile(
        "./data.json",
        JSON.stringify(users)
    )
}

export const updateUser = async (
    id: string,
    body: Partial<User>
): Promise<boolean> => {

    const users = await getAllUsers()

    const index = users.findIndex(
        user => user.id === id
    )

    if (index === -1)
        return false

    users[index] = {
        ...users[index],
        ...body
    }

    await writeFile(
        "./data.json",
        JSON.stringify(users)
    )

    return true
}

export const deleteUser = async (
    id: string
): Promise<boolean> => {

    const users = await getAllUsers()

    const filteredUsers = users.filter(
        user => user.id !== id
    )

    if (users.length === filteredUsers.length)
        return false

    await writeFile(
        "./data.json",
        JSON.stringify(filteredUsers)
    )

    return true
}