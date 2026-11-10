/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AboutModal } from './components/AboutModal';
import { ZeroWasteCycle } from './components/ZeroWasteCycle';
import { LandSimulator } from './components/LandSimulator';
import { Guide4I } from './components/Guide4I';
import { HarvestCalendar } from './components/HarvestCalendar';
import { FinanceAndSchool } from './components/FinanceAndSchool';
import { Calculator1005Bayu } from './components/Calculator1005Bayu';
import { StorageService } from './utils/storage';
import { HarvestItem, HarvestRecord, Transaction } from './types';
import { CheckCircle, RotateCcw, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);

  // App Data States
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [harvestItems, setHarvestItems] = useState<HarvestItem[]>([]);
  const [harvestRecords, setHarvestRecords] = useState<HarvestRecord[]>([]);
  const [financialTarget, setFinancialTarget] = useState(() =>
    StorageService.getFinancialTarget()
  );

  // Quick Harvest Recording modal for Dashboard action
  const [quickHarvestItem, setQuickHarvestItem] = useState<HarvestItem | null>(null);
  const [quickAmount, setQuickAmount] = useState<number>(0);
  const [quickPrice, setQuickPrice] = useState<number>(0);
  const [quickNotes, setQuickNotes] = useState<string>('');
  const [quickToast, setQuickToast] = useState<string | null>(null);

  const loadData = () => {
    setTransactions(StorageService.getTransactions());
    setHarvestItems(StorageService.getHarvestItems());
    setHarvestRecords(StorageService.getHarvestRecords());
    setFinancialTarget(StorageService.getFinancialTarget());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenQuickHarvest = (item: HarvestItem) => {
    setQuickHarvestItem(item);
    setQuickAmount(item.defaultAmount);
    setQuickPrice(item.estPricePerUnit);
    setQuickNotes('');
  };

  const handleSaveQuickHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickHarvestItem || quickAmount <= 0) return;

    StorageService.recordHarvest(
      quickHarvestItem.id,
      quickAmount,
      quickPrice,
      quickNotes
    );

    loadData();
    setQuickToast(
      `Alhamdulillah! Panen ${quickHarvestItem.name} berhasil dicatat dan masuk ke Jurnal Keuangan.`
    );
    setQuickHarvestItem(null);

    setTimeout(() => {
      setQuickToast(null);
    }, 4000);
  };

  const handleResetData = () => {
    if (
      confirm(
        'Apakah Anda yakin ingin mereset seluruh data lokal ke kondisi awal standar Desa Pamotan?'
      )
    ) {
      StorageService.resetAllData();
      loadData();
      alert('Data telah berhasil direset ke standar awal.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-300 selection:text-slate-900">
      {/* Top sticky navigation and location banner */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Quick Global Toast */}
      {quickToast && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-emerald-700 flex items-center gap-3 text-xs font-semibold animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-6">
        {activeTab === 'kalkulator1005' && (
          <Calculator1005Bayu
            transactions={transactions}
            onNavigateToCalendar={() => setActiveTab('kalender')}
            onNavigateToFinance={() => setActiveTab('keuangan')}
          />
        )}

        {activeTab === 'dashboard' && (
          <ZeroWasteCycle
            transactions={transactions}
            harvestItems={harvestItems}
            financialTarget={financialTarget}
            onNavigateToCalendar={() => setActiveTab('kalender')}
            onNavigateToFinance={() => setActiveTab('keuangan')}
            onNavigateTo1005={() => setActiveTab('kalkulator1005')}
            onQuickRecordHarvest={handleOpenQuickHarvest}
          />
        )}

        {activeTab === 'simulator' && <LandSimulator />}

        {activeTab === 'panduan4i' && <Guide4I />}

        {activeTab === 'kalender' && (
          <HarvestCalendar
            harvestItems={harvestItems}
            harvestRecords={harvestRecords}
            onHarvestRecorded={loadData}
            onNavigateToFinance={() => setActiveTab('keuangan')}
          />
        )}

        {activeTab === 'keuangan' && (
          <FinanceAndSchool
            transactions={transactions}
            onTransactionsUpdated={loadData}
          />
        )}

        {/* Bottom subtle reset & data controls */}
        <div className="mt-10 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Penyimpanan Lokal Aktif: Tidak perlu koneksi internet, data tersimpan di peramban Anda.</span>
          </div>
          <button
            onClick={handleResetData}
            className="flex items-center gap-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
            title="Kembalikan data ke contoh awal"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Data Contoh</span>
          </button>
        </div>
      </main>

      {/* Modal Tentang & Guru Kami */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      {/* Quick Harvest Modal (Triggered from Dashboard today's harvests) */}
      {quickHarvestItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-emerald-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{quickHarvestItem.emoji}</span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">
                    Catat Panen {quickHarvestItem.name}
                  </h3>
                  <span className="text-[11px] text-emerald-800 font-semibold uppercase">
                    Panen {quickHarvestItem.category} Joglo Tani
                  </span>
                </div>
              </div>
              <button
                onClick={() => setQuickHarvestItem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuickHarvest} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Jumlah Panen Riil ({quickHarvestItem.unit}):
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  required
                  value={quickAmount}
                  onChange={(e) => setQuickAmount(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-sm focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Harga Jual Satuan (Rp per {quickHarvestItem.unit}):
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={quickPrice}
                  onChange={(e) => setQuickPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-sm focus:outline-emerald-600"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-950">Total Uang Panen:</span>
                <span className="text-base font-black text-emerald-800">
                  Rp {(quickAmount * quickPrice).toLocaleString('id-ID')}
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Catatan Tambahan (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pembeli langganan warung makan Pamotan"
                  value={quickNotes}
                  onChange={(e) => setQuickNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickHarvestItem(null)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Simpan Panen & Jurnal</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Mandatory Footer with exact attribution */}
      <Footer onOpenAbout={() => setIsAboutOpen(true)} />
    </div>
  );
}
