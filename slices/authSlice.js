export const signinUser = createAsyncThunk(
    'auth/signinUser',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            email: credentials.email,
            password: credentials.password,
          },
        });
  
        if (response.data.length > 0) {
          return response.data[0]; 
        } else {
          throw new Error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  const authSlice = createSlice({
    name: 'auth',
    initialState: {
      user: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(signupUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
  
        .addCase(signinUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(signinUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(signinUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default authSlice.reducer;
  