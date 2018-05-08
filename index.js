var fs = require('fs');
var path = require('path');
var gkaUtils = require('gka-utils');
var html = require("./lib/html");

module.exports = class CreatejsTemplatePlugin {
    constructor() {
    }
    apply(compiler) {
        compiler.hooks.on('templateOptions', (context, next) => {
            context.options.sprites = true;
            context.options.split = false;
            context.options.diff = false;
            next(context);
        })
        
        compiler.hooks.on('template', (context, next) => {
            const {
                options,
                data,
            } = context;
            
            const dir = options.imgOutput;

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
                
                context.assets[dataName] = `var data = ${gkaUtils.data.fixArrayString(JSON.stringify(_data, null, '    '))}`;
                context.assets[htmlName] = html(data, opts, dataName);
                context.assets['easeljs-NEXT.combined.js'] = fs.readFileSync(path.join(__dirname, 'lib/easeljs-NEXT.combined.js'), 'utf8');
            }
        
            run(data[0], options);
        
            // 对每个子目录都进行处理
            gkaUtils._.effectSubFolderSync(run, data[0], options);
        
            next(context);
        })
    }
}