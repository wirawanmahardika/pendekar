import { dokumenDanPerencaanType } from "../../types/perencanaan/DokumenDanPerencanaan"

type dokumenDanPerencanaanState = dokumenDanPerencaanType[]
type ubahStatusPayloadAction = { id: string; status: "Revisi" | "Ditolak" | "Disetujui" | "Baru" }
export type dokumenDanPerencanaanAction = {
    type: "add-all" | "ubah-status",
    payload: dokumenDanPerencanaanState[] | dokumenDanPerencanaanState | ubahStatusPayloadAction
}

export function dokumenDanPerencaanReducer(state: dokumenDanPerencanaanState, action: dokumenDanPerencanaanAction) {
    switch (action.type) {
        case "add-all":
            return action.payload as dokumenDanPerencaanType[]
        case "ubah-status":
            const payload = action.payload as ubahStatusPayloadAction;
            return state.map(item =>
                item.id === payload.id
                    ? { ...item, status: payload.status }
                    : item
            );
        default:
            return state
    }
}