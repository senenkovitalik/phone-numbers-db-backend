import type { InferAttributes, QueryInterface } from "sequelize";

import { User } from "../models";
import { underscoreObjectFields } from "../utils";

const TABLE_NAME = "user";

const user: InferAttributes<User, { omit: "id" }> = {
  email: "admin@phonebook.com",
  password: "$2a$10$Qns/Yv.dqjeApxD/EzIxR.cPMZYsmwRgs/u/9YWuMgB4RAEKju/VK",
  userRoleId: 1,
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
