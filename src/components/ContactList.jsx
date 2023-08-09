const ContactList = ({ contacts, onDeleteItem, filter, filterData}) => {
  return (
    <div>
      <h2 className="contacts-title">Contacts</h2>
      <label>
        Filter
        <input
          type="search"
          name="filter"
          value={filter}
          onChange={filterData}
        />
      </label>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <p className="contact-name">Name: {contact.name}</p>
            <p className="contact-number">Number: {contact.number}</p>
            <button type="button" onClick={() => onDeleteItem(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
