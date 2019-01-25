import {tips} from './lib/fn.js'
import {cssbeautify} from '../../js/cssbeautify.js'
import NP from '../../js/number-precision.js'


var app = new Vue({
    el: '.wrap',
    data: {
        textValue: '',
        isActive: false,
        resultValue: '',
        resultValue2: '',
        unitValue : '10',
        isShowTips : false,
        unHandleCheckbox : true
    },
    methods: {
        blurFn: function() {
            this.isActive = this.textValue.length > 0 ? true : false;
        },
        clearValue : function(){
            this.textValue = '';
            this.isActive = false;
        },
        //转换
        converValue : function(){
            let that = this;
            let textValue = that.textValue;
            let unitValue = parseFloat(that.unitValue);
            let matchPositive = /\d+(\.\d+)?/;//正浮点数 + 0
            if(!matchPositive.test(unitValue) || unitValue == 0){
                tips(that,'请输入正确的换算值')
            }
            else if(textValue.length > 0){
                let arr = cssbeautify(textValue,{
                    indent: '  ',
                    openbrace: 'end-of-line',
                    autosemicolon: true
                }).split("\n")

                let _textValue = '';
                for (let i = 0; i < arr.length; i++) {
                    let arrChild = arr[i];
                    _textValue += arrChild.replace(/\d+(\.\d+)?\s*px/, function (value) {
						if (that.unHandleCheckbox) {
                            if (!/border:/ig.test(arrChild)) {
                                return NP.round(parseFloat(value) / unitValue, 4)+ "rem";
                            } else {
                                return value;
                            }
						}
						else{
                            return NP.round(parseFloat(value) / unitValue, 4)+ "rem";
						}

					}) + "\n";


                }
                that.resultValue = _textValue;
            }
            else{
                tips(that,'请粘贴代码')
            }

        },
        copy : function(){
            //复制
            let that = this;
            let clipboardText = new Clipboard('.copy',{
                target: function(trigger) {
                    return trigger;
                }
            });
            clipboardText.on('success', function(e) {
                tips(that,'☺ 复制成功')
            });
            clipboardText.on('error', function(e) {
                tips(that,'浏览器不支持复制')
            });
        }
    }
})

