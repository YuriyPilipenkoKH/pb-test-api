import { Contact } from "../../models/contact.model.js";


export const grabContacts = async (req, res) => {
  const userId = req.user._id
  if (!userId) {
     res.status(400).json({ message: 'User ID not found' });
  }
  const query = req.query.query || ""
  let page = parseInt(req.query.page , 10) || 1
  let limit = parseInt(req.query.limit , 10) || 5

  const queryRegex = /^[a-zA-Z0-9]+$/;
  if (query && !queryRegex.test(query)) {
    res.status(400).json({
      message: "letters & digits only ",
      querytFormatError: true,
      errorCode: 'querytFormatError',
    });
    return;
  }
  const filter = query
  ? { userId,
      $or: [
        { name: { $regex: query, $options: "i" } }, 
        { number: { $regex: query, $options: "i" } } 
      ] 
    } // Search by name OR number
  : { userId }; // Fetch all contacts if no query

  if (page < 1) page = 1;
  if (limit < 1) limit = 5;

  try {
    const list = await Contact.find( filter )
    .sort({ createdAt: -1 }) // Sort by most recent first
    .skip((page - 1) * limit)
    .limit(limit);

    const totalCount = await Contact.countDocuments( filter );
    const totalPages = Math.ceil(totalCount / limit)

    res.status(200).json({
      message: "Splendid",
      list ,
      query ,
      pagination: {
        totalItems: totalCount,
        totalPages,
        currentPage: page,
        pageSize: limit,
      },
    });
  } catch (error) {
    console.log('Error in user getCurrent', error);
    res.status(500).json({ message: 'Server error' })
  }

}