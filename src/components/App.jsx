import React from 'react';
import ContactList from './ContactList';
import FormInput from './Form';
import './styles.css';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleInput = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value }, () => {});
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
          addContact={this.addContact}
          userName={this.state.name}
          number={this.state.number}
          contacts={this.state.contacts}
        />
        <ContactList
          filterData={this.handleFilter}
          contacts={filteredContacts}
          onDeleteItem={this.deleteItem}
          filter={this.state.filter}
        />
      </div>
    );
  }
}
