import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../index";
export class Subscriber extends Model<
  InferAttributes<Subscriber>,
  InferCreationAttributes<Subscriber>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare middleName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Subscriber.init(
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "subscriber",
    underscored: true,
  }
);
