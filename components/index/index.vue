<template>
	<div  class="lt-full zmiti-index-main-ui "  :class="{'show':show}">
		<div class="zmiti-leaf">
			<img @touchstart='touchstart' :src="imgs.leaf1" alt="">
		</div>
		<div class="zmiti-leaf zmiti-leaf1">
			<img @touchstart='touchstart' :src="imgs.leaf2" alt="">
		</div>

		<section class="lt-full">
			<div class="zmiti-title">
				<img @touchstart='touchstart' :src="imgs.title" alt="">
			</div>

			<div class="zmiti-border">
				<div class="zmiti-xdd" :style="{WebkitTransform:'translate3d('+transX+'px,'+transY+'px,0)'}">
					<img @touchstart='touchstart' :src="imgs.xdd" alt="">
				</div>
			</div>

			<div class="zmiti-index-bottom">
				<div class="zmiti-btn2" @touchend='entry'>
					<img @touchstart='touchstart' :src="imgs.btn2" alt="">
					<span>跟着总书记去种树</span>
				</div>
				<div class="zmiti-logo">
					<img @touchstart='touchstart' :src="imgs.logo" alt="">
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

			touchstart(e){
				e.preventDefault();
			},

			entry(){
				var {obserable} = this;
				obserable.trigger({
					type:'showTreeApp'
				});

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
				this.showMasks = true;
			},
			restart(){
				window.location.href = window.location.href.split('?')[0];
			},
			afterEnter(){
				this.showBtns = true;
			}
			
			
		},
		mounted(){



			

			var s = this;
			s.lastX = '';
			s.lastY = '';
			var i =0 ;
			var startX,startY;
 			window.addEventListener("deviceorientation", function(event) {
			      

			     // document.title = event.beta|0;
			    /*  i++;
			      if(i===1){
			      	startY = event.beta;
			      }

			      var x =  event.gamma|0,
			      	  y = event.beta|0;

			      if(x<-15){
			      	x=-15;
			      }
			      if(x>15){
			      	x=15
			      }
			      if(y-startY<-10){
			      	y=-10+startY;
			      }
			      if(y-startY>10){
			      	y=10+startY
			      }

			      if(s.lastX!==''){
			     	 
			      }
			      if(s.lastY !== ''){
			      	
			      }

			      s.transX = x ;*/
			      //s.transY = y;

			    


			    	      

			}, true);

		}
	}
</script>