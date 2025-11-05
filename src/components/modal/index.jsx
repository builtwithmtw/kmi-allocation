import './modal.css';

export const Modal = ({ setInfoModal = () => { } }) => {
  return (
    <div id="infoModal" class="modal-overlay">
      <div class="modal">
        <span class="close-btn" onClick={() => setInfoModal(false)} id="closeModal">&times;</span>
        <h3>About</h3>
        <p>
          This tool intelligently distributes your total investment among the
          top 15 stocks based on their market weights while ensuring maximum
          utilization of your funds and integer-only share purchases (no
          fractional shares).
        </p>
        <p>
          It first normalizes each stock’s weight so that their combined total
          equals 100%, then calculates how much money each stock should ideally
          receive. From that, it buys as many whole shares as possible for each
          stock. Because share prices don’t divide perfectly into the target
          amounts, a small cash balance usually remains.
        </p>
        <p>
          To minimize this leftover, the algorithm then prioritizes companies
          that were closest to buying one more share (i.e., had the largest
          leftover fraction) and uses the remaining cash to purchase additional
          shares where possible.
        </p>
        <p>
          As a result, the investment distribution stays proportional to the
          company weights, realistic (no fractional shares), and highly
          efficient — ensuring your total investment is utilized almost
          completely with minimal unallocated cash.
        </p>
      </div>
    </div>
  )
}

export default Modal