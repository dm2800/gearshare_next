import { create } from "zustand";


const useAppStore = create((set) => ({
    date: [{
        startDate: new Date(), 
        endDate: null, 
        key: 'selection'
    }],
    setDate: (data) => set(() => ({date: data})), 
    daysTotal: 0,
    setDaysTotal: (days) => set(() => ({daysTotal: days}))
}))


export default useAppStore; 