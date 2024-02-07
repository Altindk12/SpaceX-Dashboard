import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./pages/navbar/Navbar";
import Rockets from "./pages/rockets/Rockets";
import Missions from "./pages/missions/Missions";
import MyProfile from "./pages/myProfile/MyProfile";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Rockets />,
        },
        {
          path: "/missions",
          element: <Missions />,
        },
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
