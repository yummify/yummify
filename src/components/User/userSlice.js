import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const addUserAsync = createAsyncThunk(
  "addUser",
  async ({ userId, name, email, phoneNumber, zipcode }) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name,
        email,
        phoneNumber,
        zipcode,
        isAdmin: false,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchUserAsync = createAsyncThunk("fetchUser", async (userId) => {
  try {
    console.log("UserId:", userId);
    const usersRef = doc(db, "users", userId);
    const docSnap = await getDoc(usersRef);
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
    } else {
      console.log("No such document");
    }
  } catch (err) {
    console.log(err);
  }
});

const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
