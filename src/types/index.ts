/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HarvestCategory = 'harian' | 'mingguan' | 'bulanan' | 'tahunan';

export interface HarvestItem {
  id: string;
  name: string;
  category: HarvestCategory;
  defaultAmount: number;
  unit: string;
  estPricePerUnit: number;
  emoji: string;
  notes: string;
  cycleIntervalDays: number;
  lastHarvestDate?: string;
}

export interface HarvestRecord {
  id: string;
  harvestItemId: string;
  name: string;
  category: HarvestCategory;
  date: string;
  amount: number;
  unit: string;
  pricePerUnit: number;
  totalIncome: number;
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'pemasukan' | 'pengeluaran';
  category: string;
  amount: number;
  description: string;
  source: 'panen' | 'manual' | 'simulasi';
  qty?: number;
  unit?: string;
}

export interface CycleNode {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  role: string;
  economicValue: string;
  details: string[];
  tipsPesisir: string;
}

export interface CycleEdge {
  from: string;
  to: string;
  label: string;
  description: string;
  flowVolume: string;
  savingsNote: string;
}

export interface FarmingModelRecommendation {
  id: 'buruan_sae' | 'vertical_heri' | 'joglo_tani';
  name: string;
  tokoh: string;
  rangeLuas: string;
  minLuas: number;
  maxLuas: number;
  filosofi: string;
  deskripsi: string;
  komponen: {
    nama: string;
    detail: string;
    emoji: string;
  }[];
  denahLayout: {
    zone: string;
    title: string;
    color: string;
    position: string;
    emoji: string;
    details: string;
  }[];
  potensiOmzetBulanan: number;
  estimasiBiayaBulanan: number;
  estimasiLabaBulanan: number;
  rekomendasiBibit: string[];
}

export interface Guide4IStep {
  step: number;
  title: string;
  detail: string;
  tips: string;
}

export interface Guide4IItem {
  id: 'icm' | 'inm' | 'ipm' | 'imm';
  code: string;
  title: string;
  kepanjangan: string;
  fokus: string;
  tokohKait: string;
  deskripsi: string;
  emoji: string;
  langkah: Guide4IStep[];
  dosisTakaran: {
    bahan: string;
    takaran: string;
    kegunaan: string;
  }[];
  videoTeks: {
    waktu: string;
    adegan: string;
    narasi: string;
  }[];
  resepKhususPesisir: {
    judul: string;
    bahan: string[];
    cara: string[];
  };
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface SchoolModule {
  id: number;
  title: string;
  tokoh: string;
  tagline: string;
  emoji: string;
  ringkasan: string;
  materiPoin: string[];
  penerapanPamotan: string;
  quiz: QuizQuestion[];
}

export interface GuruInfo {
  id: string;
  nama: string;
  asal: string;
  konsepUtama: string;
  quote: string;
  emoji: string;
  peran: string;
  poinKunci: string[];
  penjelasan: string;
}
