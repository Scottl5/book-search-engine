const { AuthenicationError } = require("apollo-server-express");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getSingleUser: async (parent, { _id = null, username }) => {
      if (_id) {
        return await User.findOne({ _id });
      } else {
        return await User.findOne({ username: username });
      }
    },
  },

  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenicationError(
          "There was no user found with the email provided"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenicationError("Incorrect email and/or passowrd");
      }

      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, args, context) => {
      if (context.user) {
        const addedBook = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: args.input } },
          { new: true, runValidators: true }
        );
        return addedBook;
      }
      throw new AuthenicationError("Please sign in before saving a book");
    },
    deleteBook: async (parent, { user, bookId }, context) => {
      const deletedBook = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
      return deletedBook;
    },
  },
};

module.exports = resolvers;
