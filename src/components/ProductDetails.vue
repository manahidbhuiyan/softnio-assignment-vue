<template>
  <div class="main-content">
    <div
      class="parent max-w-full w-full mx-auto lg:max-h-[720px] lg:h-[720px] lg:max-w-[1330px] mt-0 pb-4 lg:my-20 flex flex-col lg:flex-row justify-center items-center gap-[30px] md:gap-[60px] flex-wrap overflow-hidden"
    >
      <!-- Image Gallery -->
      <div class="image-gallery w-full h-full flex-1">
        <!-- Dynamically show images based on the selected color -->
        <img
          v-if="selectedColor === 'Purple'"
          src="../assets/images/product-gallery/purple.png"
          alt="purple"
          class="w-full h-full active-image"
        />
        <img
          v-if="selectedColor === 'Cyan'"
          src="../assets/images/product-gallery/cyan.png"
          alt="cyan"
          class="w-full h-full active-image"
        />
        <img
          v-if="selectedColor === 'Blue'"
          src="../assets/images/product-gallery/blue.png"
          alt="blue"
          class="w-full h-full active-image"
        />
        <img
          v-if="selectedColor === 'Black'"
          src="../assets/images/product-gallery/black.png"
          alt="black"
          class="w-full h-full active-image"
        />
      </div>
      <!-- Product Details -->
      <div
        class="product-details w-full lg:flex-1 flex flex-col justify-center items-start md:px-4"
      >
        <h2
          class="title font-bold text-[28px] sm:text-[32px] lg:text-[40px] leading-[44px] text-[#364A63] py-2 md:py-3"
        >
          Classy Modern Smart Watch
        </h2>

        <!-- Review Stars -->
        <div
          class="packs-star flex flex-row justify-start gap-1 items-center pb-1"
        >
          <img
            src="../assets/images/star/star-fill.png"
            alt=""
            class="w-[18px] h-[18px]"
          />
          <img
            src="../assets/images/star/star-fill.png"
            alt=""
            class="w-[18px] h-[18px]"
          />
          <img
            src="../assets/images/star/star-fill.png"
            alt=""
            class="w-[18px] h-[18px]"
          />
          <img
            src="../assets/images/star/star-half-fill.png"
            alt=""
            class="w-[18px] h-[18px]"
          />
          <img
            src="../assets/images/star/star.png"
            alt=""
            class="w-[18px] h-[18px]"
          />
          <span
            class="star-text text-sm leading-[23.1px] font-normal text-[#8091A7]"
            >( 2 Reviews)</span
          >
        </div>

        <!-- Price -->
        <div class="pt-3 md:pt-5">
          <span
            class="font-normal text-xl leading-[30px] text-[#8091A7] line-through"
            >$99.00</span
          >
          <span
            id="main-price"
            class="ml-2 font-normal text-2xl leading-[30px] text-[#6576FF]">${{ price }}</span>
        </div>

        <!-- type and model -->
        <div class="flex flex-row gap-10 pt-3 md:pt-5">
          <div>
            <h5 class="type-text">Type</h5>
            <h3 class="font-bold text-base text-[#364A63]">Watch</h3>
          </div>
          <div>
            <h5 class="type-text">Model Number</h5>
            <h3 class="font-bold text-base text-[#364A63]">Forerunner 290XT</h3>
          </div>
        </div>

        <!-- description -->
        <div
          class="font-normal text-[18px] leading-[30px] text-[#8091A7] pt-3 md:pt-5"
        >
          I must explain to you how all this mistaken idea of denoun cing ple
          praising pain was born and I will give you a complete account of the
          system, and expound the actual teaching.
        </div>

        <!-- Band Color -->
        <div class="pt-3 md:pt-5">
          <div class="font-bold text-lg leading-5 text-[#364A63]">
            Band Color
          </div>
          <!-- Color Picker -->
          <div id="color-picker" class="flex gap-6 pt-4 pb-2">
            <div
              v-for="color in colors"
              :key="color.name"
              :style="{ backgroundColor: color.hex }"
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
        <div class="pt-3 md:pt-5">
          <div class="font-bold text-lg leading-5 text-[#364A63] mb-3">
            Wrist Size
          </div>
          <div id="size-button" class="flex gap-5">
            <div
              v-for="size in sizes"
              :key="size.price"
              :class="[
                'size-option',
                { 'active-size': selectedSize.price === size.price },
              ]"
              class="size-option"
              @click="updateSize(size)"
            >
            <span class="size-name">{{ size.name }}</span><span class="size-price">${{ size.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <div
      id="checkout-button"
      class="sticky-footer max-w-full mx-auto lg:max-w-[1330px] w-full flex justify-center"
    >
      <button @click="openCheckoutModal" class="custom-button mt-4 md:m-0">
        <span
          class="checkout-text text-[#364A63] font-roboto font-bold text-sm leading-[20px] tracking-[0.26px]"
          >Checkout</span
        >
        <span
          class="cart-badge flex items-center justify-center w-[19px] h-[20px] px-1.5 py-0.5 rounded-[5px] bg-white text-[#364A63] font-roboto font-bold text-xs leading-[16px] tracking-[0.26px]"
          >2</span
        >
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const colors = [
  { name: "Purple", hex: "#816BFF" },
  { name: "Cyan", hex: "#1FCEC9" },
  { name: "Blue", hex: "#4B97D3" },
  { name: "Black", hex: "#3B4747" },
];

const sizes = [{ name: 'S', price: 69 }, { name: 'M', price: 79 }, { name: 'L' , price: 89 }, { name: 'XL', price: 99 }];

const price = ref(sizes[1].price.toFixed(2));
const selectedSize = ref(sizes[1]);
const selectedColor = ref("Purple");

const updateColor = (color) => {
  selectedColor.value = color.name;
};

const updateSize = (size) => {
  selectedSize.value = size;
  price.value = Number(size.price).toFixed(2);
  console.log("price.value",price.value)
};

const openCheckoutModal = () => {
  const event = new CustomEvent("open-checkout");
  window.dispatchEvent(event);
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

@media (min-width: 1024px) and (max-width: 1200px) {
  .image-gallery {
    display: flex;
    align-items: center;
  }
  .image-gallery img {
    height: auto !important;
  }
}
@media (min-width: 768px) and (max-width: 1024px){
  .image-gallery img {
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
  }
}
</style>
