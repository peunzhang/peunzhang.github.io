import {tips} from './lib/fn.js'
import {cssbeautify} from '../../js/cssbeautify.js'


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
            let _string;
            let unitValue = that.unitValue;
            if(textValue.length > 0){
                _string = cssbeautify(textValue,{
                    indent: '  ',
                    openbrace: 'end-of-line',
                    autosemicolon: true
                });

                let arr = _string.split("\n");
                let _string_new = '';
                for (let i = 0; i < arr.length; i++) {
                    let line = arr[i];
                    _string_new += line.replace(/\d+(\.\d+)?\s*px/g, function (px) {
						if (that.unHandleCheckbox) {
                            if (!/border:/ig.test(line)) {
                                return (parseFloat(px) / parseFloat(unitValue)) + "rem";
                            } else {
                                return px;
                            }
						}
						else{
                            return (parseFloat(px) / parseFloat(unitValue)) + "rem";
						}


					}) + "\n";


                }
                that.resultValue = _string_new;
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

