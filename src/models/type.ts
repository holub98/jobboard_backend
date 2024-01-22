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
