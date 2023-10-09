import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LineItem } from "../../utils/wooCommerceTypes";

// Define a type for the slice state
interface CartState {
  lineItems: LineItem[];
}

// Define the initial state using that type
const initialState: CartState = {
  lineItems: [],
};

// NOTE: Redux Toolkit's createReducer API uses Immer internally automatically making it safe to mutate state. createSlice uses createReducer inside so it's also safe to mutate state there as well. This even applies if the case reducer functions are defined outside of the createSlice/createReducer call (as in the functions defined below)
const addLineItemReducer = (
  state: CartState,
  action: PayloadAction<LineItem>
) => {
  const index = state.lineItems.findIndex(
    (lineItem) => lineItem.product_id === action.payload.product_id
  );
  // if index === -1, id is not in lineItems array
  if (index === -1) {
    // add line item to lineItems array
    state.lineItems = [...state.lineItems, action.payload];
  } else {
    // update the lineItems[index] quantity
    state.lineItems[index].quantity += action.payload.quantity;
  }
};

const decrementQuantityReducer = (
  state: CartState,
  action: PayloadAction<LineItem>
) => {
  const index = state.lineItems.findIndex(
    (lineItem) => lineItem.product_id === action.payload.product_id
  );
  // if index === -1, id is not in lineItems array
  if (index >= 0 && state.lineItems[index].quantity > 1) {
    // update the lineItems[index] quantity
    state.lineItems[index].quantity -= action.payload.quantity;
  }
};

const removeLineItemReducer = (
  state: CartState,
  action: PayloadAction<LineItem>
) => {
  const index = state.lineItems.findIndex(
    (lineItem) => lineItem.product_id === action.payload.product_id
  );
  // if index === -1, id is not in lineItems array
  if (index >= 0) {
    state.lineItems.splice(index, 1);
  }
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  // Use the PayloadAction type to declare the contents of `action.payload`
  reducers: {
    addLineItem: addLineItemReducer,
    decrementLineItemQuantity: decrementQuantityReducer,
    removeLineItem: removeLineItemReducer,
    resetCartState() {
      return initialState;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {}
});


// reducers/actions go in here in order to import them into components
export const {
  addLineItem,
  decrementLineItemQuantity,
  removeLineItem,
  resetCartState,
} = cartSlice.actions;

export default cartSlice.reducer;
