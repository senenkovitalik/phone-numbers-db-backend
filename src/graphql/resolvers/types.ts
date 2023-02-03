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

export interface CalcOptsI_NEW {
  limit?: InputMaybe<number>;
  offset?: InputMaybe<number>;
  order_by?: InputMaybe<{
    field: string;
    order: OrderBy;
  }>;
  where?: InputMaybe<WhereOptsI>;
}

export interface FullSearchIds {
  phoneNumbersIds: number[];
  communicationTypeIds: number[];
  locationIds: number[];
  subscriberIds: number[];
}
