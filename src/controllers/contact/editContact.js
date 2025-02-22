import { Contact } from "../../models/contact.model.js";


export const editContact = async (req, res)  => {
  const {name, number} = req.body
  const contactId = req.params.id; 
  const requested = {name, number}
  const userId = req.user._id
  if (!userId) {
    res.status(400).json({ message: 'User ID not found' });
 }
//  console.log('requested',requested, 'contactId',contactId);
 try {
    // ✅ Validate number format
    const phoneRegex = /^0\d{9}$/; // Starts with 0, followed by 9 digits
    if (!phoneRegex.test(number)) {
      res.status(400).json({
        message: "Correct nuber format: 0985551204",
        incorrectFormat: true,
        errorCode: 'incorrectFormat',
        contact: requested
      });
      return;
    }
    // ✅ Check if the contact exists and belongs to the user
    const contact = await Contact.findOne({ _id: contactId, userId });
    if (!contact) {
      res.status(404).json({ 
        message: "Contact not found",
        notFoundError: true,
        errorCode: 'notFoundError',
        contact: requested,
        });
      return;
    }
    // ✅ Check if the new number is already used by another contact
    const existingNumber = await Contact.findOne({
       userId, 
       number, 
       _id: { $ne: contactId } 
      });
    if (existingNumber) {
      res.status(400).json({
        message: "A contact with this number already exists.",
        existingNumberError: true,
        errorCode: 'existingNumberError',
        contact: requested,
      });
      return;
    }

    // ✅ Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      { name, number },
      { new: true } // Return the updated document
    );

    res.status(201).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });
 } catch (error) {
  console.log('Error updating contact', error);
  res.status(500).json({ message: 'Server error'})
 }
}