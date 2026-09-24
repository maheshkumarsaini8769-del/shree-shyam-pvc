import heroImg from '../assets/interior/hero.jpg';
import kitchenImg from '../assets/interior/kitchen.jpg';
import kitchen2Img from '../assets/interior/kitchen2.jpg';
import kitchen3Img from '../assets/interior/kitchen3.jpg';
import kitchen4Img from '../assets/interior/kitchen4.jpg';
import wardrobeImg from '../assets/interior/wardrobe.jpg';
import doorsImg from '../assets/interior/doors.jpg';
import wallPanelsImg from '../assets/interior/wall-panels.jpg';
import tvUnitImg from '../assets/interior/tv-unit.jpg';
import officeImg from '../assets/interior/office.jpg';

import avatar1 from '../assets/interior/avatar1.jpg';
import avatar2 from '../assets/interior/avatar2.jpg';
import avatar3 from '../assets/interior/avatar3.jpg';

export const images = {
  hero: heroImg,
  kitchen: kitchenImg,
  kitchen2: kitchen2Img,
  kitchen3: kitchen3Img,
  kitchen4: kitchen4Img,
  wardrobe: wardrobeImg,
  doors: doorsImg,
  wallPanels: wallPanelsImg,
  tvUnit: tvUnitImg,
  office: officeImg,
  avatar1,
  avatar2,
  avatar3,
  cardReference: heroImg
};

export const getImageByKey = (key) => {
  if (!key) return images.kitchen;
  if (typeof key === 'string') {
    // If it's already a full data url or path or http
    if (key.startsWith('data:') || key.startsWith('http') || key.startsWith('/') || key.startsWith('blob:')) {
      return key;
    }
  }

  // Direct map check
  if (images[key]) return images[key];

  const lower = String(key).toLowerCase();

  // Smart categorical matching:
  if (lower.includes('kitchen') || lower.includes('modular')) return images.kitchen;
  if (lower.includes('wardrobe') || lower.includes('cupboard') || lower.includes('almirah') || lower.includes('loft')) return images.wardrobe;
  if (lower.includes('tv') || lower.includes('louver') || lower.includes('entertainment') || lower.includes('console')) return images.tvUnit;
  if (lower.includes('door') || lower.includes('frame') || lower.includes('chaukhat')) return images.doors;
  if (lower.includes('wall') || lower.includes('panel') || lower.includes('ceiling') || lower.includes('acoustic')) return images.wallPanels;
  if (lower.includes('office') || lower.includes('commercial') || lower.includes('cabin') || lower.includes('workstation')) return images.office;

  const cleanKey = lower.replace(/[^a-z0-9]/g, '');
  for (const [k, v] of Object.entries(images)) {
    if (k.toLowerCase() === cleanKey) return v;
  }

  return images.kitchen;
};
