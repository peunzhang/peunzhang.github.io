import {matchColorValue,RGB2Hex,Hex2RGB,Hex2RGBA,tips} from './lib/fn.js'


var app = new Vue({
	el: '.wrap',
	data: {
		colorValue: '',
		colorIsActive: false,
		resultValue: '',
		resultValue2: '',
		isShowTips : false,
        isShowRGBA : false
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
			if(matchColorValue(colorValue) === "isHEX"){
				that.resultValue = Hex2RGB(colorValue);
				that.isShowRGBA = true;
                that.resultValue2 = Hex2RGBA(colorValue);
			}
			else if(matchColorValue(colorValue) === "isRGB"){
				that.resultValue = RGB2Hex(colorValue)
                that.isShowRGBA = false;
			}
            else if(matchColorValue(colorValue) === "isRGBA"){
                tips(that,'RGBA不能转换为HEX');
                that.isShowRGBA = false;
            }
			else{
				tips(that,'您输入的颜色值有误')
                that.isShowRGBA = false;
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

