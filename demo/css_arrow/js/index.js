$(function(){
	let cssText;                               //插入到页面style的css的样式
	let temporaryStyle = $("#temporaryStyle"); //插入到页面style的css的ID
	let cssTextValue;                          //生成给用户复制的css样式
	let figureStyle = $("#figureStyle");         //输出给用户复制代码的DOM节点
	let arrowSize;                             //用户自定义的箭头的长度
	let arrowWidth;                            //用户自定义的箭头的厚度
	let arrowColor;                            //用户自定义的箭头的颜色
	let figure = $(".figure");                   //输出图形和样式的父节点
	let figureUi = $("#figureUi");               //输出图形的DOM节点
    
	//初始化重置
	let reset = function(){
		cssText = "";
        cssTextValue = "";
		$(document).find("#temporaryStyle").remove();
		figureUi.children().remove();
		figure.addClass("hidden");
		figureStyle.children().addClass("hide");
	}
	//操作提示
	let log = function(text){
		$("body").find(".tips").remove().end().append(`<div class='tips'>${text}</div>`);
		setTimeout(function(){
			$(".tips").fadeOut(1000);
		},1000)
	}
	//匹配过滤无效值
	let matchWidthValue = function(value){
		let matchValueMatch = value.match(/^(\d+(px|rem|em|pt|pc|%|in|cm|mm)\s*)$/g);
		if(!matchValueMatch){
			log("输入单位错误");
			return false;
		}
	}
	//匹配过滤无效颜色值
	let matchColorValue = function(ColorValue){
		let match16 = ColorValue.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^(red|blue|yellow|orange|purple|green|black|white|gray|pink|brown)$)/g);
		let matchRGB = ColorValue.match(/^[rR][gG][bB][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[\)]$/g);
		let matchRGBA = ColorValue.match(/^[rR][gG][bB][aA][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,2})|[01])\s*[\)]$/g);
		if (!(match16 || matchRGB || matchRGBA)) { 
			log("color值错误");
	    } 
	}	
	//生成图形和样式
	let generate = function(){
		reset();

		arrowSize = $("#arrowSize").val();
		arrowWidth = $("#arrowWidth").val();
		arrowColor = $("#arrowColor").val();
		if(matchWidthValue(arrowSize) == false) return
		else if(matchWidthValue(arrowWidth) == false) return
		else if(matchColorValue(arrowColor) == false) return
		
		let figureBaseStyle = `display:inline-block;border-style:solid;width:${arrowSize};height:${arrowSize};border-width:${arrowWidth} ${arrowWidth} 0 0;border-color:${arrowColor};`
		let figureExtendStyle = {
	        top : `transform: matrix(0.71,-0.71,0.71,0.71,0,0)`,
	        right : `transform: matrix(0.71,0.71,-0.71,0.71,0,0)`,
	        bottom : `transform: matrix(-0.71,0.71,-0.71,-0.71,0,0)`,
	        left : `transform: matrix(-0.71,-0.71,0.71,-0.71,0,0)`
	    }
		for(let i in figureExtendStyle){
			//生成图形节点
			$(`<li class='${i}'><strong></strong></li>`).appendTo(figureUi);
			//生成图形节点对应的样式
			cssText += `.figure-ui .${i} strong{${figureBaseStyle}${figureExtendStyle[i]}}\n`;

			//生成[可复制样式的代码]
			cssTextValue = `.arrow_${i}{\n\t${(figureBaseStyle + figureExtendStyle[i]).replace(/;/g,";\n\t")}\n}`;
			//生成[可复制样式的代码]对应的节点
			$(`<li class='${i} hide'><pre data-clipboard-text='${cssTextValue}'>${cssTextValue}</pre><a href='javascpipt:;' class='copy'>复制代码</a></li>`).appendTo(figureStyle);

		}
		//把【生成图形节点对应的样式】插入到页面中
		$("head").append($(`<style type='text/css' id='temporaryStyle'>${cssText}</style>`));
		figure.removeClass("hidden");
	}
	//生成代码
	$(document).on("click", '#figureUi li', function(){
		let index = $(this).index();
		$(this).siblings().removeClass("on").end().addClass("on");
		$(".figure-style li").addClass("hide");
		$(".figure-style li").eq(index).removeClass('hide');
	})
	//复制
	let clipboardText = new Clipboard('.copy',{
        target: function(trigger) {
            return trigger.previousElementSibling;
        }
    });
    clipboardText.on('success', function(e) {
        log("☺ 复制成功");
    });
    clipboardText.on('logor', function(e) {
        log("浏览器不支持复制");
    });
	//生成
	$("#btnGenerate").on("click",function(){
		generate();
    })

    //表单操作
	$(".ico-clear").on("click",function(){
		$(this).prev().val("");
		$(this).parent().removeClass("show-clear");
	})
	$(".text").on("blur",function(){
		$(this).val($(this).val().trim());//自动删除字符串左右两端的空格
	})
	$(".text").on("keyup",function(){
		if($(this).val().length){
			$(this).parent().addClass("show-clear");
			// $(this).zclip('show');
		}
		else{
			$(this).parent().removeClass("show-clear");
		}
	})
    $(".text").on("keydown",function(e){
		if (e.keyCode == 13) {
			$(".text").each(function(){
				$(this).val($(this).val().trim());
			 });
            generate();
 		}
    })  
})