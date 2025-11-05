import { Link } from "react-router-dom";
import { InfoIcon } from "lucide-react"; // 🧩 Modern React icon library
import "./header.css";

const Header = ({ investment, setInvestment, refetch = () => { }, setInfoModal = () => { } }) => {
  return (
    <header className="header">
      <div className="left-section">
        {/* 🏠 Home */}
        <Link to="/" className="home-link">
          <h2>KMI Investment Allocation</h2>
        </Link>

        {/* ℹ️ About Us Icon */}
        <button className="about-btn" onClick={() => setInfoModal(true)} title="About Us">
          <InfoIcon size={20} strokeWidth={2} />
        </button>
      </div>

      <div className="actions">
        {/* ✨ Custom Portfolio */}
        <Link
          to="/custom"
          className="portfolio-link"
          title="View Your Custom Portfolio"
        >
          ✨ My Portfolio
        </Link>

        <span>Enter Amount:</span>
        <input
          id="investment"
          type="number"
          value={investment}
          onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
        />
        <button id="refreshBtn" onClick={refetch} title="Refresh">
          🔄
        </button>
      </div>
    </header>
  );
};

export default Header;
