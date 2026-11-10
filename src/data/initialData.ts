/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CycleNode,
  CycleEdge,
  FarmingModelRecommendation,
  Guide4IItem,
  GuruInfo,
  HarvestItem,
  SchoolModule,
  Transaction,
} from '../types';

export const GURUS_DATA: GuruInfo[] = [
  {
    id: 'to_suprapto',
    nama: 'T.O. Suprapto',
    asal: 'Joglo Tani, Manding / Sedayu, DI Yogyakarta',
    konsepUtama: 'Menanam apa yang dimakan, makan apa yang ditanam',
    quote: '"Petani harus berdaulat di tanahnya sendiri. Jangan beli apa yang bisa kita hasilkan dari pekarangan."',
    emoji: '🌾',
    peran: 'Bapak Gerakan Kedaulatan Pangan Mandiri Joglo Tani',
    poinKunci: [
      '4 Tangga Kedaulatan: Ketahanan Pangan ➔ Kemandirian Pangan ➔ Kedaulatan Pangan ➔ Kedaulatan Ekonomi',
      '5 Prinsip Wirausaha Petani: Niat yang lurus, Berkarya nyata, Kejujuran, Nilai Ibadah, Keikhlasan',
      'Pola Panen Berlapis: Tata waktu panen harian (telur/sayur), mingguan (ikan/cabai), bulanan (unggas/umbi), tahunan (padi/hewan besar)'
    ],
    penjelasan:
      'T.O. Suprapto mendedikasikan hidupnya melatih ribuan petani di Joglo Tani. Pendekatan beliau bukan sekadar bertani, melainkan mendidik mental petani menjadi wirausahawan mandiri yang tidak bergantung pada pupuk atau benih kimia pabrikan.'
  },
  {
    id: 'heri_sunarto',
    nama: 'Heri Sunarto',
    asal: 'Grobogan, Jawa Tengah',
    konsepUtama: 'Zero Waste Vertical Farming 4 Tingkat & Padi IP 400',
    quote: '"Limbah ayam adalah emas bagi maggot, limbah maggot adalah pupuk terbaik bagi cabai dan padi. Nol limbah, nol rugi."',
    emoji: '🐓',
    peran: 'Inovator Pertanian Vertikal Terpadu & Swasembada Padi Mandiri',
    poinKunci: [
      'Arsitektur 4 Tingkat: Atas cabai rawit & jahe merah ➔ Tengah kandang baterai ayam petelur ➔ Bawah biopond maggot BSF ➔ Bawah kolam mina lele/nila sebagai pabrik pupuk',
      'Target IP 400: Panen padi 4 kali setahun berkat nutrisi organik cair pekat dari dasar kolam',
      'Penghematan Nyata: Menghemat biaya input pupuk & pestisida Rp 12.000.000 - Rp 15.000.000 per hektar per tahun'
    ],
    penjelasan:
      'Heri Sunarto membuktikan bahwa lahan sempit berukuran 100-300 meter persegi bisa memproduksi telur tiap pagi, lele tiap minggu, cabai tiap musim, dan menghasilkan pupuk cair gratis untuk padi tanpa bau berkat larva maggot Black Soldier Fly.'
  },
  {
    id: 'gin_gin_ginanjar',
    nama: 'Ir. Gin Gin Ginanjar',
    asal: 'Sein Farm & Dinas Ketahanan Pangan Bandung',
    konsepUtama: 'Buruan SAE (Sehat, Alami, Ekonomis) & Sorgum Bioguma',
    quote: '"Pekarangan rumah bukan tempat membuang sampah, melainkan lumbung pangan dan tabungan keluarga."',
    emoji: '🌱',
    peran: 'Pencetus Gerakan Urban & Pesisir Buruan SAE serta Advokat Sorgum Bioguma',
    poinKunci: [
      '8 Pilar Buruan SAE: Olah sampah organik, sayuran pekarangan, kolam terpal ikan, ternak mini, tanaman herbal, benih mandiri, fertigasi sederhana, edukasi keluarga',
      'Sorgum Bioguma: Tanaman super hemat air, tahan tanah berpasir pesisir dan garam laut, panen 120 hari',
      'Multiguna 3P: Biji sorgum jadi Pangan (nasi & tepung bebas gluten), batang jadi Pakan ternak manis, ampas jadi Pupuk & bioetanol'
    ],
    penjelasan:
      'Ir. Gin Gin Ginanjar berhasil mengubah ribuan pekarangan sempit menjadi pusat ketahanan pangan mandiri. Pendekatan ini sangat cocok untuk daerah pesisir seperti Pamotan Kalipucang yang bersuhu hangat dan berpasir.'
  },
  {
    id: 'rizki_hamdani',
    nama: 'Rizki Hamdani',
    asal: 'Santri Tani Milenial, Jawa Timur',
    konsepUtama: 'Ngaji Tani & Santripreneur Lahan Mini',
    quote: '"Mulai saja dari 1,5 meter x 2,5 meter. Jangan menunggu lahan berhektar-hektar baru mau bertani."',
    emoji: '👳‍♂️',
    peran: 'Pelopor Wirausaha Pertanian Santri & Generasi Muda',
    poinKunci: [
      'Ngaji Tani: Menghubungkan dalil menjaga bumi dan kemandirian rezeki dengan sains pertanian modern',
      'Modal Awal Mini: Rak vertikal 1,5 x 2,5 meter cukup untuk 1 ember budikdamber lele kangkung dan 1 rak polybag cabai rawit',
      'Mental Santripreneur: Mengubah mindset pemuda desa dari mencari kerja di kota menjadi pencipta lapangan kerja di kampung halaman'
    ],
    penjelasan:
      'Rizki Hamdani membangkitkan kebanggaan generasi muda untuk terjun ke pertanian presisi terpadu, membuktikan bahwa santri dan pemuda desa bisa hidup makmur dan berkecukupan dari tanah leluhur.'
  },
  {
    id: 'kp4_ugm',
    nama: 'KP4 UGM (Pusat Inovasi Agroteknologi UGM)',
    asal: 'Universitas Gadjah Mada, Yogyakarta',
    konsepUtama: 'Sains 4I, Bisnis 5A, dan Manajemen 6M',
    quote: '"Kearifan lokal tanpa sains akan lambat; sains tanpa kearifan petani akan mandul."',
    emoji: '🏛️',
    peran: 'Rujukan Riset & Standar Ilmiah Pertanian Terpadu Indonesia',
    poinKunci: [
      'Sains 4I: Integrated Crop Management (ICM), Integrated Nutrient Management (INM), Integrated Pest Management (IPM), Integrated Moisture Management (IMM)',
      'Bisnis 5A: Agro-Production, Agro-Business, Agro-Technology, Agro-Industry, Agro-Tourism',
      'Manajemen 6M: Man (SDM), Money (Keuangan), Material (Bahan Organik), Method (SOP 4I), Machine (Alat Tepat Guna), Market (Pasar Lokal Pamotan)'
    ],
    penjelasan:
      'KP4 UGM memadukan riset laboratorium dengan praktik lapangan. Prinsip 4I membimbing petani mengelola tanaman, nutrisi, hama, dan air secara terpadu tanpa bahan kimia berbahaya.'
  },
  {
    id: 'bayu_diningrat',
    nama: 'Bayu Diningrat',
    asal: 'Bayu Sehat Mandiri (BSM) & Petani Teman Sejati (PTS)',
    konsepUtama: 'Kemandirian Mutlak & Target 1005: 1.000m² = Rp 5 Juta/bln',
    quote: '"Apa yang ada, jangan mengada-ada. Mulai dari yang kecil, yang ikhlas kita kehilangan. Bertani adalah ibadah."',
    emoji: '🌿',
    peran: 'Guru Kemandirian Petani & Pelopor Gerakan Petani Teman Sejati',
    poinKunci: [
      'Filosofi Kemandirian: "Apa yang ada, jangan mengada-ada. Mulai dari yang kecil, yang ikhlas kita kehilangan."',
      'Rumus Target 1005: 1.000 m² lahan pekarangan dioptimasi menghasilkan Rp 5.000.000 per bulan secara berkesinambungan (30% Sayur Harian, 30% Ayam & Lele Mingguan, 20% Jahe & Sorgum Bulanan, 20% Buah Mata Air)',
      'NPK Ternak Mandiri: Ayam = N (Nitrogen), Sapi = P (Fosfor), Kambing = K (Kalium), dicampur 1:1:1 + sekam tanpa beli pupuk pabrik',
      'Kemandirian Benih & Sawah Palsu: Bikin benih jagung & padi sendiri, tanam padi di galon/karung (1 polybag = 1 kg beras), pakan gratis azolla + singkong, serta lestarikan 6 Tanaman Mata Air'
    ],
    penjelasan:
      'Bayu Diningrat membimbing petani agar tidak berhutang dan tidak bergantung pada pasokan luar. Dengan prinsip "Bertani adalah ibadah", petani mandiri diajarkan menghasilkan bibit, pupuk, pakan, hingga sawah mandiri di lahan sempit sekalipun.'
  }
];

export const CYCLE_NODES: CycleNode[] = [
  {
    id: 'kotoran_ayam',
    title: 'Kotoran Ayam & Bebek',
    subtitle: 'Limbah Kaya Nitrogen',
    emoji: '💩',
    color: 'amber',
    role: 'Bahan Baku Nutrisi Awal',
    economicValue: 'Hemat Rp 450.000/bln untuk pembelian pupuk kandang',
    details: [
      'Kotoran jatuh ke bawah kandang langsung diurai oleh larva maggot BSF.',
      'Amonia dinetralkan dalam hitungan jam sehingga kandang tidak berbau pesing.',
      'Mengandung Nitrogen (N) tinggi hingga 3,2% dan Kalium (K) 1,5%.'
    ],
    tipsPesisir: 'Di iklim pesisir Pamotan yang panas, beri alas terpal miring agar kotoran mudah diserok atau langsung diarahkan ke kotak biopond maggot.'
  },
  {
    id: 'maggot_bsf',
    title: 'Biopond Maggot BSF',
    subtitle: 'Bio-Konversi 24 Jam',
    emoji: '🐛',
    color: 'emerald',
    role: 'Pabrik Protein & Kasgot',
    economicValue: 'Pakan gratis berprotein 40-44%, pangkas 60% biaya pakan komersial',
    details: [
      '10.000 larva maggot mampu menghabiskan 5 kg kotoran ayam dan sisa dapur dalam 24 jam.',
      'Sisa kotoran yang telah dicerna maggot berubah menjadi "Kasgot" (Bekas Maggot), pupuk slow-release super subur.',
      'Maggot hidup dipanen harian untuk pakan lele bioflok dan ayam petelur.'
    ],
    tipsPesisir: 'Maggot sangat menyukai kehangatan pantai Pangandaran (28-34°C), mempercepat siklus penetasan telur BSF.'
  },
  {
    id: 'kasgot_poc',
    title: 'Pupuk Kasgot & POC',
    subtitle: 'Penyubur Pasir Pesisir',
    emoji: '🧪',
    color: 'teal',
    role: 'Nutrisi Organik Lengkap',
    economicValue: 'Menggantikan 100% NPK kimia, hemat Rp 600.000/musim',
    details: [
      'Kasgot mengandung asam humat alami yang mengikat butiran pasir pesisir Kalipucang agar mampu menahan air.',
      'POC dibuat dari air cucian beras, gula aren/molase, dan urin kelinci/air kolam terfermentasi 7 hari.',
      'Kaya mikroba pengurai Trichoderma dan Bacillus yang melindungi akar tanaman dari jamur layu.'
    ],
    tipsPesisir: 'Campurkan Kasgot dengan sabut kelapa halus (cocopeat) yang melimpah di pesisir Pangandaran sebagai media tanam super empuk.'
  },
  {
    id: 'tanaman_terpadu',
    title: 'Bedengan Tanaman Nusantara',
    subtitle: 'Cabai, Jahe & Sorgum',
    emoji: '🌶️',
    color: 'rose',
    role: 'Mesin Panen & Penghasil Oksigen',
    economicValue: 'Panen cabai mingguan Rp 150.000 + Sorgum panen 120 hari',
    details: [
      'Cabai rawit & jahe merah di polybag vertikal memanfaatkan sirkulasi udara pesisir.',
      'Sorgum Bioguma ditanam di perbatasan lahan sebagai penahan angin laut (windbreak) sekaligus pangan tahan kekeringan.',
      'Kangkung dan bayam dipanen harian untuk konsumsi keluarga dan dijual ke tetangga.'
    ],
    tipsPesisir: 'Tanah berpasir Pamotan memiliki drainase baik, sangat cocok untuk jahe merah agar rimpang tidak mudah busuk.'
  },
  {
    id: 'sisa_panen',
    title: 'Biomassa & Sisa Panen',
    subtitle: 'Batang & Daun Sorgum',
    emoji: '🌾',
    color: 'yellow',
    role: 'Bahan Baku Fermentasi Pakan',
    economicValue: 'Pakan hijauan alternatif gratis untuk ternak',
    details: [
      'Batang sorgum Bioguma manis seperti tebu, dapat diperas jadi sirup atau dicacah untuk pakan fermentasi (silase).',
      'Daun cabai dan kangkung afkir diumpankan kembali ke biopond maggot atau bebek.',
      'Jerami sorgum dijadikan mulsa penutup tanah pasir agar kelembaban tanah terjaga dari terik matahari pantai.'
    ],
    tipsPesisir: 'Gunakan batang sorgum cacah sebagai tempat perlindungan cacing tanah lokal.'
  },
  {
    id: 'kolam_lele',
    title: 'Kolam Lele Bioflok',
    subtitle: 'Protein & Pabrik Air Nitrat',
    emoji: '🐟',
    color: 'cyan',
    role: 'Penghasil Ikan & Air Pupuk',
    economicValue: 'Panen lele 120-150 kg per siklus (omzet Rp 2.700.000 - Rp 3.300.000)',
    details: [
      'Kolam bundar diameter 2 meter menampung 1.000 - 1.500 ekor lele Sangkuriang.',
      'Pakan utama gabungan maggot segar hidup dan pelet fermentasi mikroba bioflok.',
      'Air kolam yang keruh kaya bakteri heterotrof dialirkan langsung menjadi air siraman tanaman (fertigasi alami tanpa kimia).'
    ],
    tipsPesisir: 'Suhu air kolam di Pamotan yang hangat membuat metabolisme lele sangat aktif dan laju pertumbuhan lebih cepat.'
  },
  {
    id: 'ayam_unggas',
    title: 'Ayam Petelur & Unggas',
    subtitle: 'Penghasil Telur Harian',
    emoji: '🥚',
    color: 'orange',
    role: 'Arus Kas Harian (Daily Cashflow)',
    economicValue: '15-20 butir telur per hari (Rp 35.000 - Rp 50.000/hari)',
    details: [
      'Kandang baterai 20-30 ekor ayam ras atau ayam KUB diletakkan tepat di atas biopond maggot.',
      'Pakan ayam dicampur maggot segar kaya protein dan kalsium, membuat cangkang telur tebal dan kuning telur jingga pekat.',
      'Menghasilkan telur segar harian untuk menjamin kebutuhan dapur keluarga dan kas harian petani.'
    ],
    tipsPesisir: 'Ventilasi kandang terbuka memaksimalkan angin sepoi pantai Kalipucang agar ayam tidak stres karena kepanasan.'
  }
];

export const CYCLE_EDGES: CycleEdge[] = [
  {
    from: 'ayam_unggas',
    to: 'kotoran_ayam',
    label: 'Kotoran Harian',
    description: 'Setiap ayam menghasilkan 100-150 gr kotoran basah per hari, jatuh langsung tanpa perlu disapu.',
    flowVolume: '3 - 5 kg / hari (dari 25 ekor)',
    savingsNote: 'Nol biaya kebersihan kandang'
  },
  {
    from: 'kotoran_ayam',
    to: 'maggot_bsf',
    label: 'Dimakan Maggot',
    description: 'Kotoran baru langsung dicerna larva maggot BSF dalam 2-4 jam, menghilangkan bau amonia seketika.',
    flowVolume: '100% kotoran terurai',
    savingsNote: 'Kandang bebas lalat hijau & amonia'
  },
  {
    from: 'maggot_bsf',
    to: 'kasgot_poc',
    label: 'Residu Kasgot',
    description: 'Bekas cernaan maggot berupa butiran kering kehitaman (kasgot) dikumpulkan seminggu sekali.',
    flowVolume: '20 - 30 kg pupuk kasgot / minggu',
    savingsNote: 'Setara 1 karung pupuk NPK Rp 150.000'
  },
  {
    from: 'maggot_bsf',
    to: 'kolam_lele',
    label: 'Pakan Maggot Hidup',
    description: 'Maggot usia 12-15 hari dipanen dan dilempar langsung ke kolam lele sebagai pakan super protein 42%.',
    flowVolume: '1 - 2 kg maggot hidup / hari',
    savingsNote: 'Hemat biaya pelet pabrikan 50-60%'
  },
  {
    from: 'maggot_bsf',
    to: 'ayam_unggas',
    label: 'Pakan Tambahan Ayam',
    description: 'Larva maggot kaya asam laurat meningkatkan daya tahan tubuh ayam tanpa antibiotik kimia.',
    flowVolume: '0,5 kg / hari untuk 25 ayam',
    savingsNote: 'Produksi telur stabil 85-90%'
  },
  {
    from: 'kasgot_poc',
    to: 'tanaman_terpadu',
    label: 'Pemupukan Kasgot',
    description: 'Kasgot ditabur di bedengan sorgum dan polybag cabai rawit setiap 2 minggu sekali.',
    flowVolume: '2 genggam per polybag',
    savingsNote: 'Tanah pasir pesisir jadi gembur hitam'
  },
  {
    from: 'kolam_lele',
    to: 'tanaman_terpadu',
    label: 'Air Limbah Nitrat',
    description: 'Air siphon dasar kolam lele yang pekat dialirkan mengairi bedengan tanaman (fertigasi lele).',
    flowVolume: '100 - 200 liter / 3 hari',
    savingsNote: 'Pupuk nitrogen cair gratis tak terbatas'
  },
  {
    from: 'tanaman_terpadu',
    to: 'sisa_panen',
    label: 'Brangkasan & Daun',
    description: 'Sisa pangkasan cabai, daun sorgum tua, dan akar kangkung dipisahkan saat panen.',
    flowVolume: '5 - 10 kg biomassa / minggu',
    savingsNote: 'Nol sampah dibuang ke TPA'
  },
  {
    from: 'sisa_panen',
    to: 'maggot_bsf',
    label: 'Pakan Sayur Maggot',
    description: 'Sisa dedaunan dan ampas sorgum dicacah lalu dimasukkan ke biopond sebagai selingan serat maggot.',
    flowVolume: 'Campuran harian',
    savingsNote: 'Mempercepat siklus biokonversi'
  }
];

export const FARMING_MODELS: FarmingModelRecommendation[] = [
  {
    id: 'buruan_sae',
    name: 'Model Pekarangan Buruan SAE Pamotan',
    tokoh: 'Ir. Gin Gin Ginanjar & Rizki Hamdani',
    rangeLuas: '< 200 m² (Optimal 30 - 150 m²)',
    minLuas: 20,
    maxLuas: 199,
    filosofi: 'Sehat, Alami, Ekonomis di Halaman Rumah Sendiri',
    deskripsi:
      'Solusi mandiri pangan untuk pekarangan rumah warga Desa Pamotan. Menggunakan rak vertikal berundak, kolam terpal bulat mini, dan biopond mini tanpa bau sehingga ramah tetangga dan aman di kawasan pemukiman.',
    komponen: [
      { nama: 'Kandang Baterai Mini', detail: '10 - 15 ekor ayam petelur (panen 8-12 butir telur/hari)', emoji: '🐓' },
      { nama: '1 Kolam Terpal D-1.5m', detail: 'Isi 500 ekor lele bioflok terpadu kangkung air (budikdamber)', emoji: '🐟' },
      { nama: 'Rak Vertikal 3 Tingkat', detail: '80 polybag cabai rawit merah & jahe merah pesisir', emoji: '🌶️' },
      { nama: 'Biopond BSF Kotak 1x1m', detail: 'Pengolah kotoran ayam + sisa sayur dapur keluarga', emoji: '🐛' },
      { nama: 'Bedengan Pojok Pagar', detail: '15 rumpun sorgum Bioguma sebagai penahan angin pesisir', emoji: '🌾' }
    ],
    denahLayout: [
      { zone: 'Zona Depan (A)', title: 'Rak Vertikal Cabai & Sayur Daun', color: 'emerald', position: 'Dekat akses sinar matahari pagi', emoji: '🥬', details: 'Polybag bertingkat, panen kangkung/bayam harian' },
      { zone: 'Zona Samping (B)', title: 'Kolam Terpal Lele D-1.5m', color: 'cyan', position: 'Dekat saluran buangan ke tanaman', emoji: '🐟', details: 'Air kurasan langsung mengalir ke rak polybag' },
      { zone: 'Zona Belakang (C)', title: 'Kandang Ayam Mini & Biopond Maggot', color: 'amber', position: 'Area terlindung dengan ventilasi lancar', emoji: '🐓', details: 'Kandang 1.5m x 1.5m di atas kotak maggot kasgot' },
      { zone: 'Zona Pembatas (D)', title: 'Pagar Rumpun Sorgum Bioguma', color: 'yellow', position: 'Pojok batas pekarangan', emoji: '🌾', details: 'Penahan debu pasir pantai sekaligus sumber biji' }
    ],
    potensiOmzetBulanan: 1850000,
    estimasiBiayaBulanan: 450000,
    estimasiLabaBulanan: 1400000,
    rekomendasiBibit: ['Cabai Rawit Bara/Ori 212', 'Jahe Merah Super', 'Lele Dumbo/Sangkuriang', 'Sorgum Bioguma 1 & 2', 'Ayam KUB / Ras Petelur']
  },
  {
    id: 'vertical_heri',
    name: 'Model Zero Waste Vertical Farming Pamotan',
    tokoh: 'Heri Sunarto (Inovasi Vertikal 4 Tingkat)',
    rangeLuas: '200 - 1.000 m² (Paling Populer & Efisien)',
    minLuas: 200,
    maxLuas: 1000,
    filosofi: 'Satu Bangunan 4 Panen Sekaligus: Cabai, Telur, Maggot, Lele',
    deskripsi:
      'Model terpadu efisiensi tinggi ala Heri Sunarto. Memanfaatkan gaya gravitasi: kotoran ayam di tingkat dua jatuh ke rak biopond maggot di tingkat satu, air saringan mengalir ke kolam lele dasar, uap nutrisi menyuburkan tanaman jahe dan cabai di lantai atas.',
    komponen: [
      { nama: 'Lantai Atas (Rooftop/Rak)', detail: '250 polybag cabai rawit & jahe merah gajah berjarak rapat', emoji: '🌶️' },
      { nama: 'Lantai Tengah (Kandang)', detail: 'Kandang kawat ram 50 ekor ayam petelur produktif', emoji: '🐓' },
      { nama: 'Lantai Bawah (Biopond)', detail: 'Rak biopond BSF pengurai kotoran ayam kontinu 5 kg/hari', emoji: '🐛' },
      { nama: 'Dasar Tanah (Kolam Bioflok)', detail: '2 unit kolam terpal D-2.5m isi 2.500 ekor lele Sangkuriang', emoji: '🐟' },
      { nama: 'Lahan Terbuka Tepi', detail: 'Kebun sorgum Bioguma 100 rumpun + instalasi drum fermentasi POC', emoji: '🌾' }
    ],
    denahLayout: [
      { zone: 'Zona Inti (A)', title: 'Tower Vertikal 4 Tingkat (6m x 4m)', color: 'rose', position: 'Pusat lahan dengan atap transparan', emoji: '🏢', details: 'Tingkat 3: Cabai; Tingkat 2: Ayam; Tingkat 1: Maggot; Bawah: Kolam' },
      { zone: 'Zona Akuakultur (B)', title: '2 Kolam Bioflok Lele D-2.5m', color: 'cyan', position: 'Bersebelahan dengan menara vertikal', emoji: '🐟', details: 'Dilengkapi blower aerasi dan pipa drainase ke bedengan' },
      { zone: 'Zona Agronomi (C)', title: 'Bedengan Sorgum Bioguma & Sayur', color: 'emerald', position: 'Area terbuka menghadap selatan', emoji: '🌾', details: 'Mendapat siraman air buangan kolam lele kaya hara' },
      { zone: 'Zona Pabrik Pupuk (D)', title: 'Rumah POC & Pengeringan Kasgot', color: 'amber', position: 'Sisi teduh lahan', emoji: '🧪', details: 'Drum fermentasi 200 liter pupuk cair organik & ayak kasgot' }
    ],
    potensiOmzetBulanan: 5800000,
    estimasiBiayaBulanan: 1200000,
    estimasiLabaBulanan: 4600000,
    rekomendasiBibit: ['Cabai Rawit Kalipucang Unggul', 'Jahe Merah Empu Besar', 'Lele Sangkuriang', 'Sorgum Bioguma', 'Ayam Petelur Lohmann Brown / KUB']
  },
  {
    id: 'joglo_tani',
    name: 'Model Agro-Ekosistem Joglo Tani Luas',
    tokoh: 'T.O. Suprapto & KP4 UGM',
    rangeLuas: '> 1.000 m² (1.000 - 5.000+ m²)',
    minLuas: 1001,
    maxLuas: 100000,
    filosofi: 'Kedaulatan Ekonomi Total: Pangan, Ternak, Perikanan, dan Eduwisata',
    deskripsi:
      'Kawasan terpadu mandiri pangan ala Joglo Tani. Memadukan sawah padi IP 400 (jika ada irigasi/sumur bor), hamparan sorgum Bioguma penahan angin pesisir, ternak domba/kambing, unggas petelur, kolam mina ikan air tawar, dan saung belajar tani untuk warga Pamotan.',
    komponen: [
      { nama: 'Sawah Organik IP 400', detail: 'Padi organik 4x panen setahun menggunakan pupuk hayati mandiri', emoji: '🌾' },
      { nama: 'Kebun Sorgum & Palawija', detail: 'Hamparan sorgum Bioguma penyuplai pakan ternak & industri tepung lokal', emoji: '🌱' },
      { nama: 'Kandang Domba & Ayam', detail: 'Kandang panggung 10 ekor domba + 100 ekor ayam kampung petelur', emoji: '🐑' },
      { nama: 'Kolam Mina 4 Unit', detail: 'Kombinasi kolam lele bioflok, kolam nila, dan kolam tandon pengendapan air', emoji: '🐟' },
      { nama: 'Pusat Edukasi & Pengolahan', detail: 'Saung Joglo pelatihan tani, penggilingan sorgum, pabrik bokashi', emoji: '🏡' }
    ],
    denahLayout: [
      { zone: 'Zona Tanaman Pangan (A)', title: 'Sawah Padi IP 400 & Sorgum Bioguma', color: 'emerald', position: 'Sektor utama mendapat sinar matahari penuh', emoji: '🌾', details: 'Dikelilingi parit mina padi & pematang bertanaman serai/kenikir' },
      { zone: 'Zona Peternakan (B)', title: 'Kandang Panggung Domba & Ayam', color: 'amber', position: 'Sisi belakang dengan penampungan kotoran miring', emoji: '🐑', details: 'Kotoran padat untuk biogas/kompos, kotoran basah untuk maggot' },
      { zone: 'Zona Perikanan Terpadu (C)', title: 'Klaster 4 Kolam Lele & Nila', color: 'cyan', position: 'Tengah lahan sebagai tandon sirkulasi air', emoji: '🐟', details: 'Air kaya nutrien didistribusikan ke seluruh petak sawah & kebun' },
      { zone: 'Zona Joglo & Riset (D)', title: 'Saung Joglo Tani & Laboratorium POC', color: 'indigo', position: 'Depan gerbang masuk', emoji: '🏡', details: 'Tempat kumpul kelompok tani Pamotan, workshop & uji benih' }
    ],
    potensiOmzetBulanan: 16500000,
    estimasiBiayaBulanan: 3800000,
    estimasiLabaBulanan: 12700000,
    rekomendasiBibit: ['Padi Varietas Genjah Inpari 32 / Ciherang', 'Sorgum Bioguma 1, 2, 3', 'Cabai Rawit & Bawang Merah', 'Domba Garut / Ekor Gemuk', 'Lele & Nila Gesit']
  }
];

export const GUIDES_4I: Guide4IItem[] = [
  {
    id: 'icm',
    code: 'ICM',
    title: 'Integrated Crop Management',
    kepanjangan: 'Pengelolaan Tanaman Terpadu (PTT)',
    fokus: 'Tumpang Sari Sorgum + Cabai + Jahe di Tanah Berpasir Pamotan',
    tokohKait: 'KP4 UGM & Ir. Gin Gin Ginanjar',
    emoji: '🌱',
    deskripsi:
      'Teknik rekayasa pola tanam tumpang sari sinergis. Di iklim pesisir Pamotan Kalipucang yang bersuhu tinggi dan bertanah pasir, tanaman disusun bertingkat: Sorgum Bioguma sebagai tameng angin laut kencang, menaungi cabai rawit dan jahe merah di bawahnya agar terhindar dari penguapan ekstrem.',
    langkah: [
      {
        step: 1,
        title: 'Pembenahan Tanah Pasir Pesisir',
        detail:
          'Campurkan tanah pasir lokal dengan kompos kasgot dan arang sekam/cocopeat dengan perbandingan 2:2:1. Beri kapur dolomit 50 gr/m² jika tanah agak masam dekat pantai.',
        tips: 'Tanah pasir miskin hara namun berpori bagus; kunci kesuburannya adalah menambahkan bahan organik pengikat air.'
      },
      {
        step: 2,
        title: 'Zonasi Tanam Bersaf (Windbreak Sistem)',
        detail:
          'Tanam Sorgum Bioguma di barisan terluar (menghadap arah angin laut barat daya Kalipucang) dengan jarak tanam 70 x 20 cm. Barisan dalam untuk bedengan cabai rawit jarak 50 x 50 cm.',
        tips: 'Sorgum akan tumbuh setinggi 2-3 meter dalam 40 hari, menjadi benteng pelindung bagi bunga cabai agar tidak rontok diterpa angin kencang.'
      },
      {
        step: 3,
        title: 'Penanaman Sisip Jahe Merah di Bawah Naungan',
        detail:
          'Tanam rimpang jahe merah bertunas di polybag ukuran 40x40 cm atau di sela bedengan sorgum. Jahe membutuhkan naungan 25-30% yang pas disediakan oleh kanopi daun sorgum.',
        tips: 'Siram bibit jahe dengan POC air cucian beras saat pertama kali tanam untuk merangsang akar baru.'
      },
      {
        step: 4,
        title: 'Pemasangan Mulsa Organik Sabut Kelapa',
        detail:
          'Tutup permukaan bedengan dan polybag dengan cacahan sabut kelapa atau jerami padi setebal 3 cm. Ini menekan penguapan hingga 70% dan menghambat gulma liar.',
        tips: 'Sabut kelapa banyak tersedia gratis di pesisir Pangandaran dan mengandung kalium alami yang disukai cabai.'
      },
      {
        step: 5,
        title: 'Rotasi & Peremajaan Panen Kontinu',
        detail:
          'Setelah cabai masuk masa petik minggu ke-12, siapkan bibit sulaman baru. Saat sorgum dipanen di hari ke-115, ratun (tunas anakan kedua) dibiarkan tumbuh untuk panen kedua tanpa perlu tanam ulang.',
        tips: 'Sorgum bisa diratun hingga 2-3 kali panen, menghemat tenaga olah lahan dan pembelian benih.'
      }
    ],
    dosisTakaran: [
      { bahan: 'Kompos Kasgot Maggot', takaran: '200 gram / polybag atau 2 kg / m² bedengan', kegunaan: 'Pupuk dasar kaya hara lambat urai' },
      { bahan: 'Arang Sekam / Cocopeat', takaran: '1 ember per 5 ember tanah pasir', kegunaan: 'Menahan air dan kelembaban tanah pasir pesisir' },
      { bahan: 'Kapur Dolomit', takaran: '50 - 100 gram per meter persegi bedengan', kegunaan: 'Menetralkan pH tanah pesisir ke 6.2 - 6.8' }
    ],
    videoTeks: [
      { waktu: '00:00 - 00:45', adegan: 'Petani menunjukkan tanah berpasir kering di Pamotan Kalipucang', narasi: '"Bapak Ibu dulur tani Pamotan, tanah pasir dekat muara dan pantai Kalipucang ini jangan dianggap tandus. Dengan metode ICM terpadu, kita sulap jadi lumbung cabai dan sorgum subur tanpa kimia!"' },
      { waktu: '00:46 - 02:15', adegan: 'Mencampur pasir, kasgot, dan arang sekam dalam bak kayu', narasi: '"Perhatikan teksturnya: kasgot mengikat pasir, sekam menyimpan air. Ini media tanam abadi kita. Sekali buat, bisa dipakai berkali-kali musim tanam."' },
      { waktu: '02:16 - 03:40', adegan: 'Menanam sorgum di sisi luar dan cabai di sisi dalam', narasi: '"Sorgum Bioguma di sisi luar bukan cuma buat dipanen bijinya, tapi jadi benteng angin laut Kalipucang. Bunga cabai dijamin aman, tidak rontok, buahnya lebat sampai ke pucuk."' }
    ],
    resepKhususPesisir: {
      judul: 'Formula Media Tanam Pasir Mandiri Pamotan',
      bahan: ['2 Bagian Tanah Pasir Kebun Lokal', '2 Bagian Kasgot Maggot BSF Kering', '1 Bagian Cocopeat Halus / Sabut Kelapa', '1 Genggam Abu Bakaran Batang Sorgum'],
      cara: [
        'Ayak tanah pasir untuk membuang batu kerikil tajam.',
        'Campurkan kasgot dan cocopeat sampai merata dengan cangkul.',
        'Taburkan abu bakaran sorgum sebagai sumber kalium dan silika alami.',
        'Diamkan campuran selama 3 hari di tempat teduh sebelum dimasukkan bibit.'
      ]
    }
  },
  {
    id: 'inm',
    code: 'INM',
    title: 'Integrated Nutrient Management',
    kepanjangan: 'Pengelolaan Hara & Nutrisi Terpadu',
    fokus: 'Pabrik Pupuk Mandiri: Kasgot + Air Kolam Lele + POC Leri Beras',
    tokohKait: 'Heri Sunarto & T.O. Suprapto',
    emoji: '🧪',
    deskripsi:
      'Memutus 100% ketergantungan pada pupuk subsidi kimia yang langka dan mahal. Memanfaatkan tiga sumber hara gratis di lahan sendiri: kotoran ayam diolah kasgot, air kurasan kolam lele bioflok yang kaya nitrat terlarut, dan POC fermentasi air cucian beras (leri) berenergi molase gula kelapa lokal.',
    langkah: [
      {
        step: 1,
        title: 'Pemanenan Pupuk Kasgot (Bekas Maggot)',
        detail:
          'Ambil residu media biopond maggot setiap 7 hari sekali. Ayak menggunakan saringan kawat 0,5 cm untuk memisahkan larva dari butiran pupuk kasgot hitam remah.',
        tips: 'Kasgot mengandung hormon auksin, giberelin, dan sitokinin alami hasil pencernaan maggot BSF.'
      },
      {
        step: 2,
        title: 'Pembuatan Biang POC Air Cucian Beras (Leri Berkah)',
        detail:
          'Tampung 10 liter air cucian beras pertama dan kedua dalam jerigen 20 liter. Tambahkan 250 gram gula aren/kelapa lokal Kalipucang yang dicairkan, lalu masukkan 100 ml biang mikroba EM4 atau 1 botol yakult.',
        tips: 'Gula kelapa asli Pangandaran memberi energi langsung bagi bakteri pengurai Bacillus dan ragi menguntungkan.'
      },
      {
        step: 3,
        title: 'Fermentasi Anaerob 7 Hari',
        detail:
          'Tutup rapat jerigen POC dengan sistem selang aerasi ke dalam botol air mineral (airlock sederhana) agar gas fermentasi keluar tanpa kemasukan udara luar. Diamkan di tempat teduh selama 7-10 hari.',
        tips: 'Tanda POC matang sempurna: aroma fermentasi harum manis seperti tape/tuak ketan, bukan bau busuk got.'
      },
      {
        step: 4,
        title: 'Penyadapan Air Bioflok Dasar Kolam Lele',
        detail:
          'Buka kran siphon dasar kolam lele bioflok setiap 3-4 hari sekali sebanyak 10-15% volume air kolam. Air ini pekat dengan endapan feses lele yang telah diuraikan bakteri bioflok menjadi nitrat instan.',
        tips: 'Jangan buang air kolam ke selokan umum; tampung di drum fertigasi untuk disiramkan ke tanaman cabai dan sorgum.'
      },
      {
        step: 5,
        title: 'Aplikasi Terjadwal ke Daun & Akar',
        detail:
          'Kocor kasgot 2 genggam per tanaman tiap 14 hari. Siram air kolam lele berseling dengan POC leri (dosis 1:10 dengan air sumur) seminggu 2 kali pada pagi hari sebelum jam 09.00.',
        tips: 'Pori stomata daun terbuka maksimal di pagi hari, menyerap nutrisi cair dalam 30 menit.'
      }
    ],
    dosisTakaran: [
      { bahan: 'Kasgot Maggot Murni', takaran: '2 sendok makan per polybag / 200 gr per lubang tanam', kegunaan: 'Pupuk lambat urai untuk kesuburan perakaran' },
      { bahan: 'POC Leri Beras Fermentasi', takaran: '100 ml POC diencerkan dalam 1 liter air bersih', kegunaan: 'Kocor akar dan semprot halus daun' },
      { bahan: 'Air Endapan Kolam Lele', takaran: '1 liter air kolam + 2 liter air sumur (atau siram langsung)', kegunaan: 'Booster pertumbuhan vegetatif daun dan batang hijau tua' }
    ],
    videoTeks: [
      { waktu: '00:00 - 00:50', adegan: 'Menunjukkan jerigen POC leri dan drum air kolam lele', narasi: '"Dulur tani Pamotan, berhenti mengeluh pupuk kimia mahal atau subsidi dicabut! Lihat ini, di lahan kita ada pabrik pupuk gratis 24 jam nonstop."' },
      { waktu: '00:51 - 02:20', adegan: 'Membuka kran siphon kolam lele dan menuang air hijau ke ember kocor', narasi: '"Air kolam lele bioflok ini baunya harum segar, kaya asam amino dan nitrat. Kalau disiramkan ke cabai rawit, buahnya mengkilap dan pedasnya nendang!"' },
      { waktu: '02:21 - 03:30', adegan: 'Menabur pupuk kasgot di sekeliling batang jahe merah', narasi: '"Dan ini kasgot buangan maggot. Teksturnya gembur seperti humus hutan jati. Tanah pasir pesisir langsung hidup mikroorganismenya."' }
    ],
    resepKhususPesisir: {
      judul: 'Resep POC Leri Gula Kelapa Pamotan (Kapasitas 20 Liter)',
      bahan: ['15 Liter Air Cucian Beras (Leri)', '500 Gram Gula Kelapa Asli Pangandaran (dilelehkan)', '150 ml EM4 Pertanian / Biang Ragi Tape Lokal', '2 Butir Telur Bebek Lokal (kocok lepas untuk kalsium)'],
      cara: [
        'Campurkan air cucian beras dengan cairan gula kelapa di dalam jerigen.',
        'Masukkan kocokan telur bebek dan bakteri pengurai EM4/ragi.',
        'Aduk memutar searah jarum jam selama 2 menit.',
        'Tutup jerigen rapat, pasang selang pembuang gas ke botol air.',
        'Simpan 7-10 hari. Siap pakai jika sudah berbau wangi tape manis.'
      ]
    }
  },
  {
    id: 'ipm',
    code: 'IPM',
    title: 'Integrated Pest Management',
    kepanjangan: 'Pengendalian Hama & Penyakit Terpadu Nabati',
    fokus: 'Pestisida Nabati Bawang Putih + Air Kelapa ala Heri Sunarto',
    tokohKait: 'Heri Sunarto & T.O. Suprapto',
    emoji: '🛡️',
    deskripsi:
      'Strategi penanggulangan hama 100% alami tanpa racun kimia sintetik berbahaya. Resep andalan Heri Sunarto memanfaatkan daya antibakteri rebusan bawang putih, enzim asam air kelapa pesisir, dan kepedasan cabai rawit tua. Efektif mengusir kutu kebul, thrips, ulat grayak, dan jamur layu, sekaligus aman untuk kolam lele dan ayam di sekitarnya.',
    langkah: [
      {
        step: 1,
        title: 'Penyiapan Bahan Ramuan Nabati',
        detail:
          'Siapkan 250 gram bawang putih lokal, 5 buah cabai rawit merah tua, 2 liter air kelapa pesisir segar, dan 1 genggam daun tembakau/puntung rokok herbal.',
        tips: 'Bawang putih mengandung allicin (antijamur dan bau pengusir serangga), air kelapa mengandung sitokinin dan mineral penguat dinding sel tanaman.'
      },
      {
        step: 2,
        title: 'Penumbukan & Perebusan Singkat',
        detail:
          'Tumbuk halus bawang putih dan cabai. Rebus bersama 1 liter air kelapa hingga mendidih selama 5-7 menit dengan api kecil agar zat aktif terlarut tanpa merusak enzim baik.',
        tips: 'Aroma tajam yang keluar saat merebus adalah zat pengusir kutu kebul alami yang sangat ditakuti serangga pengisap.'
      },
      {
        step: 3,
        title: 'Pencampuran & Pendinginan',
        detail:
          'Matikan api, masukkan daun tembakau dan sisa 1 liter air kelapa dingin. Tutup panci dan biarkan meresap selama 24 jam hingga warna cairan menjadi kuning kecokelatan pekat.',
        tips: 'Saring ramuan dengan kain kasa bersih agar nozzle semprotan handsprayer tidak tersumbat ampas.'
      },
      {
        step: 4,
        title: 'Pemasangan Perangkap Kuning (Yellow Sticky Trap)',
        detail:
          'Pasang lembar plastik kuning terang yang diolesi lem tikus transparan di tiang setinggi pucuk cabai (sekitar 60-80 cm dari tanah). Pasang 2-3 titik per 100 m².',
        tips: 'Kutu kebul, kutu daun, dan lalat buah secara naluriah tertarik pada warna kuning cerah dan akan menempel mati.'
      },
      {
        step: 5,
        title: 'Teknik Penyemprotan Pagi Hari',
        detail:
          'Encerkan 50-70 ml ramuan saringan ke dalam 1 liter air bersih. Semprotkan secara merata ke bawah permukaan daun cabai dan sela tanaman sorgum pada pukul 06.00-08.00 pagi.',
        tips: 'Hama bersembunyi di bawah permukaan daun. Semprot dengan nosel menghadap ke atas agar mengenai sasaran tepat.'
      }
    ],
    dosisTakaran: [
      { bahan: 'Ramuan Bawang Putih + Air Kelapa', takaran: '50 - 70 ml per 1 Liter air (atau 1 gelas aqua per tangki 14 L)', kegunaan: 'Pengusir kutu kebul, thrips, aphid, dan lalat buah' },
      { bahan: 'Cuka Kayu / Asap Cair Tempurung Kelapa', takaran: '3 - 5 ml per Liter air', kegunaan: 'Mencegah antraknosa (patek) dan busuk buah cabai saat musim hujan' },
      { bahan: 'Air Perasan Daun Mimba / Pepaya', takaran: '100 ml per Liter air', kegunaan: 'Pengendali ulat pemakan daun sorgum dan kangkung' }
    ],
    videoTeks: [
      { waktu: '00:00 - 00:40', adegan: 'Petani memegang tanaman cabai yang sehat bebas kutu kebul', narasi: '"Bapak Ibu, cabai rawit di pesisir Pamotan ini mulus tanpa bintik hitam dan keriting. Rahasianya bukan racun kimia mahal bertutup tengkorak, tapi bumbu dapur kita sendiri!"' },
      { waktu: '00:41 - 02:10', adegan: 'Menunjukkan proses perebusan bawang putih dalam air kelapa', narasi: '"Perpaduan allicin bawang putih dan asam kelapa ini membuat serangga enggan mendekat. Jika terkena kulit kutu kebul, lapisan lilinnya larut seketika tanpa mencemari air kolam lele di bawahnya."' },
      { waktu: '02:11 - 03:15', adegan: 'Menyemprot bagian bawah daun di pagi hari', narasi: '"Ingat pantangan utama: jangan semprot siang hari saat terik matahari pantai. Semprot pagi-pagi sekali saat hama baru keluar sarang. Aman, murah, manjur!"' }
    ],
    resepKhususPesisir: {
      judul: 'Ramuan Pestisida Nabati Bawang Putih & Kelapa Pesisir',
      bahan: ['250 Gram Bawang Putih (tumbuk kasar)', '10 Biji Cabai Rawit Merah Tua', '2 Liter Air Kelapa Segar Asli Kalipucang', '1 Sendok Makan Sabun Colek / Lerak (Perekat Alami)'],
      cara: [
        'Tumbuk bawang putih dan cabai hingga hancur mengeluarkan getah aromatik.',
        'Rebus bersama 1 liter air kelapa selama 5 menit.',
        'Tuangkan sisa 1 liter air kelapa mentah, masukkan sabun colek/lerak sebagai perekat.',
        'Tutup rapat selama semalam (24 jam), lalu saring dengan kain saringan kopi.',
        'Cairan siap disimpan dalam botol kaca hingga 2 bulan.'
      ]
    }
  },
  {
    id: 'imm',
    code: 'IMM',
    title: 'Integrated Moisture Management',
    kepanjangan: 'Pengelolaan Air & Kelembaban Pesisir Terpadu',
    fokus: 'Sirkulasi Tertutup: Sumur Bor + Tandon Kolam Lele + Irigasi Tetes',
    tokohKait: 'KP4 UGM & Heri Sunarto',
    emoji: '💧',
    deskripsi:
      'Solusi strategis mengatasi kelemahan utama tanah berpasir Desa Pamotan: air cepat meresap hilang ke bawah dan penguapan tinggi akibat terik pesisir Kalipucang. Menerapkan loop air sirkular: Air sumur masuk ke kolam lele bioflok, mengalami pengayaan nutrisi, lalu disalurkan presisi ke zona perakaran tanaman via irigasi tetes botol bekas.',
    langkah: [
      {
        step: 1,
        title: 'Pembuatan Sumur Dangkal & Tandon Penampung',
        detail:
          'Buat sumur bor pipa PVC kedalaman 8-12 meter untuk menjangkau air tawar pesisir (hindari air payau asin). Tampung di toren/tandon 500-1.000 liter.',
        tips: 'Endapkan air sumur selama 12 jam di tandon terbuka agar kadar zat besi dan klorin mengendap sebelum masuk ke kolam ikan.'
      },
      {
        step: 2,
        title: 'Pengisian Kolam Bioflok Sebagai Reservoir Nutrisi',
        detail:
          'Air dari tandon dialirkan mengisi kolam terpal lele bioflok. Ikan lele memproses air ini dengan menambah kotoran, amonia, dan bakteri probiotik hidup selama 3-5 hari.',
        tips: 'Air kolam berfungsi ganda: sebagai habitat ternak ikan sekaligus tangki pemupukan cair gratis.'
      },
      {
        step: 3,
        title: 'Pemasangan Pipa Siphon Gravitasi ke Tanaman',
        detail:
          'Pasang pipa PVC 1/2 inch di bagian dasar kolam dengan sistem stopkran. Hubungkan ke selang irigasi yang mengitari bedengan sayur, polybag cabai, dan kebun sorgum.',
        tips: 'Memanfaatkan elevasi tanah atau mendudukkan kolam lebih tinggi 30 cm dari permukaan bedengan tanaman agar air mengalir tanpa butuh pompa listrik.'
      },
      {
        step: 4,
        title: 'Sistem Irigasi Tetes Presisi Botol Bekas',
        detail:
          'Buat irigasi tetes murah meriah memakai botol air mineral 1,5 liter bekas. Lubangi tutup botol dengan jarum jahit yang dipanaskan, tancapkan terbalik di samping pangkal batang tanaman.',
        tips: 'Satu botol 1,5 liter menetes perlahan selama 8-12 jam langsung ke akar, menghemat 80% air dibanding menyiram dengan gayung.'
      },
      {
        step: 5,
        title: 'Penjagaan Kelembaban Pasir dengan Biopori Mulsa',
        detail:
          'Gali parit kecil sedalam 15 cm di antara bedengan, isi dengan sabut kelapa tua dan jerami sorgum. Ini menjadi spons penyimpan cadangan air tanah saat hari panas terik.',
        tips: 'Sabut kelapa mampu mengikat air hingga 8 kali bobot keringnya, menjaga zona perakaran tetap sejuk di siang hari.'
      }
    ],
    dosisTakaran: [
      { bahan: 'Frekuensi Pengurasan Air Kolam', takaran: '10 - 20% volume kolam setiap 3 hari sekali', kegunaan: 'Menjaga kesehatan lele sekaligus memasok air pupuk untuk tanaman' },
      { bahan: 'Debit Tetesan Botol Irigasi', takaran: '1 tetes setiap 3 - 5 detik (1,5 L per 10 jam)', kegunaan: 'Menjaga kelembaban konstan di zona perakaran pasir pesisir' },
      { bahan: 'Ketebalan Mulsa Sabut Kelapa', takaran: 'Tebal 3 - 5 cm di permukaan tanah bedengan', kegunaan: 'Menghindari suhu tanah pasir naik di atas 35°C saat kemarau' }
    ],
    videoTeks: [
      { waktu: '00:00 - 00:45', adegan: 'Menunjukkan air siraman gayung yang langsung hilang di tanah pasir pantai', narasi: '"Saudara sekalian di Pamotan, kalau menyiram pakai selang atau gayung di tanah pasir ini, 10 menit kemudian sudah kering kerontang dan tanaman layu lagi."' },
      { waktu: '00:46 - 02:00', adegan: 'Menunjukkan botol infus tetes meneteskan air kolam lele ke polybag', narasi: '"Dengan botol bekas ini, air kolam lele yang penuh pupuk menetes tetes demi tetes tepat di mulut akar. Tanaman minum teratur tanpa stres panas, air hemat 80%!"' },
      { waktu: '02:01 - 03:20', adegan: 'Membuka mulsa sabut kelapa menunjukkan tanah yang tetap lembab dingin', narasi: '"Lihat di bawah mulsa sabut kelapa ini: tanahnya lembab sejuk, cacing tanah hidup subur. Ini kunci kedaulatan air di pesisir pantai Kalipucang."' }
    ],
    resepKhususPesisir: {
      judul: 'Instalasi Irigasi Tetes Gravitasi Nol Listrik Pamotan',
      bahan: ['Botol Air Bekas 1,5 Liter atau Galon Bekas', 'Jarum Jahit / Kawat Kecil', 'Sedotan Kopi / Cotton Bud (pengatur aliran)', 'Tali Bambu Pengikat'],
      cara: [
        'Panaskan jarum jahit dengan korek api, buat 1 lubang kecil di tengah tutup botol.',
        'Masukkan ujung kapas cotton bud ke lubang sebagai sumbu kapiler pengatur tetesan.',
        'Potong bagian dasar botol untuk lubang pengisian air kolam lele.',
        'Ikat botol terbalik pada bilah bambu di samping polybag cabai rawit / jahe merah.',
        'Isi dengan air kolam lele setiap pagi; air akan menetes stabil sepanjang hari.'
      ]
    }
  }
];

export const INITIAL_HARVEST_ITEMS: HarvestItem[] = [
  {
    id: 'telur_ayam',
    name: 'Telur Ayam Segar',
    category: 'harian',
    defaultAmount: 18,
    unit: 'butir',
    estPricePerUnit: 2200,
    emoji: '🥚',
    notes: 'Kandang baterai 22 ekor ayam ras/KUB. Panen tiap pagi pukul 07.30 WIB.',
    cycleIntervalDays: 1,
    lastHarvestDate: '2026-11-09'
  },
  {
    id: 'sayur_kangkung',
    name: 'Sayur Kangkung & Bayam Cabut',
    category: 'harian',
    defaultAmount: 10,
    unit: 'ikat',
    estPricePerUnit: 2500,
    emoji: '🥬',
    notes: 'Bedengan pekarangan organik siraman air kolam lele bioflok.',
    cycleIntervalDays: 1,
    lastHarvestDate: '2026-11-09'
  },
  {
    id: 'lele_bioflok',
    name: 'Ikan Lele Bioflok Konsumsi',
    category: 'mingguan',
    defaultAmount: 15,
    unit: 'kg',
    estPricePerUnit: 24000,
    emoji: '🐟',
    notes: 'Sortir panen bertahap ukuran isi 8-10 ekor per kg untuk warung pecel lele lokal.',
    cycleIntervalDays: 7,
    lastHarvestDate: '2026-11-05'
  },
  {
    id: 'cabai_rawit',
    name: 'Cabai Rawit Merah Petik Segar',
    category: 'mingguan',
    defaultAmount: 4,
    unit: 'kg',
    estPricePerUnit: 45000,
    emoji: '🌶️',
    notes: 'Petik buah merah matang sempurna setiap hari Minggu pagi di rak polybag.',
    cycleIntervalDays: 7,
    lastHarvestDate: '2026-11-03'
  },
  {
    id: 'ayam_potong',
    name: 'Ayam Kampung / Broiler Potong',
    category: 'bulanan',
    defaultAmount: 12,
    unit: 'ekor',
    estPricePerUnit: 48000,
    emoji: '🍗',
    notes: 'Ayam afkir bertelur atau ayam jantan muda pakan maggot berbobot 1,1 - 1,3 kg.',
    cycleIntervalDays: 30,
    lastHarvestDate: '2026-10-25'
  },
  {
    id: 'jahe_merah',
    name: 'Rimpang Jahe Merah Panen Parsial',
    category: 'bulanan',
    defaultAmount: 15,
    unit: 'kg',
    estPricePerUnit: 35000,
    emoji: '🫚',
    notes: 'Panen galian samping rimpang jahe merah tua untuk bahan jamu herbal pesisir.',
    cycleIntervalDays: 30,
    lastHarvestDate: '2026-10-15'
  },
  {
    id: 'sorgum_biji',
    name: 'Biji Sorgum Bioguma Kering',
    category: 'bulanan',
    defaultAmount: 40,
    unit: 'kg',
    estPricePerUnit: 9000,
    emoji: '🌾',
    notes: 'Malai sorgum matang dipanen bertahap, batang digiling untuk pakan silase ternak.',
    cycleIntervalDays: 30,
    lastHarvestDate: '2026-10-20'
  },
  {
    id: 'padi_ip400',
    name: 'Gabah Kering Padi IP 400 Organik',
    category: 'tahunan',
    defaultAmount: 650,
    unit: 'kg',
    estPricePerUnit: 6800,
    emoji: '🌾',
    notes: 'Hasil petak sawah terpadu IP 400 (siklus panen ke-3 tahun berjalan).',
    cycleIntervalDays: 90,
    lastHarvestDate: '2026-08-15'
  },
  {
    id: 'domba_anakan',
    name: 'Anakan Domba / Kambing Bakalan',
    category: 'tahunan',
    defaultAmount: 2,
    unit: 'ekor',
    estPricePerUnit: 1650000,
    emoji: '🐑',
    notes: 'Anakan lepas sapih usia 5 bulan hasil pakan dedaunan sorgum & konsentrat kasgot.',
    cycleIntervalDays: 180,
    lastHarvestDate: '2026-06-10'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1',
    date: '2026-11-09',
    type: 'pemasukan',
    category: 'Jual Telur',
    amount: 39600,
    description: 'Penjualan 18 butir telur ayam segar ke warung tetangga Pamotan',
    source: 'panen',
    qty: 18,
    unit: 'butir'
  },
  {
    id: 'trx-2',
    date: '2026-11-09',
    type: 'pemasukan',
    category: 'Jual Sayur',
    amount: 25000,
    description: 'Penjualan 10 ikat kangkung & bayam organik pekarangan',
    source: 'panen',
    qty: 10,
    unit: 'ikat'
  },
  {
    id: 'trx-3',
    date: '2026-11-05',
    type: 'pemasukan',
    category: 'Jual Lele',
    amount: 360000,
    description: 'Penjualan 15 kg ikan lele bioflok konsumsi ke warung pecel lele Kalipucang',
    source: 'panen',
    qty: 15,
    unit: 'kg'
  },
  {
    id: 'trx-4',
    date: '2026-11-03',
    type: 'pemasukan',
    category: 'Jual Cabai',
    amount: 180000,
    description: 'Penjualan 4 kg cabai rawit merah petikan pertama minggu ini',
    source: 'panen',
    qty: 4,
    unit: 'kg'
  },
  {
    id: 'trx-5',
    date: '2026-11-02',
    type: 'pengeluaran',
    category: 'Pakan Starter',
    amount: 110000,
    description: 'Pembelian 1 karung dedak halus & bibit probiotik EM4 bioflok',
    source: 'manual',
    qty: 1,
    unit: 'paket'
  },
  {
    id: 'trx-6',
    date: '2026-10-28',
    type: 'pengeluaran',
    category: 'Bibit & Sarana',
    amount: 75000,
    description: 'Pembelian polybag tebal 40x40 cm & benih cabai rawit Kalipucang',
    source: 'manual',
    qty: 50,
    unit: 'lembar'
  },
  {
    id: 'trx-7',
    date: '2026-10-25',
    type: 'pemasukan',
    category: 'Jual Unggas',
    amount: 576000,
    description: 'Penjualan 12 ekor ayam jantan muda panen bulanan',
    source: 'panen',
    qty: 12,
    unit: 'ekor'
  }
];

export const SCHOOL_MODULES: SchoolModule[] = [
  {
    id: 1,
    title: 'Filosofi Joglo Tani & 4 Tangga Kedaulatan',
    tokoh: 'T.O. Suprapto (Sedayu, Bantul)',
    tagline: 'Menanam apa yang dimakan, makan apa yang ditanam',
    emoji: '🌾',
    ringkasan:
      'Membangun kedaulatan pangan dimulai dari meja makan keluarga petani sendiri. Petani tidak boleh menjadi buruh di tanahnya sendiri yang membeli beras, telur, dan cabai dari luar.',
    materiPoin: [
      'Empat Tangga Kedaulatan: Tangga 1: Ketahanan Pangan (ada makanan untuk bertahan hidup) ➔ Tangga 2: Kemandirian Pangan (mampu memproduksi makanan sendiri tanpa ketergantungan) ➔ Tangga 3: Kedaulatan Pangan (menentukan sendiri apa yang ditanam dan harga jual) ➔ Tangga 4: Kedaulatan Ekonomi (akumulasi modal dan kebebasan finansial).',
      'Lima Prinsip Wirausaha Tani: Niat ibadah yang kokoh, Karya nyata bukan teori di atas kertas, Kejujuran menjaga kualitas hasil bumi, Ibadah dalam setiap tetes keringat, dan Keikhlasan berbagi ilmu kepada sesama petani.',
      'Siklus Panen Berlapis: Menata pekarangan agar menghasilkan arus kas harian (telur, sayur), mingguan (lele, cabai), bulanan (ayam, umbi), dan tahunan (gabah, ternak besar). Dengan pola ini, dapur tidak pernah kekurangan uang kas.'
    ],
    penerapanPamotan:
      'Di Desa Pamotan Kalipucang, warga sering kali membeli kebutuhan sayur dari pasar Kalipucang atau Banjar. Dengan menerapkan filosofi Joglo Tani, pekarangan rumah berpasir diubah menjadi lumbung sayur dan telur mandiri.',
    quiz: [
      {
        id: 101,
        question: 'Apa urutan 4 Tangga Kedaulatan menurut T.O. Suprapto Joglo Tani?',
        options: [
          'Ketahanan ➔ Kemandirian ➔ Kedaulatan Pangan ➔ Kedaulatan Ekonomi',
          'Kedaulatan Ekonomi ➔ Menjual Hasil ➔ Beli Lahan ➔ Kaya Raya',
          'Pupuk Kimia ➔ Benih Hibrida ➔ Panen Raya ➔ Beli Beras',
          'Modal Pinjaman ➔ Tanam Monokultur ➔ Jual Borongan ➔ Lunas Utang'
        ],
        correctIndex: 0,
        explanation: 'Menurut T.O. Suprapto, tangga dimulai dari Ketahanan, berlanjut ke Kemandirian, mencapai Kedaulatan Pangan, dan puncaknya Kedaulatan Ekonomi keluarga tani.'
      },
      {
        id: 102,
        question: 'Apa makna filosofi "Menanam apa yang dimakan, makan apa yang ditanam"?',
        options: [
          'Hanya boleh makan satu jenis sayuran selamanya',
          'Keluarga petani memprioritaskan pangan mandiri dari pekarangan sebelum menjual ke pasar, memutus ketergantungan belanja dapur',
          'Petani dilarang membeli garam dan minyak goreng',
          'Menanam padi saja tanpa perlu memelihara ayam atau ikan'
        ],
        correctIndex: 1,
        explanation: 'Maknanya adalah keluarga petani mengamankan kecukupan gizi dan konsumsi harian dari tanah sendiri, sehingga penghasilan tidak habis tergerus belanja sembako.'
      },
      {
        id: 103,
        question: 'Manakah yang termasuk dalam 5 Prinsip Wirausaha Joglo Tani?',
        options: [
          'Niat, Berkarya, Jujur, Ibadah, Ikhlas',
          'Pinjam, Tanam, Timbun, Jual Mahal, Spekulasi',
          'Iklan, Kredit, Impor, Borongan, Pasrah',
          'Monokultur, Kimiawi, Konsumtif, Mewah, Gengsi'
        ],
        correctIndex: 0,
        explanation: '5 Prinsip Wirausaha Tani T.O. Suprapto adalah Niat, Berkarya, Jujur, Ibadah, dan Ikhlas.'
      }
    ]
  },
  {
    id: 2,
    title: 'Zero Waste Vertical Farming 4 Tingkat',
    tokoh: 'Heri Sunarto (Grobogan)',
    tagline: 'Limbah adalah input gratis, nol limbah nol rugi',
    emoji: '🏢',
    ringkasan:
      'Inovasi arsitektur pertanian vertikal 4 tingkat yang memanfaatkan gravitasi untuk mengalirkan energi dan nutrisi. Menghasilkan cabai, telur ayam, larva maggot, dan ikan lele sekaligus di atas lahan sempit.',
    materiPoin: [
      'Struktur Vertikal 4 Tingkat: Lantai atas tanaman cabai rawit & jahe merah di polybag ➔ Lantai dua kandang baterai ayam petelur ➔ Lantai satu rak biopond maggot BSF pengurai kotoran ➔ Lantai dasar kolam mina bioflok lele/nila.',
      'Penghematan Input Signifikan: Maggot memangkas 50-60% biaya pelet ikan dan ayam. Air kolam lele yang kaya nitrat memangkas 100% biaya pupuk NPK untuk cabai dan tanaman padi.',
      'Target IP 400 Tanpa Kimia: Kunci panen padi 4 kali setahun adalah suplai pupuk cair organik hayati secara kontinu dan teratur yang dihasilkan langsung dari pabrik vertikal ini, menghemat Rp 12-15 juta/ha/tahun.'
    ],
    penerapanPamotan:
      'Cocok untuk lahan pekarangan di Desa Pamotan dengan ukuran 6m x 4m atau 10m x 10m. Bau amonia kotoran ayam hilang seketika karena langsung dimakan maggot BSF.',
    quiz: [
      {
        id: 201,
        question: 'Bagaimana urutan posisi komponen vertikal 4 tingkat ala Heri Sunarto?',
        options: [
          'Atas: Cabai/Jahe ➔ Tengah: Kandang Ayam ➔ Bawah: Maggot BSF ➔ Bawah lagi: Kolam Lele Mina',
          'Atas: Kolam Lele ➔ Tengah: Cabai ➔ Bawah: Ayam ➔ Dasar: Maggot',
          'Atas: Maggot ➔ Tengah: Kolam Lele ➔ Bawah: Kandang Ayam ➔ Dasar: Cabai',
          'Atas: Domba ➔ Tengah: Jamur ➔ Bawah: Sawah ➔ Dasar: Pabrik Pelet'
        ],
        correctIndex: 0,
        explanation: 'Urutan vertikal yang benar: cabai/jahe di atas mendapat sinar matahari penuh, kotoran ayam jatuh ke maggot, maggot dipanen untuk pakan lele di dasar kolam.'
      },
      {
        id: 202,
        question: 'Berapa rata-rata penghematan biaya pupuk dan pestisida yang berhasil dicapai metode Heri Sunarto per hektar per tahun?',
        options: [
          'Rp 12.000.000 - Rp 15.000.000 per ha/tahun',
          'Hanya Rp 100.000 per tahun',
          'Tidak ada penghematan sama sekali',
          'Rp 500.000 per lima tahun'
        ],
        correctIndex: 0,
        explanation: 'Metode terpadu ini memangkas biaya pupuk kimia dan pestisida hingga Rp 12 - 15 juta per hektar setiap tahunnya.'
      },
      {
        id: 203,
        question: 'Mengapa kandang ayam terpadu vertikal Heri Sunarto tidak berbau menyengat?',
        options: [
          'Disemprot minyak wangi pabrik setiap jam',
          'Kotoran ayam yang baru jatuh langsung dimakan dan diurai oleh larva maggot BSF dalam hitungan jam',
          'Ayam tidak diberi makan sehingga tidak buang kotoran',
          'Kotoran dibuang ke sungai setiap hari'
        ],
        correctIndex: 1,
        explanation: 'Larva maggot BSF memakan kotoran ayam seketika, menghentikan proses pembusukan anaerob yang menghasilkan gas amonia dan bau busuk.'
      }
    ]
  },
  {
    id: 3,
    title: 'Buruan SAE & 8 Pilar Kemandirian Pekarangan',
    tokoh: 'Ir. Gin Gin Ginanjar (Sein Farm Bandung)',
    tagline: 'Sehat, Alami, Ekonomis di Pekarangan Sempit',
    emoji: '🌱',
    ringkasan:
      'Program Buruan SAE membuktikan pekarangan ukuran 20-100 meter persegi sanggup memenuhi 70-80% kebutuhan gizi harian keluarga secara mandiri, sehat tanpa pestisida kimia, dan bernilai ekonomis tinggi.',
    materiPoin: [
      'Pilar SAE: Sehat (bebas pestisida & hormon sintetis), Alami (memanfaatkan siklus alamiah dan mikroba lokal), Ekonomis (menekan pengeluaran belanja harian keluarga).',
      '8 Aktivitas Terpadu: 1. Pilah sampah organik dapur, 2. Budidaya sayuran daun & buah, 3. Ikan kolam terpal/ember, 4. Unggas mini, 5. Apotek hidup tanaman obat, 6. Pembenihan mandiri, 7. Fertigasi sederhana, 8. Edukasi tetangga.',
      'Pemanfaatan Ruang Sudut: Pagar hidup, rak dinding kayu bekas, talang air gantung, dan sistem ember tumpuk kotoran dapur.'
    ],
    penerapanPamotan:
      'Ibu-ibu dan keluarga muda di Desa Pamotan dapat menanam cabai, tomat, dan bayam cabut di rak talang bambu depan teras rumah, menyiramnya dengan air kolam lele ember.',
    quiz: [
      {
        id: 301,
        question: 'Apa kepanjangan dari prinsip "SAE" dalam program Buruan SAE?',
        options: [
          'Sehat, Alami, Ekonomis',
          'Sawah, Ayam, Ember',
          'Satu, Aman, Efektif',
          'Sederhana, Asri, Enak'
        ],
        correctIndex: 0,
        explanation: 'SAE adalah singkatan dari Sehat (bebas racun), Alami (organik hayati), dan Ekonomis (menghemat belanja dapur).'
      },
      {
        id: 302,
        question: 'Media alternatif apa yang dianjurkan Buruan SAE untuk memanfaatkan dinding dan ruang sempit pekarangan?',
        options: [
          'Rak vertikal bertingkat, polybag gantung, dan talang air bambu/PVC',
          'Membeli pot keramik impor mahal',
          'Menimbun semen di seluruh halaman',
          'Menyewa lahan sawah 5 hektar di desa tetangga'
        ],
        correctIndex: 0,
        explanation: 'Buruan SAE mengedepankan kreativitas bahan murah seperti rak vertikal, polybag, dan talang bambu yang ada di sekitar rumah.'
      },
      {
        id: 303,
        question: 'Bagaimana sampah sisa dapur keluarga diolah dalam konsep Buruan SAE?',
        options: [
          'Dibakar di pinggir jalan hingga berasap',
          'Dibuang ke selokan desa',
          'Diolah menjadi kompos kasgot melalui ember tumpuk atau biopond maggot',
          'Dikumpulkan dalam plastik dan dibuang ke laut'
        ],
        correctIndex: 2,
        explanation: 'Sampah organik dapur dipilah dan difermentasi atau diumpankan ke larva maggot BSF menjadi pupuk kasgot bermutu tinggi.'
      }
    ]
  },
  {
    id: 4,
    title: 'Santri Tani Milenial & Ngaji Tani Lahan Sempit',
    tokoh: 'Rizki Hamdani (Santri Tani Milenial Jatim)',
    tagline: 'Mulai dari 1,5m x 2,5m. Jangan tunggu punya hektaran.',
    emoji: '👳‍♂️',
    ringkasan:
      'Gerakan pemuda desa dan santri mengubah pola pikir: bertani bukan pekerjaan kotor atau tertinggal, melainkan profesi mulia, modern, dan mandiri secara ekonomi.',
    materiPoin: [
      'Konsep Ngaji Tani: Menghubungkan dalil agama tentang amanah memakmurkan bumi dengan teknologi pertanian presisi.',
      'Modul Starter 1,5 x 2,5 Meter: Cukup untuk menempatkan 1 ember Budikdamber lele (80 ekor) + kangkung di atasnya, 1 rak kayu berisi 30 polybag cabai, dan 1 kotak pengurai kompos sisa santri.',
      'Santripreneur Mandiri: Pesantren dan kelompok pemuda desa mampu swasembada pangan sendiri sehingga tidak bergantung pada proposal donatur atau fluktuasi harga pasar.'
    ],
    penerapanPamotan:
      'Pemuda Karang Taruna dan santri di Kalipucang Pangandaran bisa memulai wirausaha tani terpadu dengan modal di bawah Rp 500.000 di pekarangan musala atau halaman rumah.',
    quiz: [
      {
        id: 401,
        question: 'Berapa luas lahan minimal yang dicontohkan Rizki Hamdani untuk memulai praktik Ngaji Tani?',
        options: [
          'Hanya 1,5 meter x 2,5 meter',
          'Harus minimal 10 hektar tanah datar',
          'Minimal 1 lapangan sepak bola',
          'Harus punya pulau pribadi'
        ],
        correctIndex: 0,
        explanation: 'Rizki Hamdani membuktikan lahan mini 1,5 x 2,5 meter sudah cukup untuk kombinasi ember lele kangkung dan rak polybag cabai.'
      },
      {
        id: 402,
        question: 'Apa tujuan utama gerakan Santri Tani Milenial bagi pemuda desa?',
        options: [
          'Mendorong pemuda desa berbondong-bondong merantau jadi buruh pabrik kota',
          'Membangkitkan kemandirian ekonomi pemuda desa menjadi santripreneur melalui pertanian terpadu modern',
          'Mengajarkan cara mengajukan pinjaman online untuk belanja konsumtif',
          'Menjual seluruh sawah warisan untuk membeli motor sport'
        ],
        correctIndex: 1,
        explanation: 'Gerakan ini bertujuan mencetak wirausahawan tani muda yang mandiri di kampung halaman tanpa harus bergantung pada pekerjaan di kota besar.'
      },
      {
        id: 403,
        question: 'Apa kombinasi isi unit Budikdamber mini?',
        options: [
          'Ember plastik berisi ikan lele di bagian air dan tanaman sayur kangkung/bayam di bagian bibir ember atas',
          'Ember berisi batu bata dan pasir kering',
          'Ember berisi air laut dan kepiting bakau tanpa aerasi',
          'Ember tempat mencuci baju detergen'
        ],
        correctIndex: 0,
        explanation: 'Budikdamber (Budidaya Ikan dalam Ember) memadukan lele di dasar ember dan kangkung berakar di media arang pada cup plastik di atasnya.'
      }
    ]
  },
  {
    id: 5,
    title: 'Sains Terpadu 4I, Bisnis 5A & Manajemen 6M',
    tokoh: 'KP4 UGM (Laboratorium Agroteknologi Terpadu)',
    tagline: 'Kombinasi sains akademis dan kearifan petani Nusantara',
    emoji: '🏛️',
    ringkasan:
      'Kerangka kerja ilmiah dari Pusat Inovasi Agroteknologi UGM yang menyusun pertanian terpadu dalam 3 pilar: Sains Teknis 4I, Rantai Nilai Bisnis 5A, dan Manajemen Operasional 6M.',
    materiPoin: [
      'Sains 4I: ICM (Integrated Crop Management - tanaman bersaf & tumpang sari), INM (Integrated Nutrient Management - kasgot & POC siklus tertutup), IPM (Integrated Pest Management - pestisida nabati), IMM (Integrated Moisture Management - tata kelola air tetes & sirkulasi kolam).',
      'Bisnis 5A: Agro-Production (budidaya primer), Agro-Business (tata niaga adil tanpa tengkulak), Agro-Technology (alat tepat guna sederhana), Agro-Industry (pengolahan produk turunan tepung sorgum/keripik jahe), Agro-Tourism (wisata edukasi kebun).',
      'Manajemen 6M: Man (disiplin jadwal petani), Money (pencatatan jurnal keuangan harian), Material (bibit lokal unggul & limbah organik), Method (SOP 4I terstandar), Machine (blower bioflok & chopper batang), Market (pembeli lokal Pamotan).'
    ],
    penerapanPamotan:
      'Menjadi pedoman operasional kelompok tani Berkah Pamotan agar pertanian dijalankan secara profesional seperti perusahaan modern, bukan sekadar coba-coba sambilan.',
    quiz: [
      {
        id: 501,
        question: 'Manakah yang BUKAN merupakan bagian dari Sains 4I KP4 UGM?',
        options: [
          'ICM (Integrated Crop Management)',
          'INM (Integrated Nutrient Management)',
          'ICD (Integrated Chemical Dumping / Pembuangan Kimia)',
          'IMM (Integrated Moisture Management)'
        ],
        correctIndex: 2,
        explanation: 'Empat I adalah ICM (Tanaman), INM (Nutrisi), IPM (Hama/Penyakit), dan IMM (Air/Kelembaban). Tidak ada penggunaan atau pembuangan kimia.'
      },
      {
        id: 502,
        question: 'Apa maksud pilar Agro-Industry dalam konsep Bisnis 5A?',
        options: [
          'Membakar seluruh hasil panen di sawah',
          'Mengolah hasil panen primer menjadi produk bernilai tambah tinggi, seperti biji sorgum menjadi tepung dan jahe menjadi serbuk instan',
          'Membeli beras impor dari luar negeri',
          'Membongkar lahan pertanian menjadi pabrik garmen'
        ],
        correctIndex: 1,
        explanation: 'Agro-Industry bertujuan meningkatkan nilai jual komoditas tani melalui pengolahan pascapanen agar harga tidak jatuh saat panen raya.'
      },
      {
        id: 503,
        question: 'Dalam Manajemen 6M, apa fungsi pilar Money bagi petani terpadu?',
        options: [
          'Menyimpan uang di bawah bantal tanpa pencatatan',
          'Mencatat setiap pemasukan dan pengeluaran secara disiplin di jurnal keuangan untuk mengukur laba bersih dan waktu balik modal (BEP)',
          'Menghabiskan seluruh uang panen untuk pesta',
          'Meminjam rentenir berbunga harian'
        ],
        correctIndex: 1,
        explanation: 'Pilar Money menuntut petani memiliki pembukuan keuangan yang rapi sehingga dapat mengetahui keuntungan riil dan merencanakan investasi masa depan.'
      }
    ]
  },
  {
    id: 6,
    title: 'Budidaya Sorgum Bioguma di Tanah Pesisir Pamotan',
    tokoh: 'Ir. Gin Gin Ginanjar & BRIN / Kementan',
    tagline: 'Tanaman Super Tahan Kering, Pangan, Pakan & Energi',
    emoji: '🌾',
    ringkasan:
      'Sorgum varietas Bioguma (1, 2, 3) adalah tanaman masa depan yang sangat cocok untuk iklim pesisir panas dan berpasir seperti Desa Pamotan Kalipucang. Tahan kekeringan, hemat pupuk, dan menghasilkan panen dalam 110-120 hari.',
    materiPoin: [
      'Karakteristik Bioguma: Toleran terhadap salinitas (garam pesisir) dan kekeringan ekstrem berkat perakaran serabut yang dalam dan lapisan lilin alami di batangnya.',
      'Pemanfaatan 100% Zero Waste: 1. Biji sorgum: diolah menjadi beras sorgum dan tepung bebas gluten bernilai jual tinggi Rp 15.000 - Rp 25.000/kg; 2. Batang manis: diperas nira manisnya atau dicacah menjadi silase pakan ternak; 3. Daun dan ampas: pakan serat maggot BSF dan mulsa penutup tanah.',
      'Sistem Ratoon (Panen Berulang): Setelah malai dipanen pada hari ke-115, batang dipotong setinggi 10 cm dari tanah. Tunas baru akan tumbuh dan menghasilkan panen kedua dalam 80 hari tanpa perlu membeli bibit dan mengolah tanah lagi.'
    ],
    penerapanPamotan:
      'Ditanam di pematang pekarangan atau petak lahan berpasir Pamotan yang biasanya terbengkalai saat musim kemarau karena tidak cukup air untuk padi.',
    quiz: [
      {
        id: 601,
        question: 'Berapa lama usia panen tanaman Sorgum Bioguma sejak tanam?',
        options: [
          'Sekitar 110 - 120 hari',
          '10 tahun kemudian',
          'Hanya 5 hari',
          '12 bulan'
        ],
        correctIndex: 0,
        explanation: 'Sorgum Bioguma rata-rata dipanen pada usia 110-120 hari, dan tunas ratoonnnya bisa dipanen kembali lebih cepat (sekitar 75-85 hari).'
      },
      {
        id: 602,
        question: 'Mengapa Sorgum Bioguma sangat cocok untuk pesisir Pamotan Kalipucang?',
        options: [
          'Karena membutuhkan es batu dan salju untuk tumbuh',
          'Karena memiliki ketahanan tinggi terhadap tanah berpasir, suhu panas pesisir, dan kadar garam (salinitas) laut',
          'Karena hanya bisa hidup di dalam akuarium tertutup',
          'Karena tidak membutuhkan sinar matahari sama sekali'
        ],
        correctIndex: 1,
        explanation: 'Sorgum Bioguma diriset khusus memiliki perakaran dalam dan lapisan lilin daun yang sangat tahan terik matahari dan salinitas pesisir.'
      },
      {
        id: 603,
        question: 'Apa keunggulan sistem "Ratoon" pada budidaya sorgum?',
        options: [
          'Bisa panen kembali dari tunas anakan tanpa harus mencangkul ulang lahan dan membeli benih baru',
          'Tanaman langsung berubah menjadi pohon kelapa sawit',
          'Harus disemprot herbisida racun keras setiap hari',
          'Hanya menghasilkan rumput liar'
        ],
        correctIndex: 0,
        explanation: 'Sistem ratoon memungkinkan petani memanen sorgum 2 hingga 3 kali dari tanaman yang sama, menghemat biaya olah tanah dan pembelian bibit.'
      }
    ]
  },
  {
    id: 7,
    title: 'Ekosistem Maggot BSF & Kolam Lele Bioflok Mandiri Pakan',
    tokoh: 'Heri Sunarto & Inovator Akuakultur Nasional',
    tagline: 'Pakan Berprotein 40% Gratis dari Pengurai Alami',
    emoji: '🐛',
    ringkasan:
      'Kombinasi pemeliharaan larva Black Soldier Fly (Hermetia illucens) dan lele sistem bioflok. Menyelesaikan dua persoalan terbesar petani sekaligus: masalah sampah/kotoran bau dan mahalnya harga pakan pabrikan yang terus melonjak.',
    materiPoin: [
      'Biologi Lalat BSF: Lalat BSF dewasa tidak memiliki mulut penggigit dan bukan vektor penyakit seperti lalat hijau. Siklus hidup larva 15-18 hari adalah masa rakus memakan kotoran ternak dan limbah organik.',
      'Sistem Kolam Bioflok: Diameter 2 - 2,5 meter dengan aerasi continuous blower menghasilkan gumpalan mikroba heterotrof (flok). Flok ini memakan sisa feses lele dan mengubah amonia beracun menjadi protein pakan alami bagi lele.',
      'Integrasi Simbiosis: Maggot hidup berprotein 42% diberikan pada lele pagi dan sore, mengurangi penggunaan pelet hingga 60%. Feses lele yang terurai bakteri bioflok disiphon untuk menyuburkan tanaman cabai dan sorgum.'
    ],
    penerapanPamotan:
      'Peternak lele di Pamotan sering gulung tikar karena harga pelet Rp 15.000/kg sedangkan harga jual lele Rp 20.000/kg. Dengan maggot BSF dari kotoran ayam, biaya pakan turun drastis dan margin keuntungan meningkat hingga 300%.',
    quiz: [
      {
        id: 701,
        question: 'Berapa kandungan protein kasar rata-rata larva maggot BSF segar?',
        options: [
          'Sekitar 40% - 44% protein',
          'Hanya 1% protein',
          '0% protein (hanya air)',
          '99% karbohidrat murni'
        ],
        correctIndex: 0,
        explanation: 'Larva maggot BSF memiliki protein tinggi 40-44% serta asam amino lengkap, setara atau bahkan lebih unggul dari tepung ikan impor.'
      },
      {
        id: 702,
        question: 'Apakah lalat tentara hitam (Black Soldier Fly dewasa) menyebarkan penyakit ke rumah manusia?',
        options: [
          'Ya, sangat berbahaya dan menularkan disentri seperti lalat hijau',
          'Tidak, lalat BSF dewasa tidak memiliki bagian mulut menggigit, tidak hinggap di makanan manusia, dan bukan vektor penyakit',
          'Lalat BSF menggigit manusia hingga demam',
          'Lalat BSF merusak daun tanaman sayur'
        ],
        correctIndex: 1,
        explanation: 'Lalat BSF dewasa hanya minum air atau nektar, tidak makan kotoran di masa dewasanya, sehingga sangat higienis dan aman bagi lingkungan.'
      },
      {
        id: 703,
        question: 'Apa fungsi mikroba heterotrof dalam kolam bioflok lele?',
        options: [
          'Membunuh semua ikan lele di malam hari',
          'Mengubah amonia berbahaya dari kotoran lele menjadi gumpalan protein (flok) yang dapat dimakan kembali oleh lele',
          'Membuat air kolam berbau busuk menusuk',
          'Menghilangkan oksigen terlarut dalam air'
        ],
        correctIndex: 1,
        explanation: 'Bakteri heterotrof memanfaatkan amonia dan sumber karbon untuk membentuk flok padat mikroba yang menjadi pakan tambahan alami bagi ikan lele.'
      }
    ]
  }
];

export const PAMOTAN_INFO = {
  desa: 'Desa Pamotan',
  kecamatan: 'Kecamatan Kalipucang',
  kabupaten: 'Kabupaten Pangandaran',
  provinsi: 'Jawa Barat',
  iklim: 'Pesisir tropis hangat, curah hujan sedang-tinggi dengan hembusan angin laut pesisir selatan',
  karakterTanah: 'Tanah lempung berpasir (sandy loam) dan pasir pesisir dekat muara Citanduy dan Segara Anakan',
  potensiUtama: [
    'Dekat dengan muara sungai Citanduy dan laguna Segara Anakan, kaya sumber daya perikanan dan sabut kelapa',
    'Suhu hangat 27 - 33°C sangat optimal untuk biokonversi maggot BSF dan laju metabolisme lele bioflok',
    'Kebutuhan sayur mayur, cabai, dan telur segar tinggi untuk konsumsi warga lokal dan suplai warung wisata Pangandaran'
  ],
  tantanganSolusi: [
    {
      tantangan: 'Tanah berpasir cepat kering dan hara mudah tercuci',
      solusi: 'Pemberian pupuk kasgot maggot + mulsa sabut kelapa + irigasi tetes air kolam lele (IMM UGM)'
    },
    {
      tantangan: 'Hembusan angin laut kencang membawa uap asin',
      solusi: 'Penanaman pagar hidup barisan Sorgum Bioguma (ICM UGM) sebagai windbreak penahan angin'
    },
    {
      tantangan: 'Harga pakan lele dan ayam pabrikan mahal',
      solusi: 'Budidaya larva maggot BSF dari kotoran ayam dan sisa organik (Heri Sunarto)'
    }
  ]
};

export interface KemandirianBayuGuide {
  id: string;
  title: string;
  sub: string;
  emoji: string;
  prinsip: string;
  langkah: string[];
  resepDosis: string;
}

export const KEMANDIRIAN_BAYU_GUIDES: KemandirianBayuGuide[] = [
  {
    id: 'bibit_sendiri',
    title: 'Cara Buat Bibit Sendiri (Jagung & Padi)',
    sub: 'Putus Ketergantungan Benih Pabrikan',
    emoji: '🌽',
    prinsip: 'Pilih tanaman terkuat di tengah ladang, jangan yang di pinggir.',
    langkah: [
      'Pilih tongkol jagung atau malai padi yang paling bernas, sehat, dan bebas hama saat masa panen.',
      'Petik saat benar-benar matang di pohon (kelobot jagung kering cokelat, bulir padi kuning 95%).',
      'Untuk jagung: ambil hanya biji bagian tengah tongkol (buang ujung dan pangkal). Untuk padi: lakukan seleksi air garam (telur terapung, ambil gabah yang tenggelam).',
      'Jemur di bawah sinar matahari hingga kadar air 11-12% (biji jagung bila digigit berbunyi gemeretak).',
      'Simpan dalam botol kaca atau jerigen kedap udara bersama beberapa butir arang aktif atau daun mimba kering untuk mencegah kutu bubuk.'
    ],
    resepDosis: 'Simpan di suhu ruang teduh dan kering. Daya kecambah tahan hingga 8-12 bulan dengan viabilitas >90%.'
  },
  {
    id: 'npk_ternak',
    title: 'Rumus Pupuk NPK Ternak Mandiri',
    sub: 'Ayam = N, Sapi = P, Kambing = K',
    emoji: '⚖️',
    prinsip: 'Alam sudah menyediakan N-P-K lengkap dari kotoran ternak sekitar kita.',
    langkah: [
      'Kotoran Ayam (Unsur N - Nitrogen): Memacu pertumbuhan daun hijau, batang, dan tunas baru.',
      'Kotoran Sapi (Unsur P - Fosfat): Merangsang perakaran kuat dan pembentukan bunga bakal buah.',
      'Kotoran Kambing/Domba (Unsur K - Kalium): Mengisi bobot buah, menguatkan daya tahan, dan mencegah kerontokan.',
      'Campurkan Kotoran Ayam : Kotoran Sapi : Kotoran Kambing dengan perbandingan seimbang 1 : 1 : 1.',
      'Tambahkan 1 bagian arang sekam atau sekam mentah + sedikit kapur dolomit untuk porositas tanah pasir Pamotan.',
      'Siram dengan larutan molase / air gula aren + mikroba pengurai lokal, tutup terpal selama 14-21 hari (fermentasi matang bersuhu dingin/remah).'
    ],
    resepDosis: 'Takaran 1:1:1 + sekam. Dosis aplikasi: 2-3 genggam per lubang tanam atau tabur tipis di bedengan tiap 2 minggu.'
  },
  {
    id: 'pakan_azolla_singkong',
    title: 'Cara Buat Pakan dari Azolla + Singkong',
    sub: 'Protein Hijau 25-30% Gratis Tak Terbatas',
    emoji: '🌿',
    prinsip: 'Azolla tumbuh 30% per hari di atas kolam, singkong sumber karbohidrat murah.',
    langkah: [
      'Budidayakan Azolla Microphylla di kolam terpal dangkal (kedalaman air 15-20 cm) dengan lumpur kasgot di dasarnya.',
      'Panen azolla segar setiap 2 hari sekali, tiriskan airnya hingga agak layu.',
      'Kupas dan parut atau cacah halus ubi singkong mentah (bisa juga singkong fermentasi/gaplek).',
      'Campurkan 60% azolla tiris + 30% singkong parut + 10% dedak bekatul halus.',
      'Dapat diberikan langsung dalam kondisi segar untuk ayam dan lele, atau difermentasi dengan ragi tape selama 2 hari untuk pakan simpan tahan 1 bulan.'
    ],
    resepDosis: 'Perbandingan 6:3:1 (Azolla:Singkong:Dedak). Mampu memangkas 70% pengeluaran pelet komersial.'
  },
  {
    id: 'sawah_palsu',
    title: 'Cara Buat Sawah Palsu (Padi di Galon / Polybag)',
    sub: '1 Polybag = 1 Kg Beras di Pekarangan Sempit',
    emoji: '🍚',
    prinsip: 'Tidak punya sawah bukan alasan tidak bisa makan nasi dari kebun sendiri.',
    langkah: [
      'Gunakan galon air bekas yang dipotong lehernya, karung beras bekas, atau polybag ukuran 40x40 cm.',
      'Isi dengan media: 2 bagian tanah pekarangan + 1 bagian pupuk kasgot / kompos NPK ternak + 1 bagian arang sekam.',
      'Genangi air setinggi 2-3 cm dari permukaan tanah layaknya petak sawah mini.',
      'Tanam 2-3 bibit padi usia muda (10-14 hari setelah semai) per wadah.',
      'Siram secara berkala dengan air kurasan kolam lele bioflok yang kaya nutrisi nitrat.',
      'Dengan perawatan intensif 3-4 bulan, 1 polybag mampu menghasilkan 700 - 1.000 gram gabah (setara ~1 kg beras pulen).'
    ],
    resepDosis: '20 wadah sawah palsu di pekarangan 10m² mampu memenuhi kebutuhan beras keluarga 1 bulan penuh!'
  },
  {
    id: 'keyhole_herbal',
    title: 'Cara Buat Keyhole Garden Herbal',
    sub: 'Jahe, Kunyit, Temulawak di Pekarangan Sempit',
    emoji: '🫚',
    prinsip: 'Bentuk lingkaran berlubang kunci memudahkan penyiraman kompos di titik tengah.',
    langkah: [
      'Bentuk lingkaran berdiameter 1,5 - 2 meter dengan susunan bata, batu kali, atau bambu setinggi 60-80 cm.',
      'Di tengah lingkaran, pasang keranjang kawat/anyaman bambu silinder diameter 30 cm sebagai "lubang kunci" (sumur kompos).',
      'Isi area lingkaran dengan tanah gembur pasir berpadu kasgot dan daun kering.',
      'Tanam rimpang obat keluarga: Jahe Merah di saf tengah, Kunyit & Temulawak di saf luar, serta serai wangi di tepi.',
      'Setiap hari masukkan sisa sayur dapur dan air cucian beras langsung ke lubang kunci tengah. Nutrisi akan merembes perlahan ke seluruh tanaman rimpang.'
    ],
    resepDosis: '1 unit Keyhole Garden menghasilkan apotek hidup + bumbu dapur mandiri seumur hidup tanpa pupuk kimia.'
  }
];

export interface TanamanMataAir {
  nama: string;
  namaLatin: string;
  emoji: string;
  peranEkologis: string;
  nilaiEkonomi: string;
  rekomendasiTanam: string;
}

export const ENAM_TANAMAN_MATA_AIR: TanamanMataAir[] = [
  {
    nama: 'Kakao (Cokelat)',
    namaLatin: 'Theobroma cacao',
    emoji: '🍫',
    peranEkologis: 'Akar serabut dan tunggang menahan erosi tanah pasir, kanopi daun menjaga iklim mikro tanah tetap lembab.',
    nilaiEkonomi: 'Biji kakao fermentasi bernilai jual tinggi Rp 45.000 - Rp 60.000/kg kering.',
    rekomendasiTanam: 'Tanam di batas pekarangan sebagai tanaman penaung di samping tanaman pisang dan kelapa.'
  },
  {
    nama: 'Kopi (Robusta Pesisir)',
    namaLatin: 'Coffea canephora',
    emoji: '☕',
    peranEkologis: 'Menyerap air hujan deras dan mengalirkannya ke akuifer air tanah, daun gugur membentuk serasah humus tebal.',
    nilaiEkonomi: 'Kopi petik merah diminati kedai kopi lokal dengan harga Rp 35.000 - Rp 50.000/kg beras kopi.',
    rekomendasiTanam: 'Cocok di sela naungan pohon pelindung atau lereng pekarangan perbukitan Kalipucang.'
  },
  {
    nama: 'Alpukat Aligator / Miki',
    namaLatin: 'Persea americana',
    emoji: '🥑',
    peranEkologis: 'Pohon berdaun lebat sepanjang musim, evapotranspirasi menyejukkan lingkungan sekitar pemukiman pesisir.',
    nilaiEkonomi: 'Satu pohon dewasa menghasilkan 80-150 kg buah per musim (omzet Rp 2.000.000 - Rp 3.500.000/pohon/tahun).',
    rekomendasiTanam: 'Tanam 1-2 pohon di pojok halaman depan atau dekat saluran pembuangan air hujan.'
  },
  {
    nama: 'Mangga Gedong Gincu / Harum Manis',
    namaLatin: 'Mangifera indica',
    emoji: '🥭',
    peranEkologis: 'Sangat tahan terik matahari pesisir dan angin kencang laut, sistem perakaran dalam mengikat tanah berpasir.',
    nilaiEkonomi: 'Buah manis segar bernilai stabil Rp 20.000 - Rp 30.000/kg.',
    rekomendasiTanam: 'Tanam di sisi pekarangan yang terpapar matahari penuh sepanjang hari.'
  },
  {
    nama: 'Pohon Aren (Enau)',
    namaLatin: 'Arenga pinnata',
    emoji: '🌴',
    peranEkologis: 'Raja pengikat air tanah dan pelindung mata air alami! Ijuk dan akarnya mampu menyimpan ribuan liter air.',
    nilaiEkonomi: 'Nira aren untuk gula semut/gula merah aren Kalipucang, kolang-kaling, dan ijuk sapu bernilai ekonomi tinggi.',
    rekomendasiTanam: 'Tanam di dekat mata air, parit air alami, atau batas tebing sungai muara Citanduy Pamotan.'
  },
  {
    nama: 'Bambu Bali / Bambu Petung',
    namaLatin: 'Dendrocalamus asper / Bambusa',
    emoji: '🎍',
    peranEkologis: 'Satu rumpun bambu dapat menyimpan hingga 5.000 liter air hujan, mencegah longsor tebing pasir pesisir.',
    nilaiEkonomi: 'Batang bambu untuk bahan kandang ayam, rak vertikal, pagar, dan rebung bambu untuk sayur lezat.',
    rekomendasiTanam: 'Tanam di batas belakang lahan atau bantaran sungai sebagai benteng penahan angin pesisir.'
  }
];

