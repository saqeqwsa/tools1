// tools.js
Page({
  data: {
    searchValue: '',
    categories: [
      {
        id: 1,
        name: '编程开发',
        icon: '../../images/icons/business.png',
        bgColor: '#EBF4FF',
        type: 'programming'
      },
      {
        id: 2,
        name: '文案写作',
        icon: '../../images/icons/copy.png',
        bgColor: '#F0FDF4',
        type: 'writing'
      },
      {
        id: 3,
        name: '摄影设计',
        icon: '../../images/icons/avatar.png',
        bgColor: '#FAF5FF',
        type: 'design'
      },
      {
        id: 4,
        name: '数据分析',
        icon: '../../images/icons/examples.png',
        bgColor: '#FFF7ED',
        type: 'data'
      }
    ],
    hotTools: [
      {
        id: 1,
        title: 'GitHub Copilot',
        description: 'AI编程助手，提升开发效率',
        avatar: '../../images/default-goods-image.png',
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
        avatar: '../../images/default-goods-image.png',
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
        avatar: '../../images/default-goods-image.png',
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
        icon: '../../images/icons/examples.png',
        gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
      },
      {
        id: 2,
        title: '电子书库',
        description: '专业书籍资源',
        icon: '../../images/icons/goods.png',
        gradient: 'linear-gradient(135deg, #10B981, #059669)'
      }
    ],
    timeTools: [
      {
        id: 1,
        title: '番茄钟',
        description: '专注工作法',
        icon: '../../images/icons/avatar.png',
        gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
      },
      {
        id: 2,
        title: '任务清单',
        description: '高效任务管理',
        icon: '../../images/icons/examples.png',
        gradient: 'linear-gradient(135deg, #F59E0B, #D97706)'
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

  onCategoryTap(e) {
    const category = e.currentTarget.dataset.category;
    console.log('选择分类:', category);
    wx.showToast({
      title: `${category.name}分类`,
      icon: 'none'
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
