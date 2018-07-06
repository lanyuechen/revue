export function load(url) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;

  head.appendChild(script);

  return new Promise((resolve) => {
    script.onload = script.onreadystatechange = function() {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
        resolve();
      }
    };
  });
}