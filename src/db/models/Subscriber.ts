import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "../index";
import { Human } from "./Human";
import { Location } from "./Location";
export class Subscriber extends Model<
  InferAttributes<Subscriber, { omit: "human" | "locations" }>,
  InferCreationAttributes<Subscriber, { omit: "human" | "locations" }>
> {
  declare id: CreationOptional<number>;
  declare humanId: ForeignKey<Human["id"]> | null;
  declare position: string | null;
  declare description: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare human: NonAttribute<Human> | null;
  declare locations: NonAttribute<Location[]>;

  declare static associations: {
    human: Association<Subscriber, Human>;
    locations: Association<Subscriber, Location>;
  };
}

Subscriber.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    humanId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "human",
        key: "id",
      },
    },
    position: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
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
