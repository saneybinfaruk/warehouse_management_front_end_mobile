import {gql} from '@apollo/client';

export const GET_ITEMS = gql`
  query GetInventoryItems($filter: InventoryFilterInput) {
    inventoryItems(filter: $filter) {
      id
      name
      owner
      location
      quantity
      category
      sku
      costPrice
      reorderLevel
      description
    }
  }
`;

export const GET_INVENTORY_ITEMS_CATEGORIE_INFO = gql`
  query GetInventoryItemsCategorieInfo {
    inventoryItemsCategoriesInfo {
      categoryName
      totalItems
    }
  }
`;

export const GET_ITEM = gql`
  query GetInventoryItem($id: Int!) {
    inventoryItem(id: $id) {
      id
      name
      quantity
      location
      owner
      description
      sku
      category
      barcode
      supplier
      unitOfMeasure
      weight
      dimensions
      dateReceived
      expirationDate
      lastUpdated
      status
      reorderLevel
      reorderQuantity
      availability
      costPrice
      sellingPrice
      warehouse
      handlingInstructions
    }
  }
`;

export const GET_INVENTORY_CATEGORIES = gql`
  query GetInventoryCategories {
    inventoryItemsCategories
  }
`;

export const DELETE_INVENTORY_ITEM = gql`
  mutation DeleteInventoryItem($inventoryItemId: Int!) {
    deleteInventoryItem(inventoryItemId: $inventoryItemId) {
      id
      name
      location
      quantity
      owner
    }
  }
`;

export const ADD_INVENTORY_ITEM = gql`
  mutation AddInventoryItem($addInventoryItemInput: AddInventoryItemInput!) {
    addInventoryItem(addInventoryItemInput: $addInventoryItemInput) {
      name
      owner
      location
      quantity
    }
  }
`;

export const UPDATE_INVENTORY_ITEM = gql`
  mutation UpdateInventoryItem(
    $inventoryItemId: Int!
    $updatedValue: AddInventoryItemInput!
  ) {
    updateInventoryItem(
      inventoryItemId: $inventoryItemId
      updatedValue: $updatedValue
    ) {
      name
      location
      quantity
      owner
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($createUserInput: CreateUserInput) {
    createUser(createUserInput: $createUserInput) {
      token
    }
  }
`;

export const GET_USER = gql`
  mutation GetUser($getUserInput: GetUserInput) {
    getUser(getUserInput: $getUserInput) {
      token
    }
  }
`;

