export default function UsersListItem({ idx, user, userListItemTheme }){
  return (
    <li className={userListItemTheme()} key={idx}>
      <img src={user.picture.large} alt={`${user.name.first} ${user.name.last} photo`} />
      <h3>{`${user.name.first} ${user.name.last}`}</h3>
      <p>{user.email}</p>
    </li>
  )
}