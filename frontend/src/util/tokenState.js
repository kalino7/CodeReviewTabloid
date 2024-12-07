import { useEffect, useState } from "react"

function useLocalStorage(defaultValue, key){
    
    const [value, setValue] = useState(()=>{
        const searchValue = localStorage.getItem(key);
        return (searchValue) ? JSON.parse(searchValue) : defaultValue;
    });

    useEffect(()=>{ 
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export {useLocalStorage}