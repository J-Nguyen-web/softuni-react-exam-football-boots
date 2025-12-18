import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import useForm from "../../hooks/useForm.js";

export default function Login() {

  const navigate = useNavigate();
  const { loginHandler } = useContext(UserContext)

  const loginFormHandler = async ({ email, password }) => {
    if (!email || !password) {
      return alert('Email and password are required!')
      // TODO MODAL
    }

    try {
      await loginHandler(email, password)
      navigate('/')
    } catch (error) {
      alert(error.message)
    }
  }

  const {
    inputData,
    formAction
  } = useForm(loginFormHandler, {
    email: '',
    password: '',
  });

  return (
    <section id="login-page">
      <form action={formAction} id="login">
        <div className="container">
          <h1>Login</h1>
          <label htmlFor="login-email">Email</label>
          <input type="text" id="login-email" {...inputData('email')} />
          <label htmlFor="login-password">Password</label>
          <input type="text" id="login-password" {...inputData('password')} />
          <input type="submit" className="btn submit" value="Login" />
        </div>
      </form>
    </section>
  );
}
