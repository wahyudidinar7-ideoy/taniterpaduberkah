/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, HelpCircle, MapPin, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenAbout }) => {
  const tabs = [
    { id: 'kalkulator1005', label: 'Kalkulator 1005 Bayu', icon: '🎯', short: '1005 Bayu' },
    { id: 'dashboard', label: 'Siklus Zero Waste', icon: '♻️', short: 'Siklus' },
    { id: 'simulator', label: 'Simulator Lahan', icon: '📐', short: 'Simulator' },
    { id: 'panduan4i', label: 'Panduan 4I & Bayu', icon: '🔬', short: 'Panduan' },
    { id: 'kalender', label: 'Kalender Panen', icon: '📅', short: 'Panen' },
    { id: 'keuangan', label: 'Keuangan & Sekolah', icon: '💰', short: 'Keuangan' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-emerald-950 text-white shadow-lg border-b border-emerald-800/80">
      {/* Top micro bar for location and identity */}
      <div className="bg-emerald-900/90 px-3 py-1.5 text-xs border-b border-emerald-800/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-medium text-white">Desa Pamotan</span>
            <span className="hidden sm:inline text-emerald-400">• Kec. Kalipucang, Kab. Pangandaran, Jawa Barat</span>
            <span className="text-amber-300 font-semibold ml-1">(Pesisir & Pasir Subur)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px] font-medium border border-amber-500/30">
              100% Organik • Zero Waste
            </span>
            <button
              onClick={onOpenAbout}
              className="inline-flex items-center gap-1 text-emerald-200 hover:text-white transition-colors cursor-pointer text-xs"
              title="Pelajari 5 Guru & Tokoh Inspirator"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-300" />
              <span className="underline decoration-dotted font-medium">Guru & Tokoh Kami</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-500 to-emerald-700 flex items-center justify-center text-2xl shadow-md shadow-emerald-950/50 border border-amber-300/40 shrink-0">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  TANI TERPADU BERKAH
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-800 text-emerald-200 font-mono font-normal">
                    Pamotan
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-emerald-300 font-medium italic mt-0.5">
                &ldquo;Satu Lahan, Banyak Panen, Zero Waste, Bebas Finansial&rdquo;
              </p>
            </div>
          </div>

          {/* Quick Action Button to Open Tokoh & Guru */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>Tentang & Guru Kami</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Mandatory Navigation Menus */}
      <nav className="bg-emerald-900/60 border-t border-emerald-800/80 px-2 sm:px-4 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 py-1.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-900/40 ring-2 ring-amber-300/70 font-bold'
                    : 'text-emerald-100 hover:bg-emerald-800/70 hover:text-white'
                }`}
              >
                <span className="text-base sm:text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.short}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
