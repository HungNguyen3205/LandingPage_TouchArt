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
          // Browser prevented unmuted autoplay before user gesture.
          // Listen for the first touch or click anywhere on the page to automatically start.
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
    <aside className="ambient-player" aria-label={vi ? 'Nhạc nền thư giãn' : 'Ambient background music'}>
      <div className="ambient-player-main">
        <button
          type="button"
          onClick={toggleAudio}
          aria-label={
            isPlaying
              ? vi ? 'Tạm dừng nhạc thư giãn' : 'Pause relaxing music'
              : vi ? 'Bật nhạc thư giãn' : 'Play relaxing music'
          }
        >
          {isPlaying ? (
            <>
              <div className="music-waves" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span>{vi ? 'Nhạc thư giãn · Đang phát' : 'Relaxing music · Playing'}</span>
            </>
          ) : (
            <>
              <Music2 size={16} aria-hidden="true" />
              <span>{vi ? 'Bật nhạc thư giãn' : 'Play relaxing music'}</span>
            </>
          )}
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
