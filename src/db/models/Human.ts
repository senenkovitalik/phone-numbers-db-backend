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
import { Subscriber } from "./Subscriber";
export class Human extends Model<
  InferAttributes<Human, { omit: "subscriber" }>,
  InferCreationAttributes<Human, { omit: "subscriber" }>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare middleName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare subscriber: NonAttribute<Subscriber | null>;

  declare static associations: {
    subscriber: Association<Human, Subscriber>;
  };

  static getFulltextIndexFields() {
    return ["first_name", "middle_name", "last_name"];
  }
}

Human.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    middleName: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "human",
    underscored: true,
  }
);
