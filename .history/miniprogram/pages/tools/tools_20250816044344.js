// tools.js
Page({
  data: {
    searchValue: '',
    categories: [
      {
        id: 1,
        name: '编程开发',
        iconText: '{}', 
        bgColor: '#DBEAFE',
        iconColor: '#2563EB',
        type: 'programming'
      },
      {
        id: 2,
        name: '文案写作',
        iconText: '✎',
        bgColor: '#DCFCE7',
        iconColor: '#16A34A',
        type: 'writing'
      },
      {
        id: 3,
        name: '摄影设计',
        iconText: '📷',
        bgColor: '#F3E8FF',
        iconColor: '#9333EA',
        type: 'design'
      },
      {
        id: 4,
        name: '二维码生成',
        iconText: '📈',
        bgColor: '#FED7AA',
        iconColor: '#EA580C',
        type: 'data'
      }
    ],
    categoryItemWidth: '25%', // 动态计算的分类项宽度
    skillItemWidth: '50%', // 动态计算的技能学习项宽度
    timeItemWidth: '50%', // 动态计算的时间管理项宽度
    hotTools: [
      {
        id: 1,
        title: 'GitHub Copilot',
        description: 'AI编程助手，提升开发效率',
        avatar: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=60&h=60&fit=crop&crop=center',
        rating: '4.9',
        tag: {
          text: '热门',
          bgColor: '#FEF2F2',
          color: '#DC2626'
        }
      },
      {
        id: 2,
        title: 'Tableau',
        description: '专业数据可视化工具',
        avatar: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop&crop=center',
        rating: '4.8',
        tag: {
          text: '推荐',
          bgColor: '#EBF8FF',
          color: '#2563EB'
        }
      },
      {
        id: 3,
        title: 'Figma',
        description: '在线协作设计平台',
        avatar: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=60&h=60&fit=crop&crop=center',
        rating: '4.7',
        tag: {
          text: '免费',
          bgColor: '#F0FDF4',
          color: '#16A34A'
        }
      }
    ],
    skillCategories: [
      {
        id: 1,
        title: '在线课程',
        description: '海量技能课程',
        iconText: '🎓',
        gradient: 'linear-gradient(135deg, #60A5FA, #3B82F6)'
      },
      {
        id: 2,
        title: '电子书库',
        description: '专业书籍资源',
        iconText: '📚',
        gradient: 'linear-gradient(135deg, #4ADE80, #22C55E)'
      }
    ],
    timeTools: [
      {
        id: 1,
        title: '番茄钟',
        description: '专注工作法',
        iconText: '🕒',
        gradient: 'linear-gradient(135deg, #A78BFA, #8B5CF6)'
      },
      {
        id: 2,
        title: '任务清单',
        description: '高效任务管理',
        iconText: '✅',
        gradient: 'linear-gradient(135deg, #FB923C, #F97316)'
      }
    ]
  },

  onLoad(options) {
    console.log('工具箱页面加载');
  },

  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    });
  },

  onNotificationTap() {
    wx.showToast({
      title: '通知功能',
      icon: 'none'
    });
  },

  onLoad() {
    // 根据categories数量动态计算每个分类项的宽度
    const categoryCount = this.data.categories.length;
    
    // 确保至少有1个分类，避免除零错误
    const safeCount = Math.max(categoryCount, 1);
    const itemWidth = `${(100 / safeCount).toFixed(2)}%`;
    
    // 根据skillCategories数量动态计算每个技能学习项的宽度
    const skillCount = this.data.skillCategories.length;
    const safeSkillCount = Math.max(skillCount, 1);
    const skillWidth = `${(100 / safeSkillCount).toFixed(2)}%`;
    
    // 根据timeTools数量动态计算每个时间管理项的宽度
    const timeCount = this.data.timeTools.length;
    const safeTimeCount = Math.max(timeCount, 1);
    const timeWidth = `${(100 / safeTimeCount).toFixed(2)}%`;
    
    console.log(`分类数量: ${categoryCount}, 每项宽度: ${itemWidth}`);
    console.log(`技能学习数量: ${skillCount}, 每项宽度: ${skillWidth}`);
    console.log(`时间管理数量: ${timeCount}, 每项宽度: ${timeWidth}`);
    
    this.setData({
      categoryItemWidth: itemWidth,
      skillItemWidth: skillWidth,
      timeItemWidth: timeWidth
    });
  },

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    console.log('选择分类:', category);
    
    // 特殊处理：二维码生成跳转到外部小程序
    if (category.name === '二维码生成') {
      this.navigateToExternalMiniProgram();
      return;
    }
    
    // 其他分类的默认处理
    wx.showToast({
      title: `${category.name}分类`,
      icon: 'none'
    });
  },

  // 跳转到外部小程序 - 快豆工具箱
  navigateToExternalMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wx91d27dbf599dff74', // 快豆工具箱的appId
      path: 'pages/qrcode/qrcode', // 二维码生成页面路径
      extraData: {
        from: '副业工具箱',
        feature: '二维码生成'
      },
      envVersion: 'release', // 正式版
      success: (res) => {
        console.log('成功跳转到快豆工具箱');
      },
      fail: (err) => {
        console.error('跳转失败:', err);
        // 跳转失败的处理
        this.handleNavigationFallback();
      }
    });
  },

  // 跳转失败的备用处理
  handleNavigationFallback() {
    wx.showModal({
      title: '提示',
      content: '未找到快豆工具箱小程序，请先搜索并使用过该小程序后再试',
      showCancel: true,
      cancelText: '取消',
      confirmText: '去搜索',
      success: (res) => {
        if (res.confirm) {
          // 复制小程序链接到剪贴板
          wx.setClipboardData({
            data: '#小程序://快豆工具箱/OCFdkNyq5d0gEyc',
            success: () => {
              wx.showToast({
                title: '链接已复制，请在微信中打开',
                icon: 'none',
                duration: 3000
              });
            }
          });
        }
      }
    });
  },

  onToolTap(e) {
    const tool = e.currentTarget.dataset.tool;
    console.log('选择工具:', tool);
    wx.navigateTo({
      url: `/pages/tool-detail/tool-detail?toolId=${tool.id}&title=${tool.title}`
    });
  },

  onSkillTap(e) {
    const skill = e.currentTarget.dataset.skill;
    console.log('选择技能:', skill);
    wx.showToast({
      title: `${skill.title}功能`,
      icon: 'none'
    });
  },

  onTimeToolTap(e) {
    const tool = e.currentTarget.dataset.tool;
    console.log('选择时间工具:', tool);
    wx.showToast({
      title: `${tool.title}功能`,
      icon: 'none'
    });
  },

  onShareAppMessage() {
    return {
      title: '副业工具箱 - 发现更多可能',
      path: '/pages/tools/tools'
    };
  }
});
