import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.tsx'
import './App.css'
import Home from './components/pages/Home.tsx'
import Login from './components/pages/Login.tsx'
import Register from './components/pages/Register.tsx'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, type User, signOut } from 'firebase/auth'
import NotFound from './components/pages/NotFound.tsx'
import axios from 'axios';

function App() {
  const config = {
      apiKey: "AIzaSyDc_dZZhUYuOFtU-T98JxAhs2LTxB589lA",
      authDomain: "countingstars-37254.firebaseapp.com",
      projectId: "countingstars-37254",
      storageBucket: "countingstars-37254.firebasestorage.app",
      messagingSenderId: "214635906057",
      appId: "1:214635906057:web:6e69b1045875477b85a4d8"
  }
  const app = initializeApp(config);
  const auth = getAuth(app);
  const [user, setUser] = useState<User | null>();

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    console.log(response.data.items);
  }

  useEffect(() => {
    fetchAPI();
  }, [])

  const [pageTitle, setPageTitle] = useState("Home");
  const [count, setCount] = useState(0);

  onAuthStateChanged(auth, user => {
      setUser(user);
  })

  return (
    <main>
      <div>
        <BrowserRouter>
          <Header pageTitle={pageTitle} auth={auth} user={user || null} handleUserLogout={() => {setUser(null);signOut(auth);}}/>
          <Routes>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/login' element={<Login auth={auth} user={user || null} handleUserLogin={(user) => setUser(user)}/>}></Route>
            <Route path='/register' element={<Register auth={auth} user={user || null} handleUserRegister={(user) => setUser(user)}/>}></Route>
            <Route path='*' element={<NotFound />} />
          </Routes> 
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App
