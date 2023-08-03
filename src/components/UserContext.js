
import { createContext, useEffect, useState } from 'react';

const UserContext = createContext();

export function UserProvider({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
       const fetchData = async () => {
        await getUser();
       }
       fetchData()
      }, [])

    const getUser = async () => {
      await fetch('http://localhost:3000/me')
      .then((r) => {
        if (r.ok) {
          r.json().then((data) => {
        setUser({
          "id": data.id, 
          "username": data.username,
          "first_name": data.first_name,
          "last_name": data.last_name,
          "memberships": data.memberships,
          "is_admin": data.is_admin,
          "bookclubs": data.bookclubs,
          "profile_pic": data.profile_pic
        })
      })} else {
        setUser(null);
      }}
    )};

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
