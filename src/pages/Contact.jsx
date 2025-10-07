import { fetchAllContacts } from "../lib/Fetch";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";
import useGlobalReducer from "../hooks/useGlobalReducer"


export const Contact = () => {
    const {store, dispatch} = useGlobalReducer();

    //useEffect here
    useEffect(() => {
        fetchAllContacts(dispatch)
    },[])
    return (
        <>
            <div className="container">
                {
                    !store && !store.contacts
                    ?
                    <h1>Loading...</h1>
                    :
                    store.contacts.map(contact => {
                        return (
                            <div className="card d-inline-flex flex-row" key={contact.id}>
                                <ContactCard 
                                    name={contact.name}
                                    address={contact.address}
                                    phone={contact.phone}
                                    email={contact.email}
                                />
                                <button>Edit</button>
                                <button>Del</button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}