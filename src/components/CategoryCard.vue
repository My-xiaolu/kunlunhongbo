<template>
  <div class="category-card">
    <img :src="category.thumbnail" class="category-img" alt="分类图片" />
    <h3 class="category-name">{{ category.name }}</h3>
    <p class="category-description">{{ category.description }}</p>
    <ul class="category-features">
      <li v-for="feature in category.features" :key="feature">{{ feature }}</li>
    </ul>
    <el-button type="primary" size="small" @click.stop="$emit('show-detail')">查看详情</el-button>
    <!-- 价格和按钮已删除 -->
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  category: {
    type: Object,
    required: true
  }
})

defineEmits(['show-detail'])

// 选择分类
const selectCategory = () => {
  // router.push('/products') // This line was removed as per the new_code, as the button now emits an event.
}

const viewDetail = (e) => {
  e?.stopPropagation?.()
  // router.push({ path: '/products', query: { category: props.category.name } }) // This line was removed as per the new_code, as the button now emits an event.
}
</script>

<style scoped>
.category-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px #e0e7ef;
  padding: 32px 24px 24px 24px;
  margin-bottom: 32px;
  transition: box-shadow 0.2s;
  cursor: pointer;
  text-align: center;
}
.category-card:hover {
  box-shadow: 0 8px 32px #b2f5ea55;
}
.category-img {
  width: 100%;
  max-width: 220px;
  height: 140px;
  object-fit: contain;
  border-radius: 12px;
  margin-bottom: 18px;
  box-shadow: 0 2px 8px #eee;
}
.category-name {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0d9488;
}
.category-description {
  font-size: 1rem;
  color: #666;
  margin-bottom: 12px;
}
.category-features {
  list-style: none;
  padding: 0;
  margin: 0 0 12px 0;
  color: #10b981;
  font-size: 0.98rem;
}
</style> 