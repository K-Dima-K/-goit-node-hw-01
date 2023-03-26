const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const oneContact = allContacts.find((contact) => contact.id === contactId);
  return oneContact || null;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
