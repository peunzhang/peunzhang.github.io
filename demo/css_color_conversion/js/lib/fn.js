//匹配颜色值
let matchColorValue = function(ColorValue){
	let match16 = ColorValue.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)/g);
	let matchRGB = ColorValue.match(/^[rR][gG][bB][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[\)]$/g);
	let matchRGBA = ColorValue.match(/^[rR][gG][bB][aA][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,2})|[01])\s*[\)]$/g);
	if (match16) { 
		return 'isHEX'
    }
    else if(matchRGB){
		return 'isRGB'
    }
    else if(matchRGBA){
        return 'isRGBA'
    }
}
//rgb转hex
let RGB2Hex = function(rgb) {
    let color = rgb.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i=0; i<color.length; i++) {
        let hex = Number(color[i]).toString(16);
        if (hex.length < 2) {
            hex = '0' + hex;
        }
        strHex += hex;
    }
    return strHex;
}

//hex转rgb || hex转rgba
let hex2rgbString = function(hex){
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
    return colorChange.join(",");
}
let Hex2RGB = function(hex){
    return "rgb(" + hex2rgbString(hex) + ")";
};
//hex转rgb
let Hex2RGBA = function(hex){
    return "rgba(" + hex2rgbString(hex) + ",1)";
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

export {matchColorValue, RGB2Hex, Hex2RGB, Hex2RGBA, tips};