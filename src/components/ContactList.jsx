const ContactList = ({ contacts, onDeleteItem}) => {
  return (
    <div>
      <h2 className="contacts-title">Contacts</h2>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contacts.name} className="contact-item">
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
