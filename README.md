# 📁 Struktur Folder Proyek React

## Tujuan
Struktur proyek ini dirancang untuk menjaga **modularitas, keterbacaan, dan pemisahan konteks** antar halaman. Terdapat dua kategori file:

1. **File Global** — Dipakai oleh banyak halaman.
2. **File Spesifik Halaman** — Hanya digunakan di satu halaman tertentu (dipisahkan ke dalam subfolder sesuai nama halaman di folder `pages/`).

---

## 📂 Penjelasan Folder

| Folder        | Deskripsi |
|---------------|-----------|
| `components/` | Berisi komponen UI reusable. Komponen umum berada langsung di root folder ini, sedangkan komponen khusus halaman dikelompokkan dalam subfolder sesuai nama halaman. |
| `hooks/`      | Custom hooks. File di root adalah hook global. Hook yang hanya digunakan oleh satu halaman tertentu diletakkan dalam subfolder berdasarkan nama halaman. |
| `utils/`      | Fungsi utilitas. Utilitas umum di root folder. Utilitas khusus halaman disimpan di subfolder bernama sesuai halaman terkait. |
| `types/`      | Tipe TypeScript. Tipe global diletakkan di root. Tipe yang hanya digunakan oleh satu halaman ditempatkan dalam subfolder khusus. |
| `pages/`      | Menyimpan file halaman (route-level components). Setiap halaman boleh memiliki komponen, hook, utilitas, atau tipe sendiri di folder lain (dengan nama folder yang sama). |

---

## 🔍 Contoh

Untuk halaman `Dashboard`:

- `pages/Dashboard.tsx` → Komponen halaman utama
- `components/Dashboard/RevenueCard.tsx` → Komponen UI khusus dashboard
- `hooks/Dashboard/useDashboardStats.ts` → Hook data dashboard
- `utils/Dashboard/parseChartData.ts` → Fungsi utilitas parsing data grafik
- `types/Dashboard/chart.ts` → Tipe data grafik dashboard

---

## ✅ Best Practices

- Gunakan subfolder bernama sesuai halaman hanya jika file tersebut **tidak digunakan di tempat lain**.
- Komponen dan fungsi **yang digunakan lintas halaman** **harus tetap di root folder** `components/`, `utils/`, dll.
- Jangan membuat subfolder terlalu dalam — cukup satu level (`components/Dashboard/...`).
- Jaga konsistensi penamaan agar mudah dicari dan tidak membingungkan developer lain.

---

## 📘 Kesimpulan

Dengan pendekatan ini, proyek akan:
- Lebih **terorganisir**
- Mudah untuk **scaling dan refactor**
- Meminimalkan duplikasi dan **conflict antar fitur**

