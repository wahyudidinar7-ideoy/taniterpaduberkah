/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  ChevronRight,
  Coins,
  DollarSign,
  HelpCircle,
  Info,
  Layers,
  Leaf,
  PiggyBank,
  RefreshCw,
  Sparkles,
  TrendingUp,
  X
} from 'lucide-react';
import { CYCLE_EDGES, CYCLE_NODES } from '../data/initialData';
import { CycleEdge, CycleNode, HarvestItem, Transaction } from '../types';
import { FinancialTarget } from '../utils/storage';

interface ZeroWasteCycleProps {
  transactions: Transaction[];
  harvestItems: HarvestItem[];
  financialTarget: FinancialTarget;
  onNavigateToCalendar: () => void;
  onNavigateToFinance: () => void;
  onNavigateTo1005?: () => void;
  onQuickRecordHarvest: (item: HarvestItem) => void;
}

export const ZeroWasteCycle: React.FC<ZeroWasteCycleProps> = ({
  transactions,
  harvestItems,
  financialTarget,
  onNavigateToCalendar,
  onNavigateToFinance,
  onNavigateTo1005,
  onQuickRecordHarvest
}) => {
  const [selectedNode, setSelectedNode] = useState<CycleNode | null>(CYCLE_NODES[0]);
  const [selectedEdge, setSelectedEdge] = useState<CycleEdge | null>(null);

  // Calculate monthly stats from transactions
  const now = new Date();
  const currentMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const currentMonthTransactions = transactions.filter((t) => t.date.startsWith(currentMonthStr));

  const totalIncomeMonth = currentMonthTransactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenseMonth = currentMonthTransactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfitMonth = totalIncomeMonth - totalExpenseMonth;

  // Fertilizer & Feed Savings calculation (based on Heri Sunarto standard of zero-waste self reliance:
  // Kasgot + Nitrat Lele + Maggot saves an estimated Rp 1.150.000 / month on 200m2 scale)
  const estimatedSavingsMonth = 1250000;

  // Financial Freedom progress bar
  const targetMonthly = financialTarget.targetMonthlyProfit || 7500000;
  const progressPercent = Math.min(100, Math.max(0, Math.round((netProfitMonth / targetMonthly) * 100)));

  // Today's Harvest tasks grouped by Joglo Tani tiers
  const harianItems = harvestItems.filter((i) => i.category === 'harian');
  const mingguanItems = harvestItems.filter((i) => i.category === 'mingguan');
  const bulananItems = harvestItems.filter((i) => i.category === 'bulanan');
  const tahunanItems = harvestItems.filter((i) => i.category === 'tahunan');

  return (
    <div className="space-y-6">
      {/* Hero Banner with Pamotan Identity */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 rounded-2xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden border border-emerald-700/60">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pemberdayaan Tani Terpadu Desa Pamotan</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-tight">
            Satu Lahan, Banyak Panen, Zero Waste, Bebas Finansial
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200 mt-2 leading-relaxed">
            Tidak ada limbah yang terbuang sia-sia. Kotoran ternak diolah maggot menjadi protein gratis dan pupuk kasgot,
            air kolam lele menyuburkan cabai dan sorgum tahan panas pesisir Kalipucang.
          </p>
          {onNavigateTo1005 && (
            <div className="mt-3.5 flex flex-wrap items-center gap-2">
              <button
                onClick={onNavigateTo1005}
                className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md transition-all active:scale-95"
              >
                <span>🎯</span>
                <span>Buka Target 1005 Bayu Diningrat (1.000m² = Rp 5 Jt/bln)</span>
              </button>
            </div>
          )}
        </div>

        {/* Background decorative circles */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-32 bottom-0 translate-y-12 w-48 h-48 bg-teal-400/10 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* 4 Essential KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* KPI 1: Total Penghasilan Bulan Ini */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200/90 shadow-2xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Penghasilan Bulan Ini
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              💰
            </div>
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-black text-slate-900">
            Rp {totalIncomeMonth.toLocaleString('id-ID')}
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-700 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Laba Bersih: Rp {netProfitMonth.toLocaleString('id-ID')}</span>
          </div>
        </div>

        {/* KPI 2: Penghematan Pupuk & Pakan */}
        <div className="bg-white p-4 rounded-xl border border-teal-200/90 shadow-2xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Penghematan Pupuk & Pakan
            </span>
            <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              🌱
            </div>
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-black text-teal-800">
            Rp {estimatedSavingsMonth.toLocaleString('id-ID')}
          </div>
          <p className="mt-1.5 text-xs text-slate-500 font-medium line-clamp-1">
            Zero Waste ala Heri Sunarto (hemat 12-15 jt/ha/thn)
          </p>
        </div>

        {/* KPI 3: Target Kebebasan Finansial */}
        <div className="bg-white p-4 rounded-xl border border-amber-200/90 shadow-2xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Target Bebas Finansial
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              🎯
            </div>
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="text-xl sm:text-2xl font-black text-slate-900">{progressPercent}%</div>
            <span className="text-xs text-slate-500">
              Target: Rp {targetMonthly.toLocaleString('id-ID')}/bln
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden border border-slate-200">
            <div
              className="bg-gradient-to-r from-amber-500 to-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.max(4, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* KPI 4: Tangga Kedaulatan Pangan */}
        <div className="bg-white p-4 rounded-xl border border-indigo-200/90 shadow-2xs hover:shadow-sm transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Level Kedaulatan Tani
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
              🌾
            </div>
          </div>
          <div className="mt-2 text-base sm:text-lg font-black text-indigo-950">
            Tangga 3: Menuju Daulat
          </div>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-indigo-700 font-medium">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>4 Tangga Joglo Tani (Mandiri Dapur)</span>
          </div>
        </div>
      </div>

      {/* Interactive Zero Waste Diagram Section */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">♻️</span>
              <h3 className="text-lg font-bold text-slate-900">
                Visual Diagram Siklus Zero Waste Berkah
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Klik tiap <span className="font-semibold text-emerald-800">Simpul (Komponen)</span> atau{' '}
              <span className="font-semibold text-amber-800">Panah Aliran Nutrisi</span> untuk melihat resep ilmiah & nilai ekonomisnya.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
              <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Sirkulasi Mandiri 100%</span>
            </span>
          </div>
        </div>

        {/* Circular Layout of Nodes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {CYCLE_NODES.map((node) => {
            const isSelected = selectedNode?.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => {
                  setSelectedNode(node);
                  setSelectedEdge(null);
                }}
                className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-400 shadow-sm'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="text-2xl mb-1.5">{node.emoji}</div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1">
                    {node.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{node.subtitle}</p>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-700 font-semibold">{node.role.split(' ')[0]}</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Flow Connectors (Interactive Arrows Bar) */}
        <div>
          <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span>Aliran Nutrisi & Daur Limbah (Klik Panah di bawah untuk Penjelasan):</span>
          </h4>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {CYCLE_EDGES.map((edge, idx) => {
              const isEdgeActive = selectedEdge?.from === edge.from && selectedEdge?.to === edge.to;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEdge(edge);
                    const destNode = CYCLE_NODES.find((n) => n.id === edge.to);
                    if (destNode) setSelectedNode(destNode);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border flex items-center gap-1.5 transition-all cursor-pointer ${
                    isEdgeActive
                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm font-bold ring-2 ring-amber-300'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                  }`}
                >
                  <span>{edge.label}</span>
                  <ArrowRight className="w-3 h-3 text-amber-600" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Explanation Drawer for Selected Node / Edge */}
        {selectedEdge ? (
          <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-slate-800 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🔄</span>
                <h4 className="font-bold text-sm sm:text-base text-amber-950">
                  Aliran: {selectedEdge.label}
                </h4>
              </div>
              <button
                onClick={() => setSelectedEdge(null)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedEdge.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-amber-200/80 text-xs">
              <div className="bg-white p-2 rounded-lg border border-amber-200">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Volume Aliran:</span>
                <span className="font-bold text-emerald-800">{selectedEdge.flowVolume}</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-amber-200">
                <span className="text-slate-500 block text-[10px] font-bold uppercase">Dampak Penghematan:</span>
                <span className="font-bold text-amber-800">{selectedEdge.savingsNote}</span>
              </div>
            </div>
          </div>
        ) : selectedNode ? (
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-emerald-50/60 via-slate-50 to-white border border-emerald-200 text-slate-800 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/70 pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-300 flex items-center justify-center text-xl shadow-2xs">
                  {selectedNode.emoji}
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900">{selectedNode.title}</h4>
                  <p className="text-xs text-emerald-800 font-medium">{selectedNode.role}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 self-start sm:self-auto">
                {selectedNode.economicValue}
              </span>
            </div>

            <div className="space-y-1.5">
              <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Mekanisme Kerja & Manfaat Terpadu:
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {selectedNode.details.map((item, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-lg border border-slate-200 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-700 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Coastal tips */}
            <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200/80 text-xs text-teal-950 flex items-start gap-2">
              <span className="text-base shrink-0">🌊</span>
              <div>
                <strong className="font-bold">Tips Khusus Pesisir Pamotan Kalipucang: </strong>
                <span>{selectedNode.tipsPesisir}</span>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Panen Hari Ini - 4 Tingkat Ala Joglo Tani */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📅</span>
              <h3 className="text-lg font-bold text-slate-900">
                Panen Yang Harus Dilakukan (Harian, Mingguan, Bulanan, Tahunan)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsep Joglo Tani T.O. Suprapto: arus kas masuk setiap hari memastikan dapur ngebul dan tabungan bertumbuh.
            </p>
          </div>
          <button
            onClick={onNavigateToCalendar}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            <span>Buka Kalender Lengkap</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Joglo Tani Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
          {/* Harian */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                1. Panen Harian
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200/70 text-amber-950 font-semibold">
                Tiap Hari
              </span>
            </div>
            <div className="space-y-2">
              {harianItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2.5 rounded-lg border border-amber-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Target: {item.defaultAmount} {item.unit} (~Rp {(item.defaultAmount * item.estPricePerUnit).toLocaleString('id-ID')})
                    </span>
                  </div>
                  <button
                    onClick={() => onQuickRecordHarvest(item)}
                    className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] cursor-pointer"
                  >
                    Catat
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Mingguan */}
          <div className="p-3.5 rounded-xl bg-teal-50/80 border border-teal-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                2. Panen Mingguan
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-200/70 text-teal-950 font-semibold">
                Tiap Minggu
              </span>
            </div>
            <div className="space-y-2">
              {mingguanItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2.5 rounded-lg border border-teal-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Target: {item.defaultAmount} {item.unit} (~Rp {(item.defaultAmount * item.estPricePerUnit).toLocaleString('id-ID')})
                    </span>
                  </div>
                  <button
                    onClick={() => onQuickRecordHarvest(item)}
                    className="px-2 py-1 rounded bg-teal-600 hover:bg-teal-700 text-white font-semibold text-[11px] cursor-pointer"
                  >
                    Catat
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bulanan */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                3. Panen Bulanan
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-950 font-semibold">
                Tiap Bulan
              </span>
            </div>
            <div className="space-y-2">
              {bulananItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2.5 rounded-lg border border-emerald-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Target: {item.defaultAmount} {item.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => onQuickRecordHarvest(item)}
                    className="px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] cursor-pointer"
                  >
                    Catat
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Tahunan */}
          <div className="p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                4. Panen Tahunan / Musim
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200/70 text-indigo-950 font-semibold">
                Tabungan Besar
              </span>
            </div>
            <div className="space-y-2">
              {tahunanItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-2.5 rounded-lg border border-indigo-200/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <span>{item.emoji}</span>
                      <span>{item.name}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Target: {item.defaultAmount} {item.unit}
                    </span>
                  </div>
                  <button
                    onClick={() => onQuickRecordHarvest(item)}
                    className="px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] cursor-pointer"
                  >
                    Catat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
