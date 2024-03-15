export type LocalizationType = {
  country: string;
  city: string;
  street: string;
  number: string;
  zipCode: string;
};

export type CompanyType = {
  _id: string;
  email: string;
  password: string;
  name: string;
  localization: LocalizationType;
  description: string;
};

export type JobOfferType = {
  _id: string;
  companyId: string;
  name: string;
  earnings: {
    from: string;
    to: string;
  };
  workDirection: string;
  requirements: string[];
  description: string;
  createAt: String;
};

export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: String;
  dateTo?: String;
};

export type EducationType = {
  schoolName: string;
  dateFrom: String;
  dateTo?: String;
  faculty: string;
};
export type LanguagesType = {
  name: string;
  level: string;
};

export type CandidateType = {
  _id: string;
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience?: ExperienceType[];
  education: EducationType[];
  languages: LanguagesType[];
  stack: string[];
  another: string;
};

export type OffersFilterType = {
  name?: string;
  requirements?: string[];
  workDirection?: string;
  localization?: string;
};
