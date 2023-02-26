import { DataTypes, QueryInterface } from "sequelize";
import { Human } from "../models";

const TABLE_NAME = "human";

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.createTable<Human>(
        TABLE_NAME,
        {
          id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
          },
          firstName: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: "first_name",
          },
          middleName: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: "middle_name",
          },
          lastName: {
            type: DataTypes.STRING(30),
            allowNull: true,
            field: "last_name",
          },
          createdAt: {
            type: DataTypes.DATE,
            field: "created_at",
          },
          updatedAt: {
            type: DataTypes.DATE,
            field: "updated_at",
          },
        },
        { transaction: t }
      );

      await queryInterface.addIndex(
        TABLE_NAME,
        ["first_name", "middle_name", "last_name"],
        {
          name: "name_fulltext_index",
          type: "FULLTEXT",
          transaction: t,
        }
      );

      return Promise.resolve();
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable(TABLE_NAME);
  },
};
