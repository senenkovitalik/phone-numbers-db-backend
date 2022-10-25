import type { Attributes, QueryInterface } from "sequelize";
import { underscoreObjectFields } from "../../utils";
import type { User } from "../models/User";

const TABLE_NAME = "user";

const user: Attributes<User> = {
  id: 1,
  email: "admin@phonebook.com",
  password: "$2a$10$Qns/Yv.dqjeApxD/EzIxR.cPMZYsmwRgs/u/9YWuMgB4RAEKju/VK",
  isAdmin: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const underscoredUserData = underscoreObjectFields(user);

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(TABLE_NAME, [underscoredUserData]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(TABLE_NAME, [{ email: user.email }], {});
  },
};
