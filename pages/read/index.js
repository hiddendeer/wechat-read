const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    history:[]
  },
  onLoad() {
    var that = this;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // });
    util.request({
      url: 'book_category/',
      method: 'GET',
      success: function (res) {
        console.log(res)
        that.setData({
          list:res.data
        });
      }
    });
    // let list = [{}];
    // for (let i = 0; i < 26; i++) {
    //   list[i] = {};
    //   list[i].name = String.fromCharCode(65 + i);
    //   list[i].id = i;
    // }
    // this.setData({
    //   list: list,
    //   listCur: list[0]
    // })
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  gotoDetail: function (e) {
    //获取书籍id
    let book_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/reading/index?book_id=' + book_id,
      // url: '/pages/detail/index/index'
    })
  },
  showModal(e) {
    var that = this;
    var user_id = wx.getStorageSync('user_id');
    util.request({
      other_url: 'web/api/get_read_historys/?user_id='+user_id,
      method: 'GET',
      success: function (res) {
        that.setData({
          history:res.data
        });
      }
    });
    that.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  VerticalMain(e) {
    // let that = this;
    // let list = this.data.list;
    // let tabHeight = 0;
    // if (this.data.load) {
    //   for (let i = 0; i < list.length; i++) {
    //     let view = wx.createSelectorQuery().select("#main-" + list[i].id);
    //     view.fields({
    //       size: true
    //     }, data => {
    //       list[i].top = tabHeight;
    //       tabHeight = tabHeight + data.height;
    //       list[i].bottom = tabHeight;
    //     }).exec();
    //   }
    //   that.setData({
    //     load: false,
    //     list: list
    //   })
    // }
    // let scrollTop = e.detail.scrollTop + 20;
    // for (let i = 0; i < list.length; i++) {
    //   if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
    //     that.setData({
    //       VerticalNavTop: (list[i].id - 1) * 50,
    //       TabCur: list[i].id
    //     })
    //     return false
    //   }
    // }
  },
  searchCur:function(e){
    wx.navigateTo({
      url: '/pages/detail/search/index',
    })
  }
})