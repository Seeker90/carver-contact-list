export const initialStore=()=>{
  return{
    message: null,
    contacts: []
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
     case 'fetchedContacts':
      {
        const contactArray = action.payload;

        return {
          ...store,
          contacts:[ ...contactArray]
        }
      }
      case 'createdContact':
      {
        const newContact = action.payload;

        return {
          ...store,
          contacts:[ ...store.contacts, newContact]
        }
      }
      case 'updatedContact':
        {

        }
      case 'deletedContact':
        {
          
        }
    default:
      throw Error('Unknown action.');

  }    
}
