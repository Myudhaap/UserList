import { UserList, MovieList } from "../FakeData.js";
import _ from "lodash";

export const resolvers = {
  Query: {
    // User Resolver
    users: () => UserList,
    user: (parent, args) => {
      const id = args.id;

      const user = _.find(UserList, { id: Number(id) });

      return user;
    },
    // Movie Resolver
    movies: () => MovieList,
    movie: (parent, args) => {
      const name = args.name;

      const movie = _.find(MovieList, { name });

      return movie;
    },
  },
  User: {
    favoriteMovies: () => {
      return _.filter(
        MovieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2002
      );
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList.length ? UserList[UserList.length - 1].id + 1 : 1;
      user.id = lastId;

      UserList.push(user);

      return user;
    },
    updateUser: (parent, args) => {
      const { id, ...userData } = args.input;
      let userUpdated;

      UserList.map((user, i) => {
        if (user.id == Number(id)) {
          user = {
            id: user.id,
            ...userData,
            friends: user.friends,
          };
          userUpdated = user;
        }
        UserList[i] = user;
        return user;
      });

      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const { id } = args.input;

      _.remove(UserList, (user) => user.id === Number(id));

      return null;
    },
  },
};
