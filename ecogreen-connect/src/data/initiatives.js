import treePlantingImage from '../assets/images/tree-planting.jpg'
import habitatRestorationImage from '../assets/images/habitat-restoration.jpg'
import communityGardeningImage from '../assets/images/community-gardening.jpg'
import seedlingImage from '../assets/images/seedling.jpg'
import insectHabitatRestorationImage from '../assets/images/insectHabitatRestoration.jpg'
import vinewallInitativeImage from '../assets/images/vinewallInitiative.jpg'
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
  {
    id: 4,
    title: 'Adopt-a-Tree',
    category: 'Urban Greening',
    location: 'Melbourne SkyFarm',
    date: '12 November 2026',
    description:
      'Actively map the health of newly planted young street trees in your neighbourhood during hot months.',
    image: seedlingImage,
    imageAlt: 'Greedling young plant on the soil with a hand pouring water over it.',
    accessibility: 'Wheelchair accessibile paths and parking available.',
    availability: 'Places available',
  },
  {
    id: 5,
    title: 'Pollinator Pathway Gardening',
    category: 'Biodiversity',
    location: 'Melbourne Zoo',
    date: '15 December 2026',
    description:
      'Plant native wildflowers, insect holes, and more to restore insect wildlife and their natural habitats.',
    image: insectHabitatRestorationImage,
    imageAlt: 'Brown, wooden indect hotel.',
    accessibility: 'Wheelchair accessibile paths and parking available.',
    availability: 'Limited',
  },
  {
    id: 6,
    title: 'Vertical Green Wall',
    category: 'Urban Greening',
    location: 'Carlton Neigbourhood Learning Center',
    date: '7 November 2026',
    description:
      'Gather with local volunteers to construct DIY trellises, set-up green walls, and plant climbing vines in community spaces.',
    image: vinewallInitativeImage,
    imageAlt: 'Man in a yellow suit driving a red tractor through a greenhouse.',
    accessibility: 'Wheelchair accessibile paths and parking available.',
    availability: 'Places available',
  },
]
