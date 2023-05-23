<template>
  <div ref="main" :class="'col-span-' + span">
    <label v-if="label" for="first-name" class="block text-sm font-semibold leading-6 text-gray-900">{{ label }}</label>
    <div class="mt-2.5">
      <template v-if="type === 'number'">
        <input
            type="number"
            :name="name"
            :required="required"
            v-model="computedValue"
            :class="'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ' +
                    'placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    + errorStyle"
            @input="hanleInput"
            @blur="checkFill"
        />
      </template>
      <template v-else-if="type === 'file'">
        <input :type="type"
               :name="name"
               :required="required"
               :value="modelValue"
               @input="handleLogoChange"
               @change="checkFillFile"
               :class="'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300' +
                       'placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        + errorStyle"
        />
      </template>
      <template v-else>
        <input :type="type"
               :name="name"
               :required="required"
               :value="modelValue"
               :maxlength="maxlength"
               :class="'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300' +
                       'placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        + errorStyle"
               @input="$emit('update:modelValue', $event.target.value)"
               @blur="checkFill"
        />
      </template>
    </div>
    <div v-if="errorMsg" class="text-xs text-rose-500 text-left">Поле обязательно к заполнению</div>
    <div v-if="errorShortMsg" class="text-xs text-rose-500 text-left">*</div>
  </div>
</template>

<script>
export default {
  name: "CInput",
  props: {
    modelValue: [String, Number, File],
    type: {
      type: String,
      default: 'text'
    },
    name: String,
    required: Boolean,
    decimal: Boolean,
    label: {
      type: [String, Boolean],
      required: false,
      default: false,
    },
    span: {
      type: [Number, String],
      required: false,
      default: 12
    },
    maxlength: Number,
  },
  emits: ['update:modelValue', 'change'],
  data(){
    return {
      errorStyle: '',
      errorMsg: false,
      errorShortMsg: false,
      fileIsValid: false,
      value: '',
    };
  },
  computed: {
    computedValue: {
      get(){
        return this.value;
      },
      set(newVal){
          if (this.decimal){
            this.value = parseFloat(String(newVal)).toFixed(2);
          } else {
            this.value = newVal
          }

        }
    },
  },
  methods: {
    checkFill(){
      if (this.required === true && this.modelValue.length === 0){
        this.errorStyle = ' border-2 border-rose-600';
        if (this.$refs.main.offsetWidth > 100){
          this.errorMsg = true;
        } else {
          this.errorShortMsg = true;
        }
      } else {
        this.errorStyle = '';
        this.errorMsg = false;
        this.errorShortMsg = false;
      }
    },
    isValid(){
      if (this.required === true && this.type === 'file' && !this.fileIsValid){
        this.errorStyle = ' border-2 border-rose-600';
        this.errorMsg = true;
        return false;
      } else if (this.required === true && this.type !== 'file' && this.modelValue.length === 0){
        this.checkFill();
        return false;
      }

      return true;
    },
    handleLogoChange(event) {
      this.$emit('change', event.target.files[0])
    },
    checkFillFile(e){
      if (this.required === true && e.target.files[0]){
        this.fileIsValid = true;
        this.errorStyle = '';
        this.errorMsg = false;
        this.errorShortMsg = false;
      } else {
        this.fileIsValid = false;
        this.errorStyle = ' border-2 border-rose-600';
        if (this.$refs.main.offsetWidth > 100){
          this.errorMsg = true;
        } else {
          this.errorShortMsg = true;
        }
      }
    },
    hanleInput(event){
      this.$emit('update:modelValue', event.target.value);
    },
  },
}
</script>

<style scoped>
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
