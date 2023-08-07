import React from 'react';
import ContactList from './ContactList';
import './styles.css';

export class App extends React.Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  handleInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.setState(
      prevState => ({
        contacts: [...prevState.contacts, { name, number }],
        name: '',
        number: '',
      }),
      () => {
        console.log(this.state.contacts);
      }
    );
  };
  handleBlur = e => {
    const { name, value } = e.currentTarget;

    if (name === 'name') {
      const namePattern = new RegExp(
        "^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
      );

      if (!namePattern.test(value)) {
        this.setState({ [name]: '' });
        alert(
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        );
      }
    } else if (name === 'number') {
      const numberPattern = new RegExp(
        "^[+]?[0-9\\.\\-\\s]{1,15}$"
        
      );

      if (!numberPattern.test(value)) {
        this.setState({ [name]: '' });
        alert(
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        );
      }
    }
  };
  render() {
    return (
      <div
        className="app-container"
        // style={{
        //   height: '100vh',
        //   display: 'flex',
        //   flexDirection: 'column',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        //   fontSize: 18,
        //   color: '#010101',
        // }}
      >
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
              onBlur={this.handleBlur}
            />
          </label>
          <label>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleInput}
              onBlur={this.handleBlur}
            />
          </label>
          <button type="submit" onClick={this.handleSubmit}>
            Додати
          </button>
        </form>
        <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}
