<template>
	<div  class="lt-full zmiti-index-main-ui "  :class="{'show':show}">
		<div class="zmiti-leaf">
			<img :src="imgs.leaf1" alt="">
		</div>
		<div class="zmiti-leaf zmiti-leaf1">
			<img :src="imgs.leaf2" alt="">
		</div>

		<section class="lt-full">
			<div class="zmiti-title">
				<img :src="imgs.title" alt="">
				
			</div>

			<div class="zmiti-border">
				<img :src="imgs.border" alt="">
				<div class="zmiti-xdd" :style="{WebkitTransform:'translate3d('+transX+'px,'+transY+'px,0)'}">
					<img :src="imgs.xdd" alt="">
				</div>
			</div>

			<div class="zmiti-index-bottom">
				<div class="zmiti-btn2">
					<img :src="imgs.btn2" alt="">
					<span>跟着总书记去种树</span>
				</div>
				<div class="zmiti-logo">
					<img :src="imgs.logo" alt="">
					<span>新华社新媒体中心</span>
				</div>
			</div>
		</section>
		
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import '../lib/html2canvas';
	import $ from 'jquery';
	import Toast from '../toast/toast';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				show:true,
				toastMsg:'',
				showBtns:false,
				showMasks:false,
				transX:0,
				transY:0,
				createImg:'',
			}
		},
		components:{
			 Toast
		},
		
		methods:{
			
			toast(msg='提交成功',time=2000){
				this.toastMsg = msg;
				setTimeout(()=>{
					this.toastMsg = '';
				},time)
			},
			
			numstart(){
				//this.num =  1;
			},
			hideMask(){
				this.showMasks = false;
			},
			showMask(){
				this.showMasks = true;
			},
			restart(){
				window.location.href = window.location.href.split('?')[0];
			},
			afterEnter(){
				this.showBtns = true;
			},
			html2img(){
				var s = this;
				var {obserable} = this;
				setTimeout(()=>{

					var ref = 'zmiti-cache-page';
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var url = canvas.toDataURL();
					        $.ajax({
					          //url: window.protocol+'//api.zmiti.com/v2/share/base64_image/',
					          url:window.protocol+'//'+window.server+'.zmiti.com/v2/share/base64_image/',
					          type: 'post',
					          data: {
					            setcontents: url,
					            setwidth: dom.clientWidth,
					            setheight:dom.clientHeight
					          },
					          success: function(data) {
					          	//alert('data.getret =>'+data.getret)
					            if (data.getret === 0) {
					            	//s.deleteImg(dt.img);
					              var src = data.getimageurl;
					             	s.createImg = src;
	
									var url = window.location.href.split('#')[0];

									url = zmitiUtil.changeURLPar(url,'src',src);
									url = zmitiUtil.changeURLPar(url,'num',s.num);
									zmitiUtil.wxConfig('做新时代雷锋，今年我要做'+s.num+'件好事，立此存证',window.desc,url)
								       
					            }

					          }
					        })

					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},100)
			} 
			
			
		},
		mounted(){

			var {obserable} = this;



			obserable.on('showIndexApp',(data)=>{
				this.show = true;
				if(data){
					this.createImg = data.src;
					this.src = data.src;
					this.num = data.num;

					var url = window.location.href.split('#')[0];

						url = zmitiUtil.changeURLPar(url,'src',this.src);
						url = zmitiUtil.changeURLPar(url,'num',this.num);
						zmitiUtil.wxConfig('做新时代雷锋，今年我要做'+this.num+'件好事，立此存证',window.desc,url)
				}
			})

			var s = this;
 			window.addEventListener("deviceorientation", function(event) {
			      
			      document.title = (event.alpha|0 )+ ',' + (event.beta|0 )+ ','+(event.gamma|0);

			      var x =  event.gamma|0,
			      	  y = event.beta|0;

			      if(x<-15){
			      	x=-15;
			      }
			      if(x>15){
			      	x=15
			      }
			      if(y<-10){
			      	y=-10;
			      }
			      if(y>10){
			      	y=10
			      }
			      s.transX = x;
			      s.transY = y;





			      

			}, true);

		}
	}
</script>