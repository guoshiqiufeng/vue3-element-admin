<template>
  <div class="hq-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form ref="formRef" :model="modelValue" :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <template v-if="showFormItems">
            <el-col v-bind="colLayout">
              <el-form-item
                v-if="!item.isHidden"
                :label="item.label"
                :prop="item.field"
                :rules="item.rules"
                :style="itemStyle"
              >
                <hq-form-item
                  :model-value="modelValue"
                  :item="item"
                  @change="handleValueChange"
                >
                  <template #[item.slotName]>
                    <template v-if="item.slotName">
                      <slot :name="item.slotName"></slot>
                    </template>
                  </template>
                </hq-form-item>
              </el-form-item>
            </el-col>
          </template>
          <template v-else>
            <el-col v-bind="colLayout" :style="itemStyle">
              <hq-form-item
                :model-value="modelValue"
                :item="item"
                @change="handleValueChange"
              >
                <template #[item.slotName]>
                  <template v-if="item.slotName">
                    <slot :name="item.slotName"></slot>
                  </template>
                </template>
              </hq-form-item>
            </el-col>
          </template>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { IFormItem } from '@/base-ui/form-item'
import HqFormItem from '@/base-ui/form-item'
import { ElForm } from 'element-plus'
export default defineComponent({
  components: { HqFormItem },
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    showFormItems: {
      type: Boolean,
      default: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const formRef = ref<InstanceType<typeof ElForm>>()

    const handleValueChange = (value: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: value })
    }

    return {
      formRef,
      handleValueChange
    }
  }
})
</script>

<style scoped lang="scss"></style>
