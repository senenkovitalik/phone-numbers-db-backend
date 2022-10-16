import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Sequelize,
  ForeignKey,
} from "sequelize";
import type { SubscriberType } from "./Subscriber";

export class UserType extends Model<
  InferAttributes<UserType>,
  InferCreationAttributes<UserType>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare isAdmin: boolean;
  declare suscriberId: ForeignKey<SubscriberType["id"]>;
}

export const UserFactory = (sequelize: Sequelize) => {
  return UserType.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "user",
      underscored: true,
    }
  );
};
