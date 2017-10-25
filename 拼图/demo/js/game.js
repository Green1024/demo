window.onload = function(){
	//获取背景音乐
	var bgm = document.getElementById('bgm');
	bgm.volume -= 0.8;
	//获取元素
	var showF = document.getElementById('show-font');
	var photo = document.getElementById('photo');
	var obtn = document.getElementById('star');
	var auo = document.getElementById('auo');

	//显示图片
	for(var i = 1; i<=16; i++){
		//创建div元素
		var s_photo = document.createElement("div");
		//给创建的div元素加class
		s_photo.className = "photot" + " position_" +i;
		//把新建的div元素添加到photo中
		photo.appendChild(s_photo);
		//给div元素加id
		s_photo.id = "position_" +i;
		//点击图片触发事件
		
		//给点击的图片加点击声音
		var countFlag=0;
		var countTimer=0;
		//定时器
		function delay(){
			countTimer=setInterval(function(){
				//暂停音乐
				auo.pause();
				//停止音乐
				auo.currentTime = 0;
			},800);
		}
		s_photo.onclick = function(){
//			清除定时器
			clearInterval(countTimer);
//			播放音乐
			auo.play();
			delay();
			var whiteK = document.getElementById('position_16');
			var white_left = whiteK.offsetLeft;
			var white_top = whiteK.offsetTop;
			var left = this.offsetLeft;
			var top = this.offsetTop;
//					alert(white_left)
//					alert(left)
			//判断点击的图片是否与白色块是相邻的位置（取他们的绝对值abs()）
			if((Math.abs(white_left-left) == 85 && white_top == top)||
			    Math.abs(white_top-top) == 85 && white_left == left){
			    	//保存白块的样式
					var str = whiteK.className;
					//把白块的样式和当前点击图片的样式互换
					whiteK.className = this.className;
					this.className = str;
					jiance();
			}
			    
		}
		
	}

	//开始按钮点击事件
	obtn.onclick = function(){
		var arr = [];
		for(i = 0; i < 15; i++){
			arr[i] = i+1;
//					alert(arr[i])
		}
		//给数组进行随机数排序
		arr.sort(function(){
			return 0.5-Math.random();
		});
//				alert(arr)
//				通过更改类名来改变位置 
		var jihe = document.getElementById('photo').children;
	    for (var i = 0 ; i < 15; i++) {
	        jihe[i].className = "photot" + " position_" + arr[i];
	    }
	    
	}
	//是否完成拼图
	//获取小div的，小div的class如果等于我最初设置的样式，就代表过关了。
	function jiance() {
	    for (var i = 1; i <= 16; i++) {
	        var item = document.getElementById("position_"+i);
	        if (item.className != "photot" +" position_"+i) {
	            document.getElementById("show-font").innerText = "加油！！！";
	            return;
	        }else{
	        	
	        	document.getElementById("show-font").innerText = "恭喜你，过关了!";
	        }
	    }
	    alert('恭喜你，完成拼图！！！')
	}

}