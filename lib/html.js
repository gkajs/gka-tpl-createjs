var gkaUtils = require('gka-utils');

module.exports = function html(data, opts, dataName) {

    var prefix = opts.prefix,
        isDiff = opts.diff,
        frameduration = opts.frameduration,
        names = gkaUtils.data.getImageNames(data),
        width = data.frames[0].sourceW,
        height = data.frames[0].sourceH,
        html = gkaUtils.html.getHtmlWrap(opts),
        filepath = JSON.stringify(names.map(name => `img/${name}`))

    html.includeBodyContent(`
    <canvas id="gka" width="${width}" height="${height}"></canvas>
    <script src="./easeljs-NEXT.combined.js"></script>
    <script src="./${dataName}"></script>
    <script>
    var stage = new createjs.Stage(document.getElementById("gka"));

    var spriteSheet = new createjs.SpriteSheet({
            framerate: ${Math.round(1/frameduration)},
            "images": ${filepath},
            "frames": data.frames,
            "animations": {
                default: [0, ${data.frames.length - 1}, "default"]
            }
        });

    var grant = new createjs.Sprite(spriteSheet, "default");
  
    stage.addChild(grant);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
    </script>`);

    return html + '';
}