/**
 * @fileoverview 文本框输入组件，向下兼容placeholder、字数长度限制（截断）、字符过滤、自动高亮、校验
 * @author shouzuo<aloysious.ld@taobao.com>
 * @module richinput
 **/
KISSY.add('gallery/richinput/1.0/index', function (S, Base, NODE, DOM, EVENT) {

	"use strict";

	function RichInput(id, cfg) {
		if (this instanceof RichInput) {

			this.con = DOM.get(id);

			RichInput.superclass.constructor.call(this, cfg);
			this.init();

		} else {
			return new RichInput(id, cfg);
		}
	}

	RichInput.ATTRS = {
		// 允许输入的最大长度，默认为不限制长度
		maxLength: {
			value: null
		},

		// 字符过滤（包含或排除），默认不做过滤
		filter: {
			value: {
				include: false,  // false表示排除，true表示包含
				chars: []          // 排除或包含的字符集合，正则表示
			}
		},

		// 选中时是否全选高亮，默认不做全选高亮
		isHighlight: {
			value: false
		},

		// 校验的配置
		validate: {
			value: {
				auto: false,     // 是否自动校验，默认不做自动校验
				trigger: 'blur', // 校验的触发时机，默认为blur，可选值：'blur'|'change'
				pattern: [],     // 校验的格式，可选值：'email'|'url'|'phone'|'number'|'money'|'dateIOS'|'date'|'alpha'
				min: null,       // 最小值，只在pattern为'number'时执行
				max: null        // 最大值，只在pattern为'number'时执行
			}
		},

		// 组件使用者自定义的同步校验函数
		syncValidateFn: {
			value: function() {
				return '';
			}
		},

		// 组件使用者自定义的异步校验函数
		asycValidateFn: {
			value: function() {
				return '';
			}
		}
	};

	S.extend(RichInput, S.Base, {

		init: function() {
			this.render();
		},

		render: function() {
			this.renderUI();
			this.bindUI();
			this.syncUI();
		},

		renderUI: function() {
			this._renderPlaceholder();
		},

		bindUI: function() {},

		syncUI: function() {},

		destory: function() {},

		_renderPlaceholder: function() {
			
		},
	}, {
		PATTERN: {
			email: /^[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
			url: /((https?|ftp|gopher|telnet|file|notes|ms-help):((\/\/)|(\\\\))+[\w\d:#@%/;$()~_?\+-=\\\.&]*)/i,
			phone: /([\+][0-9]{1,3}([ \.\-])?)?([\(]{1}[0-9]{3}[\)])?([0-9A-Z \.\-]{1,32})((x|ext|extension)?[0-9]{1,4}?)/,
			number: /^\d+$/,
			money: /^\d+(\.)?(\d+)?$/,
			// Date in ISO format. Credit: bassistance
			dateISO: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
			date: /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/,
			alpha: /[a-zA-Z]+/,
			alphaNumeric: /\w+/,
			integer: /^\d+$/
		},
		ERROR_MSG: {
			email: "邮件输入格式错误",
			url: "url输入格式错误",
			required: "请输入必填内容",
			money: "请输入正确的价格",
			date: "请输入正确日期",
			min: "超出最小值",
			max: "超出最大值",
			number: "请输入正确数字",
			integer: "请输入正确整数"
		}
	});

	return RichInput;

}, {
	requires: ['base','node', 'dom', 'event']
});
