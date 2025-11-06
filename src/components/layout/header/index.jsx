import { Link } from "react-router-dom";
import Button from "../../button";

const Header = ({
  investment,
  setInvestment,
  refetch = () => { },
  setInfoModal = () => { },
}) => {
  return (
    <header className="header">
      <div className="left-section">
        {/* 🏠 Home */}
        <Link to="/" className="home-link">
          <h2>KMI Investment Allocation</h2>
        </Link>
        <Button onClick={() => setInfoModal(true)} text="About" style={{ height: 'auto', fontSize: '10px', padding: '6px' }} />
      </div>

      <div className="actions">


        <Link className="portfolio-link" to="/custom">
          Custom Allocation
        </Link>

        <span> Amount:</span>
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
