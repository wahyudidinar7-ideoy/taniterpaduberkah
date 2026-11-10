/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  Building,
  Calculator,
  Calendar,
  CheckCircle,
  Clock,
  Compass,
  DollarSign,
  Grid,
  Info,
  Maximize2,
  RefreshCw,
  Save,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { FARMING_MODELS } from '../data/initialData';
import { FarmingModelRecommendation } from '../types';
import { SimulatorStoredConfig, StorageService } from '../utils/storage';

interface LandSimulatorProps {
  onApplyModelToHarvests?: () => void;
}

export const LandSimulator: React.FC<LandSimulatorProps> = ({ onApplyModelToHarvests }) => {
  const initialConfig = StorageService.getSimulatorConfig();

  const [landSize, setLandSize] = useState<number>(initialConfig.landSize || 200);
  const [capital, setCapital] = useState<number>(initialConfig.initialCapital || 7500000);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  // Cost overrides for financial calculator
  const [feedCostMonthly, setFeedCostMonthly] = useState<number>(450000);
  const [seedCostMonthly, setSeedCostMonthly] = useState<number>(200000);
  const [operationalCostMonthly, setOperationalCostMonthly] = useState<number>(150000);

  // Determine recommended model based on land size
  let recommendedModelId: 'buruan_sae' | 'vertical_heri' | 'joglo_tani' = 'vertical_heri';
  if (landSize < 200) {
    recommendedModelId = 'buruan_sae';
  } else if (landSize <= 1000) {
    recommendedModelId = 'vertical_heri';
  } else {
    recommendedModelId = 'joglo_tani';
  }

  const [activeModelId, setActiveModelId] = useState<'buruan_sae' | 'vertical_heri' | 'joglo_tani'>(
    recommendedModelId
  );

  // Sync activeModel when landSize changes significantly
  React.useEffect(() => {
    setActiveModelId(recommendedModelId);
  }, [recommendedModelId]);

  const currentModel: FarmingModelRecommendation =
    FARMING_MODELS.find((m) => m.id === activeModelId) || FARMING_MODELS[1];

  // Scale calculations based on landSize
  const scaleFactor = Math.max(0.3, landSize / (activeModelId === 'buruan_sae' ? 80 : activeModelId === 'vertical_heri' ? 300 : 1500));

  const estimatedMonthlyRevenue = Math.round(currentModel.potensiOmzetBulanan * scaleFactor);
  const totalMonthlyExpenses = Math.round(
    (feedCostMonthly + seedCostMonthly + operationalCostMonthly) * (0.7 + scaleFactor * 0.3)
  );
  const estimatedMonthlyNetProfit = Math.max(100000, estimatedMonthlyRevenue - totalMonthlyExpenses);

  // BEP (Break Even Point) in months
  const estimatedBEPMonths = Math.max(1, Number((capital / estimatedMonthlyNetProfit).toFixed(1)));

  // Financial Freedom estimation:
  // Assuming Financial Independence benchmark = Rp 7.500.000 / month net passive/farm cashflow
  // Time to achieve cumulative savings = Capital recovered + 12 months emergency reserve
  const targetFinancialFreedomCapital = capital + 7500000 * 6; // 6 months reserve
  const monthsToFinancialFreedom = Math.max(
    1,
    Math.round(targetFinancialFreedomCapital / estimatedMonthlyNetProfit)
  );
  const yearsToFinancialFreedom = (monthsToFinancialFreedom / 12).toFixed(1);

  const handleSaveConfig = () => {
    const config: SimulatorStoredConfig = {
      landSize,
      initialCapital: capital,
      selectedModelId: activeModelId,
      feedCostPercent: 20
    };
    StorageService.saveSimulatorConfig(config);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  const presetSizes = [60, 150, 300, 500, 1000, 2500];

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-700" />
              <span>Simulasi Cerdas Lahan Pamotan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Simulator Lahan Saya & Denah Tata Letak Terpadu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Masukkan luas pekarangan dan modal Anda. Sistem otomatis merekomendasikan rancangan terbaik
              berdasarkan sains 4I KP4 UGM dan arsitektur tokoh.
            </p>
          </div>
          <button
            onClick={handleSaveConfig}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer self-start sm:self-auto shadow-sm"
          >
            <Save className="w-4 h-4 text-amber-300" />
            <span>Simpan Rancangan</span>
          </button>
        </div>

        {savedNotification && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Rancangan simulasi lahan berhasil disimpan ke memori lokal!</span>
          </div>
        )}

        {/* Input Parameters Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100">
          {/* Luas Lahan */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
              <span>Luas Lahan / Pekarangan Anda (m²):</span>
              <span className="text-emerald-800 font-black text-base">{landSize} m²</span>
            </label>
            <input
              type="range"
              min="20"
              max="3000"
              step="10"
              value={landSize}
              onChange={(e) => setLandSize(Number(e.target.value))}
              className="w-full accent-emerald-700 cursor-pointer"
            />
            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {presetSizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setLandSize(sz)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all cursor-pointer ${
                    landSize === sz
                      ? 'bg-emerald-700 text-white border-emerald-800'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {sz} m²
                </button>
              ))}
            </div>
          </div>

          {/* Modal Awal */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
              <span>Estimasi Modal Awal Tersedia:</span>
              <span className="text-amber-800 font-black text-base">
                Rp {capital.toLocaleString('id-ID')}
              </span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="500000"
                step="500000"
                value={capital}
                onChange={(e) => setCapital(Math.max(500000, Number(e.target.value)))}
                className="w-full p-2 rounded-lg border border-slate-300 text-sm font-semibold focus:outline-emerald-600"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[1500000, 3500000, 7500000, 15000000].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setCapital(cap)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all cursor-pointer ${
                    capital === cap
                      ? 'bg-amber-500 text-slate-950 border-amber-600 font-bold'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Rp {(cap / 1000000).toFixed(1)} Jt
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection Tabs (A, B, C) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {FARMING_MODELS.map((model) => {
          const isSelected = activeModelId === model.id;
          const isAutoRecommended = recommendedModelId === model.id;
          return (
            <button
              key={model.id}
              onClick={() => setActiveModelId(model.id)}
              className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400 shadow-sm'
                  : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isAutoRecommended && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] shadow-2xs">
                  ★ Rekomendasi Luas
                </span>
              )}
              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase">
                  {model.rangeLuas}
                </span>
                <h3 className="font-bold text-base text-slate-900 mt-1">{model.name}</h3>
                <p className="text-xs text-emerald-800 font-semibold mt-0.5">Tokoh: {model.tokoh}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{model.deskripsi}</p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Potensi Laba:</span>
                <span className="font-black text-emerald-700">
                  ~Rp {(model.estimasiLabaBulanan / 1000000).toFixed(1)} Jt/bln
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 2D Interactive Blueprint / Denah Lahan */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-emerald-700" />
              <h3 className="text-lg font-bold text-slate-900">
                Denah Tata Letak Lahan 2D ({currentModel.name})
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Posisi presisi sirkulasi gravitasi: Kandang, Biopond Maggot, Kolam Lele, dan Bedengan Tanaman.
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 self-start sm:self-auto font-medium">
            Skala Luas: {landSize} m²
          </span>
        </div>

        {/* Visual Blueprint Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentModel.denahLayout.map((zone, idx) => {
            const isZoneSelected = selectedZone === zone.zone;
            return (
              <div
                key={idx}
                onClick={() => setSelectedZone(isZoneSelected ? null : zone.zone)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isZoneSelected
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-500">{zone.zone}</span>
                    <span className="text-xl">{zone.emoji}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{zone.title}</h4>
                  <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">{zone.position}</p>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-200/80 text-xs text-slate-600 leading-snug">
                  {zone.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Zone Deep Dive Callout */}
        {selectedZone && (
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-slate-800 text-xs flex items-start gap-2.5 animate-in fade-in">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-amber-950">Detail Rekayasa Ruang {selectedZone}: </strong>
              <span>
                Tata letak ini dirancang agar arah angin barat daya pesisir pantai Kalipucang membantu
                ventilasi kandang tanpa mengganggu pemukiman, dan air kurasan kolam lele mengalir alami via
                gaya gravitasi ke bedengan sayur tanpa perlu pompa listrik.
              </span>
            </div>
          </div>
        )}

        {/* Komponen & Bibit Rekomendasi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {/* Komponen Lahan */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Komponen Fisik di Lahan ({currentModel.komponen.length} Unit):
            </h4>
            <div className="space-y-1.5">
              {currentModel.komponen.map((comp, idx) => (
                <div
                  key={idx}
                  className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <span>{comp.emoji}</span>
                    <span>{comp.nama}</span>
                  </span>
                  <span className="text-slate-500 text-[11px]">{comp.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bibit Rekomendasi Pesisir Pamotan */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Varietas Tanaman & Bibit Pesisir Pamotan:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {currentModel.rekomendasiBibit.map((bibit, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white border border-emerald-200 text-emerald-900 text-xs font-semibold shadow-2xs"
                >
                  🌱 {bibit}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 italic mt-2">
              *Telah teruji tahan salinitas angin laut Kalipucang dan tanah lempung berpasir.
            </p>
          </div>
        </div>
      </div>

      {/* Kalkulator Finansial, Untung Bersih & BEP */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Calculator className="w-5 h-5 text-emerald-700" />
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Kalkulator Kelayakan Bisnis & Balik Modal (BEP)
            </h3>
            <p className="text-xs text-slate-500">
              Perhitungan realistis berbasis biaya pakan mandiri maggot & pupuk gratis kasgot.
            </p>
          </div>
        </div>

        {/* Cost input sliders / overrides */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase block">
              Biaya Pakan Starter (Rp/bln):
            </label>
            <input
              type="number"
              step="50000"
              value={feedCostMonthly}
              onChange={(e) => setFeedCostMonthly(Math.max(0, Number(e.target.value)))}
              className="w-full p-2 bg-white rounded border border-slate-300 text-xs font-bold"
            />
            <span className="text-[10px] text-emerald-700 block">
              *Hemat 60% berkat maggot BSF
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase block">
              Biaya Bibit & Benih (Rp/bln):
            </label>
            <input
              type="number"
              step="25000"
              value={seedCostMonthly}
              onChange={(e) => setSeedCostMonthly(Math.max(0, Number(e.target.value)))}
              className="w-full p-2 bg-white rounded border border-slate-300 text-xs font-bold"
            />
            <span className="text-[10px] text-slate-500 block">
              *Benih ratoon sorgum & bibit lele
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase block">
              Biaya Operasional (Rp/bln):
            </label>
            <input
              type="number"
              step="25000"
              value={operationalCostMonthly}
              onChange={(e) => setOperationalCostMonthly(Math.max(0, Number(e.target.value)))}
              className="w-full p-2 bg-white rounded border border-slate-300 text-xs font-bold"
            />
            <span className="text-[10px] text-slate-500 block">
              *Listrik blower & toren air
            </span>
          </div>
        </div>

        {/* Big Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Estimated Revenue */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
            <span className="text-[11px] font-bold uppercase tracking-wider block text-emerald-800">
              Estimasi Omzet / Bulan
            </span>
            <div className="text-xl sm:text-2xl font-black mt-1">
              Rp {estimatedMonthlyRevenue.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-emerald-700 block mt-1">
              Telur + Sayur + Lele + Cabai + Sorgum
            </span>
          </div>

          {/* Net Profit */}
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
            <span className="text-[11px] font-bold uppercase tracking-wider block text-teal-800">
              Perkiraan Untung Bersih / Bln
            </span>
            <div className="text-xl sm:text-2xl font-black mt-1 text-teal-900">
              Rp {estimatedMonthlyNetProfit.toLocaleString('id-ID')}
            </div>
            <span className="text-[10px] text-teal-700 block mt-1">
              Margin laba ~{Math.round((estimatedMonthlyNetProfit / estimatedMonthlyRevenue) * 100)}%
            </span>
          </div>

          {/* BEP (Balik Modal) */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950">
            <span className="text-[11px] font-bold uppercase tracking-wider block text-amber-800">
              Waktu Balik Modal (BEP)
            </span>
            <div className="text-xl sm:text-2xl font-black mt-1 text-amber-950">
              {estimatedBEPMonths} Bulan
            </div>
            <span className="text-[10px] text-amber-800 block mt-1">
              Modal Rp {(capital / 1000000).toFixed(1)} Jt kembali penuh
            </span>
          </div>

          {/* Financial Freedom Roadmap */}
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-950">
            <span className="text-[11px] font-bold uppercase tracking-wider block text-indigo-800">
              Target Bebas Finansial
            </span>
            <div className="text-xl sm:text-2xl font-black mt-1 text-indigo-950">
              ~{yearsToFinancialFreedom} Tahun
            </div>
            <span className="text-[10px] text-indigo-700 block mt-1">
              Kedaulatan Ekonomi Keluarga Tani
            </span>
          </div>
        </div>

        {/* Summary analysis card */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Kesimpulan Kelayakan Lahan Pamotan:</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Dengan luas lahan <strong className="text-white">{landSize} m²</strong> memakai{' '}
            <strong className="text-amber-300">{currentModel.name}</strong>, Anda diproyeksikan mengantongi
            laba bersih sekitar <strong className="text-emerald-400">Rp {estimatedMonthlyNetProfit.toLocaleString('id-ID')} per bulan</strong>.
            Modal awal sebesar <strong className="text-white">Rp {capital.toLocaleString('id-ID')}</strong> akan balik modal
            dalam <strong className="text-amber-400">{estimatedBEPMonths} bulan</strong>.
            Dalam waktu sekitar <strong className="text-emerald-300">{yearsToFinancialFreedom} tahun</strong>, akumulasi dana
            dan diversifikasi panen harian-tahunan mengantarkan keluarga Anda mencapai Tangga ke-4 Joglo Tani: <strong className="text-white">Kedaulatan Ekonomi Penuh</strong>.
          </p>
        </div>
      </div>

      {/* ===================== SIMULATOR TERNAK BAYU DININGRAT ===================== */}
      <SimulatorTernakBayu />
    </div>
  );
};

export const SimulatorTernakBayu: React.FC = () => {
  const [ayamAwal, setAyamAwal] = useState<number>(10);
  const [kambingAwal, setKambingAwal] = useState<number>(1);

  // Rumus sederhana Bayu Diningrat: setiap 6 bulan berlipat 2 (dikali 2)
  // Ayam:
  const ayam6Bulan = ayamAwal * 2;
  const ayam1Tahun = ayamAwal * 4; // 12 bulan = 2^2
  const ayam2Tahun = ayamAwal * 16; // 24 bulan = 2^4
  const ayam3Tahun = ayamAwal * 64; // 36 bulan = 2^6 (dengan 16 ekor = 1.024 ekor)

  // Kambing:
  const kambing6Bulan = kambingAwal * 2;
  const kambing1Tahun = kambingAwal * 4;
  const kambing2Tahun = kambingAwal * 16;
  const kambing3Tahun = kambingAwal * 64;

  return (
    <div className="bg-white rounded-2xl p-5 border border-amber-300 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl">🐓</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-xs">
                BSM & PTS
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Simulator Ternak Bayu Diningrat (Kemandirian Berlipat)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Simulasi perkembangbiakan ternak berlipat ganda setiap 6 bulan tanpa hutang bank.
            </p>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 self-start sm:self-auto">
          Rumus: Lipat 2 Tiap 6 Bulan
        </span>
      </div>

      {/* Teks Motivasi Wajib Bayu Diningrat */}
      <div className="p-3.5 rounded-xl bg-amber-500/15 border-l-4 border-amber-500 text-slate-900 text-xs sm:text-sm font-medium flex items-center justify-between gap-3">
        <div>
          <span className="text-amber-800 font-bold block text-xs uppercase tracking-wider">
            Motivasi Kemandirian Bayu Diningrat:
          </span>
          <p className="text-slate-800 font-bold mt-0.5 text-sm sm:text-base">
            &ldquo;Mulai dari 10 ayam saja, 3 tahun bisa jadi 1000 ekor.&rdquo;
          </p>
        </div>
        <span className="text-3xl shrink-0 hidden sm:inline">🌾</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Kalkulator Ayam */}
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-amber-950 flex items-center gap-2">
                <span>🐓</span>
                <span>1. Kalkulator Ternak Ayam</span>
              </span>
              <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-amber-900 font-bold">
                Unggas Harian
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Jumlah Ayam Awal (Ekor):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={ayamAwal}
                  onChange={(e) => setAyamAwal(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 bg-white rounded-lg border border-amber-300 font-bold text-sm focus:outline-amber-600"
                />
                <div className="flex gap-1 shrink-0">
                  {[5, 10, 20].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAyamAwal(v)}
                      className={`px-2 py-1 text-xs rounded border font-semibold cursor-pointer ${
                        ayamAwal === v ? 'bg-amber-500 text-slate-950 border-amber-600' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Proyeksi Ayam */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">
                Proyeksi Perkembangan Populasi Ayam:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">6 Bulan (x2):</span>
                  <span className="text-base font-black text-amber-950">{ayam6Bulan} Ekor</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">1 Tahun (x4):</span>
                  <span className="text-base font-black text-amber-950">{ayam1Tahun} Ekor</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-amber-200">
                  <span className="text-[10px] text-slate-500 block">2 Tahun (x16):</span>
                  <span className="text-base font-black text-emerald-800">{ayam2Tahun} Ekor</span>
                </div>
                <div className="bg-amber-100 p-2.5 rounded-lg border border-amber-300">
                  <span className="text-[10px] text-amber-900 font-bold block">3 Tahun (x64):</span>
                  <span className="text-lg font-black text-amber-950">{ayam3Tahun} Ekor</span>
                  <span className="text-[9px] text-amber-800 block mt-0.5">
                    {ayamAwal >= 10 ? '★ Tembus target ribuan ekor!' : 'Aset kas harian telur'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-amber-200 text-[11px] text-slate-600">
            💡 <strong>Pakan Mandiri:</strong> Ayam diberi pakan gratis dari azolla microphylla, parutan singkong, dan maggot BSF tanpa beli konsentrat pabrik.
          </div>
        </div>

        {/* Kalkulator Kambing */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-emerald-950 flex items-center gap-2">
                <span>🐑</span>
                <span>2. Kalkulator Ternak Kambing / Domba</span>
              </span>
              <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-emerald-200 text-emerald-900 font-bold">
                Tabungan Emas
              </span>
            </div>

            <div className="mt-3 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Jumlah Kambing Awal (Ekor):
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={kambingAwal}
                  onChange={(e) => setKambingAwal(Math.max(1, Number(e.target.value)))}
                  className="w-full p-2 bg-white rounded-lg border border-emerald-300 font-bold text-sm focus:outline-emerald-600"
                />
                <div className="flex gap-1 shrink-0">
                  {[1, 2, 4].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setKambingAwal(v)}
                      className={`px-2 py-1 text-xs rounded border font-semibold cursor-pointer ${
                        kambingAwal === v ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline Proyeksi Kambing */}
            <div className="mt-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide block">
                Simulasi Berlipat (2, 4, 8, 16, dst per 6 bulan):
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">6 Bulan:</span>
                  <span className="text-base font-black text-emerald-950">{kambing6Bulan} Ekor</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">1 Tahun (12 Bln):</span>
                  <span className="text-base font-black text-emerald-950">{kambing1Tahun} Ekor</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[10px] text-slate-500 block">2 Tahun (24 Bln):</span>
                  <span className="text-base font-black text-emerald-950">{kambing2Tahun} Ekor</span>
                </div>
                <div className="bg-emerald-100 p-2.5 rounded-lg border border-emerald-300">
                  <span className="text-[10px] text-emerald-900 font-bold block">3 Tahun (36 Bln):</span>
                  <span className="text-lg font-black text-emerald-950">{kambing3Tahun} Ekor</span>
                  <span className="text-[9px] text-emerald-800 block mt-0.5">
                    Nilai aset ~Rp {(kambing3Tahun * 1500000).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-white border border-emerald-200 text-[11px] text-slate-600">
            💡 <strong>Pupuk K Mandiri:</strong> Kotoran kambing adalah sumber Kalium (K) organik terbaik untuk menyuburkan buah kakao, mangga, dan alpukat di pesisir Pamotan.
          </div>
        </div>
      </div>
    </div>
  );
};
