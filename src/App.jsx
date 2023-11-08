import "./App.css";
import { createContext, useContext, useReducer } from "react";
// step1
// store
const store = {
  prodPrice: 5000,
  cartCount: 0,
  totalCost: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case "inc_cart_value":
      return { ...state, cartCount: state.cartCount + 1 };
    case "dec_cart_value":
      return { ...state, cartCount: state.cartCount - 1 };
    case "change_prod_price":
      return { ...state, prodPrice: action.payload };
    case "cal_total_cost":
      return { ...state, totalCost: state.prodPrice * state.cartCount };
    case "buy_product":
      return { ...state, cartCount: 0, totalCost: 0 };
    default:
      return state;
  }
};

const shopCtx = createContext(null);
export default function App() {
  const [state, dispatch] = useReducer(reducer, store);
  return (
    <div className="App">
      {/* step2 creating provider and passing values */}
      <shopCtx.Provider
        value={{
          state,
          dispatch
        }}
      >
        <ALLComponent />
      </shopCtx.Provider>
    </div>
  );
}

function ALLComponent() {
  return (
    <div>
      <ProductCard />
      <Cart />
      <AdminControl />
    </div>
  );
}

function ProductCard() {
  //step 3 use the context
  const { state, dispatch } = useContext(shopCtx);
  return (
    <div className="prod-card">
      <img src="data:image/jpeg;base64,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" />
      <div className="cart-action">
        <button onClick={() => dispatch({ type: "inc_cart_value" })}>+</button>
        <p>{state.cartCount}</p>
        <button onClick={() => dispatch({ type: "dec_cart_value" })}>-</button>
      </div>
      <p>Price {state.prodPrice}</p>
      <button onClick={() => dispatch({ type: "cal_total_cost" })}>
        checkout
      </button>
    </div>
  );
}

function Cart() {
  const { state, dispatch } = useContext(shopCtx);
  return (
    <div className="prod-card">
      <h3>Items in cart</h3>
      <div className="cart-action">
        <button onClick={() => dispatch({ type: "inc_cart_value" })}>+</button>
        <p>{state.cartCount}</p>
        <button onClick={() => dispatch({ type: "dec_cart_value" })}>-</button>
      </div>
      <h3>Total : {state.totalCost}</h3>
      <button onClick={() => dispatch({ type: "buy_product" })}>BUY</button>
    </div>
  );
}

function AdminControl() {
  const { state, dispatch } = useContext(shopCtx);
  return (
    <div>
      <input
        type="number"
        onChange={(e) =>
          dispatch({ type: "change_prod_price", payload: e.target.value })
        }
        value={state.prodPrice}
      />
    </div>
  );
}
