var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/xml-utils/get-attribute.js
var require_get_attribute = __commonJS({
  "node_modules/xml-utils/get-attribute.js"(exports2, module2) {
    function getAttribute2(tag, attributeName, options) {
      const debug = options && options.debug || false;
      if (debug) console.log("[xml-utils] getting " + attributeName + " in " + tag);
      const xml = typeof tag === "object" ? tag.outer : tag;
      const opening = xml.slice(0, xml.indexOf(">") + 1);
      const quotechars = ['"', "'"];
      for (let i = 0; i < quotechars.length; i++) {
        const char = quotechars[i];
        const pattern = attributeName + "\\=" + char + "([^" + char + "]*)" + char;
        if (debug) console.log("[xml-utils] pattern:", pattern);
        const re = new RegExp(pattern);
        const match = re.exec(opening);
        if (debug) console.log("[xml-utils] match:", match);
        if (match) return match[1];
      }
    }
    module2.exports = getAttribute2;
    module2.exports.default = getAttribute2;
  }
});

// node_modules/xml-utils/index-of-match.js
var require_index_of_match = __commonJS({
  "node_modules/xml-utils/index-of-match.js"(exports2, module2) {
    function indexOfMatch(xml, pattern, startIndex) {
      const re = new RegExp(pattern);
      const match = re.exec(xml.slice(startIndex));
      if (match) return startIndex + match.index;
      else return -1;
    }
    module2.exports = indexOfMatch;
    module2.exports.default = indexOfMatch;
  }
});

// node_modules/xml-utils/index-of-match-end.js
var require_index_of_match_end = __commonJS({
  "node_modules/xml-utils/index-of-match-end.js"(exports2, module2) {
    function indexOfMatchEnd(xml, pattern, startIndex) {
      const re = new RegExp(pattern);
      const match = re.exec(xml.slice(startIndex));
      if (match) return startIndex + match.index + match[0].length - 1;
      else return -1;
    }
    module2.exports = indexOfMatchEnd;
    module2.exports.default = indexOfMatchEnd;
  }
});

// node_modules/xml-utils/count-substring.js
var require_count_substring = __commonJS({
  "node_modules/xml-utils/count-substring.js"(exports2, module2) {
    function countSubstring(string, substring) {
      const pattern = new RegExp(substring, "g");
      const match = string.match(pattern);
      return match ? match.length : 0;
    }
    module2.exports = countSubstring;
    module2.exports.default = countSubstring;
  }
});

// node_modules/xml-utils/find-tag-by-name.js
var require_find_tag_by_name = __commonJS({
  "node_modules/xml-utils/find-tag-by-name.js"(exports2, module2) {
    var indexOfMatch = require_index_of_match();
    var indexOfMatchEnd = require_index_of_match_end();
    var countSubstring = require_count_substring();
    function findTagByName(xml, tagName, options) {
      const debug = options && options.debug || false;
      const nested = !(options && typeof options.nested === false);
      const startIndex = options && options.startIndex || 0;
      if (debug) console.log("[xml-utils] starting findTagByName with", tagName, " and ", options);
      const start = indexOfMatch(xml, `<${tagName}[ 
>/]`, startIndex);
      if (debug) console.log("[xml-utils] start:", start);
      if (start === -1) return void 0;
      const afterStart = xml.slice(start + tagName.length);
      let relativeEnd = indexOfMatchEnd(afterStart, "^[^<]*[ /]>", 0);
      const selfClosing = relativeEnd !== -1 && afterStart[relativeEnd - 1] === "/";
      if (debug) console.log("[xml-utils] selfClosing:", selfClosing);
      if (selfClosing === false) {
        if (nested) {
          let startIndex2 = 0;
          let openings = 1;
          let closings = 0;
          while ((relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", startIndex2)) !== -1) {
            const clip = afterStart.substring(startIndex2, relativeEnd + 1);
            openings += countSubstring(clip, "<" + tagName + "[ \n	>]");
            closings += countSubstring(clip, "</" + tagName + ">");
            if (closings >= openings) break;
            startIndex2 = relativeEnd;
          }
        } else {
          relativeEnd = indexOfMatchEnd(afterStart, "[ /]" + tagName + ">", 0);
        }
      }
      const end = start + tagName.length + relativeEnd + 1;
      if (debug) console.log("[xml-utils] end:", end);
      if (end === -1) return void 0;
      const outer = xml.slice(start, end);
      let inner;
      if (selfClosing) {
        inner = null;
      } else {
        inner = outer.slice(outer.indexOf(">") + 1, outer.lastIndexOf("<"));
      }
      return { inner, outer, start, end };
    }
    module2.exports = findTagByName;
    module2.exports.default = findTagByName;
  }
});

// node_modules/xml-utils/find-tags-by-name.js
var require_find_tags_by_name = __commonJS({
  "node_modules/xml-utils/find-tags-by-name.js"(exports2, module2) {
    var findTagByName = require_find_tag_by_name();
    function findTagsByName2(xml, tagName, options) {
      const tags = [];
      const debug = options && options.debug || false;
      const nested = options && typeof options.nested === "boolean" ? options.nested : true;
      let startIndex = options && options.startIndex || 0;
      let tag;
      while (tag = findTagByName(xml, tagName, { debug, startIndex })) {
        if (nested) {
          startIndex = tag.start + 1 + tagName.length;
        } else {
          startIndex = tag.end;
        }
        tags.push(tag);
      }
      if (debug) console.log("findTagsByName found", tags.length, "tags");
      return tags;
    }
    module2.exports = findTagsByName2;
    module2.exports.default = findTagsByName2;
  }
});

// node_modules/geotiff/dist-module/globals.js
var fieldTagNames, fieldTags, arrayFields, fieldTypeNames, fieldTypes, photometricInterpretations, ExtraSamplesValues, LercParameters, LercAddCompression, geoKeyNames, geoKeys;
var init_globals = __esm({
  "node_modules/geotiff/dist-module/globals.js"() {
    fieldTagNames = {
      // TIFF Baseline
      315: "Artist",
      258: "BitsPerSample",
      265: "CellLength",
      264: "CellWidth",
      320: "ColorMap",
      259: "Compression",
      33432: "Copyright",
      306: "DateTime",
      338: "ExtraSamples",
      266: "FillOrder",
      289: "FreeByteCounts",
      288: "FreeOffsets",
      291: "GrayResponseCurve",
      290: "GrayResponseUnit",
      316: "HostComputer",
      270: "ImageDescription",
      257: "ImageLength",
      256: "ImageWidth",
      271: "Make",
      281: "MaxSampleValue",
      280: "MinSampleValue",
      272: "Model",
      254: "NewSubfileType",
      274: "Orientation",
      262: "PhotometricInterpretation",
      284: "PlanarConfiguration",
      296: "ResolutionUnit",
      278: "RowsPerStrip",
      277: "SamplesPerPixel",
      305: "Software",
      279: "StripByteCounts",
      273: "StripOffsets",
      255: "SubfileType",
      263: "Threshholding",
      282: "XResolution",
      283: "YResolution",
      // TIFF Extended
      326: "BadFaxLines",
      327: "CleanFaxData",
      343: "ClipPath",
      328: "ConsecutiveBadFaxLines",
      433: "Decode",
      434: "DefaultImageColor",
      269: "DocumentName",
      336: "DotRange",
      321: "HalftoneHints",
      346: "Indexed",
      347: "JPEGTables",
      285: "PageName",
      297: "PageNumber",
      317: "Predictor",
      319: "PrimaryChromaticities",
      532: "ReferenceBlackWhite",
      339: "SampleFormat",
      340: "SMinSampleValue",
      341: "SMaxSampleValue",
      559: "StripRowCounts",
      330: "SubIFDs",
      292: "T4Options",
      293: "T6Options",
      325: "TileByteCounts",
      323: "TileLength",
      324: "TileOffsets",
      322: "TileWidth",
      301: "TransferFunction",
      318: "WhitePoint",
      344: "XClipPathUnits",
      286: "XPosition",
      529: "YCbCrCoefficients",
      531: "YCbCrPositioning",
      530: "YCbCrSubSampling",
      345: "YClipPathUnits",
      287: "YPosition",
      // EXIF
      37378: "ApertureValue",
      40961: "ColorSpace",
      36868: "DateTimeDigitized",
      36867: "DateTimeOriginal",
      34665: "Exif IFD",
      36864: "ExifVersion",
      33434: "ExposureTime",
      41728: "FileSource",
      37385: "Flash",
      40960: "FlashpixVersion",
      33437: "FNumber",
      42016: "ImageUniqueID",
      37384: "LightSource",
      37500: "MakerNote",
      37377: "ShutterSpeedValue",
      37510: "UserComment",
      // IPTC
      33723: "IPTC",
      // ICC
      34675: "ICC Profile",
      // XMP
      700: "XMP",
      // GDAL
      42112: "GDAL_METADATA",
      42113: "GDAL_NODATA",
      // Photoshop
      34377: "Photoshop",
      // GeoTiff
      33550: "ModelPixelScale",
      33922: "ModelTiepoint",
      34264: "ModelTransformation",
      34735: "GeoKeyDirectory",
      34736: "GeoDoubleParams",
      34737: "GeoAsciiParams",
      // LERC
      50674: "LercParameters"
    };
    fieldTags = {};
    for (const key in fieldTagNames) {
      if (fieldTagNames.hasOwnProperty(key)) {
        fieldTags[fieldTagNames[key]] = parseInt(key, 10);
      }
    }
    arrayFields = [
      fieldTags.BitsPerSample,
      fieldTags.ExtraSamples,
      fieldTags.SampleFormat,
      fieldTags.StripByteCounts,
      fieldTags.StripOffsets,
      fieldTags.StripRowCounts,
      fieldTags.TileByteCounts,
      fieldTags.TileOffsets,
      fieldTags.SubIFDs
    ];
    fieldTypeNames = {
      1: "BYTE",
      2: "ASCII",
      3: "SHORT",
      4: "LONG",
      5: "RATIONAL",
      6: "SBYTE",
      7: "UNDEFINED",
      8: "SSHORT",
      9: "SLONG",
      10: "SRATIONAL",
      11: "FLOAT",
      12: "DOUBLE",
      // IFD offset, suggested by https://owl.phy.queensu.ca/~phil/exiftool/standards.html
      13: "IFD",
      // introduced by BigTIFF
      16: "LONG8",
      17: "SLONG8",
      18: "IFD8"
    };
    fieldTypes = {};
    for (const key in fieldTypeNames) {
      if (fieldTypeNames.hasOwnProperty(key)) {
        fieldTypes[fieldTypeNames[key]] = parseInt(key, 10);
      }
    }
    photometricInterpretations = {
      WhiteIsZero: 0,
      BlackIsZero: 1,
      RGB: 2,
      Palette: 3,
      TransparencyMask: 4,
      CMYK: 5,
      YCbCr: 6,
      CIELab: 8,
      ICCLab: 9
    };
    ExtraSamplesValues = {
      Unspecified: 0,
      Assocalpha: 1,
      Unassalpha: 2
    };
    LercParameters = {
      Version: 0,
      AddCompression: 1
    };
    LercAddCompression = {
      None: 0,
      Deflate: 1,
      Zstandard: 2
    };
    geoKeyNames = {
      1024: "GTModelTypeGeoKey",
      1025: "GTRasterTypeGeoKey",
      1026: "GTCitationGeoKey",
      2048: "GeographicTypeGeoKey",
      2049: "GeogCitationGeoKey",
      2050: "GeogGeodeticDatumGeoKey",
      2051: "GeogPrimeMeridianGeoKey",
      2052: "GeogLinearUnitsGeoKey",
      2053: "GeogLinearUnitSizeGeoKey",
      2054: "GeogAngularUnitsGeoKey",
      2055: "GeogAngularUnitSizeGeoKey",
      2056: "GeogEllipsoidGeoKey",
      2057: "GeogSemiMajorAxisGeoKey",
      2058: "GeogSemiMinorAxisGeoKey",
      2059: "GeogInvFlatteningGeoKey",
      2060: "GeogAzimuthUnitsGeoKey",
      2061: "GeogPrimeMeridianLongGeoKey",
      2062: "GeogTOWGS84GeoKey",
      3072: "ProjectedCSTypeGeoKey",
      3073: "PCSCitationGeoKey",
      3074: "ProjectionGeoKey",
      3075: "ProjCoordTransGeoKey",
      3076: "ProjLinearUnitsGeoKey",
      3077: "ProjLinearUnitSizeGeoKey",
      3078: "ProjStdParallel1GeoKey",
      3079: "ProjStdParallel2GeoKey",
      3080: "ProjNatOriginLongGeoKey",
      3081: "ProjNatOriginLatGeoKey",
      3082: "ProjFalseEastingGeoKey",
      3083: "ProjFalseNorthingGeoKey",
      3084: "ProjFalseOriginLongGeoKey",
      3085: "ProjFalseOriginLatGeoKey",
      3086: "ProjFalseOriginEastingGeoKey",
      3087: "ProjFalseOriginNorthingGeoKey",
      3088: "ProjCenterLongGeoKey",
      3089: "ProjCenterLatGeoKey",
      3090: "ProjCenterEastingGeoKey",
      3091: "ProjCenterNorthingGeoKey",
      3092: "ProjScaleAtNatOriginGeoKey",
      3093: "ProjScaleAtCenterGeoKey",
      3094: "ProjAzimuthAngleGeoKey",
      3095: "ProjStraightVertPoleLongGeoKey",
      3096: "ProjRectifiedGridAngleGeoKey",
      4096: "VerticalCSTypeGeoKey",
      4097: "VerticalCitationGeoKey",
      4098: "VerticalDatumGeoKey",
      4099: "VerticalUnitsGeoKey"
    };
    geoKeys = {};
    for (const key in geoKeyNames) {
      if (geoKeyNames.hasOwnProperty(key)) {
        geoKeys[geoKeyNames[key]] = parseInt(key, 10);
      }
    }
  }
});

// node_modules/geotiff/dist-module/predictor.js
function decodeRowAcc(row, stride) {
  let length = row.length - stride;
  let offset = 0;
  do {
    for (let i = stride; i > 0; i--) {
      row[offset + stride] += row[offset];
      offset++;
    }
    length -= stride;
  } while (length > 0);
}
function decodeRowFloatingPoint(row, stride, bytesPerSample) {
  let index = 0;
  let count = row.length;
  const wc = count / bytesPerSample;
  while (count > stride) {
    for (let i = stride; i > 0; --i) {
      row[index + stride] += row[index];
      ++index;
    }
    count -= stride;
  }
  const copy = row.slice();
  for (let i = 0; i < wc; ++i) {
    for (let b = 0; b < bytesPerSample; ++b) {
      row[bytesPerSample * i + b] = copy[(bytesPerSample - b - 1) * wc + i];
    }
  }
}
function applyPredictor(block, predictor, width, height, bitsPerSample, planarConfiguration) {
  if (!predictor || predictor === 1) {
    return block;
  }
  for (let i = 0; i < bitsPerSample.length; ++i) {
    if (bitsPerSample[i] % 8 !== 0) {
      throw new Error("When decoding with predictor, only multiple of 8 bits are supported.");
    }
    if (bitsPerSample[i] !== bitsPerSample[0]) {
      throw new Error("When decoding with predictor, all samples must have the same size.");
    }
  }
  const bytesPerSample = bitsPerSample[0] / 8;
  const stride = planarConfiguration === 2 ? 1 : bitsPerSample.length;
  for (let i = 0; i < height; ++i) {
    if (i * stride * width * bytesPerSample >= block.byteLength) {
      break;
    }
    let row;
    if (predictor === 2) {
      switch (bitsPerSample[0]) {
        case 8:
          row = new Uint8Array(
            block,
            i * stride * width * bytesPerSample,
            stride * width * bytesPerSample
          );
          break;
        case 16:
          row = new Uint16Array(
            block,
            i * stride * width * bytesPerSample,
            stride * width * bytesPerSample / 2
          );
          break;
        case 32:
          row = new Uint32Array(
            block,
            i * stride * width * bytesPerSample,
            stride * width * bytesPerSample / 4
          );
          break;
        default:
          throw new Error(`Predictor 2 not allowed with ${bitsPerSample[0]} bits per sample.`);
      }
      decodeRowAcc(row, stride, bytesPerSample);
    } else if (predictor === 3) {
      row = new Uint8Array(
        block,
        i * stride * width * bytesPerSample,
        stride * width * bytesPerSample
      );
      decodeRowFloatingPoint(row, stride, bytesPerSample);
    }
  }
  return block;
}
var init_predictor = __esm({
  "node_modules/geotiff/dist-module/predictor.js"() {
  }
});

// node_modules/geotiff/dist-module/compression/basedecoder.js
var BaseDecoder;
var init_basedecoder = __esm({
  "node_modules/geotiff/dist-module/compression/basedecoder.js"() {
    init_predictor();
    BaseDecoder = class {
      async decode(fileDirectory, buffer2) {
        const decoded = await this.decodeBlock(buffer2);
        const predictor = fileDirectory.Predictor || 1;
        if (predictor !== 1) {
          const isTiled = !fileDirectory.StripOffsets;
          const tileWidth = isTiled ? fileDirectory.TileWidth : fileDirectory.ImageWidth;
          const tileHeight = isTiled ? fileDirectory.TileLength : fileDirectory.RowsPerStrip || fileDirectory.ImageLength;
          return applyPredictor(
            decoded,
            predictor,
            tileWidth,
            tileHeight,
            fileDirectory.BitsPerSample,
            fileDirectory.PlanarConfiguration
          );
        }
        return decoded;
      }
    };
  }
});

// node_modules/geotiff/dist-module/compression/raw.js
var raw_exports = {};
__export(raw_exports, {
  default: () => RawDecoder
});
var RawDecoder;
var init_raw = __esm({
  "node_modules/geotiff/dist-module/compression/raw.js"() {
    init_basedecoder();
    RawDecoder = class extends BaseDecoder {
      decodeBlock(buffer2) {
        return buffer2;
      }
    };
  }
});

// node_modules/geotiff/dist-module/compression/lzw.js
var lzw_exports = {};
__export(lzw_exports, {
  default: () => LZWDecoder
});
function getByte(array, position, length) {
  const d = position % 8;
  const a = Math.floor(position / 8);
  const de = 8 - d;
  const ef = position + length - (a + 1) * 8;
  let fg = 8 * (a + 2) - (position + length);
  const dg = (a + 2) * 8 - position;
  fg = Math.max(0, fg);
  if (a >= array.length) {
    console.warn("ran off the end of the buffer before finding EOI_CODE (end on input code)");
    return EOI_CODE;
  }
  let chunk1 = array[a] & 2 ** (8 - d) - 1;
  chunk1 <<= length - de;
  let chunks = chunk1;
  if (a + 1 < array.length) {
    let chunk2 = array[a + 1] >>> fg;
    chunk2 <<= Math.max(0, length - dg);
    chunks += chunk2;
  }
  if (ef > 8 && a + 2 < array.length) {
    const hi = (a + 3) * 8 - (position + length);
    const chunk3 = array[a + 2] >>> hi;
    chunks += chunk3;
  }
  return chunks;
}
function appendReversed(dest, source) {
  for (let i = source.length - 1; i >= 0; i--) {
    dest.push(source[i]);
  }
  return dest;
}
function decompress(input) {
  const dictionaryIndex = new Uint16Array(4093);
  const dictionaryChar = new Uint8Array(4093);
  for (let i = 0; i <= 257; i++) {
    dictionaryIndex[i] = 4096;
    dictionaryChar[i] = i;
  }
  let dictionaryLength = 258;
  let byteLength = MIN_BITS;
  let position = 0;
  function initDictionary() {
    dictionaryLength = 258;
    byteLength = MIN_BITS;
  }
  function getNext(array2) {
    const byte2 = getByte(array2, position, byteLength);
    position += byteLength;
    return byte2;
  }
  function addToDictionary(i, c) {
    dictionaryChar[dictionaryLength] = c;
    dictionaryIndex[dictionaryLength] = i;
    dictionaryLength++;
    return dictionaryLength - 1;
  }
  function getDictionaryReversed(n) {
    const rev = [];
    for (let i = n; i !== 4096; i = dictionaryIndex[i]) {
      rev.push(dictionaryChar[i]);
    }
    return rev;
  }
  const result = [];
  initDictionary();
  const array = new Uint8Array(input);
  let code = getNext(array);
  let oldCode;
  while (code !== EOI_CODE) {
    if (code === CLEAR_CODE) {
      initDictionary();
      code = getNext(array);
      while (code === CLEAR_CODE) {
        code = getNext(array);
      }
      if (code === EOI_CODE) {
        break;
      } else if (code > CLEAR_CODE) {
        throw new Error(`corrupted code at scanline ${code}`);
      } else {
        const val = getDictionaryReversed(code);
        appendReversed(result, val);
        oldCode = code;
      }
    } else if (code < dictionaryLength) {
      const val = getDictionaryReversed(code);
      appendReversed(result, val);
      addToDictionary(oldCode, val[val.length - 1]);
      oldCode = code;
    } else {
      const oldVal = getDictionaryReversed(oldCode);
      if (!oldVal) {
        throw new Error(`Bogus entry. Not in dictionary, ${oldCode} / ${dictionaryLength}, position: ${position}`);
      }
      appendReversed(result, oldVal);
      result.push(oldVal[oldVal.length - 1]);
      addToDictionary(oldCode, oldVal[oldVal.length - 1]);
      oldCode = code;
    }
    if (dictionaryLength + 1 >= 2 ** byteLength) {
      if (byteLength === MAX_BYTELENGTH) {
        oldCode = void 0;
      } else {
        byteLength++;
      }
    }
    code = getNext(array);
  }
  return new Uint8Array(result);
}
var MIN_BITS, CLEAR_CODE, EOI_CODE, MAX_BYTELENGTH, LZWDecoder;
var init_lzw = __esm({
  "node_modules/geotiff/dist-module/compression/lzw.js"() {
    init_basedecoder();
    MIN_BITS = 9;
    CLEAR_CODE = 256;
    EOI_CODE = 257;
    MAX_BYTELENGTH = 12;
    LZWDecoder = class extends BaseDecoder {
      decodeBlock(buffer2) {
        return decompress(buffer2, false).buffer;
      }
    };
  }
});

// node_modules/geotiff/dist-module/compression/jpeg.js
var jpeg_exports = {};
__export(jpeg_exports, {
  default: () => JpegDecoder
});
function buildHuffmanTable(codeLengths, values2) {
  let k = 0;
  const code = [];
  let length = 16;
  while (length > 0 && !codeLengths[length - 1]) {
    --length;
  }
  code.push({ children: [], index: 0 });
  let p = code[0];
  let q;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < codeLengths[i]; j++) {
      p = code.pop();
      p.children[p.index] = values2[k];
      while (p.index > 0) {
        p = code.pop();
      }
      p.index++;
      code.push(p);
      while (code.length <= i) {
        code.push(q = { children: [], index: 0 });
        p.children[p.index] = q.children;
        p = q;
      }
      k++;
    }
    if (i + 1 < length) {
      code.push(q = { children: [], index: 0 });
      p.children[p.index] = q.children;
      p = q;
    }
  }
  return code[0].children;
}
function decodeScan(data, initialOffset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
  const { mcusPerLine, progressive } = frame;
  const startOffset = initialOffset;
  let offset = initialOffset;
  let bitsData = 0;
  let bitsCount = 0;
  function readBit() {
    if (bitsCount > 0) {
      bitsCount--;
      return bitsData >> bitsCount & 1;
    }
    bitsData = data[offset++];
    if (bitsData === 255) {
      const nextByte = data[offset++];
      if (nextByte) {
        throw new Error(`unexpected marker: ${(bitsData << 8 | nextByte).toString(16)}`);
      }
    }
    bitsCount = 7;
    return bitsData >>> 7;
  }
  function decodeHuffman(tree) {
    let node = tree;
    let bit;
    while ((bit = readBit()) !== null) {
      node = node[bit];
      if (typeof node === "number") {
        return node;
      }
      if (typeof node !== "object") {
        throw new Error("invalid huffman sequence");
      }
    }
    return null;
  }
  function receive(initialLength) {
    let length = initialLength;
    let n2 = 0;
    while (length > 0) {
      const bit = readBit();
      if (bit === null) {
        return void 0;
      }
      n2 = n2 << 1 | bit;
      --length;
    }
    return n2;
  }
  function receiveAndExtend(length) {
    const n2 = receive(length);
    if (n2 >= 1 << length - 1) {
      return n2;
    }
    return n2 + (-1 << length) + 1;
  }
  function decodeBaseline(component2, zz) {
    const t = decodeHuffman(component2.huffmanTableDC);
    const diff = t === 0 ? 0 : receiveAndExtend(t);
    component2.pred += diff;
    zz[0] = component2.pred;
    let k2 = 1;
    while (k2 < 64) {
      const rs = decodeHuffman(component2.huffmanTableAC);
      const s = rs & 15;
      const r = rs >> 4;
      if (s === 0) {
        if (r < 15) {
          break;
        }
        k2 += 16;
      } else {
        k2 += r;
        const z = dctZigZag[k2];
        zz[z] = receiveAndExtend(s);
        k2++;
      }
    }
  }
  function decodeDCFirst(component2, zz) {
    const t = decodeHuffman(component2.huffmanTableDC);
    const diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
    component2.pred += diff;
    zz[0] = component2.pred;
  }
  function decodeDCSuccessive(component2, zz) {
    zz[0] |= readBit() << successive;
  }
  let eobrun = 0;
  function decodeACFirst(component2, zz) {
    if (eobrun > 0) {
      eobrun--;
      return;
    }
    let k2 = spectralStart;
    const e = spectralEnd;
    while (k2 <= e) {
      const rs = decodeHuffman(component2.huffmanTableAC);
      const s = rs & 15;
      const r = rs >> 4;
      if (s === 0) {
        if (r < 15) {
          eobrun = receive(r) + (1 << r) - 1;
          break;
        }
        k2 += 16;
      } else {
        k2 += r;
        const z = dctZigZag[k2];
        zz[z] = receiveAndExtend(s) * (1 << successive);
        k2++;
      }
    }
  }
  let successiveACState = 0;
  let successiveACNextValue;
  function decodeACSuccessive(component2, zz) {
    let k2 = spectralStart;
    const e = spectralEnd;
    let r = 0;
    while (k2 <= e) {
      const z = dctZigZag[k2];
      const direction = zz[z] < 0 ? -1 : 1;
      switch (successiveACState) {
        case 0: {
          const rs = decodeHuffman(component2.huffmanTableAC);
          const s = rs & 15;
          r = rs >> 4;
          if (s === 0) {
            if (r < 15) {
              eobrun = receive(r) + (1 << r);
              successiveACState = 4;
            } else {
              r = 16;
              successiveACState = 1;
            }
          } else {
            if (s !== 1) {
              throw new Error("invalid ACn encoding");
            }
            successiveACNextValue = receiveAndExtend(s);
            successiveACState = r ? 2 : 3;
          }
          continue;
        }
        case 1:
        // skipping r zero items
        case 2:
          if (zz[z]) {
            zz[z] += (readBit() << successive) * direction;
          } else {
            r--;
            if (r === 0) {
              successiveACState = successiveACState === 2 ? 3 : 0;
            }
          }
          break;
        case 3:
          if (zz[z]) {
            zz[z] += (readBit() << successive) * direction;
          } else {
            zz[z] = successiveACNextValue << successive;
            successiveACState = 0;
          }
          break;
        case 4:
          if (zz[z]) {
            zz[z] += (readBit() << successive) * direction;
          }
          break;
        default:
          break;
      }
      k2++;
    }
    if (successiveACState === 4) {
      eobrun--;
      if (eobrun === 0) {
        successiveACState = 0;
      }
    }
  }
  function decodeMcu(component2, decodeFunction, mcu2, row, col) {
    const mcuRow = mcu2 / mcusPerLine | 0;
    const mcuCol = mcu2 % mcusPerLine;
    const blockRow = mcuRow * component2.v + row;
    const blockCol = mcuCol * component2.h + col;
    decodeFunction(component2, component2.blocks[blockRow][blockCol]);
  }
  function decodeBlock(component2, decodeFunction, mcu2) {
    const blockRow = mcu2 / component2.blocksPerLine | 0;
    const blockCol = mcu2 % component2.blocksPerLine;
    decodeFunction(component2, component2.blocks[blockRow][blockCol]);
  }
  const componentsLength = components.length;
  let component;
  let i;
  let j;
  let k;
  let n;
  let decodeFn;
  if (progressive) {
    if (spectralStart === 0) {
      decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
    } else {
      decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
    }
  } else {
    decodeFn = decodeBaseline;
  }
  let mcu = 0;
  let marker;
  let mcuExpected;
  if (componentsLength === 1) {
    mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
  } else {
    mcuExpected = mcusPerLine * frame.mcusPerColumn;
  }
  const usedResetInterval = resetInterval || mcuExpected;
  while (mcu < mcuExpected) {
    for (i = 0; i < componentsLength; i++) {
      components[i].pred = 0;
    }
    eobrun = 0;
    if (componentsLength === 1) {
      component = components[0];
      for (n = 0; n < usedResetInterval; n++) {
        decodeBlock(component, decodeFn, mcu);
        mcu++;
      }
    } else {
      for (n = 0; n < usedResetInterval; n++) {
        for (i = 0; i < componentsLength; i++) {
          component = components[i];
          const { h, v } = component;
          for (j = 0; j < v; j++) {
            for (k = 0; k < h; k++) {
              decodeMcu(component, decodeFn, mcu, j, k);
            }
          }
        }
        mcu++;
        if (mcu === mcuExpected) {
          break;
        }
      }
    }
    bitsCount = 0;
    marker = data[offset] << 8 | data[offset + 1];
    if (marker < 65280) {
      throw new Error("marker was not found");
    }
    if (marker >= 65488 && marker <= 65495) {
      offset += 2;
    } else {
      break;
    }
  }
  return offset - startOffset;
}
function buildComponentData(frame, component) {
  const lines = [];
  const { blocksPerLine, blocksPerColumn } = component;
  const samplesPerLine = blocksPerLine << 3;
  const R = new Int32Array(64);
  const r = new Uint8Array(64);
  function quantizeAndInverse(zz, dataOut, dataIn) {
    const qt = component.quantizationTable;
    let v0;
    let v1;
    let v2;
    let v3;
    let v4;
    let v5;
    let v6;
    let v7;
    let t;
    const p = dataIn;
    let i;
    for (i = 0; i < 64; i++) {
      p[i] = zz[i] * qt[i];
    }
    for (i = 0; i < 8; ++i) {
      const row = 8 * i;
      if (p[1 + row] === 0 && p[2 + row] === 0 && p[3 + row] === 0 && p[4 + row] === 0 && p[5 + row] === 0 && p[6 + row] === 0 && p[7 + row] === 0) {
        t = dctSqrt2 * p[0 + row] + 512 >> 10;
        p[0 + row] = t;
        p[1 + row] = t;
        p[2 + row] = t;
        p[3 + row] = t;
        p[4 + row] = t;
        p[5 + row] = t;
        p[6 + row] = t;
        p[7 + row] = t;
        continue;
      }
      v0 = dctSqrt2 * p[0 + row] + 128 >> 8;
      v1 = dctSqrt2 * p[4 + row] + 128 >> 8;
      v2 = p[2 + row];
      v3 = p[6 + row];
      v4 = dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128 >> 8;
      v7 = dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128 >> 8;
      v5 = p[3 + row] << 4;
      v6 = p[5 + row] << 4;
      t = v0 - v1 + 1 >> 1;
      v0 = v0 + v1 + 1 >> 1;
      v1 = t;
      t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
      v3 = t;
      t = v4 - v6 + 1 >> 1;
      v4 = v4 + v6 + 1 >> 1;
      v6 = t;
      t = v7 + v5 + 1 >> 1;
      v5 = v7 - v5 + 1 >> 1;
      v7 = t;
      t = v0 - v3 + 1 >> 1;
      v0 = v0 + v3 + 1 >> 1;
      v3 = t;
      t = v1 - v2 + 1 >> 1;
      v1 = v1 + v2 + 1 >> 1;
      v2 = t;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p[0 + row] = v0 + v7;
      p[7 + row] = v0 - v7;
      p[1 + row] = v1 + v6;
      p[6 + row] = v1 - v6;
      p[2 + row] = v2 + v5;
      p[5 + row] = v2 - v5;
      p[3 + row] = v3 + v4;
      p[4 + row] = v3 - v4;
    }
    for (i = 0; i < 8; ++i) {
      const col = i;
      if (p[1 * 8 + col] === 0 && p[2 * 8 + col] === 0 && p[3 * 8 + col] === 0 && p[4 * 8 + col] === 0 && p[5 * 8 + col] === 0 && p[6 * 8 + col] === 0 && p[7 * 8 + col] === 0) {
        t = dctSqrt2 * dataIn[i + 0] + 8192 >> 14;
        p[0 * 8 + col] = t;
        p[1 * 8 + col] = t;
        p[2 * 8 + col] = t;
        p[3 * 8 + col] = t;
        p[4 * 8 + col] = t;
        p[5 * 8 + col] = t;
        p[6 * 8 + col] = t;
        p[7 * 8 + col] = t;
        continue;
      }
      v0 = dctSqrt2 * p[0 * 8 + col] + 2048 >> 12;
      v1 = dctSqrt2 * p[4 * 8 + col] + 2048 >> 12;
      v2 = p[2 * 8 + col];
      v3 = p[6 * 8 + col];
      v4 = dctSqrt1d2 * (p[1 * 8 + col] - p[7 * 8 + col]) + 2048 >> 12;
      v7 = dctSqrt1d2 * (p[1 * 8 + col] + p[7 * 8 + col]) + 2048 >> 12;
      v5 = p[3 * 8 + col];
      v6 = p[5 * 8 + col];
      t = v0 - v1 + 1 >> 1;
      v0 = v0 + v1 + 1 >> 1;
      v1 = t;
      t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
      v3 = t;
      t = v4 - v6 + 1 >> 1;
      v4 = v4 + v6 + 1 >> 1;
      v6 = t;
      t = v7 + v5 + 1 >> 1;
      v5 = v7 - v5 + 1 >> 1;
      v7 = t;
      t = v0 - v3 + 1 >> 1;
      v0 = v0 + v3 + 1 >> 1;
      v3 = t;
      t = v1 - v2 + 1 >> 1;
      v1 = v1 + v2 + 1 >> 1;
      v2 = t;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p[0 * 8 + col] = v0 + v7;
      p[7 * 8 + col] = v0 - v7;
      p[1 * 8 + col] = v1 + v6;
      p[6 * 8 + col] = v1 - v6;
      p[2 * 8 + col] = v2 + v5;
      p[5 * 8 + col] = v2 - v5;
      p[3 * 8 + col] = v3 + v4;
      p[4 * 8 + col] = v3 - v4;
    }
    for (i = 0; i < 64; ++i) {
      const sample = 128 + (p[i] + 8 >> 4);
      if (sample < 0) {
        dataOut[i] = 0;
      } else if (sample > 255) {
        dataOut[i] = 255;
      } else {
        dataOut[i] = sample;
      }
    }
  }
  for (let blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
    const scanLine = blockRow << 3;
    for (let i = 0; i < 8; i++) {
      lines.push(new Uint8Array(samplesPerLine));
    }
    for (let blockCol = 0; blockCol < blocksPerLine; blockCol++) {
      quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);
      let offset = 0;
      const sample = blockCol << 3;
      for (let j = 0; j < 8; j++) {
        const line = lines[scanLine + j];
        for (let i = 0; i < 8; i++) {
          line[sample + i] = r[offset++];
        }
      }
    }
  }
  return lines;
}
var dctZigZag, dctCos1, dctSin1, dctCos3, dctSin3, dctCos6, dctSin6, dctSqrt2, dctSqrt1d2, JpegStreamReader, JpegDecoder;
var init_jpeg = __esm({
  "node_modules/geotiff/dist-module/compression/jpeg.js"() {
    init_basedecoder();
    dctZigZag = new Int32Array([
      0,
      1,
      8,
      16,
      9,
      2,
      3,
      10,
      17,
      24,
      32,
      25,
      18,
      11,
      4,
      5,
      12,
      19,
      26,
      33,
      40,
      48,
      41,
      34,
      27,
      20,
      13,
      6,
      7,
      14,
      21,
      28,
      35,
      42,
      49,
      56,
      57,
      50,
      43,
      36,
      29,
      22,
      15,
      23,
      30,
      37,
      44,
      51,
      58,
      59,
      52,
      45,
      38,
      31,
      39,
      46,
      53,
      60,
      61,
      54,
      47,
      55,
      62,
      63
    ]);
    dctCos1 = 4017;
    dctSin1 = 799;
    dctCos3 = 3406;
    dctSin3 = 2276;
    dctCos6 = 1567;
    dctSin6 = 3784;
    dctSqrt2 = 5793;
    dctSqrt1d2 = 2896;
    JpegStreamReader = class {
      constructor() {
        this.jfif = null;
        this.adobe = null;
        this.quantizationTables = [];
        this.huffmanTablesAC = [];
        this.huffmanTablesDC = [];
        this.resetFrames();
      }
      resetFrames() {
        this.frames = [];
      }
      parse(data) {
        let offset = 0;
        function readUint16() {
          const value = data[offset] << 8 | data[offset + 1];
          offset += 2;
          return value;
        }
        function readDataBlock() {
          const length = readUint16();
          const array = data.subarray(offset, offset + length - 2);
          offset += array.length;
          return array;
        }
        function prepareComponents(frame) {
          let maxH = 0;
          let maxV = 0;
          let component;
          let componentId;
          for (componentId in frame.components) {
            if (frame.components.hasOwnProperty(componentId)) {
              component = frame.components[componentId];
              if (maxH < component.h) {
                maxH = component.h;
              }
              if (maxV < component.v) {
                maxV = component.v;
              }
            }
          }
          const mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
          const mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
          for (componentId in frame.components) {
            if (frame.components.hasOwnProperty(componentId)) {
              component = frame.components[componentId];
              const blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
              const blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / maxV);
              const blocksPerLineForMcu = mcusPerLine * component.h;
              const blocksPerColumnForMcu = mcusPerColumn * component.v;
              const blocks = [];
              for (let i = 0; i < blocksPerColumnForMcu; i++) {
                const row = [];
                for (let j = 0; j < blocksPerLineForMcu; j++) {
                  row.push(new Int32Array(64));
                }
                blocks.push(row);
              }
              component.blocksPerLine = blocksPerLine;
              component.blocksPerColumn = blocksPerColumn;
              component.blocks = blocks;
            }
          }
          frame.maxH = maxH;
          frame.maxV = maxV;
          frame.mcusPerLine = mcusPerLine;
          frame.mcusPerColumn = mcusPerColumn;
        }
        let fileMarker = readUint16();
        if (fileMarker !== 65496) {
          throw new Error("SOI not found");
        }
        fileMarker = readUint16();
        while (fileMarker !== 65497) {
          switch (fileMarker) {
            case 65280:
              break;
            case 65504:
            // APP0 (Application Specific)
            case 65505:
            // APP1
            case 65506:
            // APP2
            case 65507:
            // APP3
            case 65508:
            // APP4
            case 65509:
            // APP5
            case 65510:
            // APP6
            case 65511:
            // APP7
            case 65512:
            // APP8
            case 65513:
            // APP9
            case 65514:
            // APP10
            case 65515:
            // APP11
            case 65516:
            // APP12
            case 65517:
            // APP13
            case 65518:
            // APP14
            case 65519:
            // APP15
            case 65534: {
              const appData = readDataBlock();
              if (fileMarker === 65504) {
                if (appData[0] === 74 && appData[1] === 70 && appData[2] === 73 && appData[3] === 70 && appData[4] === 0) {
                  this.jfif = {
                    version: { major: appData[5], minor: appData[6] },
                    densityUnits: appData[7],
                    xDensity: appData[8] << 8 | appData[9],
                    yDensity: appData[10] << 8 | appData[11],
                    thumbWidth: appData[12],
                    thumbHeight: appData[13],
                    thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                  };
                }
              }
              if (fileMarker === 65518) {
                if (appData[0] === 65 && appData[1] === 100 && appData[2] === 111 && appData[3] === 98 && appData[4] === 101 && appData[5] === 0) {
                  this.adobe = {
                    version: appData[6],
                    flags0: appData[7] << 8 | appData[8],
                    flags1: appData[9] << 8 | appData[10],
                    transformCode: appData[11]
                  };
                }
              }
              break;
            }
            case 65499: {
              const quantizationTablesLength = readUint16();
              const quantizationTablesEnd = quantizationTablesLength + offset - 2;
              while (offset < quantizationTablesEnd) {
                const quantizationTableSpec = data[offset++];
                const tableData = new Int32Array(64);
                if (quantizationTableSpec >> 4 === 0) {
                  for (let j = 0; j < 64; j++) {
                    const z = dctZigZag[j];
                    tableData[z] = data[offset++];
                  }
                } else if (quantizationTableSpec >> 4 === 1) {
                  for (let j = 0; j < 64; j++) {
                    const z = dctZigZag[j];
                    tableData[z] = readUint16();
                  }
                } else {
                  throw new Error("DQT: invalid table spec");
                }
                this.quantizationTables[quantizationTableSpec & 15] = tableData;
              }
              break;
            }
            case 65472:
            // SOF0 (Start of Frame, Baseline DCT)
            case 65473:
            // SOF1 (Start of Frame, Extended DCT)
            case 65474: {
              readUint16();
              const frame = {
                extended: fileMarker === 65473,
                progressive: fileMarker === 65474,
                precision: data[offset++],
                scanLines: readUint16(),
                samplesPerLine: readUint16(),
                components: {},
                componentsOrder: []
              };
              const componentsCount = data[offset++];
              let componentId;
              for (let i = 0; i < componentsCount; i++) {
                componentId = data[offset];
                const h = data[offset + 1] >> 4;
                const v = data[offset + 1] & 15;
                const qId = data[offset + 2];
                frame.componentsOrder.push(componentId);
                frame.components[componentId] = {
                  h,
                  v,
                  quantizationIdx: qId
                };
                offset += 3;
              }
              prepareComponents(frame);
              this.frames.push(frame);
              break;
            }
            case 65476: {
              const huffmanLength = readUint16();
              for (let i = 2; i < huffmanLength; ) {
                const huffmanTableSpec = data[offset++];
                const codeLengths = new Uint8Array(16);
                let codeLengthSum = 0;
                for (let j = 0; j < 16; j++, offset++) {
                  codeLengths[j] = data[offset];
                  codeLengthSum += codeLengths[j];
                }
                const huffmanValues = new Uint8Array(codeLengthSum);
                for (let j = 0; j < codeLengthSum; j++, offset++) {
                  huffmanValues[j] = data[offset];
                }
                i += 17 + codeLengthSum;
                if (huffmanTableSpec >> 4 === 0) {
                  this.huffmanTablesDC[huffmanTableSpec & 15] = buildHuffmanTable(
                    codeLengths,
                    huffmanValues
                  );
                } else {
                  this.huffmanTablesAC[huffmanTableSpec & 15] = buildHuffmanTable(
                    codeLengths,
                    huffmanValues
                  );
                }
              }
              break;
            }
            case 65501:
              readUint16();
              this.resetInterval = readUint16();
              break;
            case 65498: {
              readUint16();
              const selectorsCount = data[offset++];
              const components = [];
              const frame = this.frames[0];
              for (let i = 0; i < selectorsCount; i++) {
                const component = frame.components[data[offset++]];
                const tableSpec = data[offset++];
                component.huffmanTableDC = this.huffmanTablesDC[tableSpec >> 4];
                component.huffmanTableAC = this.huffmanTablesAC[tableSpec & 15];
                components.push(component);
              }
              const spectralStart = data[offset++];
              const spectralEnd = data[offset++];
              const successiveApproximation = data[offset++];
              const processed = decodeScan(
                data,
                offset,
                frame,
                components,
                this.resetInterval,
                spectralStart,
                spectralEnd,
                successiveApproximation >> 4,
                successiveApproximation & 15
              );
              offset += processed;
              break;
            }
            case 65535:
              if (data[offset] !== 255) {
                offset--;
              }
              break;
            default:
              if (data[offset - 3] === 255 && data[offset - 2] >= 192 && data[offset - 2] <= 254) {
                offset -= 3;
                break;
              }
              throw new Error(`unknown JPEG marker ${fileMarker.toString(16)}`);
          }
          fileMarker = readUint16();
        }
      }
      getResult() {
        const { frames } = this;
        if (this.frames.length === 0) {
          throw new Error("no frames were decoded");
        } else if (this.frames.length > 1) {
          console.warn("more than one frame is not supported");
        }
        for (let i = 0; i < this.frames.length; i++) {
          const cp = this.frames[i].components;
          for (const j of Object.keys(cp)) {
            cp[j].quantizationTable = this.quantizationTables[cp[j].quantizationIdx];
            delete cp[j].quantizationIdx;
          }
        }
        const frame = frames[0];
        const { components, componentsOrder } = frame;
        const outComponents = [];
        const width = frame.samplesPerLine;
        const height = frame.scanLines;
        for (let i = 0; i < componentsOrder.length; i++) {
          const component = components[componentsOrder[i]];
          outComponents.push({
            lines: buildComponentData(frame, component),
            scaleX: component.h / frame.maxH,
            scaleY: component.v / frame.maxV
          });
        }
        const out = new Uint8Array(width * height * outComponents.length);
        let oi = 0;
        for (let y = 0; y < height; ++y) {
          for (let x = 0; x < width; ++x) {
            for (let i = 0; i < outComponents.length; ++i) {
              const component = outComponents[i];
              out[oi] = component.lines[0 | y * component.scaleY][0 | x * component.scaleX];
              ++oi;
            }
          }
        }
        return out;
      }
    };
    JpegDecoder = class extends BaseDecoder {
      constructor(fileDirectory) {
        super();
        this.reader = new JpegStreamReader();
        if (fileDirectory.JPEGTables) {
          this.reader.parse(fileDirectory.JPEGTables);
        }
      }
      decodeBlock(buffer2) {
        this.reader.resetFrames();
        this.reader.parse(new Uint8Array(buffer2));
        return this.reader.getResult().buffer;
      }
    };
  }
});

// node_modules/pako/dist/pako.esm.mjs
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.legacy_hash = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
function Deflate$1(options) {
  this.options = common.assign({}, defaultOptions$1, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy,
    opt.legacyHash
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
function Inflate$1(options) {
  this.options = common.assign({}, defaultOptions, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input, true);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Z_FIXED$1, Z_BINARY, Z_TEXT, Z_UNKNOWN$1, STORED_BLOCK, STATIC_TREES, DYN_TREES, MIN_MATCH$1, MAX_MATCH$1, LENGTH_CODES$1, LITERALS$1, L_CODES$1, D_CODES$1, BL_CODES$1, HEAP_SIZE$1, MAX_BITS$1, Buf_size, MAX_BL_BITS, END_BLOCK, REP_3_6, REPZ_3_10, REPZ_11_138, extra_lbits, extra_dbits, extra_blbits, bl_order, DIST_CODE_LEN, static_ltree, static_dtree, _dist_code, _length_code, base_length, base_dist, static_l_desc, static_d_desc, static_bl_desc, d_code, put_short, send_bits, send_code, bi_reverse, bi_flush, gen_bitlen, gen_codes, tr_static_init, init_block, bi_windup, smaller, pqdownheap, compress_block, build_tree, scan_tree, send_tree, build_bl_tree, send_all_trees, detect_data_type, static_init_done, _tr_init$1, _tr_stored_block$1, _tr_align$1, _tr_flush_block$1, _tr_tally$1, _tr_init_1, _tr_stored_block_1, _tr_flush_block_1, _tr_tally_1, _tr_align_1, trees, adler32, adler32_1, makeTable, crcTable, crc32, crc32_1, messages, constants$2, _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align, Z_NO_FLUSH$2, Z_PARTIAL_FLUSH, Z_FULL_FLUSH$1, Z_FINISH$3, Z_BLOCK$1, Z_OK$3, Z_STREAM_END$3, Z_STREAM_ERROR$2, Z_DATA_ERROR$2, Z_BUF_ERROR$2, Z_DEFAULT_COMPRESSION$1, Z_FILTERED, Z_HUFFMAN_ONLY, Z_RLE, Z_FIXED, Z_DEFAULT_STRATEGY$1, Z_UNKNOWN, Z_DEFLATED$2, MAX_MEM_LEVEL, MAX_WBITS$1, DEF_MEM_LEVEL, LENGTH_CODES, LITERALS, L_CODES, D_CODES, BL_CODES, HEAP_SIZE, MAX_BITS, MIN_MATCH, MAX_MATCH, MIN_LOOKAHEAD, PRESET_DICT, INIT_STATE, GZIP_STATE, EXTRA_STATE, NAME_STATE, COMMENT_STATE, HCRC_STATE, BUSY_STATE, FINISH_STATE, BS_NEED_MORE, BS_BLOCK_DONE, BS_FINISH_STARTED, BS_FINISH_DONE, OS_CODE, err, rank, zero, slide_hash, HASH, INSERT_STRING, flush_pending, flush_block_only, put_byte, putShortMSB, read_buf, longest_match, fill_window, deflate_stored, deflate_fast, deflate_slow, deflate_rle, deflate_huff, configuration_table, lm_init, deflateStateCheck, deflateResetKeep, deflateReset, deflateSetHeader, deflateInit2, deflateInit, deflate$2, deflateEnd, deflateSetDictionary, deflateInit_1, deflateInit2_1, deflateReset_1, deflateResetKeep_1, deflateSetHeader_1, deflate_2$1, deflateEnd_1, deflateSetDictionary_1, deflateInfo, deflate_1$2, _has, assign, flattenChunks, common, STR_APPLY_UIA_OK, _utf8len, string2buf, buf2binstring, buf2string, utf8border, strings, zstream, toString$1, Z_NO_FLUSH$1, Z_SYNC_FLUSH, Z_FULL_FLUSH, Z_FINISH$2, Z_OK$2, Z_STREAM_END$2, Z_DEFAULT_COMPRESSION, Z_DEFAULT_STRATEGY, Z_DEFLATED$1, defaultOptions$1, Deflate_1$1, deflate_2, deflateRaw_1$1, gzip_1$1, constants$1, deflate_1$1, BAD$1, TYPE$1, inffast, MAXBITS, ENOUGH_LENS$1, ENOUGH_DISTS$1, CODES$1, LENS$1, DISTS$1, lbase, lext, dbase, dext, inflate_table, inftrees, CODES, LENS, DISTS, Z_FINISH$1, Z_BLOCK, Z_TREES, Z_OK$1, Z_STREAM_END$1, Z_NEED_DICT$1, Z_STREAM_ERROR$1, Z_DATA_ERROR$1, Z_MEM_ERROR$1, Z_BUF_ERROR$1, Z_DEFLATED, HEAD, FLAGS, TIME, OS, EXLEN, EXTRA, NAME, COMMENT, HCRC, DICTID, DICT, TYPE, TYPEDO, STORED, COPY_, COPY, TABLE, LENLENS, CODELENS, LEN_, LEN, LENEXT, DIST, DISTEXT, MATCH, LIT, CHECK, LENGTH, DONE, BAD, MEM, SYNC, ENOUGH_LENS, ENOUGH_DISTS, MAX_WBITS, DEF_WBITS, zswap32, inflateStateCheck, inflateResetKeep, inflateReset, inflateReset2, inflateInit2, inflateInit, virgin, lenfix, distfix, fixedtables, updatewindow, inflate$2, inflateEnd, inflateGetHeader, inflateSetDictionary, inflateReset_1, inflateReset2_1, inflateResetKeep_1, inflateInit_1, inflateInit2_1, inflate_2$1, inflateEnd_1, inflateGetHeader_1, inflateSetDictionary_1, inflateInfo, inflate_1$2, gzheader, toString, Z_NO_FLUSH, Z_FINISH, Z_OK, Z_STREAM_END, Z_NEED_DICT, Z_STREAM_ERROR, Z_DATA_ERROR, Z_MEM_ERROR, Z_BUF_ERROR, defaultOptions, Inflate_1$1, inflate_2, inflateRaw_1$1, ungzip$1, constants, inflate_1$1, Deflate, deflate, deflateRaw, gzip, Inflate, inflate, inflateRaw, ungzip, inflate_1;
var init_pako_esm = __esm({
  "node_modules/pako/dist/pako.esm.mjs"() {
    Z_FIXED$1 = 4;
    Z_BINARY = 0;
    Z_TEXT = 1;
    Z_UNKNOWN$1 = 2;
    STORED_BLOCK = 0;
    STATIC_TREES = 1;
    DYN_TREES = 2;
    MIN_MATCH$1 = 3;
    MAX_MATCH$1 = 258;
    LENGTH_CODES$1 = 29;
    LITERALS$1 = 256;
    L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
    D_CODES$1 = 30;
    BL_CODES$1 = 19;
    HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
    MAX_BITS$1 = 15;
    Buf_size = 16;
    MAX_BL_BITS = 7;
    END_BLOCK = 256;
    REP_3_6 = 16;
    REPZ_3_10 = 17;
    REPZ_11_138 = 18;
    extra_lbits = /* extra bits for each length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
    extra_dbits = /* extra bits for each distance code */
    new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
    extra_blbits = /* extra bits for each bit length code */
    new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
    bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    DIST_CODE_LEN = 512;
    static_ltree = new Array((L_CODES$1 + 2) * 2);
    zero$1(static_ltree);
    static_dtree = new Array(D_CODES$1 * 2);
    zero$1(static_dtree);
    _dist_code = new Array(DIST_CODE_LEN);
    zero$1(_dist_code);
    _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
    zero$1(_length_code);
    base_length = new Array(LENGTH_CODES$1);
    zero$1(base_length);
    base_dist = new Array(D_CODES$1);
    zero$1(base_dist);
    d_code = (dist) => {
      return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
    };
    put_short = (s, w) => {
      s.pending_buf[s.pending++] = w & 255;
      s.pending_buf[s.pending++] = w >>> 8 & 255;
    };
    send_bits = (s, value, length) => {
      if (s.bi_valid > Buf_size - length) {
        s.bi_buf |= value << s.bi_valid & 65535;
        put_short(s, s.bi_buf);
        s.bi_buf = value >> Buf_size - s.bi_valid;
        s.bi_valid += length - Buf_size;
      } else {
        s.bi_buf |= value << s.bi_valid & 65535;
        s.bi_valid += length;
      }
    };
    send_code = (s, c, tree) => {
      send_bits(
        s,
        tree[c * 2],
        tree[c * 2 + 1]
        /*.Len*/
      );
    };
    bi_reverse = (code, len) => {
      let res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);
      return res >>> 1;
    };
    bi_flush = (s) => {
      if (s.bi_valid === 16) {
        put_short(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;
      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 255;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    };
    gen_bitlen = (s, desc) => {
      const tree = desc.dyn_tree;
      const max_code = desc.max_code;
      const stree = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const extra = desc.stat_desc.extra_bits;
      const base = desc.stat_desc.extra_base;
      const max_length = desc.stat_desc.max_length;
      let h;
      let n, m;
      let bits;
      let xbits;
      let f;
      let overflow = 0;
      for (bits = 0; bits <= MAX_BITS$1; bits++) {
        s.bl_count[bits] = 0;
      }
      tree[s.heap[s.heap_max] * 2 + 1] = 0;
      for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1] = bits;
        if (n > max_code) {
          continue;
        }
        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) {
          xbits = extra[n - base];
        }
        f = tree[n * 2];
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1] + xbits);
        }
      }
      if (overflow === 0) {
        return;
      }
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) {
          bits--;
        }
        s.bl_count[bits]--;
        s.bl_count[bits + 1] += 2;
        s.bl_count[max_length]--;
        overflow -= 2;
      } while (overflow > 0);
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) {
            continue;
          }
          if (tree[m * 2 + 1] !== bits) {
            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
            tree[m * 2 + 1] = bits;
          }
          n--;
        }
      }
    };
    gen_codes = (tree, max_code, bl_count) => {
      const next_code = new Array(MAX_BITS$1 + 1);
      let code = 0;
      let bits;
      let n;
      for (bits = 1; bits <= MAX_BITS$1; bits++) {
        code = code + bl_count[bits - 1] << 1;
        next_code[bits] = code;
      }
      for (n = 0; n <= max_code; n++) {
        let len = tree[n * 2 + 1];
        if (len === 0) {
          continue;
        }
        tree[n * 2] = bi_reverse(next_code[len]++, len);
      }
    };
    tr_static_init = () => {
      let n;
      let bits;
      let length;
      let code;
      let dist;
      const bl_count = new Array(MAX_BITS$1 + 1);
      length = 0;
      for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
        base_length[code] = length;
        for (n = 0; n < 1 << extra_lbits[code]; n++) {
          _length_code[length++] = code;
        }
      }
      _length_code[length - 1] = code;
      dist = 0;
      for (code = 0; code < 16; code++) {
        base_dist[code] = dist;
        for (n = 0; n < 1 << extra_dbits[code]; n++) {
          _dist_code[dist++] = code;
        }
      }
      dist >>= 7;
      for (; code < D_CODES$1; code++) {
        base_dist[code] = dist << 7;
        for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
          _dist_code[256 + dist++] = code;
        }
      }
      for (bits = 0; bits <= MAX_BITS$1; bits++) {
        bl_count[bits] = 0;
      }
      n = 0;
      while (n <= 143) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree[n * 2 + 1] = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree[n * 2 + 1] = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
      for (n = 0; n < D_CODES$1; n++) {
        static_dtree[n * 2 + 1] = 5;
        static_dtree[n * 2] = bi_reverse(n, 5);
      }
      static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
      static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
      static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
    };
    init_block = (s) => {
      let n;
      for (n = 0; n < L_CODES$1; n++) {
        s.dyn_ltree[n * 2] = 0;
      }
      for (n = 0; n < D_CODES$1; n++) {
        s.dyn_dtree[n * 2] = 0;
      }
      for (n = 0; n < BL_CODES$1; n++) {
        s.bl_tree[n * 2] = 0;
      }
      s.dyn_ltree[END_BLOCK * 2] = 1;
      s.opt_len = s.static_len = 0;
      s.sym_next = s.matches = 0;
    };
    bi_windup = (s) => {
      if (s.bi_valid > 8) {
        put_short(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    };
    smaller = (tree, n, m, depth) => {
      const _n2 = n * 2;
      const _m2 = m * 2;
      return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
    };
    pqdownheap = (s, tree, k) => {
      const v = s.heap[k];
      let j = k << 1;
      while (j <= s.heap_len) {
        if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        if (smaller(tree, v, s.heap[j], s.depth)) {
          break;
        }
        s.heap[k] = s.heap[j];
        k = j;
        j <<= 1;
      }
      s.heap[k] = v;
    };
    compress_block = (s, ltree, dtree) => {
      let dist;
      let lc;
      let sx = 0;
      let code;
      let extra;
      if (s.sym_next !== 0) {
        do {
          dist = s.pending_buf[s.sym_buf + sx++] & 255;
          dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
          lc = s.pending_buf[s.sym_buf + sx++];
          if (dist === 0) {
            send_code(s, lc, ltree);
          } else {
            code = _length_code[lc];
            send_code(s, code + LITERALS$1 + 1, ltree);
            extra = extra_lbits[code];
            if (extra !== 0) {
              lc -= base_length[code];
              send_bits(s, lc, extra);
            }
            dist--;
            code = d_code(dist);
            send_code(s, code, dtree);
            extra = extra_dbits[code];
            if (extra !== 0) {
              dist -= base_dist[code];
              send_bits(s, dist, extra);
            }
          }
        } while (sx < s.sym_next);
      }
      send_code(s, END_BLOCK, ltree);
    };
    build_tree = (s, desc) => {
      const tree = desc.dyn_tree;
      const stree = desc.stat_desc.static_tree;
      const has_stree = desc.stat_desc.has_stree;
      const elems = desc.stat_desc.elems;
      let n, m;
      let max_code = -1;
      let node;
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE$1;
      for (n = 0; n < elems; n++) {
        if (tree[n * 2] !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
        } else {
          tree[n * 2 + 1] = 0;
        }
      }
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
        tree[node * 2] = 1;
        s.depth[node] = 0;
        s.opt_len--;
        if (has_stree) {
          s.static_len -= stree[node * 2 + 1];
        }
      }
      desc.max_code = max_code;
      for (n = s.heap_len >> 1; n >= 1; n--) {
        pqdownheap(s, tree, n);
      }
      node = elems;
      do {
        n = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[
          1
          /*SMALLEST*/
        ] = s.heap[s.heap_len--];
        pqdownheap(
          s,
          tree,
          1
          /*SMALLEST*/
        );
        m = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[--s.heap_max] = n;
        s.heap[--s.heap_max] = m;
        tree[node * 2] = tree[n * 2] + tree[m * 2];
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1] = tree[m * 2 + 1] = node;
        s.heap[
          1
          /*SMALLEST*/
        ] = node++;
        pqdownheap(
          s,
          tree,
          1
          /*SMALLEST*/
        );
      } while (s.heap_len >= 2);
      s.heap[--s.heap_max] = s.heap[
        1
        /*SMALLEST*/
      ];
      gen_bitlen(s, desc);
      gen_codes(tree, max_code, s.bl_count);
    };
    scan_tree = (s, tree, max_code) => {
      let n;
      let prevlen = -1;
      let curlen;
      let nextlen = tree[0 * 2 + 1];
      let count = 0;
      let max_count = 7;
      let min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1] = 65535;
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          s.bl_tree[curlen * 2] += count;
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            s.bl_tree[curlen * 2]++;
          }
          s.bl_tree[REP_3_6 * 2]++;
        } else if (count <= 10) {
          s.bl_tree[REPZ_3_10 * 2]++;
        } else {
          s.bl_tree[REPZ_11_138 * 2]++;
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    send_tree = (s, tree, max_code) => {
      let n;
      let prevlen = -1;
      let curlen;
      let nextlen = tree[0 * 2 + 1];
      let count = 0;
      let max_count = 7;
      let min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          do {
            send_code(s, curlen, s.bl_tree);
          } while (--count !== 0);
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code(s, curlen, s.bl_tree);
            count--;
          }
          send_code(s, REP_3_6, s.bl_tree);
          send_bits(s, count - 3, 2);
        } else if (count <= 10) {
          send_code(s, REPZ_3_10, s.bl_tree);
          send_bits(s, count - 3, 3);
        } else {
          send_code(s, REPZ_11_138, s.bl_tree);
          send_bits(s, count - 11, 7);
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    };
    build_bl_tree = (s) => {
      let max_blindex;
      scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
      build_tree(s, s.bl_desc);
      for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
          break;
        }
      }
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex;
    };
    send_all_trees = (s, lcodes, dcodes, blcodes) => {
      let rank2;
      send_bits(s, lcodes - 257, 5);
      send_bits(s, dcodes - 1, 5);
      send_bits(s, blcodes - 4, 4);
      for (rank2 = 0; rank2 < blcodes; rank2++) {
        send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
      }
      send_tree(s, s.dyn_ltree, lcodes - 1);
      send_tree(s, s.dyn_dtree, dcodes - 1);
    };
    detect_data_type = (s) => {
      let block_mask = 4093624447;
      let n;
      for (n = 0; n <= 31; n++, block_mask >>>= 1) {
        if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
          return Z_BINARY;
        }
      }
      if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
        return Z_TEXT;
      }
      for (n = 32; n < LITERALS$1; n++) {
        if (s.dyn_ltree[n * 2] !== 0) {
          return Z_TEXT;
        }
      }
      return Z_BINARY;
    };
    static_init_done = false;
    _tr_init$1 = (s) => {
      if (!static_init_done) {
        tr_static_init();
        static_init_done = true;
      }
      s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
      s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
      s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
      s.bi_buf = 0;
      s.bi_valid = 0;
      init_block(s);
    };
    _tr_stored_block$1 = (s, buf, stored_len, last) => {
      send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
      bi_windup(s);
      put_short(s, stored_len);
      put_short(s, ~stored_len);
      if (stored_len) {
        s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
      }
      s.pending += stored_len;
    };
    _tr_align$1 = (s) => {
      send_bits(s, STATIC_TREES << 1, 3);
      send_code(s, END_BLOCK, static_ltree);
      bi_flush(s);
    };
    _tr_flush_block$1 = (s, buf, stored_len, last) => {
      let opt_lenb, static_lenb;
      let max_blindex = 0;
      if (s.level > 0) {
        if (s.strm.data_type === Z_UNKNOWN$1) {
          s.strm.data_type = detect_data_type(s);
        }
        build_tree(s, s.l_desc);
        build_tree(s, s.d_desc);
        max_blindex = build_bl_tree(s);
        opt_lenb = s.opt_len + 3 + 7 >>> 3;
        static_lenb = s.static_len + 3 + 7 >>> 3;
        if (static_lenb <= opt_lenb) {
          opt_lenb = static_lenb;
        }
      } else {
        opt_lenb = static_lenb = stored_len + 5;
      }
      if (stored_len + 4 <= opt_lenb && buf !== -1) {
        _tr_stored_block$1(s, buf, stored_len, last);
      } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
        send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
        compress_block(s, static_ltree, static_dtree);
      } else {
        send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
        send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block(s, s.dyn_ltree, s.dyn_dtree);
      }
      init_block(s);
      if (last) {
        bi_windup(s);
      }
    };
    _tr_tally$1 = (s, dist, lc) => {
      s.pending_buf[s.sym_buf + s.sym_next++] = dist;
      s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
      s.pending_buf[s.sym_buf + s.sym_next++] = lc;
      if (dist === 0) {
        s.dyn_ltree[lc * 2]++;
      } else {
        s.matches++;
        dist--;
        s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
        s.dyn_dtree[d_code(dist) * 2]++;
      }
      return s.sym_next === s.sym_end;
    };
    _tr_init_1 = _tr_init$1;
    _tr_stored_block_1 = _tr_stored_block$1;
    _tr_flush_block_1 = _tr_flush_block$1;
    _tr_tally_1 = _tr_tally$1;
    _tr_align_1 = _tr_align$1;
    trees = {
      _tr_init: _tr_init_1,
      _tr_stored_block: _tr_stored_block_1,
      _tr_flush_block: _tr_flush_block_1,
      _tr_tally: _tr_tally_1,
      _tr_align: _tr_align_1
    };
    adler32 = (adler, buf, len, pos) => {
      let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
      while (len !== 0) {
        n = len > 2e3 ? 2e3 : len;
        len -= n;
        do {
          s1 = s1 + buf[pos++] | 0;
          s2 = s2 + s1 | 0;
        } while (--n);
        s1 %= 65521;
        s2 %= 65521;
      }
      return s1 | s2 << 16 | 0;
    };
    adler32_1 = adler32;
    makeTable = () => {
      let c, table = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        table[n] = c;
      }
      return table;
    };
    crcTable = new Uint32Array(makeTable());
    crc32 = (crc, buf, len, pos) => {
      const t = crcTable;
      const end = pos + len;
      crc ^= -1;
      for (let i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
      }
      return crc ^ -1;
    };
    crc32_1 = crc32;
    messages = {
      2: "need dictionary",
      /* Z_NEED_DICT       2  */
      1: "stream end",
      /* Z_STREAM_END      1  */
      0: "",
      /* Z_OK              0  */
      "-1": "file error",
      /* Z_ERRNO         (-1) */
      "-2": "stream error",
      /* Z_STREAM_ERROR  (-2) */
      "-3": "data error",
      /* Z_DATA_ERROR    (-3) */
      "-4": "insufficient memory",
      /* Z_MEM_ERROR     (-4) */
      "-5": "buffer error",
      /* Z_BUF_ERROR     (-5) */
      "-6": "incompatible version"
      /* Z_VERSION_ERROR (-6) */
    };
    constants$2 = {
      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      Z_MEM_ERROR: -4,
      Z_BUF_ERROR: -5,
      //Z_VERSION_ERROR: -6,
      /* compression levels */
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY: 0,
      Z_TEXT: 1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN: 2,
      /* The deflate compression method */
      Z_DEFLATED: 8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };
    ({ _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees);
    ({
      Z_NO_FLUSH: Z_NO_FLUSH$2,
      Z_PARTIAL_FLUSH,
      Z_FULL_FLUSH: Z_FULL_FLUSH$1,
      Z_FINISH: Z_FINISH$3,
      Z_BLOCK: Z_BLOCK$1,
      Z_OK: Z_OK$3,
      Z_STREAM_END: Z_STREAM_END$3,
      Z_STREAM_ERROR: Z_STREAM_ERROR$2,
      Z_DATA_ERROR: Z_DATA_ERROR$2,
      Z_BUF_ERROR: Z_BUF_ERROR$2,
      Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
      Z_FILTERED,
      Z_HUFFMAN_ONLY,
      Z_RLE,
      Z_FIXED,
      Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
      Z_UNKNOWN,
      Z_DEFLATED: Z_DEFLATED$2
    } = constants$2);
    MAX_MEM_LEVEL = 9;
    MAX_WBITS$1 = 15;
    DEF_MEM_LEVEL = 8;
    LENGTH_CODES = 29;
    LITERALS = 256;
    L_CODES = LITERALS + 1 + LENGTH_CODES;
    D_CODES = 30;
    BL_CODES = 19;
    HEAP_SIZE = 2 * L_CODES + 1;
    MAX_BITS = 15;
    MIN_MATCH = 3;
    MAX_MATCH = 258;
    MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
    PRESET_DICT = 32;
    INIT_STATE = 42;
    GZIP_STATE = 57;
    EXTRA_STATE = 69;
    NAME_STATE = 73;
    COMMENT_STATE = 91;
    HCRC_STATE = 103;
    BUSY_STATE = 113;
    FINISH_STATE = 666;
    BS_NEED_MORE = 1;
    BS_BLOCK_DONE = 2;
    BS_FINISH_STARTED = 3;
    BS_FINISH_DONE = 4;
    OS_CODE = 3;
    err = (strm, errorCode) => {
      strm.msg = messages[errorCode];
      return errorCode;
    };
    rank = (f) => {
      return f * 2 - (f > 4 ? 9 : 0);
    };
    zero = (buf) => {
      let len = buf.length;
      while (--len >= 0) {
        buf[len] = 0;
      }
    };
    slide_hash = (s) => {
      let n, m;
      let p;
      let wsize = s.w_size;
      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = m >= wsize ? m - wsize : 0;
      } while (--n);
      n = wsize;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = m >= wsize ? m - wsize : 0;
      } while (--n);
    };
    HASH = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
    INSERT_STRING = (s, str) => {
      let h;
      if (s.legacy_hash) {
        h = s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      } else {
        const w = s.window;
        const value = w[str] | w[str + 1] << 8 | w[str + 2] << 16 | w[str + 3] << 24;
        h = s.ins_h = Math.imul(value, 66521) + 66521 >>> 16 & s.hash_mask;
      }
      const hash_head = s.prev[str & s.w_mask] = s.head[h];
      s.head[h] = str;
      return hash_head;
    };
    flush_pending = (strm) => {
      const s = strm.state;
      let len = s.pending;
      if (len > strm.avail_out) {
        len = strm.avail_out;
      }
      if (len === 0) {
        return;
      }
      strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
      strm.next_out += len;
      s.pending_out += len;
      strm.total_out += len;
      strm.avail_out -= len;
      s.pending -= len;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    };
    flush_block_only = (s, last) => {
      _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending(s.strm);
    };
    put_byte = (s, b) => {
      s.pending_buf[s.pending++] = b;
    };
    putShortMSB = (s, b) => {
      s.pending_buf[s.pending++] = b >>> 8 & 255;
      s.pending_buf[s.pending++] = b & 255;
    };
    read_buf = (strm, buf, start, size) => {
      let len = strm.avail_in;
      if (len > size) {
        len = size;
      }
      if (len === 0) {
        return 0;
      }
      strm.avail_in -= len;
      buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
      if (strm.state.wrap === 1) {
        strm.adler = adler32_1(strm.adler, buf, len, start);
      } else if (strm.state.wrap === 2) {
        strm.adler = crc32_1(strm.adler, buf, len, start);
      }
      strm.next_in += len;
      strm.total_in += len;
      return len;
    };
    longest_match = (s, cur_match) => {
      let chain_length = s.max_chain_length;
      let scan = s.strstart;
      let match;
      let len;
      let best_len = s.prev_length;
      let nice_match = s.nice_match;
      const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
      const _win = s.window;
      const wmask = s.w_mask;
      const prev = s.prev;
      const strend = s.strstart + MAX_MATCH;
      let scan_end1 = _win[scan + best_len - 1];
      let scan_end = _win[scan + best_len];
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      if (nice_match > s.lookahead) {
        nice_match = s.lookahead;
      }
      do {
        match = cur_match;
        if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
          continue;
        }
        scan += 2;
        match++;
        do {
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
        len = MAX_MATCH - (strend - scan);
        scan = strend - MAX_MATCH;
        if (len > best_len) {
          s.match_start = cur_match;
          best_len = len;
          if (len >= nice_match) {
            break;
          }
          scan_end1 = _win[scan + best_len - 1];
          scan_end = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    };
    fill_window = (s) => {
      const _w_size = s.w_size;
      let n, more, str;
      do {
        more = s.window_size - s.lookahead - s.strstart;
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
          s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          s.block_start -= _w_size;
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
          slide_hash(s);
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }
        n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;
        if (!s.legacy_hash) {
          if (s.lookahead + s.insert > MIN_MATCH) {
            str = s.strstart - s.insert;
            while (s.insert) {
              INSERT_STRING(s, str);
              str++;
              s.insert--;
              if (s.lookahead + s.insert <= MIN_MATCH) {
                break;
              }
            }
          }
        } else if (s.lookahead + s.insert >= MIN_MATCH) {
          str = s.strstart - s.insert;
          s.ins_h = s.window[str];
          s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
          while (s.insert) {
            INSERT_STRING(s, str);
            str++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH) {
              break;
            }
          }
        }
      } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
    };
    deflate_stored = (s, flush) => {
      let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
      let len, left, have, last = 0;
      let used = s.strm.avail_in;
      do {
        len = 65535;
        have = s.bi_valid + 42 >> 3;
        if (s.strm.avail_out < have) {
          break;
        }
        have = s.strm.avail_out - have;
        left = s.strstart - s.block_start;
        if (len > left + s.strm.avail_in) {
          len = left + s.strm.avail_in;
        }
        if (len > have) {
          len = have;
        }
        if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
          break;
        }
        last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
        _tr_stored_block(s, 0, 0, last);
        s.pending_buf[s.pending - 4] = len;
        s.pending_buf[s.pending - 3] = len >> 8;
        s.pending_buf[s.pending - 2] = ~len;
        s.pending_buf[s.pending - 1] = ~len >> 8;
        flush_pending(s.strm);
        if (left) {
          if (left > len) {
            left = len;
          }
          s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
          s.strm.next_out += left;
          s.strm.avail_out -= left;
          s.strm.total_out += left;
          s.block_start += left;
          len -= left;
        }
        if (len) {
          read_buf(s.strm, s.strm.output, s.strm.next_out, len);
          s.strm.next_out += len;
          s.strm.avail_out -= len;
          s.strm.total_out += len;
        }
      } while (last === 0);
      used -= s.strm.avail_in;
      if (used) {
        if (used >= s.w_size) {
          s.matches = 2;
          s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
          s.strstart = s.w_size;
          s.insert = s.strstart;
        } else {
          if (s.window_size - s.strstart <= used) {
            s.strstart -= s.w_size;
            s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
            if (s.matches < 2) {
              s.matches++;
            }
            if (s.insert > s.strstart) {
              s.insert = s.strstart;
            }
          }
          s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
          s.strstart += used;
          s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
        }
        s.block_start = s.strstart;
      }
      if (s.high_water < s.strstart) {
        s.high_water = s.strstart;
      }
      if (last) {
        return BS_FINISH_DONE;
      }
      if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
        return BS_BLOCK_DONE;
      }
      have = s.window_size - s.strstart;
      if (s.strm.avail_in > have && s.block_start >= s.w_size) {
        s.block_start -= s.w_size;
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        have += s.w_size;
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      if (have > s.strm.avail_in) {
        have = s.strm.avail_in;
      }
      if (have) {
        read_buf(s.strm, s.window, s.strstart, have);
        s.strstart += have;
        s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
      }
      if (s.high_water < s.strstart) {
        s.high_water = s.strstart;
      }
      have = s.bi_valid + 42 >> 3;
      have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
      min_block = have > s.w_size ? s.w_size : have;
      left = s.strstart - s.block_start;
      if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
        len = left > have ? have : left;
        last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
        _tr_stored_block(s, s.block_start, len, last);
        s.block_start += len;
        flush_pending(s.strm);
      }
      return last ? BS_FINISH_STARTED : BS_NEED_MORE;
    };
    deflate_fast = (s, flush) => {
      let hash_head;
      let bflush;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH) {
          hash_head = INSERT_STRING(s, s.strstart);
        }
        if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
        }
        if (s.match_length >= MIN_MATCH) {
          bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
          s.lookahead -= s.match_length;
          if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
            s.match_length--;
            do {
              s.strstart++;
              hash_head = INSERT_STRING(s, s.strstart);
            } while (--s.match_length !== 0);
            s.strstart++;
          } else {
            s.strstart += s.match_length;
            s.match_length = 0;
            if (s.legacy_hash) {
              s.ins_h = s.window[s.strstart];
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
            }
          }
        } else {
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH$3) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    deflate_slow = (s, flush) => {
      let hash_head;
      let bflush;
      let max_insert;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD) {
          fill_window(s);
          if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH) {
          hash_head = INSERT_STRING(s, s.strstart);
        }
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH - 1;
        if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
          s.match_length = longest_match(s, hash_head);
          if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
            s.match_length = MIN_MATCH - 1;
          }
        }
        if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH;
          bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              hash_head = INSERT_STRING(s, s.strstart);
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH - 1;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        } else if (s.match_available) {
          bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
          if (bflush) {
            flush_block_only(s, false);
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        } else {
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      if (s.match_available) {
        bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
      if (flush === Z_FINISH$3) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    deflate_rle = (s, flush) => {
      let bflush;
      let prev;
      let scan, strend;
      const _win = s.window;
      for (; ; ) {
        if (s.lookahead <= MAX_MATCH) {
          fill_window(s);
          if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
            return BS_NEED_MORE;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH;
            do {
            } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
            s.match_length = MAX_MATCH - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
        }
        if (s.match_length >= MIN_MATCH) {
          bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH$3) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    deflate_huff = (s, flush) => {
      let bflush;
      for (; ; ) {
        if (s.lookahead === 0) {
          fill_window(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH$2) {
              return BS_NEED_MORE;
            }
            break;
          }
        }
        s.match_length = 0;
        bflush = _tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH$3) {
        flush_block_only(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED;
        }
        return BS_FINISH_DONE;
      }
      if (s.sym_next) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
      return BS_BLOCK_DONE;
    };
    configuration_table = [
      /*      good lazy nice chain */
      new Config(0, 0, 0, 0, deflate_stored),
      /* 0 store only */
      new Config(4, 4, 8, 4, deflate_fast),
      /* 1 max speed, no lazy matches */
      new Config(4, 5, 16, 8, deflate_fast),
      /* 2 */
      new Config(4, 6, 32, 32, deflate_fast),
      /* 3 */
      new Config(4, 4, 16, 16, deflate_slow),
      /* 4 lazy matches */
      new Config(8, 16, 32, 32, deflate_slow),
      /* 5 */
      new Config(8, 16, 128, 128, deflate_slow),
      /* 6 */
      new Config(8, 32, 128, 256, deflate_slow),
      /* 7 */
      new Config(32, 128, 258, 1024, deflate_slow),
      /* 8 */
      new Config(32, 258, 258, 4096, deflate_slow)
      /* 9 max compression */
    ];
    lm_init = (s) => {
      s.window_size = 2 * s.w_size;
      zero(s.head);
      s.max_lazy_match = configuration_table[s.level].max_lazy;
      s.good_match = configuration_table[s.level].good_length;
      s.nice_match = configuration_table[s.level].nice_length;
      s.max_chain_length = configuration_table[s.level].max_chain;
      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      s.ins_h = 0;
    };
    deflateStateCheck = (strm) => {
      if (!strm) {
        return 1;
      }
      const s = strm.state;
      if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
      s.status !== GZIP_STATE && //#endif
      s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
        return 1;
      }
      return 0;
    };
    deflateResetKeep = (strm) => {
      if (deflateStateCheck(strm)) {
        return err(strm, Z_STREAM_ERROR$2);
      }
      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN;
      const s = strm.state;
      s.pending = 0;
      s.pending_out = 0;
      if (s.wrap < 0) {
        s.wrap = -s.wrap;
      }
      s.status = //#ifdef GZIP
      s.wrap === 2 ? GZIP_STATE : (
        //#endif
        s.wrap ? INIT_STATE : BUSY_STATE
      );
      strm.adler = s.wrap === 2 ? 0 : 1;
      s.last_flush = -2;
      _tr_init(s);
      return Z_OK$3;
    };
    deflateReset = (strm) => {
      const ret = deflateResetKeep(strm);
      if (ret === Z_OK$3) {
        lm_init(strm.state);
      }
      return ret;
    };
    deflateSetHeader = (strm, head) => {
      if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
        return Z_STREAM_ERROR$2;
      }
      strm.state.gzhead = head;
      return Z_OK$3;
    };
    deflateInit2 = (strm, level, method, windowBits, memLevel, strategy, legacyHash) => {
      if (!strm) {
        return Z_STREAM_ERROR$2;
      }
      let wrap = 1;
      if (level === Z_DEFAULT_COMPRESSION$1) {
        level = 6;
      }
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else if (windowBits > 15) {
        wrap = 2;
        windowBits -= 16;
      }
      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
        return err(strm, Z_STREAM_ERROR$2);
      }
      if (windowBits === 8) {
        windowBits = 9;
      }
      const s = new DeflateState();
      strm.state = s;
      s.strm = strm;
      s.status = INIT_STATE;
      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;
      s.legacy_hash = legacyHash ? 1 : 0;
      s.hash_bits = memLevel + 7;
      if (!s.legacy_hash && s.hash_bits < 15) {
        s.hash_bits = 15;
      }
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
      s.window = new Uint8Array(s.w_size * 2);
      s.head = new Uint16Array(s.hash_size);
      s.prev = new Uint16Array(s.w_size);
      s.lit_bufsize = 1 << memLevel + 6;
      s.pending_buf_size = s.lit_bufsize * 4;
      s.pending_buf = new Uint8Array(s.pending_buf_size);
      s.sym_buf = s.lit_bufsize;
      s.sym_end = (s.lit_bufsize - 1) * 3;
      s.level = level;
      s.strategy = strategy;
      s.method = method;
      return deflateReset(strm);
    };
    deflateInit = (strm, level) => {
      return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
    };
    deflate$2 = (strm, flush) => {
      if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
        return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
      }
      const s = strm.state;
      if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
        return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$2 : Z_STREAM_ERROR$2);
      }
      const old_flush = s.last_flush;
      s.last_flush = flush;
      if (s.pending !== 0) {
        flush_pending(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
        return err(strm, Z_BUF_ERROR$2);
      }
      if (s.status === FINISH_STATE && strm.avail_in !== 0) {
        return err(strm, Z_BUF_ERROR$2);
      }
      if (s.status === INIT_STATE && s.wrap === 0) {
        s.status = BUSY_STATE;
      }
      if (s.status === INIT_STATE) {
        let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
        let level_flags = -1;
        if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
          level_flags = 0;
        } else if (s.level < 6) {
          level_flags = 1;
        } else if (s.level === 6) {
          level_flags = 2;
        } else {
          level_flags = 3;
        }
        header |= level_flags << 6;
        if (s.strstart !== 0) {
          header |= PRESET_DICT;
        }
        header += 31 - header % 31;
        putShortMSB(s, header);
        if (s.strstart !== 0) {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        strm.adler = 1;
        s.status = BUSY_STATE;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      if (s.status === GZIP_STATE) {
        strm.adler = 0;
        put_byte(s, 31);
        put_byte(s, 139);
        put_byte(s, 8);
        if (!s.gzhead) {
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, 0);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, OS_CODE);
          s.status = BUSY_STATE;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        } else {
          put_byte(
            s,
            (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
          );
          put_byte(s, s.gzhead.time & 255);
          put_byte(s, s.gzhead.time >> 8 & 255);
          put_byte(s, s.gzhead.time >> 16 & 255);
          put_byte(s, s.gzhead.time >> 24 & 255);
          put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
          put_byte(s, s.gzhead.os & 255);
          if (s.gzhead.extra && s.gzhead.extra.length) {
            put_byte(s, s.gzhead.extra.length & 255);
            put_byte(s, s.gzhead.extra.length >> 8 & 255);
          }
          if (s.gzhead.hcrc) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
          }
          s.gzindex = 0;
          s.status = EXTRA_STATE;
        }
      }
      if (s.status === EXTRA_STATE) {
        if (s.gzhead.extra) {
          let beg = s.pending;
          let left = (s.gzhead.extra.length & 65535) - s.gzindex;
          while (s.pending + left > s.pending_buf_size) {
            let copy = s.pending_buf_size - s.pending;
            s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
            s.pending = s.pending_buf_size;
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex += copy;
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
            beg = 0;
            left -= copy;
          }
          let gzhead_extra = new Uint8Array(s.gzhead.extra);
          s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
          s.pending += left;
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          s.gzindex = 0;
        }
        s.status = NAME_STATE;
      }
      if (s.status === NAME_STATE) {
        if (s.gzhead.name) {
          let beg = s.pending;
          let val;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
              beg = 0;
            }
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          s.gzindex = 0;
        }
        s.status = COMMENT_STATE;
      }
      if (s.status === COMMENT_STATE) {
        if (s.gzhead.comment) {
          let beg = s.pending;
          let val;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK$3;
              }
              beg = 0;
            }
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
        }
        s.status = HCRC_STATE;
      }
      if (s.status === HCRC_STATE) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK$3;
            }
          }
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          strm.adler = 0;
        }
        s.status = BUSY_STATE;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
        let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
        if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
          s.status = FINISH_STATE;
        }
        if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
          }
          return Z_OK$3;
        }
        if (bstate === BS_BLOCK_DONE) {
          if (flush === Z_PARTIAL_FLUSH) {
            _tr_align(s);
          } else if (flush !== Z_BLOCK$1) {
            _tr_stored_block(s, 0, 0, false);
            if (flush === Z_FULL_FLUSH$1) {
              zero(s.head);
              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
        }
      }
      if (flush !== Z_FINISH$3) {
        return Z_OK$3;
      }
      if (s.wrap <= 0) {
        return Z_STREAM_END$3;
      }
      if (s.wrap === 2) {
        put_byte(s, strm.adler & 255);
        put_byte(s, strm.adler >> 8 & 255);
        put_byte(s, strm.adler >> 16 & 255);
        put_byte(s, strm.adler >> 24 & 255);
        put_byte(s, strm.total_in & 255);
        put_byte(s, strm.total_in >> 8 & 255);
        put_byte(s, strm.total_in >> 16 & 255);
        put_byte(s, strm.total_in >> 24 & 255);
      } else {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 65535);
      }
      flush_pending(strm);
      if (s.wrap > 0) {
        s.wrap = -s.wrap;
      }
      return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
    };
    deflateEnd = (strm) => {
      if (deflateStateCheck(strm)) {
        return Z_STREAM_ERROR$2;
      }
      const status = strm.state.status;
      strm.state = null;
      return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
    };
    deflateSetDictionary = (strm, dictionary) => {
      let dictLength = dictionary.length;
      if (deflateStateCheck(strm)) {
        return Z_STREAM_ERROR$2;
      }
      const s = strm.state;
      const wrap = s.wrap;
      if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
        return Z_STREAM_ERROR$2;
      }
      if (wrap === 1) {
        strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
      }
      s.wrap = 0;
      if (dictLength >= s.w_size) {
        if (wrap === 0) {
          zero(s.head);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        let tmpDict = new Uint8Array(s.w_size);
        tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      const avail = strm.avail_in;
      const next3 = strm.next_in;
      const input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window(s);
      while (s.lookahead >= MIN_MATCH) {
        let str = s.strstart;
        let n = s.lookahead - (MIN_MATCH - 1);
        do {
          INSERT_STRING(s, str);
          str++;
        } while (--n);
        s.strstart = str;
        s.lookahead = MIN_MATCH - 1;
        fill_window(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH - 1;
      s.match_available = 0;
      strm.next_in = next3;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK$3;
    };
    deflateInit_1 = deflateInit;
    deflateInit2_1 = deflateInit2;
    deflateReset_1 = deflateReset;
    deflateResetKeep_1 = deflateResetKeep;
    deflateSetHeader_1 = deflateSetHeader;
    deflate_2$1 = deflate$2;
    deflateEnd_1 = deflateEnd;
    deflateSetDictionary_1 = deflateSetDictionary;
    deflateInfo = "pako deflate (from Nodeca project)";
    deflate_1$2 = {
      deflateInit: deflateInit_1,
      deflateInit2: deflateInit2_1,
      deflateReset: deflateReset_1,
      deflateResetKeep: deflateResetKeep_1,
      deflateSetHeader: deflateSetHeader_1,
      deflate: deflate_2$1,
      deflateEnd: deflateEnd_1,
      deflateSetDictionary: deflateSetDictionary_1,
      deflateInfo
    };
    _has = (obj, key) => {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
    assign = function(obj) {
      const sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        const source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (const p in source) {
          if (_has(source, p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    };
    flattenChunks = (chunks) => {
      let len = 0;
      for (let i = 0, l = chunks.length; i < l; i++) {
        len += chunks[i].length;
      }
      const result = new Uint8Array(len);
      for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
        let chunk = chunks[i];
        result.set(chunk, pos);
        pos += chunk.length;
      }
      return result;
    };
    common = {
      assign,
      flattenChunks
    };
    STR_APPLY_UIA_OK = true;
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (__) {
      STR_APPLY_UIA_OK = false;
    }
    _utf8len = new Uint8Array(256);
    for (let q = 0; q < 256; q++) {
      _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
    }
    _utf8len[254] = _utf8len[255] = 1;
    string2buf = (str) => {
      if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
        return new TextEncoder().encode(str);
      }
      let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      buf = new Uint8Array(buf_len);
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        if (c < 128) {
          buf[i++] = c;
        } else if (c < 2048) {
          buf[i++] = 192 | c >>> 6;
          buf[i++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i++] = 224 | c >>> 12;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        } else {
          buf[i++] = 240 | c >>> 18;
          buf[i++] = 128 | c >>> 12 & 63;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        }
      }
      return buf;
    };
    buf2binstring = (buf, len) => {
      if (len < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK) {
          return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
        }
      }
      let result = "";
      for (let i = 0; i < len; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    };
    buf2string = (buf, max) => {
      const len = max || buf.length;
      if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
        return new TextDecoder().decode(buf.subarray(0, max));
      }
      let i, out;
      const utf16buf = new Array(len * 2);
      for (out = 0, i = 0; i < len; ) {
        let c = buf[i++];
        if (c < 128) {
          utf16buf[out++] = c;
          continue;
        }
        let c_len = _utf8len[c];
        if (c_len > 4) {
          utf16buf[out++] = 65533;
          i += c_len - 1;
          continue;
        }
        c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
        while (c_len > 1 && i < len) {
          c = c << 6 | buf[i++] & 63;
          c_len--;
        }
        if (c_len > 1) {
          utf16buf[out++] = 65533;
          continue;
        }
        if (c < 65536) {
          utf16buf[out++] = c;
        } else {
          c -= 65536;
          utf16buf[out++] = 55296 | c >> 10 & 1023;
          utf16buf[out++] = 56320 | c & 1023;
        }
      }
      return buf2binstring(utf16buf, out);
    };
    utf8border = (buf, max) => {
      max = max || buf.length;
      if (max > buf.length) {
        max = buf.length;
      }
      let pos = max - 1;
      while (pos >= 0 && (buf[pos] & 192) === 128) {
        pos--;
      }
      if (pos < 0) {
        return max;
      }
      if (pos === 0) {
        return max;
      }
      return pos + _utf8len[buf[pos]] > max ? pos : max;
    };
    strings = {
      string2buf,
      buf2string,
      utf8border
    };
    zstream = ZStream;
    toString$1 = Object.prototype.toString;
    ({
      Z_NO_FLUSH: Z_NO_FLUSH$1,
      Z_SYNC_FLUSH,
      Z_FULL_FLUSH,
      Z_FINISH: Z_FINISH$2,
      Z_OK: Z_OK$2,
      Z_STREAM_END: Z_STREAM_END$2,
      Z_DEFAULT_COMPRESSION,
      Z_DEFAULT_STRATEGY,
      Z_DEFLATED: Z_DEFLATED$1
    } = constants$2);
    defaultOptions$1 = {
      level: Z_DEFAULT_COMPRESSION,
      method: Z_DEFLATED$1,
      chunkSize: 16384,
      windowBits: 15,
      memLevel: 8,
      strategy: Z_DEFAULT_STRATEGY,
      legacyHash: true
    };
    Deflate$1.prototype.push = function(data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      let status, _flush_mode;
      if (this.ended) {
        return false;
      }
      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
      if (typeof data === "string") {
        strm.input = strings.string2buf(data);
      } else if (toString$1.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      for (; ; ) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
        status = deflate_1$2.deflate(strm, _flush_mode);
        if (status === Z_STREAM_END$2) {
          if (strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
          }
          status = deflate_1$2.deflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return status === Z_OK$2;
        }
        if (strm.avail_out === 0) {
          this.onData(strm.output);
          continue;
        }
        if (_flush_mode > 0 && strm.next_out > 0) {
          this.onData(strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          continue;
        }
        if (strm.avail_in === 0) break;
      }
      return true;
    };
    Deflate$1.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Deflate$1.prototype.onEnd = function(status) {
      if (status === Z_OK$2) {
        this.result = common.flattenChunks(this.chunks);
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    Deflate_1$1 = Deflate$1;
    deflate_2 = deflate$1;
    deflateRaw_1$1 = deflateRaw$1;
    gzip_1$1 = gzip$1;
    constants$1 = constants$2;
    deflate_1$1 = {
      Deflate: Deflate_1$1,
      deflate: deflate_2,
      deflateRaw: deflateRaw_1$1,
      gzip: gzip_1$1,
      constants: constants$1
    };
    BAD$1 = 16209;
    TYPE$1 = 16191;
    inffast = function inflate_fast(strm, start) {
      let _in;
      let last;
      let _out;
      let beg;
      let end;
      let dmax;
      let wsize;
      let whave;
      let wnext;
      let s_window;
      let hold;
      let bits;
      let lcode;
      let dcode;
      let lmask;
      let dmask;
      let here;
      let op;
      let len;
      let dist;
      let from;
      let from_source;
      let input, output;
      const state = strm.state;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
      dmax = state.dmax;
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;
      top:
        do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen:
            for (; ; ) {
              op = here >>> 24;
              hold >>>= op;
              bits -= op;
              op = here >>> 16 & 255;
              if (op === 0) {
                output[_out++] = here & 65535;
              } else if (op & 16) {
                len = here & 65535;
                op &= 15;
                if (op) {
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  len += hold & (1 << op) - 1;
                  hold >>>= op;
                  bits -= op;
                }
                if (bits < 15) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                here = dcode[hold & dmask];
                dodist:
                  for (; ; ) {
                    op = here >>> 24;
                    hold >>>= op;
                    bits -= op;
                    op = here >>> 16 & 255;
                    if (op & 16) {
                      dist = here & 65535;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist += hold & (1 << op) - 1;
                      if (dist > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist > op) {
                        op = dist - op;
                        if (op > whave) {
                          if (state.sane) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD$1;
                            break top;
                          }
                        }
                        from = 0;
                        from_source = s_window;
                        if (wnext === 0) {
                          from += wsize - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = 0;
                            if (wnext < len) {
                              op = wnext;
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                        while (len > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len -= 3;
                        }
                        if (len) {
                          output[_out++] = from_source[from++];
                          if (len > 1) {
                            output[_out++] = from_source[from++];
                          }
                        }
                      } else {
                        from = _out - dist;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len -= 3;
                        } while (len > 2);
                        if (len) {
                          output[_out++] = output[from++];
                          if (len > 1) {
                            output[_out++] = output[from++];
                          }
                        }
                      }
                    } else if ((op & 64) === 0) {
                      here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                      continue dodist;
                    } else {
                      strm.msg = "invalid distance code";
                      state.mode = BAD$1;
                      break top;
                    }
                    break;
                  }
              } else if ((op & 64) === 0) {
                here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                continue dolen;
              } else if (op & 32) {
                state.mode = TYPE$1;
                break top;
              } else {
                strm.msg = "invalid literal/length code";
                state.mode = BAD$1;
                break top;
              }
              break;
            }
        } while (_in < last && _out < end);
      len = bits >> 3;
      _in -= len;
      bits -= len << 3;
      hold &= (1 << bits) - 1;
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
      strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
      state.hold = hold;
      state.bits = bits;
      return;
    };
    MAXBITS = 15;
    ENOUGH_LENS$1 = 852;
    ENOUGH_DISTS$1 = 592;
    CODES$1 = 0;
    LENS$1 = 1;
    DISTS$1 = 2;
    lbase = new Uint16Array([
      /* Length codes 257..285 base */
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      15,
      17,
      19,
      23,
      27,
      31,
      35,
      43,
      51,
      59,
      67,
      83,
      99,
      115,
      131,
      163,
      195,
      227,
      258,
      0,
      0
    ]);
    lext = new Uint8Array([
      /* Length codes 257..285 extra */
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      16,
      199,
      75
    ]);
    dbase = new Uint16Array([
      /* Distance codes 0..29 base */
      1,
      2,
      3,
      4,
      5,
      7,
      9,
      13,
      17,
      25,
      33,
      49,
      65,
      97,
      129,
      193,
      257,
      385,
      513,
      769,
      1025,
      1537,
      2049,
      3073,
      4097,
      6145,
      8193,
      12289,
      16385,
      24577,
      0,
      0
    ]);
    dext = new Uint8Array([
      /* Distance codes 0..29 extra */
      16,
      16,
      16,
      16,
      17,
      17,
      18,
      18,
      19,
      19,
      20,
      20,
      21,
      21,
      22,
      22,
      23,
      23,
      24,
      24,
      25,
      25,
      26,
      26,
      27,
      27,
      28,
      28,
      29,
      29,
      64,
      64
    ]);
    inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
      const bits = opts.bits;
      let len = 0;
      let sym = 0;
      let min = 0, max = 0;
      let root = 0;
      let curr = 0;
      let drop = 0;
      let left = 0;
      let used = 0;
      let huff = 0;
      let incr;
      let fill;
      let low;
      let mask;
      let next3;
      let base = null;
      let match;
      const count = new Uint16Array(MAXBITS + 1);
      const offs = new Uint16Array(MAXBITS + 1);
      let extra = null;
      let here_bits, here_op, here_val;
      for (len = 0; len <= MAXBITS; len++) {
        count[len] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }
      root = bits;
      for (max = MAXBITS; max >= 1; max--) {
        if (count[max] !== 0) {
          break;
        }
      }
      if (root > max) {
        root = max;
      }
      if (max === 0) {
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        opts.bits = 1;
        return 0;
      }
      for (min = 1; min < max; min++) {
        if (count[min] !== 0) {
          break;
        }
      }
      if (root < min) {
        root = min;
      }
      left = 1;
      for (len = 1; len <= MAXBITS; len++) {
        left <<= 1;
        left -= count[len];
        if (left < 0) {
          return -1;
        }
      }
      if (left > 0 && (type === CODES$1 || max !== 1)) {
        return -1;
      }
      offs[1] = 0;
      for (len = 1; len < MAXBITS; len++) {
        offs[len + 1] = offs[len] + count[len];
      }
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }
      if (type === CODES$1) {
        base = extra = work;
        match = 20;
      } else if (type === LENS$1) {
        base = lbase;
        extra = lext;
        match = 257;
      } else {
        base = dbase;
        extra = dext;
        match = 0;
      }
      huff = 0;
      sym = 0;
      len = min;
      next3 = table_index;
      curr = root;
      drop = 0;
      low = -1;
      used = 1 << root;
      mask = used - 1;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      for (; ; ) {
        here_bits = len - drop;
        if (work[sym] + 1 < match) {
          here_op = 0;
          here_val = work[sym];
        } else if (work[sym] >= match) {
          here_op = extra[work[sym] - match];
          here_val = base[work[sym] - match];
        } else {
          here_op = 32 + 64;
          here_val = 0;
        }
        incr = 1 << len - drop;
        fill = 1 << curr;
        min = fill;
        do {
          fill -= incr;
          table[next3 + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
        } while (fill !== 0);
        incr = 1 << len - 1;
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }
        sym++;
        if (--count[len] === 0) {
          if (len === max) {
            break;
          }
          len = lens[lens_index + work[sym]];
        }
        if (len > root && (huff & mask) !== low) {
          if (drop === 0) {
            drop = root;
          }
          next3 += min;
          curr = len - drop;
          left = 1 << curr;
          while (curr + drop < max) {
            left -= count[curr + drop];
            if (left <= 0) {
              break;
            }
            curr++;
            left <<= 1;
          }
          used += 1 << curr;
          if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
            return 1;
          }
          low = huff & mask;
          table[low] = root << 24 | curr << 16 | next3 - table_index | 0;
        }
      }
      if (huff !== 0) {
        table[next3 + huff] = len - drop << 24 | 64 << 16 | 0;
      }
      opts.bits = root;
      return 0;
    };
    inftrees = inflate_table;
    CODES = 0;
    LENS = 1;
    DISTS = 2;
    ({
      Z_FINISH: Z_FINISH$1,
      Z_BLOCK,
      Z_TREES,
      Z_OK: Z_OK$1,
      Z_STREAM_END: Z_STREAM_END$1,
      Z_NEED_DICT: Z_NEED_DICT$1,
      Z_STREAM_ERROR: Z_STREAM_ERROR$1,
      Z_DATA_ERROR: Z_DATA_ERROR$1,
      Z_MEM_ERROR: Z_MEM_ERROR$1,
      Z_BUF_ERROR: Z_BUF_ERROR$1,
      Z_DEFLATED
    } = constants$2);
    HEAD = 16180;
    FLAGS = 16181;
    TIME = 16182;
    OS = 16183;
    EXLEN = 16184;
    EXTRA = 16185;
    NAME = 16186;
    COMMENT = 16187;
    HCRC = 16188;
    DICTID = 16189;
    DICT = 16190;
    TYPE = 16191;
    TYPEDO = 16192;
    STORED = 16193;
    COPY_ = 16194;
    COPY = 16195;
    TABLE = 16196;
    LENLENS = 16197;
    CODELENS = 16198;
    LEN_ = 16199;
    LEN = 16200;
    LENEXT = 16201;
    DIST = 16202;
    DISTEXT = 16203;
    MATCH = 16204;
    LIT = 16205;
    CHECK = 16206;
    LENGTH = 16207;
    DONE = 16208;
    BAD = 16209;
    MEM = 16210;
    SYNC = 16211;
    ENOUGH_LENS = 852;
    ENOUGH_DISTS = 592;
    MAX_WBITS = 15;
    DEF_WBITS = MAX_WBITS;
    zswap32 = (q) => {
      return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
    };
    inflateStateCheck = (strm) => {
      if (!strm) {
        return 1;
      }
      const state = strm.state;
      if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
        return 1;
      }
      return 0;
    };
    inflateResetKeep = (strm) => {
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = "";
      if (state.wrap) {
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD;
      state.last = 0;
      state.havedict = 0;
      state.flags = -1;
      state.dmax = 32768;
      state.head = null;
      state.hold = 0;
      state.bits = 0;
      state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
      state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
      state.sane = 1;
      state.back = -1;
      return Z_OK$1;
    };
    inflateReset = (strm) => {
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep(strm);
    };
    inflateReset2 = (strm, windowBits) => {
      let wrap;
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else {
        wrap = (windowBits >> 4) + 5;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR$1;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset(strm);
    };
    inflateInit2 = (strm, windowBits) => {
      if (!strm) {
        return Z_STREAM_ERROR$1;
      }
      const state = new InflateState();
      strm.state = state;
      state.strm = strm;
      state.window = null;
      state.mode = HEAD;
      const ret = inflateReset2(strm, windowBits);
      if (ret !== Z_OK$1) {
        strm.state = null;
      }
      return ret;
    };
    inflateInit = (strm) => {
      return inflateInit2(strm, DEF_WBITS);
    };
    virgin = true;
    fixedtables = (state) => {
      if (virgin) {
        lenfix = new Int32Array(512);
        distfix = new Int32Array(32);
        let sym = 0;
        while (sym < 144) {
          state.lens[sym++] = 8;
        }
        while (sym < 256) {
          state.lens[sym++] = 9;
        }
        while (sym < 280) {
          state.lens[sym++] = 7;
        }
        while (sym < 288) {
          state.lens[sym++] = 8;
        }
        inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
        sym = 0;
        while (sym < 32) {
          state.lens[sym++] = 5;
        }
        inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
        virgin = false;
      }
      state.lencode = lenfix;
      state.lenbits = 9;
      state.distcode = distfix;
      state.distbits = 5;
    };
    updatewindow = (strm, src, end, copy) => {
      let dist;
      const state = strm.state;
      if (state.window === null) {
        state.window = new Uint8Array(1 << state.wbits);
      }
      if (state.wsize === 0) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;
      }
      if (copy >= state.wsize) {
        state.window.set(src.subarray(end - state.wsize, end), 0);
        state.wnext = 0;
        state.whave = state.wsize;
      } else {
        dist = state.wsize - state.wnext;
        if (dist > copy) {
          dist = copy;
        }
        state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
        copy -= dist;
        if (copy) {
          state.window.set(src.subarray(end - copy, end), 0);
          state.wnext = copy;
          state.whave = state.wsize;
        } else {
          state.wnext += dist;
          if (state.wnext === state.wsize) {
            state.wnext = 0;
          }
          if (state.whave < state.wsize) {
            state.whave += dist;
          }
        }
      }
      return 0;
    };
    inflate$2 = (strm, flush) => {
      let state;
      let input, output;
      let next3;
      let put;
      let have, left;
      let hold;
      let bits;
      let _in, _out;
      let copy;
      let from;
      let from_source;
      let here = 0;
      let here_bits, here_op, here_val;
      let last_bits, last_op, last_val;
      let len;
      let ret;
      const hbuf = new Uint8Array(4);
      let opts;
      let n;
      const order = (
        /* permutation of code lengths */
        new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
      );
      if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
        return Z_STREAM_ERROR$1;
      }
      state = strm.state;
      if (state.mode === TYPE) {
        state.mode = TYPEDO;
      }
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next3 = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      _in = have;
      _out = left;
      ret = Z_OK$1;
      inf_leave:
        for (; ; ) {
          switch (state.mode) {
            case HEAD:
              if (state.wrap === 0) {
                state.mode = TYPEDO;
                break;
              }
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if (state.wrap & 2 && hold === 35615) {
                if (state.wbits === 0) {
                  state.wbits = 15;
                }
                state.check = 0;
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
                hold = 0;
                bits = 0;
                state.mode = FLAGS;
                break;
              }
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || /* check if zlib header allowed */
              (((hold & 255) << 8) + (hold >> 8)) % 31) {
                strm.msg = "incorrect header check";
                state.mode = BAD;
                break;
              }
              if ((hold & 15) !== Z_DEFLATED) {
                strm.msg = "unknown compression method";
                state.mode = BAD;
                break;
              }
              hold >>>= 4;
              bits -= 4;
              len = (hold & 15) + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              }
              if (len > 15 || len > state.wbits) {
                strm.msg = "invalid window size";
                state.mode = BAD;
                break;
              }
              state.dmax = 1 << state.wbits;
              state.flags = 0;
              strm.adler = state.check = 1;
              state.mode = hold & 512 ? DICTID : TYPE;
              hold = 0;
              bits = 0;
              break;
            case FLAGS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              state.flags = hold;
              if ((state.flags & 255) !== Z_DEFLATED) {
                strm.msg = "unknown compression method";
                state.mode = BAD;
                break;
              }
              if (state.flags & 57344) {
                strm.msg = "unknown header flags set";
                state.mode = BAD;
                break;
              }
              if (state.head) {
                state.head.text = hold >> 8 & 1;
              }
              if (state.flags & 512 && state.wrap & 4) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = TIME;
            /* falls through */
            case TIME:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 512 && state.wrap & 4) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                hbuf[2] = hold >>> 16 & 255;
                hbuf[3] = hold >>> 24 & 255;
                state.check = crc32_1(state.check, hbuf, 4, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = OS;
            /* falls through */
            case OS:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.xflags = hold & 255;
                state.head.os = hold >> 8;
              }
              if (state.flags & 512 && state.wrap & 4) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc32_1(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = EXLEN;
            /* falls through */
            case EXLEN:
              if (state.flags & 1024) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32_1(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
              } else if (state.head) {
                state.head.extra = null;
              }
              state.mode = EXTRA;
            /* falls through */
            case EXTRA:
              if (state.flags & 1024) {
                copy = state.length;
                if (copy > have) {
                  copy = have;
                }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      state.head.extra = new Uint8Array(state.head.extra_len);
                    }
                    state.head.extra.set(
                      input.subarray(
                        next3,
                        // extra field is limited to 65536 bytes
                        // - no need for additional size check
                        next3 + copy
                      ),
                      /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                      len
                    );
                  }
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc32_1(state.check, input, copy, next3);
                  }
                  have -= copy;
                  next3 += copy;
                  state.length -= copy;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME;
            /* falls through */
            case NAME:
              if (state.flags & 2048) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next3 + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512 && state.wrap & 4) {
                  state.check = crc32_1(state.check, input, copy, next3);
                }
                have -= copy;
                next3 += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT;
            /* falls through */
            case COMMENT:
              if (state.flags & 4096) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next3 + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512 && state.wrap & 4) {
                  state.check = crc32_1(state.check, input, copy, next3);
                }
                have -= copy;
                next3 += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC;
            /* falls through */
            case HCRC:
              if (state.flags & 512) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                if (state.wrap & 4 && hold !== (state.check & 65535)) {
                  strm.msg = "header crc mismatch";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              if (state.head) {
                state.head.hcrc = state.flags >> 9 & 1;
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE;
              break;
            case DICTID:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              strm.adler = state.check = zswap32(hold);
              hold = 0;
              bits = 0;
              state.mode = DICT;
            /* falls through */
            case DICT:
              if (state.havedict === 0) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next3;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                return Z_NEED_DICT$1;
              }
              strm.adler = state.check = 1;
              state.mode = TYPE;
            /* falls through */
            case TYPE:
              if (flush === Z_BLOCK || flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case TYPEDO:
              if (state.last) {
                hold >>>= bits & 7;
                bits -= bits & 7;
                state.mode = CHECK;
                break;
              }
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              state.last = hold & 1;
              hold >>>= 1;
              bits -= 1;
              switch (hold & 3) {
                case 0:
                  state.mode = STORED;
                  break;
                case 1:
                  fixedtables(state);
                  state.mode = LEN_;
                  if (flush === Z_TREES) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;
                case 2:
                  state.mode = TABLE;
                  break;
                case 3:
                  strm.msg = "invalid block type";
                  state.mode = BAD;
              }
              hold >>>= 2;
              bits -= 2;
              break;
            case STORED:
              hold >>>= bits & 7;
              bits -= bits & 7;
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                strm.msg = "invalid stored block lengths";
                state.mode = BAD;
                break;
              }
              state.length = hold & 65535;
              hold = 0;
              bits = 0;
              state.mode = COPY_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case COPY_:
              state.mode = COPY;
            /* falls through */
            case COPY:
              copy = state.length;
              if (copy) {
                if (copy > have) {
                  copy = have;
                }
                if (copy > left) {
                  copy = left;
                }
                if (copy === 0) {
                  break inf_leave;
                }
                output.set(input.subarray(next3, next3 + copy), put);
                have -= copy;
                next3 += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              state.mode = TYPE;
              break;
            case TABLE:
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              state.nlen = (hold & 31) + 257;
              hold >>>= 5;
              bits -= 5;
              state.ndist = (hold & 31) + 1;
              hold >>>= 5;
              bits -= 5;
              state.ncode = (hold & 15) + 4;
              hold >>>= 4;
              bits -= 4;
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = "too many length or distance symbols";
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = LENLENS;
            /* falls through */
            case LENLENS:
              while (state.have < state.ncode) {
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                state.lens[order[state.have++]] = hold & 7;
                hold >>>= 3;
                bits -= 3;
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = { bits: state.lenbits };
              ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid code lengths set";
                state.mode = BAD;
                break;
              }
              state.have = 0;
              state.mode = CODELENS;
            /* falls through */
            case CODELENS:
              while (state.have < state.nlen + state.ndist) {
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                if (here_val < 16) {
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next3++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    if (state.have === 0) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 3);
                    hold >>>= 2;
                    bits -= 2;
                  } else if (here_val === 17) {
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next3++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 3 + (hold & 7);
                    hold >>>= 3;
                    bits -= 3;
                  } else {
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next3++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 11 + (hold & 127);
                    hold >>>= 7;
                    bits -= 7;
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }
              if (state.mode === BAD) {
                break;
              }
              if (state.lens[256] === 0) {
                strm.msg = "invalid code -- missing end-of-block";
                state.mode = BAD;
                break;
              }
              state.lenbits = 9;
              opts = { bits: state.lenbits };
              ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid literal/lengths set";
                state.mode = BAD;
                break;
              }
              state.distbits = 6;
              state.distcode = state.distdyn;
              opts = { bits: state.distbits };
              ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              state.distbits = opts.bits;
              if (ret) {
                strm.msg = "invalid distances set";
                state.mode = BAD;
                break;
              }
              state.mode = LEN_;
              if (flush === Z_TREES) {
                break inf_leave;
              }
            /* falls through */
            case LEN_:
              state.mode = LEN;
            /* falls through */
            case LEN:
              if (have >= 6 && left >= 258) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next3;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                inffast(strm, _out);
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next3 = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                if (state.mode === TYPE) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if (here_op && (here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                state.mode = LIT;
                break;
              }
              if (here_op & 32) {
                state.back = -1;
                state.mode = TYPE;
                break;
              }
              if (here_op & 64) {
                strm.msg = "invalid literal/length code";
                state.mode = BAD;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT;
            /* falls through */
            case LENEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                state.length += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              state.was = state.length;
              state.mode = DIST;
            /* falls through */
            case DIST:
              for (; ; ) {
                here = state.distcode[hold & (1 << state.distbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next3++] << bits;
                bits += 8;
              }
              if ((here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = "invalid distance code";
                state.mode = BAD;
                break;
              }
              state.offset = here_val;
              state.extra = here_op & 15;
              state.mode = DISTEXT;
            /* falls through */
            case DISTEXT:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                state.offset += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              if (state.offset > state.dmax) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
              state.mode = MATCH;
            /* falls through */
            case MATCH:
              if (left === 0) {
                break inf_leave;
              }
              copy = _out - left;
              if (state.offset > copy) {
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD;
                    break;
                  }
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                } else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) {
                  copy = state.length;
                }
                from_source = state.window;
              } else {
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) {
                copy = left;
              }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) {
                state.mode = LEN;
              }
              break;
            case LIT:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN;
              break;
            case CHECK:
              if (state.wrap) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold |= input[next3++] << bits;
                  bits += 8;
                }
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (state.wrap & 4 && _out) {
                  strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                  state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
                }
                _out = left;
                if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
                  strm.msg = "incorrect data check";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = LENGTH;
            /* falls through */
            case LENGTH:
              if (state.wrap && state.flags) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next3++] << bits;
                  bits += 8;
                }
                if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                  strm.msg = "incorrect length check";
                  state.mode = BAD;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = DONE;
            /* falls through */
            case DONE:
              ret = Z_STREAM_END$1;
              break inf_leave;
            case BAD:
              ret = Z_DATA_ERROR$1;
              break inf_leave;
            case MEM:
              return Z_MEM_ERROR$1;
            case SYNC:
            /* falls through */
            default:
              return Z_STREAM_ERROR$1;
          }
        }
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next3;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
        if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if (state.wrap & 4 && _out) {
        strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
        state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
      if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
        ret = Z_BUF_ERROR$1;
      }
      return ret;
    };
    inflateEnd = (strm) => {
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      let state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK$1;
    };
    inflateGetHeader = (strm, head) => {
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      const state = strm.state;
      if ((state.wrap & 2) === 0) {
        return Z_STREAM_ERROR$1;
      }
      state.head = head;
      head.done = false;
      return Z_OK$1;
    };
    inflateSetDictionary = (strm, dictionary) => {
      const dictLength = dictionary.length;
      let state;
      let dictid;
      let ret;
      if (inflateStateCheck(strm)) {
        return Z_STREAM_ERROR$1;
      }
      state = strm.state;
      if (state.wrap !== 0 && state.mode !== DICT) {
        return Z_STREAM_ERROR$1;
      }
      if (state.mode === DICT) {
        dictid = 1;
        dictid = adler32_1(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR$1;
        }
      }
      ret = updatewindow(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM;
        return Z_MEM_ERROR$1;
      }
      state.havedict = 1;
      return Z_OK$1;
    };
    inflateReset_1 = inflateReset;
    inflateReset2_1 = inflateReset2;
    inflateResetKeep_1 = inflateResetKeep;
    inflateInit_1 = inflateInit;
    inflateInit2_1 = inflateInit2;
    inflate_2$1 = inflate$2;
    inflateEnd_1 = inflateEnd;
    inflateGetHeader_1 = inflateGetHeader;
    inflateSetDictionary_1 = inflateSetDictionary;
    inflateInfo = "pako inflate (from Nodeca project)";
    inflate_1$2 = {
      inflateReset: inflateReset_1,
      inflateReset2: inflateReset2_1,
      inflateResetKeep: inflateResetKeep_1,
      inflateInit: inflateInit_1,
      inflateInit2: inflateInit2_1,
      inflate: inflate_2$1,
      inflateEnd: inflateEnd_1,
      inflateGetHeader: inflateGetHeader_1,
      inflateSetDictionary: inflateSetDictionary_1,
      inflateInfo
    };
    gzheader = GZheader;
    toString = Object.prototype.toString;
    ({
      Z_NO_FLUSH,
      Z_FINISH,
      Z_OK,
      Z_STREAM_END,
      Z_NEED_DICT,
      Z_STREAM_ERROR,
      Z_DATA_ERROR,
      Z_MEM_ERROR,
      Z_BUF_ERROR
    } = constants$2);
    defaultOptions = {
      chunkSize: 1024 * 64,
      windowBits: 15,
      to: ""
    };
    Inflate$1.prototype.push = function(data, flush_mode) {
      const strm = this.strm;
      const chunkSize = this.options.chunkSize;
      const dictionary = this.options.dictionary;
      let status, _flush_mode, last_avail_out;
      if (this.ended) return false;
      if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
      else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
      if (toString.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      for (; ; ) {
        if (strm.avail_out === 0) {
          strm.output = new Uint8Array(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status = inflate_1$2.inflate(strm, _flush_mode);
        if (status === Z_NEED_DICT && dictionary) {
          status = inflate_1$2.inflateSetDictionary(strm, dictionary);
          if (status === Z_OK) {
            status = inflate_1$2.inflate(strm, _flush_mode);
          } else if (status === Z_DATA_ERROR) {
            status = Z_NEED_DICT;
          }
        }
        while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap & 2 && strm.state.flags !== 0 && strm.input[strm.next_in] !== 0) {
          inflate_1$2.inflateReset(strm);
          status = inflate_1$2.inflate(strm, _flush_mode);
        }
        switch (status) {
          case Z_STREAM_ERROR:
          case Z_DATA_ERROR:
          case Z_NEED_DICT:
          case Z_MEM_ERROR:
            this.onEnd(status);
            this.ended = true;
            return false;
        }
        last_avail_out = strm.avail_out;
        if (strm.next_out) {
          if (strm.avail_out === 0 || status === Z_STREAM_END || _flush_mode > 0) {
            if (this.options.to === "string") {
              let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
              let tail = strm.next_out - next_out_utf8;
              let utf8str = strings.buf2string(strm.output, next_out_utf8);
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
              this.onData(utf8str);
            } else {
              this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
              strm.avail_out = 0;
              strm.next_out = 0;
            }
          }
        }
        if ((status === Z_OK || status === Z_BUF_ERROR) && last_avail_out === 0) continue;
        if (status === Z_STREAM_END) {
          status = inflate_1$2.inflateEnd(this.strm);
          this.onEnd(status);
          this.ended = true;
          return true;
        }
        if (strm.avail_in === 0) {
          if (_flush_mode === Z_FINISH) {
            status = inflate_1$2.inflateEnd(this.strm);
            this.onEnd(status === Z_OK ? Z_BUF_ERROR : status);
            this.ended = true;
            return false;
          }
          break;
        }
      }
      return true;
    };
    Inflate$1.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Inflate$1.prototype.onEnd = function(status) {
      if (status === Z_OK) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = common.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    Inflate_1$1 = Inflate$1;
    inflate_2 = inflate$1;
    inflateRaw_1$1 = inflateRaw$1;
    ungzip$1 = inflate$1;
    constants = constants$2;
    inflate_1$1 = {
      Inflate: Inflate_1$1,
      inflate: inflate_2,
      inflateRaw: inflateRaw_1$1,
      ungzip: ungzip$1,
      constants
    };
    ({ Deflate, deflate, deflateRaw, gzip } = deflate_1$1);
    ({ Inflate, inflate, inflateRaw, ungzip } = inflate_1$1);
    inflate_1 = inflate;
  }
});

// node_modules/geotiff/dist-module/compression/deflate.js
var deflate_exports = {};
__export(deflate_exports, {
  default: () => DeflateDecoder
});
var DeflateDecoder;
var init_deflate = __esm({
  "node_modules/geotiff/dist-module/compression/deflate.js"() {
    init_pako_esm();
    init_basedecoder();
    DeflateDecoder = class extends BaseDecoder {
      decodeBlock(buffer2) {
        return inflate_1(new Uint8Array(buffer2)).buffer;
      }
    };
  }
});

// node_modules/geotiff/dist-module/compression/packbits.js
var packbits_exports = {};
__export(packbits_exports, {
  default: () => PackbitsDecoder
});
var PackbitsDecoder;
var init_packbits = __esm({
  "node_modules/geotiff/dist-module/compression/packbits.js"() {
    init_basedecoder();
    PackbitsDecoder = class extends BaseDecoder {
      decodeBlock(buffer2) {
        const dataView = new DataView(buffer2);
        const out = [];
        for (let i = 0; i < buffer2.byteLength; ++i) {
          let header = dataView.getInt8(i);
          if (header < 0) {
            const next3 = dataView.getUint8(i + 1);
            header = -header;
            for (let j = 0; j <= header; ++j) {
              out.push(next3);
            }
            i += 1;
          } else {
            for (let j = 0; j <= header; ++j) {
              out.push(dataView.getUint8(i + j + 1));
            }
            i += header + 1;
          }
        }
        return new Uint8Array(out).buffer;
      }
    };
  }
});

// node_modules/lerc/LercDecode.js
var require_LercDecode = __commonJS({
  "node_modules/lerc/LercDecode.js"(exports2, module2) {
    (function() {
      var LercDecode = (function() {
        var CntZImage = {};
        CntZImage.defaultNoDataValue = -34027999387901484e22;
        CntZImage.decode = function(input, options) {
          options = options || {};
          var skipMask = options.encodedMaskData || options.encodedMaskData === null;
          var parsedData = parse(input, options.inputOffset || 0, skipMask);
          var noDataValue = options.noDataValue !== null ? options.noDataValue : CntZImage.defaultNoDataValue;
          var uncompressedData = uncompressPixelValues(
            parsedData,
            options.pixelType || Float32Array,
            options.encodedMaskData,
            noDataValue,
            options.returnMask
          );
          var result = {
            width: parsedData.width,
            height: parsedData.height,
            pixelData: uncompressedData.resultPixels,
            minValue: uncompressedData.minValue,
            maxValue: parsedData.pixels.maxValue,
            noDataValue
          };
          if (uncompressedData.resultMask) {
            result.maskData = uncompressedData.resultMask;
          }
          if (options.returnEncodedMask && parsedData.mask) {
            result.encodedMaskData = parsedData.mask.bitset ? parsedData.mask.bitset : null;
          }
          if (options.returnFileInfo) {
            result.fileInfo = formatFileInfo(parsedData);
            if (options.computeUsedBitDepths) {
              result.fileInfo.bitDepths = computeUsedBitDepths(parsedData);
            }
          }
          return result;
        };
        var uncompressPixelValues = function(data, TypedArrayClass, maskBitset, noDataValue, storeDecodedMask) {
          var blockIdx = 0;
          var numX = data.pixels.numBlocksX;
          var numY = data.pixels.numBlocksY;
          var blockWidth = Math.floor(data.width / numX);
          var blockHeight = Math.floor(data.height / numY);
          var scale = 2 * data.maxZError;
          var minValue = Number.MAX_VALUE, currentValue;
          maskBitset = maskBitset || (data.mask ? data.mask.bitset : null);
          var resultPixels, resultMask;
          resultPixels = new TypedArrayClass(data.width * data.height);
          if (storeDecodedMask && maskBitset) {
            resultMask = new Uint8Array(data.width * data.height);
          }
          var blockDataBuffer = new Float32Array(blockWidth * blockHeight);
          var xx, yy;
          for (var y = 0; y <= numY; y++) {
            var thisBlockHeight = y !== numY ? blockHeight : data.height % numY;
            if (thisBlockHeight === 0) {
              continue;
            }
            for (var x = 0; x <= numX; x++) {
              var thisBlockWidth = x !== numX ? blockWidth : data.width % numX;
              if (thisBlockWidth === 0) {
                continue;
              }
              var outPtr = y * data.width * blockHeight + x * blockWidth;
              var outStride = data.width - thisBlockWidth;
              var block = data.pixels.blocks[blockIdx];
              var blockData, blockPtr, constValue;
              if (block.encoding < 2) {
                if (block.encoding === 0) {
                  blockData = block.rawData;
                } else {
                  unstuff(block.stuffedData, block.bitsPerPixel, block.numValidPixels, block.offset, scale, blockDataBuffer, data.pixels.maxValue);
                  blockData = blockDataBuffer;
                }
                blockPtr = 0;
              } else if (block.encoding === 2) {
                constValue = 0;
              } else {
                constValue = block.offset;
              }
              var maskByte;
              if (maskBitset) {
                for (yy = 0; yy < thisBlockHeight; yy++) {
                  if (outPtr & 7) {
                    maskByte = maskBitset[outPtr >> 3];
                    maskByte <<= outPtr & 7;
                  }
                  for (xx = 0; xx < thisBlockWidth; xx++) {
                    if (!(outPtr & 7)) {
                      maskByte = maskBitset[outPtr >> 3];
                    }
                    if (maskByte & 128) {
                      if (resultMask) {
                        resultMask[outPtr] = 1;
                      }
                      currentValue = block.encoding < 2 ? blockData[blockPtr++] : constValue;
                      minValue = minValue > currentValue ? currentValue : minValue;
                      resultPixels[outPtr++] = currentValue;
                    } else {
                      if (resultMask) {
                        resultMask[outPtr] = 0;
                      }
                      resultPixels[outPtr++] = noDataValue;
                    }
                    maskByte <<= 1;
                  }
                  outPtr += outStride;
                }
              } else {
                if (block.encoding < 2) {
                  for (yy = 0; yy < thisBlockHeight; yy++) {
                    for (xx = 0; xx < thisBlockWidth; xx++) {
                      currentValue = blockData[blockPtr++];
                      minValue = minValue > currentValue ? currentValue : minValue;
                      resultPixels[outPtr++] = currentValue;
                    }
                    outPtr += outStride;
                  }
                } else {
                  minValue = minValue > constValue ? constValue : minValue;
                  for (yy = 0; yy < thisBlockHeight; yy++) {
                    for (xx = 0; xx < thisBlockWidth; xx++) {
                      resultPixels[outPtr++] = constValue;
                    }
                    outPtr += outStride;
                  }
                }
              }
              if (block.encoding === 1 && blockPtr !== block.numValidPixels) {
                throw "Block and Mask do not match";
              }
              blockIdx++;
            }
          }
          return {
            resultPixels,
            resultMask,
            minValue
          };
        };
        var formatFileInfo = function(data) {
          return {
            "fileIdentifierString": data.fileIdentifierString,
            "fileVersion": data.fileVersion,
            "imageType": data.imageType,
            "height": data.height,
            "width": data.width,
            "maxZError": data.maxZError,
            "eofOffset": data.eofOffset,
            "mask": data.mask ? {
              "numBlocksX": data.mask.numBlocksX,
              "numBlocksY": data.mask.numBlocksY,
              "numBytes": data.mask.numBytes,
              "maxValue": data.mask.maxValue
            } : null,
            "pixels": {
              "numBlocksX": data.pixels.numBlocksX,
              "numBlocksY": data.pixels.numBlocksY,
              "numBytes": data.pixels.numBytes,
              "maxValue": data.pixels.maxValue,
              "noDataValue": data.noDataValue
            }
          };
        };
        var computeUsedBitDepths = function(data) {
          var numBlocks = data.pixels.numBlocksX * data.pixels.numBlocksY;
          var bitDepths = {};
          for (var i = 0; i < numBlocks; i++) {
            var block = data.pixels.blocks[i];
            if (block.encoding === 0) {
              bitDepths.float32 = true;
            } else if (block.encoding === 1) {
              bitDepths[block.bitsPerPixel] = true;
            } else {
              bitDepths[0] = true;
            }
          }
          return Object.keys(bitDepths);
        };
        var parse = function(input, fp, skipMask) {
          var data = {};
          var fileIdView = new Uint8Array(input, fp, 10);
          data.fileIdentifierString = String.fromCharCode.apply(null, fileIdView);
          if (data.fileIdentifierString.trim() !== "CntZImage") {
            throw "Unexpected file identifier string: " + data.fileIdentifierString;
          }
          fp += 10;
          var view = new DataView(input, fp, 24);
          data.fileVersion = view.getInt32(0, true);
          data.imageType = view.getInt32(4, true);
          data.height = view.getUint32(8, true);
          data.width = view.getUint32(12, true);
          data.maxZError = view.getFloat64(16, true);
          fp += 24;
          if (!skipMask) {
            view = new DataView(input, fp, 16);
            data.mask = {};
            data.mask.numBlocksY = view.getUint32(0, true);
            data.mask.numBlocksX = view.getUint32(4, true);
            data.mask.numBytes = view.getUint32(8, true);
            data.mask.maxValue = view.getFloat32(12, true);
            fp += 16;
            if (data.mask.numBytes > 0) {
              var bitset = new Uint8Array(Math.ceil(data.width * data.height / 8));
              view = new DataView(input, fp, data.mask.numBytes);
              var cnt = view.getInt16(0, true);
              var ip = 2, op = 0;
              do {
                if (cnt > 0) {
                  while (cnt--) {
                    bitset[op++] = view.getUint8(ip++);
                  }
                } else {
                  var val = view.getUint8(ip++);
                  cnt = -cnt;
                  while (cnt--) {
                    bitset[op++] = val;
                  }
                }
                cnt = view.getInt16(ip, true);
                ip += 2;
              } while (ip < data.mask.numBytes);
              if (cnt !== -32768 || op < bitset.length) {
                throw "Unexpected end of mask RLE encoding";
              }
              data.mask.bitset = bitset;
              fp += data.mask.numBytes;
            } else if ((data.mask.numBytes | data.mask.numBlocksY | data.mask.maxValue) === 0) {
              data.mask.bitset = new Uint8Array(Math.ceil(data.width * data.height / 8));
            }
          }
          view = new DataView(input, fp, 16);
          data.pixels = {};
          data.pixels.numBlocksY = view.getUint32(0, true);
          data.pixels.numBlocksX = view.getUint32(4, true);
          data.pixels.numBytes = view.getUint32(8, true);
          data.pixels.maxValue = view.getFloat32(12, true);
          fp += 16;
          var numBlocksX = data.pixels.numBlocksX;
          var numBlocksY = data.pixels.numBlocksY;
          var actualNumBlocksX = numBlocksX + (data.width % numBlocksX > 0 ? 1 : 0);
          var actualNumBlocksY = numBlocksY + (data.height % numBlocksY > 0 ? 1 : 0);
          data.pixels.blocks = new Array(actualNumBlocksX * actualNumBlocksY);
          var blockI = 0;
          for (var blockY = 0; blockY < actualNumBlocksY; blockY++) {
            for (var blockX = 0; blockX < actualNumBlocksX; blockX++) {
              var size = 0;
              var bytesLeft = input.byteLength - fp;
              view = new DataView(input, fp, Math.min(10, bytesLeft));
              var block = {};
              data.pixels.blocks[blockI++] = block;
              var headerByte = view.getUint8(0);
              size++;
              block.encoding = headerByte & 63;
              if (block.encoding > 3) {
                throw "Invalid block encoding (" + block.encoding + ")";
              }
              if (block.encoding === 2) {
                fp++;
                continue;
              }
              if (headerByte !== 0 && headerByte !== 2) {
                headerByte >>= 6;
                block.offsetType = headerByte;
                if (headerByte === 2) {
                  block.offset = view.getInt8(1);
                  size++;
                } else if (headerByte === 1) {
                  block.offset = view.getInt16(1, true);
                  size += 2;
                } else if (headerByte === 0) {
                  block.offset = view.getFloat32(1, true);
                  size += 4;
                } else {
                  throw "Invalid block offset type";
                }
                if (block.encoding === 1) {
                  headerByte = view.getUint8(size);
                  size++;
                  block.bitsPerPixel = headerByte & 63;
                  headerByte >>= 6;
                  block.numValidPixelsType = headerByte;
                  if (headerByte === 2) {
                    block.numValidPixels = view.getUint8(size);
                    size++;
                  } else if (headerByte === 1) {
                    block.numValidPixels = view.getUint16(size, true);
                    size += 2;
                  } else if (headerByte === 0) {
                    block.numValidPixels = view.getUint32(size, true);
                    size += 4;
                  } else {
                    throw "Invalid valid pixel count type";
                  }
                }
              }
              fp += size;
              if (block.encoding === 3) {
                continue;
              }
              var arrayBuf, store8;
              if (block.encoding === 0) {
                var numPixels = (data.pixels.numBytes - 1) / 4;
                if (numPixels !== Math.floor(numPixels)) {
                  throw "uncompressed block has invalid length";
                }
                arrayBuf = new ArrayBuffer(numPixels * 4);
                store8 = new Uint8Array(arrayBuf);
                store8.set(new Uint8Array(input, fp, numPixels * 4));
                var rawData = new Float32Array(arrayBuf);
                block.rawData = rawData;
                fp += numPixels * 4;
              } else if (block.encoding === 1) {
                var dataBytes = Math.ceil(block.numValidPixels * block.bitsPerPixel / 8);
                var dataWords = Math.ceil(dataBytes / 4);
                arrayBuf = new ArrayBuffer(dataWords * 4);
                store8 = new Uint8Array(arrayBuf);
                store8.set(new Uint8Array(input, fp, dataBytes));
                block.stuffedData = new Uint32Array(arrayBuf);
                fp += dataBytes;
              }
            }
          }
          data.eofOffset = fp;
          return data;
        };
        var unstuff = function(src, bitsPerPixel, numPixels, offset, scale, dest, maxValue) {
          var bitMask = (1 << bitsPerPixel) - 1;
          var i = 0, o;
          var bitsLeft = 0;
          var n, buffer2;
          var nmax = Math.ceil((maxValue - offset) / scale);
          var numInvalidTailBytes = src.length * 4 - Math.ceil(bitsPerPixel * numPixels / 8);
          src[src.length - 1] <<= 8 * numInvalidTailBytes;
          for (o = 0; o < numPixels; o++) {
            if (bitsLeft === 0) {
              buffer2 = src[i++];
              bitsLeft = 32;
            }
            if (bitsLeft >= bitsPerPixel) {
              n = buffer2 >>> bitsLeft - bitsPerPixel & bitMask;
              bitsLeft -= bitsPerPixel;
            } else {
              var missingBits = bitsPerPixel - bitsLeft;
              n = (buffer2 & bitMask) << missingBits & bitMask;
              buffer2 = src[i++];
              bitsLeft = 32 - missingBits;
              n += buffer2 >>> bitsLeft;
            }
            dest[o] = n < nmax ? offset + n * scale : maxValue;
          }
          return dest;
        };
        return CntZImage;
      })();
      var Lerc2Decode = (function() {
        "use strict";
        var BitStuffer = {
          //methods ending with 2 are for the new byte order used by Lerc2.3 and above.
          //originalUnstuff is used to unpack Huffman code table. code is duplicated to unstuffx for performance reasons.
          unstuff: function(src, dest, bitsPerPixel, numPixels, lutArr, offset, scale, maxValue) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o;
            var bitsLeft = 0;
            var n, buffer2, missingBits, nmax;
            var numInvalidTailBytes = src.length * 4 - Math.ceil(bitsPerPixel * numPixels / 8);
            src[src.length - 1] <<= 8 * numInvalidTailBytes;
            if (lutArr) {
              for (o = 0; o < numPixels; o++) {
                if (bitsLeft === 0) {
                  buffer2 = src[i++];
                  bitsLeft = 32;
                }
                if (bitsLeft >= bitsPerPixel) {
                  n = buffer2 >>> bitsLeft - bitsPerPixel & bitMask;
                  bitsLeft -= bitsPerPixel;
                } else {
                  missingBits = bitsPerPixel - bitsLeft;
                  n = (buffer2 & bitMask) << missingBits & bitMask;
                  buffer2 = src[i++];
                  bitsLeft = 32 - missingBits;
                  n += buffer2 >>> bitsLeft;
                }
                dest[o] = lutArr[n];
              }
            } else {
              nmax = Math.ceil((maxValue - offset) / scale);
              for (o = 0; o < numPixels; o++) {
                if (bitsLeft === 0) {
                  buffer2 = src[i++];
                  bitsLeft = 32;
                }
                if (bitsLeft >= bitsPerPixel) {
                  n = buffer2 >>> bitsLeft - bitsPerPixel & bitMask;
                  bitsLeft -= bitsPerPixel;
                } else {
                  missingBits = bitsPerPixel - bitsLeft;
                  n = (buffer2 & bitMask) << missingBits & bitMask;
                  buffer2 = src[i++];
                  bitsLeft = 32 - missingBits;
                  n += buffer2 >>> bitsLeft;
                }
                dest[o] = n < nmax ? offset + n * scale : maxValue;
              }
            }
          },
          unstuffLUT: function(src, bitsPerPixel, numPixels, offset, scale, maxValue) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o = 0, missingBits = 0, bitsLeft = 0, n = 0;
            var buffer2;
            var dest = [];
            var numInvalidTailBytes = src.length * 4 - Math.ceil(bitsPerPixel * numPixels / 8);
            src[src.length - 1] <<= 8 * numInvalidTailBytes;
            var nmax = Math.ceil((maxValue - offset) / scale);
            for (o = 0; o < numPixels; o++) {
              if (bitsLeft === 0) {
                buffer2 = src[i++];
                bitsLeft = 32;
              }
              if (bitsLeft >= bitsPerPixel) {
                n = buffer2 >>> bitsLeft - bitsPerPixel & bitMask;
                bitsLeft -= bitsPerPixel;
              } else {
                missingBits = bitsPerPixel - bitsLeft;
                n = (buffer2 & bitMask) << missingBits & bitMask;
                buffer2 = src[i++];
                bitsLeft = 32 - missingBits;
                n += buffer2 >>> bitsLeft;
              }
              dest[o] = n < nmax ? offset + n * scale : maxValue;
            }
            dest.unshift(offset);
            return dest;
          },
          unstuff2: function(src, dest, bitsPerPixel, numPixels, lutArr, offset, scale, maxValue) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o;
            var bitsLeft = 0, bitPos = 0;
            var n, buffer2, missingBits;
            if (lutArr) {
              for (o = 0; o < numPixels; o++) {
                if (bitsLeft === 0) {
                  buffer2 = src[i++];
                  bitsLeft = 32;
                  bitPos = 0;
                }
                if (bitsLeft >= bitsPerPixel) {
                  n = buffer2 >>> bitPos & bitMask;
                  bitsLeft -= bitsPerPixel;
                  bitPos += bitsPerPixel;
                } else {
                  missingBits = bitsPerPixel - bitsLeft;
                  n = buffer2 >>> bitPos & bitMask;
                  buffer2 = src[i++];
                  bitsLeft = 32 - missingBits;
                  n |= (buffer2 & (1 << missingBits) - 1) << bitsPerPixel - missingBits;
                  bitPos = missingBits;
                }
                dest[o] = lutArr[n];
              }
            } else {
              var nmax = Math.ceil((maxValue - offset) / scale);
              for (o = 0; o < numPixels; o++) {
                if (bitsLeft === 0) {
                  buffer2 = src[i++];
                  bitsLeft = 32;
                  bitPos = 0;
                }
                if (bitsLeft >= bitsPerPixel) {
                  n = buffer2 >>> bitPos & bitMask;
                  bitsLeft -= bitsPerPixel;
                  bitPos += bitsPerPixel;
                } else {
                  missingBits = bitsPerPixel - bitsLeft;
                  n = buffer2 >>> bitPos & bitMask;
                  buffer2 = src[i++];
                  bitsLeft = 32 - missingBits;
                  n |= (buffer2 & (1 << missingBits) - 1) << bitsPerPixel - missingBits;
                  bitPos = missingBits;
                }
                dest[o] = n < nmax ? offset + n * scale : maxValue;
              }
            }
            return dest;
          },
          unstuffLUT2: function(src, bitsPerPixel, numPixels, offset, scale, maxValue) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o = 0, missingBits = 0, bitsLeft = 0, n = 0, bitPos = 0;
            var buffer2;
            var dest = [];
            var nmax = Math.ceil((maxValue - offset) / scale);
            for (o = 0; o < numPixels; o++) {
              if (bitsLeft === 0) {
                buffer2 = src[i++];
                bitsLeft = 32;
                bitPos = 0;
              }
              if (bitsLeft >= bitsPerPixel) {
                n = buffer2 >>> bitPos & bitMask;
                bitsLeft -= bitsPerPixel;
                bitPos += bitsPerPixel;
              } else {
                missingBits = bitsPerPixel - bitsLeft;
                n = buffer2 >>> bitPos & bitMask;
                buffer2 = src[i++];
                bitsLeft = 32 - missingBits;
                n |= (buffer2 & (1 << missingBits) - 1) << bitsPerPixel - missingBits;
                bitPos = missingBits;
              }
              dest[o] = n < nmax ? offset + n * scale : maxValue;
            }
            dest.unshift(offset);
            return dest;
          },
          originalUnstuff: function(src, dest, bitsPerPixel, numPixels) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o;
            var bitsLeft = 0;
            var n, buffer2, missingBits;
            var numInvalidTailBytes = src.length * 4 - Math.ceil(bitsPerPixel * numPixels / 8);
            src[src.length - 1] <<= 8 * numInvalidTailBytes;
            for (o = 0; o < numPixels; o++) {
              if (bitsLeft === 0) {
                buffer2 = src[i++];
                bitsLeft = 32;
              }
              if (bitsLeft >= bitsPerPixel) {
                n = buffer2 >>> bitsLeft - bitsPerPixel & bitMask;
                bitsLeft -= bitsPerPixel;
              } else {
                missingBits = bitsPerPixel - bitsLeft;
                n = (buffer2 & bitMask) << missingBits & bitMask;
                buffer2 = src[i++];
                bitsLeft = 32 - missingBits;
                n += buffer2 >>> bitsLeft;
              }
              dest[o] = n;
            }
            return dest;
          },
          originalUnstuff2: function(src, dest, bitsPerPixel, numPixels) {
            var bitMask = (1 << bitsPerPixel) - 1;
            var i = 0, o;
            var bitsLeft = 0, bitPos = 0;
            var n, buffer2, missingBits;
            for (o = 0; o < numPixels; o++) {
              if (bitsLeft === 0) {
                buffer2 = src[i++];
                bitsLeft = 32;
                bitPos = 0;
              }
              if (bitsLeft >= bitsPerPixel) {
                n = buffer2 >>> bitPos & bitMask;
                bitsLeft -= bitsPerPixel;
                bitPos += bitsPerPixel;
              } else {
                missingBits = bitsPerPixel - bitsLeft;
                n = buffer2 >>> bitPos & bitMask;
                buffer2 = src[i++];
                bitsLeft = 32 - missingBits;
                n |= (buffer2 & (1 << missingBits) - 1) << bitsPerPixel - missingBits;
                bitPos = missingBits;
              }
              dest[o] = n;
            }
            return dest;
          }
        };
        var Lerc2Helpers = {
          HUFFMAN_LUT_BITS_MAX: 12,
          //use 2^12 lut, treat it like constant
          computeChecksumFletcher32: function(input) {
            var sum1 = 65535, sum2 = 65535;
            var len = input.length;
            var words = Math.floor(len / 2);
            var i = 0;
            while (words) {
              var tlen = words >= 359 ? 359 : words;
              words -= tlen;
              do {
                sum1 += input[i++] << 8;
                sum2 += sum1 += input[i++];
              } while (--tlen);
              sum1 = (sum1 & 65535) + (sum1 >>> 16);
              sum2 = (sum2 & 65535) + (sum2 >>> 16);
            }
            if (len & 1) {
              sum2 += sum1 += input[i] << 8;
            }
            sum1 = (sum1 & 65535) + (sum1 >>> 16);
            sum2 = (sum2 & 65535) + (sum2 >>> 16);
            return (sum2 << 16 | sum1) >>> 0;
          },
          readHeaderInfo: function(input, data) {
            var ptr = data.ptr;
            var fileIdView = new Uint8Array(input, ptr, 6);
            var headerInfo = {};
            headerInfo.fileIdentifierString = String.fromCharCode.apply(null, fileIdView);
            if (headerInfo.fileIdentifierString.lastIndexOf("Lerc2", 0) !== 0) {
              throw "Unexpected file identifier string (expect Lerc2 ): " + headerInfo.fileIdentifierString;
            }
            ptr += 6;
            var view = new DataView(input, ptr, 8);
            var fileVersion = view.getInt32(0, true);
            headerInfo.fileVersion = fileVersion;
            ptr += 4;
            if (fileVersion >= 3) {
              headerInfo.checksum = view.getUint32(4, true);
              ptr += 4;
            }
            view = new DataView(input, ptr, 12);
            headerInfo.height = view.getUint32(0, true);
            headerInfo.width = view.getUint32(4, true);
            ptr += 8;
            if (fileVersion >= 4) {
              headerInfo.numDims = view.getUint32(8, true);
              ptr += 4;
            } else {
              headerInfo.numDims = 1;
            }
            view = new DataView(input, ptr, 40);
            headerInfo.numValidPixel = view.getUint32(0, true);
            headerInfo.microBlockSize = view.getInt32(4, true);
            headerInfo.blobSize = view.getInt32(8, true);
            headerInfo.imageType = view.getInt32(12, true);
            headerInfo.maxZError = view.getFloat64(16, true);
            headerInfo.zMin = view.getFloat64(24, true);
            headerInfo.zMax = view.getFloat64(32, true);
            ptr += 40;
            data.headerInfo = headerInfo;
            data.ptr = ptr;
            var checksum, keyLength;
            if (fileVersion >= 3) {
              keyLength = fileVersion >= 4 ? 52 : 48;
              checksum = this.computeChecksumFletcher32(new Uint8Array(input, ptr - keyLength, headerInfo.blobSize - 14));
              if (checksum !== headerInfo.checksum) {
                throw "Checksum failed.";
              }
            }
            return true;
          },
          checkMinMaxRanges: function(input, data) {
            var headerInfo = data.headerInfo;
            var OutPixelTypeArray = this.getDataTypeArray(headerInfo.imageType);
            var rangeBytes = headerInfo.numDims * this.getDataTypeSize(headerInfo.imageType);
            var minValues = this.readSubArray(input, data.ptr, OutPixelTypeArray, rangeBytes);
            var maxValues = this.readSubArray(input, data.ptr + rangeBytes, OutPixelTypeArray, rangeBytes);
            data.ptr += 2 * rangeBytes;
            var i, equal = true;
            for (i = 0; i < headerInfo.numDims; i++) {
              if (minValues[i] !== maxValues[i]) {
                equal = false;
                break;
              }
            }
            headerInfo.minValues = minValues;
            headerInfo.maxValues = maxValues;
            return equal;
          },
          readSubArray: function(input, ptr, OutPixelTypeArray, numBytes) {
            var rawData;
            if (OutPixelTypeArray === Uint8Array) {
              rawData = new Uint8Array(input, ptr, numBytes);
            } else {
              var arrayBuf = new ArrayBuffer(numBytes);
              var store8 = new Uint8Array(arrayBuf);
              store8.set(new Uint8Array(input, ptr, numBytes));
              rawData = new OutPixelTypeArray(arrayBuf);
            }
            return rawData;
          },
          readMask: function(input, data) {
            var ptr = data.ptr;
            var headerInfo = data.headerInfo;
            var numPixels = headerInfo.width * headerInfo.height;
            var numValidPixel = headerInfo.numValidPixel;
            var view = new DataView(input, ptr, 4);
            var mask = {};
            mask.numBytes = view.getUint32(0, true);
            ptr += 4;
            if ((0 === numValidPixel || numPixels === numValidPixel) && 0 !== mask.numBytes) {
              throw "invalid mask";
            }
            var bitset, resultMask;
            if (numValidPixel === 0) {
              bitset = new Uint8Array(Math.ceil(numPixels / 8));
              mask.bitset = bitset;
              resultMask = new Uint8Array(numPixels);
              data.pixels.resultMask = resultMask;
              ptr += mask.numBytes;
            } else if (mask.numBytes > 0) {
              bitset = new Uint8Array(Math.ceil(numPixels / 8));
              view = new DataView(input, ptr, mask.numBytes);
              var cnt = view.getInt16(0, true);
              var ip = 2, op = 0, val = 0;
              do {
                if (cnt > 0) {
                  while (cnt--) {
                    bitset[op++] = view.getUint8(ip++);
                  }
                } else {
                  val = view.getUint8(ip++);
                  cnt = -cnt;
                  while (cnt--) {
                    bitset[op++] = val;
                  }
                }
                cnt = view.getInt16(ip, true);
                ip += 2;
              } while (ip < mask.numBytes);
              if (cnt !== -32768 || op < bitset.length) {
                throw "Unexpected end of mask RLE encoding";
              }
              resultMask = new Uint8Array(numPixels);
              var mb = 0, k = 0;
              for (k = 0; k < numPixels; k++) {
                if (k & 7) {
                  mb = bitset[k >> 3];
                  mb <<= k & 7;
                } else {
                  mb = bitset[k >> 3];
                }
                if (mb & 128) {
                  resultMask[k] = 1;
                }
              }
              data.pixels.resultMask = resultMask;
              mask.bitset = bitset;
              ptr += mask.numBytes;
            }
            data.ptr = ptr;
            data.mask = mask;
            return true;
          },
          readDataOneSweep: function(input, data, OutPixelTypeArray, useBSQForOutputDim) {
            var ptr = data.ptr;
            var headerInfo = data.headerInfo;
            var numDims = headerInfo.numDims;
            var numPixels = headerInfo.width * headerInfo.height;
            var imageType = headerInfo.imageType;
            var numBytes = headerInfo.numValidPixel * Lerc2Helpers.getDataTypeSize(imageType) * numDims;
            var rawData;
            var mask = data.pixels.resultMask;
            if (OutPixelTypeArray === Uint8Array) {
              rawData = new Uint8Array(input, ptr, numBytes);
            } else {
              var arrayBuf = new ArrayBuffer(numBytes);
              var store8 = new Uint8Array(arrayBuf);
              store8.set(new Uint8Array(input, ptr, numBytes));
              rawData = new OutPixelTypeArray(arrayBuf);
            }
            if (rawData.length === numPixels * numDims) {
              if (useBSQForOutputDim) {
                data.pixels.resultPixels = Lerc2Helpers.swapDimensionOrder(rawData, numPixels, numDims, OutPixelTypeArray, true);
              } else {
                data.pixels.resultPixels = rawData;
              }
            } else {
              data.pixels.resultPixels = new OutPixelTypeArray(numPixels * numDims);
              var z = 0, k = 0, i = 0, nStart = 0;
              if (numDims > 1) {
                if (useBSQForOutputDim) {
                  for (k = 0; k < numPixels; k++) {
                    if (mask[k]) {
                      nStart = k;
                      for (i = 0; i < numDims; i++, nStart += numPixels) {
                        data.pixels.resultPixels[nStart] = rawData[z++];
                      }
                    }
                  }
                } else {
                  for (k = 0; k < numPixels; k++) {
                    if (mask[k]) {
                      nStart = k * numDims;
                      for (i = 0; i < numDims; i++) {
                        data.pixels.resultPixels[nStart + i] = rawData[z++];
                      }
                    }
                  }
                }
              } else {
                for (k = 0; k < numPixels; k++) {
                  if (mask[k]) {
                    data.pixels.resultPixels[k] = rawData[z++];
                  }
                }
              }
            }
            ptr += numBytes;
            data.ptr = ptr;
            return true;
          },
          readHuffmanTree: function(input, data) {
            var BITS_MAX = this.HUFFMAN_LUT_BITS_MAX;
            var view = new DataView(input, data.ptr, 16);
            data.ptr += 16;
            var version = view.getInt32(0, true);
            if (version < 2) {
              throw "unsupported Huffman version";
            }
            var size = view.getInt32(4, true);
            var i0 = view.getInt32(8, true);
            var i1 = view.getInt32(12, true);
            if (i0 >= i1) {
              return false;
            }
            var blockDataBuffer = new Uint32Array(i1 - i0);
            Lerc2Helpers.decodeBits(input, data, blockDataBuffer);
            var codeTable = [];
            var i, j, k, len;
            for (i = i0; i < i1; i++) {
              j = i - (i < size ? 0 : size);
              codeTable[j] = { first: blockDataBuffer[i - i0], second: null };
            }
            var dataBytes = input.byteLength - data.ptr;
            var dataWords = Math.ceil(dataBytes / 4);
            var arrayBuf = new ArrayBuffer(dataWords * 4);
            var store8 = new Uint8Array(arrayBuf);
            store8.set(new Uint8Array(input, data.ptr, dataBytes));
            var stuffedData = new Uint32Array(arrayBuf);
            var bitPos = 0, word, srcPtr = 0;
            word = stuffedData[0];
            for (i = i0; i < i1; i++) {
              j = i - (i < size ? 0 : size);
              len = codeTable[j].first;
              if (len > 0) {
                codeTable[j].second = word << bitPos >>> 32 - len;
                if (32 - bitPos >= len) {
                  bitPos += len;
                  if (bitPos === 32) {
                    bitPos = 0;
                    srcPtr++;
                    word = stuffedData[srcPtr];
                  }
                } else {
                  bitPos += len - 32;
                  srcPtr++;
                  word = stuffedData[srcPtr];
                  codeTable[j].second |= word >>> 32 - bitPos;
                }
              }
            }
            var numBitsLUT = 0, numBitsLUTQick = 0;
            var tree = new TreeNode();
            for (i = 0; i < codeTable.length; i++) {
              if (codeTable[i] !== void 0) {
                numBitsLUT = Math.max(numBitsLUT, codeTable[i].first);
              }
            }
            if (numBitsLUT >= BITS_MAX) {
              numBitsLUTQick = BITS_MAX;
            } else {
              numBitsLUTQick = numBitsLUT;
            }
            var decodeLut = [], entry, code, numEntries, jj, currentBit, node;
            for (i = i0; i < i1; i++) {
              j = i - (i < size ? 0 : size);
              len = codeTable[j].first;
              if (len > 0) {
                entry = [len, j];
                if (len <= numBitsLUTQick) {
                  code = codeTable[j].second << numBitsLUTQick - len;
                  numEntries = 1 << numBitsLUTQick - len;
                  for (k = 0; k < numEntries; k++) {
                    decodeLut[code | k] = entry;
                  }
                } else {
                  code = codeTable[j].second;
                  node = tree;
                  for (jj = len - 1; jj >= 0; jj--) {
                    currentBit = code >>> jj & 1;
                    if (currentBit) {
                      if (!node.right) {
                        node.right = new TreeNode();
                      }
                      node = node.right;
                    } else {
                      if (!node.left) {
                        node.left = new TreeNode();
                      }
                      node = node.left;
                    }
                    if (jj === 0 && !node.val) {
                      node.val = entry[1];
                    }
                  }
                }
              }
            }
            return {
              decodeLut,
              numBitsLUTQick,
              numBitsLUT,
              tree,
              stuffedData,
              srcPtr,
              bitPos
            };
          },
          readHuffman: function(input, data, OutPixelTypeArray, useBSQForOutputDim) {
            var headerInfo = data.headerInfo;
            var numDims = headerInfo.numDims;
            var height = data.headerInfo.height;
            var width = data.headerInfo.width;
            var numPixels = width * height;
            var huffmanInfo = this.readHuffmanTree(input, data);
            var decodeLut = huffmanInfo.decodeLut;
            var tree = huffmanInfo.tree;
            var stuffedData = huffmanInfo.stuffedData;
            var srcPtr = huffmanInfo.srcPtr;
            var bitPos = huffmanInfo.bitPos;
            var numBitsLUTQick = huffmanInfo.numBitsLUTQick;
            var numBitsLUT = huffmanInfo.numBitsLUT;
            var offset = data.headerInfo.imageType === 0 ? 128 : 0;
            var node, val, delta, mask = data.pixels.resultMask, valTmp, valTmpQuick, currentBit;
            var i, j, k, ii;
            var prevVal = 0;
            if (bitPos > 0) {
              srcPtr++;
              bitPos = 0;
            }
            var word = stuffedData[srcPtr];
            var deltaEncode = data.encodeMode === 1;
            var resultPixelsAllDim = new OutPixelTypeArray(numPixels * numDims);
            var resultPixels = resultPixelsAllDim;
            var iDim;
            if (numDims < 2 || deltaEncode) {
              for (iDim = 0; iDim < numDims; iDim++) {
                if (numDims > 1) {
                  resultPixels = new OutPixelTypeArray(resultPixelsAllDim.buffer, numPixels * iDim, numPixels);
                  prevVal = 0;
                }
                if (data.headerInfo.numValidPixel === width * height) {
                  for (k = 0, i = 0; i < height; i++) {
                    for (j = 0; j < width; j++, k++) {
                      val = 0;
                      valTmp = word << bitPos >>> 32 - numBitsLUTQick;
                      valTmpQuick = valTmp;
                      if (32 - bitPos < numBitsLUTQick) {
                        valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUTQick;
                        valTmpQuick = valTmp;
                      }
                      if (decodeLut[valTmpQuick]) {
                        val = decodeLut[valTmpQuick][1];
                        bitPos += decodeLut[valTmpQuick][0];
                      } else {
                        valTmp = word << bitPos >>> 32 - numBitsLUT;
                        valTmpQuick = valTmp;
                        if (32 - bitPos < numBitsLUT) {
                          valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUT;
                          valTmpQuick = valTmp;
                        }
                        node = tree;
                        for (ii = 0; ii < numBitsLUT; ii++) {
                          currentBit = valTmp >>> numBitsLUT - ii - 1 & 1;
                          node = currentBit ? node.right : node.left;
                          if (!(node.left || node.right)) {
                            val = node.val;
                            bitPos = bitPos + ii + 1;
                            break;
                          }
                        }
                      }
                      if (bitPos >= 32) {
                        bitPos -= 32;
                        srcPtr++;
                        word = stuffedData[srcPtr];
                      }
                      delta = val - offset;
                      if (deltaEncode) {
                        if (j > 0) {
                          delta += prevVal;
                        } else if (i > 0) {
                          delta += resultPixels[k - width];
                        } else {
                          delta += prevVal;
                        }
                        delta &= 255;
                        resultPixels[k] = delta;
                        prevVal = delta;
                      } else {
                        resultPixels[k] = delta;
                      }
                    }
                  }
                } else {
                  for (k = 0, i = 0; i < height; i++) {
                    for (j = 0; j < width; j++, k++) {
                      if (mask[k]) {
                        val = 0;
                        valTmp = word << bitPos >>> 32 - numBitsLUTQick;
                        valTmpQuick = valTmp;
                        if (32 - bitPos < numBitsLUTQick) {
                          valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUTQick;
                          valTmpQuick = valTmp;
                        }
                        if (decodeLut[valTmpQuick]) {
                          val = decodeLut[valTmpQuick][1];
                          bitPos += decodeLut[valTmpQuick][0];
                        } else {
                          valTmp = word << bitPos >>> 32 - numBitsLUT;
                          valTmpQuick = valTmp;
                          if (32 - bitPos < numBitsLUT) {
                            valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUT;
                            valTmpQuick = valTmp;
                          }
                          node = tree;
                          for (ii = 0; ii < numBitsLUT; ii++) {
                            currentBit = valTmp >>> numBitsLUT - ii - 1 & 1;
                            node = currentBit ? node.right : node.left;
                            if (!(node.left || node.right)) {
                              val = node.val;
                              bitPos = bitPos + ii + 1;
                              break;
                            }
                          }
                        }
                        if (bitPos >= 32) {
                          bitPos -= 32;
                          srcPtr++;
                          word = stuffedData[srcPtr];
                        }
                        delta = val - offset;
                        if (deltaEncode) {
                          if (j > 0 && mask[k - 1]) {
                            delta += prevVal;
                          } else if (i > 0 && mask[k - width]) {
                            delta += resultPixels[k - width];
                          } else {
                            delta += prevVal;
                          }
                          delta &= 255;
                          resultPixels[k] = delta;
                          prevVal = delta;
                        } else {
                          resultPixels[k] = delta;
                        }
                      }
                    }
                  }
                }
              }
            } else {
              for (k = 0, i = 0; i < height; i++) {
                for (j = 0; j < width; j++) {
                  k = i * width + j;
                  if (!mask || mask[k]) {
                    for (iDim = 0; iDim < numDims; iDim++, k += numPixels) {
                      val = 0;
                      valTmp = word << bitPos >>> 32 - numBitsLUTQick;
                      valTmpQuick = valTmp;
                      if (32 - bitPos < numBitsLUTQick) {
                        valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUTQick;
                        valTmpQuick = valTmp;
                      }
                      if (decodeLut[valTmpQuick]) {
                        val = decodeLut[valTmpQuick][1];
                        bitPos += decodeLut[valTmpQuick][0];
                      } else {
                        valTmp = word << bitPos >>> 32 - numBitsLUT;
                        valTmpQuick = valTmp;
                        if (32 - bitPos < numBitsLUT) {
                          valTmp |= stuffedData[srcPtr + 1] >>> 64 - bitPos - numBitsLUT;
                          valTmpQuick = valTmp;
                        }
                        node = tree;
                        for (ii = 0; ii < numBitsLUT; ii++) {
                          currentBit = valTmp >>> numBitsLUT - ii - 1 & 1;
                          node = currentBit ? node.right : node.left;
                          if (!(node.left || node.right)) {
                            val = node.val;
                            bitPos = bitPos + ii + 1;
                            break;
                          }
                        }
                      }
                      if (bitPos >= 32) {
                        bitPos -= 32;
                        srcPtr++;
                        word = stuffedData[srcPtr];
                      }
                      delta = val - offset;
                      resultPixels[k] = delta;
                    }
                  }
                }
              }
            }
            data.ptr = data.ptr + (srcPtr + 1) * 4 + (bitPos > 0 ? 4 : 0);
            data.pixels.resultPixels = resultPixelsAllDim;
            if (numDims > 1 && !useBSQForOutputDim) {
              data.pixels.resultPixels = Lerc2Helpers.swapDimensionOrder(resultPixelsAllDim, numPixels, numDims, OutPixelTypeArray);
            }
          },
          decodeBits: function(input, data, blockDataBuffer, offset, iDim) {
            {
              var headerInfo = data.headerInfo;
              var fileVersion = headerInfo.fileVersion;
              var blockPtr = 0;
              var viewByteLength = input.byteLength - data.ptr >= 5 ? 5 : input.byteLength - data.ptr;
              var view = new DataView(input, data.ptr, viewByteLength);
              var headerByte = view.getUint8(0);
              blockPtr++;
              var bits67 = headerByte >> 6;
              var n = bits67 === 0 ? 4 : 3 - bits67;
              var doLut = (headerByte & 32) > 0 ? true : false;
              var numBits = headerByte & 31;
              var numElements = 0;
              if (n === 1) {
                numElements = view.getUint8(blockPtr);
                blockPtr++;
              } else if (n === 2) {
                numElements = view.getUint16(blockPtr, true);
                blockPtr += 2;
              } else if (n === 4) {
                numElements = view.getUint32(blockPtr, true);
                blockPtr += 4;
              } else {
                throw "Invalid valid pixel count type";
              }
              var scale = 2 * headerInfo.maxZError;
              var stuffedData, arrayBuf, store8, dataBytes, dataWords;
              var lutArr, lutData, lutBytes, lutBitsPerElement, bitsPerPixel;
              var zMax = headerInfo.numDims > 1 ? headerInfo.maxValues[iDim] : headerInfo.zMax;
              if (doLut) {
                data.counter.lut++;
                lutBytes = view.getUint8(blockPtr);
                lutBitsPerElement = numBits;
                blockPtr++;
                dataBytes = Math.ceil((lutBytes - 1) * numBits / 8);
                dataWords = Math.ceil(dataBytes / 4);
                arrayBuf = new ArrayBuffer(dataWords * 4);
                store8 = new Uint8Array(arrayBuf);
                data.ptr += blockPtr;
                store8.set(new Uint8Array(input, data.ptr, dataBytes));
                lutData = new Uint32Array(arrayBuf);
                data.ptr += dataBytes;
                bitsPerPixel = 0;
                while (lutBytes - 1 >>> bitsPerPixel) {
                  bitsPerPixel++;
                }
                dataBytes = Math.ceil(numElements * bitsPerPixel / 8);
                dataWords = Math.ceil(dataBytes / 4);
                arrayBuf = new ArrayBuffer(dataWords * 4);
                store8 = new Uint8Array(arrayBuf);
                store8.set(new Uint8Array(input, data.ptr, dataBytes));
                stuffedData = new Uint32Array(arrayBuf);
                data.ptr += dataBytes;
                if (fileVersion >= 3) {
                  lutArr = BitStuffer.unstuffLUT2(lutData, numBits, lutBytes - 1, offset, scale, zMax);
                } else {
                  lutArr = BitStuffer.unstuffLUT(lutData, numBits, lutBytes - 1, offset, scale, zMax);
                }
                if (fileVersion >= 3) {
                  BitStuffer.unstuff2(stuffedData, blockDataBuffer, bitsPerPixel, numElements, lutArr);
                } else {
                  BitStuffer.unstuff(stuffedData, blockDataBuffer, bitsPerPixel, numElements, lutArr);
                }
              } else {
                data.counter.bitstuffer++;
                bitsPerPixel = numBits;
                data.ptr += blockPtr;
                if (bitsPerPixel > 0) {
                  dataBytes = Math.ceil(numElements * bitsPerPixel / 8);
                  dataWords = Math.ceil(dataBytes / 4);
                  arrayBuf = new ArrayBuffer(dataWords * 4);
                  store8 = new Uint8Array(arrayBuf);
                  store8.set(new Uint8Array(input, data.ptr, dataBytes));
                  stuffedData = new Uint32Array(arrayBuf);
                  data.ptr += dataBytes;
                  if (fileVersion >= 3) {
                    if (offset == null) {
                      BitStuffer.originalUnstuff2(stuffedData, blockDataBuffer, bitsPerPixel, numElements);
                    } else {
                      BitStuffer.unstuff2(stuffedData, blockDataBuffer, bitsPerPixel, numElements, false, offset, scale, zMax);
                    }
                  } else {
                    if (offset == null) {
                      BitStuffer.originalUnstuff(stuffedData, blockDataBuffer, bitsPerPixel, numElements);
                    } else {
                      BitStuffer.unstuff(stuffedData, blockDataBuffer, bitsPerPixel, numElements, false, offset, scale, zMax);
                    }
                  }
                }
              }
            }
          },
          readTiles: function(input, data, OutPixelTypeArray, useBSQForOutputDim) {
            var headerInfo = data.headerInfo;
            var width = headerInfo.width;
            var height = headerInfo.height;
            var numPixels = width * height;
            var microBlockSize = headerInfo.microBlockSize;
            var imageType = headerInfo.imageType;
            var dataTypeSize = Lerc2Helpers.getDataTypeSize(imageType);
            var numBlocksX = Math.ceil(width / microBlockSize);
            var numBlocksY = Math.ceil(height / microBlockSize);
            data.pixels.numBlocksY = numBlocksY;
            data.pixels.numBlocksX = numBlocksX;
            data.pixels.ptr = 0;
            var row = 0, col = 0, blockY = 0, blockX = 0, thisBlockHeight = 0, thisBlockWidth = 0, bytesLeft = 0, headerByte = 0, bits67 = 0, testCode = 0, outPtr = 0, outStride = 0, numBytes = 0, bytesleft = 0, z = 0, blockPtr = 0;
            var view, block, arrayBuf, store8, rawData;
            var blockEncoding;
            var blockDataBuffer = new OutPixelTypeArray(microBlockSize * microBlockSize);
            var lastBlockHeight = height % microBlockSize || microBlockSize;
            var lastBlockWidth = width % microBlockSize || microBlockSize;
            var offsetType, offset;
            var numDims = headerInfo.numDims, iDim;
            var mask = data.pixels.resultMask;
            var resultPixels = data.pixels.resultPixels;
            var fileVersion = headerInfo.fileVersion;
            var fileVersionCheckNum = fileVersion >= 5 ? 14 : 15;
            var isDiffEncoding;
            var zMax = headerInfo.zMax;
            var resultPixelsPrevDim;
            for (blockY = 0; blockY < numBlocksY; blockY++) {
              thisBlockHeight = blockY !== numBlocksY - 1 ? microBlockSize : lastBlockHeight;
              for (blockX = 0; blockX < numBlocksX; blockX++) {
                thisBlockWidth = blockX !== numBlocksX - 1 ? microBlockSize : lastBlockWidth;
                outPtr = blockY * width * microBlockSize + blockX * microBlockSize;
                outStride = width - thisBlockWidth;
                for (iDim = 0; iDim < numDims; iDim++) {
                  if (numDims > 1) {
                    resultPixelsPrevDim = resultPixels;
                    outPtr = blockY * width * microBlockSize + blockX * microBlockSize;
                    resultPixels = new OutPixelTypeArray(data.pixels.resultPixels.buffer, numPixels * iDim * dataTypeSize, numPixels);
                    zMax = headerInfo.maxValues[iDim];
                  } else {
                    resultPixelsPrevDim = null;
                  }
                  bytesLeft = input.byteLength - data.ptr;
                  view = new DataView(input, data.ptr, Math.min(10, bytesLeft));
                  block = {};
                  blockPtr = 0;
                  headerByte = view.getUint8(0);
                  blockPtr++;
                  isDiffEncoding = headerInfo.fileVersion >= 5 ? headerByte & 4 : 0;
                  bits67 = headerByte >> 6 & 255;
                  testCode = headerByte >> 2 & fileVersionCheckNum;
                  if (testCode !== (blockX * microBlockSize >> 3 & fileVersionCheckNum)) {
                    throw "integrity issue";
                  }
                  if (isDiffEncoding && iDim === 0) {
                    throw "integrity issue";
                  }
                  blockEncoding = headerByte & 3;
                  if (blockEncoding > 3) {
                    data.ptr += blockPtr;
                    throw "Invalid block encoding (" + blockEncoding + ")";
                  } else if (blockEncoding === 2) {
                    if (isDiffEncoding) {
                      if (mask) {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            if (mask[outPtr]) {
                              resultPixels[outPtr] = resultPixelsPrevDim[outPtr];
                            }
                            outPtr++;
                          }
                        }
                      } else {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            resultPixels[outPtr] = resultPixelsPrevDim[outPtr];
                            outPtr++;
                          }
                        }
                      }
                    }
                    data.counter.constant++;
                    data.ptr += blockPtr;
                    continue;
                  } else if (blockEncoding === 0) {
                    if (isDiffEncoding) {
                      throw "integrity issue";
                    }
                    data.counter.uncompressed++;
                    data.ptr += blockPtr;
                    numBytes = thisBlockHeight * thisBlockWidth * dataTypeSize;
                    bytesleft = input.byteLength - data.ptr;
                    numBytes = numBytes < bytesleft ? numBytes : bytesleft;
                    arrayBuf = new ArrayBuffer(numBytes % dataTypeSize === 0 ? numBytes : numBytes + dataTypeSize - numBytes % dataTypeSize);
                    store8 = new Uint8Array(arrayBuf);
                    store8.set(new Uint8Array(input, data.ptr, numBytes));
                    rawData = new OutPixelTypeArray(arrayBuf);
                    z = 0;
                    if (mask) {
                      for (row = 0; row < thisBlockHeight; row++) {
                        for (col = 0; col < thisBlockWidth; col++) {
                          if (mask[outPtr]) {
                            resultPixels[outPtr] = rawData[z++];
                          }
                          outPtr++;
                        }
                        outPtr += outStride;
                      }
                    } else {
                      for (row = 0; row < thisBlockHeight; row++) {
                        for (col = 0; col < thisBlockWidth; col++) {
                          resultPixels[outPtr++] = rawData[z++];
                        }
                        outPtr += outStride;
                      }
                    }
                    data.ptr += z * dataTypeSize;
                  } else {
                    offsetType = Lerc2Helpers.getDataTypeUsed(isDiffEncoding && imageType < 6 ? 4 : imageType, bits67);
                    offset = Lerc2Helpers.getOnePixel(block, blockPtr, offsetType, view);
                    blockPtr += Lerc2Helpers.getDataTypeSize(offsetType);
                    if (blockEncoding === 3) {
                      data.ptr += blockPtr;
                      data.counter.constantoffset++;
                      if (mask) {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            if (mask[outPtr]) {
                              resultPixels[outPtr] = isDiffEncoding ? Math.min(zMax, resultPixelsPrevDim[outPtr] + offset) : offset;
                            }
                            outPtr++;
                          }
                          outPtr += outStride;
                        }
                      } else {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            resultPixels[outPtr] = isDiffEncoding ? Math.min(zMax, resultPixelsPrevDim[outPtr] + offset) : offset;
                            outPtr++;
                          }
                          outPtr += outStride;
                        }
                      }
                    } else {
                      data.ptr += blockPtr;
                      Lerc2Helpers.decodeBits(input, data, blockDataBuffer, offset, iDim);
                      blockPtr = 0;
                      if (isDiffEncoding) {
                        if (mask) {
                          for (row = 0; row < thisBlockHeight; row++) {
                            for (col = 0; col < thisBlockWidth; col++) {
                              if (mask[outPtr]) {
                                resultPixels[outPtr] = blockDataBuffer[blockPtr++] + resultPixelsPrevDim[outPtr];
                              }
                              outPtr++;
                            }
                            outPtr += outStride;
                          }
                        } else {
                          for (row = 0; row < thisBlockHeight; row++) {
                            for (col = 0; col < thisBlockWidth; col++) {
                              resultPixels[outPtr] = blockDataBuffer[blockPtr++] + resultPixelsPrevDim[outPtr];
                              outPtr++;
                            }
                            outPtr += outStride;
                          }
                        }
                      } else if (mask) {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            if (mask[outPtr]) {
                              resultPixels[outPtr] = blockDataBuffer[blockPtr++];
                            }
                            outPtr++;
                          }
                          outPtr += outStride;
                        }
                      } else {
                        for (row = 0; row < thisBlockHeight; row++) {
                          for (col = 0; col < thisBlockWidth; col++) {
                            resultPixels[outPtr++] = blockDataBuffer[blockPtr++];
                          }
                          outPtr += outStride;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (numDims > 1 && !useBSQForOutputDim) {
              data.pixels.resultPixels = Lerc2Helpers.swapDimensionOrder(data.pixels.resultPixels, numPixels, numDims, OutPixelTypeArray);
            }
          },
          /*****************
          *  private methods (helper methods)
          *****************/
          formatFileInfo: function(data) {
            return {
              "fileIdentifierString": data.headerInfo.fileIdentifierString,
              "fileVersion": data.headerInfo.fileVersion,
              "imageType": data.headerInfo.imageType,
              "height": data.headerInfo.height,
              "width": data.headerInfo.width,
              "numValidPixel": data.headerInfo.numValidPixel,
              "microBlockSize": data.headerInfo.microBlockSize,
              "blobSize": data.headerInfo.blobSize,
              "maxZError": data.headerInfo.maxZError,
              "pixelType": Lerc2Helpers.getPixelType(data.headerInfo.imageType),
              "eofOffset": data.eofOffset,
              "mask": data.mask ? {
                "numBytes": data.mask.numBytes
              } : null,
              "pixels": {
                "numBlocksX": data.pixels.numBlocksX,
                "numBlocksY": data.pixels.numBlocksY,
                //"numBytes": data.pixels.numBytes,
                "maxValue": data.headerInfo.zMax,
                "minValue": data.headerInfo.zMin,
                "noDataValue": data.noDataValue
              }
            };
          },
          constructConstantSurface: function(data, useBSQForOutputDim) {
            var val = data.headerInfo.zMax;
            var valMin = data.headerInfo.zMin;
            var maxValues = data.headerInfo.maxValues;
            var numDims = data.headerInfo.numDims;
            var numPixels = data.headerInfo.height * data.headerInfo.width;
            var i = 0, k = 0, nStart = 0;
            var mask = data.pixels.resultMask;
            var resultPixels = data.pixels.resultPixels;
            if (mask) {
              if (numDims > 1) {
                if (useBSQForOutputDim) {
                  for (i = 0; i < numDims; i++) {
                    nStart = i * numPixels;
                    val = maxValues[i];
                    for (k = 0; k < numPixels; k++) {
                      if (mask[k]) {
                        resultPixels[nStart + k] = val;
                      }
                    }
                  }
                } else {
                  for (k = 0; k < numPixels; k++) {
                    if (mask[k]) {
                      nStart = k * numDims;
                      for (i = 0; i < numDims; i++) {
                        resultPixels[nStart + numDims] = maxValues[i];
                      }
                    }
                  }
                }
              } else {
                for (k = 0; k < numPixels; k++) {
                  if (mask[k]) {
                    resultPixels[k] = val;
                  }
                }
              }
            } else {
              if (numDims > 1 && valMin !== val) {
                if (useBSQForOutputDim) {
                  for (i = 0; i < numDims; i++) {
                    nStart = i * numPixels;
                    val = maxValues[i];
                    for (k = 0; k < numPixels; k++) {
                      resultPixels[nStart + k] = val;
                    }
                  }
                } else {
                  for (k = 0; k < numPixels; k++) {
                    nStart = k * numDims;
                    for (i = 0; i < numDims; i++) {
                      resultPixels[nStart + i] = maxValues[i];
                    }
                  }
                }
              } else {
                for (k = 0; k < numPixels * numDims; k++) {
                  resultPixels[k] = val;
                }
              }
            }
            return;
          },
          getDataTypeArray: function(t) {
            var tp;
            switch (t) {
              case 0:
                tp = Int8Array;
                break;
              case 1:
                tp = Uint8Array;
                break;
              case 2:
                tp = Int16Array;
                break;
              case 3:
                tp = Uint16Array;
                break;
              case 4:
                tp = Int32Array;
                break;
              case 5:
                tp = Uint32Array;
                break;
              case 6:
                tp = Float32Array;
                break;
              case 7:
                tp = Float64Array;
                break;
              default:
                tp = Float32Array;
            }
            return tp;
          },
          getPixelType: function(t) {
            var tp;
            switch (t) {
              case 0:
                tp = "S8";
                break;
              case 1:
                tp = "U8";
                break;
              case 2:
                tp = "S16";
                break;
              case 3:
                tp = "U16";
                break;
              case 4:
                tp = "S32";
                break;
              case 5:
                tp = "U32";
                break;
              case 6:
                tp = "F32";
                break;
              case 7:
                tp = "F64";
                break;
              default:
                tp = "F32";
            }
            return tp;
          },
          isValidPixelValue: function(t, val) {
            if (val == null) {
              return false;
            }
            var isValid;
            switch (t) {
              case 0:
                isValid = val >= -128 && val <= 127;
                break;
              case 1:
                isValid = val >= 0 && val <= 255;
                break;
              case 2:
                isValid = val >= -32768 && val <= 32767;
                break;
              case 3:
                isValid = val >= 0 && val <= 65536;
                break;
              case 4:
                isValid = val >= -2147483648 && val <= 2147483647;
                break;
              case 5:
                isValid = val >= 0 && val <= 4294967296;
                break;
              case 6:
                isValid = val >= -34027999387901484e22 && val <= 34027999387901484e22;
                break;
              case 7:
                isValid = val >= -17976931348623157e292 && val <= 17976931348623157e292;
                break;
              default:
                isValid = false;
            }
            return isValid;
          },
          getDataTypeSize: function(t) {
            var s = 0;
            switch (t) {
              case 0:
              //ubyte
              case 1:
                s = 1;
                break;
              case 2:
              //short
              case 3:
                s = 2;
                break;
              case 4:
              case 5:
              case 6:
                s = 4;
                break;
              case 7:
                s = 8;
                break;
              default:
                s = t;
            }
            return s;
          },
          getDataTypeUsed: function(dt, tc) {
            var t = dt;
            switch (dt) {
              case 2:
              //short
              case 4:
                t = dt - tc;
                break;
              case 3:
              //ushort
              case 5:
                t = dt - 2 * tc;
                break;
              case 6:
                if (0 === tc) {
                  t = dt;
                } else if (1 === tc) {
                  t = 2;
                } else {
                  t = 1;
                }
                break;
              case 7:
                if (0 === tc) {
                  t = dt;
                } else {
                  t = dt - 2 * tc + 1;
                }
                break;
              default:
                t = dt;
                break;
            }
            return t;
          },
          getOnePixel: function(block, blockPtr, offsetType, view) {
            var temp = 0;
            switch (offsetType) {
              case 0:
                temp = view.getInt8(blockPtr);
                break;
              case 1:
                temp = view.getUint8(blockPtr);
                break;
              case 2:
                temp = view.getInt16(blockPtr, true);
                break;
              case 3:
                temp = view.getUint16(blockPtr, true);
                break;
              case 4:
                temp = view.getInt32(blockPtr, true);
                break;
              case 5:
                temp = view.getUInt32(blockPtr, true);
                break;
              case 6:
                temp = view.getFloat32(blockPtr, true);
                break;
              case 7:
                temp = view.getFloat64(blockPtr, true);
                break;
              default:
                throw "the decoder does not understand this pixel type";
            }
            return temp;
          },
          swapDimensionOrder: function(pixels, numPixels, numDims, OutPixelTypeArray, inputIsBIP) {
            var i = 0, j = 0, iDim = 0, temp = 0, swap = pixels;
            if (numDims > 1) {
              swap = new OutPixelTypeArray(numPixels * numDims);
              if (inputIsBIP) {
                for (i = 0; i < numPixels; i++) {
                  temp = i;
                  for (iDim = 0; iDim < numDims; iDim++, temp += numPixels) {
                    swap[temp] = pixels[j++];
                  }
                }
              } else {
                for (i = 0; i < numPixels; i++) {
                  temp = i;
                  for (iDim = 0; iDim < numDims; iDim++, temp += numPixels) {
                    swap[j++] = pixels[temp];
                  }
                }
              }
            }
            return swap;
          }
        };
        var TreeNode = function(val, left, right) {
          this.val = val;
          this.left = left;
          this.right = right;
        };
        var Lerc2Decode2 = {
          /*
          * ********removed options compared to LERC1. We can bring some of them back if needed.
           * removed pixel type. LERC2 is typed and doesn't require user to give pixel type
           * changed encodedMaskData to maskData. LERC2 's js version make it faster to use maskData directly.
           * removed returnMask. mask is used by LERC2 internally and is cost free. In case of user input mask, it's returned as well and has neglible cost.
           * removed nodatavalue. Because LERC2 pixels are typed, nodatavalue will sacrify a useful value for many types (8bit, 16bit) etc,
           *       user has to be knowledgable enough about raster and their data to avoid usability issues. so nodata value is simply removed now.
           *       We can add it back later if their's a clear requirement.
           * removed encodedMask. This option was not implemented in LercDecode. It can be done after decoding (less efficient)
           * removed computeUsedBitDepths.
           *
           *
           * response changes compared to LERC1
           * 1. encodedMaskData is not available
           * 2. noDataValue is optional (returns only if user's noDataValue is with in the valid data type range)
           * 3. maskData is always available
          */
          /*****************
          *  public properties
          ******************/
          //HUFFMAN_LUT_BITS_MAX: 12, //use 2^12 lut, not configurable
          /*****************
          *  public methods
          *****************/
          /**
           * Decode a LERC2 byte stream and return an object containing the pixel data and optional metadata.
           *
           * @param {ArrayBuffer} input The LERC input byte stream
           * @param {object} [options] options Decoding options
           * @param {number} [options.inputOffset] The number of bytes to skip in the input byte stream. A valid LERC file is expected at that position
           * @param {boolean} [options.returnFileInfo] If true, the return value will have a fileInfo property that contains metadata obtained from the LERC headers and the decoding process
           * @param {boolean} [options.returnPixelInterleavedDims]  If true, returned dimensions are pixel-interleaved, a.k.a [p1_dim0, p1_dim1, p1_dimn, p2_dim0...], default is [p1_dim0, p2_dim0, ..., p1_dim1, p2_dim1...]
           */
          decode: function(input, options) {
            options = options || {};
            var noDataValue = options.noDataValue;
            var i = 0, data = {};
            data.ptr = options.inputOffset || 0;
            data.pixels = {};
            if (!Lerc2Helpers.readHeaderInfo(input, data)) {
              return;
            }
            var headerInfo = data.headerInfo;
            var fileVersion = headerInfo.fileVersion;
            var OutPixelTypeArray = Lerc2Helpers.getDataTypeArray(headerInfo.imageType);
            if (fileVersion > 5) {
              throw "unsupported lerc version 2." + fileVersion;
            }
            Lerc2Helpers.readMask(input, data);
            if (headerInfo.numValidPixel !== headerInfo.width * headerInfo.height && !data.pixels.resultMask) {
              data.pixels.resultMask = options.maskData;
            }
            var numPixels = headerInfo.width * headerInfo.height;
            data.pixels.resultPixels = new OutPixelTypeArray(numPixels * headerInfo.numDims);
            data.counter = {
              onesweep: 0,
              uncompressed: 0,
              lut: 0,
              bitstuffer: 0,
              constant: 0,
              constantoffset: 0
            };
            var useBSQForOutputDim = !options.returnPixelInterleavedDims;
            if (headerInfo.numValidPixel !== 0) {
              if (headerInfo.zMax === headerInfo.zMin) {
                Lerc2Helpers.constructConstantSurface(data, useBSQForOutputDim);
              } else if (fileVersion >= 4 && Lerc2Helpers.checkMinMaxRanges(input, data)) {
                Lerc2Helpers.constructConstantSurface(data, useBSQForOutputDim);
              } else {
                var view = new DataView(input, data.ptr, 2);
                var bReadDataOneSweep = view.getUint8(0);
                data.ptr++;
                if (bReadDataOneSweep) {
                  Lerc2Helpers.readDataOneSweep(input, data, OutPixelTypeArray, useBSQForOutputDim);
                } else {
                  if (fileVersion > 1 && headerInfo.imageType <= 1 && Math.abs(headerInfo.maxZError - 0.5) < 1e-5) {
                    var flagHuffman = view.getUint8(1);
                    data.ptr++;
                    data.encodeMode = flagHuffman;
                    if (flagHuffman > 2 || fileVersion < 4 && flagHuffman > 1) {
                      throw "Invalid Huffman flag " + flagHuffman;
                    }
                    if (flagHuffman) {
                      Lerc2Helpers.readHuffman(input, data, OutPixelTypeArray, useBSQForOutputDim);
                    } else {
                      Lerc2Helpers.readTiles(input, data, OutPixelTypeArray, useBSQForOutputDim);
                    }
                  } else {
                    Lerc2Helpers.readTiles(input, data, OutPixelTypeArray, useBSQForOutputDim);
                  }
                }
              }
            }
            data.eofOffset = data.ptr;
            var diff;
            if (options.inputOffset) {
              diff = data.headerInfo.blobSize + options.inputOffset - data.ptr;
              if (Math.abs(diff) >= 1) {
                data.eofOffset = options.inputOffset + data.headerInfo.blobSize;
              }
            } else {
              diff = data.headerInfo.blobSize - data.ptr;
              if (Math.abs(diff) >= 1) {
                data.eofOffset = data.headerInfo.blobSize;
              }
            }
            var result = {
              width: headerInfo.width,
              height: headerInfo.height,
              pixelData: data.pixels.resultPixels,
              minValue: headerInfo.zMin,
              maxValue: headerInfo.zMax,
              validPixelCount: headerInfo.numValidPixel,
              dimCount: headerInfo.numDims,
              dimStats: {
                minValues: headerInfo.minValues,
                maxValues: headerInfo.maxValues
              },
              maskData: data.pixels.resultMask
              //noDataValue: noDataValue
            };
            if (data.pixels.resultMask && Lerc2Helpers.isValidPixelValue(headerInfo.imageType, noDataValue)) {
              var mask = data.pixels.resultMask;
              for (i = 0; i < numPixels; i++) {
                if (!mask[i]) {
                  result.pixelData[i] = noDataValue;
                }
              }
              result.noDataValue = noDataValue;
            }
            data.noDataValue = noDataValue;
            if (options.returnFileInfo) {
              result.fileInfo = Lerc2Helpers.formatFileInfo(data);
            }
            return result;
          },
          getBandCount: function(input) {
            var count = 0;
            var i = 0;
            var temp = {};
            temp.ptr = 0;
            temp.pixels = {};
            while (i < input.byteLength - 58) {
              Lerc2Helpers.readHeaderInfo(input, temp);
              i += temp.headerInfo.blobSize;
              count++;
              temp.ptr = i;
            }
            return count;
          }
        };
        return Lerc2Decode2;
      })();
      var isPlatformLittleEndian = (function() {
        var a = new ArrayBuffer(4);
        var b = new Uint8Array(a);
        var c = new Uint32Array(a);
        c[0] = 1;
        return b[0] === 1;
      })();
      var Lerc2 = {
        /************wrapper**********************************************/
        /**
         * A wrapper for decoding both LERC1 and LERC2 byte streams capable of handling multiband pixel blocks for various pixel types.
         *
         * @alias module:Lerc
         * @param {ArrayBuffer} input The LERC input byte stream
         * @param {object} [options] The decoding options below are optional.
         * @param {number} [options.inputOffset] The number of bytes to skip in the input byte stream. A valid Lerc file is expected at that position.
         * @param {string} [options.pixelType] (LERC1 only) Default value is F32. Valid pixel types for input are U8/S8/S16/U16/S32/U32/F32.
         * @param {number} [options.noDataValue] (LERC1 only). It is recommended to use the returned mask instead of setting this value.
         * @param {boolean} [options.returnPixelInterleavedDims] (nDim LERC2 only) If true, returned dimensions are pixel-interleaved, a.k.a [p1_dim0, p1_dim1, p1_dimn, p2_dim0...], default is [p1_dim0, p2_dim0, ..., p1_dim1, p2_dim1...]
         * @returns {{width, height, pixels, pixelType, mask, statistics}}
           * @property {number} width Width of decoded image.
           * @property {number} height Height of decoded image.
           * @property {array} pixels [band1, band2, …] Each band is a typed array of width*height.
           * @property {string} pixelType The type of pixels represented in the output.
           * @property {mask} mask Typed array with a size of width*height, or null if all pixels are valid.
           * @property {array} statistics [statistics_band1, statistics_band2, …] Each element is a statistics object representing min and max values
        **/
        decode: function(encodedData, options) {
          if (!isPlatformLittleEndian) {
            throw "Big endian system is not supported.";
          }
          options = options || {};
          var inputOffset = options.inputOffset || 0;
          var fileIdView = new Uint8Array(encodedData, inputOffset, 10);
          var fileIdentifierString = String.fromCharCode.apply(null, fileIdView);
          var lerc, majorVersion;
          if (fileIdentifierString.trim() === "CntZImage") {
            lerc = LercDecode;
            majorVersion = 1;
          } else if (fileIdentifierString.substring(0, 5) === "Lerc2") {
            lerc = Lerc2Decode;
            majorVersion = 2;
          } else {
            throw "Unexpected file identifier string: " + fileIdentifierString;
          }
          var iPlane = 0, eof = encodedData.byteLength - 10, encodedMaskData, bandMasks = [], bandMask, maskData;
          var decodedPixelBlock = {
            width: 0,
            height: 0,
            pixels: [],
            pixelType: options.pixelType,
            mask: null,
            statistics: []
          };
          var uniqueBandMaskCount = 0;
          while (inputOffset < eof) {
            var result = lerc.decode(encodedData, {
              inputOffset,
              //for both lerc1 and lerc2
              encodedMaskData,
              //lerc1 only
              maskData,
              //lerc2 only
              returnMask: iPlane === 0 ? true : false,
              //lerc1 only
              returnEncodedMask: iPlane === 0 ? true : false,
              //lerc1 only
              returnFileInfo: true,
              //for both lerc1 and lerc2
              returnPixelInterleavedDims: options.returnPixelInterleavedDims,
              //for ndim lerc2 only
              pixelType: options.pixelType || null,
              //lerc1 only
              noDataValue: options.noDataValue || null
              //lerc1 only
            });
            inputOffset = result.fileInfo.eofOffset;
            maskData = result.maskData;
            if (iPlane === 0) {
              encodedMaskData = result.encodedMaskData;
              decodedPixelBlock.width = result.width;
              decodedPixelBlock.height = result.height;
              decodedPixelBlock.dimCount = result.dimCount || 1;
              decodedPixelBlock.pixelType = result.pixelType || result.fileInfo.pixelType;
              decodedPixelBlock.mask = maskData;
            }
            if (majorVersion > 1) {
              if (maskData) {
                bandMasks.push(maskData);
              }
              if (result.fileInfo.mask && result.fileInfo.mask.numBytes > 0) {
                uniqueBandMaskCount++;
              }
            }
            iPlane++;
            decodedPixelBlock.pixels.push(result.pixelData);
            decodedPixelBlock.statistics.push({
              minValue: result.minValue,
              maxValue: result.maxValue,
              noDataValue: result.noDataValue,
              dimStats: result.dimStats
            });
          }
          var i, j, numPixels;
          if (majorVersion > 1 && uniqueBandMaskCount > 1) {
            numPixels = decodedPixelBlock.width * decodedPixelBlock.height;
            decodedPixelBlock.bandMasks = bandMasks;
            maskData = new Uint8Array(numPixels);
            maskData.set(bandMasks[0]);
            for (i = 1; i < bandMasks.length; i++) {
              bandMask = bandMasks[i];
              for (j = 0; j < numPixels; j++) {
                maskData[j] = maskData[j] & bandMask[j];
              }
            }
            decodedPixelBlock.maskData = maskData;
          }
          return decodedPixelBlock;
        }
      };
      if (typeof define === "function" && define.amd) {
        define([], function() {
          return Lerc2;
        });
      } else if (typeof module2 !== "undefined" && module2.exports) {
        module2.exports = Lerc2;
      } else {
        this.Lerc = Lerc2;
      }
    })();
  }
});

// node_modules/zstddec/dist/zstddec.modern.js
var init, instance, heap, IMPORT_OBJECT, ZSTDDecoder, wasm;
var init_zstddec_modern = __esm({
  "node_modules/zstddec/dist/zstddec.modern.js"() {
    IMPORT_OBJECT = {
      env: {
        emscripten_notify_memory_growth: function(index) {
          heap = new Uint8Array(instance.exports.memory.buffer);
        }
      }
    };
    ZSTDDecoder = class {
      init() {
        if (init) return init;
        if (typeof fetch !== "undefined") {
          init = fetch("data:application/wasm;base64," + wasm).then((response) => response.arrayBuffer()).then((arrayBuffer) => WebAssembly.instantiate(arrayBuffer, IMPORT_OBJECT)).then(this._init);
        } else {
          init = WebAssembly.instantiate(Buffer.from(wasm, "base64"), IMPORT_OBJECT).then(this._init);
        }
        return init;
      }
      _init(result) {
        instance = result.instance;
        IMPORT_OBJECT.env.emscripten_notify_memory_growth(0);
      }
      decode(array, uncompressedSize = 0) {
        if (!instance) throw new Error(`ZSTDDecoder: Await .init() before decoding.`);
        const compressedSize = array.byteLength;
        const compressedPtr = instance.exports.malloc(compressedSize);
        heap.set(array, compressedPtr);
        uncompressedSize = uncompressedSize || Number(instance.exports.ZSTD_findDecompressedSize(compressedPtr, compressedSize));
        const uncompressedPtr = instance.exports.malloc(uncompressedSize);
        const actualSize = instance.exports.ZSTD_decompress(uncompressedPtr, uncompressedSize, compressedPtr, compressedSize);
        const dec = heap.slice(uncompressedPtr, uncompressedPtr + actualSize);
        instance.exports.free(compressedPtr);
        instance.exports.free(uncompressedPtr);
        return dec;
      }
    };
    wasm = "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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEEdCAAbiECCyAAQQh2IgEgAkEYbCIAQYwIaigCAGwgAEGICGooAgBqIgJBA3YgAmogAEGACGooAgAgAEGECGooAgAgAWxqSQs3ACAAIAMgBCAFQYAQEDMiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQMgVBuH8LC78DAQN/IwBBIGsiBSQAIAVBCGogAiADEAYiAhADRQRAIAAgAWoiB0F9aiEGIAUgBBAOIARBBGohAiAFLQACIQMDQEEAIAAgBkkgBUEIahAEGwRAIAAgAiAFQQhqIAMQAkECdGoiBC8BADsAACAFQQhqIAQtAAIQASAAIAQtAANqIgQgAiAFQQhqIAMQAkECdGoiAC8BADsAACAFQQhqIAAtAAIQASAEIAAtAANqIQAMAQUgB0F+aiEEA0AgBUEIahAEIAAgBEtyRQRAIAAgAiAFQQhqIAMQAkECdGoiBi8BADsAACAFQQhqIAYtAAIQASAAIAYtAANqIQAMAQsLA0AgACAES0UEQCAAIAIgBUEIaiADEAJBAnRqIgYvAQA7AAAgBUEIaiAGLQACEAEgACAGLQADaiEADAELCwJAIAAgB08NACAAIAIgBUEIaiADEAIiA0ECdGoiAC0AADoAACAALQADQQFGBEAgBUEIaiAALQACEAEMAQsgBSgCDEEfSw0AIAVBCGogAiADQQJ0ai0AAhABIAUoAgxBIUkNACAFQSA2AgwLIAFBbCAFQQhqEAobIQILCwsgBUEgaiQAIAILkgIBBH8jAEFAaiIJJAAgCSADQTQQCyEDAkAgBEECSA0AIAMgBEECdGooAgAhCSADQTxqIAgQIyADQQE6AD8gAyACOgA+QQAhBCADKAI8IQoDQCAEIAlGDQEgACAEQQJ0aiAKNgEAIARBAWohBAwAAAsAC0EAIQkDQCAGIAlGRQRAIAMgBSAJQQF0aiIKLQABIgtBAnRqIgwoAgAhBCADQTxqIAotAABBCHQgCGpB//8DcRAjIANBAjoAPyADIAcgC2siCiACajoAPiAEQQEgASAKa3RqIQogAygCPCELA0AgACAEQQJ0aiALNgEAIARBAWoiBCAKSQ0ACyAMIAo2AgAgCUEBaiEJDAELCyADQUBrJAALowIBCX8jAEHQAGsiCSQAIAlBEGogBUE0EAsaIAcgBmshDyAHIAFrIRADQAJAIAMgCkcEQEEBIAEgByACIApBAXRqIgYtAAEiDGsiCGsiC3QhDSAGLQAAIQ4gCUEQaiAMQQJ0aiIMKAIAIQYgCyAPTwRAIAAgBkECdGogCyAIIAUgCEE0bGogCCAQaiIIQQEgCEEBShsiCCACIAQgCEECdGooAgAiCEEBdGogAyAIayAHIA4QYyAGIA1qIQgMAgsgCUEMaiAOECMgCUEBOgAPIAkgCDoADiAGIA1qIQggCSgCDCELA0AgBiAITw0CIAAgBkECdGogCzYBACAGQQFqIQYMAAALAAsgCUHQAGokAA8LIAwgCDYCACAKQQFqIQoMAAALAAs0ACAAIAMgBCAFEDYiBRADBEAgBQ8LIAUgBEkEfyABIAIgAyAFaiAEIAVrIAAQNAVBuH8LCyMAIAA/AEEQdGtB//8DakEQdkAAQX9GBEBBAA8LQQAQAEEBCzsBAX8gAgRAA0AgACABIAJBgCAgAkGAIEkbIgMQCyEAIAFBgCBqIQEgAEGAIGohACACIANrIgINAAsLCwYAIAAQAwsLqBUJAEGICAsNAQAAAAEAAAACAAAAAgBBoAgLswYBAAAAAQAAAAIAAAACAAAAJgAAAIIAAAAhBQAASgAAAGcIAAAmAAAAwAEAAIAAAABJBQAASgAAAL4IAAApAAAALAIAAIAAAABJBQAASgAAAL4IAAAvAAAAygIAAIAAAACKBQAASgAAAIQJAAA1AAAAcwMAAIAAAACdBQAASgAAAKAJAAA9AAAAgQMAAIAAAADrBQAASwAAAD4KAABEAAAAngMAAIAAAABNBgAASwAAAKoKAABLAAAAswMAAIAAAADBBgAATQAAAB8NAABNAAAAUwQAAIAAAAAjCAAAUQAAAKYPAABUAAAAmQQAAIAAAABLCQAAVwAAALESAABYAAAA2gQAAIAAAABvCQAAXQAAACMUAABUAAAARQUAAIAAAABUCgAAagAAAIwUAABqAAAArwUAAIAAAAB2CQAAfAAAAE4QAAB8AAAA0gIAAIAAAABjBwAAkQAAAJAHAACSAAAAAAAAAAEAAAABAAAABQAAAA0AAAAdAAAAPQAAAH0AAAD9AAAA/QEAAP0DAAD9BwAA/Q8AAP0fAAD9PwAA/X8AAP3/AAD9/wEA/f8DAP3/BwD9/w8A/f8fAP3/PwD9/38A/f//AP3//wH9//8D/f//B/3//w/9//8f/f//P/3//38AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAABoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACUAAAAnAAAAKQAAACsAAAAvAAAAMwAAADsAAABDAAAAUwAAAGMAAACDAAAAAwEAAAMCAAADBAAAAwgAAAMQAAADIAAAA0AAAAOAAAADAAEAQeAPC1EBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAcAAAAIAAAACQAAAAoAAAALAAAADAAAAA0AAAAOAAAADwAAABAAQcQQC4sBAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABIAAAAUAAAAFgAAABgAAAAcAAAAIAAAACgAAAAwAAAAQAAAAIAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAgAAAAQAAAAIAAAAAAAQBBkBIL5gQBAAAAAQAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAAAEAAAAEAAAACAAAAAAAAAABAAEBBgAAAAAAAAQAAAAAEAAABAAAAAAgAAAFAQAAAAAAAAUDAAAAAAAABQQAAAAAAAAFBgAAAAAAAAUHAAAAAAAABQkAAAAAAAAFCgAAAAAAAAUMAAAAAAAABg4AAAAAAAEFEAAAAAAAAQUUAAAAAAABBRYAAAAAAAIFHAAAAAAAAwUgAAAAAAAEBTAAAAAgAAYFQAAAAAAABwWAAAAAAAAIBgABAAAAAAoGAAQAAAAADAYAEAAAIAAABAAAAAAAAAAEAQAAAAAAAAUCAAAAIAAABQQAAAAAAAAFBQAAACAAAAUHAAAAAAAABQgAAAAgAAAFCgAAAAAAAAULAAAAAAAABg0AAAAgAAEFEAAAAAAAAQUSAAAAIAABBRYAAAAAAAIFGAAAACAAAwUgAAAAAAADBSgAAAAAAAYEQAAAABAABgRAAAAAIAAHBYAAAAAAAAkGAAIAAAAACwYACAAAMAAABAAAAAAQAAAEAQAAACAAAAUCAAAAIAAABQMAAAAgAAAFBQAAACAAAAUGAAAAIAAABQgAAAAgAAAFCQAAACAAAAULAAAAIAAABQwAAAAAAAAGDwAAACAAAQUSAAAAIAABBRQAAAAgAAIFGAAAACAAAgUcAAAAIAADBSgAAAAgAAQFMAAAAAAAEAYAAAEAAAAPBgCAAAAAAA4GAEAAAAAADQYAIABBgBcLhwIBAAEBBQAAAAAAAAUAAAAAAAAGBD0AAAAAAAkF/QEAAAAADwX9fwAAAAAVBf3/HwAAAAMFBQAAAAAABwR9AAAAAAAMBf0PAAAAABIF/f8DAAAAFwX9/38AAAAFBR0AAAAAAAgE/QAAAAAADgX9PwAAAAAUBf3/DwAAAAIFAQAAABAABwR9AAAAAAALBf0HAAAAABEF/f8BAAAAFgX9/z8AAAAEBQ0AAAAQAAgE/QAAAAAADQX9HwAAAAATBf3/BwAAAAEFAQAAABAABgQ9AAAAAAAKBf0DAAAAABAF/f8AAAAAHAX9//8PAAAbBf3//wcAABoF/f//AwAAGQX9//8BAAAYBf3//wBBkBkLhgQBAAEBBgAAAAAAAAYDAAAAAAAABAQAAAAgAAAFBQAAAAAAAAUGAAAAAAAABQgAAAAAAAAFCQAAAAAAAAULAAAAAAAABg0AAAAAAAAGEAAAAAAAAAYTAAAAAAAABhYAAAAAAAAGGQAAAAAAAAYcAAAAAAAABh8AAAAAAAAGIgAAAAAAAQYlAAAAAAABBikAAAAAAAIGLwAAAAAAAwY7AAAAAAAEBlMAAAAAAAcGgwAAAAAACQYDAgAAEAAABAQAAAAAAAAEBQAAACAAAAUGAAAAAAAABQcAAAAgAAAFCQAAAAAAAAUKAAAAAAAABgwAAAAAAAAGDwAAAAAAAAYSAAAAAAAABhUAAAAAAAAGGAAAAAAAAAYbAAAAAAAABh4AAAAAAAAGIQAAAAAAAQYjAAAAAAABBicAAAAAAAIGKwAAAAAAAwYzAAAAAAAEBkMAAAAAAAUGYwAAAAAACAYDAQAAIAAABAQAAAAwAAAEBAAAABAAAAQFAAAAIAAABQcAAAAgAAAFCAAAACAAAAUKAAAAIAAABQsAAAAAAAAGDgAAAAAAAAYRAAAAAAAABhQAAAAAAAAGFwAAAAAAAAYaAAAAAAAABh0AAAAAAAAGIAAAAAAAEAYDAAEAAAAPBgOAAAAAAA4GA0AAAAAADQYDIAAAAAAMBgMQAAAAAAsGAwgAAAAACgYDBABBpB0L2QEBAAAAAwAAAAcAAAAPAAAAHwAAAD8AAAB/AAAA/wAAAP8BAAD/AwAA/wcAAP8PAAD/HwAA/z8AAP9/AAD//wAA//8BAP//AwD//wcA//8PAP//HwD//z8A//9/AP///wD///8B////A////wf///8P////H////z////9/AAAAAAEAAAACAAAABAAAAAAAAAACAAAABAAAAAgAAAAAAAAAAQAAAAIAAAABAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAcAAAAIAAAACQAAAAoAAAALAEGgIAsDwBBQ";
  }
});

// node_modules/geotiff/dist-module/compression/lerc.js
var lerc_exports = {};
__export(lerc_exports, {
  default: () => LercDecoder,
  zstd: () => zstd
});
var import_lerc, zstd, LercDecoder;
var init_lerc = __esm({
  "node_modules/geotiff/dist-module/compression/lerc.js"() {
    init_pako_esm();
    import_lerc = __toESM(require_LercDecode(), 1);
    init_zstddec_modern();
    init_basedecoder();
    init_globals();
    zstd = new ZSTDDecoder();
    LercDecoder = class extends BaseDecoder {
      constructor(fileDirectory) {
        super();
        this.planarConfiguration = typeof fileDirectory.PlanarConfiguration !== "undefined" ? fileDirectory.PlanarConfiguration : 1;
        this.samplesPerPixel = typeof fileDirectory.SamplesPerPixel !== "undefined" ? fileDirectory.SamplesPerPixel : 1;
        this.addCompression = fileDirectory.LercParameters[LercParameters.AddCompression];
      }
      decodeBlock(buffer2) {
        switch (this.addCompression) {
          case LercAddCompression.None:
            break;
          case LercAddCompression.Deflate:
            buffer2 = inflate_1(new Uint8Array(buffer2)).buffer;
            break;
          case LercAddCompression.Zstandard:
            buffer2 = zstd.decode(new Uint8Array(buffer2)).buffer;
            break;
          default:
            throw new Error(`Unsupported LERC additional compression method identifier: ${this.addCompression}`);
        }
        const lercResult = import_lerc.default.decode(buffer2, { returnPixelInterleavedDims: this.planarConfiguration === 1 });
        const lercData = lercResult.pixels[0];
        return lercData.buffer;
      }
    };
  }
});

// node_modules/geotiff/dist-module/compression/webimage.js
var webimage_exports = {};
__export(webimage_exports, {
  default: () => WebImageDecoder
});
var WebImageDecoder;
var init_webimage = __esm({
  "node_modules/geotiff/dist-module/compression/webimage.js"() {
    init_basedecoder();
    WebImageDecoder = class extends BaseDecoder {
      constructor() {
        super();
        if (typeof createImageBitmap === "undefined") {
          throw new Error("Cannot decode WebImage as `createImageBitmap` is not available");
        } else if (typeof document === "undefined" && typeof OffscreenCanvas === "undefined") {
          throw new Error("Cannot decode WebImage as neither `document` nor `OffscreenCanvas` is not available");
        }
      }
      async decode(fileDirectory, buffer2) {
        const blob = new Blob([buffer2]);
        const imageBitmap = await createImageBitmap(blob);
        let canvas;
        if (typeof document !== "undefined") {
          canvas = document.createElement("canvas");
          canvas.width = imageBitmap.width;
          canvas.height = imageBitmap.height;
        } else {
          canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
        }
        const ctx = canvas.getContext("2d");
        ctx.drawImage(imageBitmap, 0, 0);
        return ctx.getImageData(0, 0, imageBitmap.width, imageBitmap.height).data.buffer;
      }
    };
  }
});

// node_modules/pngjs/lib/chunkstream.js
var require_chunkstream = __commonJS({
  "node_modules/pngjs/lib/chunkstream.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var ChunkStream = module2.exports = function() {
      Stream.call(this);
      this._buffers = [];
      this._buffered = 0;
      this._reads = [];
      this._paused = false;
      this._encoding = "utf8";
      this.writable = true;
    };
    util.inherits(ChunkStream, Stream);
    ChunkStream.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
      process.nextTick(
        function() {
          this._process();
          if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
          }
        }.bind(this)
      );
    };
    ChunkStream.prototype.write = function(data, encoding) {
      if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
      }
      let dataBuffer;
      if (Buffer.isBuffer(data)) {
        dataBuffer = data;
      } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
      }
      this._buffers.push(dataBuffer);
      this._buffered += dataBuffer.length;
      this._process();
      if (this._reads && this._reads.length === 0) {
        this._paused = true;
      }
      return this.writable && !this._paused;
    };
    ChunkStream.prototype.end = function(data, encoding) {
      if (data) {
        this.write(data, encoding);
      }
      this.writable = false;
      if (!this._buffers) {
        return;
      }
      if (this._buffers.length === 0) {
        this._end();
      } else {
        this._buffers.push(null);
        this._process();
      }
    };
    ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
    ChunkStream.prototype._end = function() {
      if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
      }
      this.destroy();
    };
    ChunkStream.prototype.destroy = function() {
      if (!this._buffers) {
        return;
      }
      this.writable = false;
      this._reads = null;
      this._buffers = null;
      this.emit("close");
    };
    ChunkStream.prototype._processReadAllowingLess = function(read) {
      this._reads.shift();
      let smallerBuf = this._buffers[0];
      if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
      } else {
        this._buffered -= smallerBuf.length;
        this._buffers.shift();
        read.func.call(this, smallerBuf);
      }
    };
    ChunkStream.prototype._processRead = function(read) {
      this._reads.shift();
      let pos = 0;
      let count = 0;
      let data = Buffer.alloc(read.length);
      while (pos < read.length) {
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        if (len !== buf.length) {
          this._buffers[--count] = buf.slice(len);
        }
      }
      if (count > 0) {
        this._buffers.splice(0, count);
      }
      this._buffered -= read.length;
      read.func.call(this, data);
    };
    ChunkStream.prototype._process = function() {
      try {
        while (this._buffered > 0 && this._reads && this._reads.length > 0) {
          let read = this._reads[0];
          if (read.allowLess) {
            this._processReadAllowingLess(read);
          } else if (this._buffered >= read.length) {
            this._processRead(read);
          } else {
            break;
          }
        }
        if (this._buffers && !this.writable) {
          this._end();
        }
      } catch (ex) {
        this.emit("error", ex);
      }
    };
  }
});

// node_modules/pngjs/lib/interlace.js
var require_interlace = __commonJS({
  "node_modules/pngjs/lib/interlace.js"(exports2) {
    "use strict";
    var imagePasses = [
      {
        // pass 1 - 1px
        x: [0],
        y: [0]
      },
      {
        // pass 2 - 1px
        x: [4],
        y: [0]
      },
      {
        // pass 3 - 2px
        x: [0, 4],
        y: [4]
      },
      {
        // pass 4 - 4px
        x: [2, 6],
        y: [0, 4]
      },
      {
        // pass 5 - 8px
        x: [0, 2, 4, 6],
        y: [2, 6]
      },
      {
        // pass 6 - 16px
        x: [1, 3, 5, 7],
        y: [0, 2, 4, 6]
      },
      {
        // pass 7 - 32px
        x: [0, 1, 2, 3, 4, 5, 6, 7],
        y: [1, 3, 5, 7]
      }
    ];
    exports2.getImagePasses = function(width, height) {
      let images = [];
      let xLeftOver = width % 8;
      let yLeftOver = height % 8;
      let xRepeats = (width - xLeftOver) / 8;
      let yRepeats = (height - yLeftOver) / 8;
      for (let i = 0; i < imagePasses.length; i++) {
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for (let j = 0; j < pass.x.length; j++) {
          if (pass.x[j] < xLeftOver) {
            passWidth++;
          } else {
            break;
          }
        }
        for (let j = 0; j < pass.y.length; j++) {
          if (pass.y[j] < yLeftOver) {
            passHeight++;
          } else {
            break;
          }
        }
        if (passWidth > 0 && passHeight > 0) {
          images.push({ width: passWidth, height: passHeight, index: i });
        }
      }
      return images;
    };
    exports2.getInterlaceIterator = function(width) {
      return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
      };
    };
  }
});

// node_modules/pngjs/lib/paeth-predictor.js
var require_paeth_predictor = __commonJS({
  "node_modules/pngjs/lib/paeth-predictor.js"(exports2, module2) {
    "use strict";
    module2.exports = function paethPredictor(left, above, upLeft) {
      let paeth = left + above - upLeft;
      let pLeft = Math.abs(paeth - left);
      let pAbove = Math.abs(paeth - above);
      let pUpLeft = Math.abs(paeth - upLeft);
      if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
      }
      if (pAbove <= pUpLeft) {
        return above;
      }
      return upLeft;
    };
  }
});

// node_modules/pngjs/lib/filter-parse.js
var require_filter_parse = __commonJS({
  "node_modules/pngjs/lib/filter-parse.js"(exports2, module2) {
    "use strict";
    var interlaceUtils = require_interlace();
    var paethPredictor = require_paeth_predictor();
    function getByteWidth(width, bpp, depth) {
      let byteWidth = width * bpp;
      if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
      }
      return byteWidth;
    }
    var Filter = module2.exports = function(bitmapInfo, dependencies) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let interlace = bitmapInfo.interlace;
      let bpp = bitmapInfo.bpp;
      let depth = bitmapInfo.depth;
      this.read = dependencies.read;
      this.write = dependencies.write;
      this.complete = dependencies.complete;
      this._imageIndex = 0;
      this._images = [];
      if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for (let i = 0; i < passes.length; i++) {
          this._images.push({
            byteWidth: getByteWidth(passes[i].width, bpp, depth),
            height: passes[i].height,
            lineIndex: 0
          });
        }
      } else {
        this._images.push({
          byteWidth: getByteWidth(width, bpp, depth),
          height,
          lineIndex: 0
        });
      }
      if (depth === 8) {
        this._xComparison = bpp;
      } else if (depth === 16) {
        this._xComparison = bpp * 2;
      } else {
        this._xComparison = 1;
      }
    };
    Filter.prototype.start = function() {
      this.read(
        this._images[this._imageIndex].byteWidth + 1,
        this._reverseFilterLine.bind(this)
      );
    };
    Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
      }
    };
    Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
      }
    };
    Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
      }
    };
    Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
      }
    };
    Filter.prototype._reverseFilterLine = function(rawData) {
      let filter = rawData[0];
      let unfilteredLine;
      let currentImage = this._images[this._imageIndex];
      let byteWidth = currentImage.byteWidth;
      if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
      } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch (filter) {
          case 1:
            this._unFilterType1(rawData, unfilteredLine, byteWidth);
            break;
          case 2:
            this._unFilterType2(rawData, unfilteredLine, byteWidth);
            break;
          case 3:
            this._unFilterType3(rawData, unfilteredLine, byteWidth);
            break;
          case 4:
            this._unFilterType4(rawData, unfilteredLine, byteWidth);
            break;
          default:
            throw new Error("Unrecognised filter type - " + filter);
        }
      }
      this.write(unfilteredLine);
      currentImage.lineIndex++;
      if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
      } else {
        this._lastLine = unfilteredLine;
      }
      if (currentImage) {
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
      } else {
        this._lastLine = null;
        this.complete();
      }
    };
  }
});

// node_modules/pngjs/lib/filter-parse-async.js
var require_filter_parse_async = __commonJS({
  "node_modules/pngjs/lib/filter-parse-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var ChunkStream = require_chunkstream();
    var Filter = require_filter_parse();
    var FilterAsync = module2.exports = function(bitmapInfo) {
      ChunkStream.call(this);
      let buffers = [];
      let that = this;
      this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer2) {
          buffers.push(buffer2);
        },
        complete: function() {
          that.emit("complete", Buffer.concat(buffers));
        }
      });
      this._filter.start();
    };
    util.inherits(FilterAsync, ChunkStream);
  }
});

// node_modules/pngjs/lib/constants.js
var require_constants = __commonJS({
  "node_modules/pngjs/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
      TYPE_IHDR: 1229472850,
      TYPE_IEND: 1229278788,
      TYPE_IDAT: 1229209940,
      TYPE_PLTE: 1347179589,
      TYPE_tRNS: 1951551059,
      // eslint-disable-line camelcase
      TYPE_gAMA: 1732332865,
      // eslint-disable-line camelcase
      // color-type bits
      COLORTYPE_GRAYSCALE: 0,
      COLORTYPE_PALETTE: 1,
      COLORTYPE_COLOR: 2,
      COLORTYPE_ALPHA: 4,
      // e.g. grayscale and alpha
      // color-type combinations
      COLORTYPE_PALETTE_COLOR: 3,
      COLORTYPE_COLOR_ALPHA: 6,
      COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
      },
      GAMMA_DIVISION: 1e5
    };
  }
});

// node_modules/pngjs/lib/crc.js
var require_crc = __commonJS({
  "node_modules/pngjs/lib/crc.js"(exports2, module2) {
    "use strict";
    var crcTable2 = [];
    (function() {
      for (let i = 0; i < 256; i++) {
        let currentCrc = i;
        for (let j = 0; j < 8; j++) {
          if (currentCrc & 1) {
            currentCrc = 3988292384 ^ currentCrc >>> 1;
          } else {
            currentCrc = currentCrc >>> 1;
          }
        }
        crcTable2[i] = currentCrc;
      }
    })();
    var CrcCalculator = module2.exports = function() {
      this._crc = -1;
    };
    CrcCalculator.prototype.write = function(data) {
      for (let i = 0; i < data.length; i++) {
        this._crc = crcTable2[(this._crc ^ data[i]) & 255] ^ this._crc >>> 8;
      }
      return true;
    };
    CrcCalculator.prototype.crc32 = function() {
      return this._crc ^ -1;
    };
    CrcCalculator.crc32 = function(buf) {
      let crc = -1;
      for (let i = 0; i < buf.length; i++) {
        crc = crcTable2[(crc ^ buf[i]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    };
  }
});

// node_modules/pngjs/lib/parser.js
var require_parser = __commonJS({
  "node_modules/pngjs/lib/parser.js"(exports2, module2) {
    "use strict";
    var constants2 = require_constants();
    var CrcCalculator = require_crc();
    var Parser = module2.exports = function(options, dependencies) {
      this._options = options;
      options.checkCRC = options.checkCRC !== false;
      this._hasIHDR = false;
      this._hasIEND = false;
      this._emittedHeadersFinished = false;
      this._palette = [];
      this._colorType = 0;
      this._chunks = {};
      this._chunks[constants2.TYPE_IHDR] = this._handleIHDR.bind(this);
      this._chunks[constants2.TYPE_IEND] = this._handleIEND.bind(this);
      this._chunks[constants2.TYPE_IDAT] = this._handleIDAT.bind(this);
      this._chunks[constants2.TYPE_PLTE] = this._handlePLTE.bind(this);
      this._chunks[constants2.TYPE_tRNS] = this._handleTRNS.bind(this);
      this._chunks[constants2.TYPE_gAMA] = this._handleGAMA.bind(this);
      this.read = dependencies.read;
      this.error = dependencies.error;
      this.metadata = dependencies.metadata;
      this.gamma = dependencies.gamma;
      this.transColor = dependencies.transColor;
      this.palette = dependencies.palette;
      this.parsed = dependencies.parsed;
      this.inflateData = dependencies.inflateData;
      this.finished = dependencies.finished;
      this.simpleTransparency = dependencies.simpleTransparency;
      this.headersFinished = dependencies.headersFinished || function() {
      };
    };
    Parser.prototype.start = function() {
      this.read(constants2.PNG_SIGNATURE.length, this._parseSignature.bind(this));
    };
    Parser.prototype._parseSignature = function(data) {
      let signature = constants2.PNG_SIGNATURE;
      for (let i = 0; i < signature.length; i++) {
        if (data[i] !== signature[i]) {
          this.error(new Error("Invalid file signature"));
          return;
        }
      }
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._parseChunkBegin = function(data) {
      let length = data.readUInt32BE(0);
      let type = data.readUInt32BE(4);
      let name = "";
      for (let i = 4; i < 8; i++) {
        name += String.fromCharCode(data[i]);
      }
      let ancillary = Boolean(data[4] & 32);
      if (!this._hasIHDR && type !== constants2.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
      }
      this._crc = new CrcCalculator();
      this._crc.write(Buffer.from(name));
      if (this._chunks[type]) {
        return this._chunks[type](length);
      }
      if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
      }
      this.read(length + 4, this._skipChunk.bind(this));
    };
    Parser.prototype._skipChunk = function() {
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._handleChunkEnd = function() {
      this.read(4, this._parseChunkEnd.bind(this));
    };
    Parser.prototype._parseChunkEnd = function(data) {
      let fileCrc = data.readInt32BE(0);
      let calcCrc = this._crc.crc32();
      if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
      }
      if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
      }
    };
    Parser.prototype._handleIHDR = function(length) {
      this.read(length, this._parseIHDR.bind(this));
    };
    Parser.prototype._parseIHDR = function(data) {
      this._crc.write(data);
      let width = data.readUInt32BE(0);
      let height = data.readUInt32BE(4);
      let depth = data[8];
      let colorType = data[9];
      let compr = data[10];
      let filter = data[11];
      let interlace = data[12];
      if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
      }
      if (!(colorType in constants2.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
      }
      if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
      }
      if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
      }
      if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
      }
      this._colorType = colorType;
      let bpp = constants2.COLORTYPE_TO_BPP_MAP[this._colorType];
      this._hasIHDR = true;
      this.metadata({
        width,
        height,
        depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants2.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants2.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants2.COLORTYPE_ALPHA),
        bpp,
        colorType
      });
      this._handleChunkEnd();
    };
    Parser.prototype._handlePLTE = function(length) {
      this.read(length, this._parsePLTE.bind(this));
    };
    Parser.prototype._parsePLTE = function(data) {
      this._crc.write(data);
      let entries = Math.floor(data.length / 3);
      for (let i = 0; i < entries; i++) {
        this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 255]);
      }
      this.palette(this._palette);
      this._handleChunkEnd();
    };
    Parser.prototype._handleTRNS = function(length) {
      this.simpleTransparency();
      this.read(length, this._parseTRNS.bind(this));
    };
    Parser.prototype._parseTRNS = function(data) {
      this._crc.write(data);
      if (this._colorType === constants2.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
          this.error(new Error("Transparency chunk must be after palette"));
          return;
        }
        if (data.length > this._palette.length) {
          this.error(new Error("More transparent colors than palette size"));
          return;
        }
        for (let i = 0; i < data.length; i++) {
          this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
      }
      if (this._colorType === constants2.COLORTYPE_GRAYSCALE) {
        this.transColor([data.readUInt16BE(0)]);
      }
      if (this._colorType === constants2.COLORTYPE_COLOR) {
        this.transColor([
          data.readUInt16BE(0),
          data.readUInt16BE(2),
          data.readUInt16BE(4)
        ]);
      }
      this._handleChunkEnd();
    };
    Parser.prototype._handleGAMA = function(length) {
      this.read(length, this._parseGAMA.bind(this));
    };
    Parser.prototype._parseGAMA = function(data) {
      this._crc.write(data);
      this.gamma(data.readUInt32BE(0) / constants2.GAMMA_DIVISION);
      this._handleChunkEnd();
    };
    Parser.prototype._handleIDAT = function(length) {
      if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
      }
      this.read(-length, this._parseIDAT.bind(this, length));
    };
    Parser.prototype._parseIDAT = function(length, data) {
      this._crc.write(data);
      if (this._colorType === constants2.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
      }
      this.inflateData(data);
      let leftOverLength = length - data.length;
      if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
      } else {
        this._handleChunkEnd();
      }
    };
    Parser.prototype._handleIEND = function(length) {
      this.read(length, this._parseIEND.bind(this));
    };
    Parser.prototype._parseIEND = function(data) {
      this._crc.write(data);
      this._hasIEND = true;
      this._handleChunkEnd();
      if (this.finished) {
        this.finished();
      }
    };
  }
});

// node_modules/pngjs/lib/bitmapper.js
var require_bitmapper = __commonJS({
  "node_modules/pngjs/lib/bitmapper.js"(exports2) {
    "use strict";
    var interlaceUtils = require_interlace();
    var pixelBppMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 255;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 255;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
      }
    ];
    var pixelBppCustomMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
      }
    ];
    function bitRetriever(data, depth) {
      let leftOver = [];
      let i = 0;
      function split() {
        if (i === data.length) {
          throw new Error("Ran out of data");
        }
        let byte2 = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte22, byte1;
        switch (depth) {
          default:
            throw new Error("unrecognised depth");
          case 16:
            byte22 = data[i];
            i++;
            leftOver.push((byte2 << 8) + byte22);
            break;
          case 4:
            byte22 = byte2 & 15;
            byte1 = byte2 >> 4;
            leftOver.push(byte1, byte22);
            break;
          case 2:
            byte4 = byte2 & 3;
            byte3 = byte2 >> 2 & 3;
            byte22 = byte2 >> 4 & 3;
            byte1 = byte2 >> 6 & 3;
            leftOver.push(byte1, byte22, byte3, byte4);
            break;
          case 1:
            byte8 = byte2 & 1;
            byte7 = byte2 >> 1 & 1;
            byte6 = byte2 >> 2 & 1;
            byte5 = byte2 >> 3 & 1;
            byte4 = byte2 >> 4 & 1;
            byte3 = byte2 >> 5 & 1;
            byte22 = byte2 >> 6 & 1;
            byte1 = byte2 >> 7 & 1;
            leftOver.push(byte1, byte22, byte3, byte4, byte5, byte6, byte7, byte8);
            break;
        }
      }
      return {
        get: function(count) {
          while (leftOver.length < count) {
            split();
          }
          let returner = leftOver.slice(0, count);
          leftOver = leftOver.slice(count);
          return returner;
        },
        resetAfterLine: function() {
          leftOver.length = 0;
        },
        end: function() {
          if (i !== data.length) {
            throw new Error("extra data found");
          }
        }
      };
    }
    function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
          rawPos += bpp;
        }
      }
      return rawPos;
    }
    function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pixelData = bits.get(bpp);
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
      }
    }
    exports2.dataToBitMap = function(data, bitmapInfo) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let depth = bitmapInfo.depth;
      let bpp = bitmapInfo.bpp;
      let interlace = bitmapInfo.interlace;
      let bits;
      if (depth !== 8) {
        bits = bitRetriever(data, depth);
      }
      let pxData;
      if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
      } else {
        pxData = new Uint16Array(width * height * 4);
      }
      let maxBit = Math.pow(2, depth) - 1;
      let rawPos = 0;
      let images;
      let getPxPos;
      if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
      } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
          let returner = nonInterlacedPxPos;
          nonInterlacedPxPos += 4;
          return returner;
        };
        images = [{ width, height }];
      }
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        if (depth === 8) {
          rawPos = mapImage8Bit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            data,
            rawPos
          );
        } else {
          mapImageCustomBit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            bits,
            maxBit
          );
        }
      }
      if (depth === 8) {
        if (rawPos !== data.length) {
          throw new Error("extra data found");
        }
      } else {
        bits.end();
      }
      return pxData;
    };
  }
});

// node_modules/pngjs/lib/format-normaliser.js
var require_format_normaliser = __commonJS({
  "node_modules/pngjs/lib/format-normaliser.js"(exports2, module2) {
    "use strict";
    function dePalette(indata, outdata, width, height, palette) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let color = palette[indata[pxPos]];
          if (!color) {
            throw new Error("index " + indata[pxPos] + " not in palette");
          }
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = color[i];
          }
          pxPos += 4;
        }
      }
    }
    function replaceTransparentColor(indata, outdata, width, height, transColor) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let makeTrans = false;
          if (transColor.length === 1) {
            if (transColor[0] === indata[pxPos]) {
              makeTrans = true;
            }
          } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
            makeTrans = true;
          }
          if (makeTrans) {
            for (let i = 0; i < 4; i++) {
              outdata[pxPos + i] = 0;
            }
          }
          pxPos += 4;
        }
      }
    }
    function scaleDepth(indata, outdata, width, height, depth) {
      let maxOutSample = 255;
      let maxInSample = Math.pow(2, depth) - 1;
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = Math.floor(
              indata[pxPos + i] * maxOutSample / maxInSample + 0.5
            );
          }
          pxPos += 4;
        }
      }
    }
    module2.exports = function(indata, imageData, skipRescale = false) {
      let depth = imageData.depth;
      let width = imageData.width;
      let height = imageData.height;
      let colorType = imageData.colorType;
      let transColor = imageData.transColor;
      let palette = imageData.palette;
      let outdata = indata;
      if (colorType === 3) {
        dePalette(indata, outdata, width, height, palette);
      } else {
        if (transColor) {
          replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        if (depth !== 8 && !skipRescale) {
          if (depth === 16) {
            outdata = Buffer.alloc(width * height * 4);
          }
          scaleDepth(indata, outdata, width, height, depth);
        }
      }
      return outdata;
    };
  }
});

// node_modules/pngjs/lib/parser-async.js
var require_parser_async = __commonJS({
  "node_modules/pngjs/lib/parser-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var zlib = require("zlib");
    var ChunkStream = require_chunkstream();
    var FilterAsync = require_filter_parse_async();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    var ParserAsync = module2.exports = function(options) {
      ChunkStream.call(this);
      this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
      });
      this._options = options;
      this.writable = true;
      this._parser.start();
    };
    util.inherits(ParserAsync, ChunkStream);
    ParserAsync.prototype._handleError = function(err2) {
      this.emit("error", err2);
      this.writable = false;
      this.destroy();
      if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
      }
      if (this._filter) {
        this._filter.destroy();
        this._filter.on("error", function() {
        });
      }
      this.errord = true;
    };
    ParserAsync.prototype._inflateData = function(data) {
      if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
          this._inflate = zlib.createInflate();
          this._inflate.on("error", this.emit.bind(this, "error"));
          this._filter.on("complete", this._complete.bind(this));
          this._inflate.pipe(this._filter);
        } else {
          let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
          let imageSize = rowSize * this._bitmapInfo.height;
          let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
          this._inflate = zlib.createInflate({ chunkSize });
          let leftToInflate = imageSize;
          let emitError = this.emit.bind(this, "error");
          this._inflate.on("error", function(err2) {
            if (!leftToInflate) {
              return;
            }
            emitError(err2);
          });
          this._filter.on("complete", this._complete.bind(this));
          let filterWrite = this._filter.write.bind(this._filter);
          this._inflate.on("data", function(chunk) {
            if (!leftToInflate) {
              return;
            }
            if (chunk.length > leftToInflate) {
              chunk = chunk.slice(0, leftToInflate);
            }
            leftToInflate -= chunk.length;
            filterWrite(chunk);
          });
          this._inflate.on("end", this._filter.end.bind(this._filter));
        }
      }
      this._inflate.write(data);
    };
    ParserAsync.prototype._handleMetaData = function(metaData) {
      this._metaData = metaData;
      this._bitmapInfo = Object.create(metaData);
      this._filter = new FilterAsync(this._bitmapInfo);
    };
    ParserAsync.prototype._handleTransColor = function(transColor) {
      this._bitmapInfo.transColor = transColor;
    };
    ParserAsync.prototype._handlePalette = function(palette) {
      this._bitmapInfo.palette = palette;
    };
    ParserAsync.prototype._simpleTransparency = function() {
      this._metaData.alpha = true;
    };
    ParserAsync.prototype._headersFinished = function() {
      this.emit("metadata", this._metaData);
    };
    ParserAsync.prototype._finished = function() {
      if (this.errord) {
        return;
      }
      if (!this._inflate) {
        this.emit("error", "No Inflate block");
      } else {
        this._inflate.end();
      }
    };
    ParserAsync.prototype._complete = function(filteredData) {
      if (this.errord) {
        return;
      }
      let normalisedBitmapData;
      try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(
          bitmapData,
          this._bitmapInfo,
          this._options.skipRescale
        );
        bitmapData = null;
      } catch (ex) {
        this._handleError(ex);
        return;
      }
      this.emit("parsed", normalisedBitmapData);
    };
  }
});

// node_modules/pngjs/lib/bitpacker.js
var require_bitpacker = __commonJS({
  "node_modules/pngjs/lib/bitpacker.js"(exports2, module2) {
    "use strict";
    var constants2 = require_constants();
    module2.exports = function(dataIn, width, height, options) {
      let outHasAlpha = [constants2.COLORTYPE_COLOR_ALPHA, constants2.COLORTYPE_ALPHA].indexOf(
        options.colorType
      ) !== -1;
      if (options.colorType === options.inputColorType) {
        let bigEndian = (function() {
          let buffer2 = new ArrayBuffer(2);
          new DataView(buffer2).setInt16(
            0,
            256,
            true
            /* littleEndian */
          );
          return new Int16Array(buffer2)[0] !== 256;
        })();
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
          return dataIn;
        }
      }
      let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
      let maxValue = 255;
      let inBpp = constants2.COLORTYPE_TO_BPP_MAP[options.inputColorType];
      if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
      }
      let outBpp = constants2.COLORTYPE_TO_BPP_MAP[options.colorType];
      if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
      }
      let outData = Buffer.alloc(width * height * outBpp);
      let inIndex = 0;
      let outIndex = 0;
      let bgColor = options.bgColor || {};
      if (bgColor.red === void 0) {
        bgColor.red = maxValue;
      }
      if (bgColor.green === void 0) {
        bgColor.green = maxValue;
      }
      if (bgColor.blue === void 0) {
        bgColor.blue = maxValue;
      }
      function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch (options.inputColorType) {
          case constants2.COLORTYPE_COLOR_ALPHA:
            alpha = data[inIndex + 3];
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants2.COLORTYPE_COLOR:
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants2.COLORTYPE_ALPHA:
            alpha = data[inIndex + 1];
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          case constants2.COLORTYPE_GRAYSCALE:
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          default:
            throw new Error(
              "input color type:" + options.inputColorType + " is not supported at present"
            );
        }
        if (options.inputHasAlpha) {
          if (!outHasAlpha) {
            alpha /= maxValue;
            red = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
              maxValue
            );
            green = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
              maxValue
            );
            blue = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
              maxValue
            );
          }
        }
        return { red, green, blue, alpha };
      }
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let rgba = getRGBA(data, inIndex);
          switch (options.colorType) {
            case constants2.COLORTYPE_COLOR_ALPHA:
            case constants2.COLORTYPE_COLOR:
              if (options.bitDepth === 8) {
                outData[outIndex] = rgba.red;
                outData[outIndex + 1] = rgba.green;
                outData[outIndex + 2] = rgba.blue;
                if (outHasAlpha) {
                  outData[outIndex + 3] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(rgba.red, outIndex);
                outData.writeUInt16BE(rgba.green, outIndex + 2);
                outData.writeUInt16BE(rgba.blue, outIndex + 4);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                }
              }
              break;
            case constants2.COLORTYPE_ALPHA:
            case constants2.COLORTYPE_GRAYSCALE: {
              let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
              if (options.bitDepth === 8) {
                outData[outIndex] = grayscale;
                if (outHasAlpha) {
                  outData[outIndex + 1] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(grayscale, outIndex);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                }
              }
              break;
            }
            default:
              throw new Error("unrecognised color Type " + options.colorType);
          }
          inIndex += inBpp;
          outIndex += outBpp;
        }
      }
      return outData;
    };
  }
});

// node_modules/pngjs/lib/filter-pack.js
var require_filter_pack = __commonJS({
  "node_modules/pngjs/lib/filter-pack.js"(exports2, module2) {
    "use strict";
    var paethPredictor = require_paeth_predictor();
    function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        rawData[rawPos + x] = pxData[pxPos + x];
      }
    }
    function filterSumNone(pxData, pxPos, byteWidth) {
      let sum2 = 0;
      let length = pxPos + byteWidth;
      for (let i = pxPos; i < length; i++) {
        sum2 += Math.abs(pxData[i]);
      }
      return sum2;
    }
    function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumSub(pxData, pxPos, byteWidth, bpp) {
      let sum2 = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum2 += Math.abs(val);
      }
      return sum2;
    }
    function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumUp(pxData, pxPos, byteWidth) {
      let sum2 = 0;
      let length = pxPos + byteWidth;
      for (let x = pxPos; x < length; x++) {
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum2 += Math.abs(val);
      }
      return sum2;
    }
    function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
      let sum2 = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum2 += Math.abs(val);
      }
      return sum2;
    }
    function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
      let sum2 = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum2 += Math.abs(val);
      }
      return sum2;
    }
    var filters = {
      0: filterNone,
      1: filterSub,
      2: filterUp,
      3: filterAvg,
      4: filterPaeth
    };
    var filterSums = {
      0: filterSumNone,
      1: filterSumSub,
      2: filterSumUp,
      3: filterSumAvg,
      4: filterSumPaeth
    };
    module2.exports = function(pxData, width, height, options, bpp) {
      let filterTypes;
      if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [0, 1, 2, 3, 4];
      } else if (typeof options.filterType === "number") {
        filterTypes = [options.filterType];
      } else {
        throw new Error("unrecognised filter types");
      }
      if (options.bitDepth === 16) {
        bpp *= 2;
      }
      let byteWidth = width * bpp;
      let rawPos = 0;
      let pxPos = 0;
      let rawData = Buffer.alloc((byteWidth + 1) * height);
      let sel = filterTypes[0];
      for (let y = 0; y < height; y++) {
        if (filterTypes.length > 1) {
          let min = Infinity;
          for (let i = 0; i < filterTypes.length; i++) {
            let sum2 = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
            if (sum2 < min) {
              sel = filterTypes[i];
              min = sum2;
            }
          }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
      }
      return rawData;
    };
  }
});

// node_modules/pngjs/lib/packer.js
var require_packer = __commonJS({
  "node_modules/pngjs/lib/packer.js"(exports2, module2) {
    "use strict";
    var constants2 = require_constants();
    var CrcStream = require_crc();
    var bitPacker = require_bitpacker();
    var filter = require_filter_pack();
    var zlib = require("zlib");
    var Packer = module2.exports = function(options) {
      this._options = options;
      options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
      options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
      options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
      options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
      options.deflateFactory = options.deflateFactory || zlib.createDeflate;
      options.bitDepth = options.bitDepth || 8;
      options.colorType = typeof options.colorType === "number" ? options.colorType : constants2.COLORTYPE_COLOR_ALPHA;
      options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants2.COLORTYPE_COLOR_ALPHA;
      if ([
        constants2.COLORTYPE_GRAYSCALE,
        constants2.COLORTYPE_COLOR,
        constants2.COLORTYPE_COLOR_ALPHA,
        constants2.COLORTYPE_ALPHA
      ].indexOf(options.colorType) === -1) {
        throw new Error(
          "option color type:" + options.colorType + " is not supported at present"
        );
      }
      if ([
        constants2.COLORTYPE_GRAYSCALE,
        constants2.COLORTYPE_COLOR,
        constants2.COLORTYPE_COLOR_ALPHA,
        constants2.COLORTYPE_ALPHA
      ].indexOf(options.inputColorType) === -1) {
        throw new Error(
          "option input color type:" + options.inputColorType + " is not supported at present"
        );
      }
      if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error(
          "option bit depth:" + options.bitDepth + " is not supported at present"
        );
      }
    };
    Packer.prototype.getDeflateOptions = function() {
      return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
      };
    };
    Packer.prototype.createDeflate = function() {
      return this._options.deflateFactory(this.getDeflateOptions());
    };
    Packer.prototype.filterData = function(data, width, height) {
      let packedData = bitPacker(data, width, height, this._options);
      let bpp = constants2.COLORTYPE_TO_BPP_MAP[this._options.colorType];
      let filteredData = filter(packedData, width, height, this._options, bpp);
      return filteredData;
    };
    Packer.prototype._packChunk = function(type, data) {
      let len = data ? data.length : 0;
      let buf = Buffer.alloc(len + 12);
      buf.writeUInt32BE(len, 0);
      buf.writeUInt32BE(type, 4);
      if (data) {
        data.copy(buf, 8);
      }
      buf.writeInt32BE(
        CrcStream.crc32(buf.slice(4, buf.length - 4)),
        buf.length - 4
      );
      return buf;
    };
    Packer.prototype.packGAMA = function(gamma) {
      let buf = Buffer.alloc(4);
      buf.writeUInt32BE(Math.floor(gamma * constants2.GAMMA_DIVISION), 0);
      return this._packChunk(constants2.TYPE_gAMA, buf);
    };
    Packer.prototype.packIHDR = function(width, height) {
      let buf = Buffer.alloc(13);
      buf.writeUInt32BE(width, 0);
      buf.writeUInt32BE(height, 4);
      buf[8] = this._options.bitDepth;
      buf[9] = this._options.colorType;
      buf[10] = 0;
      buf[11] = 0;
      buf[12] = 0;
      return this._packChunk(constants2.TYPE_IHDR, buf);
    };
    Packer.prototype.packIDAT = function(data) {
      return this._packChunk(constants2.TYPE_IDAT, data);
    };
    Packer.prototype.packIEND = function() {
      return this._packChunk(constants2.TYPE_IEND, null);
    };
  }
});

// node_modules/pngjs/lib/packer-async.js
var require_packer_async = __commonJS({
  "node_modules/pngjs/lib/packer-async.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var constants2 = require_constants();
    var Packer = require_packer();
    var PackerAsync = module2.exports = function(opt) {
      Stream.call(this);
      let options = opt || {};
      this._packer = new Packer(options);
      this._deflate = this._packer.createDeflate();
      this.readable = true;
    };
    util.inherits(PackerAsync, Stream);
    PackerAsync.prototype.pack = function(data, width, height, gamma) {
      this.emit("data", Buffer.from(constants2.PNG_SIGNATURE));
      this.emit("data", this._packer.packIHDR(width, height));
      if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
      }
      let filteredData = this._packer.filterData(data, width, height);
      this._deflate.on("error", this.emit.bind(this, "error"));
      this._deflate.on(
        "data",
        function(compressedData) {
          this.emit("data", this._packer.packIDAT(compressedData));
        }.bind(this)
      );
      this._deflate.on(
        "end",
        function() {
          this.emit("data", this._packer.packIEND());
          this.emit("end");
        }.bind(this)
      );
      this._deflate.end(filteredData);
    };
  }
});

// node_modules/pngjs/lib/sync-inflate.js
var require_sync_inflate = __commonJS({
  "node_modules/pngjs/lib/sync-inflate.js"(exports2, module2) {
    "use strict";
    var assert = require("assert").ok;
    var zlib = require("zlib");
    var util = require("util");
    var kMaxLength = require("buffer").kMaxLength;
    function Inflate2(opts) {
      if (!(this instanceof Inflate2)) {
        return new Inflate2(opts);
      }
      if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
      }
      zlib.Inflate.call(this, opts);
      this._offset = this._offset === void 0 ? this._outOffset : this._offset;
      this._buffer = this._buffer || this._outBuffer;
      if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
      }
    }
    function createInflate(opts) {
      return new Inflate2(opts);
    }
    function _close(engine, callback) {
      if (callback) {
        process.nextTick(callback);
      }
      if (!engine._handle) {
        return;
      }
      engine._handle.close();
      engine._handle = null;
    }
    Inflate2.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
      if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
      }
      let self2 = this;
      let availInBefore = chunk && chunk.length;
      let availOutBefore = this._chunkSize - this._offset;
      let leftToInflate = this._maxLength;
      let inOff = 0;
      let buffers = [];
      let nread = 0;
      let error;
      this.on("error", function(err2) {
        error = err2;
      });
      function handleChunk(availInAfter, availOutAfter) {
        if (self2._hadError) {
          return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
          let out = self2._buffer.slice(self2._offset, self2._offset + have);
          self2._offset += have;
          if (out.length > leftToInflate) {
            out = out.slice(0, leftToInflate);
          }
          buffers.push(out);
          nread += out.length;
          leftToInflate -= out.length;
          if (leftToInflate === 0) {
            return false;
          }
        }
        if (availOutAfter === 0 || self2._offset >= self2._chunkSize) {
          availOutBefore = self2._chunkSize;
          self2._offset = 0;
          self2._buffer = Buffer.allocUnsafe(self2._chunkSize);
        }
        if (availOutAfter === 0) {
          inOff += availInBefore - availInAfter;
          availInBefore = availInAfter;
          return true;
        }
        return false;
      }
      assert(this._handle, "zlib binding closed");
      let res;
      do {
        res = this._handle.writeSync(
          flushFlag,
          chunk,
          // in
          inOff,
          // in_off
          availInBefore,
          // in_len
          this._buffer,
          // out
          this._offset,
          //out_off
          availOutBefore
        );
        res = res || this._writeState;
      } while (!this._hadError && handleChunk(res[0], res[1]));
      if (this._hadError) {
        throw error;
      }
      if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError(
          "Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes"
        );
      }
      let buf = Buffer.concat(buffers, nread);
      _close(this);
      return buf;
    };
    util.inherits(Inflate2, zlib.Inflate);
    function zlibBufferSync(engine, buffer2) {
      if (typeof buffer2 === "string") {
        buffer2 = Buffer.from(buffer2);
      }
      if (!(buffer2 instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
      }
      let flushFlag = engine._finishFlushFlag;
      if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
      }
      return engine._processChunk(buffer2, flushFlag);
    }
    function inflateSync(buffer2, opts) {
      return zlibBufferSync(new Inflate2(opts), buffer2);
    }
    module2.exports = exports2 = inflateSync;
    exports2.Inflate = Inflate2;
    exports2.createInflate = createInflate;
    exports2.inflateSync = inflateSync;
  }
});

// node_modules/pngjs/lib/sync-reader.js
var require_sync_reader = __commonJS({
  "node_modules/pngjs/lib/sync-reader.js"(exports2, module2) {
    "use strict";
    var SyncReader = module2.exports = function(buffer2) {
      this._buffer = buffer2;
      this._reads = [];
    };
    SyncReader.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
    };
    SyncReader.prototype.process = function() {
      while (this._reads.length > 0 && this._buffer.length) {
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
          this._reads.shift();
          let buf = this._buffer;
          this._buffer = buf.slice(read.length);
          read.func.call(this, buf.slice(0, read.length));
        } else {
          break;
        }
      }
      if (this._reads.length > 0) {
        throw new Error("There are some read requests waitng on finished stream");
      }
      if (this._buffer.length > 0) {
        throw new Error("unrecognised content at end of stream");
      }
    };
  }
});

// node_modules/pngjs/lib/filter-parse-sync.js
var require_filter_parse_sync = __commonJS({
  "node_modules/pngjs/lib/filter-parse-sync.js"(exports2) {
    "use strict";
    var SyncReader = require_sync_reader();
    var Filter = require_filter_parse();
    exports2.process = function(inBuffer, bitmapInfo) {
      let outBuffers = [];
      let reader = new SyncReader(inBuffer);
      let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
          outBuffers.push(bufferPart);
        },
        complete: function() {
        }
      });
      filter.start();
      reader.process();
      return Buffer.concat(outBuffers);
    };
  }
});

// node_modules/pngjs/lib/parser-sync.js
var require_parser_sync = __commonJS({
  "node_modules/pngjs/lib/parser-sync.js"(exports2, module2) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = require("zlib");
    var inflateSync = require_sync_inflate();
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var SyncReader = require_sync_reader();
    var FilterSync = require_filter_parse_sync();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    module2.exports = function(buffer2, options) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let err2;
      function handleError(_err_) {
        err2 = _err_;
      }
      let metaData;
      function handleMetaData(_metaData_) {
        metaData = _metaData_;
      }
      function handleTransColor(transColor) {
        metaData.transColor = transColor;
      }
      function handlePalette(palette) {
        metaData.palette = palette;
      }
      function handleSimpleTransparency() {
        metaData.alpha = true;
      }
      let gamma;
      function handleGamma(_gamma_) {
        gamma = _gamma_;
      }
      let inflateDataList = [];
      function handleInflateData(inflatedData2) {
        inflateDataList.push(inflatedData2);
      }
      let reader = new SyncReader(buffer2);
      let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
      });
      parser.start();
      reader.process();
      if (err2) {
        throw err2;
      }
      let inflateData = Buffer.concat(inflateDataList);
      inflateDataList.length = 0;
      let inflatedData;
      if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
      } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
          chunkSize: imageSize,
          maxLength: imageSize
        });
      }
      inflateData = null;
      if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
      }
      let unfilteredData = FilterSync.process(inflatedData, metaData);
      inflateData = null;
      let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
      unfilteredData = null;
      let normalisedBitmapData = formatNormaliser(
        bitmapData,
        metaData,
        options.skipRescale
      );
      metaData.data = normalisedBitmapData;
      metaData.gamma = gamma || 0;
      return metaData;
    };
  }
});

// node_modules/pngjs/lib/packer-sync.js
var require_packer_sync = __commonJS({
  "node_modules/pngjs/lib/packer-sync.js"(exports2, module2) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = require("zlib");
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var constants2 = require_constants();
    var Packer = require_packer();
    module2.exports = function(metaData, opt) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let options = opt || {};
      let packer = new Packer(options);
      let chunks = [];
      chunks.push(Buffer.from(constants2.PNG_SIGNATURE));
      chunks.push(packer.packIHDR(metaData.width, metaData.height));
      if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
      }
      let filteredData = packer.filterData(
        metaData.data,
        metaData.width,
        metaData.height
      );
      let compressedData = zlib.deflateSync(
        filteredData,
        packer.getDeflateOptions()
      );
      filteredData = null;
      if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
      }
      chunks.push(packer.packIDAT(compressedData));
      chunks.push(packer.packIEND());
      return Buffer.concat(chunks);
    };
  }
});

// node_modules/pngjs/lib/png-sync.js
var require_png_sync = __commonJS({
  "node_modules/pngjs/lib/png-sync.js"(exports2) {
    "use strict";
    var parse = require_parser_sync();
    var pack = require_packer_sync();
    exports2.read = function(buffer2, options) {
      return parse(buffer2, options || {});
    };
    exports2.write = function(png, options) {
      return pack(png, options);
    };
  }
});

// node_modules/pngjs/lib/png.js
var require_png = __commonJS({
  "node_modules/pngjs/lib/png.js"(exports2) {
    "use strict";
    var util = require("util");
    var Stream = require("stream");
    var Parser = require_parser_async();
    var Packer = require_packer_async();
    var PNGSync = require_png_sync();
    var PNG2 = exports2.PNG = function(options) {
      Stream.call(this);
      options = options || {};
      this.width = options.width | 0;
      this.height = options.height | 0;
      this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
      if (options.fill && this.data) {
        this.data.fill(0);
      }
      this.gamma = 0;
      this.readable = this.writable = true;
      this._parser = new Parser(options);
      this._parser.on("error", this.emit.bind(this, "error"));
      this._parser.on("close", this._handleClose.bind(this));
      this._parser.on("metadata", this._metadata.bind(this));
      this._parser.on("gamma", this._gamma.bind(this));
      this._parser.on(
        "parsed",
        function(data) {
          this.data = data;
          this.emit("parsed", data);
        }.bind(this)
      );
      this._packer = new Packer(options);
      this._packer.on("data", this.emit.bind(this, "data"));
      this._packer.on("end", this.emit.bind(this, "end"));
      this._parser.on("close", this._handleClose.bind(this));
      this._packer.on("error", this.emit.bind(this, "error"));
    };
    util.inherits(PNG2, Stream);
    PNG2.sync = PNGSync;
    PNG2.prototype.pack = function() {
      if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
      }
      process.nextTick(
        function() {
          this._packer.pack(this.data, this.width, this.height, this.gamma);
        }.bind(this)
      );
      return this;
    };
    PNG2.prototype.parse = function(data, callback) {
      if (callback) {
        let onParsed, onError;
        onParsed = function(parsedData) {
          this.removeListener("error", onError);
          this.data = parsedData;
          callback(null, this);
        }.bind(this);
        onError = function(err2) {
          this.removeListener("parsed", onParsed);
          callback(err2, null);
        }.bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
      }
      this.end(data);
      return this;
    };
    PNG2.prototype.write = function(data) {
      this._parser.write(data);
      return true;
    };
    PNG2.prototype.end = function(data) {
      this._parser.end(data);
    };
    PNG2.prototype._metadata = function(metadata) {
      this.width = metadata.width;
      this.height = metadata.height;
      this.emit("metadata", metadata);
    };
    PNG2.prototype._gamma = function(gamma) {
      this.gamma = gamma;
    };
    PNG2.prototype._handleClose = function() {
      if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
      }
    };
    PNG2.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
      srcX |= 0;
      srcY |= 0;
      width |= 0;
      height |= 0;
      deltaX |= 0;
      deltaY |= 0;
      if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
      }
      if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
      }
      for (let y = 0; y < height; y++) {
        src.data.copy(
          dst.data,
          (deltaY + y) * dst.width + deltaX << 2,
          (srcY + y) * src.width + srcX << 2,
          (srcY + y) * src.width + srcX + width << 2
        );
      }
    };
    PNG2.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
      PNG2.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
      return this;
    };
    PNG2.adjustGamma = function(src) {
      if (src.gamma) {
        for (let y = 0; y < src.height; y++) {
          for (let x = 0; x < src.width; x++) {
            let idx = src.width * y + x << 2;
            for (let i = 0; i < 3; i++) {
              let sample = src.data[idx + i] / 255;
              sample = Math.pow(sample, 1 / 2.2 / src.gamma);
              src.data[idx + i] = Math.round(sample * 255);
            }
          }
        }
        src.gamma = 0;
      }
    };
    PNG2.prototype.adjustGamma = function() {
      PNG2.adjustGamma(this);
    };
  }
});

// node_modules/proj4/dist/proj4-src.js
var require_proj4_src = __commonJS({
  "node_modules/proj4/dist/proj4-src.js"(exports2, module2) {
    (function(global, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.proj4 = factory());
    })(exports2, (function() {
      "use strict";
      function globals(defs2) {
        defs2("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
        defs2("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees");
        defs2("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs");
        for (var i = 1; i <= 60; ++i) {
          defs2("EPSG:" + (32600 + i), "+proj=utm +zone=" + i + " +datum=WGS84 +units=m");
          defs2("EPSG:" + (32700 + i), "+proj=utm +zone=" + i + " +south +datum=WGS84 +units=m");
        }
        defs2("EPSG:5041", "+title=WGS 84 / UPS North (E,N) +proj=stere +lat_0=90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
        defs2("EPSG:5042", "+title=WGS 84 / UPS South (E,N) +proj=stere +lat_0=-90 +lon_0=0 +k=0.994 +x_0=2000000 +y_0=2000000 +datum=WGS84 +units=m");
        defs2.WGS84 = defs2["EPSG:4326"];
        defs2["EPSG:3785"] = defs2["EPSG:3857"];
        defs2.GOOGLE = defs2["EPSG:3857"];
        defs2["EPSG:900913"] = defs2["EPSG:3857"];
        defs2["EPSG:102113"] = defs2["EPSG:3857"];
      }
      var PJD_3PARAM = 1;
      var PJD_7PARAM = 2;
      var PJD_GRIDSHIFT = 3;
      var PJD_WGS84 = 4;
      var PJD_NODATUM = 5;
      var SRS_WGS84_SEMIMAJOR = 6378137;
      var SRS_WGS84_SEMIMINOR = 6356752314e-3;
      var SRS_WGS84_ESQUARED = 0.0066943799901413165;
      var SEC_TO_RAD = 484813681109536e-20;
      var HALF_PI = Math.PI / 2;
      var SIXTH = 0.16666666666666666;
      var RA4 = 0.04722222222222222;
      var RA6 = 0.022156084656084655;
      var EPSLN = 1e-10;
      var D2R$1 = 0.017453292519943295;
      var R2D = 57.29577951308232;
      var FORTPI = Math.PI / 4;
      var TWO_PI = Math.PI * 2;
      var SPI = 3.14159265359;
      var primeMeridian = {};
      primeMeridian.greenwich = 0;
      primeMeridian.lisbon = -9.131906111111;
      primeMeridian.paris = 2.337229166667;
      primeMeridian.bogota = -74.080916666667;
      primeMeridian.madrid = -3.687938888889;
      primeMeridian.rome = 12.452333333333;
      primeMeridian.bern = 7.439583333333;
      primeMeridian.jakarta = 106.807719444444;
      primeMeridian.ferro = -17.666666666667;
      primeMeridian.brussels = 4.367975;
      primeMeridian.stockholm = 18.058277777778;
      primeMeridian.athens = 23.7163375;
      primeMeridian.oslo = 10.722916666667;
      var units = {
        mm: { to_meter: 1e-3 },
        cm: { to_meter: 0.01 },
        ft: { to_meter: 0.3048 },
        "us-ft": { to_meter: 1200 / 3937 },
        fath: { to_meter: 1.8288 },
        kmi: { to_meter: 1852 },
        "us-ch": { to_meter: 20.1168402336805 },
        "us-mi": { to_meter: 1609.34721869444 },
        km: { to_meter: 1e3 },
        "ind-ft": { to_meter: 0.30479841 },
        "ind-yd": { to_meter: 0.91439523 },
        mi: { to_meter: 1609.344 },
        yd: { to_meter: 0.9144 },
        ch: { to_meter: 20.1168 },
        link: { to_meter: 0.201168 },
        dm: { to_meter: 0.1 },
        in: { to_meter: 0.0254 },
        "ind-ch": { to_meter: 20.11669506 },
        "us-in": { to_meter: 0.025400050800101 },
        "us-yd": { to_meter: 0.914401828803658 }
      };
      var ignoredChar = /[\s_\-\/\(\)]/g;
      function match(obj, key2) {
        if (obj[key2]) {
          return obj[key2];
        }
        var keys = Object.keys(obj);
        var lkey = key2.toLowerCase().replace(ignoredChar, "");
        var i = -1;
        var testkey, processedKey;
        while (++i < keys.length) {
          testkey = keys[i];
          processedKey = testkey.toLowerCase().replace(ignoredChar, "");
          if (processedKey === lkey) {
            return obj[testkey];
          }
        }
      }
      function projStr(defData) {
        var self2 = {};
        var paramObj = defData.split("+").map(function(v) {
          return v.trim();
        }).filter(function(a) {
          return a;
        }).reduce(function(p, a) {
          var split = a.split("=");
          split.push(true);
          p[split[0].toLowerCase()] = split[1];
          return p;
        }, {});
        var paramName, paramVal, paramOutname;
        var params2 = {
          proj: function(v) {
            self2.projName = ["lonlat", "latlon", "latlong"].includes(v) ? "longlat" : v;
          },
          datum: "datumCode",
          rf: function(v) {
            self2.rf = parseFloat(v);
          },
          lat_0: function(v) {
            self2.lat0 = v * D2R$1;
          },
          lat_1: function(v) {
            self2.lat1 = v * D2R$1;
          },
          lat_2: function(v) {
            self2.lat2 = v * D2R$1;
          },
          lat_ts: function(v) {
            self2.lat_ts = v * D2R$1;
          },
          lon_0: function(v) {
            self2.long0 = v * D2R$1;
          },
          lon_wrap: function(v) {
            self2.long_wrap = parseFloat(v) * D2R$1;
          },
          lon_1: function(v) {
            self2.long1 = v * D2R$1;
          },
          lon_2: function(v) {
            self2.long2 = v * D2R$1;
          },
          alpha: function(v) {
            self2.alpha = parseFloat(v) * D2R$1;
          },
          gamma: function(v) {
            self2.rectified_grid_angle = parseFloat(v) * D2R$1;
          },
          lonc: function(v) {
            self2.longc = v * D2R$1;
          },
          x_0: function(v) {
            self2.x0 = parseFloat(v);
          },
          y_0: function(v) {
            self2.y0 = parseFloat(v);
          },
          k_0: function(v) {
            self2.k0 = parseFloat(v);
          },
          k: function(v) {
            self2.k0 = parseFloat(v);
          },
          a: function(v) {
            self2.a = parseFloat(v);
          },
          b: function(v) {
            self2.b = parseFloat(v);
          },
          r: function(v) {
            self2.a = self2.b = parseFloat(v);
          },
          r_a: function() {
            self2.R_A = true;
          },
          zone: function(v) {
            self2.zone = parseInt(v, 10);
          },
          south: function() {
            self2.utmSouth = true;
          },
          towgs84: function(v) {
            self2.datum_params = v.split(",").map(function(a) {
              return parseFloat(a);
            });
          },
          to_meter: function(v) {
            self2.to_meter = parseFloat(v);
          },
          units: function(v) {
            self2.units = v;
            var unit = match(units, v);
            if (unit) {
              self2.to_meter = unit.to_meter;
            }
          },
          from_greenwich: function(v) {
            self2.from_greenwich = v * D2R$1;
          },
          pm: function(v) {
            var pm = match(primeMeridian, v);
            self2.from_greenwich = (pm ? pm : parseFloat(v)) * D2R$1;
          },
          nadgrids: function(v) {
            if (v === "@null") {
              self2.datumCode = "none";
            } else {
              self2.nadgrids = v;
            }
          },
          axis: function(v) {
            var legalAxis = "ewnsud";
            if (v.length === 3 && legalAxis.indexOf(v.substr(0, 1)) !== -1 && legalAxis.indexOf(v.substr(1, 1)) !== -1 && legalAxis.indexOf(v.substr(2, 1)) !== -1) {
              self2.axis = v;
            }
          },
          approx: function() {
            self2.approx = true;
          },
          over: function() {
            self2.over = true;
          }
        };
        for (paramName in paramObj) {
          paramVal = paramObj[paramName];
          if (paramName in params2) {
            paramOutname = params2[paramName];
            if (typeof paramOutname === "function") {
              paramOutname(paramVal);
            } else {
              self2[paramOutname] = paramVal;
            }
          } else {
            self2[paramName] = paramVal;
          }
        }
        if (typeof self2.datumCode === "string" && self2.datumCode !== "WGS84") {
          self2.datumCode = self2.datumCode.toLowerCase();
        }
        self2["projStr"] = defData;
        return self2;
      }
      class PROJJSONBuilderBase {
        static getId(node) {
          const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
          if (idNode && idNode.length >= 3) {
            return {
              authority: idNode[1],
              code: parseInt(idNode[2], 10)
            };
          }
          return null;
        }
        static convertUnit(node, type = "unit") {
          if (!node || node.length < 3) {
            return { type, name: "unknown", conversion_factor: null };
          }
          const name = node[1];
          const conversionFactor = parseFloat(node[2]) || null;
          const idNode = node.find((child) => Array.isArray(child) && child[0] === "ID");
          const id = idNode ? {
            authority: idNode[1],
            code: parseInt(idNode[2], 10)
          } : null;
          return {
            type,
            name,
            conversion_factor: conversionFactor,
            id
          };
        }
        static convertAxis(node) {
          const name = node[1] || "Unknown";
          let direction;
          const abbreviationMatch = name.match(/^\((.)\)$/);
          if (abbreviationMatch) {
            const abbreviation = abbreviationMatch[1].toUpperCase();
            if (abbreviation === "E") direction = "east";
            else if (abbreviation === "N") direction = "north";
            else if (abbreviation === "U") direction = "up";
            else if (node[2]) direction = node[2];
            else throw new Error(`Unknown axis abbreviation: ${abbreviation}`);
          } else {
            direction = node[2] || "unknown";
          }
          const orderNode = node.find((child) => Array.isArray(child) && child[0] === "ORDER");
          const order2 = orderNode ? parseInt(orderNode[1], 10) : null;
          const unitNode = node.find(
            (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
          );
          const unit = this.convertUnit(unitNode);
          return {
            name,
            direction,
            // Use the valid PROJJSON direction value
            unit,
            order: order2
          };
        }
        static extractAxes(node) {
          return node.filter((child) => Array.isArray(child) && child[0] === "AXIS").map((axis) => this.convertAxis(axis)).sort((a, b) => (a.order || 0) - (b.order || 0));
        }
        static convert(node, result = {}) {
          switch (node[0]) {
            case "PROJCRS":
              result.type = "ProjectedCRS";
              result.name = node[1];
              result.base_crs = node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "BASEGEOGCRS")) : null;
              result.conversion = node.find((child) => Array.isArray(child) && child[0] === "CONVERSION") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "CONVERSION")) : null;
              const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
              if (csNode) {
                result.coordinate_system = {
                  type: csNode[1],
                  axis: this.extractAxes(node)
                };
              }
              const lengthUnitNode = node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT");
              if (lengthUnitNode) {
                const unit2 = this.convertUnit(lengthUnitNode);
                result.coordinate_system.unit = unit2;
              }
              result.id = this.getId(node);
              break;
            case "BASEGEOGCRS":
            case "GEOGCRS":
            case "GEODCRS":
              result.type = node[0] === "GEODCRS" ? "GeodeticCRS" : "GeographicCRS";
              result.name = node[1];
              const datumOrEnsembleNode = node.find(
                (child) => Array.isArray(child) && (child[0] === "DATUM" || child[0] === "ENSEMBLE")
              );
              if (datumOrEnsembleNode) {
                const datumOrEnsemble = this.convert(datumOrEnsembleNode);
                if (datumOrEnsembleNode[0] === "ENSEMBLE") {
                  result.datum_ensemble = datumOrEnsemble;
                } else {
                  result.datum = datumOrEnsemble;
                }
                const primem = node.find((child) => Array.isArray(child) && child[0] === "PRIMEM");
                if (primem && primem[1] !== "Greenwich") {
                  datumOrEnsemble.prime_meridian = {
                    name: primem[1],
                    longitude: parseFloat(primem[2])
                  };
                }
              }
              result.coordinate_system = {
                type: "ellipsoidal",
                axis: this.extractAxes(node)
              };
              result.id = this.getId(node);
              break;
            case "DATUM":
              result.type = "GeodeticReferenceFrame";
              result.name = node[1];
              result.ellipsoid = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID")) : null;
              break;
            case "ENSEMBLE":
              result.type = "DatumEnsemble";
              result.name = node[1];
              result.members = node.filter((child) => Array.isArray(child) && child[0] === "MEMBER").map((member) => ({
                type: "DatumEnsembleMember",
                name: member[1],
                id: this.getId(member)
                // Extract ID as { authority, code }
              }));
              const accuracyNode = node.find((child) => Array.isArray(child) && child[0] === "ENSEMBLEACCURACY");
              if (accuracyNode) {
                result.accuracy = parseFloat(accuracyNode[1]);
              }
              const ellipsoidNode = node.find((child) => Array.isArray(child) && child[0] === "ELLIPSOID");
              if (ellipsoidNode) {
                result.ellipsoid = this.convert(ellipsoidNode);
              }
              result.id = this.getId(node);
              break;
            case "ELLIPSOID":
              result.type = "Ellipsoid";
              result.name = node[1];
              result.semi_major_axis = parseFloat(node[2]);
              result.inverse_flattening = parseFloat(node[3]);
              node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "LENGTHUNIT"), result) : null;
              break;
            case "CONVERSION":
              result.type = "Conversion";
              result.name = node[1];
              result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
              result.parameters = node.filter((child) => Array.isArray(child) && child[0] === "PARAMETER").map((param) => this.convert(param));
              break;
            case "METHOD":
              result.type = "Method";
              result.name = node[1];
              result.id = this.getId(node);
              break;
            case "PARAMETER":
              result.type = "Parameter";
              result.name = node[1];
              result.value = parseFloat(node[2]);
              result.unit = this.convertUnit(
                node.find(
                  (child) => Array.isArray(child) && (child[0] === "LENGTHUNIT" || child[0] === "ANGLEUNIT" || child[0] === "SCALEUNIT")
                )
              );
              result.id = this.getId(node);
              break;
            case "BOUNDCRS":
              result.type = "BoundCRS";
              const sourceCrsNode = node.find((child) => Array.isArray(child) && child[0] === "SOURCECRS");
              if (sourceCrsNode) {
                const sourceCrsContent = sourceCrsNode.find((child) => Array.isArray(child));
                result.source_crs = sourceCrsContent ? this.convert(sourceCrsContent) : null;
              }
              const targetCrsNode = node.find((child) => Array.isArray(child) && child[0] === "TARGETCRS");
              if (targetCrsNode) {
                const targetCrsContent = targetCrsNode.find((child) => Array.isArray(child));
                result.target_crs = targetCrsContent ? this.convert(targetCrsContent) : null;
              }
              const transformationNode = node.find((child) => Array.isArray(child) && child[0] === "ABRIDGEDTRANSFORMATION");
              if (transformationNode) {
                result.transformation = this.convert(transformationNode);
              } else {
                result.transformation = null;
              }
              break;
            case "ABRIDGEDTRANSFORMATION":
              result.type = "Transformation";
              result.name = node[1];
              result.method = node.find((child) => Array.isArray(child) && child[0] === "METHOD") ? this.convert(node.find((child) => Array.isArray(child) && child[0] === "METHOD")) : null;
              result.parameters = node.filter((child) => Array.isArray(child) && (child[0] === "PARAMETER" || child[0] === "PARAMETERFILE")).map((param) => {
                if (param[0] === "PARAMETER") {
                  return this.convert(param);
                } else if (param[0] === "PARAMETERFILE") {
                  return {
                    name: param[1],
                    value: param[2],
                    id: {
                      "authority": "EPSG",
                      "code": 8656
                    }
                  };
                }
              });
              if (result.parameters.length === 7) {
                const scaleDifference = result.parameters[6];
                if (scaleDifference.name === "Scale difference") {
                  scaleDifference.value = Math.round((scaleDifference.value - 1) * 1e12) / 1e6;
                }
              }
              result.id = this.getId(node);
              break;
            case "AXIS":
              if (!result.coordinate_system) {
                result.coordinate_system = { type: "unspecified", axis: [] };
              }
              result.coordinate_system.axis.push(this.convertAxis(node));
              break;
            case "LENGTHUNIT":
              const unit = this.convertUnit(node, "LinearUnit");
              if (result.coordinate_system && result.coordinate_system.axis) {
                result.coordinate_system.axis.forEach((axis) => {
                  if (!axis.unit) {
                    axis.unit = unit;
                  }
                });
              }
              if (unit.conversion_factor && unit.conversion_factor !== 1) {
                if (result.semi_major_axis) {
                  result.semi_major_axis = {
                    value: result.semi_major_axis,
                    unit
                  };
                }
              }
              break;
            default:
              result.keyword = node[0];
              break;
          }
          return result;
        }
      }
      class PROJJSONBuilder2015 extends PROJJSONBuilderBase {
        static convert(node, result = {}) {
          super.convert(node, result);
          if (result.coordinate_system && result.coordinate_system.subtype === "Cartesian") {
            delete result.coordinate_system;
          }
          if (result.usage) {
            delete result.usage;
          }
          return result;
        }
      }
      class PROJJSONBuilder2019 extends PROJJSONBuilderBase {
        static convert(node, result = {}) {
          super.convert(node, result);
          const csNode = node.find((child) => Array.isArray(child) && child[0] === "CS");
          if (csNode) {
            result.coordinate_system = {
              subtype: csNode[1],
              axis: this.extractAxes(node)
            };
          }
          const usageNode = node.find((child) => Array.isArray(child) && child[0] === "USAGE");
          if (usageNode) {
            const scope = usageNode.find((child) => Array.isArray(child) && child[0] === "SCOPE");
            const area = usageNode.find((child) => Array.isArray(child) && child[0] === "AREA");
            const bbox = usageNode.find((child) => Array.isArray(child) && child[0] === "BBOX");
            result.usage = {};
            if (scope) {
              result.usage.scope = scope[1];
            }
            if (area) {
              result.usage.area = area[1];
            }
            if (bbox) {
              result.usage.bbox = bbox.slice(1);
            }
          }
          return result;
        }
      }
      function detectWKT2Version(root) {
        if (root.find((child) => Array.isArray(child) && child[0] === "USAGE")) {
          return "2019";
        }
        if (root.find((child) => Array.isArray(child) && child[0] === "CS")) {
          return "2015";
        }
        if (root[0] === "BOUNDCRS" || root[0] === "PROJCRS" || root[0] === "GEOGCRS") {
          return "2015";
        }
        return "2015";
      }
      function buildPROJJSON(root) {
        const version = detectWKT2Version(root);
        const builder = version === "2019" ? PROJJSONBuilder2019 : PROJJSONBuilder2015;
        return builder.convert(root);
      }
      function detectWKTVersion(wkt2) {
        const normalizedWKT = wkt2.toUpperCase();
        if (normalizedWKT.includes("PROJCRS") || normalizedWKT.includes("GEOGCRS") || normalizedWKT.includes("BOUNDCRS") || normalizedWKT.includes("VERTCRS") || normalizedWKT.includes("LENGTHUNIT") || normalizedWKT.includes("ANGLEUNIT") || normalizedWKT.includes("SCALEUNIT")) {
          return "WKT2";
        }
        if (normalizedWKT.includes("PROJCS") || normalizedWKT.includes("GEOGCS") || normalizedWKT.includes("LOCAL_CS") || normalizedWKT.includes("VERT_CS") || normalizedWKT.includes("UNIT")) {
          return "WKT1";
        }
        return "WKT1";
      }
      var NEUTRAL = 1;
      var KEYWORD = 2;
      var NUMBER = 3;
      var QUOTED = 4;
      var AFTERQUOTE = 5;
      var ENDED = -1;
      var whitespace = /\s/;
      var latin = /[A-Za-z]/;
      var keyword = /[A-Za-z84_]/;
      var endThings = /[,\]]/;
      var digets = /[\d\.E\-\+]/;
      function Parser(text) {
        if (typeof text !== "string") {
          throw new Error("not a string");
        }
        this.text = text.trim();
        this.level = 0;
        this.place = 0;
        this.root = null;
        this.stack = [];
        this.currentObject = null;
        this.state = NEUTRAL;
      }
      Parser.prototype.readCharicter = function() {
        var char = this.text[this.place++];
        if (this.state !== QUOTED) {
          while (whitespace.test(char)) {
            if (this.place >= this.text.length) {
              return;
            }
            char = this.text[this.place++];
          }
        }
        switch (this.state) {
          case NEUTRAL:
            return this.neutral(char);
          case KEYWORD:
            return this.keyword(char);
          case QUOTED:
            return this.quoted(char);
          case AFTERQUOTE:
            return this.afterquote(char);
          case NUMBER:
            return this.number(char);
          case ENDED:
            return;
        }
      };
      Parser.prototype.afterquote = function(char) {
        if (char === '"') {
          this.word += '"';
          this.state = QUOTED;
          return;
        }
        if (endThings.test(char)) {
          this.word = this.word.trim();
          this.afterItem(char);
          return;
        }
        throw new Error(`havn't handled "` + char + '" in afterquote yet, index ' + this.place);
      };
      Parser.prototype.afterItem = function(char) {
        if (char === ",") {
          if (this.word !== null) {
            this.currentObject.push(this.word);
          }
          this.word = null;
          this.state = NEUTRAL;
          return;
        }
        if (char === "]") {
          this.level--;
          if (this.word !== null) {
            this.currentObject.push(this.word);
            this.word = null;
          }
          this.state = NEUTRAL;
          this.currentObject = this.stack.pop();
          if (!this.currentObject) {
            this.state = ENDED;
          }
          return;
        }
      };
      Parser.prototype.number = function(char) {
        if (digets.test(char)) {
          this.word += char;
          return;
        }
        if (endThings.test(char)) {
          this.word = parseFloat(this.word);
          this.afterItem(char);
          return;
        }
        throw new Error(`havn't handled "` + char + '" in number yet, index ' + this.place);
      };
      Parser.prototype.quoted = function(char) {
        if (char === '"') {
          this.state = AFTERQUOTE;
          return;
        }
        this.word += char;
        return;
      };
      Parser.prototype.keyword = function(char) {
        if (keyword.test(char)) {
          this.word += char;
          return;
        }
        if (char === "[") {
          var newObjects = [];
          newObjects.push(this.word);
          this.level++;
          if (this.root === null) {
            this.root = newObjects;
          } else {
            this.currentObject.push(newObjects);
          }
          this.stack.push(this.currentObject);
          this.currentObject = newObjects;
          this.state = NEUTRAL;
          return;
        }
        if (endThings.test(char)) {
          this.afterItem(char);
          return;
        }
        throw new Error(`havn't handled "` + char + '" in keyword yet, index ' + this.place);
      };
      Parser.prototype.neutral = function(char) {
        if (latin.test(char)) {
          this.word = char;
          this.state = KEYWORD;
          return;
        }
        if (char === '"') {
          this.word = "";
          this.state = QUOTED;
          return;
        }
        if (digets.test(char)) {
          this.word = char;
          this.state = NUMBER;
          return;
        }
        if (endThings.test(char)) {
          this.afterItem(char);
          return;
        }
        throw new Error(`havn't handled "` + char + '" in neutral yet, index ' + this.place);
      };
      Parser.prototype.output = function() {
        while (this.place < this.text.length) {
          this.readCharicter();
        }
        if (this.state === ENDED) {
          return this.root;
        }
        throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
      };
      function parseString(txt) {
        var parser = new Parser(txt);
        return parser.output();
      }
      function mapit(obj, key2, value) {
        if (Array.isArray(key2)) {
          value.unshift(key2);
          key2 = null;
        }
        var thing = key2 ? {} : obj;
        var out = value.reduce(function(newObj, item) {
          sExpr(item, newObj);
          return newObj;
        }, thing);
        if (key2) {
          obj[key2] = out;
        }
      }
      function sExpr(v, obj) {
        if (!Array.isArray(v)) {
          obj[v] = true;
          return;
        }
        var key2 = v.shift();
        if (key2 === "PARAMETER") {
          key2 = v.shift();
        }
        if (v.length === 1) {
          if (Array.isArray(v[0])) {
            obj[key2] = {};
            sExpr(v[0], obj[key2]);
            return;
          }
          obj[key2] = v[0];
          return;
        }
        if (!v.length) {
          obj[key2] = true;
          return;
        }
        if (key2 === "TOWGS84") {
          obj[key2] = v;
          return;
        }
        if (key2 === "AXIS") {
          if (!(key2 in obj)) {
            obj[key2] = [];
          }
          obj[key2].push(v);
          return;
        }
        if (!Array.isArray(key2)) {
          obj[key2] = {};
        }
        var i;
        switch (key2) {
          case "UNIT":
          case "PRIMEM":
          case "VERT_DATUM":
            obj[key2] = {
              name: v[0].toLowerCase(),
              convert: v[1]
            };
            if (v.length === 3) {
              sExpr(v[2], obj[key2]);
            }
            return;
          case "SPHEROID":
          case "ELLIPSOID":
            obj[key2] = {
              name: v[0],
              a: v[1],
              rf: v[2]
            };
            if (v.length === 4) {
              sExpr(v[3], obj[key2]);
            }
            return;
          case "EDATUM":
          case "ENGINEERINGDATUM":
          case "LOCAL_DATUM":
          case "DATUM":
          case "VERT_CS":
          case "VERTCRS":
          case "VERTICALCRS":
            v[0] = ["name", v[0]];
            mapit(obj, key2, v);
            return;
          case "COMPD_CS":
          case "COMPOUNDCRS":
          case "FITTED_CS":
          // the followings are the crs defined in
          // https://github.com/proj4js/proj4js/blob/1da4ed0b865d0fcb51c136090569210cdcc9019e/lib/parseCode.js#L11
          case "PROJECTEDCRS":
          case "PROJCRS":
          case "GEOGCS":
          case "GEOCCS":
          case "PROJCS":
          case "LOCAL_CS":
          case "GEODCRS":
          case "GEODETICCRS":
          case "GEODETICDATUM":
          case "ENGCRS":
          case "ENGINEERINGCRS":
            v[0] = ["name", v[0]];
            mapit(obj, key2, v);
            obj[key2].type = key2;
            return;
          default:
            i = -1;
            while (++i < v.length) {
              if (!Array.isArray(v[i])) {
                return sExpr(v, obj[key2]);
              }
            }
            return mapit(obj, key2, v);
        }
      }
      var D2R = 0.017453292519943295;
      function d2r(input) {
        return input * D2R;
      }
      function applyProjectionDefaults(wkt2) {
        const normalizedProjName = (wkt2.projName || "").toLowerCase().replace(/_/g, " ");
        if (wkt2.long0 === void 0 && wkt2.longc !== void 0) {
          wkt2.long0 = wkt2.longc;
        }
        if (!wkt2.lat_ts && wkt2.lat1 && (normalizedProjName === "stereographic south pole" || normalizedProjName === "polar stereographic (variant b)")) {
          wkt2.lat0 = d2r(wkt2.lat1 > 0 ? 90 : -90);
          wkt2.lat_ts = wkt2.lat1;
          delete wkt2.lat1;
        } else if (!wkt2.lat_ts && wkt2.lat0 && (normalizedProjName === "polar stereographic" || normalizedProjName === "polar stereographic (variant a)")) {
          wkt2.lat_ts = wkt2.lat0;
          wkt2.lat0 = d2r(wkt2.lat0 > 0 ? 90 : -90);
          delete wkt2.lat1;
        }
      }
      function processUnit(unit) {
        let result = { units: null, to_meter: void 0 };
        if (typeof unit === "string") {
          result.units = unit.toLowerCase();
          if (result.units === "metre") {
            result.units = "meter";
          }
          if (result.units === "meter") {
            result.to_meter = 1;
          }
        } else if (unit && unit.name) {
          result.units = unit.name.toLowerCase();
          if (result.units === "metre") {
            result.units = "meter";
          }
          result.to_meter = unit.conversion_factor;
        }
        return result;
      }
      function toValue(valueOrObject) {
        if (typeof valueOrObject === "object") {
          return valueOrObject.value * valueOrObject.unit.conversion_factor;
        }
        return valueOrObject;
      }
      function calculateEllipsoid(value, result) {
        if (value.ellipsoid.radius) {
          result.a = value.ellipsoid.radius;
          result.rf = 0;
        } else {
          result.a = toValue(value.ellipsoid.semi_major_axis);
          if (value.ellipsoid.inverse_flattening !== void 0) {
            result.rf = value.ellipsoid.inverse_flattening;
          } else if (value.ellipsoid.semi_major_axis !== void 0 && value.ellipsoid.semi_minor_axis !== void 0) {
            result.rf = result.a / (result.a - toValue(value.ellipsoid.semi_minor_axis));
          }
        }
      }
      function transformPROJJSON(projjson, result = {}) {
        if (!projjson || typeof projjson !== "object") {
          return projjson;
        }
        if (projjson.type === "BoundCRS") {
          transformPROJJSON(projjson.source_crs, result);
          if (projjson.transformation) {
            if (projjson.transformation.method && projjson.transformation.method.name === "NTv2") {
              result.nadgrids = projjson.transformation.parameters[0].value;
            } else {
              result.datum_params = projjson.transformation.parameters.map((param) => param.value);
            }
          }
          return result;
        }
        Object.keys(projjson).forEach((key2) => {
          const value = projjson[key2];
          if (value === null) {
            return;
          }
          switch (key2) {
            case "name":
              if (result.srsCode) {
                break;
              }
              result.name = value;
              result.srsCode = value;
              break;
            case "type":
              if (value === "GeographicCRS") {
                result.projName = "longlat";
              } else if (value === "GeodeticCRS") {
                if (projjson.coordinate_system && projjson.coordinate_system.subtype === "Cartesian") {
                  result.projName = "geocent";
                } else {
                  result.projName = "longlat";
                }
              } else if (value === "ProjectedCRS" && projjson.conversion && projjson.conversion.method) {
                result.projName = projjson.conversion.method.name;
              }
              break;
            case "datum":
            case "datum_ensemble":
              if (value.ellipsoid) {
                result.ellps = value.ellipsoid.name;
                calculateEllipsoid(value, result);
              }
              if (value.prime_meridian) {
                result.from_greenwich = value.prime_meridian.longitude * Math.PI / 180;
              }
              break;
            case "ellipsoid":
              result.ellps = value.name;
              calculateEllipsoid(value, result);
              break;
            case "prime_meridian":
              result.long0 = (value.longitude || 0) * Math.PI / 180;
              break;
            case "coordinate_system":
              if (value.axis) {
                const directionMap = {
                  "east": "e",
                  "north": "n",
                  "west": "w",
                  "south": "s",
                  "up": "u",
                  "down": "d",
                  "geocentricx": "e",
                  "geocentricy": "n",
                  "geocentricz": "u"
                };
                const mapped = value.axis.map((axis) => directionMap[axis.direction.toLowerCase()]);
                if (mapped.every(Boolean)) {
                  result.axis = mapped.join("");
                  if (result.axis.length === 2) {
                    result.axis += "u";
                  }
                }
                if (value.unit) {
                  const { units: units2, to_meter } = processUnit(value.unit);
                  result.units = units2;
                  result.to_meter = to_meter;
                } else if (value.axis[0] && value.axis[0].unit) {
                  const { units: units2, to_meter } = processUnit(value.axis[0].unit);
                  result.units = units2;
                  result.to_meter = to_meter;
                }
              }
              break;
            case "id":
              if (value.authority && value.code) {
                result.title = value.authority + ":" + value.code;
              }
              break;
            case "conversion":
              if (value.method && value.method.name) {
                result.projName = value.method.name;
              }
              if (value.parameters) {
                value.parameters.forEach((param) => {
                  const paramName = param.name.toLowerCase().replace(/\s+/g, "_");
                  const paramValue = param.value;
                  if (param.unit && param.unit.conversion_factor) {
                    result[paramName] = paramValue * param.unit.conversion_factor;
                  } else if (param.unit === "degree") {
                    result[paramName] = paramValue * Math.PI / 180;
                  } else {
                    result[paramName] = paramValue;
                  }
                });
              }
              break;
            case "unit":
              if (value.name) {
                result.units = value.name.toLowerCase();
                if (result.units === "metre") {
                  result.units = "meter";
                }
              }
              if (value.conversion_factor) {
                result.to_meter = value.conversion_factor;
              }
              break;
            case "base_crs":
              transformPROJJSON(value, result);
              result.datumCode = value.id ? value.id.authority + "_" + value.id.code : value.name;
              break;
          }
        });
        if (result.latitude_of_false_origin !== void 0) {
          result.lat0 = result.latitude_of_false_origin;
        }
        if (result.longitude_of_false_origin !== void 0) {
          result.long0 = result.longitude_of_false_origin;
        }
        if (result.latitude_of_standard_parallel !== void 0) {
          result.lat0 = result.latitude_of_standard_parallel;
          result.lat1 = result.latitude_of_standard_parallel;
        }
        if (result.latitude_of_1st_standard_parallel !== void 0) {
          result.lat1 = result.latitude_of_1st_standard_parallel;
        }
        if (result.latitude_of_2nd_standard_parallel !== void 0) {
          result.lat2 = result.latitude_of_2nd_standard_parallel;
        }
        if (result.latitude_of_projection_centre !== void 0) {
          result.lat0 = result.latitude_of_projection_centre;
        }
        if (result.longitude_of_projection_centre !== void 0) {
          result.longc = result.longitude_of_projection_centre;
        }
        if (result.easting_at_false_origin !== void 0) {
          result.x0 = result.easting_at_false_origin;
        }
        if (result.northing_at_false_origin !== void 0) {
          result.y0 = result.northing_at_false_origin;
        }
        if (result.latitude_of_natural_origin !== void 0) {
          result.lat0 = result.latitude_of_natural_origin;
        }
        if (result.longitude_of_natural_origin !== void 0) {
          result.long0 = result.longitude_of_natural_origin;
        }
        if (result.longitude_of_origin !== void 0) {
          result.long0 = result.longitude_of_origin;
        }
        if (result.false_easting !== void 0) {
          result.x0 = result.false_easting;
        }
        if (result.easting_at_projection_centre) {
          result.x0 = result.easting_at_projection_centre;
        }
        if (result.false_northing !== void 0) {
          result.y0 = result.false_northing;
        }
        if (result.northing_at_projection_centre) {
          result.y0 = result.northing_at_projection_centre;
        }
        if (result.standard_parallel_1 !== void 0) {
          result.lat1 = result.standard_parallel_1;
        }
        if (result.standard_parallel_2 !== void 0) {
          result.lat2 = result.standard_parallel_2;
        }
        if (result.scale_factor_at_natural_origin !== void 0) {
          result.k0 = result.scale_factor_at_natural_origin;
        }
        if (result.scale_factor_at_projection_centre !== void 0) {
          result.k0 = result.scale_factor_at_projection_centre;
        }
        if (result.scale_factor_on_pseudo_standard_parallel !== void 0) {
          result.k0 = result.scale_factor_on_pseudo_standard_parallel;
        }
        if (result.azimuth !== void 0) {
          result.alpha = result.azimuth;
        }
        if (result.azimuth_at_projection_centre !== void 0) {
          result.alpha = result.azimuth_at_projection_centre;
        }
        if (result.angle_from_rectified_to_skew_grid) {
          result.rectified_grid_angle = result.angle_from_rectified_to_skew_grid;
        }
        applyProjectionDefaults(result);
        return result;
      }
      var knownTypes = [
        "PROJECTEDCRS",
        "PROJCRS",
        "GEOGCS",
        "GEOCCS",
        "PROJCS",
        "LOCAL_CS",
        "GEODCRS",
        "GEODETICCRS",
        "GEODETICDATUM",
        "ENGCRS",
        "ENGINEERINGCRS"
      ];
      function rename(obj, params2) {
        var outName = params2[0];
        var inName = params2[1];
        if (!(outName in obj) && inName in obj) {
          obj[outName] = obj[inName];
          if (params2.length === 3) {
            obj[outName] = params2[2](obj[outName]);
          }
        }
      }
      function cleanWKT(wkt2) {
        var keys = Object.keys(wkt2);
        for (var i = 0, ii = keys.length; i < ii; ++i) {
          var key2 = keys[i];
          if (knownTypes.indexOf(key2) !== -1) {
            setPropertiesFromWkt(wkt2[key2]);
          }
          if (typeof wkt2[key2] === "object") {
            cleanWKT(wkt2[key2]);
          }
        }
      }
      function setPropertiesFromWkt(wkt2) {
        if (wkt2.AUTHORITY) {
          var authority = Object.keys(wkt2.AUTHORITY)[0];
          if (authority && authority in wkt2.AUTHORITY) {
            wkt2.title = authority + ":" + wkt2.AUTHORITY[authority];
          }
        }
        if (wkt2.type === "GEOGCS") {
          wkt2.projName = "longlat";
        } else if (wkt2.type === "LOCAL_CS") {
          wkt2.projName = "identity";
          wkt2.local = true;
        } else {
          if (typeof wkt2.PROJECTION === "object") {
            wkt2.projName = Object.keys(wkt2.PROJECTION)[0];
          } else {
            wkt2.projName = wkt2.PROJECTION;
          }
        }
        if (wkt2.AXIS) {
          var axisOrder = "";
          for (var i = 0, ii = wkt2.AXIS.length; i < ii; ++i) {
            var axis = [wkt2.AXIS[i][0].toLowerCase(), wkt2.AXIS[i][1].toLowerCase()];
            if (axis[0].indexOf("north") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "north") {
              axisOrder += "n";
            } else if (axis[0].indexOf("south") !== -1 || (axis[0] === "y" || axis[0] === "lat") && axis[1] === "south") {
              axisOrder += "s";
            } else if (axis[0].indexOf("east") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "east") {
              axisOrder += "e";
            } else if (axis[0].indexOf("west") !== -1 || (axis[0] === "x" || axis[0] === "lon") && axis[1] === "west") {
              axisOrder += "w";
            }
          }
          if (axisOrder.length === 2) {
            axisOrder += "u";
          }
          if (axisOrder.length === 3) {
            wkt2.axis = axisOrder;
          }
        }
        if (wkt2.UNIT) {
          wkt2.units = wkt2.UNIT.name.toLowerCase();
          if (wkt2.units === "metre") {
            wkt2.units = "meter";
          }
          if (wkt2.UNIT.convert) {
            if (wkt2.type === "GEOGCS") {
              if (wkt2.DATUM && wkt2.DATUM.SPHEROID) {
                wkt2.to_meter = wkt2.UNIT.convert * wkt2.DATUM.SPHEROID.a;
              }
            } else {
              wkt2.to_meter = wkt2.UNIT.convert;
            }
          }
        }
        var geogcs = wkt2.GEOGCS;
        if (wkt2.type === "GEOGCS") {
          geogcs = wkt2;
        }
        if (geogcs) {
          if (geogcs.PRIMEM && geogcs.PRIMEM.convert) {
            wkt2.from_greenwich = d2r(geogcs.PRIMEM.convert);
          }
          if (geogcs.DATUM) {
            wkt2.datumCode = geogcs.DATUM.name.toLowerCase();
          } else {
            wkt2.datumCode = geogcs.name.toLowerCase();
          }
          if (wkt2.datumCode.slice(0, 2) === "d_") {
            wkt2.datumCode = wkt2.datumCode.slice(2);
          }
          if (wkt2.datumCode === "new_zealand_1949") {
            wkt2.datumCode = "nzgd49";
          }
          if (wkt2.datumCode === "wgs_1984" || wkt2.datumCode === "world_geodetic_system_1984") {
            if (wkt2.PROJECTION === "Mercator_Auxiliary_Sphere") {
              wkt2.sphere = true;
            }
            wkt2.datumCode = "wgs84";
          }
          if (wkt2.datumCode === "belge_1972") {
            wkt2.datumCode = "rnb72";
          }
          if (geogcs.DATUM && geogcs.DATUM.SPHEROID) {
            wkt2.ellps = geogcs.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk");
            if (wkt2.ellps.toLowerCase().slice(0, 13) === "international") {
              wkt2.ellps = "intl";
            }
            wkt2.a = geogcs.DATUM.SPHEROID.a;
            wkt2.rf = parseFloat(geogcs.DATUM.SPHEROID.rf);
          }
          if (geogcs.DATUM && geogcs.DATUM.TOWGS84) {
            wkt2.datum_params = geogcs.DATUM.TOWGS84;
          }
          if (~wkt2.datumCode.indexOf("osgb_1936")) {
            wkt2.datumCode = "osgb36";
          }
          if (~wkt2.datumCode.indexOf("osni_1952")) {
            wkt2.datumCode = "osni52";
          }
          if (~wkt2.datumCode.indexOf("tm65") || ~wkt2.datumCode.indexOf("geodetic_datum_of_1965")) {
            wkt2.datumCode = "ire65";
          }
          if (wkt2.datumCode === "ch1903+") {
            wkt2.datumCode = "ch1903";
          }
          if (~wkt2.datumCode.indexOf("israel")) {
            wkt2.datumCode = "isr93";
          }
        }
        if (wkt2.b && !isFinite(wkt2.b)) {
          wkt2.b = wkt2.a;
        }
        if (wkt2.rectified_grid_angle) {
          wkt2.rectified_grid_angle = d2r(wkt2.rectified_grid_angle);
        }
        function toMeter(input) {
          var ratio = wkt2.to_meter || 1;
          return input * ratio;
        }
        var renamer = function(a) {
          return rename(wkt2, a);
        };
        var list = [
          ["standard_parallel_1", "Standard_Parallel_1"],
          ["standard_parallel_1", "Latitude of 1st standard parallel"],
          ["standard_parallel_2", "Standard_Parallel_2"],
          ["standard_parallel_2", "Latitude of 2nd standard parallel"],
          ["false_easting", "False_Easting"],
          ["false_easting", "False easting"],
          ["false-easting", "Easting at false origin"],
          ["false_northing", "False_Northing"],
          ["false_northing", "False northing"],
          ["false_northing", "Northing at false origin"],
          ["central_meridian", "Central_Meridian"],
          ["central_meridian", "Longitude of natural origin"],
          ["central_meridian", "Longitude of false origin"],
          ["latitude_of_origin", "Latitude_Of_Origin"],
          ["latitude_of_origin", "Central_Parallel"],
          ["latitude_of_origin", "Latitude of natural origin"],
          ["latitude_of_origin", "Latitude of false origin"],
          ["scale_factor", "Scale_Factor"],
          ["k0", "scale_factor"],
          ["latitude_of_center", "Latitude_Of_Center"],
          ["latitude_of_center", "Latitude_of_center"],
          ["lat0", "latitude_of_center", d2r],
          ["longitude_of_center", "Longitude_Of_Center"],
          ["longitude_of_center", "Longitude_of_center"],
          ["longc", "longitude_of_center", d2r],
          ["x0", "false_easting", toMeter],
          ["y0", "false_northing", toMeter],
          ["long0", "central_meridian", d2r],
          ["lat0", "latitude_of_origin", d2r],
          ["lat0", "standard_parallel_1", d2r],
          ["lat1", "standard_parallel_1", d2r],
          ["lat2", "standard_parallel_2", d2r],
          ["azimuth", "Azimuth"],
          ["alpha", "azimuth", d2r],
          ["srsCode", "name"]
        ];
        list.forEach(renamer);
        applyProjectionDefaults(wkt2);
      }
      function wkt(wkt2) {
        if (typeof wkt2 === "object") {
          return transformPROJJSON(wkt2);
        }
        const version = detectWKTVersion(wkt2);
        var lisp = parseString(wkt2);
        if (version === "WKT2") {
          const projjson = buildPROJJSON(lisp);
          return transformPROJJSON(projjson);
        }
        var type = lisp[0];
        var obj = {};
        sExpr(lisp, obj);
        cleanWKT(obj);
        return obj[type];
      }
      function defs(name) {
        var that = this;
        if (arguments.length === 2) {
          var def = arguments[1];
          if (typeof def === "string") {
            if (def.charAt(0) === "+") {
              defs[
                /** @type {string} */
                name
              ] = projStr(arguments[1]);
            } else {
              defs[
                /** @type {string} */
                name
              ] = wkt(arguments[1]);
            }
          } else if (def && typeof def === "object" && !("projName" in def)) {
            defs[
              /** @type {string} */
              name
            ] = wkt(arguments[1]);
          } else {
            defs[
              /** @type {string} */
              name
            ] = def;
            if (!def) {
              delete defs[
                /** @type {string} */
                name
              ];
            }
          }
        } else if (arguments.length === 1) {
          if (Array.isArray(name)) {
            return name.map(function(v) {
              if (Array.isArray(v)) {
                return defs.apply(that, v);
              } else {
                return defs(v);
              }
            });
          } else if (typeof name === "string") {
            if (name in defs) {
              return defs[name];
            }
          } else if ("EPSG" in name) {
            defs["EPSG:" + name.EPSG] = name;
          } else if ("ESRI" in name) {
            defs["ESRI:" + name.ESRI] = name;
          } else if ("IAU2000" in name) {
            defs["IAU2000:" + name.IAU2000] = name;
          } else {
            console.log(name);
          }
          return;
        }
      }
      globals(defs);
      function testObj(code) {
        return typeof code === "string";
      }
      function testDef(code) {
        return code in defs;
      }
      function testWKT(code) {
        return code.indexOf("+") !== 0 && code.indexOf("[") !== -1 || typeof code === "object" && !("srsCode" in code);
      }
      var codes = ["3857", "900913", "3785", "102113"];
      function checkMercator(item) {
        if (item.title) {
          return item.title.toLowerCase().indexOf("epsg:") === 0 && codes.indexOf(item.title.substr(5)) > -1;
        }
        var auth = match(item, "authority");
        if (!auth) {
          return;
        }
        var code = match(auth, "epsg");
        return code && codes.indexOf(code) > -1;
      }
      function checkProjStr(item) {
        var ext = match(item, "extension");
        if (!ext) {
          return;
        }
        return match(ext, "proj4");
      }
      function testProj(code) {
        return code[0] === "+";
      }
      function parse(code) {
        let out;
        if (testObj(code)) {
          if (testDef(code)) {
            out = defs[code];
          } else if (testWKT(code)) {
            out = wkt(code);
            var maybeProjStr = checkProjStr(out);
            if (maybeProjStr) {
              out = projStr(maybeProjStr);
            }
          } else if (testProj(code)) {
            out = projStr(code);
          }
        } else if (!("projName" in code)) {
          out = wkt(code);
        } else {
          out = code;
        }
        return out && checkMercator(out) ? defs["EPSG:3857"] : out;
      }
      function extend(destination, source) {
        destination = destination || {};
        var value, property;
        if (!source) {
          return destination;
        }
        for (property in source) {
          value = source[property];
          if (value !== void 0) {
            destination[property] = value;
          }
        }
        return destination;
      }
      function msfnz(eccent, sinphi, cosphi) {
        var con = eccent * sinphi;
        return cosphi / Math.sqrt(1 - con * con);
      }
      function sign(x) {
        return x < 0 ? -1 : 1;
      }
      function adjust_lon(x, skipAdjust) {
        if (skipAdjust) {
          return x;
        }
        return Math.abs(x) <= SPI ? x : x - sign(x) * TWO_PI;
      }
      function tsfnz(eccent, phi, sinphi) {
        var con = eccent * sinphi;
        var com = 0.5 * eccent;
        con = Math.pow((1 - con) / (1 + con), com);
        return Math.tan(0.5 * (HALF_PI - phi)) / con;
      }
      function phi2z(eccent, ts) {
        var eccnth = 0.5 * eccent;
        var con, dphi;
        var phi = HALF_PI - 2 * Math.atan(ts);
        for (var i = 0; i <= 15; i++) {
          con = eccent * Math.sin(phi);
          dphi = HALF_PI - 2 * Math.atan(ts * Math.pow((1 - con) / (1 + con), eccnth)) - phi;
          phi += dphi;
          if (Math.abs(dphi) <= 1e-10) {
            return phi;
          }
        }
        return -9999;
      }
      function init$z() {
        var con = this.b / this.a;
        this.es = 1 - con * con;
        if (!("x0" in this)) {
          this.x0 = 0;
        }
        if (!("y0" in this)) {
          this.y0 = 0;
        }
        this.long0 = this.long0 || 0;
        this.e = Math.sqrt(this.es);
        if (this.lat_ts) {
          if (this.sphere) {
            this.k0 = Math.cos(this.lat_ts);
          } else {
            this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
          }
        } else {
          if (!this.k0) {
            if (this.k) {
              this.k0 = this.k;
            } else {
              this.k0 = 1;
            }
          }
        }
      }
      function forward$x(p) {
        var lon = p.x;
        var lat = p.y;
        if (lat * R2D > 90 && lat * R2D < -90 && lon * R2D > 180 && lon * R2D < -180) {
          return null;
        }
        var x, y;
        if (Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
          return null;
        } else {
          if (this.sphere) {
            x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0, this.over);
            y = this.y0 + this.a * this.k0 * Math.log(Math.tan(FORTPI + 0.5 * lat));
          } else {
            var sinphi = Math.sin(lat);
            var ts = tsfnz(this.e, lat, sinphi);
            x = this.x0 + this.a * this.k0 * adjust_lon(lon - this.long0, this.over);
            y = this.y0 - this.a * this.k0 * Math.log(ts);
          }
          p.x = x;
          p.y = y;
          return p;
        }
      }
      function inverse$x(p) {
        var x = p.x - this.x0;
        var y = p.y - this.y0;
        var lon, lat;
        if (this.sphere) {
          lat = HALF_PI - 2 * Math.atan(Math.exp(-y / (this.a * this.k0)));
        } else {
          var ts = Math.exp(-y / (this.a * this.k0));
          lat = phi2z(this.e, ts);
          if (lat === -9999) {
            return null;
          }
        }
        lon = adjust_lon(this.long0 + x / (this.a * this.k0), this.over);
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$z = ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "Mercator_Variant_A", "merc"];
      var merc = {
        init: init$z,
        forward: forward$x,
        inverse: inverse$x,
        names: names$z
      };
      function init$y() {
      }
      function identity(pt) {
        return pt;
      }
      var names$y = ["longlat", "identity", "lonlat", "latlon", "latlong"];
      var longlat = {
        init: init$y,
        forward: identity,
        inverse: identity,
        names: names$y
      };
      var projs = [merc, longlat];
      var names$x = {};
      var projStore = [];
      function add(proj, i) {
        var len = projStore.length;
        if (!proj.names) {
          console.log(i);
          return true;
        }
        projStore[len] = proj;
        proj.names.forEach(function(n) {
          names$x[n.toLowerCase()] = len;
        });
        return this;
      }
      function getNormalizedProjName(n) {
        return n.replace(/[-\(\)\s]+/g, " ").trim().replace(/ /g, "_");
      }
      function get(name) {
        if (!name) {
          return false;
        }
        var n = name.toLowerCase();
        if (typeof names$x[n] !== "undefined" && projStore[names$x[n]]) {
          return projStore[names$x[n]];
        }
        n = getNormalizedProjName(n);
        if (n in names$x && projStore[names$x[n]]) {
          return projStore[names$x[n]];
        }
      }
      function start() {
        projs.forEach(add);
      }
      var projections = {
        start,
        add,
        get
      };
      var ellipsoids = {
        MERIT: {
          a: 6378137,
          rf: 298.257,
          ellipseName: "MERIT 1983"
        },
        SGS85: {
          a: 6378136,
          rf: 298.257,
          ellipseName: "Soviet Geodetic System 85"
        },
        GRS80: {
          a: 6378137,
          rf: 298.257222101,
          ellipseName: "GRS 1980(IUGG, 1980)"
        },
        IAU76: {
          a: 6378140,
          rf: 298.257,
          ellipseName: "IAU 1976"
        },
        airy: {
          a: 6377563396e-3,
          b: 635625691e-2,
          ellipseName: "Airy 1830"
        },
        APL4: {
          a: 6378137,
          rf: 298.25,
          ellipseName: "Appl. Physics. 1965"
        },
        NWL9D: {
          a: 6378145,
          rf: 298.25,
          ellipseName: "Naval Weapons Lab., 1965"
        },
        mod_airy: {
          a: 6377340189e-3,
          b: 6356034446e-3,
          ellipseName: "Modified Airy"
        },
        andrae: {
          a: 637710443e-2,
          rf: 300,
          ellipseName: "Andrae 1876 (Den., Iclnd.)"
        },
        aust_SA: {
          a: 6378160,
          rf: 298.25,
          ellipseName: "Australian Natl & S. Amer. 1969"
        },
        GRS67: {
          a: 6378160,
          rf: 298.247167427,
          ellipseName: "GRS 67(IUGG 1967)"
        },
        bessel: {
          a: 6377397155e-3,
          rf: 299.1528128,
          ellipseName: "Bessel 1841"
        },
        bess_nam: {
          a: 6377483865e-3,
          rf: 299.1528128,
          ellipseName: "Bessel 1841 (Namibia)"
        },
        clrk66: {
          a: 63782064e-1,
          b: 63565838e-1,
          ellipseName: "Clarke 1866"
        },
        clrk80: {
          a: 6378249145e-3,
          rf: 293.4663,
          ellipseName: "Clarke 1880 mod."
        },
        clrk80ign: {
          a: 63782492e-1,
          b: 6356515,
          rf: 293.4660213,
          ellipseName: "Clarke 1880 (IGN)"
        },
        clrk58: {
          a: 6378293645208759e-9,
          rf: 294.2606763692654,
          ellipseName: "Clarke 1858"
        },
        CPM: {
          a: 63757387e-1,
          rf: 334.29,
          ellipseName: "Comm. des Poids et Mesures 1799"
        },
        delmbr: {
          a: 6376428,
          rf: 311.5,
          ellipseName: "Delambre 1810 (Belgium)"
        },
        engelis: {
          a: 637813605e-2,
          rf: 298.2566,
          ellipseName: "Engelis 1985"
        },
        evrst30: {
          a: 6377276345e-3,
          rf: 300.8017,
          ellipseName: "Everest 1830"
        },
        evrst48: {
          a: 6377304063e-3,
          rf: 300.8017,
          ellipseName: "Everest 1948"
        },
        evrst56: {
          a: 6377301243e-3,
          rf: 300.8017,
          ellipseName: "Everest 1956"
        },
        evrst69: {
          a: 6377295664e-3,
          rf: 300.8017,
          ellipseName: "Everest 1969"
        },
        evrstSS: {
          a: 6377298556e-3,
          rf: 300.8017,
          ellipseName: "Everest (Sabah & Sarawak)"
        },
        fschr60: {
          a: 6378166,
          rf: 298.3,
          ellipseName: "Fischer (Mercury Datum) 1960"
        },
        fschr60m: {
          a: 6378155,
          rf: 298.3,
          ellipseName: "Fischer 1960"
        },
        fschr68: {
          a: 6378150,
          rf: 298.3,
          ellipseName: "Fischer 1968"
        },
        helmert: {
          a: 6378200,
          rf: 298.3,
          ellipseName: "Helmert 1906"
        },
        hough: {
          a: 6378270,
          rf: 297,
          ellipseName: "Hough"
        },
        intl: {
          a: 6378388,
          rf: 297,
          ellipseName: "International 1909 (Hayford)"
        },
        kaula: {
          a: 6378163,
          rf: 298.24,
          ellipseName: "Kaula 1961"
        },
        lerch: {
          a: 6378139,
          rf: 298.257,
          ellipseName: "Lerch 1979"
        },
        mprts: {
          a: 6397300,
          rf: 191,
          ellipseName: "Maupertius 1738"
        },
        new_intl: {
          a: 63781575e-1,
          b: 63567722e-1,
          ellipseName: "New International 1967"
        },
        plessis: {
          a: 6376523,
          b: 6355863,
          ellipseName: "Plessis 1817 (France)"
        },
        krass: {
          a: 6378245,
          rf: 298.3,
          ellipseName: "Krassovsky, 1942"
        },
        SEasia: {
          a: 6378155,
          b: 63567733205e-4,
          ellipseName: "Southeast Asia"
        },
        walbeck: {
          a: 6376896,
          b: 63558348467e-4,
          ellipseName: "Walbeck"
        },
        WGS60: {
          a: 6378165,
          rf: 298.3,
          ellipseName: "WGS 60"
        },
        WGS66: {
          a: 6378145,
          rf: 298.25,
          ellipseName: "WGS 66"
        },
        WGS7: {
          a: 6378135,
          rf: 298.26,
          ellipseName: "WGS 72"
        },
        WGS84: {
          a: 6378137,
          rf: 298.257223563,
          ellipseName: "WGS 84"
        },
        sphere: {
          a: 6370997,
          b: 6370997,
          ellipseName: "Normal Sphere (r=6370997)"
        }
      };
      const WGS84 = ellipsoids.WGS84;
      function eccentricity(a, b, rf, R_A) {
        var a2 = a * a;
        var b2 = b * b;
        var es = (a2 - b2) / a2;
        var e = 0;
        if (R_A) {
          a *= 1 - es * (SIXTH + es * (RA4 + es * RA6));
          a2 = a * a;
          es = 0;
        } else {
          e = Math.sqrt(es);
        }
        var ep2 = (a2 - b2) / b2;
        return {
          es,
          e,
          ep2
        };
      }
      function sphere(a, b, rf, ellps, sphere2) {
        if (!a) {
          var ellipse = match(ellipsoids, ellps);
          if (!ellipse) {
            ellipse = WGS84;
          }
          a = ellipse.a;
          b = ellipse.b;
          rf = ellipse.rf;
        }
        if (rf && !b) {
          b = (1 - 1 / rf) * a;
        }
        if (rf === 0 || Math.abs(a - b) < EPSLN) {
          sphere2 = true;
          b = a;
        }
        return {
          a,
          b,
          rf,
          sphere: sphere2
        };
      }
      var datums = {
        wgs84: {
          towgs84: "0,0,0",
          ellipse: "WGS84",
          datumName: "WGS84"
        },
        ch1903: {
          towgs84: "674.374,15.056,405.346",
          ellipse: "bessel",
          datumName: "swiss"
        },
        ggrs87: {
          towgs84: "-199.87,74.79,246.62",
          ellipse: "GRS80",
          datumName: "Greek_Geodetic_Reference_System_1987"
        },
        nad83: {
          towgs84: "0,0,0",
          ellipse: "GRS80",
          datumName: "North_American_Datum_1983"
        },
        nad27: {
          nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat",
          ellipse: "clrk66",
          datumName: "North_American_Datum_1927"
        },
        potsdam: {
          towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7",
          ellipse: "bessel",
          datumName: "Potsdam Rauenberg 1950 DHDN"
        },
        carthage: {
          towgs84: "-263.0,6.0,431.0",
          ellipse: "clrk80ign",
          datumName: "Carthage 1934 Tunisia"
        },
        hermannskogel: {
          towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
          ellipse: "bessel",
          datumName: "Hermannskogel"
        },
        mgi: {
          towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232",
          ellipse: "bessel",
          datumName: "Militar-Geographische Institut"
        },
        osni52: {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "airy",
          datumName: "Irish National"
        },
        ire65: {
          towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15",
          ellipse: "mod_airy",
          datumName: "Ireland 1965"
        },
        rassadiran: {
          towgs84: "-133.63,-157.5,-158.62",
          ellipse: "intl",
          datumName: "Rassadiran"
        },
        nzgd49: {
          towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993",
          ellipse: "intl",
          datumName: "New Zealand Geodetic Datum 1949"
        },
        osgb36: {
          towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894",
          ellipse: "airy",
          datumName: "Ordnance Survey of Great Britain 1936"
        },
        s_jtsk: {
          towgs84: "589,76,480",
          ellipse: "bessel",
          datumName: "S-JTSK (Ferro)"
        },
        beduaram: {
          towgs84: "-106,-87,188",
          ellipse: "clrk80",
          datumName: "Beduaram"
        },
        gunung_segara: {
          towgs84: "-403,684,41",
          ellipse: "bessel",
          datumName: "Gunung Segara Jakarta"
        },
        rnb72: {
          towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1",
          ellipse: "intl",
          datumName: "Reseau National Belge 1972"
        },
        EPSG_5451: {
          towgs84: "6.41,-49.05,-11.28,1.5657,0.5242,6.9718,-5.7649"
        },
        IGNF_LURESG: {
          towgs84: "-192.986,13.673,-39.309,-0.4099,-2.9332,2.6881,0.43"
        },
        EPSG_4614: {
          towgs84: "-119.4248,-303.65872,-11.00061,1.164298,0.174458,1.096259,3.657065"
        },
        EPSG_4615: {
          towgs84: "-494.088,-312.129,279.877,-1.423,-1.013,1.59,-0.748"
        },
        ESRI_37241: {
          towgs84: "-76.822,257.457,-12.817,2.136,-0.033,-2.392,-0.031"
        },
        ESRI_37249: {
          towgs84: "-440.296,58.548,296.265,1.128,10.202,4.559,-0.438"
        },
        ESRI_37245: {
          towgs84: "-511.151,-181.269,139.609,1.05,2.703,1.798,3.071"
        },
        EPSG_4178: {
          towgs84: "24.9,-126.4,-93.2,-0.063,-0.247,-0.041,1.01"
        },
        EPSG_4622: {
          towgs84: "-472.29,-5.63,-304.12,0.4362,-0.8374,0.2563,1.8984"
        },
        EPSG_4625: {
          towgs84: "126.93,547.94,130.41,-2.7867,5.1612,-0.8584,13.8227"
        },
        EPSG_5252: {
          towgs84: "0.023,0.036,-0.068,0.00176,0.00912,-0.01136,0.00439"
        },
        EPSG_4314: {
          towgs84: "597.1,71.4,412.1,0.894,0.068,-1.563,7.58"
        },
        EPSG_4282: {
          towgs84: "-178.3,-316.7,-131.5,5.278,6.077,10.979,19.166"
        },
        EPSG_4231: {
          towgs84: "-83.11,-97.38,-117.22,0.005693,-0.044698,0.044285,0.1218"
        },
        EPSG_4274: {
          towgs84: "-230.994,102.591,25.199,0.633,-0.239,0.9,1.95"
        },
        EPSG_4134: {
          towgs84: "-180.624,-225.516,173.919,-0.81,-1.898,8.336,16.71006"
        },
        EPSG_4254: {
          towgs84: "18.38,192.45,96.82,0.056,-0.142,-0.2,-0.0013"
        },
        EPSG_4159: {
          towgs84: "-194.513,-63.978,-25.759,-3.4027,3.756,-3.352,-0.9175"
        },
        EPSG_4687: {
          towgs84: "0.072,-0.507,-0.245,0.0183,-0.0003,0.007,-0.0093"
        },
        EPSG_4227: {
          towgs84: "-83.58,-397.54,458.78,-17.595,-2.847,4.256,3.225"
        },
        EPSG_4746: {
          towgs84: "599.4,72.4,419.2,-0.062,-0.022,-2.723,6.46"
        },
        EPSG_4745: {
          towgs84: "612.4,77,440.2,-0.054,0.057,-2.797,2.55"
        },
        EPSG_6311: {
          towgs84: "8.846,-4.394,-1.122,-0.00237,-0.146528,0.130428,0.783926"
        },
        EPSG_4289: {
          towgs84: "565.7381,50.4018,465.2904,-0.395026,0.330772,-1.876073,4.07244"
        },
        EPSG_4230: {
          towgs84: "-68.863,-134.888,-111.49,-0.53,-0.14,0.57,-3.4"
        },
        EPSG_4154: {
          towgs84: "-123.02,-158.95,-168.47"
        },
        EPSG_4156: {
          towgs84: "570.8,85.7,462.8,4.998,1.587,5.261,3.56"
        },
        EPSG_4299: {
          towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
        },
        EPSG_4179: {
          towgs84: "33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84"
        },
        EPSG_4313: {
          towgs84: "-106.8686,52.2978,-103.7239,0.3366,-0.457,1.8422,-1.2747"
        },
        EPSG_4194: {
          towgs84: "163.511,127.533,-159.789"
        },
        EPSG_4195: {
          towgs84: "105,326,-102.5"
        },
        EPSG_4196: {
          towgs84: "-45,417,-3.5"
        },
        EPSG_4611: {
          towgs84: "-162.619,-276.959,-161.764,0.067753,-2.243648,-1.158828,-1.094246"
        },
        EPSG_4633: {
          towgs84: "137.092,131.66,91.475,-1.9436,-11.5993,-4.3321,-7.4824"
        },
        EPSG_4641: {
          towgs84: "-408.809,366.856,-412.987,1.8842,-0.5308,2.1655,-121.0993"
        },
        EPSG_4643: {
          towgs84: "-480.26,-438.32,-643.429,16.3119,20.1721,-4.0349,-111.7002"
        },
        EPSG_4300: {
          towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
        },
        EPSG_4188: {
          towgs84: "482.5,-130.6,564.6,-1.042,-0.214,-0.631,8.15"
        },
        EPSG_4660: {
          towgs84: "982.6087,552.753,-540.873,6.681627,-31.611492,-19.848161,16.805"
        },
        EPSG_4662: {
          towgs84: "97.295,-263.247,310.882,-1.5999,0.8386,3.1409,13.3259"
        },
        EPSG_3906: {
          towgs84: "577.88891,165.22205,391.18289,4.9145,-0.94729,-13.05098,7.78664"
        },
        EPSG_4307: {
          towgs84: "-209.3622,-87.8162,404.6198,0.0046,3.4784,0.5805,-1.4547"
        },
        EPSG_6892: {
          towgs84: "-76.269,-16.683,68.562,-6.275,10.536,-4.286,-13.686"
        },
        EPSG_4690: {
          towgs84: "221.597,152.441,176.523,2.403,1.3893,0.884,11.4648"
        },
        EPSG_4691: {
          towgs84: "218.769,150.75,176.75,3.5231,2.0037,1.288,10.9817"
        },
        EPSG_4629: {
          towgs84: "72.51,345.411,79.241,-1.5862,-0.8826,-0.5495,1.3653"
        },
        EPSG_4630: {
          towgs84: "165.804,216.213,180.26,-0.6251,-0.4515,-0.0721,7.4111"
        },
        EPSG_4692: {
          towgs84: "217.109,86.452,23.711,0.0183,-0.0003,0.007,-0.0093"
        },
        EPSG_9333: {
          towgs84: "0,0,0,-0.008393,0.000749,-0.010276,0"
        },
        EPSG_9059: {
          towgs84: "0,0,0"
        },
        EPSG_4312: {
          towgs84: "601.705,84.263,485.227,4.7354,1.3145,5.393,-2.3887"
        },
        EPSG_4123: {
          towgs84: "-96.062,-82.428,-121.753,4.801,0.345,-1.376,1.496"
        },
        EPSG_4309: {
          towgs84: "-124.45,183.74,44.64,-0.4384,0.5446,-0.9706,-2.1365"
        },
        ESRI_104106: {
          towgs84: "-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058"
        },
        EPSG_4281: {
          towgs84: "-219.247,-73.802,269.529"
        },
        EPSG_4322: {
          towgs84: "0,0,4.5"
        },
        EPSG_4324: {
          towgs84: "0,0,1.9"
        },
        EPSG_4284: {
          towgs84: "43.822,-108.842,-119.585,1.455,-0.761,0.737,0.549"
        },
        EPSG_4277: {
          towgs84: "446.448,-125.157,542.06,0.15,0.247,0.842,-20.489"
        },
        EPSG_4207: {
          towgs84: "-282.1,-72.2,120,-1.529,0.145,-0.89,-4.46"
        },
        EPSG_4688: {
          towgs84: "347.175,1077.618,2623.677,33.9058,-70.6776,9.4013,186.0647"
        },
        EPSG_4689: {
          towgs84: "410.793,54.542,80.501,-2.5596,-2.3517,-0.6594,17.3218"
        },
        EPSG_4720: {
          towgs84: "0,0,4.5"
        },
        EPSG_4273: {
          towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
        },
        EPSG_4240: {
          towgs84: "204.64,834.74,293.8"
        },
        EPSG_4817: {
          towgs84: "278.3,93,474.5,7.889,0.05,-6.61,6.21"
        },
        ESRI_104131: {
          towgs84: "426.62,142.62,460.09,4.98,4.49,-12.42,-17.1"
        },
        EPSG_4265: {
          towgs84: "-104.1,-49.1,-9.9,0.971,-2.917,0.714,-11.68"
        },
        EPSG_4263: {
          towgs84: "-111.92,-87.85,114.5,1.875,0.202,0.219,0.032"
        },
        EPSG_4298: {
          towgs84: "-689.5937,623.84046,-65.93566,-0.02331,1.17094,-0.80054,5.88536"
        },
        EPSG_4270: {
          towgs84: "-253.4392,-148.452,386.5267,0.15605,0.43,-0.1013,-0.0424"
        },
        EPSG_4229: {
          towgs84: "-121.8,98.1,-10.7"
        },
        EPSG_4220: {
          towgs84: "-55.5,-348,-229.2"
        },
        EPSG_4214: {
          towgs84: "12.646,-155.176,-80.863"
        },
        EPSG_4232: {
          towgs84: "-345,3,223"
        },
        EPSG_4238: {
          towgs84: "-1.977,-13.06,-9.993,0.364,0.254,0.689,-1.037"
        },
        EPSG_4168: {
          towgs84: "-170,33,326"
        },
        EPSG_4131: {
          towgs84: "199,931,318.9"
        },
        EPSG_4152: {
          towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
        },
        EPSG_5228: {
          towgs84: "572.213,85.334,461.94,4.9732,1.529,5.2484,3.5378"
        },
        EPSG_8351: {
          towgs84: "485.021,169.465,483.839,7.786342,4.397554,4.102655,0"
        },
        EPSG_4683: {
          towgs84: "-127.62,-67.24,-47.04,-3.068,4.903,1.578,-1.06"
        },
        EPSG_4133: {
          towgs84: "0,0,0"
        },
        EPSG_7373: {
          towgs84: "0.819,-0.5762,-1.6446,-0.00378,-0.03317,0.00318,0.0693"
        },
        EPSG_9075: {
          towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
        },
        EPSG_9072: {
          towgs84: "-0.9102,2.0141,0.5602,0.029039,0.010065,0.010101,0"
        },
        EPSG_9294: {
          towgs84: "1.16835,-1.42001,-2.24431,-0.00822,-0.05508,0.01818,0.23388"
        },
        EPSG_4212: {
          towgs84: "-267.434,173.496,181.814,-13.4704,8.7154,7.3926,14.7492"
        },
        EPSG_4191: {
          towgs84: "-44.183,-0.58,-38.489,2.3867,2.7072,-3.5196,-8.2703"
        },
        EPSG_4237: {
          towgs84: "52.684,-71.194,-13.975,-0.312,-0.1063,-0.3729,1.0191"
        },
        EPSG_4740: {
          towgs84: "-1.08,-0.27,-0.9"
        },
        EPSG_4124: {
          towgs84: "419.3836,99.3335,591.3451,0.850389,1.817277,-7.862238,-0.99496"
        },
        EPSG_5681: {
          towgs84: "584.9636,107.7175,413.8067,1.1155,0.2824,-3.1384,7.9922"
        },
        EPSG_4141: {
          towgs84: "23.772,17.49,17.859,-0.3132,-1.85274,1.67299,-5.4262"
        },
        EPSG_4204: {
          towgs84: "-85.645,-273.077,-79.708,2.289,-1.421,2.532,3.194"
        },
        EPSG_4319: {
          towgs84: "226.702,-193.337,-35.371,-2.229,-4.391,9.238,0.9798"
        },
        EPSG_4200: {
          towgs84: "24.82,-131.21,-82.66"
        },
        EPSG_4130: {
          towgs84: "0,0,0"
        },
        EPSG_4127: {
          towgs84: "-82.875,-57.097,-156.768,-2.158,1.524,-0.982,-0.359"
        },
        EPSG_4149: {
          towgs84: "674.374,15.056,405.346"
        },
        EPSG_4617: {
          towgs84: "-0.991,1.9072,0.5129,0.02579,0.00965,0.01166,0"
        },
        EPSG_4663: {
          towgs84: "-210.502,-66.902,-48.476,2.094,-15.067,-5.817,0.485"
        },
        EPSG_4664: {
          towgs84: "-211.939,137.626,58.3,-0.089,0.251,0.079,0.384"
        },
        EPSG_4665: {
          towgs84: "-105.854,165.589,-38.312,-0.003,-0.026,0.024,-0.048"
        },
        EPSG_4666: {
          towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
        },
        EPSG_4756: {
          towgs84: "-192.873,-39.382,-111.202,-0.00205,-0.0005,0.00335,0.0188"
        },
        EPSG_4723: {
          towgs84: "-179.483,-69.379,-27.584,-7.862,8.163,6.042,-13.925"
        },
        EPSG_4726: {
          towgs84: "8.853,-52.644,180.304,-0.393,-2.323,2.96,-24.081"
        },
        EPSG_4267: {
          towgs84: "-8.0,160.0,176.0"
        },
        EPSG_5365: {
          towgs84: "-0.16959,0.35312,0.51846,0.03385,-0.16325,0.03446,0.03693"
        },
        EPSG_4218: {
          towgs84: "304.5,306.5,-318.1"
        },
        EPSG_4242: {
          towgs84: "-33.722,153.789,94.959,-8.581,-4.478,4.54,8.95"
        },
        EPSG_4216: {
          towgs84: "-292.295,248.758,429.447,4.9971,2.99,6.6906,1.0289"
        },
        ESRI_104105: {
          towgs84: "631.392,-66.551,481.442,1.09,-4.445,-4.487,-4.43"
        },
        ESRI_104129: {
          towgs84: "0,0,0"
        },
        EPSG_4673: {
          towgs84: "174.05,-25.49,112.57"
        },
        EPSG_4202: {
          towgs84: "-124,-60,154"
        },
        EPSG_4203: {
          towgs84: "-117.763,-51.51,139.061,0.292,0.443,0.277,-0.191"
        },
        EPSG_3819: {
          towgs84: "595.48,121.69,515.35,4.115,-2.9383,0.853,-3.408"
        },
        EPSG_8694: {
          towgs84: "-93.799,-132.737,-219.073,-1.844,0.648,-6.37,-0.169"
        },
        EPSG_4145: {
          towgs84: "275.57,676.78,229.6"
        },
        EPSG_4283: {
          towgs84: "0.06155,-0.01087,-0.04019,0.039492,0.032722,0.032898,-0.009994"
        },
        EPSG_4317: {
          towgs84: "2.3287,-147.0425,-92.0802,-0.309248,0.324822,0.497299,5.689063"
        },
        EPSG_4272: {
          towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993"
        },
        EPSG_4248: {
          towgs84: "-307.7,265.3,-363.5"
        },
        EPSG_5561: {
          towgs84: "24,-121,-76"
        },
        EPSG_5233: {
          towgs84: "-0.293,766.95,87.713,0.195704,1.695068,3.473016,-0.039338"
        },
        ESRI_104130: {
          towgs84: "-86,-98,-119"
        },
        ESRI_104102: {
          towgs84: "682,-203,480"
        },
        ESRI_37207: {
          towgs84: "7,-10,-26"
        },
        EPSG_4675: {
          towgs84: "59.935,118.4,-10.871"
        },
        ESRI_104109: {
          towgs84: "-89.121,-348.182,260.871"
        },
        ESRI_104112: {
          towgs84: "-185.583,-230.096,281.361"
        },
        ESRI_104113: {
          towgs84: "25.1,-275.6,222.6"
        },
        IGNF_WGS72G: {
          towgs84: "0,12,6"
        },
        IGNF_NTFG: {
          towgs84: "-168,-60,320"
        },
        IGNF_EFATE57G: {
          towgs84: "-127,-769,472"
        },
        IGNF_PGP50G: {
          towgs84: "324.8,153.6,172.1"
        },
        IGNF_REUN47G: {
          towgs84: "94,-948,-1262"
        },
        IGNF_CSG67G: {
          towgs84: "-186,230,110"
        },
        IGNF_GUAD48G: {
          towgs84: "-467,-16,-300"
        },
        IGNF_TAHI51G: {
          towgs84: "162,117,154"
        },
        IGNF_TAHAAG: {
          towgs84: "65,342,77"
        },
        IGNF_NUKU72G: {
          towgs84: "84,274,65"
        },
        IGNF_PETRELS72G: {
          towgs84: "365,194,166"
        },
        IGNF_WALL78G: {
          towgs84: "253,-133,-127"
        },
        IGNF_MAYO50G: {
          towgs84: "-382,-59,-262"
        },
        IGNF_TANNAG: {
          towgs84: "-139,-967,436"
        },
        IGNF_IGN72G: {
          towgs84: "-13,-348,292"
        },
        IGNF_ATIGG: {
          towgs84: "1118,23,66"
        },
        IGNF_FANGA84G: {
          towgs84: "150.57,158.33,118.32"
        },
        IGNF_RUSAT84G: {
          towgs84: "202.13,174.6,-15.74"
        },
        IGNF_KAUE70G: {
          towgs84: "126.74,300.1,-75.49"
        },
        IGNF_MOP90G: {
          towgs84: "-10.8,-1.8,12.77"
        },
        IGNF_MHPF67G: {
          towgs84: "338.08,212.58,-296.17"
        },
        IGNF_TAHI79G: {
          towgs84: "160.61,116.05,153.69"
        },
        IGNF_ANAA92G: {
          towgs84: "1.5,3.84,4.81"
        },
        IGNF_MARQUI72G: {
          towgs84: "330.91,-13.92,58.56"
        },
        IGNF_APAT86G: {
          towgs84: "143.6,197.82,74.05"
        },
        IGNF_TUBU69G: {
          towgs84: "237.17,171.61,-77.84"
        },
        IGNF_STPM50G: {
          towgs84: "11.363,424.148,373.13"
        },
        EPSG_4150: {
          towgs84: "674.374,15.056,405.346"
        },
        EPSG_4754: {
          towgs84: "-208.4058,-109.8777,-2.5764"
        },
        ESRI_104101: {
          towgs84: "372.87,149.23,585.29"
        },
        EPSG_4693: {
          towgs84: "0,-0.15,0.68"
        },
        EPSG_6207: {
          towgs84: "293.17,726.18,245.36"
        },
        EPSG_4153: {
          towgs84: "-133.63,-157.5,-158.62"
        },
        EPSG_4132: {
          towgs84: "-241.54,-163.64,396.06"
        },
        EPSG_4221: {
          towgs84: "-154.5,150.7,100.4"
        },
        EPSG_4266: {
          towgs84: "-80.7,-132.5,41.1"
        },
        EPSG_4193: {
          towgs84: "-70.9,-151.8,-41.4"
        },
        EPSG_5340: {
          towgs84: "-0.41,0.46,-0.35"
        },
        EPSG_4246: {
          towgs84: "-294.7,-200.1,525.5"
        },
        EPSG_4318: {
          towgs84: "-3.2,-5.7,2.8"
        },
        EPSG_4121: {
          towgs84: "-199.87,74.79,246.62"
        },
        EPSG_4223: {
          towgs84: "-260.1,5.5,432.2"
        },
        EPSG_4158: {
          towgs84: "-0.465,372.095,171.736"
        },
        EPSG_4285: {
          towgs84: "-128.16,-282.42,21.93"
        },
        EPSG_4613: {
          towgs84: "-404.78,685.68,45.47"
        },
        EPSG_4607: {
          towgs84: "195.671,332.517,274.607"
        },
        EPSG_4475: {
          towgs84: "-381.788,-57.501,-256.673"
        },
        EPSG_4208: {
          towgs84: "-157.84,308.54,-146.6"
        },
        EPSG_4743: {
          towgs84: "70.995,-335.916,262.898"
        },
        EPSG_4710: {
          towgs84: "-323.65,551.39,-491.22"
        },
        EPSG_7881: {
          towgs84: "-0.077,0.079,0.086"
        },
        EPSG_4682: {
          towgs84: "283.729,735.942,261.143"
        },
        EPSG_4739: {
          towgs84: "-156,-271,-189"
        },
        EPSG_4679: {
          towgs84: "-80.01,253.26,291.19"
        },
        EPSG_4750: {
          towgs84: "-56.263,16.136,-22.856"
        },
        EPSG_4644: {
          towgs84: "-10.18,-350.43,291.37"
        },
        EPSG_4695: {
          towgs84: "-103.746,-9.614,-255.95"
        },
        EPSG_4292: {
          towgs84: "-355,21,72"
        },
        EPSG_4302: {
          towgs84: "-61.702,284.488,472.052"
        },
        EPSG_4143: {
          towgs84: "-124.76,53,466.79"
        },
        EPSG_4606: {
          towgs84: "-153,153,307"
        },
        EPSG_4699: {
          towgs84: "-770.1,158.4,-498.2"
        },
        EPSG_4247: {
          towgs84: "-273.5,110.6,-357.9"
        },
        EPSG_4160: {
          towgs84: "8.88,184.86,106.69"
        },
        EPSG_4161: {
          towgs84: "-233.43,6.65,173.64"
        },
        EPSG_9251: {
          towgs84: "-9.5,122.9,138.2"
        },
        EPSG_9253: {
          towgs84: "-78.1,101.6,133.3"
        },
        EPSG_4297: {
          towgs84: "-198.383,-240.517,-107.909"
        },
        EPSG_4269: {
          towgs84: "0,0,0"
        },
        EPSG_4301: {
          towgs84: "-147,506,687"
        },
        EPSG_4618: {
          towgs84: "-59,-11,-52"
        },
        EPSG_4612: {
          towgs84: "0,0,0"
        },
        EPSG_4678: {
          towgs84: "44.585,-131.212,-39.544"
        },
        EPSG_4250: {
          towgs84: "-130,29,364"
        },
        EPSG_4144: {
          towgs84: "214,804,268"
        },
        EPSG_4147: {
          towgs84: "-17.51,-108.32,-62.39"
        },
        EPSG_4259: {
          towgs84: "-254.1,-5.36,-100.29"
        },
        EPSG_4164: {
          towgs84: "-76,-138,67"
        },
        EPSG_4211: {
          towgs84: "-378.873,676.002,-46.255"
        },
        EPSG_4182: {
          towgs84: "-422.651,-172.995,84.02"
        },
        EPSG_4224: {
          towgs84: "-143.87,243.37,-33.52"
        },
        EPSG_4225: {
          towgs84: "-205.57,168.77,-4.12"
        },
        EPSG_5527: {
          towgs84: "-67.35,3.88,-38.22"
        },
        EPSG_4752: {
          towgs84: "98,390,-22"
        },
        EPSG_4310: {
          towgs84: "-30,190,89"
        },
        EPSG_9248: {
          towgs84: "-192.26,65.72,132.08"
        },
        EPSG_4680: {
          towgs84: "124.5,-63.5,-281"
        },
        EPSG_4701: {
          towgs84: "-79.9,-158,-168.9"
        },
        EPSG_4706: {
          towgs84: "-146.21,112.63,4.05"
        },
        EPSG_4805: {
          towgs84: "682,-203,480"
        },
        EPSG_4201: {
          towgs84: "-165,-11,206"
        },
        EPSG_4210: {
          towgs84: "-157,-2,-299"
        },
        EPSG_4183: {
          towgs84: "-104,167,-38"
        },
        EPSG_4139: {
          towgs84: "11,72,-101"
        },
        EPSG_4668: {
          towgs84: "-86,-98,-119"
        },
        EPSG_4717: {
          towgs84: "-2,151,181"
        },
        EPSG_4732: {
          towgs84: "102,52,-38"
        },
        EPSG_4280: {
          towgs84: "-377,681,-50"
        },
        EPSG_4209: {
          towgs84: "-138,-105,-289"
        },
        EPSG_4261: {
          towgs84: "31,146,47"
        },
        EPSG_4658: {
          towgs84: "-73,46,-86"
        },
        EPSG_4721: {
          towgs84: "265.025,384.929,-194.046"
        },
        EPSG_4222: {
          towgs84: "-136,-108,-292"
        },
        EPSG_4601: {
          towgs84: "-255,-15,71"
        },
        EPSG_4602: {
          towgs84: "725,685,536"
        },
        EPSG_4603: {
          towgs84: "72,213.7,93"
        },
        EPSG_4605: {
          towgs84: "9,183,236"
        },
        EPSG_4621: {
          towgs84: "137,248,-430"
        },
        EPSG_4657: {
          towgs84: "-28,199,5"
        },
        EPSG_4316: {
          towgs84: "103.25,-100.4,-307.19"
        },
        EPSG_4642: {
          towgs84: "-13,-348,292"
        },
        EPSG_4698: {
          towgs84: "145,-187,103"
        },
        EPSG_4192: {
          towgs84: "-206.1,-174.7,-87.7"
        },
        EPSG_4311: {
          towgs84: "-265,120,-358"
        },
        EPSG_4135: {
          towgs84: "58,-283,-182"
        },
        ESRI_104138: {
          towgs84: "198,-226,-347"
        },
        EPSG_4245: {
          towgs84: "-11,851,5"
        },
        EPSG_4142: {
          towgs84: "-125,53,467"
        },
        EPSG_4213: {
          towgs84: "-106,-87,188"
        },
        EPSG_4253: {
          towgs84: "-133,-77,-51"
        },
        EPSG_4129: {
          towgs84: "-132,-110,-335"
        },
        EPSG_4713: {
          towgs84: "-77,-128,142"
        },
        EPSG_4239: {
          towgs84: "217,823,299"
        },
        EPSG_4146: {
          towgs84: "295,736,257"
        },
        EPSG_4155: {
          towgs84: "-83,37,124"
        },
        EPSG_4165: {
          towgs84: "-173,253,27"
        },
        EPSG_4672: {
          towgs84: "175,-38,113"
        },
        EPSG_4236: {
          towgs84: "-637,-549,-203"
        },
        EPSG_4251: {
          towgs84: "-90,40,88"
        },
        EPSG_4271: {
          towgs84: "-2,374,172"
        },
        EPSG_4175: {
          towgs84: "-88,4,101"
        },
        EPSG_4716: {
          towgs84: "298,-304,-375"
        },
        EPSG_4315: {
          towgs84: "-23,259,-9"
        },
        EPSG_4744: {
          towgs84: "-242.2,-144.9,370.3"
        },
        EPSG_4244: {
          towgs84: "-97,787,86"
        },
        EPSG_4293: {
          towgs84: "616,97,-251"
        },
        EPSG_4714: {
          towgs84: "-127,-769,472"
        },
        EPSG_4736: {
          towgs84: "260,12,-147"
        },
        EPSG_6883: {
          towgs84: "-235,-110,393"
        },
        EPSG_6894: {
          towgs84: "-63,176,185"
        },
        EPSG_4205: {
          towgs84: "-43,-163,45"
        },
        EPSG_4256: {
          towgs84: "41,-220,-134"
        },
        EPSG_4262: {
          towgs84: "639,405,60"
        },
        EPSG_4604: {
          towgs84: "174,359,365"
        },
        EPSG_4169: {
          towgs84: "-115,118,426"
        },
        EPSG_4620: {
          towgs84: "-106,-129,165"
        },
        EPSG_4184: {
          towgs84: "-203,141,53"
        },
        EPSG_4616: {
          towgs84: "-289,-124,60"
        },
        EPSG_9403: {
          towgs84: "-307,-92,127"
        },
        EPSG_4684: {
          towgs84: "-133,-321,50"
        },
        EPSG_4708: {
          towgs84: "-491,-22,435"
        },
        EPSG_4707: {
          towgs84: "114,-116,-333"
        },
        EPSG_4709: {
          towgs84: "145,75,-272"
        },
        EPSG_4712: {
          towgs84: "-205,107,53"
        },
        EPSG_4711: {
          towgs84: "124,-234,-25"
        },
        EPSG_4718: {
          towgs84: "230,-199,-752"
        },
        EPSG_4719: {
          towgs84: "211,147,111"
        },
        EPSG_4724: {
          towgs84: "208,-435,-229"
        },
        EPSG_4725: {
          towgs84: "189,-79,-202"
        },
        EPSG_4735: {
          towgs84: "647,1777,-1124"
        },
        EPSG_4722: {
          towgs84: "-794,119,-298"
        },
        EPSG_4728: {
          towgs84: "-307,-92,127"
        },
        EPSG_4734: {
          towgs84: "-632,438,-609"
        },
        EPSG_4727: {
          towgs84: "912,-58,1227"
        },
        EPSG_4729: {
          towgs84: "185,165,42"
        },
        EPSG_4730: {
          towgs84: "170,42,84"
        },
        EPSG_4733: {
          towgs84: "276,-57,149"
        },
        ESRI_37218: {
          towgs84: "230,-199,-752"
        },
        ESRI_37240: {
          towgs84: "-7,215,225"
        },
        ESRI_37221: {
          towgs84: "252,-209,-751"
        },
        ESRI_4305: {
          towgs84: "-123,-206,219"
        },
        ESRI_104139: {
          towgs84: "-73,-247,227"
        },
        EPSG_4748: {
          towgs84: "51,391,-36"
        },
        EPSG_4219: {
          towgs84: "-384,664,-48"
        },
        EPSG_4255: {
          towgs84: "-333,-222,114"
        },
        EPSG_4257: {
          towgs84: "-587.8,519.75,145.76"
        },
        EPSG_4646: {
          towgs84: "-963,510,-359"
        },
        EPSG_6881: {
          towgs84: "-24,-203,268"
        },
        EPSG_6882: {
          towgs84: "-183,-15,273"
        },
        EPSG_4715: {
          towgs84: "-104,-129,239"
        },
        IGNF_RGF93GDD: {
          towgs84: "0,0,0"
        },
        IGNF_RGM04GDD: {
          towgs84: "0,0,0"
        },
        IGNF_RGSPM06GDD: {
          towgs84: "0,0,0"
        },
        IGNF_RGTAAF07GDD: {
          towgs84: "0,0,0"
        },
        IGNF_RGFG95GDD: {
          towgs84: "0,0,0"
        },
        IGNF_RGNCG: {
          towgs84: "0,0,0"
        },
        IGNF_RGPFGDD: {
          towgs84: "0,0,0"
        },
        IGNF_ETRS89G: {
          towgs84: "0,0,0"
        },
        IGNF_RGR92GDD: {
          towgs84: "0,0,0"
        },
        EPSG_4173: {
          towgs84: "0,0,0"
        },
        EPSG_4180: {
          towgs84: "0,0,0"
        },
        EPSG_4619: {
          towgs84: "0,0,0"
        },
        EPSG_4667: {
          towgs84: "0,0,0"
        },
        EPSG_4075: {
          towgs84: "0,0,0"
        },
        EPSG_6706: {
          towgs84: "0,0,0"
        },
        EPSG_7798: {
          towgs84: "0,0,0"
        },
        EPSG_4661: {
          towgs84: "0,0,0"
        },
        EPSG_4669: {
          towgs84: "0,0,0"
        },
        EPSG_8685: {
          towgs84: "0,0,0"
        },
        EPSG_4151: {
          towgs84: "0,0,0"
        },
        EPSG_9702: {
          towgs84: "0,0,0"
        },
        EPSG_4758: {
          towgs84: "0,0,0"
        },
        EPSG_4761: {
          towgs84: "0,0,0"
        },
        EPSG_4765: {
          towgs84: "0,0,0"
        },
        EPSG_8997: {
          towgs84: "0,0,0"
        },
        EPSG_4023: {
          towgs84: "0,0,0"
        },
        EPSG_4670: {
          towgs84: "0,0,0"
        },
        EPSG_4694: {
          towgs84: "0,0,0"
        },
        EPSG_4148: {
          towgs84: "0,0,0"
        },
        EPSG_4163: {
          towgs84: "0,0,0"
        },
        EPSG_4167: {
          towgs84: "0,0,0"
        },
        EPSG_4189: {
          towgs84: "0,0,0"
        },
        EPSG_4190: {
          towgs84: "0,0,0"
        },
        EPSG_4176: {
          towgs84: "0,0,0"
        },
        EPSG_4659: {
          towgs84: "0,0,0"
        },
        EPSG_3824: {
          towgs84: "0,0,0"
        },
        EPSG_3889: {
          towgs84: "0,0,0"
        },
        EPSG_4046: {
          towgs84: "0,0,0"
        },
        EPSG_4081: {
          towgs84: "0,0,0"
        },
        EPSG_4558: {
          towgs84: "0,0,0"
        },
        EPSG_4483: {
          towgs84: "0,0,0"
        },
        EPSG_5013: {
          towgs84: "0,0,0"
        },
        EPSG_5264: {
          towgs84: "0,0,0"
        },
        EPSG_5324: {
          towgs84: "0,0,0"
        },
        EPSG_5354: {
          towgs84: "0,0,0"
        },
        EPSG_5371: {
          towgs84: "0,0,0"
        },
        EPSG_5373: {
          towgs84: "0,0,0"
        },
        EPSG_5381: {
          towgs84: "0,0,0"
        },
        EPSG_5393: {
          towgs84: "0,0,0"
        },
        EPSG_5489: {
          towgs84: "0,0,0"
        },
        EPSG_5593: {
          towgs84: "0,0,0"
        },
        EPSG_6135: {
          towgs84: "0,0,0"
        },
        EPSG_6365: {
          towgs84: "0,0,0"
        },
        EPSG_5246: {
          towgs84: "0,0,0"
        },
        EPSG_7886: {
          towgs84: "0,0,0"
        },
        EPSG_8431: {
          towgs84: "0,0,0"
        },
        EPSG_8427: {
          towgs84: "0,0,0"
        },
        EPSG_8699: {
          towgs84: "0,0,0"
        },
        EPSG_8818: {
          towgs84: "0,0,0"
        },
        EPSG_4757: {
          towgs84: "0,0,0"
        },
        EPSG_9140: {
          towgs84: "0,0,0"
        },
        EPSG_8086: {
          towgs84: "0,0,0"
        },
        EPSG_4686: {
          towgs84: "0,0,0"
        },
        EPSG_4737: {
          towgs84: "0,0,0"
        },
        EPSG_4702: {
          towgs84: "0,0,0"
        },
        EPSG_4747: {
          towgs84: "0,0,0"
        },
        EPSG_4749: {
          towgs84: "0,0,0"
        },
        EPSG_4674: {
          towgs84: "0,0,0"
        },
        EPSG_4755: {
          towgs84: "0,0,0"
        },
        EPSG_4759: {
          towgs84: "0,0,0"
        },
        EPSG_4762: {
          towgs84: "0,0,0"
        },
        EPSG_4763: {
          towgs84: "0,0,0"
        },
        EPSG_4764: {
          towgs84: "0,0,0"
        },
        EPSG_4166: {
          towgs84: "0,0,0"
        },
        EPSG_4170: {
          towgs84: "0,0,0"
        },
        EPSG_5546: {
          towgs84: "0,0,0"
        },
        EPSG_7844: {
          towgs84: "0,0,0"
        },
        EPSG_4818: {
          towgs84: "589,76,480"
        },
        EPSG_10328: {
          towgs84: "0,0,0"
        },
        EPSG_9782: {
          towgs84: "0,0,0"
        },
        EPSG_9777: {
          towgs84: "0,0,0"
        },
        EPSG_10690: {
          towgs84: "0,0,0"
        },
        EPSG_10639: {
          towgs84: "0,0,0"
        },
        EPSG_10739: {
          towgs84: "0,0,0"
        },
        EPSG_7686: {
          towgs84: "0,0,0"
        },
        EPSG_8900: {
          towgs84: "0,0,0"
        },
        EPSG_5886: {
          towgs84: "0,0,0"
        },
        EPSG_7683: {
          towgs84: "0,0,0"
        },
        EPSG_6668: {
          towgs84: "0,0,0"
        },
        EPSG_20046: {
          towgs84: "0,0,0"
        },
        EPSG_10299: {
          towgs84: "0,0,0"
        },
        EPSG_10310: {
          towgs84: "0,0,0"
        },
        EPSG_10475: {
          towgs84: "0,0,0"
        },
        EPSG_4742: {
          towgs84: "0,0,0"
        },
        EPSG_10671: {
          towgs84: "0,0,0"
        },
        EPSG_10762: {
          towgs84: "0,0,0"
        },
        EPSG_10725: {
          towgs84: "0,0,0"
        },
        EPSG_10791: {
          towgs84: "0,0,0"
        },
        EPSG_10800: {
          towgs84: "0,0,0"
        },
        EPSG_10305: {
          towgs84: "0,0,0"
        },
        EPSG_10941: {
          towgs84: "0,0,0"
        },
        EPSG_10968: {
          towgs84: "0,0,0"
        },
        EPSG_10875: {
          towgs84: "0,0,0"
        },
        EPSG_6318: {
          towgs84: "0,0,0"
        },
        EPSG_10910: {
          towgs84: "0,0,0"
        }
      };
      for (var key in datums) {
        var datum$1 = datums[key];
        if (!datum$1.datumName) {
          continue;
        }
        datums[datum$1.datumName] = datum$1;
      }
      function datum(datumCode, datum_params, a, b, es, ep2, nadgrids) {
        var out = {};
        out.datum_type = PJD_NODATUM;
        if (datum_params) {
          out.datum_type = PJD_WGS84;
          out.datum_params = datum_params.map(parseFloat);
          if (out.datum_params[0] !== 0 || out.datum_params[1] !== 0 || out.datum_params[2] !== 0) {
            out.datum_type = PJD_3PARAM;
          }
          if (out.datum_params.length > 3) {
            if (out.datum_params[3] !== 0 || out.datum_params[4] !== 0 || out.datum_params[5] !== 0 || out.datum_params[6] !== 0) {
              out.datum_type = PJD_7PARAM;
              out.datum_params[3] *= SEC_TO_RAD;
              out.datum_params[4] *= SEC_TO_RAD;
              out.datum_params[5] *= SEC_TO_RAD;
              out.datum_params[6] = out.datum_params[6] / 1e6 + 1;
            }
          }
        }
        if (nadgrids) {
          out.datum_type = PJD_GRIDSHIFT;
          out.grids = nadgrids;
        }
        out.a = a;
        out.b = b;
        out.es = es;
        out.ep2 = ep2;
        return out;
      }
      var loadedNadgrids = {};
      function nadgrid(key2, data, options) {
        if (data instanceof ArrayBuffer) {
          return readNTV2Grid(key2, data, options);
        }
        return { ready: readGeotiffGrid(key2, data) };
      }
      function readNTV2Grid(key2, data, options) {
        var includeErrorFields = true;
        if (options !== void 0 && options.includeErrorFields === false) {
          includeErrorFields = false;
        }
        var view = new DataView(data);
        var isLittleEndian = detectLittleEndian(view);
        var header = readHeader(view, isLittleEndian);
        var subgrids = readSubgrids(view, header, isLittleEndian, includeErrorFields);
        var nadgrid2 = { header, subgrids };
        loadedNadgrids[key2] = nadgrid2;
        return nadgrid2;
      }
      async function readGeotiffGrid(key2, tiff) {
        var subgrids = [];
        var subGridCount = await tiff.getImageCount();
        for (var subgridIndex = subGridCount - 1; subgridIndex >= 0; subgridIndex--) {
          var image = await tiff.getImage(subgridIndex);
          var rasters = await image.readRasters();
          var data = rasters;
          var lim = [image.getWidth(), image.getHeight()];
          var imageBBoxRadians = image.getBoundingBox().map(degreesToRadians);
          var modelPixelScale = typeof image.fileDirectory.getValue === "function" ? image.fileDirectory.getValue("ModelPixelScale") : (
            /** @type {any} */
            image.fileDirectory.ModelPixelScale
          );
          var del = [modelPixelScale[0], modelPixelScale[1]].map(degreesToRadians);
          var maxX = imageBBoxRadians[0] + (lim[0] - 1) * del[0];
          var minY = imageBBoxRadians[3] - (lim[1] - 1) * del[1];
          var latitudeOffsetBand = data[0];
          var longitudeOffsetBand = data[1];
          var nodes = [];
          for (let i = lim[1] - 1; i >= 0; i--) {
            for (let j = lim[0] - 1; j >= 0; j--) {
              var index = i * lim[0] + j;
              nodes.push([-secondsToRadians(longitudeOffsetBand[index]), secondsToRadians(latitudeOffsetBand[index])]);
            }
          }
          subgrids.push({
            del,
            lim,
            ll: [-maxX, minY],
            cvs: nodes
          });
        }
        var tifGrid = {
          header: {
            nSubgrids: subGridCount
          },
          subgrids
        };
        loadedNadgrids[key2] = tifGrid;
        return tifGrid;
      }
      function getNadgrids(nadgrids) {
        if (nadgrids === void 0) {
          return null;
        }
        var grids = nadgrids.split(",");
        return grids.map(parseNadgridString);
      }
      function parseNadgridString(value) {
        if (value.length === 0) {
          return null;
        }
        var optional = value[0] === "@";
        if (optional) {
          value = value.slice(1);
        }
        if (value === "null") {
          return { name: "null", mandatory: !optional, grid: null, isNull: true };
        }
        return {
          name: value,
          mandatory: !optional,
          grid: loadedNadgrids[value] || null,
          isNull: false
        };
      }
      function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      }
      function secondsToRadians(seconds) {
        return seconds / 3600 * Math.PI / 180;
      }
      function detectLittleEndian(view) {
        var nFields = view.getInt32(8, false);
        if (nFields === 11) {
          return false;
        }
        nFields = view.getInt32(8, true);
        if (nFields !== 11) {
          console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
        }
        return true;
      }
      function readHeader(view, isLittleEndian) {
        return {
          nFields: view.getInt32(8, isLittleEndian),
          nSubgridFields: view.getInt32(24, isLittleEndian),
          nSubgrids: view.getInt32(40, isLittleEndian),
          shiftType: decodeString(view, 56, 56 + 8).trim(),
          fromSemiMajorAxis: view.getFloat64(120, isLittleEndian),
          fromSemiMinorAxis: view.getFloat64(136, isLittleEndian),
          toSemiMajorAxis: view.getFloat64(152, isLittleEndian),
          toSemiMinorAxis: view.getFloat64(168, isLittleEndian)
        };
      }
      function decodeString(view, start2, end) {
        return String.fromCharCode.apply(null, new Uint8Array(view.buffer.slice(start2, end)));
      }
      function readSubgrids(view, header, isLittleEndian, includeErrorFields) {
        var gridOffset = 176;
        var grids = [];
        for (var i = 0; i < header.nSubgrids; i++) {
          var subHeader = readGridHeader(view, gridOffset, isLittleEndian);
          var nodes = readGridNodes(view, gridOffset, subHeader, isLittleEndian, includeErrorFields);
          var lngColumnCount = Math.round(
            1 + (subHeader.upperLongitude - subHeader.lowerLongitude) / subHeader.longitudeInterval
          );
          var latColumnCount = Math.round(
            1 + (subHeader.upperLatitude - subHeader.lowerLatitude) / subHeader.latitudeInterval
          );
          grids.push({
            ll: [secondsToRadians(subHeader.lowerLongitude), secondsToRadians(subHeader.lowerLatitude)],
            del: [secondsToRadians(subHeader.longitudeInterval), secondsToRadians(subHeader.latitudeInterval)],
            lim: [lngColumnCount, latColumnCount],
            count: subHeader.gridNodeCount,
            cvs: mapNodes(nodes)
          });
          var rowSize = 16;
          if (includeErrorFields === false) {
            rowSize = 8;
          }
          gridOffset += 176 + subHeader.gridNodeCount * rowSize;
        }
        return grids;
      }
      function mapNodes(nodes) {
        return nodes.map(function(r) {
          return [secondsToRadians(r.longitudeShift), secondsToRadians(r.latitudeShift)];
        });
      }
      function readGridHeader(view, offset, isLittleEndian) {
        return {
          name: decodeString(view, offset + 8, offset + 16).trim(),
          parent: decodeString(view, offset + 24, offset + 24 + 8).trim(),
          lowerLatitude: view.getFloat64(offset + 72, isLittleEndian),
          upperLatitude: view.getFloat64(offset + 88, isLittleEndian),
          lowerLongitude: view.getFloat64(offset + 104, isLittleEndian),
          upperLongitude: view.getFloat64(offset + 120, isLittleEndian),
          latitudeInterval: view.getFloat64(offset + 136, isLittleEndian),
          longitudeInterval: view.getFloat64(offset + 152, isLittleEndian),
          gridNodeCount: view.getInt32(offset + 168, isLittleEndian)
        };
      }
      function readGridNodes(view, offset, gridHeader, isLittleEndian, includeErrorFields) {
        var nodesOffset = offset + 176;
        var gridRecordLength = 16;
        if (includeErrorFields === false) {
          gridRecordLength = 8;
        }
        var gridShiftRecords = [];
        for (var i = 0; i < gridHeader.gridNodeCount; i++) {
          var record = {
            latitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength, isLittleEndian),
            longitudeShift: view.getFloat32(nodesOffset + i * gridRecordLength + 4, isLittleEndian)
          };
          if (includeErrorFields !== false) {
            record.latitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 8, isLittleEndian);
            record.longitudeAccuracy = view.getFloat32(nodesOffset + i * gridRecordLength + 12, isLittleEndian);
          }
          gridShiftRecords.push(record);
        }
        return gridShiftRecords;
      }
      function Projection(srsCode, callback) {
        if (!(this instanceof Projection)) {
          return new Projection(srsCode);
        }
        this.forward = null;
        this.inverse = null;
        this.init = null;
        this.name;
        this.axis;
        this.names = null;
        this.title;
        callback = callback || function(error) {
          if (error) {
            throw error;
          }
        };
        var json = parse(srsCode);
        if (typeof json !== "object") {
          callback("Could not parse to valid json: " + srsCode);
          return;
        }
        var ourProj = Projection.projections.get(json.projName);
        if (!ourProj) {
          callback("Could not get projection name from: " + srsCode);
          return;
        }
        if (json.datumCode && json.datumCode !== "none") {
          var datumDef = match(datums, json.datumCode);
          if (datumDef) {
            json.datum_params = json.datum_params || (datumDef.towgs84 ? datumDef.towgs84.split(",") : null);
            json.ellps = datumDef.ellipse;
            json.datumName = datumDef.datumName ? datumDef.datumName : json.datumCode;
          }
        }
        json.axis = json.axis || "enu";
        json.ellps = json.ellps || "wgs84";
        json.lat1 = json.lat1 || json.lat0;
        var sphere_ = sphere(json.a, json.b, json.rf, json.ellps, json.sphere);
        var ecc = eccentricity(sphere_.a, sphere_.b, sphere_.rf, json.R_A);
        var nadgrids = getNadgrids(json.nadgrids);
        var datumObj = json.datum || datum(
          json.datumCode,
          json.datum_params,
          sphere_.a,
          sphere_.b,
          ecc.es,
          ecc.ep2,
          nadgrids
        );
        extend(this, json);
        extend(this, ourProj);
        this.a = sphere_.a;
        this.b = sphere_.b;
        this.rf = sphere_.rf;
        this.sphere = sphere_.sphere;
        this.es = ecc.es;
        this.e = ecc.e;
        this.ep2 = ecc.ep2;
        this.datum = datumObj;
        if ("init" in this && typeof this.init === "function") {
          this.init();
        }
        if (!this.k0) {
          this.k0 = 1;
        }
        callback(null, this);
      }
      Projection.projections = projections;
      Projection.projections.start();
      function compareDatums(source, dest) {
        if (source.datum_type !== dest.datum_type) {
          return false;
        } else if (source.a !== dest.a || Math.abs(source.es - dest.es) > 5e-11) {
          return false;
        } else if (source.datum_type === PJD_3PARAM) {
          return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2];
        } else if (source.datum_type === PJD_7PARAM) {
          return source.datum_params[0] === dest.datum_params[0] && source.datum_params[1] === dest.datum_params[1] && source.datum_params[2] === dest.datum_params[2] && source.datum_params[3] === dest.datum_params[3] && source.datum_params[4] === dest.datum_params[4] && source.datum_params[5] === dest.datum_params[5] && source.datum_params[6] === dest.datum_params[6];
        } else {
          return true;
        }
      }
      function geodeticToGeocentric(p, es, a) {
        var Longitude = p.x;
        var Latitude = p.y;
        var Height = p.z ? p.z : 0;
        var Rn;
        var Sin_Lat;
        var Sin2_Lat;
        var Cos_Lat;
        if (Latitude < -HALF_PI && Latitude > -1.001 * HALF_PI) {
          Latitude = -HALF_PI;
        } else if (Latitude > HALF_PI && Latitude < 1.001 * HALF_PI) {
          Latitude = HALF_PI;
        } else if (Latitude < -HALF_PI) {
          return { x: -Infinity, y: -Infinity, z: p.z };
        } else if (Latitude > HALF_PI) {
          return { x: Infinity, y: Infinity, z: p.z };
        }
        if (Longitude > Math.PI) {
          Longitude -= 2 * Math.PI;
        }
        Sin_Lat = Math.sin(Latitude);
        Cos_Lat = Math.cos(Latitude);
        Sin2_Lat = Sin_Lat * Sin_Lat;
        Rn = a / Math.sqrt(1 - es * Sin2_Lat);
        return {
          x: (Rn + Height) * Cos_Lat * Math.cos(Longitude),
          y: (Rn + Height) * Cos_Lat * Math.sin(Longitude),
          z: (Rn * (1 - es) + Height) * Sin_Lat
        };
      }
      function geocentricToGeodetic(p, es, a, b) {
        var genau = 1e-12;
        var genau2 = genau * genau;
        var maxiter = 30;
        var P;
        var RR;
        var CT;
        var ST;
        var RX;
        var RK;
        var RN;
        var CPHI0;
        var SPHI0;
        var CPHI;
        var SPHI;
        var SDPHI;
        var iter;
        var X = p.x;
        var Y = p.y;
        var Z2 = p.z ? p.z : 0;
        var Longitude;
        var Latitude;
        var Height;
        P = Math.sqrt(X * X + Y * Y);
        RR = Math.sqrt(X * X + Y * Y + Z2 * Z2);
        if (P / a < genau) {
          Longitude = 0;
          if (RR / a < genau) {
            Latitude = HALF_PI;
            Height = -b;
            return {
              x: p.x,
              y: p.y,
              z: p.z
            };
          }
        } else {
          Longitude = Math.atan2(Y, X);
        }
        CT = Z2 / RR;
        ST = P / RR;
        RX = 1 / Math.sqrt(1 - es * (2 - es) * ST * ST);
        CPHI0 = ST * (1 - es) * RX;
        SPHI0 = CT * RX;
        iter = 0;
        do {
          iter++;
          RN = a / Math.sqrt(1 - es * SPHI0 * SPHI0);
          Height = P * CPHI0 + Z2 * SPHI0 - RN * (1 - es * SPHI0 * SPHI0);
          RK = es * RN / (RN + Height);
          RX = 1 / Math.sqrt(1 - RK * (2 - RK) * ST * ST);
          CPHI = ST * (1 - RK) * RX;
          SPHI = CT * RX;
          SDPHI = SPHI * CPHI0 - CPHI * SPHI0;
          CPHI0 = CPHI;
          SPHI0 = SPHI;
        } while (SDPHI * SDPHI > genau2 && iter < maxiter);
        Latitude = Math.atan(SPHI / Math.abs(CPHI));
        return {
          x: Longitude,
          y: Latitude,
          z: Height
        };
      }
      function geocentricToWgs84(p, datum_type, datum_params) {
        if (datum_type === PJD_3PARAM) {
          return {
            x: p.x + datum_params[0],
            y: p.y + datum_params[1],
            z: p.z + datum_params[2]
          };
        } else if (datum_type === PJD_7PARAM) {
          var Dx_BF = datum_params[0];
          var Dy_BF = datum_params[1];
          var Dz_BF = datum_params[2];
          var Rx_BF = datum_params[3];
          var Ry_BF = datum_params[4];
          var Rz_BF = datum_params[5];
          var M_BF = datum_params[6];
          return {
            x: M_BF * (p.x - Rz_BF * p.y + Ry_BF * p.z) + Dx_BF,
            y: M_BF * (Rz_BF * p.x + p.y - Rx_BF * p.z) + Dy_BF,
            z: M_BF * (-Ry_BF * p.x + Rx_BF * p.y + p.z) + Dz_BF
          };
        }
      }
      function geocentricFromWgs84(p, datum_type, datum_params) {
        if (datum_type === PJD_3PARAM) {
          return {
            x: p.x - datum_params[0],
            y: p.y - datum_params[1],
            z: p.z - datum_params[2]
          };
        } else if (datum_type === PJD_7PARAM) {
          var Dx_BF = datum_params[0];
          var Dy_BF = datum_params[1];
          var Dz_BF = datum_params[2];
          var Rx_BF = datum_params[3];
          var Ry_BF = datum_params[4];
          var Rz_BF = datum_params[5];
          var M_BF = datum_params[6];
          var x_tmp = (p.x - Dx_BF) / M_BF;
          var y_tmp = (p.y - Dy_BF) / M_BF;
          var z_tmp = (p.z - Dz_BF) / M_BF;
          return {
            x: x_tmp + Rz_BF * y_tmp - Ry_BF * z_tmp,
            y: -Rz_BF * x_tmp + y_tmp + Rx_BF * z_tmp,
            z: Ry_BF * x_tmp - Rx_BF * y_tmp + z_tmp
          };
        }
      }
      function checkParams(type) {
        return type === PJD_3PARAM || type === PJD_7PARAM;
      }
      function datum_transform(source, dest, point) {
        if (compareDatums(source, dest)) {
          return point;
        }
        if (source.datum_type === PJD_NODATUM || dest.datum_type === PJD_NODATUM) {
          return point;
        }
        var source_a = source.a;
        var source_es = source.es;
        if (source.datum_type === PJD_GRIDSHIFT) {
          var gridShiftCode = applyGridShift(source, false, point);
          if (gridShiftCode !== 0) {
            return void 0;
          }
          source_a = SRS_WGS84_SEMIMAJOR;
          source_es = SRS_WGS84_ESQUARED;
        }
        var dest_a = dest.a;
        var dest_b = dest.b;
        var dest_es = dest.es;
        if (dest.datum_type === PJD_GRIDSHIFT) {
          dest_a = SRS_WGS84_SEMIMAJOR;
          dest_b = SRS_WGS84_SEMIMINOR;
          dest_es = SRS_WGS84_ESQUARED;
        }
        if (source_es === dest_es && source_a === dest_a && !checkParams(source.datum_type) && !checkParams(dest.datum_type)) {
          return point;
        }
        point = geodeticToGeocentric(point, source_es, source_a);
        if (checkParams(source.datum_type)) {
          point = geocentricToWgs84(point, source.datum_type, source.datum_params);
        }
        if (checkParams(dest.datum_type)) {
          point = geocentricFromWgs84(point, dest.datum_type, dest.datum_params);
        }
        point = geocentricToGeodetic(point, dest_es, dest_a, dest_b);
        if (dest.datum_type === PJD_GRIDSHIFT) {
          var destGridShiftResult = applyGridShift(dest, true, point);
          if (destGridShiftResult !== 0) {
            return void 0;
          }
        }
        return point;
      }
      function applyGridShift(source, inverse2, point) {
        if (source.grids === null || source.grids.length === 0) {
          console.log("Grid shift grids not found");
          return -1;
        }
        var input = { x: -point.x, y: point.y };
        var output = { x: Number.NaN, y: Number.NaN };
        var attemptedGrids = [];
        outer:
          for (var i = 0; i < source.grids.length; i++) {
            var grid = source.grids[i];
            attemptedGrids.push(grid.name);
            if (grid.isNull) {
              output = input;
              break;
            }
            if (grid.grid === null) {
              if (grid.mandatory) {
                console.log("Unable to find mandatory grid '" + grid.name + "'");
                return -1;
              }
              continue;
            }
            var subgrids = grid.grid.subgrids;
            for (var j = 0, jj = subgrids.length; j < jj; j++) {
              var subgrid = subgrids[j];
              var epsilon = (Math.abs(subgrid.del[1]) + Math.abs(subgrid.del[0])) / 1e4;
              var minX = subgrid.ll[0] - epsilon;
              var minY = subgrid.ll[1] - epsilon;
              var maxX = subgrid.ll[0] + (subgrid.lim[0] - 1) * subgrid.del[0] + epsilon;
              var maxY = subgrid.ll[1] + (subgrid.lim[1] - 1) * subgrid.del[1] + epsilon;
              if (minY > input.y || minX > input.x || maxY < input.y || maxX < input.x) {
                continue;
              }
              output = applySubgridShift(input, inverse2, subgrid);
              if (!isNaN(output.x)) {
                break outer;
              }
            }
          }
        if (isNaN(output.x)) {
          console.log("Failed to find a grid shift table for location '" + -input.x * R2D + " " + input.y * R2D + " tried: '" + attemptedGrids + "'");
          return -1;
        }
        point.x = -output.x;
        point.y = output.y;
        return 0;
      }
      function applySubgridShift(pin, inverse2, ct) {
        var val = { x: Number.NaN, y: Number.NaN };
        if (isNaN(pin.x)) {
          return val;
        }
        var tb = { x: pin.x, y: pin.y };
        tb.x -= ct.ll[0];
        tb.y -= ct.ll[1];
        tb.x = adjust_lon(tb.x - Math.PI) + Math.PI;
        var t = nadInterpolate(tb, ct);
        if (inverse2) {
          if (isNaN(t.x)) {
            return val;
          }
          t.x = tb.x - t.x;
          t.y = tb.y - t.y;
          var i = 9, tol = 1e-12;
          var dif, del;
          do {
            del = nadInterpolate(t, ct);
            if (isNaN(del.x)) {
              console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
              break;
            }
            dif = { x: tb.x - (del.x + t.x), y: tb.y - (del.y + t.y) };
            t.x += dif.x;
            t.y += dif.y;
          } while (i-- && Math.abs(dif.x) > tol && Math.abs(dif.y) > tol);
          if (i < 0) {
            console.log("Inverse grid shift iterator failed to converge.");
            return val;
          }
          val.x = adjust_lon(t.x + ct.ll[0]);
          val.y = t.y + ct.ll[1];
        } else {
          if (!isNaN(t.x)) {
            val.x = pin.x + t.x;
            val.y = pin.y + t.y;
          }
        }
        return val;
      }
      function nadInterpolate(pin, ct) {
        var t = { x: pin.x / ct.del[0], y: pin.y / ct.del[1] };
        var indx = { x: Math.floor(t.x), y: Math.floor(t.y) };
        var frct = { x: t.x - 1 * indx.x, y: t.y - 1 * indx.y };
        var val = { x: Number.NaN, y: Number.NaN };
        var inx;
        if (indx.x < 0 || indx.x >= ct.lim[0]) {
          return val;
        }
        if (indx.y < 0 || indx.y >= ct.lim[1]) {
          return val;
        }
        inx = indx.y * ct.lim[0] + indx.x;
        var f00 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx++;
        var f10 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx += ct.lim[0];
        var f11 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        inx--;
        var f01 = { x: ct.cvs[inx][0], y: ct.cvs[inx][1] };
        var m11 = frct.x * frct.y, m10 = frct.x * (1 - frct.y), m00 = (1 - frct.x) * (1 - frct.y), m01 = (1 - frct.x) * frct.y;
        val.x = m00 * f00.x + m10 * f10.x + m01 * f01.x + m11 * f11.x;
        val.y = m00 * f00.y + m10 * f10.y + m01 * f01.y + m11 * f11.y;
        return val;
      }
      var order = ["x", "y", "z"];
      function adjustAxisToEnu(crs, point) {
        const out = {};
        for (let i = 0, ii = crs.axis.length; i < ii; i++) {
          if (i === 2 && point.z === void 0) {
            continue;
          }
          let v = point[order[i]];
          switch (crs.axis[i]) {
            case "e":
              out.x = v;
              break;
            case "w":
              out.x = -v;
              break;
            case "n":
              out.y = v;
              break;
            case "s":
              out.y = -v;
              break;
            case "u":
              out.z = v;
              break;
            case "d":
              out.z = -v;
              break;
            default:
              return null;
          }
        }
        return out;
      }
      function adjustAxisFromEnu(crs, point) {
        const out = (
          /** @type {import("./core").InterfaceCoordinates} */
          {}
        );
        for (let i = 0, ii = crs.axis.length; i < ii; i++) {
          if (i === 2 && point.z === void 0) {
            continue;
          }
          switch (crs.axis[i]) {
            case "e":
              out[order[i]] = point.x;
              break;
            case "w":
              out[order[i]] = -point.x;
              break;
            case "n":
              out[order[i]] = point.y;
              break;
            case "s":
              out[order[i]] = -point.y;
              break;
            case "u":
              out[order[i]] = point.z;
              break;
            case "d":
              out[order[i]] = -point.z;
              break;
            default:
              return null;
          }
        }
        return out;
      }
      function common2(array) {
        var out = {
          x: array[0],
          y: array[1]
        };
        if (array.length > 2) {
          out.z = array[2];
        }
        if (array.length > 3) {
          out.m = array[3];
        }
        return out;
      }
      function checkSanity(point) {
        checkCoord(point.x);
        checkCoord(point.y);
      }
      function checkCoord(num) {
        if (typeof Number.isFinite === "function") {
          if (Number.isFinite(num)) {
            return;
          }
          throw new TypeError("coordinates must be finite numbers");
        }
        if (typeof num !== "number" || num !== num || !isFinite(num)) {
          throw new TypeError("coordinates must be finite numbers");
        }
      }
      function checkNotWGS(source, dest) {
        return (source.datum.datum_type === PJD_3PARAM || source.datum.datum_type === PJD_7PARAM || source.datum.datum_type === PJD_GRIDSHIFT) && dest.datumCode !== "WGS84" || (dest.datum.datum_type === PJD_3PARAM || dest.datum.datum_type === PJD_7PARAM || dest.datum.datum_type === PJD_GRIDSHIFT) && source.datumCode !== "WGS84";
      }
      function transformInternal(source, dest, point, enforceAxis) {
        var wgs842;
        var hasZ = point.z !== void 0;
        checkSanity(point);
        if (source.datum && dest.datum && checkNotWGS(source, dest)) {
          wgs842 = new Projection("WGS84");
          point = transformInternal(source, wgs842, point, enforceAxis);
          source = wgs842;
        }
        if (enforceAxis && source.axis !== "enu") {
          point = adjustAxisToEnu(source, point);
        }
        if (source.projName === "longlat") {
          point = {
            x: point.x * D2R$1,
            y: point.y * D2R$1,
            z: point.z || 0
          };
        } else {
          if (source.to_meter) {
            point = {
              x: point.x * source.to_meter,
              y: point.y * source.to_meter,
              z: point.z || 0
            };
          }
          point = source.inverse(point);
          if (!point) {
            return;
          }
        }
        if (source.from_greenwich) {
          point.x += source.from_greenwich;
        }
        point = datum_transform(source.datum, dest.datum, point);
        if (!point) {
          return;
        }
        point = /** @type {import('./core').InterfaceCoordinates} */
        point;
        if (dest.from_greenwich) {
          point = {
            x: point.x - dest.from_greenwich,
            y: point.y,
            z: point.z || 0
          };
        }
        if (dest.projName === "longlat") {
          if (dest.long_wrap !== void 0) {
            point.x = dest.long_wrap + adjust_lon(point.x - dest.long_wrap);
          }
          point = {
            x: point.x * R2D,
            y: point.y * R2D,
            z: point.z || 0
          };
        } else {
          point = dest.forward(point);
          if (dest.to_meter) {
            point = {
              x: point.x / dest.to_meter,
              y: point.y / dest.to_meter,
              z: point.z || 0
            };
          }
        }
        if (enforceAxis && dest.axis !== "enu") {
          return adjustAxisFromEnu(dest, point);
        }
        if (point && !hasZ && dest.projName !== "geocent") {
          delete point.z;
        }
        return point;
      }
      function transform(source, dest, point, enforceAxis) {
        var pt;
        if (Array.isArray(point)) {
          pt = common2(point);
        } else {
          pt = { x: point.x, y: point.y, z: point.z, m: point.m };
        }
        return transformInternal(source, dest, pt, enforceAxis);
      }
      var wgs84 = Projection("WGS84");
      function transformer(from, to, coords, enforceAxis) {
        var out, geocent2, keys;
        if (Array.isArray(coords)) {
          out = transformInternal(from, to, common2(coords), enforceAxis) || { x: NaN, y: NaN };
          if (coords.length > 2) {
            geocent2 = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
            if (geocent2) {
              if (typeof out.z === "number") {
                return (
                  /** @type {T} */
                  [out.x, out.y, out.z].concat(coords.slice(3))
                );
              }
              return (
                /** @type {T} */
                [out.x, out.y, coords[2]].concat(coords.slice(3))
              );
            }
            if (enforceAxis && typeof out.z === "number") {
              return (
                /** @type {T} */
                [out.x, out.y, out.z].concat(coords.slice(3))
              );
            }
            return (
              /** @type {T} */
              [out.x, out.y].concat(coords.slice(2))
            );
          }
          return (
            /** @type {T} */
            [out.x, out.y]
          );
        } else {
          out = transformInternal(from, to, { x: coords.x, y: coords.y, z: coords.z, m: coords.m }, enforceAxis) || { x: NaN, y: NaN };
          keys = Object.keys(coords);
          if (keys.length === 2) {
            return (
              /** @type {T} */
              out
            );
          }
          geocent2 = typeof from.name !== "undefined" && from.name === "geocent" || typeof to.name !== "undefined" && to.name === "geocent";
          keys.forEach(function(key2) {
            if (key2 === "x" || key2 === "y") {
              return;
            }
            if (key2 === "z" && (geocent2 || enforceAxis)) {
              return;
            }
            out[key2] = coords[key2];
          });
          return (
            /** @type {T} */
            out
          );
        }
      }
      function checkProj(item) {
        if (item instanceof Projection) {
          return item;
        }
        if (typeof item === "object" && "oProj" in item) {
          return item.oProj;
        }
        return Projection(
          /** @type {string | PROJJSONDefinition} */
          item
        );
      }
      function proj4$1(fromProjOrToProj, toProjOrCoord, coord) {
        var fromProj;
        var toProj;
        var single = false;
        var obj;
        if (typeof toProjOrCoord === "undefined") {
          toProj = checkProj(fromProjOrToProj);
          fromProj = wgs84;
          single = true;
        } else if (typeof /** @type {?} */
        toProjOrCoord.x !== "undefined" || Array.isArray(toProjOrCoord)) {
          coord = /** @type {T} */
          /** @type {?} */
          toProjOrCoord;
          toProj = checkProj(fromProjOrToProj);
          fromProj = wgs84;
          single = true;
        }
        if (!fromProj) {
          fromProj = checkProj(fromProjOrToProj);
        }
        if (!toProj) {
          toProj = checkProj(
            /** @type {string | PROJJSONDefinition | proj } */
            toProjOrCoord
          );
        }
        if (coord) {
          return transformer(fromProj, toProj, coord);
        } else {
          obj = {
            /**
             * @template {TemplateCoordinates} T
             * @param {T} coords
             * @param {boolean=} enforceAxis
             * @returns {T}
             */
            forward: function(coords, enforceAxis) {
              return transformer(fromProj, toProj, coords, enforceAxis);
            },
            /**
             * @template {TemplateCoordinates} T
             * @param {T} coords
             * @param {boolean=} enforceAxis
             * @returns {T}
             */
            inverse: function(coords, enforceAxis) {
              return transformer(toProj, fromProj, coords, enforceAxis);
            }
          };
          if (single) {
            obj.oProj = toProj;
          }
          return obj;
        }
      }
      var NUM_100K_SETS = 6;
      var SET_ORIGIN_COLUMN_LETTERS = "AJSAJS";
      var SET_ORIGIN_ROW_LETTERS = "AFAFAF";
      var A = 65;
      var I = 73;
      var O = 79;
      var V = 86;
      var Z = 90;
      var mgrs = {
        forward: forward$w,
        inverse: inverse$w,
        toPoint
      };
      function forward$w(ll, accuracy) {
        accuracy = accuracy || 5;
        return encode(LLtoUTM({
          lat: ll[1],
          lon: ll[0]
        }), accuracy);
      }
      function inverse$w(mgrs2) {
        var bbox = UTMtoLL(decode(mgrs2.toUpperCase()));
        if (bbox.lat && bbox.lon) {
          return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
        }
        return [bbox.left, bbox.bottom, bbox.right, bbox.top];
      }
      function toPoint(mgrs2) {
        var bbox = UTMtoLL(decode(mgrs2.toUpperCase()));
        if (bbox.lat && bbox.lon) {
          return [bbox.lon, bbox.lat];
        }
        return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
      }
      function degToRad(deg) {
        return deg * (Math.PI / 180);
      }
      function radToDeg(rad) {
        return 180 * (rad / Math.PI);
      }
      function LLtoUTM(ll) {
        var Lat = ll.lat;
        var Long = ll.lon;
        var a = 6378137;
        var eccSquared = 669438e-8;
        var k0 = 0.9996;
        var LongOrigin;
        var eccPrimeSquared;
        var N, T, C, A5, M2;
        var LatRad = degToRad(Lat);
        var LongRad = degToRad(Long);
        var LongOriginRad;
        var ZoneNumber;
        ZoneNumber = Math.floor((Long + 180) / 6) + 1;
        if (Long === 180) {
          ZoneNumber = 60;
        }
        if (Lat >= 56 && Lat < 64 && Long >= 3 && Long < 12) {
          ZoneNumber = 32;
        }
        if (Lat >= 72 && Lat < 84) {
          if (Long >= 0 && Long < 9) {
            ZoneNumber = 31;
          } else if (Long >= 9 && Long < 21) {
            ZoneNumber = 33;
          } else if (Long >= 21 && Long < 33) {
            ZoneNumber = 35;
          } else if (Long >= 33 && Long < 42) {
            ZoneNumber = 37;
          }
        }
        LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3;
        LongOriginRad = degToRad(LongOrigin);
        eccPrimeSquared = eccSquared / (1 - eccSquared);
        N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
        T = Math.tan(LatRad) * Math.tan(LatRad);
        C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
        A5 = Math.cos(LatRad) * (LongRad - LongOriginRad);
        M2 = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - 35 * eccSquared * eccSquared * eccSquared / 3072 * Math.sin(6 * LatRad));
        var UTMEasting = k0 * N * (A5 + (1 - T + C) * A5 * A5 * A5 / 6 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 / 120) + 5e5;
        var UTMNorthing = k0 * (M2 + N * Math.tan(LatRad) * (A5 * A5 / 2 + (5 - T + 9 * C + 4 * C * C) * A5 * A5 * A5 * A5 / 24 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A5 * A5 * A5 * A5 * A5 * A5 / 720));
        if (Lat < 0) {
          UTMNorthing += 1e7;
        }
        return {
          northing: Math.round(UTMNorthing),
          easting: Math.round(UTMEasting),
          zoneNumber: ZoneNumber,
          zoneLetter: getLetterDesignator(Lat)
        };
      }
      function UTMtoLL(utm2) {
        var UTMNorthing = utm2.northing;
        var UTMEasting = utm2.easting;
        var zoneLetter = utm2.zoneLetter;
        var zoneNumber = utm2.zoneNumber;
        if (zoneNumber < 0 || zoneNumber > 60) {
          return null;
        }
        var k0 = 0.9996;
        var a = 6378137;
        var eccSquared = 669438e-8;
        var eccPrimeSquared;
        var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
        var N1, T1, C12, R1, D, M2;
        var LongOrigin;
        var mu, phi1Rad;
        var x = UTMEasting - 5e5;
        var y = UTMNorthing;
        if (zoneLetter < "N") {
          y -= 1e7;
        }
        LongOrigin = (zoneNumber - 1) * 6 - 180 + 3;
        eccPrimeSquared = eccSquared / (1 - eccSquared);
        M2 = y / k0;
        mu = M2 / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));
        phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + 151 * e1 * e1 * e1 / 96 * Math.sin(6 * mu);
        N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
        T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
        C12 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
        R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
        D = x / (N1 * k0);
        var lat = phi1Rad - N1 * Math.tan(phi1Rad) / R1 * (D * D / 2 - (5 + 3 * T1 + 10 * C12 - 4 * C12 * C12 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C12 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C12 * C12) * D * D * D * D * D * D / 720);
        lat = radToDeg(lat);
        var lon = (D - (1 + 2 * T1 + C12) * D * D * D / 6 + (5 - 2 * C12 + 28 * T1 - 3 * C12 * C12 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
        lon = LongOrigin + radToDeg(lon);
        var result;
        if (utm2.accuracy) {
          var topRight = UTMtoLL({
            northing: utm2.northing + utm2.accuracy,
            easting: utm2.easting + utm2.accuracy,
            zoneLetter: utm2.zoneLetter,
            zoneNumber: utm2.zoneNumber
          });
          result = {
            top: topRight.lat,
            right: topRight.lon,
            bottom: lat,
            left: lon
          };
        } else {
          result = {
            lat,
            lon
          };
        }
        return result;
      }
      function getLetterDesignator(lat) {
        var LetterDesignator = "Z";
        if (84 >= lat && lat >= 72) {
          LetterDesignator = "X";
        } else if (72 > lat && lat >= 64) {
          LetterDesignator = "W";
        } else if (64 > lat && lat >= 56) {
          LetterDesignator = "V";
        } else if (56 > lat && lat >= 48) {
          LetterDesignator = "U";
        } else if (48 > lat && lat >= 40) {
          LetterDesignator = "T";
        } else if (40 > lat && lat >= 32) {
          LetterDesignator = "S";
        } else if (32 > lat && lat >= 24) {
          LetterDesignator = "R";
        } else if (24 > lat && lat >= 16) {
          LetterDesignator = "Q";
        } else if (16 > lat && lat >= 8) {
          LetterDesignator = "P";
        } else if (8 > lat && lat >= 0) {
          LetterDesignator = "N";
        } else if (0 > lat && lat >= -8) {
          LetterDesignator = "M";
        } else if (-8 > lat && lat >= -16) {
          LetterDesignator = "L";
        } else if (-16 > lat && lat >= -24) {
          LetterDesignator = "K";
        } else if (-24 > lat && lat >= -32) {
          LetterDesignator = "J";
        } else if (-32 > lat && lat >= -40) {
          LetterDesignator = "H";
        } else if (-40 > lat && lat >= -48) {
          LetterDesignator = "G";
        } else if (-48 > lat && lat >= -56) {
          LetterDesignator = "F";
        } else if (-56 > lat && lat >= -64) {
          LetterDesignator = "E";
        } else if (-64 > lat && lat >= -72) {
          LetterDesignator = "D";
        } else if (-72 > lat && lat >= -80) {
          LetterDesignator = "C";
        }
        return LetterDesignator;
      }
      function encode(utm2, accuracy) {
        var seasting = "00000" + utm2.easting, snorthing = "00000" + utm2.northing;
        return utm2.zoneNumber + utm2.zoneLetter + get100kID(utm2.easting, utm2.northing, utm2.zoneNumber) + seasting.substr(seasting.length - 5, accuracy) + snorthing.substr(snorthing.length - 5, accuracy);
      }
      function get100kID(easting, northing, zoneNumber) {
        var setParm = get100kSetForZone(zoneNumber);
        var setColumn = Math.floor(easting / 1e5);
        var setRow = Math.floor(northing / 1e5) % 20;
        return getLetter100kID(setColumn, setRow, setParm);
      }
      function get100kSetForZone(i) {
        var setParm = i % NUM_100K_SETS;
        if (setParm === 0) {
          setParm = NUM_100K_SETS;
        }
        return setParm;
      }
      function getLetter100kID(column, row, parm) {
        var index = parm - 1;
        var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
        var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);
        var colInt = colOrigin + column - 1;
        var rowInt = rowOrigin + row;
        var rollover = false;
        if (colInt > Z) {
          colInt = colInt - Z + A - 1;
          rollover = true;
        }
        if (colInt === I || colOrigin < I && colInt > I || (colInt > I || colOrigin < I) && rollover) {
          colInt++;
        }
        if (colInt === O || colOrigin < O && colInt > O || (colInt > O || colOrigin < O) && rollover) {
          colInt++;
          if (colInt === I) {
            colInt++;
          }
        }
        if (colInt > Z) {
          colInt = colInt - Z + A - 1;
        }
        if (rowInt > V) {
          rowInt = rowInt - V + A - 1;
          rollover = true;
        } else {
          rollover = false;
        }
        if (rowInt === I || rowOrigin < I && rowInt > I || (rowInt > I || rowOrigin < I) && rollover) {
          rowInt++;
        }
        if (rowInt === O || rowOrigin < O && rowInt > O || (rowInt > O || rowOrigin < O) && rollover) {
          rowInt++;
          if (rowInt === I) {
            rowInt++;
          }
        }
        if (rowInt > V) {
          rowInt = rowInt - V + A - 1;
        }
        var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
        return twoLetter;
      }
      function decode(mgrsString) {
        if (mgrsString && mgrsString.length === 0) {
          throw "MGRSPoint coverting from nothing";
        }
        var length = mgrsString.length;
        var hunK = null;
        var sb = "";
        var testChar;
        var i = 0;
        while (!/[A-Z]/.test(testChar = mgrsString.charAt(i))) {
          if (i >= 2) {
            throw "MGRSPoint bad conversion from: " + mgrsString;
          }
          sb += testChar;
          i++;
        }
        var zoneNumber = parseInt(sb, 10);
        if (i === 0 || i + 3 > length) {
          throw "MGRSPoint bad conversion from: " + mgrsString;
        }
        var zoneLetter = mgrsString.charAt(i++);
        if (zoneLetter <= "A" || zoneLetter === "B" || zoneLetter === "Y" || zoneLetter >= "Z" || zoneLetter === "I" || zoneLetter === "O") {
          throw "MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString;
        }
        hunK = mgrsString.substring(i, i += 2);
        var set = get100kSetForZone(zoneNumber);
        var east100k = getEastingFromChar(hunK.charAt(0), set);
        var north100k = getNorthingFromChar(hunK.charAt(1), set);
        while (north100k < getMinNorthing(zoneLetter)) {
          north100k += 2e6;
        }
        var remainder = length - i;
        if (remainder % 2 !== 0) {
          throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString;
        }
        var sep = remainder / 2;
        var sepEasting = 0;
        var sepNorthing = 0;
        var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
        if (sep > 0) {
          accuracyBonus = 1e5 / Math.pow(10, sep);
          sepEastingString = mgrsString.substring(i, i + sep);
          sepEasting = parseFloat(sepEastingString) * accuracyBonus;
          sepNorthingString = mgrsString.substring(i + sep);
          sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
        }
        easting = sepEasting + east100k;
        northing = sepNorthing + north100k;
        return {
          easting,
          northing,
          zoneLetter,
          zoneNumber,
          accuracy: accuracyBonus
        };
      }
      function getEastingFromChar(e, set) {
        var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
        var eastingValue = 1e5;
        var rewindMarker = false;
        while (curCol !== e.charCodeAt(0)) {
          curCol++;
          if (curCol === I) {
            curCol++;
          }
          if (curCol === O) {
            curCol++;
          }
          if (curCol > Z) {
            if (rewindMarker) {
              throw "Bad character: " + e;
            }
            curCol = A;
            rewindMarker = true;
          }
          eastingValue += 1e5;
        }
        return eastingValue;
      }
      function getNorthingFromChar(n, set) {
        if (n > "V") {
          throw "MGRSPoint given invalid Northing " + n;
        }
        var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
        var northingValue = 0;
        var rewindMarker = false;
        while (curRow !== n.charCodeAt(0)) {
          curRow++;
          if (curRow === I) {
            curRow++;
          }
          if (curRow === O) {
            curRow++;
          }
          if (curRow > V) {
            if (rewindMarker) {
              throw "Bad character: " + n;
            }
            curRow = A;
            rewindMarker = true;
          }
          northingValue += 1e5;
        }
        return northingValue;
      }
      function getMinNorthing(zoneLetter) {
        var northing;
        switch (zoneLetter) {
          case "C":
            northing = 11e5;
            break;
          case "D":
            northing = 2e6;
            break;
          case "E":
            northing = 28e5;
            break;
          case "F":
            northing = 37e5;
            break;
          case "G":
            northing = 46e5;
            break;
          case "H":
            northing = 55e5;
            break;
          case "J":
            northing = 64e5;
            break;
          case "K":
            northing = 73e5;
            break;
          case "L":
            northing = 82e5;
            break;
          case "M":
            northing = 91e5;
            break;
          case "N":
            northing = 0;
            break;
          case "P":
            northing = 8e5;
            break;
          case "Q":
            northing = 17e5;
            break;
          case "R":
            northing = 26e5;
            break;
          case "S":
            northing = 35e5;
            break;
          case "T":
            northing = 44e5;
            break;
          case "U":
            northing = 53e5;
            break;
          case "V":
            northing = 62e5;
            break;
          case "W":
            northing = 7e6;
            break;
          case "X":
            northing = 79e5;
            break;
          default:
            northing = -1;
        }
        if (northing >= 0) {
          return northing;
        } else {
          throw "Invalid zone letter: " + zoneLetter;
        }
      }
      function Point(x, y, z) {
        if (!(this instanceof Point)) {
          return new Point(x, y, z);
        }
        if (Array.isArray(x)) {
          this.x = x[0];
          this.y = x[1];
          this.z = x[2] || 0;
        } else if (typeof x === "object") {
          this.x = x.x;
          this.y = x.y;
          this.z = x.z || 0;
        } else if (typeof x === "string" && typeof y === "undefined") {
          var coords = x.split(",");
          this.x = parseFloat(coords[0]);
          this.y = parseFloat(coords[1]);
          this.z = parseFloat(coords[2]) || 0;
        } else {
          this.x = x;
          this.y = y;
          this.z = z || 0;
        }
        console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
      }
      Point.fromMGRS = function(mgrsStr) {
        return new Point(toPoint(mgrsStr));
      };
      Point.prototype.toMGRS = function(accuracy) {
        return forward$w([this.x, this.y], accuracy);
      };
      var C00 = 1;
      var C02 = 0.25;
      var C04 = 0.046875;
      var C06 = 0.01953125;
      var C08 = 0.01068115234375;
      var C22 = 0.75;
      var C44 = 0.46875;
      var C46 = 0.013020833333333334;
      var C48 = 0.007120768229166667;
      var C66 = 0.3645833333333333;
      var C68 = 0.005696614583333333;
      var C88 = 0.3076171875;
      function pj_enfn(es) {
        var en = [];
        en[0] = C00 - es * (C02 + es * (C04 + es * (C06 + es * C08)));
        en[1] = es * (C22 - es * (C04 + es * (C06 + es * C08)));
        var t = es * es;
        en[2] = t * (C44 - es * (C46 + es * C48));
        t *= es;
        en[3] = t * (C66 - es * C68);
        en[4] = t * es * C88;
        return en;
      }
      function pj_mlfn(phi, sphi, cphi, en) {
        cphi *= sphi;
        sphi *= sphi;
        return en[0] * phi - cphi * (en[1] + sphi * (en[2] + sphi * (en[3] + sphi * en[4])));
      }
      var MAX_ITER$3 = 20;
      function pj_inv_mlfn(arg, es, en) {
        var k = 1 / (1 - es);
        var phi = arg;
        for (var i = MAX_ITER$3; i; --i) {
          var s = Math.sin(phi);
          var t = 1 - es * s * s;
          t = (pj_mlfn(phi, s, Math.cos(phi), en) - arg) * (t * Math.sqrt(t)) * k;
          phi -= t;
          if (Math.abs(t) < EPSLN) {
            return phi;
          }
        }
        return phi;
      }
      function init$x() {
        this.x0 = this.x0 !== void 0 ? this.x0 : 0;
        this.y0 = this.y0 !== void 0 ? this.y0 : 0;
        this.long0 = this.long0 !== void 0 ? this.long0 : 0;
        this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
        if (this.es) {
          this.en = pj_enfn(this.es);
          this.ml0 = pj_mlfn(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en);
        }
      }
      function forward$v(p) {
        var lon = p.x;
        var lat = p.y;
        var delta_lon = adjust_lon(lon - this.long0, this.over);
        var con;
        var x, y;
        var sin_phi = Math.sin(lat);
        var cos_phi = Math.cos(lat);
        if (!this.es) {
          var b = cos_phi * Math.sin(delta_lon);
          if (Math.abs(Math.abs(b) - 1) < EPSLN) {
            return 93;
          } else {
            x = 0.5 * this.a * this.k0 * Math.log((1 + b) / (1 - b)) + this.x0;
            y = cos_phi * Math.cos(delta_lon) / Math.sqrt(1 - Math.pow(b, 2));
            b = Math.abs(y);
            if (b >= 1) {
              if (b - 1 > EPSLN) {
                return 93;
              } else {
                y = 0;
              }
            } else {
              y = Math.acos(y);
            }
            if (lat < 0) {
              y = -y;
            }
            y = this.a * this.k0 * (y - this.lat0) + this.y0;
          }
        } else {
          var al = cos_phi * delta_lon;
          var als = Math.pow(al, 2);
          var c = this.ep2 * Math.pow(cos_phi, 2);
          var cs = Math.pow(c, 2);
          var tq = Math.abs(cos_phi) > EPSLN ? Math.tan(lat) : 0;
          var t = Math.pow(tq, 2);
          var ts = Math.pow(t, 2);
          con = 1 - this.es * Math.pow(sin_phi, 2);
          al = al / Math.sqrt(con);
          var ml = pj_mlfn(lat, sin_phi, cos_phi, this.en);
          x = this.a * (this.k0 * al * (1 + als / 6 * (1 - t + c + als / 20 * (5 - 18 * t + ts + 14 * c - 58 * t * c + als / 42 * (61 + 179 * ts - ts * t - 479 * t))))) + this.x0;
          y = this.a * (this.k0 * (ml - this.ml0 + sin_phi * delta_lon * al / 2 * (1 + als / 12 * (5 - t + 9 * c + 4 * cs + als / 30 * (61 + ts - 58 * t + 270 * c - 330 * t * c + als / 56 * (1385 + 543 * ts - ts * t - 3111 * t)))))) + this.y0;
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$v(p) {
        var con, phi;
        var lat, lon;
        var x = (p.x - this.x0) * (1 / this.a);
        var y = (p.y - this.y0) * (1 / this.a);
        if (!this.es) {
          var f = Math.exp(x / this.k0);
          var g = 0.5 * (f - 1 / f);
          var temp = this.lat0 + y / this.k0;
          var h = Math.cos(temp);
          con = Math.sqrt((1 - Math.pow(h, 2)) / (1 + Math.pow(g, 2)));
          lat = Math.asin(con);
          if (y < 0) {
            lat = -lat;
          }
          if (g === 0 && h === 0) {
            lon = 0;
          } else {
            lon = adjust_lon(Math.atan2(g, h) + this.long0, this.over);
          }
        } else {
          con = this.ml0 + y / this.k0;
          phi = pj_inv_mlfn(con, this.es, this.en);
          if (Math.abs(phi) < HALF_PI) {
            var sin_phi = Math.sin(phi);
            var cos_phi = Math.cos(phi);
            var tan_phi = Math.abs(cos_phi) > EPSLN ? Math.tan(phi) : 0;
            var c = this.ep2 * Math.pow(cos_phi, 2);
            var cs = Math.pow(c, 2);
            var t = Math.pow(tan_phi, 2);
            var ts = Math.pow(t, 2);
            con = 1 - this.es * Math.pow(sin_phi, 2);
            var d = x * Math.sqrt(con) / this.k0;
            var ds = Math.pow(d, 2);
            con = con * tan_phi;
            lat = phi - con * ds / (1 - this.es) * 0.5 * (1 - ds / 12 * (5 + 3 * t - 9 * c * t + c - 4 * cs - ds / 30 * (61 + 90 * t - 252 * c * t + 45 * ts + 46 * c - ds / 56 * (1385 + 3633 * t + 4095 * ts + 1574 * ts * t))));
            lon = adjust_lon(this.long0 + d * (1 - ds / 6 * (1 + 2 * t + c - ds / 20 * (5 + 28 * t + 24 * ts + 8 * c * t + 6 * c - ds / 42 * (61 + 662 * t + 1320 * ts + 720 * ts * t)))) / cos_phi, this.over);
          } else {
            lat = HALF_PI * sign(y);
            lon = 0;
          }
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$w = ["Fast_Transverse_Mercator", "Fast Transverse Mercator"];
      var tmerc = {
        init: init$x,
        forward: forward$v,
        inverse: inverse$v,
        names: names$w
      };
      function sinh(x) {
        var r = Math.exp(x);
        r = (r - 1 / r) / 2;
        return r;
      }
      function hypot(x, y) {
        x = Math.abs(x);
        y = Math.abs(y);
        var a = Math.max(x, y);
        var b = Math.min(x, y) / (a ? a : 1);
        return a * Math.sqrt(1 + Math.pow(b, 2));
      }
      function log1py(x) {
        var y = 1 + x;
        var z = y - 1;
        return z === 0 ? x : x * Math.log(y) / z;
      }
      function asinhy(x) {
        var y = Math.abs(x);
        y = log1py(y * (1 + y / (hypot(1, y) + 1)));
        return x < 0 ? -y : y;
      }
      function gatg(pp, B) {
        var cos_2B = 2 * Math.cos(2 * B);
        var i = pp.length - 1;
        var h1 = pp[i];
        var h2 = 0;
        var h;
        while (--i >= 0) {
          h = -h2 + cos_2B * h1 + pp[i];
          h2 = h1;
          h1 = h;
        }
        return B + h * Math.sin(2 * B);
      }
      function clens(pp, arg_r) {
        var r = 2 * Math.cos(arg_r);
        var i = pp.length - 1;
        var hr1 = pp[i];
        var hr2 = 0;
        var hr;
        while (--i >= 0) {
          hr = -hr2 + r * hr1 + pp[i];
          hr2 = hr1;
          hr1 = hr;
        }
        return Math.sin(arg_r) * hr;
      }
      function cosh(x) {
        var r = Math.exp(x);
        r = (r + 1 / r) / 2;
        return r;
      }
      function clens_cmplx(pp, arg_r, arg_i) {
        var sin_arg_r = Math.sin(arg_r);
        var cos_arg_r = Math.cos(arg_r);
        var sinh_arg_i = sinh(arg_i);
        var cosh_arg_i = cosh(arg_i);
        var r = 2 * cos_arg_r * cosh_arg_i;
        var i = -2 * sin_arg_r * sinh_arg_i;
        var j = pp.length - 1;
        var hr = pp[j];
        var hi1 = 0;
        var hr1 = 0;
        var hi = 0;
        var hr2;
        var hi2;
        while (--j >= 0) {
          hr2 = hr1;
          hi2 = hi1;
          hr1 = hr;
          hi1 = hi;
          hr = -hr2 + r * hr1 - i * hi1 + pp[j];
          hi = -hi2 + i * hr1 + r * hi1;
        }
        r = sin_arg_r * cosh_arg_i;
        i = cos_arg_r * sinh_arg_i;
        return [r * hr - i * hi, r * hi + i * hr];
      }
      function init$w() {
        if (!this.approx && (isNaN(this.es) || this.es <= 0)) {
          throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
        }
        if (this.approx) {
          tmerc.init.apply(this);
          this.forward = tmerc.forward;
          this.inverse = tmerc.inverse;
        }
        this.x0 = this.x0 !== void 0 ? this.x0 : 0;
        this.y0 = this.y0 !== void 0 ? this.y0 : 0;
        this.long0 = this.long0 !== void 0 ? this.long0 : 0;
        this.lat0 = this.lat0 !== void 0 ? this.lat0 : 0;
        this.k0 = this.k0 !== void 0 ? this.k0 : 1;
        this.cgb = [];
        this.cbg = [];
        this.utg = [];
        this.gtu = [];
        var f = this.es / (1 + Math.sqrt(1 - this.es));
        var n = f / (2 - f);
        var np = n;
        this.cgb[0] = n * (2 + n * (-2 / 3 + n * (-2 + n * (116 / 45 + n * (26 / 45 + n * (-2854 / 675))))));
        this.cbg[0] = n * (-2 + n * (2 / 3 + n * (4 / 3 + n * (-82 / 45 + n * (32 / 45 + n * (4642 / 4725))))));
        np = np * n;
        this.cgb[1] = np * (7 / 3 + n * (-8 / 5 + n * (-227 / 45 + n * (2704 / 315 + n * (2323 / 945)))));
        this.cbg[1] = np * (5 / 3 + n * (-16 / 15 + n * (-13 / 9 + n * (904 / 315 + n * (-1522 / 945)))));
        np = np * n;
        this.cgb[2] = np * (56 / 15 + n * (-136 / 35 + n * (-1262 / 105 + n * (73814 / 2835))));
        this.cbg[2] = np * (-26 / 15 + n * (34 / 21 + n * (8 / 5 + n * (-12686 / 2835))));
        np = np * n;
        this.cgb[3] = np * (4279 / 630 + n * (-332 / 35 + n * (-399572 / 14175)));
        this.cbg[3] = np * (1237 / 630 + n * (-12 / 5 + n * (-24832 / 14175)));
        np = np * n;
        this.cgb[4] = np * (4174 / 315 + n * (-144838 / 6237));
        this.cbg[4] = np * (-734 / 315 + n * (109598 / 31185));
        np = np * n;
        this.cgb[5] = np * (601676 / 22275);
        this.cbg[5] = np * (444337 / 155925);
        np = Math.pow(n, 2);
        this.Qn = this.k0 / (1 + n) * (1 + np * (1 / 4 + np * (1 / 64 + np / 256)));
        this.utg[0] = n * (-0.5 + n * (2 / 3 + n * (-37 / 96 + n * (1 / 360 + n * (81 / 512 + n * (-96199 / 604800))))));
        this.gtu[0] = n * (0.5 + n * (-2 / 3 + n * (5 / 16 + n * (41 / 180 + n * (-127 / 288 + n * (7891 / 37800))))));
        this.utg[1] = np * (-1 / 48 + n * (-1 / 15 + n * (437 / 1440 + n * (-46 / 105 + n * (1118711 / 3870720)))));
        this.gtu[1] = np * (13 / 48 + n * (-3 / 5 + n * (557 / 1440 + n * (281 / 630 + n * (-1983433 / 1935360)))));
        np = np * n;
        this.utg[2] = np * (-17 / 480 + n * (37 / 840 + n * (209 / 4480 + n * (-5569 / 90720))));
        this.gtu[2] = np * (61 / 240 + n * (-103 / 140 + n * (15061 / 26880 + n * (167603 / 181440))));
        np = np * n;
        this.utg[3] = np * (-4397 / 161280 + n * (11 / 504 + n * (830251 / 7257600)));
        this.gtu[3] = np * (49561 / 161280 + n * (-179 / 168 + n * (6601661 / 7257600)));
        np = np * n;
        this.utg[4] = np * (-4583 / 161280 + n * (108847 / 3991680));
        this.gtu[4] = np * (34729 / 80640 + n * (-3418889 / 1995840));
        np = np * n;
        this.utg[5] = np * (-20648693 / 638668800);
        this.gtu[5] = np * (212378941 / 319334400);
        var Z2 = gatg(this.cbg, this.lat0);
        this.Zb = -this.Qn * (Z2 + clens(this.gtu, 2 * Z2));
      }
      function forward$u(p) {
        var Ce = adjust_lon(p.x - this.long0, this.over);
        var Cn = p.y;
        Cn = gatg(this.cbg, Cn);
        var sin_Cn = Math.sin(Cn);
        var cos_Cn = Math.cos(Cn);
        var sin_Ce = Math.sin(Ce);
        var cos_Ce = Math.cos(Ce);
        Cn = Math.atan2(sin_Cn, cos_Ce * cos_Cn);
        Ce = Math.atan2(sin_Ce * cos_Cn, hypot(sin_Cn, cos_Cn * cos_Ce));
        Ce = asinhy(Math.tan(Ce));
        var tmp = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);
        Cn = Cn + tmp[0];
        Ce = Ce + tmp[1];
        var x;
        var y;
        if (Math.abs(Ce) <= 2.623395162778) {
          x = this.a * (this.Qn * Ce) + this.x0;
          y = this.a * (this.Qn * Cn + this.Zb) + this.y0;
        } else {
          x = Infinity;
          y = Infinity;
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$u(p) {
        var Ce = (p.x - this.x0) * (1 / this.a);
        var Cn = (p.y - this.y0) * (1 / this.a);
        Cn = (Cn - this.Zb) / this.Qn;
        Ce = Ce / this.Qn;
        var lon;
        var lat;
        if (Math.abs(Ce) <= 2.623395162778) {
          var tmp = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);
          Cn = Cn + tmp[0];
          Ce = Ce + tmp[1];
          Ce = Math.atan(sinh(Ce));
          var sin_Cn = Math.sin(Cn);
          var cos_Cn = Math.cos(Cn);
          var sin_Ce = Math.sin(Ce);
          var cos_Ce = Math.cos(Ce);
          Cn = Math.atan2(sin_Cn * cos_Ce, hypot(sin_Ce, cos_Ce * cos_Cn));
          Ce = Math.atan2(sin_Ce, cos_Ce * cos_Cn);
          lon = adjust_lon(Ce + this.long0, this.over);
          lat = gatg(this.cgb, Cn);
        } else {
          lon = Infinity;
          lat = Infinity;
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$v = ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "Gauss Kruger", "Gauss_Kruger", "tmerc"];
      var etmerc = {
        init: init$w,
        forward: forward$u,
        inverse: inverse$u,
        names: names$v
      };
      function adjust_zone(zone, lon) {
        if (zone === void 0) {
          zone = Math.floor((adjust_lon(lon) + Math.PI) * 30 / Math.PI) + 1;
          if (zone < 0) {
            return 0;
          } else if (zone > 60) {
            return 60;
          }
        }
        return zone;
      }
      var dependsOn = "etmerc";
      function init$v() {
        var zone = adjust_zone(this.zone, this.long0);
        if (zone === void 0) {
          throw new Error("unknown utm zone");
        }
        this.lat0 = 0;
        this.long0 = (6 * Math.abs(zone) - 183) * D2R$1;
        this.x0 = 5e5;
        this.y0 = this.utmSouth ? 1e7 : 0;
        this.k0 = 0.9996;
        etmerc.init.apply(this);
        this.forward = etmerc.forward;
        this.inverse = etmerc.inverse;
      }
      var names$u = ["Universal Transverse Mercator System", "utm"];
      var utm = {
        init: init$v,
        names: names$u,
        dependsOn
      };
      function srat(esinp, exp) {
        return Math.pow((1 - esinp) / (1 + esinp), exp);
      }
      var MAX_ITER$2 = 20;
      function init$u() {
        var sphi = Math.sin(this.lat0);
        var cphi = Math.cos(this.lat0);
        cphi *= cphi;
        this.rc = Math.sqrt(1 - this.es) / (1 - this.es * sphi * sphi);
        this.C = Math.sqrt(1 + this.es * cphi * cphi / (1 - this.es));
        this.phic0 = Math.asin(sphi / this.C);
        this.ratexp = 0.5 * this.C * this.e;
        this.K = Math.tan(0.5 * this.phic0 + FORTPI) / (Math.pow(Math.tan(0.5 * this.lat0 + FORTPI), this.C) * srat(this.e * sphi, this.ratexp));
      }
      function forward$t(p) {
        var lon = p.x;
        var lat = p.y;
        p.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * lat + FORTPI), this.C) * srat(this.e * Math.sin(lat), this.ratexp)) - HALF_PI;
        p.x = this.C * lon;
        return p;
      }
      function inverse$t(p) {
        var DEL_TOL = 1e-14;
        var lon = p.x / this.C;
        var lat = p.y;
        var num = Math.pow(Math.tan(0.5 * lat + FORTPI) / this.K, 1 / this.C);
        for (var i = MAX_ITER$2; i > 0; --i) {
          lat = 2 * Math.atan(num * srat(this.e * Math.sin(p.y), -0.5 * this.e)) - HALF_PI;
          if (Math.abs(lat - p.y) < DEL_TOL) {
            break;
          }
          p.y = lat;
        }
        if (!i) {
          return null;
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var gauss = {
        init: init$u,
        forward: forward$t,
        inverse: inverse$t
      };
      function init$t() {
        gauss.init.apply(this);
        if (!this.rc) {
          return;
        }
        this.sinc0 = Math.sin(this.phic0);
        this.cosc0 = Math.cos(this.phic0);
        this.R2 = 2 * this.rc;
        if (!this.title) {
          this.title = "Oblique Stereographic Alternative";
        }
      }
      function forward$s(p) {
        var sinc, cosc, cosl, k;
        p.x = adjust_lon(p.x - this.long0, this.over);
        gauss.forward.apply(this, [p]);
        sinc = Math.sin(p.y);
        cosc = Math.cos(p.y);
        cosl = Math.cos(p.x);
        k = this.k0 * this.R2 / (1 + this.sinc0 * sinc + this.cosc0 * cosc * cosl);
        p.x = k * cosc * Math.sin(p.x);
        p.y = k * (this.cosc0 * sinc - this.sinc0 * cosc * cosl);
        p.x = this.a * p.x + this.x0;
        p.y = this.a * p.y + this.y0;
        return p;
      }
      function inverse$s(p) {
        var sinc, cosc, lon, lat, rho;
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        p.x /= this.k0;
        p.y /= this.k0;
        if (rho = hypot(p.x, p.y)) {
          var c = 2 * Math.atan2(rho, this.R2);
          sinc = Math.sin(c);
          cosc = Math.cos(c);
          lat = Math.asin(cosc * this.sinc0 + p.y * sinc * this.cosc0 / rho);
          lon = Math.atan2(p.x * sinc, rho * this.cosc0 * cosc - p.y * this.sinc0 * sinc);
        } else {
          lat = this.phic0;
          lon = 0;
        }
        p.x = lon;
        p.y = lat;
        gauss.inverse.apply(this, [p]);
        p.x = adjust_lon(p.x + this.long0, this.over);
        return p;
      }
      var names$t = ["Stereographic_North_Pole", "Oblique_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"];
      var sterea = {
        init: init$t,
        forward: forward$s,
        inverse: inverse$s,
        names: names$t
      };
      function ssfn_(phit, sinphi, eccen) {
        sinphi *= eccen;
        return Math.tan(0.5 * (HALF_PI + phit)) * Math.pow((1 - sinphi) / (1 + sinphi), 0.5 * eccen);
      }
      function init$s() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.lat0 = this.lat0 || 0;
        this.long0 = this.long0 || 0;
        this.coslat0 = Math.cos(this.lat0);
        this.sinlat0 = Math.sin(this.lat0);
        if (this.sphere) {
          if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN) {
            this.k0 = 0.5 * (1 + sign(this.lat0) * Math.sin(this.lat_ts));
          }
        } else {
          if (Math.abs(this.coslat0) <= EPSLN) {
            if (this.lat0 > 0) {
              this.con = 1;
            } else {
              this.con = -1;
            }
          }
          this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e));
          if (!isNaN(this.lat_ts) && Math.abs(this.coslat0) <= EPSLN && Math.abs(Math.cos(this.lat_ts)) > EPSLN) {
            this.k0 = 0.5 * this.cons * msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)) / tsfnz(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts));
          }
          this.ms1 = msfnz(this.e, this.sinlat0, this.coslat0);
          this.X0 = 2 * Math.atan(ssfn_(this.lat0, this.sinlat0, this.e)) - HALF_PI;
          this.cosX0 = Math.cos(this.X0);
          this.sinX0 = Math.sin(this.X0);
        }
      }
      function forward$r(p) {
        var lon = p.x;
        var lat = p.y;
        var sinlat = Math.sin(lat);
        var coslat = Math.cos(lat);
        var A5, X, sinX, cosX, ts, rh;
        var dlon = adjust_lon(lon - this.long0, this.over);
        if (Math.abs(Math.abs(lon - this.long0) - Math.PI) <= EPSLN && Math.abs(lat + this.lat0) <= EPSLN) {
          p.x = NaN;
          p.y = NaN;
          return p;
        }
        if (this.sphere) {
          A5 = 2 * this.k0 / (1 + this.sinlat0 * sinlat + this.coslat0 * coslat * Math.cos(dlon));
          p.x = this.a * A5 * coslat * Math.sin(dlon) + this.x0;
          p.y = this.a * A5 * (this.coslat0 * sinlat - this.sinlat0 * coslat * Math.cos(dlon)) + this.y0;
          return p;
        } else {
          X = 2 * Math.atan(ssfn_(lat, sinlat, this.e)) - HALF_PI;
          cosX = Math.cos(X);
          sinX = Math.sin(X);
          if (Math.abs(this.coslat0) <= EPSLN) {
            ts = tsfnz(this.e, lat * this.con, this.con * sinlat);
            rh = 2 * this.a * this.k0 * ts / this.cons;
            p.x = this.x0 + rh * Math.sin(lon - this.long0);
            p.y = this.y0 - this.con * rh * Math.cos(lon - this.long0);
            return p;
          } else if (Math.abs(this.sinlat0) < EPSLN) {
            A5 = 2 * this.a * this.k0 / (1 + cosX * Math.cos(dlon));
            p.y = A5 * sinX;
          } else {
            A5 = 2 * this.a * this.k0 * this.ms1 / (this.cosX0 * (1 + this.sinX0 * sinX + this.cosX0 * cosX * Math.cos(dlon)));
            p.y = A5 * (this.cosX0 * sinX - this.sinX0 * cosX * Math.cos(dlon)) + this.y0;
          }
          p.x = A5 * cosX * Math.sin(dlon) + this.x0;
        }
        return p;
      }
      function inverse$r(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon, lat, ts, ce, Chi;
        var rh = Math.sqrt(p.x * p.x + p.y * p.y);
        if (this.sphere) {
          var c = 2 * Math.atan(rh / (2 * this.a * this.k0));
          lon = this.long0;
          lat = this.lat0;
          if (rh <= EPSLN) {
            p.x = lon;
            p.y = lat;
            return p;
          }
          lat = Math.asin(Math.cos(c) * this.sinlat0 + p.y * Math.sin(c) * this.coslat0 / rh);
          if (Math.abs(this.coslat0) < EPSLN) {
            if (this.lat0 > 0) {
              lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
            } else {
              lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y), this.over);
            }
          } else {
            lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(c), rh * this.coslat0 * Math.cos(c) - p.y * this.sinlat0 * Math.sin(c)), this.over);
          }
          p.x = lon;
          p.y = lat;
          return p;
        } else {
          if (Math.abs(this.coslat0) <= EPSLN) {
            if (rh <= EPSLN) {
              lat = this.lat0;
              lon = this.long0;
              p.x = lon;
              p.y = lat;
              return p;
            }
            p.x *= this.con;
            p.y *= this.con;
            ts = rh * this.cons / (2 * this.a * this.k0);
            lat = this.con * phi2z(this.e, ts);
            lon = this.con * adjust_lon(this.con * this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
          } else {
            ce = 2 * Math.atan(rh * this.cosX0 / (2 * this.a * this.k0 * this.ms1));
            lon = this.long0;
            if (rh <= EPSLN) {
              Chi = this.X0;
            } else {
              Chi = Math.asin(Math.cos(ce) * this.sinX0 + p.y * Math.sin(ce) * this.cosX0 / rh);
              lon = adjust_lon(this.long0 + Math.atan2(p.x * Math.sin(ce), rh * this.cosX0 * Math.cos(ce) - p.y * this.sinX0 * Math.sin(ce)), this.over);
            }
            lat = -1 * phi2z(this.e, Math.tan(0.5 * (HALF_PI + Chi)));
          }
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$s = ["stere", "Stereographic_South_Pole", "Polar_Stereographic_variant_A", "Polar_Stereographic_variant_B", "Polar_Stereographic"];
      var stere = {
        init: init$s,
        forward: forward$r,
        inverse: inverse$r,
        names: names$s,
        ssfn_
      };
      function init$r() {
        if (!this.k0) {
          this.k0 = 1;
        }
        var phy0 = this.lat0;
        this.lambda0 = this.long0;
        var sinPhy0 = Math.sin(phy0);
        var semiMajorAxis = this.a;
        var invF = this.rf;
        var flattening = 1 / invF;
        var e2 = 2 * flattening - Math.pow(flattening, 2);
        var e = this.e = Math.sqrt(e2);
        this.R = this.k0 * semiMajorAxis * Math.sqrt(1 - e2) / (1 - e2 * Math.pow(sinPhy0, 2));
        this.alpha = Math.sqrt(1 + e2 / (1 - e2) * Math.pow(Math.cos(phy0), 4));
        this.b0 = Math.asin(sinPhy0 / this.alpha);
        var k1 = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2));
        var k2 = Math.log(Math.tan(Math.PI / 4 + phy0 / 2));
        var k3 = Math.log((1 + e * sinPhy0) / (1 - e * sinPhy0));
        this.K = k1 - this.alpha * k2 + this.alpha * e / 2 * k3;
      }
      function forward$q(p) {
        var Sa1 = Math.log(Math.tan(Math.PI / 4 - p.y / 2));
        var Sa2 = this.e / 2 * Math.log((1 + this.e * Math.sin(p.y)) / (1 - this.e * Math.sin(p.y)));
        var S = -this.alpha * (Sa1 + Sa2) + this.K;
        var b = 2 * (Math.atan(Math.exp(S)) - Math.PI / 4);
        var I2 = this.alpha * (p.x - this.lambda0);
        var rotI = Math.atan(Math.sin(I2) / (Math.sin(this.b0) * Math.tan(b) + Math.cos(this.b0) * Math.cos(I2)));
        var rotB = Math.asin(Math.cos(this.b0) * Math.sin(b) - Math.sin(this.b0) * Math.cos(b) * Math.cos(I2));
        p.y = this.R / 2 * Math.log((1 + Math.sin(rotB)) / (1 - Math.sin(rotB))) + this.y0;
        p.x = this.R * rotI + this.x0;
        return p;
      }
      function inverse$q(p) {
        var Y = p.x - this.x0;
        var X = p.y - this.y0;
        var rotI = Y / this.R;
        var rotB = 2 * (Math.atan(Math.exp(X / this.R)) - Math.PI / 4);
        var b = Math.asin(Math.cos(this.b0) * Math.sin(rotB) + Math.sin(this.b0) * Math.cos(rotB) * Math.cos(rotI));
        var I2 = Math.atan(Math.sin(rotI) / (Math.cos(this.b0) * Math.cos(rotI) - Math.sin(this.b0) * Math.tan(rotB)));
        var lambda = this.lambda0 + I2 / this.alpha;
        var S = 0;
        var phy = b;
        var prevPhy = -1e3;
        var iteration = 0;
        while (Math.abs(phy - prevPhy) > 1e-7) {
          if (++iteration > 20) {
            return;
          }
          S = 1 / this.alpha * (Math.log(Math.tan(Math.PI / 4 + b / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(phy)) / 2));
          prevPhy = phy;
          phy = 2 * Math.atan(Math.exp(S)) - Math.PI / 2;
        }
        p.x = lambda;
        p.y = phy;
        return p;
      }
      var names$r = ["somerc"];
      var somerc = {
        init: init$r,
        forward: forward$q,
        inverse: inverse$q,
        names: names$r
      };
      var TOL = 1e-7;
      function isTypeA(P) {
        var typeAProjections = ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"];
        var projectionName = typeof P.projName === "object" ? Object.keys(P.projName)[0] : P.projName;
        return "no_uoff" in P || "no_off" in P || typeAProjections.indexOf(projectionName) !== -1 || typeAProjections.indexOf(getNormalizedProjName(projectionName)) !== -1;
      }
      function init$q() {
        var con, com, cosph0, D, F, H, L, sinph0, p, J, gamma = 0, gamma0, lamc = 0, lam1 = 0, lam2 = 0, phi1 = 0, phi2 = 0, alpha_c = 0;
        if (!this.k0) {
          this.k0 = 1;
        }
        this.no_off = isTypeA(this);
        this.no_rot = "no_rot" in this;
        var alp = false;
        if ("alpha" in this) {
          alp = true;
        }
        var gam = false;
        if ("rectified_grid_angle" in this) {
          gam = true;
        }
        if (alp) {
          alpha_c = this.alpha;
        }
        if (gam) {
          gamma = this.rectified_grid_angle;
          if (!alp) {
            alpha_c = 0;
            alp = true;
          }
        }
        if (alp || gam) {
          lamc = this.longc;
        } else {
          lam1 = this.long1;
          phi1 = this.lat1;
          lam2 = this.long2;
          phi2 = this.lat2;
          if (Math.abs(phi1 - phi2) <= TOL || (con = Math.abs(phi1)) <= TOL || Math.abs(con - HALF_PI) <= TOL || Math.abs(Math.abs(this.lat0) - HALF_PI) <= TOL || Math.abs(Math.abs(phi2) - HALF_PI) <= TOL) {
            throw new Error();
          }
        }
        var one_es = 1 - this.es;
        com = Math.sqrt(one_es);
        if (Math.abs(this.lat0) > EPSLN) {
          sinph0 = Math.sin(this.lat0);
          cosph0 = Math.cos(this.lat0);
          con = 1 - this.es * sinph0 * sinph0;
          this.B = cosph0 * cosph0;
          this.B = Math.sqrt(1 + this.es * this.B * this.B / one_es);
          this.A = this.B * this.k0 * com / con;
          D = this.B * com / (cosph0 * Math.sqrt(con));
          F = D * D - 1;
          if (F <= 0) {
            F = 0;
          } else {
            F = Math.sqrt(F);
            if (this.lat0 < 0) {
              F = -F;
            }
          }
          this.E = F += D;
          this.E *= Math.pow(tsfnz(this.e, this.lat0, sinph0), this.B);
        } else {
          this.B = 1 / com;
          this.A = this.k0;
          this.E = D = F = 1;
        }
        if (alp || gam) {
          if (alp) {
            gamma0 = Math.asin(Math.sin(alpha_c) / D);
            if (!gam) {
              gamma = alpha_c;
            }
          } else {
            gamma0 = gamma;
            alpha_c = Math.asin(D * Math.sin(gamma0));
          }
          this.lam0 = lamc - Math.asin(0.5 * (F - 1 / F) * Math.tan(gamma0)) / this.B;
        } else {
          H = Math.pow(tsfnz(this.e, phi1, Math.sin(phi1)), this.B);
          L = Math.pow(tsfnz(this.e, phi2, Math.sin(phi2)), this.B);
          F = this.E / H;
          p = (L - H) / (L + H);
          J = this.E * this.E;
          J = (J - L * H) / (J + L * H);
          con = lam1 - lam2;
          if (con < -Math.PI) {
            lam2 -= TWO_PI;
          } else if (con > Math.PI) {
            lam2 += TWO_PI;
          }
          this.lam0 = adjust_lon(0.5 * (lam1 + lam2) - Math.atan(J * Math.tan(0.5 * this.B * (lam1 - lam2)) / p) / this.B, this.over);
          gamma0 = Math.atan(2 * Math.sin(this.B * adjust_lon(lam1 - this.lam0, this.over)) / (F - 1 / F));
          gamma = alpha_c = Math.asin(D * Math.sin(gamma0));
        }
        this.singam = Math.sin(gamma0);
        this.cosgam = Math.cos(gamma0);
        this.sinrot = Math.sin(gamma);
        this.cosrot = Math.cos(gamma);
        this.rB = 1 / this.B;
        this.ArB = this.A * this.rB;
        this.BrA = 1 / this.ArB;
        if (this.no_off) {
          this.u_0 = 0;
        } else {
          this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(D * D - 1) / Math.cos(alpha_c)));
          if (this.lat0 < 0) {
            this.u_0 = -this.u_0;
          }
        }
        F = 0.5 * gamma0;
        this.v_pole_n = this.ArB * Math.log(Math.tan(FORTPI - F));
        this.v_pole_s = this.ArB * Math.log(Math.tan(FORTPI + F));
      }
      function forward$p(p) {
        var coords = {};
        var S, T, U, V2, W, temp, u, v;
        p.x = p.x - this.lam0;
        if (Math.abs(Math.abs(p.y) - HALF_PI) > EPSLN) {
          W = this.E / Math.pow(tsfnz(this.e, p.y, Math.sin(p.y)), this.B);
          temp = 1 / W;
          S = 0.5 * (W - temp);
          T = 0.5 * (W + temp);
          V2 = Math.sin(this.B * p.x);
          U = (S * this.singam - V2 * this.cosgam) / T;
          if (Math.abs(Math.abs(U) - 1) < EPSLN) {
            throw new Error();
          }
          v = 0.5 * this.ArB * Math.log((1 - U) / (1 + U));
          temp = Math.cos(this.B * p.x);
          if (Math.abs(temp) < TOL) {
            u = this.A * p.x;
          } else {
            u = this.ArB * Math.atan2(S * this.cosgam + V2 * this.singam, temp);
          }
        } else {
          v = p.y > 0 ? this.v_pole_n : this.v_pole_s;
          u = this.ArB * p.y;
        }
        if (this.no_rot) {
          coords.x = u;
          coords.y = v;
        } else {
          u -= this.u_0;
          coords.x = v * this.cosrot + u * this.sinrot;
          coords.y = u * this.cosrot - v * this.sinrot;
        }
        coords.x = this.a * coords.x + this.x0;
        coords.y = this.a * coords.y + this.y0;
        if (p.z !== void 0) {
          coords.z = p.z;
        }
        if (p.m !== void 0) {
          coords.m = p.m;
        }
        return coords;
      }
      function inverse$p(p) {
        var u, v, Qp, Sp, Tp, Vp, Up;
        var coords = {};
        p.x = (p.x - this.x0) * (1 / this.a);
        p.y = (p.y - this.y0) * (1 / this.a);
        if (this.no_rot) {
          v = p.y;
          u = p.x;
        } else {
          v = p.x * this.cosrot - p.y * this.sinrot;
          u = p.y * this.cosrot + p.x * this.sinrot + this.u_0;
        }
        Qp = Math.exp(-this.BrA * v);
        Sp = 0.5 * (Qp - 1 / Qp);
        Tp = 0.5 * (Qp + 1 / Qp);
        Vp = Math.sin(this.BrA * u);
        Up = (Vp * this.cosgam + Sp * this.singam) / Tp;
        if (Math.abs(Math.abs(Up) - 1) < EPSLN) {
          coords.x = 0;
          coords.y = Up < 0 ? -HALF_PI : HALF_PI;
        } else {
          coords.y = this.E / Math.sqrt((1 + Up) / (1 - Up));
          coords.y = phi2z(this.e, Math.pow(coords.y, 1 / this.B));
          if (coords.y === Infinity) {
            throw new Error();
          }
          coords.x = -this.rB * Math.atan2(Sp * this.cosgam - Vp * this.singam, Math.cos(this.BrA * u));
        }
        coords.x += this.lam0;
        if (p.z !== void 0) {
          coords.z = p.z;
        }
        if (p.m !== void 0) {
          coords.m = p.m;
        }
        return coords;
      }
      var names$q = ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_variant_A", "Hotine_Oblique_Mercator_Variant_B", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"];
      var omerc = {
        init: init$q,
        forward: forward$p,
        inverse: inverse$p,
        names: names$q
      };
      function init$p() {
        if (!this.lat2) {
          this.lat2 = this.lat1;
        }
        if (!this.k0) {
          this.k0 = 1;
        }
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.long0 = this.long0 || 0;
        if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
          return;
        }
        var temp = this.b / this.a;
        this.e = Math.sqrt(1 - temp * temp);
        var sin1 = Math.sin(this.lat1);
        var cos1 = Math.cos(this.lat1);
        var ms1 = msfnz(this.e, sin1, cos1);
        var ts1 = tsfnz(this.e, this.lat1, sin1);
        var sin2 = Math.sin(this.lat2);
        var cos2 = Math.cos(this.lat2);
        var ms2 = msfnz(this.e, sin2, cos2);
        var ts2 = tsfnz(this.e, this.lat2, sin2);
        var ts0 = tsfnz(this.e, this.lat0, Math.sin(this.lat0));
        if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
          this.ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
        } else {
          this.ns = sin1;
        }
        if (isNaN(this.ns)) {
          this.ns = sin1;
        }
        this.f0 = ms1 / (this.ns * Math.pow(ts1, this.ns));
        this.rh = Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN ? 0 : this.a * this.f0 * Math.pow(ts0, this.ns);
        if (!this.title) {
          this.title = "Lambert Conformal Conic";
        }
      }
      function forward$o(p) {
        var lon = p.x;
        var lat = p.y;
        if (Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
          lat = sign(lat) * (HALF_PI - 2 * EPSLN);
        }
        var con = Math.abs(Math.abs(lat) - HALF_PI);
        var ts, rh1;
        if (con > EPSLN) {
          ts = tsfnz(this.e, lat, Math.sin(lat));
          rh1 = this.a * this.f0 * Math.pow(ts, this.ns);
        } else {
          con = lat * this.ns;
          if (con <= 0) {
            return null;
          }
          rh1 = 0;
        }
        var theta = this.ns * adjust_lon(lon - this.long0, this.over);
        p.x = this.k0 * (rh1 * Math.sin(theta)) + this.x0;
        p.y = this.k0 * (this.rh - rh1 * Math.cos(theta)) + this.y0;
        return p;
      }
      function inverse$o(p) {
        var rh1, con, ts;
        var lat, lon;
        var x = (p.x - this.x0) / this.k0;
        var y = this.rh - (p.y - this.y0) / this.k0;
        if (this.ns > 0) {
          rh1 = Math.sqrt(x * x + y * y);
          con = 1;
        } else {
          rh1 = -Math.sqrt(x * x + y * y);
          con = -1;
        }
        var theta = 0;
        if (rh1 !== 0) {
          theta = Math.atan2(con * x, con * y);
        }
        if (rh1 !== 0 || this.ns > 0) {
          con = 1 / this.ns;
          ts = Math.pow(rh1 / (this.a * this.f0), con);
          lat = phi2z(this.e, ts);
          if (lat === -9999) {
            return null;
          }
        } else {
          lat = -HALF_PI;
        }
        lon = adjust_lon(theta / this.ns + this.long0, this.over);
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$p = [
        "Lambert Tangential Conformal Conic Projection",
        "Lambert_Conformal_Conic",
        "Lambert_Conformal_Conic_1SP",
        "Lambert_Conformal_Conic_2SP",
        "lcc",
        "Lambert Conic Conformal (1SP)",
        "Lambert Conic Conformal (2SP)"
      ];
      var lcc = {
        init: init$p,
        forward: forward$o,
        inverse: inverse$o,
        names: names$p
      };
      function init$o() {
        this.a = 6377397155e-3;
        this.es = 0.006674372230614;
        this.e = Math.sqrt(this.es);
        if (!this.lat0) {
          this.lat0 = 0.863937979737193;
        }
        if (!this.long0) {
          this.long0 = 0.7417649320975901 - 0.308341501185665;
        }
        if (!this.k0) {
          this.k0 = 0.9999;
        }
        this.s45 = 0.785398163397448;
        this.s90 = 2 * this.s45;
        this.fi0 = this.lat0;
        this.e2 = this.es;
        this.e = Math.sqrt(this.e2);
        this.alfa = Math.sqrt(1 + this.e2 * Math.pow(Math.cos(this.fi0), 4) / (1 - this.e2));
        this.uq = 1.04216856380474;
        this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa);
        this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), this.alfa * this.e / 2);
        this.k = Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa) * this.g;
        this.k1 = this.k0;
        this.n0 = this.a * Math.sqrt(1 - this.e2) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2));
        this.s0 = 1.37008346281555;
        this.n = Math.sin(this.s0);
        this.ro0 = this.k1 * this.n0 / Math.tan(this.s0);
        this.ad = this.s90 - this.uq;
      }
      function forward$n(p) {
        var gfi, u, deltav, s, d, eps, ro;
        var lon = p.x;
        var lat = p.y;
        var delta_lon = adjust_lon(lon - this.long0, this.over);
        gfi = Math.pow((1 + this.e * Math.sin(lat)) / (1 - this.e * Math.sin(lat)), this.alfa * this.e / 2);
        u = 2 * (Math.atan(this.k * Math.pow(Math.tan(lat / 2 + this.s45), this.alfa) / gfi) - this.s45);
        deltav = -delta_lon * this.alfa;
        s = Math.asin(Math.cos(this.ad) * Math.sin(u) + Math.sin(this.ad) * Math.cos(u) * Math.cos(deltav));
        d = Math.asin(Math.cos(u) * Math.sin(deltav) / Math.cos(s));
        eps = this.n * d;
        ro = this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n) / Math.pow(Math.tan(s / 2 + this.s45), this.n);
        p.y = ro * Math.cos(eps) / 1;
        p.x = ro * Math.sin(eps) / 1;
        if (!this.czech) {
          p.y *= -1;
          p.x *= -1;
        }
        return p;
      }
      function inverse$n(p) {
        var u, deltav, s, d, eps, ro, fi1;
        var ok;
        var tmp = p.x;
        p.x = p.y;
        p.y = tmp;
        if (!this.czech) {
          p.y *= -1;
          p.x *= -1;
        }
        ro = Math.sqrt(p.x * p.x + p.y * p.y);
        eps = Math.atan2(p.y, p.x);
        d = eps / Math.sin(this.s0);
        s = 2 * (Math.atan(Math.pow(this.ro0 / ro, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45);
        u = Math.asin(Math.cos(this.ad) * Math.sin(s) - Math.sin(this.ad) * Math.cos(s) * Math.cos(d));
        deltav = Math.asin(Math.cos(s) * Math.sin(d) / Math.cos(u));
        p.x = this.long0 - deltav / this.alfa;
        fi1 = u;
        ok = 0;
        var iter = 0;
        do {
          p.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(u / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(fi1)) / (1 - this.e * Math.sin(fi1)), this.e / 2)) - this.s45);
          if (Math.abs(fi1 - p.y) < 1e-10) {
            ok = 1;
          }
          fi1 = p.y;
          iter += 1;
        } while (ok === 0 && iter < 15);
        if (iter >= 15) {
          return null;
        }
        return p;
      }
      var names$o = ["Krovak", "Krovak Modified", "Krovak (North Orientated)", "Krovak Modified (North Orientated)", "krovak"];
      var krovak = {
        init: init$o,
        forward: forward$n,
        inverse: inverse$n,
        names: names$o
      };
      function mlfn(e0, e1, e2, e3, phi) {
        return e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi);
      }
      function e0fn(x) {
        return 1 - 0.25 * x * (1 + x / 16 * (3 + 1.25 * x));
      }
      function e1fn(x) {
        return 0.375 * x * (1 + 0.25 * x * (1 + 0.46875 * x));
      }
      function e2fn(x) {
        return 0.05859375 * x * x * (1 + 0.75 * x);
      }
      function e3fn(x) {
        return x * x * x * (35 / 3072);
      }
      function gN(a, e, sinphi) {
        var temp = e * sinphi;
        return a / Math.sqrt(1 - temp * temp);
      }
      function adjust_lat(x) {
        return Math.abs(x) < HALF_PI ? x : x - sign(x) * Math.PI;
      }
      function imlfn(ml, e0, e1, e2, e3) {
        var phi;
        var dphi;
        phi = ml / e0;
        for (var i = 0; i < 15; i++) {
          dphi = (ml - (e0 * phi - e1 * Math.sin(2 * phi) + e2 * Math.sin(4 * phi) - e3 * Math.sin(6 * phi))) / (e0 - 2 * e1 * Math.cos(2 * phi) + 4 * e2 * Math.cos(4 * phi) - 6 * e3 * Math.cos(6 * phi));
          phi += dphi;
          if (Math.abs(dphi) <= 1e-10) {
            return phi;
          }
        }
        return NaN;
      }
      function init$n() {
        if (!this.sphere) {
          this.e0 = e0fn(this.es);
          this.e1 = e1fn(this.es);
          this.e2 = e2fn(this.es);
          this.e3 = e3fn(this.es);
          this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
        }
      }
      function forward$m(p) {
        var x, y;
        var lam = p.x;
        var phi = p.y;
        lam = adjust_lon(lam - this.long0, this.over);
        if (this.sphere) {
          x = this.a * Math.asin(Math.cos(phi) * Math.sin(lam));
          y = this.a * (Math.atan2(Math.tan(phi), Math.cos(lam)) - this.lat0);
        } else {
          var sinphi = Math.sin(phi);
          var cosphi = Math.cos(phi);
          var nl = gN(this.a, this.e, sinphi);
          var tl = Math.tan(phi) * Math.tan(phi);
          var al = lam * Math.cos(phi);
          var asq = al * al;
          var cl = this.es * cosphi * cosphi / (1 - this.es);
          var ml = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
          x = nl * al * (1 - asq * tl * (1 / 6 - (8 - tl + 8 * cl) * asq / 120));
          y = ml - this.ml0 + nl * sinphi / cosphi * asq * (0.5 + (5 - tl + 6 * cl) * asq / 24);
        }
        p.x = x + this.x0;
        p.y = y + this.y0;
        return p;
      }
      function inverse$m(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var x = p.x / this.a;
        var y = p.y / this.a;
        var phi, lam;
        if (this.sphere) {
          var dd = y + this.lat0;
          phi = Math.asin(Math.sin(dd) * Math.cos(x));
          lam = Math.atan2(Math.tan(x), Math.cos(dd));
        } else {
          var ml1 = this.ml0 / this.a + y;
          var phi1 = imlfn(ml1, this.e0, this.e1, this.e2, this.e3);
          if (Math.abs(Math.abs(phi1) - HALF_PI) <= EPSLN) {
            p.x = this.long0;
            p.y = HALF_PI;
            if (y < 0) {
              p.y *= -1;
            }
            return p;
          }
          var nl1 = gN(this.a, this.e, Math.sin(phi1));
          var rl1 = nl1 * nl1 * nl1 / this.a / this.a * (1 - this.es);
          var tl1 = Math.pow(Math.tan(phi1), 2);
          var dl = x * this.a / nl1;
          var dsq = dl * dl;
          phi = phi1 - nl1 * Math.tan(phi1) / rl1 * dl * dl * (0.5 - (1 + 3 * tl1) * dl * dl / 24);
          lam = dl * (1 - dsq * (tl1 / 3 + (1 + 3 * tl1) * tl1 * dsq / 15)) / Math.cos(phi1);
        }
        p.x = adjust_lon(lam + this.long0, this.over);
        p.y = adjust_lat(phi);
        return p;
      }
      var names$n = ["Cassini", "Cassini_Soldner", "cass"];
      var cass = {
        init: init$n,
        forward: forward$m,
        inverse: inverse$m,
        names: names$n
      };
      function qsfnz(eccent, sinphi) {
        var con;
        if (eccent > 1e-7) {
          con = eccent * sinphi;
          return (1 - eccent * eccent) * (sinphi / (1 - con * con) - 0.5 / eccent * Math.log((1 - con) / (1 + con)));
        } else {
          return 2 * sinphi;
        }
      }
      var P00 = 0.3333333333333333;
      var P01 = 0.17222222222222222;
      var P02 = 0.10257936507936508;
      var P10 = 0.06388888888888888;
      var P11 = 0.0664021164021164;
      var P20 = 0.016415012942191543;
      function authset(es) {
        var t;
        var APA = [];
        APA[0] = es * P00;
        t = es * es;
        APA[0] += t * P01;
        APA[1] = t * P10;
        t *= es;
        APA[0] += t * P02;
        APA[1] += t * P11;
        APA[2] = t * P20;
        return APA;
      }
      function authlat(beta, APA) {
        var t = beta + beta;
        return beta + APA[0] * Math.sin(t) + APA[1] * Math.sin(t + t) + APA[2] * Math.sin(t + t + t);
      }
      var S_POLE = 1;
      var N_POLE = 2;
      var EQUIT = 3;
      var OBLIQ = 4;
      function init$m() {
        var t = Math.abs(this.lat0);
        if (Math.abs(t - HALF_PI) < EPSLN) {
          this.mode = this.lat0 < 0 ? S_POLE : N_POLE;
        } else if (Math.abs(t) < EPSLN) {
          this.mode = EQUIT;
        } else {
          this.mode = OBLIQ;
        }
        if (this.es > 0) {
          var sinphi;
          this.qp = qsfnz(this.e, 1);
          this.mmf = 0.5 / (1 - this.es);
          this.apa = authset(this.es);
          switch (this.mode) {
            case N_POLE:
              this.dd = 1;
              break;
            case S_POLE:
              this.dd = 1;
              break;
            case EQUIT:
              this.rq = Math.sqrt(0.5 * this.qp);
              this.dd = 1 / this.rq;
              this.xmf = 1;
              this.ymf = 0.5 * this.qp;
              break;
            case OBLIQ:
              this.rq = Math.sqrt(0.5 * this.qp);
              sinphi = Math.sin(this.lat0);
              this.sinb1 = qsfnz(this.e, sinphi) / this.qp;
              this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1);
              this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * sinphi * sinphi) * this.rq * this.cosb1);
              this.ymf = (this.xmf = this.rq) / this.dd;
              this.xmf *= this.dd;
              break;
          }
        } else {
          if (this.mode === OBLIQ) {
            this.sinph0 = Math.sin(this.lat0);
            this.cosph0 = Math.cos(this.lat0);
          }
        }
      }
      function forward$l(p) {
        var x, y, coslam, sinlam, sinphi, q, sinb, cosb, b, cosphi;
        var lam = p.x;
        var phi = p.y;
        lam = adjust_lon(lam - this.long0, this.over);
        if (this.sphere) {
          sinphi = Math.sin(phi);
          cosphi = Math.cos(phi);
          coslam = Math.cos(lam);
          if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
            y = this.mode === this.EQUIT ? 1 + cosphi * coslam : 1 + this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
            if (y <= EPSLN) {
              return null;
            }
            y = Math.sqrt(2 / y);
            x = y * cosphi * Math.sin(lam);
            y *= this.mode === this.EQUIT ? sinphi : this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
          } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
            if (this.mode === this.N_POLE) {
              coslam = -coslam;
            }
            if (Math.abs(phi + this.lat0) < EPSLN) {
              return null;
            }
            y = FORTPI - phi * 0.5;
            y = 2 * (this.mode === this.S_POLE ? Math.cos(y) : Math.sin(y));
            x = y * Math.sin(lam);
            y *= coslam;
          }
        } else {
          sinb = 0;
          cosb = 0;
          b = 0;
          coslam = Math.cos(lam);
          sinlam = Math.sin(lam);
          sinphi = Math.sin(phi);
          q = qsfnz(this.e, sinphi);
          if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
            sinb = q / this.qp;
            cosb = Math.sqrt(1 - sinb * sinb);
          }
          switch (this.mode) {
            case this.OBLIQ:
              b = 1 + this.sinb1 * sinb + this.cosb1 * cosb * coslam;
              break;
            case this.EQUIT:
              b = 1 + cosb * coslam;
              break;
            case this.N_POLE:
              b = HALF_PI + phi;
              q = this.qp - q;
              break;
            case this.S_POLE:
              b = phi - HALF_PI;
              q = this.qp + q;
              break;
          }
          if (Math.abs(b) < EPSLN) {
            return null;
          }
          switch (this.mode) {
            case this.OBLIQ:
            case this.EQUIT:
              b = Math.sqrt(2 / b);
              if (this.mode === this.OBLIQ) {
                y = this.ymf * b * (this.cosb1 * sinb - this.sinb1 * cosb * coslam);
              } else {
                y = (b = Math.sqrt(2 / (1 + cosb * coslam))) * sinb * this.ymf;
              }
              x = this.xmf * b * cosb * sinlam;
              break;
            case this.N_POLE:
            case this.S_POLE:
              if (q >= 0) {
                x = (b = Math.sqrt(q)) * sinlam;
                y = coslam * (this.mode === this.S_POLE ? b : -b);
              } else {
                x = y = 0;
              }
              break;
          }
        }
        p.x = this.a * x + this.x0;
        p.y = this.a * y + this.y0;
        return p;
      }
      function inverse$l(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var x = p.x / this.a;
        var y = p.y / this.a;
        var lam, phi, cCe, sCe, q, rho, ab;
        if (this.sphere) {
          var cosz = 0, rh, sinz = 0;
          rh = Math.sqrt(x * x + y * y);
          phi = rh * 0.5;
          if (phi > 1) {
            return null;
          }
          phi = 2 * Math.asin(phi);
          if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
            sinz = Math.sin(phi);
            cosz = Math.cos(phi);
          }
          switch (this.mode) {
            case this.EQUIT:
              phi = Math.abs(rh) <= EPSLN ? 0 : Math.asin(y * sinz / rh);
              x *= sinz;
              y = cosz * rh;
              break;
            case this.OBLIQ:
              phi = Math.abs(rh) <= EPSLN ? this.lat0 : Math.asin(cosz * this.sinph0 + y * sinz * this.cosph0 / rh);
              x *= sinz * this.cosph0;
              y = (cosz - Math.sin(phi) * this.sinph0) * rh;
              break;
            case this.N_POLE:
              y = -y;
              phi = HALF_PI - phi;
              break;
            case this.S_POLE:
              phi -= HALF_PI;
              break;
          }
          lam = y === 0 && (this.mode === this.EQUIT || this.mode === this.OBLIQ) ? 0 : Math.atan2(x, y);
        } else {
          ab = 0;
          if (this.mode === this.OBLIQ || this.mode === this.EQUIT) {
            x /= this.dd;
            y *= this.dd;
            rho = Math.sqrt(x * x + y * y);
            if (rho < EPSLN) {
              p.x = this.long0;
              p.y = this.lat0;
              return p;
            }
            sCe = 2 * Math.asin(0.5 * rho / this.rq);
            cCe = Math.cos(sCe);
            x *= sCe = Math.sin(sCe);
            if (this.mode === this.OBLIQ) {
              ab = cCe * this.sinb1 + y * sCe * this.cosb1 / rho;
              q = this.qp * ab;
              y = rho * this.cosb1 * cCe - y * this.sinb1 * sCe;
            } else {
              ab = y * sCe / rho;
              q = this.qp * ab;
              y = rho * cCe;
            }
          } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
            if (this.mode === this.N_POLE) {
              y = -y;
            }
            q = x * x + y * y;
            if (!q) {
              p.x = this.long0;
              p.y = this.lat0;
              return p;
            }
            ab = 1 - q / this.qp;
            if (this.mode === this.S_POLE) {
              ab = -ab;
            }
          }
          lam = Math.atan2(x, y);
          phi = authlat(Math.asin(ab), this.apa);
        }
        p.x = adjust_lon(this.long0 + lam, this.over);
        p.y = phi;
        return p;
      }
      var names$m = ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"];
      var laea = {
        init: init$m,
        forward: forward$l,
        inverse: inverse$l,
        names: names$m,
        S_POLE,
        N_POLE,
        EQUIT,
        OBLIQ
      };
      function asinz(x) {
        if (Math.abs(x) > 1) {
          x = x > 1 ? 1 : -1;
        }
        return Math.asin(x);
      }
      function init$l() {
        if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
          return;
        }
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e3 = Math.sqrt(this.es);
        this.sin_po = Math.sin(this.lat1);
        this.cos_po = Math.cos(this.lat1);
        this.t1 = this.sin_po;
        this.con = this.sin_po;
        this.ms1 = msfnz(this.e3, this.sin_po, this.cos_po);
        this.qs1 = qsfnz(this.e3, this.sin_po);
        this.sin_po = Math.sin(this.lat2);
        this.cos_po = Math.cos(this.lat2);
        this.t2 = this.sin_po;
        this.ms2 = msfnz(this.e3, this.sin_po, this.cos_po);
        this.qs2 = qsfnz(this.e3, this.sin_po);
        this.sin_po = Math.sin(this.lat0);
        this.cos_po = Math.cos(this.lat0);
        this.t3 = this.sin_po;
        this.qs0 = qsfnz(this.e3, this.sin_po);
        if (Math.abs(this.lat1 - this.lat2) > EPSLN) {
          this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1);
        } else {
          this.ns0 = this.con;
        }
        this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1;
        this.rh = this.a * Math.sqrt(this.c - this.ns0 * this.qs0) / this.ns0;
      }
      function forward$k(p) {
        var lon = p.x;
        var lat = p.y;
        this.sin_phi = Math.sin(lat);
        this.cos_phi = Math.cos(lat);
        var qs = qsfnz(this.e3, this.sin_phi);
        var rh1 = this.a * Math.sqrt(this.c - this.ns0 * qs) / this.ns0;
        var theta = this.ns0 * adjust_lon(lon - this.long0, this.over);
        var x = rh1 * Math.sin(theta) + this.x0;
        var y = this.rh - rh1 * Math.cos(theta) + this.y0;
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$k(p) {
        var rh1, qs, con, theta, lon, lat;
        p.x -= this.x0;
        p.y = this.rh - p.y + this.y0;
        if (this.ns0 >= 0) {
          rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
          con = 1;
        } else {
          rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
          con = -1;
        }
        theta = 0;
        if (rh1 !== 0) {
          theta = Math.atan2(con * p.x, con * p.y);
        }
        con = rh1 * this.ns0 / this.a;
        if (this.sphere) {
          lat = Math.asin((this.c - con * con) / (2 * this.ns0));
        } else {
          qs = (this.c - con * con) / this.ns0;
          lat = this.phi1z(this.e3, qs);
        }
        lon = adjust_lon(theta / this.ns0 + this.long0, this.over);
        p.x = lon;
        p.y = lat;
        return p;
      }
      function phi1z(eccent, qs) {
        var sinphi, cosphi, con, com, dphi;
        var phi = asinz(0.5 * qs);
        if (eccent < EPSLN) {
          return phi;
        }
        var eccnts = eccent * eccent;
        for (var i = 1; i <= 25; i++) {
          sinphi = Math.sin(phi);
          cosphi = Math.cos(phi);
          con = eccent * sinphi;
          com = 1 - con * con;
          dphi = 0.5 * com * com / cosphi * (qs / (1 - eccnts) - sinphi / com + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
          phi = phi + dphi;
          if (Math.abs(dphi) <= 1e-7) {
            return phi;
          }
        }
        return null;
      }
      var names$l = ["Albers_Conic_Equal_Area", "Albers_Equal_Area", "Albers", "aea"];
      var aea = {
        init: init$l,
        forward: forward$k,
        inverse: inverse$k,
        names: names$l,
        phi1z
      };
      function init$k() {
        this.sin_p14 = Math.sin(this.lat0);
        this.cos_p14 = Math.cos(this.lat0);
        this.infinity_dist = 1e3 * this.a;
        this.rc = 1;
      }
      function forward$j(p) {
        var sinphi, cosphi;
        var dlon;
        var coslon;
        var ksp;
        var g;
        var x, y;
        var lon = p.x;
        var lat = p.y;
        dlon = adjust_lon(lon - this.long0, this.over);
        sinphi = Math.sin(lat);
        cosphi = Math.cos(lat);
        coslon = Math.cos(dlon);
        g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
        ksp = 1;
        if (g > 0 || Math.abs(g) <= EPSLN) {
          x = this.x0 + this.a * ksp * cosphi * Math.sin(dlon) / g;
          y = this.y0 + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon) / g;
        } else {
          x = this.x0 + this.infinity_dist * cosphi * Math.sin(dlon);
          y = this.y0 + this.infinity_dist * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$j(p) {
        var rh;
        var sinc, cosc;
        var c;
        var lon, lat;
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        p.x /= this.k0;
        p.y /= this.k0;
        if (rh = Math.sqrt(p.x * p.x + p.y * p.y)) {
          c = Math.atan2(rh, this.rc);
          sinc = Math.sin(c);
          cosc = Math.cos(c);
          lat = asinz(cosc * this.sin_p14 + p.y * sinc * this.cos_p14 / rh);
          lon = Math.atan2(p.x * sinc, rh * this.cos_p14 * cosc - p.y * this.sin_p14 * sinc);
          lon = adjust_lon(this.long0 + lon, this.over);
        } else {
          lat = this.phic0;
          lon = 0;
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$k = ["gnom"];
      var gnom = {
        init: init$k,
        forward: forward$j,
        inverse: inverse$j,
        names: names$k
      };
      function iqsfnz(eccent, q) {
        var temp = 1 - (1 - eccent * eccent) / (2 * eccent) * Math.log((1 - eccent) / (1 + eccent));
        if (Math.abs(Math.abs(q) - temp) < 1e-6) {
          if (q < 0) {
            return -1 * HALF_PI;
          } else {
            return HALF_PI;
          }
        }
        var phi = Math.asin(0.5 * q);
        var dphi;
        var sin_phi;
        var cos_phi;
        var con;
        for (var i = 0; i < 30; i++) {
          sin_phi = Math.sin(phi);
          cos_phi = Math.cos(phi);
          con = eccent * sin_phi;
          dphi = Math.pow(1 - con * con, 2) / (2 * cos_phi) * (q / (1 - eccent * eccent) - sin_phi / (1 - con * con) + 0.5 / eccent * Math.log((1 - con) / (1 + con)));
          phi += dphi;
          if (Math.abs(dphi) <= 1e-10) {
            return phi;
          }
        }
        return NaN;
      }
      function init$j() {
        if (!this.sphere) {
          this.k0 = msfnz(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts));
        }
      }
      function forward$i(p) {
        var lon = p.x;
        var lat = p.y;
        var x, y;
        var dlon = adjust_lon(lon - this.long0, this.over);
        if (this.sphere) {
          x = this.x0 + this.a * dlon * Math.cos(this.lat_ts);
          y = this.y0 + this.a * Math.sin(lat) / Math.cos(this.lat_ts);
        } else {
          var qs = qsfnz(this.e, Math.sin(lat));
          x = this.x0 + this.a * this.k0 * dlon;
          y = this.y0 + this.a * qs * 0.5 / this.k0;
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$i(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon, lat;
        if (this.sphere) {
          lon = adjust_lon(this.long0 + p.x / this.a / Math.cos(this.lat_ts), this.over);
          lat = Math.asin(p.y / this.a * Math.cos(this.lat_ts));
        } else {
          lat = iqsfnz(this.e, 2 * p.y * this.k0 / this.a);
          lon = adjust_lon(this.long0 + p.x / (this.a * this.k0), this.over);
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$j = ["cea"];
      var cea = {
        init: init$j,
        forward: forward$i,
        inverse: inverse$i,
        names: names$j
      };
      function init$i() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.lat0 = this.lat0 || 0;
        this.long0 = this.long0 || 0;
        this.lat_ts = this.lat_ts || 0;
        this.title = this.title || "Equidistant Cylindrical (Plate Carre)";
        this.rc = Math.cos(this.lat_ts);
      }
      function forward$h(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0, this.over);
        var dlat = adjust_lat(lat - this.lat0);
        p.x = this.x0 + this.a * dlon * this.rc;
        p.y = this.y0 + this.a * dlat;
        return p;
      }
      function inverse$h(p) {
        var x = p.x;
        var y = p.y;
        p.x = adjust_lon(this.long0 + (x - this.x0) / (this.a * this.rc), this.over);
        p.y = adjust_lat(this.lat0 + (y - this.y0) / this.a);
        return p;
      }
      var names$i = ["Equirectangular", "Equidistant_Cylindrical", "Equidistant_Cylindrical_Spherical", "eqc"];
      var eqc = {
        init: init$i,
        forward: forward$h,
        inverse: inverse$h,
        names: names$i
      };
      var MAX_ITER$1 = 20;
      function init$h() {
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = e0fn(this.es);
        this.e1 = e1fn(this.es);
        this.e2 = e2fn(this.es);
        this.e3 = e3fn(this.es);
        this.ml0 = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
      }
      function forward$g(p) {
        var lon = p.x;
        var lat = p.y;
        var x, y, el;
        var dlon = adjust_lon(lon - this.long0, this.over);
        el = dlon * Math.sin(lat);
        if (this.sphere) {
          if (Math.abs(lat) <= EPSLN) {
            x = this.a * dlon;
            y = -1 * this.a * this.lat0;
          } else {
            x = this.a * Math.sin(el) / Math.tan(lat);
            y = this.a * (adjust_lat(lat - this.lat0) + (1 - Math.cos(el)) / Math.tan(lat));
          }
        } else {
          if (Math.abs(lat) <= EPSLN) {
            x = this.a * dlon;
            y = -1 * this.ml0;
          } else {
            var nl = gN(this.a, this.e, Math.sin(lat)) / Math.tan(lat);
            x = nl * Math.sin(el);
            y = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, lat) - this.ml0 + nl * (1 - Math.cos(el));
          }
        }
        p.x = x + this.x0;
        p.y = y + this.y0;
        return p;
      }
      function inverse$g(p) {
        var lon, lat, x, y, i;
        var al, bl;
        var phi, dphi;
        x = p.x - this.x0;
        y = p.y - this.y0;
        if (this.sphere) {
          if (Math.abs(y + this.a * this.lat0) <= EPSLN) {
            lon = adjust_lon(x / this.a + this.long0, this.over);
            lat = 0;
          } else {
            al = this.lat0 + y / this.a;
            bl = x * x / this.a / this.a + al * al;
            phi = al;
            var tanphi;
            for (i = MAX_ITER$1; i; --i) {
              tanphi = Math.tan(phi);
              dphi = -1 * (al * (phi * tanphi + 1) - phi - 0.5 * (phi * phi + bl) * tanphi) / ((phi - al) / tanphi - 1);
              phi += dphi;
              if (Math.abs(dphi) <= EPSLN) {
                lat = phi;
                break;
              }
            }
            lon = adjust_lon(this.long0 + Math.asin(x * Math.tan(phi) / this.a) / Math.sin(lat), this.over);
          }
        } else {
          if (Math.abs(y + this.ml0) <= EPSLN) {
            lat = 0;
            lon = adjust_lon(this.long0 + x / this.a, this.over);
          } else {
            al = (this.ml0 + y) / this.a;
            bl = x * x / this.a / this.a + al * al;
            phi = al;
            var cl, mln, mlnp, ma;
            var con;
            for (i = MAX_ITER$1; i; --i) {
              con = this.e * Math.sin(phi);
              cl = Math.sqrt(1 - con * con) * Math.tan(phi);
              mln = this.a * mlfn(this.e0, this.e1, this.e2, this.e3, phi);
              mlnp = this.e0 - 2 * this.e1 * Math.cos(2 * phi) + 4 * this.e2 * Math.cos(4 * phi) - 6 * this.e3 * Math.cos(6 * phi);
              ma = mln / this.a;
              dphi = (al * (cl * ma + 1) - ma - 0.5 * cl * (ma * ma + bl)) / (this.es * Math.sin(2 * phi) * (ma * ma + bl - 2 * al * ma) / (4 * cl) + (al - ma) * (cl * mlnp - 2 / Math.sin(2 * phi)) - mlnp);
              phi -= dphi;
              if (Math.abs(dphi) <= EPSLN) {
                lat = phi;
                break;
              }
            }
            cl = Math.sqrt(1 - this.es * Math.pow(Math.sin(lat), 2)) * Math.tan(lat);
            lon = adjust_lon(this.long0 + Math.asin(x * cl / this.a) / Math.sin(lat), this.over);
          }
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$h = ["Polyconic", "American_Polyconic", "poly"];
      var poly = {
        init: init$h,
        forward: forward$g,
        inverse: inverse$g,
        names: names$h
      };
      var iterations = 1;
      function init$g() {
        this.A = [];
        this.A[1] = 0.6399175073;
        this.A[2] = -0.1358797613;
        this.A[3] = 0.063294409;
        this.A[4] = -0.02526853;
        this.A[5] = 0.0117879;
        this.A[6] = -55161e-7;
        this.A[7] = 26906e-7;
        this.A[8] = -1333e-6;
        this.A[9] = 67e-5;
        this.A[10] = -34e-5;
        this.B_re = [];
        this.B_im = [];
        this.B_re[1] = 0.7557853228;
        this.B_im[1] = 0;
        this.B_re[2] = 0.249204646;
        this.B_im[2] = 3371507e-9;
        this.B_re[3] = -1541739e-9;
        this.B_im[3] = 0.04105856;
        this.B_re[4] = -0.10162907;
        this.B_im[4] = 0.01727609;
        this.B_re[5] = -0.26623489;
        this.B_im[5] = -0.36249218;
        this.B_re[6] = -0.6870983;
        this.B_im[6] = -1.1651967;
        this.C_re = [];
        this.C_im = [];
        this.C_re[1] = 1.3231270439;
        this.C_im[1] = 0;
        this.C_re[2] = -0.577245789;
        this.C_im[2] = -7809598e-9;
        this.C_re[3] = 0.508307513;
        this.C_im[3] = -0.112208952;
        this.C_re[4] = -0.15094762;
        this.C_im[4] = 0.18200602;
        this.C_re[5] = 1.01418179;
        this.C_im[5] = 1.64497696;
        this.C_re[6] = 1.9660549;
        this.C_im[6] = 2.5127645;
        this.D = [];
        this.D[1] = 1.5627014243;
        this.D[2] = 0.5185406398;
        this.D[3] = -0.03333098;
        this.D[4] = -0.1052906;
        this.D[5] = -0.0368594;
        this.D[6] = 7317e-6;
        this.D[7] = 0.0122;
        this.D[8] = 394e-5;
        this.D[9] = -13e-4;
      }
      function forward$f(p) {
        var n;
        var lon = p.x;
        var lat = p.y;
        var delta_lat = lat - this.lat0;
        var delta_lon = lon - this.long0;
        var d_phi = delta_lat / SEC_TO_RAD * 1e-5;
        var d_lambda = delta_lon;
        var d_phi_n = 1;
        var d_psi = 0;
        for (n = 1; n <= 10; n++) {
          d_phi_n = d_phi_n * d_phi;
          d_psi = d_psi + this.A[n] * d_phi_n;
        }
        var th_re = d_psi;
        var th_im = d_lambda;
        var th_n_re = 1;
        var th_n_im = 0;
        var th_n_re1;
        var th_n_im1;
        var z_re = 0;
        var z_im = 0;
        for (n = 1; n <= 6; n++) {
          th_n_re1 = th_n_re * th_re - th_n_im * th_im;
          th_n_im1 = th_n_im * th_re + th_n_re * th_im;
          th_n_re = th_n_re1;
          th_n_im = th_n_im1;
          z_re = z_re + this.B_re[n] * th_n_re - this.B_im[n] * th_n_im;
          z_im = z_im + this.B_im[n] * th_n_re + this.B_re[n] * th_n_im;
        }
        p.x = z_im * this.a + this.x0;
        p.y = z_re * this.a + this.y0;
        return p;
      }
      function inverse$f(p) {
        var n;
        var x = p.x;
        var y = p.y;
        var delta_x = x - this.x0;
        var delta_y = y - this.y0;
        var z_re = delta_y / this.a;
        var z_im = delta_x / this.a;
        var z_n_re = 1;
        var z_n_im = 0;
        var z_n_re1;
        var z_n_im1;
        var th_re = 0;
        var th_im = 0;
        for (n = 1; n <= 6; n++) {
          z_n_re1 = z_n_re * z_re - z_n_im * z_im;
          z_n_im1 = z_n_im * z_re + z_n_re * z_im;
          z_n_re = z_n_re1;
          z_n_im = z_n_im1;
          th_re = th_re + this.C_re[n] * z_n_re - this.C_im[n] * z_n_im;
          th_im = th_im + this.C_im[n] * z_n_re + this.C_re[n] * z_n_im;
        }
        for (var i = 0; i < this.iterations; i++) {
          var th_n_re = th_re;
          var th_n_im = th_im;
          var th_n_re1;
          var th_n_im1;
          var num_re = z_re;
          var num_im = z_im;
          for (n = 2; n <= 6; n++) {
            th_n_re1 = th_n_re * th_re - th_n_im * th_im;
            th_n_im1 = th_n_im * th_re + th_n_re * th_im;
            th_n_re = th_n_re1;
            th_n_im = th_n_im1;
            num_re = num_re + (n - 1) * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
            num_im = num_im + (n - 1) * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
          }
          th_n_re = 1;
          th_n_im = 0;
          var den_re = this.B_re[1];
          var den_im = this.B_im[1];
          for (n = 2; n <= 6; n++) {
            th_n_re1 = th_n_re * th_re - th_n_im * th_im;
            th_n_im1 = th_n_im * th_re + th_n_re * th_im;
            th_n_re = th_n_re1;
            th_n_im = th_n_im1;
            den_re = den_re + n * (this.B_re[n] * th_n_re - this.B_im[n] * th_n_im);
            den_im = den_im + n * (this.B_im[n] * th_n_re + this.B_re[n] * th_n_im);
          }
          var den2 = den_re * den_re + den_im * den_im;
          th_re = (num_re * den_re + num_im * den_im) / den2;
          th_im = (num_im * den_re - num_re * den_im) / den2;
        }
        var d_psi = th_re;
        var d_lambda = th_im;
        var d_psi_n = 1;
        var d_phi = 0;
        for (n = 1; n <= 9; n++) {
          d_psi_n = d_psi_n * d_psi;
          d_phi = d_phi + this.D[n] * d_psi_n;
        }
        var lat = this.lat0 + d_phi * SEC_TO_RAD * 1e5;
        var lon = this.long0 + d_lambda;
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$g = ["New_Zealand_Map_Grid", "nzmg"];
      var nzmg = {
        init: init$g,
        forward: forward$f,
        inverse: inverse$f,
        names: names$g,
        iterations
      };
      function init$f() {
      }
      function forward$e(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0, this.over);
        var x = this.x0 + this.a * dlon;
        var y = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + lat / 2.5)) * 1.25;
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$e(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var lon = adjust_lon(this.long0 + p.x / this.a, this.over);
        var lat = 2.5 * (Math.atan(Math.exp(0.8 * p.y / this.a)) - Math.PI / 4);
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$f = ["Miller_Cylindrical", "mill"];
      var mill = {
        init: init$f,
        forward: forward$e,
        inverse: inverse$e,
        names: names$f
      };
      var MAX_ITER = 20;
      function init$e() {
        this.long0 = this.long0 || 0;
        if (!this.sphere) {
          this.en = pj_enfn(this.es);
        } else {
          this.n = 1;
          this.m = 0;
          this.es = 0;
          this.C_y = Math.sqrt((this.m + 1) / this.n);
          this.C_x = this.C_y / (this.m + 1);
        }
      }
      function forward$d(p) {
        var x, y;
        var lon = p.x;
        var lat = p.y;
        lon = adjust_lon(lon - this.long0, this.over);
        if (this.sphere) {
          if (!this.m) {
            lat = this.n !== 1 ? Math.asin(this.n * Math.sin(lat)) : lat;
          } else {
            var k = this.n * Math.sin(lat);
            for (var i = MAX_ITER; i; --i) {
              var V2 = (this.m * lat + Math.sin(lat) - k) / (this.m + Math.cos(lat));
              lat -= V2;
              if (Math.abs(V2) < EPSLN) {
                break;
              }
            }
          }
          x = this.a * this.C_x * lon * (this.m + Math.cos(lat));
          y = this.a * this.C_y * lat;
        } else {
          var s = Math.sin(lat);
          var c = Math.cos(lat);
          y = this.a * pj_mlfn(lat, s, c, this.en);
          x = this.a * lon * c / Math.sqrt(1 - this.es * s * s);
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$d(p) {
        var lat, temp, lon, s;
        p.x -= this.x0;
        lon = p.x / this.a;
        p.y -= this.y0;
        lat = p.y / this.a;
        if (this.sphere) {
          lat /= this.C_y;
          lon = lon / (this.C_x * (this.m + Math.cos(lat)));
          if (this.m) {
            lat = asinz((this.m * lat + Math.sin(lat)) / this.n);
          } else if (this.n !== 1) {
            lat = asinz(Math.sin(lat) / this.n);
          }
          lon = adjust_lon(lon + this.long0, this.over);
          lat = adjust_lat(lat);
        } else {
          lat = pj_inv_mlfn(p.y / this.a, this.es, this.en);
          s = Math.abs(lat);
          if (s < HALF_PI) {
            s = Math.sin(lat);
            temp = this.long0 + p.x * Math.sqrt(1 - this.es * s * s) / (this.a * Math.cos(lat));
            lon = adjust_lon(temp, this.over);
          } else if (s - EPSLN < HALF_PI) {
            lon = this.long0;
          }
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$e = ["Sinusoidal", "sinu"];
      var sinu = {
        init: init$e,
        forward: forward$d,
        inverse: inverse$d,
        names: names$e
      };
      function init$d() {
        this.sphere = true;
        this.b = this.a;
        this.m = 1;
        this.n = 2.5707963267948966;
        this.es = 0;
        this.C_y = Math.sqrt((this.m + 1) / this.n);
        this.C_x = this.C_y / (this.m + 1);
      }
      var forward$c = forward$d;
      var inverse$c = inverse$d;
      var names$d = ["Eckert_VI", "eck6"];
      var eck6 = {
        init: init$d,
        forward: forward$c,
        inverse: inverse$c,
        names: names$d
      };
      function init$c() {
        this.x0 = this.x0 !== void 0 ? this.x0 : 0;
        this.y0 = this.y0 !== void 0 ? this.y0 : 0;
        this.long0 = this.long0 !== void 0 ? this.long0 : 0;
      }
      function forward$b(p) {
        var lon = p.x;
        var lat = p.y;
        var delta_lon = adjust_lon(lon - this.long0, this.over);
        var theta = lat;
        var con = Math.PI * Math.sin(lat);
        while (true) {
          var delta_theta = -(theta + Math.sin(theta) - con) / (1 + Math.cos(theta));
          theta += delta_theta;
          if (Math.abs(delta_theta) < EPSLN) {
            break;
          }
        }
        theta /= 2;
        if (Math.PI / 2 - Math.abs(lat) < EPSLN) {
          delta_lon = 0;
        }
        var x = 0.900316316158 * this.a * delta_lon * Math.cos(theta) + this.x0;
        var y = 1.4142135623731 * this.a * Math.sin(theta) + this.y0;
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$b(p) {
        var theta;
        var arg;
        p.x -= this.x0;
        p.y -= this.y0;
        arg = p.y / (1.4142135623731 * this.a);
        if (Math.abs(arg) > 0.999999999999) {
          arg = 0.999999999999;
        }
        theta = Math.asin(arg);
        var lon = adjust_lon(this.long0 + p.x / (0.900316316158 * this.a * Math.cos(theta)), this.over);
        if (lon < -Math.PI) {
          lon = -Math.PI;
        }
        if (lon > Math.PI) {
          lon = Math.PI;
        }
        arg = (2 * theta + Math.sin(2 * theta)) / Math.PI;
        if (Math.abs(arg) > 1) {
          arg = 1;
        }
        var lat = Math.asin(arg);
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$c = ["Mollweide", "moll"];
      var moll = {
        init: init$c,
        forward: forward$b,
        inverse: inverse$b,
        names: names$c
      };
      function init$b() {
        if (Math.abs(this.lat1 + this.lat2) < EPSLN) {
          return;
        }
        this.lat2 = this.lat2 || this.lat1;
        this.temp = this.b / this.a;
        this.es = 1 - Math.pow(this.temp, 2);
        this.e = Math.sqrt(this.es);
        this.e0 = e0fn(this.es);
        this.e1 = e1fn(this.es);
        this.e2 = e2fn(this.es);
        this.e3 = e3fn(this.es);
        this.sin_phi = Math.sin(this.lat1);
        this.cos_phi = Math.cos(this.lat1);
        this.ms1 = msfnz(this.e, this.sin_phi, this.cos_phi);
        this.ml1 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat1);
        if (Math.abs(this.lat1 - this.lat2) < EPSLN) {
          this.ns = this.sin_phi;
        } else {
          this.sin_phi = Math.sin(this.lat2);
          this.cos_phi = Math.cos(this.lat2);
          this.ms2 = msfnz(this.e, this.sin_phi, this.cos_phi);
          this.ml2 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat2);
          this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1);
        }
        this.g = this.ml1 + this.ms1 / this.ns;
        this.ml0 = mlfn(this.e0, this.e1, this.e2, this.e3, this.lat0);
        this.rh = this.a * (this.g - this.ml0);
      }
      function forward$a(p) {
        var lon = p.x;
        var lat = p.y;
        var rh1;
        if (this.sphere) {
          rh1 = this.a * (this.g - lat);
        } else {
          var ml = mlfn(this.e0, this.e1, this.e2, this.e3, lat);
          rh1 = this.a * (this.g - ml);
        }
        var theta = this.ns * adjust_lon(lon - this.long0, this.over);
        var x = this.x0 + rh1 * Math.sin(theta);
        var y = this.y0 + this.rh - rh1 * Math.cos(theta);
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$a(p) {
        p.x -= this.x0;
        p.y = this.rh - p.y + this.y0;
        var con, rh1, lat, lon;
        if (this.ns >= 0) {
          rh1 = Math.sqrt(p.x * p.x + p.y * p.y);
          con = 1;
        } else {
          rh1 = -Math.sqrt(p.x * p.x + p.y * p.y);
          con = -1;
        }
        var theta = 0;
        if (rh1 !== 0) {
          theta = Math.atan2(con * p.x, con * p.y);
        }
        if (this.sphere) {
          lon = adjust_lon(this.long0 + theta / this.ns, this.over);
          lat = adjust_lat(this.g - rh1 / this.a);
          p.x = lon;
          p.y = lat;
          return p;
        } else {
          var ml = this.g - rh1 / this.a;
          lat = imlfn(ml, this.e0, this.e1, this.e2, this.e3);
          lon = adjust_lon(this.long0 + theta / this.ns, this.over);
          p.x = lon;
          p.y = lat;
          return p;
        }
      }
      var names$b = ["Equidistant_Conic", "eqdc"];
      var eqdc = {
        init: init$b,
        forward: forward$a,
        inverse: inverse$a,
        names: names$b
      };
      function init$a() {
        this.R = this.a;
      }
      function forward$9(p) {
        var lon = p.x;
        var lat = p.y;
        var dlon = adjust_lon(lon - this.long0, this.over);
        var x, y;
        if (Math.abs(lat) <= EPSLN) {
          x = this.x0 + this.R * dlon;
          y = this.y0;
          p.x = x;
          p.y = y;
          return p;
        }
        var theta = asinz(2 * Math.abs(lat / Math.PI));
        if (Math.abs(dlon) <= EPSLN || Math.abs(Math.abs(lat) - HALF_PI) <= EPSLN) {
          x = this.x0;
          if (lat >= 0) {
            y = this.y0 + Math.PI * this.R * Math.tan(0.5 * theta);
          } else {
            y = this.y0 + Math.PI * this.R * -Math.tan(0.5 * theta);
          }
          p.x = x;
          p.y = y;
          return p;
        }
        var al = 0.5 * Math.abs(Math.PI / dlon - dlon / Math.PI);
        var asq = al * al;
        var sinth = Math.sin(theta);
        var costh = Math.cos(theta);
        var g = costh / (sinth + costh - 1);
        var gsq = g * g;
        var m = g * (2 / sinth - 1);
        var msq = m * m;
        var con = Math.PI * this.R * (al * (g - msq) + Math.sqrt(asq * (g - msq) * (g - msq) - (msq + asq) * (gsq - msq))) / (msq + asq);
        if (dlon < 0) {
          con = -con;
        }
        x = this.x0 + con;
        var q = asq + g;
        con = Math.PI * this.R * (m * q - al * Math.sqrt((msq + asq) * (asq + 1) - q * q)) / (msq + asq);
        if (lat >= 0) {
          y = this.y0 + con;
        } else {
          y = this.y0 - con;
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$9(p) {
        var lon, lat;
        var xx, yy, xys, c1, c2, c3;
        var a1;
        var m1;
        var con;
        var th1;
        var d;
        p.x -= this.x0;
        p.y -= this.y0;
        con = Math.PI * this.R;
        xx = p.x / con;
        yy = p.y / con;
        xys = xx * xx + yy * yy;
        c1 = -Math.abs(yy) * (1 + xys);
        c2 = c1 - 2 * yy * yy + xx * xx;
        c3 = -2 * c1 + 1 + 2 * yy * yy + xys * xys;
        d = yy * yy / c3 + (2 * c2 * c2 * c2 / c3 / c3 / c3 - 9 * c1 * c2 / c3 / c3) / 27;
        a1 = (c1 - c2 * c2 / 3 / c3) / c3;
        m1 = 2 * Math.sqrt(-a1 / 3);
        con = 3 * d / a1 / m1;
        if (Math.abs(con) > 1) {
          if (con >= 0) {
            con = 1;
          } else {
            con = -1;
          }
        }
        th1 = Math.acos(con) / 3;
        if (p.y >= 0) {
          lat = (-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
        } else {
          lat = -(-m1 * Math.cos(th1 + Math.PI / 3) - c2 / 3 / c3) * Math.PI;
        }
        if (Math.abs(xx) < EPSLN) {
          lon = this.long0;
        } else {
          lon = adjust_lon(this.long0 + Math.PI * (xys - 1 + Math.sqrt(1 + 2 * (xx * xx - yy * yy) + xys * xys)) / 2 / xx, this.over);
        }
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$a = ["Van_der_Grinten_I", "VanDerGrinten", "Van_der_Grinten", "vandg"];
      var vandg = {
        init: init$a,
        forward: forward$9,
        inverse: inverse$9,
        names: names$a
      };
      function vincentyInverse(lat1, lon1, lat2, lon2, a, f) {
        const L = lon2 - lon1;
        const U1 = Math.atan((1 - f) * Math.tan(lat1));
        const U2 = Math.atan((1 - f) * Math.tan(lat2));
        const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
        const sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
        let lambda = L, lambdaP, iterLimit = 100;
        let sinLambda, cosLambda, sinSigma, cosSigma, sigma, sinAlpha, cos2Alpha, cos2SigmaM, C;
        let uSq, A5, B, deltaSigma, s;
        do {
          sinLambda = Math.sin(lambda);
          cosLambda = Math.cos(lambda);
          sinSigma = Math.sqrt(
            cosU2 * sinLambda * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda)
          );
          if (sinSigma === 0) {
            return { azi1: 0, s12: 0 };
          }
          cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
          sigma = Math.atan2(sinSigma, cosSigma);
          sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
          cos2Alpha = 1 - sinAlpha * sinAlpha;
          cos2SigmaM = cos2Alpha !== 0 ? cosSigma - 2 * sinU1 * sinU2 / cos2Alpha : 0;
          C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
          lambdaP = lambda;
          lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
        } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0);
        if (iterLimit === 0) {
          return { azi1: NaN, s12: NaN };
        }
        uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
        A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
        s = a * (1 - f) * A5 * (sigma - deltaSigma);
        const azi1 = Math.atan2(cosU2 * sinLambda, cosU1 * sinU2 - sinU1 * cosU2 * cosLambda);
        return { azi1, s12: s };
      }
      function vincentyDirect(lat1, lon1, azi1, s12, a, f) {
        const U1 = Math.atan((1 - f) * Math.tan(lat1));
        const sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
        const sinAlpha1 = Math.sin(azi1), cosAlpha1 = Math.cos(azi1);
        const sigma1 = Math.atan2(sinU1, cosU1 * cosAlpha1);
        const sinAlpha = cosU1 * sinAlpha1;
        const cos2Alpha = 1 - sinAlpha * sinAlpha;
        const uSq = cos2Alpha * (a * a - a * (1 - f) * (a * (1 - f))) / (a * (1 - f) * (a * (1 - f)));
        const A5 = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
        const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
        let sigma = s12 / (a * (1 - f) * A5), sigmaP, iterLimit = 100;
        let cos2SigmaM, sinSigma, cosSigma, deltaSigma;
        do {
          cos2SigmaM = Math.cos(2 * sigma1 + sigma);
          sinSigma = Math.sin(sigma);
          cosSigma = Math.cos(sigma);
          deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));
          sigmaP = sigma;
          sigma = s12 / (a * (1 - f) * A5) + deltaSigma;
        } while (Math.abs(sigma - sigmaP) > 1e-12 && --iterLimit > 0);
        if (iterLimit === 0) {
          return { lat2: NaN, lon2: NaN };
        }
        const tmp = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        const lat2 = Math.atan2(
          sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
          (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp * tmp)
        );
        const lambda = Math.atan2(
          sinSigma * sinAlpha1,
          cosU1 * cosSigma - sinU1 * sinSigma * cosAlpha1
        );
        const C = f / 16 * cos2Alpha * (4 + f * (4 - 3 * cos2Alpha));
        const L = lambda - (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
        const lon2 = lon1 + L;
        return { lat2, lon2 };
      }
      function init$9() {
        this.sin_p12 = Math.sin(this.lat0);
        this.cos_p12 = Math.cos(this.lat0);
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.long0 = this.long0 || 0;
        this.f = this.es / (1 + Math.sqrt(1 - this.es));
      }
      function forward$8(p) {
        var lon = p.x;
        var lat = p.y;
        var sinphi = Math.sin(p.y);
        var cosphi = Math.cos(p.y);
        var dlon = adjust_lon(lon - this.long0, this.over);
        var e0, e1, e2, e3, Mlp, Ml, c, kp, cos_c, vars, azi1;
        if (this.sphere) {
          if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
            p.x = this.x0 + this.a * (HALF_PI - lat) * Math.sin(dlon);
            p.y = this.y0 - this.a * (HALF_PI - lat) * Math.cos(dlon);
            return p;
          } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
            p.x = this.x0 + this.a * (HALF_PI + lat) * Math.sin(dlon);
            p.y = this.y0 + this.a * (HALF_PI + lat) * Math.cos(dlon);
            return p;
          } else {
            cos_c = this.sin_p12 * sinphi + this.cos_p12 * cosphi * Math.cos(dlon);
            c = Math.acos(cos_c);
            kp = c ? c / Math.sin(c) : 1;
            p.x = this.x0 + this.a * kp * cosphi * Math.sin(dlon);
            p.y = this.y0 + this.a * kp * (this.cos_p12 * sinphi - this.sin_p12 * cosphi * Math.cos(dlon));
            return p;
          }
        } else {
          e0 = e0fn(this.es);
          e1 = e1fn(this.es);
          e2 = e2fn(this.es);
          e3 = e3fn(this.es);
          if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
            Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
            Ml = this.a * mlfn(e0, e1, e2, e3, lat);
            p.x = this.x0 + (Mlp - Ml) * Math.sin(dlon);
            p.y = this.y0 - (Mlp - Ml) * Math.cos(dlon);
            return p;
          } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
            Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
            Ml = this.a * mlfn(e0, e1, e2, e3, lat);
            p.x = this.x0 + (Mlp + Ml) * Math.sin(dlon);
            p.y = this.y0 + (Mlp + Ml) * Math.cos(dlon);
            return p;
          } else {
            if (Math.abs(lon) < EPSLN && Math.abs(lat - this.lat0) < EPSLN) {
              p.x = this.x0;
              p.y = this.y0;
              return p;
            }
            vars = vincentyInverse(this.lat0, this.long0, lat, lon, this.a, this.f);
            azi1 = vars.azi1;
            p.x = this.x0 + vars.s12 * Math.sin(azi1);
            p.y = this.y0 + vars.s12 * Math.cos(azi1);
            return p;
          }
        }
      }
      function inverse$8(p) {
        p.x -= this.x0;
        p.y -= this.y0;
        var rh, z, sinz, cosz, lon, lat, con, e0, e1, e2, e3, Mlp, M2, azi1, s12, vars;
        if (this.sphere) {
          rh = Math.sqrt(p.x * p.x + p.y * p.y);
          if (rh > 2 * HALF_PI * this.a) {
            return;
          }
          z = rh / this.a;
          sinz = Math.sin(z);
          cosz = Math.cos(z);
          lon = this.long0;
          if (Math.abs(rh) <= EPSLN) {
            lat = this.lat0;
          } else {
            lat = asinz(cosz * this.sin_p12 + p.y * sinz * this.cos_p12 / rh);
            con = Math.abs(this.lat0) - HALF_PI;
            if (Math.abs(con) <= EPSLN) {
              if (this.lat0 >= 0) {
                lon = adjust_lon(this.long0 + Math.atan2(p.x, -p.y), this.over);
              } else {
                lon = adjust_lon(this.long0 - Math.atan2(-p.x, p.y), this.over);
              }
            } else {
              lon = adjust_lon(this.long0 + Math.atan2(p.x * sinz, rh * this.cos_p12 * cosz - p.y * this.sin_p12 * sinz), this.over);
            }
          }
          p.x = lon;
          p.y = lat;
          return p;
        } else {
          e0 = e0fn(this.es);
          e1 = e1fn(this.es);
          e2 = e2fn(this.es);
          e3 = e3fn(this.es);
          if (Math.abs(this.sin_p12 - 1) <= EPSLN) {
            Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
            rh = Math.sqrt(p.x * p.x + p.y * p.y);
            M2 = Mlp - rh;
            lat = imlfn(M2 / this.a, e0, e1, e2, e3);
            lon = adjust_lon(this.long0 + Math.atan2(p.x, -1 * p.y), this.over);
            p.x = lon;
            p.y = lat;
            return p;
          } else if (Math.abs(this.sin_p12 + 1) <= EPSLN) {
            Mlp = this.a * mlfn(e0, e1, e2, e3, HALF_PI);
            rh = Math.sqrt(p.x * p.x + p.y * p.y);
            M2 = rh - Mlp;
            lat = imlfn(M2 / this.a, e0, e1, e2, e3);
            lon = adjust_lon(this.long0 + Math.atan2(p.x, p.y), this.over);
            p.x = lon;
            p.y = lat;
            return p;
          } else {
            azi1 = Math.atan2(p.x, p.y);
            s12 = Math.sqrt(p.x * p.x + p.y * p.y);
            vars = vincentyDirect(this.lat0, this.long0, azi1, s12, this.a, this.f);
            p.x = vars.lon2;
            p.y = vars.lat2;
            return p;
          }
        }
      }
      var names$9 = ["Azimuthal_Equidistant", "aeqd"];
      var aeqd = {
        init: init$9,
        forward: forward$8,
        inverse: inverse$8,
        names: names$9
      };
      function init$8() {
        this.sin_p14 = Math.sin(this.lat0 || 0);
        this.cos_p14 = Math.cos(this.lat0 || 0);
      }
      function forward$7(p) {
        var sinphi, cosphi;
        var dlon;
        var coslon;
        var ksp;
        var g, x, y;
        var lon = p.x;
        var lat = p.y;
        dlon = adjust_lon(lon - (this.long0 || 0), this.over);
        sinphi = Math.sin(lat);
        cosphi = Math.cos(lat);
        coslon = Math.cos(dlon);
        g = this.sin_p14 * sinphi + this.cos_p14 * cosphi * coslon;
        ksp = 1;
        if (g > 0 || Math.abs(g) <= EPSLN) {
          x = (this.x0 || 0) + this.a * ksp * cosphi * Math.sin(dlon);
          y = (this.y0 || 0) + this.a * ksp * (this.cos_p14 * sinphi - this.sin_p14 * cosphi * coslon);
        }
        p.x = x;
        p.y = y;
        return p;
      }
      function inverse$7(p) {
        var rh;
        var z;
        var sinz, cosz;
        var con;
        var lon, lat;
        var long0, lat0;
        p.x -= this.x0 || 0;
        p.y -= this.y0 || 0;
        rh = Math.sqrt(p.x * p.x + p.y * p.y);
        z = asinz(rh / this.a);
        sinz = Math.sin(z);
        cosz = Math.cos(z);
        long0 = this.long0 || 0;
        lat0 = this.lat0 || 0;
        lon = long0;
        if (Math.abs(rh) <= EPSLN) {
          lat = lat0;
          p.x = lon;
          p.y = lat;
          return p;
        }
        lat = asinz(cosz * this.sin_p14 + p.y * sinz * this.cos_p14 / rh);
        con = Math.abs(lat0) - HALF_PI;
        if (Math.abs(con) <= EPSLN) {
          if (lat0 >= 0) {
            lon = adjust_lon(long0 + Math.atan2(p.x, -p.y), this.over);
          } else {
            lon = adjust_lon(long0 - Math.atan2(-p.x, p.y), this.over);
          }
          p.x = lon;
          p.y = lat;
          return p;
        }
        lon = adjust_lon(long0 + Math.atan2(p.x * sinz, rh * this.cos_p14 * cosz - p.y * this.sin_p14 * sinz), this.over);
        p.x = lon;
        p.y = lat;
        return p;
      }
      var names$8 = ["ortho"];
      var ortho = {
        init: init$8,
        forward: forward$7,
        inverse: inverse$7,
        names: names$8
      };
      var FACE_ENUM = {
        FRONT: 1,
        RIGHT: 2,
        BACK: 3,
        LEFT: 4,
        TOP: 5,
        BOTTOM: 6
      };
      var AREA_ENUM = {
        AREA_0: 1,
        AREA_1: 2,
        AREA_2: 3,
        AREA_3: 4
      };
      function init$7() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.lat0 = this.lat0 || 0;
        this.long0 = this.long0 || 0;
        this.lat_ts = this.lat_ts || 0;
        this.title = this.title || "Quadrilateralized Spherical Cube";
        if (this.lat0 >= HALF_PI - FORTPI / 2) {
          this.face = FACE_ENUM.TOP;
        } else if (this.lat0 <= -(HALF_PI - FORTPI / 2)) {
          this.face = FACE_ENUM.BOTTOM;
        } else if (Math.abs(this.long0) <= FORTPI) {
          this.face = FACE_ENUM.FRONT;
        } else if (Math.abs(this.long0) <= HALF_PI + FORTPI) {
          this.face = this.long0 > 0 ? FACE_ENUM.RIGHT : FACE_ENUM.LEFT;
        } else {
          this.face = FACE_ENUM.BACK;
        }
        if (this.es !== 0) {
          this.one_minus_f = 1 - (this.a - this.b) / this.a;
          this.one_minus_f_squared = this.one_minus_f * this.one_minus_f;
        }
      }
      function forward$6(p) {
        var xy = { x: 0, y: 0 };
        var lat, lon;
        var theta, phi;
        var t, mu;
        var area = { value: 0 };
        p.x -= this.long0;
        if (this.es !== 0) {
          lat = Math.atan(this.one_minus_f_squared * Math.tan(p.y));
        } else {
          lat = p.y;
        }
        lon = p.x;
        if (this.face === FACE_ENUM.TOP) {
          phi = HALF_PI - lat;
          if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
            area.value = AREA_ENUM.AREA_0;
            theta = lon - HALF_PI;
          } else if (lon > HALF_PI + FORTPI || lon <= -(HALF_PI + FORTPI)) {
            area.value = AREA_ENUM.AREA_1;
            theta = lon > 0 ? lon - SPI : lon + SPI;
          } else if (lon > -(HALF_PI + FORTPI) && lon <= -FORTPI) {
            area.value = AREA_ENUM.AREA_2;
            theta = lon + HALF_PI;
          } else {
            area.value = AREA_ENUM.AREA_3;
            theta = lon;
          }
        } else if (this.face === FACE_ENUM.BOTTOM) {
          phi = HALF_PI + lat;
          if (lon >= FORTPI && lon <= HALF_PI + FORTPI) {
            area.value = AREA_ENUM.AREA_0;
            theta = -lon + HALF_PI;
          } else if (lon < FORTPI && lon >= -FORTPI) {
            area.value = AREA_ENUM.AREA_1;
            theta = -lon;
          } else if (lon < -FORTPI && lon >= -(HALF_PI + FORTPI)) {
            area.value = AREA_ENUM.AREA_2;
            theta = -lon - HALF_PI;
          } else {
            area.value = AREA_ENUM.AREA_3;
            theta = lon > 0 ? -lon + SPI : -lon - SPI;
          }
        } else {
          var q, r, s;
          var sinlat, coslat;
          var sinlon, coslon;
          if (this.face === FACE_ENUM.RIGHT) {
            lon = qsc_shift_lon_origin(lon, +HALF_PI);
          } else if (this.face === FACE_ENUM.BACK) {
            lon = qsc_shift_lon_origin(lon, +SPI);
          } else if (this.face === FACE_ENUM.LEFT) {
            lon = qsc_shift_lon_origin(lon, -HALF_PI);
          }
          sinlat = Math.sin(lat);
          coslat = Math.cos(lat);
          sinlon = Math.sin(lon);
          coslon = Math.cos(lon);
          q = coslat * coslon;
          r = coslat * sinlon;
          s = sinlat;
          if (this.face === FACE_ENUM.FRONT) {
            phi = Math.acos(q);
            theta = qsc_fwd_equat_face_theta(phi, s, r, area);
          } else if (this.face === FACE_ENUM.RIGHT) {
            phi = Math.acos(r);
            theta = qsc_fwd_equat_face_theta(phi, s, -q, area);
          } else if (this.face === FACE_ENUM.BACK) {
            phi = Math.acos(-q);
            theta = qsc_fwd_equat_face_theta(phi, s, -r, area);
          } else if (this.face === FACE_ENUM.LEFT) {
            phi = Math.acos(-r);
            theta = qsc_fwd_equat_face_theta(phi, s, q, area);
          } else {
            phi = theta = 0;
            area.value = AREA_ENUM.AREA_0;
          }
        }
        mu = Math.atan(12 / SPI * (theta + Math.acos(Math.sin(theta) * Math.cos(FORTPI)) - HALF_PI));
        t = Math.sqrt((1 - Math.cos(phi)) / (Math.cos(mu) * Math.cos(mu)) / (1 - Math.cos(Math.atan(1 / Math.cos(theta)))));
        if (area.value === AREA_ENUM.AREA_1) {
          mu += HALF_PI;
        } else if (area.value === AREA_ENUM.AREA_2) {
          mu += SPI;
        } else if (area.value === AREA_ENUM.AREA_3) {
          mu += 1.5 * SPI;
        }
        xy.x = t * Math.cos(mu);
        xy.y = t * Math.sin(mu);
        xy.x = xy.x * this.a + this.x0;
        xy.y = xy.y * this.a + this.y0;
        p.x = xy.x;
        p.y = xy.y;
        return p;
      }
      function inverse$6(p) {
        var lp = { lam: 0, phi: 0 };
        var mu, nu, cosmu, tannu;
        var tantheta, theta, cosphi, phi;
        var t;
        var area = { value: 0 };
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        nu = Math.atan(Math.sqrt(p.x * p.x + p.y * p.y));
        mu = Math.atan2(p.y, p.x);
        if (p.x >= 0 && p.x >= Math.abs(p.y)) {
          area.value = AREA_ENUM.AREA_0;
        } else if (p.y >= 0 && p.y >= Math.abs(p.x)) {
          area.value = AREA_ENUM.AREA_1;
          mu -= HALF_PI;
        } else if (p.x < 0 && -p.x >= Math.abs(p.y)) {
          area.value = AREA_ENUM.AREA_2;
          mu = mu < 0 ? mu + SPI : mu - SPI;
        } else {
          area.value = AREA_ENUM.AREA_3;
          mu += HALF_PI;
        }
        t = SPI / 12 * Math.tan(mu);
        tantheta = Math.sin(t) / (Math.cos(t) - 1 / Math.sqrt(2));
        theta = Math.atan(tantheta);
        cosmu = Math.cos(mu);
        tannu = Math.tan(nu);
        cosphi = 1 - cosmu * cosmu * tannu * tannu * (1 - Math.cos(Math.atan(1 / Math.cos(theta))));
        if (cosphi < -1) {
          cosphi = -1;
        } else if (cosphi > 1) {
          cosphi = 1;
        }
        if (this.face === FACE_ENUM.TOP) {
          phi = Math.acos(cosphi);
          lp.phi = HALF_PI - phi;
          if (area.value === AREA_ENUM.AREA_0) {
            lp.lam = theta + HALF_PI;
          } else if (area.value === AREA_ENUM.AREA_1) {
            lp.lam = theta < 0 ? theta + SPI : theta - SPI;
          } else if (area.value === AREA_ENUM.AREA_2) {
            lp.lam = theta - HALF_PI;
          } else {
            lp.lam = theta;
          }
        } else if (this.face === FACE_ENUM.BOTTOM) {
          phi = Math.acos(cosphi);
          lp.phi = phi - HALF_PI;
          if (area.value === AREA_ENUM.AREA_0) {
            lp.lam = -theta + HALF_PI;
          } else if (area.value === AREA_ENUM.AREA_1) {
            lp.lam = -theta;
          } else if (area.value === AREA_ENUM.AREA_2) {
            lp.lam = -theta - HALF_PI;
          } else {
            lp.lam = theta < 0 ? -theta - SPI : -theta + SPI;
          }
        } else {
          var q, r, s;
          q = cosphi;
          t = q * q;
          if (t >= 1) {
            s = 0;
          } else {
            s = Math.sqrt(1 - t) * Math.sin(theta);
          }
          t += s * s;
          if (t >= 1) {
            r = 0;
          } else {
            r = Math.sqrt(1 - t);
          }
          if (area.value === AREA_ENUM.AREA_1) {
            t = r;
            r = -s;
            s = t;
          } else if (area.value === AREA_ENUM.AREA_2) {
            r = -r;
            s = -s;
          } else if (area.value === AREA_ENUM.AREA_3) {
            t = r;
            r = s;
            s = -t;
          }
          if (this.face === FACE_ENUM.RIGHT) {
            t = q;
            q = -r;
            r = t;
          } else if (this.face === FACE_ENUM.BACK) {
            q = -q;
            r = -r;
          } else if (this.face === FACE_ENUM.LEFT) {
            t = q;
            q = r;
            r = -t;
          }
          lp.phi = Math.acos(-s) - HALF_PI;
          lp.lam = Math.atan2(r, q);
          if (this.face === FACE_ENUM.RIGHT) {
            lp.lam = qsc_shift_lon_origin(lp.lam, -HALF_PI);
          } else if (this.face === FACE_ENUM.BACK) {
            lp.lam = qsc_shift_lon_origin(lp.lam, -SPI);
          } else if (this.face === FACE_ENUM.LEFT) {
            lp.lam = qsc_shift_lon_origin(lp.lam, +HALF_PI);
          }
        }
        if (this.es !== 0) {
          var invert_sign;
          var tanphi, xa;
          invert_sign = lp.phi < 0 ? 1 : 0;
          tanphi = Math.tan(lp.phi);
          xa = this.b / Math.sqrt(tanphi * tanphi + this.one_minus_f_squared);
          lp.phi = Math.atan(Math.sqrt(this.a * this.a - xa * xa) / (this.one_minus_f * xa));
          if (invert_sign) {
            lp.phi = -lp.phi;
          }
        }
        lp.lam += this.long0;
        p.x = lp.lam;
        p.y = lp.phi;
        return p;
      }
      function qsc_fwd_equat_face_theta(phi, y, x, area) {
        var theta;
        if (phi < EPSLN) {
          area.value = AREA_ENUM.AREA_0;
          theta = 0;
        } else {
          theta = Math.atan2(y, x);
          if (Math.abs(theta) <= FORTPI) {
            area.value = AREA_ENUM.AREA_0;
          } else if (theta > FORTPI && theta <= HALF_PI + FORTPI) {
            area.value = AREA_ENUM.AREA_1;
            theta -= HALF_PI;
          } else if (theta > HALF_PI + FORTPI || theta <= -(HALF_PI + FORTPI)) {
            area.value = AREA_ENUM.AREA_2;
            theta = theta >= 0 ? theta - SPI : theta + SPI;
          } else {
            area.value = AREA_ENUM.AREA_3;
            theta += HALF_PI;
          }
        }
        return theta;
      }
      function qsc_shift_lon_origin(lon, offset) {
        var slon = lon + offset;
        if (slon < -SPI) {
          slon += TWO_PI;
        } else if (slon > +SPI) {
          slon -= TWO_PI;
        }
        return slon;
      }
      var names$7 = ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"];
      var qsc = {
        init: init$7,
        forward: forward$6,
        inverse: inverse$6,
        names: names$7
      };
      var COEFS_X = [
        [1, 22199e-21, -715515e-10, 31103e-10],
        [0.9986, -482243e-9, -24897e-9, -13309e-10],
        [0.9954, -83103e-8, -448605e-10, -986701e-12],
        [0.99, -135364e-8, -59661e-9, 36777e-10],
        [0.9822, -167442e-8, -449547e-11, -572411e-11],
        [0.973, -214868e-8, -903571e-10, 18736e-12],
        [0.96, -305085e-8, -900761e-10, 164917e-11],
        [0.9427, -382792e-8, -653386e-10, -26154e-10],
        [0.9216, -467746e-8, -10457e-8, 481243e-11],
        [0.8962, -536223e-8, -323831e-10, -543432e-11],
        [0.8679, -609363e-8, -113898e-9, 332484e-11],
        [0.835, -698325e-8, -640253e-10, 934959e-12],
        [0.7986, -755338e-8, -500009e-10, 935324e-12],
        [0.7597, -798324e-8, -35971e-9, -227626e-11],
        [0.7186, -851367e-8, -701149e-10, -86303e-10],
        [0.6732, -986209e-8, -199569e-9, 191974e-10],
        [0.6213, -0.010418, 883923e-10, 624051e-11],
        [0.5722, -906601e-8, 182e-6, 624051e-11],
        [0.5322, -677797e-8, 275608e-9, 624051e-11]
      ];
      var COEFS_Y = [
        [-520417e-23, 0.0124, 121431e-23, -845284e-16],
        [0.062, 0.0124, -126793e-14, 422642e-15],
        [0.124, 0.0124, 507171e-14, -160604e-14],
        [0.186, 0.0123999, -190189e-13, 600152e-14],
        [0.248, 0.0124002, 710039e-13, -224e-10],
        [0.31, 0.0123992, -264997e-12, 835986e-13],
        [0.372, 0.0124029, 988983e-12, -311994e-12],
        [0.434, 0.0123893, -369093e-11, -435621e-12],
        [0.4958, 0.0123198, -102252e-10, -345523e-12],
        [0.5571, 0.0121916, -154081e-10, -582288e-12],
        [0.6176, 0.0119938, -241424e-10, -525327e-12],
        [0.6769, 0.011713, -320223e-10, -516405e-12],
        [0.7346, 0.0113541, -397684e-10, -609052e-12],
        [0.7903, 0.0109107, -489042e-10, -104739e-11],
        [0.8435, 0.0103431, -64615e-9, -140374e-14],
        [0.8936, 969686e-8, -64636e-9, -8547e-9],
        [0.9394, 840947e-8, -192841e-9, -42106e-10],
        [0.9761, 616527e-8, -256e-6, -42106e-10],
        [1, 328947e-8, -319159e-9, -42106e-10]
      ];
      var FXC = 0.8487;
      var FYC = 1.3523;
      var C1 = R2D / 5;
      var RC1 = 1 / C1;
      var NODES = 18;
      var poly3_val = function(coefs, x) {
        return coefs[0] + x * (coefs[1] + x * (coefs[2] + x * coefs[3]));
      };
      var poly3_der = function(coefs, x) {
        return coefs[1] + x * (2 * coefs[2] + x * 3 * coefs[3]);
      };
      function newton_rapshon(f_df, start2, max_err, iters) {
        var x = start2;
        for (; iters; --iters) {
          var upd = f_df(x);
          x -= upd;
          if (Math.abs(upd) < max_err) {
            break;
          }
        }
        return x;
      }
      function init$6() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.long0 = this.long0 || 0;
        this.es = 0;
        this.title = this.title || "Robinson";
      }
      function forward$5(ll) {
        var lon = adjust_lon(ll.x - this.long0, this.over);
        var dphi = Math.abs(ll.y);
        var i = Math.floor(dphi * C1);
        if (i < 0) {
          i = 0;
        } else if (i >= NODES) {
          i = NODES - 1;
        }
        dphi = R2D * (dphi - RC1 * i);
        var xy = {
          x: poly3_val(COEFS_X[i], dphi) * lon,
          y: poly3_val(COEFS_Y[i], dphi)
        };
        if (ll.y < 0) {
          xy.y = -xy.y;
        }
        xy.x = xy.x * this.a * FXC + this.x0;
        xy.y = xy.y * this.a * FYC + this.y0;
        if (ll.z !== void 0) {
          xy.z = ll.z;
        }
        if (ll.m !== void 0) {
          xy.m = ll.m;
        }
        return xy;
      }
      function inverse$5(xy) {
        var ll = {
          x: (xy.x - this.x0) / (this.a * FXC),
          y: Math.abs(xy.y - this.y0) / (this.a * FYC)
        };
        if (ll.y >= 1) {
          ll.x /= COEFS_X[NODES][0];
          ll.y = xy.y < 0 ? -HALF_PI : HALF_PI;
        } else {
          var i = Math.floor(ll.y * NODES);
          if (i < 0) {
            i = 0;
          } else if (i >= NODES) {
            i = NODES - 1;
          }
          for (; ; ) {
            if (COEFS_Y[i][0] > ll.y) {
              --i;
            } else if (COEFS_Y[i + 1][0] <= ll.y) {
              ++i;
            } else {
              break;
            }
          }
          var coefs = COEFS_Y[i];
          var t = 5 * (ll.y - coefs[0]) / (COEFS_Y[i + 1][0] - coefs[0]);
          t = newton_rapshon(function(x) {
            return (poly3_val(coefs, x) - ll.y) / poly3_der(coefs, x);
          }, t, EPSLN, 100);
          ll.x /= poly3_val(COEFS_X[i], t);
          ll.y = (5 * i + t) * D2R$1;
          if (xy.y < 0) {
            ll.y = -ll.y;
          }
        }
        ll.x = adjust_lon(ll.x + this.long0, this.over);
        if (xy.z !== void 0) {
          ll.z = xy.z;
        }
        if (xy.m !== void 0) {
          ll.m = xy.m;
        }
        return ll;
      }
      var names$6 = ["Robinson", "robin"];
      var robin = {
        init: init$6,
        forward: forward$5,
        inverse: inverse$5,
        names: names$6
      };
      function init$5() {
        this.name = "geocent";
      }
      function forward$4(p) {
        var point = geodeticToGeocentric(p, this.es, this.a);
        return point;
      }
      function inverse$4(p) {
        var point = geocentricToGeodetic(p, this.es, this.a, this.b);
        return point;
      }
      var names$5 = ["Geocentric", "geocentric", "geocent", "Geocent"];
      var geocent = {
        init: init$5,
        forward: forward$4,
        inverse: inverse$4,
        names: names$5
      };
      var mode = {
        N_POLE: 0,
        S_POLE: 1,
        EQUIT: 2,
        OBLIQ: 3
      };
      var params = {
        h: { def: 1e5, num: true },
        // default is Karman line, no default in PROJ.7
        azi: { def: 0, num: true, degrees: true },
        // default is North
        tilt: { def: 0, num: true, degrees: true },
        // default is Nadir
        long0: { def: 0, num: true },
        // default is Greenwich, conversion to rad is automatic
        lat0: { def: 0, num: true }
        // default is Equator, conversion to rad is automatic
      };
      function init$4() {
        Object.keys(params).forEach(function(p) {
          if (typeof this[p] === "undefined") {
            this[p] = params[p].def;
          } else if (params[p].num && isNaN(this[p])) {
            throw new Error("Invalid parameter value, must be numeric " + p + " = " + this[p]);
          } else if (params[p].num) {
            this[p] = parseFloat(this[p]);
          }
          if (params[p].degrees) {
            this[p] = this[p] * D2R$1;
          }
        }.bind(this));
        if (Math.abs(Math.abs(this.lat0) - HALF_PI) < EPSLN) {
          this.mode = this.lat0 < 0 ? mode.S_POLE : mode.N_POLE;
        } else if (Math.abs(this.lat0) < EPSLN) {
          this.mode = mode.EQUIT;
        } else {
          this.mode = mode.OBLIQ;
          this.sinph0 = Math.sin(this.lat0);
          this.cosph0 = Math.cos(this.lat0);
        }
        this.pn1 = this.h / this.a;
        if (this.pn1 <= 0 || this.pn1 > 1e10) {
          throw new Error("Invalid height");
        }
        this.p = 1 + this.pn1;
        this.rp = 1 / this.p;
        this.h1 = 1 / this.pn1;
        this.pfact = (this.p + 1) * this.h1;
        this.es = 0;
        var omega = this.tilt;
        var gamma = this.azi;
        this.cg = Math.cos(gamma);
        this.sg = Math.sin(gamma);
        this.cw = Math.cos(omega);
        this.sw = Math.sin(omega);
      }
      function forward$3(p) {
        p.x -= this.long0;
        var sinphi = Math.sin(p.y);
        var cosphi = Math.cos(p.y);
        var coslam = Math.cos(p.x);
        var x, y;
        switch (this.mode) {
          case mode.OBLIQ:
            y = this.sinph0 * sinphi + this.cosph0 * cosphi * coslam;
            break;
          case mode.EQUIT:
            y = cosphi * coslam;
            break;
          case mode.S_POLE:
            y = -sinphi;
            break;
          case mode.N_POLE:
            y = sinphi;
            break;
        }
        y = this.pn1 / (this.p - y);
        x = y * cosphi * Math.sin(p.x);
        switch (this.mode) {
          case mode.OBLIQ:
            y *= this.cosph0 * sinphi - this.sinph0 * cosphi * coslam;
            break;
          case mode.EQUIT:
            y *= sinphi;
            break;
          case mode.N_POLE:
            y *= -(cosphi * coslam);
            break;
          case mode.S_POLE:
            y *= cosphi * coslam;
            break;
        }
        var yt, ba;
        yt = y * this.cg + x * this.sg;
        ba = 1 / (yt * this.sw * this.h1 + this.cw);
        x = (x * this.cg - y * this.sg) * this.cw * ba;
        y = yt * ba;
        p.x = x * this.a;
        p.y = y * this.a;
        return p;
      }
      function inverse$3(p) {
        p.x /= this.a;
        p.y /= this.a;
        var r = { x: p.x, y: p.y };
        var bm, bq, yt;
        yt = 1 / (this.pn1 - p.y * this.sw);
        bm = this.pn1 * p.x * yt;
        bq = this.pn1 * p.y * this.cw * yt;
        p.x = bm * this.cg + bq * this.sg;
        p.y = bq * this.cg - bm * this.sg;
        var rh = hypot(p.x, p.y);
        if (Math.abs(rh) < EPSLN) {
          r.x = 0;
          r.y = p.y;
        } else {
          var cosz, sinz;
          sinz = 1 - rh * rh * this.pfact;
          sinz = (this.p - Math.sqrt(sinz)) / (this.pn1 / rh + rh / this.pn1);
          cosz = Math.sqrt(1 - sinz * sinz);
          switch (this.mode) {
            case mode.OBLIQ:
              r.y = Math.asin(cosz * this.sinph0 + p.y * sinz * this.cosph0 / rh);
              p.y = (cosz - this.sinph0 * Math.sin(r.y)) * rh;
              p.x *= sinz * this.cosph0;
              break;
            case mode.EQUIT:
              r.y = Math.asin(p.y * sinz / rh);
              p.y = cosz * rh;
              p.x *= sinz;
              break;
            case mode.N_POLE:
              r.y = Math.asin(cosz);
              p.y = -p.y;
              break;
            case mode.S_POLE:
              r.y = -Math.asin(cosz);
              break;
          }
          r.x = Math.atan2(p.x, p.y);
        }
        p.x = r.x + this.long0;
        p.y = r.y;
        return p;
      }
      var names$4 = ["Tilted_Perspective", "tpers"];
      var tpers = {
        init: init$4,
        forward: forward$3,
        inverse: inverse$3,
        names: names$4
      };
      function init$3() {
        this.flip_axis = this.sweep === "x" ? 1 : 0;
        this.h = Number(this.h);
        this.radius_g_1 = this.h / this.a;
        if (this.radius_g_1 <= 0 || this.radius_g_1 > 1e10) {
          throw new Error();
        }
        this.radius_g = 1 + this.radius_g_1;
        this.C = this.radius_g * this.radius_g - 1;
        if (this.es !== 0) {
          var one_es = 1 - this.es;
          var rone_es = 1 / one_es;
          this.radius_p = Math.sqrt(one_es);
          this.radius_p2 = one_es;
          this.radius_p_inv2 = rone_es;
          this.shape = "ellipse";
        } else {
          this.radius_p = 1;
          this.radius_p2 = 1;
          this.radius_p_inv2 = 1;
          this.shape = "sphere";
        }
        if (!this.title) {
          this.title = "Geostationary Satellite View";
        }
      }
      function forward$2(p) {
        var lon = p.x;
        var lat = p.y;
        var tmp, v_x, v_y, v_z;
        lon = lon - this.long0;
        if (this.shape === "ellipse") {
          lat = Math.atan(this.radius_p2 * Math.tan(lat));
          var r = this.radius_p / hypot(this.radius_p * Math.cos(lat), Math.sin(lat));
          v_x = r * Math.cos(lon) * Math.cos(lat);
          v_y = r * Math.sin(lon) * Math.cos(lat);
          v_z = r * Math.sin(lat);
          if ((this.radius_g - v_x) * v_x - v_y * v_y - v_z * v_z * this.radius_p_inv2 < 0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
          }
          tmp = this.radius_g - v_x;
          if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp);
          } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
          }
        } else if (this.shape === "sphere") {
          tmp = Math.cos(lat);
          v_x = Math.cos(lon) * tmp;
          v_y = Math.sin(lon) * tmp;
          v_z = Math.sin(lat);
          tmp = this.radius_g - v_x;
          if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp);
          } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp));
          }
        }
        p.x = p.x * this.a;
        p.y = p.y * this.a;
        return p;
      }
      function inverse$2(p) {
        var v_x = -1;
        var v_y = 0;
        var v_z = 0;
        var a, b, det, k;
        p.x = p.x / this.a;
        p.y = p.y / this.a;
        if (this.shape === "ellipse") {
          if (this.flip_axis) {
            v_z = Math.tan(p.y / this.radius_g_1);
            v_y = Math.tan(p.x / this.radius_g_1) * hypot(1, v_z);
          } else {
            v_y = Math.tan(p.x / this.radius_g_1);
            v_z = Math.tan(p.y / this.radius_g_1) * hypot(1, v_y);
          }
          var v_zp = v_z / this.radius_p;
          a = v_y * v_y + v_zp * v_zp + v_x * v_x;
          b = 2 * this.radius_g * v_x;
          det = b * b - 4 * a * this.C;
          if (det < 0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
          }
          k = (-b - Math.sqrt(det)) / (2 * a);
          v_x = this.radius_g + k * v_x;
          v_y *= k;
          v_z *= k;
          p.x = Math.atan2(v_y, v_x);
          p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
          p.y = Math.atan(this.radius_p_inv2 * Math.tan(p.y));
        } else if (this.shape === "sphere") {
          if (this.flip_axis) {
            v_z = Math.tan(p.y / this.radius_g_1);
            v_y = Math.tan(p.x / this.radius_g_1) * Math.sqrt(1 + v_z * v_z);
          } else {
            v_y = Math.tan(p.x / this.radius_g_1);
            v_z = Math.tan(p.y / this.radius_g_1) * Math.sqrt(1 + v_y * v_y);
          }
          a = v_y * v_y + v_z * v_z + v_x * v_x;
          b = 2 * this.radius_g * v_x;
          det = b * b - 4 * a * this.C;
          if (det < 0) {
            p.x = Number.NaN;
            p.y = Number.NaN;
            return p;
          }
          k = (-b - Math.sqrt(det)) / (2 * a);
          v_x = this.radius_g + k * v_x;
          v_y *= k;
          v_z *= k;
          p.x = Math.atan2(v_y, v_x);
          p.y = Math.atan(v_z * Math.cos(p.x) / v_x);
        }
        p.x = p.x + this.long0;
        return p;
      }
      var names$3 = ["Geostationary Satellite View", "Geostationary_Satellite", "geos"];
      var geos = {
        init: init$3,
        forward: forward$2,
        inverse: inverse$2,
        names: names$3
      };
      var A1 = 1.340264, A2 = -0.081106, A3 = 893e-6, A4 = 3796e-6, M = Math.sqrt(3) / 2;
      function init$2() {
        this.long0 = this.long0 !== void 0 ? this.long0 : 0;
        this.x0 = this.x0 !== void 0 ? this.x0 : 0;
        this.y0 = this.y0 !== void 0 ? this.y0 : 0;
        if (this.es !== 0) {
          this.apa = authset(this.es);
          this.qp = qsfnz(this.e, 1);
          this.rqda = Math.sqrt(0.5 * this.qp);
        }
      }
      function forward$1(p) {
        var lam = adjust_lon(p.x - this.long0, this.over);
        var phi = p.y;
        var sinphi = Math.sin(phi);
        if (this.es !== 0) {
          sinphi = qsfnz(this.e, sinphi) / this.qp;
        }
        var paramLat = Math.asin(M * sinphi), paramLatSq = paramLat * paramLat, paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
        p.x = lam * Math.cos(paramLat) / (M * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)));
        p.y = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq));
        if (this.es !== 0) {
          p.x *= this.rqda;
          p.y *= this.rqda;
        }
        p.x = this.a * p.x + this.x0;
        p.y = this.a * p.y + this.y0;
        return p;
      }
      function inverse$1(p) {
        p.x = (p.x - this.x0) / this.a;
        p.y = (p.y - this.y0) / this.a;
        if (this.es !== 0) {
          p.x /= this.rqda;
          p.y /= this.rqda;
        }
        var EPS = 1e-9, NITER = 12, paramLat = p.y, paramLatSq, paramLatPow6, fy, fpy, dlat, i;
        for (i = 0; i < NITER; ++i) {
          paramLatSq = paramLat * paramLat;
          paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
          fy = paramLat * (A1 + A2 * paramLatSq + paramLatPow6 * (A3 + A4 * paramLatSq)) - p.y;
          fpy = A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq);
          paramLat -= dlat = fy / fpy;
          if (Math.abs(dlat) < EPS) {
            break;
          }
        }
        paramLatSq = paramLat * paramLat;
        paramLatPow6 = paramLatSq * paramLatSq * paramLatSq;
        p.x = M * p.x * (A1 + 3 * A2 * paramLatSq + paramLatPow6 * (7 * A3 + 9 * A4 * paramLatSq)) / Math.cos(paramLat);
        p.y = Math.asin(Math.sin(paramLat) / M);
        if (this.es !== 0) {
          p.y = authlat(p.y, this.apa);
        }
        p.x = adjust_lon(p.x + this.long0, this.over);
        return p;
      }
      var names$2 = ["eqearth", "Equal Earth", "Equal_Earth"];
      var eqearth = {
        init: init$2,
        forward: forward$1,
        inverse: inverse$1,
        names: names$2
      };
      var EPS10 = 1e-10;
      function init$1() {
        var c;
        this.phi1 = this.lat1;
        if (Math.abs(this.phi1) < EPS10) {
          throw new Error();
        }
        if (this.es) {
          this.en = pj_enfn(this.es);
          this.m1 = pj_mlfn(
            this.phi1,
            this.am1 = Math.sin(this.phi1),
            c = Math.cos(this.phi1),
            this.en
          );
          this.am1 = c / (Math.sqrt(1 - this.es * this.am1 * this.am1) * this.am1);
          this.inverse = e_inv;
          this.forward = e_fwd;
        } else {
          if (Math.abs(this.phi1) + EPS10 >= HALF_PI) {
            this.cphi1 = 0;
          } else {
            this.cphi1 = 1 / Math.tan(this.phi1);
          }
          this.inverse = s_inv;
          this.forward = s_fwd;
        }
      }
      function e_fwd(p) {
        var lam = adjust_lon(p.x - (this.long0 || 0), this.over);
        var phi = p.y;
        var rh, E, c;
        rh = this.am1 + this.m1 - pj_mlfn(phi, E = Math.sin(phi), c = Math.cos(phi), this.en);
        E = c * lam / (rh * Math.sqrt(1 - this.es * E * E));
        p.x = rh * Math.sin(E);
        p.y = this.am1 - rh * Math.cos(E);
        p.x = this.a * p.x + (this.x0 || 0);
        p.y = this.a * p.y + (this.y0 || 0);
        return p;
      }
      function e_inv(p) {
        p.x = (p.x - (this.x0 || 0)) / this.a;
        p.y = (p.y - (this.y0 || 0)) / this.a;
        var s, rh, lam, phi;
        rh = hypot(p.x, p.y = this.am1 - p.y);
        phi = pj_inv_mlfn(this.am1 + this.m1 - rh, this.es, this.en);
        if ((s = Math.abs(phi)) < HALF_PI) {
          s = Math.sin(phi);
          lam = rh * Math.atan2(p.x, p.y) * Math.sqrt(1 - this.es * s * s) / Math.cos(phi);
        } else if (Math.abs(s - HALF_PI) <= EPS10) {
          lam = 0;
        } else {
          throw new Error();
        }
        p.x = adjust_lon(lam + (this.long0 || 0), this.over);
        p.y = adjust_lat(phi);
        return p;
      }
      function s_fwd(p) {
        var lam = adjust_lon(p.x - (this.long0 || 0), this.over);
        var phi = p.y;
        var E, rh;
        rh = this.cphi1 + this.phi1 - phi;
        if (Math.abs(rh) > EPS10) {
          p.x = rh * Math.sin(E = lam * Math.cos(phi) / rh);
          p.y = this.cphi1 - rh * Math.cos(E);
        } else {
          p.x = p.y = 0;
        }
        p.x = this.a * p.x + (this.x0 || 0);
        p.y = this.a * p.y + (this.y0 || 0);
        return p;
      }
      function s_inv(p) {
        p.x = (p.x - (this.x0 || 0)) / this.a;
        p.y = (p.y - (this.y0 || 0)) / this.a;
        var lam, phi;
        var rh = hypot(p.x, p.y = this.cphi1 - p.y);
        phi = this.cphi1 + this.phi1 - rh;
        if (Math.abs(phi) > HALF_PI) {
          throw new Error();
        }
        if (Math.abs(Math.abs(phi) - HALF_PI) <= EPS10) {
          lam = 0;
        } else {
          lam = rh * Math.atan2(p.x, p.y) / Math.cos(phi);
        }
        p.x = adjust_lon(lam + (this.long0 || 0), this.over);
        p.y = adjust_lat(phi);
        return p;
      }
      var names$1 = ["bonne", "Bonne (Werner lat_1=90)"];
      var bonne = {
        init: init$1,
        names: names$1
      };
      const projectionType = {
        OBLIQUE: {
          forward: forwardOblique,
          inverse: inverseOblique
        },
        TRANSVERSE: {
          forward: forwardTransverse,
          inverse: inverseTransverse
        }
      };
      const paramSets = {
        ROTATE: {
          o_alpha: "oAlpha",
          o_lon_c: "oLongC",
          o_lat_c: "oLatC"
        },
        NEW_POLE: {
          o_lat_p: "oLatP",
          o_lon_p: "oLongP"
        },
        NEW_EQUATOR: {
          o_lon_1: "oLong1",
          o_lat_1: "oLat1",
          o_lon_2: "oLong2",
          o_lat_2: "oLat2"
        }
      };
      function init2() {
        this.x0 = this.x0 || 0;
        this.y0 = this.y0 || 0;
        this.long0 = this.long0 || 0;
        this.title = this.title || "General Oblique Transformation";
        this.isIdentity = names$y.includes(this.o_proj);
        if (!this.o_proj) {
          throw new Error("Missing parameter: o_proj");
        }
        if (this.o_proj === `ob_tran`) {
          throw new Error("Invalid value for o_proj: " + this.o_proj);
        }
        const newProjStr = this.projStr.replace("+proj=ob_tran", "").replace("+o_proj=", "+proj=").trim();
        const oProj = Projection(newProjStr);
        if (!oProj) {
          throw new Error("Invalid parameter: o_proj. Unknown projection " + this.o_proj);
        }
        oProj.long0 = 0;
        this.obliqueProjection = oProj;
        let matchedSet;
        const paramSetsKeys = Object.keys(paramSets);
        const parseParam = (name) => {
          if (typeof this[name] === `undefined`) {
            return void 0;
          }
          const val = parseFloat(this[name]) * D2R$1;
          if (isNaN(val)) {
            throw new Error("Invalid value for " + name + ": " + this[name]);
          }
          return val;
        };
        for (let i = 0; i < paramSetsKeys.length; i++) {
          const setKey = paramSetsKeys[i];
          const set = paramSets[setKey];
          const params2 = Object.entries(set);
          const setHasParams = params2.some(
            ([p]) => typeof this[p] !== "undefined"
          );
          if (!setHasParams) {
            continue;
          }
          matchedSet = set;
          for (let ii = 0; ii < params2.length; ii++) {
            const [inputParam, param] = params2[ii];
            const val = parseParam(inputParam);
            if (typeof val === "undefined") {
              throw new Error("Missing parameter: " + inputParam + ".");
            }
            this[param] = val;
          }
          break;
        }
        if (!matchedSet) {
          throw new Error("No valid parameters provided for ob_tran projection.");
        }
        const { lamp, phip } = createRotation(this, matchedSet);
        this.lamp = lamp;
        if (Math.abs(phip) > EPSLN) {
          this.cphip = Math.cos(phip);
          this.sphip = Math.sin(phip);
          this.projectionType = projectionType.OBLIQUE;
        } else {
          this.projectionType = projectionType.TRANSVERSE;
        }
      }
      function forward(p) {
        return this.projectionType.forward(this, p);
      }
      function inverse(p) {
        return this.projectionType.inverse(this, p);
      }
      function createRotation(params2, how) {
        let phip, lamp;
        if (how === paramSets.ROTATE) {
          let lamc = params2.oLongC;
          let phic = params2.oLatC;
          let alpha = params2.oAlpha;
          if (Math.abs(Math.abs(phic) - HALF_PI) <= EPSLN) {
            throw new Error("Invalid value for o_lat_c: " + params2.o_lat_c + " should be < 90\xB0");
          }
          lamp = lamc + Math.atan2(-1 * Math.cos(alpha), -1 * Math.sin(alpha) * Math.sin(phic));
          phip = Math.asin(Math.cos(phic) * Math.sin(alpha));
        } else if (how === paramSets.NEW_POLE) {
          lamp = params2.oLongP;
          phip = params2.oLatP;
        } else {
          let lam1 = params2.oLong1;
          let phi1 = params2.oLat1;
          let lam2 = params2.oLong2;
          let phi2 = params2.oLat2;
          let con = Math.abs(phi1);
          if (Math.abs(phi1) > HALF_PI - EPSLN) {
            throw new Error("Invalid value for o_lat_1: " + params2.o_lat_1 + " should be < 90\xB0");
          }
          if (Math.abs(phi2) > HALF_PI - EPSLN) {
            throw new Error("Invalid value for o_lat_2: " + params2.o_lat_2 + " should be < 90\xB0");
          }
          if (Math.abs(phi1 - phi2) < EPSLN) {
            throw new Error("Invalid value for o_lat_1 and o_lat_2: o_lat_1 should be different from o_lat_2");
          }
          if (con < EPSLN) {
            throw new Error("Invalid value for o_lat_1: o_lat_1 should be different from zero");
          }
          lamp = Math.atan2(
            Math.cos(phi1) * Math.sin(phi2) * Math.cos(lam1) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2),
            Math.sin(phi1) * Math.cos(phi2) * Math.sin(lam2) - Math.cos(phi1) * Math.sin(phi2) * Math.sin(lam1)
          );
          phip = Math.atan(-1 * Math.cos(lamp - lam1) / Math.tan(phi1));
        }
        return { lamp, phip };
      }
      function forwardOblique(self2, lp) {
        let { x: lam, y: phi } = lp;
        lam = adjust_lon(lam - self2.long0, self2.over);
        const coslam = Math.cos(lam);
        const sinphi = Math.sin(phi);
        const cosphi = Math.cos(phi);
        lp.x = adjust_lon(
          Math.atan2(
            cosphi * Math.sin(lam),
            self2.sphip * cosphi * coslam + self2.cphip * sinphi
          ) + self2.lamp
        );
        lp.y = Math.asin(
          self2.sphip * sinphi - self2.cphip * cosphi * coslam
        );
        const result = self2.obliqueProjection.forward(lp);
        if (self2.isIdentity) {
          result.x *= R2D;
          result.y *= R2D;
        }
        return result;
      }
      function forwardTransverse(self2, lp) {
        let { x: lam, y: phi } = lp;
        lam = adjust_lon(lam - self2.long0, self2.over);
        const cosphi = Math.cos(phi);
        const coslam = Math.cos(lam);
        lp.x = adjust_lon(
          Math.atan2(
            cosphi * Math.sin(lam),
            Math.sin(phi)
          ) + self2.lamp
        );
        lp.y = Math.asin(-1 * cosphi * coslam);
        const result = self2.obliqueProjection.forward(lp);
        if (self2.isIdentity) {
          result.x *= R2D;
          result.y *= R2D;
        }
        return result;
      }
      function inverseOblique(self2, lp) {
        if (self2.isIdentity) {
          lp.x *= D2R$1;
          lp.y *= D2R$1;
        }
        const innerLp = self2.obliqueProjection.inverse(lp);
        let { x: lam, y: phi } = innerLp;
        if (lam < Number.MAX_VALUE) {
          lam -= self2.lamp;
          const coslam = Math.cos(lam);
          const sinphi = Math.sin(phi);
          const cosphi = Math.cos(phi);
          lp.x = Math.atan2(
            cosphi * Math.sin(lam),
            self2.sphip * cosphi * coslam - self2.cphip * sinphi
          );
          lp.y = Math.asin(
            self2.sphip * sinphi + self2.cphip * cosphi * coslam
          );
        }
        lp.x = adjust_lon(lp.x + self2.long0);
        return lp;
      }
      function inverseTransverse(self2, lp) {
        if (self2.isIdentity) {
          lp.x *= D2R$1;
          lp.y *= D2R$1;
        }
        const innerLp = self2.obliqueProjection.inverse(lp);
        let { x: lam, y: phi } = innerLp;
        if (lam < Number.MAX_VALUE) {
          const cosphi = Math.cos(phi);
          lam -= self2.lamp;
          lp.x = Math.atan2(
            cosphi * Math.sin(lam),
            -1 * Math.sin(phi)
          );
          lp.y = Math.asin(
            cosphi * Math.cos(lam)
          );
        }
        lp.x = adjust_lon(lp.x + self2.long0);
        return lp;
      }
      var names = ["General Oblique Transformation", "General_Oblique_Transformation", "ob_tran"];
      var ob_tran = {
        init: init2,
        forward,
        inverse,
        names
      };
      function includedProjections(proj43) {
        proj43.Proj.projections.add(tmerc);
        proj43.Proj.projections.add(etmerc);
        proj43.Proj.projections.add(utm);
        proj43.Proj.projections.add(sterea);
        proj43.Proj.projections.add(stere);
        proj43.Proj.projections.add(somerc);
        proj43.Proj.projections.add(omerc);
        proj43.Proj.projections.add(lcc);
        proj43.Proj.projections.add(krovak);
        proj43.Proj.projections.add(cass);
        proj43.Proj.projections.add(laea);
        proj43.Proj.projections.add(aea);
        proj43.Proj.projections.add(gnom);
        proj43.Proj.projections.add(cea);
        proj43.Proj.projections.add(eqc);
        proj43.Proj.projections.add(poly);
        proj43.Proj.projections.add(nzmg);
        proj43.Proj.projections.add(mill);
        proj43.Proj.projections.add(sinu);
        proj43.Proj.projections.add(eck6);
        proj43.Proj.projections.add(moll);
        proj43.Proj.projections.add(eqdc);
        proj43.Proj.projections.add(vandg);
        proj43.Proj.projections.add(aeqd);
        proj43.Proj.projections.add(ortho);
        proj43.Proj.projections.add(qsc);
        proj43.Proj.projections.add(robin);
        proj43.Proj.projections.add(geocent);
        proj43.Proj.projections.add(tpers);
        proj43.Proj.projections.add(geos);
        proj43.Proj.projections.add(eqearth);
        proj43.Proj.projections.add(bonne);
        proj43.Proj.projections.add(ob_tran);
      }
      const proj42 = Object.assign(proj4$1, {
        defaultDatum: "WGS84",
        Proj: Projection,
        WGS84: new Projection("WGS84"),
        Point,
        toPoint: common2,
        defs,
        nadgrid,
        transform,
        mgrs,
        version: "2.22.0"
      });
      includedProjections(proj42);
      return proj42;
    }));
  }
});

// scripts/sources/raster.mjs
var raster_exports = {};
__export(raster_exports, {
  readGeoTiff: () => readGeoTiff
});
module.exports = __toCommonJS(raster_exports);

// node_modules/@petamoriken/float16/src/_util/messages.mjs
var CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT = "Cannot convert undefined or null to object";

// node_modules/@petamoriken/float16/src/_util/primordials.mjs
function uncurryThis(target) {
  return (thisArg, ...args) => {
    return ReflectApply(target, thisArg, args);
  };
}
function uncurryThisGetter(target, key) {
  return uncurryThis(
    ReflectGetOwnPropertyDescriptor(
      target,
      key
    ).get
  );
}
var {
  apply: ReflectApply,
  construct: ReflectConstruct,
  defineProperty: ReflectDefineProperty,
  get: ReflectGet,
  getOwnPropertyDescriptor: ReflectGetOwnPropertyDescriptor,
  getPrototypeOf: ReflectGetPrototypeOf,
  has: ReflectHas,
  ownKeys: ReflectOwnKeys,
  set: ReflectSet,
  setPrototypeOf: ReflectSetPrototypeOf
} = Reflect;
var {
  EPSILON,
  MAX_SAFE_INTEGER,
  isFinite: NumberIsFinite,
  isNaN: NumberIsNaN
} = Number;
var {
  iterator: SymbolIterator,
  species: SymbolSpecies,
  toStringTag: SymbolToStringTag,
  for: SymbolFor
} = Symbol;
var NativeObject = Object;
var {
  create: ObjectCreate,
  defineProperty: ObjectDefineProperty,
  freeze: ObjectFreeze,
  is: ObjectIs
} = NativeObject;
var ObjectPrototype = NativeObject.prototype;
var ObjectPrototype__lookupGetter__ = (
  /** @type {any} */
  ObjectPrototype.__lookupGetter__ ? uncurryThis(
    /** @type {any} */
    ObjectPrototype.__lookupGetter__
  ) : (object, key) => {
    if (object == null) {
      throw NativeTypeError(
        CANNOT_CONVERT_UNDEFINED_OR_NULL_TO_OBJECT
      );
    }
    let target = NativeObject(object);
    do {
      const descriptor = ReflectGetOwnPropertyDescriptor(target, key);
      if (descriptor !== void 0) {
        if (ObjectHasOwn(descriptor, "get")) {
          return descriptor.get;
        }
        return;
      }
    } while ((target = ReflectGetPrototypeOf(target)) !== null);
  }
);
var ObjectHasOwn = (
  /** @type {any} */
  NativeObject.hasOwn || uncurryThis(ObjectPrototype.hasOwnProperty)
);
var NativeArray = Array;
var ArrayIsArray = NativeArray.isArray;
var ArrayPrototype = NativeArray.prototype;
var ArrayPrototypeJoin = uncurryThis(ArrayPrototype.join);
var ArrayPrototypePush = uncurryThis(ArrayPrototype.push);
var ArrayPrototypeToLocaleString = uncurryThis(
  ArrayPrototype.toLocaleString
);
var NativeArrayPrototypeSymbolIterator = ArrayPrototype[SymbolIterator];
var ArrayPrototypeSymbolIterator = uncurryThis(NativeArrayPrototypeSymbolIterator);
var {
  abs: MathAbs,
  trunc: MathTrunc
} = Math;
var NativeArrayBuffer = ArrayBuffer;
var ArrayBufferIsView = NativeArrayBuffer.isView;
var ArrayBufferPrototype = NativeArrayBuffer.prototype;
var ArrayBufferPrototypeSlice = uncurryThis(ArrayBufferPrototype.slice);
var ArrayBufferPrototypeGetByteLength = uncurryThisGetter(ArrayBufferPrototype, "byteLength");
var NativeSharedArrayBuffer = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : null;
var SharedArrayBufferPrototypeGetByteLength = NativeSharedArrayBuffer && uncurryThisGetter(NativeSharedArrayBuffer.prototype, "byteLength");
var TypedArray = ReflectGetPrototypeOf(Uint8Array);
var TypedArrayFrom = TypedArray.from;
var TypedArrayPrototype = TypedArray.prototype;
var NativeTypedArrayPrototypeSymbolIterator = TypedArrayPrototype[SymbolIterator];
var TypedArrayPrototypeKeys = uncurryThis(TypedArrayPrototype.keys);
var TypedArrayPrototypeValues = uncurryThis(
  TypedArrayPrototype.values
);
var TypedArrayPrototypeEntries = uncurryThis(
  TypedArrayPrototype.entries
);
var TypedArrayPrototypeSet = uncurryThis(TypedArrayPrototype.set);
var TypedArrayPrototypeReverse = uncurryThis(
  TypedArrayPrototype.reverse
);
var TypedArrayPrototypeFill = uncurryThis(TypedArrayPrototype.fill);
var TypedArrayPrototypeCopyWithin = uncurryThis(
  TypedArrayPrototype.copyWithin
);
var TypedArrayPrototypeSort = uncurryThis(TypedArrayPrototype.sort);
var TypedArrayPrototypeSlice = uncurryThis(TypedArrayPrototype.slice);
var TypedArrayPrototypeSubarray = uncurryThis(
  TypedArrayPrototype.subarray
);
var TypedArrayPrototypeGetBuffer = uncurryThisGetter(
  TypedArrayPrototype,
  "buffer"
);
var TypedArrayPrototypeGetByteOffset = uncurryThisGetter(
  TypedArrayPrototype,
  "byteOffset"
);
var TypedArrayPrototypeGetLength = uncurryThisGetter(
  TypedArrayPrototype,
  "length"
);
var TypedArrayPrototypeGetSymbolToStringTag = uncurryThisGetter(
  TypedArrayPrototype,
  SymbolToStringTag
);
var NativeUint8Array = Uint8Array;
var NativeUint16Array = Uint16Array;
var NativeUint32Array = Uint32Array;
var NativeFloat32Array = Float32Array;
var ArrayIteratorPrototype = ReflectGetPrototypeOf([][SymbolIterator]());
var ArrayIteratorPrototypeNext = uncurryThis(ArrayIteratorPrototype.next);
var GeneratorPrototypeNext = uncurryThis((function* () {
})().next);
var IteratorPrototype = ReflectGetPrototypeOf(ArrayIteratorPrototype);
var DataViewPrototype = DataView.prototype;
var DataViewPrototypeGetUint16 = uncurryThis(
  DataViewPrototype.getUint16
);
var DataViewPrototypeSetUint16 = uncurryThis(
  DataViewPrototype.setUint16
);
var NativeTypeError = TypeError;
var NativeWeakSet = WeakSet;
var WeakSetPrototype = NativeWeakSet.prototype;
var WeakSetPrototypeAdd = uncurryThis(WeakSetPrototype.add);
var WeakSetPrototypeHas = uncurryThis(WeakSetPrototype.has);
var NativeWeakMap = WeakMap;
var WeakMapPrototype = NativeWeakMap.prototype;
var WeakMapPrototypeGet = uncurryThis(WeakMapPrototype.get);
var WeakMapPrototypeHas = uncurryThis(WeakMapPrototype.has);
var WeakMapPrototypeSet = uncurryThis(WeakMapPrototype.set);

// node_modules/@petamoriken/float16/src/_util/arrayIterator.mjs
var arrayIterators = new NativeWeakMap();
var SafeIteratorPrototype = ObjectCreate(null, {
  next: {
    value: function next() {
      const arrayIterator = WeakMapPrototypeGet(arrayIterators, this);
      return ArrayIteratorPrototypeNext(arrayIterator);
    }
  },
  [SymbolIterator]: {
    value: function values() {
      return this;
    }
  }
});
function safeIfNeeded(array) {
  if (array[SymbolIterator] === NativeArrayPrototypeSymbolIterator && ArrayIteratorPrototype.next === ArrayIteratorPrototypeNext) {
    return array;
  }
  const safe = ObjectCreate(SafeIteratorPrototype);
  WeakMapPrototypeSet(arrayIterators, safe, ArrayPrototypeSymbolIterator(array));
  return safe;
}
var generators = new NativeWeakMap();
var DummyArrayIteratorPrototype = ObjectCreate(IteratorPrototype, {
  next: {
    value: function next2() {
      const generator = WeakMapPrototypeGet(generators, this);
      return GeneratorPrototypeNext(generator);
    },
    writable: true,
    configurable: true
  }
});
for (const key of ReflectOwnKeys(ArrayIteratorPrototype)) {
  if (key === "next") {
    continue;
  }
  ObjectDefineProperty(DummyArrayIteratorPrototype, key, ReflectGetOwnPropertyDescriptor(ArrayIteratorPrototype, key));
}

// node_modules/@petamoriken/float16/src/_util/converter.mjs
var INVERSE_OF_EPSILON = 1 / EPSILON;
var FLOAT16_MIN_VALUE = 6103515625e-14;
var FLOAT16_EPSILON = 9765625e-10;
var FLOAT16_EPSILON_MULTIPLIED_BY_FLOAT16_MIN_VALUE = FLOAT16_EPSILON * FLOAT16_MIN_VALUE;
var FLOAT16_EPSILON_DEVIDED_BY_EPSILON = FLOAT16_EPSILON * INVERSE_OF_EPSILON;
var buffer = new NativeArrayBuffer(4);
var floatView = new NativeFloat32Array(buffer);
var uint32View = new NativeUint32Array(buffer);
var baseTable = new NativeUint16Array(512);
var shiftTable = new NativeUint8Array(512);
for (let i = 0; i < 256; ++i) {
  const e = i - 127;
  if (e < -24) {
    baseTable[i] = 0;
    baseTable[i | 256] = 32768;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else if (e < -14) {
    baseTable[i] = 1024 >> -e - 14;
    baseTable[i | 256] = 1024 >> -e - 14 | 32768;
    shiftTable[i] = -e - 1;
    shiftTable[i | 256] = -e - 1;
  } else if (e <= 15) {
    baseTable[i] = e + 15 << 10;
    baseTable[i | 256] = e + 15 << 10 | 32768;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  } else if (e < 128) {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 24;
    shiftTable[i | 256] = 24;
  } else {
    baseTable[i] = 31744;
    baseTable[i | 256] = 64512;
    shiftTable[i] = 13;
    shiftTable[i | 256] = 13;
  }
}
var mantissaTable = new NativeUint32Array(2048);
for (let i = 1; i < 1024; ++i) {
  let m = i << 13;
  let e = 0;
  while ((m & 8388608) === 0) {
    m <<= 1;
    e -= 8388608;
  }
  m &= ~8388608;
  e += 947912704;
  mantissaTable[i] = m | e;
}
for (let i = 1024; i < 2048; ++i) {
  mantissaTable[i] = 939524096 + (i - 1024 << 13);
}
var exponentTable = new NativeUint32Array(64);
for (let i = 1; i < 31; ++i) {
  exponentTable[i] = i << 23;
}
exponentTable[31] = 1199570944;
exponentTable[32] = 2147483648;
for (let i = 33; i < 63; ++i) {
  exponentTable[i] = 2147483648 + (i - 32 << 23);
}
exponentTable[63] = 3347054592;
var offsetTable = new NativeUint16Array(64);
for (let i = 1; i < 64; ++i) {
  if (i !== 32) {
    offsetTable[i] = 1024;
  }
}
function convertToNumber(float16bits) {
  const i = float16bits >> 10;
  uint32View[0] = mantissaTable[offsetTable[i] + (float16bits & 1023)] + exponentTable[i];
  return floatView[0];
}

// node_modules/@petamoriken/float16/src/DataView.mjs
function getFloat16(dataView, byteOffset, ...opts) {
  return convertToNumber(
    DataViewPrototypeGetUint16(dataView, byteOffset, ...safeIfNeeded(opts))
  );
}

// node_modules/geotiff/dist-module/geotiffimage.js
var import_get_attribute = __toESM(require_get_attribute(), 1);
var import_find_tags_by_name = __toESM(require_find_tags_by_name(), 1);
init_globals();

// node_modules/geotiff/dist-module/rgb.js
function fromWhiteIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = 256 - raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromBlackIsZero(raster, max) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  let value;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    value = raster[i] / max * 256;
    rgbRaster[j] = value;
    rgbRaster[j + 1] = value;
    rgbRaster[j + 2] = value;
  }
  return rgbRaster;
}
function fromPalette(raster, colorMap) {
  const { width, height } = raster;
  const rgbRaster = new Uint8Array(width * height * 3);
  const greenOffset = colorMap.length / 3;
  const blueOffset = colorMap.length / 3 * 2;
  for (let i = 0, j = 0; i < raster.length; ++i, j += 3) {
    const mapIndex = raster[i];
    rgbRaster[j] = colorMap[mapIndex] / 65536 * 256;
    rgbRaster[j + 1] = colorMap[mapIndex + greenOffset] / 65536 * 256;
    rgbRaster[j + 2] = colorMap[mapIndex + blueOffset] / 65536 * 256;
  }
  return rgbRaster;
}
function fromCMYK(cmykRaster) {
  const { width, height } = cmykRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cmykRaster.length; i += 4, j += 3) {
    const c = cmykRaster[i];
    const m = cmykRaster[i + 1];
    const y = cmykRaster[i + 2];
    const k = cmykRaster[i + 3];
    rgbRaster[j] = 255 * ((255 - c) / 256) * ((255 - k) / 256);
    rgbRaster[j + 1] = 255 * ((255 - m) / 256) * ((255 - k) / 256);
    rgbRaster[j + 2] = 255 * ((255 - y) / 256) * ((255 - k) / 256);
  }
  return rgbRaster;
}
function fromYCbCr(yCbCrRaster) {
  const { width, height } = yCbCrRaster;
  const rgbRaster = new Uint8ClampedArray(width * height * 3);
  for (let i = 0, j = 0; i < yCbCrRaster.length; i += 3, j += 3) {
    const y = yCbCrRaster[i];
    const cb = yCbCrRaster[i + 1];
    const cr = yCbCrRaster[i + 2];
    rgbRaster[j] = y + 1.402 * (cr - 128);
    rgbRaster[j + 1] = y - 0.34414 * (cb - 128) - 0.71414 * (cr - 128);
    rgbRaster[j + 2] = y + 1.772 * (cb - 128);
  }
  return rgbRaster;
}
var Xn = 0.95047;
var Yn = 1;
var Zn = 1.08883;
function fromCIELab(cieLabRaster) {
  const { width, height } = cieLabRaster;
  const rgbRaster = new Uint8Array(width * height * 3);
  for (let i = 0, j = 0; i < cieLabRaster.length; i += 3, j += 3) {
    const L = cieLabRaster[i + 0];
    const a_ = cieLabRaster[i + 1] << 24 >> 24;
    const b_ = cieLabRaster[i + 2] << 24 >> 24;
    let y = (L + 16) / 116;
    let x = a_ / 500 + y;
    let z = y - b_ / 200;
    let r;
    let g;
    let b;
    x = Xn * (x * x * x > 8856e-6 ? x * x * x : (x - 16 / 116) / 7.787);
    y = Yn * (y * y * y > 8856e-6 ? y * y * y : (y - 16 / 116) / 7.787);
    z = Zn * (z * z * z > 8856e-6 ? z * z * z : (z - 16 / 116) / 7.787);
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;
    r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : 12.92 * r;
    g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : 12.92 * g;
    b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : 12.92 * b;
    rgbRaster[j] = Math.max(0, Math.min(1, r)) * 255;
    rgbRaster[j + 1] = Math.max(0, Math.min(1, g)) * 255;
    rgbRaster[j + 2] = Math.max(0, Math.min(1, b)) * 255;
  }
  return rgbRaster;
}

// node_modules/geotiff/dist-module/compression/index.js
var registry = /* @__PURE__ */ new Map();
function addDecoder(cases, importFn) {
  if (!Array.isArray(cases)) {
    cases = [cases];
  }
  cases.forEach((c) => registry.set(c, importFn));
}
async function getDecoder(fileDirectory) {
  const importFn = registry.get(fileDirectory.Compression);
  if (!importFn) {
    throw new Error(`Unknown compression method identifier: ${fileDirectory.Compression}`);
  }
  const Decoder = await importFn();
  return new Decoder(fileDirectory);
}
addDecoder([void 0, 1], () => Promise.resolve().then(() => (init_raw(), raw_exports)).then((m) => m.default));
addDecoder(5, () => Promise.resolve().then(() => (init_lzw(), lzw_exports)).then((m) => m.default));
addDecoder(6, () => {
  throw new Error("old style JPEG compression is not supported.");
});
addDecoder(7, () => Promise.resolve().then(() => (init_jpeg(), jpeg_exports)).then((m) => m.default));
addDecoder([8, 32946], () => Promise.resolve().then(() => (init_deflate(), deflate_exports)).then((m) => m.default));
addDecoder(32773, () => Promise.resolve().then(() => (init_packbits(), packbits_exports)).then((m) => m.default));
addDecoder(
  34887,
  () => Promise.resolve().then(() => (init_lerc(), lerc_exports)).then(async (m) => {
    await m.zstd.init();
    return m;
  }).then((m) => m.default)
);
addDecoder(50001, () => Promise.resolve().then(() => (init_webimage(), webimage_exports)).then((m) => m.default));

// node_modules/geotiff/dist-module/resample.js
function copyNewSize(array, width, height, samplesPerPixel = 1) {
  return new (Object.getPrototypeOf(array)).constructor(width * height * samplesPerPixel);
}
function resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const cy = Math.min(Math.round(relY * y), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const cx = Math.min(Math.round(relX * x), inWidth - 1);
        const value = array[cy * inWidth + cx];
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function lerp(v0, v1, t) {
  return (1 - t) * v0 + t * v1;
}
function resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  return valueArrays.map((array) => {
    const newArray = copyNewSize(array, outWidth, outHeight);
    for (let y = 0; y < outHeight; ++y) {
      const rawY = relY * y;
      const yl = Math.floor(rawY);
      const yh = Math.min(Math.ceil(rawY), inHeight - 1);
      for (let x = 0; x < outWidth; ++x) {
        const rawX = relX * x;
        const tx = rawX % 1;
        const xl = Math.floor(rawX);
        const xh = Math.min(Math.ceil(rawX), inWidth - 1);
        const ll = array[yl * inWidth + xl];
        const hl = array[yl * inWidth + xh];
        const lh = array[yh * inWidth + xl];
        const hh = array[yh * inWidth + xh];
        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1
        );
        newArray[y * outWidth + x] = value;
      }
    }
    return newArray;
  });
}
function resample(valueArrays, inWidth, inHeight, outWidth, outHeight, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearest(valueArrays, inWidth, inHeight, outWidth, outHeight);
    case "bilinear":
    case "linear":
      return resampleBilinear(valueArrays, inWidth, inHeight, outWidth, outHeight);
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}
function resampleNearestInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const cy = Math.min(Math.round(relY * y), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const cx = Math.min(Math.round(relX * x), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const value = valueArray[cy * inWidth * samples + cx * samples + i];
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleBilinearInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples) {
  const relX = inWidth / outWidth;
  const relY = inHeight / outHeight;
  const newArray = copyNewSize(valueArray, outWidth, outHeight, samples);
  for (let y = 0; y < outHeight; ++y) {
    const rawY = relY * y;
    const yl = Math.floor(rawY);
    const yh = Math.min(Math.ceil(rawY), inHeight - 1);
    for (let x = 0; x < outWidth; ++x) {
      const rawX = relX * x;
      const tx = rawX % 1;
      const xl = Math.floor(rawX);
      const xh = Math.min(Math.ceil(rawX), inWidth - 1);
      for (let i = 0; i < samples; ++i) {
        const ll = valueArray[yl * inWidth * samples + xl * samples + i];
        const hl = valueArray[yl * inWidth * samples + xh * samples + i];
        const lh = valueArray[yh * inWidth * samples + xl * samples + i];
        const hh = valueArray[yh * inWidth * samples + xh * samples + i];
        const value = lerp(
          lerp(ll, hl, tx),
          lerp(lh, hh, tx),
          rawY % 1
        );
        newArray[y * outWidth * samples + x * samples + i] = value;
      }
    }
  }
  return newArray;
}
function resampleInterleaved(valueArray, inWidth, inHeight, outWidth, outHeight, samples, method = "nearest") {
  switch (method.toLowerCase()) {
    case "nearest":
      return resampleNearestInterleaved(
        valueArray,
        inWidth,
        inHeight,
        outWidth,
        outHeight,
        samples
      );
    case "bilinear":
    case "linear":
      return resampleBilinearInterleaved(
        valueArray,
        inWidth,
        inHeight,
        outWidth,
        outHeight,
        samples
      );
    default:
      throw new Error(`Unsupported resampling method: '${method}'`);
  }
}

// node_modules/geotiff/dist-module/geotiffimage.js
function sum(array, start, end) {
  let s = 0;
  for (let i = start; i < end; ++i) {
    s += array[i];
  }
  return s;
}
function arrayForType(format, bitsPerSample, size) {
  switch (format) {
    case 1:
      if (bitsPerSample <= 8) {
        return new Uint8Array(size);
      } else if (bitsPerSample <= 16) {
        return new Uint16Array(size);
      } else if (bitsPerSample <= 32) {
        return new Uint32Array(size);
      }
      break;
    case 2:
      if (bitsPerSample === 8) {
        return new Int8Array(size);
      } else if (bitsPerSample === 16) {
        return new Int16Array(size);
      } else if (bitsPerSample === 32) {
        return new Int32Array(size);
      }
      break;
    case 3:
      switch (bitsPerSample) {
        case 16:
        case 32:
          return new Float32Array(size);
        case 64:
          return new Float64Array(size);
        default:
          break;
      }
      break;
    default:
      break;
  }
  throw Error("Unsupported data format/bitsPerSample");
}
function needsNormalization(format, bitsPerSample) {
  if ((format === 1 || format === 2) && bitsPerSample <= 32 && bitsPerSample % 8 === 0) {
    return false;
  } else if (format === 3 && (bitsPerSample === 16 || bitsPerSample === 32 || bitsPerSample === 64)) {
    return false;
  }
  return true;
}
function normalizeArray(inBuffer, format, planarConfiguration, samplesPerPixel, bitsPerSample, tileWidth, tileHeight) {
  const view = new DataView(inBuffer);
  const outSize = planarConfiguration === 2 ? tileHeight * tileWidth : tileHeight * tileWidth * samplesPerPixel;
  const samplesToTransfer = planarConfiguration === 2 ? 1 : samplesPerPixel;
  const outArray = arrayForType(format, bitsPerSample, outSize);
  const bitMask = parseInt("1".repeat(bitsPerSample), 2);
  if (format === 1) {
    let pixelBitSkip;
    if (planarConfiguration === 1) {
      pixelBitSkip = samplesPerPixel * bitsPerSample;
    } else {
      pixelBitSkip = bitsPerSample;
    }
    let bitsPerLine = tileWidth * pixelBitSkip;
    if ((bitsPerLine & 7) !== 0) {
      bitsPerLine = bitsPerLine + 7 & ~7;
    }
    for (let y = 0; y < tileHeight; ++y) {
      const lineBitOffset = y * bitsPerLine;
      for (let x = 0; x < tileWidth; ++x) {
        const pixelBitOffset = lineBitOffset + x * samplesToTransfer * bitsPerSample;
        for (let i = 0; i < samplesToTransfer; ++i) {
          const bitOffset = pixelBitOffset + i * bitsPerSample;
          const outIndex = (y * tileWidth + x) * samplesToTransfer + i;
          const byteOffset = Math.floor(bitOffset / 8);
          const innerBitOffset = bitOffset % 8;
          if (innerBitOffset + bitsPerSample <= 8) {
            outArray[outIndex] = view.getUint8(byteOffset) >> 8 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 16) {
            outArray[outIndex] = view.getUint16(byteOffset) >> 16 - bitsPerSample - innerBitOffset & bitMask;
          } else if (innerBitOffset + bitsPerSample <= 24) {
            const raw = view.getUint16(byteOffset) << 8 | view.getUint8(byteOffset + 2);
            outArray[outIndex] = raw >> 24 - bitsPerSample - innerBitOffset & bitMask;
          } else {
            outArray[outIndex] = view.getUint32(byteOffset) >> 32 - bitsPerSample - innerBitOffset & bitMask;
          }
        }
      }
    }
  } else if (format === 3) {
  }
  return outArray.buffer;
}
var GeoTIFFImage = class {
  /**
   * @constructor
   * @param {Object} fileDirectory The parsed file directory
   * @param {Object} geoKeys The parsed geo-keys
   * @param {DataView} dataView The DataView for the underlying file.
   * @param {Boolean} littleEndian Whether the file is encoded in little or big endian
   * @param {Boolean} cache Whether or not decoded tiles shall be cached
   * @param {import('./source/basesource').BaseSource} source The datasource to read from
   */
  constructor(fileDirectory, geoKeys2, dataView, littleEndian, cache, source) {
    this.fileDirectory = fileDirectory;
    this.geoKeys = geoKeys2;
    this.dataView = dataView;
    this.littleEndian = littleEndian;
    this.tiles = cache ? {} : null;
    this.isTiled = !fileDirectory.StripOffsets;
    const planarConfiguration = fileDirectory.PlanarConfiguration;
    this.planarConfiguration = typeof planarConfiguration === "undefined" ? 1 : planarConfiguration;
    if (this.planarConfiguration !== 1 && this.planarConfiguration !== 2) {
      throw new Error("Invalid planar configuration.");
    }
    this.source = source;
  }
  /**
   * Returns the associated parsed file directory.
   * @returns {Object} the parsed file directory
   */
  getFileDirectory() {
    return this.fileDirectory;
  }
  /**
   * Returns the associated parsed geo keys.
   * @returns {Object} the parsed geo keys
   */
  getGeoKeys() {
    return this.geoKeys;
  }
  /**
   * Returns the width of the image.
   * @returns {Number} the width of the image
   */
  getWidth() {
    return this.fileDirectory.ImageWidth;
  }
  /**
   * Returns the height of the image.
   * @returns {Number} the height of the image
   */
  getHeight() {
    return this.fileDirectory.ImageLength;
  }
  /**
   * Returns the number of samples per pixel.
   * @returns {Number} the number of samples per pixel
   */
  getSamplesPerPixel() {
    return typeof this.fileDirectory.SamplesPerPixel !== "undefined" ? this.fileDirectory.SamplesPerPixel : 1;
  }
  /**
   * Returns the width of each tile.
   * @returns {Number} the width of each tile
   */
  getTileWidth() {
    return this.isTiled ? this.fileDirectory.TileWidth : this.getWidth();
  }
  /**
   * Returns the height of each tile.
   * @returns {Number} the height of each tile
   */
  getTileHeight() {
    if (this.isTiled) {
      return this.fileDirectory.TileLength;
    }
    if (typeof this.fileDirectory.RowsPerStrip !== "undefined") {
      return Math.min(this.fileDirectory.RowsPerStrip, this.getHeight());
    }
    return this.getHeight();
  }
  getBlockWidth() {
    return this.getTileWidth();
  }
  getBlockHeight(y) {
    if (this.isTiled || (y + 1) * this.getTileHeight() <= this.getHeight()) {
      return this.getTileHeight();
    } else {
      return this.getHeight() - y * this.getTileHeight();
    }
  }
  /**
   * Calculates the number of bytes for each pixel across all samples. Only full
   * bytes are supported, an exception is thrown when this is not the case.
   * @returns {Number} the bytes per pixel
   */
  getBytesPerPixel() {
    let bytes = 0;
    for (let i = 0; i < this.fileDirectory.BitsPerSample.length; ++i) {
      bytes += this.getSampleByteSize(i);
    }
    return bytes;
  }
  getSampleByteSize(i) {
    if (i >= this.fileDirectory.BitsPerSample.length) {
      throw new RangeError(`Sample index ${i} is out of range.`);
    }
    return Math.ceil(this.fileDirectory.BitsPerSample[i] / 8);
  }
  getReaderForSample(sampleIndex) {
    const format = this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
    const bitsPerSample = this.fileDirectory.BitsPerSample[sampleIndex];
    switch (format) {
      case 1:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getUint8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getUint16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getUint32;
        }
        break;
      case 2:
        if (bitsPerSample <= 8) {
          return DataView.prototype.getInt8;
        } else if (bitsPerSample <= 16) {
          return DataView.prototype.getInt16;
        } else if (bitsPerSample <= 32) {
          return DataView.prototype.getInt32;
        }
        break;
      case 3:
        switch (bitsPerSample) {
          case 16:
            return function(offset, littleEndian) {
              return getFloat16(this, offset, littleEndian);
            };
          case 32:
            return DataView.prototype.getFloat32;
          case 64:
            return DataView.prototype.getFloat64;
          default:
            break;
        }
        break;
      default:
        break;
    }
    throw Error("Unsupported data format/bitsPerSample");
  }
  getSampleFormat(sampleIndex = 0) {
    return this.fileDirectory.SampleFormat ? this.fileDirectory.SampleFormat[sampleIndex] : 1;
  }
  getBitsPerSample(sampleIndex = 0) {
    return this.fileDirectory.BitsPerSample[sampleIndex];
  }
  getArrayForSample(sampleIndex, size) {
    const format = this.getSampleFormat(sampleIndex);
    const bitsPerSample = this.getBitsPerSample(sampleIndex);
    return arrayForType(format, bitsPerSample, size);
  }
  /**
   * Returns the decoded strip or tile.
   * @param {Number} x the strip or tile x-offset
   * @param {Number} y the tile y-offset (0 for stripped images)
   * @param {Number} sample the sample to get for separated samples
   * @param {import("./geotiff").Pool|import("./geotiff").BaseDecoder} poolOrDecoder the decoder or decoder pool
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise.<ArrayBuffer>}
   */
  async getTileOrStrip(x, y, sample, poolOrDecoder, signal) {
    const numTilesPerRow = Math.ceil(this.getWidth() / this.getTileWidth());
    const numTilesPerCol = Math.ceil(this.getHeight() / this.getTileHeight());
    let index;
    const { tiles } = this;
    if (this.planarConfiguration === 1) {
      index = y * numTilesPerRow + x;
    } else if (this.planarConfiguration === 2) {
      index = sample * numTilesPerRow * numTilesPerCol + y * numTilesPerRow + x;
    }
    let offset;
    let byteCount;
    if (this.isTiled) {
      offset = this.fileDirectory.TileOffsets[index];
      byteCount = this.fileDirectory.TileByteCounts[index];
    } else {
      offset = this.fileDirectory.StripOffsets[index];
      byteCount = this.fileDirectory.StripByteCounts[index];
    }
    const slice = (await this.source.fetch([{ offset, length: byteCount }], signal))[0];
    let request;
    if (tiles === null || !tiles[index]) {
      request = (async () => {
        let data = await poolOrDecoder.decode(this.fileDirectory, slice);
        const sampleFormat = this.getSampleFormat();
        const bitsPerSample = this.getBitsPerSample();
        if (needsNormalization(sampleFormat, bitsPerSample)) {
          data = normalizeArray(
            data,
            sampleFormat,
            this.planarConfiguration,
            this.getSamplesPerPixel(),
            bitsPerSample,
            this.getTileWidth(),
            this.getBlockHeight(y)
          );
        }
        return data;
      })();
      if (tiles !== null) {
        tiles[index] = request;
      }
    } else {
      request = tiles[index];
    }
    return { x, y, sample, data: await request };
  }
  /**
   * Internal read function.
   * @private
   * @param {Array} imageWindow The image window in pixel coordinates
   * @param {Array} samples The selected samples (0-based indices)
   * @param {TypedArray|TypedArray[]} valueArrays The array(s) to write into
   * @param {Boolean} interleave Whether or not to write in an interleaved manner
   * @param {import("./geotiff").Pool|AbstractDecoder} poolOrDecoder the decoder or decoder pool
   * @param {number} width the width of window to be read into
   * @param {number} height the height of window to be read into
   * @param {number} resampleMethod the resampling method to be used when interpolating
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   * @returns {Promise<ReadRasterResult>}
   */
  async _readRaster(imageWindow, samples, valueArrays, interleave, poolOrDecoder, width, height, resampleMethod, signal) {
    const tileWidth = this.getTileWidth();
    const tileHeight = this.getTileHeight();
    const imageWidth = this.getWidth();
    const imageHeight = this.getHeight();
    const minXTile = Math.max(Math.floor(imageWindow[0] / tileWidth), 0);
    const maxXTile = Math.min(
      Math.ceil(imageWindow[2] / tileWidth),
      Math.ceil(imageWidth / tileWidth)
    );
    const minYTile = Math.max(Math.floor(imageWindow[1] / tileHeight), 0);
    const maxYTile = Math.min(
      Math.ceil(imageWindow[3] / tileHeight),
      Math.ceil(imageHeight / tileHeight)
    );
    const windowWidth = imageWindow[2] - imageWindow[0];
    let bytesPerPixel = this.getBytesPerPixel();
    const srcSampleOffsets = [];
    const sampleReaders = [];
    for (let i = 0; i < samples.length; ++i) {
      if (this.planarConfiguration === 1) {
        srcSampleOffsets.push(sum(this.fileDirectory.BitsPerSample, 0, samples[i]) / 8);
      } else {
        srcSampleOffsets.push(0);
      }
      sampleReaders.push(this.getReaderForSample(samples[i]));
    }
    const promises = [];
    const { littleEndian } = this;
    for (let yTile = minYTile; yTile < maxYTile; ++yTile) {
      for (let xTile = minXTile; xTile < maxXTile; ++xTile) {
        let getPromise;
        if (this.planarConfiguration === 1) {
          getPromise = this.getTileOrStrip(xTile, yTile, 0, poolOrDecoder, signal);
        }
        for (let sampleIndex = 0; sampleIndex < samples.length; ++sampleIndex) {
          const si = sampleIndex;
          const sample = samples[sampleIndex];
          if (this.planarConfiguration === 2) {
            bytesPerPixel = this.getSampleByteSize(sample);
            getPromise = this.getTileOrStrip(xTile, yTile, sample, poolOrDecoder, signal);
          }
          const promise = getPromise.then((tile) => {
            const buffer2 = tile.data;
            const dataView = new DataView(buffer2);
            const blockHeight = this.getBlockHeight(tile.y);
            const firstLine = tile.y * tileHeight;
            const firstCol = tile.x * tileWidth;
            const lastLine = firstLine + blockHeight;
            const lastCol = (tile.x + 1) * tileWidth;
            const reader = sampleReaders[si];
            const ymax = Math.min(blockHeight, blockHeight - (lastLine - imageWindow[3]), imageHeight - firstLine);
            const xmax = Math.min(tileWidth, tileWidth - (lastCol - imageWindow[2]), imageWidth - firstCol);
            for (let y = Math.max(0, imageWindow[1] - firstLine); y < ymax; ++y) {
              for (let x = Math.max(0, imageWindow[0] - firstCol); x < xmax; ++x) {
                const pixelOffset = (y * tileWidth + x) * bytesPerPixel;
                const value = reader.call(
                  dataView,
                  pixelOffset + srcSampleOffsets[si],
                  littleEndian
                );
                let windowCoordinate;
                if (interleave) {
                  windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth * samples.length + (x + firstCol - imageWindow[0]) * samples.length + si;
                  valueArrays[windowCoordinate] = value;
                } else {
                  windowCoordinate = (y + firstLine - imageWindow[1]) * windowWidth + x + firstCol - imageWindow[0];
                  valueArrays[si][windowCoordinate] = value;
                }
              }
            }
          });
          promises.push(promise);
        }
      }
    }
    await Promise.all(promises);
    if (width && imageWindow[2] - imageWindow[0] !== width || height && imageWindow[3] - imageWindow[1] !== height) {
      let resampled;
      if (interleave) {
        resampled = resampleInterleaved(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width,
          height,
          samples.length,
          resampleMethod
        );
      } else {
        resampled = resample(
          valueArrays,
          imageWindow[2] - imageWindow[0],
          imageWindow[3] - imageWindow[1],
          width,
          height,
          resampleMethod
        );
      }
      resampled.width = width;
      resampled.height = height;
      return resampled;
    }
    valueArrays.width = width || imageWindow[2] - imageWindow[0];
    valueArrays.height = height || imageWindow[3] - imageWindow[1];
    return valueArrays;
  }
  /**
   * Reads raster data from the image. This function reads all selected samples
   * into separate arrays of the correct type for that sample or into a single
   * combined array when `interleave` is set. When provided, only a subset
   * of the raster is read for each sample.
   *
   * @param {ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded arrays as a promise
   */
  async readRasters({
    window: wnd,
    samples = [],
    interleave,
    pool = null,
    width,
    height,
    resampleMethod,
    fillValue,
    signal
  } = {}) {
    const imageWindow = wnd || [0, 0, this.getWidth(), this.getHeight()];
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error("Invalid subsets");
    }
    const imageWindowWidth = imageWindow[2] - imageWindow[0];
    const imageWindowHeight = imageWindow[3] - imageWindow[1];
    const numPixels = imageWindowWidth * imageWindowHeight;
    const samplesPerPixel = this.getSamplesPerPixel();
    if (!samples || !samples.length) {
      for (let i = 0; i < samplesPerPixel; ++i) {
        samples.push(i);
      }
    } else {
      for (let i = 0; i < samples.length; ++i) {
        if (samples[i] >= samplesPerPixel) {
          return Promise.reject(new RangeError(`Invalid sample index '${samples[i]}'.`));
        }
      }
    }
    let valueArrays;
    if (interleave) {
      const format = this.fileDirectory.SampleFormat ? Math.max.apply(null, this.fileDirectory.SampleFormat) : 1;
      const bitsPerSample = Math.max.apply(null, this.fileDirectory.BitsPerSample);
      valueArrays = arrayForType(format, bitsPerSample, numPixels * samples.length);
      if (fillValue) {
        valueArrays.fill(fillValue);
      }
    } else {
      valueArrays = [];
      for (let i = 0; i < samples.length; ++i) {
        const valueArray = this.getArrayForSample(samples[i], numPixels);
        if (Array.isArray(fillValue) && i < fillValue.length) {
          valueArray.fill(fillValue[i]);
        } else if (fillValue && !Array.isArray(fillValue)) {
          valueArray.fill(fillValue);
        }
        valueArrays.push(valueArray);
      }
    }
    const poolOrDecoder = pool || await getDecoder(this.fileDirectory);
    const result = await this._readRaster(
      imageWindow,
      samples,
      valueArrays,
      interleave,
      poolOrDecoder,
      width,
      height,
      resampleMethod,
      signal
    );
    return result;
  }
  /**
   * Reads raster data from the image as RGB. The result is always an
   * interleaved typed array.
   * Colorspaces other than RGB will be transformed to RGB, color maps expanded.
   * When no other method is applicable, the first sample is used to produce a
   * grayscale image.
   * When provided, only a subset of the raster is read for each sample.
   *
   * @param {Object} [options] optional parameters
   * @param {Array<number>} [options.window] the subset to read data from in pixels.
   * @param {boolean} [options.interleave=true] whether the data shall be read
   *                                             in one single array or separate
   *                                             arrays.
   * @param {import("./geotiff").Pool} [options.pool=null] The optional decoder pool to use.
   * @param {number} [options.width] The desired width of the output. When the width is no the
   *                                 same as the images, resampling will be performed.
   * @param {number} [options.height] The desired height of the output. When the width is no the
   *                                  same as the images, resampling will be performed.
   * @param {string} [options.resampleMethod='nearest'] The desired resampling method.
   * @param {boolean} [options.enableAlpha=false] Enable reading alpha channel if present.
   * @param {AbortSignal} [options.signal] An AbortSignal that may be signalled if the request is
   *                                       to be aborted
   * @returns {Promise<ReadRasterResult>} the RGB array as a Promise
   */
  async readRGB({
    window,
    interleave = true,
    pool = null,
    width,
    height,
    resampleMethod,
    enableAlpha = false,
    signal
  } = {}) {
    const imageWindow = window || [0, 0, this.getWidth(), this.getHeight()];
    if (imageWindow[0] > imageWindow[2] || imageWindow[1] > imageWindow[3]) {
      throw new Error("Invalid subsets");
    }
    const pi = this.fileDirectory.PhotometricInterpretation;
    if (pi === photometricInterpretations.RGB) {
      let s = [0, 1, 2];
      if (!(this.fileDirectory.ExtraSamples === ExtraSamplesValues.Unspecified) && enableAlpha) {
        s = [];
        for (let i = 0; i < this.fileDirectory.BitsPerSample.length; i += 1) {
          s.push(i);
        }
      }
      return this.readRasters({
        window,
        interleave,
        samples: s,
        pool,
        width,
        height,
        resampleMethod,
        signal
      });
    }
    let samples;
    switch (pi) {
      case photometricInterpretations.WhiteIsZero:
      case photometricInterpretations.BlackIsZero:
      case photometricInterpretations.Palette:
        samples = [0];
        break;
      case photometricInterpretations.CMYK:
        samples = [0, 1, 2, 3];
        break;
      case photometricInterpretations.YCbCr:
      case photometricInterpretations.CIELab:
        samples = [0, 1, 2];
        break;
      default:
        throw new Error("Invalid or unsupported photometric interpretation.");
    }
    const subOptions = {
      window: imageWindow,
      interleave: true,
      samples,
      pool,
      width,
      height,
      resampleMethod,
      signal
    };
    const { fileDirectory } = this;
    const raster = await this.readRasters(subOptions);
    const max = 2 ** this.fileDirectory.BitsPerSample[0];
    let data;
    switch (pi) {
      case photometricInterpretations.WhiteIsZero:
        data = fromWhiteIsZero(raster, max);
        break;
      case photometricInterpretations.BlackIsZero:
        data = fromBlackIsZero(raster, max);
        break;
      case photometricInterpretations.Palette:
        data = fromPalette(raster, fileDirectory.ColorMap);
        break;
      case photometricInterpretations.CMYK:
        data = fromCMYK(raster);
        break;
      case photometricInterpretations.YCbCr:
        data = fromYCbCr(raster);
        break;
      case photometricInterpretations.CIELab:
        data = fromCIELab(raster);
        break;
      default:
        throw new Error("Unsupported photometric interpretation.");
    }
    if (!interleave) {
      const red = new Uint8Array(data.length / 3);
      const green = new Uint8Array(data.length / 3);
      const blue = new Uint8Array(data.length / 3);
      for (let i = 0, j = 0; i < data.length; i += 3, ++j) {
        red[j] = data[i];
        green[j] = data[i + 1];
        blue[j] = data[i + 2];
      }
      data = [red, green, blue];
    }
    data.width = raster.width;
    data.height = raster.height;
    return data;
  }
  /**
   * Returns an array of tiepoints.
   * @returns {Object[]}
   */
  getTiePoints() {
    if (!this.fileDirectory.ModelTiepoint) {
      return [];
    }
    const tiePoints = [];
    for (let i = 0; i < this.fileDirectory.ModelTiepoint.length; i += 6) {
      tiePoints.push({
        i: this.fileDirectory.ModelTiepoint[i],
        j: this.fileDirectory.ModelTiepoint[i + 1],
        k: this.fileDirectory.ModelTiepoint[i + 2],
        x: this.fileDirectory.ModelTiepoint[i + 3],
        y: this.fileDirectory.ModelTiepoint[i + 4],
        z: this.fileDirectory.ModelTiepoint[i + 5]
      });
    }
    return tiePoints;
  }
  /**
   * Returns the parsed GDAL metadata items.
   *
   * If sample is passed to null, dataset-level metadata will be returned.
   * Otherwise only metadata specific to the provided sample will be returned.
   *
   * @param {number} [sample=null] The sample index.
   * @returns {Object}
   */
  getGDALMetadata(sample = null) {
    const metadata = {};
    if (!this.fileDirectory.GDAL_METADATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_METADATA;
    let items = (0, import_find_tags_by_name.default)(string, "Item");
    if (sample === null) {
      items = items.filter((item) => (0, import_get_attribute.default)(item, "sample") === void 0);
    } else {
      items = items.filter((item) => Number((0, import_get_attribute.default)(item, "sample")) === sample);
    }
    for (let i = 0; i < items.length; ++i) {
      const item = items[i];
      metadata[(0, import_get_attribute.default)(item, "name")] = item.inner;
    }
    return metadata;
  }
  /**
   * Returns the GDAL nodata value
   * @returns {number|null}
   */
  getGDALNoData() {
    if (!this.fileDirectory.GDAL_NODATA) {
      return null;
    }
    const string = this.fileDirectory.GDAL_NODATA;
    return Number(string.substring(0, string.length - 1));
  }
  /**
   * Returns the image origin as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @returns {Array<number>} The origin as a vector
   */
  getOrigin() {
    const tiePoints = this.fileDirectory.ModelTiepoint;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (tiePoints && tiePoints.length === 6) {
      return [
        tiePoints[3],
        tiePoints[4],
        tiePoints[5]
      ];
    }
    if (modelTransformation) {
      return [
        modelTransformation[3],
        modelTransformation[7],
        modelTransformation[11]
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns the image resolution as a XYZ-vector. When the image has no affine
   * transformation, then an exception is thrown.
   * @param {GeoTIFFImage} [referenceImage=null] A reference image to calculate the resolution from
   *                                             in cases when the current image does not have the
   *                                             required tags on its own.
   * @returns {Array<number>} The resolution as a vector
   */
  getResolution(referenceImage = null) {
    const modelPixelScale = this.fileDirectory.ModelPixelScale;
    const modelTransformation = this.fileDirectory.ModelTransformation;
    if (modelPixelScale) {
      return [
        modelPixelScale[0],
        -modelPixelScale[1],
        modelPixelScale[2]
      ];
    }
    if (modelTransformation) {
      if (modelTransformation[1] === 0 && modelTransformation[4] === 0) {
        return [
          modelTransformation[0],
          -modelTransformation[5],
          modelTransformation[10]
        ];
      }
      return [
        Math.sqrt(modelTransformation[0] * modelTransformation[0] + modelTransformation[4] * modelTransformation[4]),
        -Math.sqrt(modelTransformation[1] * modelTransformation[1] + modelTransformation[5] * modelTransformation[5]),
        modelTransformation[10]
      ];
    }
    if (referenceImage) {
      const [refResX, refResY, refResZ] = referenceImage.getResolution();
      return [
        refResX * referenceImage.getWidth() / this.getWidth(),
        refResY * referenceImage.getHeight() / this.getHeight(),
        refResZ * referenceImage.getWidth() / this.getWidth()
      ];
    }
    throw new Error("The image does not have an affine transformation.");
  }
  /**
   * Returns whether or not the pixels of the image depict an area (or point).
   * @returns {Boolean} Whether the pixels are a point
   */
  pixelIsArea() {
    return this.geoKeys.GTRasterTypeGeoKey === 1;
  }
  /**
   * Returns the image bounding box as an array of 4 values: min-x, min-y,
   * max-x and max-y. When the image has no affine transformation, then an
   * exception is thrown.
   * @param {boolean} [tilegrid=false] If true return extent for a tilegrid
   *                                   without adjustment for ModelTransformation.
   * @returns {Array<number>} The bounding box
   */
  getBoundingBox(tilegrid = false) {
    const height = this.getHeight();
    const width = this.getWidth();
    if (this.fileDirectory.ModelTransformation && !tilegrid) {
      const [a, b, c, d, e, f, g, h] = this.fileDirectory.ModelTransformation;
      const corners = [
        [0, 0],
        [0, height],
        [width, 0],
        [width, height]
      ];
      const projected = corners.map(([I, J]) => [
        d + a * I + b * J,
        h + e * I + f * J
      ]);
      const xs = projected.map((pt) => pt[0]);
      const ys = projected.map((pt) => pt[1]);
      return [
        Math.min(...xs),
        Math.min(...ys),
        Math.max(...xs),
        Math.max(...ys)
      ];
    } else {
      const origin = this.getOrigin();
      const resolution = this.getResolution();
      const x1 = origin[0];
      const y1 = origin[1];
      const x2 = x1 + resolution[0] * width;
      const y2 = y1 + resolution[1] * height;
      return [
        Math.min(x1, x2),
        Math.min(y1, y2),
        Math.max(x1, x2),
        Math.max(y1, y2)
      ];
    }
  }
};
var geotiffimage_default = GeoTIFFImage;

// node_modules/geotiff/dist-module/dataview64.js
var DataView64 = class {
  constructor(arrayBuffer) {
    this._dataView = new DataView(arrayBuffer);
  }
  get buffer() {
    return this._dataView.buffer;
  }
  getUint64(offset, littleEndian) {
    const left = this.getUint32(offset, littleEndian);
    const right = this.getUint32(offset + 4, littleEndian);
    let combined;
    if (littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  getInt64(offset, littleEndian) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte2 = this._dataView.getUint8(offset + (littleEndian ? i : 7 - i));
      if (isNegative) {
        if (carrying) {
          if (byte2 !== 0) {
            byte2 = ~(byte2 - 1) & 255;
            carrying = false;
          }
        } else {
          byte2 = ~byte2 & 255;
        }
      }
      value += byte2 * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  getUint8(offset, littleEndian) {
    return this._dataView.getUint8(offset, littleEndian);
  }
  getInt8(offset, littleEndian) {
    return this._dataView.getInt8(offset, littleEndian);
  }
  getUint16(offset, littleEndian) {
    return this._dataView.getUint16(offset, littleEndian);
  }
  getInt16(offset, littleEndian) {
    return this._dataView.getInt16(offset, littleEndian);
  }
  getUint32(offset, littleEndian) {
    return this._dataView.getUint32(offset, littleEndian);
  }
  getInt32(offset, littleEndian) {
    return this._dataView.getInt32(offset, littleEndian);
  }
  getFloat16(offset, littleEndian) {
    return getFloat16(this._dataView, offset, littleEndian);
  }
  getFloat32(offset, littleEndian) {
    return this._dataView.getFloat32(offset, littleEndian);
  }
  getFloat64(offset, littleEndian) {
    return this._dataView.getFloat64(offset, littleEndian);
  }
};

// node_modules/geotiff/dist-module/dataslice.js
var DataSlice = class {
  constructor(arrayBuffer, sliceOffset, littleEndian, bigTiff) {
    this._dataView = new DataView(arrayBuffer);
    this._sliceOffset = sliceOffset;
    this._littleEndian = littleEndian;
    this._bigTiff = bigTiff;
  }
  get sliceOffset() {
    return this._sliceOffset;
  }
  get sliceTop() {
    return this._sliceOffset + this.buffer.byteLength;
  }
  get littleEndian() {
    return this._littleEndian;
  }
  get bigTiff() {
    return this._bigTiff;
  }
  get buffer() {
    return this._dataView.buffer;
  }
  covers(offset, length) {
    return this.sliceOffset <= offset && this.sliceTop >= offset + length;
  }
  readUint8(offset) {
    return this._dataView.getUint8(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt8(offset) {
    return this._dataView.getInt8(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint16(offset) {
    return this._dataView.getUint16(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt16(offset) {
    return this._dataView.getInt16(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint32(offset) {
    return this._dataView.getUint32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readInt32(offset) {
    return this._dataView.getInt32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat32(offset) {
    return this._dataView.getFloat32(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readFloat64(offset) {
    return this._dataView.getFloat64(
      offset - this._sliceOffset,
      this._littleEndian
    );
  }
  readUint64(offset) {
    const left = this.readUint32(offset);
    const right = this.readUint32(offset + 4);
    let combined;
    if (this._littleEndian) {
      combined = left + 2 ** 32 * right;
      if (!Number.isSafeInteger(combined)) {
        throw new Error(
          `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
        );
      }
      return combined;
    }
    combined = 2 ** 32 * left + right;
    if (!Number.isSafeInteger(combined)) {
      throw new Error(
        `${combined} exceeds MAX_SAFE_INTEGER. Precision may be lost. Please report if you get this message to https://github.com/geotiffjs/geotiff.js/issues`
      );
    }
    return combined;
  }
  // adapted from https://stackoverflow.com/a/55338384/8060591
  readInt64(offset) {
    let value = 0;
    const isNegative = (this._dataView.getUint8(offset + (this._littleEndian ? 7 : 0)) & 128) > 0;
    let carrying = true;
    for (let i = 0; i < 8; i++) {
      let byte2 = this._dataView.getUint8(
        offset + (this._littleEndian ? i : 7 - i)
      );
      if (isNegative) {
        if (carrying) {
          if (byte2 !== 0) {
            byte2 = ~(byte2 - 1) & 255;
            carrying = false;
          }
        } else {
          byte2 = ~byte2 & 255;
        }
      }
      value += byte2 * 256 ** i;
    }
    if (isNegative) {
      value = -value;
    }
    return value;
  }
  readOffset(offset) {
    if (this._bigTiff) {
      return this.readUint64(offset);
    }
    return this.readUint32(offset);
  }
};

// node_modules/geotiff/dist-module/source/basesource.js
var BaseSource = class {
  /**
   *
   * @param {Slice[]} slices
   * @returns {ArrayBuffer[]}
   */
  async fetch(slices, signal = void 0) {
    return Promise.all(
      slices.map((slice) => this.fetchSlice(slice, signal))
    );
  }
  /**
   *
   * @param {Slice} slice
   * @returns {ArrayBuffer}
   */
  async fetchSlice(slice) {
    throw new Error(`fetching of slice ${slice} not possible, not implemented`);
  }
  /**
   * Returns the filesize if already determined and null otherwise
   */
  get fileSize() {
    return null;
  }
  async close() {
  }
};

// node_modules/geotiff/dist-module/utils.js
var AbortError = class _AbortError extends Error {
  constructor(params) {
    super(params);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, _AbortError);
    }
    this.name = "AbortError";
  }
};

// node_modules/geotiff/dist-module/source/arraybuffer.js
var ArrayBufferSource = class extends BaseSource {
  constructor(arrayBuffer) {
    super();
    this.arrayBuffer = arrayBuffer;
  }
  fetchSlice(slice, signal) {
    if (signal && signal.aborted) {
      throw new AbortError("Request aborted");
    }
    return this.arrayBuffer.slice(slice.offset, slice.offset + slice.length);
  }
};
function makeBufferSource(arrayBuffer) {
  return new ArrayBufferSource(arrayBuffer);
}

// node_modules/geotiff/dist-module/geotiff.js
init_globals();
function getFieldTypeLength(fieldType) {
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.SBYTE:
    case fieldTypes.UNDEFINED:
      return 1;
    case fieldTypes.SHORT:
    case fieldTypes.SSHORT:
      return 2;
    case fieldTypes.LONG:
    case fieldTypes.SLONG:
    case fieldTypes.FLOAT:
    case fieldTypes.IFD:
      return 4;
    case fieldTypes.RATIONAL:
    case fieldTypes.SRATIONAL:
    case fieldTypes.DOUBLE:
    case fieldTypes.LONG8:
    case fieldTypes.SLONG8:
    case fieldTypes.IFD8:
      return 8;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
}
function parseGeoKeyDirectory(fileDirectory) {
  const rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;
  if (!rawGeoKeyDirectory) {
    return null;
  }
  const geoKeyDirectory = {};
  for (let i = 4; i <= rawGeoKeyDirectory[3] * 4; i += 4) {
    const key = geoKeyNames[rawGeoKeyDirectory[i]];
    const location = rawGeoKeyDirectory[i + 1] ? fieldTagNames[rawGeoKeyDirectory[i + 1]] : null;
    const count = rawGeoKeyDirectory[i + 2];
    const offset = rawGeoKeyDirectory[i + 3];
    let value = null;
    if (!location) {
      value = offset;
    } else {
      value = fileDirectory[location];
      if (typeof value === "undefined" || value === null) {
        throw new Error(`Could not get value of geoKey '${key}'.`);
      } else if (typeof value === "string") {
        value = value.substring(offset, offset + count - 1);
      } else if (value.subarray) {
        value = value.subarray(offset, offset + count);
        if (count === 1) {
          value = value[0];
        }
      }
    }
    geoKeyDirectory[key] = value;
  }
  return geoKeyDirectory;
}
function getValues(dataSlice, fieldType, count, offset) {
  let values2 = null;
  let readMethod = null;
  const fieldTypeLength = getFieldTypeLength(fieldType);
  switch (fieldType) {
    case fieldTypes.BYTE:
    case fieldTypes.ASCII:
    case fieldTypes.UNDEFINED:
      values2 = new Uint8Array(count);
      readMethod = dataSlice.readUint8;
      break;
    case fieldTypes.SBYTE:
      values2 = new Int8Array(count);
      readMethod = dataSlice.readInt8;
      break;
    case fieldTypes.SHORT:
      values2 = new Uint16Array(count);
      readMethod = dataSlice.readUint16;
      break;
    case fieldTypes.SSHORT:
      values2 = new Int16Array(count);
      readMethod = dataSlice.readInt16;
      break;
    case fieldTypes.LONG:
    case fieldTypes.IFD:
      values2 = new Uint32Array(count);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SLONG:
      values2 = new Int32Array(count);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.LONG8:
    case fieldTypes.IFD8:
      values2 = new Array(count);
      readMethod = dataSlice.readUint64;
      break;
    case fieldTypes.SLONG8:
      values2 = new Array(count);
      readMethod = dataSlice.readInt64;
      break;
    case fieldTypes.RATIONAL:
      values2 = new Uint32Array(count * 2);
      readMethod = dataSlice.readUint32;
      break;
    case fieldTypes.SRATIONAL:
      values2 = new Int32Array(count * 2);
      readMethod = dataSlice.readInt32;
      break;
    case fieldTypes.FLOAT:
      values2 = new Float32Array(count);
      readMethod = dataSlice.readFloat32;
      break;
    case fieldTypes.DOUBLE:
      values2 = new Float64Array(count);
      readMethod = dataSlice.readFloat64;
      break;
    default:
      throw new RangeError(`Invalid field type: ${fieldType}`);
  }
  if (!(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
    for (let i = 0; i < count; ++i) {
      values2[i] = readMethod.call(
        dataSlice,
        offset + i * fieldTypeLength
      );
    }
  } else {
    for (let i = 0; i < count; i += 2) {
      values2[i] = readMethod.call(
        dataSlice,
        offset + i * fieldTypeLength
      );
      values2[i + 1] = readMethod.call(
        dataSlice,
        offset + (i * fieldTypeLength + 4)
      );
    }
  }
  if (fieldType === fieldTypes.ASCII) {
    return new TextDecoder("utf-8").decode(values2);
  }
  return values2;
}
var ImageFileDirectory = class {
  constructor(fileDirectory, geoKeyDirectory, nextIFDByteOffset) {
    this.fileDirectory = fileDirectory;
    this.geoKeyDirectory = geoKeyDirectory;
    this.nextIFDByteOffset = nextIFDByteOffset;
  }
};
var GeoTIFFImageIndexError = class extends Error {
  constructor(index) {
    super(`No image at index ${index}`);
    this.index = index;
  }
};
var GeoTIFFBase = class {
  /**
   * (experimental) Reads raster data from the best fitting image. This function uses
   * the image with the lowest resolution that is still a higher resolution than the
   * requested resolution.
   * When specified, the `bbox` option is translated to the `window` option and the
   * `resX` and `resY` to `width` and `height` respectively.
   * Then, the [readRasters]{@link GeoTIFFImage#readRasters} method of the selected
   * image is called and the result returned.
   * @see GeoTIFFImage.readRasters
   * @param {import('./geotiffimage').ReadRasterOptions} [options={}] optional parameters
   * @returns {Promise<ReadRasterResult>} the decoded array(s), with `height` and `width`, as a promise
   */
  async readRasters(options = {}) {
    const { window: imageWindow, width, height } = options;
    let { resX, resY, bbox } = options;
    const firstImage = await this.getImage();
    let usedImage = firstImage;
    const imageCount = await this.getImageCount();
    const imgBBox = firstImage.getBoundingBox();
    if (imageWindow && bbox) {
      throw new Error('Both "bbox" and "window" passed.');
    }
    if (width || height) {
      if (imageWindow) {
        const [oX, oY] = firstImage.getOrigin();
        const [rX, rY] = firstImage.getResolution();
        bbox = [
          oX + imageWindow[0] * rX,
          oY + imageWindow[1] * rY,
          oX + imageWindow[2] * rX,
          oY + imageWindow[3] * rY
        ];
      }
      const usedBBox = bbox || imgBBox;
      if (width) {
        if (resX) {
          throw new Error("Both width and resX passed");
        }
        resX = (usedBBox[2] - usedBBox[0]) / width;
      }
      if (height) {
        if (resY) {
          throw new Error("Both width and resY passed");
        }
        resY = (usedBBox[3] - usedBBox[1]) / height;
      }
    }
    if (resX || resY) {
      const allImages = [];
      for (let i = 0; i < imageCount; ++i) {
        const image = await this.getImage(i);
        const { SubfileType: subfileType, NewSubfileType: newSubfileType } = image.fileDirectory;
        if (i === 0 || subfileType === 2 || newSubfileType & 1) {
          allImages.push(image);
        }
      }
      allImages.sort((a, b) => a.getWidth() - b.getWidth());
      for (let i = 0; i < allImages.length; ++i) {
        const image = allImages[i];
        const imgResX = (imgBBox[2] - imgBBox[0]) / image.getWidth();
        const imgResY = (imgBBox[3] - imgBBox[1]) / image.getHeight();
        usedImage = image;
        if (resX && resX > imgResX || resY && resY > imgResY) {
          break;
        }
      }
    }
    let wnd = imageWindow;
    if (bbox) {
      const [oX, oY] = firstImage.getOrigin();
      const [imageResX, imageResY] = usedImage.getResolution(firstImage);
      wnd = [
        Math.round((bbox[0] - oX) / imageResX),
        Math.round((bbox[1] - oY) / imageResY),
        Math.round((bbox[2] - oX) / imageResX),
        Math.round((bbox[3] - oY) / imageResY)
      ];
      wnd = [
        Math.min(wnd[0], wnd[2]),
        Math.min(wnd[1], wnd[3]),
        Math.max(wnd[0], wnd[2]),
        Math.max(wnd[1], wnd[3])
      ];
    }
    return usedImage.readRasters({ ...options, window: wnd });
  }
};
var GeoTIFF = class _GeoTIFF extends GeoTIFFBase {
  /**
   * @constructor
   * @param {*} source The datasource to read from.
   * @param {boolean} littleEndian Whether the image uses little endian.
   * @param {boolean} bigTiff Whether the image uses bigTIFF conventions.
   * @param {number} firstIFDOffset The numeric byte-offset from the start of the image
   *                                to the first IFD.
   * @param {GeoTIFFOptions} [options] further options.
   */
  constructor(source, littleEndian, bigTiff, firstIFDOffset, options = {}) {
    super();
    this.source = source;
    this.littleEndian = littleEndian;
    this.bigTiff = bigTiff;
    this.firstIFDOffset = firstIFDOffset;
    this.cache = options.cache || false;
    this.ifdRequests = [];
    this.ghostValues = null;
  }
  async getSlice(offset, size) {
    const fallbackSize = this.bigTiff ? 4048 : 1024;
    return new DataSlice(
      (await this.source.fetch([{
        offset,
        length: typeof size !== "undefined" ? size : fallbackSize
      }]))[0],
      offset,
      this.littleEndian,
      this.bigTiff
    );
  }
  /**
   * Instructs to parse an image file directory at the given file offset.
   * As there is no way to ensure that a location is indeed the start of an IFD,
   * this function must be called with caution (e.g only using the IFD offsets from
   * the headers or other IFDs).
   * @param {number} offset the offset to parse the IFD at
   * @returns {Promise<ImageFileDirectory>} the parsed IFD
   */
  async parseFileDirectoryAt(offset) {
    const entrySize = this.bigTiff ? 20 : 12;
    const offsetSize = this.bigTiff ? 8 : 2;
    let dataSlice = await this.getSlice(offset);
    const numDirEntries = this.bigTiff ? dataSlice.readUint64(offset) : dataSlice.readUint16(offset);
    const byteSize = numDirEntries * entrySize + (this.bigTiff ? 16 : 6);
    if (!dataSlice.covers(offset, byteSize)) {
      dataSlice = await this.getSlice(offset, byteSize);
    }
    const fileDirectory = {};
    let i = offset + (this.bigTiff ? 8 : 2);
    for (let entryCount = 0; entryCount < numDirEntries; i += entrySize, ++entryCount) {
      const fieldTag = dataSlice.readUint16(i);
      const fieldType = dataSlice.readUint16(i + 2);
      const typeCount = this.bigTiff ? dataSlice.readUint64(i + 4) : dataSlice.readUint32(i + 4);
      let fieldValues;
      let value;
      const fieldTypeLength = getFieldTypeLength(fieldType);
      const valueOffset = i + (this.bigTiff ? 12 : 8);
      if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
        fieldValues = getValues(dataSlice, fieldType, typeCount, valueOffset);
      } else {
        const actualOffset = dataSlice.readOffset(valueOffset);
        const length = getFieldTypeLength(fieldType) * typeCount;
        if (dataSlice.covers(actualOffset, length)) {
          fieldValues = getValues(dataSlice, fieldType, typeCount, actualOffset);
        } else {
          const fieldDataSlice = await this.getSlice(actualOffset, length);
          fieldValues = getValues(fieldDataSlice, fieldType, typeCount, actualOffset);
        }
      }
      if (typeCount === 1 && arrayFields.indexOf(fieldTag) === -1 && !(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
        value = fieldValues[0];
      } else {
        value = fieldValues;
      }
      fileDirectory[fieldTagNames[fieldTag]] = value;
    }
    const geoKeyDirectory = parseGeoKeyDirectory(fileDirectory);
    const nextIFDByteOffset = dataSlice.readOffset(
      offset + offsetSize + entrySize * numDirEntries
    );
    return new ImageFileDirectory(
      fileDirectory,
      geoKeyDirectory,
      nextIFDByteOffset
    );
  }
  async requestIFD(index) {
    if (this.ifdRequests[index]) {
      return this.ifdRequests[index];
    } else if (index === 0) {
      this.ifdRequests[index] = this.parseFileDirectoryAt(this.firstIFDOffset);
      return this.ifdRequests[index];
    } else if (!this.ifdRequests[index - 1]) {
      try {
        this.ifdRequests[index - 1] = this.requestIFD(index - 1);
      } catch (e) {
        if (e instanceof GeoTIFFImageIndexError) {
          throw new GeoTIFFImageIndexError(index);
        }
        throw e;
      }
    }
    this.ifdRequests[index] = (async () => {
      const previousIfd = await this.ifdRequests[index - 1];
      if (previousIfd.nextIFDByteOffset === 0) {
        throw new GeoTIFFImageIndexError(index);
      }
      return this.parseFileDirectoryAt(previousIfd.nextIFDByteOffset);
    })();
    return this.ifdRequests[index];
  }
  /**
   * Get the n-th internal subfile of an image. By default, the first is returned.
   *
   * @param {number} [index=0] the index of the image to return.
   * @returns {Promise<GeoTIFFImage>} the image at the given index
   */
  async getImage(index = 0) {
    const ifd = await this.requestIFD(index);
    return new geotiffimage_default(
      ifd.fileDirectory,
      ifd.geoKeyDirectory,
      this.dataView,
      this.littleEndian,
      this.cache,
      this.source
    );
  }
  /**
   * Returns the count of the internal subfiles.
   *
   * @returns {Promise<number>} the number of internal subfile images
   */
  async getImageCount() {
    let index = 0;
    let hasNext = true;
    while (hasNext) {
      try {
        await this.requestIFD(index);
        ++index;
      } catch (e) {
        if (e instanceof GeoTIFFImageIndexError) {
          hasNext = false;
        } else {
          throw e;
        }
      }
    }
    return index;
  }
  /**
   * Get the values of the COG ghost area as a parsed map.
   * See https://gdal.org/drivers/raster/cog.html#header-ghost-area for reference
   * @returns {Promise<Object>} the parsed ghost area or null, if no such area was found
   */
  async getGhostValues() {
    const offset = this.bigTiff ? 16 : 8;
    if (this.ghostValues) {
      return this.ghostValues;
    }
    const detectionString = "GDAL_STRUCTURAL_METADATA_SIZE=";
    const heuristicAreaSize = detectionString.length + 100;
    let slice = await this.getSlice(offset, heuristicAreaSize);
    if (detectionString === getValues(slice, fieldTypes.ASCII, detectionString.length, offset)) {
      const valuesString = getValues(slice, fieldTypes.ASCII, heuristicAreaSize, offset);
      const firstLine = valuesString.split("\n")[0];
      const metadataSize = Number(firstLine.split("=")[1].split(" ")[0]) + firstLine.length;
      if (metadataSize > heuristicAreaSize) {
        slice = await this.getSlice(offset, metadataSize);
      }
      const fullString = getValues(slice, fieldTypes.ASCII, metadataSize, offset);
      this.ghostValues = {};
      fullString.split("\n").filter((line) => line.length > 0).map((line) => line.split("=")).forEach(([key, value]) => {
        this.ghostValues[key] = value;
      });
    }
    return this.ghostValues;
  }
  /**
   * Parse a (Geo)TIFF file from the given source.
   *
   * @param {*} source The source of data to parse from.
   * @param {GeoTIFFOptions} [options] Additional options.
   * @param {AbortSignal} [signal] An AbortSignal that may be signalled if the request is
   *                               to be aborted
   */
  static async fromSource(source, options, signal) {
    const headerData = (await source.fetch([{ offset: 0, length: 1024 }], signal))[0];
    const dataView = new DataView64(headerData);
    const BOM = dataView.getUint16(0, 0);
    let littleEndian;
    if (BOM === 18761) {
      littleEndian = true;
    } else if (BOM === 19789) {
      littleEndian = false;
    } else {
      throw new TypeError("Invalid byte order value.");
    }
    const magicNumber = dataView.getUint16(2, littleEndian);
    let bigTiff;
    if (magicNumber === 42) {
      bigTiff = false;
    } else if (magicNumber === 43) {
      bigTiff = true;
      const offsetByteSize = dataView.getUint16(4, littleEndian);
      if (offsetByteSize !== 8) {
        throw new Error("Unsupported offset byte-size.");
      }
    } else {
      throw new TypeError("Invalid magic number.");
    }
    const firstIFDOffset = bigTiff ? dataView.getUint64(8, littleEndian) : dataView.getUint32(4, littleEndian);
    return new _GeoTIFF(source, littleEndian, bigTiff, firstIFDOffset, options);
  }
  /**
   * Closes the underlying file buffer
   * N.B. After the GeoTIFF has been completely processed it needs
   * to be closed but only if it has been constructed from a file.
   */
  close() {
    if (typeof this.source.close === "function") {
      return this.source.close();
    }
    return false;
  }
};
async function fromArrayBuffer(arrayBuffer, signal) {
  return GeoTIFF.fromSource(makeBufferSource(arrayBuffer), signal);
}

// scripts/sources/raster.mjs
var import_pngjs = __toESM(require_png(), 1);
var import_proj4 = __toESM(require_proj4_src(), 1);
var MAX_SIZE = 1600;
var VIRIDIS_STOPS = [
  [68, 1, 84],
  [72, 40, 120],
  [62, 73, 137],
  [49, 104, 142],
  [38, 130, 142],
  [31, 158, 137],
  [53, 183, 121],
  [109, 205, 89],
  [181, 222, 43],
  [253, 231, 37]
];
function viridis(t) {
  const scaled = Math.max(0, Math.min(1, t)) * (VIRIDIS_STOPS.length - 1);
  const index = Math.floor(scaled);
  const fraction = scaled - index;
  const low = VIRIDIS_STOPS[index];
  const high = VIRIDIS_STOPS[Math.min(index + 1, VIRIDIS_STOPS.length - 1)];
  return [
    Math.round(low[0] + (high[0] - low[0]) * fraction),
    Math.round(low[1] + (high[1] - low[1]) * fraction),
    Math.round(low[2] + (high[2] - low[2]) * fraction)
  ];
}
function ensureProjectionDefs() {
  for (let zone = 1; zone <= 60; zone++) {
    const north = `EPSG:${32600 + zone}`;
    const south = `EPSG:${32700 + zone}`;
    if (!import_proj4.default.defs(north)) {
      import_proj4.default.defs(north, `+proj=utm +zone=${zone} +datum=WGS84 +units=m +no_defs`);
    }
    if (!import_proj4.default.defs(south)) {
      import_proj4.default.defs(south, `+proj=utm +zone=${zone} +south +datum=WGS84 +units=m +no_defs`);
    }
  }
}
function projectionForCode(code) {
  if (!code) {
    return { label: "unknown", transform: null, note: "No CRS in the GeoTIFF; coordinates are used as WGS84." };
  }
  if (code === 4326 || code === 4979) {
    return { label: `EPSG:${code}`, transform: null };
  }
  ensureProjectionDefs();
  try {
    if (import_proj4.default.defs(`EPSG:${code}`)) {
      return {
        label: `EPSG:${code}`,
        transform: (x, y) => (0, import_proj4.default)(`EPSG:${code}`, "EPSG:4326", [x, y])
      };
    }
  } catch {
  }
  return {
    label: `EPSG:${code}`,
    transform: null,
    note: `CRS EPSG:${code} is not reprojected; the image may be misplaced.`
  };
}
function stretch(band, nodata) {
  const values2 = [];
  const step = Math.max(1, Math.floor(band.length / 5e4));
  for (let index = 0; index < band.length; index += step) {
    const value = Number(band[index]);
    if (Number.isFinite(value) && (nodata === null || value !== nodata)) values2.push(value);
  }
  if (!values2.length) return [0, 1];
  values2.sort((a, b) => a - b);
  let low = values2[Math.floor(values2.length * 0.02)];
  let high = values2[Math.floor(values2.length * 0.98)];
  if (!(high > low)) {
    low = values2[0];
    high = values2[values2.length - 1];
  }
  if (!(high > low)) high = low + 1;
  return [low, high];
}
function byte(value, low, high) {
  if (!Number.isFinite(value)) return 0;
  const scaled = Math.round((value - low) / (high - low) * 255);
  return scaled < 0 ? 0 : scaled > 255 ? 255 : scaled;
}
function hasAlphaBand(fileDirectory) {
  const extra = fileDirectory && fileDirectory.ExtraSamples;
  if (Array.isArray(extra)) return extra.includes(1) || extra.includes(2);
  return extra === 1 || extra === 2;
}
function cornersForBbox(bbox, projection) {
  const [minX, minY, maxX, maxY] = bbox;
  const raw = [
    [minX, maxY],
    // top left
    [maxX, maxY],
    // top right
    [maxX, minY],
    // bottom right
    [minX, minY]
    // bottom left
  ];
  const corners = raw.map(([x, y]) => {
    if (!projection.transform) return [x, y];
    const [lon, lat] = projection.transform(x, y);
    return [lon, lat];
  });
  for (const corner of corners) {
    if (!Number.isFinite(corner[0]) || !Number.isFinite(corner[1])) {
      throw new Error("Could not transform the GeoTIFF bounds to WGS84.");
    }
  }
  return corners;
}
async function readGeoTiff(buffer2, options = {}) {
  const arrayBuffer = buffer2.buffer.slice(buffer2.byteOffset, buffer2.byteOffset + buffer2.byteLength);
  const tiff = await fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const sourceWidth = image.getWidth();
  const sourceHeight = image.getHeight();
  const maxSize = options.maxSize || MAX_SIZE;
  const scale = Math.min(1, maxSize / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const fileDirectory = image.getFileDirectory ? image.getFileDirectory() : null;
  const sourceBands = image.getSamplesPerPixel();
  const photometric = fileDirectory ? fileDirectory.PhotometricInterpretation : void 0;
  const converted = photometric === 3 || photometric === 5 || photometric === 6 || photometric === 8;
  const data = Buffer.alloc(width * height * 4);
  const notes = [];
  let pixel = 0;
  let range = null;
  let mode = "rgb";
  if (converted) {
    const rgb = await image.readRGB({ width, height, interleave: true, enableAlpha: false });
    if (!rgb || rgb.length < width * height * 3) {
      throw new Error("The GeoTIFF's color bands could not be converted to RGB.");
    }
    for (let index = 0; index < width * height; index++) {
      const red = rgb[index * 3];
      const green = rgb[index * 3 + 1];
      const blue = rgb[index * 3 + 2];
      data[pixel++] = red;
      data[pixel++] = green;
      data[pixel++] = blue;
      data[pixel++] = red === 0 && green === 0 && blue === 0 ? 0 : 255;
    }
    notes.push("Converted to RGB from the TIFF color space.");
  } else {
    const rasters = await image.readRasters({ width, height, interleave: false });
    if (!rasters || !rasters.length) throw new Error("The GeoTIFF has no image bands.");
    const bands = rasters.length;
    const nodataRaw = image.getGDALNoData ? image.getGDALNoData() : null;
    const nodata = nodataRaw === null || nodataRaw === void 0 || Number.isNaN(Number(nodataRaw)) ? null : Number(nodataRaw);
    const alphaBand = bands >= 4 && hasAlphaBand(fileDirectory);
    if (bands === 1) {
      const [low, high] = stretch(rasters[0], nodata);
      for (let index = 0; index < rasters[0].length; index++) {
        const value = Number(rasters[0][index]);
        const transparent = nodata !== null && value === nodata;
        let red = 0;
        let green = 0;
        let blue = 0;
        if (!transparent) {
          const [r, g, b] = viridis((value - low) / (high - low));
          red = r;
          green = g;
          blue = b;
        }
        data[pixel++] = red;
        data[pixel++] = green;
        data[pixel++] = blue;
        data[pixel++] = transparent ? 0 : 255;
      }
      notes.push("Single band shown with a continuous color ramp.");
      range = [low, high];
      mode = "continuous";
    } else {
      const ranges = [];
      for (let band = 0; band < 3; band++) ranges.push(stretch(rasters[band], nodata));
      const alphaRange = alphaBand ? stretch(rasters[3], nodata) : null;
      for (let index = 0; index < rasters[0].length; index++) {
        let transparent = false;
        for (let band = 0; band < 3; band++) {
          const value = Number(rasters[band][index]);
          if (nodata !== null && value === nodata) transparent = true;
          data[pixel++] = transparent ? 0 : byte(value, ranges[band][0], ranges[band][1]);
        }
        let alpha = transparent ? 0 : 255;
        if (alphaBand && !transparent) {
          alpha = byte(Number(rasters[3][index]), alphaRange[0], alphaRange[1]);
        }
        data[pixel++] = alpha;
      }
      if (bands > 3 && !alphaBand) notes.push(`Showing bands 1-3 of ${bands}.`);
    }
  }
  if (width !== sourceWidth || height !== sourceHeight) {
    notes.push(`Downsampled from ${sourceWidth}\xD7${sourceHeight}.`);
  }
  const bbox = image.getBoundingBox();
  if (!bbox || bbox.some((value) => !Number.isFinite(Number(value)))) {
    throw new Error("The GeoTIFF is not georeferenced (no usable bounds).");
  }
  const geoKeys2 = image.getGeoKeys() || {};
  const code = Number(geoKeys2.ProjectedCSTypeGeoKey || geoKeys2.GeographicTypeGeoKey || 0);
  const projection = projectionForCode(code);
  if (projection.note) notes.push(projection.note);
  const coordinates = cornersForBbox(bbox.map(Number), projection);
  const png = import_pngjs.PNG.sync.write({ width, height, data });
  return {
    png: "data:image/png;base64," + png.toString("base64"),
    width,
    height,
    source_width: sourceWidth,
    source_height: sourceHeight,
    bands: sourceBands,
    range,
    mode,
    crs: projection.label,
    coordinates,
    note: notes.join(" ")
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readGeoTiff
});
