import React, { useRef } from "react";
import "./ShareSummaryWidget.css";
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

    const dividendStocks = enrichedResults.filter((r) => r.type === "dividend");
    const capitalGainStocks = enrichedResults.filter((r) => r.type === "capital_gain");

    const dividend = dividendStocks.reduce((sum, r) => sum + r.finalAmount, 0);
    const capitalGain = capitalGainStocks.reduce((sum, r) => sum + r.finalAmount, 0);
    const invested = allocation.finalTotal || 0;
    const cashLeft = allocation.cashLeft || 0;
    const total = dividend + capitalGain;

    const dividendPct = total ? ((dividend / total) * 100).toFixed(1) : 0;
    const capitalGainPct = total ? ((capitalGain / total) * 100).toFixed(1) : 0;

    // const handleDownload = async () => {
    //     const node = cardRef.current;
    //     if (!node) return;

    //     try {
    //         // Fix layout issues for modals
    //         node.style.transform = "none";
    //         node.style.position = "relative";

    //         const overlay = document.querySelector(".summary-overlay");
    //         overlay.style.background = "transparent";

    //         const dataUrl = await toPng(node, {
    //             backgroundColor: "#ffffff",
    //             cacheBust: true,
    //             pixelRatio: 2, // HD image
    //             style: {
    //                 transform: "none",
    //                 position: "relative",
    //                 boxShadow: "none",
    //             },
    //             filter: (n) => !(n.classList?.contains("close-btn")), // hide close icon
    //         });

    //         const link = document.createElement("a");
    //         link.download = "portfolio-summary.png";
    //         link.href = dataUrl;
    //         link.click();
    //     } catch (error) {
    //         console.error("❌ Image generation failed:", error);
    //         alert("Image generation failed, check console.");
    //     }
    // };

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
                    <div className="bar dividend" style={{ width: `${dividendPct}%` }}></div>
                    <div className="bar capital" style={{ width: `${capitalGainPct}%` }}></div>
                </div>

                <div className="percentages">
                    <div>
                        <span>💸 Dividend</span>
                        <strong>{dividendPct}%</strong>
                        <small>{dividend.toLocaleString()} PKR</small>
                    </div>
                    <div>
                        <span>📈 Capital Gain</span>
                        <strong>{capitalGainPct}%</strong>
                        <small>{capitalGain.toLocaleString()} PKR</small>
                    </div>
                </div>

                <div className="stocks-section">
                    <div>

                        <div className="stock-tags">
                            {dividendStocks.length ? (
                                dividendStocks.map((s) => (
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
                            {capitalGainStocks.length ? (
                                capitalGainStocks.map((s) => (
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

            {/* <div className="download-btn-container">
                <button className="download-btn" onClick={handleDownload}>
                    ⬇️ Download Summary
                </button>
            </div> */}
        </div>
    );
}
