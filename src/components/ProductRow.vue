<template>
  <div class="mx-auto mt-5 bg-gray-50 rounded-lg p-5">
    <div class="grid grid-cols-12 gap-4">
      <div>#</div>
      <div class="col-span-4">Наименование товара</div>
      <div>Кол-во</div>
      <div class="col-span-2">Ед. изм.</div>
      <div class="col-span-2">Цена</div>
      <div>Сумма</div>
    </div>
    <div v-for="(item, i) in data" :key="i" class="grid grid-cols-12 gap-1">
      <div class="m-auto">{{ i + 1 }}</div>
      <div class="col-span-4">
        <c-input
            :ref="'name_' + i"
            v-model="item.name"
            :maxlength="255"
            type="text"
            required
        />
      </div>
      <div>
        <c-input
            :ref="'quantity_' + i"
            v-model="item.quantity"
            type="number"
            required
            decimal
        />
      </div>
      <div class="col-span-2 mt-2.5">
        <select
            v-model="item.unit"
            class="block w-full h-10 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset
                       ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600
                       sm:text-sm sm:leading-6'">
          <option v-for="(unit, i) in units" :key="i" :label="unit.label" :value="unit.value" />
        </select>
      </div>
      <div class="col-span-2">
        <c-input
            :ref="'price_' + i"
            v-model="item.price"
            type="number"
            required
            decimal
        />
      </div>
      <div class="m-auto">{{ calcSum(item.quantity, item.price, i) }}</div>
      <div v-if="i !== 0" class="mt-2.5">
        <button
            @click.prevent="deleteRow(i)"
            class="block w-full h-10 rounded-md bg-gray-100 border border-gray-300 border-solid px-3.5 py-2 text-center text-sm
                   font-semibold shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <MinusIcon />
        </button>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-5">
      <div class="col-span-5 text-right font-bold">Итого: </div>
      <div class="text-center font-bold">{{ quantityTotalCalc() }}</div>
      <div class="col-start-11 text-center font-bold">{{ totalSumCalc() }}</div>
    </div>
    <div class="mt-5 flex items-center justify-end">
      <button
          @click.prevent="addRow"
          class="block w-50 h-10 rounded-md bg-gray-100 border border-gray-300 border-solid px-3.5 py-2 text-center text-sm
                 font-semibold shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Добавить товар
      </button>
    </div>
  </div>
</template>

<script>
import CInput from './CInput.vue'
import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'

export default {
  name: "ProductRow",
  components: { CInput, MinusIcon, PlusIcon },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data(){
    return {
      units: [
        { label: 'шт.', value: 'piece' },
        { label: 'кг.', value: 'kg' },
        { label: 'л.', value: 'litres' },
      ],
    };
  },
  methods: {
    calcSum(var_1, var_2, index){
      const sum = var_1 * var_2;
      this.data[index].sum = sum.toFixed(2);
      this.$emit('update-data', this.data);
      return sum;
    },
    addRow(){
      this.data.push({
        name: 'Новый товар',
        quantity: 0,
        unit: 'piece',
        price: 0,
      });
      this.$emit('update-data', this.data);
    },
    deleteRow(index){
      this.data.splice(index, 1);
      this.$emit('update-data', this.data);
    },
    quantityTotalCalc(){
      let sum = 0;
      this.data.forEach(item => {
        if (parseFloat(item.quantity)){
          sum += parseFloat(item.quantity);
        }
      });
      this.$emit('update-quantity', sum);
      return sum.toFixed(2);
    },
    totalSumCalc(){
      let sum = 0;
      this.data.forEach(item => {
        if (parseFloat(item.sum)){
          sum += parseFloat(item.sum);
        }
      });
      this.$emit('update-sum', sum);
      return sum.toFixed(2);
    },
    isValid(){
      let result = true;
      this.data.forEach((item, i) => {
        if (!this.$refs['name_' + i][0].isValid() &&
            !this.$refs['quantity_' + i][0].isValid() &&
            !this.$refs['price_' + i][0].isValid()
        ){
          result = false;
        }
      });

      return result;
    },
  },
}
</script>

<style scoped>

</style>
