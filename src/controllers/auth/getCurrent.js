
export const getCurrent = async (req, res) => {
  try {
    const user = req.user
    const { password: _, ...plainUser } = user.toObject()

    res.status(200).json({
      message: "Splendid",
      user : plainUser
    });
  } catch (error) {
    console.log('Error in user getCurrent', error);
    res.status(500).json({ message: 'Server error' })
  }
}