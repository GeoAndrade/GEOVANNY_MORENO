import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
export const ProjectRouter = () => {
  return (
    <>
      <div className="container">
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
