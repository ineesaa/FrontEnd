"use client"

import UserForm from "@/app/components/UserForm"
import { User } from "@/app/(helpers)/types"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AddUser() {

    const router = useRouter()

    const [form, setForm] = useState<Partial<User>>({
        name: "",
        surname: "",
        salary: 0
    })

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()

        await axios.post("/api/users", form)

        router.push("/")
    }

    return (
        <div className="mx-auto max-w-xl p-10">
            <UserForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                buttonText="Save User"
            />
        </div>
    )
}