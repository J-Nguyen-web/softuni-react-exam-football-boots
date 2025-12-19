export function parseServerError(error) {
    if(error.response) {
        const { status, data } = error.response;
        
        switch (status) {
            case 400:
                return data?.message || "Invalid request, PLease check your input.";
            case :
                return
        }
    }
}