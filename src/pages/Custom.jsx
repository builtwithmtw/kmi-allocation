import { useState, useRef } from "react";

import Table from "../components/table/index.jsx";
import Layout from "../components/layout";
import Loader from "../components/loader/index.jsx";
import { useAllocations } from "../hooks/useAllocations";
import { useAllStocks } from "../hooks/useAllStocks.jsx";
import { useLocalStocks } from "../hooks/useLocalStocks.jsx";
import { AddStockModal } from "../components/StockModal/index.jsx";
import Button from "../components/button/index.jsx";
import ShareSummaryWidget from "../components/sharesummarywidget/index.jsx";

export default function Custom() {
    const { stocks: allStocks, loading, refetch } = useAllStocks();
    const {
        stocks,
        addStock,
        removeStock,
        updateStock,
        importStocks,
        exportStocks,
    } = useLocalStocks();
    const [investment, setInvestment] = useState(100000);

    // Keep latest prices updated
    const updatedStocks = stocks.map((local) => {
        const latest = allStocks.find((s) => s.name === local.name);
        return latest ? { ...local, price: latest.price } : local;
    });

    const allocation = useAllocations(updatedStocks, investment);
    const [showModal, setShowModal] = useState(false);
    const [editStock, setEditStock] = useState(null);
    const [showSummary, setShowSummary] = useState(false);

    // Add / edit handlers
    const handleAdd = (stock) => addStock(stock);
    const handleEdit = (stock) => {
        setEditStock(stock);
        setShowModal(true);
    };
    const handleSaveEdit = (updatedStock) => {
        updateStock(updatedStock.name, updatedStock);
        setEditStock(null);
        setShowModal(false);
    };

    // File input ref & handlers for import
    const fileInputRef = useRef(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImportChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            importStocks(file);
        }
        // reset so same file can be selected again later
        e.target.value = "";
    };

    return (
        <Layout setInvestment={setInvestment} investment={investment} refetch={refetch}>
            {loading && <Loader />}

            {allocation && (
                <Table
                    rows={allocation.results}
                    summary={allocation}
                    custom={true}
                    onEdit={(row) => handleEdit(row)}
                    onDelete={(row) => removeStock(row.name)}
                />
            )}

            <div className="sub-header">
                <span></span>
                <div className="actions">
                    <Button
                        text="Generate Summary"
                        disabled={stocks.length === 0}
                        onClick={() => setShowSummary(true)}
                    />
                    <Button text="Add Stock" onClick={() => setShowModal(true)} />
                    <Button text="Export" disabled={stocks.length === 0} onClick={() => exportStocks()} />
                    {/* Import uses ref + click to reliably open file picker */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json"
                        onChange={handleImportChange}
                        style={{ display: "none" }}
                    />
                    <Button text="Import" onClick={handleImportClick} />
                </div>
            </div>

            {showModal && (
                <AddStockModal
                    allStocks={allStocks}
                    onAdd={handleAdd}
                    onUpdate={handleSaveEdit}
                    onClose={() => {
                        setShowModal(false);
                        setEditStock(null);
                    }}
                    editStock={editStock}
                />
            )}

            {showSummary && (
                <ShareSummaryWidget
                    allocation={allocation}
                    investment={investment}
                    localStocks={stocks}
                    onClose={() => setShowSummary(false)}
                />
            )}
        </Layout>
    );
}
