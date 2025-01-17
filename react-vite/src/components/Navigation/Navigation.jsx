import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import SearchExercises from "./Searchbar";

import logo from "../../images/flexitude1.jpg" 
import "./Navigation.css";

function Navigation() {
  return (
    <>
    <nav id="navigation">
      {/* Logo Section */}
      <div id="logo">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="Flexitude Logo" />
        </NavLink>
      </div>
      {/* Search Bar */}
      <div id="search-bar-container">
        <SearchExercises />
      </div>
      <div>
        <button>Add Exercise</button>
      </div>
      <div>
        <ProfileButton />
      </div>
      </nav>
    </>
  );
}

export default Navigation;
