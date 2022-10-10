import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";

import debugModule from "debug";
const debug = debugModule("DB:CommunicationType");

export class CommunicationType extends Model<
  InferAttributes<CommunicationType>,
  InferCreationAttributes<CommunicationType>
> {
  declare id: CreationOptional<number>;
  declare value: string;
  declare description: string | null;
  declare parentId: ForeignKey<CommunicationType["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export const CommunicationTypeFactory = (sequelize: Sequelize) => {
  debug("init CommunicationType model");

  return CommunicationType.init(
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
      parentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: CommunicationType,
          key: "id",
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      underscored: true,
    }
  );
};
