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
      <div id="search-bar-container">
        <SearchExercises />
        </div>
        <div>
          <button className="b5" onClick={home}>Home</button>
        </div>
      {/* <div>
        <button onClick={addExercise}>Add Exercise</button>
      </div> */}
      <div>
        <ProfileButton />
      </div>
      </nav>
    </>
  );
}

export default Navigation;
