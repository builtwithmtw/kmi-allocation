import React from "react";
import "./table.css";

const Table = ({ rows = [], summary }) => {
  return (
    <div className="table-card">
      <table id="topTable">
        <thead>
          <tr>
            <th>Equity</th>
            <th>Price (PKR)</th>
            <th>Weight (%)</th>
            <th>Normalized (%)</th>
            <th>Amount (PKR)</th>
            <th>Shares</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "10px" }}>
                No data available
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={i}>
                <td>
                  {r.logo && (
                    <img
                      src={r.logo}
                      alt={r.name}
                      width="20"
                      height="20"
                      style={{
                        verticalAlign: "middle",
                        marginRight: "6px",
                      }}
                    />
                  )}
                  {r.name}
                </td>
                <td>{r.price?.toFixed(2)}</td>
                <td>{r.weight?.toFixed(2)}</td>
                <td>{r.normalizedWeight?.toFixed(2)}</td>
                <td>{r.finalAmount?.toFixed(0)}</td>
                <td>{r.shares}</td>
              </tr>
            ))
          )}
        </tbody>

        {summary && (
          <tfoot>
            <tr className="totals">
              <td colSpan="2">TOTAL</td>
              <td>{summary?.topTotalWeights?.toFixed(0)}%</td>
              <td>{summary?.topTotalNormalizedWeights?.toFixed(0)}%</td>
              <td>{summary?.topTotalAmount?.toFixed(0)}</td>
              <td>{summary?.topTotalShares?.toFixed(0)}</td>
            </tr>
            <tr className="summary-row">
              <td colSpan="5">
                <div className="summary-inline">
                  <p>
                    Invested: PKR {summary?.finalTotal.toFixed(0)}
                  </p>
                  <p>
                    Unallocated Cash: PKR {summary?.cashLeft.toFixed(0)}
                  </p>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
};

export default Table;
