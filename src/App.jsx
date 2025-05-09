import { useState, useEffect, cache } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [loadingSpinner, setloadingSpinner] = useState(false)
  const [error, setError] = useState(false)
  const [searchValue, setSearchValue] = useState("")

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

  return (
    <>
      {
        loadingSpinner ? <p>LOADING DATA!</p> 
        : 
          <main>
            <h1>Users App</h1>
            <p>Grab random users from the RandomUsers API and filter them</p>
            {
              error ? <p>! There was an error retrieving users !</p> :
              <div className="list-container">
                <form action="" >
                  <input 
                    type="text" 
                    placeholder="search for user" 
                    value={searchValue}
                    onChange={handleSearchBarChange}
                  />
                  {/* <button type="submit">submit</button> */}
                </form>
                <ul>
                  {
                    filteredUsers.map((user, idx) => (
                      <li key={idx}>
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
  )
}

export default App
