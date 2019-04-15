//全局函数/变量
export default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    }

    //Vue.prototype.DocConfig = {
     // "server":'http://127.0.0.1/showdoc.cc/server/index.php?s=',
      //"server":'../server/index.php?s=',
    //}
    Vue.prototype.request = function(){

    }

    Vue.prototype.getRootPath = function(){
        return window.location.protocol +'//' +window.location.host + window.location.pathname
    }

    /*判断是否是移动设备*/
    Vue.prototype.isMobile = function (){
      return navigator.userAgent.match(/iPhone|iPad|iPod|Android|android|BlackBerry|IEMobile/i) ? true : false;
    }

    Vue.prototype.get_user_info = function(callback){
        var that = this ;
        var url = DocConfig.server+'/api/user/info';
        var params = new URLSearchParams();
        params.append('redirect_login', false);
        that.axios.post(url, params)
          .then(function (response) {
            if (callback) {callback(response);};
          });
    }

    Vue.prototype.get_notice = function(callback){
        var that = this ;
        var url = DocConfig.server+'/api/notice/getList';
        var params = new URLSearchParams();
        params.append('notice_type', 'unread');
        params.append('count', '1');
        that.axios.post(url, params)
          .then(function (response) {
            if (callback) {callback(response);};
          });
    }

    /**
     * 获取 blob
     * @param  {String} url 目标文件地址
     * @return {Promise}
     */
    Vue.prototype.getBlob = function (url) {
      return new Promise(resolve => {
          const xhr = new XMLHttpRequest();

          xhr.open('GET', url, true);
          xhr.responseType = 'blob';
          xhr.onload = () => {
              if (xhr.status === 200) {
                  resolve(xhr.response);
              }
          };

          xhr.send();
      });
    }

    /**
    * 保存
    * @param  {Blob} blob
    * @param  {String} filename 想要保存的文件名称
    */
   Vue.prototype.saveAs = function (blob, filename) {
      if (window.navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, filename);
      } else {
          const link = document.createElement('a');
          const body = document.querySelector('body');

          link.href = window.URL.createObjectURL(blob);
          link.download = filename;

          // fix Firefox
          link.style.display = 'none';
          body.appendChild(link);

          link.click();
          body.removeChild(link);

          window.URL.revokeObjectURL(link.href);
      }
    }

    /**
    * 下载
    * @param  {String} url 目标文件地址
    * @param  {String} filename 想要保存的文件名称
    */
   Vue.prototype.download = function(url, filename) {
      this.getBlob(url).then(blob => {
          this.saveAs(blob, filename);
      });
    }
  }
}
