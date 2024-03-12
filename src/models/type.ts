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
  createAt: Date;
};

export type ExperienceType = {
  companyName: string;
  job: string;
  dateFrom: Date;
  dateTo?: Date;
};

export type EducationType = {
  schoolName: string;
  dateFrom: Date;
  dateTo?: Date;
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
