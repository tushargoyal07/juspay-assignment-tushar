import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SearchState {
    globalSearchTerm: string
    searchResults: any[]
    isSearching: boolean
    searchHistory: string[]
}

const initialState: SearchState = {
    globalSearchTerm: "",
    searchResults: [],
    isSearching: false,
    searchHistory: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setGlobalSearchTerm: (state, action: PayloadAction<string>) => {
            state.globalSearchTerm = action.payload
        },
        setSearchResults: (state, action: PayloadAction<any[]>) => {
            state.searchResults = action.payload
        },
        setIsSearching: (state, action: PayloadAction<boolean>) => {
            state.isSearching = action.payload
        },
        addToSearchHistory: (state, action: PayloadAction<string>) => {
            const term = action.payload.trim()
            if (term && !state.searchHistory.includes(term)) {
                state.searchHistory.unshift(term)
                // Keep only last 10 searches
                if (state.searchHistory.length > 10) {
                    state.searchHistory = state.searchHistory.slice(0, 10)
                }
            }
        },
        clearSearchHistory: (state) => {
            state.searchHistory = []
        },
        clearSearch: (state) => {
            state.globalSearchTerm = ""
            state.searchResults = []
            state.isSearching = false
        },
    },
})

export const {
    setGlobalSearchTerm,
    setSearchResults,
    setIsSearching,
    addToSearchHistory,
    clearSearchHistory,
    clearSearch,
} = searchSlice.actions

export default searchSlice.reducer
