/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserData = /* GraphQL */ `
  mutation CreateUserData(
    $input: CreateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    createUserData(input: $input, condition: $condition) {
      id
      name
      username
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUserData = /* GraphQL */ `
  mutation UpdateUserData(
    $input: UpdateUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    updateUserData(input: $input, condition: $condition) {
      id
      name
      username
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUserData = /* GraphQL */ `
  mutation DeleteUserData(
    $input: DeleteUserDataInput!
    $condition: ModelUserDataConditionInput
  ) {
    deleteUserData(input: $input, condition: $condition) {
      id
      name
      username
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
