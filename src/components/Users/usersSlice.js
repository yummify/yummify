import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchUsersAsync = createAsyncThunk("fetchUsers", async () => {
  try {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      users.push({ userId: doc.id, data: doc.data() });
    });
    return users;
  } catch (err) {
  }
});

const initialState = [];
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUsers = (state) => state.users;
export default usersSlice.reducer;
