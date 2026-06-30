import { useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectFilter, setCurrentFilter } from "./usersSlice"
import styles from './Users.module.css'
import type { filters } from "./types"

export const FilterUsers = () => {
    const selectedFilter = useAppSelector(selectFilter)
    const dispatch = useAppDispatch()
    const filters = useRef<filters[]>(['all', 'male', 'female'])

    return (
        <div>
            <p>Filter:  <strong>{selectedFilter}</strong></p>
            <div className={styles.list}>
                {
                    filters.current.map((criteria, index) =>
                        <button onClick={() => dispatch(setCurrentFilter(criteria))} className={criteria == selectedFilter ? styles.active : ""} key={index}>
                            {criteria}
                        </button>
                    )
                }
            </div>
        </div>
    )
}