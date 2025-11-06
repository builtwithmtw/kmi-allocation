import { useState, useEffect } from "react";

import Button from "../button";

export function AddStockModal({
    allStocks,
    onAdd,
    onClose,
    editStock = null,   // 👈 new prop
    onUpdate = () => { } // 👈 new prop
}) {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);
    const [weight, setWeight] = useState("");
    const [type, setType] = useState("dividend");

    // 🔹 Pre-fill fields when editing
    useEffect(() => {
        if (editStock) {
            setSelected(editStock);
            setWeight(editStock.weight?.toString() || "");
            setType(editStock.type || "dividend");
        }
    }, [editStock]);

    const filtered = allStocks.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase())
    );

    function handleSubmit(e) {
        e.preventDefault();

        if (!weight) return;

        if (editStock) {
            // ✏️ Update Mode
            const updated = { ...editStock, weight: parseFloat(weight) };
            onUpdate(updated);
        } else {
            // ➕ Add Mode
            if (!selected) return;
            const newStock = {
                name: selected.name,
                logo: selected.logo,
                price: selected.price,
                weight: parseFloat(weight),
                type,
            };
            onAdd(newStock);
        }

        onClose();
    }

    const isEdit = !!editStock;

    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <div className="modal-header">
                    <h3>{isEdit ? "Edit Stock" : "Add Stock"}</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <form className="modal-form" onSubmit={handleSubmit}>
                    {/* 🔍 Search Field */}
                    {!isEdit && (
                        <>
                            <label>Search Stock</label>
                            <input
                                className="modal-input"
                                placeholder="Search stock..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            {query && (
                                <div className="search-results">
                                    {filtered.slice(0, 5).map((s) => (
                                        <div
                                            key={s.name}
                                            className={`search-item ${selected?.name === s.name ? "active" : ""}`}
                                            onClick={() => {
                                                setSelected(s);
                                                setQuery("");
                                            }}
                                        >
                                            <img src={s.logo} alt={s.name} width={24} height={24} />
                                            <span>{s.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {/* 🏦 Selected Stock Preview */}
                    {selected && (
                        <div className="selected-stock">
                            <img src={selected.logo} alt="" width={28} height={28} />
                            <p>{selected.name}</p>
                            <span>{selected.price?.toFixed(2)} PKR</span>
                        </div>
                    )}

                    {/* 📊 Weight */}
                    <label>Weight (%)</label>
                    <input
                        type="number"
                        className="modal-input"
                        placeholder="Weight"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />

                    {/* 💹 Type (disabled when editing) */}
                    <label>Type</label>
                    <select
                        className="modal-input"
                        value={type}
                        disabled={isEdit}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="dividend">Dividend</option>
                        <option value="capital_gain">Capital Gain</option>
                    </select>

                    <div className="modal-actions">
                        <Button text={isEdit ? "Update" : "Add"} onClick={handleSubmit} />
                        <button type="button" className="btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
