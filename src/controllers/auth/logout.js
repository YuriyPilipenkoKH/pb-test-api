import capitalize from "../../lib/capitalize";


export const logout = async (req, res) => {
    const { userName } = req.body
    try {

      res.status(200).json({ 
      message: `Goodbye, ${capitalize(userName)}` ,
      success: true,
    })
    } catch (error) {
      console.log('Error in user logout', error);
      res.status(500).json({ message: 'Server error' })
    }
  }