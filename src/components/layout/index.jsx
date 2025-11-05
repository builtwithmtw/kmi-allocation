
import './layout.css';
import Header from './header/index.jsx';
import Footer from './footer/index.jsx';
import Modal from '../Modal/index.jsx';
import { useState } from 'react';

const Layout = ({ investment, setInvestment, refetch = () => { }, children }) => {
  const [infoModal, setInfoModal] = useState(false);
  return (
    <div class="app">
      <Header investment={investment} setInvestment={setInvestment} refetch={refetch} setInfoModal={setInfoModal} />
      {children}
      {infoModal && <Modal setInfoModal={setInfoModal} />}
      <Footer />
    </div>
  )
}

export default Layout