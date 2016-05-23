(function(){
	var layouts = function(){
		this.container = document.getElementById('container');
		this._width = 800;
		this._height = 450;
	}
	layouts.prototype = {
		init : function(x){
			var size = this.sizes()[x-1];
			// document.getElementsByTagName('body')[0].appendChild(this['galleryFactory'](size,x));
			this.container.appendChild(this['galleryFactory'](size,x));
		},
		galleryFactory : function(size,x){
			layout = document.createElement('div');
			layout.className = 'layout layout'+x;
			for(var i  = 0;i<size.length;i++){
				var img = document.createElement('img');
				img.src=layouts.photos[i];
		    	img.style.width = size[i].width+'px';
		    	img.style.height = size[i].height+'px';
		   	    layout.appendChild(img);
			}
		    return layout;
		},
		sizes : function(){
			return size = [
				[	
					{
					width:this._width,
					height:this._height
					}
				],
				[	
					{
						width:this._width,
						height:this._height
					},
					{
						width:this._width,
						height:this._height
					}
				],
				[	
					{
						width:this._width-this._height/2,
						height:this._height
					},
					{
						width:this._height/2,
						height:this._height/2
					},
					{
						width:this._height/2,
						height:this._height/2
					}
				],
				[	
					{
						width:this._width/2,
						height:this._height/2
					},
					{
						width:this._width/2,
						height:this._height/2
					},
					{
						width:this._width/2,
						height:this._height/2
					},
					{
						width:this._width/2,
						height:this._height/2
					}
				],
				[	
					{
						width:this._width/3*2,
						height:this._height/3*2
					},
					{
						width:this._width/3,
						height:this._width/3
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height-this._width/3
					}
				],
		    [	
					{
						width:this._width/3*2,
						height:this._height/3*2
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height/3
					},
					{
						width:this._width/3,
						height:this._height/3
					}
				],
			]
		}
	}
	layouts.photos = ['img/1.jpg','img/2.jpg','img/3.jpg',
	'img/5.jpg','img/6.jpg','img/7.jpg'];
	window.layouts = new layouts();
})();