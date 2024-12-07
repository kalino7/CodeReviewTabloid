import { useEffect, useState } from "react"

function getValue(defaultValue, key){
    const searchValue = JSON.parse(localStorage.getItem(key));
    return (searchValue) ? searchValue : defaultValue;
}

function useLocalStorage(defaultValue, key){

    const [value, setValue] = useState(()=>{
        return getValue(defaultValue, key);
    });

    useEffect(()=>{ 
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return [value, setValue];
}

export {useLocalStorage}