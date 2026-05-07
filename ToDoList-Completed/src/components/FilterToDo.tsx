import React from "react"

export type FilterType = "all" | "active" | "completed"

type Props = {
    filter: FilterType
    onChange: (filter: FilterType) => void
}

export const FilterToDo: React.FC<Props> = ({ filter, onChange }) => {
    const filters: FilterType[] = ["all", "active", "completed"]

    return (
        <div className="filter-todo">
            {filters.map((f) => (
                <button
                    key={f}
                    className={filter === f ? "active" : ""}
                    onClick={() => onChange(f)}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    )
}