import React from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import ContactList from './ContactList';
import FormInput from './Form';
import './styles.css';

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(
      "^[a-zA-Zа-яА-ЯІіЇїҐґ' -\u0400-\u04FF]+$",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Name is required'),
  number: yup
    .string()
    .matches(
      '\\+?[0-9\\s\\-\\(\\)]+',
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { name, number } = this.state;
    try {
      await schema.validate({ name, number }, { abortEarly: false });
      const contactExists = this.state.contacts.some(
        contact =>
          contact.name.toLowerCase().includes(name.toLowerCase()) ||
          contact.number === number
      );
      if (!contactExists) {
        const newId = nanoid();
        const newContact = { id: newId, name, number };
        this.setState(prevState => ({
          contacts: [...prevState.contacts, newContact],
          name: '',
          number: '',
        }));
      } else {
        alert(`"${name}"is already in contacts`);
      }
    } catch (errors) {
      console.log(errors);
      alert('Validation failed. Please check the form for errors.');
    }
  };

  handleFilter = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  deleteItem = itemId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== itemId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="app-container">
        <h2 className="app-title">Phonebook</h2>
        <FormInput
          inputData={this.handleInput}
          submitBtn={this.handleSubmit}
          filterData={this.handleFilter}
          userName={this.state.name}
          number={this.state.number}
          filter={this.state.filter}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
