export const initialStore=()=>{
  return{
    message: null,
    contacts: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'fetchedContacts':
    {
      const contactArray = action.payload;

      return {
        ...store,
        contacts: [...contactArray],
      }      
    }
    case 'createdContact':
    {
      const newContact = action.payload;

      return {
        ...store,
        contacts: [...store.contacts, newContact],
      }
    }
      case 'updatedContact':
        return {
            ...store,
            contacts: store.contacts.map(contact =>
                contact.id === parseInt(action.payload.id)
                    ? { ...contact, ...action.payload }
                    : contact
            ),
        };
      case 'deletedContact':
        {
          const deletedId = action.payload;
          const remainingContacts = store.contacts.filter(contact => contact.id !== deletedId);

          return {
            ...store,
            contacts: remainingContacts
          }
        }
    default:
      throw Error('Unknown action.');

  }    
}
