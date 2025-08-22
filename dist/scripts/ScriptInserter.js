function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { getAuthenticatedUser } from '../auth';

/**
 * Class representing a Script Inserter.
 */
var ScriptInserter = /*#__PURE__*/function () {
  /**
   * Create a Script Inserter.
   * @param {Array<Object>} scripts - An array of script objects to insert.
   * @param {string} [scripts[].head] - The script to insert into the head section.
   * @param {string} [scripts[].body.top] - The script to insert at the top of the body section.
   * @param {string} [scripts[].body.bottom] - The script to insert at the bottom of the body section.
   */
  function ScriptInserter(_ref) {
    var config = _ref.config;
    _classCallCheck(this, ScriptInserter);
    this.scripts = config.EXTERNAL_SCRIPTS || [];
  }

  /**
   * Inserts the scripts into their respective locations (head, body start, body end).
   */
  _createClass(ScriptInserter, [{
    key: "loadScript",
    value: function loadScript() {
      var _this = this;
      if (!this.scripts.length) {
        return;
      }
      var isAuthenticated = !!getAuthenticatedUser();
      this.scripts.forEach(function (script) {
        var _script$body, _script$body2;
        var areAuthnRequirementsFulfilled = !script.isAuthnRequired || isAuthenticated;
        if (!areAuthnRequirementsFulfilled) {
          return;
        }
        if (script.head) {
          _this.insertToHead(script.head);
        }
        if ((_script$body = script.body) !== null && _script$body !== void 0 && _script$body.top) {
          _this.insertToBodyTop(script.body.top);
        }
        if ((_script$body2 = script.body) !== null && _script$body2 !== void 0 && _script$body2.bottom) {
          _this.insertToBodyBottom(script.body.bottom);
        }
      });
    }

    /**
     * Inserts content into the head section.
     * @param {string} content - The content to insert into the head section.
     */
  }, {
    key: "insertToHead",
    value: function insertToHead(content) {
      this.createAndAppendScript(content, document.head);
    }

    /**
     * Inserts content at the start of the body section.
     * @param {string} content - The content to insert at the top of the body section.
     */
  }, {
    key: "insertToBodyTop",
    value: function insertToBodyTop(content) {
      this.createAndAppendScript(content, document.body, true);
    }

    /**
     * Inserts content at the end of the body section.
     * @param {string} content - The content to insert at the bottom of the body section.
     */
  }, {
    key: "insertToBodyBottom",
    value: function insertToBodyBottom(content) {
      this.createAndAppendScript(content, document.body);
    }

    /**
     * Creates a script element and appends it to the specified location.
     * @param {string} content - The content of the script.
     * @param {Element} parent - The parent element to insert the script into (head or body).
     * @param {boolean} atStart - Whether to insert the script at the start of the parent element.
     */
  }, {
    key: "createAndAppendScript",
    value: function createAndAppendScript(content, parent) {
      var atStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      var scriptElement = tempDiv.querySelector('script');
      if (scriptElement && scriptElement.src) {
        // If the script has a src attribute, create a new script element with the same src
        var newScriptElement = document.createElement('script');
        newScriptElement.src = scriptElement.src;
        newScriptElement.async = true;
        if (atStart && parent.firstChild) {
          parent.insertBefore(newScriptElement, parent.firstChild);
        } else {
          parent.appendChild(newScriptElement);
        }
      } else {
        // If the script does not have a src attribute, insert its inner content as inline script
        var _newScriptElement = document.createElement('script');
        _newScriptElement.text = scriptElement ? scriptElement.innerHTML : content;
        if (atStart && parent.firstChild) {
          parent.insertBefore(_newScriptElement, parent.firstChild);
        } else {
          parent.appendChild(_newScriptElement);
        }
      }
    }
  }]);
  return ScriptInserter;
}();
export default ScriptInserter;
//# sourceMappingURL=ScriptInserter.js.map