(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Calendar = factory();
  }
}(this, function() {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Calendar 类
 */
var Calendar =
/*#__PURE__*/
function () {
  /**
   * 构造函数
   * ========================================================================
   * @constructor
   * @param {Object} [options] - 日历控件的配置参数
   * @param [options.parent] - 日历显示的位置（DOM 节点 ID）
   * @param [options.time] - 日历初始化显示的时间
   * @param [options.viewMode] - 日历的试图模式：0 - 日期试图（默认值）
   *                                           1 - 月份试图
   *                                           2 - 年代试图
   * @param [options.pickMode] - 日历的日期选择模式: single - 单选模式（默认值）
   *                                               multiple - 多选模式
   *                                               range - 范围选择模式
   *                                               week - 星期选择模式
   * @param [options.hasSwitcher] - 是否显示上下切换按钮（默认值：true）
   * @param [options.hasFooter] - 是否显示日历页脚（默认值：true）
   * @param [options.hasClock] - 是否显示当前时间（默认值：true）
   * @param [options.onDatePick] - 选择日期后的自定义事件处理器
   * @param [options.onMonthPick] - 选择月份后的自定义事件处理器
   * @param [options.onYearPick] - 选择年份后的自定义事件处理器
   * @param [options.onTodayPick] - 点击当前日期的自定义事件处理器
   * @param [options.MONTHS] - 月份常量（格式：去年11/12月 + 今天月份 + 明年1/2月）
   * @param [options.DAYS] - 星期常量（周日为一周的第一天，周六为一周的最后一天）
   * @param [options.DATES] - 月份天数常量（2月为28天，闰年则 28 + 1）
   * @param [options.STYLES] - 日历控件的样式常量
   * @returns {Calendar}
   */
  function Calendar(options) {
    _classCallCheck(this, Calendar);

    /**
     * Calendar 控件的配置属性
     * ========================================================================
     */
    this.attributes = {
      // 日历显示的位置（DOM 节点 ID）
      parent: '',
      // 日历初始化显示的时间
      time: '',
      // 日历的试图模式：
      // 0 - 日期试图（默认值）
      // 1 - 月份试图
      // 2 - 年代试图
      viewMode: 0,
      // 日历的日期选择模式
      // single - 单选模式（默认值）
      // multiple - 多选模式
      // range - 范围选择模式
      // week - 星期选择模式
      pickMode: 'single',
      // 是否显示上下切换按钮（默认值：true）
      hasSwitcher: true,
      // 是否显示日历页脚（默认值：true）
      hasFooter: true,
      // 是否显示当前时间（默认值：true）
      hasClock: true,
      // 选择日期后的自定义事件处理器
      // time - 选中的日期时间范围
      // $el - 点击的 DOM 节点
      // calendar - 日历控件的实例
      // onDatePick: function (time, $el, calendar) {
      //   console.log('选择时间：' + time)
      //   console.log('选择的 DOM 节点：' + $el)
      //   console.log('日历实例：' + calendar)
      // },
      onDatePick: null,
      // 选择月份后的自定义事件处理器
      // time - 选中的日期时间
      // $el - 点击的 DOM 节点
      // calendar - 日历控件的实例
      // onMonthPick: function (time, $el, calendar) {
      //   console.log('选择时间：', time)
      //   console.log('选择DOM：', $el)
      //   console.log('日历实例：', calendar)
      // }
      onMonthPick: null,
      // 选择年份后的自定义事件处理器
      // time - 选中的日期时间
      // $el - 点击的 DOM 节点
      // calendar - 日历控件的实例
      // onYearPick: function (time, $el, calendar) {
      //   console.log('选择时间：', time)
      //   console.log('选择DOM：', $el)
      //   console.log('日历实例：', calendar)
      // }
      onYearPick: null,
      // 点击当前日期的自定义事件处理器
      // time - 选中的日期时间
      // $el - 点击的 DOM 节点
      // calendar - 日历控件的实例
      // onTodayPick: function (time, $el, calendar) {
      //   console.log('选择时间：', time)
      //   console.log('选择的 DOM 节点：', $el)
      //   console.log('日历实例：', calendar)
      // }
      onTodayPick: null,
      // 月份常量
      MONTHS: [],
      // 星期常量
      DAYS: [],
      // 月份天数常量
      DATES: [],
      // 日历控件的样式常量
      STYLES: {}
      /**
       * Calendar 控件相关的 DOM 节点属性
       * ========================================================================
       */

    };
    this.elements = {
      // 显示日历控件的父节点
      parent: null,
      // 日历控件的根节点
      wrap: null,
      // 日历控件的头部节点
      header: null,
      // 日历控件的标题节点
      title: null,
      // 日历控件的切换器节点
      switcher: null,
      // 日历控件向上切换按钮节点
      prev: null,
      // 日历控件向下切换按钮节点
      next: null,
      // 日历控件的主体内容节点
      body: null,
      // 日历控件的星期栏节点
      week: null,
      // 日历控件的日期显示节点
      dates: null,
      // 日历控件的月份显示节点
      months: null,
      // 日历控件的年代显示节点
      years: null,
      // 日历控件的页脚节点
      footer: null,
      // 日历控件的当前日期显示节点
      today: null,
      // 日历控件的当前时间显示节点
      time: null
      /**
       * Calendar 控件相关的数据属性
       * ========================================================================
       */

    };
    this.data = {
      // 日历可以显示的最小年份
      minYear: 0,
      // 日历可以显示的最大年份
      maxYear: 0,
      // 当前选中日期的年份
      year: 0,
      // 当前选中日期的月份
      month: 0,
      // 选中的日期信息
      date: {
        // 年份
        year: 0,
        // 月份
        month: 0,
        // 日期
        date: 0,
        // 星期几
        day: 0,
        // 日期的英文表示（格式：2019-6-2）
        text: '',
        // 日期的完整中文表示（格式：2019年6月2日 星期日）
        fullText: ''
      },
      // 多选（multiple/range/week）模式下，选中的日期数据
      picked: [] // 执行初始化操作
      // 绘制界面
      // 绑定事件处理器

    };
    this.initialize(options).render().addEventListeners();
    return this;
  }
  /**
   * 初始化方法
   * ========================================================================
   * 1. 初始化配置信息；
   * 2. 初始化数据信息；
   * 3. 初始化 DOM 信息（创建控件相关的 DOM 节点）；
   * ========================================================================
   * @param {Object} options - 配置信息
   * @see this.attributes
   * @returns {Calendar}
   */


  _createClass(Calendar, [{
    key: "initialize",
    value: function initialize(options) {
      var year = Calendar.getYear().value;
      var pickMode;
      var time;
      var month;
      var monthText;
      var dateRanges;
      var startDate;
      var endDate; // 初始化配置

      this.set(Calendar.defaults).set(options);
      time = this.get('time');
      pickMode = this.get('pickMode');
      month = Calendar.getMonth(time);
      monthText = month.text; // 初始化数据

      this.setYear(time).setMonth(time).setDate(time)._setYears(time); // 初始化（多选模式）选中的时间


      switch (pickMode) {
        case 'multiple':
          this.data.picked.push(this.getDate().text);
          break;

        case 'range':
          startDate = monthText + '-' + 1;
          endDate = monthText + '-' + this.get('DATES')[month.value - 1]; // 默认选中整个月

          this.data.picked = [startDate, endDate];
          break;

        case 'week':
          dateRanges = Calendar.getWeekRanges(time);
          startDate = dateRanges[0];
          endDate = dateRanges[dateRanges.length - 1]; // 默认选中配置日期所在的那个星期

          this.data.picked = [startDate, endDate];
          break;
      } // 设置日历控件可以显示的年份范围


      this.data.minYear = year - 100;
      this.data.maxYear = year + 100; // 创建控件相关的 DOM 节点

      this._createElements();

      return this;
    }
    /**
     * 绘制日历控件界面的方法
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "render",
    value: function render() {
      var elements = this.getEls();
      var $wrap = elements.wrap;
      var $header = elements.header;
      var $switcher = elements.switcher;
      var $body = elements.body;
      var $footer = elements.footer;
      var $fragment = document.createDocumentFragment(); // 绘制头部

      this._renderTitle();

      $header.appendChild(elements.title); // 配置了显示上下切换按钮

      if (this.get('hasSwitcher')) {
        $switcher.appendChild(elements.prev);
        $switcher.appendChild(elements.next);
        $header.appendChild($switcher);
      } // 绘制星期栏


      this._renderDays();

      $body.appendChild(elements.week); // 绘制日期

      this._renderDates();

      $body.appendChild(elements.dates); // 绘制月份

      this._renderMonths();

      $body.appendChild(elements.months); // 绘制年代

      this._renderYears();

      $body.appendChild(elements.years); // 配置了显示页脚

      if (this.get('hasFooter')) {
        // 绘制页脚
        this._renderFooter();

        $footer.appendChild(elements.today); // 配置了显示当前时间

        if (this.get('hasClock')) {
          $footer.appendChild(elements.time);
        }
      } // 将主体模块绘制出来


      $wrap.appendChild($header);
      $wrap.appendChild($body); // 配置了显示页脚

      if (this.get('hasFooter')) {
        $wrap.appendChild($footer);
      } // 将控件零时保存在文档碎片中


      $fragment.appendChild($wrap); // 一次性绘制出整个日历控件

      elements.parent.appendChild($fragment);
      return this;
    }
    /**
     * 给日历控件相关的 DOM 节点绑定事件处理器
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "addEventListeners",
    value: function addEventListeners() {
      var DOT = '.';
      var STYLES = this.get('STYLES');
      var CLICK = 'click';
      var selectorTitle = DOT + STYLES.TITLE;
      var selectorPrev = DOT + STYLES.PREV;
      var selectorNext = DOT + STYLES.NEXT;
      var selectorDate = DOT + STYLES.DATE;
      var selectorMonth = DOT + STYLES.MONTH;
      var selectorYear = DOT + STYLES.YEAR;
      var selectorToday = DOT + STYLES.TODAY;
      var Delegate = Calendar.Delegate;
      var $wrap = this.getEls().wrap; // 绑定点击标题的事件处理器

      Delegate.on($wrap, selectorTitle, CLICK, this._titleClick, this);

      if (this.get('hasSwitcher')) {
        // 绑定点击向上按钮的事件处理器
        Delegate.on($wrap, selectorPrev, CLICK, this._prevClick, this); // 绑定点击向下按钮的事件处理器

        Delegate.on($wrap, selectorNext, CLICK, this._nextClick, this);
      } // 绑定点击日期的事件处理器


      Delegate.on($wrap, selectorDate, CLICK, this._dateClick, this); // 绑定点击月份的事件处理器

      Delegate.on($wrap, selectorMonth, CLICK, this._monthClick, this); // 绑定点击年份的事件处理器

      Delegate.on($wrap, selectorYear, CLICK, this._yearClick, this);

      if (this.get('hasClock')) {
        // 绑定点击今天的事件处理器
        Delegate.on($wrap, selectorToday, CLICK, this._todayClick, this);
      }

      return this;
    }
    /**
     * 重启日历控件
     * ========================================================================
     * 1. 销毁日历控件：
     *    1.1 移除所有的绑定的事件处理器
     *    1.2 隐藏控件
     *    1.3 移除所有 DOM 节点
     *    1.4 重置所有属性
     * 2. 初始化控件
     * 3. 绘制控件
     * 4. 绑定事件处理起
     * ========================================================================
     * @param {Object} options - 配置信息
     * @see this.attributes
     * @returns {Calendar}
     */

  }, {
    key: "reload",
    value: function reload(options) {
      this.destroy().initialize(options).render().addEventListeners();
      return this;
    }
    /**
     * 销毁日历控件
     * ========================================================================
     * 1 移除所有的绑定的事件处理器
     * 2 隐藏控件
     * 3 移除所有 DOM 节点
     * 4 重置所有属性
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeEventListeners().hide().remove().reset();
      return this;
    }
    /**
     * 移除所有绑定的事件处理器
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      var CLICK = 'click';
      var Delegate = Calendar.Delegate;
      var $wrap = this.getEls().wrap;
      Delegate.off($wrap, CLICK, this._titleClick);

      if (this.get('hasSwitcher')) {
        Delegate.off($wrap, CLICK, this._prevClick);
        Delegate.off($wrap, CLICK, this._nextClick);
      }

      Delegate.off($wrap, CLICK, this._dateClick);
      Delegate.off($wrap, CLICK, this._monthClick);
      Delegate.off($wrap, CLICK, this._yearClick);

      if (this.get('hasClock')) {
        Delegate.off($wrap, CLICK, this._todayClick);
      }

      return this;
    }
    /**
     * 移除所有 DOM 节点
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "remove",
    value: function remove() {
      var elements = this.getEls();
      elements.parent.removeChild(elements.wrap);
      return this;
    }
    /**
     * 重置所有属性
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "reset",
    value: function reset() {
      this.attributes = {
        parent: '',
        time: '',
        viewMode: 0,
        pickMode: 'single',
        hasSwitcher: true,
        hasFooter: true,
        hasClock: true,
        MONTHS: [],
        DAYS: [],
        DATES: [],
        STYLES: {}
      };
      this.elements = {
        parent: null,
        wrap: null,
        header: null,
        title: null,
        switcher: null,
        prev: null,
        next: null,
        body: null,
        week: null,
        dates: null,
        months: null,
        years: null,
        footer: null,
        today: null,
        time: null,
        year: null,
        month: null,
        date: null
      };
      this.data = {
        minYear: 0,
        maxYear: 0,
        years: {
          start: 0,
          end: 0
        },
        year: 0,
        month: 0,
        date: {
          year: 0,
          month: 0,
          date: 0,
          day: 0,
          text: '',
          fullText: ''
        },
        picked: []
      };
      return this;
    }
    /**
     * 获取配置信息
     * ========================================================================
     * @param {String} attr - 配置属性名称
     * @returns {*} - 返回对应属性的值
     */

  }, {
    key: "get",
    value: function get(attr) {
      return this.attributes[attr];
    }
    /**
     * 设置配置信息
     * ========================================================================
     * @param {Object} [options] - 配置信息对象
     * @returns {Calendar}
     */

  }, {
    key: "set",
    value: function set() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Object.assign(this.attributes, options);
      return this;
    }
    /**
     * 获取日历控件所有相关的 DOM 节点的对象
     * ========================================================================
     * @see Calendar.elements
     * @returns {Object}
     */

  }, {
    key: "getEls",
    value: function getEls() {
      return this.elements;
    }
    /**
     * 获取日历控件当前显示的年份信息
     * ========================================================================
     * @returns {Number} - 返回日历控件当前显示的年份
     */

  }, {
    key: "getYear",
    value: function getYear() {
      return this.data.year;
    }
    /**
     * 设置日历控件当前的年份
     * ========================================================================
     * @param {String|Number} [time] - 表示年份的字符串或数字（默认值：今年）
     *                                 字符串格式：'2019'、'2019-2' 或 '2019-2-2'
     *                                 数字格式：  1546300800000
     * @returns {Calendar}
     */

  }, {
    key: "setYear",
    value: function setYear(time) {
      this.data.year = Calendar.getYear(time).value;
      return this;
    }
    /**
     * 获得日历控件当前显示的月份信息
     * ========================================================================
     * @returns {Number} - 返回日历控件当前显示的月份
     */

  }, {
    key: "getMonth",
    value: function getMonth() {
      return this.data.month;
    }
    /**
     * 设置日历控件当前显示的月份
     * ========================================================================
     * @param {String|Number} [time] - 表示月份的字符串或数字（默认值：本月）
     * @returns {Calendar}
     */

  }, {
    key: "setMonth",
    value: function setMonth(time) {
      this.data.month = Calendar.getMonth(time).value;
      return this;
    }
    /**
     * 获取日历控件当前选中的日期
     * ========================================================================
     * @returns {Object} - 返回日历控件当前选中的日期
     */

  }, {
    key: "getDate",
    value: function getDate() {
      return this.data.date;
    }
    /**
     * 设置日历控件当前选中的日期
     * ========================================================================
     * @param {String|Number} [time] - 表示日期的字符串或者数字（默认值：今天）
     * @returns {Calendar}
     */

  }, {
    key: "setDate",
    value: function setDate(time) {
      this.data.date = Calendar.getDate(time);
      return this;
    }
    /**
     * 获取日历控件当前显示的年份所在的年代信息
     * ========================================================================
     * @returns {Object} - 返回当前所在年代信息
     */

  }, {
    key: "getYears",
    value: function getYears() {
      return this.data.years;
    }
    /**
     * 获取日历控件在多选（multiple/range/week）模式下选中的日期信息
     * ========================================================================
     * @returns {Array} - 返回选中的日期信息
     */

  }, {
    key: "getPicked",
    value: function getPicked() {
      return this.data.picked;
    }
    /**
     * 根据试图显示模式
     * ========================================================================
     * 1. 切换日历控件的显示模式
     * 2. 更新显示内容
     * ========================================================================
     * @param {Number} viewMode - 显示模式的值：
     *                            0 - 日期显示模式（默认值）
     *                            1 - 月份显示模式
     *                            2 - 年代显示模式
     * @returns {Calendar}
     */

  }, {
    key: "update",
    value: function update() {
      var viewMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.updateViewMode(viewMode).updateView();
      return this;
    }
    /**
     * 更新试图显示模式的配置信息
     * ========================================================================
     * @param {Number} viewMode - 显示模式的值（默认值：0）
     * @see this.update
     * @returns {Calendar}
     */

  }, {
    key: "updateViewMode",
    value: function updateViewMode() {
      var viewMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var mode = viewMode;

      if (mode > 2) {
        mode = 2;
      } else {
        if (mode < 0) {
          mode = 0;
        }
      }

      this.set({
        viewMode: mode
      });
      return this;
    }
    /**
     * 更新日历控件的显示内容
     * ========================================================================
     * 1. 更新标题内容
     *    1.1 日期显示模式：显示年份和月份
     *    1.2 月份显示模式：显示年份
     *    1.3 年份显示模式：显示年代区间信息
     * 2. 更细主体内容
     *    2.1 日期显示模式：隐藏年份和月份的 DOM 节点，显示星期栏和日期信息
     *    2.2 月份显示模式：隐藏年份、星期栏以及日期信息
     *    2.3 年份显示模式：隐藏月份 DOM 节点、星期栏以及日期信息
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "updateView",
    value: function updateView() {
      var STYLES = this.get('STYLES');
      var CLS_HIDDEN = STYLES.HIDDEN;
      var DOM = Calendar.DOM;
      var addClass = DOM.addClass;
      var removeClass = DOM.removeClass;
      var elements = this.getEls();
      var $week = elements.week;
      var $dates = elements.dates;
      var $months = elements.months;
      var $years = elements.years;

      this._renderTitle();

      switch (this.get('viewMode')) {
        // 日期显示模式
        case 0:
          addClass($months, CLS_HIDDEN);
          addClass($years, CLS_HIDDEN);
          removeClass($week, CLS_HIDDEN);
          removeClass($dates, CLS_HIDDEN); // 重新绘制日期

          this._repaintDates();

          break;
        // 月份显示模式

        case 1:
          addClass($week, CLS_HIDDEN);
          addClass($dates, CLS_HIDDEN);
          addClass($years, CLS_HIDDEN);
          removeClass($months, CLS_HIDDEN); // 重新绘制月份

          this._repaintMonths();

          break;
        // 年份显示模式

        case 2:
          addClass($week, CLS_HIDDEN);
          addClass($dates, CLS_HIDDEN);
          addClass($months, CLS_HIDDEN);
          removeClass($years, CLS_HIDDEN); // 重新绘制年份

          this._repaintYears();

          break;
      }

      return this;
    }
    /**
     * 向上翻页
     * ========================================================================
     * 1. 日期显示模式：向上翻页，显示上一个月份的日期信息
     * 2. 月份显示模式：向上翻页，显示上一年的月份信息
     * 3. 年份显示模式：向上翻页，显示上一个年代（10前）的年份信息
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "prev",
    value: function prev() {
      var years = this.getYears();
      var startYear = years.start;
      var year = this.getYear();
      var month = this.getMonth();
      var minYear = this.data.minYear;
      var time; // 针对显示模式，处理相应的翻页逻辑

      switch (this.get('viewMode')) {
        // 日期显示模式
        case 0:
          // 切换月份
          month -= 1; // 到了上一年，切换年份

          if (month < 1) {
            month = 12;
            year -= 1; // 确保不小于最小可以显示的年份

            if (year < minYear) {
              year = minYear;
            }
          }

          time = year + '-' + month + '-1';
          this.setYear(time).setMonth(time);
          break;

        case 1:
          // 切换年份
          year -= 1;

          if (year < minYear) {
            year = minYear;
          }

          this.setYear(year + '-1-1');
          break;

        case 2:
          // 切换年代
          startYear -= 10;

          if (startYear < minYear) {
            startYear = minYear + 9;
          }

          this._setYears(startYear.toString());

          break;
      } // 更新显示内容


      this.updateView();
      return this;
    }
    /**
     * 向下翻页
     * ========================================================================
     * 1. 日期显示模式：向下翻页，显示下一个月份的日期信息
     * 2. 月份显示模式：向下翻页，显示下一年的月份信息
     * 3. 年份显示模式：向下翻页，显示下一个年代（10后）的年份信息
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "next",
    value: function next() {
      var years = this.getYears();
      var startYear = years.start;
      var year = this.getYear();
      var month = this.getMonth();
      var maxYear = this.data.maxYear;
      var time;

      switch (this.get('viewMode')) {
        case 0:
          month += 1;

          if (month > 12) {
            month = 1;
            year += 1;

            if (year > maxYear) {
              year = maxYear;
            }
          }

          time = year + '-' + month + '-1';
          this.setYear(time).setMonth(time);
          break;

        case 1:
          year += 1;

          if (year > maxYear) {
            year = maxYear;
          }

          this.setYear(year + '-1-1');
          break;

        case 2:
          startYear += 10;

          if (startYear > maxYear) {
            startYear = maxYear - 9;
          }

          this._setYears(startYear.toString());

          break;
      }

      this.updateView();
      return this;
    }
    /**
     * 选择日期
     * ========================================================================
     * 1. 选择了选中状态的日期：
     *    1.1 星期区间和单选模式：不做任何处理
     *    1.2 多选模式：取消选中 DOM 节点的选中状态，并且将选中的日期在选中信息移除
     *    1.3 日期区间选择模式下：取消之前选中区间的选中样式，将当前选中的日期 DOM 节点
     *        设置为选中状态。移除之前选中日期信息，并将选中日期信息保存起来
     * 2. 选择了未选中状态的日期：
     *    2.1 单选模式：获取选中日期信息，并用这个信息替换之前选中的信息。移除之前选中样
     *        式，并设置当前选中日期的选中样式
     *    2.2 多选模式：获取选中的日期信息，然后保存到选中信息中，最后设置选中日期的样式
     *    2.3 日期区间选择模式下：
     *    2.4 星期区间选择模式：获取当前选择日期的星期区间信息，移除之前保存的区间信息将
     *        新的区间信息保存起来，移除之前的区间选中样式，并设置当前选中区间的选中样式
     * ========================================================================
     * @param {HTMLElement} $date - 选中的日期 DOM 节点
     * @returns {*}
     */

  }, {
    key: "pickDate",
    value: function pickDate($date) {
      var STYLES = this.get('STYLES');
      var CLS_PICKED = STYLES.PICKED;
      var DOM = Calendar.DOM;
      var hasClass = DOM.hasClass;
      var addClass = DOM.addClass;
      var removeClass = DOM.removeClass;
      var isFunction = Calendar.Utils.isFunction;
      var pickMode = this.get('pickMode');
      var elements = this.getEls();
      var time = $date.getAttribute('data-date');
      var callback = this.get('onDatePick');
      var $picked = null;
      var pickedDates; // 选择了选中状态的日期

      if (hasClass($date, CLS_PICKED)) {
        switch (pickMode) {
          // 单选/星期选择模式
          case 'single':
          case 'week':
            return false;
          // 多选模式

          case 'multiple':
            // 取消选中样式
            removeClass($date, CLS_PICKED); // 移除选中的日期信息

            this._removePicked(time); // 设置最后一个选中的时间为当前选中日期


            pickedDates = this.getPicked();
            this.setDate(pickedDates[pickedDates.length - 1]);

            if (isFunction(callback)) {
              callback(pickedDates, $date, this);
            }

            break;

          case 'range':
            // 清除之前选中的数据
            this.data.picked = []; // 将当前选中的日期数据保存起来

            this.data.picked.push(time);
            this.setDate(time); // 绘制选中样式

            elements.date = $date;

            this._updateDateRanges();

            if (isFunction(callback)) {
              callback(this.getPicked(), $date, this);
            }

            break;
        }
      } else {
        this.setYear(time).setMonth(time); // 选择了未选中状态的日期

        switch (pickMode) {
          case 'single':
            $picked = elements.date; // 移除之前选中日期的选中样式

            if ($picked) {
              removeClass($picked, CLS_PICKED);
            } // 设置当前选中日期的选中样式


            addClass($date, CLS_PICKED);
            elements.date = $date;
            this.setDate(time);

            if (isFunction(callback)) {
              callback(time, $date, this);
            }

            break;

          case 'multiple':
            // 保存选中的日期，并对选中时间排序
            this.data.picked.push(time);
            this.data.picked.sort(); // 设置最晚的那个日期为当前选中日期

            pickedDates = this.getPicked();
            this.setDate(pickedDates[pickedDates.length - 1]);
            addClass($date, CLS_PICKED);

            if (isFunction(callback)) {
              callback(this.getPicked(), $date, this);
            }

            break;

          case 'range':
            // 根据已经选中的日期长度，处理数据的保存
            switch (this.data.picked.length) {
              case 0:
              case 1:
                // 保存选中的日期
                this.data.picked.push(time); // 如果选择两个不同的日期，则完成了范围选择，需要对日期排序

                if (this.data.picked.length === 2) {
                  this.data.picked.sort();
                } // 设置选中日期范围的最后一天为当前选中日期


                pickedDates = this.getPicked();
                this.setDate(pickedDates[pickedDates.length - 1]);
                elements.date = $date;

                this._updateDateRanges();

                if (isFunction(callback)) {
                  callback(pickedDates, $date, this);
                }

                break;

              case 2:
                // 之前已经选中了一个日期范围，现在需要清除之前的数据
                this.data.picked = []; // 保存第一个日期点

                this.data.picked.push(time);
                elements.date = $date;

                this._updateDateRanges();

                break;
            }

            break;

          case 'week':
            // 获得当前选中日期的星期范围
            var ranges = Calendar.getWeekRanges(time); // 清除之前的数据，保存现在的星期日期范围

            this.data.picked = [ranges[0], ranges[ranges.length - 1]];
            this.setDate(ranges[ranges.length - 1]);
            elements.date = $date;

            this._updateWeekRanges();

            if (isFunction(callback)) {
              callback(this.getPicked(), $date, this);
            }

            break;
        }
      }

      return this;
    }
    /**
     * 选择月份
     * ========================================================================
     * 1. 选择了已选中状态的月份：直接切换试图模式到日期试图模式
     * 2. 选择了未选中状态的月份：移除之前选中的月份的选中样式，并当前选中的月份的选中
     *    样式。然后更新选中年份和月份的数据，并切换到日期试图模式
     * ========================================================================
     * @param {HTMLElement} $month - 选中的月份 DOM 节点
     * @returns {Calendar}
     */

  }, {
    key: "pickMonth",
    value: function pickMonth($month) {
      var CLS_PICKED = this.get('STYLES').PICKED;
      var DOM = Calendar.DOM;
      var elements = this.getEls();
      var $picked = elements.month;
      var time = $month.getAttribute('data-month');
      var callback = this.get('onMonthPick'); // 点击已经选中的年份

      if (DOM.hasClass($month, CLS_PICKED)) {
        // 切换到月份试图模式
        this.update();
      } else {
        // 移除之前选中的年份选中样式
        if ($picked) {
          DOM.removeClass($picked, CLS_PICKED);
        } // 设置选中样式


        DOM.addClass($month, CLS_PICKED);
        elements.month = $month;

        this.setYear(time).setMonth(time)._setYears(time).update();
      }

      if (Calendar.Utils.isFunction(callback)) {
        callback(time, $month, this);
      }

      return this;
    }
    /**
     * 选择年份
     * ========================================================================
     * 1. 选择了已选中状态的年份：更新选中的年份信息，并切换到月份试图模式
     * 2. 选择了未选中状态的年份：移除之前选中的年份的选中样式，将当前选中的年份设为选中
     *    样式，并切换到月份试图模式
     * ========================================================================
     * @param {HTMLElement} $year - 选中的年份 DOM 节点
     * @returns {Calendar}
     */

  }, {
    key: "pickYear",
    value: function pickYear($year) {
      var CLS_PICKED = this.get('STYLES').PICKED;
      var DOM = Calendar.DOM;
      var elements = this.getEls();
      var $picked = elements.year;
      var time = $year.getAttribute('data-year');
      var callback = this.get('onYearPick'); // 点击已经选中的月份

      if (DOM.hasClass($year, CLS_PICKED)) {
        // 切换到日期试图模式
        this.setYear(time).update(1);
      } else {
        // 移除之前选中的年份选中样式
        if ($picked) {
          DOM.removeClass($picked, CLS_PICKED);
        } // 设置选中样式


        DOM.addClass($year, CLS_PICKED);
        elements.year = $year; // 更新年份并切换到月份试图

        this.setYear(time)._setYears(time).update(1);
      }

      if (Calendar.Utils.isFunction(callback)) {
        callback(time, $year, this);
      }

      return this;
    }
    /**
     * 选择今天
     * ========================================================================
     * 将今天的年份、月份以及日期信息设置为当前选中日期，并切换到日期试图模式
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "pickToday",
    value: function pickToday() {
      var time = Calendar.getToday().value;
      var callback = this.get('onTodayPick');

      this.setYear(time).setMonth(time).setDate(time)._setYears(time).update();

      if (Calendar.Utils.isFunction(callback)) {
        callback(time, this.getEls().dates.querySelector('[data-date=' + time + ']'), this);
      }

      return this;
    }
    /**
     * 隐藏日历控件
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "hide",
    value: function hide() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var $wrap = this.getEls().wrap;
      Calendar.DOM.addClass($wrap, CLS_HIDDEN);
      return this;
    }
    /**
     * 显示日历控件
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "show",
    value: function show() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var $wrap = this.getEls().wrap;
      Calendar.DOM.removeClass($wrap, CLS_HIDDEN);
      return this;
    }
    /**
     * 隐藏/显示之间切换
     * ========================================================================
     * @returns {Calendar}
     */

  }, {
    key: "toggle",
    value: function toggle() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var $wrap = this.getEls().wrap;

      if (Calendar.DOM.hasClass($wrap, CLS_HIDDEN)) {
        this.show();
      } else {
        this.hide();
      }

      return this;
    }
    /**
     * 设置当前的年代信息
     * ========================================================================
     * @param {String|Number} [time] - 表示年份的字符串或者数字（默认值：今年）
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_setYears",
    value: function _setYears(time) {
      this.data.years = Calendar.getYears(time);
      return this;
    }
    /**
     * （多选模式）移除选中的日期
     * ========================================================================
     * @param {String|Number} time - 表示日期的字符串或者数字
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_removePicked",
    value: function _removePicked(time) {
      var pickedDates = this.getPicked();
      var index = pickedDates.indexOf(time);

      if (index > -1) {
        pickedDates.splice(index, 1);
      }

      return this;
    }
    /**
     * 绘制日历控件的各个主要 DOM 节点
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_createElements",
    value: function _createElements() {
      var STYLES = this.get('STYLES');
      var CLS_WRAP = STYLES.WRAP;
      var CLS_WRAP_WITHOUT_FOOTER = STYLES.WRAP_WITHOUT_FOOTER;
      var CLS_HEADER = STYLES.HEADER;
      var CLS_TITLE = STYLES.TITLE;
      var CLS_SWITCHER = STYLES.SWITCHER;
      var CLS_PREV = STYLES.PREV;
      var CLS_ICON_PREV = STYLES.ICON_PREV;
      var CLS_NEXT = STYLES.NEXT;
      var CLS_ICON_NEXT = STYLES.ICON_NEXT;
      var CLS_BODY = STYLES.BODY;
      var CLS_WEEK = STYLES.WEEK;
      var CLS_DATES = STYLES.DATES;
      var CLS_MONTHS = STYLES.MONTHS;
      var CLS_YEARS = STYLES.YEARS;
      var CLS_FOOTER = STYLES.FOOTER;
      var CLS_FOOTER_DATE = STYLES.FOOTER_DATE;
      var CLS_TODAY = STYLES.TODAY;
      var CLS_FOOTER_TIME = STYLES.FOOTER_TIME;
      var CLS_TIME = STYLES.TIME;
      var CLS_TEXT = STYLES.TEXT;
      var CLS_HIDDEN = STYLES.HIDDEN;
      var SPACE = ' ';
      var hasFooter = this.get('hasFooter');
      var elements = this.getEls();
      var createElement = Calendar.DOM.createElement;
      var wrapClassName = CLS_WRAP;
      var weekClassName = CLS_WEEK;
      var datesClassName = CLS_DATES;
      var monthsClassName = CLS_MONTHS;
      var yearsClassName = CLS_YEARS;

      switch (this.get('viewMode')) {
        case 0:
          monthsClassName += SPACE + CLS_HIDDEN;
          yearsClassName += SPACE + CLS_HIDDEN;
          break;

        case 1:
          weekClassName += SPACE + CLS_HIDDEN;
          datesClassName += SPACE + CLS_HIDDEN;
          yearsClassName += SPACE + CLS_HIDDEN;
          break;

        case 2:
          weekClassName += SPACE + CLS_HIDDEN;
          datesClassName += SPACE + CLS_HIDDEN;
          monthsClassName += SPACE + CLS_HIDDEN;
          break;
      }

      if (!hasFooter) {
        wrapClassName += SPACE + CLS_WRAP_WITHOUT_FOOTER;
      }

      elements.parent = document.getElementById(this.get('parent')); // wrap

      elements.wrap = createElement('div', {
        id: Calendar.Utils.guid('calendar'),
        className: wrapClassName
      }); // header

      elements.header = createElement('div', {
        className: CLS_HEADER
      });
      elements.title = createElement('h4', {
        className: CLS_TITLE
      }, [createElement('span', {
        className: CLS_TEXT
      })]); // 配置了显示上下切换按钮

      if (this.get('hasSwitcher')) {
        elements.switcher = createElement('div', {
          className: CLS_SWITCHER
        });
        elements.prev = createElement('div', {
          className: CLS_PREV
        }, [createElement('span', {
          className: CLS_TEXT
        }, [createElement('i', {
          className: CLS_ICON_PREV
        })])]);
        elements.next = createElement('div', {
          className: CLS_NEXT
        }, [createElement('span', {
          className: CLS_TEXT
        }, [createElement('i', {
          className: CLS_ICON_NEXT
        })])]);
      } // body


      elements.body = createElement('div', {
        className: CLS_BODY
      });
      elements.week = createElement('div', {
        className: weekClassName
      });
      elements.dates = createElement('div', {
        className: datesClassName
      });
      elements.months = createElement('div', {
        className: monthsClassName
      });
      elements.years = createElement('div', {
        className: yearsClassName
      }); // 配置了显示页脚

      if (hasFooter) {
        // footer
        elements.footer = createElement('div', {
          className: CLS_FOOTER
        });
        elements.today = createElement('div', {
          className: CLS_FOOTER_DATE
        }, [createElement('p', {
          className: CLS_TODAY
        }, [createElement('span', {
          className: CLS_TEXT
        })])]); // 配置了显示当前时间

        if (this.get('hasClock')) {
          elements.time = createElement('div', {
            className: CLS_FOOTER_TIME
          }, [createElement('p', {
            className: CLS_TIME
          }, [createElement('span', {
            className: CLS_TEXT
          })])]);
        }
      }

      return this;
    }
    /**
     * 绘制日历控件的标题
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderTitle",
    value: function _renderTitle() {
      var $title = this.getEls().title.querySelector('.' + this.get('STYLES').TEXT);
      var years = this.getYears();
      var year = this.getYear();
      var value = '';

      switch (this.get('viewMode')) {
        case 0:
          // 显示完整的年月时间
          value = Calendar.getMonth(year + '-' + this.getMonth() + '-1').fullText;
          break;

        case 1:
          // 显示年份时间
          value = Calendar.getYear(year + '-1-1').fullText;
          break;

        case 2:
          // 显示年代范围格式时间
          value = years.start + ' - ' + years.end;
          break;
      }

      $title.innerHTML = value;
      return this;
    }
    /**
     * 绘制日历控件的星期栏
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderDays",
    value: function _renderDays() {
      var STYLES = this.get('STYLES');
      var CLS_DAY = STYLES.DAY;
      var CLS_WEEKEND = STYLES.WEEKEND;
      var CLS_TEXT = STYLES.TEXT;
      var DAYS = this.get('DAYS');
      var createElement = Calendar.DOM.createElement;
      var fragment = document.createDocumentFragment();
      DAYS.forEach(function (day, i) {
        var className = i === 0 || i === DAYS.length - 1 ? CLS_DAY + ' ' + CLS_WEEKEND : CLS_DAY; // 先将创建的星期几的 DOM 节点保存到文档碎片

        fragment.appendChild(createElement('div', {
          className: className
        }, [createElement('span', {
          className: CLS_TEXT
        }, [day])]));
      }); // 然后一次性添加到页面，性能会更好

      this.getEls().week.appendChild(fragment);
      return this;
    }
    /**
     * 绘制日历控件的日期信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderDates",
    value: function _renderDates() {
      var DATES = this.get('DATES');
      var isLeapYear = Calendar.isLeapYear; // fragments

      var fragment = document.createDocumentFragment(); // current month

      var year = this.getYear();
      var month = this.getMonth();
      var days = DATES[month - 1];
      var firstDateDay = Calendar.getDay(year + '-' + month + '-' + 1).value; // prev month

      var prevYear = month - 2 < 0 ? year - 1 : year;
      var prevMonth = month - 2 < 0 ? 12 : month - 1;
      var prevDays = DATES[prevMonth - 1]; // next month

      var nextYear = month === 12 ? year + 1 : year;
      var nextMonth = month === 12 ? 1 : month + 1;
      var nextDays; // 如果当前是闰年，上个月是二月份，则闰年二月为29天

      if (isLeapYear(year) && prevMonth === 2) {
        prevDays += 1;
      } else {
        // 如果当前是闰年，当前月份是二月，则本月有29天
        if (isLeapYear(year) && month === 2) {
          days += 1;
        }
      }

      nextDays = 42 - (firstDateDay + days); // 绘制上个月月底的最后几天

      if (firstDateDay !== 0) {
        fragment.appendChild(this._getDatesFragment({
          year: prevYear,
          month: prevMonth,
          start: prevDays - (firstDateDay - 1),
          end: prevDays,
          isPrev: true,
          isNext: false
        }));
      } // 绘制本月的日期


      fragment.appendChild(this._getDatesFragment({
        year: year,
        month: month,
        start: 1,
        end: days,
        isPrev: false,
        isNext: false
      })); // 绘制下个月月头的几天

      if (nextDays > 0) {
        fragment.appendChild(this._getDatesFragment({
          year: nextYear,
          month: nextMonth,
          start: 1,
          end: nextDays,
          isPrev: false,
          isNext: true
        }));
      }

      this.getEls().dates.appendChild(fragment);
      return this;
    }
    /**
     * 重绘日历控件的日期信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_repaintDates",
    value: function _repaintDates() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var DOM = Calendar.DOM;
      var $dates = this.getEls().dates;
      DOM.addClass($dates, CLS_HIDDEN);
      $dates.innerHTML = '';
      DOM.removeClass($dates, CLS_HIDDEN);

      this._renderDates();

      return this;
    }
    /**
     * 获得绘制日期信息时的文档碎片
     * ========================================================================
     * @param {Object} options - 参数对象
     * @param {Number} options.year - 年份
     * @param {Number} options.month - 月份
     * @param {Number} options.start - 开始的日期
     * @param {Number} options.end - 结束的日期
     * @param {Boolean} options.isPrev - 是否为上个月的日期
     * @param {Boolean} options.isNext - 是否为下个月的日期
     * @returns {DocumentFragment}
     * @private
     */

  }, {
    key: "_getDatesFragment",
    value: function _getDatesFragment(options) {
      var _this = this;

      var year = options.year,
          month = options.month,
          start = options.start,
          end = options.end,
          isPrev = options.isPrev,
          isNext = options.isNext;
      var SPACE = ' ';
      var STYLES = this.get('STYLES');
      var CLS_DATE = STYLES.DATE;
      var CLS_DATE_PREV = STYLES.DATE_PREV;
      var CLS_DATE_NEXT = STYLES.DATE_NEXT;
      var CLS_CURRENT = STYLES.CURRENT;
      var CLS_PICKED = STYLES.PICKED;
      var CLS_PICKED_RANGE = STYLES.PICKED_RANGE;
      var CLS_WEEKEND = STYLES.WEEKEND;
      var CLS_TEXT = STYLES.TEXT;
      var createElement = Calendar.DOM.createElement;
      var isDatesEqual = Calendar.isDatesEqual;
      var fragment = document.createDocumentFragment();
      var elements = this.getEls();
      var date = start;
      var pickMode = this.get('pickMode');
      var pickedDates = this.getPicked();

      var _loop = function _loop() {
        var fullDate = year + '-' + month + '-' + date;
        var isCurrent = Calendar.isToday(fullDate);
        var day = Calendar.getDay(fullDate);
        var $children = [createElement('span', {
          className: CLS_TEXT
        }, [date])];
        var className = '';
        var $date = void 0;
        $date = createElement('div', {
          'data-date': fullDate
        }, $children);
        className += CLS_DATE;

        if (isPrev) {
          className += SPACE + CLS_DATE_PREV;
        } else {
          if (isNext) {
            className += SPACE + CLS_DATE_NEXT;
          }
        } // 当前（今天）的日期


        if (isCurrent) {
          className += SPACE + CLS_CURRENT;
        } // 周末


        if (day.value === 0 || day.value === 6) {
          className += SPACE + CLS_WEEKEND;
        }

        switch (pickMode) {
          // 单选模式
          case 'single':
            var pickedDate = _this.getDate().text;

            var isPickedDate = isDatesEqual(fullDate, pickedDate);

            if (isPickedDate) {
              className += SPACE + CLS_PICKED;
              elements.date = $date;
            }

            break;
          // 多选模式

          case 'multiple':
            pickedDates.forEach(function (picked) {
              var isPicked = isDatesEqual(fullDate, picked);

              if (isPicked) {
                className += SPACE + CLS_PICKED;
              }
            });
            break;
          // 区间模式

          case 'range':
          case 'week':
            var dateRanges = []; // 只有选中了两个节点，才绘制选中日期区间的样式

            if (pickedDates.length === 2) {
              dateRanges = Calendar.getRanges(pickedDates[0], pickedDates[1]);
              dateRanges.forEach(function (picked, i) {
                var isPicked = isDatesEqual(fullDate, picked);

                if (!isPicked) {
                  return false;
                } // 设置中间日期的样式


                if (i !== 0 && i !== dateRanges.length - 1) {
                  className += SPACE + CLS_PICKED;
                  className += SPACE + CLS_PICKED_RANGE;
                } else {
                  if (i === 0 || i === dateRanges.length - 1) {
                    className += SPACE + CLS_PICKED;
                  }
                }
              });
            } else {
              if (pickedDates.length === 1) {
                className += SPACE + CLS_PICKED;
              }
            }

            break;
        }

        $date.className = className;
        fragment.appendChild($date);
      };

      for (; date <= end; date += 1) {
        _loop();
      }

      return fragment;
    }
    /**
     * 绘制选中的日期区间选中样式
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_updateDateRanges",
    value: function _updateDateRanges() {
      var STYLES = this.get('STYLES');
      var CLS_PICKED = STYLES.PICKED;
      var CLS_PICKED_RANGE = STYLES.PICKED_RANGE;
      var DOM = Calendar.DOM;
      var hasClass = DOM.hasClass;
      var removeClass = DOM.removeClass;
      var addClass = DOM.addClass;
      var elements = this.getEls();
      var $date = this.elements.date;
      var $dates = elements.dates;
      var $pickedDates = $dates.querySelectorAll('.' + CLS_PICKED);

      switch (this.data.picked.length) {
        case 1:
          // 移除之前的选中样式
          $pickedDates.forEach(function ($picked) {
            removeClass($picked, CLS_PICKED);

            if (hasClass($picked, CLS_PICKED_RANGE)) {
              removeClass($picked, CLS_PICKED_RANGE);
            }
          }); // 绘制选中的第一个端点的选中样式

          addClass($date, CLS_PICKED);
          break;

        case 2:
          var ranges = Calendar.getRanges(this.data.picked[0], this.data.picked[1]);
          ranges.forEach(function (picked, i) {
            var $picked = $dates.querySelector('[data-date="' + picked + '"]'); // 绘制中间区域的选中样式

            if (i > 0 && i < ranges.length - 1) {
              addClass($picked, CLS_PICKED);
              addClass($picked, CLS_PICKED_RANGE);
            }
          }); // 绘制选中的第二个端点的选中样式

          addClass($date, CLS_PICKED);
      }

      return this;
    }
    /**
     * 绘制选中的星期区间
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_updateWeekRanges",
    value: function _updateWeekRanges() {
      var STYLES = this.get('STYLES');
      var CLS_PICKED = STYLES.PICKED;
      var CLS_PICKED_RANGE = STYLES.PICKED_RANGE;
      var DOM = Calendar.DOM;
      var removeClass = DOM.removeClass;
      var addClass = DOM.addClass;
      var elements = this.getEls();
      var $dates = elements.dates;
      var $pickedDates = $dates.querySelectorAll('.' + CLS_PICKED);
      var picked = this.getPicked();
      var ranges = Calendar.getWeekRanges(picked[0]); // 移除之前选中区域的样式

      $pickedDates.forEach(function ($picked) {
        removeClass($picked, CLS_PICKED_RANGE);
        removeClass($picked, CLS_PICKED);
      }); // 设置新的选中区域的样式

      ranges.forEach(function (picked, i) {
        var $picked = $dates.querySelector('[data-date="' + picked + '"]'); // 绘制中间区域

        if (i > 0 && i < ranges.length - 1) {
          addClass($picked, CLS_PICKED);
          addClass($picked, CLS_PICKED_RANGE);
        } else {
          // 绘制两头的节点
          if (i === 0 || i === ranges.length - 1) {
            addClass($picked, CLS_PICKED);
          }
        }
      });
      return this;
    }
    /**
     * 绘制日历控件的月份信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderMonths",
    value: function _renderMonths() {
      var _this2 = this;

      var SPACE = ' ';
      var STYLES = this.get('STYLES');
      var CLS_CURRENT = STYLES.CURRENT;
      var CLS_PICKED = STYLES.PICKED;
      var CLS_MONTH = STYLES.MONTH;
      var CLS_MONTH_PREV = STYLES.MONTH_PREV;
      var CLS_MONTH_NEXT = STYLES.MONTH_NEXT;
      var CLS_TEXT = STYLES.TEXT;
      var MONTHS = this.get('MONTHS');
      var DOM = Calendar.DOM;
      var createElement = DOM.createElement;
      var fragment = document.createDocumentFragment();
      var elements = this.getEls();
      var year = this.getYear();
      var today = Calendar.getToday();
      MONTHS.forEach(function (MONTH, i) {
        var pickedDate = _this2.getDate();

        var className = CLS_MONTH;
        var $month; // 去年的月份

        if (i < 2) {
          className += SPACE + CLS_MONTH_PREV; // 判断是否被选中了

          if (year - 1 === pickedDate.year && MONTH === pickedDate.month) {
            className += SPACE + CLS_PICKED;
          } // 创建月份的 DOM 节点


          $month = createElement('div', {
            className: className,
            'data-month': year - 1 + '-' + MONTH + '-1'
          }, [createElement('span', {
            className: CLS_TEXT
          }, [MONTH])]);
        } else {
          // 今年的月份
          if (i >= 2 && i <= 13) {
            // 判断是否为今天
            if (year === today.year && MONTH === today.month) {
              className += ' ' + CLS_CURRENT;
            } // 判断是否被选中了


            if (year === pickedDate.year && MONTH === pickedDate.month) {
              className += SPACE + CLS_PICKED;
            } // 创建月份的 DOM 节点


            $month = createElement('div', {
              className: className,
              'data-month': year + '-' + MONTH + '-1'
            }, [createElement('span', {
              className: CLS_TEXT
            }, [year + '-' + MONTH])]);
          } else {
            // 明年的月份
            if (i > 13 && i <= 15) {
              className += SPACE + CLS_MONTH_NEXT; // 判断是否被选中了

              if (year + 1 === pickedDate.year && MONTH === pickedDate.month) {
                className += SPACE + CLS_PICKED;
              } // 创建月份的 DOM 节点


              $month = createElement('div', {
                className: className,
                'data-month': year + 1 + '-' + MONTH + '-1'
              }, [createElement('span', {
                className: CLS_TEXT
              }, [MONTH])]);
            }
          }
        } // 将所有月份 DOM 节点缓存到文档碎片中


        fragment.appendChild($month);
      });
      elements.months.appendChild(fragment);
      return this;
    }
    /**
     * 重绘日历控件的月份信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_repaintMonths",
    value: function _repaintMonths() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var DOM = Calendar.DOM;
      var $months = this.getEls().months;
      DOM.addClass($months, CLS_HIDDEN);
      $months.innerHTML = '';
      DOM.removeClass($months, CLS_HIDDEN);

      this._renderMonths();

      return this;
    }
    /**
     * 绘制日历控件的年份信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderYears",
    value: function _renderYears() {
      var years = this.getYears();
      var yearsStart = years.start;
      var yearsEnd = years.end;
      var prevStartYear = yearsStart - 3;
      var prevEndYear = yearsStart - 1;
      var nextStartYear = yearsEnd + 1;
      var nextEndYear = yearsEnd + 3;
      var fragment = document.createDocumentFragment();
      fragment.appendChild(this._getYearsFragment({
        start: prevStartYear,
        end: prevEndYear,
        isPrev: true,
        isNext: false
      }));
      fragment.appendChild(this._getYearsFragment({
        start: yearsStart,
        end: yearsEnd,
        isPrev: false,
        isNext: false
      }));
      fragment.appendChild(this._getYearsFragment({
        start: nextStartYear,
        end: nextEndYear,
        isPrev: false,
        isNext: true
      }));
      this.getEls().years.appendChild(fragment);
      return this;
    }
    /**
     * 重绘日历控件的年份信息
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_repaintYears",
    value: function _repaintYears() {
      var CLS_HIDDEN = this.get('STYLES').HIDDEN;
      var DOM = Calendar.DOM;
      var $years = this.getEls().years;
      DOM.addClass($years, CLS_HIDDEN);
      $years.innerHTML = '';
      DOM.removeClass($years, CLS_HIDDEN);

      this._renderYears();

      return this;
    }
    /**
     * 获取绘制年份信息的文档碎片
     * ========================================================================
     * @param {Object} options - 参数对象
     * @param {Number} options.start - 开始年份
     * @param {Number} options.end - 结束年份
     * @param {Boolean} options.isPrev - 是否为上个年代的年份
     * @param {Boolean} options.isNext - 是否为下个年带的年份
     * @returns {DocumentFragment}
     * @private
     */

  }, {
    key: "_getYearsFragment",
    value: function _getYearsFragment(options) {
      var start = options.start,
          end = options.end,
          isPrev = options.isPrev,
          isNext = options.isNext;
      var STYLES = this.get('STYLES');
      var CLS_YEAR = STYLES.YEAR;
      var CLS_YEAR_PREV = STYLES.YEAR_PREV;
      var CLS_YEAR_NEXT = STYLES.YEAR_NEXT;
      var CLS_CURRENT = STYLES.CURRENT;
      var CLS_PICKED = STYLES.PICKED;
      var CLS_DISABLED = STYLES.DISABLED;
      var CLS_TEXT = STYLES.TEXT;
      var DOM = Calendar.DOM;
      var createElement = DOM.createElement;
      var fragment = document.createDocumentFragment();
      var elements = this.getEls();
      var minYear = this.data.minYear;
      var maxYear = this.data.maxYear;
      var year = start;

      for (; year <= end; year += 1) {
        var pickedDate = this.getDate();
        var isCurrent = year === Calendar.getToday().year;
        var isPicked = year === pickedDate.year;
        var className = CLS_YEAR;
        var $year = createElement('div', {
          'data-year': year + '-1-1'
        }, [createElement('span', {
          className: CLS_TEXT
        }, [year])]);

        if (isPrev) {
          className += ' ' + CLS_YEAR_PREV;
        } else {
          if (isNext) {
            className += ' ' + CLS_YEAR_NEXT;
          }
        }

        if (isCurrent) {
          className += ' ' + CLS_CURRENT;
        }

        if (isPicked) {
          className += ' ' + CLS_PICKED;
          elements.year = $year;
        }

        if (year < minYear || year > maxYear) {
          className += ' ' + CLS_DISABLED;
        }

        $year.className = className;
        fragment.appendChild($year);
      }

      return fragment;
    }
    /**
     * 绘制日历控件的页脚
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_renderFooter",
    value: function _renderFooter() {
      var STYLES = this.get('STYLES');
      var CLS_TEXT = STYLES.TEXT;
      var elements = this.getEls();
      var $today = elements.today.querySelector('.' + CLS_TEXT);
      var today = Calendar.getToday();
      var timer = null;

      var renderTime = function renderTime() {
        var $time = elements.time.querySelector('.' + CLS_TEXT);
        var time = new Date();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();

        if (timer) {
          clearTimeout(timer);
        }

        if (hours < 10) {
          hours = '0' + hours;
        }

        if (minutes < 10) {
          minutes = '0' + minutes;
        }

        if (seconds < 10) {
          seconds = '0' + seconds;
        }

        $time.innerHTML = hours + ':' + minutes + ':' + seconds;
        timer = setTimeout(renderTime, 1000);
      };

      $today.innerHTML = '今天：' + today.text;
      Calendar.DOM.setAttribute($today, 'data-date', today.value);

      if (this.get('hasClock')) {
        renderTime();
      }

      return this;
    }
    /**
     * 点击标题的事件处理器
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_titleClick",
    value: function _titleClick() {
      var viewMode = this.get('viewMode');
      viewMode += 1;

      if (viewMode > 2) {
        viewMode = 2;
      }

      this.update(viewMode);
      return this;
    }
    /**
     * 点击向上翻页的事件处理器
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_prevClick",
    value: function _prevClick() {
      this.prev();
      return this;
    }
    /**
     * 点击向下翻页的事件处理起
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_nextClick",
    value: function _nextClick() {
      this.next();
      return this;
    }
    /**
     * 点击日期的事件处理器
     * ========================================================================
     * @param {Event} evt - 事件对象
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_dateClick",
    value: function _dateClick(evt) {
      var $el = evt.delegateTarget;
      var time = $el.getAttribute('data-date');
      var picked;
      this.pickDate($el);
      picked = this.getPicked();
      console.log('------------- _dateClick -------------');

      if (this.get('pickMode') === 'single') {
        console.log(time);
      } else {
        console.log(picked);
      }

      return this;
    }
    /**
     * 点击月份的事件处理器
     * ========================================================================
     * @param {Event} evt - 事件对象
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_monthClick",
    value: function _monthClick(evt) {
      var $month = evt.delegateTarget;
      var time = $month.getAttribute('data-month');
      this.pickMonth($month);
      console.log('------------- _monthClick -------------');
      console.log(time);
      return this;
    }
    /**
     * 点击年份的事件处理器
     * ========================================================================
     * @param {Event} evt - 事件对象
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_yearClick",
    value: function _yearClick(evt) {
      var $el = evt.delegateTarget;
      var time = $el.getAttribute('data-year');
      this.pickYear($el);
      console.log('------------- _yearClick -------------');
      console.log(time);
      return this;
    }
    /**
     * 点击今天的事件处理器
     * ========================================================================
     * @returns {Calendar}
     * @private
     */

  }, {
    key: "_todayClick",
    value: function _todayClick() {
      var elements = this.getEls();
      var time = Calendar.getToday().text;
      this.pickToday(); // 触发日期选择逻辑

      this.pickDate(elements.dates.querySelector('[data-date="' + time + '"]'));
      console.log('------------- _todayClick -------------');
      console.log(time);
      return this;
    }
    /**
     * 获得年份信息
     * ========================================================================
     * @param {String|Number} [val] - 表示年份的字符串或者数字（默认值：今年）
     * @returns {{value: (Number|{value, text, fullText}), text: string, fullText: string}}
     */

  }], [{
    key: "getYear",
    value: function getYear(val) {
      var time = !val ? new Date() : new Date(Calendar.toAllSupported(val));
      var year = time.getFullYear();
      return {
        value: year,
        text: year.toString(),
        fullText: year + '年'
      };
    }
    /**
     * 获取月份信息
     * ========================================================================
     * @param {String|Number} [val] - 表示月份的字符串或者数字（默认值：本月）
     * @returns {{value: number, text: string, fullText: string}}
     */

  }, {
    key: "getMonth",
    value: function getMonth(val) {
      var time = !val ? new Date() : new Date(Calendar.toAllSupported(val));
      var year = Calendar.getYear(val);
      var month = time.getMonth();
      month += 1;
      return {
        value: month,
        text: year.text + '-' + month,
        fullText: year.fullText + month + '月'
      };
    }
    /**
     * 获取日期信息
     * ========================================================================
     * @param {String|Number} [val] - 表示日期的字符串或者数字（默认值：今天）
     * @returns {{year: (Number|{value, text}), month: number, date: number, day: number, text: string, fullText: string}}
     */

  }, {
    key: "getDate",
    value: function getDate(val) {
      var time = !val ? new Date() : new Date(Calendar.toAllSupported(val));
      var year = Calendar.getYear(val);
      var month = Calendar.getMonth(val);
      var date = time.getDate();
      var day = Calendar.getDay(val);
      var fullDate = year.value + '-' + month.value + '-' + date;
      var text = month.fullText + date + '日';
      return {
        year: year.value,
        month: month.value,
        date: date,
        day: day.value,
        text: fullDate,
        fullText: text + ' ' + day.fullText
      };
    }
    /**
     * 获取星期信息
     * ========================================================================
     * @param {String|Number} [val] - 表示日期的字符串或者数字（默认值：今天）
     * @returns {{value: number, text: string, fullText: string}}
     */

  }, {
    key: "getDay",
    value: function getDay(val) {
      var time = !val ? new Date() : new Date(Calendar.toAllSupported(val));
      var day = time.getDay();
      var text = Calendar.defaults.DAYS[day];
      return {
        value: day,
        text: text,
        fullText: '星期' + text
      };
    }
    /**
     * 获取今天的日期信息
     * ========================================================================
     * @returns {{year: (Number|{value, text}), month: number, date: number, day: number, text: string, fullText: string}}
     */

  }, {
    key: "getToday",
    value: function getToday() {
      return Calendar.getDate();
    }
    /**
     * 获取年代信息
     * ========================================================================
     * @param {String|Number} [val] - 表示年份的字符串或者数字（默认值：今年）
     * @returns {{start: (number|Number|{value, text}), end: (*|number)}}
     */

  }, {
    key: "getYears",
    value: function getYears(val) {
      var year = Calendar.getYear(val).value;
      var numbers = year.toString().split('');
      var lastNumber = parseInt(numbers[numbers.length - 1], 10);
      var yearsStart = 0;
      var yearsEnd = 0;

      if (lastNumber === 0) {
        yearsStart = year;
        yearsEnd = year + 9;
      } else {
        if (lastNumber === 9) {
          yearsStart = year - 9;
          yearsEnd = year;
        } else {
          yearsStart = year - lastNumber;
          yearsEnd = year + (9 - lastNumber);
        }
      }

      return {
        start: yearsStart,
        end: yearsEnd
      };
    }
    /**
     * 获取日期所属的整个星期的日期区间信息
     * ========================================================================
     * @param {String} time - 表示日期的字符串
     * @returns {Array}
     */

  }, {
    key: "getWeekRanges",
    value: function getWeekRanges(time) {
      var DATES = Calendar.defaults.DATES;
      var isLeapYear = Calendar.isLeapYear;
      var day = Calendar.getDay(time).value;
      var begins = time.split('-');
      var year = parseInt(begins[0], 10);
      var month = parseInt(begins[1], 10);
      var date = parseInt(begins[2], 10);
      var days = DATES[month - 1];
      var startYear = year;
      var startMonth = month;
      var startDate = date - day;
      var endYear = year;
      var endMonth = month;
      var endDate = date + (6 - day);
      var prevMonth = 0; // 闰年2月为29天，默认值为28天，所以需要+1天

      if (isLeapYear(year) && month === 2) {
        days += 1;
      }

      if (startDate < 1) {
        // 上一个月
        prevMonth = month - 2;
        startMonth -= 1;

        if (prevMonth < 0) {
          startYear -= 1;
          startMonth = 12;
          startDate = DATES[11] + startDate;
        } else {
          // 开始日期
          startDate = DATES[prevMonth] + startDate;
        }
      }

      if (endDate > days) {
        endMonth += 1; // 结束日期

        endDate = endDate - days;

        if (prevMonth > 11) {
          endYear += 1;
          endMonth = 1;
        }
      }

      return Calendar.getRanges(startYear + '-' + startMonth + '-' + startDate, endYear + '-' + endMonth + '-' + endDate);
    }
    /**
     * 获取两个日期之间的所有日期信息
     * ========================================================================
     * @param {String} begin - 表示日期的字符串
     * @param {String} end - 表示日期的字符串
     * @returns {Array}
     */

  }, {
    key: "getRanges",
    value: function getRanges(begin, end) {
      var ONE_DAY_TO_SECONDS = 24 * 60 * 60 * 1000;
      var ranges = [];
      var begins = begin.split('-');
      var ends = end.split('-');
      var beginTime = new Date();
      var endTime = new Date();
      var beginNumber;
      var endNumber;
      var timeNumber;
      beginTime.setUTCFullYear(parseInt(begins[0], 10), parseInt(begins[1], 10) - 1, parseInt(begins[2], 10));
      endTime.setUTCFullYear(parseInt(ends[0], 10), parseInt(ends[1], 10) - 1, parseInt(ends[2], 10));
      beginNumber = beginTime.getTime();
      endNumber = endTime.getTime();
      timeNumber = beginNumber;

      for (; timeNumber <= endNumber; timeNumber += ONE_DAY_TO_SECONDS) {
        ranges.push(Calendar.getDate(timeNumber).text);
      }

      return ranges;
    }
    /**
     * 判断是否为闰年
     * ========================================================================
     * @param {Number} year - 年份数值
     * @returns {boolean}
     */

  }, {
    key: "isLeapYear",
    value: function isLeapYear(year) {
      return (year % 4 === 0 || year % 400 === 0) && year % 100 !== 0;
    }
    /**
     * 判断是否为今天
     * ========================================================================
     * @param {String|Number} time - 表示日期的字符串或者数字
     * @returns {*}
     */

  }, {
    key: "isToday",
    value: function isToday(time) {
      return Calendar.isDatesEqual(time);
    }
    /**
     * 判断两个日期是否相等
     * ========================================================================
     * @param {String|Number} dateOne - 表示日期的字符串或者数字
     * @param {String|Number} [dateTwo] - 表示日期的字符串或者数字（默认值：今天）
     * @returns {boolean}
     */

  }, {
    key: "isDatesEqual",
    value: function isDatesEqual(dateOne, dateTwo) {
      var getDate = Calendar.getDate;
      return Calendar.isEqual(getDate(dateOne).text, getDate(dateTwo).text);
    }
    /**
     * 判断两个时间是否相等
     * ========================================================================
     * @param {String|Number} timeOne - 表示日期的字符串或者数字
     * @param {String|Number} timeTwo - 表示日期的字符串或者数字
     * @returns {boolean}
     */

  }, {
    key: "isEqual",
    value: function isEqual(timeOne, timeTwo) {
      var toAllSupported = Calendar.toAllSupported;
      return new Date(toAllSupported(timeOne)).getTime() === new Date(toAllSupported(timeTwo)).getTime();
    }
  }, {
    key: "toAllSupported",
    value: function toAllSupported(time) {
      var Utils = Calendar.Utils;
      var date = [];

      if (Utils.isNumber(time)) {
        return time;
      } else {
        if (Utils.isString(time)) {
          if (time.indexOf('-')) {
            date = time.split('-');
          } else {
            if (time.indexOf('/')) {
              date = time.split('/');
            }
          }

          if (date.length === 1) {
            date.push('1');
            date.push('1');
          } else {
            if (date.length === 2) {
              // 例如：'2019-1'
              if (date[0].length === 4) {
                date.push('1');
              } else {
                // 例如：'1-2019'
                if (data[1].length === 4) {
                  date.unshift('1');
                }
              }
            }
          }

          return date.join('/');
        }
      }
    }
  }]);

  return Calendar;
}();
/**
 * 日历控件默认的配置信息
 * ========================================================================
 */


Calendar.defaults = {
  parent: 'calendar',
  time: '',
  // 0 - 日期显示模式（默认值）
  // 1 - 月份显示模式
  // 2 - 年代显示模式
  viewMode: 0,
  // single - 单选（默认值）
  // multiple - 多选
  // range - 范围多选
  // week - 整个星期选择
  pickMode: 'single',
  hasSwitcher: true,
  hasFooter: true,
  hasClock: true,
  onDatePick: null,
  onMonthPick: null,
  onYearPick: null,
  onTodayPick: null,
  MONTHS: [11, 12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2],
  DAYS: ['日', '一', '二', '三', '四', '五', '六'],
  DATES: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  STYLES: {
    WRAP: 'cal-md',
    WRAP_WITHOUT_FOOTER: 'cal-md-without-footer',
    HEADER: 'cal-hd',
    TITLE: 'cal-title',
    SWITCHER: 'cal-switcher',
    PREV: 'cal-prev',
    ICON_PREV: 'icon-angle-up',
    NEXT: 'cal-next',
    ICON_NEXT: 'icon-angle-down',
    BODY: 'cal-bd',
    WEEK: 'cal-week',
    WEEKEND: 'cal-weekend',
    DAY: 'cal-day',
    DATES: 'cal-dates',
    DATE: 'cal-date',
    DATE_PREV: 'cal-date-prev',
    DATE_NEXT: 'cal-date-next',
    MONTHS: 'cal-months',
    MONTH: 'cal-month',
    MONTH_PREV: 'cal-month-prev',
    MONTH_NEXT: 'cal-month-next',
    YEARS: 'cal-years',
    YEAR: 'cal-year',
    YEAR_PREV: 'cal-year-prev',
    YEAR_NEXT: 'cal-year-next',
    FOOTER: 'cal-ft',
    FOOTER_DATE: 'cal-ft-date',
    TODAY: 'cal-today',
    FOOTER_TIME: 'cal-ft-time',
    TIME: 'cal-time',
    TEXT: 'cal-text',
    CURRENT: 'cal-current',
    PICKED: 'cal-picked',
    PICKED_RANGE: 'cal-picked-range',
    PICKED_POINT: 'cal-picked-point',
    DISABLED: 'cal-disabled',
    HIDDEN: 'cal-hidden'
  }
  /**
   * 常用的工具方法
   * ========================================================================
   */

};
Calendar.Utils = {
  uuid: 0,
  isString: function isString(o) {
    return typeof o === 'string';
  },
  isNumber: function isNumber(o) {
    return typeof o === 'number';
  },
  isArray: function isArray(o) {
    if (Array.isArray) {
      return Array.isArray(o);
    } else {
      return Object.prototype.toString.apply(o) === '[object Array]';
    }
  },
  isFunction: function isFunction(o) {
    return typeof o === 'function' || Object.prototype.toString.apply(o) === '[object Function]';
  },
  isElement: function isElement(o) {
    return o && o.nodeName && o.tagName && o.nodeType === 1;
  },
  guid: function guid(prefix) {
    var Utils = Calendar.Utils;
    Utils.uuid += 1;
    return prefix ? prefix + '-' + Utils.uuid : 'guid-' + Utils.uuid;
  },
  trim: function trim(str) {
    return str.replace(/^\s+/g, '').replace(/\s+$/g, '');
  },
  stripTags: function stripTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, '');
  }
  /**
   * DOM 操作相关的工具方法
   * ========================================================================
   */

};
Calendar.DOM = {
  /**
   * 创建 DOM 节点，并添加属性和子节点
   * ========================================================================
   * @param {String} tagName - 标签名称
   * @param {Object} attributes - 属性对象
   * @param {Array} [children] - 子节点数组
   * @returns {HTMLElement}
   */
  createElement: function createElement(tagName, attributes, children) {
    var Utils = Calendar.Utils;
    var element = document.createElement(tagName);

    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        Calendar.DOM.setAttribute(element, attr, attributes[attr]);
      }
    }

    if (Utils.isArray(children)) {
      children.forEach(function (child) {
        var childNode;

        if (Utils.isElement(child)) {
          childNode = child;
        } else {
          if (Utils.isString(child) || Utils.isNumber(child)) {
            var text = Utils.isString(child) ? Utils.trim(Utils.stripTags(child)) : child.toString();
            childNode = document.createTextNode(text);
          }
        }

        element.appendChild(childNode);
      });
    }

    return element;
  },

  /**
   * 给 DOM 节点设置属性/值
   * ========================================================================
   * @param {HTMLElement} el - DOM 节点
   * @param {String} attr - 属性名称
   * @param {String|Number|Boolean} value - 属性值
   */
  setAttribute: function setAttribute(el, attr, value) {
    var tagName = el.tagName.toLowerCase();

    switch (attr) {
      case 'style':
        el.style.cssText = value;
        break;

      case 'value':
        if (tagName === 'input' || tagName === 'textarea') {
          el.value = value;
        } else {
          el.setAttribute(attr, value);
        }

        break;

      case 'className':
        el.className = value;
        break;

      default:
        el.setAttribute(attr, value);
        break;
    }
  },

  /**
   * 检测 DOM 节点是否包含名为 className 的样式
   * ========================================================================
   * @param {HTMLElement} el - DOM 节点
   * @param {String} className - 样式名称
   * @returns {*}
   */
  hasClass: function hasClass(el, className) {
    var allClass = el.className;

    if (!allClass) {
      return false;
    }

    return allClass.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
  },

  /**
   * 给 DOM 节点添加名为 className 的样式
   * ========================================================================
   * @param {HTMLElement} el - DOM 节点
   * @param {String} className - 样式名称
   * @returns {Boolean}
   */
  addClass: function addClass(el, className) {
    var allClass = el.className;

    if (Calendar.DOM.hasClass(el, className)) {
      return false;
    }

    allClass += allClass.length > 0 ? ' ' + className : className;
    el.className = allClass;
  },

  /**
   * 移除 DOM 节点的 className 样式
   * ========================================================================
   * @param {HTMLElement} el - DOM 节点
   * @param {String} className - 样式名称
   * @returns {Boolean}
   */
  removeClass: function removeClass(el, className) {
    var allClass = el.className;

    if (!allClass || !Calendar.DOM.hasClass(el, className)) {
      return false;
    }

    allClass = Calendar.Utils.trim(allClass.replace(className, ''));
    el.className = allClass;
  }
};
/**
 * 代理事件
 * ========================================================
 * 说明：代码修改至 Nicolas Gallagher 的 delegate.js
 * 项目 GitHub 地址：https://github.com/necolas/delegate.js
 * ========================================================
 */

Calendar.Delegate = {
  /**
   * 绑定代理事件
   * ========================================================================
   * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
   * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
   * @param {String} type - 事件类型
   * @param {Function} callback - 绑定事件的回调函数
   * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
   * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
   * @param {Boolean} [once] - 是否只触发一次（默认值：false - 事件冒泡）
   */
  on: function on(el, selector, type, callback, context, capture,
  /* private */
  once) {
    var Delegate = Calendar.Delegate;

    var wrapper = function wrapper(e) {
      var delegateTarget = Delegate.getDelegateTarget(el, e.target, selector);
      e.delegateTarget = delegateTarget;

      if (delegateTarget) {
        if (once === true) {
          Delegate.off(el, type, wrapper);
        }

        callback.call(context || el, e);
      }
    };

    if (type === 'mouseenter' || type === 'mouseleave') {
      capture = true;
    }

    callback._delegateWrapper = callback;
    el.addEventListener(type, wrapper, capture || false);
    return callback;
  },

  /**
   * 绑定只触发一次的事件
   * ========================================================================
   * @param {HTMLElement} el - 绑定代理事件的 DOM 节点
   * @param {String} selector - 触发 el 代理事件的 DOM 节点的选择器
   * @param {String} type - 事件类型
   * @param {Function} callback - 绑定事件的回调函数
   * @param {Object} [context] - callback 回调函数的 this 上下文（默认值：el）
   * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
   */
  once: function once(el, type, selector, callback, context, capture) {
    Calendar.Delegate.on(el, type, selector, callback, context, capture, true);
  },

  /**
   * 取消事件绑定
   * ========================================================================
   * @param {HTMLElement} el - 取消绑定（代理）事件的 DOM 节点
   * @param {String} type - 事件类型
   * @param {Function} callback - 绑定事件的回调函数
   * @param {Boolean} [capture] - 是否采用事件捕获（默认值：false - 事件冒泡）
   */
  off: function off(el, type, callback, capture) {
    if (callback._delegateWrapper) {
      callback = callback._delegateWrapper;
      delete callback._delegateWrapper;
    }

    if (type === 'mouseenter' || type === 'mouseleave') {
      capture = true;
    }

    el.removeEventListener(type, callback, capture || false);
  },

  /**
   * 停止事件（阻止默认行为和阻止事件的捕获或冒泡）
   * ========================================================================
   * @param {Event} evt - 事件对象
   */
  stop: function stop(evt) {
    var Delegate = Calendar.Delegate;
    Delegate.stopPropagation(evt);
    Delegate.preventDefault(evt);
  },

  /**
   * 终止事件在传播过程的捕获或冒泡
   * ========================================================================
   * @param {Event} evt - 事件对象
   */
  stopPropagation: function stopPropagation(evt) {
    var event = window.event;

    if (evt.stopPropagation) {
      evt.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  /**
   * 阻止事件的默认行为
   * ========================================================================
   * @param {Event} evt - 事件对象
   */
  preventDefault: function preventDefault(evt) {
    var event = window.event;

    if (evt.preventDefault) {
      evt.preventDefault();
    } else {
      event.returnValue = false;
    }
  },

  /**
   * 通过 className 获得事件代理节点的事件代理目标节点
   * ========================================================================
   * @param {HTMLElement} el - 绑定事件代理的节点
   * @param target - （触发事件后）事件的目标对象
   * @param selector - 目标节点的类选择器
   * @returns {HTMLElement|Null}
   */
  getDelegateTarget: function getDelegateTarget(el, target, selector) {
    while (target && target !== el) {
      if (Calendar.DOM.hasClass(target, selector.replace('.', ''))) {
        return target;
      }

      target = target.parentElement;
    }

    return null;
  }
}; // 为了处理不兼容 Object.assign

if (!Calendar.Utils.isFunction(Object.assign)) {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      // .length of function is 2
      'use strict';

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }

      return to;
    },
    writable: true,
    configurable: true
  });
}
return Calendar;
}));
