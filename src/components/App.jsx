import React from 'react';
import { nanoid } from 'nanoid';
import * as yup from 'yup';
import ContactList from './ContactList';
import './styles.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  number: yup
    .string(
      "^[a-zA-Zа-яА-ЯІіЇїҐґ' -\u0400-\u04FF]+$",
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .matches(
      '\\+?[0-9\\s\\-\\(\\)]+',
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Number is required'),
});

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  handleInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
    console.log(this.state.filter);
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
        this.setState(
          prevState => ({
            contacts: [...prevState.contacts, { id: newId, name, number }],
            name: '',
            number: '',
          }),
          () => {
            console.log(this.state.contacts);
          }
        );
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
        <form className="form-container">
          <label>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInput}
              // onBlur={this.handleBlur}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              // pattern="\+?[0-9\s\-\(\)]+"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleInput}
              // onBlur={this.handleBlur}
            />
          </label>
          <button type="submit" onClick={this.handleSubmit}>
            Додати
          </button>
          <label>
            <input
              type="search"
              name="filter"
              value={this.state.filter}
              onChange={this.handleFilter}
            />
          </label>
        </form>
        <ContactList
          contacts={filteredContacts}
          onDeleteItem={this.deleteItem}
        />
      </div>
    );
  }
}
