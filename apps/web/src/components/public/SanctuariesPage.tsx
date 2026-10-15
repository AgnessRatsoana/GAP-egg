import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';
import {
  MapPin,
  Shield,
  ArrowRight,
  Check,
  X,
  Calendar,
  Lock,
  Star,
  Heart,
  SlidersHorizontal,
  Share2,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Trees,
  Mountain,
  Waves,
  Sun,
  Home,
  Bed,
  Bath,
  Coffee,
  Wifi,
  Flame,
  Tv,
  Car,
  Utensils,
  Award,
  Info,
  CheckCircle2,
  Compass,
} from 'lucide-react';

import { BookingCheckoutModal } from './BookingCheckoutModal';

interface FilterState {
  minPrice: number;
  maxPrice: number;
  placeType: 'all' | 'entire' | 'room';
  bedrooms: number | 'any';
  beds: number | 'any';
  bathrooms: number | 'any';
  propertyType: string;
  solarBackup: boolean;
  wifi: boolean;
  fireplace: boolean;
  pool: boolean;
  mountainView: boolean;
  superhostOnly: boolean;
  guestFavoriteOnly: boolean;
}

export const SanctuariesPage: React.FC = () => {
  const { properties, setActiveView, favorites, toggleFavorite } = useApp();

  // Search Bar State
  const [searchDestination, setSearchDestination] = useState<string>('');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [showGuestPicker, setShowGuestPicker] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>('Any 30-Day Retreat');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Category State
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Pricing Toggle (Airbnb "Display total before taxes" / "Show Monthly Grant Coverage")
  const [showMonthlyGrant, setShowMonthlyGrant] = useState<boolean>(false);

  // Active Property Modal State
  const [activePropertyModal, setActivePropertyModal] = useState<Property | null>(null);
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);

  // Card Photo Slideshow Indices map (propertyId -> photoIndex)
  const [cardPhotoIndices, setCardPhotoIndices] = useState<Record<string, number>>({});

  // Filter Modal State
  const [showFiltersModal, setShowFiltersModal] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 3500,
    placeType: 'all',
    bedrooms: 'any',
    beds: 'any',
    bathrooms: 'any',
    propertyType: 'all',
    solarBackup: false,
    wifi: false,
    fireplace: false,
    pool: false,
    mountainView: false,
    superhostOnly: false,
    guestFavoriteOnly: false,
  });

  // Modal Booking State
  const [modalCheckIn, setModalCheckIn] = useState<string>('2026-11-01');
  const [modalCheckOut, setModalCheckOut] = useState<string>('2026-12-01');
  const [modalGuests, setModalGuests] = useState<number>(1);
  const [reservationNotice, setReservationNotice] = useState<boolean>(false);

  // Only approved/verified sanctuaries
  const verified = useMemo(() => {
    return properties.filter((p) => p.verificationStatus === 'approved');
  }, [properties]);

  // Categories list with Lucide icons
  const categories = [
    { id: 'all', label: 'All Havens', icon: Compass },
    { id: 'vineyards', label: 'Vineyards', icon: Sparkles },
    { id: 'beachfront', label: 'Beachfront', icon: Waves },
    { id: 'mountains', label: 'Mountains', icon: Mountain },
    { id: 'forest', label: 'Forest & Woods', icon: Trees },
    { id: 'off_grid', label: 'Off-grid Solar', icon: Sun },
    { id: 'countryside', label: 'Countryside', icon: Home },
  ];

  // Apply filters
  const filteredProperties = useMemo(() => {
    return verified.filter((p) => {
      // Destination search
      if (searchDestination.trim()) {
        const q = searchDestination.toLowerCase();
        const matchesDest =
          p.city.toLowerCase().includes(q) ||
          p.province.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q);
        if (!matchesDest) return false;
      }

      // Guest count search
      if (p.maxGuests && p.maxGuests < guestCount) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (p.category !== selectedCategory) {
          return false;
        }
      }

      // Filter Modal: Price
      const nightly = p.nightlyPrice || 1500;
      if (nightly < filters.minPrice || nightly > filters.maxPrice) {
        return false;
      }

      // Filter Modal: Property Type
      if (filters.propertyType !== 'all') {
        if (p.propertyType !== filters.propertyType) {
          return false;
        }
      }

      // Filter Modal: Bedrooms
      if (filters.bedrooms !== 'any') {
        if (p.bedrooms < filters.bedrooms) return false;
      }

      // Filter Modal: Beds
      if (filters.beds !== 'any') {
        const beds = p.beds || p.bedrooms;
        if (beds < filters.beds) return false;
      }

      // Filter Modal: Bathrooms
      if (filters.bathrooms !== 'any') {
        if (p.bathrooms < filters.bathrooms) return false;
      }

      // Filter Modal: Amenities
      if (filters.solarBackup) {
        const hasSolar = p.amenities.some(
          (a) =>
            a.toLowerCase().includes('solar') ||
            a.toLowerCase().includes('inverter') ||
            a.toLowerCase().includes('loadshedding')
        );
        if (!hasSolar) return false;
      }

      if (filters.wifi) {
        const hasWifi = p.amenities.some((a) => a.toLowerCase().includes('wifi') || a.toLowerCase().includes('wi-fi'));
        if (!hasWifi) return false;
      }

      if (filters.fireplace) {
        const hasFireplace = p.amenities.some((a) => a.toLowerCase().includes('fire') || a.toLowerCase().includes('hearth'));
        if (!hasFireplace) return false;
      }

      if (filters.pool) {
        const hasPool = p.amenities.some((a) => a.toLowerCase().includes('pool') || a.toLowerCase().includes('kolkol'));
        if (!hasPool) return false;
      }

      if (filters.mountainView) {
        const hasMountain =
          p.amenities.some((a) => a.toLowerCase().includes('mountain') || a.toLowerCase().includes('view')) ||
          p.description.toLowerCase().includes('mountain');
        if (!hasMountain) return false;
      }

      // Filter Modal: Superhost & Guest Favorite
      if (filters.superhostOnly && !p.isSuperhost) return false;
      if (filters.guestFavoriteOnly && !p.isGuestFavorite) return false;

      return true;
    });
  }, [verified, searchDestination, guestCount, selectedCategory, filters]);

  // Count active filters for badge
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.minPrice > 0 || filters.maxPrice < 3500) count++;
    if (filters.bedrooms !== 'any') count++;
    if (filters.beds !== 'any') count++;
    if (filters.bathrooms !== 'any') count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.solarBackup) count++;
    if (filters.wifi) count++;
    if (filters.fireplace) count++;
    if (filters.pool) count++;
    if (filters.mountainView) count++;
    if (filters.superhostOnly) count++;
    if (filters.guestFavoriteOnly) count++;
    return count;
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 3500,
      placeType: 'all',
      bedrooms: 'any',
      beds: 'any',
      bathrooms: 'any',
      propertyType: 'all',
      solarBackup: false,
      wifi: false,
      fireplace: false,
      pool: false,
      mountainView: false,
      superhostOnly: false,
      guestFavoriteOnly: false,
    });
  };

  const handleNextPhoto = (e: React.MouseEvent, propId: string, totalPhotos: number) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const current = prev[propId] || 0;
      return { ...prev, [propId]: (current + 1) % totalPhotos };
    });
  };

  const handlePrevPhoto = (e: React.MouseEvent, propId: string, totalPhotos: number) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => {
      const current = prev[propId] || 0;
      return { ...prev, [propId]: (current - 1 + totalPhotos) % totalPhotos };
    });
  };

  return (
    <div className="animate-fade-in" style={{ padding: '24px 24px 100px', maxWidth: '1420px', margin: '0 auto' }}>
      
      {/* 1. TOP AIRBNB SEARCH BAR (Desktop & Mobile Responsive) */}
      <div style={{ maxWidth: '860px', margin: '0 auto 28px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 3px 12px rgba(30, 40, 39, 0.08)',
            padding: '8px 12px 8px 24px',
            position: 'relative',
            gap: '8px',
          }}
        >
          {/* Destination */}
          <div style={{ flex: 1.2, borderRight: '1px solid var(--border-subtle)', paddingRight: '12px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-heading)',
              }}
            >
              Where
            </label>
            <input
              type="text"
              placeholder="Search Franschhoek, Knysna, Drakensberg..."
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              style={{
                width: '100%',
                border: 'none',
                outline: 'none',
                fontSize: '13px',
                color: 'var(--text-body)',
                backgroundColor: 'transparent',
                paddingTop: '2px',
              }}
            />
          </div>

          {/* Dates (Check in / Check out) */}
          <div
            style={{
              flex: 1,
              borderRight: '1px solid var(--border-subtle)',
              paddingRight: '12px',
              paddingLeft: '8px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-heading)',
                cursor: 'pointer',
              }}
            >
              Retreat Window
            </label>
            <div
              style={{
                fontSize: '13px',
                color: 'var(--text-muted)',
                paddingTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {dateRange}
            </div>

            {/* Date Picker Popover */}
            {showDatePicker && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '54px',
                  left: '0',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  padding: '20px',
                  zIndex: 100,
                  width: '300px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '12px' }}>
                  Select Retreat Period
                </div>
                {[
                  'Any 30-Day Retreat',
                  'Nov 1 - Nov 30 (30 nights)',
                  'Dec 1 - Dec 31 (30 nights)',
                  'Jan 5 - Feb 4 (30 nights)',
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDateRange(opt);
                      setShowDatePicker(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 12px',
                      fontSize: '13px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: dateRange === opt ? 'var(--bg-serene-water)' : 'transparent',
                      color: dateRange === opt ? 'var(--color-water-deep)' : 'var(--text-body)',
                      fontWeight: dateRange === opt ? 600 : 400,
                      cursor: 'pointer',
                      marginBottom: '4px',
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Guests */}
          <div
            style={{
              flex: 0.9,
              paddingLeft: '8px',
              paddingRight: '8px',
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => setShowGuestPicker(!showGuestPicker)}
          >
            <label
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.04em',
                color: 'var(--text-heading)',
                cursor: 'pointer',
              }}
            >
              Who
            </label>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)', paddingTop: '2px' }}>
              {guestCount} {guestCount === 1 ? 'Guest' : 'Guests'}
            </div>

            {/* Guest Counter Popover */}
            {showGuestPicker && (
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  position: 'absolute',
                  top: '54px',
                  right: '0',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  padding: '20px',
                  zIndex: 100,
                  width: '280px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>Guests</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Ages 13 or above</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      disabled={guestCount <= 1}
                      onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        backgroundColor: '#FFFFFF',
                        cursor: guestCount <= 1 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: guestCount <= 1 ? 0.4 : 1,
                      }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                      {guestCount}
                    </span>
                    <button
                      disabled={guestCount >= 6}
                      onClick={() => setGuestCount((c) => Math.min(6, c + 1))}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        backgroundColor: '#FFFFFF',
                        cursor: guestCount >= 6 ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: guestCount >= 6 ? 0.4 : 1,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuestPicker(false)}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'var(--color-water)',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* Search CTA button */}
          <button
            style={{
              backgroundColor: 'var(--color-water)',
              border: 'none',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              flexShrink: 0,
              boxShadow: '0 2px 6px rgba(54, 122, 143, 0.3)',
            }}
            title="Search sanctuaries"
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* 2. AIRBNB CATEGORY BAR & CONTROLS */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '14px',
          marginBottom: '28px',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {/* Categories Carousel */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '6px',
            scrollbarWidth: 'none',
            flex: 1,
          }}
        >
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 4px 12px',
                  position: 'relative',
                  color: isSelected ? 'var(--color-water-deep)' : 'var(--text-muted)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                <IconComponent size={22} strokeWidth={isSelected ? 2.2 : 1.7} />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: isSelected ? 600 : 500,
                    letterSpacing: '0.02em',
                  }}
                >
                  {cat.label}
                </span>
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-water)',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side controls: Filters modal button & Total price toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Airbnb Filters Button */}
          <button
            onClick={() => setShowFiltersModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#FFFFFF',
              color: 'var(--text-heading)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-water)',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginLeft: '4px',
                }}
              >
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Airbnb Display Total Switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 14px',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              backgroundColor: '#FFFFFF',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)', whiteSpace: 'nowrap' }}>
              Show 30-Day Grant
            </span>
            <button
              onClick={() => setShowMonthlyGrant(!showMonthlyGrant)}
              style={{
                width: '42px',
                height: '24px',
                borderRadius: '9999px',
                backgroundColor: showMonthlyGrant ? 'var(--color-water)' : '#D1D5DB',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background-color 0.2s',
                padding: '2px',
              }}
              title="Toggle 30-Day Grant Coverage display"
            >
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  transform: showMonthlyGrant ? 'translateX(18px)' : 'translateX(0)',
                  transition: 'transform 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 3. PROPERTY COUNT & REFRESH BAR */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          fontSize: '13px',
          color: 'var(--text-muted)',
        }}
      >
        <div>
          Showing <strong style={{ color: 'var(--text-heading)' }}>{filteredProperties.length}</strong> vetted sanctuaries in South Africa
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-water)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
            }}
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* 4. AIRBNB PROPERTY CARD GRID */}
      {filteredProperties.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 20px',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
          }}
        >
          <Compass size={40} style={{ color: 'var(--text-muted)', marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>
            No sanctuaries match your criteria
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: '440px', margin: '0 auto 20px' }}>
            Try broadening your price range, clearing amenities filters, or searching for a different area.
          </p>
          <button
            onClick={resetFilters}
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              backgroundColor: 'var(--color-water)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px 20px',
          }}
        >
          {filteredProperties.map((property) => {
            const isFav = favorites.includes(property.id);
            const photoList =
              property.photos && property.photos.length > 0
                ? property.photos
                : ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80'];
            const activePhotoIndex = cardPhotoIndices[property.id] || 0;
            const currentPhoto = photoList[activePhotoIndex] || photoList[0];
            const nightlyPrice = property.nightlyPrice || 1650;
            const monthlyRate = property.monthlyRate || nightlyPrice * 30 * 0.85;

            return (
              <div
                key={property.id}
                onClick={() => setActivePropertyModal(property)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Image Container with Slider & Badges */}
                <div
                  style={{
                    position: 'relative',
                    aspectRatio: '20/19',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    backgroundColor: '#EAEAEA',
                    marginBottom: '12px',
                  }}
                >
                  <img
                    src={currentPhoto}
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease',
                    }}
                  />

                  {/* Left & Right Chevrons (Interactive Image Carousel) */}
                  {photoList.length > 1 && (
                    <>
                      <button
                        onClick={(e) => handlePrevPhoto(e, property.id, photoList.length)}
                        style={{
                          position: 'absolute',
                          left: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          color: '#1E2827',
                        }}
                        title="Previous photo"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={(e) => handleNextPhoto(e, property.id, photoList.length)}
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 255, 255, 0.9)',
                          border: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          color: '#1E2827',
                        }}
                        title="Next photo"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Dot indicators */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          display: 'flex',
                          gap: '5px',
                        }}
                      >
                        {photoList.slice(0, 5).map((_, idx) => (
                          <div
                            key={idx}
                            style={{
                              width: idx === activePhotoIndex ? '6px' : '5px',
                              height: idx === activePhotoIndex ? '6px' : '5px',
                              borderRadius: '50%',
                              backgroundColor: idx === activePhotoIndex ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
                            }}
                          />
                        ))}
                      </div>
                    </>
                  )}

                  {/* Top Badges: Guest Favourite / Superhost */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
                    {property.isGuestFavorite ? (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(4px)',
                          color: 'var(--text-heading)',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Award size={12} color="var(--accent-sand)" />
                        Guest favourite
                      </span>
                    ) : property.isSuperhost ? (
                      <span
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(4px)',
                          color: 'var(--text-heading)',
                          fontSize: '11px',
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        <Sparkles size={12} color="var(--color-water)" />
                        Superhost
                      </span>
                    ) : null}
                  </div>

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(property.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={isFav ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    <Heart
                      size={22}
                      strokeWidth={2}
                      fill={isFav ? '#E11D48' : 'rgba(0, 0, 0, 0.4)'}
                      color={isFav ? '#E11D48' : '#FFFFFF'}
                      style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}
                    />
                  </button>
                </div>

                {/* Card Details (Airbnb Format) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {/* Location & Star Rating */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h3
                      style={{
                        fontSize: '14px',
                        fontWeight: 700,
                        color: 'var(--text-heading)',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '75%',
                      }}
                    >
                      {property.city}, {property.province}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                      <Star size={13} fill="#1E2827" color="#1E2827" />
                      <span>{property.rating ? property.rating.toFixed(2) : '4.95'}</span>
                      {property.reviewCount && (
                        <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({property.reviewCount})</span>
                      )}
                    </div>
                  </div>

                  {/* Distance / Setting line */}
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {property.title}
                  </div>

                  {/* Availability / Dates */}
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                    Available Nov 1 – Nov 30 · 30 nights
                  </div>

                  {/* Loadshedding Badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--color-green)', fontWeight: 600, marginTop: '2px' }}>
                    <Sun size={12} />
                    <span>Solar & Inverter Powered (Loadshedding-proof)</span>
                  </div>

                  {/* Pricing (ZAR in Airbnb format) */}
                  <div style={{ marginTop: '6px', fontSize: '14px', color: 'var(--text-heading)' }}>
                    {showMonthlyGrant ? (
                      <div>
                        <span style={{ fontWeight: 700 }}>R{monthlyRate.toLocaleString('en-ZA')}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}> / month grant</span>
                        <div style={{ fontSize: '11px', color: 'var(--color-water)', fontWeight: 600 }}>
                          100% Foundation Sponsored for Approved Guests
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span style={{ fontWeight: 700 }}>R{nightlyPrice.toLocaleString('en-ZA')}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}> night</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px', marginLeft: '6px' }}>
                          · R{(nightlyPrice * 30).toLocaleString('en-ZA')} total (30 nights)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 5. AIRBNB FILTERS MODAL */}
      {showFiltersModal && (
        <div
          onClick={() => setShowFiltersModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              maxWidth: '680px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '18px 24px',
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <button
                onClick={() => setShowFiltersModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  color: 'var(--text-heading)',
                }}
              >
                <X size={20} />
              </button>
              <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)' }}>Filters</div>
              <div style={{ width: '28px' }} />
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {/* Price Range */}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '6px' }}>
                  Price range (ZAR)
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  Nightly sanctuary rate in South African Rands
                </p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px 14px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Minimum</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>R</span>
                      <input
                        type="number"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 600 }}
                      />
                    </div>
                  </div>
                  <span style={{ color: 'var(--text-muted)' }}>–</span>
                  <div style={{ flex: 1, border: '1px solid var(--border-color)', borderRadius: '12px', padding: '10px 14px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>Maximum</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>R</span>
                      <input
                        type="number"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                        style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', fontWeight: 600 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Rooms and beds */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px' }}>
                  Rooms and beds
                </h4>

                {/* Bedrooms */}
                <div style={{ marginBottom: '18px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>
                    Bedrooms
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(['any', 1, 2, 3, 4] as const).map((num) => (
                      <button
                        key={num}
                        onClick={() => setFilters({ ...filters, bedrooms: num })}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          border: `1px solid ${filters.bedrooms === num ? 'var(--text-heading)' : 'var(--border-color)'}`,
                          backgroundColor: filters.bedrooms === num ? 'var(--text-heading)' : '#FFFFFF',
                          color: filters.bedrooms === num ? '#FFFFFF' : 'var(--text-heading)',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {num === 'any' ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)', marginBottom: '8px' }}>
                    Bathrooms
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {(['any', 1, 2, 3] as const).map((num) => (
                      <button
                        key={num}
                        onClick={() => setFilters({ ...filters, bathrooms: num })}
                        style={{
                          padding: '8px 18px',
                          borderRadius: '9999px',
                          border: `1px solid ${filters.bathrooms === num ? 'var(--text-heading)' : 'var(--border-color)'}`,
                          backgroundColor: filters.bathrooms === num ? 'var(--text-heading)' : '#FFFFFF',
                          color: filters.bathrooms === num ? '#FFFFFF' : 'var(--text-heading)',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {num === 'any' ? 'Any' : `${num}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '14px' }}>
                  Property type
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'all', label: 'All Types' },
                    { id: 'cottage', label: 'Cottage' },
                    { id: 'retreat_villa', label: 'Retreat Cabin' },
                    { id: 'guest_suite', label: 'Garden Suite' },
                    { id: 'apartment', label: 'Apartment' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setFilters({ ...filters, propertyType: t.id })}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '12px',
                        border: `2px solid ${filters.propertyType === t.id ? 'var(--color-water)' : 'var(--border-color)'}`,
                        backgroundColor: filters.propertyType === t.id ? 'var(--bg-serene-water)' : '#FFFFFF',
                        color: filters.propertyType === t.id ? 'var(--color-water-deep)' : 'var(--text-heading)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'center',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Essential Amenities */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '14px' }}>
                  Amenities
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  {[
                    { key: 'solarBackup', label: 'Solar & Inverter (No Loadshedding)' },
                    { key: 'wifi', label: 'High-speed Fiber WiFi' },
                    { key: 'fireplace', label: 'Wood-burning Fireplace' },
                    { key: 'pool', label: 'Plunge Pool / KolKol' },
                    { key: 'mountainView', label: 'Scenic Mountain View' },
                  ].map((amenity) => {
                    const isChecked = filters[amenity.key as keyof FilterState] as boolean;
                    return (
                      <label
                        key={amenity.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: 'var(--text-heading)',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            setFilters({ ...filters, [amenity.key]: e.target.checked })
                          }
                          style={{
                            width: '18px',
                            height: '18px',
                            accentColor: 'var(--color-water)',
                            cursor: 'pointer',
                          }}
                        />
                        <span>{amenity.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Host & Verification Badges */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '14px' }}>
                  Host & verification
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-heading)' }}>
                    <input
                      type="checkbox"
                      checked={filters.superhostOnly}
                      onChange={(e) => setFilters({ ...filters, superhostOnly: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-water)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Superhost only</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Stay with recognized, highly rated hosts</div>
                    </div>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--text-heading)' }}>
                    <input
                      type="checkbox"
                      checked={filters.guestFavoriteOnly}
                      onChange={(e) => setFilters({ ...filters, guestFavoriteOnly: e.target.checked })}
                      style={{ width: '18px', height: '18px', accentColor: 'var(--color-water)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 600 }}>Guest favourite only</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>The most loved homes on Gap A Month</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderTop: '1px solid var(--border-subtle)',
                backgroundColor: '#FFFFFF',
              }}
            >
              <button
                onClick={resetFilters}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-heading)',
                  fontWeight: 600,
                  fontSize: '14px',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFiltersModal(false)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--color-water)',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Show {filteredProperties.length} sanctuaries
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. DETAILED AIRBNB LISTING MODAL (Mosaic photos, reviews, live pricing calculator) */}
      {activePropertyModal && (
        <div
          onClick={() => setActivePropertyModal(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1100,
            overflowY: 'auto',
            padding: '40px 16px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '1080px',
              width: '100%',
              margin: 'auto',
              boxShadow: '0 24px 72px rgba(0,0,0,0.28)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Top Close Button */}
            <button
              onClick={() => setActivePropertyModal(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
              title="Close modal"
            >
              <X size={18} />
            </button>

            <div style={{ padding: '36px 36px 48px' }}>
              {/* Title & Header */}
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--text-heading)',
                  marginBottom: '10px',
                  paddingRight: '48px',
                }}
              >
                {activePropertyModal.title}
              </h1>

              {/* Sub-header line: Rating, reviews, Superhost, Location, Save */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                  fontSize: '13px',
                  color: 'var(--text-heading)',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 700 }}>
                    <Star size={14} fill="#1E2827" color="#1E2827" />
                    <span>{activePropertyModal.rating ? activePropertyModal.rating.toFixed(2) : '4.98'}</span>
                  </div>
                  <span>·</span>
                  <span style={{ textDecoration: 'underline', fontWeight: 600 }}>
                    {activePropertyModal.reviewCount || 42} reviews
                  </span>
                  {activePropertyModal.isSuperhost && (
                    <>
                      <span>·</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-water)', fontWeight: 600 }}>
                        <Sparkles size={13} /> Superhost
                      </span>
                    </>
                  )}
                  <span>·</span>
                  <span style={{ color: 'var(--text-muted)' }}>
                    {activePropertyModal.city}, {activePropertyModal.province}, South Africa
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: activePropertyModal.title,
                          url: window.location.href,
                        });
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Sanctuary link copied to clipboard.');
                      }
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-heading)',
                    }}
                  >
                    <Share2 size={16} /> Share
                  </button>

                  <button
                    onClick={() => toggleFavorite(activePropertyModal.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-heading)',
                    }}
                  >
                    <Heart
                      size={16}
                      fill={favorites.includes(activePropertyModal.id) ? '#E11D48' : 'none'}
                      color={favorites.includes(activePropertyModal.id) ? '#E11D48' : 'currentColor'}
                    />
                    {favorites.includes(activePropertyModal.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>

              {/* AIRBNB 5-PHOTO MOSAIC GRID */}
              {(() => {
                const photos =
                  activePropertyModal.photos && activePropertyModal.photos.length >= 5
                    ? activePropertyModal.photos
                    : [
                        activePropertyModal.photos?.[0] || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
                        activePropertyModal.photos?.[1] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
                        activePropertyModal.photos?.[2] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
                        activePropertyModal.photos?.[3] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
                        activePropertyModal.photos?.[4] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
                      ];

                return (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '2fr 1fr 1fr',
                      gridTemplateRows: '200px 200px',
                      gap: '8px',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '36px',
                    }}
                  >
                    <div style={{ gridRow: 'span 2', gridColumn: 'span 1', height: '100%' }}>
                      <img
                        src={photos[0]}
                        alt="Main sanctuary view"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <img
                        src={photos[1]}
                        alt="Sanctuary interior"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <img
                        src={photos[2]}
                        alt="Sanctuary bedroom"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <img
                        src={photos[3]}
                        alt="Sanctuary bathroom"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <img
                        src={photos[4]}
                        alt="Sanctuary grounds"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                );
              })()}

              {/* TWO COLUMN CONTENT: Left Details, Right Sticky Reserve Card */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '48px', alignItems: 'start' }}>
                {/* Left Column: Host, Highlights, Description, Sleeping, Amenities */}
                <div>
                  {/* Host Section */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '24px',
                      marginBottom: '24px',
                    }}
                  >
                    <div>
                      <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '4px' }}>
                        Entire sanctuary hosted by {activePropertyModal.ownerName}
                      </h2>
                      <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        {activePropertyModal.maxGuests || 4} guests · {activePropertyModal.bedrooms} bedrooms ·{' '}
                        {activePropertyModal.beds || 3} beds · {activePropertyModal.bathrooms} baths
                      </div>
                    </div>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--bg-serene-water)',
                        border: '2px solid var(--color-water)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--color-water-deep)',
                      }}
                    >
                      {activePropertyModal.ownerName.charAt(0)}
                    </div>
                  </div>

                  {/* Airbnb Highlights */}
                  <div
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '24px',
                      marginBottom: '24px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '18px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px' }}>
                      <Sun size={24} style={{ color: 'var(--color-water)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
                          Loadshedding-Immune (Stage 8 Protected)
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Equipped with Victron/Tesla solar system, high-capacity inverter, and battery storage. Zero outages.
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <Lock size={24} style={{ color: 'var(--color-water)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
                          Self check-in with secure digital lock
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Seamless arrival anytime after 14:00 with your private keypad credentials.
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                      <Shield size={24} style={{ color: 'var(--color-water)', flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
                          Gap A Month Vetted & Verified
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                          Strict physical security inspection, private perimeter, and 24/7 on-call wellness advocate.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '24px',
                      marginBottom: '24px',
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '12px' }}>
                      About this sanctuary
                    </h3>
                    <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-body)' }}>
                      {activePropertyModal.description}
                    </p>
                  </div>

                  {/* Sleeping Arrangements */}
                  <div
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '24px',
                      marginBottom: '24px',
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px' }}>
                      Where you'll sleep
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                      {Array.from({ length: activePropertyModal.bedrooms }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            border: '1px solid var(--border-color)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <Bed size={22} color="var(--color-water)" />
                          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
                            Bedroom {i + 1}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {i === 0 ? '1 Queen Bed · Egyptian cotton' : '1 Double Bed or 2 Single Beds'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      paddingBottom: '24px',
                      marginBottom: '24px',
                    }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px' }}>
                      What this place offers
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                      {activePropertyModal.amenities.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'var(--text-heading)' }}>
                          <CheckCircle2 size={16} color="var(--color-green)" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Sticky Airbnb Reserve Card */}
                <div style={{ position: 'sticky', top: '24px' }}>
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                      padding: '24px',
                    }}
                  >
                    {/* Price Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                      <div>
                        <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-heading)' }}>
                          R{(activePropertyModal.nightlyPrice || 1650).toLocaleString('en-ZA')}
                        </span>
                        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}> / night</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
                        <Star size={13} fill="#1E2827" />
                        <span>{activePropertyModal.rating ? activePropertyModal.rating.toFixed(2) : '4.98'}</span>
                        <span style={{ color: 'var(--text-muted)' }}>({activePropertyModal.reviewCount || 42})</span>
                      </div>
                    </div>

                    {/* Booking Date / Guests Box */}
                    <div
                      style={{
                        border: '1px solid var(--border-color)',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        marginBottom: '16px',
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border-color)' }}>
                        <div style={{ padding: '10px 12px', borderRight: '1px solid var(--border-color)' }}>
                          <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                            Check-in
                          </label>
                          <input
                            type="date"
                            value={modalCheckIn}
                            onChange={(e) => setModalCheckIn(e.target.value)}
                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}
                          />
                        </div>
                        <div style={{ padding: '10px 12px' }}>
                          <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                            Checkout
                          </label>
                          <input
                            type="date"
                            value={modalCheckOut}
                            onChange={(e) => setModalCheckOut(e.target.value)}
                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '12px', fontWeight: 600, color: 'var(--text-heading)' }}
                          />
                        </div>
                      </div>
                      <div style={{ padding: '10px 12px' }}>
                        <label style={{ display: 'block', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                          Guests
                        </label>
                        <select
                          value={modalGuests}
                          onChange={(e) => setModalGuests(Number(e.target.value))}
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            fontSize: '13px',
                            fontWeight: 600,
                            color: 'var(--text-heading)',
                            backgroundColor: 'transparent',
                          }}
                        >
                          <option value={1}>1 adult</option>
                          <option value={2}>2 adults</option>
                          <option value={3}>3 adults</option>
                          <option value={4}>4 adults</option>
                        </select>
                      </div>
                    </div>

                    {/* Reserve CTA */}
                    <button
                      onClick={() => {
                        setBookingProperty(activePropertyModal);
                      }}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-water)',
                        color: '#FFFFFF',
                        border: 'none',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(54, 122, 143, 0.3)',
                        marginBottom: '12px',
                      }}
                    >
                      Reserve & Apply Vacation Details
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                      You won't be charged yet · 100% Grant Available
                    </p>

                    {/* Price Breakdown */}
                    {(() => {
                      const nightly = activePropertyModal.nightlyPrice || 1650;
                      const subtotal = nightly * 30;
                      const grantDiscount = activePropertyModal.monthlyRate
                        ? subtotal - activePropertyModal.monthlyRate
                        : subtotal * 0.2;
                      const cleaningFee = activePropertyModal.cleaningFee || 750;
                      const serviceFee = 0; // Waived by Gap A Month
                      const totalPayable = subtotal - grantDiscount + cleaningFee;

                      return (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                            <span style={{ textDecoration: 'underline' }}>R{nightly.toLocaleString('en-ZA')} x 30 nights</span>
                            <span>R{subtotal.toLocaleString('en-ZA')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-green)' }}>
                            <span style={{ textDecoration: 'underline' }}>Gap A Month Retreat Grant</span>
                            <span>-R{Math.round(grantDiscount).toLocaleString('en-ZA')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                            <span style={{ textDecoration: 'underline' }}>Cleaning fee</span>
                            <span>R{cleaningFee.toLocaleString('en-ZA')}</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-body)' }}>
                            <span style={{ textDecoration: 'underline' }}>Gap A Month Service fee</span>
                            <span style={{ color: 'var(--color-water)', fontWeight: 600 }}>R0 (Waived)</span>
                          </div>

                          <div
                            style={{
                              borderTop: '1px solid var(--border-color)',
                              paddingTop: '14px',
                              marginTop: '6px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              fontSize: '15px',
                              fontWeight: 700,
                              color: 'var(--text-heading)',
                            }}
                          >
                            <span>Total (30 Nights)</span>
                            <span>R{Math.round(totalPayable).toLocaleString('en-ZA')}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                            *Fully covered for approved grant recipients under the Gap A Month Sanctuary Program.
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* REVIEWS SECTION (Airbnb Grade) */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '40px', paddingTop: '36px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <Star size={20} fill="#1E2827" />
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-heading)' }}>
                    {activePropertyModal.rating ? activePropertyModal.rating.toFixed(2) : '4.98'} ·{' '}
                    {activePropertyModal.reviewCount || 42} reviews
                  </h3>
                </div>

                {/* Sub-ratings breakdown bars */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                    gap: '12px 32px',
                    marginBottom: '32px',
                  }}
                >
                  {[
                    { label: 'Cleanliness', score: '5.0' },
                    { label: 'Accuracy', score: '4.9' },
                    { label: 'Communication', score: '5.0' },
                    { label: 'Location', score: '4.9' },
                    { label: 'Check-in', score: '5.0' },
                    { label: 'Value', score: '4.8' },
                  ].map((sub) => (
                    <div key={sub.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <span style={{ color: 'var(--text-body)' }}>{sub.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '90px', height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
                          <div style={{ width: `${(Number(sub.score) / 5) * 100}%`, height: '100%', backgroundColor: 'var(--text-heading)' }} />
                        </div>
                        <span style={{ fontWeight: 600, fontSize: '12px', minWidth: '22px' }}>{sub.score}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Review Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                  {(activePropertyModal.reviews && activePropertyModal.reviews.length > 0
                    ? activePropertyModal.reviews
                    : [
                        {
                          id: 'rev-def-1',
                          author: 'Lindiwe Ndlovu',
                          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                          date: 'September 2026',
                          rating: 5,
                          content:
                            'The absolute most peaceful sanctuary. Loadshedding happened in town, but the solar battery kept every light, the heater, and fiber internet flawless. Total restoration.',
                          location: 'Johannesburg, South Africa',
                        },
                        {
                          id: 'rev-def-2',
                          author: 'Dr. Johan van der Merwe',
                          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
                          date: 'August 2026',
                          rating: 5,
                          content:
                            'My thirty-day sabbatical here was life changing. The silence, the bird life, and the attention to detail from the host exceeded every expectation.',
                          location: 'Cape Town, South Africa',
                        },
                      ]
                  ).map((review) => (
                    <div key={review.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={review.avatar}
                          alt={review.author}
                          style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-heading)' }}>
                            {review.author}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            {review.date} · {review.location}
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>
                        {review.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* House Rules & Safe Stay */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '36px', paddingTop: '28px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-heading)', marginBottom: '16px' }}>
                  Sanctuary Rules & Safety
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '13px', color: 'var(--text-body)' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>Peace & Quiet</div>
                    <div>Quiet hours from 22:00 to 07:00. This is a designated healing retreat.</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>Check-in & Out</div>
                    <div>Check-in after 14:00 · Checkout before 10:00</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-heading)', marginBottom: '4px' }}>Security</div>
                    <div>Gated perimeter, armed response link, carbon monoxide & smoke alarms installed.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. VACATION BOOKING & PAYMENT CHECKOUT MODAL */}
      {bookingProperty && (
        <BookingCheckoutModal
          property={bookingProperty}
          initialCheckIn={modalCheckIn}
          initialCheckOut={modalCheckOut}
          initialGuests={modalGuests}
          onClose={() => setBookingProperty(null)}
        />
      )}
    </div>
  );
};
