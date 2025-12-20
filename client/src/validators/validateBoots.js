export function validateBoots(values) {
    const errors = {}

    if(!values.title || values.title.length < 3 ) {
        errors.title = "Model must be at least 3 characters";
    }
    
    if(!values.type) {
        errors.type = "Terrain type is required information about the boots.";
    }
    
    if(!values.price || Number(values.price) <= 0) {
        errors.price = "Price must be a positive number";
    }
    
    if(!values.image || !/^https?:\/\//.test(values.image)) {
        errors.image = "Image URL is required and must start with http:// or https://";
    }
    
    if(!values.description || values.description.length < 10) {
        errors.description = "Description must be at least 10 characters";
    }
    
    return errors;
}