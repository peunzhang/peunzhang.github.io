import {tips} from './lib/fn.js'
import {cssbeautify} from '../../js/cssbeautify.js'


var app = new Vue({
	el: '.wrap',
	data: {
		textValue: '',
		isActive: false,
		resultValue: '',
		resultValue2: '',
		isShowTips : false
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
			if(textValue.length > 0){
                that.resultValue = cssbeautify(textValue,{
                    indent: '  ',
                    openbrace: 'end-of-line',
                    autosemicolon: true
                });
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

