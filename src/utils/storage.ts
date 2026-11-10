/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HarvestItem, HarvestRecord, Transaction } from '../types';
import { INITIAL_HARVEST_ITEMS, INITIAL_TRANSACTIONS } from '../data/initialData';

const STORAGE_KEYS = {
  TRANSACTIONS: 'tani_terpadu_transactions_v1',
  HARVEST_ITEMS: 'tani_terpadu_harvest_items_v1',
  HARVEST_RECORDS: 'tani_terpadu_harvest_records_v1',
  SCHOOL_PROGRESS: 'tani_terpadu_school_progress_v1',
  SIMULATOR_CONFIG: 'tani_terpadu_sim_config_v1',
  FINANCIAL_TARGET: 'tani_terpadu_fin_target_v1'
};

export interface SimulatorStoredConfig {
  landSize: number;
  initialCapital: number;
  selectedModelId: 'buruan_sae' | 'vertical_heri' | 'joglo_tani';
  feedCostPercent: number; // e.g. 20%
}

export interface SchoolProgress {
  [moduleId: number]: {
    completed: boolean;
    score: number;
    total: number;
    userAnswers: { [questionId: number]: number };
    completedAt?: string;
  };
}

export interface FinancialTarget {
  targetMonthlyProfit: number;
  baselineLivingCost: number;
  notes: string;
}

export const StorageService = {
  getTransactions(): Transaction[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
        return INITIAL_TRANSACTIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read transactions from localStorage', e);
      return INITIAL_TRANSACTIONS;
    }
  },

  saveTransactions(items: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  },

  addTransaction(trx: Omit<Transaction, 'id'>): Transaction {
    const list = this.getTransactions();
    const newTrx: Transaction = {
      ...trx,
      id: `trx-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    };
    const updated = [newTrx, ...list];
    this.saveTransactions(updated);
    return newTrx;
  },

  deleteTransaction(id: string): Transaction[] {
    const list = this.getTransactions();
    const updated = list.filter((t) => t.id !== id);
    this.saveTransactions(updated);
    return updated;
  },

  getHarvestItems(): HarvestItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HARVEST_ITEMS);
      if (!data) {
        localStorage.setItem(STORAGE_KEYS.HARVEST_ITEMS, JSON.stringify(INITIAL_HARVEST_ITEMS));
        return INITIAL_HARVEST_ITEMS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read harvest items from localStorage', e);
      return INITIAL_HARVEST_ITEMS;
    }
  },

  saveHarvestItems(items: HarvestItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.HARVEST_ITEMS, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save harvest items to localStorage', e);
    }
  },

  getHarvestRecords(): HarvestRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HARVEST_RECORDS);
      if (!data) {
        const initialRecords: HarvestRecord[] = [
          {
            id: 'rec-1',
            harvestItemId: 'telur_ayam',
            name: 'Telur Ayam Segar',
            category: 'harian',
            date: '2026-11-09',
            amount: 18,
            unit: 'butir',
            pricePerUnit: 2200,
            totalIncome: 39600,
            notes: 'Panen telur pagi hari, cangkang cokelat tebal pakan maggot'
          },
          {
            id: 'rec-2',
            harvestItemId: 'sayur_kangkung',
            name: 'Sayur Kangkung & Bayam Cabut',
            category: 'harian',
            date: '2026-11-09',
            amount: 10,
            unit: 'ikat',
            pricePerUnit: 2500,
            totalIncome: 25000,
            notes: 'Sayur segar langsung dibeli ibu-ibu tetangga'
          },
          {
            id: 'rec-3',
            harvestItemId: 'lele_bioflok',
            name: 'Ikan Lele Bioflok Konsumsi',
            category: 'mingguan',
            date: '2026-11-05',
            amount: 15,
            unit: 'kg',
            pricePerUnit: 24000,
            totalIncome: 360000,
            notes: 'Disetor ke warung tenda Kalipucang'
          }
        ];
        localStorage.setItem(STORAGE_KEYS.HARVEST_RECORDS, JSON.stringify(initialRecords));
        return initialRecords;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read harvest records from localStorage', e);
      return [];
    }
  },

  recordHarvest(
    harvestItemId: string,
    amount: number,
    pricePerUnit: number,
    notes?: string
  ): { harvestRecord: HarvestRecord; transaction: Transaction } {
    const items = this.getHarvestItems();
    const targetItem = items.find((i) => i.id === harvestItemId);
    const today = new Date().toISOString().split('T')[0];

    const totalIncome = amount * pricePerUnit;
    const name = targetItem ? targetItem.name : 'Hasil Panen';
    const category = targetItem ? targetItem.category : 'harian';
    const unit = targetItem ? targetItem.unit : 'kg';

    const harvestRecord: HarvestRecord = {
      id: `hrec-${Date.now()}`,
      harvestItemId,
      name,
      category,
      date: today,
      amount,
      unit,
      pricePerUnit,
      totalIncome,
      notes
    };

    // Save harvest record
    const records = this.getHarvestRecords();
    localStorage.setItem(STORAGE_KEYS.HARVEST_RECORDS, JSON.stringify([harvestRecord, ...records]));

    // Update last harvest date in harvest items
    const updatedItems = items.map((item) =>
      item.id === harvestItemId ? { ...item, lastHarvestDate: today } : item
    );
    this.saveHarvestItems(updatedItems);

    // Auto insert into transactions!
    const transaction = this.addTransaction({
      date: today,
      type: 'pemasukan',
      category: `Panen ${name}`,
      amount: totalIncome,
      description: `Panen ${amount} ${unit} ${name} @ Rp ${pricePerUnit.toLocaleString('id-ID')}${notes ? ` - ${notes}` : ''}`,
      source: 'panen',
      qty: amount,
      unit
    });

    return { harvestRecord, transaction };
  },

  getSchoolProgress(): SchoolProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SCHOOL_PROGRESS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error('Failed to read school progress', e);
      return {};
    }
  },

  saveModuleQuiz(moduleId: number, score: number, total: number, answers: { [qId: number]: number }): void {
    const progress = this.getSchoolProgress();
    progress[moduleId] = {
      completed: score >= Math.ceil(total * 0.65),
      score,
      total,
      userAnswers: answers,
      completedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(STORAGE_KEYS.SCHOOL_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save quiz progress', e);
    }
  },

  getSimulatorConfig(): SimulatorStoredConfig {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SIMULATOR_CONFIG);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read sim config', e);
    }
    return {
      landSize: 200,
      initialCapital: 7500000,
      selectedModelId: 'vertical_heri',
      feedCostPercent: 20
    };
  },

  saveSimulatorConfig(config: SimulatorStoredConfig): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SIMULATOR_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save sim config', e);
    }
  },

  getFinancialTarget(): FinancialTarget {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FINANCIAL_TARGET);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to read fin target', e);
    }
    return {
      targetMonthlyProfit: 7500000,
      baselineLivingCost: 3500000,
      notes: 'Kemandirian pangan keluarga & tabungan pendidikan anak Pamotan'
    };
  },

  saveFinancialTarget(target: FinancialTarget): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FINANCIAL_TARGET, JSON.stringify(target));
    } catch (e) {
      console.error('Failed to save fin target', e);
    }
  },

  resetAllData(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
      localStorage.removeItem(STORAGE_KEYS.HARVEST_ITEMS);
      localStorage.removeItem(STORAGE_KEYS.HARVEST_RECORDS);
      localStorage.removeItem(STORAGE_KEYS.SCHOOL_PROGRESS);
      localStorage.removeItem(STORAGE_KEYS.SIMULATOR_CONFIG);
      localStorage.removeItem(STORAGE_KEYS.FINANCIAL_TARGET);
    } catch (e) {
      console.error('Failed to reset localStorage', e);
    }
  }
};
