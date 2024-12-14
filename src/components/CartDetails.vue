<template>
    <!-- Modal Overlay -->
    <div
    v-if="isVisible"
    class="modal-overlay fixed inset-0 bg-[#11121B8C] z-50 flex items-center justify-center"
  >
    <!-- Modal Content -->
    <div class="checkout-modal max-w-[650px] w-full p-11 bg-white rounded-[20px]" v-if="isVisible">
        <div class="font-roboto font-bold text-[22px] leading-[24px] text-[#364A63] mb-3">
            Your Cart
        </div>

        <!-- product list table -->
        <table class="w-full border-collapse">
            <tr class="border-b border-[#DBDFEA] pb-3">
                <th class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#8091A7] text-left w-[52%]">
                    Item
                </th>
                <th class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#8091A7] text-center w-[12%]">
                    Color
                </th>
                <th class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#8091A7] text-center w-[12%]">
                    Size
                </th>
                <th class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#8091A7] text-center w-[12%]">
                    Qty
                </th>
                <th class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#8091A7] text-right w-[12%]">
                    Price
                </th>
            </tr>
            <tr class="border-b border-[#DBDFEA]">
                <td class="flex items-center gap-2 py-4">
                    <div class="w-9 h-9">
                        <img src="../assets/images/thumbnail/image (1).png" alt="thumbnail-1" />
                    </div>
                    <div class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#364A63]">
                        Classy Modern Smart Watch
                    </div>
                </td>
                <td class="font-roboto font-normal text-[14px] text-center text-[#364A63] py-4">
                    Black
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] py-4">
                    XL
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] py-4">
                    1
                </td>
                <td class="font-roboto font-bold text-[14px] text-right text-[#364A63] py-4">
                    $99.00
                </td>
            </tr>
            <tr class="border-b border-[#DBDFEA]">
                <td class="flex items-center gap-2 py-4">
                    <div class="w-9 h-9">
                        <img src="../assets/images/thumbnail/image (2).png" alt="thumbnail-2" />
                    </div>
                    <div class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#364A63]">
                        Elegant Analog Watch
                    </div>
                </td>
                <td class="font-roboto font-normal text-[14px] text-center text-[#364A63] py-4">
                    Purple
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] py-4">
                    L
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] py-4">
                    2
                </td>
                <td class="font-roboto font-bold text-[14px] text-right text-[#364A63] py-4">
                    $178.00
                </td>
            </tr>
            <tr class="border-b border-[#DBDFEA]">
                <td class="flex items-center gap-2 py-4">
                    <div class="w-9 h-9">
                        <img src="../assets/images/thumbnail/image (3).png" alt="thumbnail-3" />
                    </div>
                    <div class="font-roboto font-normal text-[14px] leading-[23.1px] text-[#364A63]">
                        Stylish Digital Watch
                    </div>
                </td>
                <td class="font-roboto font-normal text-[14px] text-center text-[#364A63] py-4">
                    Cyan
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] py-4">
                    M
                </td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63 py-4]">
                    1
                </td>
                <td class="font-roboto font-bold text-[14px] text-right text-[#364A63] py-4">
                    $79.00
                </td>
            </tr>
            <tr class="">
                <td class="font-roboto font-bold text-[16px] text-[#373737] pt-6">
                    Total
                </td>
                <td></td>
                <td></td>
                <td class="font-roboto font-bold text-[14px] text-center text-[#364A63] pt-6">
                    4
                </td>
                <td class="font-roboto font-bold text-[18px] text-right text-[#364A63] pt-6">
                    $356.00
                </td>
            </tr>
        </table>

        <!-- Checkout Button -->
        <div class="mt-6 flex justify-end items-center gap-4">
            <button @click="closeCheckoutModal"
                class="bg-white border border-[#DBDFEA] rounded-[3px] py-2 px-[18px] font-bold text-[13px] text-[#364A63]">
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
import { ref, onMounted } from "vue";

// Ref for controlling modal visibility
const isVisible = ref(false);

// Listen for the 'open-checkout' event
onMounted(() => {
    window.addEventListener("open-checkout", () => {
        isVisible.value = true;
    });
});

// Close the checkout modal
const closeCheckoutModal = () => {
    isVisible.value = false;
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

.checkout-modal table td {
    padding: 8px;
}

.checkout-modal .close-btn {
    background: none;
    border: none;
    color: #8091a7;
    cursor: pointer;
}
</style>
