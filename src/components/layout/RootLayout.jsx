import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

const RootLayout = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div>
      <main>
        {!isAdmin && <Navbar />}
        <div className="flex-grow">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
