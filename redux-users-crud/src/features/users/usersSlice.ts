import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { filters, State, User } from "./types";

const initialState: State = {
    users: [],
    currentFilter: "all"
}

export const userSlice = createAppSlice({
    name: "users",
    initialState,
    reducers: create => ({
        setCurrentFilter: create.reducer<filters>((state, action) => {
            state.currentFilter = action.payload
        }),
        getUsers: create.asyncThunk<User[]>(
            async () => {
                const response = await fetch("http://localhost:4002/users")
                return await response.json() as User[]
            }, {
            fulfilled: (state: State, action: PayloadAction<User[]>) => {
                state.users = action.payload
            }
        }
        ),
        deleteUser: create.asyncThunk<number, number>(
            async (id: number) => {
                await fetch(`http://localhost:4002/users/${id}`, {
                    method: "DELETE",
                })
                return id
            }, {
            fulfilled: (state: State, action: PayloadAction<number>) => {
                state.users = state.users.filter(user => user.id !== action.payload)
            }
        }
        )
    }),
    selectors: {
        selectUsers: state => state.users,
        selectFilter: state => state.currentFilter,
        selectFilteredUsers: state => {
            console.log("filter selector worked...")
            if (state.currentFilter == "all") {
                return state.users
            }
            return state.users.filter(user => user.gender == state.currentFilter)
        }
    }
})


export const selectFilteredUsers = createSelector([userSlice.selectors.selectFilter, userSlice.selectors.selectUsers], (currentFilter, users) => {
    console.log("HELLO!")
    if (currentFilter != "all") {
        return users.filter(user => user.gender == currentFilter)
    }
    return users
})

export const { selectUsers, selectFilter } = userSlice.selectors
export const { getUsers, setCurrentFilter, deleteUser } = userSlice.actions