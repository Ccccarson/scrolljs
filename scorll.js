
	var $scorll=function(){
		this.scorllBox=$('.scorll');//滚动条外盒
		this.content=$('.wrap');//滚动内容
		this.el=$('.scorll span');//滚动条

		var _this=this;
		//初始化
		this.init=function(){
			this.moveS=this.scorllBox.height();//滚动条可移动范围
			this.contentH=this.content.height();//滚动条内容高度
			_this.rate=_this.moveS/_this.contentH;
			_this.scorllBarH=Math.ceil(_this.rate*_this.moveS);
			_this.el.height(_this.scorllBarH);
		}

		//mousedown
		this.el.mousedown(function(e){
			var scorllTop=_this.el.offset().top;
			var tempT=e.pageY-scorllTop;
			function move(e){
				var newTop=e.pageY-_this.scorllBox.offset().top-tempT;
				console.log(e.pageY)
				if(newTop<=0){
					newTop=0;
				}else if(newTop>=_this.moveS-_this.scorllBarH){
					newTop=_this.moveS-_this.scorllBarH;
				}
				var rate=(newTop+_this.scorllBarH)/_this.moveS;
				var boxT=Math.ceil(rate*_this.contentH-_this.moveS)-newTop;
				console.log(boxT)
				_this.el.css('top',newTop);
	            _this.content.css('top', -boxT + 'px');
	            moveT = newTop;
			};
			$(document).on("mousemove", move);
			$(document).mouseleave(function(){	
				$(document).off("mousemove", move);
			})
			$(document).mouseup(function() {
				$(document).off("mousemove", move);
			});
		})

		//mousewheel
		var moveT=0; 
		document.onmousewheel=function(e){
			// console.log(e.deltaY)
			// console.log(e.wheelDelta)
			if(e.deltaY<0||e.wheelDelta>0){
				moveT-=20
				//up
			}else{
				moveT+=20
				//down
			}
			if(moveT<0){
				moveT=0;
			}else if(moveT>_this.moveS-_this.scorllBarH){
				moveT=_this.moveS-_this.scorllBarH;
			}
			_this.el.css('top',moveT)
			var rate=(moveT+_this.scorllBarH)/_this.moveS;
			var boxT=Math.ceil(rate*_this.contentH-_this.moveS)-moveT;
			_this.content.css('top',-boxT+'px')
			// console.log(moveT)
		};
	}