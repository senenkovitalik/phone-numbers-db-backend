import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
} from "sequelize";

import debugModule from "debug";
const debug = debugModule("DB:PhoneSystemType");

export class PhoneSystemType extends Model<
  InferAttributes<PhoneSystemType>,
  InferCreationAttributes<PhoneSystemType>
> {
  declare id: CreationOptional<number>;
  declare value: string;
}

export const PhoneSystemTypeFactory = (sequelize: Sequelize) => {
  debug("init PhoneSystemType");
  return PhoneSystemType.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "phone_system_types",
    }
  );
};
