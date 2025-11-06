// ✅ Imports
import { useEffect, useState } from "react";

// ✅ Constants
const LOCAL_KEY = "local_stocks";

// ✅ Hook Definition
export function useLocalStocks() {
    const [stocks, setStocks] = useState([]);

    // ✅ Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) setStocks(JSON.parse(saved));
    }, []);

    // ✅ Helper to sync with localStorage
    const sync = (updated) => {
        setStocks(updated);
        localStorage.setItem(LOCAL_KEY, JSON.stringify(updated));
    };

    // ✅ Add a new stock
    const addStock = (stock) => {
        const updated = [...stocks, stock];
        sync(updated);
    };

    // ✅ Remove a stock by name
    const removeStock = (name) => {
        const updated = stocks.filter((s) => s.name !== name);
        sync(updated);
    };

    // ✅ Update stock (by name or symbol)
    const updateStock = (name, newData) => {
        const updated = stocks.map((s) =>
            s.name === name ? { ...s, ...newData } : s
        );
        sync(updated);
    };

    // ✅ Clear all stocks
    const clearStocks = () => {
        setStocks([]);
        localStorage.removeItem(LOCAL_KEY);
    };

    // ✅ EXPORT: Download JSON file of stocks
    const exportStocks = () => {
        const dataStr = JSON.stringify(stocks, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "stocks_backup.json";
        link.click();

        URL.revokeObjectURL(url);
    };

    // ✅ IMPORT: Load from uploaded JSON file
    const importStocks = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                if (Array.isArray(imported)) {
                    sync(imported);
                    alert("✅ Stocks imported successfully!");
                } else {
                    alert("❌ Invalid file format — expected an array.");
                }
            } catch {
                alert("❌ Failed to read JSON file.");
            }
        };
        reader.readAsText(file);
    };

    // ✅ Expose methods
    return {
        stocks,
        addStock,
        removeStock,
        updateStock,
        clearStocks,
        exportStocks,
        importStocks,
    };
}

// ✅ Default export
export default useLocalStocks;
