var imgs = {
	play: './assets/images/play.png',
	title: './assets/images/title.png',
	leaf1: './assets/images/leaf1.png',
	leaf2: './assets/images/leaf2.png',
	logo: './assets/images/logo.png',
	bg1: './assets/images/bg1.jpg',
	bg2: './assets/images/bg2.jpg',
	bg3: './assets/images/bg3.jpg',
	bg4: './assets/images/bg4.jpg',

	xdd: './assets/images/xdd.jpg',

	arrow: './assets/images/arrow.png',
	btn1: './assets/images/btn1.png',
	border: './assets/images/border.png',
	brand: './assets/images/brand.png',
	bucket1: './assets/images/bucket1.png',

	bucket: './assets/images/bucket.gif',
	person: './assets/images/person.gif',

	btn2: './assets/images/btn2.png',
	qrcode: './assets/images/qrcode1.png',


}

var arr = [];
for (var attr in imgs) {
	arr.push(imgs[attr]);
}
var loading = function(arr, fn, fnEnd) {
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
}