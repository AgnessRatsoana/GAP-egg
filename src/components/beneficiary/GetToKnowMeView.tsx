import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Heart, Music, Utensils, BookOpen, Coffee, Feather, Sparkles } from 'lucide-react';
import { GetToKnowMe } from '../../types';

export const GetToKnowMeView: React.FC = () => {
  const { currentBeneficiary, updateGetToKnowMe } = useApp();

  const [savedToast, setSavedToast] = useState(false);
  const [formData, setFormData] = useState<GetToKnowMe>({
    favouriteMeals: '',
    snacksAndDrinks: '',
    dietaryRestrictions: '',
    musicPreferences: '',
    booksAndMovies: '',
    hobbies: '',
    personalCareScents: '',
    preferredDailyActivities: '',
  });

  useEffect(() => {
    if (currentBeneficiary?.getToKnowMe) {
      setFormData(currentBeneficiary.getToKnowMe);
    }
  }, [currentBeneficiary]);

  const handleChange = (field: keyof GetToKnowMe, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentBeneficiary) return;
    updateGetToKnowMe(currentBeneficiary.id, formData);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-main)' }}>Stay Personalisation</h2>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '640px' }}>
          This information allows our team and sanctuary hosts to pre-stock your pantry with comforting rituals.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '36px 32px',
          boxShadow: 'var(--shadow-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
          {/* Favourite Meals */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <Utensils size={15} color="var(--primary-forest)" /> Favourite Comfort Meals
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Warm vegetable lentil stew, sourdough loaf, roasted squash"
              value={formData.favouriteMeals}
              onChange={(e) => handleChange('favouriteMeals', e.target.value)}
            />
          </div>

          {/* Snacks & Drinks */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <Coffee size={15} color="var(--primary-forest)" /> Teas, Drinks & Snacks
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Chamomile tea with oat milk, roasted almonds, 70% dark chocolate"
              value={formData.snacksAndDrinks}
              onChange={(e) => handleChange('snacksAndDrinks', e.target.value)}
            />
          </div>

          {/* Dietary Restrictions */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <Heart size={15} color="var(--primary-forest)" /> Dietary Restrictions & Allergies
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Vegetarian, lactose intolerant, no peanuts"
              value={formData.dietaryRestrictions}
              onChange={(e) => handleChange('dietaryRestrictions', e.target.value)}
            />
          </div>

          {/* Music Preferences */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <Music size={15} color="var(--primary-forest)" /> Music & Calming Playlists
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Neo-classical piano, acoustic folk, ambient rainfall"
              value={formData.musicPreferences}
              onChange={(e) => handleChange('musicPreferences', e.target.value)}
            />
          </div>

          {/* Books & Movies */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <BookOpen size={15} color="var(--primary-forest)" /> Books & Film Genres
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Mary Oliver poetry, nature essays, gentle Studio Ghibli films"
              value={formData.booksAndMovies}
              onChange={(e) => handleChange('booksAndMovies', e.target.value)}
            />
          </div>

          {/* Personal Care Scents */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
              <Sparkles size={15} color="var(--primary-forest)" /> Scents & Soaps
            </label>
            <textarea
              rows={2}
              placeholder="e.g. French lavender, bergamot, strictly unscented soap"
              value={formData.personalCareScents}
              onChange={(e) => handleChange('personalCareScents', e.target.value)}
            />
          </div>
        </div>

        {/* Action bar */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {savedToast ? (
            <span style={{ fontSize: '13px', color: 'var(--primary-forest)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} /> Preferences saved to your sanctuary profile!
            </span>
          ) : (
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              These notes guide our team when pre-stocking your cottage.
            </span>
          )}

          <button
            type="submit"
            style={{
              backgroundColor: 'var(--primary-forest)',
              color: '#FFFFFF',
              padding: '11px 26px',
              borderRadius: '12px',
              fontWeight: 600,
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            className="card-hover"
          >
            <CheckCircle2 size={16} /> Save Preferences
          </button>
        </div>
      </form>
    </div>
  );
};
