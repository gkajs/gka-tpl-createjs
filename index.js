var gkaUtils = require('gka-utils'),
    writeSync = gkaUtils.file.writeSync;
var html = require("./lib/html");

module.exports = function (data, opts, cb) {
    
    var dir = opts.imgOutput;

    function run(data, opts, key) {
        var name = (key? key + '-' : '') + 'gka',
            dataName = name + '-data.js',
            htmlName = name + '.html';

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

        writeSync([dir, '..', dataName],  `var data = ${gkaUtils.data.fixArrayString(JSON.stringify(_data, null, '    '))}`);
        writeSync([dir, '..', htmlName], html(data, opts, dataName));
        writeSync([dir, '..', "easeljs-NEXT.combined.js"], gkaUtils.file.readFileSync([__dirname, 'lib/easeljs-NEXT.combined.js']));
    }

    run(data, opts);

    // 对每个子目录都进行处理
    gkaUtils._.effectSubFolderSync(run, data, opts);

    cb && cb();
}

module.exports.config = function(opts) {
    // console.log(opts)
    return {
        crop: 'any',
        sprites: true,
    }
};