import { Route, Routes } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "../src/pages/post/home";
import CategoryList from "../src/pages/category/categoryList";
import PostList from "../src/pages/post/postList";
import Profile from "../src/pages/post/profile";
import Setting from "../src/pages/post/setting";
import PrivateLayout from "../src/components/layout/privateLayout";
import PublicLayout from "../src/components/layout/publicLayout";
import Login from "./pages/post/login";
import Signup from "./pages/post/signUp";
import NewCategory from "./pages/category/newCategory";
import UpdateCategory from "./pages/category/updateCategory";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/new-category" element={<NewCategory />} />
          <Route path="categories/update-category/:id" element={<UpdateCategory />} />
          <Route path="posts" element={<PostList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Setting />} />
        </Route>

        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
