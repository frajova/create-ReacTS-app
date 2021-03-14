/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import {
  // adminViews,
  outsideAppViews,
  ProfileType,
  profiles,
  superAdminViews,
  tokenWithoutProfileViews,
  userViews,
} from '../constants/views';

type GetOrganizationDetailUrl = (id: string) => any;
type GetPermission = (profile: string, view: string, token?: string) => boolean;
type GetPrecedence = (userProfiles?: string[]) => string;
type GetViews = (profile?: string, token?: string) => string[];

export const getOrganizationDetailUrl: GetOrganizationDetailUrl = id => ({
  pathname: `/app/dashboard/organizations/${id}`,
  search: '?tab=recipient',
});

export const getPrecedence: GetPrecedence = (userProfiles) => {
  if (userProfiles) {
    const profile: string =
      userProfiles.includes(ProfileType.SUPER_ADMIN) ? ProfileType.SUPER_ADMIN
      : userProfiles.includes(ProfileType.USER) ? ProfileType.USER
      : ProfileType.NOT_PROFILE;

    return profile;
  }

  return ProfileType.NOT_PROFILE;
};

export const getViews: GetViews = (profile, token) => {
  if (token) {
    if (!profile) return tokenWithoutProfileViews;
    if (profile && profiles.includes(profile)) {
      switch (profile) {
        case ProfileType.SUPER_ADMIN: return superAdminViews;
        case ProfileType.USER: return userViews;
      }
    }

    if (profile && !profiles.includes(profile)) return tokenWithoutProfileViews;
  }

  return outsideAppViews;
};

export const getPermission: GetPermission =
  (profile, view, token) => getViews(profile, token).includes(view);
