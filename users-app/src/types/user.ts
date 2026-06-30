export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  city: string;
}

export type UserFormValues = Omit<User, 'id'>;

export type NewUser = UserFormValues;
