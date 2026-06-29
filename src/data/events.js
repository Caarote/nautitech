const locationText = 'Départ Ponton Nautitech – Bateau au mouillage à Rivedoux pour nav entre les Iles Ré/Oléron/Aix'

export const eventRegions = [
  {
    id: 'europe',
    label: 'Europe',
    enabled: true,
    map: '/assets/maps/carte-europe.svg',
    events: [
      { number: '01', date: '18.06.26', city: 'La Rochelle', place: locationText, status: 'open', cta: "S'inscrire", videoLabel: 'Video' },
      { number: '02', date: '18.06.26', city: 'Golfe de Saint-Tropez', place: locationText, status: 'open', cta: "S'inscrire", videoLabel: 'Video' },
      { number: '03', date: '18.06.26', city: 'Southampton', place: locationText, status: 'soon', cta: 'Bientôt' },
    ],
  },
  {
    id: 'usa',
    label: 'USA',
    enabled: true,
    map: '/assets/maps/carte-usa.svg',
    events: [
      { number: '01', date: '18.06.26', city: 'Miami', place: locationText, status: 'soon', cta: 'Bientôt' },
      { number: '02', date: '18.06.26', city: 'San Francisco', place: locationText, status: 'soon', cta: 'Bientôt' },
      { number: '03', date: '18.06.26', city: 'Washington', place: locationText, status: 'soon', cta: 'Bientôt' },
    ],
  },
  {
    id: 'australia',
    label: 'Australie',
    enabled: false,
    map: '',
    events: [],
  },
]
