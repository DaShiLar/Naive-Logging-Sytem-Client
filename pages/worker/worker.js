Page({
  data: {
    showOther: "none",  //是否展示other这个输入框
    radioxmsjhItems: [
      { name: '在', value: "在项目计划书" },
      { name: '不在', value: "不在项目计划书", checked: true }
    ],
    radiofwdxItems: [
      { name: '是', value: "是服务对象" },
      { name: '不是', value: "不是服务对象", checked: true }
    ],
    radiogfxsItems: [
      { name: '活动追踪', value: '活动追踪'},
      { name: '项目访谈', value: '项目访谈', checked: true },
      { name: '其他', value: '其他' },
    ],


    indexOrganization: 21,  //选择的社区名称的编号,默认为最大编号数加一
    arrayOrganizationName: ["百顺社区院长聚乐部",
    "百顺百计舞蹈队","王回回文化传承发展小组","青少年教育协会","石头社区助老服务队","百事顺遂京剧票社",
    "怡和女子健身队","延寿单弦队","尚德公益团队养犬俱乐部","大栅栏百顺摄影协会","澜馨布工坊",
    "前西社区助老服务队","姐妹合唱队","绿色风尚馆","睿邻雅趣艺术沙龙","导览队","智惠创业坊","左邻右舍美食团",
    "大栅栏统战艺术团","延寿朗诵队","大栅栏西街社区合唱艺术团","请点击选择社区名称"
      ],
    arrayOrganizationLocation: ["百顺","百顺","西街","三井",
        "石头","百顺","前西","延寿","前西","百顺","大安","前西",
        "煤东","石头","大安","三井","延寿","石头","前西","延寿",
        "西街","未知"],  

    beginTime: "请选择开始时间",
    endTime: "请选择结束时间",
    date: "请选择日期", //跟访日期

    zzmc: "", //组织名称
    sssq: "", //所属社区
    gfdd: "", //跟访地点
    gfrxm: "", //跟访人姓名
    hdrs: "", //活动人数
    gfxs: "", //跟访形式
    hdmc: "",  //活动名称
    xmsjh: false, //（不是）项目书计划
    fwdx: false, //（不是）服务对象
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

  onLoad: function(){
    console.log(this);
    var worker = wx.getStorageSync('worker');
    if(worker){
      console.log("LLLL");
      this.setData({
        indexOrganization: worker.indexOrganization,
        showOther: worker.showOther,  //是否展示other这个输入框
        
        beginTime: worker.beginTime,
        endTime: worker.endTime,
        date: worker.date, //跟访日期


        zzmc: worker.zzmc, //
        sssq: worker.sssq, //所属社区
        gfdd: worker.gfdd, //跟访地点
        gfrxm: worker.gfrxm, //跟访人姓名
        hdrs: worker.hdrs, //活动人数
        gfxs: worker.gfxs, //跟访形式
        hdmc: worker.hdmc,  //活动名称
        xmsjh: worker.xmsjh, //（不是）项目书计划
        fwdx: worker.fwdx, //（不是）服务对象
        hdmb: worker.hdmb, //活动目标
        hdlc: worker.hdlc, //活动流程
        yd: worker.yd,   //优点
        qd: worker.qd, //缺点
        yhjy: worker.yhjy, //优化建议
        grgs: worker.grgs, //个人感受
        zzzxq: worker.zzzxq, //自组织需求
        pykf: worker.pykf, //培育看法
      });
    }
  },

  onUnload: function(){
    console.log("leave");
    wx.setStorageSync('worker', this.data);
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

  bindOrganizationPickerChange: function(e){
    var index = parseInt(e.detail.value);
    var sssq = this.data.arrayOrganizationLocation[index];
    var zzmc = this.data.arrayOrganizationName[index];
    this.setData({
      zzmc: zzmc,
      indexOrganization: index,
      sssq: sssq
    });
  },

  //修改开始时间  
  bindBeginTimeChange: function (e) {
    this.setData({
      beginTime: e.detail.value
    })
  },
  //修改结束时间时间 
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
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
      if (key == "beginTime" && this.data[key] =="请选择开始时间"){
        wx.showToast({
          title: "请选择开始时间"
        });
        return false;
      }

      if (key == "endTime" && this.data[key] == "请选择结束时间") {
        wx.showToast({
          title: "请选择结束时间"
        });
        return false;
      }

      if (key == "date" && this.data[key] == "请选择日期") {
        wx.showToast({
          title: "请选择日期"
        });
        return false;
      }

      if (key == "zzmc" && this.data[key] == "请点击选择社区名称") {
        wx.showToast({
          title: "请选择社区名称"
        });
        return false;
      }

      if (this.data[key] == [] || this.data[key] == "") {
        wx.showToast({
          title: key + " 还没有填写，请补充完整后再提交"
        });
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
        hdrs: that.data.hdrs, //活动人数
        gfrq: that.data.gfrq, //跟访日期
        beginTime: that.data.beginTime, //开始时间
        endTime: that.data.endTime, //结束时间
        zzmc: that.data.zzmc, //组织名称
        sssq: that.data.sssq, //所属社区
        gffd: that.data.gffd, //跟访地点
        gfrxm: that.data.gfrxm, //跟访人姓名
        gfxs: that.data.gfxs, //跟访形式
        hdmc: that.data.hdmc,  //活动名称
        xmsjh: that.data.xmsjh, //（有）项目书计划
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
        'gfrq': that.data.gfrq, 
        'beginTime': that.data.beginTime,
        'endTime': that.data.endTime,
        'date':that.data.date,
        'hdmc':that.data.hdmc,
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
          });
          wx.showToast({
            title: that.data.gfrxm+"已成功提交本次填写",
          })
        }
        else {  //递归调用uploadDIY函数
          console.log(i);
          this.uploadDIY(filePaths, successUp, failUp, i, length);
        }
      },
    });
  },

  dateChange: function(e){
    console.log(e.detail.value);
    this.setData({
      date: e.detail.value
    });      
  },

  pykfChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      pykf: e.detail.value
    });
  },

  gfxsChange: function(e){
    console.log(e.detail.value);
    this.setData({
      gfxs: e.detail.value
    });
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

  hdmcChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      hdmc: e.detail.value
    })
  },

  hdrsChange: function (e) {
    console.log(e.detail.value);
    this.setData({
      hdrs: e.detail.value
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

  //是否在项目书计划
  radioxmsjhChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioxmsjhItems;

    for (var i = 0, len = radioItems.length; i < len; ++i) {
      console.log(typeof(radioItems[i].value));
      console.log(typeof(e.detail.value));
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    
    this.setData({
      xmsjh: e.detail.value,
      radioxmsjhItems: radioItems
    });
  },

  //是否为服务对象
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

  //跟访形式的选择
  radiogfxsChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    //如果选择是’其他‘值，则把输入框设置为显示  
    if (e.detail.value=="其他"){
      console.log("show other");
      this.setData({
        showOther: "inline"
      });
    }else{
      //未选中‘其他’，隐藏输入框
      console.log("hide other");
      this.setData({
        showOther: "none"
      });
    }

    //根据序号把选中的框
    var radioItems = this.data.radiogfxsItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      gfxs: e.detail.value,
      radiogfxsItems: radioItems
    });
  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
  
});