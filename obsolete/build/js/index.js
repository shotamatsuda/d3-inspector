var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var Visualization = function () {
  function Visualization(parent, config) {
    classCallCheck(this, Visualization);

    this.config = config;
    this.svg = d3.select(parent).append('svg');
    this.scale = 1;

    this.axisGroupX = this.svg.append('g').classed('axis ruler x', true).style('pointer-events', 'none').call(this.axisX);
    this.axisGroupY = this.svg.append('g').classed('axis ruler y', true).style('pointer-events', 'none').call(this.axisY);

    this.zoom = d3.zoom().scaleExtent([config.zoom && config.zoom[0] || 1 / 2, config.zoom && config.zoom[1] || 10]).on('zoom', this.zoomed.bind(this));

    this.zoomRect = this.svg.append('rect').classed('zoom', true).style('fill', 'none').style('pointer-events', 'all').attr('width', this.width).attr('height', this.height).call(this.zoom);

    this.background = this.svg.append('g').classed('background', true).attr('width', this.width).attr('height', this.height);
    this.content = this.svg.append('g').classed('content', true).attr('width', this.width).attr('height', this.height);
    this.overlay = this.svg.append('g').classed('overlay', true).attr('width', this.width).attr('height', this.height);

    $(window).resize(this.resized.bind(this));
  }

  createClass(Visualization, [{
    key: 'load',
    value: function load() {}
  }, {
    key: 'draw',
    value: function draw() {}
  }, {
    key: 'resized',
    value: function resized() {
      this.axisGroupX.call(this.axisX);
      this.axisGroupY.call(this.axisY);
      this.zoomRect.attr('width', this.width).attr('height', this.height);
    }
  }, {
    key: 'zoomed',
    value: function zoomed() {
      this.content.attr('transform', d3.event.transform);
      this.axisGroupX.call(this.axisX.scale(d3.event.transform.rescaleX(this.scaleX)));
      this.axisGroupY.call(this.axisY.scale(d3.event.transform.rescaleY(this.scaleY)));
      this.scale = d3.event.transform.k;
    }
  }, {
    key: 'transform',
    value: function transform() {
      var _zoom;

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_zoom = this.zoom).transform.apply(_zoom, [this.svg].concat(args));
    }
  }, {
    key: 'translateBy',
    value: function translateBy() {
      var _zoom2;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_zoom2 = this.zoom).translateBy.apply(_zoom2, [this.svg].concat(args));
    }
  }, {
    key: 'scaleBy',
    value: function scaleBy() {
      var _zoom3;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      (_zoom3 = this.zoom).scaleBy.apply(_zoom3, [this.svg].concat(args));
    }
  }, {
    key: 'scaleTo',
    value: function scaleTo() {
      var _zoom4;

      var selection = this.svg.transition().duration(500);

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      (_zoom4 = this.zoom).scaleTo.apply(_zoom4, [selection].concat(args));
    }
  }, {
    key: 'scaleX',
    get: function get() {
      return (this._scaleX = this._scaleX || d3.scaleLinear()).domain([0, this.width]).range([0, this.width]);
    }
  }, {
    key: 'scaleY',
    get: function get() {
      return (this._scaleY = this._scaleY || d3.scaleLinear()).domain([0, this.height]).range([0, this.height]);
    }
  }, {
    key: 'axisX',
    get: function get() {
      return (this._axisX = this._axisX || d3.axisTop().tickPadding(-5).tickFormat(d3.format('d'))).scale(this.scaleX).ticks(this.width / 100).tickSize(-this.height);
    }
  }, {
    key: 'axisY',
    get: function get() {
      return (this._axisY = this._axisY || d3.axisLeft().tickPadding(-5).tickFormat(d3.format('d'))).scale(this.scaleY).ticks(this.height / 100).tickSize(-this.width);
    }
  }, {
    key: 'width',
    get: function get() {
      return parseInt(this.svg.style('width'));
    }
  }, {
    key: 'height',
    get: function get() {
      return parseInt(this.svg.style('height'));
    }
  }]);
  return Visualization;
}();

var config = {
  zoom: [0.03125, 64]
};

var visualization = new Visualization('#visualization', config);

visualization.zoom.on('zoom.scale', function () {
  var transform = d3.event.transform;
  $('#origin-x').val('' + -transform.x.toFixed(1));
  $('#origin-y').val('' + -transform.y.toFixed(1));
  $('#scale').val('' + (transform.k * 100).toFixed(1));
});

$('#origin-x').change(function () {
  var transform = d3.zoomTransform(visualization.svg);
  visualization.transform(transform.translate(-$('#origin-x').val(), transform.y));
});

$('#origin-y').change(function () {
  var transform = d3.zoomTransform(visualization.svg);
  visualization.transform(transform.translate(transform.x, -$('#origin-y').val()));
});

$('#scale-in').click(function (e) {
  var current = visualization.scale;
  var result = current;
  var proposed = config.zoom[0];
  var i = 0;
  while (true) {
    if (proposed >= 1) {
      proposed /= i % 2 !== 0 ? 3 / 4 : 2 / 3;
    } else {
      proposed /= i % 2 !== 0 ? 2 / 3 : 3 / 4;
    }
    ++i;
    if (current >= proposed) {
      continue;
    }
    if (result <= current && current < proposed) {
      result = proposed;
      break;
    }
    result = proposed;
  }
  visualization.scaleTo(result);
});

$('#scale-out').click(function (e) {
  var current = visualization.scale;
  var result = current;
  var proposed = config.zoom[1];
  var i = 0;
  while (true) {
    if (proposed <= 1) {
      proposed *= i % 2 !== 0 ? 3 / 4 : 2 / 3;
    } else {
      proposed *= i % 2 !== 0 ? 2 / 3 : 3 / 4;
    }
    ++i;
    if (current <= proposed) {
      continue;
    }
    if (result >= current && current > proposed) {
      result = proposed;
      break;
    }
    result = proposed;
  }
  visualization.scaleTo(result);
});

$('#scale-identity').click(function (e) {
  visualization.scaleTo(1);
});
