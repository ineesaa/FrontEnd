"use client"

import { User } from "@/app/(helpers)/types"

interface Props {
    form: Partial<User>
    setForm: React.Dispatch<React.SetStateAction<Partial<User>>>
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    buttonText: string
}

export default function UserForm({
    form,
    setForm,
    onSubmit,
    buttonText
}: Props) {

    return (
        <form onSubmit={onSubmit} className="space-y-4">

            <input
                type="text"
                placeholder="Name"
                value={form.name || ""}
                onChange={e =>
                    setForm({ ...form, name: e.target.value })
                }
                className="w-full rounded-xl border p-3"
            />

            <input
                type="text"
                placeholder="Surname"
                value={form.surname || ""}
                onChange={e =>
                    setForm({ ...form, surname: e.target.value })
                }
                className="w-full rounded-xl border p-3"
            />

            <input
                type="number"
                placeholder="Salary"
                value={form.salary || 0}
                onChange={e =>
                    setForm({
                        ...form,
                        salary: Number(e.target.value)
                    })
                }
                className="w-full rounded-xl border p-3"
            />

            <button
                type="submit"
                className="w-full rounded-xl bg-pink-500 p-3 text-white"
            >
                {buttonText}
            </button>

        </form>
    )
}