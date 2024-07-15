import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage/login'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage></LoginPage>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
