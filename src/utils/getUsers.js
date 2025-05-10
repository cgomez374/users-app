async function getUsers(setloadingSpinner, setUsers, setError, error) {
  try {
    const res = await fetch("https://randomuser.me/api/?results=50");
    setloadingSpinner(true);
    if (!res.ok) {
      throw new Error(`HTTP ERROR! Status: ${res.status}`);
    }
    const data = await res.json();

    setUsers(data.results);
    setloadingSpinner(false);
    if (!error) setError(" ");
  } catch (error) {
    console.log(error);
    setError(true);
    setloadingSpinner(false);
  }
}

export default getUsers;
