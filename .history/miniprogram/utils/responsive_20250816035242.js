/**
 * 响应式工具函数
 * 用于动态获取设备信息和自适应样式
 */

class ResponsiveUtils {
  constructor() {
    this.systemInfo = null;
    this.init();
  }

  // 初始化获取系统信息
  init() {
    try {
      this.systemInfo = wx.getSystemInfoSync();
    } catch (error) {
      console.error('获取系统信息失败:', error);
    }
  }

  // 获取屏幕宽度
  getScreenWidth() {
    return this.systemInfo ? this.systemInfo.screenWidth : 375;
  }

  // 获取屏幕高度
  getScreenHeight() {
    return this.systemInfo ? this.systemInfo.screenHeight : 667;
  }

  // 获取安全区域
  getSafeArea() {
    return this.systemInfo ? this.systemInfo.safeArea : {};
  }

  // 获取状态栏高度
  getStatusBarHeight() {
    return this.systemInfo ? this.systemInfo.statusBarHeight : 20;
  }

  // 判断设备类型
  getDeviceType() {
    const width = this.getScreenWidth();
    
    if (width <= 375) {
      return 'small'; // 小屏设备
    } else if (width <= 414) {
      return 'medium'; // 中等屏幕
    } else {
      return 'large'; // 大屏设备
    }
  }

  // 判断是否为横屏
  isLandscape() {
    const width = this.getScreenWidth();
    const height = this.getScreenHeight();
    return width > height;
  }

  // 根据设备类型获取容器内边距
  getContainerPadding() {
    const deviceType = this.getDeviceType();
    const paddingMap = {
      small: 32,   // rpx
      medium: 48,  // rpx
      large: 56    // rpx
    };
    return paddingMap[deviceType];
  }

  // 根据设备类型获取卡片间距
  getCardMargin() {
    const deviceType = this.getDeviceType();
    const marginMap = {
      small: 24,   // rpx
      medium: 32,  // rpx
      large: 40    // rpx
    };
    return marginMap[deviceType];
  }

  // 根据设备类型获取字体大小
  getFontSize(size) {
    const deviceType = this.getDeviceType();
    const fontSizeMap = {
      small: {
        xl: 44, lg: 36, md: 28, sm: 24, xs: 20
      },
      medium: {
        xl: 48, lg: 38, md: 30, sm: 26, xs: 22
      },
      large: {
        xl: 52, lg: 42, md: 32, sm: 28, xs: 24
      }
    };
    return fontSizeMap[deviceType][size] || fontSizeMap.medium[size];
  }

  // 根据屏幕宽度计算网格列数
  getGridColumns(totalColumns, minItemWidth = 120) {
    const screenWidth = this.getScreenWidth();
    const padding = this.getContainerPadding() * 2; // 左右内边距
    const availableWidth = screenWidth - padding;
    const maxColumns = Math.floor(availableWidth / minItemWidth);
    
    if (this.isLandscape()) {
      // 横屏时增加列数
      return Math.min(totalColumns + 2, maxColumns);
    }
    
    return Math.min(totalColumns, maxColumns);
  }

  // 计算网格项宽度
  getGridItemWidth(columns, gap = 20) {
    const screenWidth = this.getScreenWidth();
    const padding = this.getContainerPadding() * 2;
    const totalGap = gap * (columns - 1);
    const availableWidth = screenWidth - padding - totalGap;
    return Math.floor(availableWidth / columns);
  }

  // 获取响应式样式对象
  getResponsiveStyles() {
    const deviceType = this.getDeviceType();
    const isLandscape = this.isLandscape();
    
    return {
      deviceType,
      isLandscape,
      containerPadding: this.getContainerPadding(),
      cardMargin: this.getCardMargin(),
      fontSize: {
        xl: this.getFontSize('xl'),
        lg: this.getFontSize('lg'),
        md: this.getFontSize('md'),
        sm: this.getFontSize('sm'),
        xs: this.getFontSize('xs')
      },
      safeArea: this.getSafeArea(),
      statusBarHeight: this.getStatusBarHeight()
    };
  }

  // rpx转px
  rpxToPx(rpx) {
    const screenWidth = this.getScreenWidth();
    return (rpx * screenWidth) / 750;
  }

  // px转rpx
  pxToRpx(px) {
    const screenWidth = this.getScreenWidth();
    return (px * 750) / screenWidth;
  }

  // 监听屏幕方向变化
  onOrientationChange(callback) {
    if (typeof callback === 'function') {
      // 小程序暂不支持orientation change事件
      // 可以通过定时检查屏幕尺寸变化来模拟
      const originalOrientation = this.isLandscape();
      const checkInterval = setInterval(() => {
        this.init(); // 重新获取系统信息
        const currentOrientation = this.isLandscape();
        if (originalOrientation !== currentOrientation) {
          callback(currentOrientation);
          clearInterval(checkInterval);
        }
      }, 100);

      // 5秒后清除定时器避免内存泄漏
      setTimeout(() => {
        clearInterval(checkInterval);
      }, 5000);
    }
  }

  // 获取适配安全区域的样式
  getSafeAreaStyles() {
    const safeArea = this.getSafeArea();
    const statusBarHeight = this.getStatusBarHeight();
    
    return {
      paddingTop: `${statusBarHeight}px`,
      paddingBottom: `${safeArea.bottom || 0}px`,
      paddingLeft: `${safeArea.left || 0}px`,
      paddingRight: `${safeArea.right || 0}px`
    };
  }
}

// 创建单例
const responsiveUtils = new ResponsiveUtils();

module.exports = responsiveUtils;
