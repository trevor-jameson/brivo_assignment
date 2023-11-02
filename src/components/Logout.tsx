import { Button } from '@mui/material'

export default function Logout() {

  const logout = () => {
    window.localStorage.removeItem('user-token');
  }

  return (
    <Button variant="outlined" color="secondary" onClick={logout}>Logout</Button>
  )
}