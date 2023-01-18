import { QueryInterface } from "sequelize";

const TABLE_NAME = "subscriber";

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.addIndex(
      TABLE_NAME,
      ["first_name", "middle_name", "last_name"],
      {
        name: "name_fulltext_index",
        type: "FULLTEXT",
      }
    );
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.removeIndex(TABLE_NAME, "name_fulltext_index");
  },
};
