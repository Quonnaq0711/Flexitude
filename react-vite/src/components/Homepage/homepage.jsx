import { NavLink } from "react-router-dom";
import frontpage from "../../images/flexitude.jpg"
import "./HomePage.css";

function HomePage() {

    // const random = () => {
    //     alert('Feature Coming Soon...')
    // }

    return (
        <div className="home-page-container">
            {/* Title Section */}
            <div className="Title">
                <h1>Welcome to Flexitude</h1>
            </div>
            <div className="Links">
                <NavLink to={'/exercise/' } className='buttonlink'>
                  Exercises  
                </NavLink>
                <NavLink to={'/workout/'} className='buttonlink'>
                    Workouts
                </NavLink>
                <NavLink to={'/event/'} className='buttonlink'>
                    Events
                </NavLink>
                <NavLink to={'/workout/randomizer'} className='buttonlink'>
                    Randomizer
                </NavLink>
            </div>

            {/* About Section */}
            <div className="about">
                <p>
                    At Flexitude, we believe fitness is a journey, not a destination. Whether youre just starting out, pushing your limits, or mastering your craft, our mission is to empower people of all ages and fitness levels to live healthier, stronger, and more confident lives. 
                </p>
                <p>
                    We created Flexitude to be a space where you can find your own rhythm, build flexibility—not just in your body, but in your life. We provide a wide range of workouts ensuring that theres something for everyone.
                </p>
                <p>
                    Our approach focuses on strength, and wellness. Flexitude isnt just about getting in shape; its about creating habits that fit into your lifestyle. We know that fitness is personal, and thats why we offer customizable programs, expert coaching, and tracking tools designed to help you succeed at your own pace.
                </p>
                <p>
                    Join the Flexitude community, where your fitness goals are celebrated, and every step you take is a step toward becoming the best version of yourself. Whether youre a beginner or a pro, Flexitude is here to help you discover the strength within. Flex Your Potential.
                </p>
            </div>
            <div className="image">
                <img src={frontpage} alt="flexitude image 2" />
            </div>
        </div>
    );
}

export default HomePage;
