import DashBoard from "../pages/DashBoard";
import { Navigate, Route, Routes } from "react-router-dom";
import Offers from "../pages/Offers";
import Accessories from "../pages/Accessories";
import Devices from "../pages/Devices";
import Home from "../pages/Home";
import Profile from "../components/Profile/Profile";

export const Navigator = () => {
  <Route path="*" element={<Navigate to="/" />} />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route exact path="/dashboard" element={<DashBoard />}>
          <Route exact path="home" element={<Home />} />
          <Route path="devices" element={<Devices />} />
          <Route path="accessories" element={<Accessories />} />
          <Route path="offers" element={<Offers />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default Navigator;
