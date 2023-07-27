import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import BlogPage from './components/blogs/BlogPage';
import PostForm from './components/blogs/PostForm';
import Profile from './components/Profile/Profile'
import Logout from './components/logout/Logout'
const AppRoutes = [
    {
        path: '/Home',
        element: <BlogPage />
    },
    {
        path: '/Create',
        element: <PostForm />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/Profile',
        element: <Profile />
    },
    {
        path: '/Logout',
        element: <Logout />
    }
];

export default AppRoutes;
