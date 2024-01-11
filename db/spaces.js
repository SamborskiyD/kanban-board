'use server'

import clientPromice from "."

let client
let db
let spaces

async function init() {
    if (db) return
    try {
        client = await clientPromice
        db = await client.db('kanban-board')
        spaces = await db.collection('spaces')
    }
    catch {
        throw new Error("Can't connect to the database")
    }
}

export async function getSpaces() {
    try {
        if (!spaces) await init()

        const res = await spaces.find({}).map(user => ({...user, id: user._id.toString()})).toArray()
        return res
    }
    catch(error) {
        return {error: "Can't fetch spaces"}
    }
}

export async function addNewColumn(spaceId, columns) {
    try {
        if (!spaces) await init()

        const filter = {_id: ObjectId(spaceId)}
        const update = {columns: [...columns, {id: columns.length, title: "New Column"}]}
        await spaces.updateOne(filter, update)
    }
    catch(error) {
        return {error: "Can't fetch spaces"}
    }
}