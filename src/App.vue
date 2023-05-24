<template>
  <div class="isolate bg-white px-6 py-24 sm:py-12 lg:px-8">
    <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
         aria-hidden="true">
      <div class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none
      -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30
      sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]" style="clip-path:
      polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
    </div>
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Генератор счета</h2>
    </div>
    <form class="mx-auto mt-16 max-w-3xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-12">
        <c-input
            ref="supplier_title"
            v-model="form.supplier_title"
            span="6"
            label="Наименование поставщика"
            type="text"
            :maxlength="255"
            required
        />
        <c-input
            ref="client_inn"
            v-model="form.client_inn"
            span="6"
            label="ИНН поставщика"
            type="number"
            :maxlength="30"
            required
        />
        <c-input
            ref="supplier_kpp"
            v-model="form.supplier_kpp"
            span="6"
            label="КПП поставщика"
            type="number"
            :maxlength="30"
            required
        />
        <c-input
            ref="supplier_address"
            v-model="form.supplier_address"
            span="6"
            label="Адрес поставщика"
            type="text"
            :maxlength="255"
            required
        />
        <c-input
            ref="logo"
            @change="file => form.logo = file"
            span="6"
            label="Лого компании"
            type="file"
            required
        />
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-12 mt-20">
        <c-input
            class="col-span-6"
            ref="client_fio"
            v-model="form.client_fio"
            label="ФИО покупателя"
            type="text"
            :maxlength="255"
            required
        />
        <c-input
            class="col-span-6"
            ref="supplier_inn"
            v-model="form.supplier_inn"
            label="ИНН покупателя"
            type="number"
            :maxlength="30"
            required
        />
        <c-input
            class="col-span-6"
            ref="client_address"
            v-model="form.client_address"
            label="Адрес покупателя"
            type="text"
            :maxlength="255"
            required
        />
      </div>
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-12 mt-20">
        <c-input
            class="col-span-6"
            ref="order_number"
            v-model="form.order_number"
            label="Номер счета"
            type="text"
            :maxlength="30"
            required
        />
      </div>
      <hr class="border-t-2 border-gray-300 mt-5">
        <product-row
            ref="productRows"
            :data="form.products"
            @update-data="changeProducts"
            @update-quantity="sum => form.total_quantity = sum"
            @update-sum="sum => form.total_sum = sum"
        />
      <div class="mt-10">
        <button
            @click.prevent="submit"
            class="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white
            shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
            focus-visible:outline-indigo-600"
        >
          Сформировать счет
        </button>
      </div>
    </form>
  </div>
  <Modal ref="modal" />
  <Spinner
      v-if="loading"
      class="fixed z-10 left-0 top-0 bg-white right-0 bottom-0 flex items-center justify-center"
  />
</template>
<script>
import {sendData} from './api/order.js'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import CInput from "./components/CInput.vue";
import ProductRow from "./components/ProductRow.vue";
import Modal from "./components/Modal.vue";
import Spinner from "./components/Spinner.vue";

export default {
  components: {Modal, ProductRow, CInput, ChevronDownIcon, Switch, SwitchGroup, SwitchLabel, Spinner },
  data() {
    return {
      form: {
        supplier_title: '',
        supplier_inn: '',
        supplier_kpp: '',
        supplier_address: '',
        logo: {},
        client_fio: '',
        client_inn: '',
        client_address: '',
        order_number: '',
        total_quantity: '',
        total_sum: '',
        products: [
          {
            name: 'Product one',
            quantity: 0,
            unit: 'piece',
            price: 0,
            sum: 0
          },
        ],
      },
      loading: false,
    }
  },
  methods: {
    async sendData(){
      this.loading = true;
      await sendData(this.form)
          .then(res => {
            window.open(res.data, '_blank')
            this.loading = false;
          })
          .catch(error => {
            this.$refs['modal'].showMessage(error.response.data.message);
            this.loading = false;
          });
    },
    changeProducts(products){
      this.form.products = products;
    },
    changeQuantity(quantity){
      this.form.total_quantity = quantity;
    },
    checkValidate(){
      const products = this.$refs['productRows'].isValid();
      if (!this.$refs['supplier_title'].isValid() ||
          !this.$refs['supplier_inn'].isValid() ||
          !this.$refs['supplier_kpp'].isValid() ||
          !this.$refs['supplier_address'].isValid() ||
          !this.$refs['client_fio'].isValid() ||
          !this.$refs['client_inn'].isValid() ||
          !this.$refs['client_address'].isValid() ||
          !this.$refs['order_number'].isValid() ||
          !this.$refs['productRows'].isValid() ||
          !this.$refs['logo'].isValid()
      ){
        this.$refs['modal'].showMessage('Форма заполнена не корректно');
        return false;
      }

      return true;
    },
    submit(){
      if (this.checkValidate()){
        this.sendData();
      };
    },
  }
}
</script>
<style>
</style>
