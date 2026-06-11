import { addNewUser, getAllUsers } from "@/app/(helpers)/FileManager"
import { User } from "@/app/(helpers)/types"
import { NextResponse } from "next/server"

export const GET = async () => {
    const users = await getAllUsers()
    return NextResponse.json(users)
}
export const POST = async (request: Request) => {
    const body: User = await request.json()
    if (!body.name?.trim() || !body.surname?.trim()) {
        return NextResponse.json({ ok: false, message: "please fill all the fields" }, { status: 400 })
    }
    await addNewUser(body)
    return NextResponse.json({ ok: true }, { status: 201 })
}