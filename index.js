var fs = require('fs');
var path = require('path');

var html = require("./lib/html");

function isSame(frames, key) {
    var sameSourceWarr = frames.filter(function(f){
        return f[key] === frames[0][key];
    });
    return (sameSourceWarr.length === frames.length? true: false);
}

module.exports = function (data, opts, tool) {
    var prefix = opts.prefix,
        frameduration = opts.frameduration;

    var frames = data.frames;

    var isSameSourceW = isSame(frames, "sourceW");
    var isSameSourceH = isSame(frames, "sourceH");
    var isSameWidth = isSame(frames, "width");
    var isSameHeight = isSame(frames, "height");
    
    // console.log(isSameSourceW,isSameSourceH)

    isSameWidth && (data["width"] = frames[0].width);
    isSameHeight && (data["height"] = frames[0].height);
    isSameSourceW && (data["sourceW"] = frames[0].sourceW);
    isSameSourceH && (data["sourceH"] = frames[0].sourceH);
    
    data.frames = frames.map(function(frame){
        var res = {
            "x": frame.x,
            "y": frame.y,
            "offX": frame.offX,
            "offY": frame.offY,
        };

        !isSameWidth && (res["width"] = frame.width);
        !isSameHeight && (res["height"] = frame.height);
        !isSameSourceW && (res["sourceW"] = frame.sourceW);
        !isSameSourceH && (res["sourceW"] = frame.sourceH);

        return res;
    });

    var data2 = {};
    data2.file = data.file;
    data2.w = data.w;
    data2.h = data.h;
    data2.sourceW = data.sourceW;
    data2.sourceH = data.sourceH;

    // data2.frames = frames.map(function(frame){
    //     return [frame.x, frame.y, frame.width, frame.height, frame.offX, frame.offY]
    // });
    // tool.writeFile("data.js", `var data = ${JSON.stringify(data2, null, '    ')}`);

    data2.frames = frames.map(function(frame){
        // x, y, width, height, imageIndex*, regX*, regY*
        return JSON.stringify([frame.x, frame.y, frame.width, frame.height, 0, (0-frame.offX), (0-frame.offY)])
    });

    tool.writeFile("data.js", `var data = ${JSON.stringify(data2, null, '    ').replace(/\"\[/ig, "\[").replace(/\]\"/ig, "\]")}`);
    tool.writeFile("gka.html", html(data, prefix, frameduration));
console.log(__dirname)
console.log(__filename)
    tool.writeFile("easeljs-NEXT.combined.js", fs.readFileSync(path.join(__dirname, 'lib/easeljs-NEXT.combined.js'), 'utf8'));
};

