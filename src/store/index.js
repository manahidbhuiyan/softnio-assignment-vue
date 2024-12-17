import { createStore } from "vuex";

export default createStore({
  state: {
    isCheckoutModalVisible: false,
    products: [
      {
        id: 1,
        title: "Classy Modern Smart Watch",
        type: "Smartwatch",
        modelNumber: "SW12345",
        description: "I must explain to you how all this mistaken idea of denouncing and praising pain was born...",
        oldPrice: 99.00,
        price: 69.00,
        star: 3.5,
        reviews: 2,
        images: {
          purple: require('@/assets/images/product-gallery/purple.png'),
          cyan: require('@/assets/images/product-gallery/cyan.png'),
          blue: require('@/assets/images/product-gallery/blue.png'),
          black: require('@/assets/images/product-gallery/black.png'),
        },
        colors: [
          { name: "Purple", color: '#816BFF' },
          { name: "Cyan", color: '#1FCEC9' },
          { name: "Blue", color: '#4B97D3' },
          { name: "Black", color: '#3B4747' },
        ],
        sizes: [
          { name: "S", price: 69.00, previousPrice: 89.00 },
          { name: "M", price: 79.00, previousPrice: 99.00 },
          { name: "L", price: 89.00, previousPrice: 109.00 },
          { name: "XL", price: 99.00, previousPrice: 119.00 }
        ],
      },
    ],
    cart: []
  },
  mutations: {
    setCheckoutModalVisibility(state, visibility) {
        state.isCheckoutModalVisible = visibility;
      },
    addToCart(state, product) {
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        state.cart[existingProductIndex].quantity += product.quantity;
      } else {
        state.cart.push(product);
      }
    },
    updateCart(state, cart) {
      state.cart = cart;
    },
    updateQuantity(state, { product, quantity }) {
      const index = state.cart.findIndex(
        (item) => item.id === product.id && item.color === product.color && item.size === product.size
      );
      if (index !== -1) {
        state.cart[index].quantity = quantity;
      }
    },
  },
  actions: {
    setCheckoutModalVisibility({ commit }, visibility) {
        commit('setCheckoutModalVisibility', visibility);
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getProduct: (state) => state.products[0],
  },
});
