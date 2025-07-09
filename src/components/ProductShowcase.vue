<template>
  <section class="product-showcase">
    <div class="container">
      <div class="showcase-content">
        <div class="customization-panel">
          <div class="panel-header">
            <h2 class="panel-title">产品定制</h2>
            <p class="panel-subtitle">选择材质、颜色和尺寸，欢迎电话咨询获取详细方案</p>
          </div>
          <!-- 其它定制内容可保留或精简 -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// 3D与报价相关内容已移除
</script>

<style lang="scss" scoped>
.product-showcase {
  padding: $spacing-20 0;
  background: linear-gradient(135deg, $gray-50 0%, $gray-100 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.showcase-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: $spacing-12;
  align-items: start;

  @media (max-width: $breakpoint-lg) {
    grid-template-columns: 1fr;
    gap: $spacing-8;
  }
}

.model-container {
  position: sticky;
  top: 100px;
  
  @media (max-width: $breakpoint-lg) {
    position: static;
  }
}

.model-viewer {
  background: $white;
  border-radius: $border-radius-2xl;
  box-shadow: $shadow-xl;
  overflow: hidden;
  aspect-ratio: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.model-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $gray-500;
  text-align: center;
  
  p {
    margin-top: $spacing-4;
    font-size: $font-size-lg;
  }
}

.model-controls {
  position: absolute;
  bottom: $spacing-4;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.customization-panel {
  background: $white;
  border-radius: $border-radius-2xl;
  box-shadow: $shadow-xl;
  padding: $spacing-8;
  height: fit-content;
}

.panel-header {
  text-align: center;
  margin-bottom: $spacing-8;
  
  .panel-title {
    font-size: $font-size-3xl;
    font-weight: 700;
    color: $primary-color;
    margin-bottom: $spacing-2;
  }
  
  .panel-subtitle {
    color: $gray-600;
    font-size: $font-size-lg;
  }
}

.customization-section {
  margin-bottom: $spacing-8;
  
  .section-title {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $gray-800;
    margin-bottom: $spacing-4;
  }
}

.material-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: $spacing-3;
}

.material-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-4;
  border: 2px solid $gray-200;
  border-radius: $border-radius-lg;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $primary-color;
    transform: translateY(-2px);
  }
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.1);
  }
  
  .material-icon {
    margin-bottom: $spacing-2;
    color: $primary-color;
  }
  
  .material-name {
    font-weight: 500;
    color: $gray-700;
  }
}

.color-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: $spacing-3;
}

.color-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-3;
  border: 2px solid $gray-200;
  border-radius: $border-radius-lg;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: $primary-color;
    transform: translateY(-2px);
  }
  
  &.active {
    border-color: $primary-color;
    background: rgba($primary-color, 0.1);
  }
  
  .color-preview {
    width: 32px;
    height: 32px;
    border-radius: $border-radius-md;
    margin-bottom: $spacing-2;
    border: 2px solid $gray-300;
  }
  
  .color-name {
    font-size: $font-size-sm;
    font-weight: 500;
    color: $gray-700;
  }
}

.dimension-group {
  margin-bottom: $spacing-6;
  
  .dimension-label {
    display: block;
    font-weight: 500;
    color: $gray-700;
    margin-bottom: $spacing-2;
  }
}

.price-section {
  background: $gray-50;
  border-radius: $border-radius-lg;
  padding: $spacing-6;
  margin-bottom: $spacing-8;
  
  .price-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-2;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .price-label {
      font-weight: 500;
      color: $gray-600;
    }
    
    .price-value {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $primary-color;
    }
    
    .total-price {
      font-size: $font-size-2xl;
      font-weight: 700;
      color: $primary-color;
    }
  }
}

.action-buttons {
  display: flex;
  gap: $spacing-4;
  
  @media (max-width: $breakpoint-sm) {
    flex-direction: column;
  }
  
  .el-button {
    flex: 1;
    height: 48px;
    font-weight: 600;
  }
}
</style> 