# 小程序响应式设计文档

## 📱 响应式设计概述

本项目已实现完整的响应式设计，确保在不同设备尺寸和方向下都有优良的显示效果。

## 🎯 设计原则

### 1. 移动优先
- 优先考虑手机竖屏体验
- 向上兼容大屏设备
- 横屏作为增强体验

### 2. 弹性布局
- 使用vw/vh单位实现真正的响应式
- 结合rpx单位保证精确性
- Media Query处理边界情况

### 3. 渐进增强
- 基础功能在所有设备可用
- 大屏设备获得更好体验
- 横屏模式增加内容密度

## 📏 断点系统

### 屏幕尺寸分类
```css
/* 小屏设备 (iPhone SE, 小尺寸Android) */
@media (max-width: 375px) { ... }

/* 中等屏幕 (iPhone 12, 标准Android) */  
@media (min-width: 376px) and (max-width: 414px) { ... }

/* 大屏设备 (iPhone Plus, 大尺寸Android) */
@media (min-width: 415px) { ... }

/* 横屏适配 */
@media (orientation: landscape) { ... }
```

### 响应式单位
- **vw/vh**: 视口百分比单位，真正响应式
- **rpx**: 小程序响应式像素，设备适配
- **px**: 固定像素，用于边框等

## 🎨 样式系统

### 全局响应式类
```css
/* 容器类 */
.responsive-container     /* 自适应容器 */
.section                 /* 标准区块间距 */

/* 网格布局 */
.responsive-grid-2       /* 2列网格 */
.responsive-grid-3       /* 3列网格 */  
.responsive-grid-4       /* 4列网格 */

/* 字体大小 */
.text-xl                 /* 超大字体 */
.text-lg                 /* 大字体 */
.text-md                 /* 中等字体 */
.text-sm                 /* 小字体 */
.text-xs                 /* 超小字体 */
```

### 自适应数值
| 属性 | 小屏 | 中屏 | 大屏 | 单位 |
|------|------|------|------|------|
| 容器内边距 | 32 | 48 | 56 | rpx |
| 卡片间距 | 24 | 32 | 40 | rpx |
| 圆角大小 | 24 | 32 | 36 | rpx |
| 超大字体 | 44 | 48 | 52 | rpx |
| 大字体 | 36 | 38 | 42 | rpx |

## 🔧 工具函数

### ResponsiveUtils 类
```javascript
const responsive = require('./utils/responsive.js');

// 获取设备信息
responsive.getDeviceType()        // 'small' | 'medium' | 'large'
responsive.isLandscape()          // true | false
responsive.getScreenWidth()       // 屏幕宽度
responsive.getScreenHeight()      // 屏幕高度

// 获取自适应样式
responsive.getContainerPadding()  // 容器内边距
responsive.getCardMargin()        // 卡片间距
responsive.getFontSize('lg')      // 字体大小

// 网格计算
responsive.getGridColumns(4, 120) // 计算网格列数
responsive.getGridItemWidth(4, 20) // 计算网格项宽度

// 单位转换
responsive.rpxToPx(100)           // rpx转px
responsive.pxToRpx(50)            // px转rpx
```

## 📐 布局适配

### 网格系统
```css
/* 基础4列网格 */
.category-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}

.category-item {
  width: calc(25% - 2.25vw);  /* 4列布局 */
}

/* 横屏时变成6列 */
@media (orientation: landscape) {
  .category-item {
    width: calc(16.666% - 3vw);
  }
}
```

### 2列网格 (技能、时间管理)
```css
.skill-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3vw;
}

.skill-item {
  width: calc(50% - 1.5vw);  /* 2列布局 */
}

/* 横屏时变成3列 */
@media (orientation: landscape) {
  .skill-item {
    width: calc(33.333% - 2vw);
  }
}
```

## 🛡️ 安全区域适配

### iPhone刘海屏适配
```css
.safe-area-top {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}
```

### 动态岛适配 (iPhone 14 Pro)
```css
@supports (height: env(safe-area-inset-top)) {
  .dynamic-island-safe {
    margin-top: env(safe-area-inset-top);
  }
}
```

## ♿ 辅助功能

### 高对比度模式
```css
@media (prefers-contrast: high) {
  .high-contrast {
    border: 2rpx solid currentColor;
    background-color: transparent !important;
  }
}
```

### 减少动画模式
```css
@media (prefers-reduced-motion: reduce) {
  .reduce-motion {
    animation: none !important;
    transition: none !important;
  }
}
```

### 暗色模式适配
```css
@media (prefers-color-scheme: dark) {
  .dark-mode-text { color: #ffffff; }
  .dark-mode-bg { background-color: #1a1a1a; }
  .dark-mode-card { 
    background-color: #2d2d2d;
    border: 1rpx solid #404040;
  }
}
```

## 🚀 性能优化

### GPU加速
```css
.gpu-accelerated {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
}
```

### 流畅滚动
```css
.smooth-scroll {
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}
```

## 📱 设备特定优化

### 小屏设备 (≤375px)
- 减少内边距和间距
- 适当缩小字体
- 简化布局结构

### 中等屏幕 (376-414px)
- 标准的内边距和间距
- 平衡的字体大小
- 完整的功能展示

### 大屏设备 (≥415px)
- 增加内边距营造呼吸感
- 稍大的字体提升可读性
- 更丰富的视觉层次

### 横屏模式
- 增加网格列数
- 扩大容器内边距
- 优化内容密度

## 🔄 使用指南

### 1. 在页面中使用响应式样式
```css
/* 使用全局响应式类 */
.my-container {
  @extend .responsive-container;
  @extend .section;
}

/* 使用媒体查询 */
.my-element {
  font-size: 4vw;
}

@media (max-width: 375px) {
  .my-element {
    font-size: 28rpx;
  }
}
```

### 2. 在JavaScript中获取响应式信息
```javascript
const responsive = require('../../utils/responsive.js');

Page({
  onLoad() {
    const styles = responsive.getResponsiveStyles();
    console.log('设备类型:', styles.deviceType);
    console.log('是否横屏:', styles.isLandscape);
  }
});
```

### 3. 动态计算布局
```javascript
// 动态计算网格列数
const columns = responsive.getGridColumns(4, 120);
const itemWidth = responsive.getGridItemWidth(columns, 20);

this.setData({
  gridColumns: columns,
  itemWidth: itemWidth
});
```

## ✅ 测试清单

- [ ] iPhone SE (375px) 竖屏显示正常
- [ ] iPhone 12 (390px) 竖屏显示正常  
- [ ] iPhone Plus (414px) 竖屏显示正常
- [ ] 横屏模式网格列数增加
- [ ] 刘海屏安全区域适配正确
- [ ] 字体大小在不同设备合适
- [ ] 卡片间距和内边距协调
- [ ] 暗色模式适配正常
- [ ] 高对比度模式可用
- [ ] 动画可被禁用

## 📝 维护说明

1. **新增页面**: 使用 `@import "styles/responsive.wxss"` 引入响应式样式
2. **修改断点**: 在 `styles/responsive.wxss` 中调整媒体查询
3. **添加工具函数**: 在 `utils/responsive.js` 中扩展功能
4. **更新文档**: 修改此文档保持同步

响应式设计让应用在所有设备上都能提供一致且优秀的用户体验！
