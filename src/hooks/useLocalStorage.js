import { useEffect, useState } from "react";

export function useLocalStorage(key, initialData) {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key)
        return storedData ? JSON.parse(storedData) : initialData
    });

    useEffect(() => {
        if (data !== undefined) {
            localStorage.setItem(key, JSON.stringify(data))
        }
    }, [key, data])

    const updateLocalStorage = (newData) => {
        if (typeof newData === 'function') {
            setData((prevData) => {
                const updatedData = newData(prevData);
                localStorage.setItem(key, JSON.stringify(updatedData))
                return updatedData
            });
        } else {
            localStorage.setItem(key, JSON.stringify(newData))
            setData(newData)
        }
    };

    return [data, updateLocalStorage]
}
