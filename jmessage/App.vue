<script>
	import Vue from 'vue'
	import JMessage from 'common/libs/jmessage-wxapplet-sdk-1.4.0.min.js'
	import md5 from 'common/libs/md5.js'
	
	function randomWord(randomFlag, min, max) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
	
		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	}
	
	
	export default {
		onLaunch: function() {
			Vue.prototype.JIM = new JMessage({});
			console.log('App Launch');
			var appkey = 'fd0e2b5e06bd9683b417fdc7';
			var key = 'e7371a20b08bd98765d1d6df';
			var timestamp = (new Date()).getTime();
			var random_str = randomWord(true,20,36);
			var signature = md5("appkey=" + appkey + "&timestamp=" + timestamp + "&random_str="+random_str+"&key=" + key);
			console.log(signature)
			this.JIM.init({
				"appkey": appkey,
				"random_str": random_str,
				"signature": signature,
				"timestamp": timestamp,
				"flag": 1
			}).onSuccess(function(data) {
				console.log(data)
			}).onFail(function(data) {
				//TODO
			});
			//
			this.JIM.onDisconnect(function() {
				console.log('JIM断开链接')
			});

			this.JIM.onMsgReceive(function(data) {
				// 接受在线消息
				console.log('在线接受消息')
				console.log(data)
				uni.$emit('msg_ol', data.messages[0].content)
			});

			//this.JIM.isInit();// 无回调函数，调用则成功
			Vue.prototype.onSyncConversation = null
			uni.$once('onSyncConversation', function(data) {
				this.onSyncConversation = data
				console.log('离线传递：')
				console.log(data)
				uni.$off()
			})





		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/icon.css";
	@import "colorui/main.css";
</style>
