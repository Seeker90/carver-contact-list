export const fetchAllContacts = async (dispatch) => {
  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    dispatch({
      type: 'fetchedContacts',
      payload: data.contacts,
    });
    return data;
  } catch (error) {
    console.error("Error getting agenda. Check if URL is correct or if agenda exists.", error);
    return null;
  }
};

export const addContact = async (name, address, phone, email, dispatch) => {
  const newContact = {
    name,
    address,
    email,
    phone,
  };

  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newContact),
  };

  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    dispatch({
      type: 'createdContact',
      payload: data,
    });
    return data;
  } catch (error) {
    console.error("Error creating new contact in agenda.", error);
    return null;
  }
};

export const updateContact = async (id, name, address, phone, email, dispatch) => {
  const updatedInfo = {
    name,
    address,
    phone,
    email,
  };

  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedInfo),
  };

  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts/${id}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    dispatch({
      type: 'updatedContact',
      payload: { id, ...updatedInfo },
    });
    return data;
  } catch (error) {
    console.error("Error updating contact in agenda.", error);
    return null;
  }
};

export const deleteContact = async (id, dispatch) => {
  const options = {
    method: "DELETE",
  };

  try {
    const response = await fetch(`https://playground.4geeks.com/contact/agendas/ccarver/contacts/${id}`, options);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    dispatch({
      type: 'deletedContact',
      payload: id,
    });
    return true;
  } catch (error) {
    console.error("Error deleting contact from agenda.", error);
    return false;
  }
};