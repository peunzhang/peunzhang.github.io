//匹配颜色值并过滤无效颜色
let matchColorValue = function(ColorValue){
	let match16 = ColorValue.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^(red|blue|yellow|orange|purple|green|black|white|gray|pink|brown)$)/g);
	let matchRGB = ColorValue.match(/^[rR][gG][bB][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[\)]$/g);
	// let matchRGBA = ColorValue.match(/^[rR][gG][bB][aA][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,2})|[01])\s*[\)]$/g);
	if (match16) { 
		return 'is16'
    }
    else if(matchRGB){
		return 'isRGB'
    }
}
//rgb转16进制
let RGB2Hex = function(RGB) {
	let rgb = RGB.split(',');
	let r = parseInt(rgb[0].split('(')[1]);
	let g = parseInt(rgb[1]);
	let b = parseInt(rgb[2].split(')')[0]);
	let hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	return hex;
}
//16进制转rgb
let Hex2RGB = function(hex){
    let color = hex.toLowerCase();
	// 处理三位的颜色值
    if (color.length === 4) {
        let colorNew = "#";
        for (let i=1; i<4; i+=1) {
            colorNew += color.slice(i, i+1).concat(color.slice(i, i+1));    
        }
        color = colorNew;
    }
    let colorChange = [];
    for (let i=1; i<7; i+=2) {
        colorChange.push(parseInt("0x"+color.slice(i, i+2)));    
    }
    return "rgb(" + colorChange.join(",") + ")";
};
//操作提示
let tips = function(that,text){
	that.isShowTips = true;
	that.isShowTipsText = text;
	setTimeout(function(){
		that.isShowTips = false;
		that.isShowTipsText = '';
	},1000)
}

export {matchColorValue, RGB2Hex,Hex2RGB, tips};