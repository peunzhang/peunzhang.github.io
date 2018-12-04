import {matchColorValue,RGB2Hex,Hex2RGB,tips} from './lib/fn.js'


var app = new Vue({
	el: '.wrap',
	data: {
		colorValue: 'rgb(255,13,1)',
		colorIsActive: true,
		resultValue: '#ff0d01',
		isShowTips : false,
		isShowCopyBtn : false,
	},
	methods: {
		blurColorFn: function() {
			this.colorIsActive = this.colorValue.length > 0 ? true : false;
		},
		clearColorValue : function(){
			this.colorValue = '';
			this.colorIsActive = false;
		},
		//转换
		converValue : function(){
			let that = this;
			let colorValue = that.colorValue;

			//检查色值
			if(matchColorValue(colorValue) === "is16"){
				that.resultValue = Hex2RGB(colorValue)
				that.isShowCopyBtn = true
			}
			else if(matchColorValue(colorValue) === "isRGB"){
				that.resultValue = RGB2Hex(colorValue)
				that.isShowCopyBtn = true
			}
			else{
				tips(that,'您输入的颜色值有误')
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
			clipboardText.on('logor', function(e) {
			    tips(that,'浏览器不支持复制')
			});
		}
	}
})

