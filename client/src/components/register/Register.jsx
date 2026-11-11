import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
// import useForm from "../../hooks/useForm.js";
import useForm from "../../hooks/useFormValidate.js";
import { validateRegister } from "../../validators/validateRegister.js";
import { useModal } from "../../context/ModalContext.jsx";

export default function Register() {
    const navigate = useNavigate();
    const {showModal} = useModal();
    const { registerHandler } = useContext(UserContext)

    const registerFormHandler = async (values) => {
        const { email, username, password, rePassword } = values;
        if (!email || !username || !password || !rePassword ) {
             showModal('All fields are required!', "error");
             return;
        }

        try {
            await registerHandler(email, username, password, rePassword);
            navigate('/')
        } catch (err) {
            showModal(err.message, 'error');
        }

        // if confirmation is ON for supabase
        // try {
        //     const result = await registerHandler(email, password)

        //     if(!result.session){
        //         showModal(
        //             'Registration succesful! Please check your email and confirm your account before logging in.'
        //         );
        //         return;
        //     }

        //     navigate('/')
        // } catch (error) {
        //     showModal(error.message, 'error')
        // }
    }

    const {
        inputData,
        formAction,
        errors,
        touched,
    } = useForm(registerFormHandler, {
        email: '',
        username: '',
        password: '',
        rePassword: '',
    }, validateRegister);

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

                    <label htmlFor="register-username">Username:</label>
                    <input type="text" id="register-username" {...inputData('username')} className={inputClass("username")} placeholder="Displayed name..."/>
                    {errorText("username")}                    

                    <label htmlFor="register-password">Password</label>
                    <input type="password" id="register-password" {...inputData('password')} className={inputClass("password")} />
                    {errorText("password")}

                    <label htmlFor="re-password">Confirm Password:</label>
                    <input type="password" id="re-password" {...inputData('rePassword')}/>
                    {errorText("rePassword")}                    
                    
                    <input type="submit" className="btn-register" value="Register"/>
                    <p>Already in the club? Put your boots and <Link to={`/login`} ><span className="linkTo">LOGIN</span></Link> to play.</p>

                </div>
            </form>
        </section>
    );
}