import { ApolloError } from "apollo-server-core";
import { hash, compare } from "bcryptjs";
import { issueToken, serializeUser } from "../../functions";

export default {
  Query: {
    getAllUser: async (_, {}, { User }) => {
      const allUser = await User.find();
      return allUser;
    },
    authenticateUser: async (_, { email, password }, { User }) => {
      try {
        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
          throw new Error("Cet email n'existe pas !");
        }

        // Check for the password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
          throw new Error("Mot de passe incorrect");
        }

        // Serialize User
        user = user.toObject();
        user.id = user._id;
        user = serializeUser(user);

        // Issues New Auth Token
        const token = await issueToken(user);
        return {
          token,
          user,
        };
      } catch (err) {
        throw new ApolloError(err, 403);
      }
    },
  },
  Mutation: {
    registerUser: async (_, { newUser }, { User }) => {
      const { email } = newUser;
      try {
        // Check if email is already taken
        const emailTested = await User.findOne({ email });
        if (emailTested) {
          throw new Error("Cet email est déjà utilisé");
        }
        // Create new user instance
        const user = new User(newUser);
        // Hash password
        user.password = await hash(newUser.password, 10);
        // Save User to the URI
        let result = await user.save();
        result = result.toObject();
        result.id = result._id;
        result = serializeUser(result);
        // Issue the Authentification Token
        const token = await issueToken(result);
        return {
          token,
          user: result,
        };
      } catch (err) {
        throw new ApolloError(err.message, 400);
      }
    },
    editUserById: async (_, { updateUser, id }, { User }) => {
      const editedUser = await User.findByIdAndUpdate(
        id,
        { ...updateUser },
        { new: true }
      );
      return editedUser;
    },
    deleteUserById: async (_, { id }, { User }) => {
      const deletedUser = await User.findByIdAndDelete(id);
      return {
        id: deletedUser.id,
        message: `L'utilisateur - ${deletedUser.firstName} ${deletedUser.lastName} -  est supprimé`,
        success: true,
      };
    },
  },
};
