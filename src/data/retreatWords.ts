import { RetreatWord } from '../types/retreat';
import { v4 as uuidv4 } from 'uuid';

const createWords = (texts: string[], category: RetreatWord['category']): RetreatWord[] =>
  texts.map(text => ({
    id: uuidv4(),
    text,
    category,
  }));

export const activityWords = createWords([
  'Yoga',
  'Meditation',
  'Dance',
  'Breathwork',
  'Tantra',
  'Sound Bath',
  'Ecstatic',
  'Shamanic',
  'Crystal',
  'Cacao',
], 'activity');

export const styleWords = createWords([
  'Nudist',
  'Silent',
  'Digital Nomad',
  'Polyamorous',
  'Crypto',
  'Vegan',
  'Raw Food',
  'Mindful',
  'Conscious',
  'Sacred',
], 'style');

export const focusWords = createWords([
  'Healing',
  'Leadership',
  'Transformation',
  'Awakening',
  'Integration',
  'Manifestation',
  'Alignment',
  'Empowerment',
  'Sobriety',
  'Abundance',
], 'focus');

export const locationWords = createWords([
  'Retreat',
  'Journey',
  'Experience',
  'Intensive',
  'Workshop',
  'Circle',
  'Ceremony',
  'Safari',
  'Pilgrimage',
  'Camp',
], 'location');

export type WordCategory = 'activity' | 'style' | 'focus' | 'location';

export const allWords: Record<WordCategory, RetreatWord[]> = {
  activity: activityWords,
  style: styleWords,
  focus: focusWords,
  location: locationWords,
};

export type { RetreatWord }; 

