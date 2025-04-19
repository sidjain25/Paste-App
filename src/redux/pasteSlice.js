import { createSlice } from '@reduxjs/toolkit'
import toast  from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ?     JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // addToPastes: (state,action) => {
    //   // add a check -> PASTE ALREADY EXIST WALA CASE
    //  const paste = action.payload;
    //  state.pastes.push(paste);
    //  localStorage.setItem("pastes",JSON.stringify(state.pastes));
    //  toast("paste Created Suceessfully")
    // },
    addToPastes: (state, action) => {
      const paste = { ...action.payload, createdAt: new Date().toISOString() }; // ✅ createdAt add किया
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state,action) => {
     
      const paste =action.payload;
      const index = state.pastes.findIndex((item)=>
      item._id === paste._id);

      if(index >=0){
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("paste updated")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes =[];
      localStorage.removeItem("pasted");
    },
   removeFromPastes : (state, action) => {
    const pasteId = action.payload;
    console.log(pasteId);
    const index = state.pastes.findIndex((item)=> item._id === pasteId)
      if(index>=0){
        state.pastes.splice(index,1);
        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("paste deleted")
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer