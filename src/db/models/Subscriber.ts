import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../index";
import { Location } from "./Location";
export class Subscriber extends Model<
  InferAttributes<Subscriber, { omit: "locations" }>,
  InferCreationAttributes<Subscriber, { omit: "locations" }>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare middleName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare locations: NonAttribute<Location[]>;

  declare static associations: {
    locations: Association<Subscriber, Location>;
  };

  static getFulltextIndexFields() {
    return ["first_name", "middle_name", "last_name"];
  }
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
