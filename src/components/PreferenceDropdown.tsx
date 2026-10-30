import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Sparkles, User, Users } from 'lucide-react';
import type { Locale } from '../data/content';

interface PreferenceDropdownProps {
  locale: Locale;
  value: string;
  onChange: (value: string) => void;
  id?: string;
}

export default function PreferenceDropdown({
  locale,
  value,
  onChange,
  id = 'booking-preference'
}: PreferenceDropdownProps) {
  const vi = locale === 'vi';
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  const options = [
    {
      value: 'none',
      label: vi ? 'Không yêu cầu' : 'No preference',
      desc: vi ? 'Linh hoạt, sắp xếp kỹ thuật viên phù hợp nhất' : 'Flexible, arranged according to best match',
      icon: Sparkles
    },
    {
      value: 'female',
      label: vi ? 'Kỹ thuật viên Nữ' : 'Female therapist',
      desc: vi ? 'Ưu tiên người thực hiện là nữ' : 'Preference for female therapist',
      icon: User
    },
    {
      value: 'male',
      label: vi ? 'Kỹ thuật viên Nam' : 'Male therapist',
      desc: vi ? 'Ưu tiên người thực hiện là nam' : 'Preference for male therapist',
      icon: User
    }
  ];

  const currentOption = options.find(o => o.value === value) || options[0];
  const CurrentIcon = currentOption.icon;

  // Auto flip upward if close to bottom of viewport
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 220 && rect.top > 200) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  function handleSelect(val: string) {
    onChange(val);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = options.findIndex(o => o.value === value);
        const nextIndex = e.key === 'ArrowDown'
          ? (currentIndex + 1) % options.length
          : (currentIndex - 1 + options.length) % options.length;
        onChange(options[nextIndex].value);
      }
    } else if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  }

  return (
    <div
      className={`touch-preference-wrapper ${isOpen ? 'is-open' : ''}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden native select for standard browser autofill and accessibility */}
      <select
        id={id}
        className="visually-hidden-select"
        tabIndex={-1}
        aria-hidden="true"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      {/* Luxury Custom Trigger */}
      <button
        ref={triggerRef}
        type="button"
        className="touch-preference-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <div className="preference-trigger-content">
          <div className="preference-badge-icon">
            <CurrentIcon size={15} />
          </div>
          <div className="preference-meta">
            <span className="preference-selected-title">{currentOption.label}</span>
            <span className="preference-selected-desc">{currentOption.desc}</span>
          </div>
        </div>

        <div className={`select-chevron ${isOpen ? 'open' : ''}`}>
          <ChevronDown size={18} />
        </div>
      </button>

      {/* Floating Dropdown Listbox */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className={`touch-preference-menu ${openUpward ? 'open-upward' : ''}`}
        >
          {options.map(option => {
            const isSelected = option.value === value;
            const Icon = option.icon;
            return (
              <div
                key={option.value}
                role="option"
                aria-selected={isSelected}
                className={`preference-option-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                <div className="option-icon-box">
                  <Icon size={16} />
                </div>
                <div className="preference-option-info">
                  <div className="preference-option-label">{option.label}</div>
                  <div className="preference-option-desc">{option.desc}</div>
                </div>
                {isSelected && (
                  <div className="preference-check-icon">
                    <Check size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
