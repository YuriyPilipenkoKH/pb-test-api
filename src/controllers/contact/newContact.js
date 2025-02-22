import { Contact } from "../../models/contact.model.js";


export const newContact = async (req, res)  => {
  const {name, number} = req.body
  const requested = {name, number}
  const userId = req.user._id
  if (!userId) {
    res.status(400).json({ message: 'User ID not found' });
 }
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
    // ✅ Validate existing Number
    const existingNumber = await Contact.findOne({ userId, number });
    if (existingNumber) {
      res.status(400).json({ 
        message: "A contact with this number already exists." ,
        existingNumberError: true,
        errorCode: 'existingNumberError',
        contact: requested
  
      });
      return;
    }
    const newContact = new Contact({ userId, name, number });
    await newContact.save();
    
    res.status(201).json({
      message: "Contact added successfully",
      contact: newContact,
    });
 } catch (error) {
  console.log('Error aadding new', error);
  res.status(500).json({ message: 'Server error' })
 }
}