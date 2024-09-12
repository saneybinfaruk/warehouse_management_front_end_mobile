import {
  InventoryItemField,
  LoginFormField,
  RegisterFormField,
} from '../zod/schemas';

export type HomeStackParams = {
  Dashboard: undefined;
  Home: undefined;
  Details: {id: number};
  AddItem: {id?: number};
  EditItem: {id: number};
  Settings: undefined;
  Filter: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  location: string;
  owner: string;
  description?: string;
  sku?: string;
  category?: string;
  barcode?: string;
  supplier?: string;
  unitOfMeasure?: string;
  weight?: string;
  dimensions?: string;
  dateReceived?: string;
  expirationDate?: string;
  lastUpdated?: string;
  status?: string;
  reorderLevel?: number;
  reorderQuantity?: number;
  availability?: string;
  costPrice?: number;
  sellingPrice?: number;
  batchNumber?: string;
  serialNumber?: string;
  warehouse?: string;
  condition?: string;
  pickZone?: string;
  returnStatus?: string;
  handlingInstructions?: string;
}

export interface AddInventoryInput {
  name: string;
  quantity: number;
  location: string;
  owner: string;
}

export interface GetInventoryItems {
  inventoryItems: InventoryItem[];
}

export interface GetInventoryItem {
  inventoryItem: InventoryItem;
}

export interface AddInventoryItemVars {
  addInventoryItemInput: AddInventoryInput;
}

export interface AddInventoryItemData {
  addInventoryItem: InventoryItem;
}

export interface UpdateInventoryItemVars {
  inventoryItemId: number;
  updatedValue: InventoryItemField;
}

export interface UpdatedInventoryItemData {
  updateInventoryItem: InventoryItem;
}

export interface DeleteInventoryItem {
  inventoryItemId: number;
}

export interface DeletedInventoryItemData {
  deleteInventoryItem: InventoryItem;
}

interface Info {
  categoryName: string;
  totalItems: number;
}
export interface InventoryItemsCategorieInfo {
  inventoryItemsCategoriesInfo: Info[];
}

export interface GetInventoryItemsCategorie {
  inventoryItemsCategories: string[];
}

export interface InventoryFilterInput {
  category: string[];
  quantityMin: number;
  quantityMax: number;
}
export type User = {
  fullname: String;
  email: String;
  role: Role;
};
export enum Role {
  STAFF = 'STAFF',
  MANAGER = 'MANAGER',
}

export interface CreateUserVars {
  createUserInput: RegisterFormField;
}

export interface GetUserVars {
  getUserInput: LoginFormField;
}
export type Token = {
  createUser: {
    token: string;
  };
};

export type GetToken = {
  getUser: {
    token: string;
  };
};
