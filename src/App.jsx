import { Routes, Route } from "react-router-dom";
import KMI30Dashboard from "./pages/Home";
import Custom from "./pages/Custom";
import KSE100Dashboard from "./pages/kse100";

function App() {
  return (
    <Routes>
      <Route path="/" element={<KMI30Dashboard />} />
      <Route path="/custom" element={<Custom />} />
      <Route path="/kse100" element={<KSE100Dashboard />} />
    </Routes>
  );
}

export default App;