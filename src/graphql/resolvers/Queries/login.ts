import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../../../db/models/User";
import { AuthData, QueryLoginArgs } from "../../__generated/graphql";

export const login = async (
  _parent: unknown,
  { email, password }: QueryLoginArgs
): Promise<AuthData> => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User doesn't exist!");
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw new Error("Password is incorrect!");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env["JWT_PASSWORD"] as string,
    {
      expiresIn: "1h",
    }
  );

  return {
    token: token,
    expiresIn: "1h",
  };
};
