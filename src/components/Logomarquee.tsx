import React from 'react';
import { cardData } from './EventCarousel';

function Logomarquee() {
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
      @keyframes marquee-move {
        to {
          transform: translateX(calc(-100% - var(--item-gap)));
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const logos = cardData.map(event => ({
    id: event.id,
    image: event.imageUrl,
    title: event.title
  }));

  const Marquee = ({ direction = 'forwards' }: { direction?: string }) => {
    const numItems = logos.length;
    const speed = '30s';
    const itemWidth = '140px';
    const itemGap = '32px';

    return (
      <div
        className="max-w-full overflow-hidden py-12"
        style={{
          '--speed': speed,
          '--item-width': itemWidth,
          '--item-gap': itemGap,
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        } as React.CSSProperties}
      >
        <div
          className="w-max flex"
          style={{
            animation: `marquee-move var(--speed) linear infinite ${direction === 'reverse' ? 'reverse' : 'normal'}`,
          } as React.CSSProperties}
        >
          {[...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.id}-${index}`}
              className="flex-shrink-0 flex flex-col justify-center items-center bg-gold/[0.03] border border-gold/10 rounded-2xl p-6 transition-all hover:bg-gold/[0.08] hover:border-gold/30 group"
              style={{
                width: 'var(--item-width)',
                aspectRatio: '1 / 1.2',
                marginRight: 'var(--item-gap)',
              } as React.CSSProperties}
            >
              <img 
                src={logo.image} 
                alt={logo.title} 
                className="w-full h-auto object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500"
              />
              <span className="font-heading text-[0.5rem] text-gold/40 tracking-widest uppercase mt-4 text-center group-hover:text-gold transition-colors">
                {logo.title}
              </span>
              <span className="font-heading text-[0.4rem] text-gold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-60 transition-opacity mt-1">
                Click to Register
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col gap-y-0 items-center">
      <div className="w-full max-w-7xl">
        <Marquee />
        <Marquee direction="reverse" />
      </div>
    </div>
  );
}

export default Logomarquee;
