import type { QueryInterface } from "sequelize";

const TABLE_NAME = "user";

// find a way how to specify user type
// problem with underscored attributes
const user = {
  id: 1,
  email: "admin@phonebook.com",
  password: "$2a$10$Qns/Yv.dqjeApxD/EzIxR.cPMZYsmwRgs/u/9YWuMgB4RAEKju/VK",
  is_admin: true,
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert(TABLE_NAME, [user]);
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.bulkDelete(
      TABLE_NAME,
      [{ email: "admin@phonebook.com" }],
      {}
    );
  },
};
