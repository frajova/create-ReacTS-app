/* eslint-disable no-unneeded-ternary  */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileType } from '../constants/views';
import { decryptLocalStorage, encryptLocalStorage } from './CipherHelper';
import { getPrecedence } from './NavigationHelper';

interface HeaderType {
  Authorization: string;
}

export interface UserAuth {
  activeProfile: string | null;
  availableProfiles: string | string [] | null;
  userId: string | null;
  signupCompleted: string | null;
}

class AuthHelper {
  public static isLoggedIn(): boolean {
    return localStorage.getItem('adm_tk') ? true : false;
  }

  public static getAdminHeaders(): HeaderType {
    const token: string | null = localStorage.getItem('adm_tk');
    return { Authorization: `Bearer ${token}` };
  }

  public static getUserAuth(): UserAuth {
    return {
      activeProfile: decryptLocalStorage('usr_active_profile'),
      availableProfiles: decryptLocalStorage('usr_available_profiles'),
      userId: decryptLocalStorage('usr_id'),
      signupCompleted: decryptLocalStorage('usr_signup'),
    };
  }

  public static setUpPersistentData(data: any): void {
    const { token, user, profiles }: any = data;

    const userProfiles: string[] = profiles?.map(
      (profile: any) => profile.securityProfile.name
    ) || [ProfileType.NOT_PROFILE];

    const invalidProfile: boolean = userProfiles.includes(ProfileType.NOT_PROFILE);
    const profileToken: string = invalidProfile ? undefined : token;
    const activeProfile: string = getPrecedence(userProfiles);

    const activeProfileIndex: number = userProfiles.indexOf(activeProfile);
    const signupCompleted: boolean = profiles[activeProfileIndex].organization?.signupCompleted || false;
    const organizationId: boolean = profiles[activeProfileIndex].organization?.id || '';

    localStorage.setItem('adm_tk', profileToken);
    encryptLocalStorage('org_id', organizationId);
    encryptLocalStorage('usr_available_profiles', JSON.stringify(profiles));
    encryptLocalStorage('usr_active_profile', activeProfile);
    encryptLocalStorage('usr_nm', `${user.firstName} ${user.lastName}`);
    encryptLocalStorage('usr_signup', signupCompleted);
    encryptLocalStorage('usr_id', user.id);
  }
}

export default AuthHelper;
