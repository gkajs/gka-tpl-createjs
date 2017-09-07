module.exports = function html(data, prefix, frameduration) {
    var frame = data.frames[0],
        width = data.sourceW? data.sourceW: frame.sourceW,
        height = data.sourceH? data.sourceH: frame.sourceH;

return  `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,maximum-scale=1">
    <title>gka-preview EaselJS: Simple SpriteSheet Example</title>
</head>
<body>
<div>
	<canvas id="gkaStage" width="${width}" height="${height}"></canvas>
	<div style="position: fixed; bottom: 10px;">
		Powered By <a target="_blank" href="https://github.com/gkajs/gka">gka</a> .
		Template By <a target="_blank" href="https://github.com/gkajs/gka-tpl-createjs">gka-tpl-createjs</a>
	</div>
</div>
<script src="./easeljs-NEXT.combined.js"></script>
<script src="./data.js"></script>
<script>
	var stage = new createjs.Stage(document.getElementById("gkaStage"));

    var spriteSheet = new createjs.SpriteSheet({
            framerate: ${Math.round(1/frameduration)},
            "images": ["${"img/" + data.file}"],
            "frames": data.frames,
            "animations": {
                default: [0, ${data.frames.length - 1}, "default"]
            }
        });

    var grant = new createjs.Sprite(spriteSheet, "default");
  
    stage.addChild(grant);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
</script>
</body>
</html>
`;
}