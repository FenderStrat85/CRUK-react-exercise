export interface IFormValues {
  keywords: string;
  mediaType: string;
  yearStart: string;
}

export interface IApiData {
  title: string;
  center: string;
  date_created: string;
  description?: string;
  keywords: string[];
  location?: string;
  media_type: string;
  nasa_id: string;
}

export interface IApiCall {
  data: IApiData[];
  href: string;
}
