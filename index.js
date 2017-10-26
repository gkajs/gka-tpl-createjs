var fs = require('fs');
var path = require('path');
var html = require("./lib/html");

module.exports = function (data, opts, tool) {
    var prefix = opts.prefix,
        frameduration = opts.frameduration;

    var frames = data.frames,
        frame = frames[0];
    
    var _data = {};
    _data.file = frame.file;
    _data.w = frame.w;
    _data.h = frame.h;
    _data.sourceW = frame.sourceW;
    _data.sourceH = frame.sourceH;

    _data.frames = frames.map(function(frame){
        return JSON.stringify([frame.x, frame.y, frame.width, frame.height, 0, (0-frame.offX), (0-frame.offY)])
    });

    tool.writeFile("data.js", `var data = ${JSON.stringify(_data, null, '    ').replace(/\"\[/ig, "\[").replace(/\]\"/ig, "\]")}`);
    tool.writeFile("gka.html", html(_data, prefix, frameduration));
    tool.writeFile("easeljs-NEXT.combined.js", fs.readFileSync(path.join(__dirname, 'lib/easeljs-NEXT.combined.js'), 'utf8'));
};

