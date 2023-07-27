import FetchData from "./components/FetchData";
import BlogPage from './components/blogs/BlogPage';
import MyBlog from './components/blogs/MyBlog';
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
        path: '/MyBlog',
        element: <MyBlog />
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
