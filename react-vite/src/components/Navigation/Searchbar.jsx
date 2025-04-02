import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import {  NavLink } from "react-router-dom";  
import './Searchbar.css'; 

const SearchBar = () => {
  // State variables for search query, filters
  const [searchQuery, setSearchQuery] = useState('');
  const [musclegroup, setMusclegroup] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);

  // Controlling dropdown visibility and filters
  const [showFilters, setShowFilters] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // List of sample muscle groups for dropdown 
  const muscleGroups = ['Chest', 'Cardio', 'Butt','Legs', 'Arms', 'Shoulders', 'Abs'];

  // Refs for the dropdown and results container
  const dropdownRef = useRef(null);
  const resultsRef = useRef(null);

  // Fetch exercises whenever search query or muscle group filter changes
  useEffect(() => {
    const fetchExercises = async () => {
      if (searchQuery.trim() === '') {
        setExercises([]); // Clear exercises if search query is empty
        return;
      }

      setLoading(true);

      const params = new URLSearchParams({
        q: searchQuery,
        musclegroup: musclegroup,
      });

      try {
        const response = await fetch(`/api/search?${params.toString()}`);
        const data = await response.json();
        
        if (data.response) {
          setExercises(data.response.exercises);
        }
      } catch (error) {
        console.error('Error fetching exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [searchQuery, musclegroup]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowFilters(false);
      }
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false); // Close results if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle change in search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowResults(query.trim() !== ''); // Show results only if query is not empty
  };

  // Handle change in muscle group filter
  const handleFilterChange = (e) => {
    const musclegroup = e.target.value;
    setMusclegroup(musclegroup); 
    setShowResults(false); // Show results when filter is applied
  };

  return (
    <div className="search-container" role="search">
      <div className="search-bar">
        {/* Filter Dropdown Button */}
        <div className="filter-dropdown" ref={dropdownRef}>
          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
            aria-label="Toggle filters"
          >
            <FaBars />
          </button>
          
          {/* Search Input */}
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search exercises..."
            aria-label="Search exercises"
          />          
          </div>          
          {showFilters && (
            <div className="filters">
              <div className="filter">
                <label>Muscle Group</label>
                <select
                  type="musclegroup"
                  value={musclegroup}
                  onChange={handleFilterChange}
                  >
                  <option value="">All Muscle Groups</option>
                  {muscleGroups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="results-container" ref={resultsRef}>
          {showResults && exercises.length > 0 && (
            <ul className="results">
              {exercises.map((exercise, index) => (
                <div key={index}>
                  <NavLink
                    to={`/exercise/${exercise.id}`}  
                    className="result-link"
                    activeClassName="active-link"  
                  >
                    {exercise.name}
                  </NavLink>
                </div>
              ))}
            </ul>
          )}

          {showResults && exercises.length === 0 && (
            <p>No exercises found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;


