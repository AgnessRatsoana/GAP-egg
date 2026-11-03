const sanctuaryImages = [
  require('../../../../media/santuary1.jpg'),
  require('../../../../media/santuary2.jpg'),
  require('../../../../media/santuary3.jpg'),
  require('../../../../media/santuary4.jpg'),
  require('../../../../media/santuary5.jpg'),
  require('../../../../media/santuary6.jpg'),
  require('../../../../media/santuary7.jpg'),
  require('../../../../media/santuary8.jpg'),
  require('../../../../media/santuary9.jpg'),
];

export function getSanctuaryImageIndex(propertyId: string) {
  return Number(propertyId.replace(/\D/g, '')) % sanctuaryImages.length;
}

export function getSanctuaryImage(propertyId: string) {
  return sanctuaryImages[getSanctuaryImageIndex(propertyId)] ?? sanctuaryImages[0];
}

export function getSanctuaryGallery(propertyId: string) {
  const imageIndex = getSanctuaryImageIndex(propertyId);
  return sanctuaryImages.slice(imageIndex).concat(sanctuaryImages.slice(0, imageIndex)).slice(0, 4);
}