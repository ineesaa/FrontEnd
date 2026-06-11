import {
    getUserById,
    updateUser,
    deleteUser
} from "@/app/(helpers)/FileManager"

import { NextResponse } from "next/server"

export const GET = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    const { id } = await params

    const user = await getUserById(id)

    if (!user) {
        return NextResponse.json(
            { message: "user not found" },
            { status: 404 }
        )
    }

    return NextResponse.json(user)
}

export const PUT = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    const { id } = await params

    const body = await request.json()

    const updated = await updateUser(
        id,
        body
    )

    if (!updated) {
        return NextResponse.json(
            { message: "user not found" },
            { status: 404 }
        )
    }

    return NextResponse.json({
        ok: true
    })
}

export const DELETE = async (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) => {

    const { id } = await params

    const deleted = await deleteUser(id)

    if (!deleted) {
        return NextResponse.json(
            { message: "user not found" },
            { status: 404 }
        )
    }

    return NextResponse.json({
        ok: true
    })
}