/*!
 * sliding-dialog.js v0.0.1 
 * Copyright 2012, Spider Strategies <nathan.bowser@spiderstrategies.com> 
 * sliding-dialog.js may be freely distributed under the BSD license. 
*/
(function (Backbone) {
  "use strict"

  var template = "<div>" +
                    "<div class='dropdown-opener'></div>" +
                    "<div class='dropdown-content closed'>" +
                      "<div class='dropdown-content-inner'></div>" +
                    "</div>" +
                 "</div>"

  var SlidingDialog = Backbone.View.extend({

    events: {
      'click .dropdown-opener': 'open',
      'webkitTransitionEnd .dropdown-content': 'transitionEnd',
      'transitionEnd .dropdown-content': 'transitionEnd',
      'oTransitionEnd .dropdown-content': 'transitionEnd',
      'msTransitionEnd .dropdown-content': 'transitionEnd'
    },

    transitionEnd: function (e) {
      if (this.content.hasClass('open')) {
        this.content.css('max-height', 9999)
      }
    },

    initialize: function (opts) {
      if (!opts || !opts.opener || !opts.content) {
        throw new Error('Pass in opts.opener and opts.content')
      }
      this.model = {
        opener: opts.opener,
        content: opts.content
      }
    },

    render: function () {
      this.$el.html(_.template(template)())
      this.$('.dropdown-opener').html(this.model.opener)
      this.$('.dropdown-content-inner').html(this.model.content)
      this.content = this.$('.dropdown-content')
      return this
    },

    open: function (e) {
      var self = this
      this.content.toggleClass('closed open')
      this.$('.dropdown-opener').toggleClass('dropdown-opener-rotate')

      if (this.content.hasClass('closed')) {
        this.content.css('max-height', this.content.outerHeight())
        setTimeout(function () {
          self.content.css({ 'max-height': 0, 'opacity': 0 })
        }, 10)
        self.trigger('close')
      } else {
        var h = this.content.outerHeight() + this.content.find('.dropdown-content-inner').outerHeight()
        this.content.css({ 'max-height': h, 'opacity': 1 })
        self.trigger('open')
      }
    }
  })

  Backbone.SlidingDialog = SlidingDialog

  return Backbone

})(window.Backbone)
