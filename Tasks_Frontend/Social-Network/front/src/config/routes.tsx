import { createBrowserRouter } from "react-router-dom";
import { Signin } from "../pages/main/signin";
import { Signup } from "../pages/main/signup";
import { AuthLayout } from "../pages/auth/auth-layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { Followings } from "../pages/auth/followings";
import { Messages } from "../pages/auth/messages";
import { Search } from "../pages/auth/search";
import { Account } from "../pages/auth/account";
import { Followers } from "../pages/auth/followers";
import { PostPage } from "../pages/auth/posts";

export const routes = createBrowserRouter([
  { 
    path: "/", 
    element: <Signin /> 
  },
  { 
    path: "/signup", 
    element: <Signup /> 
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/profile", element: <Profile /> },
      { path: "/profile/settings", element: <Settings /> },
      { path: "/profile/followers", element: <Followers /> },
      { path: "/profile/followings", element: <Followings /> },
      { path: "/messages", element: <Messages /> },
      { path: "/profile/search", element: <Search /> },
      { path: "/profile/view/:username", element: <Account /> },
      
      { path: "/posts", element: <PostPage /> }
    ]
  }
]);

