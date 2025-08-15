// profile.js
Page({
  data: {
    userInfo: {
      nickname: '张小明',
      title: '全栈开发工程师',
      location: '北京',
      experience: '3年经验',
      avatar: ''
    },
    stats: {
      completedProjects: 12,
      totalIncome: 28.5,
      rating: 4.9
    },
    skills: [
      { name: 'JavaScript', bgColor: '#EBF4FF', color: '#1D4ED8' },
      { name: 'React', bgColor: '#F0FDF4', color: '#059669' },
      { name: 'Node.js', bgColor: '#FAF5FF', color: '#7C3AED' },
      { name: 'Python', bgColor: '#FFF7ED', color: '#D97706' },
      { name: 'UI/UX设计', bgColor: '#FEF2F2', color: '#DC2626' },
      { name: '项目管理', bgColor: '#EEF2FF', color: '#4338CA' }
    ],
    recentProjects: [
      {
        id: 1,
        title: '电商网站开发',
        description: 'React + Node.js 全栈项目',
        price: 8.5,
        status: '已完成',
        statusColor: '#10B981',
        icon: '../../images/icons/business.png',
        gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)'
      },
      {
        id: 2,
        title: '移动端UI设计',
        description: 'Figma 设计稿制作',
        price: 3.2,
        status: '进行中',
        statusColor: '#3B82F6',
        icon: '../../images/icons/avatar.png',
        gradient: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
      }
    ],
    menuItems: [
      {
        id: 1,
        title: '我的钱包',
        icon: '../../images/icons/business.png',
        bgColor: '#EBF4FF',
        type: 'wallet'
      },
      {
        id: 2,
        title: '数据分析',
        icon: '../../images/icons/examples.png',
        bgColor: '#F0FDF4',
        type: 'analytics'
      },
      {
        id: 3,
        title: '我的收藏',
        icon: '../../images/icons/avatar.png',
        bgColor: '#FAF5FF',
        type: 'favorites'
      },
      {
        id: 4,
        title: '使用记录',
        icon: '../../images/icons/goods.png',
        bgColor: '#FFF7ED',
        type: 'history'
      },
      {
        id: 5,
        title: '设置',
        icon: '../../images/icons/setting.svg',
        bgColor: '#FEF2F2',
        type: 'settings'
      }
    ],
    achievements: [
      {
        id: 1,
        name: '新手',
        icon: '../../images/icons/avatar.png',
        bgColor: '#FEF3C7'
      },
      {
        id: 2,
        name: '快速',
        icon: '../../images/icons/business.png',
        bgColor: '#EBF4FF'
      },
      {
        id: 3,
        name: '好评',
        icon: '../../images/icons/examples.png',
        bgColor: '#F0FDF4'
      },
      {
        id: 4,
        name: '专业',
        icon: '../../images/icons/goods.png',
        bgColor: '#FAF5FF'
      }
    ]
  },

  onLoad(options) {
    console.log('个人中心页面加载');
    this.loadUserInfo();
  },

  onShow() {
    // 页面显示时刷新数据
    this.refreshStats();
  },

  loadUserInfo() {
    // 获取用户信息
    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        console.log('获取用户信息成功', res);
        this.setData({
          'userInfo.nickname': res.userInfo.nickName,
          'userInfo.avatar': res.userInfo.avatarUrl
        });
      },
      fail: (err) => {
        console.log('获取用户信息失败', err);
      }
    });
  },

  refreshStats() {
    // 刷新统计数据
    // 这里可以调用云函数获取最新数据
    console.log('刷新统计数据');
  },

  onEditProfile() {
    wx.showToast({
      title: '编辑个人资料',
      icon: 'none'
    });
  },

  onProjectTap(e) {
    const project = e.currentTarget.dataset.project;
    console.log('查看项目详情:', project);
    wx.showToast({
      title: `查看${project.title}`,
      icon: 'none'
    });
  },

  onMenuTap(e) {
    const menu = e.currentTarget.dataset.menu;
    console.log('点击菜单:', menu);
    
    switch (menu.type) {
      case 'wallet':
        wx.showToast({
          title: '我的钱包功能',
          icon: 'none'
        });
        break;
      case 'analytics':
        wx.showToast({
          title: '数据分析功能',
          icon: 'none'
        });
        break;
      case 'favorites':
        wx.showToast({
          title: '我的收藏功能',
          icon: 'none'
        });
        break;
      case 'history':
        wx.showToast({
          title: '使用记录功能',
          icon: 'none'
        });
        break;
      case 'settings':
        wx.showToast({
          title: '设置功能',
          icon: 'none'
        });
        break;
      default:
        wx.showToast({
          title: menu.title,
          icon: 'none'
        });
    }
  },

  onAchievementTap(e) {
    const achievement = e.currentTarget.dataset.achievement;
    console.log('查看成就:', achievement);
    wx.showModal({
      title: '成就详情',
      content: `恭喜您获得"${achievement.name}"成就！`,
      showCancel: false
    });
  },

  onShareAppMessage() {
    return {
      title: '我的副业工具箱',
      path: '/pages/profile/profile'
    };
  },

  onPullDownRefresh() {
    console.log('下拉刷新');
    this.refreshStats();
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  }
});
