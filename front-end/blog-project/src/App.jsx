import Home from '../src/pages/post/home';
import { Route, Routes } from 'react-router-dom';
import Home from '../src/pages/post/home';
import CategoryList from '../src/pages/category/categoryList';
import PostList from '../src/pages/post/postList';
import Profile from '../src/pages/post/profile';
import Setting from '../src/pages/post/setting';
import PrivateLayout from '../src/components/layout/privateLayout';
import PublicLayout from '../src/components/layout/publicLayout';
import Login from './pages/post/login';
import Signup from './pages/post/signUp';


function App() {
  
  return (
    <Routes>

      <Route element={<PrivateLayout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='categories' element={<CategoryList/>} />
        <Route path='posts' element={<PostList/>} />
        <Route path='pofile' element={<Profile/>} />
        <Route path='setting' element={<Setting/>} />
      </Route>

      <Route element={<PublicLayout/>}>
        <Route path='signup' element={<Signup/>} />
        <Route path='login' element={<Login/>}/>
      </Route>

    </Routes>
  );

  
}

export default App
