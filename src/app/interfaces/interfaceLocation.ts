export interface ResponseLocation {
  Response: Response;
}

export interface Response {
  MetaInfo: MetaInfo;
  View: View[];
}

export interface View {
  _type: string;
  ViewId: number;
  Result: Result[];
}

export interface Result {
  Relevance: number;
  MatchLevel: string;
  MatchQuality: MatchQuality;
  Location: Location;
}

export interface Location {
  LocationId: string;
  LocationType: string;
  DisplayPosition: DisplayPosition;
  NavigationPosition: DisplayPosition[];
  MapView: MapView;
  Address: Address;
}

export interface Address {
  Label: string;
  Country: string;
  State?: string;
  County?: string;
  City: string;
  PostalCode?: string;
  AdditionalData: AdditionalDatum[];
}

export interface AdditionalDatum {
  value: string;
  key: string;
}

export interface MapView {
  TopLeft: DisplayPosition;
  BottomRight: DisplayPosition;
}

export interface DisplayPosition {
  Latitude: number;
  Longitude: number;
}

export interface MatchQuality {
  City: number;
}

export interface MetaInfo {
  Timestamp: string;
  NextPageInformation: string;
}