import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
// import useForm from "../../hooks/useForm.js";
import useForm from "../../hooks/useFormValidate.js";
import { validateUser } from "../../validators/validateUser.js";
import { useModal } from "../../context/ModalContext.jsx";

export default function Register() {
    const navigate = useNavigate();
    const {showModal} = useModal();
    const { registerHandler } = useContext(UserContext)

    const registerFormHandler = async (values) => {
        const { email, password, rePassword } = values;
        if (!email || !password ) {
            
             showModal('Email and password are required!', "error");
             return;
        }

        if (password !== rePassword ) {
             showModal('Password missmatch!', "error")
             return;
        }

        try {
            const user = await registerHandler(email, password);
            navigate('/')
        } catch (err) {
            showModal(err.message);
        }
    }

    const {
        inputData,
        formAction,
        errors,
        touched,
    } = useForm(registerFormHandler, {
        email: '',
        password: '',
        rePassword: '',
    }, validateUser);

  const inputClass = (field) =>
    `form-input ${errors[field] && touched[field] ? "input-error" : ""}`

  const errorText = (field) =>
    errors[field] && touched[field] && (
      <p className="error-text">{errors[field]}</p>
    );    
    
    return (
        <section className="register-page">
            <form action={formAction} id="registerForm">
                <div className="register-form">
                    <h1>Register</h1>
                    <label htmlFor="register-email">Email:</label>
                    <input type="email" id="register-email" {...inputData('email')} className={inputClass("email")} placeholder="name@gmail.com"/>
                    {errorText("email")}

                    <label htmlFor="register-password">Password</label>
                    <input type="password" id="register-password" {...inputData('password')} className={inputClass("password")} />
                    {errorText("password")}
                    <label htmlFor="re-password">Confirm Password:</label>
                    <input type="password" id="re-password" {...inputData('rePassword')}/>
                    
                    <input type="submit" className="btn-register" value="Register"/>
                    <p>Already in the club? Put your boots and <Link to={`/login`} ><span className="linkTo">go to play</span></Link>.</p>

                </div>
            </form>
        </section>
    );
}