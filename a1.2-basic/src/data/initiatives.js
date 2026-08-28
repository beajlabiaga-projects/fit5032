import treePlantingImage from '../assets/images/tree-planting.jpg'
import habitatRestorationImage from '../assets/images/habitat-restoration.jpg'
import communityGardeningImage from '../assets/images/community-gardening.jpg'
// sample initiative data for generating the cards on Discover page//
export const initiatives = [
  {
    id: 1,
    title: 'Community Tree Planting',
    category: 'Tree Planting',
    location: 'Carlton Gardens',
    date: '12 September 2026',
    description: 'Help plant native trees and improve habitat for local wildlife.',
    image: treePlantingImage,
    imageAlt: 'Volunteers planting trees in a community garden.',
    accessibility: 'Some uneven ground. Assistance available on site.',
    availability: 'Places available',
  },
  {
    id: 2,
    title: 'Native Habitat Restoration',
    category: 'Biodiversity',
    location: 'Merri Creek',
    date: '19 September 2026',
    description: 'Join local volunteers to remove weeds and restore native habitats.',
    image: habitatRestorationImage,
    imageAlt: 'Natural habitat surrounding a creek.',
    accessibility: 'Uneven terrain. Please contact organiser for assistance.',
    availability: 'Limited places',
  },
  {
    id: 3,
    title: 'Urban Garden Working Bee',
    category: 'Urban Greening',
    location: 'Fitzroy Community Garden',
    date: '26 September 2026',
    description: 'Assist with planting, mulching and maintaining community garden.',
    image: communityGardeningImage,
    imageAlt: 'People working together in a community garden.',
    accessibility: 'Wheelchair accessibile paths and parking available.',
    availability: 'Places available',
  },
]
