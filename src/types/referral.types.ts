export interface IDetailReferral {
  id32: string;
  customer_name: string;
  phone_number: string;
  created_at: string;
  omzet: number;
  referral_level: number;
  total_visit: number;
  status: string;
  address: string;
  is_customer: boolean;
  visits: IVisit[];
  next_visit_date: string;
  ecosystem_type: string;
  debtor_name: string;
  debtor_account_number: string;
  cif: any;
  id_card_number: any;
  bank_account_number: any;
  unit: IRefference;
  subsector: IRefference;
  sector: IRefference;
  province: IRefference;
  city: IRefference;
  district: IRefference;
  subdistrict: IRefference;
  has_action: boolean;
  refer_to: IRefer;
  refer_by: IRefer;
}

export interface IVisit {
  id32: string;
  visited_date: string;
  transaction_type: string;
  products: IRefference[];
  next_visit_date: string;
  reason: string;
  has_agreed_to_be_customer: boolean;
  customer_name: string;
  omzet: number;
  bank_account_number: any;
  acquisition_monitoring: string;
  photos: string[];
  banks: IRefference[];
  visit_wording: string;
}

export interface IRefference {
  uuid: string;
  name: string;
  code?: string;
}

export interface ILocation extends IRefference {
  postal_code?: string;
}

export interface IRefer {
  uuid: string;
  full_name: string;
  email: string;
  personal_number: string;
  is_active: boolean;
  role: IRole;
  referal_count: number;
}

export interface IRole extends IRefference {
  level: number;
}

export interface IReferral {
  id32: string;
  customer_name: string;
  phone_number: string;
  created_at: string;
  omzet: number;
  referral_level: number;
  total_visit: number;
  status: string;
  unit: IRefference;
  subsector: IRefference;
  has_action: boolean;
}

export interface IReferralCategoryTop5 {
  name: string;
  uuid: string;
  count: number;
}

export interface IAggregatorReferralByStatus {
  count: {
    pending: number;
    visited: number;
    customer: number;
  };
  omzet: {
    pending: number;
    visited: number;
    customer: number;
  };
}

export interface IAggregator {
  location_type: string;
  name: string;
  uuid: string;
  count: IAggregatorReferralByStatus;
}
