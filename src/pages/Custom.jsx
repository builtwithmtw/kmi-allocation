import { useState } from "react";

import Table from '../components/table/index.jsx';
import Layout from "../components/layout";
import Loader from '../components/loader/index.jsx';
import { useAllocations } from "../hooks/useAllocations";
import { useAllStocks } from "../hooks/useAllStocks.jsx";
import { useLocalStocks } from "../hooks/useLocalStocks.jsx";
import { AddStockModal } from "../components/StockModal/index.jsx";
import Button from "../components/button/index.jsx";
import ShareSummaryWidget from "../components/sharesummarywidget/index.jsx";


export default function Custom() {
    const { stocks: allStocks, loading, refetch } = useAllStocks();
    const { stocks, addStock } = useLocalStocks();
    const [investment, setInvestment] = useState(100000);
    const allocation = useAllocations(stocks, investment);

    const [showModal, setShowModal] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    return (
        <Layout setInvestment={setInvestment} investment={investment} refetch={refetch}>

            <div className="actions">
                <Button
                    text="Generate Summary"
                    disabled={stocks.length === 0}
                    onClick={() => setShowSummary(true)}
                />
                <Button text="Add Stock" onClick={() => setShowModal(true)} />
            </div>
            {loading && <Loader />}
            {allocation && <Table rows={allocation.results} summary={allocation} />}
            {showModal && (
                <AddStockModal
                    allStocks={allStocks}
                    onAdd={addStock}
                    onClose={() => setShowModal(false)}
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
