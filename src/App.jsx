import { Routes, Route } from "react-router-dom";
import KMI30Dashboard from "./pages/Home";
import Custom from "./pages/Custom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<KMI30Dashboard />} />
      <Route path="/custom" element={<Custom />} />
    </Routes>
  );
}

export default App;