import React from 'react';
import { Button } from '@/components/ui/button';
import { Mood } from '@/types';
import { useTranslation } from 'react-i18next';

interface MoodSelectorProps {
  selectedMoods: Mood[];
  setSelectedMoods: (moods: Mood[]) => void;
}

const moods: { value: Mood; icon: string }[] = [
  { value: 'romantic', icon: '❤️' },
  { value: 'family', icon: '👨‍👩‍👧‍👦' },
  { value: 'festive', icon: '🎉' },
  { value: 'traditional', icon: '🏺' },
  { value: 'modern', icon: '🏙️' },
  { value: 'quiet', icon: '🧘' },
  { value: 'luxury', icon: '💎' },
];

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMoods, setSelectedMoods }) => {
  const { t } = useTranslation();
  
  const toggleMood = (mood: Mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.mood')}</h2>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMoods.includes(mood.value) ? 'default' : 'outline'}
            onClick={() => toggleMood(mood.value)}
            className="flex items-center gap-2"
          >
            <span>{mood.icon}</span>
            <span>{t(`moods.${mood.value}`)}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
