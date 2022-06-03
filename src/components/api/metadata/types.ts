
export interface ISettingsMetadata {
  title?: string;
  siteTitle?: string;
  description?: string;
  language?: string;
  social: any;
  webmaster: { [key: string]: string };
  twitter: {
    username?: string;
    cardType?: string;
  };
}