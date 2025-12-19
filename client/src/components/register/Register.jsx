import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext.jsx";
import useForm from "../../hooks/useForm.js";

export default function Register() {
    const navigate = useNavigate();
    const { registerHandler } = useContext(UserContext)

    const registerFormHandler = async (values) => {
        const { email, password, rePassword } = values;

        if (!email || !password ) {
            return alert('Email and password are required!')
        }

        if (password !== rePassword ) {
            return alert('Password missmatch!')
        }

        try {
            const user = await registerHandler(email, password);
            navigate('/')
        } catch (err) {
            alert(err.message);
        }
    }

    const {
        inputData,
        formAction,
    } = useForm(registerFormHandler, {
        email: '',
        password: '',
        rePassword: '',
    });
    
    return (
        <section className="register-page">
            <form action={formAction} id="registerForm">
                <div className="register-form">
                    <h1>Register</h1>
                    <label htmlFor="register-email">Email:</label>
                    <input type="email" id="register-email" {...inputData('email')}/>

                    <label htmlFor="register-password">Password</label>
                    <input type="password" id="register-password" {...inputData('password')}/>

                    <label htmlFor="re-password">Confirm Password:</label>
                    <input type="password" id="re-password" {...inputData('rePassword')}/>
                    
                    <input type="submit" className="btn-register" value="Register"/>
                </div>
            </form>
        </section>
    );
}