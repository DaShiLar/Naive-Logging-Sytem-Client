// residence.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  uploadDIY(filePaths, successUp, failUp, i, length) {
    wx.uploadFile({
      url: 'https://45053688.hazelnutsgz.com:444/api/upload',
      filePath: filePaths[i],
      name: 'file',
      formData: {
        'pictureUid': "HHH",
        'pictureAid': "LLL"
      },
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          wx.showToast({
            title: '总共'+successUp+'张上传成功, '+failUp+'张上传失败！',
          })
        }
        else {  //递归调用uploadDIY函数
          console.log(i);
          this.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },

  submitAll: function(e){
    console.log(e.detail.value);
    console.log("GGG");
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {

        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = res.tempFilePaths.length; //总共个数
        var i = 0; //第几个
        this.uploadDIY(res.tempFilePaths, successUp, failUp, i, length);
      },
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})