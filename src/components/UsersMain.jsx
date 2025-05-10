import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"
import UsersList from './UsersList'

export default function UsersMain({users, searchValue, handleSearchBarChange, userListItemTheme, error}){
  const {theme, setTheme} = useContext(ThemeContext)

  function returnOppositeTheme(theme){
    if (theme === "light-mode") return "dark-mode"
    if (theme === "dark-mode") return "light-mode"
  }

  function handleThemeChange(){
    setTheme(prevTheme => returnOppositeTheme(prevTheme)) 
  }

  const buttonContent = returnOppositeTheme(theme)

  return (
    <main className={theme}>
      <h1>Users App</h1>
      <p>Grab random users from the RandomUsers API and filter them</p>
      <button 
        className={ `btn button-${buttonContent}` }
        onClick={handleThemeChange}>

        { buttonContent.replace("-", " ") }
        
      </button>
      {
        error ? <p>! There was an error retrieving users !</p> :
          <UsersList 
            users={users}
            searchValue={searchValue}
            handleSearchBarChange={handleSearchBarChange}
            userListItemTheme={userListItemTheme}
            returnOppositeTheme={returnOppositeTheme}
          />
      }
    </main>
  )
}