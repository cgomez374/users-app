import { useContext } from "react"
import ThemeContext from "../context/ThemeContext"
import UserListItem from "./UserListItem"

export default function UsersList({users, searchValue, handleSearchBarChange, userListItemTheme, returnOppositeTheme}){
  const {theme} = useContext(ThemeContext)

  const filteredUsers = users.filter(user => {
    const fullName = user.name.first + " " + user.name.last
    return fullName.toLowerCase().includes(searchValue.toLowerCase())
  })
  
  return (
    <div className={ theme + " list-container" }>
      <form action="" >
        <input 
          className={ returnOppositeTheme(theme) }
          type="text" 
          placeholder="search for user" 
          value={searchValue}
          onChange={handleSearchBarChange}
        />
      </form>
      <ul className={theme}>
        {
          filteredUsers.map((user, idx) => (
            <UserListItem 
              key={idx}
              idx={idx}
              user={user}
              userListItemTheme={userListItemTheme}
            />
          ))
        }
      </ul>
    </div>
  )
}