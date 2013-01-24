/*!
 * sliding-dialog.js v0.0.2 
 * Copyright 2012, Spider Strategies <nathan.bowser@spiderstrategies.com> 
 * sliding-dialog.js may be freely distributed under the BSD license. 
*/
(function (root) {
  "use strict"

  var EventEmitter = function () {}

  EventEmitter.prototype.init = function () {
   this.jq = $(this)
  }

  EventEmitter.prototype.emit = EventEmitter.prototype.trigger = function (evt, data) {
    !this.jq && this.init()
    this.jq.trigger(evt, data)
  }

  EventEmitter.prototype.once = function (evt, fn) {
    !this.jq && this.init()
    this.jq.one(evt, fn)
  }

  EventEmitter.prototype.on = function (evt, fn) {
    !this.jq && this.init()
    this.jq.bind(evt, fn)
  }

  EventEmitter.prototype.off = function (evt, fn) {
    !this.jq && this.init()
    this.jq.unbind(evt, fn)
  }

  var template = "<div>" +
                    "<div class='dropdown-opener'></div>" +
                    "<div class='dropdown-content closed'>" +
                      "<div class='dropdown-content-inner'></div>" +
                    "</div>" +
                 "</div>"

  var SlidingDialog = function (opts) {
    if (!opts || !opts.opener || !opts.content) {
      throw new Error('Pass in opts.opener and opts.content')
    }
    this.model = {
      opener: opts.opener,
      content: opts.content
    }
  }

  SlidingDialog.prototype.transitionEnd = function (e) {
    if ($('.dropdown-content').hasClass('open')) {
      $('.dropdown-content').css('max-height', 9999)
    }
  }

  SlidingDialog.prototype.render = function () {
    this.$el = $('<div>').html(template)
    this.$el.find('.dropdown-opener').html(this.model.opener)
    this.$el.find('.dropdown-content-inner').html(this.model.content)
    var self = this
    $(document).on('click', '.dropdown-opener', function () {
      self.toggle()
    })
    $(document).on('webkitTransitionEnd transitionEnd oTransitionEnd msTransitionEnd', function () {
      self.transitionEnd()
    })

    return this
  }

  SlidingDialog.prototype.collapse = function () {
    var content = $('.dropdown-content')
    content.removeClass('open').addClass('closed')
    $('.dropdown-opener').removeClass('dropdown-opener-rotate')
    content.css('max-height', content.outerHeight())
    setTimeout(function () {
      content.css({ 'max-height': 0, 'opacity': 0 })
    }, 10)
    this.trigger('close')
  }

  SlidingDialog.prototype.expand = function () {
    var content = $('.dropdown-content')
    content.removeClass('closed').addClass('open')
    $('.dropdown-opener').addClass('dropdown-opener-rotate')
    var h = content.outerHeight() + content.find('.dropdown-content-inner').outerHeight()
    content.css({ 'max-height': h, 'opacity': 1 })
    this.trigger('open')
  }

  SlidingDialog.prototype.toggle = function (e) {
    $('.dropdown-content').hasClass('open') ? this.collapse() : this.expand()
  }

  $.extend(SlidingDialog.prototype, new EventEmitter)

  root.SlidingDialog = SlidingDialog

})(window)
