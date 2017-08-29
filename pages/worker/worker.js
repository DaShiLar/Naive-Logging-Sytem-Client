Page({
  data: {
    radioxmsjhItems: [
      { name: '在项目书计划中', value: '在项目书计划中' },
      { name: '未在项目书计划中', value: '未在项目书计划中', checked: true }
    ],
    radiofwdxItems: [
      { name: '是服务对象', value: '是服务对象' },
      { name: '不是服务对象', value: '不是服务对象', checked: true }
    ],


    zzmc: "", //组织名称
    sssq: "", //所属社区
    gfdd: "", //跟访地点
    gfsj: "", //跟访时间
    gfrxm: "", //跟访人姓名
    gfsc: "", //跟访时长
    gfxs: "", //跟访形式
    hdmc: "",  //活动名称
    xmsjh: "未在项目书计划中", //（不是）项目书计划
    fwdx: "不是服务对象", //（不是）服务对象
    hdmb: "", //活动目标
    hdlc: "", //活动流程
    yd: "",   //优点
    qd: "", //缺点
    yhjy: "", //优化建议
    grgs: "", //个人感受
    zzzxq: "", //自组织需求
    pykf: "", //培育看法
    files: [], //用于浏览
    FilePaths: [], //上传的文件， 有视频和图像
  },

  //上传照片附件
  chooseImage: function (e) {
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
        tempFilePathDic['type'] = 'photo',

          console.log(typeof tempFilePathDic);
        that.setData({
          FilePaths: that.data.FilePaths.concat(tempFilePathDic)
        });

      }
    })
  },

  //上传视频附件
  chooseVideo: function (e) {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        var tempFilePathDic = {};
        tempFilePathDic['path'] = res.tempFilePath;
        tempFilePathDic['type'] = 'video',

          console.log(typeof tempFilePathDic);
        that.setData({
          FilePaths: that.data.FilePaths.concat(tempFilePathDic)
        });

      }
    })
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
    for (var pic in this.data.FilePaths) {
      console.log(pic);
      if (this.data.FilePaths[pic]['type'] == 'photo') {
        return true;
      }
    }
    wx.showToast({
      title: '图片没有上传，请至少选择一张图片之后再上传',
    })
    return false;

  },


  submitAll: function () {
    console.log(this.data);
    var that = this;
    if (!this.validate()) {
      return;
    }
    
    wx.request({
      url: 'https://45053688.hazelnutsgz.com:444/worker/words',
      method: "POST",
      data: {
        zzmc: that.data.zzmc, //组织名称
        sssq: that.data.sssq, //所属社区
        gffd: that.data.gffd, //跟访地点
        gfsj: that.data.gfsj, //跟访时间
        gfrxm: that.data.gfrxm, //跟访人姓名
        gfsc: that.data.gfsc, //跟访时长
        gfxs: that.data.gfxs, //跟访形式
        hdmc: that.data.hdmc,  //活动名称
        xmsjh: that.data.xmsjh, //（是）项目书计划
        fwdx: that.data.fwdx, //（是）服务对象
        hdmb: that.data.hdmb, //活动目标
        hdlc: that.data.hdlc, //活动流程
        yd: that.data.yd,   //优点
        qd: that.data.qd, //缺点
        yhjy: that.data.yhjy, //优化建议
        grgs: that.data.grgs, //个人感受
        zzzxq: that.data.zzzxq, //自组织需求
        pykf: that.data.pykf, //培育看法
        FilePaths: [], //上传的文件， 有视频和图像
      },
      success: function (res) {
        console.log(res);
        wx.showToast({
          title: '正在上传图片和视频，请先不要关闭',
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


  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this;
    console.log("uploadDIY");
    wx.uploadFile({
      url: 'https://45053688.hazelnutsgz.com:444/worker/attach',
      filePath: filePaths[i].path,
      name: 'file',
      formData: {
        'gfrxm': that.data.gfrxm,
        'gfsj': that.data.gfsj,
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



  pykfChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      pykf: e.detail.value
    })
  },

  zzzxqChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      zzzxq: e.detail.value
    })
  },

  grgsChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      grgs: e.detail.value
    })
  },

  yhjyChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      yhjy: e.detail.value
    })
  },

  qdChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      qd: e.detail.value
    })
  },

  ydChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      yd: e.detail.value
    })
  },

  hdlcChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      hdlc: e.detail.value
    })
  },

  hdmbChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      hdmb: e.detail.value
    })
  },

  fwdxChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      fwdx: e.detail.value
    })
  },

  xmsjhChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      xmsjh: e.detail.value
    })
  },

  hdmcChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      hdmc: e.detail.value
    })
  },

  gfxsChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      gfxs: e.detail.value
    })
  },

  gfscChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      gfsc: e.detail.value
    })
  },

  gfrxmChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      gfrxm: e.detail.value
    })
  },

  gfsjChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      gfsj: e.detail.value
    })
  },

  gfddChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      gfdd: e.detail.value
    })
  },

  sssqChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      sssq: e.detail.value
    })
  },


  zzmcChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      zzmc: e.detail.value
    })
  },

  radioxmsjhChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioxmsjhItems;

    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    
    this.setData({
      xmsjh: e.detail.value,
      radioxmsjhItems: radioItems
    });
  },
  radiofwdxChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radiofwdxItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      fwdx: e.detail.value,
      radiofwdxItems: radioItems
    });
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
  
});