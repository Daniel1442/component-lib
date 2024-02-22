
export interface ApplicationConfiguration {
  domain: string;
  brandName: string;
  author: string;
  homeUrl: string;
  defaultCurrency: string;
  currencyCode: string;
  rounding: {
    defaultRounding: number;
  };
  cdnUrl: string;
}

export interface Configuration extends ApplicationConfiguration {}
