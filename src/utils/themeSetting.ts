import { KODE_SLUG } from "./api";
import { STRINGS  } from "./strings";

export const exportReportButtonStyle = {
    color: STRINGS[KODE_SLUG].theme.text_color,
    backgroundColor: STRINGS[KODE_SLUG].theme.btn_color,
}

export const pageTitleStyle = {
    title: { color: STRINGS[KODE_SLUG].theme.text_color },
    time: { backgroundColor: STRINGS[KODE_SLUG].theme.background_color }
}

export const tableHeaderStyle = { backgroundColor: STRINGS[KODE_SLUG].theme.table_header_color }

export const sidebarStyle = { backgroundColor: STRINGS[KODE_SLUG].theme.background_color }


export const loginTextStyle = {
    color: STRINGS[KODE_SLUG].theme.text_color,
    boxShadow: '6px 6px 0px ' + STRINGS[KODE_SLUG].theme.background_color
}

export const loginFormBacgkroundStyle = { backgroundColor: STRINGS[KODE_SLUG].theme.background_color }

export const umkmProdukDesaStyle = {
    penunjukArah: { color: STRINGS[KODE_SLUG].theme.icon_color },
    category: { backgroundColor: STRINGS[KODE_SLUG].theme.background_color }
}

export const tabNavigationStyle = {
    color: STRINGS[KODE_SLUG].theme.text_color,
    borderColor: STRINGS[KODE_SLUG].theme.background_color
}

export const loadingDotsColors = {
    color: STRINGS[KODE_SLUG].theme.text_color,
}