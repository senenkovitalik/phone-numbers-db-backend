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

export type Aggregate = {
  __typename?: 'Aggregate';
  aggregate: Count;
};

export type AuthData = {
  __typename?: 'AuthData';
  token: Scalars['String'];
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

export type Mutation = {
  __typename?: 'Mutation';
  delete_subscribers: SubscriberDeleteRes;
  delete_subscribers_by_pk: Subscriber;
  insert_subscribers_one: Subscriber;
  update_subscribers_by_pk: Subscriber;
};


export type MutationDelete_SubscribersArgs = {
  where: Subscribers_Delete_Input;
};


export type MutationDelete_Subscribers_By_PkArgs = {
  id: Scalars['Int'];
};


export type MutationInsert_Subscribers_OneArgs = {
  data?: InputMaybe<Subscribers_Update_Input>;
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
  communication_types: Array<CommunicationType>;
  communication_types_aggregate: Aggregate;
  login?: Maybe<AuthData>;
  subscribers: Array<Subscriber>;
  subscribers_aggregate: Aggregate;
  subscribers_by_pk?: Maybe<Subscriber>;
};


export type QueryCommunication_TypesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Communication_Types_Order_By>>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QuerySubscribersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Subscribers_Order_By>>;
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

export type SubscriberDeleteRes = {
  __typename?: 'SubscriberDeleteRes';
  affected_rows: Scalars['Int'];
};

export type Communication_Types_Order_By = {
  firstName?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  lastName?: InputMaybe<OrderBy>;
  middleName?: InputMaybe<OrderBy>;
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
  Aggregate: ResolverTypeWrapper<Aggregate>;
  AuthData: ResolverTypeWrapper<AuthData>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CommunicationType: ResolverTypeWrapper<CommunicationType>;
  Count: ResolverTypeWrapper<Count>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderBy: OrderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscriber: ResolverTypeWrapper<Subscriber>;
  SubscriberDeleteRes: ResolverTypeWrapper<SubscriberDeleteRes>;
  communication_types_order_by: Communication_Types_Order_By;
  subscribers_delete_input: Subscribers_Delete_Input;
  subscribers_order_by: Subscribers_Order_By;
  subscribers_update_input: Subscribers_Update_Input;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Aggregate: Aggregate;
  AuthData: AuthData;
  Boolean: Scalars['Boolean'];
  CommunicationType: CommunicationType;
  Count: Count;
  Int: Scalars['Int'];
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Subscriber: Subscriber;
  SubscriberDeleteRes: SubscriberDeleteRes;
  communication_types_order_by: Communication_Types_Order_By;
  subscribers_delete_input: Subscribers_Delete_Input;
  subscribers_order_by: Subscribers_Order_By;
  subscribers_update_input: Subscribers_Update_Input;
}>;

export type AggregateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Aggregate'] = ResolversParentTypes['Aggregate']> = ResolversObject<{
  aggregate?: Resolver<ResolversTypes['Count'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthDataResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthData'] = ResolversParentTypes['AuthData']> = ResolversObject<{
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  delete_subscribers?: Resolver<ResolversTypes['SubscriberDeleteRes'], ParentType, ContextType, RequireFields<MutationDelete_SubscribersArgs, 'where'>>;
  delete_subscribers_by_pk?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, RequireFields<MutationDelete_Subscribers_By_PkArgs, 'id'>>;
  insert_subscribers_one?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, Partial<MutationInsert_Subscribers_OneArgs>>;
  update_subscribers_by_pk?: Resolver<ResolversTypes['Subscriber'], ParentType, ContextType, RequireFields<MutationUpdate_Subscribers_By_PkArgs, 'data' | 'id'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  communication_types?: Resolver<Array<ResolversTypes['CommunicationType']>, ParentType, ContextType, Partial<QueryCommunication_TypesArgs>>;
  communication_types_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType>;
  login?: Resolver<Maybe<ResolversTypes['AuthData']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  subscribers?: Resolver<Array<ResolversTypes['Subscriber']>, ParentType, ContextType, Partial<QuerySubscribersArgs>>;
  subscribers_aggregate?: Resolver<ResolversTypes['Aggregate'], ParentType, ContextType>;
  subscribers_by_pk?: Resolver<Maybe<ResolversTypes['Subscriber']>, ParentType, ContextType, RequireFields<QuerySubscribers_By_PkArgs, 'id'>>;
}>;

export type SubscriberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscriber'] = ResolversParentTypes['Subscriber']> = ResolversObject<{
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  middleName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SubscriberDeleteResResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['SubscriberDeleteRes'] = ResolversParentTypes['SubscriberDeleteRes']> = ResolversObject<{
  affected_rows?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Aggregate?: AggregateResolvers<ContextType>;
  AuthData?: AuthDataResolvers<ContextType>;
  CommunicationType?: CommunicationTypeResolvers<ContextType>;
  Count?: CountResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscriber?: SubscriberResolvers<ContextType>;
  SubscriberDeleteRes?: SubscriberDeleteResResolvers<ContextType>;
}>;

