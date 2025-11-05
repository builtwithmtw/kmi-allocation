import { useEffect, useState } from "react";

const LOCAL_KEY = "local_stocks";

export function useLocalStocks() {
    const [stocks, setStocks] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) {
            setStocks(JSON.parse(saved));
        }
    }, []);

    // Add stock and sync to localStorage + state
    const addStock = (stock) => {
        const updated = [...stocks, stock];
        setStocks(updated); // ✅ update React state immediately
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    };

    // Optional — for removing a stock
    const removeStock = (name) => {
        const updated = stocks.filter((s) => s.name !== name);
        setStocks(updated);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    };

    // Clear all
    const clearStocks = () => {
        setStocks([]);
        localStorage.removeItem(LOCAL_KEY);
    };

    return { stocks, addStock, removeStock, clearStocks };
}
