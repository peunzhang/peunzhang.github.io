$(function(){
	let cssText;                               //插入到页面style的css的样式
	let temporaryStyle = $("#temporaryStyle"); //插入到页面style的css的ID
	let cssTextValue;                          //生成给用户复制的css样式
	let angleStyle = $("#angleStyle");         //输出给用户复制代码的DOM节点
	let borderWidthValue;                      //用户自定义的border-width的值
	let borderColorValue;                      //用户自定义的border-color的值
	let angle = $(".angle");                   //输出图形和样式的父节点
	let angleUi = $("#angleUi");               //输出图形的DOM节点
    
	//初始化重置
	let reset = function(){
		cssText = "";
        cssTextValue = "";
		$(document).find("#temporaryStyle").remove();
		angleUi.children().remove();
		angle.addClass("hidden");
		angleStyle.children().remove();
	}
	//操作提示
	let log = function(text){
		$("body").find(".tips").remove().end().append(`<div class='tips'>${text}</div>`);
		setTimeout(function(){
			$(".tips").fadeOut(1000);
		},1000)
	}
	//匹配过滤无效值
	let matchWidthValue = function(widthValue){
		let matchWidthValueMatch = widthValue.match(/^(\d+(px|rem|em|pt|pc|%|in|cm|mm)\s*){1,4}$/g);
		if(!matchWidthValueMatch){
			log("width值不合法");
			return false;
		}
		let widthValueArrayLen = widthValue.split(/\s+/g).length;
		if(widthValueArrayLen > 1 && widthValueArrayLen < 5){
			$(".angle-ui li:gt(3)").remove();
		}
	}
	//匹配过滤无效颜色值
	let matchColorValue = function(ColorValue){
		let match16 = ColorValue.match(/(^#[0-9a-fA-F]{3}$)|(^#[0-9a-fA-F]{6}$)|(^(red|blue|yellow|orange|purple|green|black|white|gray|pink|brown)$)/g);
		let matchRGB = ColorValue.match(/^[rR][gG][bB][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){2}\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*[\)]$/g);
		let matchRGBA = ColorValue.match(/^[rR][gG][bB][aA][\(](\s*(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\s*,){3}\s*((0?\.[1-9]{1,2})|[01])\s*[\)]$/g);
		if (!(match16 || matchRGB || matchRGBA)) { 
			log("color值不合法");
	    } 
	}	
	//生成图形和样式
	let generate = function(){
		reset();

		borderWidthValue = $("#borderWidth").val();
		borderColorValue = $("#borderColor").val();
		if(matchWidthValue(borderWidthValue) == false) return;
		else if(matchColorValue(borderColorValue) == false) return;
		
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
		for(let i in angleExtendStyle){
			//生成图形节点
			$(`<li class='${i}'><strong></strong></li>`).appendTo(angleUi);
			//生成图形节点对应的样式
			cssText += `.angle-ui .${i} strong{${angleExtendStyle[i]}}\n`;

			//生成[可复制样式的代码]
			cssTextValue = `.ico-angle{\n\t${(angleBaseStyle + angleExtendStyle[i]).replace(/;/g,";\n\t")}\n}`;
			//生成[可复制样式的代码]对应的节点
			$(`<li class='${i} hide'><pre data-clipboard-text='${cssTextValue}'>${cssTextValue}</pre><a href='javascpipt:;' class='copy'>复制代码</a></li>`).appendTo(angleStyle);

		}
		//把【生成图形节点对应的样式】插入到页面中
		$("head").append($(`<style type='text/css' id='temporaryStyle'>${cssText}</style>`));

		let angleUiLiMaxWidth = Math.max($("#angleUi li").width(),$("#angleUi li").height());
		$("#angleUi li").width(angleUiLiMaxWidth);
		$("#angleUi li").height(angleUiLiMaxWidth);

		angle.removeClass("hidden");
	}
	//生成代码
	$(document).on("click", '#angleUi li', function(){
		let index = $(this).index();
		$(this).siblings().removeClass("on").end().addClass("on");
		$(".angle-style li").addClass("hide");
		$(".angle-style li").eq(index).removeClass('hide');
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
    clipboardText.on('error', function(e) {
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