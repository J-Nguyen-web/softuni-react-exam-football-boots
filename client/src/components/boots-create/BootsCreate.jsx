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

            navigate('/catalog')
        } catch (error) {
            alert(error.message)
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
        <section id="create-page">
            <form action={formAction} id="create-new-boots">
                <div className="container">
                    
                    <h1>Create New Boots</h1>

                    <div className="form-group">
                        <label htmlFor="title">Model:</label>
                        <input type="text" id="title" {...inputData('title')} placeholder="Name of the product.."/></div>

                    <div className="form-group">
                        <label htmlFor="type">Terrain:</label>
                        <input type="text" id="type" {...inputData('type')} placeholder="What type.."/></div>

                    <div className="form-group">
                        <label htmlFor="price">Price:</label>
                        <input type="text" id="price" {...inputData('price')} placeholder="Product price ..$"/></div>

                    <div className="form-group">
                        <label htmlFor="image">Image URL:</label>
                        <input type="text" id="image" {...inputData('image')} placeholder="Https://.."/></div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <input type="text" id="description" {...inputData('description')} placeholder="Put few words about the model.."/></div>

                    <input type="submit" className="btn submit" value="Place it" />
                </div>
            </form>
        </section>
    );
}