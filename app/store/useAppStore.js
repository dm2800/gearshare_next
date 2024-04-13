import { create } from "zustand";
// import { getFavoriteInstruments } from "@/helpers/get-watchers-by-instrument";


const useAppStore = create((set) => ({
    date: [{
        startDate: new Date(), 
        endDate: null, 
        key: 'selection'
    }],
    setDate: (data) => set(() => ({date: data})), 
    daysTotal: 0,
    setDaysTotal: (days) => set(() => ({daysTotal: days})),
    activeChatId: null,
    setActiveChatId: (data) => set(() => ({activeChatId: data})), 
    // favoritesByWatcher: [], 
    // fetchFavoritesByWatcher: async(watcherId) => {
    //     const favorites = await getFavoriteInstruments(watcherId); 
    //     set(() => ({favoritesByWatcher: favorites}))
    // }
}))


export default useAppStore; 