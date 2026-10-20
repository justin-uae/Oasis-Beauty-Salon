import Image from 'next/image';
import type {MediaItem} from '@/app/data/media';

// Videos play muted and looped; controls let visitors unmute or go full screen.
export default function Media({item, sizes, className = ''}: {item: MediaItem; sizes: string; className?: string}) {
  if (item.type === 'video') {
    return (
      <video
        className={'absolute inset-0 w-full h-full object-cover ' + className}
        src={item.src}
        poster={item.poster}
        aria-label={item.alt}
        muted
        loop
        playsInline
        controls
        preload="none"
      />
    );
  }
  return <Image src={item.src} alt={item.alt} fill sizes={sizes} className={'object-cover ' + className} />;
}
