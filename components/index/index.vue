<template>
	<div  class="lt-full zmiti-index-main-ui "  :class="{'show':show}">

		<transition name="zmiti-scale"
			@after-enter="afterEnter"
		 >
		    <div class="zmiti-createimg" v-if='createImg'>
				<img :src="createImg" alt="">
			</div>
		  </transition>
		<div v-if='!createImg'  class="lt-full">
			<canvas ref='canvas' :width='750' :height="1206"></canvas>
		</div>

		<img  class="zmiti-cache-img" :style="{width:width*2+'px',height:height*2+'px'}" :src="imgs.bg" alt="" ref='imgp0'>
		<img @load='initCavnas'  class="zmiti-cache-img" :src="imgs.bg1" alt="" ref='img'>

		<!--message-dialog-->
		
		<Toast :msg='toastMsg'></Toast>
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
				animate:false,
				viewW:750,
				showBtns:false,
				viewH:1206,
				showMasks:false,
				scale:1,
				width:1875,
				height:3015,

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
			},
			initCavnas(){

				var canvas = this.$refs['canvas'];
				var context = canvas.getContext('2d');



				var s = this;
				var scale = 2.5;
				//context.drawImage(this.$refs['img'],1126,740,s.viewW,s.viewH,0,0,s.viewW,s.viewH);
				var w = s.viewW,
					h = s.viewH;
				
					var x = 1352;
					var y = 1592;

					var w1 = s.viewW,
						h1 = s.viewH;

					var scale1 = 1;

					var scale2 = 1;

					var i = 0;
					var j = 0;

					var speed  = 1.004;

					var sourceImg = this.$refs['img'];
					var p0Img = this.$refs['imgp0'];

					/*context.drawImage(this.$refs['imgp0'],0,y,w,h,0,0,s.viewW,s.viewH);
					context.drawImage(this.$refs['img'],0,0,w*2,h*2,0,0,s.viewW,s.viewH);*/
					var t = setInterval(()=>{
							
							 w1 *= speed,
								 h1 *= speed;
							context.clearRect(0,0,s.viewW,s.viewH);
							 if(scale<=1){
							 	scale = 1;
							 	 scale1*=speed;
							 	 ///scale1*=speed;
							 	 w = s.viewW,
								 h = s.viewH;
								 w *=scale1,
								 h *=scale1;

								i+=1;
								j+=4.54;
								//context.drawImage(this.$refs['imgp0'],0,0,w,h,0,0,s.viewW,s.viewH);

								context.drawImage(p0Img,s.viewW*1275/1875*2.5-j,s.viewH*1371/3015*2.5-j,w-1,h-4,0,0,s.viewW,s.viewH);

								//context.drawImage(sourceImg,0,0,w1,h1,i*scale1,i*scale1,s.viewW,s.viewH); 
								 	//context.translate(s.viewW*1275/1875,s.viewH*1372/3015);
									//context.drawImage(sourceImg,0,0,w1*scale2,h1*scale2,0,0,s.viewW,s.viewH); 		

								if(scale1>=2.5){
									console.log(w1,w);
								 	clearInterval(t);
								 	//context.drawImage(p0Img,0,0,s.viewW*2.5,s.viewH*2.5,0,0,s.viewW,s.viewH);
								 	context.scale(1.002,1.002);
									context.drawImage(p0Img,s.viewW*1275/1875*2.5-j,s.viewH*1371/3015*2.5-j,w-1,h-4,0,0,s.viewW,s.viewH);
									
								///	context.drawImage(sourceImg,0,0,w1,h1,j*2.5,j*2.5,s.viewW,s.viewH); 
								 	//context.translate(s.viewW*1275/1875,s.viewH*1372/3015);

									//context.drawImage(sourceImg,0,0,w1*scale2,h1*scale2,0,0,s.viewW,s.viewH); 	
								 }
							 	//clearInterval(t);
							 }else{

							 	 
							 	 scale/=speed;
							 	 
								 w = s.viewW/scale,
								 h = s.viewH/scale;
								///context.drawImage(p0Img,s.viewW*1275/1875*2.5,s.viewH*1371/3015*2.5,w-1,h-4,0,0,s.viewW,s.viewH);
								i++;
								j++;
								context.drawImage(p0Img,s.viewW*1275/1875*2.5-i,s.viewH*1371/3015*2.5-i,w-1,h-4,0,0,s.viewW,s.viewH);

								context.drawImage(sourceImg,0,0,w1,h1,i*scale ,i*scale,s.viewW,s.viewH); 	
								context.save();
							 	
								context.restore();
							 }

							 //scale-=.02;
						},10)

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
 

		}
	}
</script>