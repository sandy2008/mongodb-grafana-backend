'use strict';

System.register(['app/plugins/sdk', 'lodash', './css/query-editor.css!'], function (_export, _context) {
  "use strict";

  var QueryCtrl, _, _createClass, MongoDBDatasourceQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  return {
    setters: [function (_appPluginsSdk) {
      QueryCtrl = _appPluginsSdk.QueryCtrl;
    }, function (_lodash) {
      _ = _lodash.default;
    }, function (_cssQueryEditorCss) {}],
    execute: function () {
      _createClass = function () {
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

      _export('MongoDBDatasourceQueryCtrl', MongoDBDatasourceQueryCtrl = function (_QueryCtrl) {
        _inherits(MongoDBDatasourceQueryCtrl, _QueryCtrl);

        function MongoDBDatasourceQueryCtrl($scope, $injector, templateSrv, $q, uiSegmentSrv) {
          _classCallCheck(this, MongoDBDatasourceQueryCtrl);

          var _this = _possibleConstructorReturn(this, (MongoDBDatasourceQueryCtrl.__proto__ || Object.getPrototypeOf(MongoDBDatasourceQueryCtrl)).call(this, $scope, $injector));

          _this.scope = $scope;
          _this.target.collection = _this.target.collection || "collection";
          _this.target.target = _this.target.target || '[]';
          _this.target.type = _this.target.type || 'timeserie';
          _this.target.rawQuery = true;
          _this.collectionSegment = uiSegmentSrv.newSegment(_this.target.collection);
          _this.uiSegmentSrv = uiSegmentSrv;
          return _this;
        }

        _createClass(MongoDBDatasourceQueryCtrl, [{
          key: 'getOptions',
          value: function getOptions(query) {
            return this.datasource.metricFindQuery(query || '');
          }
        }, {
          key: 'getCollections',
          value: function getCollections() {
            return this.datasource.metricFindQuery("list_collections").then(this.transformToSegments({})).catch(this.handleQueryError.bind(this));
            //return Promise.resolve(_.map(["col1", "col2"], x => {
            //    return this.uiSegmentSrv.newSegment(x);
            //}))
          }
        }, {
          key: 'collectionChanged',
          value: function collectionChanged() {
            this.target.collection = this.collectionSegment.value;
            this.panelCtrl.refresh();
          }
        }, {
          key: 'onChangeInternal',
          value: function onChangeInternal() {
            this.panelCtrl.refresh(); // Asks the panel to refresh data.
          }
        }, {
          key: 'transformToSegments',
          value: function transformToSegments() {
            var _this2 = this;

            return function (results) {
              return _.map(results, function (segment) {
                return _this2.uiSegmentSrv.newSegment({
                  value: segment.text,
                  expandable: segment.expandable
                });
              });
            };
          }
        }, {
          key: 'handleQueryError',
          value: function handleQueryError(err) {
            this.error = err.message || 'Failed to issue metric query';
            return [];
          }
        }]);

        return MongoDBDatasourceQueryCtrl;
      }(QueryCtrl));

      _export('MongoDBDatasourceQueryCtrl', MongoDBDatasourceQueryCtrl);

      MongoDBDatasourceQueryCtrl.templateUrl = 'partials/query.editor.html';
    }
  };
});
//# sourceMappingURL=query_ctrl.js.map
