import { AkunType } from "../../types/ManajemenAkunTypes"

export type manajemenAkunActionType = {
    type: "add" | "delete" | "edit",
    payload: AkunType | AkunType[] | number
}

export default function manajemenAkunReducer(state: AkunType[], action: manajemenAkunActionType){
    switch (action.type) {
        case "add":
            return (action.payload) as AkunType[]
        case "delete":
            return state.filter(s => s.id !== (action.payload as number))
        default:
            return state
    }
}
