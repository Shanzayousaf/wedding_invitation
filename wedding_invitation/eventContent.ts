export type EventKey = 'reception' | 'barat';

export interface EventContent {
  key: EventKey;
  title: string;
  heroLabel: string;
  couple: {
    bride: string;
    brideParents: string;
    groom: string;
    groomParents: string;
  };
  date: string;
  time: string;
  venue: {
    name: string;
    address: string;
    mapEmbedUrl: string;
    mapUrl: string;
  };
  palette: {
    primary: string;
    accent: string;
  };
}

const MAP_EMBED_URL =
  'https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Royal%20Challet%20Lawn%20Karachi&t=&z=15&ie=UTF8&iwloc=B&output=embed';

const MAP_LINK =
  'https://www.google.com/maps/place/Royal+Challet+Lawn';

const BASE_EVENT = {
  venue: {
    name: 'Royal Challet Lawn',
    address:
      'B-172, Block-11, Gulistan-e-Johar, Near P.O.B Eye Hospital & Be Energy Pump, Karachi',
    mapEmbedUrl: MAP_EMBED_URL,
    mapUrl: MAP_LINK,
  },
};

export const eventContent: Record<EventKey, EventContent> = {
  reception: {
    key: 'reception',
    title: 'Walima Reception',
    heroLabel: 'Walima Celebration',
    couple: {
      bride: 'Muskan',
      brideParents: 'Daughter of M. Kashan',
      groom: 'Talha',
      groomParents: 'Son of Tanveer Yousaf',
    },
    date: 'January 2, 2026',
    time: '8:00 PM – 11:00 PM',
    venue: BASE_EVENT.venue,
    palette: {
      primary: '#d4af37',
      accent: '#f9e7bb',
    },
  },
  barat: {
    key: 'barat',
    title: 'Barat',
    heroLabel: 'Barat Procession',
    couple: {
      bride: 'Shanza',
      brideParents: 'Daughter of Tanveer Yousaf',
      groom: 'Yasir',
      groomParents: 'Son of Asgar',
    },
    date: 'January 2, 2026',
    time: '6:00 PM – 9:00 PM',
    venue: BASE_EVENT.venue,
    palette: {
      primary: '#f2c972',
      accent: '#f6d8a4',
    },
  },
};

export const contactNumbers = [
  { label: 'Family Desk', number: '03422161007' },
  { label: 'Event Host', number: '03462468393' },
];

export const whatsappLink = (number: string) => {
  const digits = number.replace(/[^\d]/g, '');
  const formatted = digits.startsWith('0')
    ? `92${digits.slice(1)}`
    : digits.startsWith('92')
    ? digits
    : `92${digits}`;
  return `https://wa.me/${formatted}`;
};

export const invitationCopy = {
  tagline: 'Barat & Walima celebrations dressed in charcoal and gold.',
  message:
    'Your presence will immerse both the Barat procession and the Walima reception in warmth, laughter, and heartfelt duas. Drift beneath floating florals as we honor two unions destined for grace.',
  dressCode: 'Elegant Attire · Gold Accents Appreciated',
};

