<template>
  <div class="about-page">
    <AppHeader />
    <!-- 顶部大标题与地理标识 -->
    <section class="about-hero">
      <div class="about-hero-left">
        <h1 class="about-title">新疆制造 · 全国守护</h1>
        <p class="about-desc">作为扎根新疆20年的护栏制造专家，我们专注为各类工程提供：</p>
        <ul class="about-tags">
          <li>√ 市政交通护栏</li>
          <li>√ 工地安全围挡</li>
          <li>√ 园林景观护栏</li>
          <li>√ 定制化护栏解决方案</li>
        </ul>
      </div>
      <div class="about-hero-right">
        <!-- 新疆地图SVG+工厂定位动画 -->
        <div class="map-container">
          <img src="/images/placeholder.png" alt="新疆地图" class="map-img" />
          <div class="factory-dot"></div>
        </div>
        <div class="local-label">新疆本地制造</div>
      </div>
    </section>

    <!-- 动态数据展示 -->
    <section class="about-stats">
      <div class="stat-item">
        <div class="stat-num" id="stat-meter">0</div>
        <div class="stat-label">累计生产总量(米)</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" id="stat-client">0</div>
        <div class="stat-label">服务客户(家)</div>
      </div>
      <div class="stat-item">
        <div class="stat-num" id="stat-year">0</div>
        <div class="stat-label">年产能(米)</div>
      </div>
    </section>

    <!-- 产品参数卡与材料对比 -->
    <section class="about-products">
      <h2 class="section-title">主力产品技术参数</h2>
      <div class="product-cards">
        <div class="product-card" v-for="p in productParams" :key="p.name" @mouseenter="hoverProduct=p.name" @mouseleave="hoverProduct=''">
          <div class="product-icon"><img :src="p.icon" :alt="p.name" /></div>
          <div class="product-info">
            <h3>{{ p.name }}</h3>
            <ul>
              <li v-for="item in p.params" :key="item">{{ item }}</li>
            </ul>
            <div class="warranty-label" :class="{ shine: hoverProduct===p.name }">20年质保</div>
          </div>
          <transition name="fade">
            <img v-if="hoverProduct===p.name" :src="p.caseImg" class="case-img" alt="工程案例" />
          </transition>
        </div>
      </div>
      <div class="compare-tool">
        <h3>材料对比</h3>
        <div class="compare-chart">
          <img src="/images/placeholder.png" alt="材料对比图" />
        </div>
      </div>
    </section>

    <!-- 透明化生产流程 -->
    <section class="about-process">
      <h2 class="section-title">透明化生产流程</h2>
      <div class="process-steps">
        <div class="process-step" v-for="(step, idx) in processSteps" :key="step.title">
          <img :src="step.img" class="step-img" :alt="step.title" />
          <div class="step-title">{{ idx+1 }}. {{ step.title }}</div>
          <video v-if="step.video" :src="step.video" class="step-video" autoplay loop muted playsinline></video>
        </div>
      </div>
    </section>

    <!-- 信任体系 -->
    <section class="about-trust">
      <h2 class="section-title">客户信任与资质认证</h2>
      <div class="trust-logos">
        <div class="trust-logo" v-for="logo in trustLogos" :key="logo.alt">
          <img :src="logo.src" :alt="logo.alt" />
        </div>
      </div>
      <div class="testimonials">
        <div class="testimonial" v-for="t in testimonials" :key="t.client">
          <img :src="t.logo" class="testimonial-logo" :alt="t.client" />
          <div class="testimonial-text">“{{ t.text }}”</div>
        </div>
      </div>
      <div class="cert-wall">
        <img v-for="cert in certs" :src="cert" :key="cert" class="cert-img" alt="资质证书" />
      </div>
      <div class="factory-live">
        <h3>实时工厂监控</h3>
        <img src="/images/placeholder.png" alt="工厂监控" class="live-img" />
      </div>
    </section>

    <!-- 交互工具区 -->
    <section class="about-tools">
      <div class="tools-row">
        <el-button type="warning" class="call-btn" @click="callPhone">一键呼叫 18099219306</el-button>
        <el-button type="primary" class="calc-btn" @click="showCalc=true">材料用量计算器</el-button>
        <el-button type="success" class="case-btn" @click="showCase=true">案例库筛选</el-button>
        <el-button type="info" class="order-btn" @click="showOrder=true">生产进度查询</el-button>
      </div>
      <!-- 材料用量计算器弹窗 -->
      <el-dialog v-model="showCalc" title="材料用量计算器" width="400px">
        <div>请输入护栏长度（米）：<el-input-number v-model="calcLen" :min="1" :max="10000" /></div>
        <div style="margin:12px 0;">预计用量：<b>{{ calcLen }}米</b>，参考价格：<b>¥{{ calcLen*65 }}</b></div>
      </el-dialog>
      <!-- 案例库筛选弹窗 -->
      <el-dialog v-model="showCase" title="案例库筛选" width="600px">
        <el-select v-model="caseType" placeholder="选择工程类型">
          <el-option label="市政" value="市政" />
          <el-option label="工地" value="工地" />
          <el-option label="住宅" value="住宅" />
        </el-select>
        <div class="case-gallery">
          <img v-for="img in filteredCases" :src="img" :key="img" class="case-img" />
        </div>
      </el-dialog>
      <!-- 生产进度查询弹窗 -->
      <el-dialog v-model="showOrder" title="生产进度查询" width="400px">
        <div>请输入订单号：<el-input v-model="orderNo" /></div>
        <div v-if="orderNo" class="order-status">订单{{ orderNo }}生产中（示例）</div>
      </el-dialog>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
// 产品参数卡数据
const productParams = [
  {
    name: '锌钢护栏',
    icon: '/images/category/zinc_steel.jpg',
    params: [
      '材质：Galfan锌铝合金（新疆八钢供应）',
      '厚度：1.2-3.0mm（可定制）',
      '工艺：三层防腐处理',
      '质保：20年不生锈'
    ],
    caseImg: '/images/cases/zinc_steel_01.jpg'
  },
  {
    name: '草坪护栏',
    icon: '/images/category/lawn.jpg',
    params: [
      '材质：环保PE/PVC',
      '高度：0.6-1.2m',
      '工艺：注塑成型',
      '质保：10年不褪色'
    ],
    caseImg: '/images/cases/lawn_01.jpg'
  },
  {
    name: '工地围挡',
    icon: '/images/category/site_fence.jpg',
    params: [
      '材质：钢板/彩钢板',
      '厚度：0.5-1.0mm',
      '工艺：自动焊接',
      '质保：8年耐用'
    ],
    caseImg: '/images/cases/site_fence_01.jpg'
  },
  {
    name: '市政护栏',
    icon: '/images/category/municipal.jpg',
    params: [
      '材质：铸铁/锌钢',
      '高度：0.8-1.2m',
      '工艺：静电喷涂',
      '质保：15年防腐'
    ],
    caseImg: '/images/cases/municipal_01.jpg'
  },
  {
    name: '基坑护栏',
    icon: '/images/category/pit.jpg',
    params: [
      '材质：高强度钢材',
      '颜色：安全黄/红',
      '工艺：喷塑',
      '质保：10年不褪色'
    ],
    caseImg: '/images/cases/pit_01.jpg'
  },
  {
    name: '铝艺护栏',
    icon: '/images/category/aluminum.jpg',
    params: [
      '材质：高强度铝合金',
      '造型：多样化定制',
      '工艺：精密铸造',
      '质保：15年不生锈'
    ],
    caseImg: '/images/cases/aluminum_01.jpg'
  }
]
const hoverProduct = ref('')
// 材料对比、生产流程、信任体系等数据
const processSteps = [
  { title: '原材料检测', img: '/images/process/material.jpg', video: '/videos/process1.mp4' },
  { title: '数控切割', img: '/images/process/cut.jpg', video: '/videos/process2.mp4' },
  { title: '自动焊接', img: '/images/process/weld.jpg', video: '/videos/process3.mp4' },
  { title: '静电喷涂', img: '/images/process/paint.jpg', video: '/videos/process4.mp4' },
  { title: '盐雾测试', img: '/images/process/test.jpg', video: '/videos/process5.mp4' },
  { title: '成品包装', img: '/images/process/pack.jpg', video: '/videos/process6.mp4' }
]
const trustLogos = [
  { src: '/images/trust/cscec.png', alt: '中建三局' },
  { src: '/images/trust/wlmq.png', alt: '乌鲁木齐市政' },
  { src: '/images/trust/airport.png', alt: '新疆机场' }
]
const testimonials = [
  { client: '中建三局', logo: '/images/trust/cscec.png', text: '产品质量可靠，交付及时，值得信赖！' },
  { client: '乌鲁木齐市政', logo: '/images/trust/wlmq.png', text: '本地工厂响应快，售后有保障。' }
]
const certs = ['/images/cert/iso9001.jpg', '/images/cert/member.jpg']
// 交互工具
const showCalc = ref(false)
const showCase = ref(false)
const showOrder = ref(false)
const calcLen = ref(10)
const caseType = ref('市政')
const orderNo = ref('')
const allCases = {
  市政: ['/images/cases/municipal_01.jpg'],
  工地: ['/images/cases/site_fence_01.jpg'],
  住宅: ['/images/cases/aluminum_01.jpg']
}
const filteredCases = computed(() => allCases[caseType.value] || [])
const callPhone = () => { window.open('tel:18099219306') }
// 动态计数器
onMounted(() => {
  let meter = 0, client = 0, year = 0
  const timer = setInterval(() => {
    if (meter < 500) meter += 10
    if (client < 2000) client += 40
    if (year < 50) year += 2
    document.getElementById('stat-meter').innerText = meter + '万+'
    document.getElementById('stat-client').innerText = client + '+'
    document.getElementById('stat-year').innerText = year + '万'
    if (meter >= 500 && client >= 2000 && year >= 50) clearInterval(timer)
  }, 30)
})
</script>

<style scoped>
.about-page {
  background: #e2e8f0 url('/images/metal-bg.png');
  min-height: 100vh;
  padding: 0 0 60px 0;
}
.about-hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 48px 0 24px 0;
}
.about-hero-left {
  flex: 1;
}
.about-title {
  font-size: 2.4rem;
  color: #1e5f8c;
  font-weight: 800;
  margin-bottom: 12px;
}
.about-desc {
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 10px;
}
.about-tags li {
  color: #1e5f8c;
  font-size: 1.08rem;
  margin-bottom: 4px;
}
.about-hero-right {
  width: 260px;
  position: relative;
}
.map-container {
  position: relative;
  width: 220px;
  height: 180px;
  margin: 0 auto;
}
.map-img {
  width: 100%;
  filter: grayscale(0.2) contrast(1.1);
}
.factory-dot {
  position: absolute;
  left: 60%;
  top: 55%;
  width: 18px;
  height: 18px;
  background: #ff6b35;
  border-radius: 50%;
  box-shadow: 0 0 16px #ff6b35cc;
  animation: pulse 1.2s infinite;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 #ff6b3555; }
  70% { box-shadow: 0 0 0 16px #ff6b3500; }
  100% { box-shadow: 0 0 0 0 #ff6b3555; }
}
.local-label {
  text-align: center;
  color: #fff;
  background: #1e5f8c;
  border-radius: 8px;
  padding: 4px 18px;
  margin-top: 10px;
  font-weight: 600;
  letter-spacing: 2px;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px #1e5f8c33;
}
.about-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin: 32px 0 24px 0;
}
.stat-item {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 24px 32px;
  text-align: center;
  min-width: 160px;
}
.stat-num {
  font-size: 2.2rem;
  color: #1e5f8c;
  font-weight: 800;
  margin-bottom: 6px;
  transition: color 0.3s;
}
.stat-label {
  color: #333;
  font-size: 1.05rem;
}
.section-title {
  color: #1e5f8c;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 18px;
}
.product-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 24px;
}
.product-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 18px 22px;
  width: 260px;
  position: relative;
  transition: box-shadow 0.2s;
  cursor: pointer;
}
.product-card:hover {
  box-shadow: 0 8px 32px #1e5f8c33;
}
.product-icon img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 8px;
}
.product-info h3 {
  color: #1e5f8c;
  font-size: 1.1rem;
  margin-bottom: 6px;
}
.product-info ul {
  color: #333;
  font-size: 0.98rem;
  margin-bottom: 8px;
}
.warranty-label {
  display: inline-block;
  background: linear-gradient(90deg,#e2e8f0 60%,#fff 100%);
  color: #1e5f8c;
  border-radius: 8px;
  padding: 2px 12px;
  font-weight: 700;
  font-size: 0.98rem;
  margin-top: 4px;
  box-shadow: 0 1px 4px #e2e8f0;
  position: relative;
  overflow: hidden;
}
.warranty-label.shine::after {
  content: '';
  position: absolute;
  left: -40px;
  top: 0;
  width: 40px;
  height: 100%;
  background: linear-gradient(120deg,rgba(255,255,255,0.7) 0%,rgba(255,255,255,0.1) 100%);
  animation: shine 1.2s linear infinite;
}
@keyframes shine {
  0% { left: -40px; }
  100% { left: 100%; }
}
.case-img {
  width: 220px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 2px 8px #eee;
  position: absolute;
  top: 10px;
  right: -240px;
  z-index: 2;
}
.compare-tool {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 18px 22px;
  margin-bottom: 24px;
}
.compare-chart img {
  width: 100%;
  max-width: 480px;
  display: block;
  margin: 0 auto;
}
.about-process {
  margin: 32px 0 24px 0;
}
.process-steps {
  display: flex;
  overflow-x: auto;
  gap: 24px;
  padding-bottom: 8px;
}
.process-step {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 12px 16px;
  min-width: 180px;
  text-align: center;
}
.step-img {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 6px;
}
.step-title {
  color: #1e5f8c;
  font-size: 1rem;
  margin-bottom: 4px;
}
.step-video {
  width: 100px;
  height: 60px;
  border-radius: 8px;
  margin-top: 4px;
}
.about-trust {
  margin: 32px 0 24px 0;
}
.trust-logos {
  display: flex;
  gap: 32px;
  margin-bottom: 18px;
  align-items: center;
}
.trust-logo img {
  width: 80px;
  height: 40px;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #e2e8f0;
}
.testimonials {
  display: flex;
  gap: 24px;
  margin-bottom: 18px;
}
.testimonial {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px #e2e8f0;
  padding: 12px 18px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.testimonial-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 6px;
}
.testimonial-text {
  color: #1e5f8c;
  font-size: 0.98rem;
}
.cert-wall {
  display: flex;
  gap: 18px;
  margin-bottom: 18px;
}
.cert-img {
  width: 90px;
  height: 60px;
  object-fit: contain;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #e2e8f0;
}
.factory-live {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 18px 22px;
  text-align: center;
}
.live-img {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  margin: 0 auto;
}
.about-tools {
  margin: 32px 0 24px 0;
  text-align: center;
}
.tools-row {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 18px;
}
.call-btn {
  background: #ff6b35;
  color: #fff;
  font-weight: 700;
  border-radius: 24px;
  box-shadow: 0 2px 8px #ff6b3533;
  animation: breathe 1.5s infinite alternate;
}
@keyframes breathe {
  0% { box-shadow: 0 2px 8px #ff6b3533; }
  100% { box-shadow: 0 8px 24px #ff6b3555; }
}
.calc-btn, .case-btn, .order-btn {
  border-radius: 24px;
  font-weight: 700;
}
@media (max-width: 900px) {
  .about-hero { flex-direction: column; align-items: center; }
  .about-hero-right { margin-top: 18px; }
  .product-cards { flex-direction: column; align-items: center; }
  .tools-row { flex-direction: column; gap: 12px; }
}
</style> 