// tool-detail.js
Page({
  data: {
    toolInfo: {
      id: 1,
      title: 'GitHub Copilot',
      subtitle: 'AI编程助手，提升开发效率',
      avatar: '../../images/default-goods-image.png',
      rating: 4.9,
      starCount: 5,
      reviewCount: 1234,
      price: null, // null表示免费
      isCollected: false,
      features: [
        '智能代码补全',
        '自动生成函数',
        '代码注释生成',
        '支持多种编程语言',
        '实时编程建议',
        '代码优化建议'
      ],
      description: 'GitHub Copilot 是由 GitHub 和 OpenAI 联合开发的AI编程助手。它能够根据你的代码上下文，智能生成代码片段，大大提升编程效率。无论你是初学者还是资深开发者，Copilot 都能帮助你更快地编写高质量的代码。',
      tutorials: [
        {
          title: '安装与配置',
          description: '学习如何在IDE中安装并配置GitHub Copilot插件'
        },
        {
          title: '基础使用方法',
          description: '了解Copilot的基本操作和快捷键'
        },
        {
          title: '高级功能技巧',
          description: '掌握Copilot的高级功能和使用技巧'
        },
        {
          title: '最佳实践指南',
          description: '学习如何最大化利用Copilot提升工作效率'
        }
      ],
      reviews: [
        {
          id: 1,
          username: '程序员小王',
          avatar: '../../images/icons/avatar.png',
          rating: 5,
          date: '2024-01-15',
          content: '非常好用的AI编程助手，代码提示很准确，大大提升了我的开发效率！'
        },
        {
          id: 2,
          username: '前端开发者',
          avatar: '../../images/icons/avatar.png',
          rating: 4,
          date: '2024-01-10',
          content: '对于前端开发很有帮助，特别是写React组件的时候，能够智能补全很多代码。'
        },
        {
          id: 3,
          username: '全栈工程师',
          avatar: '../../images/icons/avatar.png',
          rating: 5,
          date: '2024-01-08',
          content: '支持多种编程语言，无论是前端还是后端开发都很有用，强烈推荐！'
        }
      ]
    },
    relatedTools: [
      {
        id: 2,
        title: 'Visual Studio Code',
        avatar: '../../images/default-goods-image.png',
        rating: 4.8
      },
      {
        id: 3,
        title: 'ChatGPT',
        avatar: '../../images/default-goods-image.png',
        rating: 4.7
      },
      {
        id: 4,
        title: 'Postman',
        avatar: '../../images/default-goods-image.png',
        rating: 4.6
      }
    ]
  },

  onLoad(options) {
    console.log('工具详情页面加载', options);
    if (options.toolId) {
      this.loadToolDetail(options.toolId);
    }
    if (options.title) {
      wx.setNavigationBarTitle({
        title: options.title
      });
    }
  },

  loadToolDetail(toolId) {
    // 根据toolId加载工具详情
    console.log('加载工具详情:', toolId);
    // 这里可以调用云函数获取具体的工具信息
  },

  onUseTool() {
    const { toolInfo } = this.data;
    if (toolInfo.price) {
      // 付费工具，跳转到支付页面
      wx.showModal({
        title: '购买确认',
        content: `是否购买${toolInfo.title}？价格：¥${toolInfo.price}`,
        success: (res) => {
          if (res.confirm) {
            this.purchaseTool();
          }
        }
      });
    } else {
      // 免费工具，直接使用
      this.startUsingTool();
    }
  },

  purchaseTool() {
    wx.showLoading({
      title: '正在购买...'
    });
    
    // 模拟购买流程
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '购买成功！',
        icon: 'success'
      });
      this.startUsingTool();
    }, 2000);
  },

  startUsingTool() {
    const { toolInfo } = this.data;
    wx.showToast({
      title: `开始使用${toolInfo.title}`,
      icon: 'success'
    });
    
    // 这里可以跳转到工具的使用页面或打开外部链接
    console.log('开始使用工具:', toolInfo);
  },

  onCollectTool() {
    const isCollected = !this.data.toolInfo.isCollected;
    this.setData({
      'toolInfo.isCollected': isCollected
    });
    
    wx.showToast({
      title: isCollected ? '收藏成功' : '取消收藏',
      icon: 'success'
    });
  },

  onTutorialTap(e) {
    const tutorial = e.currentTarget.dataset.tutorial;
    console.log('查看教程:', tutorial);
    wx.showModal({
      title: tutorial.title,
      content: tutorial.description,
      showCancel: false
    });
  },

  onLoadMoreReviews() {
    wx.showToast({
      title: '加载更多评价',
      icon: 'none'
    });
  },

  onRelatedToolTap(e) {
    const tool = e.currentTarget.dataset.tool;
    console.log('查看相关工具:', tool);
    wx.navigateTo({
      url: `/pages/tool-detail/tool-detail?toolId=${tool.id}&title=${tool.title}`
    });
  },

  onShareTool() {
    const { toolInfo } = this.data;
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  onContactSupport() {
    wx.showModal({
      title: '联系客服',
      content: '如需帮助，请添加客服微信：tool-support',
      showCancel: false
    });
  },

  onShareAppMessage() {
    const { toolInfo } = this.data;
    return {
      title: `${toolInfo.title} - ${toolInfo.subtitle}`,
      path: `/pages/tool-detail/tool-detail?toolId=${toolInfo.id}&title=${toolInfo.title}`,
      imageUrl: toolInfo.avatar
    };
  }
});
