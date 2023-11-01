import { Button } from '@mui/material'

export default function Logout() {

  const logout = () => {
    window.localStorage.removeItem('user-token');
  }

  return (
    <Button onClick={logout}>Logout</Button>
  )
}