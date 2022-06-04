
export interface IOptions {
  link?: ILink[];
  meta?: IMeta[];
  setTitle?: boolean;
}

interface ILink {
  rel?: string;
  href?: string;
  type?: string;
  sizes?: string;
}

interface IMeta {
  name?: string;
  content?: string | number;
  property?: string;
}

export interface ISettings {
  title?: string;
  link?: ILink[];
  meta?: IMeta[];
  htmlAttributes?: {
    lang?: string;
  };
}
