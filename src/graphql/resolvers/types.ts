import { FindOptions } from "sequelize";
import { InputMaybe, OrderBy } from "../__generated/graphql";

// prettier-ignore
export type OptionsType = Pick<FindOptions, "limit" | "offset" | "order" | "where">;

export interface WhereOptsI {
  [key: string]: InputMaybe<{
    _eq?: InputMaybe<string | number>;
    _in?: InputMaybe<number[]>;
  }>;
}

export interface CalcOptsI {
  limit?: InputMaybe<number>;
  offset?: InputMaybe<number>;
  order_by?: InputMaybe<{
    [key: string]: InputMaybe<OrderBy>;
  }>;
  where?: InputMaybe<WhereOptsI>;
}
