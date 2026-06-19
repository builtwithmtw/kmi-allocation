import { useRef } from "react";

// import { toPng } from "html-to-image";

export default function ShareSummaryWidget({ allocation, investment, localStocks, onClose }) {
    const cardRef = useRef(null);
    if (!allocation || !localStocks) return null;



    const enrichedResults = allocation.results.map((r) => {
        const match = localStocks.find(
            (s) => s.name.toLowerCase() === r.name.toLowerCase()
        );
        return { ...r, type: match?.type || "unknown" };
    });

    const coreStocks = enrichedResults.filter((r) => r.type === "core");
    const supportingCastStocks = enrichedResults.filter((r) => r.type === "supporting_cast");

    const core = Math.round(coreStocks.reduce((sum, r) => sum + r.finalAmount, 0));
    const supportingCast = Math.round(supportingCastStocks.reduce((sum, r) => sum + r.finalAmount, 0));
    const invested = allocation.finalTotal || 0;
    const cashLeft = allocation.cashLeft || 0;
    const total = core + supportingCast;

    const corePct = total ? ((core / total) * 100).toFixed(1) : 0;
    const supportingCastPct = total ? ((supportingCast / total) * 100).toFixed(1) : 0;

    return (
        <div className="summary-overlay" id="summary-card">
            <div className="summary-card elegant" ref={cardRef}>
                <button className="close-btn" onClick={onClose}>✕</button>

                <h3 className="summary-title">Portfolio Summary</h3>

                <div className="investment-info">
                    <div><span>💰 Investment</span><strong>{investment.toLocaleString()} </strong></div>
                    <div><span>📦 Invested</span><strong>{invested.toLocaleString()} </strong></div>
                    <div><span>💤 Unused</span><strong>{cashLeft.toLocaleString()} </strong></div>
                </div>

                <div className="split-bar">
                    <div className="bar dividend" style={{ width: `${corePct}%` }}></div>
                    <div className="bar capital" style={{ width: `${supportingCastPct}%` }}></div>
                </div>

                <div className="percentages">
                    <div>
                        <span>💎 Core</span>
                        <strong>{corePct}%</strong>
                        <small>{core.toLocaleString()} PKR</small>
                    </div>
                    <div>
                        <span>🌟 Supporting Cast</span>
                        <strong>{supportingCastPct}%</strong>
                        <small>{supportingCast.toLocaleString()} PKR</small>
                    </div>
                </div>

                <div className="stocks-section">
                    <div>

                        <div className="stock-tags">
                            {coreStocks.length ? (
                                coreStocks.map((s) => (
                                    <span className="stock-tag" key={s.name}>
                                        <img src={s.logo} alt="" /> {s.name} <b>{s.shares}</b>
                                    </span>
                                ))
                            ) : (
                                <p className="empty">–</p>
                            )}
                        </div>
                    </div>

                    <div>

                        <div className="stock-tags">
                            {supportingCastStocks.length ? (
                                supportingCastStocks.map((s) => (
                                    <span className="stock-tag" key={s.name}>
                                        <img src={s.logo} alt="" /> {s.name} <b>{s.shares}</b>
                                    </span>
                                ))
                            ) : (
                                <p className="empty">–</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
