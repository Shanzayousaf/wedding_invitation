export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: 'reception' | 'barat';
  rsvpStatus: 'pending' | 'attending' | 'declined';
  plusOne: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  message?: string;
  invitedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetails {
  type: 'reception' | 'barat';
  couple: {
    bride: string;
    groom: string;
  };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  color: string;
}
export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  eventType: 'reception' | 'barat';
  rsvpStatus: 'pending' | 'attending' | 'declined';
  plusOne: boolean;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  message?: string;
  invitedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventDetails {
  type: 'reception' | 'barat';
  couple: {
    bride: string;
    groom: string;
  };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    mapUrl: string;
  };
  color: string;
}
