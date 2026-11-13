import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../hooks/useFormValidate.js";
import { useEffect, useState } from "react";
import { validateBoots } from "../../validators/validateBoots.js";
import { useModal } from "../../context/ModalContext.jsx";
import { parseServerError } from "../../util/errorHandler.js";
import { supabase } from "../../supabaseClient.js";
import Roulette from "../Roulette.jsx";

export default function BootsEdit() {
    const [ loading, setLoading ] = useState(true);
    const {showModal} = useModal();
    const {bootsId} = useParams();
    const navigate = useNavigate();
    
    const editBootsHandler = async  (values) => {
        
        try {
            const {error} = await supabase
                .from('boots')
                .update({
                    ...values,
                    price: Number(values.price)
                })
                .eq('id', bootsId)
                .select();
                // без .eq supabase ще update всеки запис в таблицата, 
                // .eq посочва кой точно записа да се Update

                if (error) throw error;
            // await request(`/data/boots/${bootsId}`, 'PUT', {
            //     ...values,
            //     price: Number(values.price)
            // });
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
        // request(`/data/boots/${bootsId}`)
        // .then(result => {setValues(result);}
        const fetchBoots = async() => {
            try {
                const {data, error} = await supabase
                    .from('boots')
                    .select('*')
                    .eq('id', bootsId)
                    .single();
                
                if(error) throw error;
                setValues(data)
            }
            catch(err){
                showModal(parseServerError(err))
            } finally {
                setLoading(false)
            } 
        }
        fetchBoots();

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

            { loading ? (
                <Roulette />
            ) : (
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
            )}
        </section>
    );
}