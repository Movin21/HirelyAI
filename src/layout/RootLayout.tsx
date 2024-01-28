import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className="container">
      <Outlet />
    </main>
  );
};

export default RootLayout;
