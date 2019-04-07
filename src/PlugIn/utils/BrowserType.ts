/**
 *  判断浏览器类型
 *  @class BorwserType
 *  @param {string} userAgentParam
 */
export default function getExploreName (userAgentParam: string): string {
  var userAgent = userAgentParam;
  if(userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
    return 'Opera';
  }else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
    return 'IE';
  }else if(userAgent.indexOf("Edge") > -1){
    return 'Edge';
  }else if(userAgent.indexOf("Firefox") > -1){
    return 'Firefox';
  }else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
    return 'Safari';
  }else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
    return 'Chrome';
  }else{
    return 'Unkonwn';
  }
}