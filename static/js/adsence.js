(function (window, document) {
  function main() {
    // GoogleAdSense読込み
    var ad = document.createElement('script');
    ad.type = 'text/javascript';
    ad.async = true;
    ad.dataset.adClient = 'ca-pub-6032329270974721';
    ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    var sc = document.getElementsByTagName('script')[0];
    sc.parentNode.insertBefore(ad, sc);
  }

  // 遅延読込み
  var lazyLoad = false;
  function onLazyLoad() {
    if (lazyLoad === false) {
      // 複数呼び出し回避 + イベント解除
      lazyLoad = true;
      window.removeEventListener('scroll', onLazyLoad);
      window.removeEventListener('mousemove', onLazyLoad);
      window.removeEventListener('mousedown', onLazyLoad);
      window.removeEventListener('touchstart', onLazyLoad);
      window.removeEventListener('keydown', onLazyLoad);

      main();
    }
  }
  window.addEventListener('scroll', onLazyLoad);
  window.addEventListener('mousemove', onLazyLoad);
  window.addEventListener('mousedown', onLazyLoad);
  window.addEventListener('touchstart', onLazyLoad);
  window.addEventListener('keydown', onLazyLoad);
  window.addEventListener('load', function () {
    if (window.scrollY) {
      onLazyLoad();
    }
  });
})(window, document);