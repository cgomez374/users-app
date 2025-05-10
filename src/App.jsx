import { useState, useEffect, useContext } from 'react'
import UsersMain from './components/UsersMain.jsx'
import ThemeContext from './context/ThemeContext'
import getUsers from './utils/getUsers.js'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loadingSpinner, setloadingSpinner] = useState(false)
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [theme, setTheme] = useState("light-mode")

  useEffect(() => {
    getUsers(setloadingSpinner, setUsers, setloadingSpinner, setError, error)
  }, [])
  
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  function handleSearchBarChange(e){
    setSearchValue(e.target.value)
  }

  function userListItemTheme(){
    if (theme === "light-mode") return "dark-mode"
    if (theme === "dark-mode") return "light-mode"
  }

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <>
        {
          loadingSpinner 
          ? <h1 className={theme + " loading-alert"}>LOADING DATA!</h1> 
          : <UsersMain 
              users={users}
              searchValue={searchValue}
              handleSearchBarChange={handleSearchBarChange}
              userListItemTheme={userListItemTheme}
              error={error}
            
            />
        }
      </>
    </ThemeContext.Provider>
  )
}

export default App
