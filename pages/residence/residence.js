// test.js
var util = require('../../utils/util.js');

Page({
  data: {
    latitude: "",
    longitude: "",
    files: [],
    organization: "请选择组织名称",
    FilePaths: [],
    date: "请点击选择日期",
    time: "请点击选择时间",
    location: "",
    joinNumber: "", //参加人数
    name: "",     //发声者名称
    feeling: "",  //感受 
    theme: "",
    content: "",
    other: "",
    indexOrganization: 21,  //选择的社区名称的编号,默认为最大编号数加一
    arrayOrganizationName: ["百顺社区院长聚乐部",
      "百顺百计舞蹈队", "王回回文化传承发展小组", "青少年教育协会", "石头社区助老服务队", "百事顺遂京剧票社",
      "怡和女子健身队", "延寿单弦队", "尚德公益团队养犬俱乐部", "大栅栏百顺摄影协会", "澜馨布工坊",
      "前西社区助老服务队", "姐妹合唱队", "绿色风尚馆", "睿邻雅趣艺术沙龙", "导览队", "智惠创业坊", "左邻右舍美食团",
      "大栅栏统战艺术团", "延寿朗诵队", "大栅栏西街社区合唱艺术团", "请点击选择社区名称"
    ],

  },


  //政府组织选择监听器
  bindOrganizationPickerChange: function (e) {
    var index = parseInt(e.detail.value);
    var organization = this.data.arrayOrganizationName[index];
    this.setData({
      organization: organization,
      indexOrganization: index,
    });
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

  onLoad: function () {
    console.log(this);
    var that = this;
    var residence = wx.getStorageSync('residence');
    wx.getLocation({
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
    });
    if (residence) {
      console.log("LLLL");
      this.setData({
        organization: residence.organization,
        date: residence.date,
        time: residence.time,
        location: residence.location,
        joinNumber: residence.joinNumber, //参加人数
        name: residence.name,     //发声者名称
        feeling: residence.feeling,  //感受 
        theme: residence.theme,
        content: residence.content,
        other: residence.other,
        indexOrganization: residence.indexOrganization,

      });
    }
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
    console.log("leave residence");
    wx.setStorageSync('residence', this.data);
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
    console.log(e.detail.value);
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
      url: 'https://45053688.hazelnutsgz.com:/log/residence/pic',
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
      url: 'https://45053688.hazelnutsgz.com:/log/residence/words',
      method: "POST",
      data: {
        latitude: that.data.latitude, 
        longitude: that.data.longitude,
        date: that.data.date,      //日期
        time: that.data.time,       //时间
        location: that.data.location,      //位置
        organization: that.data.organization, //组织名称
        joinNumber: that.data.joinNumber, //参加人数
        comment: [{
          name: that.data.name,
          feeling: that.data.feeling
        }],
        theme: that.data.theme,       //主题
        content: that.data.content,   //内容
        other: that.data.other        //其他背景
      },
      success: function (res) {
        console.log(res);

        //没有传图片，只发表感受
        if (that.data.FilePaths.length==0){
          wx.showToast({
            title: '成功上传感受',
          });
          return;
        }

        //除了感受还有图片
        wx.showToast({
          title: '正在上传图片，请先不要关闭',
        });
        var successUp = 0; //成功个数
        var failUp = 0; //失败个数
        var length = that.data.FilePaths.length; //总共个数
        var i = 0; //第几个
        that.uploadDIY(that.data.FilePaths, successUp, failUp, i, length);
      },
    }),
      console.log("KKK");




  },

  validate: function () {

    if(this.data.date=="请点击选择日期"){
      wx.showToast({
        title: '请选择活动日期',
      })
      return false;
    }
    if(this.data.organization=="请选择组织名称"){
      wx.showToast({
        title: '请选择组织名称',
      })
      return false;
    }
    if(this.data.name==""){
      wx.showToast({
        title: '请输入您的姓名',
      })
      return false;
    }
    if(this.data.feeling=="") {
      wx.showToast({
        title: '请输入您的感受',
      })
      return false;
    }

    return true;
    
    // //验证图片是否上传
    // var hasActivity = false;
    // var hasSheet = false;
    // for (var pic in this.data.FilePaths) {
    //   console.log(pic);
    //   if (this.data.FilePaths[pic]['type'] == 'activity') {
    //     hasActivity = true;
    //   } if (this.data.FilePaths[pic]['type'] == 'sheet') {
    //     hasSheet = true;
    //   } if (hasSheet && hasActivity) {
    //     return true;
    //   }
    // }
    // wx.showToast({
    //   title: '图片没有上传，请选择图片之后再上传',
    // })
    // return false;

  },



  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
});
