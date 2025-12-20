import { useNavigate, useParams } from "react-router-dom";
import useReq from "../../hooks/useReq.js";
// import useForm from "../../hooks/useForm.js";
import useForm from "../../hooks/useFormValidate.js";
import { useEffect } from "react";
import { validateBoots } from "../../validators/validateBoots.js";
import { useModal } from "../../context/ModalContext.jsx";
import { parseServerError } from "../../util/errorHandler.js";

export default function BootsEdit() {
    const {request} = useReq();
    const {showModal} = useModal();
    const {bootsId} = useParams();
    const navigate = useNavigate();
    
    const editBootsHandler = async  (values) => {
        try {
            await request(`/data/boots/${bootsId}`, 'PUT', {
                ...values,
                price: Number(values.price)
            });
            navigate(`/boots/details/${bootsId}`);
        } catch (error) {
            showModal(parseServerError(error), "error");
        }
    };

    const {
        inputData,
        formAction,
        setValues,
        errors,
        touched,
    } = useForm(editBootsHandler, {
        title: '',
        type: '',
        price: '',
        image: '',
        description: '',
    },validateBoots)

    useEffect(() => {
        request(`/data/boots/${bootsId}`)
        .then(result => {
            setValues(result);
        })
        .catch(err => {
            showModal(parseServerError(err))
        })
    },[bootsId, setValues]);

    const inputClass = (field) =>
        `form-input ${errors[field] && touched[field] ? "input-error" : ""}`

    const errorText = (field) =>
        errors[field] && touched[field] && (
            <p className="error-text">{errors[field]}</p>
        );

    return (
        <section className="edit-boots-page">
            <h1>Edit Boots</h1>
            <form action={formAction} className="edit-form">

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

                    <button type="submit" className="btn-submit" >Save Changes</button>
            </form>
        </section>
    );
}