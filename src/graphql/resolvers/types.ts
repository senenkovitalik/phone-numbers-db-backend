import { Association, FindOptions, Model, ModelStatic } from "sequelize";
import { FilterString, InputMaybe, OrderBy } from "../__generated/graphql";

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

export interface GetSubscriberIncludeOptsI {
  args?: FilterString | null | undefined;
  ids?: number[] | undefined;
}

export type OrderItemAssociation =
  | Association
  | ModelStatic<Model>
  | { model: ModelStatic<Model>; as: string }
  | string;

export interface CalculateOptionsI {
  args: CalcOptsI_NEW;
  fulltextIndexFields?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model?: ModelStatic<any>;
}
