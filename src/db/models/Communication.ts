import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model
} from "sequelize";

import { sequelize } from "../index";

export class Communication extends Model<
  InferAttributes<Communication>,
  InferCreationAttributes<Communication>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare description: string | null;
  declare parentId: ForeignKey<Communication["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Communication.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
  }
);
