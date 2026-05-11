import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Shield, Info, ScrollText, Phone } from "lucide-react";

interface CardData {
  id: number;
  imageUrl: string;
  title: string;
  type: string;
  desc: string;
  fullBrief: string;
  rules: string[];
  registerUrl: string;
  fee?: string;
  prize?: string;
  players?: string;
  contacts: { name: string; phone: string }[];
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: CardData | null;
}

export default function EventModal({ isOpen, onClose, event }: EventModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl md:max-h-[90vh] h-[95vh] md:h-auto bg-[#0c0c0e] border-t md:border border-gold/20 shadow-[0_0_100px_rgba(212,175,55,0.15)] overflow-hidden flex flex-col md:flex-row rounded-t-3xl md:rounded-sm"
          >
            {/* Roman Texture & Patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
            <div className="absolute inset-4 border border-gold/5 pointer-events-none hidden md:block" />

            {/* Close Button - More prominent on mobile */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[60] text-gold/60 hover:text-gold transition-colors p-3 bg-black/40 md:bg-gold/5 backdrop-blur-md rounded-full border border-gold/10"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>

            {/* Left Side - Visuals (Top on Mobile) */}
            <div className="w-full md:w-2/5 p-6 md:p-12 bg-gradient-to-b from-gold/10 to-transparent flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gold/10 shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gold/10 blur-3xl rounded-full" />
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-40 h-40 md:w-72 md:h-72 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                />
              </motion.div>
              
            </div>

            {/* Right Side - Content */}
            <div 
              className="w-full md:w-3/5 p-6 md:p-12 overflow-y-auto relative custom-scrollbar flex-grow"
              data-lenis-prevent
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(212, 175, 55, 0.15);
                  border-radius: 10px;
                }
              `}} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="font-display text-3xl md:text-6xl text-gold-gradient mb-3 md:mb-4 tracking-widest uppercase text-center md:text-left">
                  {event.title}
                </h2>
                
                <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                  <div className="h-px w-6 md:w-8 bg-gold/40" />
                  <p className="font-body italic text-parchment/60 text-[0.7rem] md:text-sm">
                    Colosseum MMXXVI · BEC Creative Spectrum
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-10 border-y border-gold/10 py-6">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-heading text-[0.55rem] text-gold/40 tracking-[0.2em] uppercase mb-1">Players</span>
                    <span className="font-display text-sm md:text-base text-parchment tracking-wide">{event.players || "N/A"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-heading text-[0.55rem] text-gold/40 tracking-[0.2em] uppercase mb-1">Registration</span>
                    <span className="font-display text-sm md:text-base text-parchment tracking-wide">{event.fee || "Free"}</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-heading text-[0.55rem] text-gold/40 tracking-[0.2em] uppercase mb-1">Prize Pool</span>
                    <span className="font-display text-sm md:text-base text-crimson tracking-widest font-bold">{event.prize || "Glory"}</span>
                  </div>
                </div>

                {/* Brief Section */}
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gold/10 rounded-sm border border-gold/20">
                      <Info size={18} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-gold-gradient">
                      The Vision
                    </h3>
                  </div>
                  <p className="font-body text-parchment/90 leading-relaxed text-sm md:text-lg italic">
                    {event.fullBrief}
                  </p>
                </div>

                {/* Rules Section */}
                <div className="mb-8 md:mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gold/10 rounded-sm border border-gold/20">
                      <ScrollText size={18} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-gold-gradient">
                      Protocols
                    </h3>
                  </div>
                  <ul className="space-y-4 md:space-y-5">
                    {event.rules.map((rule, idx) => (
                      <li key={idx} className="flex gap-4 group">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-gold/30 shrink-0" />
                        <p className="font-body text-parchment/70 text-[0.8rem] md:text-sm leading-relaxed">
                          {rule}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contacts Section */}
                <div className="mb-10 md:mb-14">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gold/10 rounded-sm border border-gold/20">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <h3 className="font-heading text-xs md:text-sm tracking-[0.4em] uppercase font-bold text-gold-gradient">
                      Coordinators
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {event.contacts.map((contact, idx) => (
                      <div key={idx} className="flex items-center justify-between border border-gold/10 p-4 rounded-xl bg-gold/5 backdrop-blur-sm">
                        <div className="flex flex-col">
                          <span className="font-heading text-[0.55rem] text-gold/50 tracking-widest uppercase mb-0.5">
                            {contact.name}
                          </span>
                          <span className="font-body text-parchment text-sm tracking-wider">
                            {contact.phone}
                          </span>
                        </div>
                        <a 
                          href={`tel:${contact.phone}`}
                          className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all"
                        >
                          <Phone size={14} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Register Button */}
                <div className="pt-8 border-t border-gold/10 sticky bottom-0 bg-[#0c0c0e]/80 backdrop-blur-md -mx-6 px-6 pb-6 md:static md:bg-transparent md:p-0 md:border-0 md:mt-0">
                  <a
                    href={event.registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-gold w-full md:w-auto md:inline-flex px-10 py-5 text-[#0c0c0e] font-heading text-[0.7rem] tracking-[0.4em] uppercase font-bold hover:bg-parchment transition-all duration-500 group overflow-hidden relative shadow-[0_0_30px_rgba(212,175,55,0.3)] rounded-full md:rounded-sm"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Register Now <ExternalLink size={14} />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
