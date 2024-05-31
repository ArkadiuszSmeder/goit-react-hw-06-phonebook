import React, { useState } from "react";
import { ContactForm } from "./components/ContactForm";
import { Filter } from "./components/Filter";
import { Contacts } from "./components/Contacts";
import { INITIAL_STATE } from "./constants/initial-form-state";
import { nanoid } from "nanoid";
import { AppContainer } from "styled/styled-appContainer"; 

function App() {
  const [userData, setUserData] = useState(INITIAL_STATE);

  const handleFormSubmit = (formData) => {
    const newContact = {
      id: nanoid(),
      name: formData.name,
      number: formData.number,
    };

    const isDuplicate = userData.contacts.some(
      (contact) => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} is already in contacts`);
    } else {
      setUserData((prev) => ({
        ...prev,
        contacts: [...prev.contacts, newContact],
      }));
    }
  };

  const handleDeleteContact = (id) => {
    setUserData((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((contact) => contact.id !== id),
    }));
  };

  const filteredContacts = userData.contacts.filter((contact) =>
    contact.name.toLowerCase().includes(userData.filter.toLowerCase())
  );

  return (
    <AppContainer>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter type="text" label="Find contacts by name" name="filter" value={userData.filter} onChange={(e) => setUserData({ ...userData, filter: e.target.value })}/>
      <Contacts contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
    </AppContainer>
  );
}

export default App;
