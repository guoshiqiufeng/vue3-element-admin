<template>
  <template v-if="item.slotName">
    <slot :name="item.slotName"></slot>
  </template>
  <template v-else>
    <template v-if="item.type === 'input' || item.type === 'password'">
      <el-input
        :placeholder="item.placeholder"
        v-bind="item.otherOptions"
        :show-password="item.type === 'password'"
        :model-value="modelValue[`${item.field}`]"
        @update:modelValue="handleValueChange($event, item.field)"
      />
    </template>
    <template v-else-if="item.type === 'input-number'">
      <el-input-number
        :model-value="modelValue[`${item.field}`]"
        v-bind="item.otherOptions"
        :label="item.label"
        @update:modelValue="handleValueChange($event, item.field, item.change)"
      ></el-input-number>
    </template>
    <template v-else-if="item.type === 'select'">
      <el-select
        :placeholder="item.placeholder"
        v-bind="item.otherOptions"
        style="width: 100%"
        :model-value="modelValue[`${item.field}`]"
        @update:modelValue="handleValueChange($event, item.field, item.change)"
      >
        <el-option
          v-for="option in item.options"
          :key="option.value"
          :value="option.value"
          >{{ option.title }}</el-option
        >
      </el-select>
    </template>
    <template v-else-if="item.type === 'radio'">
      <el-radio-group
        style="width: 100%"
        :model-value="modelValue[`${item.field}`]"
        @update:modelValue="handleValueChange($event, item.field, item.change)"
      >
        <el-radio
          v-for="option in item.options"
          :key="option.value"
          :label="option.value"
          >{{ option.title }}
        </el-radio>
      </el-radio-group>
    </template>
    <template v-else-if="item.type === 'datepicker'">
      <el-date-picker
        style="width: 100%"
        v-bind="item.otherOptions"
        :model-value="modelValue[`${item.field}`]"
        @update:modelValue="handleValueChange($event, item.field)"
      ></el-date-picker>
    </template>
  </template>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '@/base-ui/form-item'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    item: {
      type: Object as PropType<IFormItem>,
      default: undefined
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const handleValueChange = (value: any, field: string, change?: any) => {
      change && change(value)
      emit('change', value, field)
    }

    return { handleValueChange }
  }
})
</script>
<style scoped lang="scss"></style>
