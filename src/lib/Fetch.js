import useGlobalReducer from "../hooks/useGlobalReducer"

export const fetchAllContacts = async (dispatch) => {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver`);
    try{
        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        dispatch({
            type: 'fetchedContacts',
            payload: data.contacts,
        });
        return data;
    }
    catch(error){
        console.error("Error getting agenda. Check if URL is correct or if agenda exist.",error);
    }
}
export const addContact = async (name,address,phone,email,dispatch) => {
    const newContact = {
        name: name,
        address: address,
        email: email,
        phone: phone,
    }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newContact), 
    }
   const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts`, options);
    try{
        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        dispatch({
            type: 'createdContact',
            payload: newContact,
        });
        return data;
    }
    catch(error){
        console.error("Error creating new contact in agenda.",error);

    }
}
export const UpdatedContact = async (id, name, address, phone, email, dispatch) => {
    const updatedInfo = {
        name: name,
        address: address,
        phone: phone,
        email: email,
    }
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
    }
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts/${id}`, options);
    try{
        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        dispatch({
            type: 'UpdateContact',
            payload: data,
        });
        return data;
    }
    catch(error){
        console.error("Error updating contact in agenda.",error);

    }
}
export const DeletedContact = async (id, dispatch) => {
    const options = {
        method: "DELETE",
    }
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts/${id}`, options);
    try{
        if(!response.ok){
            throw new Error(response.status);
        }
        dispatch({
            type: 'DeletedContact',
            payload: id,
        });
        return true;
    }
    catch(error){
        console.error("Error deleting contact from agenda.",error);

    }
}