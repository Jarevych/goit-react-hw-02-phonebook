import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  handleNameInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, number }],
      name: '',
      number: '',
    }), () => {
      console.log(this.state.contacts);
    });
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <form>
          <label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleNameInput}
            />
            <input
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleNameInput}
            />
          </label>
          <button type="submit" onClick={this.handleSubmit}>Додати</button>
        </form>
        <h2>Contacts</h2>
        <p>Name <span>{this.state.contacts.name}</span></p>
        <p>Number <span>{this.state.contacts.number}</span></p>
      </div>
    );
  }
}
