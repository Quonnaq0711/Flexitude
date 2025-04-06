import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchExercises from "./Searchbar";

import logo from "../../images/flexitude1.jpg" 
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();
  const home = () => {
  navigate('/home')
}
  
  return (
    <>
    <nav id="navigation">
      {/* Logo Section */}
      <div id="logo">
        <NavLink to="/home" className="logo-link">
          <img src={logo} alt="Flexitude Logo" />
        </NavLink>
      </div>
      {/* Search Bar */}
      <div>
        <SearchExercises />
        </div>
        {/*Nav Buttons */}
        <div>
          <button  onClick={home}>Home</button>
          <ProfileButton />
      </div>
      </nav>
    </>
  );
}

export default Navigation;
