import {
  CreationOptional,
  DataTypes, InferAttributes,
  InferCreationAttributes, Model
} from "sequelize";
import { sequelize } from "../index";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
export class Subscriber extends Model<
  InferAttributes<Subscriber>,
  InferCreationAttributes<Subscriber>
> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare middlename: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Subscriber.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "first_name",
    },
    middlename: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: "middle_name",
    },
    lastname: {
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
    underscored: true
  }
);

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
