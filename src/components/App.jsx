import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [],
    name: '',
  };

  handleNameInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
    console.log(this.state.name)
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
          </label>
        </form>
      </div>
    );
  }
}
