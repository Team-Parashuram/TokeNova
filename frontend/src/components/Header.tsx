import { MyComponent } from "@/web-3/MyWalletInfo"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div>
      <Link
        to="/home"
      >
        <img src="/Logo/PNG/main-logo-transparent.png" alt="logo" width={50} height={50} />
      </Link>
      <MyComponent />
    </div>
  )
}

export default Header
