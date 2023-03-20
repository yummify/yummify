import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const fetchUsersAsync = createAsyncThunk("fetchUsers", async () => {
  try {
    const users = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      users.push({ userId: doc.id, data: doc.data() });
    });
    console.log("Users:", users);
    return users;
  } catch (err) {
    console.log(err);
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
