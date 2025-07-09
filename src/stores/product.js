import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('product', () => {
  // 产品分类数据
  const categories = ref([
    {
      id: 1,
      name: "锌钢护栏",
      features: ["防锈处理", "组装式设计", "20年质保"],
      thumbnail: "/images/category/zinc_steel.jpg",
      description: "采用优质锌钢材料，经过特殊防锈处理，使用寿命长达20年",
      priceRange: [45, 128],
      materials: ["锌钢", "不锈钢", "铝合金"],
      cases: ["/images/cases/zinc_steel_01.jpg", "/images/cases/zinc_steel_02.jpg"]
    },
    {
      id: 2,
      name: "草坪护栏",
      features: ["环保PE材料", "可定制颜色", "易安装"],
      thumbnail: "/images/category/lawn.jpg",
      description: "使用环保PE材料制成，色彩丰富，安装简便",
      priceRange: [25, 85],
      materials: ["PE", "PVC", "复合木材"],
      cases: ["/images/cases/lawn_01.jpg"]
    },
    {
      id: 3,
      name: "工地围挡",
      features: ["高强度", "快速安装", "可重复使用"],
      thumbnail: "/images/category/site_fence.jpg",
      description: "专为建筑工地设计，高强度材料，快速安装拆卸",
      priceRange: [35, 95],
      materials: ["钢板", "彩钢板", "PVC"],
      cases: ["/images/cases/site_fence_01.jpg"]
    },
    {
      id: 4,
      name: "市政护栏",
      features: ["美观大方", "防护性能强", "市政标准"],
      thumbnail: "/images/category/municipal.jpg",
      description: "符合市政建设标准，美观大方，防护性能优异",
      priceRange: [55, 150],
      materials: ["铸铁", "不锈钢", "锌钢"],
      cases: ["/images/cases/municipal_01.jpg"]
    },
    {
      id: 5,
      name: "基坑护栏",
      features: ["高强度钢材", "安全警示色", "易安装拆卸"],
      thumbnail: "/images/category/pit.jpg",
      description: "适用于建筑工地基坑安全防护，醒目警示，结构坚固。",
      priceRange: [60, 160],
      materials: ["钢材", "喷塑"],
      cases: ["/images/cases/pit_01.jpg"]
    },
    {
      id: 6,
      name: "铝艺护栏",
      features: ["防腐耐用", "造型美观", "多种颜色可选"],
      thumbnail: "/images/category/aluminum.jpg",
      description: "采用高强度铝合金材料，外观精美，适用于高端住宅、别墅等。",
      priceRange: [80, 200],
      materials: ["铝合金"],
      cases: ["/images/cases/aluminum_01.jpg"]
    }
  ])

  // 热销产品
  const featuredProducts = ref([
    {
      id: 1,
      name: "锌钢阳台护栏",
      price: 89,
      originalPrice: 120,
      image: "/images/products/zinc_steel_01.jpg",
      rating: 4.8,
      sales: 1250,
      tags: ["热销", "推荐"]
    },
    {
      id: 2,
      name: "草坪装饰护栏",
      price: 45,
      originalPrice: 68,
      image: "/images/products/lawn_01.jpg",
      rating: 4.6,
      sales: 890,
      tags: ["新品", "环保"]
    },
    {
      id: 3,
      name: "工地安全围挡",
      price: 75,
      originalPrice: 95,
      image: "/images/products/site_fence_01.jpg",
      rating: 4.7,
      sales: 650,
      tags: ["安全", "耐用"]
    }
  ])

  // 产品规格数据
  const productSpecs = ref({
    zinc: {
      thickness: [1.2, 1.5, 2.0], // 单位mm
      colors: ['RAL 6005', 'RAL 7016', '定制颜色'],
      priceRange: [45, 128], // 元/米
      height: [60, 90, 120, 150] // cm
    },
    lawn: {
      material: ['PE', 'PVC', '复合木材'],
      height: [60, 90, 120], // cm
      colors: ['绿色', '棕色', '黑色', '白色'],
      priceRange: [25, 85]
    },
    construction: {
      material: ['钢板', '彩钢板', 'PVC'],
      height: [180, 200, 250], // cm
      thickness: [0.5, 0.8, 1.0], // mm
      priceRange: [35, 95]
    }
  })

  // 当前选中的产品
  const selectedProduct = ref(null)
  const selectedMaterial = ref('锌钢')
  const selectedColor = ref('RAL 6005')
  const selectedThickness = ref(1.5)
  const selectedHeight = ref(90)

  // 計算屬性
  const currentPrice = computed(() => {
    if (!selectedProduct.value) return 0
    
    const basePrice = selectedProduct.value.priceRange[0]
    const materialMultiplier = getMaterialMultiplier(selectedMaterial.value)
    const thicknessMultiplier = getThicknessMultiplier(selectedThickness.value)
    
    return Math.round(basePrice * materialMultiplier * thicknessMultiplier)
  })

  const currentSpecs = computed(() => {
    const category = selectedProduct.value?.name
    if (category?.includes('锌钢')) return productSpecs.value.zinc
    if (category?.includes('草坪')) return productSpecs.value.lawn
    if (category?.includes('工地')) return productSpecs.value.construction
    return productSpecs.value.zinc
  })

  // 方法
  const selectProduct = (product) => {
    selectedProduct.value = product
  }

  const setMaterial = (material) => {
    selectedMaterial.value = material
  }

  const setColor = (color) => {
    selectedColor.value = color
  }

  const setThickness = (thickness) => {
    selectedThickness.value = thickness
  }

  const setHeight = (height) => {
    selectedHeight.value = height
  }

  const getMaterialMultiplier = (material) => {
    const multipliers = {
      '锌钢': 1.0,
      '不锈钢': 1.8,
      '铝合金': 1.5,
      'PE': 0.8,
      'PVC': 1.0,
      '复合木材': 1.2
    }
    return multipliers[material] || 1.0
  }

  const getThicknessMultiplier = (thickness) => {
    return thickness / 1.5
  }

  const calculatePrice = (length, width, height) => {
    const basePrice = currentPrice.value
    const area = (length * height) / 10000 // 轉換為平方米
    return Math.round(basePrice * area)
  }

  return {
    // 状态
    categories,
    featuredProducts,
    productSpecs,
    selectedProduct,
    selectedMaterial,
    selectedColor,
    selectedThickness,
    selectedHeight,
    
    // 计算属性
    currentPrice,
    currentSpecs,
    
    // 方法
    selectProduct,
    setMaterial,
    setColor,
    setThickness,
    setHeight,
    calculatePrice
  }
}) 