import Login from "./Components/Login"
import SignUp from "./Components/SingUp"
import Habits from "./Components/Habits"
import Today from "./Components/Today"
import Historic from "./Components/Historic"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import UserContext from "./contexts/UserContext"

function App() {
  const [token, setToken] = useState("")

  const [user, setUser] = useState("")
  const [progress, setProgress] = useState("")

  return (
    <>
      <UserContext.Provider value={{user, setUser, progress, setProgress}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login setToken={setToken} />} />
            <Route path="/cadastro" element={<SignUp />} />
            <Route path="/habitos" element={<Habits token={token} />} />
            <Route path="/hoje" element={<Today token={token} />} />
            <Route path="/historico" element={<Historic/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
