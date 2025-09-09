import { useEffect, useState } from "react";

// Custom hook : works like useState but for local storage
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Initialize state with value from local storage or initialValue if not found
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            // If initialValue is a function, call it and pass the current value as an argument
            return item ? JSON.parse(item) : initialValue;
        } catch (err) {
            console.error(err);
            return initialValue;
        }
    }
    );

    // if there is a change in the key or storedValue, update the local storage
    useEffect(() => {
        try {
            // save the new state to local storage as a JSON string
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (err) {
            console.error(err);
        }
    }, [key, storedValue]); // Only re-run if key or storedValue changes

    // Return the stored value and a function to update it
    return [storedValue, setStoredValue] as const;
}