//操作提示
let tips = function(that,text){
	that.isShowTips = true;
	that.isShowTipsText = text;
	setTimeout(function(){
		that.isShowTips = false;
		that.isShowTipsText = '';
	},1000)
}

export {tips};