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
        pin: { x: 38, y: 59 },
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
        pin: { x: 54, y: 74 },
      },
      {
        id: 'southampton',
        number: '03',
        date: '18.06.26',
        city: 'Southampton',
        place: locationText,
        status: 'soon',
        cta: 'Bientôt',
        pin: { x: 39, y: 43 },
      },
    ],
  },
  {
    id: 'usa',
    label: 'USA',
    enabled: true,
    map: '/assets/maps/carte-usa.svg',
    events: [
      { id: 'miami', number: '01', date: '18.06.26', city: 'Miami', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 78, y: 72 } },
      { id: 'san-francisco', number: '02', date: '18.06.26', city: 'San Francisco', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 16, y: 49 } },
      { id: 'washington', number: '03', date: '18.06.26', city: 'Washington', place: locationText, status: 'soon', cta: 'Bientôt', pin: { x: 76, y: 46 } },
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
