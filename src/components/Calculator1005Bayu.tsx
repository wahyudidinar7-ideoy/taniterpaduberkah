/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Calculator,
  CheckCircle,
  Coins,
  Compass,
  Heart,
  HelpCircle,
  Layers,
  Leaf,
  PiggyBank,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import { Transaction } from '../types';

interface Calculator1005BayuProps {
  transactions: Transaction[];
  onNavigateToCalendar?: () => void;
  onNavigateToFinance?: () => void;
}

export const Calculator1005Bayu: React.FC<Calculator1005BayuProps> = ({
  transactions,
  onNavigateToCalendar,
  onNavigateToFinance
}) => {
  const [luasLahan, setLuasLahan] = useState<number>(1000);
  const [customCurrentRevenue, setCustomCurrentRevenue] = useState<number | null>(null);

  // Rumus wajib Bayu Diningrat:
  // target = luas / 1000 * 5000000
  // Jika 1000m2 = Rp 5.000.000/bln, jika 200m2 = Rp 1.000.000/bln
  const targetRevenuePerMonth = Math.round((luasLahan / 1000) * 5000000);

  // Pembagian 4 pilar Bayu Diningrat:
  // 30% Sayur Harian (Kangkung, Bayam)
  // 30% Ayam Telur & Lele (Mingguan)
  // 20% Jahe & Sorgum (Bulanan)
  // 20% Buah Mata Air (Alpukat, Mangga, Kakao)
  const pilarSayurHarian = Math.round(targetRevenuePerMonth * 0.3);
  const pilarTernakIkanMingguan = Math.round(targetRevenuePerMonth * 0.3);
  const pilarJaheSorgumBulanan = Math.round(targetRevenuePerMonth * 0.2);
  const pilarBuahMataAir = Math.round(targetRevenuePerMonth * 0.2);

  // Hitung riil bulan ini dari transaksi yang ada
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const actualCurrentMonthIncome = transactions
    .filter((t) => t.type === 'pemasukan' && t.date.startsWith(currentMonthStr))
    .reduce((sum, t) => sum + t.amount, 0);

  const effectiveCurrentIncome =
    customCurrentRevenue !== null ? customCurrentRevenue : actualCurrentMonthIncome;

  const progressPercent = Math.min(
    100,
    targetRevenuePerMonth > 0
      ? Math.round((effectiveCurrentIncome / targetRevenuePerMonth) * 100)
      : 0
  );

  const presetSizes = [100, 200, 400, 600, 1000, 2000];

  return (
    <div className="space-y-6">
      {/* Hero Banner Tokoh Bayu Diningrat */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden border border-emerald-700/60">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KEMANDIRIAN BAYU SEHAT MANDIRI (BSM) & PTS</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
            Kalkulator 1005 Bayu Diningrat
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-2 leading-relaxed">
            Patokan mandiri Petani Teman Sejati (PTS): <strong className="text-amber-300">1.000 m² = Target Rp 5.000.000 / bulan</strong>.
            Jika luas pekarangan Anda 200 m², target realistisnya Rp 1.000.000 / bulan.
          </p>
          <div className="mt-3.5 p-3 rounded-xl bg-amber-500/15 border-l-4 border-amber-400 text-xs sm:text-sm text-amber-200 italic font-medium">
            &ldquo;Apa yang ada, jangan mengada-ada. Mulai dari yang kecil, yang ikhlas kita kehilangan. Bertani adalah ibadah.&rdquo;
            <span className="block not-italic font-bold text-amber-300 text-xs mt-1">
              — Bayu Diningrat (BSM & Petani Teman Sejati)
            </span>
          </div>
        </div>
      </div>

      {/* Input Luas Lahan & Target Calculator */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Hitung Target Finansial 1005 Sesuai Lahan Anda
              </h3>
              <p className="text-xs text-slate-500">
                Rumus baku: Target = (Luas Lahan / 1.000 m²) × Rp 5.000.000 per bulan
              </p>
            </div>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 self-start sm:self-auto">
            Metode BSM 1005
          </span>
        </div>

        {/* Input Lahan Slider & Presets */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-700 uppercase">
              Luas Pekarangan / Lahan Anda:
            </label>
            <span className="text-emerald-800 font-black text-xl">{luasLahan} m²</span>
          </div>

          <input
            type="range"
            min="50"
            max="3000"
            step="10"
            value={luasLahan}
            onChange={(e) => setLuasLahan(Number(e.target.value))}
            className="w-full accent-emerald-700 cursor-pointer"
          />

          <div className="flex flex-wrap gap-2">
            {presetSizes.map((sz) => (
              <button
                key={sz}
                onClick={() => setLuasLahan(sz)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  luasLahan === sz
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                    : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                }`}
              >
                {sz} m² {sz === 1000 ? '(Standar 1005)' : sz === 200 ? '(Pekarangan Sempit)' : ''}
              </button>
            ))}
          </div>
        </div>

        {/* Big Target Output Card */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
              Target Omzet 1005 Bersih Bulanan:
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
              Rp {targetRevenuePerMonth.toLocaleString('id-ID')}
              <span className="text-sm font-normal text-slate-600"> / bulan</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Untuk lahan seluas <strong className="text-slate-900">{luasLahan} m²</strong> di iklim pesisir Pamotan Kalipucang.
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-emerald-200 text-xs sm:text-right shrink-0">
            <span className="text-slate-500 block">Kebutuhan Dapur & Keluarga:</span>
            <span className="font-bold text-emerald-800 text-sm">
              Tercukupi Penuh (Mandiri Dapur)
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              Nol hutang pupuk & pakan
            </span>
          </div>
        </div>
      </div>

      {/* Pembagian 4 Pilar Bayu Diningrat */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <span>📊</span>
            <span>Pembagian Alokasi 4 Pilar Penghasilan Bayu Diningrat</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Komposisi tepat agar setiap hari, minggu, bulan, dan tahun selalu ada uang kas yang masuk ke kantong petani.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Pilar 1: 30% Sayur Harian */}
          <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">🥬</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-black text-xs">
                  30%
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-2">1. Sayur Harian</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Kangkung, Bayam, Sawi di pekarangan</p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-emerald-200/80">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Bulanan:</span>
              <span className="text-base font-black text-emerald-800">
                Rp {pilarSayurHarian.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-emerald-700 block mt-0.5">
                ~Rp {Math.round(pilarSayurHarian / 30).toLocaleString('id-ID')}/hari
              </span>
            </div>
          </div>

          {/* Pilar 2: 30% Ayam Telur & Lele */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">🥚</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-black text-xs">
                  30%
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-2">2. Ayam Telur & Lele</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Telur harian & lele bioflok mingguan</p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-amber-200/80">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Bulanan:</span>
              <span className="text-base font-black text-amber-900">
                Rp {pilarTernakIkanMingguan.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-amber-800 block mt-0.5">
                ~Rp {Math.round(pilarTernakIkanMingguan / 4).toLocaleString('id-ID')}/minggu
              </span>
            </div>
          </div>

          {/* Pilar 3: 20% Jahe & Sorgum */}
          <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">🌾</span>
                <span className="px-2 py-0.5 rounded-full bg-teal-200 text-teal-950 font-black text-xs">
                  20%
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-2">3. Jahe & Sorgum</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Rimpang jahe herbal & malai sorgum</p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-teal-200/80">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Bulanan:</span>
              <span className="text-base font-black text-teal-900">
                Rp {pilarJaheSorgumBulanan.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-teal-700 block mt-0.5">
                Panen ratoon & rempah bulanan
              </span>
            </div>
          </div>

          {/* Pilar 4: 20% Buah Mata Air */}
          <div className="p-4 rounded-xl bg-indigo-50/80 border border-indigo-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-2xl">🥑</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-950 font-black text-xs">
                  20%
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 mt-2">4. Buah Mata Air</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">Alpukat, Mangga, Kakao di sudut batas</p>
            </div>
            <div className="mt-4 pt-2.5 border-t border-indigo-200/80">
              <span className="text-[10px] text-slate-500 font-bold block uppercase">Target Bulanan:</span>
              <span className="text-base font-black text-indigo-900">
                Rp {pilarBuahMataAir.toLocaleString('id-ID')}
              </span>
              <span className="text-[10px] text-indigo-700 block mt-0.5">
                Tabungan emas tahunan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar: Progress Menuju Target 1005 Saya */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <span>Progress Menuju Target 1005 Saya</span>
            </h3>
            <p className="text-xs text-slate-500">
              Bandingkan pencapaian omzet panen Anda saat ini terhadap target ideal BSM 1005.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-black text-emerald-800">{progressPercent}%</span>
            <span className="text-xs text-slate-500 block">Tercapai</span>
          </div>
        </div>

        {/* Progress bar visual */}
        <div className="space-y-2">
          <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden border border-slate-200 p-0.5">
            <div
              className="bg-gradient-to-r from-amber-400 via-emerald-500 to-emerald-700 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(3, progressPercent)}%` }}
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 font-medium">
            <span>
              Pemasukan Tercatat Saat Ini:{' '}
              <strong className="text-slate-900">
                Rp {effectiveCurrentIncome.toLocaleString('id-ID')}
              </strong>
            </span>
            <span>
              Target 1005 ({luasLahan} m²):{' '}
              <strong className="text-emerald-800">
                Rp {targetRevenuePerMonth.toLocaleString('id-ID')} / bulan
              </strong>
            </span>
          </div>
        </div>

        {/* Simulasi coba input manual jika ingin tes target berbeda */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Uji Coba Pemasukan Lain:</span>
            <input
              type="number"
              step="100000"
              placeholder={`Contoh: ${targetRevenuePerMonth}`}
              value={customCurrentRevenue !== null ? customCurrentRevenue : ''}
              onChange={(e) =>
                setCustomCurrentRevenue(e.target.value === '' ? null : Number(e.target.value))
              }
              className="p-1.5 rounded border border-slate-300 bg-white text-xs w-36 font-semibold"
            />
          </div>
          {customCurrentRevenue !== null && (
            <button
              onClick={() => setCustomCurrentRevenue(null)}
              className="text-emerald-700 font-bold hover:underline cursor-pointer text-xs"
            >
              Gunakan Data Riil Transaksi (Rp {actualCurrentMonthIncome.toLocaleString('id-ID')})
            </button>
          )}
        </div>

        {/* Catatan Hikmah Bayu Diningrat */}
        <div className="p-3.5 rounded-xl bg-emerald-950 text-white text-xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-300 font-bold">
            <Heart className="w-4 h-4 fill-amber-300" />
            <span>Nasihat Kemandirian Petani Teman Sejati (PTS):</span>
          </div>
          <p className="text-emerald-100 leading-relaxed">
            &ldquo;Jangan menunggu lahan berhektar-hektar. Dengan pekarangan 100 m² - 200 m² saja, rawat
            sayur harian dengan telaten, beri pakan ayam dan lele dari sisa dapur dan azolla, serta tanam jahe dan buah mata air.
            Lakukan dengan niat ibadah, rezeki akan mengalir berkah tanpa perlu bergantung pada tengkulak atau pupuk pabrik.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
};
