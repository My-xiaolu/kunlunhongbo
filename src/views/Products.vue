<template>
  <div class="products-page">
    <AppHeader />
    <h1 class="products-title">产品展示</h1>
    <div class="category-tabs">
      <el-button
        v-for="cat in categories"
        :key="cat.id"
        :type="cat.name === currentCategoryName ? 'primary' : 'default'"
        @click="scrollToCategory(cat)"
        class="category-tab-btn"
      >
        {{ cat.name }}
      </el-button>
    </div>
    <div class="products-grid">
      <CategoryCard
        v-for="cat in categories"
        :key="cat.id"
        :category="cat"
        :ref="el => setCategoryRef(cat.name, el)"
        class="animate-fade-in-up"
        @show-detail="showCategoryDetail(cat)"
      />
    </div>
    <el-dialog v-model="detailVisible" :title="detailCategory?.name" width="700px" destroy-on-close>
      <div v-if="detailCategory">
        <div class="detail-dialog-header">
          <img :src="detailCategory.thumbnail" class="detail-dialog-img" alt="分类图片" />
          <div class="detail-dialog-info">
            <h2 class="detail-dialog-title">{{ detailCategory.name }}</h2>
            <p class="detail-dialog-desc">{{ detailCategory.description }}</p>
            <ul class="detail-dialog-features">
              <li v-for="feature in detailCategory.features" :key="feature">{{ feature }}</li>
            </ul>
          </div>
        </div>
        <div class="detail-dialog-gallery">
          <div v-for="(img, i) in getCategoryImages(detailCategory.name)" :key="i" class="detail-dialog-gallery-img-wrap">
            <img :src="img" class="detail-dialog-gallery-img" :alt="`${detailCategory.name}图片${i+1}`" @error="onImgError($event)" @click="openPreview(i)" style="cursor:zoom-in;" />
          </div>
        </div>
      </div>
      <template #footer>
        <el-button @click="detailVisible=false">关闭</el-button>
        <el-button type="primary" @click="callPhone">电话咨询</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model="previewVisible" width="auto" class="img-preview-dialog" :show-close="true" append-to-body>
      <div class="img-preview-wrapper">
        <img :src="previewList[previewIndex]" class="img-preview-main" />
        <div class="img-preview-thumbs">
          <img v-for="(img, i) in previewList" :key="i" :src="img" class="img-preview-thumb" :class="{active: i===previewIndex}" @click="previewIndex=i" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import CategoryCard from '@/components/CategoryCard.vue'
const productStore = useProductStore()
const categories = computed(() => productStore.categories)
const route = useRoute()
const router = useRouter()
const currentCategoryName = ref('')
const categoryRefs = ref({})
const setCategoryRef = (name, el) => {
  if (el) categoryRefs.value[name] = el.$el || el
}
const scrollToCategory = (cat) => {
  currentCategoryName.value = cat.name
  router.replace({ path: '/products', query: { category: cat.name } })
  setTimeout(() => {
    const el = categoryRefs.value[cat.name]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, 100)
}
watch(
  () => route.query.category,
  (catName) => {
    if (catName) {
      currentCategoryName.value = catName
      setTimeout(() => {
        const el = categoryRefs.value[catName]
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    }
  },
  { immediate: true }
)
const detailVisible = ref(false)
const detailCategory = ref(null)
const showCategoryDetail = (cat) => {
  detailCategory.value = cat
  detailVisible.value = true
}
const callPhone = () => { window.open('tel:18099219306') }
// 分类名到图片前缀映射
const categoryImageMap = {
  '锌钢护栏': 'zinc_steel',
  '草坪护栏': 'lawn',
  '工地围挡': 'site_fence',
  '市政护栏': 'municipal',
  '基坑护栏': 'pit',
  '铝艺护栏': 'aluminum'
}
// 每类图片数量（全部为4张）
const categoryImageCount = {
  '锌钢护栏': 4,
  '草坪护栏': 4,
  '工地围挡': 4,
  '市政护栏': 4,
  '基坑护栏': 4,
  '铝艺护栏': 4
}
const getCategoryImages = (catName) => {
  const prefix = categoryImageMap[catName]
  const count = categoryImageCount[catName] || 1
  return Array.from({ length: count }, (_, i) => `/images/products/${prefix}_${String(i+1).padStart(2,'0')}.jpg`)
}
const placeholder = '/images/placeholder.png'
function onImgError(e) {
  e.target.src = placeholder
}
// 图片预览
const previewVisible = ref(false)
const previewList = ref([])
const previewIndex = ref(0)
const openPreview = (idx) => {
  previewList.value = getCategoryImages(detailCategory.value.name)
  previewIndex.value = idx
  previewVisible.value = true
}
</script>

<style scoped>
.products-page {
  padding: 48px 0 32px 0;
  min-height: 70vh;
}
.products-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0d9488;
  margin-bottom: 32px;
  text-align: center;
}
.category-tabs {
  display: flex;
  gap: 18px;
  justify-content: center;
  margin-bottom: 32px;
}
.category-tab-btn {
  font-size: 1.08rem;
  font-weight: 600;
}
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 32px;
  justify-content: center;
  margin-top: 32px;
}
.products-grid :deep(.category-card) {
  background: #f8fafc;
  border: 1.5px solid #e0e7ef;
  border-radius: 18px;
  box-shadow: 0 2px 12px #e0e7ef55;
  transition: box-shadow .2s, border-color .2s;
  padding: 28px 18px 24px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 370px;
}
.products-grid :deep(.category-card):hover {
  box-shadow: 0 6px 32px #0d948822;
  border-color: #0d9488;
  background: #f1f5f9;
}
.detail-dialog-header {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  margin-bottom: 18px;
}
.detail-dialog-img {
  width: 180px;
  height: 120px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 2px 8px #eee;
}
.detail-dialog-info {
  flex: 1;
}
.detail-dialog-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0d9488;
  margin-bottom: 8px;
}
.detail-dialog-desc {
  font-size: 1rem;
  color: #666;
  margin-bottom: 10px;
}
.detail-dialog-features {
  list-style: none;
  padding: 0;
  margin: 0 0 8px 0;
  color: #10b981;
  font-size: 0.98rem;
}
.detail-dialog-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 8px;
}
.detail-dialog-gallery-img-wrap {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e0e7ef;
  padding: 8px;
  margin-bottom: 8px;
  width: 180px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-dialog-gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: box-shadow .2s;
}
.detail-dialog-gallery-img:hover {
  box-shadow: 0 4px 24px #0d948855;
}
.img-preview-dialog .el-dialog__body {
  padding: 0;
}
.img-preview-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #222;
  border-radius: 12px;
  padding: 18px 18px 8px 18px;
}
.img-preview-main {
  max-width: 80vw;
  max-height: 60vh;
  border-radius: 10px;
  box-shadow: 0 4px 32px #000a;
  background: #fff;
}
.img-preview-thumbs {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  justify-content: center;
}
.img-preview-thumb {
  width: 60px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  border: 2px solid transparent;
  cursor: pointer;
  background: #fff;
  transition: border .2s;
}
.img-preview-thumb.active {
  border: 2px solid #0d9488;
}
</style> 