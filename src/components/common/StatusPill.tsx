import React from 'react';

interface StatusPillProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({
  status,
  size = 'md',
  className = '',
  label,
}) => {
  const normalized = status.toLowerCase().replace(/\s+/g, '_');

  // Determine pill type: green, amber, blue, red, purple
  let type: 'green' | 'amber' | 'blue' | 'red' | 'purple' = 'blue';

  if (
    [
      'approved',
      'confirmed',
      'active',
      'active_gap_month',
      'fulfilled',
      'resolved',
      'completed',
      'verified',
      'very_good',
      'good',
      'low',
    ].includes(normalized)
  ) {
    type = 'green';
  } else if (
    [
      'under_review',
      'under_inspection',
      'pending',
      'in_progress',
      'in_delivery',
      'struggling',
      'medium',
      'acknowledged',
      'okay',
      'rescheduled',
    ].includes(normalized)
  ) {
    type = 'amber';
  } else if (
    [
      'critical',
      'urgent',
      'high',
      'open',
      'rejected',
      'cancelled',
      'missed',
      'very_bad',
    ].includes(normalized)
  ) {
    type = 'red';
  } else if (
    [
      'submitted',
      'new',
      'assessment',
      'accommodation_matching',
      'standard',
      'scheduled',
      'info',
      '30_days',
      '60_days',
      '90_days',
    ].includes(normalized)
  ) {
    type = 'blue';
  }

  // Styles map
  const colorStyles = {
    green: {
      bg: 'var(--status-green-bg, #DCFCE7)',
      text: 'var(--status-green-text, #15803D)',
      border: 'var(--status-green-border, #BBF7D0)',
    },
    amber: {
      bg: 'var(--status-amber-bg, #FEF3C7)',
      text: 'var(--status-amber-text, #B45309)',
      border: 'var(--status-amber-border, #FDE68A)',
    },
    blue: {
      bg: 'var(--status-blue-bg, #E0F2FE)',
      text: 'var(--status-blue-text, #0369A1)',
      border: 'var(--status-blue-border, #BAE6FD)',
    },
    red: {
      bg: 'var(--status-red-bg, #FEE2E2)',
      text: 'var(--status-red-text, #B91C1C)',
      border: 'var(--status-red-border, #FECACA)',
    },
    purple: {
      bg: 'var(--status-purple-bg, #F3E8FF)',
      text: 'var(--status-purple-text, #7E22CE)',
      border: 'var(--status-purple-border, #E9D5FF)',
    },
  }[type];

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 12px', fontSize: '12px' },
    lg: { padding: '6px 16px', fontSize: '13px' },
  }[size];

  // Readable label
  const displayLabel =
    label ||
    status
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: colorStyles.bg,
        color: colorStyles.text,
        border: `1px solid ${colorStyles.border}`,
        borderRadius: '9999px',
        fontWeight: 600,
        letterSpacing: '0.01em',
        lineHeight: 1.3,
        whiteSpace: 'nowrap',
        ...sizeStyles,
      }}
    >
      <span
        style={{
          width: size === 'sm' ? '5px' : '6px',
          height: size === 'sm' ? '5px' : '6px',
          borderRadius: '50%',
          backgroundColor: colorStyles.text,
        }}
      />
      {displayLabel}
    </span>
  );
};
