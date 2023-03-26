const { program } = require("commander");

const contacts = require("./contacts");

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();
const options = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      return console.table(contactList);
    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
    case "remove":
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(options);

// invokeAction({
//   action: "add",
//   name: "Harry Kane",
//   email: "harrykane@gmail.com",
//   phone: "+380505067398",
// });

// invokeAction({ action: "list"});

// invokeAction({ action: "get", id: "1DEXoP8AuCGYc1YgoQ6hw" });

// invokeAction({ action: "remove", id: "0cLWNIbAg67nFXFAiV9WL" });
