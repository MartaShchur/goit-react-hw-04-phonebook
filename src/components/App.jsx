import { useState, useEffect} from 'react';
import { nanoid } from 'nanoid';
import { saveLocalStorage, loadLocalStorage } from './localStorage';

import { Container, Title, SubTitle, Wrapper } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';


const phoneContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

const LS_CONTACTS_KEY = 'phoneContacts';
  export const App = () => {
  const [phoneContacts, setPhoneContacts] = useState(() => {
  return loadLocalStorage(LS_CONTACTS_KEY) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    saveLocalStorage(LS_CONTACTS_KEY, phoneContacts);
  }, [phoneContacts]);
    

  const addContact = contact => {
    const isInContacts = phoneContacts.some(
      ({ name }) =>
        name.toLowerCase().trim() === contact.name.toLowerCase().trim()
    );
    
    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    setPhoneContacts(prevPhoneContacts => [
      ...prevPhoneContacts,
      { id: nanoid(), ...contact },
    ]);
  };

  const changeFilter = event => {
    setFilter(event.target.value.trim());
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return phoneContacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };


  const removeContact = contactId => {
    setPhoneContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <Container>
      <Title>Phonebook</Title>

      <ContactForm onSubmit={addContact} />

      <SubTitle>Contacts</SubTitle>
      {phoneContacts.length > 0 ? (
     
        <Filter value={filter} onChangeFilter={changeFilter} />
      ) : (
        <Wrapper>Your phonebook is empty. Add first contact!</Wrapper>
      )}
      {phoneContacts.length > 0 && (
  
        <ContactList
          contacts={visibleContacts}
          onRemoveContact={removeContact}
        />
      )}
    </Container>
  );
};