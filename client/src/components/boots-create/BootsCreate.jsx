import { useNavigate } from "react-router-dom";
// import useForm from "../../hooks/useForm.js";
import useForm from "../../hooks/useFormValidate.js";
import useReq from "../../hooks/useReq.js";
import { parseServerError } from "../../util/errorHandler.js";
import { useModal } from "../../context/ModalContext.jsx";
import { validateBoots } from "../../validators/validateBoots.js";

export default function BootsCreate() {
    const navigate = useNavigate();
    const {showModal} = useModal()
    const { request } = useReq();

    const createBootsHandler = async (values) => {

        // data.rating = Number(data.rating) // todo rating

        try {
            await request('/data/boots', 'POST', {
                ...values,
                price: Number(values.price)
        });
            showModal("Football boots created succesfully! ", "info")
            navigate('/boots')
        } catch (error) {
            showModal(parseServerError(error), "error")
        }
    }

    const {
        inputData,
        formAction,
        errors,
        touched,
    } = useForm(createBootsHandler, {
        title: '',
        type: '',
        price: '',
        image: '',
        description: '',
    },validateBoots);

    const inputClass = (field) =>
        `form-input ${errors[field] && touched[field] ? "input-error" : ""}`

    const errorText = (field) =>
        errors[field] && touched[field] && (
            <p className="error-text">{errors[field]}</p>
        );

    return (
        <section className="create-boots-page">
            <form action={formAction} id="create-new-boots">
                <div className="create-form">

                    <h1>Create New Boots</h1>

                    <label htmlFor="title">Model:</label>
                    <input type="text" id="title" {...inputData('title')} className={inputClass("title")} />
                    {errorText("title")}

                    <label htmlFor="type">Terrain:</label>
                    <input type="text" id="type" {...inputData('type')} className={inputClass("type")} />
                   {errorText("type")}

                    <label htmlFor="price">Price:</label>
                    <input type="number" step="0.01" id="price" {...inputData('price')} className={inputClass("price")} />
                   {errorText("price")}

                    <label htmlFor="image">Image URL:</label>
                    <input type="url" id="image" {...inputData('image')} className={inputClass("image")} />
                   {errorText("image")}

                    <label htmlFor="description">Description:</label>
                    <textarea type="text" id="description" {...inputData('description')} className={inputClass("description")} />
                   {errorText("description")}

                    <button type="submit" className="btn-submit" >Place it </button>
                </div>
            </form>
        </section>
    );
}