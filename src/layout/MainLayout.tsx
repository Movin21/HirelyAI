import { Outlet } from "react-router-dom";
import Navigation from "../components/shared/Navigation";

const MainLayout = () => {
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainLayout;
