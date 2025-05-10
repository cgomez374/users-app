import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"
import UsersList from './UsersList'

export default function UsersMain({users, searchValue, handleSearchBarChange, userListItemTheme, error}){
  const {theme, setTheme} = useContext(ThemeContext)

  function handleThemeChange(){
    setTheme(prevTheme => {
      if (prevTheme === "light-mode") return "dark-mode"
      if (prevTheme === "dark-mode") return "light-mode"
    }) 
  }

  return (
    <main className={theme}>
      <h1>Users App</h1>
      <p>Grab random users from the RandomUsers API and filter them</p>
      <button onClick={handleThemeChange}>{ theme === "light-mode" ? "dark-mode" : theme }</button>
      {
        error ? <p>! There was an error retrieving users !</p> :
          <UsersList 
            users={users}
            searchValue={searchValue}
            handleSearchBarChange={handleSearchBarChange}
            userListItemTheme={userListItemTheme}
          />
      }
    </main>
  )
}