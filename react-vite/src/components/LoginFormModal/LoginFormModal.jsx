import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

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
      closeModal();
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
      <form className="form-container" onSubmit={handleSubmit}>
        <h1 className="form-header" >Log In</h1>
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
        <button  className='b1' type="submit">Log In</button>
        <button className='b1' type="submit" onClick={handleDemoLogin}>Demo Login</button>
      </form>
    </>
  );
}

export default LoginFormModal;
