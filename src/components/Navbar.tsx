import { AppBar, Link } from "@mui/material";

export default function Navbar() {
  return (
    <AppBar id='navbar' position='fixed'>
      <Link href='/'>Dashboard</Link>
      <Link href='/cities'>Cities</Link>
      <Link href='/forecast'>Cities</Link>
      <Link href='/settings'>Cities</Link>
    </AppBar>
  )
}