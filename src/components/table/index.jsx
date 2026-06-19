import { Edit3, Trash2, GripVertical } from "lucide-react"; // ✅ Lucide icons
import { useState } from "react";
import "./table.css";

const Table = ({
  rows = [],
  summary,
  custom = false,
  onEdit = () => { },
  onDelete = () => { },
  onReorder = () => { },
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.currentTarget.innerHTML);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex !== null && draggedIndex !== index) {
      onReorder(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="table-card">
      <table id="topTable">
        <thead>
          <tr>
            {custom && <th style={{ width: "40px" }}></th>}
            <th>Equity</th>
            {custom && <th>Type</th>}
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
                colSpan={custom ? "9" : "6"}
                style={{ textAlign: "center", padding: "10px" }}
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr
                key={i}
                draggable={custom}
                onDragStart={(e) => custom && handleDragStart(e, i)}
                onDragOver={(e) => custom && handleDragOver(e, i)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => custom && handleDrop(e, i)}
                onDragEnd={handleDragEnd}
                style={{
                  opacity: draggedIndex === i ? 0.5 : 1,
                  backgroundColor: dragOverIndex === i ? "rgba(100, 200, 255, 0.15)" : "transparent",
                  cursor: custom ? "move" : "default",
                  transition: "background-color 0.15s ease",
                  borderLeft: dragOverIndex === i ? "3px solid #2196f3" : "3px solid transparent",
                }}
              >
                {custom && (
                  <td className="drag-handle" style={{
                    textAlign: "center",
                    cursor: "grab",
                    padding: "8px",
                    userSelect: "none",
                  }}>
                    <GripVertical size={16} style={{ opacity: draggedIndex === i ? 1 : 0.4 }} />
                  </td>
                )}
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
                {custom && <td>{r.type === "core" ? "Core" : "Supporting Cast"}</td>}
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
              {custom && <td></td>}
              <td colSpan={custom ? "3" : "2"}>TOTAL</td>
              <td>{summary?.topTotalWeights?.toFixed(0)}%</td>
              <td>{summary?.topTotalNormalizedWeights?.toFixed(0)}%</td>
              <td>{summary?.topTotalAmount?.toFixed(0)}</td>
              <td>{summary?.topTotalShares?.toFixed(0)}</td>
              {custom && <td></td>}
            </tr>
            <tr className="summary-row">
              <td colSpan={custom ? "9" : "6"}>
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
