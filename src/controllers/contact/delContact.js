import { Contact } from "../../models/contact.model.js";



export const delContact = async (req, res) => {
  const contactId = req.params.id 
  if (!contactId) {
    res.status(400).json({ message: 'Contact ID is required' });
    return;
  }
  const userId = req.user._id
  if (!userId) {
    res.status(400).json({ message: 'User ID not found' });
 }
  try {
    const deletedContact = await Contact.findOneAndDelete({ _id: contactId, userId });

    if (!deletedContact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.status(200).json({ 
      message: 'Contact deleted successfully' ,
      contact: deletedContact,
    });
  } catch (error) {
    console.log('Error deleting contact', error);
    res.status(500).json({ message: 'Server error'})
  }
}
