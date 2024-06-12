import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { starshipsApi, starshipsImgApi, peopleApi, filmsApi } from '../../services/starshipsService';

const api = starshipsApi();
const imgApi = starshipsImgApi();
const peopleApiService = peopleApi();
const filmsApiService = filmsApi();

export const fetchStarshipDetails = createAsyncThunk(
    'starships/fetchStarshipDetails',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getOne(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch starship details');
        }
    }
);

export const fetchStarships = createAsyncThunk(
    'starships/fetchStarships',
    async (page, { rejectWithValue }) => {
        try {
            const response = await api.getAll(page);
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return rejectWithValue('No more starships available');
            }
            return rejectWithValue(error.response?.data || 'Failed to fetch starships');
        }
    }
);

export const fetchStarshipImg = createAsyncThunk(
    'starships/fetchStarshipImg',
    async (id, { rejectWithValue }) => {
        try {
            const imgUrl = await imgApi.getOne(id);
            return { id, imgUrl };
        } catch (error) {
            return rejectWithValue({ id, imgUrl: '/big-placeholder.jpg' });
        }
    }
);

export const fetchPilots = createAsyncThunk(
    'starships/fetchPilots',
    async (url, { rejectWithValue }) => {
        try {
            const response = await peopleApiService.getPilot(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch pilot details');
        }
    }
);

export const fetchFilms = createAsyncThunk(
    'starships/fetchFilms',
    async (url, { rejectWithValue }) => {
        try {
            const response = await filmsApiService.getFilm(url);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch film details');
        }
    }
);

const starshipsSlice = createSlice({
    name: 'starships',
    initialState: {
        starships: {
            count: 0,
            next: null,
            previous: null,
            results: []
        },
        starship: null,
        images: {},
        pilots: [],
        films: [],
        loading: false,
        error: null,
        page: 1,
        hasMore: true,
        pilotsLoading: false,
        filmsLoading: false,
        starshipsLoading: false,
        starshipDetailsLoading: false,
        starshipImgLoading: false,
    },
    reducers: {
        incrementPage: (state) => {
            state.page += 1;
        },
        clearPilots(state) {
            state.pilots = [];
        },
        clearFilms(state) {
            state.films = [];
        },
        setPilotsLoading(state, action) {
            state.pilotsLoading = action.payload;
        },
        setFilmsLoading(state, action) {
            state.filmsLoading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchStarships.pending, (state) => {
            state.starshipsLoading = true;
            state.error = null;
        })
        .addCase(fetchStarships.fulfilled, (state, action) => {
            state.starshipsLoading = false;
            const existingResultsUrls = state.starships.results.map(starship => starship.url);
            const newResults = action.payload.results.filter(result => !existingResultsUrls.includes(result.url));
            state.starships.results = [...state.starships.results, ...newResults];
            state.hasMore = action.payload.next !== null;
            if (newResults.length > 0) state.page += 1;
        })
        .addCase(fetchStarships.rejected, (state, action) => {
            state.starshipsLoading = false;
            state.error = action.payload || action.error.message;
            state.hasMore = false;
        })
        .addCase(fetchStarshipDetails.pending, (state) => {
            state.starshipDetailsLoading = true;
            state.error = null;
            state.starship = null;
        })
        .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
            state.starshipDetailsLoading = false;
            state.starship = action.payload;
        })
        .addCase(fetchStarshipDetails.rejected, (state, action) => {
            state.starshipDetailsLoading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(fetchStarshipImg.pending, (state) => {
            state.starshipImgLoading = true;
            state.error = null;
        })
        .addCase(fetchStarshipImg.fulfilled, (state, action) => {
            state.starshipImgLoading = false;
            state.images[action.payload.id] = action.payload.imgUrl;
        })
        .addCase(fetchStarshipImg.rejected, (state, action) => {
            state.starshipImgLoading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(fetchPilots.pending, (state) => {
            state.pilotsLoading = true;
            state.error = null;
        })
        .addCase(fetchPilots.fulfilled, (state, action) => {
            state.pilotsLoading = false;
            state.pilots = [...state.pilots, action.payload];
        })
        .addCase(fetchPilots.rejected, (state, action) => {
            state.pilotsLoading = false;
            state.error = action.payload || action.error.message;
        })
        .addCase(fetchFilms.pending, (state) => {
            state.filmsLoading = true;
            state.error = null;
        })
        .addCase(fetchFilms.fulfilled, (state, action) => {
            state.filmsLoading = false;
            state.films = [...state.films, action.payload];
        })
        .addCase(fetchFilms.rejected, (state, action) => {
            state.filmsLoading = false;
            state.error = action.payload || action.error.message;
        });
    }
});

export const { incrementPage, clearPilots, clearFilms, setPilotsLoading, setFilmsLoading } = starshipsSlice.actions;
export default starshipsSlice.reducer;
