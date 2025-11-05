import React from "react";
import "./ShareSummaryWidget.css";

export default function ShareSummaryWidget({ allocation, investment, localStocks, onClose }) {
    if (!allocation || !localStocks) return null;

    // Merge allocation results with stock type from localStocks
    const enrichedResults = allocation.results.map((r) => {
        const match = localStocks.find(
            (s) => s.name.toLowerCase() === r.name.toLowerCase()
        );
        return { ...r, type: match?.type || "unknown" };
    });

    // Filter based on stock type
    const dividendStocks = enrichedResults.filter((r) => r.type === "dividend");
    const capitalGainStocks = enrichedResults.filter((r) => r.type === "capital_gain");

    // Calculate summaries
    const dividend = dividendStocks.reduce((sum, r) => sum + r.finalAmount, 0);
    const capitalGain = capitalGainStocks.reduce((sum, r) => sum + r.finalAmount, 0);
    const invested = allocation.finalTotal || 0;
    const cashLeft = allocation.cashLeft || 0;
    const total = dividend + capitalGain;

    const dividendPct = total ? ((dividend / total) * 100).toFixed(1) : 0;
    const capitalGainPct = total ? ((capitalGain / total) * 100).toFixed(1) : 0;

    return (
        <div className="share-summary-overlay">
            <div className="share-summary-widget">
                <button className="close-btn" onClick={onClose}>✕</button>
                <h3>Portfolio Summary</h3>

                <div className="summary-header">
                    <p className="summary-stats"><strong>Investment Amount:</strong> {investment.toLocaleString()} PKR</p>
                    <p className="summary-stats"><strong>Invested:</strong> {invested.toLocaleString()} PKR</p>
                    <p className="summary-stats"><strong>Unallocated:</strong> {cashLeft.toLocaleString()} PKR</p>
                    <p className="summary-stats"><strong>Dividend:</strong> {dividendPct}% ({dividend.toFixed(0)})</p>
                    <p className="summary-stats"><strong>Capital Gain:</strong> {capitalGainPct}% ({capitalGain.toFixed(0)})</p>
                </div>

                <div className="stocks-columns">
                    <div className="stocks-column">
                        <h4>💸 Dividend Stocks</h4>
                        {dividendStocks.length > 0 ? (
                            dividendStocks.map((s) => (
                                <div className="stock-item" key={s.name}>
                                    <span className="stock-name">
                                        <img src={s.logo} alt="" width={20} /> {s.name}
                                    </span>
                                    <span className="stock-shares">{s.shares} shares</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">No dividend stocks</p>
                        )}
                    </div>

                    <div className="stocks-column">
                        <h4>📈 Capital Gain Stocks</h4>
                        {capitalGainStocks.length > 0 ? (
                            capitalGainStocks.map((s) => (
                                <div className="stock-item" key={s.name}>
                                    <span className="stock-name">
                                        <img src={s.logo} alt="" width={20} /> {s.name}
                                    </span>
                                    <span className="stock-shares">{s.shares} shares</span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">No capital gain stocks</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
