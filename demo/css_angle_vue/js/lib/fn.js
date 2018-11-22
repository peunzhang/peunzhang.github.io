//匹配过滤无效值
let matchWidthValue = function(widthValue){
	let matchWidthValueMatch = widthValue.match(/^(\d+(px|rem|em|pt|pc|%|in|cm|mm)\s*){1,4}$/g);
	if(!matchWidthValueMatch){
		return true
	}
}
//匹配过滤无效颜色值
let matchColorValue = function(ColorValue){
	let match16 = ColorValue.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^(red|blue|yellow|orange|purple|green|black|white|gray|pink|brown)$)/g);
	let matchRGB = ColorValue.match(/^[rR][gG][bB][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[\)]$/g);
	let matchRGBA = ColorValue.match(/^[rR][gG][bB][aA][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,2})|[01])\s*[\)]$/g);
	if (!(match16 || matchRGB || matchRGBA)) { 
		return true
    }
}

//操作提示
let tips = function(that,text){
	that.isShowTips = true;
	that.isShowTipsText = text;
	setTimeout(function(){
		that.isShowTips = false;
		that.isShowTipsText = '';
	},1000)
}

export {matchWidthValue, matchColorValue,tips};