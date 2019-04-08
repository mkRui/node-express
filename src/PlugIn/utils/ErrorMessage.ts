/**
 * 抛出错误 模板信息
 * 
 * @param {code} 错误信息状态码
 * 
 * @param {message} 错误提示信息
 */

 export default class ErrorMessgae {
    private codeNumber: number
    private messageString: string

    constructor (code: number, message: string) {
        this.codeNumber = code;
        this.messageString = message;
    }

    getStatus () {
        return this.codeNumber
    }

    message () {
        return this.messageString
    }
 }