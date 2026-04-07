/*
    angelcode bmfont parser
    https://www.angelcode.com/products/bmfont/
*/

// parses an .fnt file and adds the font to the cache
// its just a general bmfont parser really, but i guess ill deobfuscate it anyway
function parseBMFont(scene, textureKey, rawData) {
    const texture = scene.textures.get(textureKey),
        textureSource = texture.source[0],
        textureWidth = textureSource.width,
        textureHeight = textureSource.height,
        fontData = {
            font: textureKey,
            size: 0,
            lineHeight: 0,
            chars: {}
        },
        kerningPairs = [];
    
    // split by newlines
    for (const line of rawData.split('\x0a')) {
        const token = line.trim().split(/\s+/);
        if (!token.length) continue;

        const tag = token[0],
            attributes = {};

        for (let i = 1; i < token.length; i++) {
            const definitionIndex = token[i].indexOf('=');
            definitionIndex >= 0 && (
                attributes[token[i].slice(0, definitionIndex)] = token[i].slice(definitionIndex + 1).replace(/^"|"$/g, '')
            );
        }

        // watevar happened to else ifs..........
        if ("info" === tag)
            fontData.size = parseInt(attributes.size, 10);
        else { if ("common" === tag)
            fontData.lineHeight = parseInt(attributes.lineHeight, 10);
            else { if ("char" === tag) {
                const charId = parseInt(attributes.id, 10),
                charX = parseInt(attributes.x, 10),
                charY = parseInt(attributes.y, 10),
                charWidth = parseInt(attributes.width, 10),
                charHeight = parseInt(attributes.height, 10),
                // uv coords
                u0 = charX / textureWidth,
                v0 = charY / textureHeight,
                u1 = (charX + charWidth) / textureWidth,
                v1 = (charY + charHeight) / textureHeight;
                //
                if (fontData.chars[charId] = {
                    x: charX,
                    y: charY,
                    width: charWidth,
                    height: charHeight,
                    centerX: Math.floor(charWidth / 2),
                    centerY: Math.floor(charHeight / 2),
                    xOffset: parseInt(attributes.xoffset, 10),
                    yOffset: parseInt(attributes.yoffset, 10),
                    xAdvance: parseInt(attributes.xadvance, 10),
                    data: {},
                    kerning: {},
                    u0: u0,
                    v0: v0,
                    u1: u1,
                    v1: v1                    
                }, 0 !== charWidth && 0 !== charHeight) {
                    // add a frame for this glyph
                    const charString = String.fromCharCode(charId),
                    frame = texture.add(charString, 0, charX, charY, charWidth, charHeight);
                    frame && frame.setUVs(charWidth, charHeight, u0, v0, u1, v1);
                }
            } else "kerning" === tag && kerningPairs.push({
                first: parseInt(attributes.first, 10),
                second: parseInt(attributes.second, 10),
                amount: parseInt(attributes.amount, 10)
            });
        }}}
        
    for (const pair of kerningPairs)
        fontData.chars[pair.second] && (
            fontData.chars[pair.second].kerning[pair.first] = pair.amount
        );

    scene.cache.bitmapFont.add(textureKey, {
        data: fontData,
        texture: textureKey,
        frame: null
    });
}

export { parseBMFont };
