import { createSlice } from '@reduxjs/toolkit';

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: 'Spider-Man',
        villans: "Green Goblin",
        age: 18,
        super_power: 'Spider Powers',
        origin_summary: 'Spider Bite',
        weakness: 'anti-venom',
        movies: 'Spider-Man',
    },
    reducers: {
        chooseName: (state, action) => { state.name = action.payload},
        chooseVillains: (state, action) => { state.villans = action.payload},
        chooseAge: (state, action) => { state.age = action.payload},
        chooseSuperPower: (state, action) => { state.super_power = action.payload},
        chooseOrigin: (state, action) => { state.origin_summary = action.payload},
        chooseWeakness: (state, action) => { state.weakness = action.payload},
        chooseMovies: (state, action) => { state.movies = action.payload},
    }
})

// Export Reducers
export const reducer = rootSlice.reducer
export const { chooseName, chooseVillains, chooseAge, chooseSuperPower, chooseOrigin, chooseWeakness, chooseMovies} = rootSlice.actions