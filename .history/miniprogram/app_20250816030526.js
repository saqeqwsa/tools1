// app.js
App({
  onLaunch: function () {
    console.log('副业工具箱小程序启动');
    
    this.globalData = {
      // 用户信息
      userInfo: null,
      // 云环境配置
      env: "",
      // 应用配置
      appConfig: {
        name: '副业工具箱',
        version: '1.0.0'
      }
    };

    // 初始化云开发
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: this.globalData.env,
        traceUser: true,
      });
    }

    // 检查更新
    this.checkForUpdate();
  },

  onShow: function() {
    console.log('小程序显示');
  },

  onHide: function() {
    console.log('小程序隐藏');
  },

  checkForUpdate: function() {
    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      console.log('检查更新结果:', res.hasUpdate);
    });

    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        }
      });
    });

    updateManager.onUpdateFailed(function () {
      console.log('新版本下载失败');
    });
  },

  // 获取用户信息
  getUserInfo: function(callback) {
    const userInfo = this.globalData.userInfo;
    if (userInfo) {
      callback && callback(userInfo);
      return;
    }

    wx.getUserProfile({
      desc: '用于完善个人资料',
      success: (res) => {
        this.globalData.userInfo = res.userInfo;
        callback && callback(res.userInfo);
      },
      fail: (err) => {
        console.log('获取用户信息失败', err);
        callback && callback(null);
      }
    });
  }
});
