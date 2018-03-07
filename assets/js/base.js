var imgs = {
	play: './assets/images/play.png',
	logo: './assets/images/logo.png',
	bg: './assets/images/bg.jpg',
	bg1: './assets/images/bg1.jpg',
	p0: './assets/images/p0.jpg',
	arrow: './assets/images/arrow.png',
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