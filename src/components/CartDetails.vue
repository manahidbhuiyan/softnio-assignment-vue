<template>
  <!-- Modal Overlay -->
  <div v-if="isCheckoutModalVisible"
    class="modal-overlay fixed inset-0 bg-[#11121B8C] z-50 flex items-center justify-center">
    <!-- Modal Content -->
    <div class="checkout-modal max-w-[650px] w-full p-5 md:p-11 bg-white rounded-[20px]" v-if="isCheckoutModalVisible">
      <div class="font-bold text-[22px] leading-[24px] text-dark-slate-blue mb-3">
        Your Cart
      </div>

      <!-- product list table -->
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-soft-gray pb-3">
            <th class="table-head text-left w-[52%]">Item</th>
            <th class="table-head text-center w-[12%]">Color</th>
            <th class="table-head text-center w-[12%]">Size</th>
            <th class="table-head text-center w-[12%]">Qty</th>
            <th class="table-head text-right w-[12%]">Price</th>
          </tr>
        </thead>
        <!-- product list -->
        <tbody>
          <tr class="border-b border-soft-gray" v-for="(item, index) in cart" :key="index">
            <td class="flex items-center gap-2 py-4">
              <div class="w-9 h-9">
                <img :src="getProductImage(item.color)" alt="thumbnail" />
              </div>
              <div class="column-title">{{ item.title }}</div>
            </td>
            <td class="font-normal column-text">{{ item.color }}</td>
            <td class="font-bold column-text">{{ item.size }}</td>
            <td class="font-bold column-text">{{ item.quantity }}</td>
            <td class="font-bold text-[14px] text-right text-dark-slate-blue py-4">${{ item.price }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td class="font-bold text-[14px] sm:text-[16px] text-[#373737] pt-6">
              Total
            </td>
            <td></td>
            <td></td>
            <td class="font-bold text-[12px] sm:text-[14px] text-center text-dark-slate-blue pt-6">
              {{ cartTotalQuantity }}
            </td>
            <td class="font-bold text-[14px] sm:text-[18px] text-right text-dark-slate-blue pt-6">
              ${{ cartTotal }}
            </td>
          </tr>
        </tfoot>
      </table>

      <!-- Checkout Button -->
      <div class="flex justify-end gap-6 items-center pt-10">
        <button @click="closeCheckoutModal"
          class="bg-white border border-soft-gray rounded-[3px] py-2 px-[18px] font-bold text-[13px] text-dark-slate-blue">
          Continue Shopping
        </button>
        <button class="bg-[#6576FF] rounded-[3px] py-2 px-[18px] font-bold text-[13px] text-white">
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isCheckoutModalVisible = computed(() => store.state.isCheckoutModalVisible);
const cart = computed(() => store.state.cart);


const cartTotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0);
});
const cartTotalQuantity = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const getProductImage = (color) => {
  return store.state.products[0].images[color.toLowerCase()];
};

const closeCheckoutModal = () => {
  store.dispatch("setCheckoutModalVisibility", false);
};

</script>


<style scoped>
.checkout-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

.checkout-modal .close-btn {
  background: none;
  border: none;
  color: #8091a7;
  cursor: pointer;
}
</style>
