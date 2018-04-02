<template>
	<transition name='main'>
		<div  class="lt-full zmiti-tree-main-ui "  v-show='show'>
			
			<transition 
			name='zmiti-scale'
			@after-enter='afterEnter'
			>
				<div ref='createimgs' class="zmiti-createimg"  v-if='createImg'>
					<img :src="createImg" alt="">
				</div>
			</transition>

			<div v-if='createImg'>
				<div class="zmiti-leaf2">
					<img :src="imgs.leaf1">
				</div>

				<div class="zmiti-leaf3">
					<img :src="imgs.leaf2">
				</div>

				<transition-group name='btn-opacity'>
					<div key="1" class="zmiti-btns-group" :class="{'zmiti-btns-group1':src}" v-if='showBtns'>
						<div v-if='!src' @touchend='restart' class="zmiti-restart">
							<img :src="imgs.btn1">
							<span>再种一棵</span>
						</div>
						<div  v-if='!src' @touchstart='shareStart' @touchend='shareEnd'  v-tap='showMask' class="zmiti-share" :class='{"active":shareTap}'>
							<img :src="imgs.btn1" v-if='canShare'>
							<img :src="imgs.shareDisabled" v-if='!canShare'>
							<span :class="{'disabled':!canShare}">
								<label v-if='!canShare'></label>
								<label v-if='!canShare'></label>
								<label v-if='!canShare'></label>
								<em v-if='canShare'>分享</em>
							</span>
						</div>

						<div v-if='src' class="zmiti-restart1" @touchend='restart'>
							<img :src="imgs.btn1">
							<span>我也要种树</span>
						</div>

					</div>
					<div v-if='showBtns && !src' key='2' class="zmiti-team">
						<div  @touchend='showTeam = true'>制作团队</div>
						<div @touchend='link'><a href="http://www.bjyl.gov.cn/ztxx/sdqmywzsw/stjz/zllh/201803/t20180319_204653.shtml">2018年首都社会植树点联系人</a></div>
					</div>
				</transition-group>
			</div>

			<transition name='clip'>
				<div ref='page' :class="{'show':showClip}" class="zmiti-clip-page lt-full" v-if='!createImg'>
					<img :src="imgs.border1">

					<div class="zmiti-clip-img">
						<img :src="imgs.clip">
						
						<div class="zmiti-book">
							<img :src='imgs.book'/>
							<div class="zmiti-date">
								{{date}}
							</div>
						</div>


						<div class="zmiti-qrcode">
							<img :src="imgs.qrcode">
							<span>长按二维码来种树</span>
						</div>

						<div class="zmiti-userinfo">
							<img style="opacity:0;display:none" :src="headimgurl||imgs.logo" >
							我是
						</div>
						<div class="zmiti-rank">
							第<span>{{pv}}</span>位
						</div>
					</div>
				</div>
			</transition>

			<section v-if='!createImg'  class="lt-full" style="z-index: 1000">
				<transition-group name='bg'>
					<div v-if='i === index' v-for='(bg,i) in bgs' :key='bg' class="lt-full zmiti-index-bg" :style="{background: 'url('+bg+') no-repeat center bottom',backgroundSize:'cover'}">
						<img :src="imgs.title2">
					</div>
				</transition-group>

				<div class="zmiti-brand">
					<img :src="imgs.brand">
					<div>
						已有 <span>{{pv}}</span> 位种树者
					</div>
					
				</div>

				<div class="zmiti-bucket">
					<img :src="bucket" />
				</div>

				<section class="zmiti-addone" :class="{'animate':addOneAnimate}">
					<img :src="imgs.addone">
				</section>
				
				<div class="zmiti-person">
					<img :src='imgs.person1' v-if='!diggingDone'>
					<img :src='imgs.person' v-if='diggingDone'>
				</div>
				<div v-if='!watered' @touchend='tree' class="zmiti-btn1">
					<img :src="imgs.btn1">
					<span>我要种树</span>
				</div>
				<div v-if='showQrcode && false' class="zmiti-qrcode">
					<img :src="imgs.qrcode">
					<span>长按二维码来种树</span>
				</div>
			</section>

			<div class="zmiti-mask lt-full" v-if='showMasks' @touchstart='hideMask'>
				<img :src="imgs.arrow">
			</div>

			<transition name='team'>
				<div v-if='showTeam' class="zmiti-team-main-ui lt-full" @touchend='showTeam = false'>
					<div class="zmiti-team-main">
						<h1>
							<div><img :src="imgs.leaf3" /></div>
							<div>制作团队</div>
							<div><img :src="imgs.leaf3" /></div>
						</h1>
						<section><span>出品人：</span><span>陈凯星、</span><span>冯瑛冰</span></section>
						<section><span>监制：</span><span>马书平</span></section>
						<section><span>统筹：</span><span>葛素表、</span><span>齐慧杰</span></section>
						<section><span>策划：</span><span>曹建礼、</span><span>于卫亚</span></section>
						<section><span>制作：</span><span>马发展</span></section>
						<section><span>技术支持：</span><span>麟腾传媒</span></section>
						<section style="margin-top: 20px">新华社新媒体中心出品</section>
							
						<div class="zmiti-back">返回</div>
					</div>
				</div>
			</transition>

			<div class="zmiti-iframe lt-full" v-if='frameHref'>
				<iframe frameborder="0" :src="frameHref"></iframe>
			</div>
		</div>
	</transition>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import zmitiUtil from '../lib/util';
	import '../lib/html2canvas';
	import $ from 'jquery';
	export default {
		props:['obserable','pv','randomPv','nickname','headimgurl'],
		name:'zmitiindex',
		data(){
			return{
				imgs,
				showQrcode:false,
				show:false,
				toastMsg:'',
				showBtns:false,
				showMasks:false,
				muted:true,
				shareTap:false,
				src:'',
				diggingDone:false,
				showClip:false,
				showClipImg:false,
				date:'',
				index:0,
				canShare:true,
				frameHref:'',
				showTeam:false,
				addOneAnimate:false,
				watered:false,//是否浇水了。
				bucket:imgs.bucket1,
				bgs:[
					imgs.bg1,
					imgs.bg2,
					imgs.bg3,
					imgs.bg4,
					imgs.bg5,
				],
				transX:0,
				transY:0,
				createImg:'',
			}
		},
		components:{
		},
		
		methods:{

			link(){

			},
			format(num){
				return parseFloat(num).toLocaleString()
			},
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
				if(this.canShare){
					this.showMasks = true;
				}
			},
			shareEnd(){
				this.shareTap = false;
			},
			shareStart(){
				this.shareTap=this.canShare
			},
			restart(){
				window.location.href = window.location.href.split('?')[0];
				/*this.createImg = '';
				this.addOneAnimate = false;
				this.showQrcode = false;
				this.watered = false;
				this.bucket = imgs.bucket1;*/
			},
			afterEnter(){

				this.showBtns = true;
			},
			html2img(){
				var s = this;

				zmitiUtil.wxConfig('我是第'+(s.pv)+'位种树者',window.desc)


				
				var {obserable} = this;
				setTimeout(()=>{
					var ref = 'page';
					var dom = this.$refs[ref];
					html2canvas(dom,{
						useCORS: true,
						onrendered: function(canvas) {
					        var url =  canvas.toDataURL('image/jpg');

					        obserable.trigger({
			            		type:'photoPlay'
			            	})
					         s.createImg = url;
							
					        $.ajax({
					          //url: window.protocol+'//api.zmiti.com/v2/share/base64_image/',
					          url:window.protocol+'//'+window.server+'.zmiti.com/v2/share/base64_image/',
					          type: 'post',
					          data: {
					            setcontents: url,
					            setwidth: dom.clientWidth,
					            setheight:dom.clientHeight
					          },
					          error(){
					          },
					          success: function(data) {
					          	//alert('data.getret =>'+data.getret)
					            if (data.getret === 0) {
					            	//s.deleteImg(dt.img);


					            	s.canShare = true;//可以分享了
					               var src = data.getimageurl;
					             
	
									var url = window.location.href.split('#')[0];

									url = zmitiUtil.changeURLPar(url,'src',src);
									url = zmitiUtil.changeURLPar(url,'num',s.pv);
									zmitiUtil.wxConfig('我是第'+(s.pv)+'位种树者',window.desc,url)
								       
					            }else{
					            }

					          }
					        })

					      },
					      width: dom.clientWidth,
					      height:dom.clientHeight
					})
				},1000)
			} ,
			tree(){
				var {obserable} = this;
				this.watered = true;
				this.diggingDone = true;

				obserable.trigger({
					type:'tuPlay'
				});
				

				obserable.trigger({
					type:'toggleBgMusic',
					data:false
				})
				obserable.trigger({
					type:'setPlay',
					data:{
						display:'none'
					}
				})

				setTimeout(()=>{

					obserable.trigger({
						type:'tuPause'
					});
					
					setTimeout(()=>{
						this.bucket = imgs.bucket;
					
						this.diggingDone = false;
						obserable.trigger({
							type:'waterPlay'
						});
					},400)

					var t = setInterval(()=>{

						this.index++;
						this.index === 1 &&( this.addOneAnimate = true)
						this.index === 1 && obserable.trigger({
								type:'updatePv',
								data:1
							})
						if(this.index ===3){
							obserable.trigger({
								type:'toggleBgMusic',
								data:true
							})
							obserable.trigger({
								type:'setPlay',
								data:{
									display:'block'
								}
							})
						}
						if(this.index>=this.bgs.length-1){
							clearInterval(t);
							this.showQrcode = true;
							setTimeout(()=>{
								this.showClip = true;
								this.html2img();
							},3000)
						}

					},2000);

				},2000);

				

				
			}
			
			
		},
		mounted(){

			var {obserable} = this;

			obserable.on('clip',()=>{
				this.show=true;
				this.showClip = true;
				this.html2img();
			});

			window.ss = this;


			var dt = new Date();

			var year = dt.getFullYear();
			var month = dt.getMonth() + 1;
			var date = dt.getDate();

			this.date = year + '年' + month + '月'+ date+'日';
			

			obserable.on('showTreeApp',(data)=>{
				this.show = true;
				
				if(data){
					this.createImg = data.src;
					this.src = data.src;
					this.num = data.num;
					var url = window.location.href.split('#')[0];
						url = zmitiUtil.changeURLPar(url,'src',this.src);
						url = zmitiUtil.changeURLPar(url,'num',this.num);
						zmitiUtil.wxConfig('我是第'+(this.num)+'位种树者',window.desc,url)
						
				}
			})
 
		}
	}
</script>