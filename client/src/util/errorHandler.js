export function parseServerError(error) {
    if(error.response) {
        const { status, data } = error.response;
        
        switch (status) {
            case 400:
                return data?.message || "Invalid request, PLease check your input.";
            
            case 401:
                return "You must be logged in to perform this actions.";
            case 403:
                return "You dont got permission to perform this action.";
            case 404:
                return "Requested resource not found.";
            case 409:
                return data?.message || "Conflict occured. Try again.";
            case 500:
                return "Something went wrong on our side.PLease try again later.";
            default :
                return "An unexpected error occured. Please try again.";
        }
    }

    if (error.request) {
        return "Network error. Please check your internet connection.";
    }

    return error.message || "An unexpected error occurred.";
}