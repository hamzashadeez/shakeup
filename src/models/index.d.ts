import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

type UsersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EagerUsers = {
  readonly id: string;
  readonly name: string;
  readonly middle?: string | null;
  readonly last?: string | null;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly id: string;
  readonly name: string;
  readonly middle?: string | null;
  readonly last?: string | null;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users, UsersMetaData>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users, UsersMetaData>) => MutableModel<Users, UsersMetaData> | void): Users;
}