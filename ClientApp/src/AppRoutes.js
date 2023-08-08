import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import Logout from "./pages/Logout";
import MyBlog from "./pages/MyBlog";
import CreateBlog from "./pages/CreateBlog";
import Dummy from "./pages/Dummy";

const AppRoutes = [
    {
        path: '/Dummy',
        element: <Dummy />
    },
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/SignUp',
        element: <SignUp />
    },
    {
        path: '/Blog',
        element: <Blog />
    },
    {
        path: '/Logout',
        element: <Logout />
    },
    {
        path: '/MyBlog',
        element: <MyBlog />
    },
    {
        path: '/CreateBlog',
        element: <CreateBlog />
    }
];

export default AppRoutes;
