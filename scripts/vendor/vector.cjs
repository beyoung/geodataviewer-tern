var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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

// node_modules/flatbuffers/js/constants.js
var require_constants = __commonJS({
  "node_modules/flatbuffers/js/constants.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SIZE_PREFIX_LENGTH = exports2.FILE_IDENTIFIER_LENGTH = exports2.SIZEOF_INT = exports2.SIZEOF_SHORT = void 0;
    exports2.SIZEOF_SHORT = 2;
    exports2.SIZEOF_INT = 4;
    exports2.FILE_IDENTIFIER_LENGTH = 4;
    exports2.SIZE_PREFIX_LENGTH = 4;
  }
});

// node_modules/flatbuffers/js/utils.js
var require_utils = __commonJS({
  "node_modules/flatbuffers/js/utils.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isLittleEndian = exports2.float64 = exports2.float32 = exports2.int32 = void 0;
    exports2.int32 = new Int32Array(2);
    exports2.float32 = new Float32Array(exports2.int32.buffer);
    exports2.float64 = new Float64Array(exports2.int32.buffer);
    exports2.isLittleEndian = new Uint16Array(new Uint8Array([1, 0]).buffer)[0] === 1;
  }
});

// node_modules/flatbuffers/js/encoding.js
var require_encoding = __commonJS({
  "node_modules/flatbuffers/js/encoding.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Encoding = void 0;
    var Encoding2;
    (function(Encoding3) {
      Encoding3[Encoding3["UTF8_BYTES"] = 1] = "UTF8_BYTES";
      Encoding3[Encoding3["UTF16_STRING"] = 2] = "UTF16_STRING";
    })(Encoding2 || (exports2.Encoding = Encoding2 = {}));
  }
});

// node_modules/flatbuffers/js/byte-buffer.js
var require_byte_buffer = __commonJS({
  "node_modules/flatbuffers/js/byte-buffer.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ByteBuffer = void 0;
    var constants_js_1 = require_constants();
    var encoding_js_1 = require_encoding();
    var utils_js_1 = require_utils();
    var ByteBuffer8 = class _ByteBuffer {
      /**
       * Create a new ByteBuffer with a given array of bytes (`Uint8Array`)
       */
      constructor(bytes_) {
        this.bytes_ = bytes_;
        this.position_ = 0;
        this.text_decoder_ = new TextDecoder();
      }
      /**
       * Create and allocate a new ByteBuffer with a given size.
       */
      static allocate(byte_size) {
        return new _ByteBuffer(new Uint8Array(byte_size));
      }
      clear() {
        this.position_ = 0;
      }
      /**
       * Get the underlying `Uint8Array`.
       */
      bytes() {
        return this.bytes_;
      }
      /**
       * Get the buffer's position.
       */
      position() {
        return this.position_;
      }
      /**
       * Set the buffer's position.
       */
      setPosition(position) {
        this.position_ = position;
      }
      /**
       * Get the buffer's capacity.
       */
      capacity() {
        return this.bytes_.length;
      }
      readInt8(offset) {
        return this.readUint8(offset) << 24 >> 24;
      }
      readUint8(offset) {
        return this.bytes_[offset];
      }
      readInt16(offset) {
        return this.readUint16(offset) << 16 >> 16;
      }
      readUint16(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8;
      }
      readInt32(offset) {
        return this.bytes_[offset] | this.bytes_[offset + 1] << 8 | this.bytes_[offset + 2] << 16 | this.bytes_[offset + 3] << 24;
      }
      readUint32(offset) {
        return this.readInt32(offset) >>> 0;
      }
      readInt64(offset) {
        return BigInt.asIntN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
      }
      readUint64(offset) {
        return BigInt.asUintN(64, BigInt(this.readUint32(offset)) + (BigInt(this.readUint32(offset + 4)) << BigInt(32)));
      }
      readFloat32(offset) {
        utils_js_1.int32[0] = this.readInt32(offset);
        return utils_js_1.float32[0];
      }
      readFloat64(offset) {
        utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1] = this.readInt32(offset);
        utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0] = this.readInt32(offset + 4);
        return utils_js_1.float64[0];
      }
      writeInt8(offset, value) {
        this.bytes_[offset] = value;
      }
      writeUint8(offset, value) {
        this.bytes_[offset] = value;
      }
      writeInt16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
      }
      writeUint16(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
      }
      writeInt32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
      }
      writeUint32(offset, value) {
        this.bytes_[offset] = value;
        this.bytes_[offset + 1] = value >> 8;
        this.bytes_[offset + 2] = value >> 16;
        this.bytes_[offset + 3] = value >> 24;
      }
      writeInt64(offset, value) {
        this.writeInt32(offset, Number(BigInt.asIntN(32, value)));
        this.writeInt32(offset + 4, Number(BigInt.asIntN(32, value >> BigInt(32))));
      }
      writeUint64(offset, value) {
        this.writeUint32(offset, Number(BigInt.asUintN(32, value)));
        this.writeUint32(offset + 4, Number(BigInt.asUintN(32, value >> BigInt(32))));
      }
      writeFloat32(offset, value) {
        utils_js_1.float32[0] = value;
        this.writeInt32(offset, utils_js_1.int32[0]);
      }
      writeFloat64(offset, value) {
        utils_js_1.float64[0] = value;
        this.writeInt32(offset, utils_js_1.int32[utils_js_1.isLittleEndian ? 0 : 1]);
        this.writeInt32(offset + 4, utils_js_1.int32[utils_js_1.isLittleEndian ? 1 : 0]);
      }
      /**
       * Return the file identifier.   Behavior is undefined for FlatBuffers whose
       * schema does not include a file_identifier (likely points at padding or the
       * start of a the root vtable).
       */
      getBufferIdentifier() {
        if (this.bytes_.length < this.position_ + constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH) {
          throw new Error("FlatBuffers: ByteBuffer is too short to contain an identifier.");
        }
        let result = "";
        for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
          result += String.fromCharCode(this.readInt8(this.position_ + constants_js_1.SIZEOF_INT + i));
        }
        return result;
      }
      /**
       * Look up a field in the vtable, return an offset into the object, or 0 if the
       * field is not present.
       */
      __offset(bb_pos, vtable_offset) {
        const vtable = bb_pos - this.readInt32(bb_pos);
        return vtable_offset < this.readInt16(vtable) ? this.readInt16(vtable + vtable_offset) : 0;
      }
      /**
       * Initialize any Table-derived type to point to the union at the given offset.
       */
      __union(t, offset) {
        t.bb_pos = offset + this.readInt32(offset);
        t.bb = this;
        return t;
      }
      /**
       * Create a JavaScript string from UTF-8 data stored inside the FlatBuffer.
       * This allocates a new string and converts to wide chars upon each access.
       *
       * To avoid the conversion to string, pass Encoding.UTF8_BYTES as the
       * "optionalEncoding" argument. This is useful for avoiding conversion when
       * the data will just be packaged back up in another FlatBuffer later on.
       *
       * @param offset
       * @param opt_encoding Defaults to UTF16_STRING
       */
      __string(offset, opt_encoding) {
        offset += this.readInt32(offset);
        const length = this.readInt32(offset);
        offset += constants_js_1.SIZEOF_INT;
        const utf8bytes = this.bytes_.subarray(offset, offset + length);
        if (opt_encoding === encoding_js_1.Encoding.UTF8_BYTES)
          return utf8bytes;
        else
          return this.text_decoder_.decode(utf8bytes);
      }
      /**
       * Handle unions that can contain string as its member, if a Table-derived type then initialize it,
       * if a string then return a new one
       *
       * WARNING: strings are immutable in JS so we can't change the string that the user gave us, this
       * makes the behaviour of __union_with_string different compared to __union
       */
      __union_with_string(o, offset) {
        if (typeof o === "string") {
          return this.__string(offset);
        }
        return this.__union(o, offset);
      }
      /**
       * Retrieve the relative offset stored at "offset"
       */
      __indirect(offset) {
        return offset + this.readInt32(offset);
      }
      /**
       * Get the start of data of a vector whose offset is stored at "offset" in this object.
       */
      __vector(offset) {
        return offset + this.readInt32(offset) + constants_js_1.SIZEOF_INT;
      }
      /**
       * Get the length of a vector whose offset is stored at "offset" in this object.
       */
      __vector_len(offset) {
        return this.readInt32(offset + this.readInt32(offset));
      }
      __has_identifier(ident) {
        if (ident.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
          throw new Error("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
        }
        for (let i = 0; i < constants_js_1.FILE_IDENTIFIER_LENGTH; i++) {
          if (ident.charCodeAt(i) != this.readInt8(this.position() + constants_js_1.SIZEOF_INT + i)) {
            return false;
          }
        }
        return true;
      }
      /**
       * A helper function for generating list for obj api
       */
      createScalarList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
          const val = listAccessor(i);
          if (val !== null) {
            ret.push(val);
          }
        }
        return ret;
      }
      /**
       * A helper function for generating list for obj api
       * @param listAccessor function that accepts an index and return data at that index
       * @param listLength listLength
       * @param res result list
       */
      createObjList(listAccessor, listLength) {
        const ret = [];
        for (let i = 0; i < listLength; ++i) {
          const val = listAccessor(i);
          if (val !== null) {
            ret.push(val.unpack());
          }
        }
        return ret;
      }
    };
    exports2.ByteBuffer = ByteBuffer8;
  }
});

// node_modules/flatbuffers/js/builder.js
var require_builder = __commonJS({
  "node_modules/flatbuffers/js/builder.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Builder = void 0;
    var byte_buffer_js_1 = require_byte_buffer();
    var constants_js_1 = require_constants();
    var Builder6 = class _Builder {
      /**
       * Create a FlatBufferBuilder.
       */
      constructor(opt_initial_size) {
        this.minalign = 1;
        this.vtable = null;
        this.vtable_in_use = 0;
        this.isNested = false;
        this.object_start = 0;
        this.vtables = [];
        this.vector_num_elems = 0;
        this.force_defaults = false;
        this.string_maps = null;
        this.text_encoder = new TextEncoder();
        let initial_size;
        if (!opt_initial_size) {
          initial_size = 1024;
        } else {
          initial_size = opt_initial_size;
        }
        this.bb = byte_buffer_js_1.ByteBuffer.allocate(initial_size);
        this.space = initial_size;
      }
      clear() {
        this.bb.clear();
        this.space = this.bb.capacity();
        this.minalign = 1;
        this.vtable = null;
        this.vtable_in_use = 0;
        this.isNested = false;
        this.object_start = 0;
        this.vtables = [];
        this.vector_num_elems = 0;
        this.force_defaults = false;
        this.string_maps = null;
      }
      /**
       * In order to save space, fields that are set to their default value
       * don't get serialized into the buffer. Forcing defaults provides a
       * way to manually disable this optimization.
       *
       * @param forceDefaults true always serializes default values
       */
      forceDefaults(forceDefaults) {
        this.force_defaults = forceDefaults;
      }
      /**
       * Get the ByteBuffer representing the FlatBuffer. Only call this after you've
       * called finish(). The actual data starts at the ByteBuffer's current position,
       * not necessarily at 0.
       */
      dataBuffer() {
        return this.bb;
      }
      /**
       * Get the bytes representing the FlatBuffer. Only call this after you've
       * called finish().
       */
      asUint8Array() {
        return this.bb.bytes().subarray(this.bb.position(), this.bb.position() + this.offset());
      }
      /**
       * Prepare to write an element of `size` after `additional_bytes` have been
       * written, e.g. if you write a string, you need to align such the int length
       * field is aligned to 4 bytes, and the string data follows it directly. If all
       * you need to do is alignment, `additional_bytes` will be 0.
       *
       * @param size This is the of the new element to write
       * @param additional_bytes The padding size
       */
      prep(size, additional_bytes) {
        if (size > this.minalign) {
          this.minalign = size;
        }
        const align_size = ~(this.bb.capacity() - this.space + additional_bytes) + 1 & size - 1;
        while (this.space < align_size + size + additional_bytes) {
          const old_buf_size = this.bb.capacity();
          this.bb = _Builder.growByteBuffer(this.bb);
          this.space += this.bb.capacity() - old_buf_size;
        }
        this.pad(align_size);
      }
      pad(byte_size) {
        for (let i = 0; i < byte_size; i++) {
          this.bb.writeInt8(--this.space, 0);
        }
      }
      writeInt8(value) {
        this.bb.writeInt8(this.space -= 1, value);
      }
      writeInt16(value) {
        this.bb.writeInt16(this.space -= 2, value);
      }
      writeInt32(value) {
        this.bb.writeInt32(this.space -= 4, value);
      }
      writeInt64(value) {
        this.bb.writeInt64(this.space -= 8, value);
      }
      writeFloat32(value) {
        this.bb.writeFloat32(this.space -= 4, value);
      }
      writeFloat64(value) {
        this.bb.writeFloat64(this.space -= 8, value);
      }
      /**
       * Add an `int8` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `int8` to add the buffer.
       */
      addInt8(value) {
        this.prep(1, 0);
        this.writeInt8(value);
      }
      /**
       * Add an `int16` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `int16` to add the buffer.
       */
      addInt16(value) {
        this.prep(2, 0);
        this.writeInt16(value);
      }
      /**
       * Add an `int32` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `int32` to add the buffer.
       */
      addInt32(value) {
        this.prep(4, 0);
        this.writeInt32(value);
      }
      /**
       * Add an `int64` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `int64` to add the buffer.
       */
      addInt64(value) {
        this.prep(8, 0);
        this.writeInt64(value);
      }
      /**
       * Add a `float32` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `float32` to add the buffer.
       */
      addFloat32(value) {
        this.prep(4, 0);
        this.writeFloat32(value);
      }
      /**
       * Add a `float64` to the buffer, properly aligned, and grows the buffer (if necessary).
       * @param value The `float64` to add the buffer.
       */
      addFloat64(value) {
        this.prep(8, 0);
        this.writeFloat64(value);
      }
      addFieldInt8(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt8(value);
          this.slot(voffset);
        }
      }
      addFieldInt16(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt16(value);
          this.slot(voffset);
        }
      }
      addFieldInt32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addInt32(value);
          this.slot(voffset);
        }
      }
      addFieldInt64(voffset, value, defaultValue) {
        if (this.force_defaults || value !== defaultValue) {
          this.addInt64(value);
          this.slot(voffset);
        }
      }
      addFieldFloat32(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addFloat32(value);
          this.slot(voffset);
        }
      }
      addFieldFloat64(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addFloat64(value);
          this.slot(voffset);
        }
      }
      addFieldOffset(voffset, value, defaultValue) {
        if (this.force_defaults || value != defaultValue) {
          this.addOffset(value);
          this.slot(voffset);
        }
      }
      /**
       * Structs are stored inline, so nothing additional is being added. `d` is always 0.
       */
      addFieldStruct(voffset, value, defaultValue) {
        if (value != defaultValue) {
          this.nested(value);
          this.slot(voffset);
        }
      }
      /**
       * Structures are always stored inline, they need to be created right
       * where they're used.  You'll get this assertion failure if you
       * created it elsewhere.
       */
      nested(obj) {
        if (obj != this.offset()) {
          throw new TypeError("FlatBuffers: struct must be serialized inline.");
        }
      }
      /**
       * Should not be creating any other object, string or vector
       * while an object is being constructed
       */
      notNested() {
        if (this.isNested) {
          throw new TypeError("FlatBuffers: object serialization must not be nested.");
        }
      }
      /**
       * Set the current vtable at `voffset` to the current location in the buffer.
       */
      slot(voffset) {
        if (this.vtable !== null)
          this.vtable[voffset] = this.offset();
      }
      /**
       * @returns Offset relative to the end of the buffer.
       */
      offset() {
        return this.bb.capacity() - this.space;
      }
      /**
       * Doubles the size of the backing ByteBuffer and copies the old data towards
       * the end of the new buffer (since we build the buffer backwards).
       *
       * @param bb The current buffer with the existing data
       * @returns A new byte buffer with the old data copied
       * to it. The data is located at the end of the buffer.
       *
       * uint8Array.set() formally takes {Array<number>|ArrayBufferView}, so to pass
       * it a uint8Array we need to suppress the type check:
       * @suppress {checkTypes}
       */
      static growByteBuffer(bb) {
        const old_buf_size = bb.capacity();
        if (old_buf_size & 3221225472) {
          throw new Error("FlatBuffers: cannot grow buffer beyond 2 gigabytes.");
        }
        const new_buf_size = old_buf_size << 1;
        const nbb = byte_buffer_js_1.ByteBuffer.allocate(new_buf_size);
        nbb.setPosition(new_buf_size - old_buf_size);
        nbb.bytes().set(bb.bytes(), new_buf_size - old_buf_size);
        return nbb;
      }
      /**
       * Adds on offset, relative to where it will be written.
       *
       * @param offset The offset to add.
       */
      addOffset(offset) {
        this.prep(constants_js_1.SIZEOF_INT, 0);
        this.writeInt32(this.offset() - offset + constants_js_1.SIZEOF_INT);
      }
      /**
       * Start encoding a new object in the buffer.  Users will not usually need to
       * call this directly. The FlatBuffers compiler will generate helper methods
       * that call this method internally.
       */
      startObject(numfields) {
        this.notNested();
        if (this.vtable == null) {
          this.vtable = [];
        }
        this.vtable_in_use = numfields;
        for (let i = 0; i < numfields; i++) {
          this.vtable[i] = 0;
        }
        this.isNested = true;
        this.object_start = this.offset();
      }
      /**
       * Finish off writing the object that is under construction.
       *
       * @returns The offset to the object inside `dataBuffer`
       */
      endObject() {
        if (this.vtable == null || !this.isNested) {
          throw new Error("FlatBuffers: endObject called without startObject");
        }
        this.addInt32(0);
        const vtableloc = this.offset();
        let i = this.vtable_in_use - 1;
        for (; i >= 0 && this.vtable[i] == 0; i--) {
        }
        const trimmed_size = i + 1;
        for (; i >= 0; i--) {
          this.addInt16(this.vtable[i] != 0 ? vtableloc - this.vtable[i] : 0);
        }
        const standard_fields = 2;
        this.addInt16(vtableloc - this.object_start);
        const len = (trimmed_size + standard_fields) * constants_js_1.SIZEOF_SHORT;
        this.addInt16(len);
        let existing_vtable = 0;
        const vt1 = this.space;
        outer_loop: for (i = 0; i < this.vtables.length; i++) {
          const vt2 = this.bb.capacity() - this.vtables[i];
          if (len == this.bb.readInt16(vt2)) {
            for (let j = constants_js_1.SIZEOF_SHORT; j < len; j += constants_js_1.SIZEOF_SHORT) {
              if (this.bb.readInt16(vt1 + j) != this.bb.readInt16(vt2 + j)) {
                continue outer_loop;
              }
            }
            existing_vtable = this.vtables[i];
            break;
          }
        }
        if (existing_vtable) {
          this.space = this.bb.capacity() - vtableloc;
          this.bb.writeInt32(this.space, existing_vtable - vtableloc);
        } else {
          this.vtables.push(this.offset());
          this.bb.writeInt32(this.bb.capacity() - vtableloc, this.offset() - vtableloc);
        }
        this.isNested = false;
        return vtableloc;
      }
      /**
       * Finalize a buffer, poiting to the given `root_table`.
       */
      finish(root_table, opt_file_identifier, opt_size_prefix) {
        const size_prefix = opt_size_prefix ? constants_js_1.SIZE_PREFIX_LENGTH : 0;
        if (opt_file_identifier) {
          const file_identifier = opt_file_identifier;
          this.prep(this.minalign, constants_js_1.SIZEOF_INT + constants_js_1.FILE_IDENTIFIER_LENGTH + size_prefix);
          if (file_identifier.length != constants_js_1.FILE_IDENTIFIER_LENGTH) {
            throw new TypeError("FlatBuffers: file identifier must be length " + constants_js_1.FILE_IDENTIFIER_LENGTH);
          }
          for (let i = constants_js_1.FILE_IDENTIFIER_LENGTH - 1; i >= 0; i--) {
            this.writeInt8(file_identifier.charCodeAt(i));
          }
        }
        this.prep(this.minalign, constants_js_1.SIZEOF_INT + size_prefix);
        this.addOffset(root_table);
        if (size_prefix) {
          this.addInt32(this.bb.capacity() - this.space);
        }
        this.bb.setPosition(this.space);
      }
      /**
       * Finalize a size prefixed buffer, pointing to the given `root_table`.
       */
      finishSizePrefixed(root_table, opt_file_identifier) {
        this.finish(root_table, opt_file_identifier, true);
      }
      /**
       * This checks a required field has been set in a given table that has
       * just been constructed.
       */
      requiredField(table, field) {
        const table_start = this.bb.capacity() - table;
        const vtable_start = table_start - this.bb.readInt32(table_start);
        const ok = field < this.bb.readInt16(vtable_start) && this.bb.readInt16(vtable_start + field) != 0;
        if (!ok) {
          throw new TypeError("FlatBuffers: field " + field + " must be set");
        }
      }
      /**
       * Start a new array/vector of objects.  Users usually will not call
       * this directly. The FlatBuffers compiler will create a start/end
       * method for vector types in generated code.
       *
       * @param elem_size The size of each element in the array
       * @param num_elems The number of elements in the array
       * @param alignment The alignment of the array
       */
      startVector(elem_size, num_elems, alignment) {
        this.notNested();
        this.vector_num_elems = num_elems;
        this.prep(constants_js_1.SIZEOF_INT, elem_size * num_elems);
        this.prep(alignment, elem_size * num_elems);
      }
      /**
       * Finish off the creation of an array and all its elements. The array must be
       * created with `startVector`.
       *
       * @returns The offset at which the newly created array
       * starts.
       */
      endVector() {
        this.writeInt32(this.vector_num_elems);
        return this.offset();
      }
      /**
       * Encode the string `s` in the buffer using UTF-8. If the string passed has
       * already been seen, we return the offset of the already written string
       *
       * @param s The string to encode
       * @return The offset in the buffer where the encoded string starts
       */
      createSharedString(s) {
        if (!s) {
          return 0;
        }
        if (!this.string_maps) {
          this.string_maps = /* @__PURE__ */ new Map();
        }
        if (this.string_maps.has(s)) {
          return this.string_maps.get(s);
        }
        const offset = this.createString(s);
        this.string_maps.set(s, offset);
        return offset;
      }
      /**
       * Encode the string `s` in the buffer using UTF-8. If a Uint8Array is passed
       * instead of a string, it is assumed to contain valid UTF-8 encoded data.
       *
       * @param s The string to encode
       * @return The offset in the buffer where the encoded string starts
       */
      createString(s) {
        if (s === null || s === void 0) {
          return 0;
        }
        let utf8;
        if (s instanceof Uint8Array) {
          utf8 = s;
        } else {
          utf8 = this.text_encoder.encode(s);
        }
        this.addInt8(0);
        this.startVector(1, utf8.length, 1);
        this.bb.setPosition(this.space -= utf8.length);
        this.bb.bytes().set(utf8, this.space);
        return this.endVector();
      }
      /**
       * Create a byte vector.
       *
       * @param v The bytes to add
       * @returns The offset in the buffer where the byte vector starts
       */
      createByteVector(v) {
        if (v === null || v === void 0) {
          return 0;
        }
        this.startVector(1, v.length, 1);
        this.bb.setPosition(this.space -= v.length);
        this.bb.bytes().set(v, this.space);
        return this.endVector();
      }
      /**
       * A helper function to pack an object
       *
       * @returns offset of obj
       */
      createObjectOffset(obj) {
        if (obj === null) {
          return 0;
        }
        if (typeof obj === "string") {
          return this.createString(obj);
        } else {
          return obj.pack(this);
        }
      }
      /**
       * A helper function to pack a list of object
       *
       * @returns list of offsets of each non null object
       */
      createObjectOffsetList(list) {
        const ret = [];
        for (let i = 0; i < list.length; ++i) {
          const val = list[i];
          if (val !== null) {
            ret.push(this.createObjectOffset(val));
          } else {
            throw new TypeError("FlatBuffers: Argument for createObjectOffsetList cannot contain null.");
          }
        }
        return ret;
      }
      createStructOffsetList(list, startFunc) {
        startFunc(this, list.length);
        this.createObjectOffsetList(list.slice().reverse());
        return this.endVector();
      }
    };
    exports2.Builder = Builder6;
  }
});

// node_modules/flatbuffers/js/flatbuffers.js
var require_flatbuffers = __commonJS({
  "node_modules/flatbuffers/js/flatbuffers.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.Encoding = exports2.ByteBuffer = exports2.Builder = exports2.isLittleEndian = exports2.int32 = exports2.float64 = exports2.float32 = exports2.SIZE_PREFIX_LENGTH = exports2.SIZEOF_SHORT = exports2.SIZEOF_INT = exports2.FILE_IDENTIFIER_LENGTH = void 0;
    var constants_js_1 = require_constants();
    Object.defineProperty(exports2, "FILE_IDENTIFIER_LENGTH", { enumerable: true, get: function() {
      return constants_js_1.FILE_IDENTIFIER_LENGTH;
    } });
    Object.defineProperty(exports2, "SIZEOF_INT", { enumerable: true, get: function() {
      return constants_js_1.SIZEOF_INT;
    } });
    Object.defineProperty(exports2, "SIZEOF_SHORT", { enumerable: true, get: function() {
      return constants_js_1.SIZEOF_SHORT;
    } });
    Object.defineProperty(exports2, "SIZE_PREFIX_LENGTH", { enumerable: true, get: function() {
      return constants_js_1.SIZE_PREFIX_LENGTH;
    } });
    var utils_js_1 = require_utils();
    Object.defineProperty(exports2, "float32", { enumerable: true, get: function() {
      return utils_js_1.float32;
    } });
    Object.defineProperty(exports2, "float64", { enumerable: true, get: function() {
      return utils_js_1.float64;
    } });
    Object.defineProperty(exports2, "int32", { enumerable: true, get: function() {
      return utils_js_1.int32;
    } });
    Object.defineProperty(exports2, "isLittleEndian", { enumerable: true, get: function() {
      return utils_js_1.isLittleEndian;
    } });
    var builder_js_1 = require_builder();
    Object.defineProperty(exports2, "Builder", { enumerable: true, get: function() {
      return builder_js_1.Builder;
    } });
    var byte_buffer_js_1 = require_byte_buffer();
    Object.defineProperty(exports2, "ByteBuffer", { enumerable: true, get: function() {
      return byte_buffer_js_1.ByteBuffer;
    } });
    var encoding_js_1 = require_encoding();
    Object.defineProperty(exports2, "Encoding", { enumerable: true, get: function() {
      return encoding_js_1.Encoding;
    } });
  }
});

// node_modules/sql.js/dist/sql-wasm.js
var require_sql_wasm = __commonJS({
  "node_modules/sql.js/dist/sql-wasm.js"(exports2, module2) {
    var initSqlJsPromise = void 0;
    var initSqlJs2 = function(moduleConfig) {
      if (initSqlJsPromise) {
        return initSqlJsPromise;
      }
      initSqlJsPromise = new Promise(function(resolveModule, reject) {
        var Module = typeof moduleConfig !== "undefined" ? moduleConfig : {};
        var originalOnAbortFunction = Module["onAbort"];
        Module["onAbort"] = function(errorThatCausedAbort) {
          reject(new Error(errorThatCausedAbort));
          if (originalOnAbortFunction) {
            originalOnAbortFunction(errorThatCausedAbort);
          }
        };
        Module["postRun"] = Module["postRun"] || [];
        Module["postRun"].push(function() {
          resolveModule(Module);
        });
        module2 = void 0;
        var k;
        k ||= typeof Module != "undefined" ? Module : {};
        var aa = !!globalThis.window, ca = !!globalThis.WorkerGlobalScope, da = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
        k.onRuntimeInitialized = function() {
          function a(f, h) {
            tb(f, h instanceof Error ? h.message : String(h), -1);
          }
          function b(f, h) {
            switch (typeof h) {
              case "boolean":
                kc(f, h ? 1 : 0);
                break;
              case "number":
                lc(f, h);
                break;
              case "string":
                mc(f, h, m(h), -1);
                break;
              case "object":
                if (h === null) ub(f);
                else if (h.length != null) {
                  var p = ea(h.length);
                  u.set(h, p);
                  nc(f, p, h.length, -1);
                  y(p);
                } else tb(f, "Wrong API use : tried to return a value of an unknown type (" + h + ").", -1);
                break;
              default:
                ub(f);
            }
          }
          function d(f, h) {
            for (var p = [], q = 0; q < f; q += 1) {
              var t = A(
                h + 4 * q,
                "i32"
              ), w = oc(t);
              if (w === 1 || w === 2) t = pc(t);
              else if (w === 3) w = vb(t), t = qc(t), t = B(t, w, true);
              else if (w === 4) {
                w = t;
                t = vb(w);
                w = rc(w);
                for (var x = new Uint8Array(t), G = 0; G < t; G += 1) x[G] = u[w + G];
                t = x;
              } else t = null;
              p.push(t);
            }
            return p;
          }
          function c(f, h) {
            this.Ua = f;
            this.db = h;
            this.Sa = 1;
            this.qb = [];
          }
          function e(f, h) {
            this.db = h;
            this.jb = fa(f);
            if (this.jb === null) throw Error("Unable to allocate memory for the SQL string");
            this.ob = this.jb;
            this.ab = this.wb = null;
          }
          function g(f) {
            this.filename = "dbfile_" + (4294967295 * Math.random() >>> 0);
            f != null && ja(
              this.filename,
              f
            );
            this.handleError(z(this.filename, v));
            this.db = A(v, "i32");
            sc(this.db);
            this.pb = {};
            this.Xa = /* @__PURE__ */ new Map();
          }
          function n(f, h) {
            return f.replace(/[A-Z]/g, function(p) {
              return p.toLowerCase();
            }) + ":" + h;
          }
          function r(f) {
            f.forEach(ka);
          }
          var v = la(4), l = k.cwrap, z = l("sqlite3_open", "number", ["string", "number"]), F = l("sqlite3_close_v2", "number", ["number"]), ba = l("sqlite3_backup_init", "number", ["number", "string", "number", "string"]), za = l("sqlite3_backup_step", "number", ["number", "number"]), ma = l("sqlite3_backup_finish", "number", ["number"]), Aa = l("sqlite3_exec", "number", ["number", "number", "number", "number", "number"]), ha = l("sqlite3_changes", "number", ["number"]), Ba = l("sqlite3_sql", "string", ["number"]), N = l("sqlite3_normalized_sql", "string", ["number"]), Ua = l("sqlite3_prepare_v2", "number", ["number", "number", "number", "number", "number"]), tc = l("sqlite3_bind_text", "number", ["number", "number", "number", "number", "number"]), xb = l("sqlite3_bind_blob", "number", ["number", "number", "number", "number", "number"]), uc = l("sqlite3_bind_double", "number", [
            "number",
            "number",
            "number"
          ]), vc = l("sqlite3_bind_int", "number", ["number", "number", "number"]), wc = l("sqlite3_bind_parameter_index", "number", ["number", "string"]), xc = l("sqlite3_step", "number", ["number"]), ia = l("sqlite3_errmsg", "string", ["number"]), yc = l("sqlite3_column_count", "number", ["number"]), zc = l("sqlite3_data_count", "number", ["number"]), Ac = l("sqlite3_column_double", "number", ["number", "number"]), Bc = l("sqlite3_column_text", "number", ["number", "number"]), Cc = l("sqlite3_column_blob", "number", ["number", "number"]), yb = l("sqlite3_column_bytes", "number", ["number", "number"]), Dc = l("sqlite3_column_type", "number", ["number", "number"]), Ec = l("sqlite3_column_name", "string", ["number", "number"]), Fc = l("sqlite3_reset", "number", ["number"]), Gc = l("sqlite3_clear_bindings", "number", ["number"]), Hc = l("sqlite3_finalize", "number", ["number"]), zb = l("sqlite3_create_function_v2", "number", "number string number number number number number number number".split(" ")), oc = l("sqlite3_value_type", "number", ["number"]), vb = l(
            "sqlite3_value_bytes",
            "number",
            ["number"]
          ), qc = l("sqlite3_value_text", "number", ["number"]), rc = l("sqlite3_value_blob", "number", ["number"]), pc = l("sqlite3_value_double", "number", ["number"]), lc = l("sqlite3_result_double", "", ["number", "number"]), ub = l("sqlite3_result_null", "", ["number"]), mc = l("sqlite3_result_text", "", ["number", "string", "number", "number"]), nc = l("sqlite3_result_blob", "", ["number", "number", "number", "number"]), kc = l("sqlite3_result_int", "", ["number", "number"]), tb = l("sqlite3_result_error", "", ["number", "string", "number"]), Ab = l("sqlite3_aggregate_context", "number", ["number", "number"]), sc = l("RegisterExtensionFunctions", "number", ["number"]), Bb = l("sqlite3_update_hook", "number", ["number", "number", "number"]);
          c.prototype.bind = function(f) {
            if (!this.Ua) throw "Statement closed";
            this.reset();
            return Array.isArray(f) ? this.Nb(f) : f != null && typeof f === "object" ? this.Ob(f) : true;
          };
          c.prototype.step = function() {
            if (!this.Ua) throw "Statement closed";
            this.Sa = 1;
            var f = xc(this.Ua);
            switch (f) {
              case 100:
                return true;
              case 101:
                return false;
              default:
                throw this.db.handleError(f);
            }
          };
          c.prototype.Gb = function(f) {
            f == null && (f = this.Sa, this.Sa += 1);
            return Ac(this.Ua, f);
          };
          c.prototype.Wb = function(f) {
            f == null && (f = this.Sa, this.Sa += 1);
            if (typeof BigInt !== "function") throw Error("BigInt is not supported");
            return BigInt(this.Hb(f));
          };
          c.prototype.Hb = function(f) {
            f == null && (f = this.Sa, this.Sa += 1);
            var h = Bc(this.Ua, f);
            f = yb(this.Ua, f);
            return B(h, f, true);
          };
          c.prototype.getBlob = function(f) {
            f == null && (f = this.Sa, this.Sa += 1);
            var h = yb(this.Ua, f);
            f = Cc(this.Ua, f);
            for (var p = new Uint8Array(h), q = 0; q < h; q += 1) p[q] = u[f + q];
            return p;
          };
          c.prototype.get = function(f, h) {
            h = h || {};
            f != null && this.bind(f) && this.step();
            f = [];
            for (var p = zc(this.Ua), q = 0; q < p; q += 1) switch (Dc(this.Ua, q)) {
              case 1:
                var t = h.useBigInt ? this.Wb(q) : this.Gb(q);
                f.push(t);
                break;
              case 2:
                f.push(this.Gb(q));
                break;
              case 3:
                f.push(this.Hb(q));
                break;
              case 4:
                f.push(this.getBlob(q));
                break;
              default:
                f.push(null);
            }
            return f;
          };
          c.prototype.tb = function() {
            for (var f = [], h = yc(this.Ua), p = 0; p < h; p += 1) f.push(Ec(this.Ua, p));
            return f;
          };
          c.prototype.Fb = function(f, h) {
            var p = this.get(f, h);
            f = this.tb();
            return Object.fromEntries(f.map(function(q, t) {
              return [q, p[t]];
            }));
          };
          c.prototype.$b = function() {
            return Ba(this.Ua);
          };
          c.prototype.Xb = function() {
            return N(this.Ua);
          };
          c.prototype.run = function(f) {
            f != null && this.bind(f);
            this.step();
            return this.reset();
          };
          c.prototype.Bb = function(f, h) {
            h == null && (h = this.Sa, this.Sa += 1);
            var p = fa(f);
            this.qb.push(p);
            this.db.handleError(tc(this.Ua, h, p, m(f), 0));
          };
          c.prototype.Mb = function(f, h) {
            h == null && (h = this.Sa, this.Sa += 1);
            var p = ea(f.length);
            u.set(f, p);
            this.qb.push(p);
            this.db.handleError(xb(
              this.Ua,
              h,
              p,
              f.length,
              0
            ));
          };
          c.prototype.Ab = function(f, h) {
            h == null && (h = this.Sa, this.Sa += 1);
            this.db.handleError((f === (f | 0) ? vc : uc)(this.Ua, h, f));
          };
          c.prototype.Pb = function(f) {
            f == null && (f = this.Sa, this.Sa += 1);
            xb(this.Ua, f, 0, 0, 0);
          };
          c.prototype.Cb = function(f, h) {
            h == null && (h = this.Sa, this.Sa += 1);
            switch (typeof f) {
              case "string":
                this.Bb(f, h);
                return;
              case "number":
                this.Ab(f, h);
                return;
              case "bigint":
                this.Bb(f.toString(), h);
                return;
              case "boolean":
                this.Ab(f + 0, h);
                return;
              case "object":
                if (f === null) {
                  this.Pb(h);
                  return;
                }
                if (f.length != null) {
                  this.Mb(
                    f,
                    h
                  );
                  return;
                }
            }
            throw "Wrong API use : tried to bind a value of an unknown type (" + f + ").";
          };
          c.prototype.Ob = function(f) {
            var h = this;
            Object.keys(f).forEach(function(p) {
              var q = wc(h.Ua, p);
              q !== 0 && h.Cb(f[p], q);
            });
            return true;
          };
          c.prototype.Nb = function(f) {
            for (var h = 0; h < f.length; h += 1) this.Cb(f[h], h + 1);
            return true;
          };
          c.prototype.reset = function() {
            this.freemem();
            return Gc(this.Ua) === 0 && Fc(this.Ua) === 0;
          };
          c.prototype.freemem = function() {
            for (var f; (f = this.qb.pop()) !== void 0; ) y(f);
          };
          c.prototype.cb = function() {
            this.freemem();
            var f = Hc(this.Ua) === 0;
            delete this.db.pb[this.Ua];
            this.Ua = 0;
            return f;
          };
          e.prototype.next = function() {
            if (this.jb === null) return { done: true };
            this.ab !== null && (this.ab.cb(), this.ab = null);
            if (!this.db.db) throw this.kb(), Error("Database closed");
            var f = na(), h = la(4);
            oa(v);
            oa(h);
            try {
              this.db.handleError(Ua(this.db.db, this.ob, -1, v, h));
              this.ob = A(h, "i32");
              var p = A(v, "i32");
              if (p === 0) return this.kb(), { done: true };
              this.ab = new c(p, this.db);
              this.db.pb[p] = this.ab;
              return { value: this.ab, done: false };
            } catch (q) {
              throw this.wb = B(this.ob), this.kb(), q;
            } finally {
              pa(f);
            }
          };
          e.prototype.kb = function() {
            y(this.jb);
            this.jb = null;
          };
          e.prototype["return"] = function() {
            this.ab !== null && (this.ab.cb(), this.ab = null);
            this.kb();
            return { done: true };
          };
          e.prototype.Yb = function() {
            return this.wb !== null ? this.wb : B(this.ob);
          };
          typeof Symbol === "function" && typeof Symbol.iterator === "symbol" && (e.prototype[Symbol.iterator] = function() {
            return this;
          });
          g.prototype.run = function(f, h) {
            if (!this.db) throw "Database closed";
            if (h) {
              f = this.xb(f, h);
              try {
                f.step();
              } finally {
                f.cb();
              }
            } else {
              f = fa(f);
              try {
                this.handleError(Aa(
                  this.db,
                  f,
                  0,
                  0,
                  v
                ));
              } finally {
                y(f);
              }
            }
            return this;
          };
          g.prototype.exec = function(f, h, p) {
            if (!this.db) throw "Database closed";
            var q = na(), t = null, w = null, x = null;
            try {
              x = w = fa(f);
              var G = la(4);
              for (f = []; A(x, "i8") !== 0; ) {
                oa(v);
                oa(G);
                this.handleError(Ua(this.db, x, -1, v, G));
                var S = A(v, "i32");
                x = A(G, "i32");
                if (S !== 0) {
                  var D = null;
                  t = new c(S, this);
                  for (h != null && t.bind(h); t.step(); ) D === null && (D = { columns: t.tb(), values: [] }, f.push(D)), D.values.push(t.get(null, p));
                  t.cb();
                }
              }
              return f;
            } catch (K) {
              throw t && t.cb(), K;
            } finally {
              w && y(w), pa(q);
            }
          };
          g.prototype.Tb = function(f, h, p, q, t) {
            typeof h === "function" && (q = p, p = h, h = void 0);
            f = this.xb(f, h);
            try {
              for (; f.step(); ) p(f.Fb(null, t));
            } finally {
              f.cb();
            }
            if (typeof q === "function") return q();
          };
          g.prototype.xb = function(f, h) {
            f = fa(f);
            try {
              oa(v), this.handleError(Ua(this.db, f, -1, v, 0));
            } finally {
              y(f);
            }
            f = A(v, "i32");
            if (f === 0) throw "Nothing to prepare";
            var p = new c(f, this);
            h != null && p.bind(h);
            return this.pb[f] = p;
          };
          g.prototype.ac = function(f) {
            return new e(f, this);
          };
          g.prototype.Vb = function() {
            if (!this.db) throw Error("Database closed");
            var f = this.filename + "_export";
            ja(f, []);
            var h = 0, p = 0;
            try {
              var q = C(f).node, t = null, w = q.Pa.write;
              q.Pa = Object.create(q.Pa);
              q.Pa.write = function(S, D, K, U, T) {
                if (t === null) return w(S, D, K, U, T);
                q.Ta.set(D.subarray(K, K + U), T);
                q.Va = Math.max(q.Va, T + U);
                return U;
              };
              var x = z(f, v);
              h = A(v, "i32");
              if (x !== 0) throw Error(ia(h));
              p = ba(h, "main", this.db, "main");
              if (p === 0) throw Error(ia(h));
              x = za(p, 0);
              if (x === 0) {
                var G = this.exec("PRAGMA main.page_count; PRAGMA main.page_size");
                t = new Uint8Array(G[0].values[0][0] * G[1].values[0][0]);
                q.Ta = t;
                x = za(p, -1);
              }
              if (x === 5 || x === 6) throw Error("Unable to export: SQLite is busy or locked. Finish active write transactions before exporting.");
              if (x !== 101) throw Error(ia(h));
              x = ma(p);
              p = 0;
              if (x !== 0) throw Error(ia(h));
              x = F(h);
              if (x !== 0) throw Error(ia(h));
              h = 0;
              t = new Uint8Array(q.Ta.buffer, q.Ta.byteOffset, q.Va);
              t.length > 0 && (t[18] = 1, t[19] = 1);
              return t;
            } finally {
              p !== 0 && ma(p), h !== 0 && F(h), qa("/" + f);
            }
          };
          g.prototype.close = function() {
            this.db !== null && (Object.values(this.pb).forEach(function(f) {
              f.cb();
            }), this.Xa.forEach(r), this.Xa.clear(), this.eb && (ka(this.eb), this.eb = void 0), this.handleError(F(this.db)), qa("/" + this.filename), this.db = null);
          };
          g.prototype.handleError = function(f) {
            if (f === 0) return null;
            f = ia(this.db);
            throw Error(f);
          };
          g.prototype.Zb = function() {
            return ha(this.db);
          };
          g.prototype.Sb = function(f, h) {
            var p = n(f, h.length);
            this.Xa.has(p) && (r(this.Xa.get(p)), this.Xa.delete(p));
            var q = ra(function(t, w, x) {
              w = d(w, x);
              try {
                var G = h.apply(null, w);
              } catch (S) {
                a(t, S);
                return;
              }
              b(t, G);
            }, "viii");
            this.Xa.set(p, [q]);
            this.handleError(zb(this.db, f, h.length, 1, 0, q, 0, 0, 0));
            return this;
          };
          g.prototype.Rb = function(f, h) {
            function p(D) {
              x.has(D) || x.set(D, q());
              return x.get(D);
            }
            var q = h.init || function() {
              return null;
            }, t = h.finalize || function(D) {
              return D;
            }, w = h.step;
            if (!w) throw "An aggregate function must have a step function in " + f;
            var x = /* @__PURE__ */ new Map();
            h = n(f, w.length - 1);
            this.Xa.has(h) && (r(this.Xa.get(h)), this.Xa.delete(h));
            var G = ra(function(D, K, U) {
              var T = Ab(D, 1), Wa = p(T);
              K = d(K, U);
              Wa = [Wa].concat(K);
              try {
                x.set(T, w.apply(null, Wa));
              } catch (Ic) {
                x.delete(T), a(D, Ic);
              }
            }, "viii"), S = ra(function(D) {
              var K = Ab(
                D,
                1
              );
              try {
                var U = t(p(K));
              } catch (T) {
                x.delete(K);
                a(D, T);
                return;
              }
              b(D, U);
              x.delete(K);
            }, "vi");
            this.Xa.set(h, [G, S]);
            this.handleError(zb(this.db, f, w.length - 1, 1, 0, 0, G, S, 0));
            return this;
          };
          g.prototype.hc = function(f) {
            this.eb && (Bb(this.db, 0, 0), ka(this.eb), this.eb = void 0);
            if (!f) return this;
            this.eb = ra(function(h, p, q, t, w) {
              switch (p) {
                case 18:
                  h = "insert";
                  break;
                case 23:
                  h = "update";
                  break;
                case 9:
                  h = "delete";
                  break;
                default:
                  throw "unknown operationCode in updateHook callback: " + p;
              }
              q = B(q);
              t = B(t);
              if (w > Number.MAX_SAFE_INTEGER) throw "rowId too big to fit inside a Number";
              f(h, q, t, Number(w));
            }, "viiiij");
            Bb(this.db, this.eb, 0);
            return this;
          };
          c.prototype.bind = c.prototype.bind;
          c.prototype.step = c.prototype.step;
          c.prototype.get = c.prototype.get;
          c.prototype.getColumnNames = c.prototype.tb;
          c.prototype.getAsObject = c.prototype.Fb;
          c.prototype.getSQL = c.prototype.$b;
          c.prototype.getNormalizedSQL = c.prototype.Xb;
          c.prototype.run = c.prototype.run;
          c.prototype.reset = c.prototype.reset;
          c.prototype.freemem = c.prototype.freemem;
          c.prototype.free = c.prototype.cb;
          e.prototype.next = e.prototype.next;
          e.prototype.getRemainingSQL = e.prototype.Yb;
          g.prototype.run = g.prototype.run;
          g.prototype.exec = g.prototype.exec;
          g.prototype.each = g.prototype.Tb;
          g.prototype.prepare = g.prototype.xb;
          g.prototype.iterateStatements = g.prototype.ac;
          g.prototype["export"] = g.prototype.Vb;
          g.prototype.close = g.prototype.close;
          g.prototype.handleError = g.prototype.handleError;
          g.prototype.getRowsModified = g.prototype.Zb;
          g.prototype.create_function = g.prototype.Sb;
          g.prototype.create_aggregate = g.prototype.Rb;
          g.prototype.updateHook = g.prototype.hc;
          k.Database = g;
        };
        var sa = "./this.program", ta = (a, b) => {
          throw b;
        }, ua = globalThis.document?.currentScript?.src;
        typeof __filename != "undefined" ? ua = __filename : ca && (ua = self.location.href);
        var va = "", wa, xa;
        if (da) {
          var fs = require("node:fs");
          va = __dirname + "/";
          xa = (a) => {
            a = ya(a) ? new URL(a) : a;
            return fs.readFileSync(a);
          };
          wa = async (a) => {
            a = ya(a) ? new URL(a) : a;
            return fs.readFileSync(a, void 0);
          };
          process.argv.length > 1 && (sa = process.argv[1].replace(/\\/g, "/"));
          process.argv.slice(2);
          typeof module2 != "undefined" && (module2.exports = k);
          ta = (a, b) => {
            process.exitCode = a;
            throw b;
          };
        } else if (aa || ca) {
          try {
            va = new URL(".", ua).href;
          } catch {
          }
          ca && (xa = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, false);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          });
          wa = async (a) => {
            if (ya(a)) return new Promise((d, c) => {
              var e = new XMLHttpRequest();
              e.open("GET", a, true);
              e.responseType = "arraybuffer";
              e.onload = () => {
                e.status == 200 || e.status == 0 && e.response ? d(e.response) : c(e.status);
              };
              e.onerror = c;
              e.send(null);
            });
            var b = await fetch(a, { credentials: "same-origin" });
            if (b.ok) return b.arrayBuffer();
            throw Error(b.status + " : " + b.url);
          };
        }
        var Ca = console.log.bind(console), E = console.error.bind(console), Da, Ea = false, Fa, ya = (a) => a.startsWith("file://");
        function Ga() {
          if (!u?.buffer?.resizable) {
            var a = Ha.buffer;
            u = new Int8Array(a);
            Ia = new Int16Array(a);
            H = new Uint8Array(a);
            I = new Int32Array(a);
            J = new Uint32Array(a);
            Ja = new Float32Array(a);
            Ka = new Float64Array(a);
            L = new BigInt64Array(a);
          }
        }
        function La() {
          var a = k.preRun;
          a && (typeof a == "function" && (a = [a]), Ma.push(...a));
          for (a = Ma; a.length > 0; ) a.shift()(k);
        }
        function Na() {
          var a = k.postRun;
          a && (typeof a == "function" && (a = [a]), Oa.push(...a));
          for (a = Oa; a.length > 0; ) a.shift()(k);
        }
        function Pa(a) {
          k.onAbort?.(a);
          a = `Aborted(${a})`;
          E(a);
          Ea = true;
          throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
        }
        var Qa;
        async function Ra(a) {
          if (!Da) try {
            var b = await wa(a);
            return new Uint8Array(b);
          } catch {
          }
          if (a == Qa && Da) a = new Uint8Array(Da);
          else if (xa) a = xa(a);
          else throw "both async and sync fetching of the wasm failed";
          return a;
        }
        async function Sa(a, b) {
          try {
            var d = await Ra(a);
            return await WebAssembly.instantiate(d, b);
          } catch (c) {
            E(`failed to asynchronously prepare wasm: ${c}`), Pa(c);
          }
        }
        async function Ta(a) {
          var b = Qa;
          if (!Da && !ya(b) && !da) try {
            var d = fetch(b, { credentials: "same-origin" });
            return await WebAssembly.instantiateStreaming(d, a);
          } catch (c) {
            E(`wasm streaming compile failed: ${c}`), E("falling back to ArrayBuffer instantiation");
          }
          return Sa(b, a);
        }
        class Va {
          name = "ExitStatus";
          constructor(a) {
            this.message = `Program terminated with exit(${a})`;
            this.status = a;
          }
        }
        var u, Oa = [], Ma = [], Xa = true, Ya = new TextDecoder(), Za = (a, b, d, c) => {
          d = b + d;
          if (c) return d;
          for (; a[b] && !(b >= d); ) ++b;
          return b;
        }, H, B = (a, b, d) => a ? Ya.decode(H.subarray(a, Za(H, a, b, d))) : "", $a = (a, b) => {
          for (var d = 0, c = a.length - 1; c >= 0; c--) {
            var e = a[c];
            e === "." ? a.splice(c, 1) : e === ".." ? (a.splice(c, 1), d++) : d && (a.splice(c, 1), d--);
          }
          if (b) for (; d; d--) a.unshift("..");
          return a;
        }, ab = (a) => {
          var b = a.charAt(0) === "/", d = a.slice(-1) === "/";
          (a = $a(a.split("/").filter((c) => !!c), !b).join("/")) || b || (a = ".");
          a && d && (a += "/");
          return (b ? "/" : "") + a;
        }, bb = (a) => {
          var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
          a = b[0];
          b = b[1];
          if (!a && !b) return ".";
          b &&= b.slice(0, -1);
          return a + b;
        }, cb = (a) => a && a.match(/([^\/]+|\/)\/*$/)[1], db = () => {
          if (da) {
            var a = require("node:crypto");
            return (b) => (a.randomFillSync(b), 0);
          }
          return (b) => (crypto.getRandomValues(b), 0);
        }, eb = (a) => (eb = db())(a), fb = (...a) => {
          for (var b = "", d = false, c = a.length - 1; c >= -1 && !d; c--) {
            d = c >= 0 ? a[c] : "/";
            if (typeof d != "string") throw new TypeError("Arguments to path.resolve must be strings");
            if (!d) return "";
            b = d + "/" + b;
            d = d.charAt(0) === "/";
          }
          b = $a(b.split("/").filter((e) => !!e), !d).join("/");
          return (d ? "/" : "") + b || ".";
        }, gb = (a) => {
          var b = Za(a, 0);
          return Ya.decode(a.buffer ? a.subarray(0, b) : new Uint8Array(a.slice(0, b)));
        }, hb = [], m = (a) => {
          for (var b = 0, d = 0; d < a.length; ++d) {
            var c = a.charCodeAt(d);
            c <= 127 ? b++ : c <= 2047 ? b += 2 : c >= 55296 && c <= 57343 ? (b += 4, ++d) : b += 3;
          }
          return b;
        }, M = (a, b, d, c) => {
          if (!(c > 0)) return 0;
          var e = d;
          c = d + c - 1;
          for (var g = 0; g < a.length; ++g) {
            var n = a.codePointAt(g);
            if (n <= 127) {
              if (d >= c) break;
              b[d++] = n;
            } else if (n <= 2047) {
              if (d + 1 >= c) break;
              b[d++] = 192 | n >> 6;
              b[d++] = 128 | n & 63;
            } else if (n <= 65535) {
              if (d + 2 >= c) break;
              b[d++] = 224 | n >> 12;
              b[d++] = 128 | n >> 6 & 63;
              b[d++] = 128 | n & 63;
            } else {
              if (d + 3 >= c) break;
              b[d++] = 240 | n >> 18;
              b[d++] = 128 | n >> 12 & 63;
              b[d++] = 128 | n >> 6 & 63;
              b[d++] = 128 | n & 63;
              g++;
            }
          }
          b[d] = 0;
          return d - e;
        }, ib = (a) => {
          var b = Array(m(a) + 1);
          a = M(a, b, 0, b.length);
          b.length = a;
          return b;
        }, jb = [];
        function kb(a, b) {
          jb[a] = { input: [], output: [], ib: b };
          lb(a, mb);
        }
        var mb = { open(a) {
          var b = jb[a.node.rdev];
          if (!b) throw new O(43);
          a.tty = b;
          a.seekable = false;
        }, close(a) {
          a.tty.ib.fsync(a.tty);
        }, fsync(a) {
          a.tty.ib.fsync(a.tty);
        }, read(a, b, d, c) {
          if (!a.tty || !a.tty.ib.Ib) throw new O(60);
          for (var e = 0, g = 0; g < c; g++) {
            try {
              var n = a.tty.ib.Ib(a.tty);
            } catch (r) {
              throw new O(29);
            }
            if (n === void 0 && !e) throw new O(6);
            if (n === null || n === void 0) break;
            e++;
            b[d + g] = n;
            if (n === 10) break;
          }
          e && (a.node.atime = Date.now());
          return e;
        }, write(a, b, d, c) {
          if (!a.tty || !a.tty.ib.yb) throw new O(60);
          try {
            for (var e = 0; e < c; e++) a.tty.ib.yb(
              a.tty,
              b[d + e]
            );
          } catch (g) {
            throw new O(29);
          }
          c && (a.node.mtime = a.node.ctime = Date.now());
          return e;
        } }, nb = {
          Ib() {
            a: {
              if (!hb.length) {
                var a = null;
                if (da) {
                  var b = Buffer.alloc(256), d = 0;
                  try {
                    d = fs.readSync(process.stdin.fd, b, 0, 256);
                  } catch (c) {
                    if (c.toString().includes("EOF")) d = 0;
                    else throw c;
                  }
                  d > 0 && (a = b.toString("utf-8", 0, d));
                } else globalThis.window?.prompt && (a = window.prompt("Input: "), a !== null && (a += "\n"));
                if (!a) {
                  a = null;
                  break a;
                }
                hb = ib(a);
              }
              a = hb.shift();
            }
            return a;
          },
          yb(a, b) {
            b === null || b === 10 ? (Ca(gb(a.output)), a.output = []) : b != 0 && a.output.push(b);
          },
          fsync(a) {
            a.output?.length > 0 && (Ca(gb(a.output)), a.output = []);
          },
          qc() {
            return { lc: 25856, nc: 5, kc: 191, mc: 35387, jc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
          },
          rc() {
            return 0;
          },
          sc() {
            return [24, 80];
          }
        }, ob = { yb(a, b) {
          b === null || b === 10 ? (E(gb(a.output)), a.output = []) : b != 0 && a.output.push(b);
        }, fsync(a) {
          a.output?.length > 0 && (E(gb(a.output)), a.output = []);
        } }, P = { Za: null, bb() {
          return P.createNode(null, "/", 16895, 0);
        }, createNode(a, b, d, c) {
          if ((d & 61440) === 24576 || (d & 61440) === 4096) throw new O(63);
          P.Za || (P.Za = { dir: { node: { Wa: P.Qa.Wa, $a: P.Qa.$a, lookup: P.Qa.lookup, lb: P.Qa.lb, rename: P.Qa.rename, unlink: P.Qa.unlink, rmdir: P.Qa.rmdir, readdir: P.Qa.readdir, symlink: P.Qa.symlink }, stream: { Ya: P.Pa.Ya } }, file: { node: { Wa: P.Qa.Wa, $a: P.Qa.$a }, stream: { Ya: P.Pa.Ya, read: P.Pa.read, write: P.Pa.write, mb: P.Pa.mb, nb: P.Pa.nb } }, link: { node: { Wa: P.Qa.Wa, $a: P.Qa.$a, readlink: P.Qa.readlink }, stream: {} }, Db: { node: { Wa: P.Qa.Wa, $a: P.Qa.$a }, stream: pb } });
          d = qb(a, b, d, c);
          Q(d.mode) ? (d.Qa = P.Za.dir.node, d.Pa = P.Za.dir.stream, d.Ta = {}) : (d.mode & 61440) === 32768 ? (d.Qa = P.Za.file.node, d.Pa = P.Za.file.stream, d.Va = 0, d.Ta = P.Ub ?? (P.Ub = new Uint8Array(0))) : (d.mode & 61440) === 40960 ? (d.Qa = P.Za.link.node, d.Pa = P.Za.link.stream) : (d.mode & 61440) === 8192 && (d.Qa = P.Za.Db.node, d.Pa = P.Za.Db.stream);
          d.atime = d.mtime = d.ctime = Date.now();
          a && (a.Ta[b] = d, a.atime = a.mtime = a.ctime = d.atime);
          return d;
        }, Qa: {
          Wa(a) {
            var b = {};
            b.dev = (a.mode & 61440) === 8192 ? a.id : 1;
            b.ino = a.id;
            b.mode = a.mode;
            b.nlink = 1;
            b.uid = 0;
            b.gid = 0;
            b.rdev = a.rdev;
            Q(a.mode) ? b.size = 4096 : (a.mode & 61440) === 32768 ? b.size = a.Va : (a.mode & 61440) === 40960 ? b.size = a.link.length : b.size = 0;
            b.atime = new Date(a.atime);
            b.mtime = new Date(a.mtime);
            b.ctime = new Date(a.ctime);
            b.atimeMs = a.atime;
            b.mtimeMs = a.mtime;
            b.ctimeMs = a.ctime;
            b.blksize = 4096;
            b.blocks = Math.ceil(b.size / b.blksize);
            return b;
          },
          $a(a, b) {
            for (var d of ["mode", "atime", "mtime", "ctime"]) b[d] != null && (a[d] = b[d]);
            b.size !== void 0 && (b = b.size, a.Va != b && (d = a.Ta, a.Ta = new Uint8Array(b), a.Ta.set(d.subarray(0, Math.min(b, a.Va))), a.Va = b));
          },
          lookup() {
            P.rb || (P.rb = new O(44), P.rb.stack = "<generic error, no stack>");
            throw P.rb;
          },
          lb(a, b, d, c) {
            return P.createNode(a, b, d, c);
          },
          rename(a, b, d) {
            try {
              var c = rb(b, d);
            } catch (g) {
            }
            if (c && Q(a.mode)) for (var e in c.Ta) throw new O(55);
            delete a.parent.Ta[a.name];
            b.Ta[d] = a;
            a.name = d;
            b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
          },
          unlink(a, b) {
            delete a.Ta[b];
            a.ctime = a.mtime = Date.now();
          },
          rmdir(a, b) {
            var d = rb(a, b), c;
            for (c in d.Ta) throw new O(55);
            delete a.Ta[b];
            a.ctime = a.mtime = Date.now();
          },
          readdir(a) {
            return [".", "..", ...Object.keys(a.Ta)];
          },
          symlink(a, b, d) {
            a = P.createNode(a, b, 41471, 0);
            a.link = d;
            return a;
          },
          readlink(a) {
            if ((a.mode & 61440) !== 40960) throw new O(28);
            return a.link;
          }
        }, Pa: { read(a, b, d, c, e) {
          if (e >= a.node.Va) return 0;
          c = Math.min(a.node.Va - e, c);
          b.set(a.node.Ta.subarray(e, e + c), d);
          return c;
        }, write(a, b, d, c, e, g) {
          b.buffer === u.buffer && (g = false);
          if (!c) return 0;
          a = a.node;
          a.mtime = a.ctime = Date.now();
          if (g) a.Ta = b.subarray(d, d + c), a.Va = c;
          else if (a.Va || e) {
            g = e + c;
            var n = a.Ta.length;
            n >= g || (g = Math.max(g, n * (n < 1048576 ? 2 : 1.125) >>> 0), n && (g = Math.max(g, 256)), n = a.Ta.subarray(0, a.Va), a.Ta = new Uint8Array(g), a.Ta.set(n));
            a.Ta.set(b.subarray(
              d,
              d + c
            ), e);
            a.Va = Math.max(a.Va, e + c);
          } else a.Ta = b.slice(d, d + c), a.Va = c;
          return c;
        }, Ya(a, b, d) {
          d === 1 ? b += a.position : d === 2 && (a.node.mode & 61440) === 32768 && (b += a.node.Va);
          if (b < 0) throw new O(28);
          return b;
        }, mb(a, b, d, c, e) {
          if ((a.node.mode & 61440) !== 32768) throw new O(43);
          a = a.node.Ta;
          if (e & 2 || a.buffer !== u.buffer) {
            e = true;
            c = Math.ceil(b / 65536) * 65536;
            var g = sb(65536, c);
            g && H.fill(0, g, g + c);
            c = g;
            if (!c) throw new O(48);
            if (a) {
              if (d > 0 || d + b < a.length) a.subarray ? a = a.subarray(d, d + b) : a = Array.prototype.slice.call(a, d, d + b);
              u.set(a, c);
            }
          } else e = false, c = a.byteOffset;
          return { ec: c, Lb: e };
        }, nb(a, b, d, c) {
          P.Pa.write(a, b, 0, c, d, false);
          return 0;
        } } }, wb = (a, b) => {
          var d = 0;
          a && (d |= 365);
          b && (d |= 146);
          return d;
        }, Cb = null, Db = {}, Eb = [], Fb = 1, R = [], Gb = false, Hb = true, Ib = {}, O = class {
          name = "ErrnoError";
          constructor(a) {
            this.Ra = a;
          }
        }, Jb = class {
          shared = {};
          node = null;
          get flags() {
            return this.shared.flags;
          }
          set flags(a) {
            this.shared.flags = a;
          }
          get position() {
            return this.shared.position;
          }
          set position(a) {
            this.shared.position = a;
          }
        }, Kb = class {
          Qa = {};
          Pa = {};
          gb = null;
          listeners = null;
          zb = 0;
          constructor(a, b, d, c) {
            a ||= this;
            this.parent = a;
            this.bb = a.bb;
            this.id = Fb++;
            this.name = b;
            this.mode = d;
            this.rdev = c;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & 365) === 365;
          }
          set read(a) {
            a ? this.mode |= 365 : this.mode &= -366;
          }
          get write() {
            return (this.mode & 146) === 146;
          }
          set write(a) {
            a ? this.mode |= 146 : this.mode &= -147;
          }
          dc() {
            if (this.listeners) {
              var a;
              for (b of this.listeners) b.exclusive ? (a ||= []).push(b) : b.Qb(32);
              if (a) {
                var b = (this.zb || 0) % a.length;
                this.zb = b + 1;
                a[b].Qb(32);
              }
            }
          }
        };
        function C(a, b = {}) {
          if (!a) throw new O(44);
          b.sb ?? (b.sb = true);
          a.charAt(0) === "/" || (a = "//" + a);
          var d = 0;
          a: for (; d < 40; d++) {
            a = a.split("/").filter((r) => !!r);
            for (var c = Cb, e = "/", g = 0; g < a.length; g++) {
              var n = g === a.length - 1;
              if (n && b.parent) break;
              if (a[g] !== ".") if (a[g] === "..") if (e = bb(e), c === c.parent) {
                a = e + "/" + a.slice(g + 1).join("/");
                d--;
                continue a;
              } else c = c.parent;
              else {
                e = ab(e + "/" + a[g]);
                try {
                  c = rb(c, a[g]);
                } catch (r) {
                  if (r?.Ra === 44 && n && b.cc) return { path: e };
                  throw r;
                }
                !c.gb || n && !b.sb || (c = c.gb.root);
                if ((c.mode & 61440) === 40960 && (!n || b.fb)) {
                  if (!c.Qa.readlink) throw new O(52);
                  c = c.Qa.readlink(c);
                  c.charAt(0) === "/" || (c = bb(e) + "/" + c);
                  a = c + "/" + a.slice(g + 1).join("/");
                  continue a;
                }
              }
            }
            return { path: e, node: c };
          }
          throw new O(32);
        }
        function Lb(a) {
          for (var b; ; ) {
            if (a === a.parent) return a = a.bb.Kb, b ? a[a.length - 1] !== "/" ? `${a}/${b}` : a + b : a;
            b = b ? `${a.name}/${b}` : a.name;
            a = a.parent;
          }
        }
        function Mb(a, b) {
          for (var d = 0, c = 0; c < b.length; c++) d = (d << 5) - d + b.charCodeAt(c) | 0;
          return (a + d >>> 0) % R.length;
        }
        function Nb(a) {
          var b = Mb(a.parent.id, a.name);
          if (R[b] === a) R[b] = a.hb;
          else for (b = R[b]; b; ) {
            if (b.hb === a) {
              b.hb = a.hb;
              break;
            }
            b = b.hb;
          }
        }
        function rb(a, b) {
          var d = Q(a.mode) ? (d = Ob(a, "x")) ? d : a.Qa.lookup ? 0 : 2 : 54;
          if (d) throw new O(d);
          for (d = R[Mb(a.id, b)]; d; d = d.hb) {
            var c = d.name;
            if (d.parent.id === a.id && c === b) return d;
          }
          return a.Qa.lookup(a, b);
        }
        function qb(a, b, d, c) {
          a = new Kb(a, b, d, c);
          b = Mb(a.parent.id, a.name);
          a.hb = R[b];
          return R[b] = a;
        }
        function Q(a) {
          return (a & 61440) === 16384;
        }
        function Ob(a, b) {
          return Hb ? 0 : b.includes("r") && !(a.mode & 292) || b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73) ? 2 : 0;
        }
        function Pb(a, b) {
          if (!Q(a.mode)) return 54;
          try {
            return rb(a, b), 20;
          } catch (d) {
          }
          return Ob(a, "wx");
        }
        function Qb(a, b, d) {
          try {
            var c = rb(a, b);
          } catch (e) {
            return e.Ra;
          }
          if (a = Ob(a, "wx")) return a;
          if (d) {
            if (!Q(c.mode)) return 54;
            if (c === c.parent || Lb(c) === "/") return 10;
          } else if (Q(c.mode)) return 31;
          return 0;
        }
        function Rb(a) {
          if (!a) throw new O(63);
          return a;
        }
        function V(a) {
          a = Eb[a];
          if (!a) throw new O(8);
          return a;
        }
        function Sb(a, b = -1) {
          a = Object.assign(new Jb(), a);
          if (b == -1) a: {
            for (b = 0; b <= 4096; b++) if (!Eb[b]) break a;
            throw new O(33);
          }
          a.fd = b;
          return Eb[b] = a;
        }
        function Tb(a, b = -1) {
          a = Sb(a, b);
          a.Pa?.oc?.(a);
          return a;
        }
        function Ub(a, b, d) {
          var c = a?.Pa.$a;
          a = c ? a : b;
          c ??= b.Qa.$a;
          Rb(c);
          try {
            c(a, d);
          } catch (e) {
            if (e instanceof RangeError) throw new O(22);
            throw e;
          }
        }
        var pb = { open(a) {
          a.Pa = Db[a.node.rdev].Pa;
          a.Pa.open?.(a);
        }, Ya() {
          throw new O(70);
        } };
        function lb(a, b) {
          Db[a] = { Pa: b };
        }
        function Vb(a, b) {
          var d = b === "/";
          if (d && Cb) throw new O(10);
          if (!d && b) {
            var c = C(b, { sb: false });
            b = c.path;
            c = c.node;
            if (c.gb) throw new O(10);
            if (!Q(c.mode)) throw new O(54);
          }
          b = { type: a, tc: {}, Kb: b, bc: [] };
          a = a.bb(b);
          a.bb = b;
          b.root = a;
          d ? Cb = a : c && (c.gb = b, c.bb && c.bb.bc.push(b));
        }
        function Wb(a, b, d) {
          var c = C(a, { parent: true }).node;
          a = cb(a);
          if (!a) throw new O(28);
          if (a === "." || a === "..") throw new O(20);
          var e = Pb(c, a);
          if (e) throw new O(e);
          if (!c.Qa.lb) throw new O(63);
          return c.Qa.lb(c, a, b, d);
        }
        function Xb(a, b = 438) {
          return Wb(a, b & 4095 | 32768, 0);
        }
        function W(a, b = 511) {
          return Wb(a, b & 1023 | 16384, 0);
        }
        function Yb(a, b, d) {
          typeof d == "undefined" && (d = b, b = 438);
          Wb(a, b | 8192, d);
        }
        function Zb(a, b) {
          if (!fb(a)) throw new O(44);
          var d = C(b, { parent: true }).node;
          if (!d) throw new O(44);
          b = cb(b);
          var c = Pb(d, b);
          if (c) throw new O(c);
          if (!d.Qa.symlink) throw new O(63);
          d.Qa.symlink(d, b, a);
        }
        function $b(a) {
          var b = C(a, { parent: true }).node;
          a = cb(a);
          var d = rb(b, a), c = Qb(b, a, true);
          if (c) throw new O(c);
          if (!b.Qa.rmdir) throw new O(63);
          if (d.gb) throw new O(10);
          b.Qa.rmdir(b, a);
          Nb(d);
        }
        function qa(a) {
          var b = C(a, { parent: true }).node;
          if (!b) throw new O(44);
          a = cb(a);
          var d = rb(b, a), c = Qb(b, a, false);
          if (c) throw new O(c);
          if (!b.Qa.unlink) throw new O(63);
          if (d.gb) throw new O(10);
          b.Qa.unlink(b, a);
          Nb(d);
        }
        function ac(a, b = false) {
          a = C(a, { fb: !b }).node;
          return Rb(a.Qa.Wa)(a);
        }
        function bc(a, b, d) {
          Ub(a, b, { mode: d & 4095 | b.mode & -4096, ctime: Date.now(), Eb: false });
        }
        function cc(a, b) {
          a = typeof a == "string" ? C(a, { fb: true }).node : a;
          bc(null, a, b);
        }
        function dc(a, b, d) {
          if (Q(b.mode)) throw new O(31);
          if ((b.mode & 61440) !== 32768) throw new O(28);
          var c = Ob(b, "w");
          if (c) throw new O(c);
          Ub(a, b, { size: d, timestamp: Date.now() });
        }
        function ec(a, b, d, c = false) {
          a = C(a, { fb: !c });
          Ub(null, a.node, { atime: b, mtime: d, Eb: c });
        }
        function fc(a, b, d = 438) {
          if (a === "") throw new O(44);
          if (typeof b == "string") {
            var c = { r: 0, "r+": 2, w: 577, "w+": 578, a: 1089, "a+": 1090 }[b];
            if (typeof c == "undefined") throw Error(`Unknown file open mode: ${b}`);
            b = c;
          }
          d = b & 64 ? d & 4095 | 32768 : 0;
          if (typeof a == "object") c = a;
          else {
            var e = a.endsWith("/");
            a = C(a, { fb: !(b & 131072), cc: true });
            c = a.node;
            a = a.path;
          }
          var g = false;
          if (b & 64) if (c) {
            if (b & 128) throw new O(20);
          } else {
            if (e) throw new O(31);
            c = Wb(a, d | 511, 0);
            g = true;
          }
          if (!c) throw new O(44);
          (c.mode & 61440) === 8192 && (b &= -513);
          if (b & 65536 && !Q(c.mode)) throw new O(54);
          if (!g && (c ? (c.mode & 61440) === 40960 ? e = 32 : (e = ["r", "w", "rw"][b & 3], b & 512 && (e += "w"), e = Q(c.mode) && (e !== "r" || b & 576) ? 31 : Ob(c, e)) : e = 44, e)) throw new O(e);
          b & 512 && !g && (e = c, e = typeof e == "string" ? C(e, { fb: true }).node : e, dc(null, e, 0));
          b &= -131713;
          e = Sb({ node: c, path: Lb(c), flags: b, seekable: true, position: 0, Pa: c.Pa, fc: [], error: false });
          e.Pa.open && e.Pa.open(e);
          g && cc(c, d & 511);
          !k.logReadFiles || b & 1 || a in Ib || (Ib[a] = 1, E(`read file: ${a}`));
          return e;
        }
        function hc(a) {
          if (a.fd === null) throw new O(8);
          a.ub && (a.ub = null);
          a.node?.dc();
          try {
            a.Pa.close && a.Pa.close(a);
          } catch (b) {
            throw b;
          } finally {
            Eb[a.fd] = null;
          }
          a.fd = null;
        }
        function ic(a, b, d) {
          if (a.fd === null) throw new O(8);
          if (!a.seekable || !a.Pa.Ya) throw new O(70);
          if (d != 0 && d != 1 && d != 2) throw new O(28);
          a.position = a.Pa.Ya(a, b, d);
          a.fc = [];
        }
        function jc(a, b, d, c, e) {
          if (c < 0 || e < 0) throw new O(28);
          if (a.fd === null) throw new O(8);
          if ((a.flags & 2097155) === 0) throw new O(8);
          if (Q(a.node.mode)) throw new O(31);
          if (!a.Pa.write) throw new O(28);
          a.seekable && a.flags & 1024 && ic(a, 0, 2);
          var g = typeof e != "undefined";
          if (!g) e = a.position;
          else if (!a.seekable) throw new O(70);
          b = a.Pa.write(a, b, d, c, e, void 0);
          g || (a.position += b);
          return b;
        }
        function Jc() {
          var a, b, d;
          Gb = true;
          a ??= k.stdin;
          b ??= k.stdout;
          d ??= k.stderr;
          a ? X("stdin", a) : Zb("/dev/tty", "/dev/stdin");
          b ? X("stdout", null, b) : Zb("/dev/tty", "/dev/stdout");
          d ? X("stderr", null, d) : Zb("/dev/tty1", "/dev/stderr");
          fc("/dev/stdin", 0);
          fc("/dev/stdout", 1);
          fc("/dev/stderr", 1);
        }
        function ja(a, b) {
          var d = "/", c = a;
          d && (d = typeof d == "string" ? d : Lb(d), c = a ? ab(d + "/" + a) : d);
          a = wb(true, true);
          c = Xb(c, a);
          b && (typeof b == "string" && (b = ib(b)), b.subarray || (b = new Uint8Array(b)), cc(c, a | 146), d = fc(c, 577), jc(d, b, 0, b.length, 0), hc(d), cc(c, a));
        }
        function X(a, b, d) {
          a = ab("/dev/" + a);
          var c = wb(!!b, !!d);
          X.Jb ?? (X.Jb = 64);
          var e = X.Jb++ << 8 | 0;
          lb(e, { open(g) {
            g.seekable = false;
          }, close() {
            d?.buffer?.length && d(10);
          }, read(g, n, r, v) {
            for (var l = 0, z = 0; z < v; z++) {
              try {
                var F = b();
              } catch (ba) {
                throw new O(29);
              }
              if (F === void 0 && !l) throw new O(6);
              if (F === null || F === void 0) break;
              l++;
              n[r + z] = F;
            }
            l && (g.node.atime = Date.now());
            return l;
          }, write(g, n, r, v) {
            for (var l = 0; l < v; l++) try {
              d(n[r + l]);
            } catch (z) {
              throw new O(29);
            }
            v && (g.node.mtime = g.node.ctime = Date.now());
            return l;
          } });
          Yb(a, c, e);
        }
        var Y = {}, I, J, L;
        function Kc(a, b, d = false) {
          if (b.charAt(0) === "/") return b;
          a = a === -100 ? "/" : V(a).path;
          if (b.length == 0) {
            if (!d) throw new O(44);
            return a;
          }
          return a + "/" + b;
        }
        function Lc(a, b) {
          J[a >> 2] = b.dev;
          J[a + 4 >> 2] = b.mode;
          J[a + 8 >> 2] = b.nlink;
          J[a + 12 >> 2] = b.uid;
          J[a + 16 >> 2] = b.gid;
          J[a + 20 >> 2] = b.rdev;
          L[a + 24 >> 3] = BigInt(b.size);
          I[a + 32 >> 2] = 4096;
          I[a + 36 >> 2] = b.blocks;
          var d = b.atimeMs ?? b.atime.getTime(), c = b.mtimeMs ?? b.mtime.getTime(), e = b.ctimeMs ?? b.ctime.getTime();
          L[a + 40 >> 3] = BigInt(Math.floor(d / 1e3));
          J[a + 48 >> 2] = Math.floor(d % 1e3 * 1e6);
          L[a + 56 >> 3] = BigInt(Math.floor(c / 1e3));
          J[a + 64 >> 2] = Math.floor(c % 1e3 * 1e6);
          L[a + 72 >> 3] = BigInt(Math.floor(e / 1e3));
          J[a + 80 >> 2] = Math.floor(e % 1e3 * 1e6);
          L[a + 88 >> 3] = BigInt(b.ino);
          return 0;
        }
        var Mc = void 0, Nc = () => {
          var a = I[+Mc >> 2];
          Mc += 4;
          return a;
        }, Ia, Oc = 0, Pc = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335], Qc = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334], Rc = {}, Sc = (a) => {
          Fa = a;
          Xa || Oc > 0 || (k.onExit?.(a), Ea = true);
          ta(a, new Va(a));
        }, Tc = {}, Vc = () => {
          if (!Uc) {
            var a = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8", _: sa }, b;
            for (b in Tc) Tc[b] === void 0 ? delete a[b] : a[b] = Tc[b];
            var d = [];
            for (b in a) d.push(`${b}=${a[b]}`);
            Uc = d;
          }
          return Uc;
        }, Uc, Ja, Ka;
        function A(a, b = "i8") {
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              return u[a];
            case "i8":
              return u[a];
            case "i16":
              return Ia[a >> 1];
            case "i32":
              return I[a >> 2];
            case "i64":
              return L[a >> 3];
            case "float":
              return Ja[a >> 2];
            case "double":
              return Ka[a >> 3];
            case "*":
              return J[a >> 2];
            default:
              Pa(`invalid type for getValue: ${b}`);
          }
        }
        function oa(a) {
          var b = "i32";
          b.endsWith("*") && (b = "*");
          switch (b) {
            case "i1":
              u[a] = 0;
              break;
            case "i8":
              u[a] = 0;
              break;
            case "i16":
              Ia[a >> 1] = 0;
              break;
            case "i32":
              I[a >> 2] = 0;
              break;
            case "i64":
              L[a >> 3] = BigInt(0);
              break;
            case "float":
              Ja[a >> 2] = 0;
              break;
            case "double":
              Ka[a >> 3] = 0;
              break;
            case "*":
              J[a >> 2] = 0;
              break;
            default:
              Pa(`invalid type for setValue: ${b}`);
          }
        }
        var Wc = (a, b, d, c) => {
          var e = { string: (l) => {
            var z = 0;
            if (l !== null && l !== void 0 && l !== 0) {
              z = m(l) + 1;
              var F = la(z);
              M(l, H, F, z);
              z = F;
            }
            return z;
          }, array: (l) => {
            var z = la(l.length);
            u.set(l, z);
            return z;
          } };
          a = k["_" + a];
          var g = [], n = 0;
          if (c) for (var r = 0; r < c.length; r++) {
            var v = e[d[r]];
            v ? (n ||= na(), g[r] = v(c[r])) : g[r] = c[r];
          }
          d = a(...g);
          return d = (function(l) {
            n && pa(n);
            return b === "string" ? B(l) : b === "boolean" ? !!l : l;
          })(d);
        }, fa = (a) => {
          var b = m(a) + 1, d = ea(b);
          d && M(a, H, d, b);
          return d;
        }, Xc, Yc = [], ka = (a) => {
          Xc.delete(Z.get(a));
          Z.set(a, null);
          Yc.push(a);
        }, Zc = (a) => {
          var b = a.length;
          return [b % 128 | 128, b >> 7, ...a];
        }, $c = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, ad = (a) => Zc(Array.from(a, (b) => $c[b])), ra = (a, b) => {
          if (!Xc) {
            Xc = /* @__PURE__ */ new WeakMap();
            var d = Z.length;
            if (Xc) for (var c = 0; c < 0 + d; c++) {
              var e = Z.get(c);
              e && Xc.set(e, c);
            }
          }
          if (d = Xc.get(a) || 0) return d;
          d = Yc.length ? Yc.pop() : Z.grow(1);
          try {
            Z.set(d, a);
          } catch (g) {
            if (!(g instanceof TypeError)) throw g;
            b = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...Zc([1, 96, ...ad(b.slice(1)), ...ad(b[0] === "v" ? "" : b[0])]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
            b = new WebAssembly.Module(b);
            b = new WebAssembly.Instance(
              b,
              { e: { f: a } }
            ).exports.f;
            Z.set(d, b);
          }
          Xc.set(a, d);
          return d;
        };
        R.length = 4096;
        Vb(P, "/");
        W("/tmp");
        W("/home");
        W("/home/web_user");
        (function() {
          W("/dev");
          lb(259, { read: () => 0, write: (c, e, g, n) => n, Ya: () => 0 });
          Yb("/dev/null", 259);
          kb(1280, nb);
          kb(1536, ob);
          Yb("/dev/tty", 1280);
          Yb("/dev/tty1", 1536);
          var a = new Uint8Array(1024), b = 0, d = () => {
            b || (eb(a), b = a.byteLength);
            return a[--b];
          };
          X("random", d);
          X("urandom", d);
          W("/dev/shm");
          W("/dev/shm/tmp");
        })();
        (function() {
          W("/proc");
          var a = W("/proc/self");
          W("/proc/self/fd");
          Vb({ bb() {
            var b = qb(a, "fd", 16895, 73);
            b.Pa = { Ya: P.Pa.Ya };
            b.Qa = { lookup(d, c) {
              d = +c;
              var e = V(d);
              d = { parent: null, bb: { Kb: "fake" }, Qa: { readlink: () => e.path }, id: d + 1 };
              return d.parent = d;
            }, readdir() {
              return Array.from(Eb.entries()).filter(([, d]) => d).map(([d]) => d.toString());
            } };
            return b;
          } }, "/proc/self/fd");
        })();
        k.noExitRuntime && (Xa = k.noExitRuntime);
        k.print && (Ca = k.print);
        k.printErr && (E = k.printErr);
        k.wasmBinary && (Da = k.wasmBinary);
        k.thisProgram && (sa = k.thisProgram);
        var bd = k.preInit;
        if (bd) for (typeof bd == "function" && (k.preInit = bd = [bd]); bd.length > 0; ) bd.shift()();
        k.stackSave = () => na();
        k.stackRestore = (a) => pa(a);
        k.stackAlloc = (a) => la(a);
        k.cwrap = (a, b, d, c) => {
          var e = !d || d.every((g) => g === "number" || g === "boolean");
          return b !== "string" && e && !c ? k["_" + a] : (...g) => Wc(a, b, d, g);
        };
        k.addFunction = ra;
        k.removeFunction = ka;
        k.UTF8ToString = B;
        k.lengthBytesUTF8 = m;
        k.stringToNewUTF8 = fa;
        k.writeArrayToMemory = (a, b) => {
          u.set(a, b);
        };
        var ea, y, sb, cd, pa, la, na, Ha, Z, dd = {
          a: (a, b, d, c) => Pa(`Assertion failed: ${B(a)}, at: ` + [b ? B(b) : "unknown filename", d, c ? B(c) : "unknown function"]),
          i: function(a, b) {
            try {
              return a = B(a), cc(a, b), 0;
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return -d.Ra;
            }
          },
          M: function(a, b, d) {
            try {
              b = B(b);
              b = Kc(a, b);
              if (d & -8) return -28;
              var c = C(b, { fb: true }).node;
              if (!c) return -44;
              a = "";
              d & 4 && (a += "r");
              d & 2 && (a += "w");
              d & 1 && (a += "x");
              return a && Ob(c, a) ? -2 : 0;
            } catch (e) {
              if (typeof Y == "undefined" || e.name !== "ErrnoError") throw e;
              return -e.Ra;
            }
          },
          j: function(a, b) {
            try {
              var d = V(a);
              bc(d, d.node, b);
              return 0;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return -c.Ra;
            }
          },
          h: function(a) {
            try {
              var b = V(a);
              Ub(b, b.node, { timestamp: Date.now(), Eb: false });
              return 0;
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return -d.Ra;
            }
          },
          b: function(a, b, d) {
            Mc = d;
            try {
              var c = V(a);
              switch (b) {
                case 0:
                  var e = Nc();
                  if (e < 0) break;
                  for (; Eb[e]; ) e++;
                  return Tb(c, e).fd;
                case 1:
                case 2:
                  return 0;
                case 3:
                  return c.flags;
                case 4:
                  return e = Nc(), c.flags = c.flags & -289793 | e & 289792, 0;
                case 12:
                  return e = Nc(), Ia[e + 0 >> 1] = 2, 0;
                case 13:
                case 14:
                  return 0;
              }
              return -28;
            } catch (g) {
              if (typeof Y == "undefined" || g.name !== "ErrnoError") throw g;
              return -g.Ra;
            }
          },
          g: function(a, b) {
            try {
              var d = V(a), c = d.node, e = d.Pa.Wa;
              a = e ? d : c;
              e ??= c.Qa.Wa;
              Rb(e);
              var g = e(a);
              return Lc(b, g);
            } catch (n) {
              if (typeof Y == "undefined" || n.name !== "ErrnoError") throw n;
              return -n.Ra;
            }
          },
          I: function(a, b) {
            b = b < -9007199254740992 || b > 9007199254740992 ? NaN : Number(b);
            try {
              if (isNaN(b)) return -22;
              var d = V(a);
              if (b < 0 || (d.flags & 2097155) === 0) throw new O(28);
              dc(
                d,
                d.node,
                b
              );
              return 0;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return -c.Ra;
            }
          },
          H: function(a, b) {
            try {
              if (!b) return -28;
              var d = m("/") + 1;
              if (b < d) return -68;
              M("/", H, a, b);
              return d;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return -c.Ra;
            }
          },
          E: () => 0,
          L: function(a, b) {
            try {
              return a = B(a), Lc(b, ac(a, true));
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return -d.Ra;
            }
          },
          C: function(a, b, d) {
            try {
              return b = B(b), b = Kc(a, b), W(b, d & -19), 0;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return -c.Ra;
            }
          },
          K: function(a, b, d, c) {
            try {
              b = B(b);
              var e = c & 256;
              b = Kc(a, b, c & 4096);
              return Lc(d, e ? ac(b, true) : ac(b));
            } catch (g) {
              if (typeof Y == "undefined" || g.name !== "ErrnoError") throw g;
              return -g.Ra;
            }
          },
          x: function(a, b, d, c) {
            Mc = c;
            try {
              b = B(b);
              b = Kc(a, b);
              var e = c ? Nc() : 0;
              d & 64 && (e &= -19);
              return fc(b, d, e).fd;
            } catch (g) {
              if (typeof Y == "undefined" || g.name !== "ErrnoError") throw g;
              return -g.Ra;
            }
          },
          s: function(a, b, d, c) {
            try {
              b = B(b);
              b = Kc(a, b);
              if (c <= 0) return -28;
              var e = C(b).node;
              if (!e) throw new O(44);
              if (!e.Qa.readlink) throw new O(28);
              var g = e.Qa.readlink(e);
              var n = Math.min(c, m(g)), r = u[d + n];
              M(g, H, d, c + 1);
              u[d + n] = r;
              return n;
            } catch (v) {
              if (typeof Y == "undefined" || v.name !== "ErrnoError") throw v;
              return -v.Ra;
            }
          },
          r: function(a) {
            try {
              return a = B(a), $b(a), 0;
            } catch (b) {
              if (typeof Y == "undefined" || b.name !== "ErrnoError") throw b;
              return -b.Ra;
            }
          },
          f: function(a, b) {
            try {
              return a = B(a), Lc(b, ac(a));
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return -d.Ra;
            }
          },
          o: function(a, b, d) {
            try {
              b = B(b);
              b = Kc(a, b);
              if (d) if (d === 512) $b(b);
              else return -28;
              else qa(b);
              return 0;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return -c.Ra;
            }
          },
          n: function(a, b, d, c) {
            try {
              c &= 256;
              b = B(b);
              b = Kc(a, b, true);
              var e = Date.now();
              if (d) {
                let r2 = function(v) {
                  var l = I[v + 8 >> 2];
                  return l == 1073741823 ? e : l == 1073741822 ? null : (J[v >> 2] + I[v + 4 >> 2] * 4294967296 + (l / 1e4 | 0) * 1e4 / 1e9) * 1e3;
                };
                var r = r2;
                var g = r2(d);
                var n = r2(d + 16);
              } else n = g = e;
              (n ?? g) !== null && ec(b, g, n, c);
              return 0;
            } catch (r2) {
              if (typeof Y == "undefined" || r2.name !== "ErrnoError") throw r2;
              return -r2.Ra;
            }
          },
          w: () => Pa(""),
          v: () => {
            Xa = false;
            Oc = 0;
          },
          A: function(a, b) {
            a = a < -9007199254740992 || a > 9007199254740992 ? NaN : Number(a);
            a = new Date(a * 1e3);
            if (isNaN(a.getTime())) return 1;
            I[b >> 2] = a.getSeconds();
            I[b + 4 >> 2] = a.getMinutes();
            I[b + 8 >> 2] = a.getHours();
            I[b + 12 >> 2] = a.getDate();
            I[b + 16 >> 2] = a.getMonth();
            I[b + 20 >> 2] = a.getFullYear() - 1900;
            I[b + 24 >> 2] = a.getDay();
            var d = a.getFullYear();
            I[b + 28 >> 2] = (d % 4 !== 0 || d % 100 === 0 && d % 400 !== 0 ? Qc : Pc)[a.getMonth()] + a.getDate() - 1 | 0;
            I[b + 36 >> 2] = -(a.getTimezoneOffset() * 60);
            d = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var c = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            I[b + 32 >> 2] = (d != c && a.getTimezoneOffset() == Math.min(c, d)) | 0;
            return 0;
          },
          y: function(a, b, d, c, e, g, n) {
            e = e < -9007199254740992 || e > 9007199254740992 ? NaN : Number(e);
            try {
              var r = V(c);
              if (b & 2 && !(d & 2) && (r.flags & 2097155) !== 2) throw new O(2);
              if ((r.flags & 2097155) === 1) throw new O(2);
              if (!r.Pa.mb) throw new O(43);
              if (!a) throw new O(28);
              var v = r.Pa.mb(r, a, e, b, d);
              var l = v.ec;
              I[g >> 2] = v.Lb;
              J[n >> 2] = l;
              return 0;
            } catch (z) {
              if (typeof Y == "undefined" || z.name !== "ErrnoError") throw z;
              return -z.Ra;
            }
          },
          z: function(a, b, d, c, e, g) {
            g = g < -9007199254740992 || g > 9007199254740992 ? NaN : Number(g);
            try {
              var n = V(e);
              if (d & 2) {
                if ((n.node.mode & 61440) !== 32768) throw new O(43);
                c & 2 || n.Pa.nb && n.Pa.nb(n, H.subarray(a, a + b), g, b, c);
              }
            } catch (r) {
              if (typeof Y == "undefined" || r.name !== "ErrnoError") throw r;
              return -r.Ra;
            }
          },
          k: (a, b) => {
            Rc[a] && (clearTimeout(Rc[a].id), delete Rc[a]);
            if (!b) return 0;
            var d = setTimeout(() => {
              delete Rc[a];
              var c = [a, performance.now()], e = cd;
              if (!Ea) try {
                e(...c);
              } catch (g) {
                g instanceof Va || g == "unwind" || ta(1, g);
              } finally {
                if (!(Xa || Oc > 0)) try {
                  Fa = c = Fa, Sc(c);
                } catch (g) {
                  g instanceof Va || g == "unwind" || ta(
                    1,
                    g
                  );
                }
              }
            }, b);
            Rc[a] = { id: d, uc: b };
            return 0;
          },
          B: (a, b, d, c) => {
            var e = (/* @__PURE__ */ new Date()).getFullYear(), g = new Date(e, 0, 1).getTimezoneOffset();
            e = new Date(e, 6, 1).getTimezoneOffset();
            J[a >> 2] = Math.max(g, e) * 60;
            I[b >> 2] = Number(g != e);
            b = (n) => {
              var r = Math.abs(n);
              return `UTC${n >= 0 ? "-" : "+"}${String(Math.floor(r / 60)).padStart(2, "0")}${String(r % 60).padStart(2, "0")}`;
            };
            a = b(g);
            b = b(e);
            e < g ? (M(a, H, d, 17), M(b, H, c, 17)) : (M(a, H, c, 17), M(b, H, d, 17));
          },
          d: () => Date.now(),
          p: () => 2147483648,
          c: () => performance.now(),
          l: (a) => {
            var b = H.length;
            a >>>= 0;
            if (a > 2147483648) return false;
            for (var d = 1; d <= 4; d *= 2) {
              var c = b * (1 + 0.2 / d);
              c = Math.min(c, a + 100663296);
              a: {
                c = (Math.min(2147483648, Math.ceil(Math.max(a, c) / 65536) * 65536) - Ha.buffer.byteLength + 65535) / 65536 | 0;
                try {
                  Ha.grow(c);
                  Ga();
                  var e = 1;
                  break a;
                } catch (g) {
                }
                e = void 0;
              }
              if (e) return true;
            }
            return false;
          },
          F: (a, b) => {
            var d = 0, c = 0, e;
            for (e of Vc()) {
              var g = b + d;
              J[a + c >> 2] = g;
              d += M(e, H, g, Infinity) + 1;
              c += 4;
            }
            return 0;
          },
          G: (a, b) => {
            var d = Vc();
            J[a >> 2] = d.length;
            a = 0;
            for (var c of d) a += m(c) + 1;
            J[b >> 2] = a;
            return 0;
          },
          e: function(a) {
            try {
              var b = V(a);
              hc(b);
              return 0;
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return d.Ra;
            }
          },
          m: function(a, b) {
            try {
              var d = V(a);
              u[b] = d.tty ? 2 : Q(d.mode) ? 3 : (d.mode & 61440) === 40960 ? 7 : 4;
              Ia[b + 2 >> 1] = 0;
              L[b + 8 >> 3] = BigInt(0);
              L[b + 16 >> 3] = BigInt(0);
              return 0;
            } catch (c) {
              if (typeof Y == "undefined" || c.name !== "ErrnoError") throw c;
              return c.Ra;
            }
          },
          t: function(a, b, d, c) {
            try {
              a: {
                var e = V(a);
                a = b;
                for (var g, n = b = 0; n < d; n++) {
                  var r = J[a >> 2], v = J[a + 4 >> 2];
                  a += 8;
                  try {
                    var l = e, z = r, F = v, ba = g, za = u;
                    if (F < 0 || ba < 0) throw new O(28);
                    if (l.fd === null) throw new O(8);
                    if ((l.flags & 2097155) === 1) throw new O(8);
                    if (Q(l.node.mode)) throw new O(31);
                    if (!l.Pa.read) throw new O(28);
                    var ma = typeof ba != "undefined";
                    if (!ma) ba = l.position;
                    else if (!l.seekable) throw new O(70);
                    var Aa = l.Pa.read(l, za, z, F, ba);
                    ma || (l.position += Aa);
                    var ha = Aa;
                  } catch (N) {
                    if (b > 0 && N instanceof O && (N.Ra == 6 || N.Ra == 6)) break;
                    throw N;
                  }
                  if (ha < 0) {
                    var Ba = -1;
                    break a;
                  }
                  b += ha;
                  if (ha < v) break;
                  typeof g != "undefined" && (g += ha);
                }
                Ba = b;
              }
              J[c >> 2] = Ba;
              return 0;
            } catch (N) {
              if (typeof Y == "undefined" || N.name !== "ErrnoError") throw N;
              return N.Ra;
            }
          },
          D: function(a, b, d, c) {
            b = b < -9007199254740992 || b > 9007199254740992 ? NaN : Number(b);
            try {
              if (isNaN(b)) return 22;
              var e = V(a);
              ic(e, b, d);
              L[c >> 3] = BigInt(e.position);
              e.ub && !b && d === 0 && (e.ub = null);
              return 0;
            } catch (g) {
              if (typeof Y == "undefined" || g.name !== "ErrnoError") throw g;
              return g.Ra;
            }
          },
          J: function(a) {
            try {
              var b = V(a);
              return b.Pa?.fsync?.(b);
            } catch (d) {
              if (typeof Y == "undefined" || d.name !== "ErrnoError") throw d;
              return d.Ra;
            }
          },
          q: function(a, b, d, c) {
            try {
              var e = V(a);
              a = b;
              if (d == 1) var g = jc(e, u, J[a >> 2], J[a + 4 >> 2]);
              else {
                for (var n = b = 0, r = a; n < d; n++, r += 8) b += J[r + 4 >> 2];
                var v = new Uint8Array(b);
                for (n = r = 0; n < d; n++, a += 8) {
                  var l = J[a >> 2], z = J[a + 4 >> 2];
                  v.set(H.subarray(l, l + z), r);
                  r += z;
                }
                g = jc(e, v, 0, b);
              }
              J[c >> 2] = g;
              return 0;
            } catch (F) {
              if (typeof Y == "undefined" || F.name !== "ErrnoError") throw F;
              return F.Ra;
            }
          },
          u: Sc
        };
        async function ed() {
          La();
          var a = k.setStatus;
          a && (a("Running..."), await new Promise((b) => setTimeout(b, 1)), setTimeout(a, 1, ""));
          Ea || (k.noFSInit || Gb || Jc(), fd.O(), Hb = false, k.onRuntimeInitialized?.(), Na());
        }
        var fd;
        (async function() {
          function a(c) {
            c = fd = c.exports;
            k._sqlite3_free = c.Q;
            k._sqlite3_value_text = c.R;
            k._sqlite3_prepare_v2 = c.S;
            k._sqlite3_step = c.T;
            k._sqlite3_reset = c.U;
            k._sqlite3_exec = c.V;
            k._sqlite3_finalize = c.W;
            k._sqlite3_column_name = c.X;
            k._sqlite3_column_text = c.Y;
            k._sqlite3_column_type = c.Z;
            k._sqlite3_errmsg = c._;
            k._sqlite3_backup_init = c.$;
            k._sqlite3_backup_step = c.aa;
            k._sqlite3_backup_finish = c.ba;
            k._sqlite3_clear_bindings = c.ca;
            k._sqlite3_value_blob = c.da;
            k._sqlite3_value_bytes = c.ea;
            k._sqlite3_value_double = c.fa;
            k._sqlite3_value_int = c.ga;
            k._sqlite3_value_type = c.ha;
            k._sqlite3_result_blob = c.ia;
            k._sqlite3_result_double = c.ja;
            k._sqlite3_result_error = c.ka;
            k._sqlite3_result_int = c.la;
            k._sqlite3_result_int64 = c.ma;
            k._sqlite3_result_null = c.na;
            k._sqlite3_result_text = c.oa;
            k._sqlite3_aggregate_context = c.pa;
            k._sqlite3_column_count = c.qa;
            k._sqlite3_data_count = c.ra;
            k._sqlite3_column_blob = c.sa;
            k._sqlite3_column_bytes = c.ta;
            k._sqlite3_column_double = c.ua;
            k._sqlite3_bind_blob = c.va;
            k._sqlite3_bind_double = c.wa;
            k._sqlite3_bind_int = c.xa;
            k._sqlite3_bind_text = c.ya;
            k._sqlite3_bind_parameter_index = c.za;
            k._sqlite3_sql = c.Aa;
            k._sqlite3_normalized_sql = c.Ba;
            k._sqlite3_changes = c.Ca;
            k._sqlite3_close_v2 = c.Da;
            k._sqlite3_create_function_v2 = c.Ea;
            k._sqlite3_update_hook = c.Fa;
            k._sqlite3_open = c.Ga;
            ea = k._malloc = c.Ha;
            y = k._free = c.Ia;
            k._RegisterExtensionFunctions = c.Ja;
            sb = c.Ka;
            cd = c.La;
            pa = c.Ma;
            la = c.Na;
            na = c.Oa;
            Ha = c.N;
            Z = c.P;
            Ga();
            return fd;
          }
          var b = { a: dd }, d = k.instantiateWasm;
          if (d) return new Promise((c) => {
            d(b, (e) => c(a(e)));
          });
          Qa ??= k.locateFile ? k.locateFile(
            "sql-wasm.wasm",
            va
          ) : va + "sql-wasm.wasm";
          return (function(c) {
            return a(c.instance);
          })(await Ta(b));
        })().then(() => ed());
        return Module;
      });
      return initSqlJsPromise;
    };
    if (typeof exports2 === "object" && typeof module2 === "object") {
      module2.exports = initSqlJs2;
      module2.exports.default = initSqlJs2;
    } else if (typeof define === "function" && define["amd"]) {
      define([], function() {
        return initSqlJs2;
      });
    } else if (typeof exports2 === "object") {
      exports2["Module"] = initSqlJs2;
    }
  }
});

// node_modules/proj4/dist/proj4-src.js
var require_proj4_src = __commonJS({
  "node_modules/proj4/dist/proj4-src.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.proj4 = factory());
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
      function common(array) {
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
          pt = common(point);
        } else {
          pt = { x: point.x, y: point.y, z: point.z, m: point.m };
        }
        return transformInternal(source, dest, pt, enforceAxis);
      }
      var wgs84 = Projection("WGS84");
      function transformer(from, to, coords, enforceAxis) {
        var out, geocent2, keys;
        if (Array.isArray(coords)) {
          out = transformInternal(from, to, common(coords), enforceAxis) || { x: NaN, y: NaN };
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
        var tmp2 = clens_cmplx(this.gtu, 2 * Cn, 2 * Ce);
        Cn = Cn + tmp2[0];
        Ce = Ce + tmp2[1];
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
          var tmp2 = clens_cmplx(this.utg, 2 * Cn, 2 * Ce);
          Cn = Cn + tmp2[0];
          Ce = Ce + tmp2[1];
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
        var tmp2 = p.x;
        p.x = p.y;
        p.y = tmp2;
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
        const tmp2 = sinU1 * sinSigma - cosU1 * cosSigma * cosAlpha1;
        const lat2 = Math.atan2(
          sinU1 * cosSigma + cosU1 * sinSigma * cosAlpha1,
          (1 - f) * Math.sqrt(sinAlpha * sinAlpha + tmp2 * tmp2)
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
        var tmp2, v_x, v_y, v_z;
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
          tmp2 = this.radius_g - v_x;
          if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp2));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp2);
          } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp2);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp2));
          }
        } else if (this.shape === "sphere") {
          tmp2 = Math.cos(lat);
          v_x = Math.cos(lon) * tmp2;
          v_y = Math.sin(lon) * tmp2;
          v_z = Math.sin(lat);
          tmp2 = this.radius_g - v_x;
          if (this.flip_axis) {
            p.x = this.radius_g_1 * Math.atan(v_y / hypot(v_z, tmp2));
            p.y = this.radius_g_1 * Math.atan(v_z / tmp2);
          } else {
            p.x = this.radius_g_1 * Math.atan(v_y / tmp2);
            p.y = this.radius_g_1 * Math.atan(v_z / hypot(v_y, tmp2));
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
      function init() {
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
        init,
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
        toPoint: common,
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

// scripts/sources/vector.mjs
var vector_exports2 = {};
__export(vector_exports2, {
  readGeoPackage: () => readGeoPackage,
  readGeoParquet: () => readGeoParquet
});
module.exports = __toCommonJS(vector_exports2);

// node_modules/parquet-wasm/esm/parquet_wasm.js
var ColumnChunkMetaData = class _ColumnChunkMetaData {
  static __wrap(ptr) {
    const obj = Object.create(_ColumnChunkMetaData.prototype);
    obj.__wbg_ptr = ptr;
    ColumnChunkMetaDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ColumnChunkMetaDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_columnchunkmetadata_free(ptr, 0);
  }
  /**
   * Path (or identifier) of this column.
   * @returns {string[]}
   */
  columnPath() {
    const ret = wasm.columnchunkmetadata_columnPath(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * Returns the total compressed data size of this column chunk.
   * @returns {number}
   */
  compressedSize() {
    const ret = wasm.columnchunkmetadata_compressedSize(this.__wbg_ptr);
    return ret;
  }
  /**
   * Compression for this column.
   * @returns {Compression}
   */
  compression() {
    const ret = wasm.columnchunkmetadata_compression(this.__wbg_ptr);
    return ret;
  }
  /**
   * All encodings used for this column.
   * @returns {Encoding[]}
   */
  encodings() {
    const ret = wasm.columnchunkmetadata_encodings(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * Byte offset in `file_path()`.
   * @returns {bigint}
   */
  fileOffset() {
    const ret = wasm.columnchunkmetadata_fileOffset(this.__wbg_ptr);
    return ret;
  }
  /**
   * File where the column chunk is stored.
   *
   * If not set, assumed to belong to the same file as the metadata.
   * This path is relative to the current file.
   * @returns {string | undefined}
   */
  filePath() {
    const ret = wasm.columnchunkmetadata_filePath(this.__wbg_ptr);
    let v1;
    if (ret[0] !== 0) {
      v1 = getStringFromWasm0(ret[0], ret[1]);
      wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    }
    return v1;
  }
  /**
   * Total number of values in this column chunk.
   * @returns {number}
   */
  numValues() {
    const ret = wasm.columnchunkmetadata_numValues(this.__wbg_ptr);
    return ret;
  }
  /**
   * Returns the total uncompressed data size of this column chunk.
   * @returns {number}
   */
  uncompressedSize() {
    const ret = wasm.columnchunkmetadata_uncompressedSize(this.__wbg_ptr);
    return ret;
  }
};
if (Symbol.dispose) ColumnChunkMetaData.prototype[Symbol.dispose] = ColumnChunkMetaData.prototype.free;
var Compression = Object.freeze({
  UNCOMPRESSED: 0,
  "0": "UNCOMPRESSED",
  SNAPPY: 1,
  "1": "SNAPPY",
  GZIP: 2,
  "2": "GZIP",
  BROTLI: 3,
  "3": "BROTLI",
  /**
   * @deprecated as of Parquet 2.9.0.
   * Switch to LZ4_RAW
   */
  LZ4: 4,
  "4": "LZ4",
  ZSTD: 5,
  "5": "ZSTD",
  LZ4_RAW: 6,
  "6": "LZ4_RAW",
  LZO: 7,
  "7": "LZO"
});
var EnabledStatistics = Object.freeze({
  /**
   * Compute no statistics
   */
  None: 0,
  "0": "None",
  /**
   * Compute chunk-level statistics but not page-level
   */
  Chunk: 1,
  "1": "Chunk",
  /**
   * Compute page-level and chunk-level statistics
   */
  Page: 2,
  "2": "Page"
});
var Encoding = Object.freeze({
  /**
   * Default byte encoding.
   * - BOOLEAN - 1 bit per value, 0 is false; 1 is true.
   * - INT32 - 4 bytes per value, stored as little-endian.
   * - INT64 - 8 bytes per value, stored as little-endian.
   * - FLOAT - 4 bytes per value, stored as little-endian.
   * - DOUBLE - 8 bytes per value, stored as little-endian.
   * - BYTE_ARRAY - 4 byte length stored as little endian, followed by bytes.
   * - FIXED_LEN_BYTE_ARRAY - just the bytes are stored.
   */
  PLAIN: 0,
  "0": "PLAIN",
  /**
   * **Deprecated** dictionary encoding.
   *
   * The values in the dictionary are encoded using PLAIN encoding.
   * Since it is deprecated, RLE_DICTIONARY encoding is used for a data page, and
   * PLAIN encoding is used for dictionary page.
   */
  PLAIN_DICTIONARY: 1,
  "1": "PLAIN_DICTIONARY",
  /**
   * Group packed run length encoding.
   *
   * Usable for definition/repetition levels encoding and boolean values.
   */
  RLE: 2,
  "2": "RLE",
  /**
   * Bit packed encoding.
   *
   * This can only be used if the data has a known max width.
   * Usable for definition/repetition levels encoding.
   */
  BIT_PACKED: 3,
  "3": "BIT_PACKED",
  /**
   * Delta encoding for integers, either INT32 or INT64.
   *
   * Works best on sorted data.
   */
  DELTA_BINARY_PACKED: 4,
  "4": "DELTA_BINARY_PACKED",
  /**
   * Encoding for byte arrays to separate the length values and the data.
   *
   * The lengths are encoded using DELTA_BINARY_PACKED encoding.
   */
  DELTA_LENGTH_BYTE_ARRAY: 5,
  "5": "DELTA_LENGTH_BYTE_ARRAY",
  /**
   * Incremental encoding for byte arrays.
   *
   * Prefix lengths are encoded using DELTA_BINARY_PACKED encoding.
   * Suffixes are stored using DELTA_LENGTH_BYTE_ARRAY encoding.
   */
  DELTA_BYTE_ARRAY: 6,
  "6": "DELTA_BYTE_ARRAY",
  /**
   * Dictionary encoding.
   *
   * The ids are encoded using the RLE encoding.
   */
  RLE_DICTIONARY: 7,
  "7": "RLE_DICTIONARY",
  /**
   * Encoding for floating-point data.
   *
   * K byte-streams are created where K is the size in bytes of the data type.
   * The individual bytes of an FP value are scattered to the corresponding stream and
   * the streams are concatenated.
   * This itself does not reduce the size of the data but can lead to better compression
   * afterwards.
   */
  BYTE_STREAM_SPLIT: 8,
  "8": "BYTE_STREAM_SPLIT",
  /**
   * Adaptive Lossless floating-Point encoding (ALP).
   *
   * Currently specified for FLOAT and DOUBLE.
   */
  ALP: 9,
  "9": "ALP"
});
var FFIData = class _FFIData {
  static __wrap(ptr) {
    const obj = Object.create(_FFIData.prototype);
    obj.__wbg_ptr = ptr;
    FFIDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FFIDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_ffidata_free(ptr, 0);
  }
  /**
   * Access the pointer to the
   * [`ArrowArray`](https://arrow.apache.org/docs/format/CDataInterface.html#structure-definitions)
   * struct. This can be viewed or copied (without serialization) to an Arrow JS `RecordBatch` by
   * using [`arrow-js-ffi`](https://github.com/kylebarron/arrow-js-ffi). You can access the
   * [`WebAssembly.Memory`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory)
   * instance by using {@linkcode wasmMemory}.
   *
   * **Example**:
   *
   * ```ts
   * import { parseRecordBatch } from "arrow-js-ffi";
   *
   * const wasmRecordBatch: FFIRecordBatch = ...
   * const wasmMemory: WebAssembly.Memory = wasmMemory();
   *
   * // Pass `true` to copy arrays across the boundary instead of creating views.
   * const jsRecordBatch = parseRecordBatch(
   *   wasmMemory.buffer,
   *   wasmRecordBatch.arrayAddr(),
   *   wasmRecordBatch.schemaAddr(),
   *   true
   * );
   * ```
   * @returns {number}
   */
  arrayAddr() {
    const ret = wasm.ffidata_arrayAddr(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Access the pointer to the
   * [`ArrowSchema`](https://arrow.apache.org/docs/format/CDataInterface.html#structure-definitions)
   * struct. This can be viewed or copied (without serialization) to an Arrow JS `Field` by
   * using [`arrow-js-ffi`](https://github.com/kylebarron/arrow-js-ffi). You can access the
   * [`WebAssembly.Memory`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory)
   * instance by using {@linkcode wasmMemory}.
   *
   * **Example**:
   *
   * ```ts
   * import { parseRecordBatch } from "arrow-js-ffi";
   *
   * const wasmRecordBatch: FFIRecordBatch = ...
   * const wasmMemory: WebAssembly.Memory = wasmMemory();
   *
   * // Pass `true` to copy arrays across the boundary instead of creating views.
   * const jsRecordBatch = parseRecordBatch(
   *   wasmMemory.buffer,
   *   wasmRecordBatch.arrayAddr(),
   *   wasmRecordBatch.schemaAddr(),
   *   true
   * );
   * ```
   * @returns {number}
   */
  schemaAddr() {
    const ret = wasm.ffidata_schemaAddr(this.__wbg_ptr);
    return ret >>> 0;
  }
};
if (Symbol.dispose) FFIData.prototype[Symbol.dispose] = FFIData.prototype.free;
var FFISchema = class _FFISchema {
  static __wrap(ptr) {
    const obj = Object.create(_FFISchema.prototype);
    obj.__wbg_ptr = ptr;
    FFISchemaFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FFISchemaFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_ffischema_free(ptr, 0);
  }
  /**
   * Access the pointer to the
   * [`ArrowSchema`](https://arrow.apache.org/docs/format/CDataInterface.html#structure-definitions)
   * struct. This can be viewed or copied (without serialization) to an Arrow JS `Field` by
   * using [`arrow-js-ffi`](https://github.com/kylebarron/arrow-js-ffi). You can access the
   * [`WebAssembly.Memory`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory)
   * instance by using {@linkcode wasmMemory}.
   *
   * **Example**:
   *
   * ```ts
   * import { parseRecordBatch } from "arrow-js-ffi";
   *
   * const wasmRecordBatch: FFIRecordBatch = ...
   * const wasmMemory: WebAssembly.Memory = wasmMemory();
   *
   * // Pass `true` to copy arrays across the boundary instead of creating views.
   * const jsRecordBatch = parseRecordBatch(
   *   wasmMemory.buffer,
   *   wasmRecordBatch.arrayAddr(),
   *   wasmRecordBatch.schemaAddr(),
   *   true
   * );
   * ```
   * @returns {number}
   */
  addr() {
    const ret = wasm.ffischema_addr(this.__wbg_ptr);
    return ret >>> 0;
  }
};
if (Symbol.dispose) FFISchema.prototype[Symbol.dispose] = FFISchema.prototype.free;
var FFIStream = class _FFIStream {
  static __wrap(ptr) {
    const obj = Object.create(_FFIStream.prototype);
    obj.__wbg_ptr = ptr;
    FFIStreamFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FFIStreamFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_ffistream_free(ptr, 0);
  }
  /**
   * Get the pointer to one ArrowArray FFI struct for a given chunk index and column index
   *
   * Access the pointer to one
   * [`ArrowArray`](https://arrow.apache.org/docs/format/CDataInterface.html#structure-definitions)
   * struct representing one of the internal `RecordBatch`es. This can be viewed or copied (without serialization) to an Arrow JS `RecordBatch` by
   * using [`arrow-js-ffi`](https://github.com/kylebarron/arrow-js-ffi). You can access the
   * [`WebAssembly.Memory`](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory)
   * instance by using {@linkcode wasmMemory}.
   *
   * **Example**:
   *
   * ```ts
   * import * as arrow from "apache-arrow";
   * import { parseRecordBatch } from "arrow-js-ffi";
   *
   * const wasmTable: FFITable = ...
   * const wasmMemory: WebAssembly.Memory = wasmMemory();
   *
   * const jsBatches: arrow.RecordBatch[] = []
   * for (let i = 0; i < wasmTable.numBatches(); i++) {
   *   // Pass `true` to copy arrays across the boundary instead of creating views.
   *   const jsRecordBatch = parseRecordBatch(
   *     wasmMemory.buffer,
   *     wasmTable.arrayAddr(i),
   *     wasmTable.schemaAddr(),
   *     true
   *   );
   *   jsBatches.push(jsRecordBatch);
   * }
   * const jsTable = new arrow.Table(jsBatches);
   * ```
   *
   * @param chunk number The chunk index to use
   * @returns number pointer to an ArrowArray FFI struct in Wasm memory
   * @param {number} chunk
   * @returns {number}
   */
  arrayAddr(chunk) {
    const ret = wasm.ffistream_arrayAddr(this.__wbg_ptr, chunk);
    return ret >>> 0;
  }
  /**
   * @returns {Uint32Array}
   */
  arrayAddrs() {
    const ret = wasm.ffistream_arrayAddrs(this.__wbg_ptr);
    var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  drop() {
    const ptr = this.__destroy_into_raw();
    wasm.ffistream_drop(ptr);
  }
  /**
   * Get the total number of elements in this stream
   * @returns {number}
   */
  numArrays() {
    const ret = wasm.ffistream_numArrays(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Get the pointer to the ArrowSchema FFI struct
   * @returns {number}
   */
  schemaAddr() {
    const ret = wasm.ffistream_schemaAddr(this.__wbg_ptr);
    return ret >>> 0;
  }
};
if (Symbol.dispose) FFIStream.prototype[Symbol.dispose] = FFIStream.prototype.free;
var FileMetaData = class _FileMetaData {
  static __wrap(ptr) {
    const obj = Object.create(_FileMetaData.prototype);
    obj.__wbg_ptr = ptr;
    FileMetaDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    FileMetaDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_filemetadata_free(ptr, 0);
  }
  /**
   * String message for application that wrote this file.
   *
   * This should have the following format:
   * `<application> version <application version> (build <application build hash>)`.
   *
   * ```shell
   * parquet-mr version 1.8.0 (build 0fda28af84b9746396014ad6a415b90592a98b3b)
   * ```
   * @returns {string | undefined}
   */
  createdBy() {
    const ret = wasm.filemetadata_createdBy(this.__wbg_ptr);
    let v1;
    if (ret[0] !== 0) {
      v1 = getStringFromWasm0(ret[0], ret[1]);
      wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    }
    return v1;
  }
  /**
   * Returns key_value_metadata of this file.
   * @returns {Map<any, any>}
   */
  keyValueMetadata() {
    const ret = wasm.filemetadata_keyValueMetadata(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * Returns number of rows in the file.
   * @returns {number}
   */
  numRows() {
    const ret = wasm.filemetadata_numRows(this.__wbg_ptr);
    return ret;
  }
  /**
   * Returns version of this file.
   * @returns {number}
   */
  version() {
    const ret = wasm.filemetadata_version(this.__wbg_ptr);
    return ret;
  }
};
if (Symbol.dispose) FileMetaData.prototype[Symbol.dispose] = FileMetaData.prototype.free;
var IntoUnderlyingByteSource = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingByteSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingbytesource_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get autoAllocateChunkSize() {
    const ret = wasm.intounderlyingbytesource_autoAllocateChunkSize(this.__wbg_ptr);
    return ret >>> 0;
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingbytesource_cancel(ptr);
  }
  /**
   * @param {ReadableByteStreamController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingbytesource_pull(this.__wbg_ptr, controller);
    return ret;
  }
  /**
   * @param {ReadableByteStreamController} controller
   */
  start(controller) {
    wasm.intounderlyingbytesource_start(this.__wbg_ptr, controller);
  }
  /**
   * @returns {ReadableStreamType}
   */
  get type() {
    const ret = wasm.intounderlyingbytesource_type(this.__wbg_ptr);
    return __wbindgen_enum_ReadableStreamType[ret];
  }
};
if (Symbol.dispose) IntoUnderlyingByteSource.prototype[Symbol.dispose] = IntoUnderlyingByteSource.prototype.free;
var IntoUnderlyingSink = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, reason);
    return ret;
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return ret;
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, chunk);
    return ret;
  }
};
if (Symbol.dispose) IntoUnderlyingSink.prototype[Symbol.dispose] = IntoUnderlyingSink.prototype.free;
var IntoUnderlyingSource = class _IntoUnderlyingSource {
  static __wrap(ptr) {
    const obj = Object.create(_IntoUnderlyingSource.prototype);
    obj.__wbg_ptr = ptr;
    IntoUnderlyingSourceFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, controller);
    return ret;
  }
};
if (Symbol.dispose) IntoUnderlyingSource.prototype[Symbol.dispose] = IntoUnderlyingSource.prototype.free;
var ParquetFile = class _ParquetFile {
  static __wrap(ptr) {
    const obj = Object.create(_ParquetFile.prototype);
    obj.__wbg_ptr = ptr;
    ParquetFileFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ParquetFileFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_parquetfile_free(ptr, 0);
  }
  /**
   * Construct a ParquetFile from a new [Blob] or [File] handle.
   *
   * [Blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
   * [File]: https://developer.mozilla.org/en-US/docs/Web/API/File
   *
   * Safety: Do not use this in a multi-threaded environment,
   * (transitively depends on `!Send` `web_sys::Blob`)
   * @param {Blob} handle
   * @returns {Promise<ParquetFile>}
   */
  static fromFile(handle) {
    const ret = wasm.parquetfile_fromFile(handle);
    return ret;
  }
  /**
   * Construct a ParquetFile from a new URL.
   * @param {string} url
   * @returns {Promise<ParquetFile>}
   */
  static fromUrl(url) {
    const ptr0 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parquetfile_fromUrl(ptr0, len0);
    return ret;
  }
  /**
   * @returns {ParquetMetaData}
   */
  metadata() {
    const ret = wasm.parquetfile_metadata(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ParquetMetaData.__wrap(ret[0]);
  }
  /**
   * Read from the Parquet file in an async fashion.
   *
   * @param options
   *
   *    Options for reading Parquet data. Optional keys include:
   *
   *    - `batchSize`: The number of rows in each batch. If not provided, the upstream parquet
   *           default is 1024.
   *    - `rowGroups`: Only read data from the provided row group indexes.
   *    - `limit`: Provide a limit to the number of rows to be read.
   *    - `offset`: Provide an offset to skip over the given number of rows.
   *    - `columns`: The column names from the file to read.
   * @param {ReaderOptions | null} [options]
   * @returns {Promise<Table>}
   */
  read(options) {
    const ret = wasm.parquetfile_read(this.__wbg_ptr, isLikeNone(options) ? 0 : addToExternrefTable0(options));
    return ret;
  }
  /**
   * @returns {Schema}
   */
  schema() {
    const ret = wasm.parquetfile_schema(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return Schema.__wrap(ret[0]);
  }
  /**
   * Create a readable stream of record batches.
   *
   * Each item in the stream will be a {@linkcode RecordBatch}.
   *
   * @param options
   *
   *    Options for reading Parquet data. Optional keys include:
   *
   *    - `batchSize`: The number of rows in each batch. If not provided, the upstream parquet
   *           default is 1024.
   *    - `rowGroups`: Only read data from the provided row group indexes.
   *    - `limit`: Provide a limit to the number of rows to be read.
   *    - `offset`: Provide an offset to skip over the given number of rows.
   *    - `columns`: The column names from the file to read.
   *    - `concurrency`: The number of concurrent requests to make
   * @param {ReaderOptions | null} [options]
   * @returns {Promise<ReadableStream>}
   */
  stream(options) {
    const ret = wasm.parquetfile_stream(this.__wbg_ptr, isLikeNone(options) ? 0 : addToExternrefTable0(options));
    return ret;
  }
};
if (Symbol.dispose) ParquetFile.prototype[Symbol.dispose] = ParquetFile.prototype.free;
var ParquetMetaData = class _ParquetMetaData {
  static __wrap(ptr) {
    const obj = Object.create(_ParquetMetaData.prototype);
    obj.__wbg_ptr = ptr;
    ParquetMetaDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    ParquetMetaDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_parquetmetadata_free(ptr, 0);
  }
  /**
   * Returns file metadata as reference.
   * @returns {FileMetaData}
   */
  fileMetadata() {
    const ret = wasm.parquetmetadata_fileMetadata(this.__wbg_ptr);
    return FileMetaData.__wrap(ret);
  }
  /**
   * Returns number of row groups in this file.
   * @returns {number}
   */
  numRowGroups() {
    const ret = wasm.parquetmetadata_numRowGroups(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Returns row group metadata for `i`th position.
   * Position should be less than number of row groups `num_row_groups`.
   * @param {number} i
   * @returns {RowGroupMetaData}
   */
  rowGroup(i) {
    const ret = wasm.parquetmetadata_rowGroup(this.__wbg_ptr, i);
    return RowGroupMetaData.__wrap(ret);
  }
  /**
   * Returns row group metadata for all row groups
   * @returns {RowGroupMetaData[]}
   */
  rowGroups() {
    const ret = wasm.parquetmetadata_rowGroups(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
};
if (Symbol.dispose) ParquetMetaData.prototype[Symbol.dispose] = ParquetMetaData.prototype.free;
var RecordBatch = class _RecordBatch {
  static __wrap(ptr) {
    const obj = Object.create(_RecordBatch.prototype);
    obj.__wbg_ptr = ptr;
    RecordBatchFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  static __unwrap(jsValue) {
    if (!(jsValue instanceof _RecordBatch)) {
      return 0;
    }
    return jsValue.__destroy_into_raw();
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RecordBatchFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_recordbatch_free(ptr, 0);
  }
  /**
   * Returns the total number of bytes of memory occupied physically by this batch.
   * @returns {number}
   */
  getArrayMemorySize() {
    const ret = wasm.recordbatch_getArrayMemorySize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Export this RecordBatch to FFI structs according to the Arrow C Data Interface.
   *
   * This method **does consume** the RecordBatch, so the original RecordBatch will be
   * inaccessible after this call. You must still call {@linkcode FFIRecordBatch.free} after
   * you've finished using the FFIRecordBatch.
   * @returns {FFIData}
   */
  intoFFI() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.recordbatch_intoFFI(ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFIData.__wrap(ret[0]);
  }
  /**
   * Consume this RecordBatch and convert to an Arrow IPC Stream buffer
   * @returns {Uint8Array}
   */
  intoIPCStream() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.recordbatch_intoIPCStream(ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * The number of columns in this RecordBatch.
   * @returns {number}
   */
  get numColumns() {
    const ret = wasm.recordbatch_numColumns(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * The number of rows in this RecordBatch.
   * @returns {number}
   */
  get numRows() {
    const ret = wasm.recordbatch_numRows(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * The {@linkcode Schema} of this RecordBatch.
   * @returns {Schema}
   */
  get schema() {
    const ret = wasm.recordbatch_schema(this.__wbg_ptr);
    return Schema.__wrap(ret);
  }
  /**
   * Return a new RecordBatch where each column is sliced
   * according to `offset` and `length`
   * @param {number} offset
   * @param {number} length
   * @returns {RecordBatch}
   */
  slice(offset, length) {
    const ret = wasm.recordbatch_slice(this.__wbg_ptr, offset, length);
    return _RecordBatch.__wrap(ret);
  }
  /**
   * Export this RecordBatch to FFI structs according to the Arrow C Data Interface.
   *
   * This method **does not consume** the RecordBatch, so you must remember to call {@linkcode
   * RecordBatch.free} to release the resources. The underlying arrays are reference counted, so
   * this method does not copy data, it only prevents the data from being released.
   * @returns {FFIData}
   */
  toFFI() {
    const ret = wasm.recordbatch_toFFI(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFIData.__wrap(ret[0]);
  }
  /**
   * Override the schema of this [`RecordBatch`]
   *
   * Returns an error if `schema` is not a superset of the current schema
   * as determined by [`Schema::contains`]
   * @param {Schema} schema
   * @returns {RecordBatch}
   */
  withSchema(schema) {
    _assertClass(schema, Schema);
    var ptr0 = schema.__destroy_into_raw();
    const ret = wasm.recordbatch_withSchema(this.__wbg_ptr, ptr0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _RecordBatch.__wrap(ret[0]);
  }
};
if (Symbol.dispose) RecordBatch.prototype[Symbol.dispose] = RecordBatch.prototype.free;
var RowGroupMetaData = class _RowGroupMetaData {
  static __wrap(ptr) {
    const obj = Object.create(_RowGroupMetaData.prototype);
    obj.__wbg_ptr = ptr;
    RowGroupMetaDataFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    RowGroupMetaDataFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_rowgroupmetadata_free(ptr, 0);
  }
  /**
   * Returns column chunk metadata for `i`th column.
   * @param {number} i
   * @returns {ColumnChunkMetaData}
   */
  column(i) {
    const ret = wasm.rowgroupmetadata_column(this.__wbg_ptr, i);
    return ColumnChunkMetaData.__wrap(ret);
  }
  /**
   * Returns column chunk metadata for all columns
   * @returns {ColumnChunkMetaData[]}
   */
  columns() {
    const ret = wasm.rowgroupmetadata_columns(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * Total size of all compressed column data in this row group.
   * @returns {number}
   */
  compressedSize() {
    const ret = wasm.rowgroupmetadata_compressedSize(this.__wbg_ptr);
    return ret;
  }
  /**
   * Number of columns in this row group.
   * @returns {number}
   */
  numColumns() {
    const ret = wasm.rowgroupmetadata_numColumns(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Number of rows in this row group.
   * @returns {number}
   */
  numRows() {
    const ret = wasm.rowgroupmetadata_numRows(this.__wbg_ptr);
    return ret;
  }
  /**
   * Total byte size of all uncompressed column data in this row group.
   * @returns {number}
   */
  totalByteSize() {
    const ret = wasm.rowgroupmetadata_totalByteSize(this.__wbg_ptr);
    return ret;
  }
};
if (Symbol.dispose) RowGroupMetaData.prototype[Symbol.dispose] = RowGroupMetaData.prototype.free;
var Schema = class _Schema {
  static __wrap(ptr) {
    const obj = Object.create(_Schema.prototype);
    obj.__wbg_ptr = ptr;
    SchemaFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    SchemaFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_schema_free(ptr, 0);
  }
  /**
   * Find the index of the column with the given name.
   * @param {string} name
   * @returns {number}
   */
  indexOf(name) {
    const ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.schema_indexOf(this.__wbg_ptr, ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return ret[0] >>> 0;
  }
  /**
   * Export this Table to FFI structs according to the Arrow C Data Interface.
   *
   * This method **does consume** the Table, so the original Table will be
   * inaccessible after this call. You must still call {@linkcode FFITable.free} after
   * you've finished using the FFITable.
   * @returns {FFISchema}
   */
  intoFFI() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.schema_intoFFI(ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFISchema.__wrap(ret[0]);
  }
  /**
   * Consume this schema and convert to an Arrow IPC Stream buffer
   * @returns {Uint8Array}
   */
  intoIPCStream() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.schema_intoIPCStream(ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * Returns an immutable reference to the Map of custom metadata key-value pairs.
   * @returns {SchemaMetadata}
   */
  metadata() {
    const ret = wasm.schema_metadata(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return takeFromExternrefTable0(ret[0]);
  }
  /**
   * Export this schema to an FFISchema object, which can be read with arrow-js-ffi.
   *
   * This method **does not consume** the Schema, so you must remember to call {@linkcode
   * Schema.free} to release the resources. The underlying arrays are reference counted, so
   * this method does not copy data, it only prevents the data from being released.
   * @returns {FFISchema}
   */
  toFFI() {
    const ret = wasm.schema_toFFI(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFISchema.__wrap(ret[0]);
  }
  /**
   * Sets the metadata of this `Schema` to be `metadata` and returns a new object
   * @param {SchemaMetadata} metadata
   * @returns {Schema}
   */
  withMetadata(metadata) {
    const ret = wasm.schema_withMetadata(this.__wbg_ptr, metadata);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _Schema.__wrap(ret[0]);
  }
};
if (Symbol.dispose) Schema.prototype[Symbol.dispose] = Schema.prototype.free;
var Table = class _Table {
  static __wrap(ptr) {
    const obj = Object.create(_Table.prototype);
    obj.__wbg_ptr = ptr;
    TableFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    TableFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_table_free(ptr, 0);
  }
  /**
   * Create a table from an Arrow IPC Stream buffer
   * @param {Uint8Array} buf
   * @returns {Table}
   */
  static fromIPCStream(buf) {
    const ptr0 = passArray8ToWasm0(buf, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.table_fromIPCStream(ptr0, len0);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _Table.__wrap(ret[0]);
  }
  /**
   * Returns the total number of bytes of memory occupied physically by all batches in this
   * table.
   * @returns {number}
   */
  getArrayMemorySize() {
    const ret = wasm.table_getArrayMemorySize(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Export this Table to FFI structs according to the Arrow C Data Interface.
   *
   * This method **does consume** the Table, so the original Table will be
   * inaccessible after this call. You must still call {@linkcode FFITable.free} after
   * you've finished using the FFITable.
   * @returns {FFIStream}
   */
  intoFFI() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.table_intoFFI(ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFIStream.__wrap(ret[0]);
  }
  /**
   * Consume this table and convert to an Arrow IPC Stream buffer
   * @returns {Uint8Array}
   */
  intoIPCStream() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.table_intoIPCStream(ptr);
    if (ret[3]) {
      throw takeFromExternrefTable0(ret[2]);
    }
    var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
    return v1;
  }
  /**
   * The number of batches in the Table
   * @returns {number}
   */
  get numBatches() {
    const ret = wasm.table_numBatches(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * Access a RecordBatch from the Table by index.
   *
   * @param index The positional index of the RecordBatch to retrieve.
   * @returns a RecordBatch or `null` if out of range.
   * @param {number} index
   * @returns {RecordBatch | undefined}
   */
  recordBatch(index) {
    const ret = wasm.table_recordBatch(this.__wbg_ptr, index);
    return ret === 0 ? void 0 : RecordBatch.__wrap(ret);
  }
  /**
   * @returns {RecordBatch[]}
   */
  recordBatches() {
    const ret = wasm.table_recordBatches(this.__wbg_ptr);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]);
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
  }
  /**
   * Access the Table's {@linkcode Schema}.
   * @returns {Schema}
   */
  get schema() {
    const ret = wasm.table_schema(this.__wbg_ptr);
    return Schema.__wrap(ret);
  }
  /**
   * Export this Table to FFI structs according to the Arrow C Data Interface.
   *
   * This method **does not consume** the Table, so you must remember to call {@linkcode
   * Table.free} to release the resources. The underlying arrays are reference counted, so
   * this method does not copy data, it only prevents the data from being released.
   * @returns {FFIStream}
   */
  toFFI() {
    const ret = wasm.table_toFFI(this.__wbg_ptr);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return FFIStream.__wrap(ret[0]);
  }
};
if (Symbol.dispose) Table.prototype[Symbol.dispose] = Table.prototype.free;
var WriterProperties = class _WriterProperties {
  static __wrap(ptr) {
    const obj = Object.create(_WriterProperties.prototype);
    obj.__wbg_ptr = ptr;
    WriterPropertiesFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    WriterPropertiesFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_writerproperties_free(ptr, 0);
  }
};
if (Symbol.dispose) WriterProperties.prototype[Symbol.dispose] = WriterProperties.prototype.free;
var WriterPropertiesBuilder = class _WriterPropertiesBuilder {
  static __wrap(ptr) {
    const obj = Object.create(_WriterPropertiesBuilder.prototype);
    obj.__wbg_ptr = ptr;
    WriterPropertiesBuilderFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    WriterPropertiesBuilderFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_writerpropertiesbuilder_free(ptr, 0);
  }
  /**
   * Finalizes the configuration and returns immutable writer properties struct.
   * @returns {WriterProperties}
   */
  build() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_build(ptr);
    return WriterProperties.__wrap(ret);
  }
  /**
   * Returns default state of the builder.
   */
  constructor() {
    const ret = wasm.writerpropertiesbuilder_new();
    this.__wbg_ptr = ret;
    WriterPropertiesBuilderFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
  /**
   * Sets compression codec for a column.
   * Takes precedence over globally defined settings.
   * @param {string} col
   * @param {Compression} value
   * @returns {WriterPropertiesBuilder}
   */
  setColumnCompression(col, value) {
    const ptr = this.__destroy_into_raw();
    const ptr0 = passStringToWasm0(col, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writerpropertiesbuilder_setColumnCompression(ptr, ptr0, len0, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets flag to enable/disable dictionary encoding for a column.
   * Takes precedence over globally defined settings.
   * @param {string} col
   * @param {boolean} value
   * @returns {WriterPropertiesBuilder}
   */
  setColumnDictionaryEnabled(col, value) {
    const ptr = this.__destroy_into_raw();
    const ptr0 = passStringToWasm0(col, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writerpropertiesbuilder_setColumnDictionaryEnabled(ptr, ptr0, len0, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets encoding for a column.
   * Takes precedence over globally defined settings.
   *
   * If dictionary is not enabled, this is treated as a primary encoding for this
   * column. In case when dictionary is enabled for this column, either through
   * global defaults or explicitly, this value is considered to be a fallback
   * encoding for this column.
   *
   * Panics if user tries to set dictionary encoding here, regardless of dictionary
   * encoding flag being set.
   * @param {string} col
   * @param {Encoding} value
   * @returns {WriterPropertiesBuilder}
   */
  setColumnEncoding(col, value) {
    const ptr = this.__destroy_into_raw();
    const ptr0 = passStringToWasm0(col, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writerpropertiesbuilder_setColumnEncoding(ptr, ptr0, len0, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets flag to enable/disable statistics for a column.
   * Takes precedence over globally defined settings.
   * @param {string} col
   * @param {EnabledStatistics} value
   * @returns {WriterPropertiesBuilder}
   */
  setColumnStatisticsEnabled(col, value) {
    const ptr = this.__destroy_into_raw();
    const ptr0 = passStringToWasm0(col, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writerpropertiesbuilder_setColumnStatisticsEnabled(ptr, ptr0, len0, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets compression codec for any column.
   * @param {Compression} value
   * @returns {WriterPropertiesBuilder}
   */
  setCompression(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setCompression(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * EXPERIMENTAL: Enables content-defined chunking, which writes data pages at boundaries
   * determined by the column values so that unchanged data produces identical bytes
   * across file versions. Omitted options use the upstream defaults.
   *
   * Throws if:
   * - `minChunkSize` is 0
   * - `maxChunkSize` is not greater than `minChunkSize`
   * @param {ContentDefinedChunkingOptions | null} [options]
   * @returns {WriterPropertiesBuilder}
   */
  setContentDefinedChunking(options) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setContentDefinedChunking(ptr, isLikeNone(options) ? 0 : addToExternrefTable0(options));
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _WriterPropertiesBuilder.__wrap(ret[0]);
  }
  /**
   * Sets "created by" property.
   * @param {string} value
   * @returns {WriterPropertiesBuilder}
   */
  setCreatedBy(value) {
    const ptr = this.__destroy_into_raw();
    const ptr0 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.writerpropertiesbuilder_setCreatedBy(ptr, ptr0, len0);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets data page size limit.
   * @param {number} value
   * @returns {WriterPropertiesBuilder}
   */
  setDataPageSizeLimit(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setDataPageSizeLimit(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets flag to enable/disable dictionary encoding for any column.
   *
   * Use this method to set dictionary encoding, instead of explicitly specifying
   * encoding in `set_encoding` method.
   * @param {boolean} value
   * @returns {WriterPropertiesBuilder}
   */
  setDictionaryEnabled(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setDictionaryEnabled(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets dictionary page size limit.
   * @param {number} value
   * @returns {WriterPropertiesBuilder}
   */
  setDictionaryPageSizeLimit(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setDictionaryPageSizeLimit(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets encoding for any column.
   *
   * If dictionary is not enabled, this is treated as a primary encoding for all
   * columns. In case when dictionary is enabled for any column, this value is
   * considered to be a fallback encoding for that column.
   *
   * Panics if user tries to set dictionary encoding here, regardless of dictionary
   * encoding flag being set.
   * @param {Encoding} value
   * @returns {WriterPropertiesBuilder}
   */
  setEncoding(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setEncoding(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets "key_value_metadata" property.
   * @param {KeyValueMetadata} value
   * @returns {WriterPropertiesBuilder}
   */
  setKeyValueMetadata(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setKeyValueMetadata(ptr, value);
    if (ret[2]) {
      throw takeFromExternrefTable0(ret[1]);
    }
    return _WriterPropertiesBuilder.__wrap(ret[0]);
  }
  /**
   * Sets maximum size of a row group in bytes.
   * @param {number} value
   * @returns {WriterPropertiesBuilder}
   */
  setMaxRowGroupBytes(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setMaxRowGroupBytes(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets maximum number of rows in a row group.
   * @param {number} value
   * @returns {WriterPropertiesBuilder}
   */
  setMaxRowGroupSize(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setMaxRowGroupSize(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets flag to enable/disable statistics for any column.
   * @param {EnabledStatistics} value
   * @returns {WriterPropertiesBuilder}
   */
  setStatisticsEnabled(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setStatisticsEnabled(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets write batch size.
   * @param {number} value
   * @returns {WriterPropertiesBuilder}
   */
  setWriteBatchSize(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setWriteBatchSize(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
  /**
   * Sets writer version.
   * @param {WriterVersion} value
   * @returns {WriterPropertiesBuilder}
   */
  setWriterVersion(value) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.writerpropertiesbuilder_setWriterVersion(ptr, value);
    return _WriterPropertiesBuilder.__wrap(ret);
  }
};
if (Symbol.dispose) WriterPropertiesBuilder.prototype[Symbol.dispose] = WriterPropertiesBuilder.prototype.free;
var WriterVersion = Object.freeze({
  V1: 0,
  "0": "V1",
  V2: 1,
  "1": "V2"
});
function readParquet(parquet_file, options) {
  const ptr0 = passArray8ToWasm0(parquet_file, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.readParquet(ptr0, len0, isLikeNone(options) ? 0 : addToExternrefTable0(options));
  if (ret[2]) {
    throw takeFromExternrefTable0(ret[1]);
  }
  return Table.__wrap(ret[0]);
}
function __wbg_get_imports() {
  const import0 = {
    __proto__: null,
    __wbg_Error_67e7344beaa85059: function(arg0, arg1) {
      const ret = Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_Number_c54e7112a3fa7e3e: function(arg0) {
      const ret = Number(arg0);
      return ret;
    },
    __wbg_String_8564e559799eccda: function(arg0, arg1) {
      const ret = String(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_bigint_get_as_i64_b482365c149396c8: function(arg0, arg1) {
      const v = arg1;
      const ret = typeof v === "bigint" ? v : void 0;
      getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    },
    __wbg___wbindgen_boolean_get_7a12af2b3f899c5a: function(arg0) {
      const v = arg0;
      const ret = typeof v === "boolean" ? v : void 0;
      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg___wbindgen_debug_string_0e68cf47c9cbd9b0: function(arg0, arg1) {
      const ret = debugString(arg1);
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_function_table_69595ae5c7f77628: function() {
      const ret = wasm.__wbindgen_export;
      return ret;
    },
    __wbg___wbindgen_in_50072d4d6e45c193: function(arg0, arg1) {
      const ret = arg0 in arg1;
      return ret;
    },
    __wbg___wbindgen_is_bigint_60fc0336cb14f5d7: function(arg0) {
      const ret = typeof arg0 === "bigint";
      return ret;
    },
    __wbg___wbindgen_is_function_fcda5e3902d732fe: function(arg0) {
      const ret = typeof arg0 === "function";
      return ret;
    },
    __wbg___wbindgen_is_object_edb6b15aa3afe12e: function(arg0) {
      const val = arg0;
      const ret = typeof val === "object" && val !== null;
      return ret;
    },
    __wbg___wbindgen_is_string_c4f7cb494a2a21f1: function(arg0) {
      const ret = typeof arg0 === "string";
      return ret;
    },
    __wbg___wbindgen_is_undefined_8c687d0b90d5b524: function(arg0) {
      const ret = arg0 === void 0;
      return ret;
    },
    __wbg___wbindgen_jsval_eq_9fdcd3c0a860dd3b: function(arg0, arg1) {
      const ret = arg0 === arg1;
      return ret;
    },
    __wbg___wbindgen_jsval_loose_eq_3c30021c243b64cd: function(arg0, arg1) {
      const ret = arg0 == arg1;
      return ret;
    },
    __wbg___wbindgen_memory_3f8442e22540244f: function() {
      const ret = wasm.memory;
      return ret;
    },
    __wbg___wbindgen_number_get_1dc732b810cb937c: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "number" ? obj : void 0;
      getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    },
    __wbg___wbindgen_string_get_92ab86bb19cbc12f: function(arg0, arg1) {
      const obj = arg1;
      const ret = typeof obj === "string" ? obj : void 0;
      var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      var len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg___wbindgen_throw_5d9e815e6fdf150f: function(arg0, arg1) {
      throw new Error(getStringFromWasm0(arg0, arg1));
    },
    __wbg__wbg_cb_unref_997e73d32238e655: function(arg0) {
      arg0._wbg_cb_unref();
    },
    __wbg_abort_03f8c5804715cb9a: function(arg0, arg1) {
      arg0.abort(arg1);
    },
    __wbg_abort_76dea11221098ae5: function(arg0) {
      arg0.abort();
    },
    __wbg_append_8e87c13f0f08f8cd: function() {
      return handleError(function(arg0, arg1, arg2, arg3, arg4) {
        arg0.append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
      }, arguments);
    },
    __wbg_arrayBuffer_06f3da76f071d37f: function() {
      return handleError(function(arg0) {
        const ret = arg0.arrayBuffer();
        return ret;
      }, arguments);
    },
    __wbg_arrayBuffer_432de2b072afe7fb: function(arg0) {
      const ret = arg0.arrayBuffer();
      return ret;
    },
    __wbg_buffer_4a989bded7035f57: function(arg0) {
      const ret = arg0.buffer;
      return ret;
    },
    __wbg_byobRequest_f161fc37241dd3d4: function(arg0) {
      const ret = arg0.byobRequest;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_byteLength_0ddb1795e2c7e689: function(arg0) {
      const ret = arg0.byteLength;
      return ret;
    },
    __wbg_byteOffset_46eb015f52b6ad7d: function(arg0) {
      const ret = arg0.byteOffset;
      return ret;
    },
    __wbg_call_269c5566fbede3eb: function() {
      return handleError(function(arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
      }, arguments);
    },
    __wbg_call_6bcf8d3e20937e46: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
      }, arguments);
    },
    __wbg_cancel_c076350a7e8954be: function(arg0) {
      const ret = arg0.cancel();
      return ret;
    },
    __wbg_catch_e2134ef6dcdb69ed: function(arg0, arg1) {
      const ret = arg0.catch(arg1);
      return ret;
    },
    __wbg_clearTimeout_1daad5c6ee4fcd3b: function(arg0) {
      const ret = clearTimeout(arg0);
      return ret;
    },
    __wbg_close_22882088c136df25: function() {
      return handleError(function(arg0) {
        arg0.close();
      }, arguments);
    },
    __wbg_close_5c3f1f028070f2f7: function(arg0) {
      const ret = arg0.close();
      return ret;
    },
    __wbg_close_8b609460dd26e367: function() {
      return handleError(function(arg0) {
        arg0.close();
      }, arguments);
    },
    __wbg_columnchunkmetadata_new: function(arg0) {
      const ret = ColumnChunkMetaData.__wrap(arg0);
      return ret;
    },
    __wbg_done_cffed884d87aa22e: function(arg0) {
      const ret = arg0.done;
      return ret;
    },
    __wbg_enqueue_6cb545d22db14f33: function() {
      return handleError(function(arg0, arg1) {
        arg0.enqueue(arg1);
      }, arguments);
    },
    __wbg_entries_972a87586902cf87: function(arg0) {
      const ret = Object.entries(arg0);
      return ret;
    },
    __wbg_entries_f9de04c09a57314e: function(arg0) {
      const ret = arg0.entries();
      return ret;
    },
    __wbg_fetch_7a37768ab67c5bd8: function(arg0) {
      const ret = fetch(arg0);
      return ret;
    },
    __wbg_fetch_920242d59bac2026: function(arg0, arg1) {
      const ret = arg0.fetch(arg1);
      return ret;
    },
    __wbg_getReader_9facd4f899beac89: function() {
      return handleError(function(arg0) {
        const ret = arg0.getReader();
        return ret;
      }, arguments);
    },
    __wbg_getWriter_5a3d7baaf32780c4: function() {
      return handleError(function(arg0) {
        const ret = arg0.getWriter();
        return ret;
      }, arguments);
    },
    __wbg_get_6cf5a4d4d8ad3c5a: function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_get_b1f0ab13c737f856: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_done_a668aa62d81fad70: function(arg0) {
      const ret = arg0.done;
      return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
    },
    __wbg_get_unchecked_363572bdd397d473: function(arg0, arg1) {
      const ret = arg0[arg1 >>> 0];
      return ret;
    },
    __wbg_get_value_6c62a77c168d825a: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
      const ret = arg0[arg1];
      return ret;
    },
    __wbg_has_464f8b9416279d65: function() {
      return handleError(function(arg0, arg1) {
        const ret = Reflect.has(arg0, arg1);
        return ret;
      }, arguments);
    },
    __wbg_headers_2594464ff62969f3: function(arg0) {
      const ret = arg0.headers;
      return ret;
    },
    __wbg_instanceof_ArrayBuffer_d4ff01f8247925ae: function(arg0) {
      let result;
      try {
        result = arg0 instanceof ArrayBuffer;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Response_6366a785e400039b: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Response;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_instanceof_Uint8Array_598adc0fef426aa8: function(arg0) {
      let result;
      try {
        result = arg0 instanceof Uint8Array;
      } catch (_) {
        result = false;
      }
      const ret = result;
      return ret;
    },
    __wbg_isArray_5674713bb7b79043: function(arg0) {
      const ret = Array.isArray(arg0);
      return ret;
    },
    __wbg_isSafeInteger_8f51c743827d1ec5: function(arg0) {
      const ret = Number.isSafeInteger(arg0);
      return ret;
    },
    __wbg_iterator_22ddeb808cf55a6f: function() {
      const ret = Symbol.iterator;
      return ret;
    },
    __wbg_length_31bdaf014f5fbde2: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_length_4e1adc0d42e23620: function(arg0) {
      const ret = arg0.length;
      return ret;
    },
    __wbg_new_0afe64b4dc16ab74: function() {
      return handleError(function() {
        const ret = new Headers();
        return ret;
      }, arguments);
    },
    __wbg_new_1da3429bc3c4541c: function(arg0) {
      const ret = new Uint8Array(arg0);
      return ret;
    },
    __wbg_new_4f1be85c9b3162d4: function() {
      return handleError(function() {
        const ret = new TransformStream();
        return ret;
      }, arguments);
    },
    __wbg_new_8d36e20aa758e411: function() {
      const ret = /* @__PURE__ */ new Map();
      return ret;
    },
    __wbg_new_a32a1ab6c6655abe: function(arg0, arg1) {
      const ret = new Error(getStringFromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_new_baa0a0207935dd43: function() {
      return handleError(function() {
        const ret = new AbortController();
        return ret;
      }, arguments);
    },
    __wbg_new_bebc3f4757acf305: function() {
      const ret = new Object();
      return ret;
    },
    __wbg_new_from_slice_4ee02165f9de919e: function(arg0, arg1) {
      const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
      return ret;
    },
    __wbg_new_typed_6f8b0d724fe26c07: function(arg0, arg1) {
      try {
        var state0 = { a: arg0, b: arg1 };
        var cb0 = (arg02, arg12) => {
          const a = state0.a;
          state0.a = 0;
          try {
            return wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined_______true_(a, state0.b, arg02, arg12);
          } finally {
            state0.a = a;
          }
        };
        const ret = new Promise(cb0);
        return ret;
      } finally {
        state0.a = 0;
      }
    },
    __wbg_new_with_byte_offset_aede39235d71ca64: function(arg0, arg1) {
      const ret = new Uint8Array(arg0, arg1 >>> 0);
      return ret;
    },
    __wbg_new_with_byte_offset_and_length_492c969e8b5da8a4: function(arg0, arg1, arg2) {
      const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
      return ret;
    },
    __wbg_new_with_into_underlying_source_fd904252f385f59c: function(arg0, arg1) {
      const ret = new ReadableStream(IntoUnderlyingSource.__wrap(arg0), arg1);
      return ret;
    },
    __wbg_new_with_str_and_init_2f31a77deda127fd: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
      }, arguments);
    },
    __wbg_next_95053e306b1c3aed: function(arg0) {
      const ret = arg0.next;
      return ret;
    },
    __wbg_next_f31ecb8646d2c605: function() {
      return handleError(function(arg0) {
        const ret = arg0.next();
        return ret;
      }, arguments);
    },
    __wbg_parquetfile_new: function(arg0) {
      const ret = ParquetFile.__wrap(arg0);
      return ret;
    },
    __wbg_prototypesetcall_ae9f5e7459250748: function(arg0, arg1, arg2) {
      Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
    },
    __wbg_queueMicrotask_85c90f6987555d65: function(arg0) {
      const ret = arg0.queueMicrotask;
      return ret;
    },
    __wbg_queueMicrotask_f6a1fa10b81d1fc0: function(arg0) {
      queueMicrotask(arg0);
    },
    __wbg_read_31091533ffadf971: function(arg0) {
      const ret = arg0.read();
      return ret;
    },
    __wbg_readable_dd742feaf61adcb9: function(arg0) {
      const ret = arg0.readable;
      return ret;
    },
    __wbg_ready_196967f79af47b0d: function(arg0) {
      const ret = arg0.ready;
      return ret;
    },
    __wbg_recordbatch_new: function(arg0) {
      const ret = RecordBatch.__wrap(arg0);
      return ret;
    },
    __wbg_recordbatch_unwrap: function(arg0) {
      const ret = RecordBatch.__unwrap(arg0);
      return ret;
    },
    __wbg_releaseLock_1538945f5f183d9f: function(arg0) {
      arg0.releaseLock();
    },
    __wbg_releaseLock_508d9818266235f2: function(arg0) {
      arg0.releaseLock();
    },
    __wbg_resolve_35ec7e0c6af4c82c: function(arg0) {
      const ret = Promise.resolve(arg0);
      return ret;
    },
    __wbg_respond_83a71686e927ca32: function() {
      return handleError(function(arg0, arg1) {
        arg0.respond(arg1 >>> 0);
      }, arguments);
    },
    __wbg_rowgroupmetadata_new: function(arg0) {
      const ret = RowGroupMetaData.__wrap(arg0);
      return ret;
    },
    __wbg_setTimeout_b4a9096784635514: function(arg0, arg1) {
      const ret = setTimeout(arg0, arg1);
      return ret;
    },
    __wbg_set_5f2ad37e5e02dc7b: function(arg0, arg1, arg2) {
      arg0.set(getArrayU8FromWasm0(arg1, arg2));
    },
    __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
      arg0[arg1] = arg2;
    },
    __wbg_set_bf6dde4923b9b059: function(arg0, arg1, arg2) {
      const ret = arg0.set(arg1, arg2);
      return ret;
    },
    __wbg_set_body_f39cee72c74a5b02: function(arg0, arg1) {
      arg0.body = arg1;
    },
    __wbg_set_cache_6e8c35a5ed76edb1: function(arg0, arg1) {
      arg0.cache = __wbindgen_enum_RequestCache[arg1];
    },
    __wbg_set_credentials_bf1d3e014213a571: function(arg0, arg1) {
      arg0.credentials = __wbindgen_enum_RequestCredentials[arg1];
    },
    __wbg_set_headers_31d373f68f28bf76: function(arg0, arg1) {
      arg0.headers = arg1;
    },
    __wbg_set_high_water_mark_089e3476522036ad: function(arg0, arg1) {
      arg0.highWaterMark = arg1;
    },
    __wbg_set_method_82e6c3c083da0734: function(arg0, arg1, arg2) {
      arg0.method = getStringFromWasm0(arg1, arg2);
    },
    __wbg_set_mode_f7e56ed768d0ade0: function(arg0, arg1) {
      arg0.mode = __wbindgen_enum_RequestMode[arg1];
    },
    __wbg_set_referrer_13cf56bbccbb2ceb: function(arg0, arg1, arg2) {
      arg0.referrer = getStringFromWasm0(arg1, arg2);
    },
    __wbg_set_referrer_policy_dac1caa6e937479a: function(arg0, arg1) {
      arg0.referrerPolicy = __wbindgen_enum_ReferrerPolicy[arg1];
    },
    __wbg_set_signal_f4b32f40f19786f4: function(arg0, arg1) {
      arg0.signal = arg1;
    },
    __wbg_signal_45367c6c2255877a: function(arg0) {
      const ret = arg0.signal;
      return ret;
    },
    __wbg_size_338f1717fbf84c4e: function(arg0) {
      const ret = arg0.size;
      return ret;
    },
    __wbg_slice_49f10e038e37aae3: function() {
      return handleError(function(arg0, arg1, arg2) {
        const ret = arg0.slice(arg1, arg2);
        return ret;
      }, arguments);
    },
    __wbg_static_accessor_GLOBAL_8eb4cd83130a11a0: function() {
      const ret = typeof global === "undefined" ? null : global;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_GLOBAL_THIS_1e7044f654e934db: function() {
      const ret = typeof globalThis === "undefined" ? null : globalThis;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_SELF_d8b50611246a6d92: function() {
      const ret = typeof self === "undefined" ? null : self;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_static_accessor_WINDOW_fd0bc376bf0f8b42: function() {
      const ret = typeof window === "undefined" ? null : window;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_status_88ccc72fe7bea621: function(arg0) {
      const ret = arg0.status;
      return ret;
    },
    __wbg_table_new: function(arg0) {
      const ret = Table.__wrap(arg0);
      return ret;
    },
    __wbg_then_7a850dae4493f353: function(arg0, arg1, arg2) {
      const ret = arg0.then(arg1, arg2);
      return ret;
    },
    __wbg_then_b830475380919203: function(arg0, arg1) {
      const ret = arg0.then(arg1);
      return ret;
    },
    __wbg_toString_794a30e85c994f2a: function(arg0) {
      const ret = arg0.toString();
      return ret;
    },
    __wbg_url_f1948b0d7f881e02: function(arg0, arg1) {
      const ret = arg1.url;
      const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
      const len1 = WASM_VECTOR_LEN;
      getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
      getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    },
    __wbg_value_c227f843d21da141: function(arg0) {
      const ret = arg0.value;
      return ret;
    },
    __wbg_view_d8c7b26e4d4650f1: function(arg0) {
      const ret = arg0.view;
      return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    },
    __wbg_writable_bf33d3f9fb228429: function(arg0) {
      const ret = arg0.writable;
      return ret;
    },
    __wbg_write_d32d19927af3f942: function(arg0, arg1) {
      const ret = arg0.write(arg1);
      return ret;
    },
    __wbindgen_generic_0000000000000001: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue______true_);
      return ret;
    },
    __wbindgen_generic_0000000000000002: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue__core_ed718c3d60ebd546___result__Result_____wasm_bindgen_99813b3b1a8e014b___JsError___true_);
      return ret;
    },
    __wbindgen_generic_0000000000000003: function(arg0, arg1) {
      const ret = makeMutClosure(arg0, arg1, wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke_______true_);
      return ret;
    },
    __wbindgen_generic_0000000000000004: function(arg0) {
      const ret = arg0;
      return ret;
    },
    __wbindgen_generic_0000000000000005: function(arg0, arg1) {
      const ret = getStringFromWasm0(arg0, arg1);
      return ret;
    },
    __wbindgen_generic_0000000000000006: function(arg0) {
      const ret = BigInt.asUintN(64, arg0);
      return ret;
    },
    __wbindgen_init_externref_table: function() {
      const table = wasm.__wbindgen_externrefs;
      const offset = table.grow(4);
      table.set(0, void 0);
      table.set(offset + 0, void 0);
      table.set(offset + 1, null);
      table.set(offset + 2, true);
      table.set(offset + 3, false);
    }
  };
  return {
    __proto__: null,
    "./parquet_wasm_bg.js": import0
  };
}
function wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke_______true_(arg0, arg1) {
  wasm.wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke_______true_(arg0, arg1);
}
function wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue______true_(arg0, arg1, arg2) {
  wasm.wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue______true_(arg0, arg1, arg2);
}
function wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue__core_ed718c3d60ebd546___result__Result_____wasm_bindgen_99813b3b1a8e014b___JsError___true_(arg0, arg1, arg2) {
  const ret = wasm.wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___wasm_bindgen_99813b3b1a8e014b___JsValue__core_ed718c3d60ebd546___result__Result_____wasm_bindgen_99813b3b1a8e014b___JsError___true_(arg0, arg1, arg2);
  if (ret[1]) {
    throw takeFromExternrefTable0(ret[0]);
  }
}
function wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen_99813b3b1a8e014b___convert__closures_____invoke___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined___js_sys_3ebe6d640d24e171___Function_fn_wasm_bindgen_99813b3b1a8e014b___JsValue_____wasm_bindgen_99813b3b1a8e014b___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}
var __wbindgen_enum_ReadableStreamType = ["bytes"];
var __wbindgen_enum_ReferrerPolicy = ["", "no-referrer", "no-referrer-when-downgrade", "origin", "origin-when-cross-origin", "unsafe-url", "same-origin", "strict-origin", "strict-origin-when-cross-origin"];
var __wbindgen_enum_RequestCache = ["default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached"];
var __wbindgen_enum_RequestCredentials = ["omit", "same-origin", "include"];
var __wbindgen_enum_RequestMode = ["same-origin", "no-cors", "cors", "navigate"];
var ColumnChunkMetaDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_columnchunkmetadata_free(ptr, 1));
var FFIDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_ffidata_free(ptr, 1));
var FFISchemaFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_ffischema_free(ptr, 1));
var FFIStreamFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_ffistream_free(ptr, 1));
var FileMetaDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_filemetadata_free(ptr, 1));
var IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingbytesource_free(ptr, 1));
var IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsink_free(ptr, 1));
var IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsource_free(ptr, 1));
var ParquetFileFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_parquetfile_free(ptr, 1));
var ParquetMetaDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_parquetmetadata_free(ptr, 1));
var RecordBatchFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_recordbatch_free(ptr, 1));
var RowGroupMetaDataFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_rowgroupmetadata_free(ptr, 1));
var SchemaFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_schema_free(ptr, 1));
var TableFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_table_free(ptr, 1));
var WriterPropertiesFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_writerproperties_free(ptr, 1));
var WriterPropertiesBuilderFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_writerpropertiesbuilder_free(ptr, 1));
function addToExternrefTable0(obj) {
  const idx = wasm.__externref_table_alloc();
  wasm.__wbindgen_externrefs.set(idx, obj);
  return idx;
}
function _assertClass(instance8, klass) {
  if (!(instance8 instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((state) => wasm.__wbindgen_destroy_closure(state.a, state.b));
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
  }
  wasm.__externref_drop_slice(ptr, len);
  return result;
}
function getArrayU32FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
function getStringFromWasm0(ptr, len) {
  return decodeText(ptr >>> 0, len);
}
var cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
  if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
    cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
  }
  return cachedUint32ArrayMemory0;
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    const idx = addToExternrefTable0(e);
    wasm.__wbindgen_exn_store(idx);
  }
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function makeMutClosure(arg0, arg1, f) {
  const state = { a: arg0, b: arg1, cnt: 1 };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      state.a = a;
      real._wbg_cb_unref();
    }
  };
  real._wbg_cb_unref = () => {
    if (--state.cnt === 0) {
      wasm.__wbindgen_destroy_closure(state.a, state.b);
      state.a = 0;
      CLOSURE_DTORS.unregister(state);
    }
  };
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function passArray8ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 1, 1) >>> 0;
  getUint8ArrayMemory0().set(arg, ptr / 1);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = cachedTextEncoder.encodeInto(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function takeFromExternrefTable0(idx) {
  const value = wasm.__wbindgen_externrefs.get(idx);
  wasm.__externref_table_dealloc(idx);
  return value;
}
var cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
var MAX_SAFARI_DECODE_BYTES = 2146435072;
var numBytesDecoded = 0;
function decodeText(ptr, len) {
  numBytesDecoded += len;
  if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    numBytesDecoded = len;
  }
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var cachedTextEncoder = new TextEncoder();
if (!("encodeInto" in cachedTextEncoder)) {
  cachedTextEncoder.encodeInto = function(arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
      read: arg.length,
      written: buf.length
    };
  };
}
var WASM_VECTOR_LEN = 0;
var wasmModule;
var wasmInstance;
var wasm;
function __wbg_finalize_init(instance8, module2) {
  wasmInstance = instance8;
  wasm = instance8.exports;
  wasmModule = module2;
  cachedDataViewMemory0 = null;
  cachedUint32ArrayMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  wasm.__wbindgen_start();
  return wasm;
}
function initSync(module2) {
  if (wasm !== void 0) return wasm;
  if (module2 !== void 0) {
    if (Object.getPrototypeOf(module2) === Object.prototype) {
      ({ module: module2 } = module2);
    } else {
      console.warn("using deprecated parameters for `initSync()`; pass a single object instead");
    }
  }
  const imports = __wbg_get_imports();
  if (!(module2 instanceof WebAssembly.Module)) {
    module2 = new WebAssembly.Module(module2);
  }
  const instance8 = new WebAssembly.Instance(module2, imports);
  return __wbg_finalize_init(instance8, module2);
}

// node_modules/tslib/tslib.es6.mjs
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}

// node_modules/apache-arrow/util/buffer.mjs
var buffer_exports = {};
__export(buffer_exports, {
  compareArrayLike: () => compareArrayLike,
  joinUint8Arrays: () => joinUint8Arrays,
  memcpy: () => memcpy,
  rebaseValueOffsets: () => rebaseValueOffsets,
  toArrayBufferView: () => toArrayBufferView,
  toArrayBufferViewAsyncIterator: () => toArrayBufferViewAsyncIterator,
  toArrayBufferViewIterator: () => toArrayBufferViewIterator,
  toBigInt64Array: () => toBigInt64Array,
  toBigUint64Array: () => toBigUint64Array,
  toFloat32Array: () => toFloat32Array,
  toFloat32ArrayAsyncIterator: () => toFloat32ArrayAsyncIterator,
  toFloat32ArrayIterator: () => toFloat32ArrayIterator,
  toFloat64Array: () => toFloat64Array,
  toFloat64ArrayAsyncIterator: () => toFloat64ArrayAsyncIterator,
  toFloat64ArrayIterator: () => toFloat64ArrayIterator,
  toInt16Array: () => toInt16Array,
  toInt16ArrayAsyncIterator: () => toInt16ArrayAsyncIterator,
  toInt16ArrayIterator: () => toInt16ArrayIterator,
  toInt32Array: () => toInt32Array,
  toInt32ArrayAsyncIterator: () => toInt32ArrayAsyncIterator,
  toInt32ArrayIterator: () => toInt32ArrayIterator,
  toInt8Array: () => toInt8Array,
  toInt8ArrayAsyncIterator: () => toInt8ArrayAsyncIterator,
  toInt8ArrayIterator: () => toInt8ArrayIterator,
  toUint16Array: () => toUint16Array,
  toUint16ArrayAsyncIterator: () => toUint16ArrayAsyncIterator,
  toUint16ArrayIterator: () => toUint16ArrayIterator,
  toUint32Array: () => toUint32Array,
  toUint32ArrayAsyncIterator: () => toUint32ArrayAsyncIterator,
  toUint32ArrayIterator: () => toUint32ArrayIterator,
  toUint8Array: () => toUint8Array,
  toUint8ArrayAsyncIterator: () => toUint8ArrayAsyncIterator,
  toUint8ArrayIterator: () => toUint8ArrayIterator,
  toUint8ClampedArray: () => toUint8ClampedArray,
  toUint8ClampedArrayAsyncIterator: () => toUint8ClampedArrayAsyncIterator,
  toUint8ClampedArrayIterator: () => toUint8ClampedArrayIterator
});

// node_modules/apache-arrow/util/utf8.mjs
var decoder = new TextDecoder("utf-8");
var decodeUtf8 = decoder.decode.bind(decoder);
var encoder = new TextEncoder();
var encodeUtf8 = (value) => encoder.encode(value);

// node_modules/apache-arrow/util/compat.mjs
var isNumber = (x) => typeof x === "number";
var isBoolean = (x) => typeof x === "boolean";
var isFunction = (x) => typeof x === "function";
var isObject = (x) => x != null && Object(x) === x;
var isPromise = (x) => {
  return isObject(x) && isFunction(x.then);
};
var isIterable = (x) => {
  return isObject(x) && isFunction(x[Symbol.iterator]);
};
var isAsyncIterable = (x) => {
  return isObject(x) && isFunction(x[Symbol.asyncIterator]);
};
var isArrowJSON = (x) => {
  return isObject(x) && isObject(x["schema"]);
};
var isIteratorResult = (x) => {
  return isObject(x) && "done" in x && "value" in x;
};
var isFileHandle = (x) => {
  return isObject(x) && isFunction(x["stat"]) && isNumber(x["fd"]);
};
var isFetchResponse = (x) => {
  return isObject(x) && isReadableDOMStream(x["body"]);
};
var isReadableInterop = (x) => "_getDOMStream" in x && "_getNodeStream" in x;
var isWritableDOMStream = (x) => {
  return isObject(x) && isFunction(x["abort"]) && isFunction(x["getWriter"]) && !isReadableInterop(x);
};
var isReadableDOMStream = (x) => {
  return isObject(x) && isFunction(x["cancel"]) && isFunction(x["getReader"]) && !isReadableInterop(x);
};
var isWritableNodeStream = (x) => {
  return isObject(x) && isFunction(x["end"]) && isFunction(x["write"]) && isBoolean(x["writable"]) && !isReadableInterop(x);
};
var isReadableNodeStream = (x) => {
  return isObject(x) && isFunction(x["read"]) && isFunction(x["pipe"]) && isBoolean(x["readable"]) && !isReadableInterop(x);
};
var isFlatbuffersByteBuffer = (x) => {
  return isObject(x) && isFunction(x["clear"]) && isFunction(x["bytes"]) && isFunction(x["position"]) && isFunction(x["setPosition"]) && isFunction(x["capacity"]) && isFunction(x["getBufferIdentifier"]) && isFunction(x["createLong"]);
};

// node_modules/apache-arrow/util/buffer.mjs
var SharedArrayBuf = typeof SharedArrayBuffer !== "undefined" ? SharedArrayBuffer : ArrayBuffer;
function collapseContiguousByteRanges(chunks) {
  const result = chunks[0] ? [chunks[0]] : [];
  let xOffset, yOffset, xLen, yLen;
  for (let x, y, i = 0, j = 0, n = chunks.length; ++i < n; ) {
    x = result[j];
    y = chunks[i];
    if (!x || !y || x.buffer !== y.buffer || y.byteOffset < x.byteOffset) {
      y && (result[++j] = y);
      continue;
    }
    ({ byteOffset: xOffset, byteLength: xLen } = x);
    ({ byteOffset: yOffset, byteLength: yLen } = y);
    if (xOffset + xLen < yOffset || yOffset + yLen < xOffset) {
      y && (result[++j] = y);
      continue;
    }
    result[j] = new Uint8Array(x.buffer, xOffset, yOffset - xOffset + yLen);
  }
  return result;
}
function memcpy(target, source, targetByteOffset = 0, sourceByteLength = source.byteLength) {
  const targetByteLength = target.byteLength;
  const dst = new Uint8Array(target.buffer, target.byteOffset, targetByteLength);
  const src = new Uint8Array(source.buffer, source.byteOffset, Math.min(sourceByteLength, targetByteLength));
  dst.set(src, targetByteOffset);
  return target;
}
function joinUint8Arrays(chunks, size) {
  const result = collapseContiguousByteRanges(chunks);
  const byteLength = result.reduce((x, b) => x + b.byteLength, 0);
  let source, sliced, buffer;
  let offset = 0, index = -1;
  const length = Math.min(size || Number.POSITIVE_INFINITY, byteLength);
  for (const n = result.length; ++index < n; ) {
    source = result[index];
    sliced = source.subarray(0, Math.min(source.length, length - offset));
    if (length <= offset + sliced.length) {
      if (sliced.length < source.length) {
        result[index] = source.subarray(sliced.length);
      } else if (sliced.length === source.length) {
        index++;
      }
      buffer ? memcpy(buffer, sliced, offset) : buffer = sliced;
      break;
    }
    memcpy(buffer || (buffer = new Uint8Array(length)), sliced, offset);
    offset += sliced.length;
  }
  return [buffer || new Uint8Array(0), result.slice(index), byteLength - (buffer ? buffer.byteLength : 0)];
}
function toArrayBufferView(ArrayBufferViewCtor, input) {
  let value = isIteratorResult(input) ? input.value : input;
  if (value instanceof ArrayBufferViewCtor) {
    if (ArrayBufferViewCtor === Uint8Array) {
      return new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength);
    }
    return value;
  }
  if (!value) {
    return new ArrayBufferViewCtor(0);
  }
  if (typeof value === "string") {
    value = encodeUtf8(value);
  }
  if (value instanceof ArrayBuffer) {
    return new ArrayBufferViewCtor(value);
  }
  if (value instanceof SharedArrayBuf) {
    return new ArrayBufferViewCtor(value);
  }
  if (isFlatbuffersByteBuffer(value)) {
    return toArrayBufferView(ArrayBufferViewCtor, value.bytes());
  }
  return !ArrayBuffer.isView(value) ? ArrayBufferViewCtor.from(value) : value.byteLength <= 0 ? new ArrayBufferViewCtor(0) : new ArrayBufferViewCtor(value.buffer, value.byteOffset, value.byteLength / ArrayBufferViewCtor.BYTES_PER_ELEMENT);
}
var toInt8Array = (input) => toArrayBufferView(Int8Array, input);
var toInt16Array = (input) => toArrayBufferView(Int16Array, input);
var toInt32Array = (input) => toArrayBufferView(Int32Array, input);
var toBigInt64Array = (input) => toArrayBufferView(BigInt64Array, input);
var toUint8Array = (input) => toArrayBufferView(Uint8Array, input);
var toUint16Array = (input) => toArrayBufferView(Uint16Array, input);
var toUint32Array = (input) => toArrayBufferView(Uint32Array, input);
var toBigUint64Array = (input) => toArrayBufferView(BigUint64Array, input);
var toFloat32Array = (input) => toArrayBufferView(Float32Array, input);
var toFloat64Array = (input) => toArrayBufferView(Float64Array, input);
var toUint8ClampedArray = (input) => toArrayBufferView(Uint8ClampedArray, input);
var pump = (iterator) => {
  iterator.next();
  return iterator;
};
function* toArrayBufferViewIterator(ArrayCtor, source) {
  const wrap = function* (x) {
    yield x;
  };
  const buffers = typeof source === "string" ? wrap(source) : ArrayBuffer.isView(source) ? wrap(source) : source instanceof ArrayBuffer ? wrap(source) : source instanceof SharedArrayBuf ? wrap(source) : !isIterable(source) ? wrap(source) : source;
  yield* pump((function* (it) {
    let r = null;
    do {
      r = it.next(yield toArrayBufferView(ArrayCtor, r));
    } while (!r.done);
  })(buffers[Symbol.iterator]()));
  return new ArrayCtor();
}
var toInt8ArrayIterator = (input) => toArrayBufferViewIterator(Int8Array, input);
var toInt16ArrayIterator = (input) => toArrayBufferViewIterator(Int16Array, input);
var toInt32ArrayIterator = (input) => toArrayBufferViewIterator(Int32Array, input);
var toUint8ArrayIterator = (input) => toArrayBufferViewIterator(Uint8Array, input);
var toUint16ArrayIterator = (input) => toArrayBufferViewIterator(Uint16Array, input);
var toUint32ArrayIterator = (input) => toArrayBufferViewIterator(Uint32Array, input);
var toFloat32ArrayIterator = (input) => toArrayBufferViewIterator(Float32Array, input);
var toFloat64ArrayIterator = (input) => toArrayBufferViewIterator(Float64Array, input);
var toUint8ClampedArrayIterator = (input) => toArrayBufferViewIterator(Uint8ClampedArray, input);
function toArrayBufferViewAsyncIterator(ArrayCtor, source) {
  return __asyncGenerator(this, arguments, function* toArrayBufferViewAsyncIterator_1() {
    if (isPromise(source)) {
      return yield __await(yield __await(yield* __asyncDelegator(__asyncValues(toArrayBufferViewAsyncIterator(ArrayCtor, yield __await(source))))));
    }
    const wrap = function(x) {
      return __asyncGenerator(this, arguments, function* () {
        yield yield __await(yield __await(x));
      });
    };
    const emit = function(source2) {
      return __asyncGenerator(this, arguments, function* () {
        yield __await(yield* __asyncDelegator(__asyncValues(pump((function* (it) {
          let r = null;
          do {
            r = it.next(yield r === null || r === void 0 ? void 0 : r.value);
          } while (!r.done);
        })(source2[Symbol.iterator]())))));
      });
    };
    const buffers = typeof source === "string" ? wrap(source) : ArrayBuffer.isView(source) ? wrap(source) : source instanceof ArrayBuffer ? wrap(source) : source instanceof SharedArrayBuf ? wrap(source) : isIterable(source) ? emit(source) : !isAsyncIterable(source) ? wrap(source) : source;
    yield __await(
      // otherwise if AsyncIterable, use it
      yield* __asyncDelegator(__asyncValues(pump((function(it) {
        return __asyncGenerator(this, arguments, function* () {
          let r = null;
          do {
            r = yield __await(it.next(yield yield __await(toArrayBufferView(ArrayCtor, r))));
          } while (!r.done);
        });
      })(buffers[Symbol.asyncIterator]()))))
    );
    return yield __await(new ArrayCtor());
  });
}
var toInt8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int8Array, input);
var toInt16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int16Array, input);
var toInt32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Int32Array, input);
var toUint8ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8Array, input);
var toUint16ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint16Array, input);
var toUint32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint32Array, input);
var toFloat32ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float32Array, input);
var toFloat64ArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Float64Array, input);
var toUint8ClampedArrayAsyncIterator = (input) => toArrayBufferViewAsyncIterator(Uint8ClampedArray, input);
function rebaseValueOffsets(offset, length, valueOffsets) {
  if (offset !== 0) {
    valueOffsets = valueOffsets.slice(0, length);
    const delta = typeof valueOffsets[0] === "bigint" ? BigInt(offset) : offset;
    for (let i = -1, n = valueOffsets.length; ++i < n; ) {
      valueOffsets[i] += delta;
    }
  }
  return valueOffsets.subarray(0, length);
}
function compareArrayLike(a, b) {
  let i = 0;
  const n = a.length;
  if (n !== b.length) {
    return false;
  }
  if (n > 0) {
    do {
      if (a[i] !== b[i]) {
        return false;
      }
    } while (++i < n);
  }
  return true;
}

// node_modules/apache-arrow/io/adapters.mjs
var adapters_default = {
  fromIterable(source) {
    return pump2(fromIterable(source));
  },
  fromAsyncIterable(source) {
    return pump2(fromAsyncIterable(source));
  },
  fromDOMStream(source) {
    return pump2(fromDOMStream(source));
  },
  fromNodeStream(stream) {
    return pump2(fromNodeStream(stream));
  },
  // @ts-ignore
  toDOMStream(source, options) {
    throw new Error(`"toDOMStream" not available in this environment`);
  },
  // @ts-ignore
  toNodeStream(source, options) {
    throw new Error(`"toNodeStream" not available in this environment`);
  }
};
var pump2 = (iterator) => {
  iterator.next();
  return iterator;
};
function* fromIterable(source) {
  let done, threw = false;
  let buffers = [], buffer;
  let cmd, size, bufferLength = 0;
  function byteRange() {
    if (cmd === "peek") {
      return joinUint8Arrays(buffers, size)[0];
    }
    [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
    return buffer;
  }
  ({ cmd, size } = (yield /* @__PURE__ */ (() => null)()) || { cmd: "read", size: 0 });
  const it = toUint8ArrayIterator(source)[Symbol.iterator]();
  try {
    do {
      ({ done, value: buffer } = Number.isNaN(size - bufferLength) ? it.next() : it.next(size - bufferLength));
      if (!done && buffer.byteLength > 0) {
        buffers.push(buffer);
        bufferLength += buffer.byteLength;
      }
      if (done || size <= bufferLength) {
        do {
          ({ cmd, size } = yield byteRange());
        } while (size < bufferLength);
      }
    } while (!done);
  } catch (e) {
    threw = true;
    typeof it.throw === "function" && it.throw(e);
  } finally {
    threw === false && typeof it.return === "function" && it.return(null);
  }
  return null;
}
function fromAsyncIterable(source) {
  return __asyncGenerator(this, arguments, function* fromAsyncIterable_1() {
    let done, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
      if (cmd === "peek") {
        return joinUint8Arrays(buffers, size)[0];
      }
      [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
      return buffer;
    }
    ({ cmd, size } = (yield yield __await(/* @__PURE__ */ (() => null)())) || { cmd: "read", size: 0 });
    const it = toUint8ArrayAsyncIterator(source)[Symbol.asyncIterator]();
    try {
      do {
        ({ done, value: buffer } = Number.isNaN(size - bufferLength) ? yield __await(it.next()) : yield __await(it.next(size - bufferLength)));
        if (!done && buffer.byteLength > 0) {
          buffers.push(buffer);
          bufferLength += buffer.byteLength;
        }
        if (done || size <= bufferLength) {
          do {
            ({ cmd, size } = yield yield __await(byteRange()));
          } while (size < bufferLength);
        }
      } while (!done);
    } catch (e) {
      threw = true;
      typeof it.throw === "function" && (yield __await(it.throw(e)));
    } finally {
      threw === false && typeof it.return === "function" && (yield __await(it.return(new Uint8Array(0))));
    }
    return yield __await(null);
  });
}
function fromDOMStream(source) {
  return __asyncGenerator(this, arguments, function* fromDOMStream_1() {
    let done = false, threw = false;
    let buffers = [], buffer;
    let cmd, size, bufferLength = 0;
    function byteRange() {
      if (cmd === "peek") {
        return joinUint8Arrays(buffers, size)[0];
      }
      [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
      return buffer;
    }
    ({ cmd, size } = (yield yield __await(/* @__PURE__ */ (() => null)())) || { cmd: "read", size: 0 });
    const it = new AdaptiveByteReader(source);
    try {
      do {
        ({ done, value: buffer } = Number.isNaN(size - bufferLength) ? yield __await(it["read"]()) : yield __await(it["read"](size - bufferLength)));
        if (!done && buffer.byteLength > 0) {
          buffers.push(toUint8Array(buffer));
          bufferLength += buffer.byteLength;
        }
        if (done || size <= bufferLength) {
          do {
            ({ cmd, size } = yield yield __await(byteRange()));
          } while (size < bufferLength);
        }
      } while (!done);
    } catch (e) {
      threw = true;
      yield __await(it["cancel"](e));
    } finally {
      threw === false ? yield __await(it["cancel"]()) : source["locked"] && it.releaseLock();
    }
    return yield __await(null);
  });
}
var AdaptiveByteReader = class {
  constructor(source) {
    this.source = source;
    this.reader = null;
    this.reader = this.source["getReader"]();
    this.reader["closed"].catch(() => {
    });
  }
  get closed() {
    return this.reader ? this.reader["closed"].catch(() => {
    }) : Promise.resolve();
  }
  releaseLock() {
    if (this.reader) {
      this.reader.releaseLock();
    }
    this.reader = null;
  }
  cancel(reason) {
    return __awaiter(this, void 0, void 0, function* () {
      const { reader, source } = this;
      reader && (yield reader["cancel"](reason).catch(() => {
      }));
      source && (source["locked"] && this.releaseLock());
    });
  }
  read(size) {
    return __awaiter(this, void 0, void 0, function* () {
      if (size === 0) {
        return { done: this.reader == null, value: new Uint8Array(0) };
      }
      const result = yield this.reader.read();
      !result.done && (result.value = toUint8Array(result));
      return result;
    });
  }
};
var onEvent = (stream, event) => {
  const handler = (_) => resolve([event, _]);
  let resolve;
  return [event, handler, new Promise((r) => (resolve = r) && stream["once"](event, handler))];
};
function fromNodeStream(stream) {
  return __asyncGenerator(this, arguments, function* fromNodeStream_1() {
    const events = [];
    let event = "error";
    let done = false, err = null;
    let cmd, size, bufferLength = 0;
    let buffers = [], buffer;
    function byteRange() {
      if (cmd === "peek") {
        return joinUint8Arrays(buffers, size)[0];
      }
      [buffer, buffers, bufferLength] = joinUint8Arrays(buffers, size);
      return buffer;
    }
    ({ cmd, size } = (yield yield __await(/* @__PURE__ */ (() => null)())) || { cmd: "read", size: 0 });
    if (stream["isTTY"]) {
      yield yield __await(new Uint8Array(0));
      return yield __await(null);
    }
    try {
      events[0] = onEvent(stream, "end");
      events[1] = onEvent(stream, "error");
      do {
        events[2] = onEvent(stream, "readable");
        [event, err] = yield __await(Promise.race(events.map((x) => x[2])));
        if (event === "error") {
          break;
        }
        if (!(done = event === "end")) {
          if (!Number.isFinite(size - bufferLength)) {
            buffer = toUint8Array(stream["read"]());
          } else {
            buffer = toUint8Array(stream["read"](size - bufferLength));
            if (buffer.byteLength < size - bufferLength) {
              buffer = toUint8Array(stream["read"]());
            }
          }
          if (buffer.byteLength > 0) {
            buffers.push(buffer);
            bufferLength += buffer.byteLength;
          }
        }
        if (done || size <= bufferLength) {
          do {
            ({ cmd, size } = yield yield __await(byteRange()));
          } while (size < bufferLength);
        }
      } while (!done);
    } finally {
      yield __await(cleanup(events, event === "error" ? err : null));
    }
    return yield __await(null);
    function cleanup(events2, err2) {
      buffer = buffers = null;
      return new Promise((resolve, reject) => {
        for (const [evt, fn] of events2) {
          stream["off"](evt, fn);
        }
        try {
          const destroy = stream["destroy"];
          destroy && destroy.call(stream, err2);
          err2 = void 0;
        } catch (e) {
          err2 = e || err2;
        } finally {
          err2 != null ? reject(err2) : resolve();
        }
      });
    }
  });
}

// node_modules/apache-arrow/fb/metadata-version.mjs
var MetadataVersion;
(function(MetadataVersion2) {
  MetadataVersion2[MetadataVersion2["V1"] = 0] = "V1";
  MetadataVersion2[MetadataVersion2["V2"] = 1] = "V2";
  MetadataVersion2[MetadataVersion2["V3"] = 2] = "V3";
  MetadataVersion2[MetadataVersion2["V4"] = 3] = "V4";
  MetadataVersion2[MetadataVersion2["V5"] = 4] = "V5";
})(MetadataVersion || (MetadataVersion = {}));

// node_modules/apache-arrow/fb/union-mode.mjs
var UnionMode;
(function(UnionMode2) {
  UnionMode2[UnionMode2["Sparse"] = 0] = "Sparse";
  UnionMode2[UnionMode2["Dense"] = 1] = "Dense";
})(UnionMode || (UnionMode = {}));

// node_modules/apache-arrow/fb/precision.mjs
var Precision;
(function(Precision2) {
  Precision2[Precision2["HALF"] = 0] = "HALF";
  Precision2[Precision2["SINGLE"] = 1] = "SINGLE";
  Precision2[Precision2["DOUBLE"] = 2] = "DOUBLE";
})(Precision || (Precision = {}));

// node_modules/apache-arrow/fb/date-unit.mjs
var DateUnit;
(function(DateUnit2) {
  DateUnit2[DateUnit2["DAY"] = 0] = "DAY";
  DateUnit2[DateUnit2["MILLISECOND"] = 1] = "MILLISECOND";
})(DateUnit || (DateUnit = {}));

// node_modules/apache-arrow/fb/time-unit.mjs
var TimeUnit;
(function(TimeUnit2) {
  TimeUnit2[TimeUnit2["SECOND"] = 0] = "SECOND";
  TimeUnit2[TimeUnit2["MILLISECOND"] = 1] = "MILLISECOND";
  TimeUnit2[TimeUnit2["MICROSECOND"] = 2] = "MICROSECOND";
  TimeUnit2[TimeUnit2["NANOSECOND"] = 3] = "NANOSECOND";
})(TimeUnit || (TimeUnit = {}));

// node_modules/apache-arrow/fb/interval-unit.mjs
var IntervalUnit;
(function(IntervalUnit2) {
  IntervalUnit2[IntervalUnit2["YEAR_MONTH"] = 0] = "YEAR_MONTH";
  IntervalUnit2[IntervalUnit2["DAY_TIME"] = 1] = "DAY_TIME";
  IntervalUnit2[IntervalUnit2["MONTH_DAY_NANO"] = 2] = "MONTH_DAY_NANO";
})(IntervalUnit || (IntervalUnit = {}));

// node_modules/apache-arrow/fb/dictionary-batch.mjs
var flatbuffers3 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/record-batch.mjs
var flatbuffers2 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/body-compression.mjs
var flatbuffers = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/body-compression-method.mjs
var BodyCompressionMethod;
(function(BodyCompressionMethod2) {
  BodyCompressionMethod2[BodyCompressionMethod2["BUFFER"] = 0] = "BUFFER";
})(BodyCompressionMethod || (BodyCompressionMethod = {}));

// node_modules/apache-arrow/fb/compression-type.mjs
var CompressionType;
(function(CompressionType2) {
  CompressionType2[CompressionType2["LZ4_FRAME"] = 0] = "LZ4_FRAME";
  CompressionType2[CompressionType2["ZSTD"] = 1] = "ZSTD";
})(CompressionType || (CompressionType = {}));

// node_modules/apache-arrow/fb/body-compression.mjs
var BodyCompression = class _BodyCompression {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBodyCompression(bb, obj) {
    return (obj || new _BodyCompression()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBodyCompression(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new _BodyCompression()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * Compressor library.
   * For LZ4_FRAME, each compressed buffer must consist of a single frame.
   */
  codec() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : CompressionType.LZ4_FRAME;
  }
  /**
   * Indicates the way the record batch body was compressed
   */
  method() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt8(this.bb_pos + offset) : BodyCompressionMethod.BUFFER;
  }
  static startBodyCompression(builder) {
    builder.startObject(2);
  }
  static addCodec(builder, codec) {
    builder.addFieldInt8(0, codec, CompressionType.LZ4_FRAME);
  }
  static addMethod(builder, method) {
    builder.addFieldInt8(1, method, BodyCompressionMethod.BUFFER);
  }
  static endBodyCompression(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBodyCompression(builder, codec, method) {
    _BodyCompression.startBodyCompression(builder);
    _BodyCompression.addCodec(builder, codec);
    _BodyCompression.addMethod(builder, method);
    return _BodyCompression.endBodyCompression(builder);
  }
};

// node_modules/apache-arrow/fb/buffer.mjs
var Buffer2 = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  /**
   * The relative offset into the shared memory page where the bytes for this
   * buffer starts
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The absolute length (in bytes) of the memory buffer. The memory is found
   * from offset (inclusive) to offset + length (non-inclusive). When building
   * messages using the encapsulated IPC message, padding bytes may be written
   * after a buffer, but such padding bytes do not need to be accounted for in
   * the size here.
   */
  length() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createBuffer(builder, offset, length) {
    builder.prep(8, 16);
    builder.writeInt64(BigInt(length !== null && length !== void 0 ? length : 0));
    builder.writeInt64(BigInt(offset !== null && offset !== void 0 ? offset : 0));
    return builder.offset();
  }
};

// node_modules/apache-arrow/fb/field-node.mjs
var FieldNode = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  /**
   * The number of value slots in the Arrow array at this level of a nested
   * tree
   */
  length() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * The number of observed nulls. Fields with null_count == 0 may choose not
   * to write their physical validity bitmap out as a materialized buffer,
   * instead setting the length of the bitmap buffer to 0.
   */
  nullCount() {
    return this.bb.readInt64(this.bb_pos + 8);
  }
  static sizeOf() {
    return 16;
  }
  static createFieldNode(builder, length, null_count) {
    builder.prep(8, 16);
    builder.writeInt64(BigInt(null_count !== null && null_count !== void 0 ? null_count : 0));
    builder.writeInt64(BigInt(length !== null && length !== void 0 ? length : 0));
    return builder.offset();
  }
};

// node_modules/apache-arrow/fb/record-batch.mjs
var RecordBatch2 = class _RecordBatch {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsRecordBatch(bb, obj) {
    return (obj || new _RecordBatch()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsRecordBatch(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers2.SIZE_PREFIX_LENGTH);
    return (obj || new _RecordBatch()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * number of records / rows. The arrays in the batch should all have this
   * length
   */
  length() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  /**
   * Nodes correspond to the pre-ordered flattened logical schema
   */
  nodes(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new FieldNode()).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
  }
  nodesLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  /**
   * Buffers correspond to the pre-ordered flattened buffer tree
   *
   * The number of buffers appended to this list depends on the schema. For
   * example, most primitive arrays will have 2 buffers, 1 for the validity
   * bitmap and 1 for the values. For struct arrays, there will only be a
   * single buffer for the validity (nulls) bitmap
   */
  buffers(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new Buffer2()).__init(this.bb.__vector(this.bb_pos + offset) + index * 16, this.bb) : null;
  }
  buffersLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  /**
   * Optional compression of the message body
   */
  compression(obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? (obj || new BodyCompression()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  /**
   * Some types such as Utf8View are represented using a variable number of buffers.
   * For each such Field in the pre-ordered flattened logical schema, there will be
   * an entry in variadicBufferCounts to indicate the number of number of variadic
   * buffers which belong to that Field in the current RecordBatch.
   *
   * For example, the schema
   *     col1: Struct<alpha: Int32, beta: BinaryView, gamma: Float64>
   *     col2: Utf8View
   * contains two Fields with variadic buffers so variadicBufferCounts will have
   * two entries, the first counting the variadic buffers of `col1.beta` and the
   * second counting `col2`'s.
   *
   * This field may be omitted if and only if the schema contains no Fields with
   * a variable number of buffers, such as BinaryView and Utf8View.
   */
  variadicBufferCounts(index) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.readInt64(this.bb.__vector(this.bb_pos + offset) + index * 8) : BigInt(0);
  }
  variadicBufferCountsLength() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startRecordBatch(builder) {
    builder.startObject(5);
  }
  static addLength(builder, length) {
    builder.addFieldInt64(0, length, BigInt("0"));
  }
  static addNodes(builder, nodesOffset) {
    builder.addFieldOffset(1, nodesOffset, 0);
  }
  static startNodesVector(builder, numElems) {
    builder.startVector(16, numElems, 8);
  }
  static addBuffers(builder, buffersOffset) {
    builder.addFieldOffset(2, buffersOffset, 0);
  }
  static startBuffersVector(builder, numElems) {
    builder.startVector(16, numElems, 8);
  }
  static addCompression(builder, compressionOffset) {
    builder.addFieldOffset(3, compressionOffset, 0);
  }
  static addVariadicBufferCounts(builder, variadicBufferCountsOffset) {
    builder.addFieldOffset(4, variadicBufferCountsOffset, 0);
  }
  static createVariadicBufferCountsVector(builder, data) {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]);
    }
    return builder.endVector();
  }
  static startVariadicBufferCountsVector(builder, numElems) {
    builder.startVector(8, numElems, 8);
  }
  static endRecordBatch(builder) {
    const offset = builder.endObject();
    return offset;
  }
};

// node_modules/apache-arrow/fb/dictionary-batch.mjs
var DictionaryBatch = class _DictionaryBatch {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDictionaryBatch(bb, obj) {
    return (obj || new _DictionaryBatch()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDictionaryBatch(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers3.SIZE_PREFIX_LENGTH);
    return (obj || new _DictionaryBatch()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  id() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  data(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new RecordBatch2()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  /**
   * If isDelta is true the values in the dictionary are to be appended to a
   * dictionary with the indicated id. If isDelta is false this dictionary
   * should replace the existing dictionary.
   */
  isDelta() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  static startDictionaryBatch(builder) {
    builder.startObject(3);
  }
  static addId(builder, id) {
    builder.addFieldInt64(0, id, BigInt("0"));
  }
  static addData(builder, dataOffset) {
    builder.addFieldOffset(1, dataOffset, 0);
  }
  static addIsDelta(builder, isDelta) {
    builder.addFieldInt8(2, +isDelta, 0);
  }
  static endDictionaryBatch(builder) {
    const offset = builder.endObject();
    return offset;
  }
};

// node_modules/apache-arrow/fb/schema.mjs
var flatbuffers30 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/endianness.mjs
var Endianness;
(function(Endianness2) {
  Endianness2[Endianness2["Little"] = 0] = "Little";
  Endianness2[Endianness2["Big"] = 1] = "Big";
})(Endianness || (Endianness = {}));

// node_modules/apache-arrow/fb/field.mjs
var flatbuffers29 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/dictionary-encoding.mjs
var flatbuffers5 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/dictionary-kind.mjs
var DictionaryKind;
(function(DictionaryKind2) {
  DictionaryKind2[DictionaryKind2["DenseArray"] = 0] = "DenseArray";
})(DictionaryKind || (DictionaryKind = {}));

// node_modules/apache-arrow/fb/int.mjs
var flatbuffers4 = __toESM(require_flatbuffers(), 1);
var Int = class _Int {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsInt(bb, obj) {
    return (obj || new _Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsInt(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers4.SIZE_PREFIX_LENGTH);
    return (obj || new _Int()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  bitWidth() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  isSigned() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  static startInt(builder) {
    builder.startObject(2);
  }
  static addBitWidth(builder, bitWidth) {
    builder.addFieldInt32(0, bitWidth, 0);
  }
  static addIsSigned(builder, isSigned) {
    builder.addFieldInt8(1, +isSigned, 0);
  }
  static endInt(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createInt(builder, bitWidth, isSigned) {
    _Int.startInt(builder);
    _Int.addBitWidth(builder, bitWidth);
    _Int.addIsSigned(builder, isSigned);
    return _Int.endInt(builder);
  }
};

// node_modules/apache-arrow/fb/dictionary-encoding.mjs
var DictionaryEncoding = class _DictionaryEncoding {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDictionaryEncoding(bb, obj) {
    return (obj || new _DictionaryEncoding()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDictionaryEncoding(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers5.SIZE_PREFIX_LENGTH);
    return (obj || new _DictionaryEncoding()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * The known dictionary id in the application where this data is used. In
   * the file or streaming formats, the dictionary ids are found in the
   * DictionaryBatch messages
   */
  id() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  /**
   * The dictionary indices are constrained to be non-negative integers. If
   * this field is null, the indices must be signed int32. To maximize
   * cross-language compatibility and performance, implementations are
   * recommended to prefer signed integer types over unsigned integer types
   * and to avoid uint64 indices unless they are required by an application.
   */
  indexType(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new Int()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  /**
   * By default, dictionaries are not ordered, or the order does not have
   * semantic meaning. In some statistical, applications, dictionary-encoding
   * is used to represent ordered categorical data, and we provide a way to
   * preserve that metadata here
   */
  isOrdered() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  dictionaryKind() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : DictionaryKind.DenseArray;
  }
  static startDictionaryEncoding(builder) {
    builder.startObject(4);
  }
  static addId(builder, id) {
    builder.addFieldInt64(0, id, BigInt("0"));
  }
  static addIndexType(builder, indexTypeOffset) {
    builder.addFieldOffset(1, indexTypeOffset, 0);
  }
  static addIsOrdered(builder, isOrdered) {
    builder.addFieldInt8(2, +isOrdered, 0);
  }
  static addDictionaryKind(builder, dictionaryKind) {
    builder.addFieldInt16(3, dictionaryKind, DictionaryKind.DenseArray);
  }
  static endDictionaryEncoding(builder) {
    const offset = builder.endObject();
    return offset;
  }
};

// node_modules/apache-arrow/fb/key-value.mjs
var flatbuffers6 = __toESM(require_flatbuffers(), 1);
var KeyValue = class _KeyValue {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsKeyValue(bb, obj) {
    return (obj || new _KeyValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsKeyValue(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers6.SIZE_PREFIX_LENGTH);
    return (obj || new _KeyValue()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  key(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  value(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startKeyValue(builder) {
    builder.startObject(2);
  }
  static addKey(builder, keyOffset) {
    builder.addFieldOffset(0, keyOffset, 0);
  }
  static addValue(builder, valueOffset) {
    builder.addFieldOffset(1, valueOffset, 0);
  }
  static endKeyValue(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createKeyValue(builder, keyOffset, valueOffset) {
    _KeyValue.startKeyValue(builder);
    _KeyValue.addKey(builder, keyOffset);
    _KeyValue.addValue(builder, valueOffset);
    return _KeyValue.endKeyValue(builder);
  }
};

// node_modules/apache-arrow/fb/binary.mjs
var flatbuffers7 = __toESM(require_flatbuffers(), 1);
var Binary = class _Binary {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBinary(bb, obj) {
    return (obj || new _Binary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBinary(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers7.SIZE_PREFIX_LENGTH);
    return (obj || new _Binary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startBinary(builder) {
    builder.startObject(0);
  }
  static endBinary(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBinary(builder) {
    _Binary.startBinary(builder);
    return _Binary.endBinary(builder);
  }
};

// node_modules/apache-arrow/fb/binary-view.mjs
var flatbuffers8 = __toESM(require_flatbuffers(), 1);
var BinaryView = class _BinaryView {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBinaryView(bb, obj) {
    return (obj || new _BinaryView()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBinaryView(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers8.SIZE_PREFIX_LENGTH);
    return (obj || new _BinaryView()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startBinaryView(builder) {
    builder.startObject(0);
  }
  static endBinaryView(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBinaryView(builder) {
    _BinaryView.startBinaryView(builder);
    return _BinaryView.endBinaryView(builder);
  }
};

// node_modules/apache-arrow/fb/bool.mjs
var flatbuffers9 = __toESM(require_flatbuffers(), 1);
var Bool = class _Bool {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsBool(bb, obj) {
    return (obj || new _Bool()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsBool(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers9.SIZE_PREFIX_LENGTH);
    return (obj || new _Bool()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startBool(builder) {
    builder.startObject(0);
  }
  static endBool(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createBool(builder) {
    _Bool.startBool(builder);
    return _Bool.endBool(builder);
  }
};

// node_modules/apache-arrow/fb/date.mjs
var flatbuffers10 = __toESM(require_flatbuffers(), 1);
var Date2 = class _Date {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDate(bb, obj) {
    return (obj || new _Date()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDate(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers10.SIZE_PREFIX_LENGTH);
    return (obj || new _Date()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  unit() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : DateUnit.MILLISECOND;
  }
  static startDate(builder) {
    builder.startObject(1);
  }
  static addUnit(builder, unit) {
    builder.addFieldInt16(0, unit, DateUnit.MILLISECOND);
  }
  static endDate(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createDate(builder, unit) {
    _Date.startDate(builder);
    _Date.addUnit(builder, unit);
    return _Date.endDate(builder);
  }
};

// node_modules/apache-arrow/fb/decimal.mjs
var flatbuffers11 = __toESM(require_flatbuffers(), 1);
var Decimal = class _Decimal {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDecimal(bb, obj) {
    return (obj || new _Decimal()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDecimal(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers11.SIZE_PREFIX_LENGTH);
    return (obj || new _Decimal()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * Total number of decimal digits
   */
  precision() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  /**
   * Number of digits after the decimal point "."
   */
  scale() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  /**
   * Number of bits per value. The only accepted widths are 128 and 256.
   * We use bitWidth for consistency with Int::bitWidth.
   */
  bitWidth() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 128;
  }
  static startDecimal(builder) {
    builder.startObject(3);
  }
  static addPrecision(builder, precision) {
    builder.addFieldInt32(0, precision, 0);
  }
  static addScale(builder, scale) {
    builder.addFieldInt32(1, scale, 0);
  }
  static addBitWidth(builder, bitWidth) {
    builder.addFieldInt32(2, bitWidth, 128);
  }
  static endDecimal(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createDecimal(builder, precision, scale, bitWidth) {
    _Decimal.startDecimal(builder);
    _Decimal.addPrecision(builder, precision);
    _Decimal.addScale(builder, scale);
    _Decimal.addBitWidth(builder, bitWidth);
    return _Decimal.endDecimal(builder);
  }
};

// node_modules/apache-arrow/fb/duration.mjs
var flatbuffers12 = __toESM(require_flatbuffers(), 1);
var Duration = class _Duration {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsDuration(bb, obj) {
    return (obj || new _Duration()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsDuration(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers12.SIZE_PREFIX_LENGTH);
    return (obj || new _Duration()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  unit() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : TimeUnit.MILLISECOND;
  }
  static startDuration(builder) {
    builder.startObject(1);
  }
  static addUnit(builder, unit) {
    builder.addFieldInt16(0, unit, TimeUnit.MILLISECOND);
  }
  static endDuration(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createDuration(builder, unit) {
    _Duration.startDuration(builder);
    _Duration.addUnit(builder, unit);
    return _Duration.endDuration(builder);
  }
};

// node_modules/apache-arrow/fb/fixed-size-binary.mjs
var flatbuffers13 = __toESM(require_flatbuffers(), 1);
var FixedSizeBinary = class _FixedSizeBinary {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFixedSizeBinary(bb, obj) {
    return (obj || new _FixedSizeBinary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFixedSizeBinary(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers13.SIZE_PREFIX_LENGTH);
    return (obj || new _FixedSizeBinary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * Number of bytes per value
   */
  byteWidth() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  static startFixedSizeBinary(builder) {
    builder.startObject(1);
  }
  static addByteWidth(builder, byteWidth) {
    builder.addFieldInt32(0, byteWidth, 0);
  }
  static endFixedSizeBinary(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createFixedSizeBinary(builder, byteWidth) {
    _FixedSizeBinary.startFixedSizeBinary(builder);
    _FixedSizeBinary.addByteWidth(builder, byteWidth);
    return _FixedSizeBinary.endFixedSizeBinary(builder);
  }
};

// node_modules/apache-arrow/fb/fixed-size-list.mjs
var flatbuffers14 = __toESM(require_flatbuffers(), 1);
var FixedSizeList = class _FixedSizeList {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFixedSizeList(bb, obj) {
    return (obj || new _FixedSizeList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFixedSizeList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers14.SIZE_PREFIX_LENGTH);
    return (obj || new _FixedSizeList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * Number of list items per value
   */
  listSize() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
  }
  static startFixedSizeList(builder) {
    builder.startObject(1);
  }
  static addListSize(builder, listSize) {
    builder.addFieldInt32(0, listSize, 0);
  }
  static endFixedSizeList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createFixedSizeList(builder, listSize) {
    _FixedSizeList.startFixedSizeList(builder);
    _FixedSizeList.addListSize(builder, listSize);
    return _FixedSizeList.endFixedSizeList(builder);
  }
};

// node_modules/apache-arrow/fb/floating-point.mjs
var flatbuffers15 = __toESM(require_flatbuffers(), 1);
var FloatingPoint = class _FloatingPoint {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFloatingPoint(bb, obj) {
    return (obj || new _FloatingPoint()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFloatingPoint(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers15.SIZE_PREFIX_LENGTH);
    return (obj || new _FloatingPoint()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  precision() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : Precision.HALF;
  }
  static startFloatingPoint(builder) {
    builder.startObject(1);
  }
  static addPrecision(builder, precision) {
    builder.addFieldInt16(0, precision, Precision.HALF);
  }
  static endFloatingPoint(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createFloatingPoint(builder, precision) {
    _FloatingPoint.startFloatingPoint(builder);
    _FloatingPoint.addPrecision(builder, precision);
    return _FloatingPoint.endFloatingPoint(builder);
  }
};

// node_modules/apache-arrow/fb/interval.mjs
var flatbuffers16 = __toESM(require_flatbuffers(), 1);
var Interval = class _Interval {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsInterval(bb, obj) {
    return (obj || new _Interval()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsInterval(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers16.SIZE_PREFIX_LENGTH);
    return (obj || new _Interval()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  unit() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : IntervalUnit.YEAR_MONTH;
  }
  static startInterval(builder) {
    builder.startObject(1);
  }
  static addUnit(builder, unit) {
    builder.addFieldInt16(0, unit, IntervalUnit.YEAR_MONTH);
  }
  static endInterval(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createInterval(builder, unit) {
    _Interval.startInterval(builder);
    _Interval.addUnit(builder, unit);
    return _Interval.endInterval(builder);
  }
};

// node_modules/apache-arrow/fb/large-binary.mjs
var flatbuffers17 = __toESM(require_flatbuffers(), 1);
var LargeBinary = class _LargeBinary {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLargeBinary(bb, obj) {
    return (obj || new _LargeBinary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLargeBinary(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers17.SIZE_PREFIX_LENGTH);
    return (obj || new _LargeBinary()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startLargeBinary(builder) {
    builder.startObject(0);
  }
  static endLargeBinary(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createLargeBinary(builder) {
    _LargeBinary.startLargeBinary(builder);
    return _LargeBinary.endLargeBinary(builder);
  }
};

// node_modules/apache-arrow/fb/large-list.mjs
var flatbuffers18 = __toESM(require_flatbuffers(), 1);
var LargeList = class _LargeList {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLargeList(bb, obj) {
    return (obj || new _LargeList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLargeList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers18.SIZE_PREFIX_LENGTH);
    return (obj || new _LargeList()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startLargeList(builder) {
    builder.startObject(0);
  }
  static endLargeList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createLargeList(builder) {
    _LargeList.startLargeList(builder);
    return _LargeList.endLargeList(builder);
  }
};

// node_modules/apache-arrow/fb/large-utf8.mjs
var flatbuffers19 = __toESM(require_flatbuffers(), 1);
var LargeUtf8 = class _LargeUtf8 {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsLargeUtf8(bb, obj) {
    return (obj || new _LargeUtf8()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsLargeUtf8(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers19.SIZE_PREFIX_LENGTH);
    return (obj || new _LargeUtf8()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startLargeUtf8(builder) {
    builder.startObject(0);
  }
  static endLargeUtf8(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createLargeUtf8(builder) {
    _LargeUtf8.startLargeUtf8(builder);
    return _LargeUtf8.endLargeUtf8(builder);
  }
};

// node_modules/apache-arrow/fb/list.mjs
var flatbuffers20 = __toESM(require_flatbuffers(), 1);
var List = class _List {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsList(bb, obj) {
    return (obj || new _List()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsList(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers20.SIZE_PREFIX_LENGTH);
    return (obj || new _List()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startList(builder) {
    builder.startObject(0);
  }
  static endList(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createList(builder) {
    _List.startList(builder);
    return _List.endList(builder);
  }
};

// node_modules/apache-arrow/fb/map.mjs
var flatbuffers21 = __toESM(require_flatbuffers(), 1);
var Map2 = class _Map {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsMap(bb, obj) {
    return (obj || new _Map()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsMap(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers21.SIZE_PREFIX_LENGTH);
    return (obj || new _Map()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * Set to true if the keys within each value are sorted
   */
  keysSorted() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  static startMap(builder) {
    builder.startObject(1);
  }
  static addKeysSorted(builder, keysSorted) {
    builder.addFieldInt8(0, +keysSorted, 0);
  }
  static endMap(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createMap(builder, keysSorted) {
    _Map.startMap(builder);
    _Map.addKeysSorted(builder, keysSorted);
    return _Map.endMap(builder);
  }
};

// node_modules/apache-arrow/fb/null.mjs
var flatbuffers22 = __toESM(require_flatbuffers(), 1);
var Null = class _Null {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsNull(bb, obj) {
    return (obj || new _Null()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsNull(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers22.SIZE_PREFIX_LENGTH);
    return (obj || new _Null()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startNull(builder) {
    builder.startObject(0);
  }
  static endNull(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createNull(builder) {
    _Null.startNull(builder);
    return _Null.endNull(builder);
  }
};

// node_modules/apache-arrow/fb/struct-.mjs
var flatbuffers23 = __toESM(require_flatbuffers(), 1);
var Struct_ = class _Struct_ {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsStruct_(bb, obj) {
    return (obj || new _Struct_()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsStruct_(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers23.SIZE_PREFIX_LENGTH);
    return (obj || new _Struct_()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startStruct_(builder) {
    builder.startObject(0);
  }
  static endStruct_(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createStruct_(builder) {
    _Struct_.startStruct_(builder);
    return _Struct_.endStruct_(builder);
  }
};

// node_modules/apache-arrow/fb/time.mjs
var flatbuffers24 = __toESM(require_flatbuffers(), 1);
var Time = class _Time {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsTime(bb, obj) {
    return (obj || new _Time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsTime(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers24.SIZE_PREFIX_LENGTH);
    return (obj || new _Time()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  unit() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : TimeUnit.MILLISECOND;
  }
  bitWidth() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb_pos + offset) : 32;
  }
  static startTime(builder) {
    builder.startObject(2);
  }
  static addUnit(builder, unit) {
    builder.addFieldInt16(0, unit, TimeUnit.MILLISECOND);
  }
  static addBitWidth(builder, bitWidth) {
    builder.addFieldInt32(1, bitWidth, 32);
  }
  static endTime(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createTime(builder, unit, bitWidth) {
    _Time.startTime(builder);
    _Time.addUnit(builder, unit);
    _Time.addBitWidth(builder, bitWidth);
    return _Time.endTime(builder);
  }
};

// node_modules/apache-arrow/fb/timestamp.mjs
var flatbuffers25 = __toESM(require_flatbuffers(), 1);
var Timestamp = class _Timestamp {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsTimestamp(bb, obj) {
    return (obj || new _Timestamp()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsTimestamp(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers25.SIZE_PREFIX_LENGTH);
    return (obj || new _Timestamp()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  unit() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : TimeUnit.SECOND;
  }
  timezone(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  static startTimestamp(builder) {
    builder.startObject(2);
  }
  static addUnit(builder, unit) {
    builder.addFieldInt16(0, unit, TimeUnit.SECOND);
  }
  static addTimezone(builder, timezoneOffset) {
    builder.addFieldOffset(1, timezoneOffset, 0);
  }
  static endTimestamp(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createTimestamp(builder, unit, timezoneOffset) {
    _Timestamp.startTimestamp(builder);
    _Timestamp.addUnit(builder, unit);
    _Timestamp.addTimezone(builder, timezoneOffset);
    return _Timestamp.endTimestamp(builder);
  }
};

// node_modules/apache-arrow/fb/union.mjs
var flatbuffers26 = __toESM(require_flatbuffers(), 1);
var Union = class _Union {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsUnion(bb, obj) {
    return (obj || new _Union()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsUnion(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers26.SIZE_PREFIX_LENGTH);
    return (obj || new _Union()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  mode() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : UnionMode.Sparse;
  }
  typeIds(index) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readInt32(this.bb.__vector(this.bb_pos + offset) + index * 4) : 0;
  }
  typeIdsLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  typeIdsArray() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? new Int32Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
  }
  static startUnion(builder) {
    builder.startObject(2);
  }
  static addMode(builder, mode) {
    builder.addFieldInt16(0, mode, UnionMode.Sparse);
  }
  static addTypeIds(builder, typeIdsOffset) {
    builder.addFieldOffset(1, typeIdsOffset, 0);
  }
  static createTypeIdsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt32(data[i]);
    }
    return builder.endVector();
  }
  static startTypeIdsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endUnion(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createUnion(builder, mode, typeIdsOffset) {
    _Union.startUnion(builder);
    _Union.addMode(builder, mode);
    _Union.addTypeIds(builder, typeIdsOffset);
    return _Union.endUnion(builder);
  }
};

// node_modules/apache-arrow/fb/utf8.mjs
var flatbuffers27 = __toESM(require_flatbuffers(), 1);
var Utf8 = class _Utf8 {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsUtf8(bb, obj) {
    return (obj || new _Utf8()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsUtf8(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers27.SIZE_PREFIX_LENGTH);
    return (obj || new _Utf8()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startUtf8(builder) {
    builder.startObject(0);
  }
  static endUtf8(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createUtf8(builder) {
    _Utf8.startUtf8(builder);
    return _Utf8.endUtf8(builder);
  }
};

// node_modules/apache-arrow/fb/utf8-view.mjs
var flatbuffers28 = __toESM(require_flatbuffers(), 1);
var Utf8View = class _Utf8View {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsUtf8View(bb, obj) {
    return (obj || new _Utf8View()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsUtf8View(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers28.SIZE_PREFIX_LENGTH);
    return (obj || new _Utf8View()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static startUtf8View(builder) {
    builder.startObject(0);
  }
  static endUtf8View(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createUtf8View(builder) {
    _Utf8View.startUtf8View(builder);
    return _Utf8View.endUtf8View(builder);
  }
};

// node_modules/apache-arrow/fb/type.mjs
var Type;
(function(Type3) {
  Type3[Type3["NONE"] = 0] = "NONE";
  Type3[Type3["Null"] = 1] = "Null";
  Type3[Type3["Int"] = 2] = "Int";
  Type3[Type3["FloatingPoint"] = 3] = "FloatingPoint";
  Type3[Type3["Binary"] = 4] = "Binary";
  Type3[Type3["Utf8"] = 5] = "Utf8";
  Type3[Type3["Bool"] = 6] = "Bool";
  Type3[Type3["Decimal"] = 7] = "Decimal";
  Type3[Type3["Date"] = 8] = "Date";
  Type3[Type3["Time"] = 9] = "Time";
  Type3[Type3["Timestamp"] = 10] = "Timestamp";
  Type3[Type3["Interval"] = 11] = "Interval";
  Type3[Type3["List"] = 12] = "List";
  Type3[Type3["Struct_"] = 13] = "Struct_";
  Type3[Type3["Union"] = 14] = "Union";
  Type3[Type3["FixedSizeBinary"] = 15] = "FixedSizeBinary";
  Type3[Type3["FixedSizeList"] = 16] = "FixedSizeList";
  Type3[Type3["Map"] = 17] = "Map";
  Type3[Type3["Duration"] = 18] = "Duration";
  Type3[Type3["LargeBinary"] = 19] = "LargeBinary";
  Type3[Type3["LargeUtf8"] = 20] = "LargeUtf8";
  Type3[Type3["LargeList"] = 21] = "LargeList";
  Type3[Type3["RunEndEncoded"] = 22] = "RunEndEncoded";
  Type3[Type3["BinaryView"] = 23] = "BinaryView";
  Type3[Type3["Utf8View"] = 24] = "Utf8View";
  Type3[Type3["ListView"] = 25] = "ListView";
  Type3[Type3["LargeListView"] = 26] = "LargeListView";
})(Type || (Type = {}));

// node_modules/apache-arrow/fb/field.mjs
var Field = class _Field {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsField(bb, obj) {
    return (obj || new _Field()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsField(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers29.SIZE_PREFIX_LENGTH);
    return (obj || new _Field()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  name(optionalEncoding) {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
  }
  /**
   * Whether or not this field can contain nulls. Should be true in general.
   */
  nullable() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? !!this.bb.readInt8(this.bb_pos + offset) : false;
  }
  typeType() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : Type.NONE;
  }
  /**
   * This is the type of the decoded value if the field is dictionary encoded.
   */
  type(obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  /**
   * Present only if the field is dictionary encoded.
   */
  dictionary(obj) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? (obj || new DictionaryEncoding()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  /**
   * children apply only to nested data types like Struct, List and Union. For
   * primitive types children will have length 0.
   */
  children(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? (obj || new _Field()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  childrenLength() {
    const offset = this.bb.__offset(this.bb_pos, 14);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  customMetadataLength() {
    const offset = this.bb.__offset(this.bb_pos, 16);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startField(builder) {
    builder.startObject(7);
  }
  static addName(builder, nameOffset) {
    builder.addFieldOffset(0, nameOffset, 0);
  }
  static addNullable(builder, nullable) {
    builder.addFieldInt8(1, +nullable, 0);
  }
  static addTypeType(builder, typeType) {
    builder.addFieldInt8(2, typeType, Type.NONE);
  }
  static addType(builder, typeOffset) {
    builder.addFieldOffset(3, typeOffset, 0);
  }
  static addDictionary(builder, dictionaryOffset) {
    builder.addFieldOffset(4, dictionaryOffset, 0);
  }
  static addChildren(builder, childrenOffset) {
    builder.addFieldOffset(5, childrenOffset, 0);
  }
  static createChildrenVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startChildrenVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addCustomMetadata(builder, customMetadataOffset) {
    builder.addFieldOffset(6, customMetadataOffset, 0);
  }
  static createCustomMetadataVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startCustomMetadataVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endField(builder) {
    const offset = builder.endObject();
    return offset;
  }
};

// node_modules/apache-arrow/fb/schema.mjs
var Schema2 = class _Schema {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsSchema(bb, obj) {
    return (obj || new _Schema()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsSchema(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers30.SIZE_PREFIX_LENGTH);
    return (obj || new _Schema()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  /**
   * endianness of the buffer
   * it is Little Endian by default
   * if endianness doesn't match the underlying system then the vectors need to be converted
   */
  endianness() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : Endianness.Little;
  }
  fields(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new Field()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  fieldsLength() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  customMetadata(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  customMetadataLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  /**
   * Features used in the stream/file.
   */
  features(index) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readInt64(this.bb.__vector(this.bb_pos + offset) + index * 8) : BigInt(0);
  }
  featuresLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startSchema(builder) {
    builder.startObject(4);
  }
  static addEndianness(builder, endianness) {
    builder.addFieldInt16(0, endianness, Endianness.Little);
  }
  static addFields(builder, fieldsOffset) {
    builder.addFieldOffset(1, fieldsOffset, 0);
  }
  static createFieldsVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startFieldsVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addCustomMetadata(builder, customMetadataOffset) {
    builder.addFieldOffset(2, customMetadataOffset, 0);
  }
  static createCustomMetadataVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startCustomMetadataVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static addFeatures(builder, featuresOffset) {
    builder.addFieldOffset(3, featuresOffset, 0);
  }
  static createFeaturesVector(builder, data) {
    builder.startVector(8, data.length, 8);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addInt64(data[i]);
    }
    return builder.endVector();
  }
  static startFeaturesVector(builder, numElems) {
    builder.startVector(8, numElems, 8);
  }
  static endSchema(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static createSchema(builder, endianness, fieldsOffset, customMetadataOffset, featuresOffset) {
    _Schema.startSchema(builder);
    _Schema.addEndianness(builder, endianness);
    _Schema.addFields(builder, fieldsOffset);
    _Schema.addCustomMetadata(builder, customMetadataOffset);
    _Schema.addFeatures(builder, featuresOffset);
    return _Schema.endSchema(builder);
  }
};

// node_modules/apache-arrow/fb/message-header.mjs
var MessageHeader;
(function(MessageHeader2) {
  MessageHeader2[MessageHeader2["NONE"] = 0] = "NONE";
  MessageHeader2[MessageHeader2["Schema"] = 1] = "Schema";
  MessageHeader2[MessageHeader2["DictionaryBatch"] = 2] = "DictionaryBatch";
  MessageHeader2[MessageHeader2["RecordBatch"] = 3] = "RecordBatch";
  MessageHeader2[MessageHeader2["Tensor"] = 4] = "Tensor";
  MessageHeader2[MessageHeader2["SparseTensor"] = 5] = "SparseTensor";
})(MessageHeader || (MessageHeader = {}));

// node_modules/apache-arrow/enum.mjs
var Type2;
(function(Type3) {
  Type3[Type3["NONE"] = 0] = "NONE";
  Type3[Type3["Null"] = 1] = "Null";
  Type3[Type3["Int"] = 2] = "Int";
  Type3[Type3["Float"] = 3] = "Float";
  Type3[Type3["Binary"] = 4] = "Binary";
  Type3[Type3["Utf8"] = 5] = "Utf8";
  Type3[Type3["Bool"] = 6] = "Bool";
  Type3[Type3["Decimal"] = 7] = "Decimal";
  Type3[Type3["Date"] = 8] = "Date";
  Type3[Type3["Time"] = 9] = "Time";
  Type3[Type3["Timestamp"] = 10] = "Timestamp";
  Type3[Type3["Interval"] = 11] = "Interval";
  Type3[Type3["List"] = 12] = "List";
  Type3[Type3["Struct"] = 13] = "Struct";
  Type3[Type3["Union"] = 14] = "Union";
  Type3[Type3["FixedSizeBinary"] = 15] = "FixedSizeBinary";
  Type3[Type3["FixedSizeList"] = 16] = "FixedSizeList";
  Type3[Type3["Map"] = 17] = "Map";
  Type3[Type3["Duration"] = 18] = "Duration";
  Type3[Type3["LargeBinary"] = 19] = "LargeBinary";
  Type3[Type3["LargeUtf8"] = 20] = "LargeUtf8";
  Type3[Type3["LargeList"] = 21] = "LargeList";
  Type3[Type3["BinaryView"] = 23] = "BinaryView";
  Type3[Type3["Utf8View"] = 24] = "Utf8View";
  Type3[Type3["Dictionary"] = -1] = "Dictionary";
  Type3[Type3["Int8"] = -2] = "Int8";
  Type3[Type3["Int16"] = -3] = "Int16";
  Type3[Type3["Int32"] = -4] = "Int32";
  Type3[Type3["Int64"] = -5] = "Int64";
  Type3[Type3["Uint8"] = -6] = "Uint8";
  Type3[Type3["Uint16"] = -7] = "Uint16";
  Type3[Type3["Uint32"] = -8] = "Uint32";
  Type3[Type3["Uint64"] = -9] = "Uint64";
  Type3[Type3["Float16"] = -10] = "Float16";
  Type3[Type3["Float32"] = -11] = "Float32";
  Type3[Type3["Float64"] = -12] = "Float64";
  Type3[Type3["DateDay"] = -13] = "DateDay";
  Type3[Type3["DateMillisecond"] = -14] = "DateMillisecond";
  Type3[Type3["TimestampSecond"] = -15] = "TimestampSecond";
  Type3[Type3["TimestampMillisecond"] = -16] = "TimestampMillisecond";
  Type3[Type3["TimestampMicrosecond"] = -17] = "TimestampMicrosecond";
  Type3[Type3["TimestampNanosecond"] = -18] = "TimestampNanosecond";
  Type3[Type3["TimeSecond"] = -19] = "TimeSecond";
  Type3[Type3["TimeMillisecond"] = -20] = "TimeMillisecond";
  Type3[Type3["TimeMicrosecond"] = -21] = "TimeMicrosecond";
  Type3[Type3["TimeNanosecond"] = -22] = "TimeNanosecond";
  Type3[Type3["DenseUnion"] = -23] = "DenseUnion";
  Type3[Type3["SparseUnion"] = -24] = "SparseUnion";
  Type3[Type3["IntervalDayTime"] = -25] = "IntervalDayTime";
  Type3[Type3["IntervalYearMonth"] = -26] = "IntervalYearMonth";
  Type3[Type3["DurationSecond"] = -27] = "DurationSecond";
  Type3[Type3["DurationMillisecond"] = -28] = "DurationMillisecond";
  Type3[Type3["DurationMicrosecond"] = -29] = "DurationMicrosecond";
  Type3[Type3["DurationNanosecond"] = -30] = "DurationNanosecond";
  Type3[Type3["IntervalMonthDayNano"] = -31] = "IntervalMonthDayNano";
})(Type2 || (Type2 = {}));
var BufferType;
(function(BufferType2) {
  BufferType2[BufferType2["OFFSET"] = 0] = "OFFSET";
  BufferType2[BufferType2["DATA"] = 1] = "DATA";
  BufferType2[BufferType2["VALIDITY"] = 2] = "VALIDITY";
  BufferType2[BufferType2["TYPE"] = 3] = "TYPE";
})(BufferType || (BufferType = {}));

// node_modules/apache-arrow/util/vector.mjs
var vector_exports = {};
__export(vector_exports, {
  clampRange: () => clampRange,
  createElementComparator: () => createElementComparator,
  wrapIndex: () => wrapIndex
});

// node_modules/apache-arrow/util/pretty.mjs
var pretty_exports = {};
__export(pretty_exports, {
  valueToString: () => valueToString
});
var undf = void 0;
function valueToString(x) {
  if (x === null) {
    return "null";
  }
  if (x === undf) {
    return "undefined";
  }
  switch (typeof x) {
    case "number":
      return `${x}`;
    case "bigint":
      return `${x}`;
    case "string":
      return `"${x}"`;
  }
  if (typeof x[Symbol.toPrimitive] === "function") {
    return x[Symbol.toPrimitive]("string");
  }
  if (ArrayBuffer.isView(x)) {
    if (x instanceof BigInt64Array || x instanceof BigUint64Array) {
      return `[${[...x].map((x2) => valueToString(x2))}]`;
    }
    return `[${x}]`;
  }
  return ArrayBuffer.isView(x) ? `[${x}]` : JSON.stringify(x, (_, y) => typeof y === "bigint" ? `${y}` : y);
}

// node_modules/apache-arrow/util/bn.mjs
var bn_exports = {};
__export(bn_exports, {
  BN: () => BN,
  bigNumToBigInt: () => bigNumToBigInt,
  bigNumToNumber: () => bigNumToNumber,
  bigNumToString: () => bigNumToString,
  isArrowBigNumSymbol: () => isArrowBigNumSymbol
});

// node_modules/apache-arrow/util/bigint.mjs
function bigIntToNumber(number) {
  if (typeof number === "bigint" && (number < Number.MIN_SAFE_INTEGER || number > Number.MAX_SAFE_INTEGER)) {
    throw new TypeError(`${number} is not safe to convert to a number.`);
  }
  return Number(number);
}
function divideBigInts(number, divisor) {
  return bigIntToNumber(number / divisor) + bigIntToNumber(number % divisor) / bigIntToNumber(divisor);
}

// node_modules/apache-arrow/util/bn.mjs
var isArrowBigNumSymbol = Symbol.for("isArrowBigNum");
function BigNum(x, ...xs) {
  if (xs.length === 0) {
    return Object.setPrototypeOf(toArrayBufferView(this["TypedArray"], x), this.constructor.prototype);
  }
  return Object.setPrototypeOf(new this["TypedArray"](x, ...xs), this.constructor.prototype);
}
BigNum.prototype[isArrowBigNumSymbol] = true;
BigNum.prototype.toJSON = function() {
  return `"${bigNumToString(this)}"`;
};
BigNum.prototype.valueOf = function(scale) {
  return bigNumToNumber(this, scale);
};
BigNum.prototype.toString = function() {
  return bigNumToString(this);
};
BigNum.prototype[Symbol.toPrimitive] = function(hint = "default") {
  switch (hint) {
    case "number":
      return bigNumToNumber(this);
    case "string":
      return bigNumToString(this);
    case "default":
      return bigNumToBigInt(this);
  }
  return bigNumToString(this);
};
function SignedBigNum(...args) {
  return BigNum.apply(this, args);
}
function UnsignedBigNum(...args) {
  return BigNum.apply(this, args);
}
function DecimalBigNum(...args) {
  return BigNum.apply(this, args);
}
Object.setPrototypeOf(SignedBigNum.prototype, Object.create(Int32Array.prototype));
Object.setPrototypeOf(UnsignedBigNum.prototype, Object.create(Uint32Array.prototype));
Object.setPrototypeOf(DecimalBigNum.prototype, Object.create(Uint32Array.prototype));
Object.assign(SignedBigNum.prototype, BigNum.prototype, { "constructor": SignedBigNum, "signed": true, "TypedArray": Int32Array, "BigIntArray": BigInt64Array });
Object.assign(UnsignedBigNum.prototype, BigNum.prototype, { "constructor": UnsignedBigNum, "signed": false, "TypedArray": Uint32Array, "BigIntArray": BigUint64Array });
Object.assign(DecimalBigNum.prototype, BigNum.prototype, { "constructor": DecimalBigNum, "signed": true, "TypedArray": Uint32Array, "BigIntArray": BigUint64Array });
var TWO_TO_THE_64 = BigInt(4294967296) * BigInt(4294967296);
var TWO_TO_THE_64_MINUS_1 = TWO_TO_THE_64 - BigInt(1);
function bigNumToNumber(bn, scale) {
  const { buffer, byteOffset, byteLength, "signed": signed } = bn;
  const words = new BigUint64Array(buffer, byteOffset, byteLength / 8);
  const negative = signed && words.at(-1) & BigInt(1) << BigInt(63);
  let number = BigInt(0);
  let i = 0;
  if (negative) {
    for (const word of words) {
      number |= (word ^ TWO_TO_THE_64_MINUS_1) * (BigInt(1) << BigInt(64 * i++));
    }
    number *= BigInt(-1);
    number -= BigInt(1);
  } else {
    for (const word of words) {
      number |= word * (BigInt(1) << BigInt(64 * i++));
    }
  }
  if (typeof scale === "number" && scale > 0) {
    const denominator = BigInt("1".padEnd(scale + 1, "0"));
    const quotient = number / denominator;
    const remainder = negative ? -(number % denominator) : number % denominator;
    const integerPart = bigIntToNumber(quotient);
    const fractionPart = `${remainder}`.padStart(scale, "0");
    const sign = negative && integerPart === 0 ? "-" : "";
    return +`${sign}${integerPart}.${fractionPart}`;
  }
  return bigIntToNumber(number);
}
function bigNumToString(a) {
  if (a.byteLength === 8) {
    const bigIntArray = new a["BigIntArray"](a.buffer, a.byteOffset, 1);
    return `${bigIntArray[0]}`;
  }
  if (!a["signed"]) {
    return unsignedBigNumToString(a);
  }
  let array = new Uint16Array(a.buffer, a.byteOffset, a.byteLength / 2);
  const highOrderWord = new Int16Array([array.at(-1)])[0];
  if (highOrderWord >= 0) {
    return unsignedBigNumToString(a);
  }
  array = array.slice();
  let carry = 1;
  for (let i = 0; i < array.length; i++) {
    const elem = array[i];
    const updated = ~elem + carry;
    array[i] = updated;
    carry &= elem === 0 ? 1 : 0;
  }
  const negated = unsignedBigNumToString(array);
  return `-${negated}`;
}
function bigNumToBigInt(a) {
  if (a.byteLength === 8) {
    const bigIntArray = new a["BigIntArray"](a.buffer, a.byteOffset, 1);
    return bigIntArray[0];
  } else {
    return bigNumToString(a);
  }
}
function unsignedBigNumToString(a) {
  let digits = "";
  const base64 = new Uint32Array(2);
  let base32 = new Uint16Array(a.buffer, a.byteOffset, a.byteLength / 2);
  const checks = new Uint32Array((base32 = new Uint16Array(base32).reverse()).buffer);
  let i = -1;
  const n = base32.length - 1;
  do {
    for (base64[0] = base32[i = 0]; i < n; ) {
      base32[i++] = base64[1] = base64[0] / 10;
      base64[0] = (base64[0] - base64[1] * 10 << 16) + base32[i];
    }
    base32[i] = base64[1] = base64[0] / 10;
    base64[0] = base64[0] - base64[1] * 10;
    digits = `${base64[0]}${digits}`;
  } while (checks[0] || checks[1] || checks[2] || checks[3]);
  return digits !== null && digits !== void 0 ? digits : `0`;
}
var BN = class _BN {
  /** @nocollapse */
  static new(num, isSigned) {
    switch (isSigned) {
      case true:
        return new SignedBigNum(num);
      case false:
        return new UnsignedBigNum(num);
    }
    switch (num.constructor) {
      case Int8Array:
      case Int16Array:
      case Int32Array:
      case BigInt64Array:
        return new SignedBigNum(num);
    }
    if (num.byteLength === 16) {
      return new DecimalBigNum(num);
    }
    return new UnsignedBigNum(num);
  }
  /** @nocollapse */
  static signed(num) {
    return new SignedBigNum(num);
  }
  /** @nocollapse */
  static unsigned(num) {
    return new UnsignedBigNum(num);
  }
  /** @nocollapse */
  static decimal(num) {
    return new DecimalBigNum(num);
  }
  constructor(num, isSigned) {
    return _BN.new(num, isSigned);
  }
};

// node_modules/apache-arrow/type.mjs
var _a;
var _b;
var _c;
var _d;
var _e;
var _f;
var _g;
var _h;
var _j;
var _k;
var _l;
var _m;
var _o;
var _p;
var _q;
var _r;
var _s;
var _t;
var _u;
var _v;
var _w;
var _x;
var _y;
var _z;
var _0;
var kDataTypeSymbol = Symbol.for("apache-arrow/DataType");
var DataType = class _DataType {
  /**
   * Check if an object is an instance of DataType.
   * This works across different instances of the Arrow library.
   *
   * Note: We intentionally do NOT implement Symbol.hasInstance here because
   * it would break instanceof checks for subclasses like Struct, Dictionary, etc.
   * Use DataType.isDataType() for cross-library type checking instead.
   * @nocollapse
   */
  static isDataType(x) {
    return (x === null || x === void 0 ? void 0 : x[kDataTypeSymbol]) === true;
  }
  /** @nocollapse */
  static isNull(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Null;
  }
  /** @nocollapse */
  static isInt(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Int;
  }
  /** @nocollapse */
  static isFloat(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Float;
  }
  /** @nocollapse */
  static isBinary(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Binary;
  }
  /** @nocollapse */
  static isBinaryView(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.BinaryView;
  }
  /** @nocollapse */
  static isLargeBinary(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.LargeBinary;
  }
  /** @nocollapse */
  static isUtf8(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Utf8;
  }
  /** @nocollapse */
  static isUtf8View(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Utf8View;
  }
  /** @nocollapse */
  static isLargeUtf8(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.LargeUtf8;
  }
  /** @nocollapse */
  static isBool(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Bool;
  }
  /** @nocollapse */
  static isDecimal(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Decimal;
  }
  /** @nocollapse */
  static isDate(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Date;
  }
  /** @nocollapse */
  static isTime(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Time;
  }
  /** @nocollapse */
  static isTimestamp(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Timestamp;
  }
  /** @nocollapse */
  static isInterval(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Interval;
  }
  /** @nocollapse */
  static isDuration(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Duration;
  }
  /** @nocollapse */
  static isList(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.List;
  }
  /** @nocollapse */
  static isLargeList(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.LargeList;
  }
  // TODO: Implement ListView type
  //     /** @nocollapse */ static isListView(x: any): x is ListView { return x?.typeId === Type.ListView; }
  /** @nocollapse */
  static isStruct(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Struct;
  }
  /** @nocollapse */
  static isUnion(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Union;
  }
  /** @nocollapse */
  static isFixedSizeBinary(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.FixedSizeBinary;
  }
  /** @nocollapse */
  static isFixedSizeList(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.FixedSizeList;
  }
  /** @nocollapse */
  static isMap(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Map;
  }
  /** @nocollapse */
  static isDictionary(x) {
    return (x === null || x === void 0 ? void 0 : x.typeId) === Type2.Dictionary;
  }
  /** @nocollapse */
  static isDenseUnion(x) {
    return _DataType.isUnion(x) && x.mode === UnionMode.Dense;
  }
  /** @nocollapse */
  static isSparseUnion(x) {
    return _DataType.isUnion(x) && x.mode === UnionMode.Sparse;
  }
  constructor(typeId) {
    this.typeId = typeId;
  }
};
_a = Symbol.toStringTag;
DataType[_a] = ((proto) => {
  proto.children = null;
  proto.ArrayType = Array;
  proto.OffsetArrayType = Int32Array;
  proto[kDataTypeSymbol] = true;
  return proto[Symbol.toStringTag] = "DataType";
})(DataType.prototype);
var Null2 = class extends DataType {
  constructor() {
    super(Type2.Null);
  }
  toString() {
    return `Null`;
  }
};
_b = Symbol.toStringTag;
Null2[_b] = ((proto) => proto[Symbol.toStringTag] = "Null")(Null2.prototype);
var Int_ = class extends DataType {
  constructor(isSigned, bitWidth) {
    super(Type2.Int);
    this.isSigned = isSigned;
    this.bitWidth = bitWidth;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 8:
        return this.isSigned ? Int8Array : Uint8Array;
      case 16:
        return this.isSigned ? Int16Array : Uint16Array;
      case 32:
        return this.isSigned ? Int32Array : Uint32Array;
      case 64:
        return this.isSigned ? BigInt64Array : BigUint64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `${this.isSigned ? `I` : `Ui`}nt${this.bitWidth}`;
  }
};
_c = Symbol.toStringTag;
Int_[_c] = ((proto) => {
  proto.isSigned = null;
  proto.bitWidth = null;
  return proto[Symbol.toStringTag] = "Int";
})(Int_.prototype);
var Int8 = class extends Int_ {
  constructor() {
    super(true, 8);
  }
  get ArrayType() {
    return Int8Array;
  }
};
var Int16 = class extends Int_ {
  constructor() {
    super(true, 16);
  }
  get ArrayType() {
    return Int16Array;
  }
};
var Int32 = class extends Int_ {
  constructor() {
    super(true, 32);
  }
  get ArrayType() {
    return Int32Array;
  }
};
var Int64 = class extends Int_ {
  constructor() {
    super(true, 64);
  }
  get ArrayType() {
    return BigInt64Array;
  }
};
var Uint8 = class extends Int_ {
  constructor() {
    super(false, 8);
  }
  get ArrayType() {
    return Uint8Array;
  }
};
var Uint16 = class extends Int_ {
  constructor() {
    super(false, 16);
  }
  get ArrayType() {
    return Uint16Array;
  }
};
var Uint32 = class extends Int_ {
  constructor() {
    super(false, 32);
  }
  get ArrayType() {
    return Uint32Array;
  }
};
var Uint64 = class extends Int_ {
  constructor() {
    super(false, 64);
  }
  get ArrayType() {
    return BigUint64Array;
  }
};
Object.defineProperty(Int8.prototype, "ArrayType", { value: Int8Array });
Object.defineProperty(Int16.prototype, "ArrayType", { value: Int16Array });
Object.defineProperty(Int32.prototype, "ArrayType", { value: Int32Array });
Object.defineProperty(Int64.prototype, "ArrayType", { value: BigInt64Array });
Object.defineProperty(Uint8.prototype, "ArrayType", { value: Uint8Array });
Object.defineProperty(Uint16.prototype, "ArrayType", { value: Uint16Array });
Object.defineProperty(Uint32.prototype, "ArrayType", { value: Uint32Array });
Object.defineProperty(Uint64.prototype, "ArrayType", { value: BigUint64Array });
var Float = class extends DataType {
  constructor(precision) {
    super(Type2.Float);
    this.precision = precision;
  }
  get ArrayType() {
    switch (this.precision) {
      case Precision.HALF:
        return Uint16Array;
      case Precision.SINGLE:
        return Float32Array;
      case Precision.DOUBLE:
        return Float64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
  toString() {
    return `Float${this.precision << 5 || 16}`;
  }
};
_d = Symbol.toStringTag;
Float[_d] = ((proto) => {
  proto.precision = null;
  return proto[Symbol.toStringTag] = "Float";
})(Float.prototype);
var Float16 = class extends Float {
  constructor() {
    super(Precision.HALF);
  }
};
var Float32 = class extends Float {
  constructor() {
    super(Precision.SINGLE);
  }
};
var Float64 = class extends Float {
  constructor() {
    super(Precision.DOUBLE);
  }
};
Object.defineProperty(Float16.prototype, "ArrayType", { value: Uint16Array });
Object.defineProperty(Float32.prototype, "ArrayType", { value: Float32Array });
Object.defineProperty(Float64.prototype, "ArrayType", { value: Float64Array });
var Binary2 = class extends DataType {
  constructor() {
    super(Type2.Binary);
  }
  toString() {
    return `Binary`;
  }
};
_e = Symbol.toStringTag;
Binary2[_e] = ((proto) => {
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "Binary";
})(Binary2.prototype);
var BinaryView2 = class extends DataType {
  constructor() {
    super(Type2.BinaryView);
  }
  toString() {
    return `BinaryView`;
  }
};
_f = Symbol.toStringTag;
BinaryView2.ELEMENT_WIDTH = 16;
BinaryView2.INLINE_CAPACITY = 12;
BinaryView2.LENGTH_OFFSET = 0;
BinaryView2.INLINE_OFFSET = 4;
BinaryView2.BUFFER_INDEX_OFFSET = 8;
BinaryView2.BUFFER_OFFSET_OFFSET = 12;
BinaryView2[_f] = ((proto) => {
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "BinaryView";
})(BinaryView2.prototype);
var LargeBinary2 = class extends DataType {
  constructor() {
    super(Type2.LargeBinary);
  }
  toString() {
    return `LargeBinary`;
  }
};
_g = Symbol.toStringTag;
LargeBinary2[_g] = ((proto) => {
  proto.ArrayType = Uint8Array;
  proto.OffsetArrayType = BigInt64Array;
  return proto[Symbol.toStringTag] = "LargeBinary";
})(LargeBinary2.prototype);
var Utf82 = class extends DataType {
  constructor() {
    super(Type2.Utf8);
  }
  toString() {
    return `Utf8`;
  }
};
_h = Symbol.toStringTag;
Utf82[_h] = ((proto) => {
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "Utf8";
})(Utf82.prototype);
var Utf8View2 = class extends DataType {
  constructor() {
    super(Type2.Utf8View);
  }
  toString() {
    return `Utf8View`;
  }
};
_j = Symbol.toStringTag;
Utf8View2.ELEMENT_WIDTH = BinaryView2.ELEMENT_WIDTH;
Utf8View2.INLINE_CAPACITY = BinaryView2.INLINE_CAPACITY;
Utf8View2[_j] = ((proto) => {
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "Utf8View";
})(Utf8View2.prototype);
var LargeUtf82 = class extends DataType {
  constructor() {
    super(Type2.LargeUtf8);
  }
  toString() {
    return `LargeUtf8`;
  }
};
_k = Symbol.toStringTag;
LargeUtf82[_k] = ((proto) => {
  proto.ArrayType = Uint8Array;
  proto.OffsetArrayType = BigInt64Array;
  return proto[Symbol.toStringTag] = "LargeUtf8";
})(LargeUtf82.prototype);
var Bool2 = class extends DataType {
  constructor() {
    super(Type2.Bool);
  }
  toString() {
    return `Bool`;
  }
};
_l = Symbol.toStringTag;
Bool2[_l] = ((proto) => {
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "Bool";
})(Bool2.prototype);
var Decimal2 = class extends DataType {
  constructor(scale, precision, bitWidth = 128) {
    super(Type2.Decimal);
    this.scale = scale;
    this.precision = precision;
    this.bitWidth = bitWidth;
  }
  toString() {
    return `Decimal[${this.precision}e${this.scale > 0 ? `+` : ``}${this.scale}]`;
  }
};
_m = Symbol.toStringTag;
Decimal2[_m] = ((proto) => {
  proto.scale = null;
  proto.precision = null;
  proto.ArrayType = Uint32Array;
  return proto[Symbol.toStringTag] = "Decimal";
})(Decimal2.prototype);
var Date_ = class extends DataType {
  constructor(unit) {
    super(Type2.Date);
    this.unit = unit;
  }
  toString() {
    return `Date${(this.unit + 1) * 32}<${DateUnit[this.unit]}>`;
  }
  get ArrayType() {
    return this.unit === DateUnit.DAY ? Int32Array : BigInt64Array;
  }
};
_o = Symbol.toStringTag;
Date_[_o] = ((proto) => {
  proto.unit = null;
  return proto[Symbol.toStringTag] = "Date";
})(Date_.prototype);
var Time_ = class extends DataType {
  constructor(unit, bitWidth) {
    super(Type2.Time);
    this.unit = unit;
    this.bitWidth = bitWidth;
  }
  toString() {
    return `Time${this.bitWidth}<${TimeUnit[this.unit]}>`;
  }
  get ArrayType() {
    switch (this.bitWidth) {
      case 32:
        return Int32Array;
      case 64:
        return BigInt64Array;
    }
    throw new Error(`Unrecognized ${this[Symbol.toStringTag]} type`);
  }
};
_p = Symbol.toStringTag;
Time_[_p] = ((proto) => {
  proto.unit = null;
  proto.bitWidth = null;
  return proto[Symbol.toStringTag] = "Time";
})(Time_.prototype);
var Timestamp_ = class extends DataType {
  constructor(unit, timezone) {
    super(Type2.Timestamp);
    this.unit = unit;
    this.timezone = timezone;
  }
  toString() {
    return `Timestamp<${TimeUnit[this.unit]}${this.timezone ? `, ${this.timezone}` : ``}>`;
  }
};
_q = Symbol.toStringTag;
Timestamp_[_q] = ((proto) => {
  proto.unit = null;
  proto.timezone = null;
  proto.ArrayType = BigInt64Array;
  return proto[Symbol.toStringTag] = "Timestamp";
})(Timestamp_.prototype);
var Interval_ = class extends DataType {
  constructor(unit) {
    super(Type2.Interval);
    this.unit = unit;
  }
  toString() {
    return `Interval<${IntervalUnit[this.unit]}>`;
  }
};
_r = Symbol.toStringTag;
Interval_[_r] = ((proto) => {
  proto.unit = null;
  proto.ArrayType = Int32Array;
  return proto[Symbol.toStringTag] = "Interval";
})(Interval_.prototype);
var Duration2 = class extends DataType {
  constructor(unit) {
    super(Type2.Duration);
    this.unit = unit;
  }
  toString() {
    return `Duration<${TimeUnit[this.unit]}>`;
  }
};
_s = Symbol.toStringTag;
Duration2[_s] = ((proto) => {
  proto.unit = null;
  proto.ArrayType = BigInt64Array;
  return proto[Symbol.toStringTag] = "Duration";
})(Duration2.prototype);
var List2 = class extends DataType {
  constructor(child) {
    super(Type2.List);
    this.children = [child];
  }
  toString() {
    return `List<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
};
_t = Symbol.toStringTag;
List2[_t] = ((proto) => {
  proto.children = null;
  return proto[Symbol.toStringTag] = "List";
})(List2.prototype);
var LargeList2 = class extends DataType {
  constructor(child) {
    super(Type2.LargeList);
    this.children = [child];
  }
  toString() {
    return `LargeList<${this.valueType}>`;
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
};
_u = Symbol.toStringTag;
LargeList2[_u] = ((proto) => {
  proto.children = null;
  proto.OffsetArrayType = BigInt64Array;
  return proto[Symbol.toStringTag] = "LargeList";
})(LargeList2.prototype);
var Struct = class extends DataType {
  constructor(children) {
    super(Type2.Struct);
    this.children = children;
  }
  toString() {
    return `Struct<{${this.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`;
  }
};
_v = Symbol.toStringTag;
Struct[_v] = ((proto) => {
  proto.children = null;
  return proto[Symbol.toStringTag] = "Struct";
})(Struct.prototype);
var Union_ = class extends DataType {
  constructor(mode, typeIds, children) {
    super(Type2.Union);
    this.mode = mode;
    this.children = children;
    this.typeIds = typeIds = Int32Array.from(typeIds);
    this.typeIdToChildIndex = typeIds.reduce((typeIdToChildIndex, typeId, idx) => (typeIdToChildIndex[typeId] = idx) && typeIdToChildIndex || typeIdToChildIndex, /* @__PURE__ */ Object.create(null));
  }
  toString() {
    return `${this[Symbol.toStringTag]}<${this.children.map((x) => `${x.type}`).join(` | `)}>`;
  }
};
_w = Symbol.toStringTag;
Union_[_w] = ((proto) => {
  proto.mode = null;
  proto.typeIds = null;
  proto.children = null;
  proto.typeIdToChildIndex = null;
  proto.ArrayType = Int8Array;
  return proto[Symbol.toStringTag] = "Union";
})(Union_.prototype);
var FixedSizeBinary2 = class extends DataType {
  constructor(byteWidth) {
    super(Type2.FixedSizeBinary);
    this.byteWidth = byteWidth;
  }
  toString() {
    return `FixedSizeBinary[${this.byteWidth}]`;
  }
};
_x = Symbol.toStringTag;
FixedSizeBinary2[_x] = ((proto) => {
  proto.byteWidth = null;
  proto.ArrayType = Uint8Array;
  return proto[Symbol.toStringTag] = "FixedSizeBinary";
})(FixedSizeBinary2.prototype);
var FixedSizeList2 = class extends DataType {
  constructor(listSize, child) {
    super(Type2.FixedSizeList);
    this.listSize = listSize;
    this.children = [child];
  }
  get valueType() {
    return this.children[0].type;
  }
  get valueField() {
    return this.children[0];
  }
  get ArrayType() {
    return this.valueType.ArrayType;
  }
  toString() {
    return `FixedSizeList[${this.listSize}]<${this.valueType}>`;
  }
};
_y = Symbol.toStringTag;
FixedSizeList2[_y] = ((proto) => {
  proto.children = null;
  proto.listSize = null;
  return proto[Symbol.toStringTag] = "FixedSizeList";
})(FixedSizeList2.prototype);
var Map_ = class extends DataType {
  constructor(entries, keysSorted = false) {
    var _1, _2, _3;
    super(Type2.Map);
    this.children = [entries];
    this.keysSorted = keysSorted;
    if (entries) {
      entries["name"] = "entries";
      if ((_1 = entries === null || entries === void 0 ? void 0 : entries.type) === null || _1 === void 0 ? void 0 : _1.children) {
        const key = (_2 = entries === null || entries === void 0 ? void 0 : entries.type) === null || _2 === void 0 ? void 0 : _2.children[0];
        if (key) {
          key["name"] = "key";
        }
        const val = (_3 = entries === null || entries === void 0 ? void 0 : entries.type) === null || _3 === void 0 ? void 0 : _3.children[1];
        if (val) {
          val["name"] = "value";
        }
      }
    }
  }
  get keyType() {
    return this.children[0].type.children[0].type;
  }
  get valueType() {
    return this.children[0].type.children[1].type;
  }
  get childType() {
    return this.children[0].type;
  }
  toString() {
    return `Map<{${this.children[0].type.children.map((f) => `${f.name}:${f.type}`).join(`, `)}}>`;
  }
};
_z = Symbol.toStringTag;
Map_[_z] = ((proto) => {
  proto.children = null;
  proto.keysSorted = null;
  return proto[Symbol.toStringTag] = "Map_";
})(Map_.prototype);
var getId = /* @__PURE__ */ ((atomicDictionaryId) => () => ++atomicDictionaryId)(-1);
var Dictionary = class extends DataType {
  constructor(dictionary, indices, id, isOrdered) {
    super(Type2.Dictionary);
    this.indices = indices;
    this.dictionary = dictionary;
    this.isOrdered = isOrdered || false;
    this.id = id == null ? getId() : bigIntToNumber(id);
  }
  get children() {
    return this.dictionary.children;
  }
  get valueType() {
    return this.dictionary;
  }
  get ArrayType() {
    return this.dictionary.ArrayType;
  }
  toString() {
    return `Dictionary<${this.indices}, ${this.dictionary}>`;
  }
};
_0 = Symbol.toStringTag;
Dictionary[_0] = ((proto) => {
  proto.id = null;
  proto.indices = null;
  proto.isOrdered = null;
  proto.dictionary = null;
  return proto[Symbol.toStringTag] = "Dictionary";
})(Dictionary.prototype);
function strideForType(type) {
  const t = type;
  switch (type.typeId) {
    case Type2.Decimal:
      return type.bitWidth / 32;
    case Type2.Interval: {
      if (t.unit === IntervalUnit.MONTH_DAY_NANO) {
        return 4;
      }
      return 1 + t.unit;
    }
    // case Type.Int: return 1 + +((t as Int_).bitWidth > 32);
    // case Type.Time: return 1 + +((t as Time_).bitWidth > 32);
    case Type2.BinaryView:
    case Type2.Utf8View:
      return 16;
    case Type2.FixedSizeList:
      return t.listSize;
    case Type2.FixedSizeBinary:
      return t.byteWidth;
    default:
      return 1;
  }
}

// node_modules/apache-arrow/visitor.mjs
var Visitor = class {
  visitMany(nodes, ...args) {
    return nodes.map((node, i) => this.visit(node, ...args.map((x) => x[i])));
  }
  visit(...args) {
    return this.getVisitFn(args[0], false).apply(this, args);
  }
  getVisitFn(node, throwIfNotFound = true) {
    return getVisitFn(this, node, throwIfNotFound);
  }
  getVisitFnByTypeId(typeId, throwIfNotFound = true) {
    return getVisitFnByTypeId(this, typeId, throwIfNotFound);
  }
  visitNull(_node, ..._args) {
    return null;
  }
  visitBool(_node, ..._args) {
    return null;
  }
  visitInt(_node, ..._args) {
    return null;
  }
  visitFloat(_node, ..._args) {
    return null;
  }
  visitUtf8(_node, ..._args) {
    return null;
  }
  visitLargeUtf8(_node, ..._args) {
    return null;
  }
  visitUtf8View(_node, ..._args) {
    return null;
  }
  visitBinary(_node, ..._args) {
    return null;
  }
  visitLargeBinary(_node, ..._args) {
    return null;
  }
  visitBinaryView(_node, ..._args) {
    return null;
  }
  visitFixedSizeBinary(_node, ..._args) {
    return null;
  }
  visitDate(_node, ..._args) {
    return null;
  }
  visitTimestamp(_node, ..._args) {
    return null;
  }
  visitTime(_node, ..._args) {
    return null;
  }
  visitDecimal(_node, ..._args) {
    return null;
  }
  visitList(_node, ..._args) {
    return null;
  }
  visitLargeList(_node, ..._args) {
    return null;
  }
  visitStruct(_node, ..._args) {
    return null;
  }
  visitUnion(_node, ..._args) {
    return null;
  }
  visitDictionary(_node, ..._args) {
    return null;
  }
  visitInterval(_node, ..._args) {
    return null;
  }
  visitDuration(_node, ..._args) {
    return null;
  }
  visitFixedSizeList(_node, ..._args) {
    return null;
  }
  visitMap(_node, ..._args) {
    return null;
  }
};
function getVisitFn(visitor, node, throwIfNotFound = true) {
  if (typeof node === "number") {
    return getVisitFnByTypeId(visitor, node, throwIfNotFound);
  }
  if (typeof node === "string" && node in Type2) {
    return getVisitFnByTypeId(visitor, Type2[node], throwIfNotFound);
  }
  if (node && node instanceof DataType) {
    return getVisitFnByTypeId(visitor, inferDType(node), throwIfNotFound);
  }
  if ((node === null || node === void 0 ? void 0 : node.type) && node.type instanceof DataType) {
    return getVisitFnByTypeId(visitor, inferDType(node.type), throwIfNotFound);
  }
  return getVisitFnByTypeId(visitor, Type2.NONE, throwIfNotFound);
}
function getVisitFnByTypeId(visitor, dtype, throwIfNotFound = true) {
  let fn = null;
  switch (dtype) {
    case Type2.Null:
      fn = visitor.visitNull;
      break;
    case Type2.Bool:
      fn = visitor.visitBool;
      break;
    case Type2.Int:
      fn = visitor.visitInt;
      break;
    case Type2.Int8:
      fn = visitor.visitInt8 || visitor.visitInt;
      break;
    case Type2.Int16:
      fn = visitor.visitInt16 || visitor.visitInt;
      break;
    case Type2.Int32:
      fn = visitor.visitInt32 || visitor.visitInt;
      break;
    case Type2.Int64:
      fn = visitor.visitInt64 || visitor.visitInt;
      break;
    case Type2.Uint8:
      fn = visitor.visitUint8 || visitor.visitInt;
      break;
    case Type2.Uint16:
      fn = visitor.visitUint16 || visitor.visitInt;
      break;
    case Type2.Uint32:
      fn = visitor.visitUint32 || visitor.visitInt;
      break;
    case Type2.Uint64:
      fn = visitor.visitUint64 || visitor.visitInt;
      break;
    case Type2.Float:
      fn = visitor.visitFloat;
      break;
    case Type2.Float16:
      fn = visitor.visitFloat16 || visitor.visitFloat;
      break;
    case Type2.Float32:
      fn = visitor.visitFloat32 || visitor.visitFloat;
      break;
    case Type2.Float64:
      fn = visitor.visitFloat64 || visitor.visitFloat;
      break;
    case Type2.Utf8:
      fn = visitor.visitUtf8;
      break;
    case Type2.LargeUtf8:
      fn = visitor.visitLargeUtf8;
      break;
    case Type2.Utf8View:
      fn = visitor.visitUtf8View || visitor.visitUtf8;
      break;
    case Type2.Binary:
      fn = visitor.visitBinary;
      break;
    case Type2.LargeBinary:
      fn = visitor.visitLargeBinary;
      break;
    case Type2.BinaryView:
      fn = visitor.visitBinaryView || visitor.visitBinary;
      break;
    case Type2.FixedSizeBinary:
      fn = visitor.visitFixedSizeBinary;
      break;
    case Type2.Date:
      fn = visitor.visitDate;
      break;
    case Type2.DateDay:
      fn = visitor.visitDateDay || visitor.visitDate;
      break;
    case Type2.DateMillisecond:
      fn = visitor.visitDateMillisecond || visitor.visitDate;
      break;
    case Type2.Timestamp:
      fn = visitor.visitTimestamp;
      break;
    case Type2.TimestampSecond:
      fn = visitor.visitTimestampSecond || visitor.visitTimestamp;
      break;
    case Type2.TimestampMillisecond:
      fn = visitor.visitTimestampMillisecond || visitor.visitTimestamp;
      break;
    case Type2.TimestampMicrosecond:
      fn = visitor.visitTimestampMicrosecond || visitor.visitTimestamp;
      break;
    case Type2.TimestampNanosecond:
      fn = visitor.visitTimestampNanosecond || visitor.visitTimestamp;
      break;
    case Type2.Time:
      fn = visitor.visitTime;
      break;
    case Type2.TimeSecond:
      fn = visitor.visitTimeSecond || visitor.visitTime;
      break;
    case Type2.TimeMillisecond:
      fn = visitor.visitTimeMillisecond || visitor.visitTime;
      break;
    case Type2.TimeMicrosecond:
      fn = visitor.visitTimeMicrosecond || visitor.visitTime;
      break;
    case Type2.TimeNanosecond:
      fn = visitor.visitTimeNanosecond || visitor.visitTime;
      break;
    case Type2.Decimal:
      fn = visitor.visitDecimal;
      break;
    case Type2.List:
      fn = visitor.visitList;
      break;
    case Type2.LargeList:
      fn = visitor.visitLargeList;
      break;
    case Type2.Struct:
      fn = visitor.visitStruct;
      break;
    case Type2.Union:
      fn = visitor.visitUnion;
      break;
    case Type2.DenseUnion:
      fn = visitor.visitDenseUnion || visitor.visitUnion;
      break;
    case Type2.SparseUnion:
      fn = visitor.visitSparseUnion || visitor.visitUnion;
      break;
    case Type2.Dictionary:
      fn = visitor.visitDictionary;
      break;
    case Type2.Interval:
      fn = visitor.visitInterval;
      break;
    case Type2.IntervalDayTime:
      fn = visitor.visitIntervalDayTime || visitor.visitInterval;
      break;
    case Type2.IntervalYearMonth:
      fn = visitor.visitIntervalYearMonth || visitor.visitInterval;
      break;
    case Type2.IntervalMonthDayNano:
      fn = visitor.visitIntervalMonthDayNano || visitor.visitInterval;
      break;
    case Type2.Duration:
      fn = visitor.visitDuration;
      break;
    case Type2.DurationSecond:
      fn = visitor.visitDurationSecond || visitor.visitDuration;
      break;
    case Type2.DurationMillisecond:
      fn = visitor.visitDurationMillisecond || visitor.visitDuration;
      break;
    case Type2.DurationMicrosecond:
      fn = visitor.visitDurationMicrosecond || visitor.visitDuration;
      break;
    case Type2.DurationNanosecond:
      fn = visitor.visitDurationNanosecond || visitor.visitDuration;
      break;
    case Type2.FixedSizeList:
      fn = visitor.visitFixedSizeList;
      break;
    case Type2.Map:
      fn = visitor.visitMap;
      break;
  }
  if (typeof fn === "function")
    return fn;
  if (!throwIfNotFound)
    return () => null;
  throw new Error(`Unrecognized type '${Type2[dtype]}'`);
}
function inferDType(type) {
  switch (type.typeId) {
    case Type2.Null:
      return Type2.Null;
    case Type2.Int: {
      const { bitWidth, isSigned } = type;
      switch (bitWidth) {
        case 8:
          return isSigned ? Type2.Int8 : Type2.Uint8;
        case 16:
          return isSigned ? Type2.Int16 : Type2.Uint16;
        case 32:
          return isSigned ? Type2.Int32 : Type2.Uint32;
        case 64:
          return isSigned ? Type2.Int64 : Type2.Uint64;
      }
      return Type2.Int;
    }
    case Type2.Float:
      switch (type.precision) {
        case Precision.HALF:
          return Type2.Float16;
        case Precision.SINGLE:
          return Type2.Float32;
        case Precision.DOUBLE:
          return Type2.Float64;
      }
      return Type2.Float;
    case Type2.Binary:
      return Type2.Binary;
    case Type2.LargeBinary:
      return Type2.LargeBinary;
    case Type2.BinaryView:
      return Type2.BinaryView;
    case Type2.Utf8:
      return Type2.Utf8;
    case Type2.LargeUtf8:
      return Type2.LargeUtf8;
    case Type2.Utf8View:
      return Type2.Utf8View;
    case Type2.Bool:
      return Type2.Bool;
    case Type2.Decimal:
      return Type2.Decimal;
    case Type2.Time:
      switch (type.unit) {
        case TimeUnit.SECOND:
          return Type2.TimeSecond;
        case TimeUnit.MILLISECOND:
          return Type2.TimeMillisecond;
        case TimeUnit.MICROSECOND:
          return Type2.TimeMicrosecond;
        case TimeUnit.NANOSECOND:
          return Type2.TimeNanosecond;
      }
      return Type2.Time;
    case Type2.Timestamp:
      switch (type.unit) {
        case TimeUnit.SECOND:
          return Type2.TimestampSecond;
        case TimeUnit.MILLISECOND:
          return Type2.TimestampMillisecond;
        case TimeUnit.MICROSECOND:
          return Type2.TimestampMicrosecond;
        case TimeUnit.NANOSECOND:
          return Type2.TimestampNanosecond;
      }
      return Type2.Timestamp;
    case Type2.Date:
      switch (type.unit) {
        case DateUnit.DAY:
          return Type2.DateDay;
        case DateUnit.MILLISECOND:
          return Type2.DateMillisecond;
      }
      return Type2.Date;
    case Type2.Interval:
      switch (type.unit) {
        case IntervalUnit.DAY_TIME:
          return Type2.IntervalDayTime;
        case IntervalUnit.YEAR_MONTH:
          return Type2.IntervalYearMonth;
        case IntervalUnit.MONTH_DAY_NANO:
          return Type2.IntervalMonthDayNano;
      }
      return Type2.Interval;
    case Type2.Duration:
      switch (type.unit) {
        case TimeUnit.SECOND:
          return Type2.DurationSecond;
        case TimeUnit.MILLISECOND:
          return Type2.DurationMillisecond;
        case TimeUnit.MICROSECOND:
          return Type2.DurationMicrosecond;
        case TimeUnit.NANOSECOND:
          return Type2.DurationNanosecond;
      }
      return Type2.Duration;
    case Type2.Map:
      return Type2.Map;
    case Type2.List:
      return Type2.List;
    case Type2.LargeList:
      return Type2.LargeList;
    case Type2.Struct:
      return Type2.Struct;
    case Type2.Union:
      switch (type.mode) {
        case UnionMode.Dense:
          return Type2.DenseUnion;
        case UnionMode.Sparse:
          return Type2.SparseUnion;
      }
      return Type2.Union;
    case Type2.FixedSizeBinary:
      return Type2.FixedSizeBinary;
    case Type2.FixedSizeList:
      return Type2.FixedSizeList;
    case Type2.Dictionary:
      return Type2.Dictionary;
  }
  throw new Error(`Unrecognized type '${Type2[type.typeId]}'`);
}
Visitor.prototype.visitInt8 = null;
Visitor.prototype.visitInt16 = null;
Visitor.prototype.visitInt32 = null;
Visitor.prototype.visitInt64 = null;
Visitor.prototype.visitUint8 = null;
Visitor.prototype.visitUint16 = null;
Visitor.prototype.visitUint32 = null;
Visitor.prototype.visitUint64 = null;
Visitor.prototype.visitFloat16 = null;
Visitor.prototype.visitFloat32 = null;
Visitor.prototype.visitFloat64 = null;
Visitor.prototype.visitDateDay = null;
Visitor.prototype.visitDateMillisecond = null;
Visitor.prototype.visitTimestampSecond = null;
Visitor.prototype.visitTimestampMillisecond = null;
Visitor.prototype.visitTimestampMicrosecond = null;
Visitor.prototype.visitTimestampNanosecond = null;
Visitor.prototype.visitTimeSecond = null;
Visitor.prototype.visitTimeMillisecond = null;
Visitor.prototype.visitTimeMicrosecond = null;
Visitor.prototype.visitTimeNanosecond = null;
Visitor.prototype.visitDenseUnion = null;
Visitor.prototype.visitSparseUnion = null;
Visitor.prototype.visitIntervalDayTime = null;
Visitor.prototype.visitIntervalYearMonth = null;
Visitor.prototype.visitIntervalMonthDayNano = null;
Visitor.prototype.visitDuration = null;
Visitor.prototype.visitDurationSecond = null;
Visitor.prototype.visitDurationMillisecond = null;
Visitor.prototype.visitDurationMicrosecond = null;
Visitor.prototype.visitDurationNanosecond = null;

// node_modules/apache-arrow/util/math.mjs
var math_exports = {};
__export(math_exports, {
  float64ToUint16: () => float64ToUint16,
  uint16ToFloat64: () => uint16ToFloat64
});
var f64 = new Float64Array(1);
var u32 = new Uint32Array(f64.buffer);
function uint16ToFloat64(h) {
  const expo = (h & 31744) >> 10;
  const sigf = (h & 1023) / 1024;
  const sign = Math.pow(-1, (h & 32768) >> 15);
  switch (expo) {
    case 31:
      return sign * (sigf ? Number.NaN : 1 / 0);
    case 0:
      return sign * (sigf ? 6103515625e-14 * sigf : 0);
  }
  return sign * Math.pow(2, expo - 15) * (1 + sigf);
}
function float64ToUint16(d) {
  if (d !== d) {
    return 32256;
  }
  f64[0] = d;
  const sign = (u32[1] & 2147483648) >> 16 & 65535;
  let expo = u32[1] & 2146435072, sigf = 0;
  if (expo >= 1089470464) {
    if (u32[0] > 0) {
      expo = 31744;
    } else {
      expo = (expo & 2080374784) >> 16;
      sigf = (u32[1] & 1048575) >> 10;
    }
  } else if (expo <= 1056964608) {
    sigf = 1048576 + (u32[1] & 1048575);
    sigf = 1048576 + (sigf << (expo >> 20) - 998) >> 21;
    expo = 0;
  } else {
    expo = expo - 1056964608 >> 10;
    sigf = (u32[1] & 1048575) + 512 >> 10;
  }
  return sign | expo | sigf & 65535;
}

// node_modules/apache-arrow/visitor/set.mjs
var SetVisitor = class extends Visitor {
};
function wrapSet(fn) {
  return (data, _1, _2) => {
    if (data.setValid(_1, _2 != null)) {
      return fn(data, _1, _2);
    }
  };
}
var setEpochMsToDays = (data, index, epochMs) => {
  data[index] = Math.floor(epochMs / 864e5);
};
var setVariableWidthBytes = (values, valueOffsets, index, value) => {
  if (index + 1 < valueOffsets.length) {
    const x = bigIntToNumber(valueOffsets[index]);
    const y = bigIntToNumber(valueOffsets[index + 1]);
    values.set(value.subarray(0, y - x), x);
  }
};
var setBool = ({ offset, values }, index, val) => {
  const idx = offset + index;
  val ? values[idx >> 3] |= 1 << idx % 8 : values[idx >> 3] &= ~(1 << idx % 8);
};
var setInt = ({ values }, index, value) => {
  values[index] = value;
};
var setFloat = ({ values }, index, value) => {
  values[index] = value;
};
var setFloat16 = ({ values }, index, value) => {
  values[index] = float64ToUint16(value);
};
var setAnyFloat = (data, index, value) => {
  switch (data.type.precision) {
    case Precision.HALF:
      return setFloat16(data, index, value);
    case Precision.SINGLE:
    case Precision.DOUBLE:
      return setFloat(data, index, value);
  }
};
var setDateDay = ({ values }, index, value) => {
  setEpochMsToDays(values, index, value.valueOf());
};
var setDateMillisecond = ({ values }, index, value) => {
  values[index] = BigInt(value);
};
var setFixedSizeBinary = ({ stride, values }, index, value) => {
  values.set(value.subarray(0, stride), stride * index);
};
var setBinary = ({ values, valueOffsets }, index, value) => setVariableWidthBytes(values, valueOffsets, index, value);
var ensureWritableVariadicBuffers = (data) => {
  let buffers = data.variadicBuffers;
  if (!Array.isArray(buffers) || Object.isFrozen(buffers)) {
    buffers = Array.from(buffers);
    data.variadicBuffers = buffers;
  }
  return buffers;
};
var setBinaryViewBytes = (data, index, bytes) => {
  var _a5, _b2, _c2, _d2;
  const views = data.values;
  if (!views) {
    throw new Error("BinaryView data is missing view buffer");
  }
  const elementWidth = BinaryView2.ELEMENT_WIDTH;
  const viewOffset = index * elementWidth;
  const end = viewOffset + elementWidth;
  if (viewOffset < 0 || end > views.length) {
    throw new RangeError(`BinaryView index ${index} out of bounds`);
  }
  views.fill(0, viewOffset, end);
  const view = new DataView(views.buffer, views.byteOffset + viewOffset, elementWidth);
  const length = bytes.length;
  view.setInt32(BinaryView2.LENGTH_OFFSET, length, true);
  if (length <= BinaryView2.INLINE_CAPACITY) {
    views.set(bytes, viewOffset + BinaryView2.INLINE_OFFSET);
    return;
  }
  const prefix = ((_a5 = bytes[0]) !== null && _a5 !== void 0 ? _a5 : 0) | ((_b2 = bytes[1]) !== null && _b2 !== void 0 ? _b2 : 0) << 8 | ((_c2 = bytes[2]) !== null && _c2 !== void 0 ? _c2 : 0) << 16 | ((_d2 = bytes[3]) !== null && _d2 !== void 0 ? _d2 : 0) << 24;
  view.setUint32(BinaryView2.INLINE_OFFSET, prefix >>> 0, true);
  const buffers = ensureWritableVariadicBuffers(data);
  const copy = bytes.slice();
  const bufferIndex = buffers.push(copy) - 1;
  view.setInt32(BinaryView2.BUFFER_INDEX_OFFSET, bufferIndex, true);
  view.setInt32(BinaryView2.BUFFER_OFFSET_OFFSET, 0, true);
};
var setBinaryView = (data, index, value) => {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  setBinaryViewBytes(data, index, bytes);
};
var setUtf8 = ({ values, valueOffsets }, index, value) => setVariableWidthBytes(values, valueOffsets, index, encodeUtf8(value));
var setUtf8View = (data, index, value) => {
  const bytes = encodeUtf8(value);
  setBinaryViewBytes(data, index, bytes);
};
var setDate = (data, index, value) => {
  data.type.unit === DateUnit.DAY ? setDateDay(data, index, value) : setDateMillisecond(data, index, value);
};
var setTimestampSecond = ({ values }, index, value) => {
  values[index] = BigInt(value / 1e3);
};
var setTimestampMillisecond = ({ values }, index, value) => {
  values[index] = BigInt(value);
};
var setTimestampMicrosecond = ({ values }, index, value) => {
  values[index] = BigInt(value * 1e3);
};
var setTimestampNanosecond = ({ values }, index, value) => {
  values[index] = BigInt(value * 1e6);
};
var setTimestamp = (data, index, value) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return setTimestampSecond(data, index, value);
    case TimeUnit.MILLISECOND:
      return setTimestampMillisecond(data, index, value);
    case TimeUnit.MICROSECOND:
      return setTimestampMicrosecond(data, index, value);
    case TimeUnit.NANOSECOND:
      return setTimestampNanosecond(data, index, value);
  }
};
var setTimeSecond = ({ values }, index, value) => {
  values[index] = value;
};
var setTimeMillisecond = ({ values }, index, value) => {
  values[index] = value;
};
var setTimeMicrosecond = ({ values }, index, value) => {
  values[index] = value;
};
var setTimeNanosecond = ({ values }, index, value) => {
  values[index] = value;
};
var setTime = (data, index, value) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return setTimeSecond(data, index, value);
    case TimeUnit.MILLISECOND:
      return setTimeMillisecond(data, index, value);
    case TimeUnit.MICROSECOND:
      return setTimeMicrosecond(data, index, value);
    case TimeUnit.NANOSECOND:
      return setTimeNanosecond(data, index, value);
  }
};
var setDecimal = ({ values, stride }, index, value) => {
  values.set(value.subarray(0, stride), stride * index);
};
var setList = (data, index, value) => {
  const values = data.children[0];
  const valueOffsets = data.valueOffsets;
  const set = instance.getVisitFn(values);
  const begin = bigIntToNumber(valueOffsets[index]);
  const end = bigIntToNumber(valueOffsets[index + 1]);
  if (Array.isArray(value)) {
    for (let idx = -1, itr = begin; itr < end; ) {
      set(values, itr++, value[++idx]);
    }
  } else {
    for (let idx = -1, itr = begin; itr < end; ) {
      set(values, itr++, value.get(++idx));
    }
  }
};
var setMap = (data, index, value) => {
  const values = data.children[0];
  const { valueOffsets } = data;
  const set = instance.getVisitFn(values);
  let { [index]: idx, [index + 1]: end } = valueOffsets;
  const entries = value instanceof Map ? value.entries() : Object.entries(value);
  for (const val of entries) {
    set(values, idx, val);
    if (++idx >= end)
      break;
  }
};
var _setStructArrayValue = (o, v) => (set, c, _, i) => c && set(c, o, v[i]);
var _setStructVectorValue = (o, v) => (set, c, _, i) => c && set(c, o, v.get(i));
var _setStructMapValue = (o, v) => (set, c, f, _) => c && set(c, o, v.get(f.name));
var _setStructObjectValue = (o, v) => (set, c, f, _) => c && set(c, o, v[f.name]);
var setStruct = (data, index, value) => {
  const childSetters = data.type.children.map((f) => instance.getVisitFn(f.type));
  const set = value instanceof Map ? _setStructMapValue(index, value) : value instanceof Vector ? _setStructVectorValue(index, value) : Array.isArray(value) ? _setStructArrayValue(index, value) : _setStructObjectValue(index, value);
  data.type.children.forEach((f, i) => set(childSetters[i], data.children[i], f, i));
};
var setUnion = (data, index, value) => {
  data.type.mode === UnionMode.Dense ? setDenseUnion(data, index, value) : setSparseUnion(data, index, value);
};
var setDenseUnion = (data, index, value) => {
  const childIndex = data.type.typeIdToChildIndex[data.typeIds[index]];
  const child = data.children[childIndex];
  instance.visit(child, data.valueOffsets[index], value);
};
var setSparseUnion = (data, index, value) => {
  const childIndex = data.type.typeIdToChildIndex[data.typeIds[index]];
  const child = data.children[childIndex];
  instance.visit(child, index, value);
};
var setDictionary = (data, index, value) => {
  var _a5;
  (_a5 = data.dictionary) === null || _a5 === void 0 ? void 0 : _a5.set(data.values[index], value);
};
var setIntervalValue = (data, index, value) => {
  switch (data.type.unit) {
    case IntervalUnit.YEAR_MONTH:
      return setIntervalYearMonth(data, index, value);
    case IntervalUnit.DAY_TIME:
      return setIntervalDayTime(data, index, value);
    case IntervalUnit.MONTH_DAY_NANO:
      return setIntervalMonthDayNano(data, index, value);
  }
};
var setIntervalDayTime = ({ values }, index, value) => {
  values.set(value.subarray(0, 2), 2 * index);
};
var setIntervalYearMonth = ({ values }, index, value) => {
  values[index] = value[0] * 12 + value[1] % 12;
};
var setIntervalMonthDayNano = ({ values, stride }, index, value) => {
  values.set(value.subarray(0, stride), stride * index);
};
var setDurationSecond = ({ values }, index, value) => {
  values[index] = value;
};
var setDurationMillisecond = ({ values }, index, value) => {
  values[index] = value;
};
var setDurationMicrosecond = ({ values }, index, value) => {
  values[index] = value;
};
var setDurationNanosecond = ({ values }, index, value) => {
  values[index] = value;
};
var setDuration = (data, index, value) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return setDurationSecond(data, index, value);
    case TimeUnit.MILLISECOND:
      return setDurationMillisecond(data, index, value);
    case TimeUnit.MICROSECOND:
      return setDurationMicrosecond(data, index, value);
    case TimeUnit.NANOSECOND:
      return setDurationNanosecond(data, index, value);
  }
};
var setFixedSizeList = (data, index, value) => {
  const { stride } = data;
  const child = data.children[0];
  const set = instance.getVisitFn(child);
  if (Array.isArray(value)) {
    for (let idx = -1, offset = index * stride; ++idx < stride; ) {
      set(child, offset + idx, value[idx]);
    }
  } else {
    for (let idx = -1, offset = index * stride; ++idx < stride; ) {
      set(child, offset + idx, value.get(idx));
    }
  }
};
SetVisitor.prototype.visitBool = wrapSet(setBool);
SetVisitor.prototype.visitInt = wrapSet(setInt);
SetVisitor.prototype.visitInt8 = wrapSet(setInt);
SetVisitor.prototype.visitInt16 = wrapSet(setInt);
SetVisitor.prototype.visitInt32 = wrapSet(setInt);
SetVisitor.prototype.visitInt64 = wrapSet(setInt);
SetVisitor.prototype.visitUint8 = wrapSet(setInt);
SetVisitor.prototype.visitUint16 = wrapSet(setInt);
SetVisitor.prototype.visitUint32 = wrapSet(setInt);
SetVisitor.prototype.visitUint64 = wrapSet(setInt);
SetVisitor.prototype.visitFloat = wrapSet(setAnyFloat);
SetVisitor.prototype.visitFloat16 = wrapSet(setFloat16);
SetVisitor.prototype.visitFloat32 = wrapSet(setFloat);
SetVisitor.prototype.visitFloat64 = wrapSet(setFloat);
SetVisitor.prototype.visitUtf8 = wrapSet(setUtf8);
SetVisitor.prototype.visitLargeUtf8 = wrapSet(setUtf8);
SetVisitor.prototype.visitUtf8View = wrapSet(setUtf8View);
SetVisitor.prototype.visitBinary = wrapSet(setBinary);
SetVisitor.prototype.visitLargeBinary = wrapSet(setBinary);
SetVisitor.prototype.visitBinaryView = wrapSet(setBinaryView);
SetVisitor.prototype.visitFixedSizeBinary = wrapSet(setFixedSizeBinary);
SetVisitor.prototype.visitDate = wrapSet(setDate);
SetVisitor.prototype.visitDateDay = wrapSet(setDateDay);
SetVisitor.prototype.visitDateMillisecond = wrapSet(setDateMillisecond);
SetVisitor.prototype.visitTimestamp = wrapSet(setTimestamp);
SetVisitor.prototype.visitTimestampSecond = wrapSet(setTimestampSecond);
SetVisitor.prototype.visitTimestampMillisecond = wrapSet(setTimestampMillisecond);
SetVisitor.prototype.visitTimestampMicrosecond = wrapSet(setTimestampMicrosecond);
SetVisitor.prototype.visitTimestampNanosecond = wrapSet(setTimestampNanosecond);
SetVisitor.prototype.visitTime = wrapSet(setTime);
SetVisitor.prototype.visitTimeSecond = wrapSet(setTimeSecond);
SetVisitor.prototype.visitTimeMillisecond = wrapSet(setTimeMillisecond);
SetVisitor.prototype.visitTimeMicrosecond = wrapSet(setTimeMicrosecond);
SetVisitor.prototype.visitTimeNanosecond = wrapSet(setTimeNanosecond);
SetVisitor.prototype.visitDecimal = wrapSet(setDecimal);
SetVisitor.prototype.visitList = wrapSet(setList);
SetVisitor.prototype.visitLargeList = wrapSet(setList);
SetVisitor.prototype.visitStruct = wrapSet(setStruct);
SetVisitor.prototype.visitUnion = wrapSet(setUnion);
SetVisitor.prototype.visitDenseUnion = wrapSet(setDenseUnion);
SetVisitor.prototype.visitSparseUnion = wrapSet(setSparseUnion);
SetVisitor.prototype.visitDictionary = wrapSet(setDictionary);
SetVisitor.prototype.visitInterval = wrapSet(setIntervalValue);
SetVisitor.prototype.visitIntervalDayTime = wrapSet(setIntervalDayTime);
SetVisitor.prototype.visitIntervalYearMonth = wrapSet(setIntervalYearMonth);
SetVisitor.prototype.visitIntervalMonthDayNano = wrapSet(setIntervalMonthDayNano);
SetVisitor.prototype.visitDuration = wrapSet(setDuration);
SetVisitor.prototype.visitDurationSecond = wrapSet(setDurationSecond);
SetVisitor.prototype.visitDurationMillisecond = wrapSet(setDurationMillisecond);
SetVisitor.prototype.visitDurationMicrosecond = wrapSet(setDurationMicrosecond);
SetVisitor.prototype.visitDurationNanosecond = wrapSet(setDurationNanosecond);
SetVisitor.prototype.visitFixedSizeList = wrapSet(setFixedSizeList);
SetVisitor.prototype.visitMap = wrapSet(setMap);
var instance = new SetVisitor();

// node_modules/apache-arrow/row/struct.mjs
var kParent = Symbol.for("parent");
var kRowIndex = Symbol.for("rowIndex");
var StructRow = class {
  constructor(parent, rowIndex) {
    this[kParent] = parent;
    this[kRowIndex] = rowIndex;
    return new Proxy(this, structRowProxyHandler);
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const i = this[kRowIndex];
    const parent = this[kParent];
    const keys = parent.type.children;
    const json = {};
    for (let j = -1, n = keys.length; ++j < n; ) {
      json[keys[j].name] = instance2.visit(parent.children[j], i);
    }
    return json;
  }
  toString() {
    return `{${[...this].map(([key, val]) => `${valueToString(key)}: ${valueToString(val)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
  [Symbol.iterator]() {
    return new StructRowIterator(this[kParent], this[kRowIndex]);
  }
};
var StructRowIterator = class {
  constructor(data, rowIndex) {
    this.childIndex = 0;
    this.children = data.children;
    this.rowIndex = rowIndex;
    this.childFields = data.type.children;
    this.numChildren = this.childFields.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const i = this.childIndex;
    if (i < this.numChildren) {
      this.childIndex = i + 1;
      return {
        done: false,
        value: [
          this.childFields[i].name,
          instance2.visit(this.children[i], this.rowIndex)
        ]
      };
    }
    return { done: true, value: null };
  }
};
Object.defineProperties(StructRow.prototype, {
  [Symbol.toStringTag]: { enumerable: false, configurable: false, value: "Row" },
  [kParent]: { writable: true, enumerable: false, configurable: false, value: null },
  [kRowIndex]: { writable: true, enumerable: false, configurable: false, value: -1 }
});
var StructRowProxyHandler = class {
  isExtensible() {
    return false;
  }
  deleteProperty() {
    return false;
  }
  preventExtensions() {
    return true;
  }
  ownKeys(row) {
    return row[kParent].type.children.map((f) => f.name);
  }
  has(row, key) {
    return row[kParent].type.children.some((f) => f.name === key);
  }
  getOwnPropertyDescriptor(row, key) {
    if (row[kParent].type.children.some((f) => f.name === key)) {
      return { writable: true, enumerable: true, configurable: true };
    }
    return;
  }
  get(row, key) {
    if (Reflect.has(row, key)) {
      return row[key];
    }
    const idx = row[kParent].type.children.findIndex((f) => f.name === key);
    if (idx !== -1) {
      const val = instance2.visit(row[kParent].children[idx], row[kRowIndex]);
      Reflect.set(row, key, val);
      return val;
    }
  }
  set(row, key, val) {
    const idx = row[kParent].type.children.findIndex((f) => f.name === key);
    if (idx !== -1) {
      instance.visit(row[kParent].children[idx], row[kRowIndex], val);
      return Reflect.set(row, key, val);
    } else if (Reflect.has(row, key) || typeof key === "symbol") {
      return Reflect.set(row, key, val);
    }
    return false;
  }
};
var structRowProxyHandler = new StructRowProxyHandler();

// node_modules/apache-arrow/visitor/get.mjs
var GetVisitor = class extends Visitor {
};
function wrapGet(fn) {
  return (data, _1) => data.getValid(_1) ? fn(data, _1) : null;
}
var epochDaysToMs = (data, index) => 864e5 * data[index];
var BINARY_VIEW_SIZE = 16;
var BINARY_VIEW_INLINE_CAPACITY = 12;
var getNull = (_data, _index) => null;
var getVariableWidthBytes = (values, valueOffsets, index) => {
  if (index + 1 >= valueOffsets.length) {
    return null;
  }
  const x = bigIntToNumber(valueOffsets[index]);
  const y = bigIntToNumber(valueOffsets[index + 1]);
  return values.subarray(x, y);
};
var getBool = ({ offset, values }, index) => {
  const idx = offset + index;
  const byte = values[idx >> 3];
  return (byte & 1 << idx % 8) !== 0;
};
var getDateDay = ({ values }, index) => epochDaysToMs(values, index);
var getDateMillisecond = ({ values }, index) => bigIntToNumber(values[index]);
var getNumeric = ({ stride, values }, index) => values[stride * index];
var getFloat16 = ({ stride, values }, index) => uint16ToFloat64(values[stride * index]);
var getBigInts = ({ values }, index) => values[index];
var getFixedSizeBinary = ({ stride, values }, index) => values.subarray(stride * index, stride * (index + 1));
var getBinary = ({ values, valueOffsets }, index) => getVariableWidthBytes(values, valueOffsets, index);
var getBinaryViewBytes = (data, index) => {
  var _a5;
  const values = data.values;
  if (!values) {
    throw new Error("BinaryView data is missing view buffer");
  }
  const viewOffset = index * BINARY_VIEW_SIZE;
  const end = viewOffset + BINARY_VIEW_SIZE;
  if (viewOffset < 0 || end > values.length) {
    throw new Error(`BinaryView data buffer is too short: expected ${BINARY_VIEW_SIZE} bytes, got ${Math.max(0, values.length - viewOffset)}`);
  }
  const viewStruct = values.subarray(viewOffset, end);
  if (viewStruct.length < BINARY_VIEW_SIZE) {
    throw new Error(`BinaryView data buffer is too short: expected ${BINARY_VIEW_SIZE} bytes, got ${viewStruct.length}`);
  }
  const view = new DataView(values.buffer, viewStruct.byteOffset, BINARY_VIEW_SIZE);
  const size = view.getInt32(0, true);
  if (size <= 0) {
    return new Uint8Array(0);
  }
  if (size <= BINARY_VIEW_INLINE_CAPACITY) {
    return viewStruct.subarray(4, 4 + size);
  }
  const bufferIndex = view.getInt32(8, true);
  const offset = view.getInt32(12, true);
  const variadicBuffer = (_a5 = data.variadicBuffers) === null || _a5 === void 0 ? void 0 : _a5[bufferIndex];
  if (!variadicBuffer) {
    throw new Error(`BinaryView variadic buffer ${bufferIndex} is missing`);
  }
  return variadicBuffer.subarray(offset, offset + size);
};
var getBinaryViewValue = (data, index) => {
  return getBinaryViewBytes(data, index);
};
var getUtf8 = ({ values, valueOffsets }, index) => {
  const bytes = getVariableWidthBytes(values, valueOffsets, index);
  return bytes !== null ? decodeUtf8(bytes) : null;
};
var getUtf8ViewValue = (data, index) => {
  const bytes = getBinaryViewBytes(data, index);
  return decodeUtf8(bytes);
};
var getInt = ({ values }, index) => values[index];
var getFloat = ({ type, values }, index) => type.precision !== Precision.HALF ? values[index] : uint16ToFloat64(values[index]);
var getDate = (data, index) => data.type.unit === DateUnit.DAY ? getDateDay(data, index) : getDateMillisecond(data, index);
var getTimestampSecond = ({ values }, index) => 1e3 * bigIntToNumber(values[index]);
var getTimestampMillisecond = ({ values }, index) => bigIntToNumber(values[index]);
var getTimestampMicrosecond = ({ values }, index) => divideBigInts(values[index], BigInt(1e3));
var getTimestampNanosecond = ({ values }, index) => divideBigInts(values[index], BigInt(1e6));
var getTimestamp = (data, index) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return getTimestampSecond(data, index);
    case TimeUnit.MILLISECOND:
      return getTimestampMillisecond(data, index);
    case TimeUnit.MICROSECOND:
      return getTimestampMicrosecond(data, index);
    case TimeUnit.NANOSECOND:
      return getTimestampNanosecond(data, index);
  }
};
var getTimeSecond = ({ values }, index) => values[index];
var getTimeMillisecond = ({ values }, index) => values[index];
var getTimeMicrosecond = ({ values }, index) => values[index];
var getTimeNanosecond = ({ values }, index) => values[index];
var getTime = (data, index) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return getTimeSecond(data, index);
    case TimeUnit.MILLISECOND:
      return getTimeMillisecond(data, index);
    case TimeUnit.MICROSECOND:
      return getTimeMicrosecond(data, index);
    case TimeUnit.NANOSECOND:
      return getTimeNanosecond(data, index);
  }
};
var getDecimal = ({ values, stride }, index) => BN.decimal(values.subarray(stride * index, stride * (index + 1)));
var getList = (data, index) => {
  const { valueOffsets, stride, children } = data;
  const begin = bigIntToNumber(valueOffsets[index * stride]);
  const end = bigIntToNumber(valueOffsets[index * stride + 1]);
  const child = children[0];
  const slice = child.slice(begin, end - begin);
  return new Vector([slice]);
};
var getMap = (data, index) => {
  const { valueOffsets, children } = data;
  const { [index]: begin, [index + 1]: end } = valueOffsets;
  const child = children[0];
  return new MapRow(child.slice(begin, end - begin));
};
var getStruct = (data, index) => {
  return new StructRow(data, index);
};
var getUnion = (data, index) => {
  return data.type.mode === UnionMode.Dense ? getDenseUnion(data, index) : getSparseUnion(data, index);
};
var getDenseUnion = (data, index) => {
  const childIndex = data.type.typeIdToChildIndex[data.typeIds[index]];
  const child = data.children[childIndex];
  return instance2.visit(child, data.valueOffsets[index]);
};
var getSparseUnion = (data, index) => {
  const childIndex = data.type.typeIdToChildIndex[data.typeIds[index]];
  const child = data.children[childIndex];
  return instance2.visit(child, index);
};
var getDictionary = (data, index) => {
  var _a5;
  return (_a5 = data.dictionary) === null || _a5 === void 0 ? void 0 : _a5.get(data.values[index]);
};
var getInterval = (data, index) => data.type.unit === IntervalUnit.MONTH_DAY_NANO ? getIntervalMonthDayNano(data, index) : data.type.unit === IntervalUnit.DAY_TIME ? getIntervalDayTime(data, index) : getIntervalYearMonth(data, index);
var getIntervalDayTime = ({ values }, index) => values.subarray(2 * index, 2 * (index + 1));
var getIntervalYearMonth = ({ values }, index) => {
  const interval = values[index];
  const int32s = new Int32Array(2);
  int32s[0] = Math.trunc(interval / 12);
  int32s[1] = Math.trunc(interval % 12);
  return int32s;
};
var getIntervalMonthDayNano = ({ values }, index) => values.subarray(4 * index, 4 * (index + 1));
var getDurationSecond = ({ values }, index) => values[index];
var getDurationMillisecond = ({ values }, index) => values[index];
var getDurationMicrosecond = ({ values }, index) => values[index];
var getDurationNanosecond = ({ values }, index) => values[index];
var getDuration = (data, index) => {
  switch (data.type.unit) {
    case TimeUnit.SECOND:
      return getDurationSecond(data, index);
    case TimeUnit.MILLISECOND:
      return getDurationMillisecond(data, index);
    case TimeUnit.MICROSECOND:
      return getDurationMicrosecond(data, index);
    case TimeUnit.NANOSECOND:
      return getDurationNanosecond(data, index);
  }
};
var getFixedSizeList = (data, index) => {
  const { stride, children } = data;
  const child = children[0];
  const slice = child.slice(index * stride, stride);
  return new Vector([slice]);
};
GetVisitor.prototype.visitNull = wrapGet(getNull);
GetVisitor.prototype.visitBool = wrapGet(getBool);
GetVisitor.prototype.visitInt = wrapGet(getInt);
GetVisitor.prototype.visitInt8 = wrapGet(getNumeric);
GetVisitor.prototype.visitInt16 = wrapGet(getNumeric);
GetVisitor.prototype.visitInt32 = wrapGet(getNumeric);
GetVisitor.prototype.visitInt64 = wrapGet(getBigInts);
GetVisitor.prototype.visitUint8 = wrapGet(getNumeric);
GetVisitor.prototype.visitUint16 = wrapGet(getNumeric);
GetVisitor.prototype.visitUint32 = wrapGet(getNumeric);
GetVisitor.prototype.visitUint64 = wrapGet(getBigInts);
GetVisitor.prototype.visitFloat = wrapGet(getFloat);
GetVisitor.prototype.visitFloat16 = wrapGet(getFloat16);
GetVisitor.prototype.visitFloat32 = wrapGet(getNumeric);
GetVisitor.prototype.visitFloat64 = wrapGet(getNumeric);
GetVisitor.prototype.visitUtf8 = wrapGet(getUtf8);
GetVisitor.prototype.visitLargeUtf8 = wrapGet(getUtf8);
GetVisitor.prototype.visitUtf8View = wrapGet(getUtf8ViewValue);
GetVisitor.prototype.visitBinary = wrapGet(getBinary);
GetVisitor.prototype.visitLargeBinary = wrapGet(getBinary);
GetVisitor.prototype.visitBinaryView = wrapGet(getBinaryViewValue);
GetVisitor.prototype.visitFixedSizeBinary = wrapGet(getFixedSizeBinary);
GetVisitor.prototype.visitDate = wrapGet(getDate);
GetVisitor.prototype.visitDateDay = wrapGet(getDateDay);
GetVisitor.prototype.visitDateMillisecond = wrapGet(getDateMillisecond);
GetVisitor.prototype.visitTimestamp = wrapGet(getTimestamp);
GetVisitor.prototype.visitTimestampSecond = wrapGet(getTimestampSecond);
GetVisitor.prototype.visitTimestampMillisecond = wrapGet(getTimestampMillisecond);
GetVisitor.prototype.visitTimestampMicrosecond = wrapGet(getTimestampMicrosecond);
GetVisitor.prototype.visitTimestampNanosecond = wrapGet(getTimestampNanosecond);
GetVisitor.prototype.visitTime = wrapGet(getTime);
GetVisitor.prototype.visitTimeSecond = wrapGet(getTimeSecond);
GetVisitor.prototype.visitTimeMillisecond = wrapGet(getTimeMillisecond);
GetVisitor.prototype.visitTimeMicrosecond = wrapGet(getTimeMicrosecond);
GetVisitor.prototype.visitTimeNanosecond = wrapGet(getTimeNanosecond);
GetVisitor.prototype.visitDecimal = wrapGet(getDecimal);
GetVisitor.prototype.visitList = wrapGet(getList);
GetVisitor.prototype.visitLargeList = wrapGet(getList);
GetVisitor.prototype.visitStruct = wrapGet(getStruct);
GetVisitor.prototype.visitUnion = wrapGet(getUnion);
GetVisitor.prototype.visitDenseUnion = wrapGet(getDenseUnion);
GetVisitor.prototype.visitSparseUnion = wrapGet(getSparseUnion);
GetVisitor.prototype.visitDictionary = wrapGet(getDictionary);
GetVisitor.prototype.visitInterval = wrapGet(getInterval);
GetVisitor.prototype.visitIntervalDayTime = wrapGet(getIntervalDayTime);
GetVisitor.prototype.visitIntervalYearMonth = wrapGet(getIntervalYearMonth);
GetVisitor.prototype.visitIntervalMonthDayNano = wrapGet(getIntervalMonthDayNano);
GetVisitor.prototype.visitDuration = wrapGet(getDuration);
GetVisitor.prototype.visitDurationSecond = wrapGet(getDurationSecond);
GetVisitor.prototype.visitDurationMillisecond = wrapGet(getDurationMillisecond);
GetVisitor.prototype.visitDurationMicrosecond = wrapGet(getDurationMicrosecond);
GetVisitor.prototype.visitDurationNanosecond = wrapGet(getDurationNanosecond);
GetVisitor.prototype.visitFixedSizeList = wrapGet(getFixedSizeList);
GetVisitor.prototype.visitMap = wrapGet(getMap);
var instance2 = new GetVisitor();

// node_modules/apache-arrow/row/map.mjs
var kKeys = Symbol.for("keys");
var kVals = Symbol.for("vals");
var kKeysAsStrings = Symbol.for("kKeysAsStrings");
var _kKeysAsStrings = Symbol.for("_kKeysAsStrings");
var MapRow = class {
  constructor(slice) {
    this[kKeys] = new Vector([slice.children[0]]).memoize();
    this[kVals] = slice.children[1];
    return new Proxy(this, new MapRowProxyHandler());
  }
  /** @ignore */
  get [kKeysAsStrings]() {
    return this[_kKeysAsStrings] || (this[_kKeysAsStrings] = Array.from(this[kKeys].toArray(), String));
  }
  [Symbol.iterator]() {
    return new MapRowIterator(this[kKeys], this[kVals]);
  }
  get size() {
    return this[kKeys].length;
  }
  toArray() {
    return Object.values(this.toJSON());
  }
  toJSON() {
    const keys = this[kKeys];
    const vals = this[kVals];
    const json = {};
    for (let i = -1, n = keys.length; ++i < n; ) {
      json[keys.get(i)] = instance2.visit(vals, i);
    }
    return json;
  }
  toString() {
    return `{${[...this].map(([key, val]) => `${valueToString(key)}: ${valueToString(val)}`).join(", ")}}`;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.toString();
  }
};
var MapRowIterator = class {
  constructor(keys, vals) {
    this.keys = keys;
    this.vals = vals;
    this.keyIndex = 0;
    this.numKeys = keys.length;
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    const i = this.keyIndex;
    if (i === this.numKeys) {
      return { done: true, value: null };
    }
    this.keyIndex++;
    return {
      done: false,
      value: [
        this.keys.get(i),
        instance2.visit(this.vals, i)
      ]
    };
  }
};
var MapRowProxyHandler = class {
  isExtensible() {
    return false;
  }
  deleteProperty() {
    return false;
  }
  preventExtensions() {
    return true;
  }
  ownKeys(row) {
    return row[kKeysAsStrings];
  }
  has(row, key) {
    return row[kKeysAsStrings].includes(key);
  }
  getOwnPropertyDescriptor(row, key) {
    const idx = row[kKeysAsStrings].indexOf(key);
    if (idx !== -1) {
      return { writable: true, enumerable: true, configurable: true };
    }
    return;
  }
  get(row, key) {
    if (Reflect.has(row, key)) {
      return row[key];
    }
    const idx = row[kKeysAsStrings].indexOf(key);
    if (idx !== -1) {
      const val = instance2.visit(Reflect.get(row, kVals), idx);
      Reflect.set(row, key, val);
      return val;
    }
  }
  set(row, key, val) {
    const idx = row[kKeysAsStrings].indexOf(key);
    if (idx !== -1) {
      instance.visit(Reflect.get(row, kVals), idx, val);
      return Reflect.set(row, key, val);
    } else if (Reflect.has(row, key)) {
      return Reflect.set(row, key, val);
    }
    return false;
  }
};
Object.defineProperties(MapRow.prototype, {
  [Symbol.toStringTag]: { enumerable: false, configurable: false, value: "Row" },
  [kKeys]: { writable: true, enumerable: false, configurable: false, value: null },
  [kVals]: { writable: true, enumerable: false, configurable: false, value: null },
  [_kKeysAsStrings]: { writable: true, enumerable: false, configurable: false, value: null }
});

// node_modules/apache-arrow/util/vector.mjs
var tmp;
function clampRange(source, begin, end, then) {
  const { length: len = 0 } = source;
  let lhs = typeof begin !== "number" ? 0 : begin;
  let rhs = typeof end !== "number" ? len : end;
  lhs < 0 && (lhs = (lhs % len + len) % len);
  rhs < 0 && (rhs = (rhs % len + len) % len);
  rhs < lhs && (tmp = lhs, lhs = rhs, rhs = tmp);
  rhs > len && (rhs = len);
  return then ? then(source, lhs, rhs) : [lhs, rhs];
}
var wrapIndex = (index, len) => index < 0 ? len + index : index;
var isNaNFast = (value) => value !== value;
function createElementComparator(search) {
  const typeofSearch = typeof search;
  if (typeofSearch !== "object" || search === null) {
    if (isNaNFast(search)) {
      return isNaNFast;
    }
    return (value) => value === search;
  }
  if (search instanceof Date) {
    const valueOfSearch = search.valueOf();
    return (value) => value instanceof Date ? value.valueOf() === valueOfSearch : false;
  }
  if (ArrayBuffer.isView(search)) {
    return (value) => value ? compareArrayLike(search, value) : false;
  }
  if (search instanceof Map) {
    return createMapComparator(search);
  }
  if (Array.isArray(search)) {
    return createArrayLikeComparator(search);
  }
  if (search instanceof Vector) {
    return createVectorComparator(search);
  }
  return createObjectComparator(search, true);
}
function createArrayLikeComparator(lhs) {
  const comparators = [];
  for (let i = -1, n = lhs.length; ++i < n; ) {
    comparators[i] = createElementComparator(lhs[i]);
  }
  return createSubElementsComparator(comparators);
}
function createMapComparator(lhs) {
  let i = -1;
  const comparators = [];
  for (const v of lhs.values())
    comparators[++i] = createElementComparator(v);
  return createSubElementsComparator(comparators);
}
function createVectorComparator(lhs) {
  const comparators = [];
  for (let i = -1, n = lhs.length; ++i < n; ) {
    comparators[i] = createElementComparator(lhs.get(i));
  }
  return createSubElementsComparator(comparators);
}
function createObjectComparator(lhs, allowEmpty = false) {
  const keys = Object.keys(lhs);
  if (!allowEmpty && keys.length === 0) {
    return () => false;
  }
  const comparators = [];
  for (let i = -1, n = keys.length; ++i < n; ) {
    comparators[i] = createElementComparator(lhs[keys[i]]);
  }
  return createSubElementsComparator(comparators, keys);
}
function createSubElementsComparator(comparators, keys) {
  return (rhs) => {
    if (!rhs || typeof rhs !== "object") {
      return false;
    }
    switch (rhs.constructor) {
      case Array:
        return compareArray(comparators, rhs);
      case Map:
        return compareObject(comparators, rhs, rhs.keys());
      case MapRow:
      case StructRow:
      case Object:
      case void 0:
        return compareObject(comparators, rhs, keys || Object.keys(rhs));
    }
    return rhs instanceof Vector ? compareVector(comparators, rhs) : false;
  };
}
function compareArray(comparators, arr) {
  const n = comparators.length;
  if (arr.length !== n) {
    return false;
  }
  for (let i = -1; ++i < n; ) {
    if (!comparators[i](arr[i])) {
      return false;
    }
  }
  return true;
}
function compareVector(comparators, vec) {
  const n = comparators.length;
  if (vec.length !== n) {
    return false;
  }
  for (let i = -1; ++i < n; ) {
    if (!comparators[i](vec.get(i))) {
      return false;
    }
  }
  return true;
}
function compareObject(comparators, obj, keys) {
  const lKeyItr = keys[Symbol.iterator]();
  const rKeyItr = obj instanceof Map ? obj.keys() : Object.keys(obj)[Symbol.iterator]();
  const rValItr = obj instanceof Map ? obj.values() : Object.values(obj)[Symbol.iterator]();
  let i = 0;
  const n = comparators.length;
  let rVal = rValItr.next();
  let lKey = lKeyItr.next();
  let rKey = rKeyItr.next();
  for (; i < n && !lKey.done && !rKey.done && !rVal.done; ++i, lKey = lKeyItr.next(), rKey = rKeyItr.next(), rVal = rValItr.next()) {
    if (lKey.value !== rKey.value || !comparators[i](rVal.value)) {
      break;
    }
  }
  if (i === n && lKey.done && rKey.done && rVal.done) {
    return true;
  }
  lKeyItr.return && lKeyItr.return();
  rKeyItr.return && rKeyItr.return();
  rValItr.return && rValItr.return();
  return false;
}

// node_modules/apache-arrow/util/bit.mjs
var bit_exports = {};
__export(bit_exports, {
  BitIterator: () => BitIterator,
  getBit: () => getBit,
  getBool: () => getBool2,
  packBools: () => packBools,
  popcnt_array: () => popcnt_array,
  popcnt_bit_range: () => popcnt_bit_range,
  popcnt_uint32: () => popcnt_uint32,
  setBool: () => setBool2,
  truncateBitmap: () => truncateBitmap
});
function getBool2(_data, _index, byte, bit) {
  return (byte & 1 << bit) !== 0;
}
function getBit(_data, _index, byte, bit) {
  return (byte & 1 << bit) >> bit;
}
function setBool2(bytes, index, value) {
  return value ? !!(bytes[index >> 3] |= 1 << index % 8) || true : !(bytes[index >> 3] &= ~(1 << index % 8)) && false;
}
function truncateBitmap(offset, length, bitmap) {
  const alignedSize = bitmap.byteLength + 7 & ~7;
  if (offset > 0 || bitmap.byteLength < alignedSize) {
    const bytes = new Uint8Array(alignedSize);
    bytes.set(offset % 8 === 0 ? bitmap.subarray(offset >> 3) : (
      // Otherwise iterate each bit from the offset and return a new one
      packBools(new BitIterator(bitmap, offset, length, null, getBool2)).subarray(0, alignedSize)
    ));
    return bytes;
  }
  return bitmap;
}
function packBools(values) {
  const xs = [];
  let i = 0, bit = 0, byte = 0;
  for (const value of values) {
    value && (byte |= 1 << bit);
    if (++bit === 8) {
      xs[i++] = byte;
      byte = bit = 0;
    }
  }
  if (i === 0 || bit > 0) {
    xs[i++] = byte;
  }
  const b = new Uint8Array(xs.length + 7 & ~7);
  b.set(xs);
  return b;
}
var BitIterator = class {
  constructor(bytes, begin, length, context, get) {
    this.bytes = bytes;
    this.length = length;
    this.context = context;
    this.get = get;
    this.bit = begin % 8;
    this.byteIndex = begin >> 3;
    this.byte = bytes[this.byteIndex++];
    this.index = 0;
  }
  next() {
    if (this.index < this.length) {
      if (this.bit === 8) {
        this.bit = 0;
        this.byte = this.bytes[this.byteIndex++];
      }
      return {
        value: this.get(this.context, this.index++, this.byte, this.bit++)
      };
    }
    return { done: true, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
};
function popcnt_bit_range(data, lhs, rhs) {
  if (rhs - lhs <= 0) {
    return 0;
  }
  if (rhs - lhs < 8) {
    let sum = 0;
    for (const bit of new BitIterator(data, lhs, rhs - lhs, data, getBit)) {
      sum += bit;
    }
    return sum;
  }
  const rhsInside = rhs >> 3 << 3;
  const lhsInside = lhs + (lhs % 8 === 0 ? 0 : 8 - lhs % 8);
  return (
    // Get the popcnt of bits between the left hand side, and the next highest multiple of 8
    popcnt_bit_range(data, lhs, lhsInside) + // Get the popcnt of bits between the right hand side, and the next lowest multiple of 8
    popcnt_bit_range(data, rhsInside, rhs) + // Get the popcnt of all bits between the left and right hand sides' multiples of 8
    popcnt_array(data, lhsInside >> 3, rhsInside - lhsInside >> 3)
  );
}
function popcnt_array(arr, byteOffset, byteLength) {
  let cnt = 0, pos = Math.trunc(byteOffset);
  const view = new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  const len = byteLength === void 0 ? arr.byteLength : pos + byteLength;
  while (len - pos >= 4) {
    cnt += popcnt_uint32(view.getUint32(pos));
    pos += 4;
  }
  while (len - pos >= 2) {
    cnt += popcnt_uint32(view.getUint16(pos));
    pos += 2;
  }
  while (len - pos >= 1) {
    cnt += popcnt_uint32(view.getUint8(pos));
    pos += 1;
  }
  return cnt;
}
function popcnt_uint32(uint32) {
  let i = Math.trunc(uint32);
  i = i - (i >>> 1 & 1431655765);
  i = (i & 858993459) + (i >>> 2 & 858993459);
  return (i + (i >>> 4) & 252645135) * 16843009 >>> 24;
}

// node_modules/apache-arrow/data.mjs
var kUnknownNullCount = -1;
var kDataSymbol = Symbol.for("apache-arrow/Data");
var Data = class _Data {
  /**
   * Check if an object is an instance of Data.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isData(x) {
    return (x === null || x === void 0 ? void 0 : x[kDataSymbol]) === true;
  }
  get typeId() {
    return this.type.typeId;
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get buffers() {
    return [this.valueOffsets, this.values, this.nullBitmap, this.typeIds];
  }
  get nullable() {
    if (this._nullCount !== 0) {
      const { type } = this;
      if (DataType.isSparseUnion(type)) {
        return this.children.some((child) => child.nullable);
      } else if (DataType.isDenseUnion(type)) {
        return this.children.some((child) => child.nullable);
      }
      return this.nullBitmap && this.nullBitmap.byteLength > 0;
    }
    return true;
  }
  get byteLength() {
    let byteLength = 0;
    const { valueOffsets, values, nullBitmap, typeIds } = this;
    valueOffsets && (byteLength += valueOffsets.byteLength);
    values && (byteLength += values.byteLength);
    nullBitmap && (byteLength += nullBitmap.byteLength);
    typeIds && (byteLength += typeIds.byteLength);
    byteLength += this.variadicBuffers.reduce((size, data) => {
      var _a5;
      return size + ((_a5 = data === null || data === void 0 ? void 0 : data.byteLength) !== null && _a5 !== void 0 ? _a5 : 0);
    }, 0);
    return this.children.reduce((byteLength2, child) => byteLength2 + child.byteLength, byteLength);
  }
  get nullCount() {
    if (DataType.isUnion(this.type)) {
      return this.children.reduce((nullCount2, child) => nullCount2 + child.nullCount, 0);
    }
    let nullCount = this._nullCount;
    let nullBitmap;
    if (nullCount <= kUnknownNullCount && (nullBitmap = this.nullBitmap)) {
      this._nullCount = nullCount = nullBitmap.length === 0 ? (
        // no null bitmap, so all values are valid
        0
      ) : this.length - popcnt_bit_range(nullBitmap, this.offset, this.offset + this.length);
    }
    return nullCount;
  }
  constructor(type, offset, length, nullCount, buffers, children = [], dictionary, variadicBuffers = []) {
    var _a5;
    this.type = type;
    this.children = children;
    this.dictionary = dictionary;
    this.offset = Math.floor(Math.max(offset || 0, 0));
    this.length = Math.floor(Math.max(length || 0, 0));
    this._nullCount = Math.floor(Math.max(nullCount || 0, -1));
    let buffer;
    if (buffers instanceof _Data) {
      this.stride = buffers.stride;
      this.values = buffers.values;
      this.typeIds = buffers.typeIds;
      this.nullBitmap = buffers.nullBitmap;
      this.valueOffsets = buffers.valueOffsets;
      this.variadicBuffers = buffers.variadicBuffers;
    } else {
      this.stride = strideForType(type);
      if (buffers) {
        (buffer = buffers[0]) && (this.valueOffsets = buffer);
        (buffer = buffers[1]) && (this.values = buffer);
        (buffer = buffers[2]) && (this.nullBitmap = buffer);
        (buffer = buffers[3]) && (this.typeIds = buffer);
      }
      this.variadicBuffers = variadicBuffers;
    }
    (_a5 = this.variadicBuffers) !== null && _a5 !== void 0 ? _a5 : this.variadicBuffers = [];
  }
  getValid(index) {
    const { type } = this;
    if (DataType.isUnion(type)) {
      const union = type;
      const typeId = this.typeIds[index];
      const childIndex = union.typeIdToChildIndex[typeId];
      const child = this.children[childIndex];
      const valueOffsets = this.valueOffsets;
      const indexInChild = union.mode === UnionMode.Dense && valueOffsets ? Number(valueOffsets[index]) : index;
      return child.getValid(indexInChild);
    }
    if (this.nullable && this.nullCount > 0) {
      const pos = this.offset + index;
      const val = this.nullBitmap[pos >> 3];
      return (val & 1 << pos % 8) !== 0;
    }
    return true;
  }
  setValid(index, value) {
    let prev;
    const { type } = this;
    if (DataType.isUnion(type)) {
      const union = type;
      const typeId = this.typeIds[index];
      const childIndex = union.typeIdToChildIndex[typeId];
      const child = this.children[childIndex];
      const valueOffsets = this.valueOffsets;
      const indexInChild = union.mode === UnionMode.Dense && valueOffsets ? Number(valueOffsets[index]) : index;
      prev = child.getValid(indexInChild);
      child.setValid(indexInChild, value);
    } else {
      let { nullBitmap } = this;
      const { offset, length } = this;
      const idx = offset + index;
      const mask = 1 << idx % 8;
      const byteOffset = idx >> 3;
      if (!nullBitmap || nullBitmap.byteLength <= byteOffset) {
        nullBitmap = new Uint8Array((offset + length + 63 & ~63) >> 3).fill(255);
        if (this.nullCount > 0) {
          nullBitmap.set(truncateBitmap(offset, length, this.nullBitmap), 0);
          Object.assign(this, { nullBitmap });
        } else {
          Object.assign(this, { nullBitmap, _nullCount: 0 });
        }
      }
      const byte = nullBitmap[byteOffset];
      prev = (byte & mask) !== 0;
      nullBitmap[byteOffset] = value ? byte | mask : byte & ~mask;
    }
    if (prev !== !!value) {
      this._nullCount = this.nullCount + (value ? -1 : 1);
    }
    return value;
  }
  clone(type = this.type, offset = this.offset, length = this.length, nullCount = this._nullCount, buffers = this, children = this.children, variadicBuffers = this.variadicBuffers) {
    return new _Data(type, offset, length, nullCount, buffers, children, this.dictionary, variadicBuffers);
  }
  slice(offset, length) {
    const { stride, typeId, children } = this;
    const nullCount = +(this._nullCount === 0) - 1;
    const childStride = typeId === 16 ? stride : 1;
    const buffers = this._sliceBuffers(offset, length, stride, typeId);
    return this.clone(
      this.type,
      this.offset + offset,
      length,
      nullCount,
      buffers,
      // Don't slice children if we have value offsets (the variable-width types)
      children.length === 0 || this.valueOffsets ? children : this._sliceChildren(children, childStride * offset, childStride * length),
      this.variadicBuffers
    );
  }
  _changeLengthAndBackfillNullBitmap(newLength) {
    if (this.typeId === Type2.Null) {
      return this.clone(this.type, 0, newLength, 0, this.buffers, this.children, this.variadicBuffers);
    }
    const { length, nullCount } = this;
    const bitmap = new Uint8Array((newLength + 63 & ~63) >> 3).fill(255, 0, length >> 3);
    bitmap[length >> 3] = (1 << length - (length & ~7)) - 1;
    if (nullCount > 0) {
      bitmap.set(truncateBitmap(this.offset, length, this.nullBitmap), 0);
    }
    const buffers = this.buffers;
    buffers[BufferType.VALIDITY] = bitmap;
    return this.clone(this.type, 0, newLength, nullCount + (newLength - length), buffers, this.children, this.variadicBuffers);
  }
  _sliceBuffers(offset, length, stride, typeId) {
    let arr;
    const { buffers } = this;
    (arr = buffers[BufferType.TYPE]) && (buffers[BufferType.TYPE] = arr.subarray(offset, offset + length));
    if (DataType.isBinaryView(this.type) || DataType.isUtf8View(this.type)) {
      const width = BinaryView2.ELEMENT_WIDTH;
      (arr = buffers[BufferType.DATA]) && (buffers[BufferType.DATA] = arr.subarray(offset * width, (offset + length) * width));
    } else {
      (arr = buffers[BufferType.OFFSET]) && (buffers[BufferType.OFFSET] = arr.subarray(offset, offset + length + 1)) || // Otherwise if no offsets, slice the data buffer. Don't slice the data vector for Booleans, since the offset goes by bits not bytes
      (arr = buffers[BufferType.DATA]) && (buffers[BufferType.DATA] = typeId === 6 ? arr : arr.subarray(stride * offset, stride * (offset + length)));
    }
    return buffers;
  }
  _sliceChildren(children, offset, length) {
    return children.map((child) => child.slice(offset, length));
  }
};
Data.prototype.children = Object.freeze([]);
Data.prototype[kDataSymbol] = true;
Object.defineProperty(Data, Symbol.hasInstance, {
  value: function isDataInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === Data && Data.isData(instance8);
  }
});
var MakeDataVisitor = class _MakeDataVisitor extends Visitor {
  visit(props) {
    return this.getVisitFn(props["type"]).call(this, props);
  }
  visitNull(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["length"]: length = 0 } = props;
    return new Data(type, offset, length, length);
  }
  visitBool(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length >> 3, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitInt(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitFloat(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitUtf8(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const data = toUint8Array(props["data"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toInt32Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, data, nullBitmap]);
  }
  visitUtf8View(props) {
    var _a5;
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const views = toArrayBufferView(type.ArrayType, props["views"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const variadicBuffers = (props["variadicBuffers"] || []).map((buffer) => toUint8Array(buffer));
    const length = (_a5 = props["length"]) !== null && _a5 !== void 0 ? _a5 : Math.trunc(views.length / Utf8View2.ELEMENT_WIDTH);
    const nullCount = props["nullBitmap"] ? -1 : 0;
    return new Data(type, offset, length, nullCount, [void 0, views, nullBitmap], [], void 0, variadicBuffers);
  }
  visitLargeUtf8(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const data = toUint8Array(props["data"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toBigInt64Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, data, nullBitmap]);
  }
  visitBinary(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const data = toUint8Array(props["data"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toInt32Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, data, nullBitmap]);
  }
  visitBinaryView(props) {
    var _a5;
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const views = toArrayBufferView(type.ArrayType, props["views"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const variadicBuffers = (props["variadicBuffers"] || []).map((buffer) => toUint8Array(buffer));
    const length = (_a5 = props["length"]) !== null && _a5 !== void 0 ? _a5 : Math.trunc(views.length / BinaryView2.ELEMENT_WIDTH);
    const nullCount = props["nullBitmap"] ? -1 : 0;
    return new Data(type, offset, length, nullCount, [void 0, views, nullBitmap], [], void 0, variadicBuffers);
  }
  visitLargeBinary(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const data = toUint8Array(props["data"]);
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toBigInt64Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, data, nullBitmap]);
  }
  visitFixedSizeBinary(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitDate(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitTimestamp(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitTime(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitDecimal(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitList(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["child"]: child } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toInt32Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, void 0, nullBitmap], [child]);
  }
  visitLargeList(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["child"]: child } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toBigInt64Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, void 0, nullBitmap], [child]);
  }
  visitStruct(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["children"]: children = [] } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const { length = children.reduce((len, { length: length2 }) => Math.max(len, length2), 0), nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, void 0, nullBitmap], children);
  }
  visitUnion(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["children"]: children = [] } = props;
    const typeIds = toArrayBufferView(type.ArrayType, props["typeIds"]);
    const { ["length"]: length = typeIds.length, ["nullCount"]: nullCount = -1 } = props;
    if (DataType.isSparseUnion(type)) {
      return new Data(type, offset, length, nullCount, [void 0, void 0, void 0, typeIds], children);
    }
    const valueOffsets = toInt32Array(props["valueOffsets"]);
    return new Data(type, offset, length, nullCount, [valueOffsets, void 0, void 0, typeIds], children);
  }
  visitDictionary(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.indices.ArrayType, props["data"]);
    const { ["dictionary"]: dictionary = new Vector([new _MakeDataVisitor().visit({ type: type.dictionary })]) } = props;
    const { ["length"]: length = data.length, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap], [], dictionary);
  }
  visitInterval(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitDuration(props) {
    const { ["type"]: type, ["offset"]: offset = 0 } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const data = toArrayBufferView(type.ArrayType, props["data"]);
    const { ["length"]: length = data.length, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, data, nullBitmap]);
  }
  visitFixedSizeList(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["child"]: child = new _MakeDataVisitor().visit({ type: type.valueType }) } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const { ["length"]: length = child.length / strideForType(type), ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [void 0, void 0, nullBitmap], [child]);
  }
  visitMap(props) {
    const { ["type"]: type, ["offset"]: offset = 0, ["child"]: child = new _MakeDataVisitor().visit({ type: type.childType }) } = props;
    const nullBitmap = toUint8Array(props["nullBitmap"]);
    const valueOffsets = toInt32Array(props["valueOffsets"]);
    const { ["length"]: length = valueOffsets.length - 1, ["nullCount"]: nullCount = props["nullBitmap"] ? -1 : 0 } = props;
    return new Data(type, offset, length, nullCount, [valueOffsets, void 0, nullBitmap], [child]);
  }
};
var makeDataVisitor = new MakeDataVisitor();
function makeData(props) {
  return makeDataVisitor.visit(props);
}

// node_modules/apache-arrow/util/chunk.mjs
var ChunkedIterator = class {
  constructor(numChunks = 0, getChunkIterator) {
    this.numChunks = numChunks;
    this.getChunkIterator = getChunkIterator;
    this.chunkIndex = 0;
    this.chunkIterator = this.getChunkIterator(0);
  }
  next() {
    while (this.chunkIndex < this.numChunks) {
      const next = this.chunkIterator.next();
      if (!next.done) {
        return next;
      }
      if (++this.chunkIndex < this.numChunks) {
        this.chunkIterator = this.getChunkIterator(this.chunkIndex);
      }
    }
    return { done: true, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
};
function computeChunkNullable(chunks) {
  return chunks.some((chunk) => chunk.nullable);
}
function computeChunkNullCounts(chunks) {
  return chunks.reduce((nullCount, chunk) => nullCount + chunk.nullCount, 0);
}
function computeChunkOffsets(chunks) {
  return chunks.reduce((offsets, chunk, index) => {
    offsets[index + 1] = offsets[index] + chunk.length;
    return offsets;
  }, new Uint32Array(chunks.length + 1));
}
function sliceChunks(chunks, offsets, begin, end) {
  const slices = [];
  for (let i = -1, n = chunks.length; ++i < n; ) {
    const chunk = chunks[i];
    const offset = offsets[i];
    const { length } = chunk;
    if (offset >= end) {
      break;
    }
    if (begin >= offset + length) {
      continue;
    }
    if (offset >= begin && offset + length <= end) {
      slices.push(chunk);
      continue;
    }
    const from = Math.max(0, begin - offset);
    const to = Math.min(end - offset, length);
    slices.push(chunk.slice(from, to - from));
  }
  if (slices.length === 0) {
    slices.push(chunks[0].slice(0, 0));
  }
  return slices;
}
function binarySearch(chunks, offsets, idx, fn) {
  let lhs = 0, mid = 0, rhs = offsets.length - 1;
  do {
    if (lhs >= rhs - 1) {
      return idx < offsets[rhs] ? fn(chunks, lhs, idx - offsets[lhs]) : null;
    }
    mid = lhs + Math.trunc((rhs - lhs) * 0.5);
    idx < offsets[mid] ? rhs = mid : lhs = mid;
  } while (lhs < rhs);
}
function isChunkedValid(data, index) {
  return data.getValid(index);
}
function wrapChunkedCall1(fn) {
  function chunkedFn(chunks, i, j) {
    return fn(chunks[i], j);
  }
  return function(index) {
    const data = this.data;
    return binarySearch(data, this._offsets, index, chunkedFn);
  };
}
function wrapChunkedCall2(fn) {
  let _2;
  function chunkedFn(chunks, i, j) {
    return fn(chunks[i], j, _2);
  }
  return function(index, value) {
    const data = this.data;
    _2 = value;
    const result = binarySearch(data, this._offsets, index, chunkedFn);
    _2 = void 0;
    return result;
  };
}
function wrapChunkedIndexOf(indexOf) {
  let _1;
  function chunkedIndexOf(data, chunkIndex, fromIndex) {
    let begin = fromIndex, index = 0, total = 0;
    for (let i = chunkIndex - 1, n = data.length; ++i < n; ) {
      const chunk = data[i];
      if (~(index = indexOf(chunk, _1, begin))) {
        return total + index;
      }
      begin = 0;
      total += chunk.length;
    }
    return -1;
  }
  return function(element, offset) {
    _1 = element;
    const data = this.data;
    const result = typeof offset !== "number" ? chunkedIndexOf(data, 0, 0) : binarySearch(data, this._offsets, offset, chunkedIndexOf);
    _1 = void 0;
    return result;
  };
}

// node_modules/apache-arrow/visitor/indexof.mjs
var IndexOfVisitor = class extends Visitor {
};
function nullIndexOf(data, searchElement) {
  return searchElement === null && data.length > 0 ? 0 : -1;
}
function indexOfNull(data, fromIndex) {
  const { nullBitmap } = data;
  if (!nullBitmap || data.nullCount <= 0) {
    return -1;
  }
  let i = 0;
  for (const isValid of new BitIterator(nullBitmap, data.offset + (fromIndex || 0), data.length, nullBitmap, getBool2)) {
    if (!isValid) {
      return i;
    }
    ++i;
  }
  return -1;
}
function indexOfValue(data, searchElement, fromIndex) {
  if (searchElement === void 0) {
    return -1;
  }
  if (searchElement === null) {
    switch (data.typeId) {
      // Unions don't have a nullBitmap of its own, so compare the `searchElement` to `get()`.
      case Type2.Union:
        break;
      // Dictionaries do have a nullBitmap, but their dictionary could also have null elements.
      case Type2.Dictionary:
        break;
      // All other types can iterate the null bitmap
      default:
        return indexOfNull(data, fromIndex);
    }
  }
  const get = instance2.getVisitFn(data);
  const compare = createElementComparator(searchElement);
  for (let i = (fromIndex || 0) - 1, n = data.length; ++i < n; ) {
    if (compare(get(data, i))) {
      return i;
    }
  }
  return -1;
}
function indexOfUnion(data, searchElement, fromIndex) {
  const get = instance2.getVisitFn(data);
  const compare = createElementComparator(searchElement);
  for (let i = (fromIndex || 0) - 1, n = data.length; ++i < n; ) {
    if (compare(get(data, i))) {
      return i;
    }
  }
  return -1;
}
IndexOfVisitor.prototype.visitNull = nullIndexOf;
IndexOfVisitor.prototype.visitBool = indexOfValue;
IndexOfVisitor.prototype.visitInt = indexOfValue;
IndexOfVisitor.prototype.visitInt8 = indexOfValue;
IndexOfVisitor.prototype.visitInt16 = indexOfValue;
IndexOfVisitor.prototype.visitInt32 = indexOfValue;
IndexOfVisitor.prototype.visitInt64 = indexOfValue;
IndexOfVisitor.prototype.visitUint8 = indexOfValue;
IndexOfVisitor.prototype.visitUint16 = indexOfValue;
IndexOfVisitor.prototype.visitUint32 = indexOfValue;
IndexOfVisitor.prototype.visitUint64 = indexOfValue;
IndexOfVisitor.prototype.visitFloat = indexOfValue;
IndexOfVisitor.prototype.visitFloat16 = indexOfValue;
IndexOfVisitor.prototype.visitFloat32 = indexOfValue;
IndexOfVisitor.prototype.visitFloat64 = indexOfValue;
IndexOfVisitor.prototype.visitUtf8 = indexOfValue;
IndexOfVisitor.prototype.visitLargeUtf8 = indexOfValue;
IndexOfVisitor.prototype.visitUtf8View = indexOfValue;
IndexOfVisitor.prototype.visitBinary = indexOfValue;
IndexOfVisitor.prototype.visitLargeBinary = indexOfValue;
IndexOfVisitor.prototype.visitBinaryView = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeBinary = indexOfValue;
IndexOfVisitor.prototype.visitDate = indexOfValue;
IndexOfVisitor.prototype.visitDateDay = indexOfValue;
IndexOfVisitor.prototype.visitDateMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestamp = indexOfValue;
IndexOfVisitor.prototype.visitTimestampSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimestampNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitTime = indexOfValue;
IndexOfVisitor.prototype.visitTimeSecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitTimeNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitDecimal = indexOfValue;
IndexOfVisitor.prototype.visitList = indexOfValue;
IndexOfVisitor.prototype.visitLargeList = indexOfValue;
IndexOfVisitor.prototype.visitStruct = indexOfValue;
IndexOfVisitor.prototype.visitUnion = indexOfValue;
IndexOfVisitor.prototype.visitDenseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitSparseUnion = indexOfUnion;
IndexOfVisitor.prototype.visitDictionary = indexOfValue;
IndexOfVisitor.prototype.visitInterval = indexOfValue;
IndexOfVisitor.prototype.visitIntervalDayTime = indexOfValue;
IndexOfVisitor.prototype.visitIntervalYearMonth = indexOfValue;
IndexOfVisitor.prototype.visitIntervalMonthDayNano = indexOfValue;
IndexOfVisitor.prototype.visitDuration = indexOfValue;
IndexOfVisitor.prototype.visitDurationSecond = indexOfValue;
IndexOfVisitor.prototype.visitDurationMillisecond = indexOfValue;
IndexOfVisitor.prototype.visitDurationMicrosecond = indexOfValue;
IndexOfVisitor.prototype.visitDurationNanosecond = indexOfValue;
IndexOfVisitor.prototype.visitFixedSizeList = indexOfValue;
IndexOfVisitor.prototype.visitMap = indexOfValue;
var instance3 = new IndexOfVisitor();

// node_modules/apache-arrow/visitor/iterator.mjs
var IteratorVisitor = class extends Visitor {
};
function vectorIterator(vector) {
  const { type } = vector;
  if (vector.nullCount === 0 && vector.stride === 1 && // Don't defer to native iterator for timestamps since Numbers are expected
  // (DataType.isTimestamp(type)) && type.unit === TimeUnit.MILLISECOND ||
  (DataType.isInt(type) && type.bitWidth !== 64 || DataType.isTime(type) && type.bitWidth !== 64 || DataType.isFloat(type) && type.precision !== Precision.HALF)) {
    return new ChunkedIterator(vector.data.length, (chunkIndex) => {
      const data = vector.data[chunkIndex];
      return data.values.subarray(0, data.length)[Symbol.iterator]();
    });
  }
  let offset = 0;
  return new ChunkedIterator(vector.data.length, (chunkIndex) => {
    const data = vector.data[chunkIndex];
    const length = data.length;
    const inner = vector.slice(offset, offset + length);
    offset += length;
    return new VectorIterator(inner);
  });
}
var VectorIterator = class {
  constructor(vector) {
    this.vector = vector;
    this.index = 0;
  }
  next() {
    if (this.index < this.vector.length) {
      return {
        value: this.vector.get(this.index++)
      };
    }
    return { done: true, value: null };
  }
  [Symbol.iterator]() {
    return this;
  }
};
IteratorVisitor.prototype.visitNull = vectorIterator;
IteratorVisitor.prototype.visitBool = vectorIterator;
IteratorVisitor.prototype.visitInt = vectorIterator;
IteratorVisitor.prototype.visitInt8 = vectorIterator;
IteratorVisitor.prototype.visitInt16 = vectorIterator;
IteratorVisitor.prototype.visitInt32 = vectorIterator;
IteratorVisitor.prototype.visitInt64 = vectorIterator;
IteratorVisitor.prototype.visitUint8 = vectorIterator;
IteratorVisitor.prototype.visitUint16 = vectorIterator;
IteratorVisitor.prototype.visitUint32 = vectorIterator;
IteratorVisitor.prototype.visitUint64 = vectorIterator;
IteratorVisitor.prototype.visitFloat = vectorIterator;
IteratorVisitor.prototype.visitFloat16 = vectorIterator;
IteratorVisitor.prototype.visitFloat32 = vectorIterator;
IteratorVisitor.prototype.visitFloat64 = vectorIterator;
IteratorVisitor.prototype.visitUtf8 = vectorIterator;
IteratorVisitor.prototype.visitLargeUtf8 = vectorIterator;
IteratorVisitor.prototype.visitUtf8View = vectorIterator;
IteratorVisitor.prototype.visitBinary = vectorIterator;
IteratorVisitor.prototype.visitLargeBinary = vectorIterator;
IteratorVisitor.prototype.visitBinaryView = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeBinary = vectorIterator;
IteratorVisitor.prototype.visitDate = vectorIterator;
IteratorVisitor.prototype.visitDateDay = vectorIterator;
IteratorVisitor.prototype.visitDateMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestamp = vectorIterator;
IteratorVisitor.prototype.visitTimestampSecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimestampNanosecond = vectorIterator;
IteratorVisitor.prototype.visitTime = vectorIterator;
IteratorVisitor.prototype.visitTimeSecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMillisecond = vectorIterator;
IteratorVisitor.prototype.visitTimeMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitTimeNanosecond = vectorIterator;
IteratorVisitor.prototype.visitDecimal = vectorIterator;
IteratorVisitor.prototype.visitList = vectorIterator;
IteratorVisitor.prototype.visitLargeList = vectorIterator;
IteratorVisitor.prototype.visitStruct = vectorIterator;
IteratorVisitor.prototype.visitUnion = vectorIterator;
IteratorVisitor.prototype.visitDenseUnion = vectorIterator;
IteratorVisitor.prototype.visitSparseUnion = vectorIterator;
IteratorVisitor.prototype.visitDictionary = vectorIterator;
IteratorVisitor.prototype.visitInterval = vectorIterator;
IteratorVisitor.prototype.visitIntervalDayTime = vectorIterator;
IteratorVisitor.prototype.visitIntervalYearMonth = vectorIterator;
IteratorVisitor.prototype.visitIntervalMonthDayNano = vectorIterator;
IteratorVisitor.prototype.visitDuration = vectorIterator;
IteratorVisitor.prototype.visitDurationSecond = vectorIterator;
IteratorVisitor.prototype.visitDurationMillisecond = vectorIterator;
IteratorVisitor.prototype.visitDurationMicrosecond = vectorIterator;
IteratorVisitor.prototype.visitDurationNanosecond = vectorIterator;
IteratorVisitor.prototype.visitFixedSizeList = vectorIterator;
IteratorVisitor.prototype.visitMap = vectorIterator;
var instance4 = new IteratorVisitor();

// node_modules/apache-arrow/vector.mjs
var _a2;
var kVectorSymbol = Symbol.for("apache-arrow/Vector");
var visitorsByTypeId = {};
var vectorPrototypesByTypeId = {};
var Vector = class _Vector {
  /**
   * Check if an object is an instance of Vector.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isVector(x) {
    return (x === null || x === void 0 ? void 0 : x[kVectorSymbol]) === true;
  }
  constructor(input) {
    var _b2, _c2, _d2;
    const data = input[0] instanceof _Vector ? input.flatMap((x) => x.data) : input;
    if (data.length === 0 || data.some((x) => !(x instanceof Data))) {
      throw new TypeError("Vector constructor expects an Array of Data instances.");
    }
    const type = (_b2 = data[0]) === null || _b2 === void 0 ? void 0 : _b2.type;
    switch (data.length) {
      case 0:
        this._offsets = [0];
        break;
      case 1: {
        const { get, set, indexOf } = visitorsByTypeId[type.typeId];
        const unchunkedData = data[0];
        this.isValid = (index) => isChunkedValid(unchunkedData, index);
        this.get = (index) => get(unchunkedData, index);
        this.set = (index, value) => set(unchunkedData, index, value);
        this.indexOf = (index) => indexOf(unchunkedData, index);
        this._offsets = [0, unchunkedData.length];
        break;
      }
      default:
        Object.setPrototypeOf(this, vectorPrototypesByTypeId[type.typeId]);
        this._offsets = computeChunkOffsets(data);
        break;
    }
    this.data = data;
    this.type = type;
    this.stride = strideForType(type);
    this.numChildren = (_d2 = (_c2 = type.children) === null || _c2 === void 0 ? void 0 : _c2.length) !== null && _d2 !== void 0 ? _d2 : 0;
    this.length = this._offsets.at(-1);
  }
  /**
   * The aggregate size (in bytes) of this Vector's buffers and/or child Vectors.
   */
  get byteLength() {
    return this.data.reduce((byteLength, data) => byteLength + data.byteLength, 0);
  }
  /**
   * Whether this Vector's elements can contain null values.
   */
  get nullable() {
    return computeChunkNullable(this.data);
  }
  /**
   * The number of null elements in this Vector.
   */
  get nullCount() {
    return computeChunkNullCounts(this.data);
  }
  /**
   * The Array or TypedArray constructor used for the JS representation
   *  of the element's values in {@link Vector.prototype.toArray `toArray()`}.
   */
  get ArrayType() {
    return this.type.ArrayType;
  }
  /**
   * The name that should be printed when the Vector is logged in a message.
   */
  get [Symbol.toStringTag]() {
    return `${this.VectorName}<${this.type[Symbol.toStringTag]}>`;
  }
  /**
   * The name of this Vector.
   */
  get VectorName() {
    return `${Type2[this.type.typeId]}Vector`;
  }
  /**
   * Check whether an element is null.
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(index) {
    return false;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(index) {
    return null;
  }
  /**
   * Get an element value by position.
   * @param index The index of the element to read. A negative index will count back from the last element.
   */
  at(index) {
    return this.get(wrapIndex(index, this.length));
  }
  /**
   * Set an element value by position.
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(index, value) {
    return;
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(element, offset) {
    return -1;
  }
  includes(element, offset) {
    return this.indexOf(element, offset) > -1;
  }
  /**
   * Iterator for the Vector's elements.
   */
  [Symbol.iterator]() {
    return instance4.visit(this);
  }
  /**
   * Combines two or more Vectors of the same type.
   * @param others Additional Vectors to add to the end of this Vector.
   */
  concat(...others) {
    return new _Vector(this.data.concat(others.flatMap((x) => x.data).flat(Number.POSITIVE_INFINITY)));
  }
  /**
   * Return a zero-copy sub-section of this Vector.
   * @param start The beginning of the specified portion of the Vector.
   * @param end The end of the specified portion of the Vector. This is exclusive of the element at the index 'end'.
   */
  slice(begin, end) {
    return new _Vector(clampRange(this, begin, end, ({ data, _offsets }, begin2, end2) => sliceChunks(data, _offsets, begin2, end2)));
  }
  toJSON() {
    return [...this];
  }
  /**
   * Return a JavaScript Array or TypedArray of the Vector's elements.
   *
   * @note If this Vector contains a single Data chunk and the Vector's type is a
   *  primitive numeric type corresponding to one of the JavaScript TypedArrays, this
   *  method returns a zero-copy slice of the underlying TypedArray values. If there's
   *  more than one chunk, the resulting TypedArray will be a copy of the data from each
   *  chunk's underlying TypedArray values.
   *
   * @returns An Array or TypedArray of the Vector's elements, based on the Vector's DataType.
   */
  toArray() {
    const { type, data, length, stride, ArrayType } = this;
    switch (type.typeId) {
      case Type2.Int:
      case Type2.Float:
      case Type2.Decimal:
      case Type2.Time:
      case Type2.Timestamp:
        switch (data.length) {
          case 0:
            return new ArrayType();
          case 1:
            return data[0].values.subarray(0, length * stride);
          default:
            return data.reduce((memo, { values, length: chunk_length }) => {
              memo.array.set(values.subarray(0, chunk_length * stride), memo.offset);
              memo.offset += chunk_length * stride;
              return memo;
            }, { array: new ArrayType(length * stride), offset: 0 }).array;
        }
    }
    return [...this];
  }
  /**
   * Returns a string representation of the Vector.
   *
   * @returns A string representation of the Vector.
   */
  toString() {
    return `[${[...this].join(",")}]`;
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(name) {
    var _b2;
    return this.getChildAt((_b2 = this.type.children) === null || _b2 === void 0 ? void 0 : _b2.findIndex((f) => f.name === name));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(index) {
    if (index > -1 && index < this.numChildren) {
      return new _Vector(this.data.map(({ children }) => children[index]));
    }
    return null;
  }
  get isMemoized() {
    if (DataType.isDictionary(this.type)) {
      return this.data[0].dictionary.isMemoized;
    }
    return false;
  }
  /**
   * Adds memoization to the Vector's {@link get} method. For dictionary
   * vectors, this method return a vector that memoizes only the dictionary
   * values.
   *
   * Memoization is very useful when decoding a value is expensive such as
   * Utf8. The memoization creates a cache of the size of the Vector and
   * therefore increases memory usage.
   *
   * @returns A new vector that memoizes calls to {@link get}.
   */
  memoize() {
    if (DataType.isDictionary(this.type)) {
      const dictionary = new MemoizedVector(this.data[0].dictionary);
      const newData = this.data.map((data) => {
        const cloned = data.clone();
        cloned.dictionary = dictionary;
        return cloned;
      });
      return new _Vector(newData);
    }
    return new MemoizedVector(this);
  }
  /**
   * Returns a vector without memoization of the {@link get} method. If this
   * vector is not memoized, this method returns this vector.
   *
   * @returns A new vector without memoization.
   */
  unmemoize() {
    if (DataType.isDictionary(this.type) && this.isMemoized) {
      const dictionary = this.data[0].dictionary.unmemoize();
      const newData = this.data.map((data) => {
        const newData2 = data.clone();
        newData2.dictionary = dictionary;
        return newData2;
      });
      return new _Vector(newData);
    }
    return this;
  }
};
_a2 = Symbol.toStringTag;
Vector[_a2] = ((proto) => {
  proto.type = DataType.prototype;
  proto.data = [];
  proto.length = 0;
  proto.stride = 1;
  proto.numChildren = 0;
  proto._offsets = new Uint32Array([0]);
  proto[Symbol.isConcatSpreadable] = true;
  proto[kVectorSymbol] = true;
  const typeIds = Object.keys(Type2).map((T) => Type2[T]).filter((T) => typeof T === "number" && T !== Type2.NONE);
  for (const typeId of typeIds) {
    const get = instance2.getVisitFnByTypeId(typeId);
    const set = instance.getVisitFnByTypeId(typeId);
    const indexOf = instance3.getVisitFnByTypeId(typeId);
    visitorsByTypeId[typeId] = { get, set, indexOf };
    vectorPrototypesByTypeId[typeId] = Object.create(proto, {
      ["isValid"]: { value: wrapChunkedCall1(isChunkedValid) },
      ["get"]: { value: wrapChunkedCall1(instance2.getVisitFnByTypeId(typeId)) },
      ["set"]: { value: wrapChunkedCall2(instance.getVisitFnByTypeId(typeId)) },
      ["indexOf"]: { value: wrapChunkedIndexOf(instance3.getVisitFnByTypeId(typeId)) }
    });
  }
  return "Vector";
})(Vector.prototype);
Object.defineProperty(Vector, Symbol.hasInstance, {
  value: function isVectorInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === Vector && Vector.isVector(instance8);
  }
});
var MemoizedVector = class _MemoizedVector extends Vector {
  constructor(vector) {
    super(vector.data);
    const get = this.get;
    const set = this.set;
    const slice = this.slice;
    const cache = new Array(this.length);
    Object.defineProperty(this, "get", {
      value(index) {
        const cachedValue = cache[index];
        if (cachedValue !== void 0) {
          return cachedValue;
        }
        const value = get.call(this, index);
        cache[index] = value;
        return value;
      }
    });
    Object.defineProperty(this, "set", {
      value(index, value) {
        set.call(this, index, value);
        cache[index] = value;
      }
    });
    Object.defineProperty(this, "slice", {
      value: (begin, end) => new _MemoizedVector(slice.call(this, begin, end))
    });
    Object.defineProperty(this, "isMemoized", { value: true });
    Object.defineProperty(this, "unmemoize", {
      value: () => new Vector(this.data)
    });
    Object.defineProperty(this, "memoize", {
      value: () => this
    });
  }
};

// node_modules/apache-arrow/builder/valid.mjs
function createIsValidFunction(nullValues) {
  if (!nullValues || nullValues.length <= 0) {
    return function isValid(value) {
      return true;
    };
  }
  let fnBody = "";
  const noNaNs = nullValues.filter((x) => x === x);
  if (noNaNs.length > 0) {
    fnBody = `
    switch (x) {${noNaNs.map((x) => `
        case ${valueToCase(x)}:`).join("")}
            return false;
    }`;
  }
  if (nullValues.length !== noNaNs.length) {
    fnBody = `if (x !== x) return false;
${fnBody}`;
  }
  return new Function(`x`, `${fnBody}
return true;`);
}
function valueToCase(x) {
  if (typeof x !== "bigint") {
    return valueToString(x);
  }
  return `${valueToString(x)}n`;
}

// node_modules/apache-arrow/builder/buffer.mjs
function roundLengthUpToNearest64Bytes(len, BPE) {
  const bytesMinus1 = Math.ceil(len) * BPE - 1;
  return (bytesMinus1 - bytesMinus1 % 64 + 64 || 64) / BPE;
}
function resizeArray(arr, len = 0) {
  return arr.length >= len ? arr.subarray(0, len) : memcpy(new arr.constructor(len), arr, 0);
}
var BufferBuilder = class {
  constructor(bufferType, initialSize = 0, stride = 1) {
    this.length = Math.ceil(initialSize / stride);
    this.buffer = new bufferType(this.length);
    this.stride = stride;
    this.BYTES_PER_ELEMENT = bufferType.BYTES_PER_ELEMENT;
    this.ArrayType = bufferType;
  }
  get byteLength() {
    return Math.ceil(this.length * this.stride) * this.BYTES_PER_ELEMENT;
  }
  get reservedLength() {
    return this.buffer.length / this.stride;
  }
  get reservedByteLength() {
    return this.buffer.byteLength;
  }
  // @ts-ignore
  set(index, value) {
    return this;
  }
  append(value) {
    return this.set(this.length, value);
  }
  reserve(extra) {
    if (extra > 0) {
      this.length += extra;
      const stride = this.stride;
      const length = this.length * stride;
      const reserved = this.buffer.length;
      if (length >= reserved) {
        this._resize(reserved === 0 ? roundLengthUpToNearest64Bytes(length * 1, this.BYTES_PER_ELEMENT) : roundLengthUpToNearest64Bytes(length * 2, this.BYTES_PER_ELEMENT));
      }
    }
    return this;
  }
  flush(length = this.length) {
    length = roundLengthUpToNearest64Bytes(length * this.stride, this.BYTES_PER_ELEMENT);
    const array = resizeArray(this.buffer, length);
    this.clear();
    return array;
  }
  clear() {
    this.length = 0;
    this.buffer = new this.ArrayType();
    return this;
  }
  _resize(newLength) {
    return this.buffer = resizeArray(this.buffer, newLength);
  }
};
var DataBufferBuilder = class extends BufferBuilder {
  last() {
    return this.get(this.length - 1);
  }
  get(index) {
    return this.buffer[index];
  }
  set(index, value) {
    this.reserve(index - this.length + 1);
    this.buffer[index * this.stride] = value;
    return this;
  }
};
var BitmapBufferBuilder = class extends DataBufferBuilder {
  constructor() {
    super(Uint8Array, 0, 1 / 8);
    this.numValid = 0;
  }
  get numInvalid() {
    return this.length - this.numValid;
  }
  get(idx) {
    return this.buffer[idx >> 3] >> idx % 8 & 1;
  }
  set(idx, val) {
    const { buffer } = this.reserve(idx - this.length + 1);
    const byte = idx >> 3, bit = idx % 8, cur = buffer[byte] >> bit & 1;
    val ? cur === 0 && (buffer[byte] |= 1 << bit, ++this.numValid) : cur === 1 && (buffer[byte] &= ~(1 << bit), --this.numValid);
    return this;
  }
  clear() {
    this.numValid = 0;
    return super.clear();
  }
};
var OffsetsBufferBuilder = class extends DataBufferBuilder {
  constructor(type) {
    super(type.OffsetArrayType, 1, 1);
  }
  append(value) {
    return this.set(this.length - 1, value);
  }
  set(index, value) {
    const offset = this.length - 1;
    const buffer = this.reserve(index - offset + 1).buffer;
    if (offset < index++ && offset >= 0) {
      buffer.fill(buffer[offset], offset, index);
    }
    buffer[index] = buffer[index - 1] + value;
    return this;
  }
  flush(length = this.length - 1) {
    if (length > this.length) {
      this.set(length - 1, this.BYTES_PER_ELEMENT > 4 ? BigInt(0) : 0);
    }
    return super.flush(length + 1);
  }
};

// node_modules/apache-arrow/builder.mjs
var Builder = class {
  /** @nocollapse */
  // @ts-ignore
  static throughNode(options) {
    throw new Error(`"throughNode" not available in this environment`);
  }
  /** @nocollapse */
  // @ts-ignore
  static throughDOM(options) {
    throw new Error(`"throughDOM" not available in this environment`);
  }
  /**
   * Construct a builder with the given Arrow DataType with optional null values,
   * which will be interpreted as "null" when set or appended to the `Builder`.
   * @param {{ type: T, nullValues?: any[] }} options A `BuilderOptions` object used to create this `Builder`.
   */
  constructor({ "type": type, "nullValues": nulls }) {
    this.length = 0;
    this.finished = false;
    this.type = type;
    this.children = [];
    this.nullValues = nulls;
    this.stride = strideForType(type);
    this._nulls = new BitmapBufferBuilder();
    if (nulls && nulls.length > 0) {
      this._isValid = createIsValidFunction(nulls);
    }
  }
  /**
   * Flush the `Builder` and return a `Vector<T>`.
   * @returns {Vector<T>} A `Vector<T>` of the flushed values.
   */
  toVector() {
    return new Vector([this.flush()]);
  }
  get ArrayType() {
    return this.type.ArrayType;
  }
  get nullCount() {
    return this._nulls.numInvalid;
  }
  get numChildren() {
    return this.children.length;
  }
  /**
   * @returns The aggregate length (in bytes) of the values that have been written.
   */
  get byteLength() {
    let size = 0;
    const { _offsets, _values, _nulls, _typeIds, children } = this;
    _offsets && (size += _offsets.byteLength);
    _values && (size += _values.byteLength);
    _nulls && (size += _nulls.byteLength);
    _typeIds && (size += _typeIds.byteLength);
    return children.reduce((size2, child) => size2 + child.byteLength, size);
  }
  /**
   * @returns The aggregate number of rows that have been reserved to write new values.
   */
  get reservedLength() {
    return this._nulls.reservedLength;
  }
  /**
   * @returns The aggregate length (in bytes) that has been reserved to write new values.
   */
  get reservedByteLength() {
    let size = 0;
    this._offsets && (size += this._offsets.reservedByteLength);
    this._values && (size += this._values.reservedByteLength);
    this._nulls && (size += this._nulls.reservedByteLength);
    this._typeIds && (size += this._typeIds.reservedByteLength);
    return this.children.reduce((size2, child) => size2 + child.reservedByteLength, size);
  }
  get valueOffsets() {
    return this._offsets ? this._offsets.buffer : null;
  }
  get values() {
    return this._values ? this._values.buffer : null;
  }
  get nullBitmap() {
    return this._nulls ? this._nulls.buffer : null;
  }
  get typeIds() {
    return this._typeIds ? this._typeIds.buffer : null;
  }
  /**
   * Appends a value (or null) to this `Builder`.
   * This is equivalent to `builder.set(builder.length, value)`.
   * @param {T['TValue'] | TNull } value The value to append.
   */
  append(value) {
    return this.set(this.length, value);
  }
  /**
   * Validates whether a value is valid (true), or null (false)
   * @param {T['TValue'] | TNull } value The value to compare against null the value representations
   */
  isValid(value) {
    return this._isValid(value);
  }
  /**
   * Write a value (or null-value sentinel) at the supplied index.
   * If the value matches one of the null-value representations, a 1-bit is
   * written to the null `BitmapBufferBuilder`. Otherwise, a 0 is written to
   * the null `BitmapBufferBuilder`, and the value is passed to
   * `Builder.prototype.setValue()`.
   * @param {number} index The index of the value to write.
   * @param {T['TValue'] | TNull } value The value to write at the supplied index.
   * @returns {this} The updated `Builder` instance.
   */
  set(index, value) {
    if (this.setValid(index, this.isValid(value))) {
      this.setValue(index, value);
    }
    return this;
  }
  /**
   * Write a value to the underlying buffers at the supplied index, bypassing
   * the null-value check. This is a low-level method that
   * @param {number} index
   * @param {T['TValue'] | TNull } value
   */
  setValue(index, value) {
    this._setValue(this, index, value);
  }
  setValid(index, valid) {
    this.length = this._nulls.set(index, +valid).length;
    return valid;
  }
  // @ts-ignore
  addChild(child, name = `${this.numChildren}`) {
    throw new Error(`Cannot append children to non-nested type "${this.type}"`);
  }
  /**
   * Retrieve the child `Builder` at the supplied `index`, or null if no child
   * exists at that index.
   * @param {number} index The index of the child `Builder` to retrieve.
   * @returns {Builder | null} The child Builder at the supplied index or null.
   */
  getChildAt(index) {
    return this.children[index] || null;
  }
  /**
   * Commit all the values that have been written to their underlying
   * ArrayBuffers, including any child Builders if applicable, and reset
   * the internal `Builder` state.
   * @returns A `Data<T>` of the buffers and children representing the values written.
   */
  flush() {
    let data;
    let typeIds;
    let nullBitmap;
    let valueOffsets;
    const { type, length, nullCount, _typeIds, _offsets, _values, _nulls } = this;
    if (typeIds = _typeIds === null || _typeIds === void 0 ? void 0 : _typeIds.flush(length)) {
      valueOffsets = _offsets === null || _offsets === void 0 ? void 0 : _offsets.flush(length);
    } else if (valueOffsets = _offsets === null || _offsets === void 0 ? void 0 : _offsets.flush(length)) {
      data = _values === null || _values === void 0 ? void 0 : _values.flush(_offsets.last());
    } else {
      data = _values === null || _values === void 0 ? void 0 : _values.flush(length);
    }
    if (nullCount > 0) {
      nullBitmap = _nulls === null || _nulls === void 0 ? void 0 : _nulls.flush(length);
    }
    const children = this.children.map((child) => child.flush());
    this.clear();
    return makeData({
      type,
      length,
      nullCount,
      children,
      "child": children[0],
      data,
      typeIds,
      nullBitmap,
      valueOffsets
    });
  }
  /**
   * Finalize this `Builder`, and child builders if applicable.
   * @returns {this} The finalized `Builder` instance.
   */
  finish() {
    this.finished = true;
    for (const child of this.children)
      child.finish();
    return this;
  }
  /**
   * Clear this Builder's internal state, including child Builders if applicable, and reset the length to 0.
   * @returns {this} The cleared `Builder` instance.
   */
  clear() {
    var _a5, _b2, _c2, _d2;
    this.length = 0;
    (_a5 = this._nulls) === null || _a5 === void 0 ? void 0 : _a5.clear();
    (_b2 = this._values) === null || _b2 === void 0 ? void 0 : _b2.clear();
    (_c2 = this._offsets) === null || _c2 === void 0 ? void 0 : _c2.clear();
    (_d2 = this._typeIds) === null || _d2 === void 0 ? void 0 : _d2.clear();
    for (const child of this.children)
      child.clear();
    return this;
  }
};
Builder.prototype.length = 1;
Builder.prototype.stride = 1;
Builder.prototype.children = null;
Builder.prototype.finished = false;
Builder.prototype.nullValues = null;
Builder.prototype._isValid = () => true;
var FixedWidthBuilder = class extends Builder {
  constructor(opts) {
    super(opts);
    this._values = new DataBufferBuilder(this.ArrayType, 0, this.stride);
  }
  setValue(index, value) {
    const values = this._values;
    values.reserve(index - values.length + 1);
    return super.setValue(index, value);
  }
};
var VariableWidthBuilder = class extends Builder {
  constructor(opts) {
    super(opts);
    this._pendingLength = 0;
    this._offsets = new OffsetsBufferBuilder(opts.type);
  }
  setValue(index, value) {
    const pending = this._pending || (this._pending = /* @__PURE__ */ new Map());
    const current = pending.get(index);
    current && (this._pendingLength -= current.length);
    this._pendingLength += value instanceof MapRow ? value[kKeys].length : value.length;
    pending.set(index, value);
  }
  setValid(index, isValid) {
    if (!super.setValid(index, isValid)) {
      (this._pending || (this._pending = /* @__PURE__ */ new Map())).set(index, void 0);
      return false;
    }
    return true;
  }
  clear() {
    this._pendingLength = 0;
    this._pending = void 0;
    return super.clear();
  }
  flush() {
    this._flush();
    return super.flush();
  }
  finish() {
    this._flush();
    return super.finish();
  }
  _flush() {
    const pending = this._pending;
    const pendingLength = this._pendingLength;
    this._pendingLength = 0;
    this._pending = void 0;
    if (pending && pending.size > 0) {
      this._flushPending(pending, pendingLength);
    }
    return this;
  }
};

// node_modules/apache-arrow/fb/block.mjs
var Block = class {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  /**
   * Index to the start of the RecordBlock (note this is past the Message header)
   */
  offset() {
    return this.bb.readInt64(this.bb_pos);
  }
  /**
   * Length of the metadata
   */
  metaDataLength() {
    return this.bb.readInt32(this.bb_pos + 8);
  }
  /**
   * Length of the data (this is aligned so there can be a gap between this and
   * the metadata).
   */
  bodyLength() {
    return this.bb.readInt64(this.bb_pos + 16);
  }
  static sizeOf() {
    return 24;
  }
  static createBlock(builder, offset, metaDataLength, bodyLength) {
    builder.prep(8, 24);
    builder.writeInt64(BigInt(bodyLength !== null && bodyLength !== void 0 ? bodyLength : 0));
    builder.pad(4);
    builder.writeInt32(metaDataLength);
    builder.writeInt64(BigInt(offset !== null && offset !== void 0 ? offset : 0));
    return builder.offset();
  }
};

// node_modules/apache-arrow/fb/footer.mjs
var flatbuffers31 = __toESM(require_flatbuffers(), 1);
var Footer = class _Footer {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsFooter(bb, obj) {
    return (obj || new _Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsFooter(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers31.SIZE_PREFIX_LENGTH);
    return (obj || new _Footer()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  version() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : MetadataVersion.V1;
  }
  schema(obj) {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? (obj || new Schema2()).__init(this.bb.__indirect(this.bb_pos + offset), this.bb) : null;
  }
  dictionaries(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? (obj || new Block()).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
  }
  dictionariesLength() {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  recordBatches(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? (obj || new Block()).__init(this.bb.__vector(this.bb_pos + offset) + index * 24, this.bb) : null;
  }
  recordBatchesLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  /**
   * User-defined metadata
   */
  customMetadata(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  customMetadataLength() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startFooter(builder) {
    builder.startObject(5);
  }
  static addVersion(builder, version) {
    builder.addFieldInt16(0, version, MetadataVersion.V1);
  }
  static addSchema(builder, schemaOffset) {
    builder.addFieldOffset(1, schemaOffset, 0);
  }
  static addDictionaries(builder, dictionariesOffset) {
    builder.addFieldOffset(2, dictionariesOffset, 0);
  }
  static startDictionariesVector(builder, numElems) {
    builder.startVector(24, numElems, 8);
  }
  static addRecordBatches(builder, recordBatchesOffset) {
    builder.addFieldOffset(3, recordBatchesOffset, 0);
  }
  static startRecordBatchesVector(builder, numElems) {
    builder.startVector(24, numElems, 8);
  }
  static addCustomMetadata(builder, customMetadataOffset) {
    builder.addFieldOffset(4, customMetadataOffset, 0);
  }
  static createCustomMetadataVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startCustomMetadataVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endFooter(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishFooterBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedFooterBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
};

// node_modules/apache-arrow/ipc/metadata/file.mjs
var flatbuffers32 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/schema.mjs
var kSchemaSymbol = Symbol.for("apache-arrow/Schema");
var kFieldSymbol = Symbol.for("apache-arrow/Field");
var Schema3 = class _Schema {
  /**
   * Check if an object is an instance of Schema.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isSchema(x) {
    return (x === null || x === void 0 ? void 0 : x[kSchemaSymbol]) === true;
  }
  constructor(fields = [], metadata, dictionaries, metadataVersion = MetadataVersion.V5) {
    this.fields = fields || [];
    this.metadata = metadata || /* @__PURE__ */ new Map();
    if (!dictionaries) {
      dictionaries = generateDictionaryMap(this.fields);
    }
    this.dictionaries = dictionaries;
    this.metadataVersion = metadataVersion;
  }
  get [Symbol.toStringTag]() {
    return "Schema";
  }
  get names() {
    return this.fields.map((f) => f.name);
  }
  toString() {
    return `Schema<{ ${this.fields.map((f, i) => `${i}: ${f}`).join(", ")} }>`;
  }
  /**
   * Construct a new Schema containing only specified fields.
   *
   * @param fieldNames Names of fields to keep.
   * @returns A new Schema of fields matching the specified names.
   */
  select(fieldNames) {
    const names = new Set(fieldNames);
    const fields = this.fields.filter((f) => names.has(f.name));
    return new _Schema(fields, this.metadata);
  }
  /**
   * Construct a new Schema containing only fields at the specified indices.
   *
   * @param fieldIndices Indices of fields to keep.
   * @returns A new Schema of fields at the specified indices.
   */
  selectAt(fieldIndices) {
    const fields = fieldIndices.map((i) => this.fields[i]).filter(Boolean);
    return new _Schema(fields, this.metadata);
  }
  assign(...args) {
    const other = args[0] instanceof _Schema ? args[0] : Array.isArray(args[0]) ? new _Schema(args[0]) : new _Schema(args);
    const curFields = [...this.fields];
    const metadata = mergeMaps(mergeMaps(/* @__PURE__ */ new Map(), this.metadata), other.metadata);
    const newFields = other.fields.filter((f2) => {
      const i = curFields.findIndex((f) => f.name === f2.name);
      return ~i ? (curFields[i] = f2.clone({
        metadata: mergeMaps(mergeMaps(/* @__PURE__ */ new Map(), curFields[i].metadata), f2.metadata)
      })) && false : true;
    });
    const newDictionaries = generateDictionaryMap(newFields, /* @__PURE__ */ new Map());
    return new _Schema([...curFields, ...newFields], metadata, new Map([...this.dictionaries, ...newDictionaries]));
  }
};
Schema3.prototype.fields = null;
Schema3.prototype.metadata = null;
Schema3.prototype.dictionaries = null;
Schema3.prototype[kSchemaSymbol] = true;
Object.defineProperty(Schema3, Symbol.hasInstance, {
  value: function isSchemaInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === Schema3 && Schema3.isSchema(instance8);
  }
});
var Field2 = class _Field {
  /**
   * Check if an object is an instance of Field.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isField(x) {
    return (x === null || x === void 0 ? void 0 : x[kFieldSymbol]) === true;
  }
  /** @nocollapse */
  static new(...args) {
    let [name, type, nullable, metadata] = args;
    if (args[0] && typeof args[0] === "object") {
      ({ name } = args[0]);
      type === void 0 && (type = args[0].type);
      nullable === void 0 && (nullable = args[0].nullable);
      metadata === void 0 && (metadata = args[0].metadata);
    }
    return new _Field(`${name}`, type, nullable, metadata);
  }
  constructor(name, type, nullable = false, metadata) {
    this.name = name;
    this.type = type;
    this.nullable = nullable;
    this.metadata = metadata || /* @__PURE__ */ new Map();
  }
  get typeId() {
    return this.type.typeId;
  }
  get [Symbol.toStringTag]() {
    return "Field";
  }
  toString() {
    return `${this.name}: ${this.type}`;
  }
  clone(...args) {
    let [name, type, nullable, metadata] = args;
    !args[0] || typeof args[0] !== "object" ? [name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata] = args : { name = this.name, type = this.type, nullable = this.nullable, metadata = this.metadata } = args[0];
    return _Field.new(name, type, nullable, metadata);
  }
};
Field2.prototype.type = null;
Field2.prototype.name = null;
Field2.prototype.nullable = null;
Field2.prototype.metadata = null;
Field2.prototype[kFieldSymbol] = true;
Object.defineProperty(Field2, Symbol.hasInstance, {
  value: function isFieldInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === Field2 && Field2.isField(instance8);
  }
});
function mergeMaps(m1, m2) {
  return new Map([...m1 || /* @__PURE__ */ new Map(), ...m2 || /* @__PURE__ */ new Map()]);
}
function generateDictionaryMap(fields, dictionaries = /* @__PURE__ */ new Map()) {
  for (let i = -1, n = fields.length; ++i < n; ) {
    const field = fields[i];
    const type = field.type;
    if (DataType.isDictionary(type)) {
      if (!dictionaries.has(type.id)) {
        dictionaries.set(type.id, type.dictionary);
      } else if (dictionaries.get(type.id) !== type.dictionary) {
        throw new Error(`Cannot create Schema containing two different dictionaries with the same Id`);
      }
    }
    if (type.children && type.children.length > 0) {
      generateDictionaryMap(type.children, dictionaries);
    }
  }
  return dictionaries;
}

// node_modules/apache-arrow/ipc/metadata/file.mjs
var Builder3 = flatbuffers32.Builder;
var ByteBuffer2 = flatbuffers32.ByteBuffer;
var Footer_ = class {
  /** @nocollapse */
  static decode(buf) {
    buf = new ByteBuffer2(toUint8Array(buf));
    const footer = Footer.getRootAsFooter(buf);
    const schema = Schema3.decode(footer.schema(), /* @__PURE__ */ new Map(), footer.version());
    return new OffHeapFooter(schema, footer);
  }
  /** @nocollapse */
  static encode(footer) {
    const b = new Builder3();
    const schemaOffset = Schema3.encode(b, footer.schema);
    Footer.startRecordBatchesVector(b, footer.numRecordBatches);
    for (const rb of [...footer.recordBatches()].slice().reverse()) {
      FileBlock.encode(b, rb);
    }
    const recordBatchesOffset = b.endVector();
    Footer.startDictionariesVector(b, footer.numDictionaries);
    for (const db of [...footer.dictionaryBatches()].slice().reverse()) {
      FileBlock.encode(b, db);
    }
    const dictionaryBatchesOffset = b.endVector();
    Footer.startFooter(b);
    Footer.addSchema(b, schemaOffset);
    Footer.addVersion(b, MetadataVersion.V5);
    Footer.addRecordBatches(b, recordBatchesOffset);
    Footer.addDictionaries(b, dictionaryBatchesOffset);
    Footer.finishFooterBuffer(b, Footer.endFooter(b));
    return b.asUint8Array();
  }
  get numRecordBatches() {
    return this._recordBatches.length;
  }
  get numDictionaries() {
    return this._dictionaryBatches.length;
  }
  constructor(schema, version = MetadataVersion.V5, recordBatches, dictionaryBatches) {
    this.schema = schema;
    this.version = version;
    recordBatches && (this._recordBatches = recordBatches);
    dictionaryBatches && (this._dictionaryBatches = dictionaryBatches);
  }
  *recordBatches() {
    for (let block, i = -1, n = this.numRecordBatches; ++i < n; ) {
      if (block = this.getRecordBatch(i)) {
        yield block;
      }
    }
  }
  *dictionaryBatches() {
    for (let block, i = -1, n = this.numDictionaries; ++i < n; ) {
      if (block = this.getDictionaryBatch(i)) {
        yield block;
      }
    }
  }
  getRecordBatch(index) {
    return index >= 0 && index < this.numRecordBatches && this._recordBatches[index] || null;
  }
  getDictionaryBatch(index) {
    return index >= 0 && index < this.numDictionaries && this._dictionaryBatches[index] || null;
  }
};
var OffHeapFooter = class extends Footer_ {
  get numRecordBatches() {
    return this._footer.recordBatchesLength();
  }
  get numDictionaries() {
    return this._footer.dictionariesLength();
  }
  constructor(schema, _footer) {
    super(schema, _footer.version());
    this._footer = _footer;
  }
  getRecordBatch(index) {
    if (index >= 0 && index < this.numRecordBatches) {
      const fileBlock = this._footer.recordBatches(index);
      if (fileBlock) {
        return FileBlock.decode(fileBlock);
      }
    }
    return null;
  }
  getDictionaryBatch(index) {
    if (index >= 0 && index < this.numDictionaries) {
      const fileBlock = this._footer.dictionaries(index);
      if (fileBlock) {
        return FileBlock.decode(fileBlock);
      }
    }
    return null;
  }
};
var FileBlock = class _FileBlock {
  /** @nocollapse */
  static decode(block) {
    return new _FileBlock(block.metaDataLength(), block.bodyLength(), block.offset());
  }
  /** @nocollapse */
  static encode(b, fileBlock) {
    const { metaDataLength } = fileBlock;
    const offset = BigInt(fileBlock.offset);
    const bodyLength = BigInt(fileBlock.bodyLength);
    return Block.createBlock(b, offset, metaDataLength, bodyLength);
  }
  constructor(metaDataLength, bodyLength, offset) {
    this.metaDataLength = metaDataLength;
    this.offset = bigIntToNumber(offset);
    this.bodyLength = bigIntToNumber(bodyLength);
  }
};

// node_modules/apache-arrow/ipc/metadata/message.mjs
var flatbuffers34 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/fb/message.mjs
var flatbuffers33 = __toESM(require_flatbuffers(), 1);
var Message = class _Message {
  constructor() {
    this.bb = null;
    this.bb_pos = 0;
  }
  __init(i, bb) {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }
  static getRootAsMessage(bb, obj) {
    return (obj || new _Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  static getSizePrefixedRootAsMessage(bb, obj) {
    bb.setPosition(bb.position() + flatbuffers33.SIZE_PREFIX_LENGTH);
    return (obj || new _Message()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }
  version() {
    const offset = this.bb.__offset(this.bb_pos, 4);
    return offset ? this.bb.readInt16(this.bb_pos + offset) : MetadataVersion.V1;
  }
  headerType() {
    const offset = this.bb.__offset(this.bb_pos, 6);
    return offset ? this.bb.readUint8(this.bb_pos + offset) : MessageHeader.NONE;
  }
  header(obj) {
    const offset = this.bb.__offset(this.bb_pos, 8);
    return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
  }
  bodyLength() {
    const offset = this.bb.__offset(this.bb_pos, 10);
    return offset ? this.bb.readInt64(this.bb_pos + offset) : BigInt("0");
  }
  customMetadata(index, obj) {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? (obj || new KeyValue()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
  }
  customMetadataLength() {
    const offset = this.bb.__offset(this.bb_pos, 12);
    return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
  }
  static startMessage(builder) {
    builder.startObject(5);
  }
  static addVersion(builder, version) {
    builder.addFieldInt16(0, version, MetadataVersion.V1);
  }
  static addHeaderType(builder, headerType) {
    builder.addFieldInt8(1, headerType, MessageHeader.NONE);
  }
  static addHeader(builder, headerOffset) {
    builder.addFieldOffset(2, headerOffset, 0);
  }
  static addBodyLength(builder, bodyLength) {
    builder.addFieldInt64(3, bodyLength, BigInt("0"));
  }
  static addCustomMetadata(builder, customMetadataOffset) {
    builder.addFieldOffset(4, customMetadataOffset, 0);
  }
  static createCustomMetadataVector(builder, data) {
    builder.startVector(4, data.length, 4);
    for (let i = data.length - 1; i >= 0; i--) {
      builder.addOffset(data[i]);
    }
    return builder.endVector();
  }
  static startCustomMetadataVector(builder, numElems) {
    builder.startVector(4, numElems, 4);
  }
  static endMessage(builder) {
    const offset = builder.endObject();
    return offset;
  }
  static finishMessageBuffer(builder, offset) {
    builder.finish(offset);
  }
  static finishSizePrefixedMessageBuffer(builder, offset) {
    builder.finish(offset, void 0, true);
  }
  static createMessage(builder, version, headerType, headerOffset, bodyLength, customMetadataOffset) {
    _Message.startMessage(builder);
    _Message.addVersion(builder, version);
    _Message.addHeaderType(builder, headerType);
    _Message.addHeader(builder, headerOffset);
    _Message.addBodyLength(builder, bodyLength);
    _Message.addCustomMetadata(builder, customMetadataOffset);
    return _Message.endMessage(builder);
  }
};

// node_modules/apache-arrow/visitor/typeassembler.mjs
var TypeAssembler = class extends Visitor {
  visit(node, builder) {
    return node == null || builder == null ? void 0 : super.visit(node, builder);
  }
  visitNull(_node, b) {
    Null.startNull(b);
    return Null.endNull(b);
  }
  visitInt(node, b) {
    Int.startInt(b);
    Int.addBitWidth(b, node.bitWidth);
    Int.addIsSigned(b, node.isSigned);
    return Int.endInt(b);
  }
  visitFloat(node, b) {
    FloatingPoint.startFloatingPoint(b);
    FloatingPoint.addPrecision(b, node.precision);
    return FloatingPoint.endFloatingPoint(b);
  }
  visitBinary(_node, b) {
    Binary.startBinary(b);
    return Binary.endBinary(b);
  }
  visitBinaryView(_node, b) {
    BinaryView.startBinaryView(b);
    return BinaryView.endBinaryView(b);
  }
  visitLargeBinary(_node, b) {
    LargeBinary.startLargeBinary(b);
    return LargeBinary.endLargeBinary(b);
  }
  visitBool(_node, b) {
    Bool.startBool(b);
    return Bool.endBool(b);
  }
  visitUtf8(_node, b) {
    Utf8.startUtf8(b);
    return Utf8.endUtf8(b);
  }
  visitUtf8View(_node, b) {
    Utf8View.startUtf8View(b);
    return Utf8View.endUtf8View(b);
  }
  visitLargeUtf8(_node, b) {
    LargeUtf8.startLargeUtf8(b);
    return LargeUtf8.endLargeUtf8(b);
  }
  visitDecimal(node, b) {
    Decimal.startDecimal(b);
    Decimal.addScale(b, node.scale);
    Decimal.addPrecision(b, node.precision);
    Decimal.addBitWidth(b, node.bitWidth);
    return Decimal.endDecimal(b);
  }
  visitDate(node, b) {
    Date2.startDate(b);
    Date2.addUnit(b, node.unit);
    return Date2.endDate(b);
  }
  visitTime(node, b) {
    Time.startTime(b);
    Time.addUnit(b, node.unit);
    Time.addBitWidth(b, node.bitWidth);
    return Time.endTime(b);
  }
  visitTimestamp(node, b) {
    const timezone = node.timezone && b.createString(node.timezone) || void 0;
    Timestamp.startTimestamp(b);
    Timestamp.addUnit(b, node.unit);
    if (timezone !== void 0) {
      Timestamp.addTimezone(b, timezone);
    }
    return Timestamp.endTimestamp(b);
  }
  visitInterval(node, b) {
    Interval.startInterval(b);
    Interval.addUnit(b, node.unit);
    return Interval.endInterval(b);
  }
  visitDuration(node, b) {
    Duration.startDuration(b);
    Duration.addUnit(b, node.unit);
    return Duration.endDuration(b);
  }
  visitList(_node, b) {
    List.startList(b);
    return List.endList(b);
  }
  visitLargeList(_node, b) {
    LargeList.startLargeList(b);
    return LargeList.endLargeList(b);
  }
  visitStruct(_node, b) {
    Struct_.startStruct_(b);
    return Struct_.endStruct_(b);
  }
  visitUnion(node, b) {
    Union.startTypeIdsVector(b, node.typeIds.length);
    const typeIds = Union.createTypeIdsVector(b, node.typeIds);
    Union.startUnion(b);
    Union.addMode(b, node.mode);
    Union.addTypeIds(b, typeIds);
    return Union.endUnion(b);
  }
  visitDictionary(node, b) {
    const indexType = this.visit(node.indices, b);
    DictionaryEncoding.startDictionaryEncoding(b);
    DictionaryEncoding.addId(b, BigInt(node.id));
    DictionaryEncoding.addIsOrdered(b, node.isOrdered);
    if (indexType !== void 0) {
      DictionaryEncoding.addIndexType(b, indexType);
    }
    return DictionaryEncoding.endDictionaryEncoding(b);
  }
  visitFixedSizeBinary(node, b) {
    FixedSizeBinary.startFixedSizeBinary(b);
    FixedSizeBinary.addByteWidth(b, node.byteWidth);
    return FixedSizeBinary.endFixedSizeBinary(b);
  }
  visitFixedSizeList(node, b) {
    FixedSizeList.startFixedSizeList(b);
    FixedSizeList.addListSize(b, node.listSize);
    return FixedSizeList.endFixedSizeList(b);
  }
  visitMap(node, b) {
    Map2.startMap(b);
    Map2.addKeysSorted(b, node.keysSorted);
    return Map2.endMap(b);
  }
};
var instance5 = new TypeAssembler();

// node_modules/apache-arrow/ipc/metadata/json.mjs
function schemaFromJSON(_schema, dictionaries = /* @__PURE__ */ new Map()) {
  return new Schema3(schemaFieldsFromJSON(_schema, dictionaries), customMetadataFromJSON(_schema["metadata"]), dictionaries);
}
function recordBatchFromJSON(b) {
  return new RecordBatch3(b["count"], fieldNodesFromJSON(b["columns"]), buffersFromJSON(b["columns"]), null, variadicBufferCountsFromJSON(b["columns"]));
}
function dictionaryBatchFromJSON(b) {
  return new DictionaryBatch2(recordBatchFromJSON(b["data"]), b["id"], b["isDelta"]);
}
function schemaFieldsFromJSON(_schema, dictionaries) {
  return (_schema["fields"] || []).filter(Boolean).map((f) => Field2.fromJSON(f, dictionaries));
}
function fieldChildrenFromJSON(_field, dictionaries) {
  return (_field["children"] || []).filter(Boolean).map((f) => Field2.fromJSON(f, dictionaries));
}
function fieldNodesFromJSON(xs) {
  return (xs || []).reduce((fieldNodes, column) => [
    ...fieldNodes,
    new FieldNode2(column["count"], nullCountFromJSON(column["VALIDITY"])),
    ...fieldNodesFromJSON(column["children"])
  ], []);
}
function buffersFromJSON(xs, buffers = []) {
  for (let i = -1, n = (xs || []).length; ++i < n; ) {
    const column = xs[i];
    column["VALIDITY"] && buffers.push(new BufferRegion(buffers.length, column["VALIDITY"].length));
    column["TYPE_ID"] && buffers.push(new BufferRegion(buffers.length, column["TYPE_ID"].length));
    column["OFFSET"] && buffers.push(new BufferRegion(buffers.length, column["OFFSET"].length));
    column["DATA"] && buffers.push(new BufferRegion(buffers.length, column["DATA"].length));
    column["VIEWS"] && buffers.push(new BufferRegion(buffers.length, column["VIEWS"].length));
    if (column["VARIADIC_DATA_BUFFERS"]) {
      for (const buf of column["VARIADIC_DATA_BUFFERS"]) {
        buffers.push(new BufferRegion(buffers.length, buf.length));
      }
    }
    buffers = buffersFromJSON(column["children"], buffers);
  }
  return buffers;
}
function nullCountFromJSON(validity) {
  return (validity || []).reduce((sum, val) => sum + +(val === 0), 0);
}
function variadicBufferCountsFromJSON(xs) {
  return (xs || []).reduce((counts, column) => [
    ...counts,
    ...column["VARIADIC_DATA_BUFFERS"] ? [column["VARIADIC_DATA_BUFFERS"].length] : [],
    ...variadicBufferCountsFromJSON(column["children"])
  ], []);
}
function fieldFromJSON(_field, dictionaries) {
  let id;
  let keys;
  let field;
  let dictMeta;
  let type;
  let dictType;
  if (!dictionaries || !(dictMeta = _field["dictionary"])) {
    type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries));
    field = new Field2(_field["name"], type, _field["nullable"], customMetadataFromJSON(_field["metadata"]));
  } else if (!dictionaries.has(id = dictMeta["id"])) {
    keys = (keys = dictMeta["indexType"]) ? indexTypeFromJSON(keys) : new Int32();
    dictionaries.set(id, type = typeFromJSON(_field, fieldChildrenFromJSON(_field, dictionaries)));
    dictType = new Dictionary(type, keys, id, dictMeta["isOrdered"]);
    field = new Field2(_field["name"], dictType, _field["nullable"], customMetadataFromJSON(_field["metadata"]));
  } else {
    keys = (keys = dictMeta["indexType"]) ? indexTypeFromJSON(keys) : new Int32();
    dictType = new Dictionary(dictionaries.get(id), keys, id, dictMeta["isOrdered"]);
    field = new Field2(_field["name"], dictType, _field["nullable"], customMetadataFromJSON(_field["metadata"]));
  }
  return field || null;
}
function customMetadataFromJSON(metadata = []) {
  return new Map(metadata.map(({ key, value }) => [key, value]));
}
function indexTypeFromJSON(_type) {
  return new Int_(_type["isSigned"], _type["bitWidth"]);
}
function typeFromJSON(f, children) {
  const typeId = f["type"]["name"];
  switch (typeId) {
    case "NONE":
      return new Null2();
    case "null":
      return new Null2();
    case "binary":
      return new Binary2();
    case "largebinary":
      return new LargeBinary2();
    case "binaryview":
      return new BinaryView2();
    case "utf8":
      return new Utf82();
    case "largeutf8":
      return new LargeUtf82();
    case "utf8view":
      return new Utf8View2();
    case "bool":
      return new Bool2();
    case "list":
      return new List2((children || [])[0]);
    case "largelist":
      return new LargeList2((children || [])[0]);
    case "struct":
      return new Struct(children || []);
    case "struct_":
      return new Struct(children || []);
  }
  switch (typeId) {
    case "int": {
      const t = f["type"];
      return new Int_(t["isSigned"], t["bitWidth"]);
    }
    case "floatingpoint": {
      const t = f["type"];
      return new Float(Precision[t["precision"]]);
    }
    case "decimal": {
      const t = f["type"];
      return new Decimal2(t["scale"], t["precision"], t["bitWidth"]);
    }
    case "date": {
      const t = f["type"];
      return new Date_(DateUnit[t["unit"]]);
    }
    case "time": {
      const t = f["type"];
      return new Time_(TimeUnit[t["unit"]], t["bitWidth"]);
    }
    case "timestamp": {
      const t = f["type"];
      return new Timestamp_(TimeUnit[t["unit"]], t["timezone"]);
    }
    case "interval": {
      const t = f["type"];
      return new Interval_(IntervalUnit[t["unit"]]);
    }
    case "duration": {
      const t = f["type"];
      return new Duration2(TimeUnit[t["unit"]]);
    }
    case "union": {
      const t = f["type"];
      const [m, ...ms] = (t["mode"] + "").toLowerCase();
      const mode = m.toUpperCase() + ms.join("");
      return new Union_(UnionMode[mode], t["typeIds"] || [], children || []);
    }
    case "fixedsizebinary": {
      const t = f["type"];
      return new FixedSizeBinary2(t["byteWidth"]);
    }
    case "fixedsizelist": {
      const t = f["type"];
      return new FixedSizeList2(t["listSize"], (children || [])[0]);
    }
    case "map": {
      const t = f["type"];
      return new Map_((children || [])[0], t["keysSorted"]);
    }
  }
  throw new Error(`Unrecognized type: "${typeId}"`);
}

// node_modules/apache-arrow/ipc/metadata/message.mjs
var Builder5 = flatbuffers34.Builder;
var ByteBuffer4 = flatbuffers34.ByteBuffer;
var Message2 = class _Message {
  /** @nocollapse */
  static fromJSON(msg, headerType) {
    const message = new _Message(0, MetadataVersion.V5, headerType);
    message._createHeader = messageHeaderFromJSON(msg, headerType);
    return message;
  }
  /** @nocollapse */
  static decode(buf) {
    buf = new ByteBuffer4(toUint8Array(buf));
    const _message = Message.getRootAsMessage(buf);
    const bodyLength = _message.bodyLength();
    const version = _message.version();
    const headerType = _message.headerType();
    const metadata = decodeMessageCustomMetadata(_message);
    const message = new _Message(bodyLength, version, headerType, void 0, metadata);
    message._createHeader = decodeMessageHeader(_message, headerType);
    return message;
  }
  /** @nocollapse */
  static encode(message) {
    const b = new Builder5();
    let headerOffset = -1;
    if (message.isSchema()) {
      headerOffset = Schema3.encode(b, message.header());
    } else if (message.isRecordBatch()) {
      headerOffset = RecordBatch3.encode(b, message.header());
    } else if (message.isDictionaryBatch()) {
      headerOffset = DictionaryBatch2.encode(b, message.header());
    }
    const customMetadataOffset = !(message.metadata && message.metadata.size > 0) ? -1 : Message.createCustomMetadataVector(b, [...message.metadata].map(([k, v]) => {
      const key = b.createString(`${k}`);
      const val = b.createString(`${v}`);
      KeyValue.startKeyValue(b);
      KeyValue.addKey(b, key);
      KeyValue.addValue(b, val);
      return KeyValue.endKeyValue(b);
    }));
    Message.startMessage(b);
    Message.addVersion(b, MetadataVersion.V5);
    Message.addHeader(b, headerOffset);
    Message.addHeaderType(b, message.headerType);
    Message.addBodyLength(b, BigInt(message.bodyLength));
    if (customMetadataOffset !== -1) {
      Message.addCustomMetadata(b, customMetadataOffset);
    }
    Message.finishMessageBuffer(b, Message.endMessage(b));
    return b.asUint8Array();
  }
  /** @nocollapse */
  static from(header, bodyLength = 0) {
    if (header instanceof Schema3) {
      return new _Message(0, MetadataVersion.V5, MessageHeader.Schema, header);
    }
    if (header instanceof RecordBatch3) {
      return new _Message(bodyLength, MetadataVersion.V5, MessageHeader.RecordBatch, header, header.metadata);
    }
    if (header instanceof DictionaryBatch2) {
      return new _Message(bodyLength, MetadataVersion.V5, MessageHeader.DictionaryBatch, header);
    }
    throw new Error(`Unrecognized Message header: ${header}`);
  }
  get type() {
    return this.headerType;
  }
  get version() {
    return this._version;
  }
  get headerType() {
    return this._headerType;
  }
  get compression() {
    return this._compression;
  }
  get bodyLength() {
    return this._bodyLength;
  }
  get metadata() {
    return this._metadata;
  }
  header() {
    return this._createHeader();
  }
  isSchema() {
    return this.headerType === MessageHeader.Schema;
  }
  isRecordBatch() {
    return this.headerType === MessageHeader.RecordBatch;
  }
  isDictionaryBatch() {
    return this.headerType === MessageHeader.DictionaryBatch;
  }
  constructor(bodyLength, version, headerType, header, metadata) {
    this._version = version;
    this._headerType = headerType;
    this.body = new Uint8Array(0);
    this._compression = header === null || header === void 0 ? void 0 : header.compression;
    header && (this._createHeader = () => header);
    this._bodyLength = bigIntToNumber(bodyLength);
    this._metadata = metadata || /* @__PURE__ */ new Map();
  }
};
var RecordBatch3 = class {
  get nodes() {
    return this._nodes;
  }
  get length() {
    return this._length;
  }
  get buffers() {
    return this._buffers;
  }
  get compression() {
    return this._compression;
  }
  get variadicBufferCounts() {
    return this._variadicBufferCounts;
  }
  get metadata() {
    return this._metadata;
  }
  constructor(length, nodes, buffers, compression, variadicBufferCounts = [], metadata) {
    this._nodes = nodes;
    this._buffers = buffers;
    this._length = bigIntToNumber(length);
    this._compression = compression;
    this._variadicBufferCounts = variadicBufferCounts;
    this._metadata = metadata || /* @__PURE__ */ new Map();
  }
};
var DictionaryBatch2 = class {
  get id() {
    return this._id;
  }
  get data() {
    return this._data;
  }
  get isDelta() {
    return this._isDelta;
  }
  get length() {
    return this.data.length;
  }
  get nodes() {
    return this.data.nodes;
  }
  get buffers() {
    return this.data.buffers;
  }
  constructor(data, id, isDelta = false) {
    this._data = data;
    this._isDelta = isDelta;
    this._id = bigIntToNumber(id);
  }
};
var BufferRegion = class {
  constructor(offset, length) {
    this.offset = bigIntToNumber(offset);
    this.length = bigIntToNumber(length);
  }
};
var FieldNode2 = class {
  constructor(length, nullCount) {
    this.length = bigIntToNumber(length);
    this.nullCount = bigIntToNumber(nullCount);
  }
};
var BodyCompression2 = class {
  constructor(type, method = BodyCompressionMethod.BUFFER) {
    this.type = type;
    this.method = method;
  }
};
function messageHeaderFromJSON(message, type) {
  return (() => {
    switch (type) {
      case MessageHeader.Schema:
        return Schema3.fromJSON(message);
      case MessageHeader.RecordBatch:
        return RecordBatch3.fromJSON(message);
      case MessageHeader.DictionaryBatch:
        return DictionaryBatch2.fromJSON(message);
    }
    throw new Error(`Unrecognized Message type: { name: ${MessageHeader[type]}, type: ${type} }`);
  });
}
function decodeMessageHeader(message, type) {
  return (() => {
    switch (type) {
      case MessageHeader.Schema:
        return Schema3.decode(message.header(new Schema2()), /* @__PURE__ */ new Map(), message.version());
      case MessageHeader.RecordBatch:
        return RecordBatch3.decode(message.header(new RecordBatch2()), message.version());
      case MessageHeader.DictionaryBatch:
        return DictionaryBatch2.decode(message.header(new DictionaryBatch()), message.version());
    }
    throw new Error(`Unrecognized Message type: { name: ${MessageHeader[type]}, type: ${type} }`);
  });
}
Field2["encode"] = encodeField;
Field2["decode"] = decodeField;
Field2["fromJSON"] = fieldFromJSON;
Schema3["encode"] = encodeSchema;
Schema3["decode"] = decodeSchema;
Schema3["fromJSON"] = schemaFromJSON;
RecordBatch3["encode"] = encodeRecordBatch;
RecordBatch3["decode"] = decodeRecordBatch;
RecordBatch3["fromJSON"] = recordBatchFromJSON;
DictionaryBatch2["encode"] = encodeDictionaryBatch;
DictionaryBatch2["decode"] = decodeDictionaryBatch;
DictionaryBatch2["fromJSON"] = dictionaryBatchFromJSON;
FieldNode2["encode"] = encodeFieldNode;
FieldNode2["decode"] = decodeFieldNode;
BufferRegion["encode"] = encodeBufferRegion;
BufferRegion["decode"] = decodeBufferRegion;
BodyCompression2["encode"] = encodeBodyCompression;
BodyCompression2["decode"] = decodeBodyCompression;
function decodeSchema(_schema, dictionaries = /* @__PURE__ */ new Map(), version = MetadataVersion.V5) {
  const fields = decodeSchemaFields(_schema, dictionaries);
  return new Schema3(fields, decodeCustomMetadata(_schema), dictionaries, version);
}
function decodeRecordBatch(batch, version = MetadataVersion.V5) {
  const recordBatch = new RecordBatch3(batch.length(), decodeFieldNodes(batch), decodeBuffers(batch, version), decodeBodyCompression(batch.compression()), decodeVariadicBufferCounts(batch));
  return recordBatch;
}
function decodeDictionaryBatch(batch, version = MetadataVersion.V5) {
  return new DictionaryBatch2(RecordBatch3.decode(batch.data(), version), batch.id(), batch.isDelta());
}
function decodeBufferRegion(b) {
  return new BufferRegion(b.offset(), b.length());
}
function decodeFieldNode(f) {
  return new FieldNode2(f.length(), f.nullCount());
}
function decodeFieldNodes(batch) {
  const nodes = [];
  for (let f, i = -1, j = -1, n = batch.nodesLength(); ++i < n; ) {
    if (f = batch.nodes(i)) {
      nodes[++j] = FieldNode2.decode(f);
    }
  }
  return nodes;
}
function decodeBuffers(batch, version) {
  const bufferRegions = [];
  for (let b, i = -1, j = -1, n = batch.buffersLength(); ++i < n; ) {
    if (b = batch.buffers(i)) {
      if (version < MetadataVersion.V4) {
        b.bb_pos += 8 * (i + 1);
      }
      bufferRegions[++j] = BufferRegion.decode(b);
    }
  }
  return bufferRegions;
}
function decodeVariadicBufferCounts(batch) {
  const counts = [];
  const length = Math.trunc(batch.variadicBufferCountsLength());
  for (let i = 0; i < length; ++i) {
    counts.push(bigIntToNumber(batch.variadicBufferCounts(i)));
  }
  return counts;
}
function decodeSchemaFields(schema, dictionaries) {
  const fields = [];
  for (let f, i = -1, j = -1, n = schema.fieldsLength(); ++i < n; ) {
    if (f = schema.fields(i)) {
      fields[++j] = Field2.decode(f, dictionaries);
    }
  }
  return fields;
}
function decodeFieldChildren(field, dictionaries) {
  const children = [];
  for (let f, i = -1, j = -1, n = field.childrenLength(); ++i < n; ) {
    if (f = field.children(i)) {
      children[++j] = Field2.decode(f, dictionaries);
    }
  }
  return children;
}
function decodeField(f, dictionaries) {
  let id;
  let field;
  let type;
  let keys;
  let dictType;
  let dictMeta;
  if (!dictionaries || !(dictMeta = f.dictionary())) {
    type = decodeFieldType(f, decodeFieldChildren(f, dictionaries));
    field = new Field2(f.name(), type, f.nullable(), decodeCustomMetadata(f));
  } else if (!dictionaries.has(id = bigIntToNumber(dictMeta.id()))) {
    keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new Int32();
    dictionaries.set(id, type = decodeFieldType(f, decodeFieldChildren(f, dictionaries)));
    dictType = new Dictionary(type, keys, id, dictMeta.isOrdered());
    field = new Field2(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
  } else {
    keys = (keys = dictMeta.indexType()) ? decodeIndexType(keys) : new Int32();
    dictType = new Dictionary(dictionaries.get(id), keys, id, dictMeta.isOrdered());
    field = new Field2(f.name(), dictType, f.nullable(), decodeCustomMetadata(f));
  }
  return field || null;
}
function decodeCustomMetadata(parent) {
  const data = /* @__PURE__ */ new Map();
  if (parent) {
    for (let entry, key, i = -1, n = Math.trunc(parent.customMetadataLength()); ++i < n; ) {
      if ((entry = parent.customMetadata(i)) && (key = entry.key()) != null) {
        data.set(key, entry.value());
      }
    }
  }
  return data;
}
function decodeMessageCustomMetadata(message) {
  const data = /* @__PURE__ */ new Map();
  for (let entry, key, i = -1, n = Math.trunc(message.customMetadataLength()); ++i < n; ) {
    if ((entry = message.customMetadata(i)) && (key = entry.key()) != null) {
      data.set(key, entry.value());
    }
  }
  return data;
}
function decodeIndexType(_type) {
  return new Int_(_type.isSigned(), _type.bitWidth());
}
function decodeFieldType(f, children) {
  const typeId = f.typeType();
  switch (typeId) {
    case Type["NONE"]:
      return new Null2();
    case Type["Null"]:
      return new Null2();
    case Type["Binary"]:
      return new Binary2();
    case Type["LargeBinary"]:
      return new LargeBinary2();
    case Type["BinaryView"]:
      return new BinaryView2();
    case Type["Utf8"]:
      return new Utf82();
    case Type["LargeUtf8"]:
      return new LargeUtf82();
    case Type["Utf8View"]:
      return new Utf8View2();
    case Type["Bool"]:
      return new Bool2();
    case Type["List"]:
      return new List2((children || [])[0]);
    case Type["LargeList"]:
      return new LargeList2((children || [])[0]);
    case Type["Struct_"]:
      return new Struct(children || []);
  }
  switch (typeId) {
    case Type["Int"]: {
      const t = f.type(new Int());
      return new Int_(t.isSigned(), t.bitWidth());
    }
    case Type["FloatingPoint"]: {
      const t = f.type(new FloatingPoint());
      return new Float(t.precision());
    }
    case Type["Decimal"]: {
      const t = f.type(new Decimal());
      return new Decimal2(t.scale(), t.precision(), t.bitWidth());
    }
    case Type["Date"]: {
      const t = f.type(new Date2());
      return new Date_(t.unit());
    }
    case Type["Time"]: {
      const t = f.type(new Time());
      return new Time_(t.unit(), t.bitWidth());
    }
    case Type["Timestamp"]: {
      const t = f.type(new Timestamp());
      return new Timestamp_(t.unit(), t.timezone());
    }
    case Type["Interval"]: {
      const t = f.type(new Interval());
      return new Interval_(t.unit());
    }
    case Type["Duration"]: {
      const t = f.type(new Duration());
      return new Duration2(t.unit());
    }
    case Type["Union"]: {
      const t = f.type(new Union());
      return new Union_(t.mode(), t.typeIdsArray() || [], children || []);
    }
    case Type["FixedSizeBinary"]: {
      const t = f.type(new FixedSizeBinary());
      return new FixedSizeBinary2(t.byteWidth());
    }
    case Type["FixedSizeList"]: {
      const t = f.type(new FixedSizeList());
      return new FixedSizeList2(t.listSize(), (children || [])[0]);
    }
    case Type["Map"]: {
      const t = f.type(new Map2());
      return new Map_((children || [])[0], t.keysSorted());
    }
  }
  throw new Error(`Unrecognized type: "${Type[typeId]}" (${typeId})`);
}
function decodeBodyCompression(b) {
  return b ? new BodyCompression2(b.codec(), b.method()) : null;
}
function encodeSchema(b, schema) {
  const fieldOffsets = schema.fields.map((f) => Field2.encode(b, f));
  Schema2.startFieldsVector(b, fieldOffsets.length);
  const fieldsVectorOffset = Schema2.createFieldsVector(b, fieldOffsets);
  const metadataOffset = !(schema.metadata && schema.metadata.size > 0) ? -1 : Schema2.createCustomMetadataVector(b, [...schema.metadata].map(([k, v]) => {
    const key = b.createString(`${k}`);
    const val = b.createString(`${v}`);
    KeyValue.startKeyValue(b);
    KeyValue.addKey(b, key);
    KeyValue.addValue(b, val);
    return KeyValue.endKeyValue(b);
  }));
  Schema2.startSchema(b);
  Schema2.addFields(b, fieldsVectorOffset);
  Schema2.addEndianness(b, platformIsLittleEndian ? Endianness.Little : Endianness.Big);
  if (metadataOffset !== -1) {
    Schema2.addCustomMetadata(b, metadataOffset);
  }
  return Schema2.endSchema(b);
}
function encodeField(b, field) {
  let nameOffset = -1;
  let typeOffset = -1;
  let dictionaryOffset = -1;
  const type = field.type;
  let typeId = field.typeId;
  if (!DataType.isDictionary(type)) {
    typeOffset = instance5.visit(type, b);
  } else {
    typeId = type.dictionary.typeId;
    dictionaryOffset = instance5.visit(type, b);
    typeOffset = instance5.visit(type.dictionary, b);
  }
  const childOffsets = (type.children || []).map((f) => Field2.encode(b, f));
  const childrenVectorOffset = Field.createChildrenVector(b, childOffsets);
  const metadataOffset = !(field.metadata && field.metadata.size > 0) ? -1 : Field.createCustomMetadataVector(b, [...field.metadata].map(([k, v]) => {
    const key = b.createString(`${k}`);
    const val = b.createString(`${v}`);
    KeyValue.startKeyValue(b);
    KeyValue.addKey(b, key);
    KeyValue.addValue(b, val);
    return KeyValue.endKeyValue(b);
  }));
  if (field.name) {
    nameOffset = b.createString(field.name);
  }
  Field.startField(b);
  Field.addType(b, typeOffset);
  Field.addTypeType(b, typeId);
  Field.addChildren(b, childrenVectorOffset);
  Field.addNullable(b, !!field.nullable);
  if (nameOffset !== -1) {
    Field.addName(b, nameOffset);
  }
  if (dictionaryOffset !== -1) {
    Field.addDictionary(b, dictionaryOffset);
  }
  if (metadataOffset !== -1) {
    Field.addCustomMetadata(b, metadataOffset);
  }
  return Field.endField(b);
}
function encodeRecordBatch(b, recordBatch) {
  const nodes = recordBatch.nodes || [];
  const buffers = recordBatch.buffers || [];
  const variadicBufferCounts = recordBatch.variadicBufferCounts || [];
  RecordBatch2.startNodesVector(b, nodes.length);
  for (const n of nodes.slice().reverse())
    FieldNode2.encode(b, n);
  const nodesVectorOffset = b.endVector();
  RecordBatch2.startBuffersVector(b, buffers.length);
  for (const b_ of buffers.slice().reverse())
    BufferRegion.encode(b, b_);
  const buffersVectorOffset = b.endVector();
  let bodyCompressionOffset = null;
  if (recordBatch.compression !== null) {
    bodyCompressionOffset = encodeBodyCompression(b, recordBatch.compression);
  }
  let variadicBufferCountsOffset = -1;
  if (variadicBufferCounts.length > 0) {
    variadicBufferCountsOffset = RecordBatch2.createVariadicBufferCountsVector(b, variadicBufferCounts.map(BigInt));
  }
  RecordBatch2.startRecordBatch(b);
  RecordBatch2.addLength(b, BigInt(recordBatch.length));
  RecordBatch2.addNodes(b, nodesVectorOffset);
  RecordBatch2.addBuffers(b, buffersVectorOffset);
  if (recordBatch.compression !== null && bodyCompressionOffset) {
    RecordBatch2.addCompression(b, bodyCompressionOffset);
  }
  if (variadicBufferCountsOffset !== -1) {
    RecordBatch2.addVariadicBufferCounts(b, variadicBufferCountsOffset);
  }
  return RecordBatch2.endRecordBatch(b);
}
function encodeBodyCompression(b, node) {
  BodyCompression.startBodyCompression(b);
  BodyCompression.addCodec(b, node.type);
  BodyCompression.addMethod(b, node.method);
  return BodyCompression.endBodyCompression(b);
}
function encodeDictionaryBatch(b, dictionaryBatch) {
  const dataOffset = RecordBatch3.encode(b, dictionaryBatch.data);
  DictionaryBatch.startDictionaryBatch(b);
  DictionaryBatch.addId(b, BigInt(dictionaryBatch.id));
  DictionaryBatch.addIsDelta(b, dictionaryBatch.isDelta);
  DictionaryBatch.addData(b, dataOffset);
  return DictionaryBatch.endDictionaryBatch(b);
}
function encodeFieldNode(b, node) {
  return FieldNode.createFieldNode(b, BigInt(node.length), BigInt(node.nullCount));
}
function encodeBufferRegion(b, node) {
  return Buffer2.createBuffer(b, BigInt(node.offset), BigInt(node.length));
}
var platformIsLittleEndian = (() => {
  const buffer = new ArrayBuffer(2);
  new DataView(buffer).setInt16(
    0,
    256,
    true
    /* littleEndian */
  );
  return new Int16Array(buffer)[0] === 256;
})();

// node_modules/apache-arrow/io/interfaces.mjs
var ITERATOR_DONE = Object.freeze({ done: true, value: void 0 });
var ArrowJSON = class {
  constructor(_json) {
    this._json = _json;
  }
  get schema() {
    return this._json["schema"];
  }
  get batches() {
    return this._json["batches"] || [];
  }
  get dictionaries() {
    return this._json["dictionaries"] || [];
  }
};
var ReadableInterop = class {
  tee() {
    return this._getDOMStream().tee();
  }
  pipe(writable, options) {
    return this._getNodeStream().pipe(writable, options);
  }
  pipeTo(writable, options) {
    return this._getDOMStream().pipeTo(writable, options);
  }
  pipeThrough(duplex, options) {
    return this._getDOMStream().pipeThrough(duplex, options);
  }
  _getDOMStream() {
    return this._DOMStream || (this._DOMStream = this.toDOMStream());
  }
  _getNodeStream() {
    return this._nodeStream || (this._nodeStream = this.toNodeStream());
  }
};
var AsyncQueue = class extends ReadableInterop {
  constructor() {
    super();
    this._values = [];
    this.resolvers = [];
    this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
  }
  get closed() {
    return this._closedPromise;
  }
  cancel(reason) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.return(reason);
    });
  }
  write(value) {
    if (this._ensureOpen()) {
      this.resolvers.length <= 0 ? this._values.push(value) : this.resolvers.shift().resolve({ done: false, value });
    }
  }
  abort(value) {
    if (this._closedPromiseResolve) {
      this.resolvers.length <= 0 ? this._error = { error: value } : this.resolvers.shift().reject({ done: true, value });
    }
  }
  close() {
    if (this._closedPromiseResolve) {
      const { resolvers } = this;
      while (resolvers.length > 0) {
        resolvers.shift().resolve(ITERATOR_DONE);
      }
      this._closedPromiseResolve();
      this._closedPromiseResolve = void 0;
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  toDOMStream(options) {
    return adapters_default.toDOMStream(this._closedPromiseResolve || this._error ? this : this._values, options);
  }
  toNodeStream(options) {
    return adapters_default.toNodeStream(this._closedPromiseResolve || this._error ? this : this._values, options);
  }
  throw(_) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.abort(_);
      return ITERATOR_DONE;
    });
  }
  return(_) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.close();
      return ITERATOR_DONE;
    });
  }
  read(size) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.next(size, "read")).value;
    });
  }
  peek(size) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.next(size, "peek")).value;
    });
  }
  next(..._args) {
    if (this._values.length > 0) {
      return Promise.resolve({ done: false, value: this._values.shift() });
    } else if (this._error) {
      return Promise.reject({ done: true, value: this._error.error });
    } else if (!this._closedPromiseResolve) {
      return Promise.resolve(ITERATOR_DONE);
    } else {
      return new Promise((resolve, reject) => {
        this.resolvers.push({ resolve, reject });
      });
    }
  }
  _ensureOpen() {
    if (this._closedPromiseResolve) {
      return true;
    }
    throw new Error(`AsyncQueue is closed`);
  }
};

// node_modules/apache-arrow/io/stream.mjs
var AsyncByteQueue = class extends AsyncQueue {
  write(value) {
    if ((value = toUint8Array(value)).byteLength > 0) {
      return super.write(value);
    }
  }
  toString(sync = false) {
    return sync ? decodeUtf8(this.toUint8Array(true)) : this.toUint8Array(false).then(decodeUtf8);
  }
  toUint8Array(sync = false) {
    return sync ? joinUint8Arrays(this._values)[0] : (() => __awaiter(this, void 0, void 0, function* () {
      var _a5, e_1, _b2, _c2;
      const buffers = [];
      let byteLength = 0;
      try {
        for (var _d2 = true, _e2 = __asyncValues(this), _f2; _f2 = yield _e2.next(), _a5 = _f2.done, !_a5; _d2 = true) {
          _c2 = _f2.value;
          _d2 = false;
          const chunk = _c2;
          buffers.push(chunk);
          byteLength += chunk.byteLength;
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (!_d2 && !_a5 && (_b2 = _e2.return)) yield _b2.call(_e2);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return joinUint8Arrays(buffers, byteLength)[0];
    }))();
  }
};
var ByteStream = class {
  constructor(source) {
    if (source) {
      this.source = new ByteStreamSource(adapters_default.fromIterable(source));
    }
  }
  [Symbol.iterator]() {
    return this;
  }
  next(value) {
    return this.source.next(value);
  }
  throw(value) {
    return this.source.throw(value);
  }
  return(value) {
    return this.source.return(value);
  }
  peek(size) {
    return this.source.peek(size);
  }
  read(size) {
    return this.source.read(size);
  }
};
var AsyncByteStream = class _AsyncByteStream {
  constructor(source) {
    if (source instanceof _AsyncByteStream) {
      this.source = source.source;
    } else if (source instanceof AsyncByteQueue) {
      this.source = new AsyncByteStreamSource(adapters_default.fromAsyncIterable(source));
    } else if (isReadableNodeStream(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromNodeStream(source));
    } else if (isReadableDOMStream(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromDOMStream(source));
    } else if (isFetchResponse(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromDOMStream(source.body));
    } else if (isIterable(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromIterable(source));
    } else if (isPromise(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromAsyncIterable(source));
    } else if (isAsyncIterable(source)) {
      this.source = new AsyncByteStreamSource(adapters_default.fromAsyncIterable(source));
    }
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next(value) {
    return this.source.next(value);
  }
  throw(value) {
    return this.source.throw(value);
  }
  return(value) {
    return this.source.return(value);
  }
  get closed() {
    return this.source.closed;
  }
  cancel(reason) {
    return this.source.cancel(reason);
  }
  peek(size) {
    return this.source.peek(size);
  }
  read(size) {
    return this.source.read(size);
  }
};
var ByteStreamSource = class {
  constructor(source) {
    this.source = source;
  }
  cancel(reason) {
    this.return(reason);
  }
  peek(size) {
    return this.next(size, "peek").value;
  }
  read(size) {
    return this.next(size, "read").value;
  }
  next(size, cmd = "read") {
    return this.source.next({ cmd, size });
  }
  throw(value) {
    return Object.create(this.source.throw && this.source.throw(value) || ITERATOR_DONE);
  }
  return(value) {
    return Object.create(this.source.return && this.source.return(value) || ITERATOR_DONE);
  }
};
var AsyncByteStreamSource = class {
  constructor(source) {
    this.source = source;
    this._closedPromise = new Promise((r) => this._closedPromiseResolve = r);
  }
  cancel(reason) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.return(reason);
    });
  }
  get closed() {
    return this._closedPromise;
  }
  read(size) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.next(size, "read")).value;
    });
  }
  peek(size) {
    return __awaiter(this, void 0, void 0, function* () {
      return (yield this.next(size, "peek")).value;
    });
  }
  next(size_1) {
    return __awaiter(this, arguments, void 0, function* (size, cmd = "read") {
      return yield this.source.next({ cmd, size });
    });
  }
  throw(value) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = this.source.throw && (yield this.source.throw(value)) || ITERATOR_DONE;
      this._closedPromiseResolve && this._closedPromiseResolve();
      this._closedPromiseResolve = void 0;
      return Object.create(result);
    });
  }
  return(value) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = this.source.return && (yield this.source.return(value)) || ITERATOR_DONE;
      this._closedPromiseResolve && this._closedPromiseResolve();
      this._closedPromiseResolve = void 0;
      return Object.create(result);
    });
  }
};

// node_modules/apache-arrow/io/file.mjs
var RandomAccessFile = class extends ByteStream {
  constructor(buffer, byteLength) {
    super();
    this.position = 0;
    this.buffer = toUint8Array(buffer);
    this.size = byteLength === void 0 ? this.buffer.byteLength : byteLength;
  }
  readInt32(position) {
    const { buffer, byteOffset } = this.readAt(position, 4);
    return new DataView(buffer, byteOffset).getInt32(0, true);
  }
  seek(position) {
    this.position = Math.min(position, this.size);
    return position < this.size;
  }
  read(nBytes) {
    const { buffer, size, position } = this;
    if (buffer && position < size) {
      if (typeof nBytes !== "number") {
        nBytes = Number.POSITIVE_INFINITY;
      }
      this.position = Math.min(size, position + Math.min(size - position, nBytes));
      return buffer.subarray(position, this.position);
    }
    return null;
  }
  readAt(position, nBytes) {
    const buf = this.buffer;
    const end = Math.min(this.size, position + nBytes);
    return buf ? buf.subarray(position, end) : new Uint8Array(nBytes);
  }
  close() {
    this.buffer && (this.buffer = null);
  }
  throw(value) {
    this.close();
    return { done: true, value };
  }
  return(value) {
    this.close();
    return { done: true, value };
  }
};
var AsyncRandomAccessFile = class extends AsyncByteStream {
  constructor(file, byteLength) {
    super();
    this.position = 0;
    this._handle = file;
    if (typeof byteLength === "number") {
      this.size = byteLength;
    } else {
      this._pending = (() => __awaiter(this, void 0, void 0, function* () {
        this.size = (yield file.stat()).size;
        delete this._pending;
      }))();
    }
  }
  readInt32(position) {
    return __awaiter(this, void 0, void 0, function* () {
      const { buffer, byteOffset } = yield this.readAt(position, 4);
      return new DataView(buffer, byteOffset).getInt32(0, true);
    });
  }
  seek(position) {
    return __awaiter(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      this.position = Math.min(position, this.size);
      return position < this.size;
    });
  }
  read(nBytes) {
    return __awaiter(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: file, size, position } = this;
      if (file && position < size) {
        if (typeof nBytes !== "number") {
          nBytes = Number.POSITIVE_INFINITY;
        }
        let pos = position, offset = 0, bytesRead = 0;
        const end = Math.min(size, pos + Math.min(size - pos, nBytes));
        const buffer = new Uint8Array(Math.max(0, (this.position = end) - pos));
        while ((pos += bytesRead) < end && (offset += bytesRead) < buffer.byteLength) {
          ({ bytesRead } = yield file.read(buffer, offset, buffer.byteLength - offset, pos));
        }
        return buffer;
      }
      return null;
    });
  }
  readAt(position, nBytes) {
    return __awaiter(this, void 0, void 0, function* () {
      this._pending && (yield this._pending);
      const { _handle: file, size } = this;
      if (file && position + nBytes < size) {
        const end = Math.min(size, position + nBytes);
        const buffer = new Uint8Array(end - position);
        return (yield file.read(buffer, 0, nBytes, position)).buffer;
      }
      return new Uint8Array(nBytes);
    });
  }
  close() {
    return __awaiter(this, void 0, void 0, function* () {
      const f = this._handle;
      this._handle = null;
      f && (yield f.close());
    });
  }
  throw(value) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.close();
      return { done: true, value };
    });
  }
  return(value) {
    return __awaiter(this, void 0, void 0, function* () {
      yield this.close();
      return { done: true, value };
    });
  }
};

// node_modules/apache-arrow/util/int.mjs
var int_exports = {};
__export(int_exports, {
  BaseInt64: () => BaseInt64,
  Int128: () => Int128,
  Int64: () => Int642,
  Uint64: () => Uint642
});
var carryBit16 = 1 << 16;
function intAsHex(value) {
  if (value < 0) {
    value = 4294967295 + value + 1;
  }
  return `0x${value.toString(16)}`;
}
var kInt32DecimalDigits = 8;
var kPowersOfTen = [
  1,
  10,
  100,
  1e3,
  1e4,
  1e5,
  1e6,
  1e7,
  1e8
];
var BaseInt64 = class {
  constructor(buffer) {
    this.buffer = buffer;
  }
  high() {
    return this.buffer[1];
  }
  low() {
    return this.buffer[0];
  }
  _times(other) {
    const L = new Uint32Array([
      this.buffer[1] >>> 16,
      this.buffer[1] & 65535,
      this.buffer[0] >>> 16,
      this.buffer[0] & 65535
    ]);
    const R = new Uint32Array([
      other.buffer[1] >>> 16,
      other.buffer[1] & 65535,
      other.buffer[0] >>> 16,
      other.buffer[0] & 65535
    ]);
    let product = L[3] * R[3];
    this.buffer[0] = product & 65535;
    let sum = product >>> 16;
    product = L[2] * R[3];
    sum += product;
    product = L[3] * R[2] >>> 0;
    sum += product;
    this.buffer[0] += sum << 16;
    this.buffer[1] = sum >>> 0 < product ? carryBit16 : 0;
    this.buffer[1] += sum >>> 16;
    this.buffer[1] += L[1] * R[3] + L[2] * R[2] + L[3] * R[1];
    this.buffer[1] += L[0] * R[3] + L[1] * R[2] + L[2] * R[1] + L[3] * R[0] << 16;
    return this;
  }
  _plus(other) {
    const sum = this.buffer[0] + other.buffer[0] >>> 0;
    this.buffer[1] += other.buffer[1];
    if (sum < this.buffer[0] >>> 0) {
      ++this.buffer[1];
    }
    this.buffer[0] = sum;
  }
  lessThan(other) {
    return this.buffer[1] < other.buffer[1] || this.buffer[1] === other.buffer[1] && this.buffer[0] < other.buffer[0];
  }
  equals(other) {
    return this.buffer[1] === other.buffer[1] && this.buffer[0] == other.buffer[0];
  }
  greaterThan(other) {
    return other.lessThan(this);
  }
  hex() {
    return `${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
  }
};
var Uint642 = class _Uint64 extends BaseInt64 {
  times(other) {
    this._times(other);
    return this;
  }
  plus(other) {
    this._plus(other);
    return this;
  }
  /** @nocollapse */
  static from(val, out_buffer = new Uint32Array(2)) {
    return _Uint64.fromString(typeof val === "string" ? val : val.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromNumber(num, out_buffer = new Uint32Array(2)) {
    return _Uint64.fromString(num.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromString(str, out_buffer = new Uint32Array(2)) {
    const length = str.length;
    const out = new _Uint64(out_buffer);
    for (let posn = 0; posn < length; ) {
      const group = kInt32DecimalDigits < length - posn ? kInt32DecimalDigits : length - posn;
      const chunk = new _Uint64(new Uint32Array([Number.parseInt(str.slice(posn, posn + group), 10), 0]));
      const multiple = new _Uint64(new Uint32Array([kPowersOfTen[group], 0]));
      out.times(multiple);
      out.plus(chunk);
      posn += group;
    }
    return out;
  }
  /** @nocollapse */
  static convertArray(values) {
    const data = new Uint32Array(values.length * 2);
    for (let i = -1, n = values.length; ++i < n; ) {
      _Uint64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
    }
    return data;
  }
  /** @nocollapse */
  static multiply(left, right) {
    const rtrn = new _Uint64(new Uint32Array(left.buffer));
    return rtrn.times(right);
  }
  /** @nocollapse */
  static add(left, right) {
    const rtrn = new _Uint64(new Uint32Array(left.buffer));
    return rtrn.plus(right);
  }
};
var Int642 = class _Int64 extends BaseInt64 {
  negate() {
    this.buffer[0] = ~this.buffer[0] + 1;
    this.buffer[1] = ~this.buffer[1];
    if (this.buffer[0] == 0) {
      ++this.buffer[1];
    }
    return this;
  }
  times(other) {
    this._times(other);
    return this;
  }
  plus(other) {
    this._plus(other);
    return this;
  }
  lessThan(other) {
    const this_high = this.buffer[1] << 0;
    const other_high = other.buffer[1] << 0;
    return this_high < other_high || this_high === other_high && this.buffer[0] < other.buffer[0];
  }
  /** @nocollapse */
  static from(val, out_buffer = new Uint32Array(2)) {
    return _Int64.fromString(typeof val === "string" ? val : val.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromNumber(num, out_buffer = new Uint32Array(2)) {
    return _Int64.fromString(num.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromString(str, out_buffer = new Uint32Array(2)) {
    const negate = str.startsWith("-");
    const length = str.length;
    const out = new _Int64(out_buffer);
    for (let posn = negate ? 1 : 0; posn < length; ) {
      const group = kInt32DecimalDigits < length - posn ? kInt32DecimalDigits : length - posn;
      const chunk = new _Int64(new Uint32Array([Number.parseInt(str.slice(posn, posn + group), 10), 0]));
      const multiple = new _Int64(new Uint32Array([kPowersOfTen[group], 0]));
      out.times(multiple);
      out.plus(chunk);
      posn += group;
    }
    return negate ? out.negate() : out;
  }
  /** @nocollapse */
  static convertArray(values) {
    const data = new Uint32Array(values.length * 2);
    for (let i = -1, n = values.length; ++i < n; ) {
      _Int64.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 2 * i * 4, 2));
    }
    return data;
  }
  /** @nocollapse */
  static multiply(left, right) {
    const rtrn = new _Int64(new Uint32Array(left.buffer));
    return rtrn.times(right);
  }
  /** @nocollapse */
  static add(left, right) {
    const rtrn = new _Int64(new Uint32Array(left.buffer));
    return rtrn.plus(right);
  }
};
var Int128 = class _Int128 {
  constructor(buffer) {
    this.buffer = buffer;
  }
  high() {
    return new Int642(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
  }
  low() {
    return new Int642(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset, 2));
  }
  negate() {
    this.buffer[0] = ~this.buffer[0] + 1;
    this.buffer[1] = ~this.buffer[1];
    this.buffer[2] = ~this.buffer[2];
    this.buffer[3] = ~this.buffer[3];
    if (this.buffer[0] == 0) {
      ++this.buffer[1];
    }
    if (this.buffer[1] == 0) {
      ++this.buffer[2];
    }
    if (this.buffer[2] == 0) {
      ++this.buffer[3];
    }
    return this;
  }
  times(other) {
    const L0 = new Uint642(new Uint32Array([this.buffer[3], 0]));
    const L1 = new Uint642(new Uint32Array([this.buffer[2], 0]));
    const L2 = new Uint642(new Uint32Array([this.buffer[1], 0]));
    const L3 = new Uint642(new Uint32Array([this.buffer[0], 0]));
    const R0 = new Uint642(new Uint32Array([other.buffer[3], 0]));
    const R1 = new Uint642(new Uint32Array([other.buffer[2], 0]));
    const R2 = new Uint642(new Uint32Array([other.buffer[1], 0]));
    const R3 = new Uint642(new Uint32Array([other.buffer[0], 0]));
    let product = Uint642.multiply(L3, R3);
    this.buffer[0] = product.low();
    const sum = new Uint642(new Uint32Array([product.high(), 0]));
    product = Uint642.multiply(L2, R3);
    sum.plus(product);
    product = Uint642.multiply(L3, R2);
    sum.plus(product);
    this.buffer[1] = sum.low();
    this.buffer[3] = sum.lessThan(product) ? 1 : 0;
    this.buffer[2] = sum.high();
    const high = new Uint642(new Uint32Array(this.buffer.buffer, this.buffer.byteOffset + 8, 2));
    high.plus(Uint642.multiply(L1, R3)).plus(Uint642.multiply(L2, R2)).plus(Uint642.multiply(L3, R1));
    this.buffer[3] += Uint642.multiply(L0, R3).plus(Uint642.multiply(L1, R2)).plus(Uint642.multiply(L2, R1)).plus(Uint642.multiply(L3, R0)).low();
    return this;
  }
  plus(other) {
    const sums = new Uint32Array(4);
    sums[3] = this.buffer[3] + other.buffer[3] >>> 0;
    sums[2] = this.buffer[2] + other.buffer[2] >>> 0;
    sums[1] = this.buffer[1] + other.buffer[1] >>> 0;
    sums[0] = this.buffer[0] + other.buffer[0] >>> 0;
    if (sums[0] < this.buffer[0] >>> 0) {
      ++sums[1];
    }
    if (sums[1] < this.buffer[1] >>> 0) {
      ++sums[2];
    }
    if (sums[2] < this.buffer[2] >>> 0) {
      ++sums[3];
    }
    this.buffer[3] = sums[3];
    this.buffer[2] = sums[2];
    this.buffer[1] = sums[1];
    this.buffer[0] = sums[0];
    return this;
  }
  hex() {
    return `${intAsHex(this.buffer[3])} ${intAsHex(this.buffer[2])} ${intAsHex(this.buffer[1])} ${intAsHex(this.buffer[0])}`;
  }
  /** @nocollapse */
  static multiply(left, right) {
    const rtrn = new _Int128(new Uint32Array(left.buffer));
    return rtrn.times(right);
  }
  /** @nocollapse */
  static add(left, right) {
    const rtrn = new _Int128(new Uint32Array(left.buffer));
    return rtrn.plus(right);
  }
  /** @nocollapse */
  static from(val, out_buffer = new Uint32Array(4)) {
    return _Int128.fromString(typeof val === "string" ? val : val.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromNumber(num, out_buffer = new Uint32Array(4)) {
    return _Int128.fromString(num.toString(), out_buffer);
  }
  /** @nocollapse */
  static fromString(str, out_buffer = new Uint32Array(4)) {
    const negate = str.startsWith("-");
    const length = str.length;
    const out = new _Int128(out_buffer);
    for (let posn = negate ? 1 : 0; posn < length; ) {
      const group = kInt32DecimalDigits < length - posn ? kInt32DecimalDigits : length - posn;
      const chunk = new _Int128(new Uint32Array([Number.parseInt(str.slice(posn, posn + group), 10), 0, 0, 0]));
      const multiple = new _Int128(new Uint32Array([kPowersOfTen[group], 0, 0, 0]));
      out.times(multiple);
      out.plus(chunk);
      posn += group;
    }
    return negate ? out.negate() : out;
  }
  /** @nocollapse */
  static convertArray(values) {
    const data = new Uint32Array(values.length * 4);
    for (let i = -1, n = values.length; ++i < n; ) {
      _Int128.from(values[i], new Uint32Array(data.buffer, data.byteOffset + 4 * 4 * i, 4));
    }
    return data;
  }
};

// node_modules/apache-arrow/util/interval.mjs
var interval_exports = {};
__export(interval_exports, {
  toIntervalDayTimeInt32Array: () => toIntervalDayTimeInt32Array,
  toIntervalDayTimeObjects: () => toIntervalDayTimeObjects,
  toIntervalMonthDayNanoInt32Array: () => toIntervalMonthDayNanoInt32Array,
  toIntervalMonthDayNanoObjects: () => toIntervalMonthDayNanoObjects
});
function toIntervalDayTimeInt32Array(objects) {
  var _a5, _b2;
  const length = objects.length;
  const array = new Int32Array(length * 2);
  for (let oi = 0, ai = 0; oi < length; oi++) {
    const interval = objects[oi];
    array[ai++] = (_a5 = interval["days"]) !== null && _a5 !== void 0 ? _a5 : 0;
    array[ai++] = (_b2 = interval["milliseconds"]) !== null && _b2 !== void 0 ? _b2 : 0;
  }
  return array;
}
function toIntervalMonthDayNanoInt32Array(objects) {
  var _a5, _b2;
  const length = objects.length;
  const data = new Int32Array(length * 4);
  for (let oi = 0, ai = 0; oi < length; oi++) {
    const interval = objects[oi];
    data[ai++] = (_a5 = interval["months"]) !== null && _a5 !== void 0 ? _a5 : 0;
    data[ai++] = (_b2 = interval["days"]) !== null && _b2 !== void 0 ? _b2 : 0;
    const nanoseconds = interval["nanoseconds"];
    if (nanoseconds) {
      const ns = BigInt(nanoseconds);
      data[ai++] = Number(ns & BigInt(4294967295)) >>> 0;
      data[ai++] = Number(ns >> BigInt(32)) >>> 0;
    } else {
      ai += 2;
    }
  }
  return data;
}
function toIntervalDayTimeObjects(array) {
  const length = array.length;
  const objects = new Array(length / 2);
  for (let ai = 0, oi = 0; ai < length; ai += 2) {
    objects[oi++] = {
      "days": array[ai],
      "milliseconds": array[ai + 1]
    };
  }
  return objects;
}
function toIntervalMonthDayNanoObjects(array, stringifyNano) {
  const length = array.length;
  const objects = new Array(length / 4);
  for (let ai = 0, oi = 0; ai < length; ai += 4) {
    const nanoseconds = BigInt(array[ai + 3]) << BigInt(32) | BigInt(array[ai + 2] >>> 0);
    objects[oi++] = {
      "months": array[ai],
      "days": array[ai + 1],
      "nanoseconds": stringifyNano ? `${nanoseconds}` : nanoseconds
    };
  }
  return objects;
}

// node_modules/apache-arrow/visitor/vectorloader.mjs
var VectorLoader = class extends Visitor {
  constructor(bytes, nodes, buffers, dictionaries, metadataVersion = MetadataVersion.V5, variadicBufferCounts = []) {
    super();
    this.nodesIndex = -1;
    this.buffersIndex = -1;
    this.variadicBufferIndex = -1;
    this.bytes = bytes;
    this.nodes = nodes;
    this.buffers = buffers;
    this.dictionaries = dictionaries;
    this.metadataVersion = metadataVersion;
    this.variadicBufferCounts = variadicBufferCounts;
  }
  visit(node) {
    return super.visit(node instanceof Field2 ? node.type : node);
  }
  visitNull(type, { length } = this.nextFieldNode()) {
    return makeData({ type, length });
  }
  visitBool(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitInt(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitFloat(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitUtf8(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), data: this.readData(type) });
  }
  visitLargeUtf8(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), data: this.readData(type) });
  }
  visitUtf8View(type, { length, nullCount } = this.nextFieldNode()) {
    const nullBitmap = this.readNullBitmap(type, nullCount);
    const views = this.readData(type);
    const variadicBuffers = this.readVariadicBuffers(this.nextVariadicBufferCount());
    return makeData({
      type,
      length,
      nullCount,
      nullBitmap,
      ["views"]: views,
      ["variadicBuffers"]: variadicBuffers
    });
  }
  visitBinary(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), data: this.readData(type) });
  }
  visitLargeBinary(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), data: this.readData(type) });
  }
  visitBinaryView(type, { length, nullCount } = this.nextFieldNode()) {
    const nullBitmap = this.readNullBitmap(type, nullCount);
    const views = this.readData(type);
    const variadicBuffers = this.readVariadicBuffers(this.nextVariadicBufferCount());
    return makeData({
      type,
      length,
      nullCount,
      nullBitmap,
      ["views"]: views,
      ["variadicBuffers"]: variadicBuffers
    });
  }
  visitFixedSizeBinary(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitDate(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitTimestamp(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitTime(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitDecimal(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitList(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), "child": this.visit(type.children[0]) });
  }
  visitLargeList(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), "child": this.visit(type.children[0]) });
  }
  visitStruct(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), children: this.visitMany(type.children) });
  }
  visitUnion(type, { length, nullCount } = this.nextFieldNode()) {
    if (this.metadataVersion < MetadataVersion.V5) {
      this.readNullBitmap(type, nullCount);
    }
    return type.mode === UnionMode.Sparse ? this.visitSparseUnion(type, { length, nullCount }) : this.visitDenseUnion(type, { length, nullCount });
  }
  visitDenseUnion(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, typeIds: this.readTypeIds(type), valueOffsets: this.readOffsets(type), children: this.visitMany(type.children) });
  }
  visitSparseUnion(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, typeIds: this.readTypeIds(type), children: this.visitMany(type.children) });
  }
  visitDictionary(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type.indices), dictionary: this.readDictionary(type) });
  }
  visitInterval(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitDuration(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), data: this.readData(type) });
  }
  visitFixedSizeList(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), "child": this.visit(type.children[0]) });
  }
  visitMap(type, { length, nullCount } = this.nextFieldNode()) {
    return makeData({ type, length, nullCount, nullBitmap: this.readNullBitmap(type, nullCount), valueOffsets: this.readOffsets(type), "child": this.visit(type.children[0]) });
  }
  nextFieldNode() {
    return this.nodes[++this.nodesIndex];
  }
  nextBufferRange() {
    return this.buffers[++this.buffersIndex];
  }
  readNullBitmap(type, nullCount, buffer = this.nextBufferRange()) {
    return nullCount > 0 && this.readData(type, buffer) || new Uint8Array(0);
  }
  readOffsets(type, buffer) {
    return this.readData(type, buffer);
  }
  readTypeIds(type, buffer) {
    return this.readData(type, buffer);
  }
  readData(_type, { length, offset } = this.nextBufferRange()) {
    return this.bytes.subarray(offset, offset + length);
  }
  readVariadicBuffers(length) {
    return Array.from({ length }, () => this.readData(null));
  }
  nextVariadicBufferCount() {
    var _a5;
    return (_a5 = this.variadicBufferCounts[++this.variadicBufferIndex]) !== null && _a5 !== void 0 ? _a5 : 0;
  }
  readDictionary(type) {
    return this.dictionaries.get(type.id);
  }
};
var JSONVectorLoader = class extends VectorLoader {
  constructor(sources, nodes, buffers, dictionaries, metadataVersion, variadicBufferCounts = []) {
    super(new Uint8Array(0), nodes, buffers, dictionaries, metadataVersion, variadicBufferCounts);
    this.sources = sources;
  }
  readNullBitmap(_type, nullCount, { offset } = this.nextBufferRange()) {
    return nullCount <= 0 ? new Uint8Array(0) : packBools(this.sources[offset]);
  }
  readOffsets(_type, { offset } = this.nextBufferRange()) {
    return toArrayBufferView(Uint8Array, toArrayBufferView(_type.OffsetArrayType, this.sources[offset]));
  }
  readTypeIds(type, { offset } = this.nextBufferRange()) {
    return toArrayBufferView(Uint8Array, toArrayBufferView(type.ArrayType, this.sources[offset]));
  }
  readData(type, { offset } = this.nextBufferRange()) {
    const { sources } = this;
    if (DataType.isTimestamp(type)) {
      return toArrayBufferView(Uint8Array, Int642.convertArray(sources[offset]));
    } else if ((DataType.isInt(type) || DataType.isTime(type)) && type.bitWidth === 64 || DataType.isDuration(type)) {
      return toArrayBufferView(Uint8Array, Int642.convertArray(sources[offset]));
    } else if (DataType.isDate(type) && type.unit === DateUnit.MILLISECOND) {
      return toArrayBufferView(Uint8Array, Int642.convertArray(sources[offset]));
    } else if (DataType.isDecimal(type)) {
      return toArrayBufferView(Uint8Array, Int128.convertArray(sources[offset]));
    } else if (DataType.isBinary(type) || DataType.isLargeBinary(type) || DataType.isFixedSizeBinary(type)) {
      return binaryDataFromJSON(sources[offset]);
    } else if (DataType.isBinaryView(type)) {
      return binaryViewDataFromJSON(sources[offset]);
    } else if (DataType.isUtf8View(type)) {
      return utf8ViewDataFromJSON(sources[offset]);
    } else if (DataType.isBool(type)) {
      return packBools(sources[offset]);
    } else if (DataType.isUtf8(type) || DataType.isLargeUtf8(type)) {
      return encodeUtf8(sources[offset].join(""));
    } else if (DataType.isInterval(type)) {
      switch (type.unit) {
        case IntervalUnit.DAY_TIME:
          return toIntervalDayTimeInt32Array(sources[offset]);
        case IntervalUnit.MONTH_DAY_NANO:
          return toIntervalMonthDayNanoInt32Array(sources[offset]);
        default:
          break;
      }
    }
    return toArrayBufferView(Uint8Array, toArrayBufferView(type.ArrayType, sources[offset].map((x) => +x)));
  }
  readVariadicBuffers(length) {
    const buffers = [];
    for (let i = 0; i < length; i++) {
      const { offset } = this.nextBufferRange();
      const hexString = this.sources[offset];
      buffers.push(hexStringToBytes(hexString));
    }
    return buffers;
  }
};
function hexStringToBytes(hexString) {
  const data = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < hexString.length; i += 2) {
    data[i >> 1] = Number.parseInt(hexString.slice(i, i + 2), 16);
  }
  return data;
}
function binaryDataFromJSON(values) {
  return hexStringToBytes(values.join(""));
}
function parseViewDataFromJSON(views, parseInlined) {
  const data = new Uint8Array(views.length * 16);
  const dataView = new DataView(data.buffer);
  for (const [i, view] of views.entries()) {
    const offset = i * 16;
    const size = view["SIZE"];
    dataView.setInt32(offset, size, true);
    if (view["INLINED"] !== void 0) {
      const bytes = parseInlined(view["INLINED"]);
      for (let j = 0; j < bytes.length && j < 12; j++) {
        data[offset + 4 + j] = bytes[j];
      }
    } else {
      const prefix = view["PREFIX_HEX"];
      for (let j = 0; j < 8 && j < prefix.length; j += 2) {
        data[offset + 4 + (j >> 1)] = Number.parseInt(prefix.slice(j, j + 2), 16);
      }
      dataView.setInt32(offset + 8, view["BUFFER_INDEX"], true);
      dataView.setInt32(offset + 12, view["OFFSET"], true);
    }
  }
  return data;
}
function binaryViewDataFromJSON(views) {
  return parseViewDataFromJSON(views, (inlined) => {
    const bytes = new Uint8Array(inlined.length / 2);
    for (let i = 0; i < inlined.length; i += 2) {
      bytes[i >> 1] = Number.parseInt(inlined.slice(i, i + 2), 16);
    }
    return bytes;
  });
}
function utf8ViewDataFromJSON(views) {
  return parseViewDataFromJSON(views, (inlined) => {
    const encoder2 = new TextEncoder();
    return encoder2.encode(inlined);
  });
}
var CompressedVectorLoader = class extends VectorLoader {
  constructor(bodyChunks, nodes, buffers, dictionaries, metadataVersion, variadicBufferCounts = []) {
    super(new Uint8Array(0), nodes, buffers, dictionaries, metadataVersion, variadicBufferCounts);
    this.bodyChunks = bodyChunks;
  }
  readData(_type, _buffer = this.nextBufferRange()) {
    return this.bodyChunks[this.buffersIndex];
  }
};

// node_modules/apache-arrow/builder/binary.mjs
var BinaryBuilder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._values = new BufferBuilder(Uint8Array);
  }
  get byteLength() {
    let size = this._pendingLength + this.length * 4;
    this._offsets && (size += this._offsets.byteLength);
    this._values && (size += this._values.byteLength);
    this._nulls && (size += this._nulls.byteLength);
    return size;
  }
  setValue(index, value) {
    return super.setValue(index, toUint8Array(value));
  }
  _flushPending(pending, pendingLength) {
    const offsets = this._offsets;
    const data = this._values.reserve(pendingLength).buffer;
    let offset = 0;
    for (const [index, value] of pending) {
      if (value === void 0) {
        offsets.set(index, 0);
      } else {
        const length = value.length;
        data.set(value, offset);
        offsets.set(index, length);
        offset += length;
      }
    }
  }
};

// node_modules/apache-arrow/builder/largebinary.mjs
var LargeBinaryBuilder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._values = new BufferBuilder(Uint8Array);
  }
  get byteLength() {
    let size = this._pendingLength + this.length * 4;
    this._offsets && (size += this._offsets.byteLength);
    this._values && (size += this._values.byteLength);
    this._nulls && (size += this._nulls.byteLength);
    return size;
  }
  setValue(index, value) {
    return super.setValue(index, toUint8Array(value));
  }
  _flushPending(pending, pendingLength) {
    const offsets = this._offsets;
    const data = this._values.reserve(pendingLength).buffer;
    let offset = 0;
    for (const [index, value] of pending) {
      if (value === void 0) {
        offsets.set(index, BigInt(0));
      } else {
        const length = value.length;
        data.set(value, offset);
        offsets.set(index, BigInt(length));
        offset += length;
      }
    }
  }
};

// node_modules/apache-arrow/builder/bool.mjs
var BoolBuilder = class extends Builder {
  constructor(options) {
    super(options);
    this._values = new BitmapBufferBuilder();
  }
  setValue(index, value) {
    this._values.set(index, +value);
  }
};

// node_modules/apache-arrow/builder/date.mjs
var DateBuilder = class extends FixedWidthBuilder {
};
DateBuilder.prototype._setValue = setDate;
var DateDayBuilder = class extends DateBuilder {
};
DateDayBuilder.prototype._setValue = setDateDay;
var DateMillisecondBuilder = class extends DateBuilder {
};
DateMillisecondBuilder.prototype._setValue = setDateMillisecond;

// node_modules/apache-arrow/builder/decimal.mjs
var DecimalBuilder = class extends FixedWidthBuilder {
};
DecimalBuilder.prototype._setValue = setDecimal;

// node_modules/apache-arrow/builder/dictionary.mjs
var DictionaryBuilder = class extends Builder {
  constructor({ "type": type, "nullValues": nulls, "dictionaryHashFunction": hashFn }) {
    super({ type: new Dictionary(type.dictionary, type.indices, type.id, type.isOrdered) });
    this._nulls = null;
    this._dictionaryOffset = 0;
    this._keysToIndices = /* @__PURE__ */ Object.create(null);
    this.indices = makeBuilder({ "type": this.type.indices, "nullValues": nulls });
    this.dictionary = makeBuilder({ "type": this.type.dictionary, "nullValues": null });
    if (typeof hashFn === "function") {
      this.valueToKey = hashFn;
    }
  }
  get values() {
    return this.indices.values;
  }
  get nullCount() {
    return this.indices.nullCount;
  }
  get nullBitmap() {
    return this.indices.nullBitmap;
  }
  get byteLength() {
    return this.indices.byteLength + this.dictionary.byteLength;
  }
  get reservedLength() {
    return this.indices.reservedLength + this.dictionary.reservedLength;
  }
  get reservedByteLength() {
    return this.indices.reservedByteLength + this.dictionary.reservedByteLength;
  }
  isValid(value) {
    return this.indices.isValid(value);
  }
  setValid(index, valid) {
    const indices = this.indices;
    valid = indices.setValid(index, valid);
    this.length = indices.length;
    return valid;
  }
  setValue(index, value) {
    const keysToIndices = this._keysToIndices;
    const key = this.valueToKey(value);
    let idx = keysToIndices[key];
    if (idx === void 0) {
      keysToIndices[key] = idx = this._dictionaryOffset + this.dictionary.append(value).length - 1;
    }
    return this.indices.setValue(index, idx);
  }
  flush() {
    const type = this.type;
    const prev = this._dictionary;
    const curr = this.dictionary.toVector();
    const data = this.indices.flush().clone(type);
    data.dictionary = prev ? prev.concat(curr) : curr;
    this.finished || (this._dictionaryOffset += curr.length);
    this._dictionary = data.dictionary;
    this.clear();
    return data;
  }
  finish() {
    this.indices.finish();
    this.dictionary.finish();
    this._dictionaryOffset = 0;
    this._keysToIndices = /* @__PURE__ */ Object.create(null);
    return super.finish();
  }
  clear() {
    this.indices.clear();
    this.dictionary.clear();
    return super.clear();
  }
  valueToKey(val) {
    return typeof val === "string" ? val : `${val}`;
  }
};

// node_modules/apache-arrow/builder/fixedsizebinary.mjs
var FixedSizeBinaryBuilder = class extends FixedWidthBuilder {
};
FixedSizeBinaryBuilder.prototype._setValue = setFixedSizeBinary;

// node_modules/apache-arrow/builder/fixedsizelist.mjs
var FixedSizeListBuilder = class extends Builder {
  setValue(index, value) {
    const [child] = this.children;
    const start = index * this.stride;
    for (let i = -1, n = this.stride; ++i < n; ) {
      child.set(start + i, value[i]);
    }
  }
  setValid(index, valid) {
    if (!super.setValid(index, valid)) {
      this.children[0].setValid((index + 1) * this.stride - 1, false);
    }
    return valid;
  }
  addChild(child, name = "0") {
    if (this.numChildren > 0) {
      throw new Error("FixedSizeListBuilder can only have one child.");
    }
    const childIndex = this.children.push(child);
    this.type = new FixedSizeList2(this.type.listSize, new Field2(name, child.type, true));
    return childIndex;
  }
};

// node_modules/apache-arrow/builder/float.mjs
var FloatBuilder = class extends FixedWidthBuilder {
  setValue(index, value) {
    this._values.set(index, value);
  }
};
var Float16Builder = class extends FloatBuilder {
  setValue(index, value) {
    super.setValue(index, float64ToUint16(value));
  }
};
var Float32Builder = class extends FloatBuilder {
};
var Float64Builder = class extends FloatBuilder {
};

// node_modules/apache-arrow/builder/interval.mjs
var IntervalBuilder = class extends FixedWidthBuilder {
};
IntervalBuilder.prototype._setValue = setIntervalValue;
var IntervalDayTimeBuilder = class extends IntervalBuilder {
};
IntervalDayTimeBuilder.prototype._setValue = setIntervalDayTime;
var IntervalYearMonthBuilder = class extends IntervalBuilder {
};
IntervalYearMonthBuilder.prototype._setValue = setIntervalYearMonth;
var IntervalMonthDayNanoBuilder = class extends IntervalBuilder {
};
IntervalMonthDayNanoBuilder.prototype._setValue = setIntervalMonthDayNano;

// node_modules/apache-arrow/builder/duration.mjs
var DurationBuilder = class extends FixedWidthBuilder {
};
DurationBuilder.prototype._setValue = setDuration;
var DurationSecondBuilder = class extends DurationBuilder {
};
DurationSecondBuilder.prototype._setValue = setDurationSecond;
var DurationMillisecondBuilder = class extends DurationBuilder {
};
DurationMillisecondBuilder.prototype._setValue = setDurationMillisecond;
var DurationMicrosecondBuilder = class extends DurationBuilder {
};
DurationMicrosecondBuilder.prototype._setValue = setDurationMicrosecond;
var DurationNanosecondBuilder = class extends DurationBuilder {
};
DurationNanosecondBuilder.prototype._setValue = setDurationNanosecond;

// node_modules/apache-arrow/builder/int.mjs
var IntBuilder = class extends FixedWidthBuilder {
  setValue(index, value) {
    this._values.set(index, value);
  }
};
var Int8Builder = class extends IntBuilder {
};
var Int16Builder = class extends IntBuilder {
};
var Int32Builder = class extends IntBuilder {
};
var Int64Builder = class extends IntBuilder {
};
var Uint8Builder = class extends IntBuilder {
};
var Uint16Builder = class extends IntBuilder {
};
var Uint32Builder = class extends IntBuilder {
};
var Uint64Builder = class extends IntBuilder {
};

// node_modules/apache-arrow/builder/list.mjs
var ListBuilder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._offsets = new OffsetsBufferBuilder(opts.type);
  }
  addChild(child, name = "0") {
    if (this.numChildren > 0) {
      throw new Error("ListBuilder can only have one child.");
    }
    this.children[this.numChildren] = child;
    this.type = new List2(new Field2(name, child.type, true));
    return this.numChildren - 1;
  }
  _flushPending(pending) {
    const offsets = this._offsets;
    const [child] = this.children;
    for (const [index, value] of pending) {
      if (typeof value === "undefined") {
        offsets.set(index, 0);
      } else {
        const v = value;
        const n = v.length;
        const start = offsets.set(index, n).buffer[index];
        for (let i = -1; ++i < n; ) {
          child.set(start + i, v[i]);
        }
      }
    }
  }
};

// node_modules/apache-arrow/builder/largelist.mjs
var LargeListBuilder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._offsets = new OffsetsBufferBuilder(opts.type);
  }
  addChild(child, name = "0") {
    if (this.numChildren > 0) {
      throw new Error("LargeListBuilder can only have one child.");
    }
    this.children[this.numChildren] = child;
    this.type = new LargeList2(new Field2(name, child.type, true));
    return this.numChildren - 1;
  }
  _flushPending(pending) {
    const offsets = this._offsets;
    const [child] = this.children;
    for (const [index, value] of pending) {
      if (typeof value === "undefined") {
        offsets.set(index, BigInt(0));
      } else {
        const v = value;
        const n = v.length;
        const start = bigIntToNumber(offsets.set(index, BigInt(n)).buffer[index]);
        for (let i = -1; ++i < n; ) {
          child.set(start + i, v[i]);
        }
      }
    }
  }
};

// node_modules/apache-arrow/builder/map.mjs
var MapBuilder = class extends VariableWidthBuilder {
  set(index, value) {
    return super.set(index, value);
  }
  setValue(index, value) {
    const row = value instanceof Map ? value : new Map(Object.entries(value));
    const pending = this._pending || (this._pending = /* @__PURE__ */ new Map());
    const current = pending.get(index);
    current && (this._pendingLength -= current.size);
    this._pendingLength += row.size;
    pending.set(index, row);
  }
  addChild(child, name = `${this.numChildren}`) {
    if (this.numChildren > 0) {
      throw new Error("ListBuilder can only have one child.");
    }
    this.children[this.numChildren] = child;
    this.type = new Map_(new Field2(name, child.type, true), this.type.keysSorted);
    return this.numChildren - 1;
  }
  _flushPending(pending) {
    const offsets = this._offsets;
    const [child] = this.children;
    for (const [index, value] of pending) {
      if (value === void 0) {
        offsets.set(index, 0);
      } else {
        let { [index]: idx, [index + 1]: end } = offsets.set(index, value.size).buffer;
        for (const val of value.entries()) {
          child.set(idx, val);
          if (++idx >= end)
            break;
        }
      }
    }
  }
};

// node_modules/apache-arrow/builder/null.mjs
var NullBuilder = class extends Builder {
  // @ts-ignore
  setValue(index, value) {
  }
  setValid(index, valid) {
    this.length = Math.max(index + 1, this.length);
    return valid;
  }
};

// node_modules/apache-arrow/builder/struct.mjs
var StructBuilder = class extends Builder {
  setValue(index, value) {
    const { children, type } = this;
    switch (Array.isArray(value) || value.constructor) {
      case true:
        return type.children.forEach((_, i) => children[i].set(index, value[i]));
      case Map:
        return type.children.forEach((f, i) => children[i].set(index, value.get(f.name)));
      default:
        return type.children.forEach((f, i) => children[i].set(index, value[f.name]));
    }
  }
  /** @inheritdoc */
  setValid(index, valid) {
    if (!super.setValid(index, valid)) {
      this.children.forEach((child) => child.setValid(index, valid));
    }
    return valid;
  }
  addChild(child, name = `${this.numChildren}`) {
    const childIndex = this.children.push(child);
    this.type = new Struct([...this.type.children, new Field2(name, child.type, true)]);
    return childIndex;
  }
};

// node_modules/apache-arrow/builder/timestamp.mjs
var TimestampBuilder = class extends FixedWidthBuilder {
};
TimestampBuilder.prototype._setValue = setTimestamp;
var TimestampSecondBuilder = class extends TimestampBuilder {
};
TimestampSecondBuilder.prototype._setValue = setTimestampSecond;
var TimestampMillisecondBuilder = class extends TimestampBuilder {
};
TimestampMillisecondBuilder.prototype._setValue = setTimestampMillisecond;
var TimestampMicrosecondBuilder = class extends TimestampBuilder {
};
TimestampMicrosecondBuilder.prototype._setValue = setTimestampMicrosecond;
var TimestampNanosecondBuilder = class extends TimestampBuilder {
};
TimestampNanosecondBuilder.prototype._setValue = setTimestampNanosecond;

// node_modules/apache-arrow/builder/time.mjs
var TimeBuilder = class extends FixedWidthBuilder {
};
TimeBuilder.prototype._setValue = setTime;
var TimeSecondBuilder = class extends TimeBuilder {
};
TimeSecondBuilder.prototype._setValue = setTimeSecond;
var TimeMillisecondBuilder = class extends TimeBuilder {
};
TimeMillisecondBuilder.prototype._setValue = setTimeMillisecond;
var TimeMicrosecondBuilder = class extends TimeBuilder {
};
TimeMicrosecondBuilder.prototype._setValue = setTimeMicrosecond;
var TimeNanosecondBuilder = class extends TimeBuilder {
};
TimeNanosecondBuilder.prototype._setValue = setTimeNanosecond;

// node_modules/apache-arrow/builder/union.mjs
var UnionBuilder = class extends Builder {
  constructor(options) {
    super(options);
    this._typeIds = new DataBufferBuilder(Int8Array, 0, 1);
    if (typeof options["valueToChildTypeId"] === "function") {
      this._valueToChildTypeId = options["valueToChildTypeId"];
    }
  }
  get typeIdToChildIndex() {
    return this.type.typeIdToChildIndex;
  }
  append(value, childTypeId) {
    return this.set(this.length, value, childTypeId);
  }
  set(index, value, childTypeId) {
    if (childTypeId === void 0) {
      childTypeId = this._valueToChildTypeId(this, value, index);
    }
    this.setValue(index, value, childTypeId);
    return this;
  }
  setValue(index, value, childTypeId) {
    this._typeIds.set(index, childTypeId);
    const childIndex = this.type.typeIdToChildIndex[childTypeId];
    const child = this.children[childIndex];
    child === null || child === void 0 ? void 0 : child.set(index, value);
    this.length = Math.max(index + 1, this.length);
  }
  addChild(child, name = `${this.children.length}`) {
    const childTypeId = this.children.push(child);
    const { type: { children, mode, typeIds } } = this;
    const fields = [...children, new Field2(name, child.type)];
    this.type = new Union_(mode, [...typeIds, childTypeId], fields);
    return childTypeId;
  }
  /** @ignore */
  // @ts-ignore
  _valueToChildTypeId(builder, value, offset) {
    throw new Error(`Cannot map UnionBuilder value to child typeId. Pass the \`childTypeId\` as the second argument to unionBuilder.append(), or supply a \`valueToChildTypeId\` function as part of the UnionBuilder constructor options.`);
  }
};
var SparseUnionBuilder = class extends UnionBuilder {
};
var DenseUnionBuilder = class extends UnionBuilder {
  constructor(options) {
    super(options);
    this._offsets = new DataBufferBuilder(Int32Array);
  }
  /** @ignore */
  setValue(index, value, childTypeId) {
    const id = this._typeIds.set(index, childTypeId).buffer[index];
    const child = this.getChildAt(this.type.typeIdToChildIndex[id]);
    const denseIndex = this._offsets.set(index, child.length).buffer[index];
    child === null || child === void 0 ? void 0 : child.set(denseIndex, value);
    this.length = Math.max(index + 1, this.length);
  }
};

// node_modules/apache-arrow/builder/utf8.mjs
var Utf8Builder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._values = new BufferBuilder(Uint8Array);
  }
  get byteLength() {
    let size = this._pendingLength + this.length * 4;
    this._offsets && (size += this._offsets.byteLength);
    this._values && (size += this._values.byteLength);
    this._nulls && (size += this._nulls.byteLength);
    return size;
  }
  setValue(index, value) {
    return super.setValue(index, encodeUtf8(value));
  }
  // @ts-ignore
  _flushPending(pending, pendingLength) {
  }
};
Utf8Builder.prototype._flushPending = BinaryBuilder.prototype._flushPending;

// node_modules/apache-arrow/builder/largeutf8.mjs
var LargeUtf8Builder = class extends VariableWidthBuilder {
  constructor(opts) {
    super(opts);
    this._values = new BufferBuilder(Uint8Array);
  }
  get byteLength() {
    let size = this._pendingLength + this.length * 4;
    this._offsets && (size += this._offsets.byteLength);
    this._values && (size += this._values.byteLength);
    this._nulls && (size += this._nulls.byteLength);
    return size;
  }
  setValue(index, value) {
    return super.setValue(index, encodeUtf8(value));
  }
  // @ts-ignore
  _flushPending(pending, pendingLength) {
  }
};
LargeUtf8Builder.prototype._flushPending = LargeBinaryBuilder.prototype._flushPending;

// node_modules/apache-arrow/builder/binaryview.mjs
var BinaryViewBuilder = class extends Builder {
  constructor(opts) {
    super(opts);
    this._variadicBuffers = [];
    this._currentBuffer = null;
    this._currentBufferIndex = 0;
    this._currentBufferOffset = 0;
    this._bufferSize = 32 * 1024 * 1024;
    this._views = new BufferBuilder(Uint8Array);
  }
  get byteLength() {
    let size = 0;
    this._views && (size += this._views.byteLength);
    this._nulls && (size += this._nulls.byteLength);
    for (const buffer of this._variadicBuffers) {
      size += buffer.byteLength;
    }
    this._currentBuffer && (size += this._currentBuffer.byteLength);
    return size;
  }
  setValue(index, value) {
    return this.writeBinaryValue(index, this.encodeValue(value));
  }
  writeBinaryValue(index, data) {
    const length = data.length;
    const bytesNeeded = (index + 1) * BinaryView2.ELEMENT_WIDTH;
    const currentBytes = this._views.length;
    if (bytesNeeded > currentBytes) {
      this._views.reserve(bytesNeeded - currentBytes);
    }
    const viewBuffer = this._views.buffer;
    const viewOffset = index * BinaryView2.ELEMENT_WIDTH;
    const view = new DataView(viewBuffer.buffer, viewBuffer.byteOffset + viewOffset, BinaryView2.ELEMENT_WIDTH);
    view.setInt32(BinaryView2.LENGTH_OFFSET, length, true);
    if (length <= BinaryView2.INLINE_CAPACITY) {
      viewBuffer.set(data, viewOffset + BinaryView2.INLINE_OFFSET);
      for (let i = length; i < BinaryView2.INLINE_CAPACITY; i++) {
        viewBuffer[viewOffset + BinaryView2.INLINE_OFFSET + i] = 0;
      }
    } else {
      const prefix = new DataView(data.buffer, data.byteOffset, Math.min(4, length));
      view.setUint32(BinaryView2.INLINE_OFFSET, prefix.getUint32(0, true), true);
      if (!this._currentBuffer || this._currentBufferOffset + length > this._bufferSize) {
        if (this._currentBuffer) {
          this._variadicBuffers.push(this._currentBuffer.buffer.slice(0, this._currentBufferOffset));
        }
        this._currentBuffer = new BufferBuilder(Uint8Array);
        this._currentBufferIndex = this._variadicBuffers.length;
        this._currentBufferOffset = 0;
      }
      const bufferData = this._currentBuffer.reserve(length).buffer;
      bufferData.set(data, this._currentBufferOffset);
      view.setInt32(BinaryView2.BUFFER_INDEX_OFFSET, this._currentBufferIndex, true);
      view.setInt32(BinaryView2.BUFFER_OFFSET_OFFSET, this._currentBufferOffset, true);
      this._currentBufferOffset += length;
    }
    return this;
  }
  encodeValue(value) {
    return toUint8Array(value);
  }
  setValid(index, isValid) {
    const bytesNeeded = (index + 1) * BinaryView2.ELEMENT_WIDTH;
    const currentBytes = this._views.length;
    if (bytesNeeded > currentBytes) {
      this._views.reserve(bytesNeeded - currentBytes);
    }
    const result = super.setValid(index, isValid);
    if (!result) {
      const viewBuffer = this._views.buffer;
      const viewOffset = index * BinaryView2.ELEMENT_WIDTH;
      for (let i = 0; i < BinaryView2.ELEMENT_WIDTH; i++) {
        viewBuffer[viewOffset + i] = 0;
      }
    }
    return result;
  }
  clear() {
    this._variadicBuffers = [];
    this._currentBuffer = null;
    this._currentBufferIndex = 0;
    this._currentBufferOffset = 0;
    this._views.clear();
    return super.clear();
  }
  flush() {
    const { type, length, nullCount, _views, _nulls } = this;
    if (this._currentBuffer && this._currentBufferOffset > 0) {
      this._variadicBuffers.push(this._currentBuffer.buffer.slice(0, this._currentBufferOffset));
      this._currentBuffer = null;
      this._currentBufferOffset = 0;
    }
    const views = _views.flush(length * BinaryView2.ELEMENT_WIDTH);
    const nullBitmap = nullCount > 0 ? _nulls.flush(length) : void 0;
    const variadicBuffers = this._variadicBuffers.slice();
    this._variadicBuffers = [];
    this._currentBufferIndex = 0;
    this.clear();
    const props = {
      type,
      length,
      nullCount,
      nullBitmap,
      ["views"]: views,
      ["variadicBuffers"]: variadicBuffers
    };
    return makeData(props);
  }
  finish() {
    this.finished = true;
    return this;
  }
};

// node_modules/apache-arrow/builder/utf8view.mjs
var Utf8ViewBuilder = class extends BinaryViewBuilder {
  constructor(opts) {
    super(opts);
  }
  setValue(index, value) {
    return this.writeBinaryValue(index, encodeUtf8(value));
  }
};

// node_modules/apache-arrow/visitor/builderctor.mjs
var GetBuilderCtor = class extends Visitor {
  visitNull() {
    return NullBuilder;
  }
  visitBool() {
    return BoolBuilder;
  }
  visitInt() {
    return IntBuilder;
  }
  visitInt8() {
    return Int8Builder;
  }
  visitInt16() {
    return Int16Builder;
  }
  visitInt32() {
    return Int32Builder;
  }
  visitInt64() {
    return Int64Builder;
  }
  visitUint8() {
    return Uint8Builder;
  }
  visitUint16() {
    return Uint16Builder;
  }
  visitUint32() {
    return Uint32Builder;
  }
  visitUint64() {
    return Uint64Builder;
  }
  visitFloat() {
    return FloatBuilder;
  }
  visitFloat16() {
    return Float16Builder;
  }
  visitFloat32() {
    return Float32Builder;
  }
  visitFloat64() {
    return Float64Builder;
  }
  visitUtf8() {
    return Utf8Builder;
  }
  visitLargeUtf8() {
    return LargeUtf8Builder;
  }
  visitBinary() {
    return BinaryBuilder;
  }
  visitLargeBinary() {
    return LargeBinaryBuilder;
  }
  visitFixedSizeBinary() {
    return FixedSizeBinaryBuilder;
  }
  visitDate() {
    return DateBuilder;
  }
  visitDateDay() {
    return DateDayBuilder;
  }
  visitDateMillisecond() {
    return DateMillisecondBuilder;
  }
  visitTimestamp() {
    return TimestampBuilder;
  }
  visitTimestampSecond() {
    return TimestampSecondBuilder;
  }
  visitTimestampMillisecond() {
    return TimestampMillisecondBuilder;
  }
  visitTimestampMicrosecond() {
    return TimestampMicrosecondBuilder;
  }
  visitTimestampNanosecond() {
    return TimestampNanosecondBuilder;
  }
  visitTime() {
    return TimeBuilder;
  }
  visitTimeSecond() {
    return TimeSecondBuilder;
  }
  visitTimeMillisecond() {
    return TimeMillisecondBuilder;
  }
  visitTimeMicrosecond() {
    return TimeMicrosecondBuilder;
  }
  visitTimeNanosecond() {
    return TimeNanosecondBuilder;
  }
  visitDecimal() {
    return DecimalBuilder;
  }
  visitList() {
    return ListBuilder;
  }
  visitLargeList() {
    return LargeListBuilder;
  }
  visitStruct() {
    return StructBuilder;
  }
  visitUnion() {
    return UnionBuilder;
  }
  visitDenseUnion() {
    return DenseUnionBuilder;
  }
  visitSparseUnion() {
    return SparseUnionBuilder;
  }
  visitDictionary() {
    return DictionaryBuilder;
  }
  visitInterval() {
    return IntervalBuilder;
  }
  visitIntervalDayTime() {
    return IntervalDayTimeBuilder;
  }
  visitIntervalYearMonth() {
    return IntervalYearMonthBuilder;
  }
  visitIntervalMonthDayNano() {
    return IntervalMonthDayNanoBuilder;
  }
  visitDuration() {
    return DurationBuilder;
  }
  visitDurationSecond() {
    return DurationSecondBuilder;
  }
  visitDurationMillisecond() {
    return DurationMillisecondBuilder;
  }
  visitDurationMicrosecond() {
    return DurationMicrosecondBuilder;
  }
  visitDurationNanosecond() {
    return DurationNanosecondBuilder;
  }
  visitFixedSizeList() {
    return FixedSizeListBuilder;
  }
  visitMap() {
    return MapBuilder;
  }
  visitBinaryView() {
    return BinaryViewBuilder;
  }
  visitUtf8View() {
    return Utf8ViewBuilder;
  }
};
var instance6 = new GetBuilderCtor();

// node_modules/apache-arrow/visitor/typecomparator.mjs
var TypeComparator = class extends Visitor {
  compareSchemas(schema, other) {
    return schema === other || other instanceof schema.constructor && this.compareManyFields(schema.fields, other.fields);
  }
  compareManyFields(fields, others) {
    return fields === others || Array.isArray(fields) && Array.isArray(others) && fields.length === others.length && fields.every((f, i) => this.compareFields(f, others[i]));
  }
  compareFields(field, other) {
    return field === other || other instanceof field.constructor && field.name === other.name && field.nullable === other.nullable && this.visit(field.type, other.type);
  }
};
function compareConstructor(type, other) {
  return other instanceof type.constructor;
}
function compareAny(type, other) {
  return type === other || compareConstructor(type, other);
}
function compareInt(type, other) {
  return type === other || compareConstructor(type, other) && type.bitWidth === other.bitWidth && type.isSigned === other.isSigned;
}
function compareFloat(type, other) {
  return type === other || compareConstructor(type, other) && type.precision === other.precision;
}
function compareFixedSizeBinary(type, other) {
  return type === other || compareConstructor(type, other) && type.byteWidth === other.byteWidth;
}
function compareDate(type, other) {
  return type === other || compareConstructor(type, other) && type.unit === other.unit;
}
function compareTimestamp(type, other) {
  return type === other || compareConstructor(type, other) && type.unit === other.unit && type.timezone === other.timezone;
}
function compareTime(type, other) {
  return type === other || compareConstructor(type, other) && type.unit === other.unit && type.bitWidth === other.bitWidth;
}
function compareList(type, other) {
  return type === other || compareConstructor(type, other) && type.children.length === other.children.length && instance7.compareManyFields(type.children, other.children);
}
function compareStruct(type, other) {
  return type === other || compareConstructor(type, other) && type.children.length === other.children.length && instance7.compareManyFields(type.children, other.children);
}
function compareUnion(type, other) {
  return type === other || compareConstructor(type, other) && type.mode === other.mode && type.typeIds.every((x, i) => x === other.typeIds[i]) && instance7.compareManyFields(type.children, other.children);
}
function compareDictionary(type, other) {
  return type === other || compareConstructor(type, other) && type.id === other.id && type.isOrdered === other.isOrdered && instance7.visit(type.indices, other.indices) && instance7.visit(type.dictionary, other.dictionary);
}
function compareInterval(type, other) {
  return type === other || compareConstructor(type, other) && type.unit === other.unit;
}
function compareDuration(type, other) {
  return type === other || compareConstructor(type, other) && type.unit === other.unit;
}
function compareFixedSizeList(type, other) {
  return type === other || compareConstructor(type, other) && type.listSize === other.listSize && type.children.length === other.children.length && instance7.compareManyFields(type.children, other.children);
}
function compareMap(type, other) {
  return type === other || compareConstructor(type, other) && type.keysSorted === other.keysSorted && type.children.length === other.children.length && instance7.compareManyFields(type.children, other.children);
}
TypeComparator.prototype.visitNull = compareAny;
TypeComparator.prototype.visitBool = compareAny;
TypeComparator.prototype.visitInt = compareInt;
TypeComparator.prototype.visitInt8 = compareInt;
TypeComparator.prototype.visitInt16 = compareInt;
TypeComparator.prototype.visitInt32 = compareInt;
TypeComparator.prototype.visitInt64 = compareInt;
TypeComparator.prototype.visitUint8 = compareInt;
TypeComparator.prototype.visitUint16 = compareInt;
TypeComparator.prototype.visitUint32 = compareInt;
TypeComparator.prototype.visitUint64 = compareInt;
TypeComparator.prototype.visitFloat = compareFloat;
TypeComparator.prototype.visitFloat16 = compareFloat;
TypeComparator.prototype.visitFloat32 = compareFloat;
TypeComparator.prototype.visitFloat64 = compareFloat;
TypeComparator.prototype.visitUtf8 = compareAny;
TypeComparator.prototype.visitLargeUtf8 = compareAny;
TypeComparator.prototype.visitUtf8View = compareAny;
TypeComparator.prototype.visitBinary = compareAny;
TypeComparator.prototype.visitLargeBinary = compareAny;
TypeComparator.prototype.visitBinaryView = compareAny;
TypeComparator.prototype.visitFixedSizeBinary = compareFixedSizeBinary;
TypeComparator.prototype.visitDate = compareDate;
TypeComparator.prototype.visitDateDay = compareDate;
TypeComparator.prototype.visitDateMillisecond = compareDate;
TypeComparator.prototype.visitTimestamp = compareTimestamp;
TypeComparator.prototype.visitTimestampSecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMillisecond = compareTimestamp;
TypeComparator.prototype.visitTimestampMicrosecond = compareTimestamp;
TypeComparator.prototype.visitTimestampNanosecond = compareTimestamp;
TypeComparator.prototype.visitTime = compareTime;
TypeComparator.prototype.visitTimeSecond = compareTime;
TypeComparator.prototype.visitTimeMillisecond = compareTime;
TypeComparator.prototype.visitTimeMicrosecond = compareTime;
TypeComparator.prototype.visitTimeNanosecond = compareTime;
TypeComparator.prototype.visitDecimal = compareAny;
TypeComparator.prototype.visitList = compareList;
TypeComparator.prototype.visitLargeList = compareList;
TypeComparator.prototype.visitStruct = compareStruct;
TypeComparator.prototype.visitUnion = compareUnion;
TypeComparator.prototype.visitDenseUnion = compareUnion;
TypeComparator.prototype.visitSparseUnion = compareUnion;
TypeComparator.prototype.visitDictionary = compareDictionary;
TypeComparator.prototype.visitInterval = compareInterval;
TypeComparator.prototype.visitIntervalDayTime = compareInterval;
TypeComparator.prototype.visitIntervalYearMonth = compareInterval;
TypeComparator.prototype.visitIntervalMonthDayNano = compareInterval;
TypeComparator.prototype.visitDuration = compareDuration;
TypeComparator.prototype.visitDurationSecond = compareDuration;
TypeComparator.prototype.visitDurationMillisecond = compareDuration;
TypeComparator.prototype.visitDurationMicrosecond = compareDuration;
TypeComparator.prototype.visitDurationNanosecond = compareDuration;
TypeComparator.prototype.visitFixedSizeList = compareFixedSizeList;
TypeComparator.prototype.visitMap = compareMap;
var instance7 = new TypeComparator();
function compareSchemas(schema, other) {
  return instance7.compareSchemas(schema, other);
}
function compareFields(field, other) {
  return instance7.compareFields(field, other);
}
function compareTypes(type, other) {
  return instance7.visit(type, other);
}

// node_modules/apache-arrow/factories.mjs
function makeBuilder(options) {
  const type = options.type;
  const builder = new (instance6.getVisitFn(type)())(options);
  if (type.children && type.children.length > 0) {
    const children = options["children"] || [];
    const defaultOptions = { "nullValues": options["nullValues"] };
    const getChildOptions = Array.isArray(children) ? ((_, i) => children[i] || defaultOptions) : (({ name }) => children[name] || defaultOptions);
    for (const [index, field] of type.children.entries()) {
      const { type: type2 } = field;
      const opts = getChildOptions(field, index);
      builder.children.push(makeBuilder(Object.assign(Object.assign({}, opts), { type: type2 })));
    }
  }
  return builder;
}

// node_modules/apache-arrow/util/recordbatch.mjs
function distributeVectorsIntoRecordBatches(schema, vecs) {
  return uniformlyDistributeChunksAcrossRecordBatches(schema, vecs.map((v) => v.data.concat()));
}
function uniformlyDistributeChunksAcrossRecordBatches(schema, cols) {
  const fields = [...schema.fields];
  const batches = [];
  const memo = { numBatches: cols.reduce((n, c) => Math.max(n, c.length), 0) };
  let numBatches = 0, batchLength = 0;
  let i = -1;
  const numColumns = cols.length;
  let child, children = [];
  while (memo.numBatches-- > 0) {
    for (batchLength = Number.POSITIVE_INFINITY, i = -1; ++i < numColumns; ) {
      children[i] = child = cols[i].shift();
      batchLength = Math.min(batchLength, child ? child.length : batchLength);
    }
    if (Number.isFinite(batchLength)) {
      children = distributeChildren(fields, batchLength, children, cols, memo);
      if (batchLength > 0) {
        batches[numBatches++] = makeData({
          type: new Struct(fields),
          length: batchLength,
          nullCount: 0,
          children: children.slice()
        });
      }
    }
  }
  return [
    schema = schema.assign(fields),
    batches.map((data) => new RecordBatch4(schema, data))
  ];
}
function distributeChildren(fields, batchLength, children, columns, memo) {
  var _a5;
  const nullBitmapSize = (batchLength + 63 & ~63) >> 3;
  for (let i = -1, n = columns.length; ++i < n; ) {
    const child = children[i];
    const length = child === null || child === void 0 ? void 0 : child.length;
    if (length >= batchLength) {
      if (length === batchLength) {
        children[i] = child;
      } else {
        children[i] = child.slice(0, batchLength);
        memo.numBatches = Math.max(memo.numBatches, columns[i].unshift(child.slice(batchLength, length - batchLength)));
      }
    } else {
      const field = fields[i];
      fields[i] = field.clone({ nullable: true });
      children[i] = (_a5 = child === null || child === void 0 ? void 0 : child._changeLengthAndBackfillNullBitmap(batchLength)) !== null && _a5 !== void 0 ? _a5 : makeData({
        type: field.type,
        length: batchLength,
        nullCount: batchLength,
        nullBitmap: new Uint8Array(nullBitmapSize)
      });
    }
  }
  return children;
}

// node_modules/apache-arrow/table.mjs
var _a3;
var kTableSymbol = Symbol.for("apache-arrow/Table");
var Table2 = class _Table {
  /**
   * Check if an object is an instance of Table.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isTable(x) {
    return (x === null || x === void 0 ? void 0 : x[kTableSymbol]) === true;
  }
  constructor(...args) {
    var _b2, _c2;
    if (args.length === 0) {
      this.batches = [];
      this.schema = new Schema3([]);
      this._offsets = [0];
      return this;
    }
    let schema;
    let offsets;
    if (args[0] instanceof Schema3) {
      schema = args.shift();
    }
    if (args.at(-1) instanceof Uint32Array) {
      offsets = args.pop();
    }
    const unwrap = (x) => {
      if (x) {
        if (x instanceof RecordBatch4) {
          return [x];
        } else if (x instanceof _Table) {
          return x.batches;
        } else if (x instanceof Data) {
          if (x.type instanceof Struct) {
            return [new RecordBatch4(new Schema3(x.type.children), x)];
          }
        } else if (Array.isArray(x)) {
          return x.flatMap((v) => unwrap(v));
        } else if (typeof x[Symbol.iterator] === "function") {
          return [...x].flatMap((v) => unwrap(v));
        } else if (typeof x === "object") {
          const keys = Object.keys(x);
          const vecs = keys.map((k) => new Vector([x[k]]));
          const batchSchema = schema !== null && schema !== void 0 ? schema : new Schema3(keys.map((k, i) => new Field2(String(k), vecs[i].type, vecs[i].nullable)));
          const [, batches2] = distributeVectorsIntoRecordBatches(batchSchema, vecs);
          return batches2.length === 0 ? [new RecordBatch4(x)] : batches2;
        }
      }
      return [];
    };
    const batches = args.flatMap((v) => unwrap(v));
    schema = (_c2 = schema !== null && schema !== void 0 ? schema : (_b2 = batches[0]) === null || _b2 === void 0 ? void 0 : _b2.schema) !== null && _c2 !== void 0 ? _c2 : new Schema3([]);
    if (!(schema instanceof Schema3)) {
      throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
    }
    for (const batch of batches) {
      if (!(batch instanceof RecordBatch4)) {
        throw new TypeError("Table constructor expects a [Schema, RecordBatch[]] pair.");
      }
      if (!compareSchemas(schema, batch.schema)) {
        throw new TypeError("Table and inner RecordBatch schemas must be equivalent.");
      }
    }
    this.schema = schema;
    this.batches = batches;
    this._offsets = offsets !== null && offsets !== void 0 ? offsets : computeChunkOffsets(this.data);
  }
  /**
   * The contiguous {@link RecordBatch `RecordBatch`} chunks of the Table rows.
   */
  get data() {
    return this.batches.map(({ data }) => data);
  }
  /**
   * The number of columns in this Table.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this Table.
   */
  get numRows() {
    return this.data.reduce((numRows, data) => numRows + data.length, 0);
  }
  /**
   * The number of null rows in this Table.
   */
  get nullCount() {
    if (this._nullCount === -1) {
      this._nullCount = computeChunkNullCounts(this.data);
    }
    return this._nullCount;
  }
  /**
   * Check whether an element is null.
   *
   * @param index The index at which to read the validity bitmap.
   */
  // @ts-ignore
  isValid(index) {
    return false;
  }
  /**
   * Get an element value by position.
   *
   * @param index The index of the element to read.
   */
  // @ts-ignore
  get(index) {
    return null;
  }
  /**
    * Get an element value by position.
    * @param index The index of the element to read. A negative index will count back from the last element.
    */
  // @ts-ignore
  at(index) {
    return this.get(wrapIndex(index, this.numRows));
  }
  /**
   * Set an element value by position.
   *
   * @param index The index of the element to write.
   * @param value The value to set.
   */
  // @ts-ignore
  set(index, value) {
    return;
  }
  /**
   * Retrieve the index of the first occurrence of a value in an Vector.
   *
   * @param element The value to locate in the Vector.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  // @ts-ignore
  indexOf(element, offset) {
    return -1;
  }
  /**
   * Iterator for rows in this Table.
   */
  [Symbol.iterator]() {
    if (this.batches.length > 0) {
      return instance4.visit(new Vector(this.data));
    }
    return new Array(0)[Symbol.iterator]();
  }
  /**
   * Return a JavaScript Array of the Table rows.
   *
   * @returns An Array of Table rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Returns a string representation of the Table rows.
   *
   * @returns A string representation of the Table rows.
   */
  toString() {
    return `[
  ${this.toArray().join(",\n  ")}
]`;
  }
  /**
   * Combines two or more Tables of the same schema.
   *
   * @param others Additional Tables to add to the end of this Tables.
   */
  concat(...others) {
    const schema = this.schema;
    const data = this.data.concat(others.flatMap(({ data: data2 }) => data2));
    return new _Table(schema, data.map((data2) => new RecordBatch4(schema, data2)));
  }
  /**
   * Return a zero-copy sub-section of this Table.
   *
   * @param begin The beginning of the specified portion of the Table.
   * @param end The end of the specified portion of the Table. This is exclusive of the element at the index 'end'.
   */
  slice(begin, end) {
    const schema = this.schema;
    [begin, end] = clampRange({ length: this.numRows }, begin, end);
    const data = sliceChunks(this.data, this._offsets, begin, end);
    return new _Table(schema, data.map((chunk) => new RecordBatch4(schema, chunk)));
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   *
   * @param name The name of the child to retrieve.
   */
  getChild(name) {
    return this.getChildAt(this.schema.fields.findIndex((f) => f.name === name));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   *
   * @param index The index of the child to retrieve.
   */
  getChildAt(index) {
    if (index > -1 && index < this.schema.fields.length) {
      const data = this.data.map((data2) => data2.children[index]);
      if (data.length === 0) {
        const { type } = this.schema.fields[index];
        const empty = makeData({ type, length: 0, nullCount: 0 });
        data.push(empty._changeLengthAndBackfillNullBitmap(this.numRows));
      }
      return new Vector(data);
    }
    return null;
  }
  /**
   * Sets a child Vector by name.
   *
   * @param name The name of the child to overwrite.
   * @returns A new Table with the supplied child for the specified name.
   */
  setChild(name, child) {
    var _b2;
    return this.setChildAt((_b2 = this.schema.fields) === null || _b2 === void 0 ? void 0 : _b2.findIndex((f) => f.name === name), child);
  }
  setChildAt(index, child) {
    let schema = this.schema;
    let batches = [...this.batches];
    if (index > -1 && index < this.numCols) {
      if (!child) {
        child = new Vector([makeData({ type: new Null2(), length: this.numRows })]);
      }
      const fields = schema.fields.slice();
      const field = fields[index].clone({ type: child.type });
      const children = this.schema.fields.map((_, i) => this.getChildAt(i));
      [fields[index], children[index]] = [field, child];
      [schema, batches] = distributeVectorsIntoRecordBatches(schema, children);
    }
    return new _Table(schema, batches);
  }
  /**
   * Construct a new Table containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new Table of columns matching the specified names.
   */
  select(columnNames) {
    const nameToIndex = this.schema.fields.reduce((m, f, i) => m.set(f.name, i), /* @__PURE__ */ new Map());
    return this.selectAt(columnNames.map((columnName) => nameToIndex.get(columnName)).filter((x) => x > -1));
  }
  /**
   * Construct a new Table containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new Table of columns at the specified indices.
   */
  selectAt(columnIndices) {
    const schema = this.schema.selectAt(columnIndices);
    const data = this.batches.map((batch) => batch.selectAt(columnIndices));
    return new _Table(schema, data);
  }
  assign(other) {
    const fields = this.schema.fields;
    const [indices, oldToNew] = other.schema.fields.reduce((memo, f2, newIdx) => {
      const [indices2, oldToNew2] = memo;
      const i = fields.findIndex((f) => f.name === f2.name);
      ~i ? oldToNew2[i] = newIdx : indices2.push(newIdx);
      return memo;
    }, [[], []]);
    const schema = this.schema.assign(other.schema);
    const columns = [
      ...fields.map((_, i) => [i, oldToNew[i]]).map(([i, j]) => j === void 0 ? this.getChildAt(i) : other.getChildAt(j)),
      ...indices.map((i) => other.getChildAt(i))
    ].filter(Boolean);
    return new _Table(...distributeVectorsIntoRecordBatches(schema, columns));
  }
};
_a3 = Symbol.toStringTag;
Table2[_a3] = ((proto) => {
  proto.schema = null;
  proto.batches = [];
  proto._offsets = new Uint32Array([0]);
  proto._nullCount = -1;
  proto[Symbol.isConcatSpreadable] = true;
  proto[kTableSymbol] = true;
  proto["isValid"] = wrapChunkedCall1(isChunkedValid);
  proto["get"] = wrapChunkedCall1(instance2.getVisitFn(Type2.Struct));
  proto["set"] = wrapChunkedCall2(instance.getVisitFn(Type2.Struct));
  proto["indexOf"] = wrapChunkedIndexOf(instance3.getVisitFn(Type2.Struct));
  return "Table";
})(Table2.prototype);
Object.defineProperty(Table2, Symbol.hasInstance, {
  value: function isTableInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === Table2 && Table2.isTable(instance8);
  }
});

// node_modules/apache-arrow/recordbatch.mjs
var _a4;
var kRecordBatchSymbol = Symbol.for("apache-arrow/RecordBatch");
var RecordBatch4 = class _RecordBatch {
  /**
   * Check if an object is an instance of RecordBatch.
   * This works across different instances of the Arrow library.
   */
  /** @nocollapse */
  static isRecordBatch(x) {
    return (x === null || x === void 0 ? void 0 : x[kRecordBatchSymbol]) === true;
  }
  constructor(...args) {
    switch (args.length) {
      case 3:
      case 2: {
        [this.schema] = args;
        if (!(this.schema instanceof Schema3)) {
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        }
        [
          ,
          this.data = makeData({
            nullCount: 0,
            type: new Struct(this.schema.fields),
            children: this.schema.fields.map((f) => makeData({ type: f.type, nullCount: 0 }))
          }),
          this._metadata = /* @__PURE__ */ new Map()
        ] = args;
        if (!(this.data instanceof Data)) {
          throw new TypeError("RecordBatch constructor expects a [Schema, Data] pair.");
        }
        [this.schema, this.data] = ensureSameLengthData(this.schema, this.data.children, this.data.length);
        break;
      }
      case 1: {
        const [obj] = args;
        const { fields, children, length } = Object.keys(obj).reduce((memo, name, i) => {
          memo.children[i] = obj[name];
          memo.length = Math.max(memo.length, obj[name].length);
          memo.fields[i] = Field2.new({ name, type: obj[name].type, nullable: true });
          return memo;
        }, {
          length: 0,
          fields: new Array(),
          children: new Array()
        });
        const schema = new Schema3(fields);
        const data = makeData({ type: new Struct(fields), length, children, nullCount: 0 });
        [this.schema, this.data] = ensureSameLengthData(schema, data.children, length);
        this._metadata = /* @__PURE__ */ new Map();
        break;
      }
      default:
        throw new TypeError("RecordBatch constructor expects an Object mapping names to child Data, or a [Schema, Data] pair.");
    }
  }
  /**
   * Custom metadata for this RecordBatch.
   */
  get metadata() {
    return this._metadata;
  }
  get dictionaries() {
    return this._dictionaries || (this._dictionaries = collectDictionaries(this.schema.fields, this.data.children));
  }
  /**
   * The number of columns in this RecordBatch.
   */
  get numCols() {
    return this.schema.fields.length;
  }
  /**
   * The number of rows in this RecordBatch.
   */
  get numRows() {
    return this.data.length;
  }
  /**
   * The number of null rows in this RecordBatch.
   */
  get nullCount() {
    return this.data.nullCount;
  }
  /**
   * Check whether an row is null.
   * @param index The index at which to read the validity bitmap.
   */
  isValid(index) {
    return this.data.getValid(index);
  }
  /**
   * Get a row by position.
   * @param index The index of the row to read.
   */
  get(index) {
    return instance2.visit(this.data, index);
  }
  /**
    * Get a row value by position.
    * @param index The index of the row to read. A negative index will count back from the last row.
    */
  at(index) {
    return this.get(wrapIndex(index, this.numRows));
  }
  /**
   * Set a row by position.
   * @param index The index of the row to write.
   * @param value The value to set.
   */
  set(index, value) {
    return instance.visit(this.data, index, value);
  }
  /**
   * Retrieve the index of the first occurrence of a row in an RecordBatch.
   * @param element The row to locate in the RecordBatch.
   * @param offset The index at which to begin the search. If offset is omitted, the search starts at index 0.
   */
  indexOf(element, offset) {
    return instance3.visit(this.data, element, offset);
  }
  /**
   * Iterator for rows in this RecordBatch.
   */
  [Symbol.iterator]() {
    return instance4.visit(new Vector([this.data]));
  }
  /**
   * Return a JavaScript Array of the RecordBatch rows.
   * @returns An Array of RecordBatch rows.
   */
  toArray() {
    return [...this];
  }
  /**
   * Combines two or more RecordBatch of the same schema.
   * @param others Additional RecordBatch to add to the end of this RecordBatch.
   */
  concat(...others) {
    return new Table2(this.schema, [this, ...others]);
  }
  /**
   * Return a zero-copy sub-section of this RecordBatch.
   * @param start The beginning of the specified portion of the RecordBatch.
   * @param end The end of the specified portion of the RecordBatch. This is exclusive of the row at the index 'end'.
   */
  slice(begin, end) {
    const [slice] = new Vector([this.data]).slice(begin, end).data;
    return new _RecordBatch(this.schema, slice, this._metadata);
  }
  /**
   * Returns a child Vector by name, or null if this Vector has no child with the given name.
   * @param name The name of the child to retrieve.
   */
  getChild(name) {
    var _b2;
    return this.getChildAt((_b2 = this.schema.fields) === null || _b2 === void 0 ? void 0 : _b2.findIndex((f) => f.name === name));
  }
  /**
   * Returns a child Vector by index, or null if this Vector has no child at the supplied index.
   * @param index The index of the child to retrieve.
   */
  getChildAt(index) {
    if (index > -1 && index < this.schema.fields.length) {
      return new Vector([this.data.children[index]]);
    }
    return null;
  }
  /**
   * Sets a child Vector by name.
   * @param name The name of the child to overwrite.
   * @returns A new RecordBatch with the new child for the specified name.
   */
  setChild(name, child) {
    var _b2;
    return this.setChildAt((_b2 = this.schema.fields) === null || _b2 === void 0 ? void 0 : _b2.findIndex((f) => f.name === name), child);
  }
  setChildAt(index, child) {
    let schema = this.schema;
    let data = this.data;
    if (index > -1 && index < this.numCols) {
      if (!child) {
        child = new Vector([makeData({ type: new Null2(), length: this.numRows })]);
      }
      const fields = schema.fields.slice();
      const children = data.children.slice();
      const field = fields[index].clone({ type: child.type });
      [fields[index], children[index]] = [field, child.data[0]];
      schema = new Schema3(fields, new Map(this.schema.metadata));
      data = makeData({ type: new Struct(fields), length: data.length, children });
    }
    return new _RecordBatch(schema, data, this._metadata);
  }
  /**
   * Construct a new RecordBatch containing only specified columns.
   *
   * @param columnNames Names of columns to keep.
   * @returns A new RecordBatch of columns matching the specified names.
   */
  select(columnNames) {
    const schema = this.schema.select(columnNames);
    const type = new Struct(schema.fields);
    const children = [];
    for (const name of columnNames) {
      const index = this.schema.fields.findIndex((f) => f.name === name);
      if (~index) {
        children[index] = this.data.children[index];
      }
    }
    return new _RecordBatch(schema, makeData({ type, length: this.numRows, children }), this._metadata);
  }
  /**
   * Construct a new RecordBatch containing only columns at the specified indices.
   *
   * @param columnIndices Indices of columns to keep.
   * @returns A new RecordBatch of columns matching at the specified indices.
   */
  selectAt(columnIndices) {
    const schema = this.schema.selectAt(columnIndices);
    const children = columnIndices.map((i) => this.data.children[i]).filter(Boolean);
    const subset = makeData({ type: new Struct(schema.fields), length: this.numRows, children });
    return new _RecordBatch(schema, subset, this._metadata);
  }
};
_a4 = Symbol.toStringTag;
RecordBatch4[_a4] = ((proto) => {
  proto._nullCount = -1;
  proto[Symbol.isConcatSpreadable] = true;
  proto[kRecordBatchSymbol] = true;
  return "RecordBatch";
})(RecordBatch4.prototype);
Object.defineProperty(RecordBatch4, Symbol.hasInstance, {
  value: function isRecordBatchInstance(instance8) {
    return Function.prototype[Symbol.hasInstance].call(this, instance8) || this === RecordBatch4 && RecordBatch4.isRecordBatch(instance8);
  }
});
function ensureSameLengthData(schema, chunks, maxLength = chunks.reduce((max, col) => Math.max(max, col.length), 0)) {
  var _b2;
  const fields = [...schema.fields];
  const children = [...chunks];
  const nullBitmapSize = (maxLength + 63 & ~63) >> 3;
  for (const [idx, field] of schema.fields.entries()) {
    const chunk = chunks[idx];
    if (!chunk || chunk.length !== maxLength) {
      fields[idx] = field.clone({ nullable: true });
      children[idx] = (_b2 = chunk === null || chunk === void 0 ? void 0 : chunk._changeLengthAndBackfillNullBitmap(maxLength)) !== null && _b2 !== void 0 ? _b2 : makeData({
        type: field.type,
        length: maxLength,
        nullCount: maxLength,
        nullBitmap: new Uint8Array(nullBitmapSize)
      });
    }
  }
  return [
    schema.assign(fields),
    makeData({ type: new Struct(fields), length: maxLength, children })
  ];
}
function collectDictionaries(fields, children, dictionaries = /* @__PURE__ */ new Map()) {
  var _b2, _c2;
  if (((_b2 = fields === null || fields === void 0 ? void 0 : fields.length) !== null && _b2 !== void 0 ? _b2 : 0) > 0 && (fields === null || fields === void 0 ? void 0 : fields.length) === (children === null || children === void 0 ? void 0 : children.length)) {
    for (let i = -1, n = fields.length; ++i < n; ) {
      const { type } = fields[i];
      const data = children[i];
      for (const next of [data, ...((_c2 = data === null || data === void 0 ? void 0 : data.dictionary) === null || _c2 === void 0 ? void 0 : _c2.data) || []]) {
        collectDictionaries(type.children, next === null || next === void 0 ? void 0 : next.children, dictionaries);
      }
      if (DataType.isDictionary(type)) {
        const { id } = type;
        if (!dictionaries.has(id)) {
          if (data === null || data === void 0 ? void 0 : data.dictionary) {
            dictionaries.set(id, data.dictionary);
          }
        } else if (dictionaries.get(id) !== data.dictionary) {
          throw new Error(`Cannot create Schema containing two different dictionaries with the same Id`);
        }
      }
    }
  }
  return dictionaries;
}
var _InternalEmptyPlaceholderRecordBatch = class extends RecordBatch4 {
  constructor(schema, metadata) {
    const children = schema.fields.map((f) => makeData({ type: f.type }));
    const data = makeData({ type: new Struct(schema.fields), length: 0, nullCount: 0, children });
    super(schema, data, metadata || /* @__PURE__ */ new Map());
  }
};

// node_modules/apache-arrow/ipc/message.mjs
var import_flatbuffers = __toESM(require_flatbuffers(), 1);
var invalidMessageType = (type) => `Expected ${MessageHeader[type]} Message in stream, but was null or length 0.`;
var nullMessage = (type) => `Header pointer of flatbuffer-encoded ${MessageHeader[type]} Message is null or length 0.`;
var invalidMessageMetadata = (expected, actual) => `Expected to read ${expected} metadata bytes, but only read ${actual}.`;
var invalidMessageBodyLength = (expected, actual) => `Expected to read ${expected} bytes for message body, but only read ${actual}.`;
var MessageReader = class {
  constructor(source) {
    this.source = source instanceof ByteStream ? source : new ByteStream(source);
  }
  [Symbol.iterator]() {
    return this;
  }
  next() {
    let r;
    if ((r = this.readMetadataLength()).done) {
      return ITERATOR_DONE;
    }
    if (r.value === -1 && (r = this.readMetadataLength()).done) {
      return ITERATOR_DONE;
    }
    if ((r = this.readMetadata(r.value)).done) {
      return ITERATOR_DONE;
    }
    return r;
  }
  throw(value) {
    return this.source.throw(value);
  }
  return(value) {
    return this.source.return(value);
  }
  readMessage(type) {
    let r;
    if ((r = this.next()).done) {
      return null;
    }
    if (type != null && r.value.headerType !== type) {
      throw new Error(invalidMessageType(type));
    }
    return r.value;
  }
  readMessageBody(bodyLength) {
    if (bodyLength <= 0) {
      return new Uint8Array(0);
    }
    const buf = toUint8Array(this.source.read(bodyLength));
    if (buf.byteLength < bodyLength) {
      throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
    }
    return (
      /* 1. */
      buf.byteOffset % 8 === 0 && /* 2. */
      buf.byteOffset + buf.byteLength <= buf.buffer.byteLength ? buf : buf.slice()
    );
  }
  readSchema(throwIfNull = false) {
    const type = MessageHeader.Schema;
    const message = this.readMessage(type);
    const schema = message === null || message === void 0 ? void 0 : message.header();
    if (throwIfNull && !schema) {
      throw new Error(nullMessage(type));
    }
    return schema;
  }
  readMetadataLength() {
    const buf = this.source.read(PADDING);
    const bb = buf && new import_flatbuffers.ByteBuffer(buf);
    const len = (bb === null || bb === void 0 ? void 0 : bb.readInt32(0)) || 0;
    return { done: len === 0, value: len };
  }
  readMetadata(metadataLength) {
    const buf = this.source.read(metadataLength);
    if (!buf) {
      return ITERATOR_DONE;
    }
    if (buf.byteLength < metadataLength) {
      throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
    }
    return { done: false, value: Message2.decode(buf) };
  }
};
var AsyncMessageReader = class {
  constructor(source, byteLength) {
    this.source = source instanceof AsyncByteStream ? source : isFileHandle(source) ? new AsyncRandomAccessFile(source, byteLength) : new AsyncByteStream(source);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  next() {
    return __awaiter(this, void 0, void 0, function* () {
      let r;
      if ((r = yield this.readMetadataLength()).done) {
        return ITERATOR_DONE;
      }
      if (r.value === -1 && (r = yield this.readMetadataLength()).done) {
        return ITERATOR_DONE;
      }
      if ((r = yield this.readMetadata(r.value)).done) {
        return ITERATOR_DONE;
      }
      return r;
    });
  }
  throw(value) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.source.throw(value);
    });
  }
  return(value) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.source.return(value);
    });
  }
  readMessage(type) {
    return __awaiter(this, void 0, void 0, function* () {
      let r;
      if ((r = yield this.next()).done) {
        return null;
      }
      if (type != null && r.value.headerType !== type) {
        throw new Error(invalidMessageType(type));
      }
      return r.value;
    });
  }
  readMessageBody(bodyLength) {
    return __awaiter(this, void 0, void 0, function* () {
      if (bodyLength <= 0) {
        return new Uint8Array(0);
      }
      const buf = toUint8Array(yield this.source.read(bodyLength));
      if (buf.byteLength < bodyLength) {
        throw new Error(invalidMessageBodyLength(bodyLength, buf.byteLength));
      }
      return (
        /* 1. */
        buf.byteOffset % 8 === 0 && /* 2. */
        buf.byteOffset + buf.byteLength <= buf.buffer.byteLength ? buf : buf.slice()
      );
    });
  }
  readSchema() {
    return __awaiter(this, arguments, void 0, function* (throwIfNull = false) {
      const type = MessageHeader.Schema;
      const message = yield this.readMessage(type);
      const schema = message === null || message === void 0 ? void 0 : message.header();
      if (throwIfNull && !schema) {
        throw new Error(nullMessage(type));
      }
      return schema;
    });
  }
  readMetadataLength() {
    return __awaiter(this, void 0, void 0, function* () {
      const buf = yield this.source.read(PADDING);
      const bb = buf && new import_flatbuffers.ByteBuffer(buf);
      const len = (bb === null || bb === void 0 ? void 0 : bb.readInt32(0)) || 0;
      return { done: len === 0, value: len };
    });
  }
  readMetadata(metadataLength) {
    return __awaiter(this, void 0, void 0, function* () {
      const buf = yield this.source.read(metadataLength);
      if (!buf) {
        return ITERATOR_DONE;
      }
      if (buf.byteLength < metadataLength) {
        throw new Error(invalidMessageMetadata(metadataLength, buf.byteLength));
      }
      return { done: false, value: Message2.decode(buf) };
    });
  }
};
var JSONMessageReader = class extends MessageReader {
  constructor(source) {
    super(new Uint8Array(0));
    this._schema = false;
    this._body = [];
    this._batchIndex = 0;
    this._dictionaryIndex = 0;
    this._json = source instanceof ArrowJSON ? source : new ArrowJSON(source);
  }
  next() {
    const { _json } = this;
    if (!this._schema) {
      this._schema = true;
      const message = Message2.fromJSON(_json.schema, MessageHeader.Schema);
      return { done: false, value: message };
    }
    if (this._dictionaryIndex < _json.dictionaries.length) {
      const batch = _json.dictionaries[this._dictionaryIndex++];
      this._body = batch["data"]["columns"];
      const message = Message2.fromJSON(batch, MessageHeader.DictionaryBatch);
      return { done: false, value: message };
    }
    if (this._batchIndex < _json.batches.length) {
      const batch = _json.batches[this._batchIndex++];
      this._body = batch["columns"];
      const message = Message2.fromJSON(batch, MessageHeader.RecordBatch);
      return { done: false, value: message };
    }
    this._body = [];
    return ITERATOR_DONE;
  }
  readMessageBody(_bodyLength) {
    return flattenDataSources(this._body);
    function flattenDataSources(xs) {
      return (xs || []).reduce((buffers, column) => [
        ...buffers,
        ...column["VALIDITY"] && [column["VALIDITY"]] || [],
        ...column["TYPE_ID"] && [column["TYPE_ID"]] || [],
        ...column["OFFSET"] && [column["OFFSET"]] || [],
        ...column["DATA"] && [column["DATA"]] || [],
        ...column["VIEWS"] && [column["VIEWS"]] || [],
        ...column["VARIADIC_DATA_BUFFERS"] || [],
        ...flattenDataSources(column["children"])
      ], []);
    }
  }
  readMessage(type) {
    let r;
    if ((r = this.next()).done) {
      return null;
    }
    if (type != null && r.value.headerType !== type) {
      throw new Error(invalidMessageType(type));
    }
    return r.value;
  }
  readSchema() {
    const type = MessageHeader.Schema;
    const message = this.readMessage(type);
    const schema = message === null || message === void 0 ? void 0 : message.header();
    if (!message || !schema) {
      throw new Error(nullMessage(type));
    }
    return schema;
  }
};
var PADDING = 4;
var MAGIC_STR = "ARROW1";
var MAGIC = new Uint8Array(MAGIC_STR.length);
for (let i = 0; i < MAGIC_STR.length; i += 1) {
  MAGIC[i] = MAGIC_STR.codePointAt(i);
}
function checkForMagicArrowString(buffer, index = 0) {
  for (let i = -1, n = MAGIC.length; ++i < n; ) {
    if (MAGIC[i] !== buffer[index + i]) {
      return false;
    }
  }
  return true;
}
var magicLength = MAGIC.length;
var magicAndPadding = magicLength + PADDING;
var magicX2AndPadding = magicLength * 2 + PADDING;

// node_modules/apache-arrow/ipc/compression/validators.mjs
var Lz4FrameValidator = class {
  constructor() {
    this.LZ4_FRAME_MAGIC = new Uint8Array([4, 34, 77, 24]);
    this.MIN_HEADER_LENGTH = 7;
  }
  isValidCodecEncode(codec) {
    const testData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const compressed = codec.encode(testData);
    return this._isValidCompressed(compressed);
  }
  _isValidCompressed(buffer) {
    return this._hasMinimumLength(buffer) && this._hasValidMagicNumber(buffer) && this._hasValidVersion(buffer);
  }
  _hasMinimumLength(buffer) {
    return buffer.length >= this.MIN_HEADER_LENGTH;
  }
  _hasValidMagicNumber(buffer) {
    return this.LZ4_FRAME_MAGIC.every((byte, i) => buffer[i] === byte);
  }
  _hasValidVersion(buffer) {
    const flg = buffer[4];
    const versionBits = (flg & 192) >> 6;
    return versionBits === 1;
  }
};
var ZstdValidator = class {
  constructor() {
    this.ZSTD_MAGIC = new Uint8Array([40, 181, 47, 253]);
    this.MIN_HEADER_LENGTH = 6;
  }
  isValidCodecEncode(codec) {
    const testData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const compressed = codec.encode(testData);
    return this._isValidCompressed(compressed);
  }
  _isValidCompressed(buffer) {
    return this._hasMinimumLength(buffer) && this._hasValidMagicNumber(buffer);
  }
  _hasMinimumLength(buffer) {
    return buffer.length >= this.MIN_HEADER_LENGTH;
  }
  _hasValidMagicNumber(buffer) {
    return this.ZSTD_MAGIC.every((byte, i) => buffer[i] === byte);
  }
};
var compressionValidators = {
  [CompressionType.LZ4_FRAME]: new Lz4FrameValidator(),
  [CompressionType.ZSTD]: new ZstdValidator()
};

// node_modules/apache-arrow/ipc/compression/registry.mjs
var _CompressionRegistry = class {
  constructor() {
    this.registry = {};
  }
  set(compression, codec) {
    if ((codec === null || codec === void 0 ? void 0 : codec.encode) && typeof codec.encode === "function" && !compressionValidators[compression].isValidCodecEncode(codec)) {
      throw new Error(`Encoder for ${CompressionType[compression]} is not valid.`);
    }
    this.registry[compression] = codec;
  }
  get(compression) {
    var _a5;
    return ((_a5 = this.registry) === null || _a5 === void 0 ? void 0 : _a5[compression]) || null;
  }
};
var compressionRegistry = new _CompressionRegistry();

// node_modules/apache-arrow/ipc/reader.mjs
var flatbuffers35 = __toESM(require_flatbuffers(), 1);

// node_modules/apache-arrow/ipc/compression/constants.mjs
var LENGTH_NO_COMPRESSED_DATA = -1;
var COMPRESS_LENGTH_PREFIX = 8;

// node_modules/apache-arrow/ipc/reader.mjs
var RecordBatchReader = class _RecordBatchReader extends ReadableInterop {
  constructor(impl) {
    super();
    this._impl = impl;
  }
  get closed() {
    return this._impl.closed;
  }
  get schema() {
    return this._impl.schema;
  }
  get autoDestroy() {
    return this._impl.autoDestroy;
  }
  get dictionaries() {
    return this._impl.dictionaries;
  }
  get numDictionaries() {
    return this._impl.numDictionaries;
  }
  get numRecordBatches() {
    return this._impl.numRecordBatches;
  }
  get footer() {
    return this._impl.isFile() ? this._impl.footer : null;
  }
  isSync() {
    return this._impl.isSync();
  }
  isAsync() {
    return this._impl.isAsync();
  }
  isFile() {
    return this._impl.isFile();
  }
  isStream() {
    return this._impl.isStream();
  }
  next() {
    return this._impl.next();
  }
  throw(value) {
    return this._impl.throw(value);
  }
  return(value) {
    return this._impl.return(value);
  }
  cancel() {
    return this._impl.cancel();
  }
  reset(schema) {
    this._impl.reset(schema);
    this._DOMStream = void 0;
    this._nodeStream = void 0;
    return this;
  }
  open(options) {
    const opening = this._impl.open(options);
    return isPromise(opening) ? opening.then(() => this) : this;
  }
  readRecordBatch(index) {
    return this._impl.isFile() ? this._impl.readRecordBatch(index) : null;
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
  toDOMStream() {
    return adapters_default.toDOMStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this });
  }
  toNodeStream() {
    return adapters_default.toNodeStream(this.isSync() ? { [Symbol.iterator]: () => this } : { [Symbol.asyncIterator]: () => this }, { objectMode: true });
  }
  /** @nocollapse */
  // @ts-ignore
  static throughNode(options) {
    throw new Error(`"throughNode" not available in this environment`);
  }
  /** @nocollapse */
  static throughDOM(writableStrategy, readableStrategy) {
    throw new Error(`"throughDOM" not available in this environment`);
  }
  /** @nocollapse */
  static from(source) {
    if (source instanceof _RecordBatchReader) {
      return source;
    } else if (isArrowJSON(source)) {
      return fromArrowJSON(source);
    } else if (isFileHandle(source)) {
      return fromFileHandle(source);
    } else if (isPromise(source)) {
      return (() => __awaiter(this, void 0, void 0, function* () {
        return yield _RecordBatchReader.from(yield source);
      }))();
    } else if (isFetchResponse(source) || isReadableDOMStream(source) || isReadableNodeStream(source) || isAsyncIterable(source)) {
      return fromAsyncByteStream(new AsyncByteStream(source));
    }
    return fromByteStream(new ByteStream(source));
  }
  /** @nocollapse */
  static readAll(source) {
    if (source instanceof _RecordBatchReader) {
      return source.isSync() ? readAllSync(source) : readAllAsync(source);
    } else if (isArrowJSON(source) || ArrayBuffer.isView(source) || isIterable(source) || isIteratorResult(source)) {
      return readAllSync(source);
    }
    return readAllAsync(source);
  }
};
var RecordBatchStreamReader = class extends RecordBatchReader {
  constructor(_impl) {
    super(_impl);
    this._impl = _impl;
  }
  readAll() {
    return [...this];
  }
  [Symbol.iterator]() {
    return this._impl[Symbol.iterator]();
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, arguments, function* _a5() {
      yield __await(yield* __asyncDelegator(__asyncValues(this[Symbol.iterator]())));
    });
  }
};
var AsyncRecordBatchStreamReader = class extends RecordBatchReader {
  constructor(_impl) {
    super(_impl);
    this._impl = _impl;
  }
  readAll() {
    return __awaiter(this, void 0, void 0, function* () {
      var _a5, e_1, _b2, _c2;
      const batches = new Array();
      try {
        for (var _d2 = true, _e2 = __asyncValues(this), _f2; _f2 = yield _e2.next(), _a5 = _f2.done, !_a5; _d2 = true) {
          _c2 = _f2.value;
          _d2 = false;
          const batch = _c2;
          batches.push(batch);
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (!_d2 && !_a5 && (_b2 = _e2.return)) yield _b2.call(_e2);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
      return batches;
    });
  }
  [Symbol.iterator]() {
    throw new Error(`AsyncRecordBatchStreamReader is not Iterable`);
  }
  [Symbol.asyncIterator]() {
    return this._impl[Symbol.asyncIterator]();
  }
};
var RecordBatchFileReader = class extends RecordBatchStreamReader {
  constructor(_impl) {
    super(_impl);
    this._impl = _impl;
  }
};
var AsyncRecordBatchFileReader = class extends AsyncRecordBatchStreamReader {
  constructor(_impl) {
    super(_impl);
    this._impl = _impl;
  }
};
var RecordBatchReaderImpl = class {
  get numDictionaries() {
    return this._dictionaryIndex;
  }
  get numRecordBatches() {
    return this._recordBatchIndex;
  }
  constructor(dictionaries = /* @__PURE__ */ new Map()) {
    this.closed = false;
    this.autoDestroy = true;
    this._dictionaryIndex = 0;
    this._recordBatchIndex = 0;
    this.dictionaries = dictionaries;
  }
  isSync() {
    return false;
  }
  isAsync() {
    return false;
  }
  isFile() {
    return false;
  }
  isStream() {
    return false;
  }
  reset(schema) {
    this._dictionaryIndex = 0;
    this._recordBatchIndex = 0;
    this.schema = schema;
    this.dictionaries = /* @__PURE__ */ new Map();
    return this;
  }
  _loadRecordBatch(header, body, messageMetadata) {
    let children;
    if (header.compression != null) {
      const codec = compressionRegistry.get(header.compression.type);
      if ((codec === null || codec === void 0 ? void 0 : codec.decode) && typeof codec.decode === "function") {
        const { decommpressedBody, buffers } = this._decompressBuffers(header, body, codec);
        children = this._loadCompressedVectors(header, decommpressedBody, this.schema.fields);
        header = new RecordBatch3(header.length, header.nodes, buffers, null);
      } else {
        throw new Error("Record batch is compressed but codec not found");
      }
    } else {
      children = this._loadVectors(header, body, this.schema.fields);
    }
    const data = makeData({ type: new Struct(this.schema.fields), length: header.length, children });
    return new RecordBatch4(this.schema, data, messageMetadata);
  }
  _loadDictionaryBatch(header, body) {
    const { id, isDelta } = header;
    const { dictionaries, schema } = this;
    const dictionary = dictionaries.get(id);
    const type = schema.dictionaries.get(id);
    let data;
    if (header.data.compression != null) {
      const codec = compressionRegistry.get(header.data.compression.type);
      if ((codec === null || codec === void 0 ? void 0 : codec.decode) && typeof codec.decode === "function") {
        const { decommpressedBody, buffers } = this._decompressBuffers(header.data, body, codec);
        data = this._loadCompressedVectors(header.data, decommpressedBody, [type]);
        header = new DictionaryBatch2(new RecordBatch3(header.data.length, header.data.nodes, buffers, null, header.data.variadicBufferCounts), id, isDelta);
      } else {
        throw new Error("Dictionary batch is compressed but codec not found");
      }
    } else {
      data = this._loadVectors(header.data, body, [type]);
    }
    return (dictionary && isDelta ? dictionary.concat(new Vector(data)) : new Vector(data)).memoize();
  }
  _loadVectors(header, body, types) {
    return new VectorLoader(body, header.nodes, header.buffers, this.dictionaries, this.schema.metadataVersion, header.variadicBufferCounts).visitMany(types);
  }
  _loadCompressedVectors(header, body, types) {
    return new CompressedVectorLoader(body, header.nodes, header.buffers, this.dictionaries, this.schema.metadataVersion, header.variadicBufferCounts).visitMany(types);
  }
  _decompressBuffers(header, body, codec) {
    const decompressedBuffers = [];
    const newBufferRegions = [];
    let currentOffset = 0;
    for (const { offset, length } of header.buffers) {
      if (length === 0) {
        decompressedBuffers.push(new Uint8Array(0));
        newBufferRegions.push(new BufferRegion(currentOffset, 0));
        continue;
      }
      const byteBuf = new flatbuffers35.ByteBuffer(body.subarray(offset, offset + length));
      const uncompressedLenth = bigIntToNumber(byteBuf.readInt64(0));
      const bytes = byteBuf.bytes().subarray(COMPRESS_LENGTH_PREFIX);
      const decompressed = uncompressedLenth === LENGTH_NO_COMPRESSED_DATA ? bytes : codec.decode(bytes);
      decompressedBuffers.push(decompressed);
      const padding = (currentOffset + 7 & ~7) - currentOffset;
      currentOffset += padding;
      newBufferRegions.push(new BufferRegion(currentOffset, decompressed.length));
      currentOffset += decompressed.length;
    }
    return {
      decommpressedBody: decompressedBuffers,
      buffers: newBufferRegions
    };
  }
};
var RecordBatchStreamReaderImpl = class extends RecordBatchReaderImpl {
  constructor(source, dictionaries) {
    super(dictionaries);
    this._reader = !isArrowJSON(source) ? new MessageReader(this._handle = source) : new JSONMessageReader(this._handle = source);
  }
  isSync() {
    return true;
  }
  isStream() {
    return true;
  }
  [Symbol.iterator]() {
    return this;
  }
  cancel() {
    if (!this.closed && (this.closed = true)) {
      this.reset()._reader.return();
      this._reader = null;
      this.dictionaries = null;
    }
  }
  open(options) {
    if (!this.closed) {
      this.autoDestroy = shouldAutoDestroy(this, options);
      if (!(this.schema || (this.schema = this._reader.readSchema()))) {
        this.cancel();
      }
    }
    return this;
  }
  throw(value) {
    if (!this.closed && this.autoDestroy && (this.closed = true)) {
      return this.reset()._reader.throw(value);
    }
    return ITERATOR_DONE;
  }
  return(value) {
    if (!this.closed && this.autoDestroy && (this.closed = true)) {
      return this.reset()._reader.return(value);
    }
    return ITERATOR_DONE;
  }
  next() {
    if (this.closed) {
      return ITERATOR_DONE;
    }
    let message;
    const { _reader: reader } = this;
    while (message = this._readNextMessageAndValidate()) {
      if (message.isSchema()) {
        this.reset(message.header());
      } else if (message.isRecordBatch()) {
        this._recordBatchIndex++;
        const header = message.header();
        const buffer = reader.readMessageBody(message.bodyLength);
        const recordBatch = this._loadRecordBatch(header, buffer, message.metadata);
        return { done: false, value: recordBatch };
      } else if (message.isDictionaryBatch()) {
        this._dictionaryIndex++;
        const header = message.header();
        const buffer = reader.readMessageBody(message.bodyLength);
        const vector = this._loadDictionaryBatch(header, buffer);
        this.dictionaries.set(header.id, vector);
      }
    }
    if (this.schema && this._recordBatchIndex === 0) {
      this._recordBatchIndex++;
      return { done: false, value: new _InternalEmptyPlaceholderRecordBatch(this.schema) };
    }
    return this.return();
  }
  _readNextMessageAndValidate(type) {
    return this._reader.readMessage(type);
  }
};
var AsyncRecordBatchStreamReaderImpl = class extends RecordBatchReaderImpl {
  constructor(source, dictionaries) {
    super(dictionaries);
    this._reader = new AsyncMessageReader(this._handle = source);
  }
  isAsync() {
    return true;
  }
  isStream() {
    return true;
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  cancel() {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.closed && (this.closed = true)) {
        yield this.reset()._reader.return();
        this._reader = null;
        this.dictionaries = null;
      }
    });
  }
  open(options) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.closed) {
        this.autoDestroy = shouldAutoDestroy(this, options);
        if (!(this.schema || (this.schema = yield this._reader.readSchema()))) {
          yield this.cancel();
        }
      }
      return this;
    });
  }
  throw(value) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.closed && this.autoDestroy && (this.closed = true)) {
        return yield this.reset()._reader.throw(value);
      }
      return ITERATOR_DONE;
    });
  }
  return(value) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.closed && this.autoDestroy && (this.closed = true)) {
        return yield this.reset()._reader.return(value);
      }
      return ITERATOR_DONE;
    });
  }
  next() {
    return __awaiter(this, void 0, void 0, function* () {
      if (this.closed) {
        return ITERATOR_DONE;
      }
      let message;
      const { _reader: reader } = this;
      while (message = yield this._readNextMessageAndValidate()) {
        if (message.isSchema()) {
          yield this.reset(message.header());
        } else if (message.isRecordBatch()) {
          this._recordBatchIndex++;
          const header = message.header();
          const buffer = yield reader.readMessageBody(message.bodyLength);
          const recordBatch = this._loadRecordBatch(header, buffer, message.metadata);
          return { done: false, value: recordBatch };
        } else if (message.isDictionaryBatch()) {
          this._dictionaryIndex++;
          const header = message.header();
          const buffer = yield reader.readMessageBody(message.bodyLength);
          const vector = this._loadDictionaryBatch(header, buffer);
          this.dictionaries.set(header.id, vector);
        }
      }
      if (this.schema && this._recordBatchIndex === 0) {
        this._recordBatchIndex++;
        return { done: false, value: new _InternalEmptyPlaceholderRecordBatch(this.schema) };
      }
      return yield this.return();
    });
  }
  _readNextMessageAndValidate(type) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this._reader.readMessage(type);
    });
  }
};
var RecordBatchFileReaderImpl = class extends RecordBatchStreamReaderImpl {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(source, dictionaries) {
    super(source instanceof RandomAccessFile ? source : new RandomAccessFile(source), dictionaries);
  }
  isSync() {
    return true;
  }
  isFile() {
    return true;
  }
  open(options) {
    if (!this.closed && !this._footer) {
      this.schema = (this._footer = this._readFooter()).schema;
      for (const block of this._footer.dictionaryBatches()) {
        block && this._readDictionaryBatch(this._dictionaryIndex++);
      }
    }
    return super.open(options);
  }
  readRecordBatch(index) {
    var _a5;
    if (this.closed) {
      return null;
    }
    if (!this._footer) {
      this.open();
    }
    const block = (_a5 = this._footer) === null || _a5 === void 0 ? void 0 : _a5.getRecordBatch(index);
    if (block && this._handle.seek(block.offset)) {
      const message = this._reader.readMessage(MessageHeader.RecordBatch);
      if (message === null || message === void 0 ? void 0 : message.isRecordBatch()) {
        const header = message.header();
        const buffer = this._reader.readMessageBody(message.bodyLength);
        const recordBatch = this._loadRecordBatch(header, buffer, message.metadata);
        return recordBatch;
      }
    }
    return null;
  }
  _readDictionaryBatch(index) {
    var _a5;
    const block = (_a5 = this._footer) === null || _a5 === void 0 ? void 0 : _a5.getDictionaryBatch(index);
    if (block && this._handle.seek(block.offset)) {
      const message = this._reader.readMessage(MessageHeader.DictionaryBatch);
      if (message === null || message === void 0 ? void 0 : message.isDictionaryBatch()) {
        const header = message.header();
        const buffer = this._reader.readMessageBody(message.bodyLength);
        const vector = this._loadDictionaryBatch(header, buffer);
        this.dictionaries.set(header.id, vector);
      }
    }
  }
  _readFooter() {
    const { _handle } = this;
    const offset = _handle.size - magicAndPadding;
    const length = _handle.readInt32(offset);
    const buffer = _handle.readAt(offset - length, length);
    return Footer_.decode(buffer);
  }
  _readNextMessageAndValidate(type) {
    var _a5;
    if (!this._footer) {
      this.open();
    }
    if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
      const block = (_a5 = this._footer) === null || _a5 === void 0 ? void 0 : _a5.getRecordBatch(this._recordBatchIndex);
      if (block && this._handle.seek(block.offset)) {
        return this._reader.readMessage(type);
      }
    }
    return null;
  }
};
var AsyncRecordBatchFileReaderImpl = class extends AsyncRecordBatchStreamReaderImpl {
  get footer() {
    return this._footer;
  }
  get numDictionaries() {
    return this._footer ? this._footer.numDictionaries : 0;
  }
  get numRecordBatches() {
    return this._footer ? this._footer.numRecordBatches : 0;
  }
  constructor(source, ...rest) {
    const byteLength = typeof rest[0] !== "number" ? rest.shift() : void 0;
    const dictionaries = rest[0] instanceof Map ? rest.shift() : void 0;
    super(source instanceof AsyncRandomAccessFile ? source : new AsyncRandomAccessFile(source, byteLength), dictionaries);
  }
  isFile() {
    return true;
  }
  isAsync() {
    return true;
  }
  open(options) {
    const _super = Object.create(null, {
      open: { get: () => super.open }
    });
    return __awaiter(this, void 0, void 0, function* () {
      if (!this.closed && !this._footer) {
        this.schema = (this._footer = yield this._readFooter()).schema;
        for (const block of this._footer.dictionaryBatches()) {
          block && (yield this._readDictionaryBatch(this._dictionaryIndex++));
        }
      }
      return yield _super.open.call(this, options);
    });
  }
  readRecordBatch(index) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a5;
      if (this.closed) {
        return null;
      }
      if (!this._footer) {
        yield this.open();
      }
      const block = (_a5 = this._footer) === null || _a5 === void 0 ? void 0 : _a5.getRecordBatch(index);
      if (block && (yield this._handle.seek(block.offset))) {
        const message = yield this._reader.readMessage(MessageHeader.RecordBatch);
        if (message === null || message === void 0 ? void 0 : message.isRecordBatch()) {
          const header = message.header();
          const buffer = yield this._reader.readMessageBody(message.bodyLength);
          const recordBatch = this._loadRecordBatch(header, buffer, message.metadata);
          return recordBatch;
        }
      }
      return null;
    });
  }
  _readDictionaryBatch(index) {
    return __awaiter(this, void 0, void 0, function* () {
      var _a5;
      const block = (_a5 = this._footer) === null || _a5 === void 0 ? void 0 : _a5.getDictionaryBatch(index);
      if (block && (yield this._handle.seek(block.offset))) {
        const message = yield this._reader.readMessage(MessageHeader.DictionaryBatch);
        if (message === null || message === void 0 ? void 0 : message.isDictionaryBatch()) {
          const header = message.header();
          const buffer = yield this._reader.readMessageBody(message.bodyLength);
          const vector = this._loadDictionaryBatch(header, buffer);
          this.dictionaries.set(header.id, vector);
        }
      }
    });
  }
  _readFooter() {
    return __awaiter(this, void 0, void 0, function* () {
      const { _handle } = this;
      _handle._pending && (yield _handle._pending);
      const offset = _handle.size - magicAndPadding;
      const length = yield _handle.readInt32(offset);
      const buffer = yield _handle.readAt(offset - length, length);
      return Footer_.decode(buffer);
    });
  }
  _readNextMessageAndValidate(type) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!this._footer) {
        yield this.open();
      }
      if (this._footer && this._recordBatchIndex < this.numRecordBatches) {
        const block = this._footer.getRecordBatch(this._recordBatchIndex);
        if (block && (yield this._handle.seek(block.offset))) {
          return yield this._reader.readMessage(type);
        }
      }
      return null;
    });
  }
};
var RecordBatchJSONReaderImpl = class extends RecordBatchStreamReaderImpl {
  constructor(source, dictionaries) {
    super(source, dictionaries);
  }
  _loadVectors(header, body, types) {
    return new JSONVectorLoader(body, header.nodes, header.buffers, this.dictionaries, this.schema.metadataVersion, header.variadicBufferCounts).visitMany(types);
  }
};
function shouldAutoDestroy(self2, options) {
  return options && typeof options["autoDestroy"] === "boolean" ? options["autoDestroy"] : self2["autoDestroy"];
}
function* readAllSync(source) {
  const reader = RecordBatchReader.from(source);
  try {
    if (!reader.open({ autoDestroy: false }).closed) {
      do {
        yield reader;
      } while (!reader.reset().open().closed);
    }
  } finally {
    reader.cancel();
  }
}
function readAllAsync(source) {
  return __asyncGenerator(this, arguments, function* readAllAsync_1() {
    const reader = yield __await(RecordBatchReader.from(source));
    try {
      if (!(yield __await(reader.open({ autoDestroy: false }))).closed) {
        do {
          yield yield __await(reader);
        } while (!(yield __await(reader.reset().open())).closed);
      }
    } finally {
      yield __await(reader.cancel());
    }
  });
}
function fromArrowJSON(source) {
  return new RecordBatchStreamReader(new RecordBatchJSONReaderImpl(source));
}
function fromByteStream(source) {
  const bytes = source.peek(magicLength + 7 & ~7);
  return bytes && bytes.byteLength >= 4 ? !checkForMagicArrowString(bytes) ? new RecordBatchStreamReader(new RecordBatchStreamReaderImpl(source)) : new RecordBatchFileReader(new RecordBatchFileReaderImpl(source.read())) : new RecordBatchStreamReader(new RecordBatchStreamReaderImpl((function* () {
  })()));
}
function fromAsyncByteStream(source) {
  return __awaiter(this, void 0, void 0, function* () {
    const bytes = yield source.peek(magicLength + 7 & ~7);
    return bytes && bytes.byteLength >= 4 ? !checkForMagicArrowString(bytes) ? new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(source)) : new RecordBatchFileReader(new RecordBatchFileReaderImpl(yield source.read())) : new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl((function() {
      return __asyncGenerator(this, arguments, function* () {
      });
    })()));
  });
}
function fromFileHandle(source) {
  return __awaiter(this, void 0, void 0, function* () {
    const { size } = yield source.stat();
    const file = new AsyncRandomAccessFile(source, size);
    if (size >= magicX2AndPadding && checkForMagicArrowString(yield file.readAt(0, magicLength + 7 & ~7))) {
      return new AsyncRecordBatchFileReader(new AsyncRecordBatchFileReaderImpl(file));
    }
    return new AsyncRecordBatchStreamReader(new AsyncRecordBatchStreamReaderImpl(file));
  });
}

// node_modules/apache-arrow/visitor/vectorassembler.mjs
var VectorAssembler = class _VectorAssembler extends Visitor {
  /** @nocollapse */
  static assemble(...args) {
    const unwrap = (nodes) => nodes.flatMap((node) => Array.isArray(node) ? unwrap(node) : node instanceof RecordBatch4 ? node.data.children : node.data);
    const assembler = new _VectorAssembler();
    assembler.visitMany(unwrap(args));
    return assembler;
  }
  constructor() {
    super();
    this._byteLength = 0;
    this._nodes = [];
    this._buffers = [];
    this._bufferRegions = [];
    this._variadicBufferCounts = [];
  }
  visit(data) {
    if (data instanceof Vector) {
      this.visitMany(data.data);
      return this;
    }
    const { type } = data;
    if (!DataType.isDictionary(type)) {
      const { length } = data;
      if (length > 2147483647) {
        throw new RangeError("Cannot write arrays larger than 2^31 - 1 in length");
      }
      if (DataType.isUnion(type)) {
        this.nodes.push(new FieldNode2(length, 0));
      } else {
        const { nullCount } = data;
        if (!DataType.isNull(type)) {
          addBuffer.call(this, nullCount <= 0 ? new Uint8Array(0) : truncateBitmap(data.offset, length, data.nullBitmap));
        }
        this.nodes.push(new FieldNode2(length, nullCount));
      }
    }
    return super.visit(data);
  }
  visitNull(_null) {
    return this;
  }
  visitDictionary(data) {
    return this.visit(data.clone(data.type.indices));
  }
  get nodes() {
    return this._nodes;
  }
  get buffers() {
    return this._buffers;
  }
  get byteLength() {
    return this._byteLength;
  }
  get bufferRegions() {
    return this._bufferRegions;
  }
  get variadicBufferCounts() {
    return this._variadicBufferCounts;
  }
};
function addBuffer(values) {
  const byteLength = values.byteLength + 7 & ~7;
  this.buffers.push(values);
  this.bufferRegions.push(new BufferRegion(this._byteLength, byteLength));
  this._byteLength += byteLength;
  return this;
}
function assembleUnion(data) {
  var _a5;
  const { type, length, typeIds, valueOffsets } = data;
  addBuffer.call(this, typeIds);
  if (type.mode === UnionMode.Sparse) {
    return assembleNestedVector.call(this, data);
  } else if (type.mode === UnionMode.Dense) {
    if (data.offset <= 0) {
      addBuffer.call(this, valueOffsets);
      return assembleNestedVector.call(this, data);
    } else {
      const shiftedOffsets = new Int32Array(length);
      const childOffsets = /* @__PURE__ */ Object.create(null);
      const childLengths = /* @__PURE__ */ Object.create(null);
      for (let typeId, shift, index = -1; ++index < length; ) {
        if ((typeId = typeIds[index]) === void 0) {
          continue;
        }
        if ((shift = childOffsets[typeId]) === void 0) {
          shift = childOffsets[typeId] = valueOffsets[index];
        }
        shiftedOffsets[index] = valueOffsets[index] - shift;
        childLengths[typeId] = ((_a5 = childLengths[typeId]) !== null && _a5 !== void 0 ? _a5 : 0) + 1;
      }
      addBuffer.call(this, shiftedOffsets);
      this.visitMany(data.children.map((child, childIndex) => {
        const typeId = type.typeIds[childIndex];
        const childOffset = childOffsets[typeId];
        const childLength = childLengths[typeId];
        return child.slice(childOffset, Math.min(length, childLength));
      }));
    }
  }
  return this;
}
function assembleBoolVector(data) {
  let values;
  if (data.nullCount >= data.length) {
    return addBuffer.call(this, new Uint8Array(data.length + 7 >> 3));
  } else if ((values = data.values) instanceof Uint8Array) {
    return addBuffer.call(this, truncateBitmap(data.offset, data.length, values));
  }
  return addBuffer.call(this, packBools(data.values));
}
function assembleFlatVector(data) {
  return addBuffer.call(this, data.values.subarray(0, data.length * data.stride));
}
function assembleFlatListVector(data) {
  const { length, values, valueOffsets } = data;
  const begin = bigIntToNumber(valueOffsets[0]);
  const end = bigIntToNumber(valueOffsets[length]);
  const byteLength = Math.min(end - begin, values.byteLength - begin);
  addBuffer.call(this, rebaseValueOffsets(-begin, length + 1, valueOffsets));
  addBuffer.call(this, values.subarray(begin, begin + byteLength));
  return this;
}
function assembleBinaryViewVector(data) {
  const { offset, length, stride, values, variadicBuffers = [] } = data;
  if (!values) {
    throw new Error("BinaryView data is missing view buffer");
  }
  const start = offset * stride;
  const end = start + length * stride;
  addBuffer.call(this, values.subarray(start, end));
  for (const buffer of variadicBuffers) {
    addBuffer.call(this, buffer);
  }
  this._variadicBufferCounts.push(variadicBuffers.length);
  return this;
}
function assembleListVector(data) {
  const { length, valueOffsets } = data;
  if (valueOffsets) {
    const begin = bigIntToNumber(valueOffsets[0]);
    const end = bigIntToNumber(valueOffsets[length]);
    addBuffer.call(this, rebaseValueOffsets(-begin, length + 1, valueOffsets));
    return this.visit(data.children[0].slice(begin, end - begin));
  }
  return this.visit(data.children[0]);
}
function assembleNestedVector(data) {
  return this.visitMany(data.type.children.map((_, i) => data.children[i]).filter(Boolean))[0];
}
VectorAssembler.prototype.visitBool = assembleBoolVector;
VectorAssembler.prototype.visitInt = assembleFlatVector;
VectorAssembler.prototype.visitFloat = assembleFlatVector;
VectorAssembler.prototype.visitUtf8 = assembleFlatListVector;
VectorAssembler.prototype.visitLargeUtf8 = assembleFlatListVector;
VectorAssembler.prototype.visitUtf8View = assembleBinaryViewVector;
VectorAssembler.prototype.visitBinary = assembleFlatListVector;
VectorAssembler.prototype.visitLargeBinary = assembleFlatListVector;
VectorAssembler.prototype.visitBinaryView = assembleBinaryViewVector;
VectorAssembler.prototype.visitFixedSizeBinary = assembleFlatVector;
VectorAssembler.prototype.visitDate = assembleFlatVector;
VectorAssembler.prototype.visitTimestamp = assembleFlatVector;
VectorAssembler.prototype.visitTime = assembleFlatVector;
VectorAssembler.prototype.visitDecimal = assembleFlatVector;
VectorAssembler.prototype.visitList = assembleListVector;
VectorAssembler.prototype.visitLargeList = assembleListVector;
VectorAssembler.prototype.visitStruct = assembleNestedVector;
VectorAssembler.prototype.visitUnion = assembleUnion;
VectorAssembler.prototype.visitInterval = assembleFlatVector;
VectorAssembler.prototype.visitDuration = assembleFlatVector;
VectorAssembler.prototype.visitFixedSizeList = assembleListVector;
VectorAssembler.prototype.visitMap = assembleListVector;

// node_modules/apache-arrow/ipc/writer.mjs
var flatbuffers36 = __toESM(require_flatbuffers(), 1);
var RecordBatchWriter = class extends ReadableInterop {
  /** @nocollapse */
  // @ts-ignore
  static throughNode(options) {
    throw new Error(`"throughNode" not available in this environment`);
  }
  /** @nocollapse */
  static throughDOM(writableStrategy, readableStrategy) {
    throw new Error(`"throughDOM" not available in this environment`);
  }
  constructor(options) {
    super();
    this._position = 0;
    this._started = false;
    this._compression = null;
    this._sink = new AsyncByteQueue();
    this._schema = null;
    this._dictionaryBlocks = [];
    this._recordBatchBlocks = [];
    this._seenDictionaries = /* @__PURE__ */ new Map();
    this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map();
    isObject(options) || (options = { autoDestroy: true, writeLegacyIpcFormat: false, compressionType: null });
    this._autoDestroy = typeof options.autoDestroy === "boolean" ? options.autoDestroy : true;
    this._writeLegacyIpcFormat = typeof options.writeLegacyIpcFormat === "boolean" ? options.writeLegacyIpcFormat : false;
    if (options.compressionType != null) {
      if (this._writeLegacyIpcFormat) {
        throw new Error("Legacy IPC format does not support columnar compression. Use modern IPC format (writeLegacyIpcFormat=false).");
      }
      if (Object.values(CompressionType).includes(options.compressionType)) {
        this._compression = new BodyCompression2(options.compressionType);
      } else {
        const validCompressionTypes = Object.values(CompressionType).filter((v) => typeof v === "string");
        throw new Error(`Unsupported compressionType: ${options.compressionType} Available types: ${validCompressionTypes.join(", ")}`);
      }
    } else {
      this._compression = null;
    }
  }
  toString(sync = false) {
    return this._sink.toString(sync);
  }
  toUint8Array(sync = false) {
    return this._sink.toUint8Array(sync);
  }
  writeAll(input) {
    if (isPromise(input)) {
      return input.then((x) => this.writeAll(x));
    } else if (isAsyncIterable(input)) {
      return writeAllAsync(this, input);
    }
    return writeAll(this, input);
  }
  get closed() {
    return this._sink.closed;
  }
  [Symbol.asyncIterator]() {
    return this._sink[Symbol.asyncIterator]();
  }
  toDOMStream(options) {
    return this._sink.toDOMStream(options);
  }
  toNodeStream(options) {
    return this._sink.toNodeStream(options);
  }
  close() {
    return this.reset()._sink.close();
  }
  abort(reason) {
    return this.reset()._sink.abort(reason);
  }
  finish() {
    this._autoDestroy ? this.close() : this.reset(this._sink, this._schema);
    return this;
  }
  reset(sink = this._sink, schema = null) {
    if (sink === this._sink || sink instanceof AsyncByteQueue) {
      this._sink = sink;
    } else {
      this._sink = new AsyncByteQueue();
      if (sink && isWritableDOMStream(sink)) {
        this.toDOMStream({ type: "bytes" }).pipeTo(sink);
      } else if (sink && isWritableNodeStream(sink)) {
        this.toNodeStream({ objectMode: false }).pipe(sink);
      }
    }
    if (this._started && this._schema) {
      this._writeFooter(this._schema);
    }
    this._started = false;
    this._dictionaryBlocks = [];
    this._recordBatchBlocks = [];
    this._seenDictionaries = /* @__PURE__ */ new Map();
    this._dictionaryDeltaOffsets = /* @__PURE__ */ new Map();
    if (!schema || !compareSchemas(schema, this._schema)) {
      if (schema == null) {
        this._position = 0;
        this._schema = null;
      } else {
        this._started = true;
        this._schema = schema;
        this._writeSchema(schema);
      }
    }
    return this;
  }
  write(payload) {
    let schema = null;
    if (!this._sink) {
      throw new Error(`RecordBatchWriter is closed`);
    } else if (payload == null) {
      return this.finish() && void 0;
    } else if (payload instanceof Table2 && !(schema = payload.schema)) {
      return this.finish() && void 0;
    } else if (payload instanceof RecordBatch4 && !(schema = payload.schema)) {
      return this.finish() && void 0;
    }
    if (schema && !compareSchemas(schema, this._schema)) {
      if (this._started && this._autoDestroy) {
        return this.close();
      }
      this.reset(this._sink, schema);
    }
    if (payload instanceof RecordBatch4) {
      if (!(payload instanceof _InternalEmptyPlaceholderRecordBatch)) {
        this._writeRecordBatch(payload);
      }
    } else if (payload instanceof Table2) {
      this.writeAll(payload.batches);
    } else if (isIterable(payload)) {
      this.writeAll(payload);
    }
  }
  _writeMessage(message, alignment = 8) {
    const a = alignment - 1;
    const buffer = Message2.encode(message);
    const flatbufferSize = buffer.byteLength;
    const prefixSize = !this._writeLegacyIpcFormat ? 8 : 4;
    const alignedSize = flatbufferSize + prefixSize + a & ~a;
    const nPaddingBytes = alignedSize - flatbufferSize - prefixSize;
    if (message.headerType === MessageHeader.RecordBatch) {
      this._recordBatchBlocks.push(new FileBlock(alignedSize, message.bodyLength, this._position));
    } else if (message.headerType === MessageHeader.DictionaryBatch) {
      this._dictionaryBlocks.push(new FileBlock(alignedSize, message.bodyLength, this._position));
    }
    if (!this._writeLegacyIpcFormat) {
      this._write(Int32Array.of(-1));
    }
    this._write(Int32Array.of(alignedSize - prefixSize));
    if (flatbufferSize > 0) {
      this._write(buffer);
    }
    return this._writePadding(nPaddingBytes);
  }
  _write(chunk) {
    if (this._started) {
      const buffer = toUint8Array(chunk);
      if (buffer && buffer.byteLength > 0) {
        this._sink.write(buffer);
        this._position += buffer.byteLength;
      }
    }
    return this;
  }
  _writeSchema(schema) {
    return this._writeMessage(Message2.from(schema));
  }
  // @ts-ignore
  _writeFooter(schema) {
    return this._writeLegacyIpcFormat ? this._write(Int32Array.of(0)) : this._write(Int32Array.of(-1, 0));
  }
  _writeMagic() {
    return this._write(MAGIC);
  }
  _writePadding(nBytes) {
    return nBytes > 0 ? this._write(new Uint8Array(nBytes)) : this;
  }
  _writeRecordBatch(batch) {
    const { byteLength, nodes, bufferRegions, buffers, variadicBufferCounts } = this._assembleRecordBatch(batch);
    const recordBatch = new RecordBatch3(batch.numRows, nodes, bufferRegions, this._compression, variadicBufferCounts, batch.metadata);
    const message = Message2.from(recordBatch, byteLength);
    return this._writeDictionaries(batch)._writeMessage(message)._writeBodyBuffers(buffers);
  }
  _assembleRecordBatch(batch) {
    let { byteLength, nodes, bufferRegions, buffers, variadicBufferCounts } = VectorAssembler.assemble(batch);
    if (this._compression != null) {
      ({ byteLength, bufferRegions, buffers } = this._compressBodyBuffers(buffers));
    }
    return { byteLength, nodes, bufferRegions, buffers, variadicBufferCounts };
  }
  _compressBodyBuffers(buffers) {
    const codec = compressionRegistry.get(this._compression.type);
    if (!(codec === null || codec === void 0 ? void 0 : codec.encode) || typeof codec.encode !== "function") {
      throw new Error(`Codec for compression type "${CompressionType[this._compression.type]}" has invalid encode method`);
    }
    let currentOffset = 0;
    const compressedBuffers = [];
    const bufferRegions = [];
    for (const buffer of buffers) {
      const byteBuf = toUint8Array(buffer);
      if (byteBuf.length === 0) {
        compressedBuffers.push(new Uint8Array(0), new Uint8Array(0));
        bufferRegions.push(new BufferRegion(currentOffset, 0));
        continue;
      }
      const compressed = codec.encode(byteBuf);
      const isCompressionEffective = compressed.length < byteBuf.length;
      const finalBuffer = isCompressionEffective ? compressed : byteBuf;
      const byteLength = isCompressionEffective ? finalBuffer.length : LENGTH_NO_COMPRESSED_DATA;
      const lengthPrefix = new flatbuffers36.ByteBuffer(new Uint8Array(COMPRESS_LENGTH_PREFIX));
      lengthPrefix.writeInt64(0, BigInt(byteLength));
      compressedBuffers.push(lengthPrefix.bytes(), new Uint8Array(finalBuffer));
      const padding = (currentOffset + 7 & ~7) - currentOffset;
      currentOffset += padding;
      const fullBodyLength = COMPRESS_LENGTH_PREFIX + finalBuffer.length;
      bufferRegions.push(new BufferRegion(currentOffset, fullBodyLength));
      currentOffset += fullBodyLength;
    }
    const finalPadding = (currentOffset + 7 & ~7) - currentOffset;
    currentOffset += finalPadding;
    return { byteLength: currentOffset, bufferRegions, buffers: compressedBuffers };
  }
  _writeDictionaryBatch(dictionary, id, isDelta = false) {
    const { byteLength, nodes, bufferRegions, buffers, variadicBufferCounts } = this._assembleRecordBatch(new Vector([dictionary]));
    const recordBatch = new RecordBatch3(dictionary.length, nodes, bufferRegions, this._compression, variadicBufferCounts);
    const dictionaryBatch = new DictionaryBatch2(recordBatch, id, isDelta);
    const message = Message2.from(dictionaryBatch, byteLength);
    return this._writeMessage(message)._writeBodyBuffers(buffers);
  }
  _writeBodyBuffers(buffers) {
    const bufGroupSize = this._compression != null ? 2 : 1;
    const bufs = new Array(bufGroupSize);
    for (let i = 0; i < buffers.length; i += bufGroupSize) {
      let size = 0;
      for (let j = -1; ++j < bufGroupSize; ) {
        bufs[j] = buffers[i + j];
        size += bufs[j].byteLength;
      }
      if (size === 0) {
        continue;
      }
      for (const buf of bufs)
        this._write(buf);
      const padding = (size + 7 & ~7) - size;
      if (padding > 0) {
        this._writePadding(padding);
      }
    }
    return this;
  }
  _writeDictionaries(batch) {
    var _a5, _b2;
    for (const [id, dictionary] of batch.dictionaries) {
      const chunks = (_a5 = dictionary === null || dictionary === void 0 ? void 0 : dictionary.data) !== null && _a5 !== void 0 ? _a5 : [];
      const prevDictionary = this._seenDictionaries.get(id);
      const offset = (_b2 = this._dictionaryDeltaOffsets.get(id)) !== null && _b2 !== void 0 ? _b2 : 0;
      if (!prevDictionary || prevDictionary.data[0] !== chunks[0]) {
        for (const [index, chunk] of chunks.entries())
          this._writeDictionaryBatch(chunk, id, index > 0);
      } else if (offset < chunks.length) {
        for (const chunk of chunks.slice(offset))
          this._writeDictionaryBatch(chunk, id, true);
      }
      this._seenDictionaries.set(id, dictionary);
      this._dictionaryDeltaOffsets.set(id, chunks.length);
    }
    return this;
  }
};
var RecordBatchStreamWriter = class _RecordBatchStreamWriter extends RecordBatchWriter {
  /** @nocollapse */
  static writeAll(input, options) {
    const writer = new _RecordBatchStreamWriter(options);
    if (isPromise(input)) {
      return input.then((x) => writer.writeAll(x));
    } else if (isAsyncIterable(input)) {
      return writeAllAsync(writer, input);
    }
    return writeAll(writer, input);
  }
};
var RecordBatchFileWriter = class _RecordBatchFileWriter extends RecordBatchWriter {
  /** @nocollapse */
  static writeAll(input, options) {
    const writer = new _RecordBatchFileWriter(options);
    if (isPromise(input)) {
      return input.then((x) => writer.writeAll(x));
    } else if (isAsyncIterable(input)) {
      return writeAllAsync(writer, input);
    }
    return writeAll(writer, input);
  }
  constructor(options) {
    super(options);
    this._autoDestroy = true;
    this._writeLegacyIpcFormat = false;
  }
  // @ts-ignore
  _writeSchema(schema) {
    return this._writeMagic()._writePadding(2);
  }
  _writeDictionaryBatch(dictionary, id, isDelta = false) {
    if (!isDelta && this._seenDictionaries.has(id)) {
      throw new Error("The Arrow File format does not support replacement dictionaries. ");
    }
    return super._writeDictionaryBatch(dictionary, id, isDelta);
  }
  _writeFooter(schema) {
    const buffer = Footer_.encode(new Footer_(schema, MetadataVersion.V5, this._recordBatchBlocks, this._dictionaryBlocks));
    return super._writeFooter(schema)._write(buffer)._write(Int32Array.of(buffer.byteLength))._writeMagic();
  }
};
function writeAll(writer, input) {
  let chunks = input;
  if (input instanceof Table2) {
    chunks = input.batches;
    writer.reset(void 0, input.schema);
  }
  for (const batch of chunks) {
    writer.write(batch);
  }
  return writer.finish();
}
function writeAllAsync(writer, batches) {
  return __awaiter(this, void 0, void 0, function* () {
    var _a5, batches_1, batches_1_1;
    var _b2, e_1, _c2, _d2;
    try {
      for (_a5 = true, batches_1 = __asyncValues(batches); batches_1_1 = yield batches_1.next(), _b2 = batches_1_1.done, !_b2; _a5 = true) {
        _d2 = batches_1_1.value;
        _a5 = false;
        const batch = _d2;
        writer.write(batch);
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (!_a5 && !_b2 && (_c2 = batches_1.return)) yield _c2.call(batches_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }
    return writer.finish();
  });
}

// node_modules/apache-arrow/io/whatwg/iterable.mjs
function toDOMStream(source, options) {
  if (isAsyncIterable(source)) {
    return asyncIterableAsReadableDOMStream(source, options);
  }
  if (isIterable(source)) {
    return iterableAsReadableDOMStream(source, options);
  }
  throw new Error(`toDOMStream() must be called with an Iterable or AsyncIterable`);
}
function iterableAsReadableDOMStream(source, options) {
  let it = null;
  const bm = (options === null || options === void 0 ? void 0 : options.type) === "bytes" || false;
  const hwm = (options === null || options === void 0 ? void 0 : options.highWaterMark) || Math.pow(2, 24);
  return new ReadableStream(Object.assign(Object.assign({}, options), {
    start(controller) {
      next(controller, it || (it = source[Symbol.iterator]()));
    },
    pull(controller) {
      it ? next(controller, it) : controller.close();
    },
    cancel() {
      (it === null || it === void 0 ? void 0 : it.return) && it.return();
      it = null;
    }
  }), Object.assign({ highWaterMark: bm ? hwm : void 0 }, options));
  function next(controller, it2) {
    let buf;
    let r = null;
    let size = controller.desiredSize || null;
    while (!(r = it2.next(bm ? size : null)).done) {
      if (ArrayBuffer.isView(r.value) && (buf = toUint8Array(r.value))) {
        size != null && bm && (size = size - buf.byteLength + 1);
        r.value = buf;
      }
      controller.enqueue(r.value);
      if (size != null && --size <= 0) {
        return;
      }
    }
    controller.close();
  }
}
function asyncIterableAsReadableDOMStream(source, options) {
  let it = null;
  const bm = (options === null || options === void 0 ? void 0 : options.type) === "bytes" || false;
  const hwm = (options === null || options === void 0 ? void 0 : options.highWaterMark) || Math.pow(2, 24);
  return new ReadableStream(Object.assign(Object.assign({}, options), {
    start(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        yield next(controller, it || (it = source[Symbol.asyncIterator]()));
      });
    },
    pull(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        it ? yield next(controller, it) : controller.close();
      });
    },
    cancel() {
      return __awaiter(this, void 0, void 0, function* () {
        (it === null || it === void 0 ? void 0 : it.return) && (yield it.return());
        it = null;
      });
    }
  }), Object.assign({ highWaterMark: bm ? hwm : void 0 }, options));
  function next(controller, it2) {
    return __awaiter(this, void 0, void 0, function* () {
      let buf;
      let r = null;
      let size = controller.desiredSize || null;
      while (!(r = yield it2.next(bm ? size : null)).done) {
        if (ArrayBuffer.isView(r.value) && (buf = toUint8Array(r.value))) {
          size != null && bm && (size = size - buf.byteLength + 1);
          r.value = buf;
        }
        controller.enqueue(r.value);
        if (size != null && --size <= 0) {
          return;
        }
      }
      controller.close();
    });
  }
}

// node_modules/apache-arrow/io/whatwg/builder.mjs
function builderThroughDOMStream(options) {
  return new BuilderTransform(options);
}
var BuilderTransform = class {
  constructor(options) {
    this._numChunks = 0;
    this._finished = false;
    this._bufferedSize = 0;
    const { ["readableStrategy"]: readableStrategy, ["writableStrategy"]: writableStrategy, ["queueingStrategy"]: queueingStrategy = "count" } = options, builderOptions = __rest(options, ["readableStrategy", "writableStrategy", "queueingStrategy"]);
    this._controller = null;
    this._builder = makeBuilder(builderOptions);
    this._getSize = queueingStrategy !== "bytes" ? chunkLength : chunkByteLength;
    const { ["highWaterMark"]: readableHighWaterMark = queueingStrategy === "bytes" ? Math.pow(2, 14) : 1e3 } = Object.assign({}, readableStrategy);
    const { ["highWaterMark"]: writableHighWaterMark = queueingStrategy === "bytes" ? Math.pow(2, 14) : 1e3 } = Object.assign({}, writableStrategy);
    this["readable"] = new ReadableStream({
      ["cancel"]: () => {
        this._builder.clear();
      },
      ["pull"]: (c) => {
        this._maybeFlush(this._builder, this._controller = c);
      },
      ["start"]: (c) => {
        this._maybeFlush(this._builder, this._controller = c);
      }
    }, {
      "highWaterMark": readableHighWaterMark,
      "size": queueingStrategy !== "bytes" ? chunkLength : chunkByteLength
    });
    this["writable"] = new WritableStream({
      ["abort"]: () => {
        this._builder.clear();
      },
      ["write"]: () => {
        this._maybeFlush(this._builder, this._controller);
      },
      ["close"]: () => {
        this._maybeFlush(this._builder.finish(), this._controller);
      }
    }, {
      "highWaterMark": writableHighWaterMark,
      "size": (value) => this._writeValueAndReturnChunkSize(value)
    });
  }
  _writeValueAndReturnChunkSize(value) {
    const bufferedSize = this._bufferedSize;
    this._bufferedSize = this._getSize(this._builder.append(value));
    return this._bufferedSize - bufferedSize;
  }
  _maybeFlush(builder, controller) {
    if (controller == null) {
      return;
    }
    if (this._bufferedSize >= controller.desiredSize) {
      ++this._numChunks && this._enqueue(controller, builder.toVector());
    }
    if (builder.finished) {
      if (builder.length > 0 || this._numChunks === 0) {
        ++this._numChunks && this._enqueue(controller, builder.toVector());
      }
      if (!this._finished && (this._finished = true)) {
        this._enqueue(controller, null);
      }
    }
  }
  _enqueue(controller, chunk) {
    this._bufferedSize = 0;
    this._controller = null;
    chunk == null ? controller.close() : controller.enqueue(chunk);
  }
};
var chunkLength = (chunk) => {
  var _a5;
  return (_a5 = chunk === null || chunk === void 0 ? void 0 : chunk.length) !== null && _a5 !== void 0 ? _a5 : 0;
};
var chunkByteLength = (chunk) => {
  var _a5;
  return (_a5 = chunk === null || chunk === void 0 ? void 0 : chunk.byteLength) !== null && _a5 !== void 0 ? _a5 : 0;
};

// node_modules/apache-arrow/io/whatwg/reader.mjs
function recordBatchReaderThroughDOMStream(writableStrategy, readableStrategy) {
  const queue = new AsyncByteQueue();
  let reader = null;
  const readable = new ReadableStream({
    cancel() {
      return __awaiter(this, void 0, void 0, function* () {
        yield queue.close();
      });
    },
    start(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        yield next(controller, reader || (reader = yield open()));
      });
    },
    pull(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        reader ? yield next(controller, reader) : controller.close();
      });
    }
  });
  return { writable: new WritableStream(queue, Object.assign({ "highWaterMark": Math.pow(2, 14) }, writableStrategy)), readable };
  function open() {
    return __awaiter(this, void 0, void 0, function* () {
      return yield (yield RecordBatchReader.from(queue)).open(readableStrategy);
    });
  }
  function next(controller, reader2) {
    return __awaiter(this, void 0, void 0, function* () {
      let size = controller.desiredSize;
      let r = null;
      while (!(r = yield reader2.next()).done) {
        controller.enqueue(r.value);
        if (size != null && --size <= 0) {
          return;
        }
      }
      controller.close();
    });
  }
}

// node_modules/apache-arrow/io/whatwg/writer.mjs
function recordBatchWriterThroughDOMStream(writableStrategy, readableStrategy) {
  const writer = new this(writableStrategy);
  const reader = new AsyncByteStream(writer);
  const readable = new ReadableStream({
    // type: 'bytes',
    cancel() {
      return __awaiter(this, void 0, void 0, function* () {
        yield reader.cancel();
      });
    },
    pull(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        yield next(controller);
      });
    },
    start(controller) {
      return __awaiter(this, void 0, void 0, function* () {
        yield next(controller);
      });
    }
  }, Object.assign({ "highWaterMark": Math.pow(2, 14) }, readableStrategy));
  return { writable: new WritableStream(writer, writableStrategy), readable };
  function next(controller) {
    return __awaiter(this, void 0, void 0, function* () {
      let buf = null;
      let size = controller.desiredSize;
      while (buf = yield reader.read(size || null)) {
        controller.enqueue(buf);
        if (size != null && (size -= buf.byteLength) <= 0) {
          return;
        }
      }
      controller.close();
    });
  }
}

// node_modules/apache-arrow/ipc/serialization.mjs
function tableFromIPC(input) {
  const reader = RecordBatchReader.from(input);
  if (isPromise(reader)) {
    return reader.then((reader2) => tableFromIPC(reader2));
  }
  if (reader.isAsync()) {
    return reader.readAll().then((xs) => new Table2(xs));
  }
  return new Table2(reader.readAll());
}

// node_modules/apache-arrow/util/typecheck.mjs
var typecheck_exports = {};
__export(typecheck_exports, {
  isArrowData: () => isArrowData,
  isArrowDataType: () => isArrowDataType,
  isArrowField: () => isArrowField,
  isArrowRecordBatch: () => isArrowRecordBatch,
  isArrowSchema: () => isArrowSchema,
  isArrowTable: () => isArrowTable,
  isArrowVector: () => isArrowVector
});
function isArrowSchema(x) {
  return Schema3.isSchema(x);
}
function isArrowField(x) {
  return Field2.isField(x);
}
function isArrowDataType(x) {
  return DataType.isDataType(x);
}
function isArrowData(x) {
  return Data.isData(x);
}
function isArrowVector(x) {
  return Vector.isVector(x);
}
function isArrowRecordBatch(x) {
  return RecordBatch4.isRecordBatch(x);
}
function isArrowTable(x) {
  return Table2.isTable(x);
}

// node_modules/apache-arrow/Arrow.mjs
var util = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, bn_exports), int_exports), bit_exports), math_exports), buffer_exports), vector_exports), pretty_exports), interval_exports), typecheck_exports), {
  compareSchemas,
  compareFields,
  compareTypes
});

// node_modules/apache-arrow/Arrow.dom.mjs
adapters_default.toDOMStream = toDOMStream;
Builder["throughDOM"] = builderThroughDOMStream;
RecordBatchReader["throughDOM"] = recordBatchReaderThroughDOMStream;
RecordBatchFileReader["throughDOM"] = recordBatchReaderThroughDOMStream;
RecordBatchStreamReader["throughDOM"] = recordBatchReaderThroughDOMStream;
RecordBatchWriter["throughDOM"] = recordBatchWriterThroughDOMStream;
RecordBatchFileWriter["throughDOM"] = recordBatchWriterThroughDOMStream;
RecordBatchStreamWriter["throughDOM"] = recordBatchWriterThroughDOMStream;

// scripts/sources/vector.mjs
var import_sql = __toESM(require_sql_wasm(), 1);
var import_proj4 = __toESM(require_proj4_src(), 1);
var import_node_fs = require("node:fs");
var import_node_path = require("node:path");
var MAX_FEATURES = 2e5;
var parquetReady = false;
var sqlPromise = null;
function ensureParquet(vendorDir) {
  if (parquetReady) return;
  initSync({ module: (0, import_node_fs.readFileSync)((0, import_node_path.join)(vendorDir, "parquet_wasm_bg.wasm")) });
  parquetReady = true;
}
function getSql(vendorDir) {
  if (!sqlPromise) {
    sqlPromise = (0, import_sql.default)({ locateFile: () => (0, import_node_path.join)(vendorDir, "sql-wasm.wasm") });
  }
  return sqlPromise;
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
function projectionForCrsId(code, label) {
  if (!code) return { label: label || "unknown", transform: null, note: "No CRS; coordinates are used as WGS84." };
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
    note: `CRS EPSG:${code} is not reprojected; features may be misplaced.`
  };
}
function projectionForParquet(crs) {
  if (!crs) return { label: "OGC:CRS84", transform: null };
  const id = crs.id || {};
  const authority = String(id.authority || "").toUpperCase();
  const code = id.code;
  if (authority === "OGC" && String(code).toUpperCase() === "CRS84") {
    return { label: "OGC:CRS84", transform: null };
  }
  if (authority === "EPSG") {
    return projectionForCrsId(Number(code), `EPSG:${code}`);
  }
  if (typeof crs.wkt === "string" && crs.wkt.trim()) {
    try {
      return {
        label: crs.name || "WKT",
        transform: (x, y) => (0, import_proj4.default)(crs.wkt, "EPSG:4326", [x, y])
      };
    } catch {
    }
  }
  return {
    label: crs.name || "unknown",
    transform: null,
    note: "The GeoParquet CRS could not be read; coordinates are used as WGS84."
  };
}
function projectionForGpkg(srsId, srs) {
  if (srsId === 4326 || srsId === 4979) {
    return { label: `EPSG:${srsId}`, transform: null };
  }
  if (srsId === 0 || srsId === -1 || srsId == null) {
    return { label: "undefined", transform: null, note: "GeoPackage layer has no CRS; coordinates are used as WGS84." };
  }
  const definition = srs && srs.definition && srs.definition !== "undefined" ? srs.definition : null;
  if (definition) {
    try {
      return {
        label: srs.organization ? `${srs.organization}:${srs.organization_coordsys_id || srsId}` : `EPSG:${srsId}`,
        transform: (x, y) => (0, import_proj4.default)(definition, "EPSG:4326", [x, y])
      };
    } catch {
    }
  }
  return projectionForCrsId(srsId, `EPSG:${srsId}`);
}
function parseWkb(value) {
  const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let offset = 0;
  let little = true;
  function u8() {
    if (offset >= view.byteLength) throw new Error("Truncated WKB");
    return view.getUint8(offset++);
  }
  function u322() {
    if (offset + 4 > view.byteLength) throw new Error("Truncated WKB");
    const value2 = view.getUint32(offset, little);
    offset += 4;
    return value2;
  }
  function f642() {
    if (offset + 8 > view.byteLength) throw new Error("Truncated WKB");
    const value2 = view.getFloat64(offset, little);
    offset += 8;
    return value2;
  }
  function coordinate(dimensions) {
    const out = [];
    for (let index = 0; index < dimensions; index++) out.push(f642());
    return out;
  }
  function coordinateList(dimensions) {
    const count = u322();
    const out = [];
    for (let index = 0; index < count; index++) out.push(coordinate(dimensions));
    return out;
  }
  function polygon(dimensions) {
    const count = u322();
    const rings = [];
    for (let index = 0; index < count; index++) rings.push(coordinateList(dimensions));
    return rings;
  }
  function readGeometry() {
    const order = u8();
    little = order === 1;
    let rawType = u322();
    let hasZ = false;
    let hasM = false;
    const ewkbZ = (rawType & 2147483648) !== 0;
    const ewkbM = (rawType & 1073741824) !== 0;
    const ewkbSrid = (rawType & 536870912) !== 0;
    if (ewkbZ) hasZ = true;
    if (ewkbM) hasM = true;
    let geometryType = rawType & 268435455;
    if (ewkbSrid) u322();
    if (geometryType >= 1e3) {
      const dimensions2 = Math.floor(geometryType / 1e3);
      geometryType %= 1e3;
      if (dimensions2 === 1) hasZ = true;
      if (dimensions2 === 2) hasM = true;
      if (dimensions2 === 3) {
        hasZ = true;
        hasM = true;
      }
    }
    const dimensions = 2 + (hasZ ? 1 : 0) + (hasM ? 1 : 0);
    if (geometryType === 1) {
      return { type: "Point", coordinates: coordinate(dimensions) };
    }
    if (geometryType === 2) {
      return { type: "LineString", coordinates: coordinateList(dimensions) };
    }
    if (geometryType === 3) {
      return { type: "Polygon", coordinates: polygon(dimensions) };
    }
    if (geometryType === 4) {
      const count = u322();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiPoint", coordinates };
    }
    if (geometryType === 5) {
      const count = u322();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiLineString", coordinates };
    }
    if (geometryType === 6) {
      const count = u322();
      const coordinates = [];
      for (let index = 0; index < count; index++) coordinates.push(readGeometry().coordinates);
      return { type: "MultiPolygon", coordinates };
    }
    if (geometryType === 7) {
      const count = u322();
      const geometries = [];
      for (let index = 0; index < count; index++) geometries.push(readGeometry());
      return { type: "GeometryCollection", geometries };
    }
    throw new Error("Unsupported WKB geometry type " + geometryType);
  }
  return readGeometry();
}
function unwrapGeoPackage(bytes) {
  if (bytes.length < 8 || bytes[0] !== 71 || bytes[1] !== 80) return bytes;
  const flags = bytes[3];
  if ((flags & 16) !== 0) return null;
  const envelope = flags >> 1 & 7;
  let offset = 8;
  if (envelope === 1) offset += 32;
  else if (envelope === 2) offset += 48;
  else if (envelope === 3) offset += 48;
  else if (envelope === 4) offset += 64;
  return bytes.subarray(offset);
}
function geometryFromValue(value) {
  if (value == null) return null;
  if (typeof value === "object" && typeof value.type === "string" && value.type !== "Topology") {
    return value;
  }
  if (!(value instanceof Uint8Array) && !(value instanceof ArrayBuffer)) return null;
  try {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    const payload = unwrapGeoPackage(bytes);
    return payload ? parseWkb(payload) : null;
  } catch {
    return null;
  }
}
function transformGeometry(geometry, transform) {
  if (!geometry) return null;
  if (geometry.type === "GeometryCollection") {
    return {
      type: "GeometryCollection",
      geometries: (geometry.geometries || []).map((item) => transformGeometry(item, transform))
    };
  }
  const walk = (coordinates) => {
    if (!Array.isArray(coordinates)) return coordinates;
    if (typeof coordinates[0] === "number" && typeof coordinates[1] === "number") {
      const [x, y] = transform(coordinates[0], coordinates[1]);
      return coordinates.length > 2 ? [x, y, ...coordinates.slice(2)] : [x, y];
    }
    return coordinates.map(walk);
  };
  return { type: geometry.type, coordinates: walk(geometry.coordinates) };
}
function jsonSafe(value) {
  if (value === null || value === void 0) return value;
  if (typeof value === "bigint") {
    const number = Number(value);
    return Number.isSafeInteger(number) ? number : value.toString();
  }
  if (value instanceof Date) return value.toISOString();
  if (value instanceof Uint8Array) {
    const text = Buffer.from(value).toString("utf8");
    if (/^[\t\n\r\x20-\x7e]*$/.test(text)) return text;
    return Buffer.from(value).toString("base64");
  }
  if (Array.isArray(value)) return value.map(jsonSafe);
  if (typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) out[key] = jsonSafe(item);
    return out;
  }
  return value;
}
function featureFromRow(geometryValue, properties, projection) {
  const geometry = geometryFromValue(geometryValue);
  if (!geometry) return null;
  return {
    type: "Feature",
    properties: jsonSafe(properties),
    geometry: projection.transform ? transformGeometry(geometry, projection.transform) : geometry
  };
}
async function readGeoParquet(buffer, options) {
  ensureParquet(options.vendorDir);
  const wasmTable = readParquet(buffer);
  const table = tableFromIPC(wasmTable.intoIPCStream());
  const geoRaw = table.schema.metadata && table.schema.metadata.get("geo");
  if (!geoRaw) {
    throw new Error("This Parquet file has no GeoParquet metadata (missing the 'geo' key).");
  }
  let geo;
  try {
    geo = JSON.parse(geoRaw);
  } catch (err) {
    throw new Error("Invalid GeoParquet metadata: " + err.message);
  }
  const columns = geo.columns || {};
  const geometryName = geo.primary_column || Object.keys(columns)[0] || "geometry";
  const geometryField = table.schema.fields.find((field) => field.name === geometryName);
  if (!geometryField) {
    throw new Error('GeoParquet geometry column "' + geometryName + '" is missing.');
  }
  const geometryColumn = table.getChild(geometryName);
  const propertyFields = table.schema.fields.filter((field) => field.name !== geometryName);
  const propertyColumns = propertyFields.map((field) => ({ name: field.name, column: table.getChild(field.name) }));
  const projection = projectionForParquet(columns[geometryName] && columns[geometryName].crs);
  const total = Number(table.numRows);
  const limit = Math.min(total, MAX_FEATURES);
  const features = [];
  for (let index = 0; index < limit; index++) {
    const properties = {};
    for (const { name, column } of propertyColumns) {
      const value = column.get(index);
      if (value !== null && value !== void 0) properties[name] = value;
    }
    const feature = featureFromRow(geometryColumn.get(index), properties, projection);
    if (feature) features.push(feature);
  }
  if (!features.length) throw new Error("GeoParquet contains no features with geometry.");
  const note = projection.note || (limit < total ? `Showing ${limit.toLocaleString()} of ${total.toLocaleString()} features.` : null);
  return [{
    name: options.name || "GeoParquet",
    features,
    crs: projection.label,
    note
  }];
}
function quoteIdent(value) {
  return '"' + String(value).replace(/"/g, '""') + '"';
}
function resultRows(result) {
  if (!result) return [];
  return result.values || [];
}
async function readGeoPackage(buffer, options) {
  const SQL = await getSql(options.vendorDir);
  const db = new SQL.Database(buffer);
  try {
    let contents;
    try {
      contents = db.exec("SELECT table_name, data_type, identifier, srs_id FROM gpkg_contents")[0];
    } catch {
      throw new Error("This file is not a GeoPackage (gpkg_contents is missing).");
    }
    if (!contents) throw new Error("This GeoPackage has no contents.");
    const geometryColumns = db.exec(
      "SELECT table_name, column_name, geometry_type_name, srs_id FROM gpkg_geometry_columns"
    )[0];
    const geometryByTable = /* @__PURE__ */ new Map();
    if (geometryColumns) {
      for (const row of resultRows(geometryColumns)) {
        geometryByTable.set(String(row[0]), { column: String(row[1]), srsId: row[3] });
      }
    }
    const srsRows = db.exec(
      "SELECT srs_id, organization, organization_coordsys_id, definition FROM gpkg_spatial_ref_sys"
    )[0];
    const srsById = /* @__PURE__ */ new Map();
    if (srsRows) {
      for (const row of resultRows(srsRows)) {
        srsById.set(Number(row[0]), {
          organization: row[1],
          organization_coordsys_id: row[2],
          definition: row[3]
        });
      }
    }
    const layers = [];
    let remaining = MAX_FEATURES;
    let tileContents = 0;
    for (const row of resultRows(contents)) {
      const tableName = String(row[0]);
      const dataType = String(row[1] || "");
      if (dataType !== "features") {
        if (dataType === "tiles") tileContents++;
        continue;
      }
      if (remaining <= 0) break;
      const geometryInfo = geometryByTable.get(tableName);
      const geometryColumn = geometryInfo ? geometryInfo.column : "geometry";
      const srsId = Number(geometryInfo ? geometryInfo.srsId : row[3]);
      const projection = projectionForGpkg(srsId, srsById.get(srsId));
      let result;
      try {
        result = db.exec(`SELECT * FROM ${quoteIdent(tableName)} LIMIT ${remaining}`)[0];
      } catch {
        continue;
      }
      if (!result || !result.values || !result.values.length) continue;
      const geometryIndex = result.columns.indexOf(geometryColumn);
      if (geometryIndex < 0) continue;
      const features = [];
      for (const values of result.values) {
        const properties = {};
        for (let index = 0; index < result.columns.length; index++) {
          if (index === geometryIndex) continue;
          const value = values[index];
          if (value !== null && value !== void 0) properties[result.columns[index]] = value;
        }
        const feature = featureFromRow(values[geometryIndex], properties, projection);
        if (feature) features.push(feature);
      }
      if (!features.length) continue;
      remaining -= features.length;
      layers.push({
        name: String(row[2] || tableName),
        features,
        crs: projection.label,
        note: projection.note
      });
      if (remaining <= 0) break;
    }
    if (!layers.length) {
      if (tileContents) {
        throw new Error("This GeoPackage contains raster tiles; tile layers are not supported yet.");
      }
      throw new Error("GeoPackage contains no vector features.");
    }
    return layers;
  } finally {
    db.close();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  readGeoPackage,
  readGeoParquet
});
