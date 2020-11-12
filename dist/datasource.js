'use strict';

System.register(['lodash'], function (_export, _context) {
  "use strict";

  var _, _createClass, MongoDBDatasource;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_lodash) {
      _ = _lodash.default;
    }],
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

      _export('MongoDBDatasource', MongoDBDatasource = function () {
        function MongoDBDatasource(instanceSettings, $q, backendSrv, templateSrv, timeSrv) {
          _classCallCheck(this, MongoDBDatasource);

          this.type = instanceSettings.type;
          this.url = instanceSettings.url;
          this.name = instanceSettings.name;
          this.db = { 'url': instanceSettings.jsonData.mongodb_url, 'db': instanceSettings.jsonData.mongodb_db };
          this.id = instanceSettings.id;
          this.q = $q;
          this.backendSrv = backendSrv;
          this.templateSrv = templateSrv;
          this.timeSrv = timeSrv;
          this.withCredentials = instanceSettings.withCredentials;
          this.headers = { 'Content-Type': 'application/json' };
          if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
            this.headers['Authorization'] = instanceSettings.basicAuth;
          }
        }

        _createClass(MongoDBDatasource, [{
          key: 'query',
          value: function query(options) {
            var query = this.buildQueryParameters(options);
            query.targets = query.targets.filter(function (t) {
              return !t.hide;
            });
            query.db = this.db;

            if (query.targets.length <= 0) {
              return this.q.when({ data: [] });
            }

            return this.doRequest(query).then(function (result) {
              var res = [];
              _.forEach(result.data.results, function (r) {
                _.forEach(r.series, function (s) {
                  res.push({ target: s.name, datapoints: s.points });
                });
                _.forEach(r.tables, function (t) {
                  t.type = 'table';
                  t.refId = r.refId;
                  res.push(t);
                });
              });

              result.data = res;
              return result;
            });
          }
        }, {
          key: 'interpolateVariable',
          value: function interpolateVariable(value, variable) {
            if (typeof value === 'string') {
              if (variable.multi || variable.includeAll) {
                return '"' + value + '"';
              } else {
                return value;
              }
            }

            if (typeof value === 'number') {
              return value;
            }

            var quotedValues = _.map(value, function (val) {
              return '"' + val + '"';
            });
            return quotedValues.join(',');
          }
        }, {
          key: 'buildQueryParameters',
          value: function buildQueryParameters(options) {
            var _this = this;

            //remove placeholder targets
            options.targets = _.filter(options.targets, function (target) {
              return target.target !== '[]';
            });

            var targets = _.map(options.targets, function (target) {
              return {
                queryType: 'timeSeriesQuery',
                target: _this.templateSrv.replace(target.target, options.scopedVars, _this.interpolateVariable),
                collection: target.collection,
                refId: target.refId,
                intervalMs: options.intervalMs,
                maxDataPoints: options.maxDataPoints,
                hide: target.hide,
                type: target.type || 'timeserie',
                datasourceId: _this.id
              };
            });

            options.targets = targets;

            return options;
          }
        }, {
          key: 'testDatasource',
          value: function testDatasource() {
            return this.metricFindQuery('ping').then(function (res) {
              return { status: 'success', message: 'Database Connection OK' };
            }).catch(function (err) {
              console.log(err);
              if (err.data && err.data.message) {
                return { status: 'error', message: err.data.message };
              } else {
                return { status: 'error', message: err.status };
              }
            });
          }
        }, {
          key: 'annotationQuery',
          value: function annotationQuery(options) {
            var query = this.templateSrv.replace(options.annotation.query, {}, 'glob');
            var annotationQuery = {
              range: options.range,
              annotation: {
                name: options.annotation.name,
                datasource: options.annotation.datasource,
                enable: options.annotation.enable,
                iconColor: options.annotation.iconColor,
                query: query
              },
              rangeRaw: options.rangeRaw
            };

            if (this.templateSrv.getAdhocFilters) {
              query.adhocFilters = this.templateSrv.getAdhocFilters(this.name);
            } else {
              query.adhocFilters = [];
            }

            return this.doDirectRequest({
              url: this.url + '/annotations',
              method: 'POST',
              data: annotationQuery
            }).then(function (result) {
              response.data.$$status = result.status;
              response.data.$$config = result.config;
              return result.data;
            });
          }
        }, {
          key: 'metricFindQuery',
          value: function metricFindQuery(query) {
            var options = {
              range: this.timeSrv.timeRange(),
              targets: [{
                queryType: 'metricsQuery',
                target: query,
                refId: "search",
                datasourceId: this.id
              }]
            };
            return this.doRequest(options).then(this.mapToTextValue);
          }
        }, {
          key: 'mapToTextValue',
          value: function mapToTextValue(result) {
            var table = result.data.results.search.tables[0];

            if (!table) {
              return [];
            }

            return _.map(table.rows, function (row, i) {
              if (row.length > 1) {
                return { text: row[0], value: row[1] };
              } else if (_.isObject(row[0])) {
                return { text: row[0], value: i };
              }
              return { text: row[0], value: row[0] };
            });
          }
        }, {
          key: 'doDirectRequest',
          value: function doDirectRequest(options) {
            options.withCredentials = this.withCredentials;
            options.headers = this.headers;

            return this.backendSrv.datasourceRequest(options);
          }
        }, {
          key: 'doRequest',
          value: function doRequest(options) {
            return this.backendSrv.datasourceRequest({
              url: '/api/tsdb/query',
              method: 'POST',
              data: {
                from: options.range.from.valueOf().toString(),
                to: options.range.to.valueOf().toString(),
                queries: options.targets
              }
            });
          }
        }, {
          key: 'getTagKeys',
          value: function getTagKeys(options) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
              _this2.doRequest({
                url: _this2.url + '/tag-keys',
                method: 'POST',
                data: options
              }).then(function (result) {
                return resolve(result.data);
              });
            });
          }
        }, {
          key: 'getTagValues',
          value: function getTagValues(options) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
              _this3.doRequest({
                url: _this3.url + '/tag-values',
                method: 'POST',
                data: options
              }).then(function (result) {
                return resolve(result.data);
              });
            });
          }
        }]);

        return MongoDBDatasource;
      }());

      _export('MongoDBDatasource', MongoDBDatasource);
    }
  };
});
//# sourceMappingURL=datasource.js.map
