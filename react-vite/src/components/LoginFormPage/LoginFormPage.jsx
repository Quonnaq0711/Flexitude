import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal"
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const closeModal = useModal();

  if (sessionUser) return <Navigate to="/home" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/home");
    }
  };

  // Demo User credentials
  const demoUser = {
    email: "demo@aa.io",
    password: "password",
  };

  const handleDemoLogin = (e) => {
    e.preventDefault();

    // Dispatching the login action for demo user
    dispatch(thunkLogin(demoUser))
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.error("Login failed", error); // Handle error if login fails
      });
  };

  return (
    <>
      
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form className="form" onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="b4" type="submit">Log In</button>
        <button className="b4" onClick={handleDemoLogin} type="submit">Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormPage;
