import './header.css';

const Header = ({ investment, setInvestment, refetch = () => { }, setInfoModal = () => { } }) => {
  return (
    <header class="header">
      <h2 onClick={() => setInfoModal(true)}>KMI-30 Investment Allocation</h2>
      <div class="actions">
        <span>Enter Amount:</span>
        <input
          id="investment"
          type="number"
          value={investment}
          onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}

        />
        <button id="refreshBtn" onClick={refetch} title="Refresh">🔄</button>
      </div>
    </header>
  )
}

export default Header