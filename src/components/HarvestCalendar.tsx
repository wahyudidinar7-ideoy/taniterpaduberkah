/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  Filter,
  History,
  Layers,
  Plus,
  Sparkles,
  Tag,
  Trash2,
  TrendingUp,
  X
} from 'lucide-react';
import { HarvestCategory, HarvestItem, HarvestRecord } from '../types';
import { StorageService } from '../utils/storage';

interface HarvestCalendarProps {
  harvestItems: HarvestItem[];
  harvestRecords: HarvestRecord[];
  onHarvestRecorded: () => void;
  onNavigateToFinance: () => void;
}

export const HarvestCalendar: React.FC<HarvestCalendarProps> = ({
  harvestItems,
  harvestRecords,
  onHarvestRecorded,
  onNavigateToFinance
}) => {
  const [selectedCategory, setSelectedCategory] = useState<HarvestCategory | 'all'>('all');
  const [recordingItem, setRecordingItem] = useState<HarvestItem | null>(null);

  // Form inputs for recording harvest
  const [amountInput, setAmountInput] = useState<number>(0);
  const [priceInput, setPriceInput] = useState<number>(0);
  const [notesInput, setNotesInput] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modal to add new custom harvest item
  const [isAddingNewItem, setIsAddingNewItem] = useState<boolean>(false);
  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemCategory, setNewItemCategory] = useState<HarvestCategory>('harian');
  const [newItemAmount, setNewItemAmount] = useState<number>(5);
  const [newItemUnit, setNewItemUnit] = useState<string>('kg');
  const [newItemPrice, setNewItemPrice] = useState<number>(10000);
  const [newItemEmoji, setNewItemEmoji] = useState<string>('🌱');
  const [newItemNotes, setNewItemNotes] = useState<string>('');

  const openHarvestModal = (item: HarvestItem) => {
    setRecordingItem(item);
    setAmountInput(item.defaultAmount);
    setPriceInput(item.estPricePerUnit);
    setNotesInput('');
  };

  const handleSaveHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recordingItem || amountInput <= 0) return;

    const { transaction } = StorageService.recordHarvest(
      recordingItem.id,
      amountInput,
      priceInput,
      notesInput
    );

    setSuccessToast(
      `Alhamdulillah! Berhasil mencatat panen ${amountInput} ${recordingItem.unit} ${recordingItem.name} (Rp ${(amountInput * priceInput).toLocaleString('id-ID')}). Otomatis masuk ke Jurnal Keuangan!`
    );

    setRecordingItem(null);
    onHarvestRecorded();

    setTimeout(() => {
      setSuccessToast(null);
    }, 4500);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName) return;

    const newItem: HarvestItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      category: newItemCategory,
      defaultAmount: newItemAmount,
      unit: newItemUnit,
      estPricePerUnit: newItemPrice,
      emoji: newItemEmoji,
      notes: newItemNotes || 'Hasil bumi pekarangan Pamotan',
      cycleIntervalDays: newItemCategory === 'harian' ? 1 : newItemCategory === 'mingguan' ? 7 : newItemCategory === 'bulanan' ? 30 : 90
    };

    const currentItems = StorageService.getHarvestItems();
    StorageService.saveHarvestItems([...currentItems, newItem]);
    setIsAddingNewItem(false);
    onHarvestRecorded();

    // Reset inputs
    setNewItemName('');
    setNewItemNotes('');
  };

  const filteredItems =
    selectedCategory === 'all'
      ? harvestItems
      : harvestItems.filter((i) => i.category === selectedCategory);

  // Grouped counts & totals
  const totalHarvestRevenue = harvestRecords.reduce((sum, r) => sum + r.totalIncome, 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-xs font-bold mb-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>Arus Kas 4 Lapis Joglo Tani</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Kalender Panen Berlapis Nusantara
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Menata waktu panen Harian, Mingguan, Bulanan, dan Tahunan. Setiap kali panen dicatat,
              otomatis terintegrasi ke <strong>Jurnal Keuangan Tani</strong>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingNewItem(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-sm transition-all"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Tambah Tanaman/Ternak</span>
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successToast && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-semibold flex items-center justify-between gap-2 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successToast}</span>
            </div>
            <button
              onClick={onNavigateToFinance}
              className="px-2.5 py-1 rounded bg-emerald-700 text-white text-[11px] font-bold underline cursor-pointer shrink-0"
            >
              Lihat Jurnal ➔
            </button>
          </div>
        )}

        {/* Filter Tabs (All, Harian, Mingguan, Bulanan, Tahunan) */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Kategori:</span>
          </span>
          {[
            { id: 'all', label: 'Semua Lapis', emoji: '🌟' },
            { id: 'harian', label: 'Harian (Telur & Sayur)', emoji: '🥚' },
            { id: 'mingguan', label: 'Mingguan (Lele & Cabai)', emoji: '🐟' },
            { id: 'bulanan', label: 'Bulanan (Ayam & Sorgum)', emoji: '🍗' },
            { id: 'tahunan', label: 'Tahunan (Padi & Domba)', emoji: '🌾' }
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-sm ring-2 ring-emerald-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Harvest Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const estimatedIncome = item.defaultAmount * item.estPricePerUnit;
          const badgeColors = {
            harian: 'bg-amber-100 text-amber-900 border-amber-300',
            mingguan: 'bg-teal-100 text-teal-900 border-teal-300',
            bulanan: 'bg-emerald-100 text-emerald-900 border-emerald-300',
            tahunan: 'bg-indigo-100 text-indigo-900 border-indigo-300'
          };

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-emerald-200 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-2xl">
                      {item.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm sm:text-base text-slate-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase border mt-0.5 ${
                          badgeColors[item.category]
                        }`}
                      >
                        Panen {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                  {item.notes}
                </p>

                {/* Numbers row */}
                <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Estimasi Sekali Panen:</span>
                    <span className="font-bold text-slate-900">
                      {item.defaultAmount} {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Harga Satuan Pasar:</span>
                    <span className="font-bold text-slate-900">
                      Rp {item.estPricePerUnit.toLocaleString('id-ID')} / {item.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
                    <span className="font-semibold text-emerald-800">Potensi Nilai Jual:</span>
                    <span className="font-black text-emerald-800">
                      Rp {estimatedIncome.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {item.lastHarvestDate ? `Terakhir: ${item.lastHarvestDate}` : 'Belum pernah dicatat'}
                </span>
                <button
                  onClick={() => openHarvestModal(item)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95 transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                  <span>Sudah Panen? Catat</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Riwayat Panen Terkini Table */}
      <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-700" />
            <div>
              <h3 className="text-base font-bold text-slate-900">Riwayat Catatan Panen</h3>
              <p className="text-xs text-slate-500">
                Total Perolehan Panen Tercatat:{' '}
                <strong className="text-emerald-700">Rp {totalHarvestRevenue.toLocaleString('id-ID')}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToFinance}
            className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer self-start sm:self-auto"
          >
            Buka Jurnal Keuangan Penuh ➔
          </button>
        </div>

        {harvestRecords.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Belum ada data, mulai catat panen pertama Anda dengan menekan tombol &ldquo;Sudah Panen? Catat&rdquo; di atas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Tanggal</th>
                  <th className="p-2.5">Komoditas</th>
                  <th className="p-2.5">Kategori</th>
                  <th className="p-2.5">Jumlah Panen</th>
                  <th className="p-2.5">Harga Satuan</th>
                  <th className="p-2.5">Total Uang Masuk</th>
                  <th className="p-2.5">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {harvestRecords.slice(0, 8).map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/60">
                    <td className="p-2.5 font-mono text-slate-500">{rec.date}</td>
                    <td className="p-2.5 font-bold text-slate-900">{rec.name}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase">
                        {rec.category}
                      </span>
                    </td>
                    <td className="p-2.5 font-semibold">
                      {rec.amount} {rec.unit}
                    </td>
                    <td className="p-2.5 text-slate-600">
                      Rp {rec.pricePerUnit.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2.5 font-bold text-emerald-700">
                      Rp {rec.totalIncome.toLocaleString('id-ID')}
                    </td>
                    <td className="p-2.5 text-slate-500 italic max-w-xs truncate">
                      {rec.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Record Harvest Modal Popup */}
      {recordingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-emerald-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{recordingItem.emoji}</span>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Catat Panen {recordingItem.name}</h3>
                  <span className="text-[11px] text-emerald-800 font-semibold uppercase">
                    Kategori: Panen {recordingItem.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setRecordingItem(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHarvest} className="space-y-3.5 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Jumlah Panen Riil ({recordingItem.unit}):
                </label>
                <input
                  type="number"
                  min="0.1"
                  step="any"
                  required
                  value={amountInput}
                  onChange={(e) => setAmountInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-sm focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Harga Jual Satuan (Rp per {recordingItem.unit}):
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={priceInput}
                  onChange={(e) => setPriceInput(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-bold text-sm focus:outline-emerald-600"
                />
              </div>

              {/* Total Calculation Preview */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-950">Total Uang Panen:</span>
                <span className="text-base font-black text-emerald-800">
                  Rp {(amountInput * priceInput).toLocaleString('id-ID')}
                </span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Catatan Tambahan (Pembeli / Kondisi Hasil):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Dibeli warung Bu Siti Pamotan, segar tanpa cacat"
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRecordingItem(null)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <CheckCircle className="w-4 h-4 text-amber-300" />
                  <span>Simpan ke Jurnal Keuangan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Custom Crop / Animal Modal */}
      {isAddingNewItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-emerald-200 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">
                Tambah Tanaman / Ternak Baru
              </h3>
              <button
                onClick={() => setIsAddingNewItem(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Komoditas:</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bebek Petelur Pesisir, Pepaya Calina, Ikan Nila"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lapis Panen:</label>
                  <select
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value as HarvestCategory)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="harian">Harian</option>
                    <option value="mingguan">Mingguan</option>
                    <option value="bulanan">Bulanan</option>
                    <option value="tahunan">Tahunan</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Ikon Emoji:</label>
                  <select
                    value={newItemEmoji}
                    onChange={(e) => setNewItemEmoji(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-300 bg-white text-lg"
                  >
                    <option value="🥚">🥚 Telur</option>
                    <option value="🥬">🥬 Sayur</option>
                    <option value="🐟">🐟 Ikan</option>
                    <option value="🌶️">🌶️ Cabai</option>
                    <option value="🍗">🍗 Ayam/Unggas</option>
                    <option value="🌾">🌾 Sorgum/Padi</option>
                    <option value="🫚">🫚 Rimpang</option>
                    <option value="🐑">🐑 Kambing/Domba</option>
                    <option value="🦆">🦆 Bebek</option>
                    <option value="🍈">🍈 Buah</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Panen:</label>
                  <input
                    type="number"
                    min="1"
                    value={newItemAmount}
                    onChange={(e) => setNewItemAmount(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Satuan:</label>
                  <input
                    type="text"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    placeholder="kg, butir, ikat, ekor"
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Harga Satuan (Rp):</label>
                  <input
                    type="number"
                    min="100"
                    step="100"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(Number(e.target.value))}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Keterangan / Lokasi:</label>
                <input
                  type="text"
                  placeholder="Contoh: Bedengan belakang dekat sumur bor"
                  value={newItemNotes}
                  onChange={(e) => setNewItemNotes(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNewItem(false)}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer shadow-sm"
                >
                  Simpan Komoditas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
