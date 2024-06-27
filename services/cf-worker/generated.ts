import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type CreateServiceInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type Enquiry = {
  __typename?: 'Enquiry';
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  json_text: Scalars['JSON']['output'];
  message?: Maybe<Scalars['String']['output']>;
  selected_services: Array<Service>;
  updated_at: Scalars['DateTime']['output'];
};

export type EnquiryConnection = {
  __typename?: 'EnquiryConnection';
  edges: Array<EnquiryEdge>;
  pageInfo: PageInfo;
};

export type EnquiryEdge = {
  __typename?: 'EnquiryEdge';
  cursor: Scalars['String']['output'];
  node: Enquiry;
};

export type Mutation = {
  __typename?: 'Mutation';
  createService: Service;
  submitEnquiry: Enquiry;
};

export type MutationCreateServiceArgs = {
  input?: InputMaybe<CreateServiceInput>;
};

export type MutationSubmitEnquiryArgs = {
  input?: InputMaybe<SubmitEnquiryInput>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  enquiries?: Maybe<EnquiryConnection>;
  services?: Maybe<ServiceConnection>;
};

export type QueryEnquiriesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  sort?: InputMaybe<Sort>;
  sort_by?: InputMaybe<Sort_By>;
};

export type QueryServicesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  ids?: InputMaybe<Array<Scalars['ID']['input']>>;
  sort?: InputMaybe<Sort>;
  sort_by?: InputMaybe<Sort_By>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC',
}

export enum Sort_By {
  CreatedAt = 'CREATED_AT',
  UpdatedAt = 'UPDATED_AT',
}

export type Service = {
  __typename?: 'Service';
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type ServiceConnection = {
  __typename?: 'ServiceConnection';
  edges: Array<ServiceEdge>;
  pageInfo: PageInfo;
};

export type ServiceEdge = {
  __typename?: 'ServiceEdge';
  cursor: Scalars['String']['output'];
  node: Service;
};

export type SubmitEnquiryInput = {
  email: Scalars['String']['input'];
  json_text: Scalars['JSON']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  selected_services: Scalars['JSON']['input'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
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
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateServiceInput: CreateServiceInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  Enquiry: ResolverTypeWrapper<Enquiry>;
  EnquiryConnection: ResolverTypeWrapper<EnquiryConnection>;
  EnquiryEdge: ResolverTypeWrapper<EnquiryEdge>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Query: ResolverTypeWrapper<{}>;
  SORT: Sort;
  SORT_BY: Sort_By;
  Service: ResolverTypeWrapper<Service>;
  ServiceConnection: ResolverTypeWrapper<ServiceConnection>;
  ServiceEdge: ResolverTypeWrapper<ServiceEdge>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubmitEnquiryInput: SubmitEnquiryInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateServiceInput: CreateServiceInput;
  DateTime: Scalars['DateTime']['output'];
  Enquiry: Enquiry;
  EnquiryConnection: EnquiryConnection;
  EnquiryEdge: EnquiryEdge;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  PageInfo: PageInfo;
  Query: {};
  Service: Service;
  ServiceConnection: ServiceConnection;
  ServiceEdge: ServiceEdge;
  String: Scalars['String']['output'];
  SubmitEnquiryInput: SubmitEnquiryInput;
};

export type OneOfDirectiveArgs = {};

export type OneOfDirectiveResolver<Result, Parent, ContextType = any, Args = OneOfDirectiveArgs> = DirectiveResolverFn<
  Result,
  Parent,
  ContextType,
  Args
>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EnquiryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Enquiry'] = ResolversParentTypes['Enquiry']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  json_text?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  selected_services?: Resolver<Array<ResolversTypes['Service']>, ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnquiryConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EnquiryConnection'] = ResolversParentTypes['EnquiryConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['EnquiryEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EnquiryEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['EnquiryEdge'] = ResolversParentTypes['EnquiryEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Enquiry'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createService?: Resolver<ResolversTypes['Service'], ParentType, ContextType, Partial<MutationCreateServiceArgs>>;
  submitEnquiry?: Resolver<ResolversTypes['Enquiry'], ParentType, ContextType, Partial<MutationSubmitEnquiryArgs>>;
};

export type PageInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  enquiries?: Resolver<
    Maybe<ResolversTypes['EnquiryConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryEnquiriesArgs, 'first' | 'sort' | 'sort_by'>
  >;
  services?: Resolver<
    Maybe<ResolversTypes['ServiceConnection']>,
    ParentType,
    ContextType,
    RequireFields<QueryServicesArgs, 'first' | 'sort' | 'sort_by'>
  >;
};

export type ServiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Service'] = ResolversParentTypes['Service']> = {
  created_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceConnectionResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ServiceConnection'] = ResolversParentTypes['ServiceConnection'],
> = {
  edges?: Resolver<Array<ResolversTypes['ServiceEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServiceEdgeResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['ServiceEdge'] = ResolversParentTypes['ServiceEdge'],
> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Service'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  DateTime?: GraphQLScalarType;
  Enquiry?: EnquiryResolvers<ContextType>;
  EnquiryConnection?: EnquiryConnectionResolvers<ContextType>;
  EnquiryEdge?: EnquiryEdgeResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Service?: ServiceResolvers<ContextType>;
  ServiceConnection?: ServiceConnectionResolvers<ContextType>;
  ServiceEdge?: ServiceEdgeResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  oneOf?: OneOfDirectiveResolver<any, any, ContextType>;
};
