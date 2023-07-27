const user = sessionStorage.getItem("UserData");
export const ID = user == null ? 0 : user.id;
export const LOGINAPIURL = 'Login';
export const REGISTRATIONAPIURL = 'Registration';
export const FETCHBLOGSAPIURL = 'Blogs/GetBlogs';
export const FETCHMYBLOGSAPIURL = 'Blogs/GetByIdBlogs';
export const LIKESAPIURL = 'Likes';
export const POSTAPIURL = 'PostForm';
export const PROFILEAPIURL = 'Profile';