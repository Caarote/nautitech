const locationText = 'Départ Ponton Nautitech – Bateau au mouillage à Rivedoux pour nav entre les Iles Ré/Oléron/Aix'
const sampleEventVideo = '/assets/videos/video.mp4'

export const eventRegions = [
  {
    id: 'europe',
    label: 'Europe',
    enabled: true,
    map: '/assets/maps/carte-europe.svg',
    events: [
      {
        id: 'la-rochelle',
        number: '01',
        date: '18.06.26',
        city: 'La Rochelle',
        place: locationText,
        status: 'open',
        cta: "S'inscrire",
        videoLabel: 'Video',
        video: sampleEventVideo,
        pin: { x: 22.5, y: 65 },
      },
      {
        id: 'saint-tropez',
        number: '02',
        date: '18.06.26',
        city: 'Golfe de Saint-Tropez',
        place: locationText,
        status: 'open',
        cta: "S'inscrire",
        videoLabel: 'Video',
        video: sampleEventVideo,
        pin: { x: 44.5, y: 74.2 },
      },
      {
        id: 'southampton',
        number: '03',
        date: '18.06.26',
        city: 'Southampton',
        place: locationText,
        status: 'soon',
        cta: 'Bientôt',
        pin: { x: 24.5, y: 48.5 },
      },
    ],
  },
  {
    id: 'usa',
    label: 'USA',
    enabled: true,
    map: '/assets/maps/carte-usa.svg',
    events: [
      { id: 'miami', number: '01', date: '18.06.26', city: 'Miami', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 72, y: 78.5 } },
      { id: 'san-francisco', number: '02', date: '18.06.26', city: 'San Francisco', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 13.2, y: 57.3 } },
      { id: 'washington', number: '03', date: '18.06.26', city: 'Washington', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 80, y: 49 } },
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
