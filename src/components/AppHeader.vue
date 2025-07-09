<template>
  <header class="app-header" :class="{ 'header-scrolled': isScrolled }">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/" class="logo-link">
            <div class="logo-icon">
              <el-icon size="32" color="#0d9488">
                <House />
              </el-icon>
            </div>
            <div class="logo-text">
              <h1 class="company-name">新疆昆仑宏博金属制品有限公司</h1>
              <p class="company-subtitle">专业护栏制造商</p>
            </div>
          </router-link>
        </div>

        <!-- 桌面端導航 -->
        <nav class="nav-desktop" v-show="!isMobile">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'active': $route.path === item.path }"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- 聯絡按鈕 -->
        <div class="header-actions" v-show="!isMobile">
                  <el-button type="primary" class="contact-btn" @click="scrollToContact">
          <el-icon><Phone /></el-icon>
          立即咨询
        </el-button>
        </div>

        <!-- 移動端菜單按鈕 -->
        <div class="mobile-menu-btn" v-show="isMobile" @click="toggleMobileMenu">
          <el-icon size="24" :class="{ 'rotated': isMobileMenuOpen }">
            <Menu />
          </el-icon>
        </div>
      </div>

      <!-- 移動端導航菜單 -->
      <transition name="slide-down">
        <nav class="nav-mobile" v-show="isMobile && isMobileMenuOpen">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link-mobile"
            :class="{ 'active': $route.path === item.path }"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </router-link>
          <el-button type="primary" class="contact-btn-mobile" @click="scrollToContact">
            <el-icon><Phone /></el-icon>
            立即咨询
          </el-button>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// 響應式狀態
const isScrolled = ref(false)
const isMobile = ref(false)
const isMobileMenuOpen = ref(false)

  // 导航项目
  const navItems = [
    { name: '首页', path: '/' },
    { name: '产品展示', path: '/products' },
    { name: '关于我们', path: '/about' },
    { name: '联系我们', path: '/contact' }
  ]

// 监听滚动事件
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// 检查设备类型
const checkDevice = () => {
  isMobile.value = window.innerWidth < 768
}

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

// 关闭移动端菜单
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// 滚动到联络区域
const scrollToContact = () => {
  const contactSection = document.getElementById('contact')
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push('/contact')
  }
  closeMobileMenu()
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', checkDevice)
  checkDevice()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', checkDevice)
})
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $z-fixed;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &.header-scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: $shadow-lg;
  }
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: $spacing-4 0;
  height: 80px;
}

.logo {
  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .logo-icon {
    margin-right: $spacing-3;
    padding: $spacing-2;
    background: $gradient-primary;
    border-radius: $border-radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-text {
    .company-name {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $primary-color;
      margin: 0;
      line-height: 1.2;
    }

    .company-subtitle {
      font-size: $font-size-sm;
      color: $gray-600;
      margin: 0;
      line-height: 1.2;
    }
  }
}

.nav-desktop {
  display: flex;
  gap: $spacing-8;

  .nav-link {
    text-decoration: none;
    color: $gray-700;
    font-weight: 500;
    padding: $spacing-2 $spacing-3;
    border-radius: $border-radius-md;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
      color: $primary-color;
      background: rgba($primary-color, 0.1);
    }

    &.active {
      color: $primary-color;
      background: rgba($primary-color, 0.1);

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background: $primary-color;
        border-radius: 1px;
      }
    }
  }
}

.header-actions {
  .contact-btn {
    background: $gradient-primary;
    border: none;
    padding: $spacing-3 $spacing-6;
    border-radius: $border-radius-full;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }
  }
}

.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: $border-radius-md;
  background: rgba($primary-color, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba($primary-color, 0.2);
  }

  .rotated {
    transform: rotate(90deg);
  }
}

.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: $white;
  border-top: 1px solid $gray-200;
  box-shadow: $shadow-lg;
  padding: $spacing-4;

  .nav-link-mobile {
    display: block;
    padding: $spacing-4;
    text-decoration: none;
    color: $gray-700;
    font-weight: 500;
    border-radius: $border-radius-md;
    transition: all 0.3s ease;
    margin-bottom: $spacing-2;

    &:hover {
      background: rgba($primary-color, 0.1);
      color: $primary-color;
    }

    &.active {
      background: $primary-color;
      color: $white;
    }
  }

  .contact-btn-mobile {
    width: 100%;
    margin-top: $spacing-4;
    background: $gradient-primary;
    border: none;
    padding: $spacing-4;
    border-radius: $border-radius-md;
    font-weight: 600;
  }
}

// 動畫
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

// 響應式
@media (max-width: $breakpoint-md) {
  .header-content {
    height: 70px;
  }

  .logo {
    .logo-text {
      .company-name {
        font-size: $font-size-lg;
      }

      .company-subtitle {
        font-size: $font-size-xs;
      }
    }
  }
}
</style> 