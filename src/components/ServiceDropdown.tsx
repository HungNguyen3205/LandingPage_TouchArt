import { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown, Check, Sparkles, Clock, Flower2 } from 'lucide-react';
import { services } from '../data/content';
import type { Locale } from '../data/content';

interface ServiceDropdownProps {
  locale: Locale;
  serviceId: string;
  selectedDuration: string;
  onSelect: (id: string, duration: string) => void;
  hasError?: boolean;
}

export default function ServiceDropdown({
  locale,
  serviceId,
  selectedDuration,
  onSelect,
  hasError = false
}: ServiceDropdownProps) {
  const vi = locale === 'vi';
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();

  // Selected item info
  const currentService = services.find(s => s.id === serviceId);
  const isConsult = !currentService || serviceId === 'consult';

  // Smart position detection: open upward if not enough space below
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // If less than 290px below, flip upward
      if (spaceBelow < 290 && rect.top > 220) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  // Flat list of all selectable options for keyboard navigation
  interface OptionItem {
    id: string;
    duration: string;
    name: string;
    price?: number;
    description?: string;
    isConsult?: boolean;
  }

  const allOptions: OptionItem[] = [
    {
      id: 'consult',
      duration: '60',
      name: vi ? 'Nhờ tư vấn gói phù hợp' : 'Help me choose a treatment',
      description: vi
        ? 'Chuyên viên Touch Art sẽ liên hệ và lắng nghe thể trạng của bạn'
        : 'Our specialist will listen and recommend the ideal treatment',
      isConsult: true
    },
    ...services.flatMap(s =>
      s.durations.map((d, idx) => ({
        id: s.id,
        duration: String(d),
        name: s.name[locale],
        price: s.prices[idx],
        description: s.description[locale],
        isConsult: false
      }))
    )
  ];

  const selectedKey = isConsult ? 'consult:60' : `${serviceId}:${selectedDuration}`;

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else {
        setHighlightedIndex(prev => (prev < allOptions.length - 1 ? prev + 1 : 0));
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(allOptions.length - 1);
      } else {
        setHighlightedIndex(prev => (prev > 0 ? prev - 1 : allOptions.length - 1));
      }
    } else if (e.key === 'Enter') {
      if (isOpen && highlightedIndex >= 0 && highlightedIndex < allOptions.length) {
        e.preventDefault();
        const item = allOptions[highlightedIndex];
        onSelect(item.id, item.duration);
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    } else if (e.key === 'Escape') {
      if (isOpen) {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
  }

  function handleSelectItem(id: string, duration: string) {
    onSelect(id, duration);
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  // Format currency
  const formatPrice = (val: number) =>
    val.toLocaleString(vi ? 'vi-VN' : 'en-US') + ' ₫';

  return (
    <div
      className={`touch-select-wrapper ${isOpen ? 'is-open' : ''} ${hasError ? 'has-error' : ''}`}
      ref={containerRef}
      onKeyDown={handleKeyDown}
    >
      {/* Hidden native select for standard browser autofill and accessibility */}
      <select
        className="visually-hidden-select"
        tabIndex={-1}
        aria-hidden="true"
        value={selectedKey}
        onChange={e => {
          const [id, d] = e.target.value.split(':');
          onSelect(id, d);
        }}
      >
        <option value="consult:60">
          {vi ? 'Nhờ tư vấn gói phù hợp' : 'Help me choose'}
        </option>
        {services.flatMap(s =>
          s.durations.map(d => (
            <option key={s.id + d} value={s.id + ':' + d}>
              {s.name[locale]} · {d} {vi ? 'phút' : 'min'}
            </option>
          ))
        )}
      </select>

      {/* Custom styled trigger button */}
      <button
        type="button"
        id="booking-service"
        ref={triggerRef}
        className="touch-select-trigger"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-invalid={hasError}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <div className="select-trigger-content">
          {isConsult ? (
            <div className="selected-consult-pill">
              <span className="icon-badge sparkles-badge">
                <Sparkles size={14} />
              </span>
              <div className="selected-meta">
                <span className="selected-title">
                  {vi ? 'Nhờ tư vấn gói phù hợp' : 'Help me choose a treatment'}
                </span>
                <span className="selected-sub">
                  {vi ? 'Tư vấn chuyên sâu theo thể trạng' : 'Personalized recommendation'}
                </span>
              </div>
            </div>
          ) : (
            <div className="selected-service-pill">
              <span className="icon-badge service-badge">
                <Flower2 size={14} />
              </span>
              <div className="selected-meta">
                <span className="selected-title">{currentService.name[locale]}</span>
                <div className="selected-tags">
                  <span className="duration-chip">
                    <Clock size={11} />
                    {selectedDuration} {vi ? 'phút' : 'min'}
                  </span>
                  {currentService.prices[currentService.durations.indexOf(Number(selectedDuration))] && (
                    <span className="price-chip">
                      {formatPrice(
                        currentService.prices[
                          currentService.durations.indexOf(Number(selectedDuration))
                        ]
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <span className={`select-chevron ${isOpen ? 'open' : ''}`}>
          <ChevronDown size={18} />
        </span>
      </button>

      {/* Dropdown Menu Popover */}
      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className={`touch-select-menu ${openUpward ? 'open-upward' : ''}`}
          aria-label={vi ? 'Chọn gói dịch vụ quan tâm' : 'Select treatment of interest'}
        >
          {/* Section: Consultation */}
          <button
            type="button"
            role="option"
            aria-selected={isConsult}
            className={`menu-option consult-option ${isConsult ? 'is-selected' : ''}`}
            onClick={() => handleSelectItem('consult', '60')}
          >
            <div className="option-icon-box">
              <Sparkles size={15} />
            </div>
            <div className="option-text">
              <div className="option-header-row">
                <span className="option-name">
                  {vi ? 'Nhờ tư vấn gói phù hợp' : 'Help me choose'}
                </span>
                <span className="consult-tag">{vi ? 'Khuyên dùng' : 'Recommended'}</span>
              </div>
              <span className="option-desc">
                {vi
                  ? 'Gợi ý liệu trình phù hợp nhất theo thể trạng'
                  : 'Tailored recommendations for your body'}
              </span>
            </div>
            <div className="option-status">
              {isConsult && <Check size={16} className="check-icon" />}
            </div>
          </button>

          <div className="menu-divider">
            <span>{vi ? 'Gói trị liệu' : 'Treatments'}</span>
          </div>

          {/* Section: Services List */}
          <div className="menu-services-list">
            {services.map(service => (
              <div key={service.id} className="service-group-section">
                <div className="service-group-title">
                  <Flower2 size={12} />
                  <span>{service.name[locale]}</span>
                </div>

                <div className="duration-options-list">
                  {service.durations.map((d, idx) => {
                    const isSelected = serviceId === service.id && selectedDuration === String(d);
                    const price = service.prices[idx];

                    return (
                      <button
                        key={service.id + ':' + d}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        className={`duration-item-row ${isSelected ? 'is-selected' : ''}`}
                        onClick={() => handleSelectItem(service.id, String(d))}
                      >
                        <div className="item-left">
                          <Clock size={12} className="clock-icon" />
                          <span className="item-name">{service.name[locale]}</span>
                          <span className="item-duration-badge">
                            {d} {vi ? 'phút' : 'min'}
                          </span>
                        </div>

                        <div className="item-right">
                          <span className="item-price">{formatPrice(price)}</span>
                          <span className={`item-check ${isSelected ? 'active' : ''}`}>
                            <Check size={13} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="menu-footer">
            <span>
              {vi
                ? '✦ Giá tham khảo · Xác nhận khi tư vấn'
                : '✦ Reference prices · Confirmed in consultation'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
