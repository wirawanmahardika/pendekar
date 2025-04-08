export const KODE_SLUG = window.location.hostname.split(".")[0];

// export const KODE_SLUG = "enrekangkab";
// export const KODE_SLUG = "ketapangkab";
export function getSlugType() {
    return KODE_SLUG.includes("-") ? "kecamatan" : "kabupaten";
}

// URL API dasar berdasarkan slug yang aktif
export const BASE_API_URL = `https://${KODE_SLUG}.pendekar.digital/api/`;

// URL untuk CDN tetap sama
export const CDN_URL = "https://cdn.digitaldesa.com/";

// Konstanta untuk kunci token di localStorage
const TOKEN_KEY = "api_token";

// Fungsi untuk menyimpan token API di localStorage
export function setApiToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
}

// Fungsi untuk mendapatkan token API dari localStorage
export function getApiToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Fungsi untuk menghapus token API dari localStorage
export function clearApiToken() {
    localStorage.removeItem(TOKEN_KEY);
}
