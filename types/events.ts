export interface EventiniEvent {
  id: string;
  applink: string;
  eventDescription: string;
  eventlink: string;
  eventname: string;
  hostimg: string;
  providerimg: string;
}

export type EventRole = 'host' | 'provider';
