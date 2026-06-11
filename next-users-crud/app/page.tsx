"use client"

import { useEffect, useState } from "react"
import { User } from "./(helpers)/types"
import axios from "axios"
import Link from "next/link"

export default function Home() {

  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    axios
      .get<User[]>("/api/users")
      .then(response => {
        setUsers(response.data)
      })
  }, [])

  const removeUser = async (id: string) => {

    await axios.delete(`/api/users/${id}`)

    setUsers(
      users.filter(
        user => user.id !== id
      )
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-slate-800/70 bg-slate-900/95 p-6 shadow-[0_25px_70px_-30px_rgba(15,23,42,0.9)] backdrop-blur-xl">

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.32em] text-slate-400">
              Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              Users
            </h1>
          </div>

          <div className="rounded-3xl bg-slate-950/60 px-4 py-2 text-sm text-slate-300">
            Showing latest user records
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 shadow-inner">

          <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">

            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold uppercase tracking-[0.15em]">
                  ID
                </th>

                <th className="px-6 py-4 font-semibold uppercase tracking-[0.15em]">
                  Name
                </th>

                <th className="px-6 py-4 font-semibold uppercase tracking-[0.15em]">
                  Surname
                </th>

                <th className="px-6 py-4 font-semibold uppercase tracking-[0.15em]">
                  Salary
                </th>

                <th className="px-6 py-4 font-semibold uppercase tracking-[0.15em]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800 bg-slate-950/70">

              {
                users.map(user => (
                  <tr key={user.id}>

                    <td className="px-6 py-4">
                      {user.id}
                    </td>

                    <td className="px-6 py-4">
                      {user.name}
                    </td>

                    <td className="px-6 py-4">
                      {user.surname}
                    </td>

                    <td className="px-6 py-4">
                      {user.salary} USD
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">

                        <Link
                          href={`/users/edit/${user.id}`}
                          className="rounded bg-blue-500 px-3 py-2 text-white"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => removeUser(user.id)}
                          className="rounded bg-red-500 px-3 py-2 text-white"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>
      </section>
    </main>
  )
}