import { Edit3, Trash2 } from "lucide-react"; // ✅ Lucide icons

const Table = ({
  rows = [],
  summary,
  custom = false,
  onEdit = () => { },
  onDelete = () => { },
}) => {
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
            {custom && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={custom ? "7" : "6"}
                style={{ textAlign: "center", padding: "10px" }}
              >
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

                {custom && (
                  <td className="action-buttons" style={{ display: "flex", gap: "8px" }}>
                    <button
                      className="edit-btn"
                      onClick={() => onEdit(r)}
                      title="Edit Stock"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",

                        color: 'green'
                      }}
                    >
                      <Edit3 size={15} strokeWidth={1.8} />
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => onDelete(r)}
                      title="Delete Stock"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",

                        color: 'red'
                      }}
                    >
                      <Trash2 size={15} strokeWidth={1.8} />
                    </button>
                  </td>
                )}
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
              {custom && <td></td>}
            </tr>
            <tr className="summary-row">
              <td colSpan={custom ? "7" : "6"}>
                <div className="summary-inline">
                  <p>Invested:  {summary?.finalTotal?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  <p>Unallocated :  {summary?.cashLeft?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>

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
