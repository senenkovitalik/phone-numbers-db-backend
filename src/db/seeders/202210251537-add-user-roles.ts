import type { InferAttributes, QueryInterface } from "sequelize";
import { UserRoles } from "../../types";
import { UserRole } from "../models/UserRole";
import { underscoreObjectFields } from "../utils";

const TABLE_NAME = "user_role";

const roles: Array<InferAttributes<UserRole, { omit: "id" }>> = Object.values(
  UserRoles
).map((item) => ({
  role: item,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

const underscoredRoles = roles.map(role => underscoreObjectFields(role));

module.exports = {
  up: () => {
    return UserRole.bulkCreate(underscoredRoles);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      TABLE_NAME,
      [{ role: Object.values(UserRoles) }],
      {}
    );
  },
};
