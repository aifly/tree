import Vue from "vue";
import './components/css/index.css';
import Index from './components/index/index';
import Tree from './components/tree/index';
import Obserable from './components/lib/obserable';
import imgs from './components/lib/assets'
import zmitiUtil from './components/lib/util.js'
import $ from 'jquery';
import './components/lib/touch.js';


var obserable = new Obserable();

//zmitiUtil.getOauthurl(obserable);


//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		viewH: document.documentElement.clientHeight,
		isShare: false,
		show: false,
		username: '',
		wish: '',
		width: 0,
		pv: 1325121,
		randomPv: 0,
		loaded: false,
		nickname: '',
		headimgurl: '',
		playStyle: {

		}
	},
	el: '#app',
	/*<audio ref='audio' src='./assets/music/bg.mp3'  loop></audio>*/
	template: `<div>
		<Index  v-if='show && !isShare'  :obserable='obserable'></Index>
		<Tree :nickname='nickname' :headimgurl='headimgurl' :pv='pv' :randomPv='randomPv' v-if='show'  :obserable='obserable'></Tree>
		
		<div  @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}' :style="playStyle">
			<img  :src='imgs.play'/>
		</div>
		<div  v-if='!loaded' :style='{background:"#158ae4"}' class='zmiti-loading lt-full'>
			<div class='zmiti-loading-ui'>
				 <a href="#">
			  		<section class='zmiti-head' :style="{background:'url(./assets/images/logo.png) no-repeat center / cover'}"></section>
			        <div class="line1"></div>
			        <div class="line2"></div>
			        <div class="line3"></div>
					<div class='zmiti-progress'>{{width}}%</div>
			    </a>
			</div>
		</div>

		<audio src='./assets/music/water.mp3' ref='water'></audio>
		<audio src='./assets/music/photo.mp3' ref='photo'></audio>
		<audio src='./assets/music/bg.mp3' ref='audio'></audio>
		<audio src='./assets/music/tu.mp3' ref='tu' loop></audio>
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						fnEnd && fnEnd(img.src);
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					customid: 45
				}
			}).done((data) => {
				if (data.getret === 0) {
					this.pv = data.totalpv;
					this.randomPv = data.randtotalpv;
				}
			});
		}
	},
	beforeCreate(){
		
	},
	components: {
		Index,
		Tree,

	},
	mounted() {


		var src = (zmitiUtil.getQueryString('src'));
		var num = (zmitiUtil.getQueryString('num'));

		this.isShare = src && !isNaN(num);

		this.src = src;


		this.loading(arr, (s) => {
			this.width = s * 100 | 0;

		}, () => {
			this.show = true;
			this.loaded = true;

		})

		obserable.on('showShare', () => {
			this.showMask = true;
		})

		obserable.on('updatePv', (data) => {
			this.randomPv += data;
			this.pv += data;

		});


		obserable.on('setPlay', (data) => {

			this.playStyle = data;

		});

		var water = this.$refs['water'];
		var photo = this.$refs['photo'];
		var tu = this.$refs['tu'];


		var audio = this.$refs['audio'];
		var len = audio;
		len && $(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});

		//this.$refs['audio'].volume = .3;

		len && audio.play();
		water && water.play();
		water && (water.muted = true);

		photo && photo.play();
		photo && (photo.muted = true);

		tu && tu.play();
		tu && (tu.muted = true);
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				len && audio.play();
				water && water.play();
				photo && photo.play();
				tu && tu.play();
			});
		}, false)



		var play = function() {
			document.removeEventListener("WeixinJSBridgeReady", play);
			document.removeEventListener("YixinJSBridgeReady", play);
			len && audio.play();
			water && water.play();
			photo && photo.play();
			tu && tu.play();
		};

		if (window.WeixinJSBridge) {
			len && audio.play();
			water && water.play();
			photo && photo.play();
			tu && tu.play();
		}
		//weixin
		if (typeof WeixinJSBridge == "undefined") {
			document.addEventListener("WeixinJSBridgeReady", play, false);
		} else {
			//yixin
			document.addEventListener('YixinJSBridgeReady', play, false);
			len && audio.play();
			water && water.play();
			photo && photo.play();
			tu && tu.play();
		}

		obserable.on('waterPlay', () => {
			water && (water.muted = false);
			setTimeout(() => {
				water && (water.currentTime = 0);
				water && water.play();

			}, 400)
		})

		obserable.on('photoPlay', () => {
			photo && (photo.muted = false);
			setTimeout(() => {
				photo && (photo.currentTime = 0);
				photo && photo.play();
			}, 400)
		})

		obserable.on('tuPlay', () => {
			tu && (tu.muted = false);
			setTimeout(() => {
				tu && (tu.currentTime = 0);
				tu && tu.play();
			}, 400)
		})

		obserable.on('tuPause', () => {
			tu && (tu.muted = false);
			setTimeout(() => {
				tu && (tu.currentTime = 0);
				tu && tu.pause();
			}, 400)
		})



		obserable.on('toggleBgMusic', (data) => {

			var audio = this.$refs['audio'];
			audio[data ? 'play' : 'pause']();
		});

		this.updatePv();


		if (this.isShare) {

			setTimeout(() => {
				obserable.trigger({
					type: 'showTreeApp',
					data: {
						src,
						num
					}
				})
			}, 1400)
		} else {
			obserable.on('setUserInfo', (data) => {
				this.nickname = data.nickname;
				this.headimgurl = data.headimgurl;
			})
			

			zmitiUtil.wxConfig(document.title, window.desc);
		}
	}
})