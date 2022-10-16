import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  HasOneCreateAssociationMixin,
} from "sequelize";

import debugModule from "debug";
const debug = debugModule("DB:Subscriber");

export class SubscriberType extends Model<
  InferAttributes<SubscriberType>,
  InferCreationAttributes<SubscriberType>
> {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare middlename: string;

  declare getUser: HasOneGetAssociationMixin<SubscriberType>;
  declare setUser: HasOneSetAssociationMixin<SubscriberType, number>;
  declare createUser: HasOneCreateAssociationMixin<SubscriberType>;
}

export const SubscriberFactory = (sequelize: Sequelize) => {
  debug("init Subscriber model");

  return SubscriberType.init(
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
    },
    {
      sequelize,
      tableName: "subscriber",
    }
  );
};
