import { useNavigate, useParams } from "react-router-dom";
import useReq from "../../hooks/useReq.js";
import useForm from "../../hooks/useForm.js";
import { useEffect } from "react";

export default function BootsEdit() {
    const {request} = useReq();
    const {bootsId} = useParams();
    const navigate = useNavigate();
    
    const editBootsHandler = async  (values) => {
        try {
            await request(`/data/boots/${bootsId}`, 'PUT', values);
            navigate(`/boots/details/${bootsId}`);
        } catch (error) {
            alert(error.message);
        }
    }

    const {
        inputData,
        formAction,
        setValues,
    } = useForm(editBootsHandler, {
        title: '',
        type: '',
        price: '',
        image: '',
        description: '',
    })

    useEffect(() => {
        request(`/data/boots/${bootsId}`)
        .then(result => {
            setValues(result);
        })
        .catch(err => {
            alert(err.message)
        })
    },[bootsId, setValues]);
    return (
        <section className="edit-boots-page">
            <h1>Edit Boots</h1>
            <form action={formAction} className="edit-form">
                        <label htmlFor="title">Model:</label>
                        <input type="text" id="title" {...inputData('title')} placeholder="Name of the product.."/>

                        <label htmlFor="type">Terrain:</label>
                        <input type="text" id="type" {...inputData('type')} placeholder="What type.."/>

                        <label htmlFor="price">Price:</label>
                        <input type="text" id="price" {...inputData('price')} placeholder="Product price ..$"/>

                        <label htmlFor="image">Image URL:</label>
                        <input type="text" id="image" {...inputData('image')} placeholder="Https://.."/>

                        <label htmlFor="description">Description:</label>
                        <textarea type="text" id="description" {...inputData('description')} placeholder="Put few words about the model.."/>

                    <button type="submit" className="btn-submit" >Save Changes</button>
            </form>
        </section>
    );
}