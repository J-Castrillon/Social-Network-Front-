const apiUrl = import.meta.env.VITE_REACT_APP_URL; 

export const postFetching = async (complement, body) => {
    try{
        return await fetch(`${apiUrl}${complement}`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json", 
                // Authorization: ''
            },  
            body: JSON.stringify(body), 
        }).then(response => {
            if(!response)
                throw new Error("Request Error");

            return response.json(); 
        }).then(data => {
            return data
        }).catch(error => {
            console.log(error); 
        })

        console.log(request)
    }catch(error){
        console.log(error); 
    }
}

export const getFetching = async (url, Authorization) => {
    try{
        return await fetch(`${apiUrl}${url}`,{
            method: 'GET', 
            headers: {
                Authorization: Authorization !== undefined && Authorization !== null ? Authorization : '', 
            }
        }).then(response => {
            if(!response)
                throw new Error("Request Error"); 

            return response.json(); 
        }).then(data => {
            return data; 
        }).catch(error=>{
            console.log(error); 
        })
    }catch(error){
        console.log(error); 
    }

}

export const putFetching = async (url) => {
    try{
        const request = await fetch(`${apiUrl}${complement}`,{
            method: 'PUT',
            headers: {
                Authorization: ''
            },  
            body, 
        }).then(response => {
            if(!response)
                throw new Error("Request Error"); 

            return response.json(); 
        }).catch(error => {
            console.log(error); 
        })
    }catch(error){
        console.log(error); 
    }
}

export const deleteFetching = async (url) => {
    try{
        const request = await fetch(`${apiUrl}${complement}`,{
            method: 'DELETE',
            headers: {
                Authorization: ''
            }, 
        }).then(response => {
            if(!response)
                throw new Error("Request Error"); 

            return response.json(); 
        }).catch(error => {
            console.log(error); 
        })
    }catch(error){
        console.log(error); 
    }
}