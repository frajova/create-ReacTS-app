export enum ProfileType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
  NOT_PROFILE = 'NOT_PROFILE'
};

export const profiles: string[] = [
  ProfileType.SUPER_ADMIN,
  ProfileType.USER,
];

export const outsideAppViews: string[] = [
  'register',
  'login',
  'reset',
];

export const tokenWithoutProfileViews: string[] = [
  'forbidden',
  'invitation',
  'register',
];

export const userViews: string[] = [
  'user',
];

export const adminViews: string[] = [
  'app',
  'user',
  'dashboard',
  'detail',
];

export const superAdminViews: string[] = [
  'app',
  'user',
  'dashboard',
  'detail',
];
