import {matchWidthValue,matchColorValue,tips} from './lib/fn.js'


var app = new Vue({
	el: '.wrap',
	data: {
		borderWidthValue: '10px',
		borderWidthValueLen: 1,
		borderColorValue: '#A5C3FF',
		borderWidthIsActive: true,
		borderColorIsActive : true,

		isShowAngle : false,
		isShowTips : false,
		isShowTipsText : '',
		angleUi :[],
		angleStyle :[],
	},
	methods: {
		blurWidthFn: function() {
			this.borderWidthIsActive = this.borderWidthValue.length > 0 ? true : false;
		},
		blurColorFn: function() {
			this.borderColorIsActive = this.borderColorValue.length > 0 ? true : false;
		},
		clearWidthValue : function(){
			this.borderWidthValue = '';
			this.borderWidthIsActive = false;
		},
		clearColorValue : function(){
			this.borderColorValue = '';
			this.borderColorIsActive = false;
		},
		getBorderWidthValueLen : function(){
			let that = this;
			let borderWidthValueLen = that.borderWidthValue.split(/\s+/g).length;
			if(borderWidthValueLen >1 && borderWidthValueLen <5){
				return 4;
			}
			else if(borderWidthValueLen == 1){
				// angleLen  = Object.keys(angleExtendStyle).length
				return 8;
			}
		},
		//生成图形和代码 处理用户输入的值
		checkValue : function(){
			let that = this;
			let borderWidthValue = that.borderWidthValue;
			let borderColorValue = that.borderColorValue;
			let borderWidthValueLen = that.borderWidthValueLen;
			let angleLen  = that.getBorderWidthValueLen();
			//清空数据
			that.angleUi = [];
			that.angleStyle = [];
			if(matchWidthValue(borderWidthValue) || borderWidthValueLen > 4){
				tips(that,'width值输入错误')
				return
			}else if(matchColorValue(borderColorValue)){
				tips(that,'color值输入错误')
				return
			}
			that.isShowAngle = true;
			let angleBaseStyle = "display:inline-block;width:0;height:0;overflow:hidden;font-size:0;";
			let angleExtendStyle = {
				a : `border-width:${borderWidthValue};border-color:${borderColorValue} transparent transparent transparent;border-style:solid dashed dashed dashed`,
				b : `border-width:${borderWidthValue};border-color:transparent ${borderColorValue} transparent transparent;border-style:dashed solid dashed dashed`,
				c : `border-width:${borderWidthValue};border-color:transparent transparent ${borderColorValue} transparent;border-style:dashed dashed solid dashed`,
				d : `border-width:${borderWidthValue};border-color:transparent transparent transparent ${borderColorValue};border-style:dashed dashed dashed solid`,
				e : `border-left:${borderWidthValue} solid ${borderColorValue};border-top:${borderWidthValue} dashed transparent`,
				f : `border-left:${borderWidthValue} solid ${borderColorValue};border-bottom:${borderWidthValue} dashed transparent`,
				g : `border-right:${borderWidthValue} solid ${borderColorValue};border-top:${borderWidthValue} dashed transparent`,
				h : `border-right:${borderWidthValue} solid ${borderColorValue};border-bottom:${borderWidthValue} dashed transparent`
			}
			
			let index = 0;
			for(let i in angleExtendStyle){
				if(index < angleLen){
					//生成[图形节点和对应的样式]
					Vue.set(that.angleUi, index, {
						class: {
							base : i,
							state : ''
						},
						info: i,
						number: index,
						style : angleBaseStyle + angleExtendStyle[i]
					})
					//生成[可复制样式的节点和代码]
					Vue.set(that.angleStyle, index, {
						isShowAngleStyle : false,
						class: i,
						info: i,
						cssTextValue : `.ico-angle{\n\t${(angleBaseStyle + angleExtendStyle[i]).replace(/;/g,";\n\t")}\n}`
					})
					++ index
				}
			}
		},
		getAngleUiLi : function(number){
			// console.info(number);
			let that = this;
			let angleLen  = that.getBorderWidthValueLen();
			for(let i = 0;i < angleLen;i++){
				if(i == number){
					that.angleUi[i].class.state = 'on';
					that.angleStyle[i].isShowAngleStyle = true;
				}else{
					that.angleUi[i].class.state = '';
					that.angleStyle[i].isShowAngleStyle = false;
				}
			}
			that.copyAngleStyle();
		},
		copyAngleStyle : function(){
			//复制
			let that = this;
			let clipboardText = new Clipboard('.copy',{
			    target: function(trigger) {
			        return trigger.previousElementSibling;
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

