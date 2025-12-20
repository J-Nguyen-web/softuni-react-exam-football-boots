import { useContext } from "react";
import { Link, Links, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
// import useForm from "../../hooks/useForm.js";
import useForm from "../../hooks/useFormValidate.js";
import { useModal } from "../../context/ModalContext.jsx";
import { parseServerError } from "../../util/errorHandler.js";
import { validateUser } from "../../validators/validateUser.js";

export default function Login() {

  const navigate = useNavigate();
  const { showModal } = useModal()
  const { loginHandler } = useContext(UserContext)

  const loginFormHandler = async ({ email, password }) => {
    if (email =='' || password == '') {
      return showModal('Email and password are required!', "error")
      // TODO MODAL
    }

    try {
      await loginHandler(email, password);
      showModal(`Welcome ${email}`, "succes")

      navigate('/')
    } catch (error) { // todo forbiden msg

      showModal(
        <span>Wrong email or password! <br />
          <br />
          If not registered,<br />
          please <Link to="/register">follow the link</Link>
        </span>, "error"
        )
    }
  }

  const {
    inputData,
    formAction,
    errors,
    touched,
  } = useForm(loginFormHandler, {
    email: '',
    password: '',
  }, validateUser);

  const inputClass = (field) =>
    `form-input ${errors[field] && touched[field] ? "input-error" : ""}`

  const errorText = (field) =>
    errors[field] && touched[field] && (
      <p className="error-text">{errors[field]}</p>
    );

  return (
    <section className="login-page">
      <form action={formAction} id="login">
        <div className="login-form">
          <h1>Login</h1>
          <label htmlFor="login-email">Email</label>
          <input type="email" id="login-email" {...inputData('email')} className={inputClass("email")} placeholder="name@gmail.com"/>
          {errorText("email")}
          <label htmlFor="login-password">Password</label>
          <input type="password" id="login-password" {...inputData('password')} className={inputClass("password")} />
          {errorText("password")}
          <input type="submit" className="btn-login" value="Login" />
          <p>Not part of a team? Come,  <Link to={`/register`} ><span className="linkTo">join us</span></Link>.</p>
        </div>
      </form>
    </section>
  );
}
