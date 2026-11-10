/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Heart, MapPin, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout }) => {
  return (
    <footer className="mt-12 bg-emerald-950 text-white border-t border-emerald-800/80">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="text-2xl">🌾</span>
              <h3 className="font-bold text-base tracking-tight text-white">
                TANI TERPADU BERKAH - Integrated Farming Pamotan
              </h3>
            </div>
            <p className="text-xs text-emerald-300 font-medium italic mt-1">
              &ldquo;Satu Lahan, Banyak Panen, Zero Waste, Bebas Finansial&rdquo;
            </p>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-[11px] text-emerald-400 mt-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>Desa Pamotan, Kec. Kalipucang, Kab. Pangandaran, Jawa Barat</span>
            </div>
          </div>

          {/* About link button */}
          <div className="flex flex-col items-center md:items-end gap-2">
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-amber-300 hover:text-amber-200 text-xs font-semibold border border-emerald-700/60 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Pelajari 6 Guru & Tokoh Tani Kami</span>
            </button>
            <span className="text-[11px] text-emerald-400 font-mono">
              Vercel Ready • 100% Organik • Data Lokal Aman
            </span>
          </div>
        </div>

        {/* Wajib: Exact quotation required by user */}
        <div className="mt-6 pt-6 border-t border-emerald-800/70 text-center">
          <p className="text-xs text-emerald-200/90 font-medium leading-relaxed max-w-3xl mx-auto">
            Disarikan dari gagasan T.O. Suprapto, Heri Sunarto, Ir. Gin Gin Ginanjar, Rizki Hamdani, KP4 UGM, dan Bayu Diningrat untuk kemajuan petani Indonesia.
          </p>
          <p className="text-[10px] text-emerald-500 mt-2">
            © {new Date().getFullYear()} Tani Terpadu Berkah Pamotan. Dirancang dengan penuh ketulusan untuk kemandirian pangan Nusantara.
          </p>
        </div>
      </div>
    </footer>
  );
};
