/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Filter,
  GraduationCap,
  HelpCircle,
  PieChart,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
  TrendingDown,
  TrendingUp,
  X
} from 'lucide-react';
import { SCHOOL_MODULES } from '../data/initialData';
import { SchoolModule, Transaction } from '../types';
import { SchoolProgress, StorageService } from '../utils/storage';

interface FinanceAndSchoolProps {
  transactions: Transaction[];
  onTransactionsUpdated: () => void;
}

export const FinanceAndSchool: React.FC<FinanceAndSchoolProps> = ({
  transactions,
  onTransactionsUpdated
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'jurnal' | 'sekolah'>('jurnal');

  // Jurnal states
  const [filterType, setFilterType] = useState<'all' | 'pemasukan' | 'pengeluaran'>('all');
  const [isAddingTransaction, setIsAddingTransaction] = useState<boolean>(false);
  const [trxType, setTrxType] = useState<'pemasukan' | 'pengeluaran'>('pemasukan');
  const [trxCategory, setTrxCategory] = useState<string>('Jual Telur');
  const [trxAmount, setTrxAmount] = useState<number>(50000);
  const [trxDescription, setTrxDescription] = useState<string>('');
  const [trxDate, setTrxDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Sekolah Tani states
  const [schoolProgress, setSchoolProgress] = useState<SchoolProgress>(() =>
    StorageService.getSchoolProgress()
  );
  const [selectedModuleId, setSelectedModuleId] = useState<number>(1);
  const [currentQuizAnswers, setCurrentQuizAnswers] = useState<{ [qId: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Calculations for Finance
  const totalIncome = transactions
    .filter((t) => t.type === 'pemasukan')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'pengeluaran')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpense;

  // Filter transactions
  const filteredTransactions =
    filterType === 'all'
      ? transactions
      : transactions.filter((t) => t.type === filterType);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxAmount || trxAmount <= 0) return;

    StorageService.addTransaction({
      date: trxDate,
      type: trxType,
      category: trxCategory,
      amount: trxAmount,
      description: trxDescription || `${trxType === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'} ${trxCategory}`,
      source: 'manual'
    });

    setIsAddingTransaction(false);
    setTrxAmount(50000);
    setTrxDescription('');
    onTransactionsUpdated();
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Hapus catatan transaksi ini?')) {
      StorageService.deleteTransaction(id);
      onTransactionsUpdated();
    }
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(transactions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jurnal_tani_pamotan_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Active School Module
  const currentModule = SCHOOL_MODULES.find((m) => m.id === selectedModuleId) || SCHOOL_MODULES[0];
  const moduleProgress = schoolProgress[currentModule.id];

  const handleSelectQuizOption = (qId: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setCurrentQuizAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    currentModule.quiz.forEach((q) => {
      if (currentQuizAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });

    StorageService.saveModuleQuiz(currentModule.id, score, currentModule.quiz.length, currentQuizAnswers);
    setSchoolProgress(StorageService.getSchoolProgress());
    setQuizSubmitted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentQuizAnswers({});
    setQuizSubmitted(false);
  };

  const completedModulesCount = Object.values(schoolProgress).filter((p) => p.completed).length;

  return (
    <div className="space-y-6">
      {/* Subtab Toggle Buttons */}
      <div className="bg-white rounded-2xl p-3 border border-emerald-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('jurnal')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'jurnal'
                ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-400'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-300" />
            <span>Jurnal Keuangan Tani</span>
          </button>

          <button
            onClick={() => {
              setActiveSubTab('sekolah');
              setQuizSubmitted(false);
              setCurrentQuizAnswers(schoolProgress[selectedModuleId]?.userAnswers || {});
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeSubTab === 'sekolah'
                ? 'bg-amber-500 text-slate-950 shadow-sm ring-2 ring-amber-300'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-emerald-950" />
            <span>Sekolah Tani Berkah (7 Modul & Kuis)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-slate-900 text-white text-[10px]">
              {completedModulesCount}/7
            </span>
          </button>
        </div>
      </div>

      {/* ===================== TAB 1: JURNAL KEUANGAN ===================== */}
      {activeSubTab === 'jurnal' && (
        <div className="space-y-6">
          {/* Financial Overview KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>Total Pemasukan Hasil Tani</span>
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ArrowDownRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 text-2xl font-black text-emerald-700">
                Rp {totalIncome.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                Dari panen telur, sayur, lele, cabai, & sorgum
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>Total Pengeluaran Input</span>
                <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 text-2xl font-black text-rose-700">
                Rp {totalExpense.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-slate-500 block mt-1">
                Bibit, dedak awal, sarana polybag (bebas pupuk kimia)
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-2xs">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase">
                <span>Laba / Saldo Bersih</span>
                <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2 text-2xl font-black text-teal-800">
                Rp {netBalance.toLocaleString('id-ID')}
              </div>
              <span className="text-[11px] text-teal-700 font-semibold block mt-1">
                Kemandirian Ekonomi: Tangga ke-4 Joglo Tani
              </span>
            </div>
          </div>

          {/* Simple Clean Visual Chart: Pemasukan vs Pengeluaran */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Perbandingan Visual: Pemasukan vs Pengeluaran
                  </h3>
                  <p className="text-xs text-slate-500">
                    Beban biaya ditekan serendah mungkin berkat zero waste daur ulang mandiri.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />
                  <span className="font-semibold text-slate-700">Pemasukan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
                  <span className="font-semibold text-slate-700">Pengeluaran</span>
                </div>
              </div>
            </div>

            {/* Visual ratio bar */}
            {totalIncome + totalExpense > 0 ? (
              <div className="space-y-2">
                <div className="h-6 w-full rounded-xl overflow-hidden flex bg-slate-100 border border-slate-200">
                  <div
                    className="bg-emerald-600 h-full flex items-center justify-center text-white text-[11px] font-bold transition-all duration-500"
                    style={{
                      width: `${Math.round((totalIncome / (totalIncome + totalExpense)) * 100)}%`
                    }}
                  >
                    {Math.round((totalIncome / (totalIncome + totalExpense)) * 100)}%
                  </div>
                  <div
                    className="bg-rose-500 h-full flex items-center justify-center text-white text-[11px] font-bold transition-all duration-500"
                    style={{
                      width: `${Math.round((totalExpense / (totalIncome + totalExpense)) * 100)}%`
                    }}
                  >
                    {Math.round((totalExpense / (totalIncome + totalExpense)) * 100)}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 font-medium">
                  <span>Pemasukan: Rp {totalIncome.toLocaleString('id-ID')}</span>
                  <span>Pengeluaran: Rp {totalExpense.toLocaleString('id-ID')}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 text-center text-slate-400 text-xs">
                Belum ada data, mulai catat panen pertama Anda.
              </div>
            )}
          </div>

          {/* Action bar and transaction table */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsAddingTransaction(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>Tambah Transaksi Baru</span>
                </button>
                <button
                  onClick={handleExportData}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Ekspor JSON</span>
                </button>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs self-start sm:self-auto">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                    filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterType('pemasukan')}
                  className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                    filterType === 'pemasukan' ? 'bg-emerald-700 text-white' : 'text-slate-600'
                  }`}
                >
                  Pemasukan
                </button>
                <button
                  onClick={() => setFilterType('pengeluaran')}
                  className={`px-2.5 py-1 rounded font-semibold cursor-pointer ${
                    filterType === 'pengeluaran' ? 'bg-rose-700 text-white' : 'text-slate-600'
                  }`}
                >
                  Pengeluaran
                </button>
              </div>
            </div>

            {/* Transactions Table */}
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                Belum ada data, mulai catat panen pertama Anda.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <tr>
                      <th className="p-2.5">Tanggal</th>
                      <th className="p-2.5">Jenis</th>
                      <th className="p-2.5">Kategori</th>
                      <th className="p-2.5">Uraian / Sumber</th>
                      <th className="p-2.5 text-right">Nominal (Rp)</th>
                      <th className="p-2.5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((trx) => (
                      <tr key={trx.id} className="hover:bg-slate-50/70">
                        <td className="p-2.5 font-mono text-slate-500">{trx.date}</td>
                        <td className="p-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              trx.type === 'pemasukan'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {trx.type}
                          </span>
                        </td>
                        <td className="p-2.5 font-bold text-slate-800">{trx.category}</td>
                        <td className="p-2.5 text-slate-600 max-w-sm truncate">{trx.description}</td>
                        <td
                          className={`p-2.5 text-right font-black ${
                            trx.type === 'pemasukan' ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {trx.type === 'pemasukan' ? '+' : '-'} Rp {trx.amount.toLocaleString('id-ID')}
                        </td>
                        <td className="p-2.5 text-center">
                          <button
                            onClick={() => handleDeleteTransaction(trx.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded cursor-pointer"
                            title="Hapus Transaksi"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add Transaction Modal */}
          {isAddingTransaction && (
            <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-emerald-200 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-base text-slate-900">Catat Transaksi Manual</h3>
                  <button
                    onClick={() => setIsAddingTransaction(false)}
                    className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateTransaction} className="space-y-3.5 mt-4 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Jenis Transaksi:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setTrxType('pemasukan')}
                        className={`p-2 rounded-lg font-bold border transition-all cursor-pointer ${
                          trxType === 'pemasukan'
                            ? 'bg-emerald-700 text-white border-emerald-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        Pemasukan (Uang Masuk)
                      </button>
                      <button
                        type="button"
                        onClick={() => setTrxType('pengeluaran')}
                        className={`p-2 rounded-lg font-bold border transition-all cursor-pointer ${
                          trxType === 'pengeluaran'
                            ? 'bg-rose-700 text-white border-rose-800'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}
                      >
                        Pengeluaran (Biaya)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Tanggal Transaksi:</label>
                    <input
                      type="date"
                      required
                      value={trxDate}
                      onChange={(e) => setTrxDate(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Kategori Transaksi:</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Jual Telur, Jual Kasgot, Beli Dedak, Beli Benih"
                      value={trxCategory}
                      onChange={(e) => setTrxCategory(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Nominal Rupiah (Rp):</label>
                    <input
                      type="number"
                      min="100"
                      step="500"
                      required
                      value={trxAmount}
                      onChange={(e) => setTrxAmount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-black text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Deskripsi Tambahan:</label>
                    <input
                      type="text"
                      placeholder="Keterangan singkat"
                      value={trxDescription}
                      onChange={(e) => setTrxDescription(e.target.value)}
                      className="w-full p-2 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingTransaction(false)}
                      className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-sm"
                    >
                      Simpan Transaksi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB 2: SEKOLAH TANI BERKAH ===================== */}
      {activeSubTab === 'sekolah' && (
        <div className="space-y-6">
          {/* Header Banner Sekolah Tani */}
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-800 rounded-2xl p-5 text-slate-950 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-white text-xs font-bold mb-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>KURIKULUM 7 MODUL MANDIRI</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-950">
                  Sekolah Tani Berkah Pamotan
                </h2>
                <p className="text-xs sm:text-sm text-slate-900 font-medium mt-0.5">
                  Pelajari 7 modul ilmu pertanian terpadu Nusantara, selesaikan 3 kuis tiap modul,
                  dan raih sertifikat kompetensi &ldquo;Santri Tani Mandiri&rdquo;!
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-xs p-3 rounded-xl border border-white text-center shadow-xs shrink-0">
                <span className="text-[10px] font-bold uppercase text-slate-600 block">Status Kelulusan</span>
                <span className="text-xl font-black text-emerald-800">
                  {completedModulesCount} dari 7 Modul
                </span>
              </div>
            </div>
          </div>

          {/* 7 Modules Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {SCHOOL_MODULES.map((m) => {
              const isSelected = selectedModuleId === m.id;
              const isPassed = schoolProgress[m.id]?.completed;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModuleId(m.id);
                    setQuizSubmitted(false);
                    setCurrentQuizAnswers(schoolProgress[m.id]?.userAnswers || {});
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-sm'
                      : isPassed
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {isPassed && (
                    <span className="absolute top-2 right-2 text-emerald-600 text-xs font-bold">
                      ✓ Lulus
                    </span>
                  )}
                  <div>
                    <span className="text-xl">{m.emoji}</span>
                    <span className="text-[10px] font-bold text-slate-400 block mt-1">
                      Modul {m.id}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-2 mt-0.5">
                      {m.title}
                    </h4>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold line-clamp-1 mt-2">
                    {m.tokoh.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Module Lesson Content */}
          <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentModule.emoji}</span>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    Modul {currentModule.id}: {currentModule.title}
                  </h3>
                  <p className="text-xs text-emerald-800 font-semibold">
                    Guru / Rujukan: {currentModule.tokoh}
                  </p>
                </div>
              </div>
              <span className="text-xs italic text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-medium">
                &ldquo;{currentModule.tagline}&rdquo;
              </span>
            </div>

            {/* Ringkasan */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {currentModule.ringkasan}
            </div>

            {/* Poin-Poin Materi Inti */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Materi Pokok Pembelajaran:
              </h4>
              <div className="space-y-2">
                {currentModule.materiPoin.map((poin, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/80 text-xs text-slate-800 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{poin}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Penerapan Khusus Desa Pamotan */}
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950">
              <strong className="font-bold text-teal-900">Penerapan Praktik di Desa Pamotan Kalipucang: </strong>
              <span>{currentModule.penerapanPamotan}</span>
            </div>
          </div>

          {/* Interactive 3-Question Quiz */}
          <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Kuis Uji Pemahaman: Modul {currentModule.id} (3 Soal)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Pilih jawaban yang paling tepat. Minimal 2 dari 3 soal benar untuk lulus modul ini.
                  </p>
                </div>
              </div>
              {moduleProgress && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
                    moduleProgress.completed
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}
                >
                  Skor Anda: {moduleProgress.score} / {moduleProgress.total}{' '}
                  {moduleProgress.completed ? '(Lulus! 🎉)' : '(Perlu Ulang)'}
                </span>
              )}
            </div>

            <form onSubmit={handleSubmitQuiz} className="space-y-5">
              {currentModule.quiz.map((q, qIndex) => {
                const selectedOpt = currentQuizAnswers[q.id];
                const isAnswered = selectedOpt !== undefined;
                const isCorrect = selectedOpt === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs"
                  >
                    <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center text-[11px] shrink-0">
                        {qIndex + 1}
                      </span>
                      <span>{q.question}</span>
                    </div>

                    {/* Options list */}
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt, optIndex) => {
                        const isOptionSelected = selectedOpt === optIndex;
                        let optionStyle = 'bg-white border-slate-200 hover:bg-slate-100 text-slate-800';

                        if (quizSubmitted) {
                          if (optIndex === q.correctIndex) {
                            optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isOptionSelected && !isCorrect) {
                            optionStyle = 'bg-rose-100 border-rose-500 text-rose-950 line-through';
                          }
                        } else if (isOptionSelected) {
                          optionStyle = 'bg-amber-100 border-amber-500 text-slate-950 font-bold ring-2 ring-amber-300';
                        }

                        return (
                          <button
                            type="button"
                            key={optIndex}
                            onClick={() => handleSelectQuizOption(q.id, optIndex)}
                            className={`w-full text-left p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {quizSubmitted && optIndex === q.correctIndex && (
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation if submitted */}
                    {quizSubmitted && (
                      <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-slate-700 text-[11px] leading-relaxed">
                        <strong className="text-emerald-900">💡 Pembahasan: </strong>
                        <span>{q.explanation}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex items-center justify-end gap-3">
                {quizSubmitted ? (
                  <button
                    type="button"
                    onClick={handleRetakeQuiz}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis Modul {currentModule.id}</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4 text-amber-300" />
                    <span>Periksa Jawaban Kuis</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
