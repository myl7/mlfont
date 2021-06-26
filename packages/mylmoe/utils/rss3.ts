type RSS3ID = string;
type RSS3ItemID = string;
type RSS3ItemsID = string;
type RSS3ListID = string;
type ThirdPartyAddress = string[];

// Common attributes for each files
interface RSS3Base {
  id: RSS3ID|RSS3ItemsID|RSS3ListID;
  '@version': 'rss3.io/version/v0.1.1';
  date_created: string;
  date_updated: string;
}

// Entrance, RSS3 file
export interface RSS3 extends RSS3Base {
  id: RSS3ID;
  signature?: string;

  profile: {
    name?: string;
    avatar?: ThirdPartyAddress;
    bio?: string;
    tags?: string[];
    signature?: string;
  };

  items: RSS3Item[];
  items_next?: RSS3ItemsID;

  links?: {
    type: string;
    tags?: string[];
    list: RSS3ID[];
    signature?: string;
  }[];
  '@backlinks'?: {
    type: string;
    list: RSS3ListID;
  }[];

  assets?: {
    type: string;
    tags?: string[];
    content: string;
  }[];
}

// RSS3Items file
export interface RSS3Items extends RSS3Base {
  id: RSS3ItemsID;
  signature?: string;

  items: RSS3Item[];
  items_next?: RSS3ItemsID;
}

// RSS3List file
export interface RSS3List extends RSS3Base {
  id: RSS3ListID;

  list?: RSS3ID[]|RSS3ItemID[];
  list_next?: RSS3ListID;
}

interface RSS3Item {
  id: RSS3ItemID;
  authors?: RSS3ID[];
  title?: string;
  summary?: string;
  tags?: string[];
  date_published?: string;
  date_modified?: string;

  type?: string;
  upstream?: RSS3ItemID;

  contents?: {
    address: ThirdPartyAddress;
    mime_type: string;
    name?: string;
    tags?: string[];
    size_in_bytes?: string;
    duration_in_seconds?: string;
  }[];

  '@contexts'?: {
    type?: string;
    list?: RSS3ListID;
  }[];

  signature?: string;
}
