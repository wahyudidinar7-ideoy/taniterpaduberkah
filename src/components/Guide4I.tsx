/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Beaker,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Droplet,
  FileText,
  FlaskConical,
  HelpCircle,
  Leaf,
  ShieldCheck,
  Sparkles,
  Tv,
  Volume2
} from 'lucide-react';
import { ENAM_TANAMAN_MATA_AIR, GUIDES_4I, KEMANDIRIAN_BAYU_GUIDES } from '../data/initialData';
import { Guide4IItem } from '../types';

export const Guide4I: React.FC = () => {
  const [activeGuideId, setActiveGuideId] = useState<'icm' | 'inm' | 'ipm' | 'imm' | 'kemandirian_bayu'>('icm');
  const [completedSteps, setCompletedSteps] = useState<{ [key: string]: boolean }>({});
  const [checkedIngredients, setCheckedIngredients] = useState<{ [key: string]: boolean }>({});
  const [showVideoText, setShowVideoText] = useState<boolean>(true);
  const [selectedBayuGuideId, setSelectedBayuGuideId] = useState<string>('bibit_sendiri');

  const currentGuide: Guide4IItem | undefined =
    GUIDES_4I.find((g) => g.id === activeGuideId);

  const toggleStep = (stepNumber: number) => {
    const key = `${activeGuideId}-step-${stepNumber}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleIngredient = (idx: number) => {
    const key = `${activeGuideId}-ing-${idx}`;
    setCheckedIngredients((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 text-xs font-bold mb-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-teal-700" />
              <span>Sains Terpadu KP4 UGM & Kemandirian Bayu Diningrat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Panduan Praktik Sains 4I & Kemandirian Petani
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              4 Pilar Sains KP4 UGM (ICM, INM, IPM, IMM) + Ajaran Kemandirian Bayu Diningrat (BSM & PTS).
              Semua 100% organik tanpa pupuk sintetis atau racun kimia.
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 self-start sm:self-auto">
            Zero Kimia Sintetik
          </span>
        </div>

        {/* 5 Tabs: ICM, INM, IPM, IMM, Kemandirian Bayu */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5 pt-4 border-t border-slate-100">
          {GUIDES_4I.map((item) => {
            const isActive = activeGuideId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveGuideId(item.id)}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{item.emoji}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      isActive ? 'bg-emerald-800 text-amber-300' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.code}
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className={`font-bold text-xs sm:text-sm ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <p
                    className={`text-[10px] line-clamp-1 mt-0.5 ${
                      isActive ? 'text-emerald-100' : 'text-slate-500'
                    }`}
                  >
                    {item.fokus.split(':')[0]}
                  </p>
                </div>
              </button>
            );
          })}

          {/* Tab Baru Ke-5: Kemandirian Bayu */}
          <button
            onClick={() => setActiveGuideId('kemandirian_bayu')}
            className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between col-span-2 sm:col-span-1 ${
              activeGuideId === 'kemandirian_bayu'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-300 font-bold'
                : 'bg-amber-50/80 text-amber-950 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">🌿</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                  activeGuideId === 'kemandirian_bayu'
                    ? 'bg-slate-950 text-amber-300'
                    : 'bg-amber-200 text-amber-900'
                }`}
              >
                BSM
              </span>
            </div>
            <div className="mt-2">
              <h3 className="font-bold text-xs sm:text-sm">Kemandirian Bayu</h3>
              <p
                className={`text-[10px] line-clamp-1 mt-0.5 ${
                  activeGuideId === 'kemandirian_bayu' ? 'text-slate-900' : 'text-amber-800'
                }`}
              >
                5 Panduan & Mata Air
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Guide Content Body */}
      {activeGuideId === 'kemandirian_bayu' ? (
        <div className="space-y-6">
          {/* Header BSM */}
          <div className="bg-gradient-to-br from-amber-500/20 via-emerald-50/60 to-white rounded-2xl p-5 border border-amber-300 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌿</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Ajaran Kemandirian Bayu Diningrat (BSM & PTS)
                  </h3>
                  <p className="text-xs text-amber-900 font-semibold">
                    Bayu Sehat Mandiri & Petani Teman Sejati
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold border border-amber-500 self-start sm:self-auto">
                Guru Kemandirian Petani
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/15 border-l-4 border-amber-500 text-xs sm:text-sm text-slate-900 italic font-medium space-y-1">
              <p>&ldquo;Apa yang ada, jangan mengada-ada. Mulai dari yang kecil, yang ikhlas kita kehilangan.&rdquo;</p>
              <p className="font-bold text-emerald-950 not-italic">&ldquo;Bertani adalah ibadah.&rdquo;</p>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kemandirian sejati adalah saat petani tidak lagi bergantung pada input luar yang mahal:
              bibit buat sendiri, pupuk NPK racik dari ternak sendiri, pakan buat dari azolla dan singkong,
              bahkan jika tidak punya sawah bisa membuat &ldquo;sawah palsu&rdquo; di galon atau karung pekarangan.
            </p>
          </div>

          {/* 5 Panduan Singkat Bayu Diningrat */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <span>5 Panduan Singkat Kemandirian Bayu Diningrat</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kunci kedaulatan petani tanpa hutang: bibit, pupuk NPK ternak, pakan gratis, sawah palsu, dan apotek herbal pekarangan.
              </p>
            </div>

            {/* Quick selector of 5 Bayu guides */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {KEMANDIRIAN_BAYU_GUIDES.map((bg) => {
                const isSelected = selectedBayuGuideId === bg.id;
                return (
                  <button
                    key={bg.id}
                    onClick={() => setSelectedBayuGuideId(bg.id)}
                    className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-400 font-bold text-slate-950 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xl">{bg.emoji}</span>
                      <h4 className="text-xs font-bold mt-1 line-clamp-2">{bg.title.split('(')[0]}</h4>
                    </div>
                    <span className="text-[10px] text-emerald-800 font-semibold mt-1 line-clamp-1">
                      {bg.sub}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Bayu Guide Detail */}
            {(() => {
              const bg =
                KEMANDIRIAN_BAYU_GUIDES.find((g) => g.id === selectedBayuGuideId) ||
                KEMANDIRIAN_BAYU_GUIDES[0];
              return (
                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-amber-50/50 via-slate-50 to-white border border-amber-200 space-y-3 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{bg.emoji}</span>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">{bg.title}</h4>
                        <p className="text-xs text-amber-900 font-semibold">{bg.sub}</p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      💡 {bg.prinsip}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                      Langkah & Prosedur Praktik:
                    </span>
                    <div className="space-y-1.5">
                      {bg.langkah.map((step, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2 text-xs text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-950">
                    <strong>Takaran & Manfaat: </strong>
                    <span>{bg.resepDosis}</span>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Daftar Wajib: 6 Tanaman Mata Air */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span className="text-xl">💧</span>
                  <span>Daftar 6 Tanaman Mata Air Bayu Diningrat</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tanaman pelindung air tanah dan tabungan jangka panjang untuk iklim pesisir Pamotan Kalipucang.
                </p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-800 font-bold border border-teal-200 self-start sm:self-auto">
                Konservasi Air & Cuan
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {ENAM_TANAMAN_MATA_AIR.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="text-[10px] font-mono text-slate-400 italic">
                        {item.namaLatin}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 mt-1.5">{item.nama}</h4>
                    <p className="text-xs text-slate-600 mt-1 leading-snug">
                      {item.peranEkologis}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-200 text-xs space-y-1">
                    <div className="text-emerald-800 font-bold bg-white p-1.5 rounded border border-emerald-100">
                      💰 {item.nilaiEkonomi}
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      📍 <strong>Lokasi Tanam:</strong> {item.rekomendasiTanam}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : currentGuide ? (
        <div className="space-y-5">
          {/* Active Module Overview Card */}
          <div className="bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{currentGuide.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-800 text-emerald-100 text-xs font-mono font-bold">
                      {currentGuide.code}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{currentGuide.title}</h3>
                  </div>
                  <p className="text-xs text-emerald-800 font-semibold mt-0.5">{currentGuide.kepanjangan}</p>
                </div>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300 self-start sm:self-auto">
                Rujukan: {currentGuide.tokohKait}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentGuide.deskripsi}
            </p>

            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950 font-medium">
              <strong className="text-emerald-900 font-bold">Fokus Praktik Pamotan: </strong>
              <span>{currentGuide.fokus}</span>
            </div>
          </div>

          {/* 5 Langkah Praktis Terstruktur */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                  5
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  5 Langkah SOP Praktik Lapangan
                </h3>
              </div>
              <span className="text-xs text-slate-500">Klik tanda centang jika sudah dipraktikkan</span>
            </div>

            <div className="space-y-3">
              {currentGuide.langkah.map((l) => {
                const stepKey = `${activeGuideId}-step-${l.step}`;
                const isDone = completedSteps[stepKey];
                return (
                  <div
                    key={l.step}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : 'bg-slate-50/70 border-slate-200 hover:border-emerald-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleStep(l.step)}
                          className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer transition-all shrink-0 mt-0.5 ${
                            isDone
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'border-2 border-slate-300 hover:border-emerald-500 bg-white'
                          }`}
                          title="Tandai Selesai"
                        >
                          {isDone && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                        <div>
                          <h4
                            className={`text-sm font-bold ${
                              isDone ? 'line-through text-slate-500' : 'text-slate-900'
                            }`}
                          >
                            Langkah {l.step}: {l.title}
                          </h4>
                          <p className="text-xs text-slate-700 mt-1 leading-relaxed">{l.detail}</p>
                          <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded inline-block font-medium">
                            💡 <strong>Tips Petani:</strong> {l.tips}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dosis & Takaran Formula Akurat */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Beaker className="w-5 h-5 text-teal-700" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Tabel Dosis, Takaran & Formula Terukur
                </h3>
                <p className="text-xs text-slate-500">
                  Patuhi takaran organik ini agar tanaman menerima nutrisi seimbang tanpa overdosis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentGuide.dosisTakaran.map((dosis, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-teal-50/70 border border-teal-200 text-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wider block">
                      Formula {idx + 1}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 mt-1">{dosis.bahan}</h4>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-teal-200/80 space-y-1">
                    <div className="text-xs font-black text-emerald-800 bg-white px-2 py-1 rounded border border-teal-200">
                      Takaran: {dosis.takaran}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{dosis.kegunaan}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resep Khusus Tanah Pasir Pesisir Pamotan */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Leaf className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentGuide.resepKhususPesisir.judul}
                </h3>
                <p className="text-xs text-slate-500">
                  Resep formulasi khusus memanfaatkan bahan lokal melimpah di pesisir Kalipucang & Pangandaran.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Bahan-bahan checklist */}
              <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                  Bahan Baku Yang Perlu Disiapkan:
                </h4>
                <div className="space-y-1.5">
                  {currentGuide.resepKhususPesisir.bahan.map((item, idx) => {
                    const key = `${activeGuideId}-ing-${idx}`;
                    const isChecked = checkedIngredients[key];
                    return (
                      <button
                        key={idx}
                        onClick={() => toggleIngredient(idx)}
                        className="w-full text-left bg-white p-2 rounded-lg border border-amber-200 flex items-center justify-between text-xs cursor-pointer hover:bg-amber-100/40"
                      >
                        <span className={isChecked ? 'line-through text-slate-400' : 'font-medium text-slate-800'}>
                          {item}
                        </span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-amber-600 text-white' : 'border border-slate-300'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cara Pembuatan */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Cara Pembuatan & Aplikasi:
                </h4>
                <div className="space-y-1.5">
                  {currentGuide.resepKhususPesisir.cara.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Video Teks (Naskah Edukasi Lapangan) */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Tv className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">
                    Naskah Video Edukasi Lapangan Petani Pamotan
                  </h3>
                  <p className="text-xs text-slate-400">
                    Panduan lisan bahasa santai petani untuk video penyuluhan atau workshop warga desa.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVideoText(!showVideoText)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
              >
                <span>{showVideoText ? 'Sembunyikan' : 'Buka Naskah'}</span>
                {showVideoText ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {showVideoText && (
              <div className="space-y-2.5 animate-in fade-in">
                {currentGuide.videoTeks.map((vt, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-amber-400 font-mono text-[11px]">
                      <span className="font-bold">⏱ {vt.waktu}</span>
                      <span className="text-slate-400 font-sans italic text-[10px]">
                        Adegan: {vt.adegan}
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed italic">{vt.narasi}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
