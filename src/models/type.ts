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
  localization: LocalizationType[];
  imageUrls: string[];
  workSince: Date;
};

export type JobOfferType = {
  _id: string;
  companyId: string;
  name: string;
  earnings: string[];
  remotly: string;
  requirements: string[];
  description: string;
};

export type CandidateType = {
  _id: string;
  offerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cv: string;
};

export type OfferCandidateType = {
  _id: string;
  candidateId: string;
  offerId: string;
};
