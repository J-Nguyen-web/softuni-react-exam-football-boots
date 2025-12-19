import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import useForm from "../../hooks/useForm.js";
import { useModal } from "../../context/ModalContext.jsx";

export default function Login() {

  const navigate = useNavigate();
  const {showModal} = useModal()
  const { loginHandler } = useContext(UserContext)

  const loginFormHandler = async ({ email, password }) => {
    if (!email || !password) {
      return showModal('Email and password are required!', "error")
      // TODO MODAL
    }

    try {
      await loginHandler(email, password);
      showModal('Welcome', "succes")

      navigate('/')
    } catch (error) {
      showModal(error.message, "error")
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
    <section className="login-page">
      <form action={formAction} id="login">
        <div className="login-form">
          <h1>Login</h1>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" {...inputData('email')} />
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" {...inputData('password')} />
          <input type="submit" className="btn-login" value="Login" />
        </div>
      </form>
    </section>
  );
}
