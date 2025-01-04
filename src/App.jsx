import { Navigate,Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Footer from "./components/Footer";
import WatchPage from "./pages/home/WatchPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
// import { User } from '../../backend/models/user.model';



function App() {
  const { user,isCheckingAuth,authCheck}=useAuthStore();
  console.log("auth user is here:",user);
<Route path='/watch/:id' element={user ? <WatchPage /> : <Navigate to="/login" />} />

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if(isCheckingAuth){
    return(
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 w-10 h-10 size-10'>

          </Loader>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/login' element={!user? <LoginPage/>: <Navigate to={"/"}/>}/>
    <Route path='/signup' element={!user ?<SignupPage/> : <Navigate to={"/"}/>}/>
    <Route path='/watch/:id' element={!user ?<WatchPage/> : <Navigate to={"/login"}/>}/>
    </Routes>
    {/*Is visible on every page */}
    <Footer/>
    <Toaster/>
    </>
  );
}

export default App;
