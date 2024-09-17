export interface LoginCredentials {
  email?: string;
  phone?: string;
}

export interface RegisterCredentials {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
}

export interface UserDetails {
  id: number;
  firstname: string;
  phone: string;
  lastname: string;
  email: string;
  country?: string;
  city?: string;
  street?: string;
  dob?: string;
  savedProperties: [];
  profileImage?: string;
  host?: {
    id: number;
    created_at: string;
    work: string;
    school: string;
    pets: string;
    about: string;
    phone: string;
    address: string;
    dob: string;
    hobby: string;
    languages: string;
    license: string;
    socials: {
      facebook: string;
      instagram: string;
      linkedIn: string;
      twitter: string;
      whatsApp: string;
      website: string;
    };
    experience: string;
    rate: {
      rent: string;
      sale: string;
    };
    phone_verified: boolean;
    email_verified: boolean;
    company: string;
    identity_verified: boolean;
    website: string;
  };
}

export interface Verify {
  code: string;
  verification_id?: string | string[];
}

export interface ResetPasswordInputs {
  key?: string | string[];
  password: string;
  code: string;
  confirmPassword?: string;
}
