import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../../types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AffectedRows = {
  __typename?: 'AffectedRows';
  affected_rows: Scalars['Int'];
};

export type Aggregate = {
  __typename?: 'Aggregate';
  aggregate: Count;
};

export type AuthData = {
  __typename?: 'AuthData';
  token: Scalars['String'];
};

export type CommunicationPhoneNumber = {
  __typename?: 'CommunicationPhoneNumber';
  communicationTypeId: Scalars['Int'];
  id: Scalars['Int'];
  locationId?: Maybe<Scalars['Int']>;
  subscriberId?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type CommunicationType = {
  __typename?: 'CommunicationType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  value: Scalars['String'];
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int'];
};

export type FilterId = {
  _eq?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
};

export type FilterInt = {
  _eq: Scalars['Int'];
};

export type FilterString = {
  _eq: Scalars['String'];
};

export type Location = {
  __typename?: 'Location';
  building?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  district?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  region?: Maybe<Scalars['String']>;
  room?: Maybe<Scalars['String']>;
  section?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  delete_communication_phone_numbers: AffectedRows;
  delete_communication_phone_numbers_by_pk: CommunicationPhoneNumber;
  delete_communication_types_by_pk: CommunicationType;
  delete_subscribers: AffectedRows;
  delete_subscribers_by_pk: Subscriber;
  insert_communication_phone_numbers_one: CommunicationPhoneNumber;
  insert_communication_types_one: CommunicationType;
  insert_subscribers_one: Subscriber;
  update_communication_phone_numbers_by_pk: CommunicationPhoneNumber;
  update_communication_types_by_pk: CommunicationType;
  update_subscribers_by_pk: Subscriber;
};


export type MutationDelete_Communication_Phone_NumbersArgs = {
  where: Communication_Phone_Numbers_Delete_Input;
};


export type MutationDelete_Communication_Phone_Numbers_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationDelete_Communication_Types_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationDelete_SubscribersArgs = {
  where: Subscribers_Delete_Input;
};


export type MutationDelete_Subscribers_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationInsert_Communication_Phone_Numbers_OneArgs = {
  data: Communication_Phone_Numbers_Update_Input;
};


export type MutationInsert_Communication_Types_OneArgs = {
  data: Communication_Types_Update_Input;
};


export type MutationInsert_Subscribers_OneArgs = {
  data?: InputMaybe<Subscribers_Update_Input>;
};


export type MutationUpdate_Communication_Phone_Numbers_By_PkArgs = {
  data: Communication_Phone_Numbers_Update_Input;
  id: Scalars['Int'];
};


export type MutationUpdate_Communication_Types_By_PkArgs = {
  data: Communication_Types_Update_Input;
  id: Scalars['Int'];
};


export type MutationUpdate_Subscribers_By_PkArgs = {
  data: Subscribers_Update_Input;
  id: Scalars['Int'];
};

export enum OrderBy {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  communication_phone_numbers: Array<Maybe<CommunicationPhoneNumber>>;
  communication_phone_numbers_aggregate: Aggregate;
  communication_phone_numbers_by_pk?: Maybe<CommunicationPhoneNumber>;
  communication_types: Array<CommunicationType>;
  communication_types_aggregate: Aggregate;
  communication_types_by_pk?: Maybe<CommunicationType>;
  locations: Array<Location>;
  locations_aggregate: Aggregate;
  locations_by_pk?: Maybe<Location>;
  login?: Maybe<AuthData>;
  subscribers: Array<Subscriber>;
  subscribers_aggregate: Aggregate;
  subscribers_by_pk?: Maybe<Subscriber>;
};


export type QueryCommunication_Phone_NumbersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Communication_Phone_Numbers_Order_By>;
  where?: InputMaybe<Communication_Phone_Numbers_Where_Exp>;
};


export type QueryCommunication_Phone_Numbers_AggregateArgs = {
  where?: InputMaybe<Communication_Phone_Numbers_Where_Exp>;
};


export type QueryCommunication_Phone_Numbers_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryCommunication_TypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Communication_Types_Order_By>;
  where?: InputMaybe<Communication_Types_Where_Exp>;
};


export type QueryCommunication_Types_AggregateArgs = {
  where?: InputMaybe<Communication_Types_Where_Exp>;
};


export type QueryCommunication_Types_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryLocationsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Locations_Order_By>;
  where?: InputMaybe<Locations_Where_Exp>;
};


export type QueryLocations_AggregateArgs = {
  where?: InputMaybe<Locations_Where_Exp>;
};


export type QueryLocations_By_PkArgs = {
  id: Scalars['Int'];
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySubscribersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Subscribers_Order_By>;
  where?: InputMaybe<Subscribers_Where_Exp>;
};


export type QuerySubscribers_AggregateArgs = {
  where?: InputMaybe<Subscribers_Where_Exp>;
};


export type QuerySubscribers_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscriber = {
  __typename?: 'Subscriber';
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
};

export type Communication_Phone_Numbers_Delete_Input = {
  ids: Array<Scalars['Int']>;
};

export type Communication_Phone_Numbers_Order_By = {
  communicationTypeId?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  locationId?: InputMaybe<OrderBy>;
  subscriberId?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

export type Communication_Phone_Numbers_Update_Input = {
  communicationTypeId: Scalars['Int'];
  locationId?: InputMaybe<Scalars['Int']>;
  subscriberId?: InputMaybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type Communication_Phone_Numbers_Where_Exp = {
  communicationTypeId?: InputMaybe<FilterInt>;
  id?: InputMaybe<FilterId>;
  locationId?: InputMaybe<FilterInt>;
  subscriberId?: InputMaybe<FilterInt>;
  value?: InputMaybe<FilterString>;
};

export type Communication_Types_Order_By = {
  description?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

export type Communication_Types_Update_Input = {
  description?: InputMaybe<Scalars['String']>;
  value: Scalars['String'];
};

export type Communication_Types_Where_Exp = {
  description?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  value?: InputMaybe<FilterString>;
};

export type Locations_Order_By = {
  building?: InputMaybe<OrderBy>;
  city?: InputMaybe<OrderBy>;
  country?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  district?: InputMaybe<OrderBy>;
  floor?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  region?: InputMaybe<OrderBy>;
  room?: InputMaybe<OrderBy>;
  section?: InputMaybe<OrderBy>;
  street?: InputMaybe<OrderBy>;
};

export type Locations_Where_Exp = {
  building?: InputMaybe<FilterString>;
  city?: InputMaybe<FilterString>;
  country?: InputMaybe<FilterString>;
  description?: InputMaybe<FilterString>;
  district?: InputMaybe<FilterString>;
  floor?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  name?: InputMaybe<FilterString>;
  region?: InputMaybe<FilterString>;
  room?: InputMaybe<FilterString>;
  section?: InputMaybe<FilterString>;
  street?: InputMaybe<FilterString>;
};

export type Subscribers_Delete_Input = {
  ids: Array<Scalars['Int']>;
};

export type Subscribers_Order_By = {
  firstName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastName?: InputMaybe<OrderBy>;
  middleName?: InputMaybe<OrderBy>;
};

export type Subscribers_Update_Input = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
};

export type Subscribers_Where_Exp = {
  firstName?: InputMaybe<FilterString>;
  id?: InputMaybe<FilterId>;
  lastName?: InputMaybe<FilterString>;
  middleName?: InputMaybe<FilterString>;
  q?: InputMaybe<FilterString>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AffectedRows: ResolverTypeWrapper<AffectedRows>;
  Aggregate: ResolverTypeWrapper<Aggregate>;
  AuthData: ResolverTypeWrapper<AuthData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CommunicationPhoneNumber: ResolverTypeWrapper<CommunicationPhoneNumber>;
  CommunicationType: ResolverTypeWrapper<CommunicationType>;
  Count: ResolverTypeWrapper<Count>;
  FilterId: FilterId;
  FilterInt: FilterInt;
  FilterString: FilterString;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Location: ResolverTypeWrapper<Location>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderBy: OrderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscriber: ResolverTypeWrapper<Subscriber>;
  communication_phone_numbers_delete_input: Communication_Phone_Numbers_Delete_Input;
  communication_phone_numbers_order_by: Communication_Phone_Numbers_Order_By;
  communication_phone_numbers_update_input: Communication_Phone_Numbers_Update_Input;
  communication_phone_numbers_where_exp: Communication_Phone_Numbers_Where_Exp;
  communication_types_order_by: Communication_Types_Order_By;
  communication_types_update_input: Communication_Types_Update_Input;
  communication_types_where_exp: Communication_Types_Where_Exp;
  locations_order_by: Locations_Order_By;
  locations_where_exp: Locations_Where_Exp;
  subscribers_delete_input: Subscribers_Delete_Input;
  subscribers_order_by: Subscribers_Order_By;
  subscribers_update_input: Subscribers_Update_Input;
  subscribers_where_exp: Subscribers_Where_Exp;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AffectedRows: AffectedRows;
  Aggregate: Aggregate;
  AuthData: AuthData;
  Boolean: Scalars['Boolean'];
  CommunicationPhoneNumber: CommunicationPhoneNumber;
  CommunicationType: CommunicationType;
  Count: Count;
  FilterId: FilterId;
  FilterInt: FilterInt;
  FilterString: FilterString;
  Int: Scalars['Int'];
  Location: Location;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscriber: Subscriber;
  communication_phone_numbers_delete_input: Communication_Phone_Numbers_Delete_Input;
  communication_phone_numbers_order_by: Communication_Phone_Numbers_Order_By;
  communication_phone_numbers_update_input: Communication_Phone_Numbers_Update_Input;
  communication_phone_numbers_where_exp: Communication_Phone_Numbers_Where_Exp;
  communication_types_order_by: Communication_Types_Order_By;
  communication_types_update_input: Communication_Types_Update_Input;
  communication_types_where_exp: Communication_Types_Where_Exp;
  locations_order_by: Locations_Order_By;
  locations_where_exp: Locations_Where_Exp;
  subscribers_delete_input: Subscribers_Delete_Input;
  subscribers_order_by: Subscribers_Order_By;
  subscribers_update_input: Subscribers_Update_Input;
  subscribers_where_exp: Subscribers_Where_Exp;
}>;

export type AffectedRowsResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AffectedRows'] = ResolversParentTypes['AffectedRows']> = ResolversObject<{
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AggregateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Aggregate'] = ResolversParentTypes['Aggregate']> = ResolversObject<{
  aggregate?: Resolver<ResolversTypes['Count'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunicationPhoneNumberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommunicationPhoneNumber'] = ResolversParentTypes['CommunicationPhoneNumber']> = ResolversObject<{
  communicationTypeId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  locationId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  subscriberId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CommunicationTypeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['CommunicationType'] = ResolversParentTypes['CommunicationType']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CountResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Count'] = ResolversParentTypes['Count']> = ResolversObject<{
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']> = ResolversObject<{
  building?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  district?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  floor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  region?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  section?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  street?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  delete_communication_phone_numbers?: Resolver<ResolversTypes['AffectedRows'], ParentType, ContextType, RequireFields<MutationDelete_Communication_Phone_NumbersArgs, 'where'>>;
  delete_communication_phone_numbers_by_pk?: Resolver<ResolversTypes['CommunicationPhoneNumber'], ParentType, ContextType, RequireFields<MutationDelete_Communication_Phone_Numbers_By_PkArgs, 'id'>>;
  delete_communication_types_by_pk?: Resolver<ResolversTypes['CommunicationType'], ParentType, ContextType, RequireFields<MutationDelete_Communication_Types_By_PkArgs, 'id'>>;
  delete_subscribers?: Resolver<ResolversTypes['AffectedRows'], ParentType, ContextType, RequireFields<MutationDelete_SubscribersArgs, 'where'>>;
  delete_subscribers_by_pk?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, RequireFields<MutationDelete_Subscribers_By_PkArgs, 'id'>>;
  insert_communication_phone_numbers_one?: Resolver<ResolversTypes['CommunicationPhoneNumber'], ParentType, ContextType, RequireFields<MutationInsert_Communication_Phone_Numbers_OneArgs, 'data'>>;
  insert_communication_types_one?: Resolver<ResolversTypes['CommunicationType'], ParentType, ContextType, RequireFields<MutationInsert_Communication_Types_OneArgs, 'data'>>;
  insert_subscribers_one?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, Partial<MutationInsert_Subscribers_OneArgs>>;
  update_communication_phone_numbers_by_pk?: Resolver<ResolversTypes['CommunicationPhoneNumber'], ParentType, ContextType, RequireFields<MutationUpdate_Communication_Phone_Numbers_By_PkArgs, 'data' | 'id'>>;
  update_communication_types_by_pk?: Resolver<ResolversTypes['CommunicationType'], ParentType, ContextType, RequireFields<MutationUpdate_Communication_Types_By_PkArgs, 'data' | 'id'>>;
  update_subscribers_by_pk?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, RequireFields<MutationUpdate_Subscribers_By_PkArgs, 'data' | 'id'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  communication_phone_numbers?: Resolver<Array<Maybe<ResolversTypes['CommunicationPhoneNumber']>>, ParentType, ContextType, Partial<QueryCommunication_Phone_NumbersArgs>>;
  communication_phone_numbers_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType, Partial<QueryCommunication_Phone_Numbers_AggregateArgs>>;
  communication_phone_numbers_by_pk?: Resolver<Maybe<ResolversTypes['CommunicationPhoneNumber']>, ParentType, ContextType, RequireFields<QueryCommunication_Phone_Numbers_By_PkArgs, 'id'>>;
  communication_types?: Resolver<Array<ResolversTypes['CommunicationType']>, ParentType, ContextType, Partial<QueryCommunication_TypesArgs>>;
  communication_types_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType, Partial<QueryCommunication_Types_AggregateArgs>>;
  communication_types_by_pk?: Resolver<Maybe<ResolversTypes['CommunicationType']>, ParentType, ContextType, RequireFields<QueryCommunication_Types_By_PkArgs, 'id'>>;
  locations?: Resolver<Array<ResolversTypes['Location']>, ParentType, ContextType, Partial<QueryLocationsArgs>>;
  locations_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType, Partial<QueryLocations_AggregateArgs>>;
  locations_by_pk?: Resolver<Maybe<ResolversTypes['Location']>, ParentType, ContextType, RequireFields<QueryLocations_By_PkArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthData']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  subscribers?: Resolver<Array<ResolversTypes['Subscriber']>, ParentType, ContextType, Partial<QuerySubscribersArgs>>;
  subscribers_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType, Partial<QuerySubscribers_AggregateArgs>>;
  subscribers_by_pk?: Resolver<Maybe<ResolversTypes['Subscriber']>, ParentType, ContextType, RequireFields<QuerySubscribers_By_PkArgs, 'id'>>;
}>;

export type SubscriberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscriber'] = ResolversParentTypes['Subscriber']> = ResolversObject<{
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AffectedRows?: AffectedRowsResolvers<ContextType>;
  Aggregate?: AggregateResolvers<ContextType>;
  AuthData?: AuthDataResolvers<ContextType>;
  CommunicationPhoneNumber?: CommunicationPhoneNumberResolvers<ContextType>;
  CommunicationType?: CommunicationTypeResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  Location?: LocationResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscriber?: SubscriberResolvers<ContextType>;
}>;

