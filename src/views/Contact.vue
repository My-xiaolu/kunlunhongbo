<template>
  <div class="contact-page">
    <AppHeader />
    <!-- 背景纹理 -->
    <div class="metal-bg"></div>
    <div class="contact-container">
      <!-- 公司信息卡片 -->
      <div class="company-card card-hover">
        <div class="company-info">
          <h1 class="company-title">新疆昆仑宏博金属制品有限公司</h1>
          <p class="company-code">统一社会信用代码：<span class="placeholder">（预留位置）</span></p>
          <p class="company-address">工厂地址：<span class="placeholder">新疆（预留位置）</span></p>
        </div>
        <div class="factory-map">
          <img :src="mapImg" alt="生产基地地图" class="map-img" @error="onImgError($event)" />
          <div class="map-loading" v-if="mapLoading"></div>
        </div>
      </div>
      <!-- 联系通道 -->
      <div class="contact-channels">
        <div class="contact-card card-hover">
          <div class="contact-row">
            <el-icon class="contact-icon"><Phone /></el-icon>
            <a class="contact-phone-link" href="tel:18099219306">18099219306</a>
          </div>
          <el-button class="call-btn" type="primary" @click="callPhone">一键拨号</el-button>
        </div>
        <div class="contact-card card-hover wechat-card">
          <div class="contact-row">
            <el-icon class="contact-icon"><ChatDotRound /></el-icon>
            <span>微信客服</span>
          </div>
          <div class="wechat-row">
            <span class="wechat-label">微信号1：</span>
            <span class="wechat-id">JC0607C</span>
            <el-button size="small" class="wechat-copy-btn" @click="copyWeChat('JC0607C')">复制</el-button>
          </div>
          <div class="wechat-row">
            <span class="wechat-label">微信号2：</span>
            <span class="wechat-id">kun787799302</span>
            <el-button size="small" class="wechat-copy-btn" @click="copyWeChat('kun787799302')">复制</el-button>
          </div>
        </div>
        <!-- 在线留言表单已删除 -->
      </div>
      <!-- 信任增强区 -->
      <div class="trust-section">
        <div class="cert-scroll">
          <div class="cert-item" v-for="(cert, i) in certs" :key="i">
            <img :src="cert" alt="资质证书" @error="onImgError($event)" />
          </div>
        </div>
        <div class="testimonials-carousel">
          <el-carousel height="90px" indicator-position="none" arrow="always" :autoplay="true">
            <el-carousel-item v-for="(t, i) in testimonials" :key="i">
              <div class="testimonial-item">
                <img :src="t.logo" class="testimonial-logo" alt="客户logo" @error="onImgError($event)" />
                <span class="testimonial-text">“{{ t.text }}”</span>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="online-status">
          <span :class="['status-dot', online ? 'online' : 'offline']"></span>
          <span>{{ online ? '在线客服' : '客服离线' }}</span>
        </div>
      </div>
      <!-- 移动端底部电话按钮 -->
      <el-button class="mobile-call-btn" type="primary" @click="callPhone">
        <el-icon><Phone /></el-icon> 电话咨询
      </el-button>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Phone, ChatDotRound, Location } from '@element-plus/icons-vue'
const placeholder = '/assets/placeholder.png'
const mapImg = ref('/assets/map-factory.png')
const wechatImg = ref('/assets/wechat.png')
const certs = ['/assets/cert1.jpg','/assets/cert2.jpg','/assets/cert3.jpg']
const testimonials = [
  { logo: '/assets/customer1.png', text: '产品质量过硬，服务响应快！' },
  { logo: '/assets/customer2.png', text: '合作多年，值得信赖的厂家。' }
]
const online = ref(true)
const qrHover = ref(false)
const mapLoading = ref(true)
setTimeout(()=>{ mapLoading.value = false }, 1200)
const callPhone = () => { window.open('tel:18099219306') }
const form = reactive({ name: '', phone: '', message: '' })
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入电话', trigger: 'blur' }],
  message: [{ required: true, message: '请输入需求内容', trigger: 'blur' }]
}
const formRef = ref()
const submitting = ref(false)
const submitText = ref('发送留言')
const submitForm = () => {
  formRef.value.validate(valid => {
    if (!valid) {
      ElMessage.error('请填写完整信息')
      return
    }
    submitting.value = true
    setTimeout(() => {
      submitting.value = false
      submitText.value = '发送成功√'
      ElMessage.success('留言已提交，我们会尽快联系您！')
      setTimeout(()=>{ submitText.value = '发送留言' }, 2000)
      form.name = ''
      form.phone = ''
      form.message = ''
    }, 1200)
  })
}
function onImgError(e) {
  e.target.src = placeholder
}
function copyWeChat(val) {
  navigator.clipboard.writeText(val)
  ElMessage.success('微信号已复制，打开微信添加好友')
}
</script>

<style lang="scss" scoped>
@import url('https://cdn.jsdelivr.net/npm/@fontsource/source-han-sans-cn/400.css');
@import url('https://cdn.jsdelivr.net/npm/@fontsource/alibaba-puhuiti/700.css');
.contact-page {
  min-height: 100vh;
  background: #e2e8f0;
  position: relative;
  font-family: 'Source Han Sans', '思源黑体', Arial, sans-serif;
}
.metal-bg {
  position: fixed;
  z-index: 0;
  top: 0; left: 0; right: 0; bottom: 0;
  background: url('/assets/bg-metal.png') center/cover repeat, linear-gradient(135deg,#e2e8f0 60%,#fff 100%);
  opacity: 0.7;
}
.contact-container {
  position: relative;
  z-index: 1;
  max-width: 980px;
  margin: 0 auto;
  padding: 32px 16px 90px 16px;
}
.company-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #e2e8f0cc;
  border-radius: 18px;
  box-shadow: 0 2px 16px #b6c2d133;
  margin-bottom: 32px;
  padding: 32px 28px;
  transition: box-shadow .2s, transform .2s;
  font-family: 'AlibabaPuHuiTi-Bold', 'Source Han Sans', Arial, sans-serif;
}
.card-hover:hover {
  box-shadow: 0 8px 32px #1e5f8c33;
  transform: translateY(-6px) scale(1.02);
}
.company-title {
  color: #1e5f8c;
  font-size: 2.1rem;
  font-family: 'AlibabaPuHuiTi-Bold', Arial, sans-serif;
  margin-bottom: 10px;
}
.company-code, .company-address {
  color: #555;
  font-size: 1.08rem;
  margin-bottom: 6px;
}
.placeholder {
  color: #aaa;
}
.factory-map {
  min-width: 220px;
  min-height: 120px;
  position: relative;
}
.map-img {
  width: 220px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 12px #1e5f8c22;
  opacity: 1;
  transition: opacity .5s;
}
.map-loading {
  position: absolute;
  left: 0; top: 0; right: 0; bottom: 0;
  background: linear-gradient(90deg,#e2e8f0 40%,#fff 60%);
  border-radius: 12px;
  animation: loading 1.2s infinite linear;
  opacity: 0.7;
}
@keyframes loading {
  0% { background-position: -220px 0; }
  100% { background-position: 220px 0; }
}
.contact-channels {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  margin-bottom: 32px;
}
.contact-card {
  flex: 1 1 220px;
  min-width: 220px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 22px 18px 18px 18px;
  margin-bottom: 0;
  transition: box-shadow .2s, transform .2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Source Han Sans', Arial, sans-serif;
}
.contact-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.12rem;
  color: #1e5f8c;
  margin-bottom: 10px;
}
.contact-icon {
  font-size: 1.3rem;
  color: #1e5f8c;
}
.contact-phone-link {
  color: #1e5f8c;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}
.call-btn {
  width: 100%;
  margin-top: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  background: #1e5f8c;
  border: none;
}
.wechat-card {
  position: relative;
}
.wechat-qr-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto;
  transition: all .2s;
}
.wechat-qr {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 8px #1e5f8c22;
  transition: transform .2s, box-shadow .2s;
}
.wechat-qr.enlarged {
  transform: scale(1.18);
  box-shadow: 0 8px 32px #1e5f8c55;
  z-index: 2;
}
.qr-tip {
  text-align: center;
  color: #888;
  font-size: 0.98rem;
  margin-top: 6px;
}
.form-card {
  min-width: 260px;
  width: 100%;
}
.submit-btn {
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;
  background: #1e5f8c;
  border: none;
  border-radius: 8px;
  transition: background .2s;
}
.submit-btn[loading] {
  background: #aaa;
}
.trust-section {
  margin-top: 24px;
  background: #e2e8f0cc;
  border-radius: 16px;
  box-shadow: 0 2px 12px #b6c2d133;
  padding: 18px 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 18px;
  justify-content: space-between;
}
.cert-scroll {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  flex: 1 1 320px;
  min-width: 220px;
  align-items: center;
}
.cert-item img {
  width: 90px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 2px 8px #1e5f8c22;
  transition: transform .2s;
}
.cert-item img:hover {
  transform: scale(1.12);
  box-shadow: 0 8px 32px #1e5f8c33;
}
.testimonials-carousel {
  flex: 1 1 220px;
  min-width: 180px;
  max-width: 320px;
}
.testimonial-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.08rem;
  color: #1e5f8c;
}
.testimonial-logo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px #1e5f8c22;
}
.online-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.08rem;
  color: #1e5f8c;
  margin-top: 8px;
}
.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  background: #aaa;
}
.status-dot.online {
  background: #10b981;
}
.status-dot.offline {
  background: #aaa;
}
.mobile-call-btn {
  display: none;
}
.wechat-texts {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 12px 0 0 0;
}
.wechat-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  margin-left: 32px;
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
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 24px;
}
.info-card {
  display: flex;
  align-items: center;
  background: #f7fafc;
  border-radius: 12px;
  padding: 18px 18px;
  gap: 16px;
}
.info-icon {
  font-size: 1.6rem;
  color: #1e5f8c;
}
.info-label {
  font-weight: 700;
  color: #1e5f8c;
  margin-bottom: 2px;
}
.info-value {
  color: #222;
  font-size: 1.08rem;
}
.consult-btn-wrapper {
  display: flex;
  justify-content: center;
  margin: 24px 0 0 0;
}
.consult-btn {
  width: 220px;
  height: 44px;
  font-size: 1.18rem;
  font-weight: 700;
  background: #1e5f8c;
  border: none;
  border-radius: 10px;
}
@media (max-width: 768px) {
  .contact-container {
    padding: 16px 4px 80px 4px;
  }
  .company-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 10px;
  }
  .factory-map, .map-img {
    width: 100%;
    min-width: 0;
    height: 120px;
  }
  .contact-channels {
    flex-direction: column;
    gap: 14px;
  }
  .contact-card {
    min-width: 0;
    width: 100%;
    padding: 16px 8px 12px 8px;
  }
  .form-card {
    min-width: 0;
    width: 100%;
  }
  .cert-scroll {
    min-width: 0;
    gap: 10px;
  }
  .testimonials-carousel {
    min-width: 0;
    max-width: 100%;
  }
  .mobile-call-btn {
    display: block;
    position: fixed;
    left: 0; right: 0; bottom: 0;
    width: 100vw;
    z-index: 99;
    border-radius: 0;
    font-size: 1.2rem;
    font-weight: 700;
    height: 54px;
    background: #1e5f8c;
    color: #fff;
    box-shadow: 0 -2px 12px #1e5f8c22;
  }
}
</style> 