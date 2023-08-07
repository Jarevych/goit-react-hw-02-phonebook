const ContactList = ({ contacts }) => {
  return (
    <div>
      <h2 className="contacts-title">Contacts</h2>
      <ul className="contact-list">
        {contacts.map(contact => (
          <li key={contacts.name} className="contact-item">
            <p className="contact-name">Name: {contact.name}</p>
            <p className="contact-number">Number: {contact.number}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ContactList;
