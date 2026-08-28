import treesImage from '../assets/images/trees.jpg'
import urbanImage from '../assets/images/urban.jpg'
import birdsImage from '../assets/images/birds.jpg'
export const facts = [
  {
    id: 1,
    number: '80,000+',
    image: treesImage,
    imageAlt: 'A dozen trees.',
    title: 'Trees across Melbourne',
    description:
      'The City of Melbourne maintains mor than 80,000 trees throughout the municipality.',
    sourceName: 'City of Melbourne Open Data',
    sourceURL:
      'https://data.melbourne.vic.gov.au/explore/dataset/trees-with-species-and-dimensions-urban-forest/map/?location=13',
  },
  {
    id: 2,
    number: '1.5°C',
    image: urbanImage,
    imageAlt: 'People walking down a footpath surrounded by trees',
    title: 'Cooler streets',
    description: 'Research shows that urban trees can reduce street temperatures by 1.5°C.',
    sourceName: 'City of Melbourne',
    sourceURL: 'https://participate.melbourne.vic.gov.au/urban-forest/project-overview',
  },
  {
    id: 3,
    number: '239',
    image: birdsImage,
    imageAlt: 'A flock of birds with one white bird in the middle.',
    title: 'Native bird species',
    description: 'The City of Melbourne provides habitat for over 239 different species of birds.',
    sourceName: 'City of Melbourne',
    sourceURL: 'https://participate.melbourne.vic.gov.au/urban-forest/project-overview',
  },
]
