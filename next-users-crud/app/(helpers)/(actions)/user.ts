"use server"

import { redirect } from "next/navigation"
import { addNewUser } from "../FileManager"

export const addUserAction = async (message:string, body: FormData) => {

    if(!body.get("name")){
        return "Please fill your name!"
    }
    
    await addNewUser({
        name: body.get("name")?.toString(),
        surname: body.get("surname")?.toString(),
        salary: Number(body.get("salary"))
    })

    return redirect("/")
}