import { useState, useEffect, createContext, useContext } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loadingSpinner, setloadingSpinner] = useState(false)
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const ThemeContext = createContext("light-mode")
  const [theme, setTheme] = useState("light-mode")
  
  // const { theme, setTheme } = useContext(ThemeContext)

  const filteredUsers = users.filter(user => {
    const fullName = user.name.first + " " + user.name.last
    return fullName.toLowerCase().includes(searchValue.toLowerCase())
  })

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch("https://randomuser.me/api/?results=50")
        setloadingSpinner(true)
        if(!res.ok){
          throw new Error(`HTTP ERROR! Status: ${res.status}`)
        }
        const data = await res.json()

        setUsers(data.results)
        setloadingSpinner(false)
        if (!error) setError("")


      } catch (error) {
        console.log(error)
        setError(true)
        setloadingSpinner(false)
      }
    }
    getUsers()
  }, [])

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
          loadingSpinner ? <p>LOADING DATA!</p> 
          : 
            <main className={theme}>
              <h1>Users App</h1>
              <p>Grab random users from the RandomUsers API and filter them</p>
              {
                error ? <p>! There was an error retrieving users !</p> :
                <div className="theme list-container">
                  <form action="" >
                    <input 
                      type="text" 
                      placeholder="search for user" 
                      value={searchValue}
                      onChange={handleSearchBarChange}
                    />
                    {/* <button type="submit">submit</button> */}
                  </form>
                  <ul className={theme}>
                    {
                      filteredUsers.map((user, idx) => (
                        <li className={userListItemTheme()} key={idx}>
                          <img src={user.picture.large} alt={`${user.name.first} ${user.name.last} photo`} />
                          <h3>{`${user.name.first} ${user.name.last}`}</h3>
                          <p>{user.email}</p>
                        </li>
                      ))
                    }
                  </ul>
                </div>

              }
          </main>
        }
      </>
    </ThemeContext.Provider>
  )
}

export default App
