// test.js
var util = require('../../utils/util.js');

Page({
  data: {
    files: [],
    FilePaths: [],
    date: "",
    time: "12:01",
    location: "",
    organization: "",
    joinNumber: "", //参加人数
    name: "",     //发声者名称
    feeling: "",  //感受 
    theme: "",
    content: "",
    other: "",

  },

  //上传活动时候的照片
  chooseActivityImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        var tempFilePathDic = {};
        tempFilePathDic['path'] = res.tempFilePaths[0];
        tempFilePathDic['type'] = 'activity',

          console.log(typeof tempFilePathDic);
        that.setData({
          FilePaths: that.data.FilePaths.concat(tempFilePathDic)
        });

      }
    })
  },

  //上传微创投表图片
  chooseSheetImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
        var tempFilePathDic = {};
        tempFilePathDic['path'] = res.tempFilePaths[0];
        tempFilePathDic['type'] = 'sheet',

          console.log(typeof tempFilePathDic);
        that.setData({
          FilePaths: that.data.FilePaths.concat(tempFilePathDic)
        });
      }
    })
  },

  onLoad: function (options) {

    console.log(util.getNowFormatDate());
    this.setData({
      date: util.getNowFormatDate()
    });

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

  bindOrganizationChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      organization: e.detail.value
    });
  },

  bindLocationChange: function (e) {
    this.setData({
      location: e.detail.value
    });
  },

  bindJoinNumberChange: function (e) {
    this.setData({
      joinNumber: e.detail.value
    });
  },

  bindThemeChange: function (e) {
    this.setData({
      theme: e.detail.value
    });
  },

  bindNameChange: function (e) {
    this.setData({
      name: e.detail.value
    });
  },

  bindFeelingChange: function (e) {
    console.log("feeling");
    this.setData({
      feeling: e.detail.value
    })
  },


  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  bindContentChange: function (e) {
    console.log("content");
    this.setData({
      content: e.detail.value
    });
  },

  bindOtherChange: function (e) {
    this.setData({
      other: e.detail.value
    })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },




  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this;
    console.log("uploadDIY");
    wx.uploadFile({
      url: 'https://45053688.hazelnutsgz.com:444/residence/pic',
      filePath: filePaths[i].path,
      name: 'file',
      formData: {
        'date': that.data.date,
        'time': that.data.time,
        'organization': that.data.organization,
        "type": filePaths[i]['type']
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
            title: '总共' + successUp + '张上传成功, ' + failUp + '张上传失败！',
          })
        }
        else {  //递归调用uploadDIY函数
          console.log(i);
          this.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },


  submitAll: function () {
    console.log(this.data);
    var that = this;
    if (!this.validate()) {
      return;
    }
    console.log("准备开始request words");
    wx.request({
      url: 'https://45053688.hazelnutsgz.com:444/residence/words',
      method: "POST",
      data: {
        date: that.data.date,      //日期
        time: that.data.time,       //时间
        location: that.data.location,      //位置
        organization: that.data.organization, //组织名称
        joinNumber: that.data.joinNumber, //参加人数
        name: that.data.name,     //发声者名称
        feeling: that.data.feeling,  //感受 
        theme: that.data.theme,       //主题
        content: that.data.content,   //内容
        other: that.data.other        //其他背景
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '正在上传图片，请先不要关闭',
        })
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = that.data.FilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploadDIY(that.data.FilePaths, successUp, failUp, i, length);
      },
      complete: function (res) {
        console.log("complete");
      },
    }),
      console.log("KKK");




  },

  validate: function () {

    //验证文字
    for (var key in this.data) {
      if (key == "__webviewId__") {
        continue;
      }
      if (this.data[key] == [] || this.data[key] == "") {
        wx.showToast({
          title: key + " 还没有填写，请补充完整后再提交"
        })
        return false;
      }
    }

    //验证图片是否上传
    var hasActivity = false;
    var hasSheet = false;
    for (var pic in this.data.FilePaths) {
      console.log(pic);
      if (this.data.FilePaths[pic]['type'] == 'activity') {
        hasActivity = true;
      } if (this.data.FilePaths[pic]['type'] == 'sheet') {
        hasSheet = true;
      } if (hasSheet && hasActivity) {
        return true;
      }
    }
    wx.showToast({
      title: '图片没有上传，请选择图片之后再上传',
    })
    return false;

  },



  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
});
