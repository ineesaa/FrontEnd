"use client"

import UserForm from "@/app/components/UserForm"
import { User } from "@/app/(helpers)/types"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function EditUser() {

    const { id } = useParams()
    const router = useRouter()

    const [form, setForm] = useState<Partial<User>>({})

    useEffect(() => {
        axios
            .get(`/api/users/${id}`)
            .then(res => setForm(res.data))
    }, [id])

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault()

        await axios.put(
            `/api/users/${id}`,
            form
        )

        router.push("/")
    }

    return (
        <div className="mx-auto max-w-xl p-10">
            <UserForm
                form={form}
                setForm={setForm}
                onSubmit={handleSubmit}
                buttonText="Update User"
            />
        </div>
    )
}