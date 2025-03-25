import { useState } from "react"

export function useFilter(data) {
    const [query, setQuery] = useState('')

    const filteredData = data.filter((el) => {
        return el.category?.toLowerCase().includes(query)
    })

    return [filteredData, setQuery]
}
