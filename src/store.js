export const initialStore=()=>{
  return{
    message: null,
    contacts: [
        {
            "name": "Chris",
            "phone": "123-456-7890",
            "email": "apple@gmail.com",
            "address": "123 apple dr",
            "id": 16
        },
        {
            "name": "Carver",
            "phone": "123-456-7890",
            "email": "apple@gmail.com",
            "address": "123 apple dr",
            "id": 17
        }
    ]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
    default:
      throw Error('Unknown action.');
  }    
}
