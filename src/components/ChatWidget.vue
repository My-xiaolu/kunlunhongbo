<template>
  <div class="chat-widget" :class="{ 'chat-expanded': isExpanded }">
    <!-- 聊天窗口 -->
    <transition name="slide-up">
      <div class="chat-window" v-show="isExpanded">
        <div class="chat-header">
          <div class="chat-info">
            <div class="avatar">
              <el-icon size="20" color="#0d9488">
                <Service />
              </el-icon>
            </div>
            <div class="info">
              <h4 class="name">昆仑客服</h4>
              <p class="status">在线服务中</p>
            </div>
          </div>
          <div class="chat-actions">
            <el-button size="small" circle @click="toggleChat">
              <el-icon><Close /></el-icon>
            </el-button>
          </div>
        </div>

        <div class="chat-messages" ref="messagesContainer">
          <div 
            v-for="message in messages" 
            :key="message.id"
            class="message"
            :class="{ 'message--user': message.isUser }"
          >
            <div class="message-content">
              <p>{{ message.text }}</p>
              <span class="message-time">{{ formatTime(message.timestamp) }}</span>
            </div>
          </div>
        </div>

        <div class="chat-input">
          <div class="input-actions">
            <el-button size="small" circle @click="attachFile">
              <el-icon><Paperclip /></el-icon>
            </el-button>
            <el-button size="small" circle @click="sendProductLink">
              <el-icon><Link /></el-icon>
            </el-button>
          </div>
          <el-input
            v-model="inputMessage"
            placeholder="输入您的问题..."
            @keyup.enter="sendMessage"
            :disabled="isTyping"
          />
          <el-button type="primary" size="small" @click="sendMessage" :disabled="!inputMessage.trim()">
            <el-icon><Position /></el-icon>
          </el-button>
        </div>

        <!-- 快速回覆 -->
        <div class="quick-replies" v-if="showQuickReplies">
          <el-button 
            v-for="reply in quickReplies" 
            :key="reply"
            size="small"
            @click="sendQuickReply(reply)"
          >
            {{ reply }}
          </el-button>
        </div>
      </div>
    </transition>

    <!-- 浮動按鈕 -->
    <div class="chat-toggle" @click="toggleChat">
      <div class="toggle-icon">
        <el-icon v-if="!isExpanded" size="24">
          <ChatDotRound />
        </el-icon>
        <el-icon v-else size="24">
          <Close />
        </el-icon>
      </div>
      <div class="notification-badge" v-if="unreadCount > 0">
        {{ unreadCount }}
      </div>
    </div>

    <!-- 電話按鈕 -->
    <a href="tel:13800138000" class="phone-button">
      <el-icon size="20">
        <Phone />
      </el-icon>
    </a>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'

// 响应式状态
const isExpanded = ref(false)
const inputMessage = ref('')
const isTyping = ref(false)
const unreadCount = ref(0)
const showQuickReplies = ref(true)
const messagesContainer = ref(null)

// 消息列表
const messages = ref([
  {
    id: 1,
    text: '您好！欢迎来到昆仑铁艺护栏，我是您的专属客服。请问有什么可以帮助您的吗？',
    isUser: false,
    timestamp: new Date()
  }
])

// 快速回复选项
const quickReplies = ref([
  '我想了解产品价格',
  '如何定制护栏？',
  '有现货吗？',
  '安装服务如何收费？'
])

// 切换聊天窗口
const toggleChat = () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value) {
    unreadCount.value = 0
    scrollToBottom()
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  const userMessage = {
    id: Date.now(),
    text: inputMessage.value,
    isUser: true,
    timestamp: new Date()
  }

  messages.value.push(userMessage)
  const userText = inputMessage.value
  inputMessage.value = ''
  showQuickReplies.value = false

  await nextTick()
  scrollToBottom()

  // 模拟客服回复
  isTyping.value = true
  setTimeout(() => {
    const botMessage = {
      id: Date.now() + 1,
      text: generateBotResponse(userText),
      isUser: false,
      timestamp: new Date()
    }
    messages.value.push(botMessage)
    isTyping.value = false
    
    if (!isExpanded.value) {
      unreadCount.value++
    }
    
    nextTick(() => {
      scrollToBottom()
    })
  }, 1000 + Math.random() * 2000)
}

// 发送快速回复
const sendQuickReply = (reply) => {
  inputMessage.value = reply
  sendMessage()
}

// 附件上传
const attachFile = () => {
  ElMessage.info('文件上传功能即将上线')
}

// 发送产品链接
const sendProductLink = () => {
  const productLink = {
    id: Date.now(),
    text: 'https://kunlun-fence.com/products/zinc-steel-fence',
    isUser: true,
    timestamp: new Date()
  }
  messages.value.push(productLink)
  scrollToBottom()
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 格式化时间
const formatTime = (timestamp) => {
  return timestamp.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

// 生成机器人回复
const generateBotResponse = (userText) => {
  const responses = {
    '价格': '我们的产品价格根据材质、规格和数量而定。锌钢护栏价格范围在45-128元/米，具体价格请提供您的需求，我可以为您详细报价。',
    '定制': '我们提供专业的定制服务，可以根据您的具体需求调整材质、颜色、尺寸等。请告诉我您的具体要求，我会为您安排设计师。',
    '现货': '我们有部分热销产品现货供应，包括锌钢阳台护栏、草坪装饰护栏等。如需大量订单，建议提前预订。',
    '安装': '我们提供专业安装服务，安装费用根据工程难度和距离而定，一般在产品价格的10-20%。全国范围内均可提供服务。'
  }

  for (const [keyword, response] of Object.entries(responses)) {
    if (userText.includes(keyword)) {
      return response
    }
  }

  return '感谢您的咨询！我们的专业团队会尽快为您提供详细的解决方案。如需立即联系，请拨打客服热线：138-0013-8000'
}

// 监听消息变化
watch(messages, () => {
  if (isExpanded.value) {
    nextTick(() => {
      scrollToBottom()
    })
  }
}, { deep: true })

// 生命周期
onMounted(() => {
  // 模拟新消息提醒
  setTimeout(() => {
    if (!isExpanded.value) {
      unreadCount.value = 1
    }
  }, 5000)
})
</script>

<style lang="scss" scoped>
.chat-widget {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: $z-chat-widget;
}

.chat-window {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 350px;
  height: 500px;
  background: $white;
  border-radius: $border-radius-xl;
  box-shadow: $shadow-xl;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: $breakpoint-sm) {
    width: 300px;
    height: 450px;
    right: -50px;
  }
}

.chat-header {
  background: $gradient-primary;
  color: $white;
  padding: $spacing-4;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .chat-info {
    display: flex;
    align-items: center;
    gap: $spacing-3;

    .avatar {
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .info {
      .name {
        font-weight: 600;
        margin: 0;
        font-size: $font-size-lg;
      }

      .status {
        margin: 0;
        font-size: $font-size-sm;
        opacity: 0.8;
      }
    }
  }

  .chat-actions {
    .el-button {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: $white;

      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}

.chat-messages {
  flex: 1;
  padding: $spacing-4;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: $spacing-3;

  .message {
    display: flex;
    flex-direction: column;

    &--user {
      align-items: flex-end;

      .message-content {
        background: $primary-color;
        color: $white;
        border-radius: $border-radius-lg $border-radius-lg 0 $border-radius-lg;
      }
    }

    .message-content {
      background: $gray-100;
      padding: $spacing-3;
      border-radius: $border-radius-lg $border-radius-lg $border-radius-lg 0;
      max-width: 80%;

      p {
        margin: 0 0 $spacing-1 0;
        line-height: 1.4;
      }

      .message-time {
        font-size: $font-size-xs;
        opacity: 0.7;
      }
    }
  }
}

.chat-input {
  padding: $spacing-4;
  border-top: 1px solid $gray-200;
  display: flex;
  gap: $spacing-2;
  align-items: center;

  .input-actions {
    display: flex;
    gap: $spacing-1;
  }

  .el-input {
    flex: 1;
  }

  .el-button {
    background: $primary-color;
    border: none;
    color: $white;

    &:hover {
      background: $primary-dark;
    }
  }
}

.quick-replies {
  padding: $spacing-3 $spacing-4;
  border-top: 1px solid $gray-200;
  display: flex;
  gap: $spacing-2;
  flex-wrap: wrap;

  .el-button {
    font-size: $font-size-sm;
    padding: $spacing-1 $spacing-2;
  }
}

.chat-toggle {
  width: 60px;
  height: 60px;
  background: $gradient-primary;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: $shadow-lg;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: $shadow-xl;
  }

  .toggle-icon {
    color: $white;
  }

  .notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: $error;
    color: $white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-xs;
    font-weight: 600;
  }
}

.phone-button {
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 50px;
  height: 50px;
  background: $success;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $white;
  text-decoration: none;
  box-shadow: $shadow-md;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: $shadow-lg;
  }
}

// 動畫
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

// 響應式
@media (max-width: $breakpoint-sm) {
  .chat-widget {
    bottom: 10px;
    right: 10px;
  }

  .chat-toggle {
    width: 50px;
    height: 50px;
  }

  .phone-button {
    width: 40px;
    height: 40px;
    bottom: 70px;
  }
}
</style> 