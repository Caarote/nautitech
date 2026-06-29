export const settings = {
  snapScroll: true, // true = scroll ancré desktop, mobile reste en scroll naturel
  countdownVisibleDuringDev: true, // true = garde l’écran 5 visible pendant la phase de review
  showLockedNavState: true,
  formRecipient: '',
}

export const assets = {
  logo: '/assets/logos/logo.svg',
  logoNautitech: '/assets/logos/logo-nautitech.svg',
  logoQuest: '/assets/logos/logotgq.svg',
  chapterCircle: '/assets/icons/CIRCLE.svg',
}

export const header = {
  cta: 'Réservez votre essai',
  language: 'FR',
  soundOn: 'Son activé',
  soundOff: 'Son désactivé',
}


export const chapterCoordinates = [
  { x: 122, y: 73 },
  { x: 91, y: 111 },
  { x: 62, y: 153 },
  { x: 37, y: 199 },
  { x: 20, y: 250 },
  { x: 20, y: 356 },
  { x: 37, y: 407 },
  { x: 62, y: 453 },
  { x: 122, y: 535 },
]

export const chapters = [
  'Entrée',
  'Film',
  'Rencontre',
  'Étapes',
  'Compte à rebours',
  'Vidéo',
  'Dimensions',
  'Technique',
  'Footer',
]

export const sections = {
  hero: {
    id: 'hero',
    backgroundVideo: '/assets/videos/video-ecran1.mp4',
    logo: '/assets/logos/logotgq.svg',
    title: "Partez à la découverte\nd'une nouvelle espèce de catamaran.",
    description: 'Des Charentes à la Méditerranée, approchez une nouvelle façon de vivre la mer.',
    cta: 'Commencer la quête',
  },
  film: {
    id: 'film',
    video: '/assets/videos/video-ecran2.mp4',
  },
  invite: {
    id: 'invite',
    backgroundVideo: '/assets/videos/video-ecran3.mp4',
    title: 'Soyez les premiers à rencontrer une nouvelle espèce de catamaran.',
    description:
      "Dès septembre, Nautitech vous invite à des rencontres privilégiées, volontairement limitées afin de préserver le caractère unique de l'expérience.",
    cta: "S’inscrire",
  },
  countdown: {
    id: 'countdown',
    eyebrow: 'More coming soon',
    title: 'Prochaine\nÉtape',
    targetDate: '2026-09-01T10:00:00+02:00',
    cta: 'Tenez-moi au courant',
    hideWhenFinished: true,
  },
  videoReveal: {
    id: 'video-reveal',
    backgroundImage: '/assets/images/background-ecran6.png',
    video: '/assets/videos/video.mp4',
    title: 'Partez à la poursuite de votre propre quête.',
    playLabel: 'Voir la vidéo',
  },
  footer: {
    id: 'footer',
    title: 'Partagez vos moments,\nvivez Nautitech',
    primaryCta: 'Réservez votre essai',
    contactTitle: 'Une question ?',
    phoneLabel: 'Nous appeler',
    contactText: 'Lorem ipsum dolor sit amet cosecteteur dolor sit amet consectetur ipsum dolor sit am.',
    formLabel: 'Formulaire de contact',
    legalLabel: 'Mentions légales',
    hashtag: '#nautitech',
    joinLabel: 'Rejoignez-nous',
    rangeLabel: 'Découverte de la gamme',
  },
}

export const formFields = [
  { name: 'firstName', label: 'Prénom', type: 'text', required: true },
  { name: 'lastName', label: 'Nom', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
  { name: 'country', label: 'Pays', type: 'text', required: false },
  { name: 'event', label: 'Événement souhaité', type: 'text', required: false },
]
