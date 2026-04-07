/*
    angelcode bmfont parser
*/

// parses a .fnt file and adds the font to the cache
function parseBMFont(_0x4e6e71, _0x5059cd, _0x3a0583) {
    const _0x4adbf2 = _0x4e6e71.textures.get(_0x5059cd),
        _0x39d5fe = _0x4adbf2.source[0],
        _0x177755 = _0x39d5fe.width,
        _0x69dcd6 = _0x39d5fe.height,
        _0x4bb3ff = {
            'font': _0x5059cd,
            'size': 0,
            'lineHeight': 0,
            'chars': {}
        },
        _0x42b370 = [];
    for (const _0x4e81a8 of _0x3a0583.split('\x0a')) {
        const _0x4234e6 = _0x4e81a8.trim().split(/\s+/);
        if (!_0x4234e6.length) continue;
        const _0x485488 = _0x4234e6[0],
            _0x2e29f1 = {};
        for (let _0x47b3a1 = 1; _0x47b3a1 < _0x4234e6.length; _0x47b3a1++) {
            const _0x4f1697 = _0x4234e6[_0x47b3a1].indexOf('=');
            _0x4f1697 >= 0 && (_0x2e29f1[_0x4234e6[_0x47b3a1].slice(0, _0x4f1697)] = _0x4234e6[_0x47b3a1].slice(_0x4f1697 + 1).replace(/^"|"$/g, ''));
        }
        if ("info" === _0x485488) _0x4bb3ff.size = parseInt(_0x2e29f1.size, 10);
        else {
            if ("common" === _0x485488) _0x4bb3ff.lineHeight = parseInt(_0x2e29f1.lineHeight, 10);
            else {
                if ("char" === _0x485488) {
                    const _0x1e73d6 = parseInt(_0x2e29f1.id, 10),
                        _0xa9d8ad = parseInt(_0x2e29f1.x, 10),
                        _0x38c0bc = parseInt(_0x2e29f1.y, 10),
                        _0x33bab4 = parseInt(_0x2e29f1.width, 10),
                        _0x5ab709 = parseInt(_0x2e29f1.height, 10),
                        _0xd0e50c = _0xa9d8ad / _0x177755,
                        _0x581858 = _0x38c0bc / _0x69dcd6,
                        _0x40168d = (_0xa9d8ad + _0x33bab4) / _0x177755,
                        _0x467b92 = (_0x38c0bc + _0x5ab709) / _0x69dcd6;
                    if (_0x4bb3ff.chars[_0x1e73d6] = {
                            'x': _0xa9d8ad,
                            'y': _0x38c0bc,
                            'width': _0x33bab4,
                            'height': _0x5ab709,
                            'centerX': Math.floor(_0x33bab4 / 2),
                            'centerY': Math.floor(_0x5ab709 / 2),
                            'xOffset': parseInt(_0x2e29f1.xoffset, 10),
                            'yOffset': parseInt(_0x2e29f1.yoffset, 10),
                            'xAdvance': parseInt(_0x2e29f1.xadvance, 10),
                            'data': {},
                            'kerning': {},
                            'u0': _0xd0e50c,
                            'v0': _0x581858,
                            'u1': _0x40168d,
                            'v1': _0x467b92
                        }, 0 !== _0x33bab4 && 0 !== _0x5ab709) {
                        const _0x30b963 = String.fromCharCode(_0x1e73d6),
                            _0xe070ca = _0x4adbf2.add(_0x30b963, 0, _0xa9d8ad, _0x38c0bc, _0x33bab4, _0x5ab709);
                        _0xe070ca && _0xe070ca.setUVs(_0x33bab4, _0x5ab709, _0xd0e50c, _0x581858, _0x40168d, _0x467b92);
                    }
                } else "kerning" === _0x485488 && _0x42b370.push({
                    'first': parseInt(_0x2e29f1.first, 10),
                    'second': parseInt(_0x2e29f1.second, 10),
                    'amount': parseInt(_0x2e29f1.amount, 10)
                });
            }
        }
    }
    for (const _0x48e531 of _0x42b370) _0x4bb3ff.chars[_0x48e531.second] && (_0x4bb3ff.chars[_0x48e531.second].kerning[_0x48e531.first] = _0x48e531.amount);
    _0x4e6e71.cache.bitmapFont.add(_0x5059cd, {
        'data': _0x4bb3ff,
        'texture': _0x5059cd,
        'frame': null
    });
}

export { parseBMFont };
