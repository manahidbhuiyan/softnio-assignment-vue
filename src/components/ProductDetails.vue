<template>
  <div class="main-content">
    <div
      class="parent max-w-full w-full mx-auto lg:max-h-[720px] lg:h-[720px] lg:max-w-[1330px] mt-0 pb-4 lg:my-20 flex flex-col 2md:flex-row lg:flex-row justify-center items-center gap-[30px] md:gap-[60px] flex-wrap overflow-hidden"
    >
      <!-- Image Gallery -->
      <div class="image-gallery w-full h-full flex-1">
        <img :src="currentImage" :alt="selectedColor" class="w-full h-full active-image" />
      </div>
      <!-- Product Details -->
      <div class="product-details w-full 2md:flex-1 flex flex-col justify-center items-start 2md:px-4">
        <h2 class="title font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[44px] text-dark-slate-blue py-2 md:py-3">
        {{ product.title }}
        </h2>

        <!-- Review Stars -->
        <div class="packs-star flex flex-row justify-start gap-1 items-center pb-1">
          <div v-for="n in Math.floor(product.star)" :key="n">
            <img src="../assets/images/star/star-fill.png" alt="" class="w-[18px] h-[18px]" />
          </div>
          <div v-if="product.star % 1 !== 0">
            <img src="../assets/images/star/star-half-fill.png" alt="" class="w-[18px] h-[18px]" />
          </div>
          <img src="../assets/images/star/star.png" alt="" class="w-[18px] h-[18px]" />
          <span class="star-text text-sm leading-23 font-normal text-blue-gray">({{ product.reviews }} Reviews)</span>
        </div>

        <!-- Price -->
        <div class="pt-4 md:pt-5">
          <span class="font-normal text-xl leading-[30px] text-blue-gray line-through">${{ Number(oldPrice).toFixed(2) }}</span>
          <span id="main-price" class="ml-2 font-normal text-2xl leading-[30px] text-[#6576FF]">
            ${{ Number(price).toFixed(2) }}
          </span>
        </div>

        <!-- type and model -->
        <div class="flex flex-row gap-10 pt-4 md:pt-5">
          <div>
            <h5 class="type-text">Type</h5>
            <h3 class="font-bold text-base text-dark-slate-blue">{{ product.type }}</h3>
          </div>
          <div>
            <h5 class="type-text">Model Number</h5>
            <h3 class="font-bold text-base text-dark-slate-blue">{{ product.modelNumber }}</h3>
          </div>
        </div>


        <!-- description -->
        <div class="font-normal text-[18px] leading-[30px] text-blue-gray pt-4 md:pt-5">
          {{ product.description }}
        </div>

        <!-- Brand Color -->
        <div class="pt-4 md:pt-5">
          <div class="font-bold text-lg leading-5 text-dark-slate-blue">Band Color</div>
          <!-- Color Picker -->
          <div id="color-picker" class="flex gap-6 mt-4 mb-2 ml-1 2md:ml-0">
            <div
              v-for="color in product.colors"
              :key="color.name"
              :style="{ backgroundColor: color.color }"
              :class="[
                'color-circle w-6 h-6 rounded-full cursor-pointer',
                { 'ring-2 ring-offset': selectedColor === color.name },
                { [`ring-${color.name}`]: selectedColor === color.name },
              ]"
              @click="updateColor(color)"
            ></div>
          </div>
        </div>

        <!-- Size Options -->
        <div class="pt-4 md:pt-5">
          <div class="font-bold text-lg leading-5 text-dark-slate-blue mb-3">Wrist Size</div>
          <div id="size-button" class="flex flex-col xs:flex-row justify-start items-center gap-3">
            <div
              v-for="size in product.sizes"
              :key="size.name"
              :class="[
                'size-option',
                { 'active-size': selectedSize.name === size.name },
              ]"
              @click="updateSize(size)"
            >
              <span class="size-name">{{ size.name }}</span>
              <span class="size-price">${{ size.price }}</span>
            </div>
          </div>
        </div>

        <!-- Quantity and cart add -->
        <div class="pt-4 md:pt-5 flex flex-col xs:flex-row justify-start gap-4 items-center">
          <div
            id="quantity-field"
            class="w-full xs:w-[130px] h-[36px] flex border border-soft-gray rounded-[4px] font-roboto text-[14px] font-normal leading-23 text-dark-slate-blue"
          >
            <div
              id="decrease"
              class="w-1/4 xs:w-[35px] flex items-center justify-center border-r border-soft-gray cursor-pointer"
              @click="decreaseQuantity"
            >
              <img src="../assets/images/icon/7 D.svg" alt="decress-icon" />
            </div>
            <div
              id="quantity-display"
              class="w-2/4 xs:w-[60px] flex items-center justify-center border-r border-soft-gray font-normal text-[14px] leading-23 text-dark-slate-blue"
            >
              {{ quantity }}
            </div>
            <div
              id="increase"
              class="w-1/4 xs:w-[35px] flex items-center justify-center cursor-pointer"
              @click="increaseQuantity"
            >
              <img src="../assets/images/icon/3 M.svg" alt="incress-icon" />
            </div>
          </div>

          <!-- Add to Cart and Wishlist -->
          <div class="flex flex-col xs:flex-row justify-start gap-4 items-center pt-5 xs:pt-0">
            <div class="flex flex-row justify-start items-center gap-4">
              <button
                id="add-to-cart"
                class="w-[110px] h-[36px] px-4 py-2 bg-[#6576FF] rounded-[3px] text-white text-[13px] font-bold leading-5 tracking-02 text-center focus:outline-none"
                @click="addToCart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <div
      id="checkout-button" class="sticky-footer max-w-full mx-auto lg:max-w-[1330px] w-full flex justify-center"  v-if="cartTotalQuantity > 0" >
      <button @click="openCheckoutModal" class="custom-button mt-4 md:m-0">
        <span
          class="checkout-text text-dark-slate-blue font-roboto font-bold text-sm leading-[20px] tracking-02]"
          >Checkout</span
        >
        <span
          class="cart-badge flex items-center justify-center w-[19px] h-[20px] px-1.5 py-0.5 rounded-[5px] bg-white text-dark-slate-blue font-roboto font-bold text-xs leading-[16px] tracking-02"
          >{{ cartTotalQuantity }}</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const quantity = ref(0);
const selectedColor = ref("Purple");
const selectedSize = ref({ name: "M", price: 79.0, previousPrice: 99.0 });

const oldPrice = computed(() => selectedSize.value.previousPrice);
const price = computed(() => selectedSize.value.price);

const product = computed(() => store.getters.getProduct);
const cart = computed(() => store.state.cart);

const currentImage = computed(() => product.value.images[selectedColor.value.toLowerCase()]);

const updateColor = (color) => {
  selectedColor.value = color.name;
};

const updateSize = (size) => {
  selectedSize.value = size;
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 0) quantity.value--;
};

const addToCart = () => {
  const productData = {
    id: product.value.id,
    title: product.value.title,
    color: selectedColor.value,
    size: selectedSize.value.name,
    price: price.value,
    quantity: quantity.value,
  };

  store.commit('addToCart', productData);
  quantity.value = 0; 
};

const cartTotalQuantity = computed(() => cart.value.reduce((total, item) => total + item.quantity, 0));

const openCheckoutModal = () => {
  store.dispatch('setCheckoutModalVisibility', true);
};
</script>

<style scoped>
.color-circle.ring-2 {
  border-width: 2px;
}

.ring-Purple {
  --tw-ring-opacity: 1;
  --tw-ring-color: #816bff;
}

.ring-Cyan {
  --tw-ring-opacity: 1;
  --tw-ring-color: #1fcec9;
}

.ring-Blue {
  --tw-ring-opacity: 1;
  --tw-ring-color: #4b97d3;
}

.ring-Black {
  --tw-ring-opacity: 1;
  --tw-ring-color: #3b4747;
}
</style>
