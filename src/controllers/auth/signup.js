import { genSaltSync, hashSync } from "bcryptjs";
import { User } from "../../models/user.model.js";
import capitalize from "../../lib/capitalize.js";


export const signup = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(409).json({
        message: "Email already in use",
        existingUserError: true,
        errorCode: 'emailInUse',
        user,
      });
      return;
    }
    const hashedPassword = hashSync(password, genSaltSync(10));

    const newUser = await User.create({ 
      ...req.body,
       password: hashedPassword ,
        })
    const { password: _, ...plainUser } = newUser.toObject()

    res.status(201).json({
      message: `Successful registration, ${capitalize(plainUser.name)}`,
      user: plainUser,
      success: true,
    });
    
  } catch (error) {
    console.log('Error in user signup', error);
    res.status(500).json({ message: 'Server error' });;
  }
}