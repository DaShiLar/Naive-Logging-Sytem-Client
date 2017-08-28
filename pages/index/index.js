Page({
  data: {
    files: [],
    FilePaths: [],
    date: "",
    location: "",
    organization: "",
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
        that.data.FilePaths.push(tempFilePathDic);
      }
    })
  },

  //上传微创投表
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
        that.data.FilePaths.push(tempFilePathDic);
      }
    })
  },

  uploadDIY(filePaths, successUp, failUp, i, length) {
    var that = this;
    wx.uploadFile({
      url: 'https://45053688.hazelnutsgz.com:444/api/upload',
      filePath: filePaths[i]['path'],
      name: 'file',
      formData: {
        'date': that.data.date,
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


  submitImages: function(){
    var successUp = 0; //成功个数
    var failUp = 0; //失败个数
    var length = this.data.FilePaths.length; //总共个数
    var i = 0; //第几个
    this.uploadDIY(this.data.FilePaths, successUp, failUp, i, length);
  },




  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  }
});