import { compareSync } from "bcryptjs";
import { User } from "../../models/user.model.js";
import capitalize from "../../lib/capitalize.js";
import jwt from "jsonwebtoken"


export const login = async (req, res) => {

  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      res.status(401).json({
        message: "Invalid credentials",
        credentialsError: true,
        errorCode: 'credentialsError',
      });
      return;
    }

    const passwordCompare = compareSync(password, user.password)
    if (!passwordCompare) {
      res.status(401).json({
        message: "Invalid credentials",
        credentialsError: true,
        errorCode: 'credentialsError',
      });
      return;
    }

    const payload = {id: user._id,}
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1y" })

      const { password: _, ...plainUser } = user.toObject()

      res.status(200).json({
        message: `Welcome back, ${capitalize(plainUser.name)}`,
        success: true,
        user: plainUser,
        token,
      });
    
  } catch (error) {
    console.log('Error in user login', error);
    res.status(500).json({ message: 'Server error' })
   }
}