const requestHeader = (methodType="GET", token=null, msgBody=null)=>{

    let buidHeader = {
        "Content-Type": "application/json",
    };

    if(token){
        buidHeader.Authorization = `Bearer ${token}`;
    }

    let appHeader = {
        headers: buidHeader,
        method : methodType
    }

    if(msgBody){
        appHeader.body = JSON.stringify(msgBody);
    }

    return appHeader;

}

export {requestHeader}