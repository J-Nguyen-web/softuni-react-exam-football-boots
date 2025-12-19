import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm.js";
import useReq from "../../hooks/useReq.js";

export default function BootsCreate() {
    const navigate = useNavigate();
    const { request } = useReq();

    const createBootsHandler = async (values) => {
        const data = {
            ...values,
            price: Number(values.price)
        }

        
        // data.rating = Number(data.rating)

        try {
            await request('/data/boots', 'POST', data)

            navigate('/boots')
        } catch (error) {
            showModal(error.message)
        }
    }

    const {
        inputData,
        formAction,
    } = useForm(createBootsHandler, {
        title: '',
        type: '',
        price: '',
        image: '',
        description: '',
    })

    return (
        <section className="create-boots-page">
            <form action={formAction} id="create-new-boots">
                <div className="create-form">
                    
                    <h1>Create New Boots</h1>

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

                    <button type="submit" className="btn-submit" >Place it </button>
                </div>
            </form>
        </section>
    );
}