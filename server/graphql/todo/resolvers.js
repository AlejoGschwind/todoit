import Todo from "../../models/Todo";
import { ApolloError, AuthenticationError } from "apollo-server";

const TODOS_CHANGED = "TODOS_CHANGED";

export const todoResolver = {
  Query: {
    todos: (_, __, { req }) => {
      const query = Todo.find({ createdBy: req.userId });

      return query.exec();
    },
  },
  Mutation: {
    createTodo: async (_, args, { req }) => {
      const newTodo = new Todo({
        text: args.text,
        createdBy: req.userId,
      });
      const res = await newTodo.save();

      return {
        ...res._doc,
      };
    },

    checkTodo: async (_, { id, done }) => {
      const todo = await Todo.findOne({ _id: id });

      if (!todo)
        return new ApolloError(
          "Not found Todo with id provided.",
          "TODO_NOT_FOUND"
        );

      // pubsub.publish(TODOS_CHANGED, { todoChanged: {...res._doc} });

      const newTodo = await Todo.findOneAndUpdate(
        { _id: id },
        { done: done },
        { new: true }
      ).exec();

      return newTodo
    },

    updateTodo: async (_, { id, done, text }) => {
      const todo = await Todo.findOne({ _id: id });

      if (!todo)
        return new ApolloError(
          "Not found Todo with id provided.",
          "TODO_NOT_FOUND"
        );
      console.log(done);

      if (!done && !text) return todo;

      if (done && text) {
        console.log(done);

        return Todo.findOneAndUpdate(
          { _id: id },
          { done: done, text: text }
        ).exec();
      }

      if (done) {
        console.log(done);
        return Todo.findOneAndUpdate({ _id: id }, { done: done }).exec();
      }

      if (text) {
        console.log(done);

        return Todo.findOneAndUpdate({ _id: id }, { text: text }).exec();
      }
    },

    deleteTodo: async (_, { id }, { req }) => {
      if (!req.userId)
        throw new AuthenticationError("You are not authenticated.")

      const res = await Todo.findOneAndDelete({ _id: id });
      console.log(res)
      
      return res
    },
  },

  Subscription: {
    todosChanged: {
      subscribe(_, __, { pubsub }) {
        return pubsub.asyncIterator([TODOS_CHANGED]);
      },
    },
  },
};
