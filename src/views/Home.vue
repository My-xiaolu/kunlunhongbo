<template>
  <div class="home-page">
    <!-- LOGO和主标题 -->

    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="container">
        <!-- 轮播图样式优化 -->
        <el-carousel height="420px" indicator-position="outside" arrow="always" style="margin-bottom:40px;">
          <el-carousel-item v-for="(src, i) in banners" :key="i">
            <div style="width:100%;height:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0ea5e9,#0d9488);border-radius:16px;overflow:hidden;">
              <img :src="src" style="max-width:100%;max-height:70%;object-fit:contain;margin-bottom:18px;box-shadow:0 2px 12px #0ea5e955;" :alt="`轮播图${i+1}`" />
              <div style="width:100%;text-align:center;color:#fff;">
                <h2 style="font-size:1.5rem;margin-bottom:6px;letter-spacing:2px;">新疆昆仑宏博金属制品有限公司</h2>
                <p style="font-size:1.08rem;">主营：锌钢护栏、草坪护栏、工地围挡、市政护栏、基坑护栏、铝艺护栏等</p>
                <p style="font-size:1rem;opacity:0.85;">厂家直供 · 诚信服务 · 18099219306</p>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              新疆昆仑宏博金属制品有限公司
            </h1>
            <p class="hero-subtitle">
              主营：锌钢护栏、草坪护栏、工地围挡、市政护栏、基坑护栏、铝艺护栏等
            </p>
                          <div class="hero-features">
                <div class="feature-item">
                  <el-icon size="24" color="#10b981">
                    <Check />
                  </el-icon>
                  <span>厂家直供</span>
                </div>
                <div class="feature-item">
                  <el-icon size="24" color="#10b981">
                    <Check />
                  </el-icon>
                  <span>诚信服务</span>
                </div>
                <div class="feature-item">
                  <el-icon size="24" color="#10b981">
                    <Check />
                  </el-icon>
                  <span>18099219306</span>
                </div>
              </div>
                          <div class="hero-actions">
                <el-button type="primary" size="large" @click="scrollToProducts">
                  <el-icon><View /></el-icon>
                  查看产品
                </el-button>
                <el-button size="large" @click="scrollToContact">
                  <el-icon><Phone /></el-icon>
                  立即咨询
                </el-button>
              </div>
          </div>
                      <div class="hero-visual">
              <el-carousel height="340px" indicator-position="outside" arrow="always" style="background:transparent;box-shadow:none;">
                <el-carousel-item v-for="product in featuredProducts" :key="product.id">
                  <div style="width:100%;height:340px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0ea5e9,#0d9488);border-radius:16px;overflow:hidden;">
                    <img :src="product.image" style="max-width:100%;max-height:70%;object-fit:contain;margin-bottom:14px;box-shadow:0 2px 12px #0ea5e955;" :alt="product.name" />
                    <div style="width:100%;text-align:center;color:#fff;">
                      <h2 style="font-size:1.2rem;margin-bottom:4px;letter-spacing:1px;">新疆昆仑宏博金属制品有限公司</h2>
                      <p style="font-size:1rem;">主营：锌钢护栏、草坪护栏、工地围挡、市政护栏、基坑护栏、铝艺护栏等</p>
                      <p style="font-size:0.95rem;opacity:0.85;">厂家直供 · 诚信服务 · 18099219306</p>
                    </div>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
        </div>
      </div>
    </section>

    <!-- 产品展示区 -->
    <section id="products" class="products-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">产品展示</h2>
          <p class="section-subtitle">选择适合您的护栏产品，支持定制化服务</p>
        </div>
        
        <div class="products-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id"
            :category="category"
            class="animate-fade-in-up"
            @show-detail="goToProductCategory(category)"
          />
        </div>
      </div>
    </section>

    <!-- 热销产品轮播 -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热销产品</h2>
          <p class="section-subtitle">客户最喜爱的护栏产品</p>
        </div>
        
        <div class="featured-carousel">
          <Swiper
            :modules="[swiperModules.Autoplay, swiperModules.EffectCreative]"
            :slides-per-view="1"
            :space-between="30"
            :loop="true"
            :autoplay="{ delay: 5000, disableOnInteraction: false }"
            :creative-effect="creativeEffectConfig"
            class="featured-swiper"
          >
            <SwiperSlide v-for="product in featuredProducts" :key="product.id">
              <div class="featured-card">
                <div class="card-image">
                  <img :src="product.image" class="featured-img" alt="产品图片" style="width:100%;max-width:220px;height:140px;object-fit:contain;border-radius:12px;box-shadow:0 2px 8px #eee;margin-bottom:12px;" />
                  <div class="product-tags">
                    <span 
                      v-for="tag in product.tags" 
                      :key="tag"
                      class="tag"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div class="card-content">
                  <h3 class="product-name">{{ product.name }}</h3>
                  <div class="product-rating">
                    <el-rate 
                      v-model="product.rating" 
                      disabled 
                      show-score 
                      text-color="#ff9900"
                    />
                    <span class="sales-count">已售 {{ product.sales }} 件</span>
                  </div>
                  <div class="card-actions">
                    <el-button type="primary" @click="goProductCategory(product)">
                      查看详情
                    </el-button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>

    <!-- 联系我们 -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="contact-content contact-only-info">
          <div class="contact-info">
            <h2 class="contact-title">联系我们</h2>
            <p class="contact-subtitle">专业团队为您提供最佳解决方案</p>
            <div class="contact-items">
              <div class="contact-item">
                <el-icon size="24" color="#0d9488">
                  <Phone />
                </el-icon>
                <div class="item-content">
                  <h4>客服热线</h4>
                  <p>18099219306</p>
                </div>
              </div>
              <div class="contact-item">
                <el-icon size="24" color="#0d9488">
                  <Message />
                </el-icon>
                <div class="item-content">
                  <h4>微信客服</h4>
                  <div class="wechat-row">
                    <span class="wechat-label">微信号1：</span>
                    <span class="wechat-id">JC0607C</span>
                    <el-button size="small" class="wechat-copy-btn" @click="copyWeixin('JC0607C')">复制</el-button>
                  </div>
                  <div class="wechat-row">
                    <span class="wechat-label">微信号2：</span>
                    <span class="wechat-id">kun787799302</span>
                    <el-button size="small" class="wechat-copy-btn" @click="copyWeixin('kun787799302')">复制</el-button>
                  </div>
                </div>
              </div>
              <div class="contact-item">
                <el-icon size="24" color="#0d9488">
                  <Location />
                </el-icon>
                <div class="item-content">
                  <h4>公司地址</h4>
                  <p>昆仑市工业园区护栏大道88号</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'
import { Swiper, SwiperSlide, swiperModules, creativeEffectConfig } from '@/plugins/swiper'
import { useRouter } from 'vue-router'

import CategoryCard from '@/components/CategoryCard.vue'
import ProductShowcase from '@/components/ProductShowcase.vue'

const productStore = useProductStore()
const router = useRouter()

// 从store获取数据
const categories = computed(() => productStore.categories)
const featuredProducts = computed(() => productStore.featuredProducts)

// 轮播图图片路径
const bannerCount = 10
const banners = Array.from({ length: bannerCount }, (_, i) => `/images/banner/banner${i + 1}.jpg`)

// 联络表单
const contactForm = ref({
  name: '',
  phone: '',
  message: ''
})

// 滚动到产品区域
const scrollToProducts = () => {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

// 滚动到联络区域
const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

// 查看产品
const viewProduct = (product) => {
  ElMessage.info(`查看产品：${product.name}`)
}

// 加入购物车
const addToCart = (product) => {
  ElMessage.success(`${product.name} 已加入购物车`)
}

// 提交联络表单
const submitContact = () => {
  if (!contactForm.value.name || !contactForm.value.phone || !contactForm.value.message) {
    ElMessage.warning('请填写完整信息')
    return
  }
  
  ElMessage.success('询价已发送，我们将尽快与您联系')
  contactForm.value = { name: '', phone: '', message: '' }
}

// 跳转到产品分类详情
const goProductCategory = (product) => {
  // 通过产品名或其它字段匹配分类
  const match = categories.value.find(cat => product.name.includes(cat.name))
  const catName = match ? match.name : ''
  router.push({ path: '/products', query: { category: catName } })
}

// 跳转到产品分类详情 (CategoryCard 组件触发)
const goToProductCategory = (category) => {
  router.push({ path: '/products', query: { category: category.name } })
}

// 生命周期
onMounted(() => {
  // 设置默认选中的产品
  if (categories.value.length > 0) {
    productStore.selectProduct(categories.value[0])
  }
})

function openWeixin(wxid) {
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    window.location.href = `weixin://dl/chat?${wxid}`
  } else {
    navigator.clipboard.writeText(wxid)
    ElMessage.success('微信号已复制，可在微信中添加')
  }
}

function copyWeixin(wxid) {
  navigator.clipboard.writeText(wxid)
  ElMessage.success('微信号已复制，可在微信中添加')
}
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  padding: 120px 0 80px;
  background: $gradient-primary;
  color: $white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
  }
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-12;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.hero-text {
  .hero-title {
    font-size: $font-size-4xl;
    font-weight: 700;
    margin-bottom: $spacing-6;
    line-height: 1.2;

    @media (max-width: $breakpoint-md) {
      font-size: $font-size-3xl;
    }
  }

  .hero-subtitle {
    font-size: $font-size-xl;
    margin-bottom: $spacing-8;
    opacity: 0.9;
    line-height: 1.6;
  }

  .hero-features {
    display: flex;
    gap: $spacing-6;
    margin-bottom: $spacing-8;

    @media (max-width: $breakpoint-md) {
      flex-direction: column;
      gap: $spacing-3;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: $spacing-2;
      font-weight: 500;
    }
  }

  .hero-actions {
    display: flex;
    gap: $spacing-4;

    @media (max-width: $breakpoint-sm) {
      flex-direction: column;
    }

    .el-button {
      height: 48px;
      font-weight: 600;
    }
  }
}

.hero-visual {
  .hero-image {
    background: rgba(255, 255, 255, 0.1);
    border-radius: $border-radius-2xl;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);

    .image-placeholder {
      text-align: center;
      color: $white;

      p {
        margin-top: $spacing-4;
        font-size: $font-size-lg;
      }
    }
  }
}

.products-section {
  padding: $spacing-20 0;
  background: $gray-50;
}

.section-header {
  text-align: center;
  margin-bottom: $spacing-12;

  .section-title {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $primary-color;
    margin-bottom: $spacing-4;
  }

  .section-subtitle {
    font-size: $font-size-lg;
    color: $gray-600;
    max-width: 600px;
    margin: 0 auto;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: $spacing-8;

  @media (max-width: $breakpoint-md) {
    grid-template-columns: 1fr;
  }
}

.showcase-section {
  padding: $spacing-20 0;
  background: $white;
}

.featured-section {
  padding: $spacing-20 0;
  background: $gray-50;
}

.featured-carousel {
  max-width: 800px;
  margin: 0 auto;
}

.featured-swiper {
  padding: $spacing-4;
}

.featured-card {
  background: $white;
  border-radius: $border-radius-2xl;
  box-shadow: $shadow-lg;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: $shadow-xl;
  }

  .card-image {
    position: relative;
    height: 250px;
    background: $gradient-primary;
    display: flex;
    align-items: center;
    justify-content: center;

    .image-placeholder {
      text-align: center;
      color: $white;
    }

    .product-tags {
      position: absolute;
      top: $spacing-4;
      left: $spacing-4;
      display: flex;
      gap: $spacing-2;

      .tag {
        background: rgba(255, 255, 255, 0.9);
        color: $primary-color;
        padding: $spacing-1 $spacing-2;
        border-radius: $border-radius-full;
        font-size: $font-size-xs;
        font-weight: 600;
      }
    }
  }

  .card-content {
    padding: $spacing-6;

    .product-name {
      font-size: $font-size-xl;
      font-weight: 600;
      color: $gray-800;
      margin-bottom: $spacing-3;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: $spacing-3;
      margin-bottom: $spacing-4;

      .sales-count {
        font-size: $font-size-sm;
        color: $gray-600;
      }
    }

    .product-price {
      margin-bottom: $spacing-6;

      .current-price {
        font-size: $font-size-2xl;
        font-weight: 700;
        color: $primary-color;
        margin-right: $spacing-2;
      }

      .original-price {
        font-size: $font-size-lg;
        color: $gray-500;
        text-decoration: line-through;
      }
    }

    .card-actions {
      display: flex;
      gap: $spacing-3;

      .el-button {
        flex: 1;
      }
    }
  }
}

.contact-section {
  padding: $spacing-20 0;
  background: $white;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-12;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $spacing-8;
  }
}

.contact-content.contact-only-info {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}
.contact-info {
  max-width: 480px;
  margin: 0 auto;
}
.contact-info {
  .contact-title {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $primary-color;
    margin-bottom: $spacing-4;
  }

  .contact-subtitle {
    font-size: $font-size-lg;
    color: $gray-600;
    margin-bottom: $spacing-8;
  }

  .contact-items {
    display: flex;
    flex-direction: column;
    gap: $spacing-6;

    .contact-item {
      display: flex;
      align-items: center;
      gap: $spacing-4;
      padding: $spacing-4;
      background: $gray-50;
      border-radius: $border-radius-lg;

      .item-content {
        h4 {
          font-weight: 600;
          color: $gray-800;
          margin-bottom: $spacing-1;
        }

        p {
          color: $gray-600;
          margin: 0;
        }
      }
    }
  }
}

.contact-form {
  background: $gray-50;
  padding: $spacing-8;
  border-radius: $border-radius-2xl;

  h3 {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $primary-color;
    margin-bottom: $spacing-6;
    text-align: center;
  }

  .el-form-item {
    margin-bottom: $spacing-6;
  }

  .el-button {
    width: 100%;
    height: 48px;
    font-weight: 600;
  }
}

.wechat-list {
  display: flex;
  gap: 16px;
  margin-top: 2px;
}
.wechat-item {
  color: #0d9488;
  font-weight: 600;
  cursor: pointer;
  background: #e0f2fe;
  border-radius: 8px;
  padding: 2px 10px;
  transition: background .2s;
}
.wechat-item:hover {
  background: #bae6fd;
}

.wechat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}
.wechat-label {
  color: #64748b;
  font-size: 1rem;
  min-width: 70px;
}
.wechat-id {
  color: #166086;
  font-weight: 700;
  font-size: 1.08rem;
  letter-spacing: 1px;
}
.wechat-copy-btn {
  padding: 2px 10px;
  font-size: 0.95rem;
  border-radius: 6px;
}

// 動畫
.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 