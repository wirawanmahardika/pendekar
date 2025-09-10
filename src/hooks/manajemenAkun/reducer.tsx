import { AkunType } from "../../types/ManajemenAkunTypes"

export type manajemenAkunActionType = {
    type: "fill" | "add" | "delete" | "update",
    payload: AkunType | AkunType[] | number
}

export default function manajemenAkunReducer(state: AkunType[], action: manajemenAkunActionType){
    switch (action.type) {
        case "fill":
            return (action.payload) as AkunType[]
        case "add":
            return [...state, action.payload as AkunType]
        case "delete":
            return state.filter(s => s.id !== (action.payload as number))
        case "update":
            const payloadData = action.payload as AkunType
            const targetToUpdate = state.find(s => s.id === (action.payload as AkunType).id)
            const filteredData = state.filter(s => s.id !== (action.payload as AkunType).id)
            console.log(filteredData.length);
            console.log(state.length);
            
            const updatedAkun: AkunType = {
                id: payloadData.id,
                email: payloadData.email || targetToUpdate?.email || "",
                fullname: payloadData.fullname || targetToUpdate?.fullname || "",
                level: payloadData.level || targetToUpdate?.level || "",
                opd: payloadData.opd || targetToUpdate?.opd || "",
                username: payloadData.username || targetToUpdate?.opd || "",
                phone: payloadData.phone || targetToUpdate?.opd || "",
            }
            return [...filteredData, updatedAkun]
        default:
            return state
    }
}
