import { Guest, EventDetails } from '../types/guest';

// Mock guest data
export const mockGuests: Guest[] = [
  {
    id: 'REC001',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1234567890',
    eventType: 'reception',
    rsvpStatus: 'attending',
    plusOne: true,
    numberOfGuests: 2,
    dietaryRestrictions: 'Vegetarian',
    invitedBy: 'Emily & James',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-02-01T14:30:00Z',
  },
  {
    id: 'REC002',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1234567891',
    eventType: 'reception',
    rsvpStatus: 'pending',
    plusOne: false,
    numberOfGuests: 1,
    invitedBy: 'Emily & James',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: 'BAR001',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+1234567892',
    eventType: 'barat',
    rsvpStatus: 'attending',
    plusOne: true,
    numberOfGuests: 3,
    invitedBy: 'Aisha & Rahul',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-28T09:15:00Z',
  },
  {
    id: 'BAR002',
    name: 'Raj Patel',
    email: 'raj.patel@email.com',
    phone: '+1234567893',
    eventType: 'barat',
    rsvpStatus: 'declined',
    plusOne: false,
    numberOfGuests: 0,
    message: 'Unfortunately unable to attend due to prior commitments',
    invitedBy: 'Aisha & Rahul',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-20T16:45:00Z',
  },
  {
    id: 'REC003',
    name: 'Emma Williams',
    email: 'emma.w@email.com',
    phone: '+1234567894',
    eventType: 'reception',
    rsvpStatus: 'attending',
    plusOne: true,
    numberOfGuests: 2,
    dietaryRestrictions: 'Gluten-free',
    invitedBy: 'Emily & James',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-25T11:20:00Z',
  },
  {
    id: 'BAR003',
    name: 'Amit Kumar',
    email: 'amit.k@email.com',
    phone: '+1234567895',
    eventType: 'barat',
    rsvpStatus: 'pending',
    plusOne: true,
    numberOfGuests: 1,
    invitedBy: 'Aisha & Rahul',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
];

// Event details
export const eventDetails: Record<'reception' | 'barat', EventDetails> = {
  reception: {
    type: 'reception',
    couple: {
      bride: 'Emily Rose',
      groom: 'James Anderson',
    },
    date: 'June 15, 2025',
    time: '6:00 PM - 11:00 PM',
    venue: {
      name: 'The Grand Ballroom',
      address: '123 Elegant Avenue, Downtown District, City, State 12345',
      mapUrl: 'https://maps.google.com',
    },
    dressCode: 'Black Tie Optional',
    color: '#f9486b',
  },
  barat: {
    type: 'barat',
    couple: {
      bride: 'Aisha Malik',
      groom: 'Rahul Kapoor',
    },
    date: 'June 15, 2025',
    time: '4:00 PM - 10:00 PM',
    venue: {
      name: 'Lotus Gardens & Banquet Hall',
      address: '456 Heritage Road, Garden District, City, State 12345',
      mapUrl: 'https://maps.google.com',
    },
    dressCode: 'Traditional Indian Attire',
    color: '#d4af37',
  },
};

// Helper function to get guest by ID
export const getGuestById = (id: string): Guest | undefined => {
  return mockGuests.find(guest => guest.id.toLowerCase() === id.toLowerCase());
};

// Helper function to update guest RSVP
export const updateGuestRSVP = (id: string, updates: Partial<Guest>): Guest | undefined => {
  const guestIndex = mockGuests.findIndex(guest => guest.id.toLowerCase() === id.toLowerCase());
  if (guestIndex !== -1) {
    mockGuests[guestIndex] = {
      ...mockGuests[guestIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return mockGuests[guestIndex];
  }
  return undefined;
};
