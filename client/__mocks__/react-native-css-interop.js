const mockModule = {
  __esModule: true,
  createInteropElement: function createInteropElement(type, props) {
    var rest = Array.prototype.slice.call(arguments, 2);
    var reactCreateElement = require("react")["create" + "Element"];
    return reactCreateElement.apply(null, [type, props].concat(rest));
  },
  cssInterop: function (component) {
    return component;
  },
  remapProps: function (component) {
    return component;
  },
  StyleSheet: {
    create: function (styles) {
      return styles;
    },
  },
  colorScheme: {
    get: function () {
      return "light";
    },
  },
  rem: { value: 16 },
};

module.exports = mockModule;
