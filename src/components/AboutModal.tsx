/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle, ExternalLink, Heart, Info, MapPin, Sparkles, X } from 'lucide-react';
import { GURUS_DATA, PAMOTAN_INFO } from '../data/initialData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [selectedGuruId, setSelectedGuruId] = useState<string>('to_suprapto');

  if (!isOpen) return null;

  const currentGuru = GURUS_DATA.find((g) => g.id === selectedGuruId) || GURUS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-emerald-200 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header modal */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-4 sm:p-6 flex items-start justify-between relative">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GURU & TOKOH INSPIRATOR PERTANIAN TERPADU</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Akar Sains & Kebijaksanaan Petani Mandiri
            </h2>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-2xl">
              Aplikasi ini dibangun dari pemikiran 6 begawan dan pusat riset pertanian terpadu Indonesia,
              dikhususkan untuk petani Desa Pamotan, Kec. Kalipucang, Kab. Pangandaran.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-950 text-emerald-200 hover:text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6 text-slate-800">
          {/* Tokoh Selector Tabs */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
              Pilih Tokoh / Guru Kami (6 Begawan Tani Nusantara):
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {GURUS_DATA.map((guru) => {
                const isSelected = guru.id === selectedGuruId;
                return (
                  <button
                    key={guru.id}
                    onClick={() => setSelectedGuruId(guru.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{guru.emoji}</span>
                      <span className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {guru.nama.split(' ')[0]} {guru.nama.split(' ')[1] || ''}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">{guru.peran}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Guru Detail Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-amber-50/40 to-white rounded-2xl p-5 border border-emerald-200/90 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-2xl shadow-sm">
                  {currentGuru.emoji}
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-slate-900">{currentGuru.nama}</h4>
                  <p className="text-xs text-emerald-800 font-semibold">{currentGuru.asal}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                {currentGuru.konsepUtama}
              </span>
            </div>

            {/* Quote block */}
            <div className="my-3.5 p-3 rounded-xl bg-amber-500/10 border-l-4 border-amber-500 text-xs sm:text-sm text-amber-950 font-medium italic">
              {currentGuru.quote}
            </div>

            {/* Core points */}
            <div className="space-y-2 mt-4">
              <h5 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                Gagasan Inti & Doktrin Praktik:
              </h5>
              <div className="space-y-2">
                {currentGuru.poinKunci.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative explanation */}
            <p className="text-xs text-slate-600 mt-3.5 pt-3 border-t border-emerald-200/60 leading-relaxed">
              {currentGuru.penjelasan}
            </p>
          </div>

          {/* 5 Tokoh Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Award className="w-4 h-4 text-amber-600" />
                4 Tangga Menuju Kebebasan Finansial (T.O. Suprapto)
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold">Tangga 1: Ketahanan Pangan</span>
                  <span className="text-[11px] text-slate-500">Makan cukup dari pekarangan</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold">Tangga 2: Kemandirian Pangan</span>
                  <span className="text-[11px] text-slate-500">Stop beli pupuk & pakan</span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="font-semibold">Tangga 3: Kedaulatan Pangan</span>
                  <span className="text-[11px] text-slate-500">Tentukan harga sendiri</span>
                </div>
                <div className="p-2 rounded bg-emerald-100 border border-emerald-300 flex items-center justify-between text-emerald-950">
                  <span className="font-bold">Tangga 4: Kedaulatan Ekonomi</span>
                  <span className="text-[11px] font-semibold text-emerald-800">Bebas Finansial Seutuhnya</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Sains 4I, Bisnis 5A & 6M (KP4 UGM)
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="p-2 rounded bg-white border border-slate-200">
                  <strong className="text-emerald-800">Sains 4I:</strong> ICM (Tanaman Bersaf), INM (Kasgot & POC), IPM (Pestisida Bawang Kelapa), IMM (Tata Air Pesisir Tetes).
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <strong className="text-cyan-800">Bisnis 5A:</strong> Agro-Production, Agro-Business, Agro-Technology, Agro-Industry, Agro-Tourism.
                </div>
                <div className="p-2 rounded bg-white border border-slate-200">
                  <strong className="text-amber-800">Manajemen 6M:</strong> Man (Jadwal Petani), Money (Jurnal Keuangan), Material, Method, Machine, Market Pamotan.
                </div>
              </div>
            </div>
          </div>

          {/* Konteks Spesifik Desa Pamotan Kalipucang */}
          <div className="p-4 rounded-xl bg-cyan-900/10 border border-cyan-800/30 text-slate-800">
            <div className="flex items-center gap-2 mb-2 text-cyan-950 font-bold text-sm">
              <MapPin className="w-4 h-4 text-cyan-700" />
              <span>Penerapan Khusus untuk Desa Pamotan, Kec. Kalipucang, Kab. Pangandaran</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Desa Pamotan berbatasan dengan muara Sungai Citanduy dan muara pesisir selatan Pangandaran.
              Tanah didominasi lempung berpasir yang sangat cepat kering terkena terik matahari pesisir.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              {PAMOTAN_INFO.tantanganSolusi.map((ts, idx) => (
                <div key={idx} className="bg-white p-2.5 rounded-lg border border-cyan-200/80 shadow-2xs">
                  <span className="text-[10px] font-bold text-rose-700 uppercase block mb-1">
                    Tantangan {idx + 1}: {ts.tantangan}
                  </span>
                  <span className="text-[11px] text-emerald-800 font-medium block">
                    ➔ Solusi Terpadu: {ts.solusi}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>
            Disarikan dari gagasan T.O. Suprapto, Heri Sunarto, Ir. Gin Gin Ginanjar, Rizki Hamdani, KP4 UGM, dan Bayu Diningrat untuk kemajuan petani Indonesia.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-semibold cursor-pointer w-full sm:w-auto text-center"
          >
            Tutup & Mulai Praktik
          </button>
        </div>
      </div>
    </div>
  );
};
