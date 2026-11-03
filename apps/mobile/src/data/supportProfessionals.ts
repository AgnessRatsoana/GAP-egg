export type SupportCategory = 'therapy' | 'counsellor' | 'therapist' | 'artist' | 'trainer' | 'wellness' | 'coach';

export type SupportProfessional = {
  id: string;
  name: string;
  specialty: string;
  category: SupportCategory;
  rating: number;
  completedSessions: number;
  location: string;
  bio: string;
  photo: number;
};

export const supportCategories = [
  { label: 'All services', value: 'all' },
  { label: 'Therapy', value: 'therapy' },
  { label: 'Counsellors', value: 'counsellor' },
  { label: 'Therapists', value: 'therapist' },
  { label: 'Local artists', value: 'artist' },
  { label: 'Gym trainers', value: 'trainer' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Coaches', value: 'coach' },
] as const;

export const supportProfessionals: SupportProfessional[] = [
  {
    id: 'nomvula-sithole',
    name: 'Dr. Nomvula Sithole',
    specialty: 'Clinical counsellor',
    category: 'counsellor',
    rating: 4.98,
    completedSessions: 96,
    location: 'Cape Town, Western Cape',
    bio: 'A compassionate clinical counsellor supporting grief recovery, stress, and emotional renewal.',
    photo: require('../../../../media/pro1.jpg'),
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    specialty: 'Restorative care coordinator',
    category: 'wellness',
    rating: 4.97,
    completedSessions: 154,
    location: 'Stellenbosch, Western Cape',
    bio: 'Coordinates gentle wellbeing plans, restorative routines, and practical care throughout a stay.',
    photo: require('../../../../media/prof2.jpg'),
  },
  {
    id: 'kagiso-ndlovu',
    name: 'Kagiso Ndlovu',
    specialty: 'Somatic therapist',
    category: 'therapist',
    rating: 4.93,
    completedSessions: 78,
    location: 'Knysna, Western Cape',
    bio: 'Offers grounding, breathwork, and body-aware therapy in a calm, supportive setting.',
    photo: require('../../../../media/prof3.jpg'),
  },
  {
    id: 'francois-van-zyl',
    name: 'Dr. Francois van Zyl',
    specialty: 'Integrative health therapist',
    category: 'therapy',
    rating: 4.91,
    completedSessions: 64,
    location: 'Franschhoek, Western Cape',
    bio: 'Provides supportive health consultations focused on restorative sleep and sustainable wellbeing.',
    photo: require('../../../../media/prof4.jpg'),
  },
  {
    id: 'amara-dlamini',
    name: 'Amara Dlamini',
    specialty: 'Local artist & art facilitator',
    category: 'artist',
    rating: 4.96,
    completedSessions: 42,
    location: 'Cape Town, Western Cape',
    bio: 'Leads relaxed, beginner-friendly art sessions using drawing, colour, and found natural materials.',
    photo: require('../../../../media/prof5.jpg'),
  },
  {
    id: 'thabo-mokoena',
    name: 'Thabo Mokoena',
    specialty: 'Certified gym trainer',
    category: 'trainer',
    rating: 4.89,
    completedSessions: 88,
    location: 'Cape Town, Western Cape',
    bio: 'Builds gentle, adaptable movement plans for strength, mobility, and confidence.',
    photo: require('../../../../media/prof6.jpg'),
  },
  {
    id: 'zanele-maseko',
    name: 'Zanele Maseko',
    specialty: 'Trauma-informed therapist',
    category: 'therapist',
    rating: 4.95,
    completedSessions: 71,
    location: 'George, Western Cape',
    bio: 'Creates a steady, person-led space for emotional support and practical coping strategies.',
    photo: require('../../../../media/prof7.jpg'),
  },
  {
    id: 'liam-petersen',
    name: 'Liam Petersen',
    specialty: 'Music & sound artist',
    category: 'artist',
    rating: 4.92,
    completedSessions: 37,
    location: 'Hermanus, Western Cape',
    bio: 'Hosts calming music sessions and creative sound exploration with no previous experience needed.',
    photo: require('../../../../media/prof8.jpg'),
  },
  {
    id: 'aisha-patel',
    name: 'Aisha Patel',
    specialty: 'Personal fitness trainer',
    category: 'trainer',
    rating: 4.94,
    completedSessions: 53,
    location: 'Paarl, Western Cape',
    bio: 'Offers low-pressure personal training adapted to individual energy, mobility, and goals.',
    photo: require('../../../../media/prof9.jpg'),
  },
  {
    id: 'musa-khumalo',
    name: 'Musa Khumalo',
    specialty: 'Yoga & movement coach',
    category: 'coach',
    rating: 4.9,
    completedSessions: 62,
    location: 'Stellenbosch, Western Cape',
    bio: 'Guides gentle yoga, stretching, and breath-led movement for different experience levels.',
    photo: require('../../../../media/prof10.jpg'),
  },
];