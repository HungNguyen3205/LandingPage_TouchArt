import { useState, useEffect, useRef } from 'react';
import { Music2 } from 'lucide-react';
import type { Locale } from '../data/content';

export default function AmbientMusic({ locale }: { locale: Locale }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const explicitlyPausedRef = useRef(false);
  const vi = locale === 'vi';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // Attempt autoplay immediately
    const startPromise = audio.play();
    if (startPromise !== undefined) {
      startPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Browser prevented autoplay without user gesture.
          // Listen for first interaction anywhere on the document.
          setIsPlaying(false);

          const handleFirstGesture = () => {
            if (audioRef.current && !explicitlyPausedRef.current) {
              audioRef.current.play().then(() => {
                setIsPlaying(true);
              }).catch(() => {});
            }
            window.removeEventListener('pointerdown', handleFirstGesture);
            window.removeEventListener('touchstart', handleFirstGesture);
            window.removeEventListener('click', handleFirstGesture);
            window.removeEventListener('keydown', handleFirstGesture);
          };

          window.addEventListener('pointerdown', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('click', handleFirstGesture, { once: true, passive: true });
          window.addEventListener('keydown', handleFirstGesture, { once: true, passive: true });
        });
    }
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      explicitlyPausedRef.current = true;
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        explicitlyPausedRef.current = false;
      }).catch(() => {});
    }
  };

  return (
    <aside className="ambient-player" aria-label={vi ? 'Nhạc thư giãn Touch Art' : 'Touch Art ambient sound'}>
      <div className="ambient-deck-quote" aria-hidden="true">
        <em>{vi ? 'Lắng nghe cơ thể.' : 'Listen to your body.'}</em>
        <span>{vi ? 'Chăm sóc theo cách của bạn.' : 'Care tailored to you.'}</span>
      </div>
      <div className="ambient-player-main">
        <button
          type="button"
          onClick={toggleAudio}
          className="ambient-pill-btn"
          aria-label={
            isPlaying
              ? vi ? 'Tạm dừng nhạc thư giãn' : 'Pause relaxing music'
              : vi ? 'Lắng nghe & thả lỏng' : 'Listen & unwind'
          }
        >
          <span className="ambient-pill-icon" aria-hidden="true">
            {isPlaying ? (
              <div className="music-waves">
                <i />
                <i />
                <i />
              </div>
            ) : (
              <Music2 size={16} />
            )}
          </span>
          <span className="ambient-pill-label">
            {isPlaying
              ? (vi ? 'Đang phát · Nhạc thư giãn' : 'Playing · Relaxing music')
              : (vi ? 'Lắng nghe & thả lỏng' : 'Listen & unwind')}
          </span>
        </button>
      </div>
      <audio
        ref={audioRef}
        src="/audio/touch-art-ambient.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </aside>
  );
}
