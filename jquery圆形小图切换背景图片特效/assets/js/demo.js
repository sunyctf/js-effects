/**
 * demo.js
 * https://coidea.website
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, COIDEA
 * https://coidea.website
 */

  $('.slideshow').imagesLoaded({ background: true })
  .done( function() {
    // hide loader
    $('.loader').addClass('is-loaded');
    
    // init variables
    var slideshow = $(".slideshow"),
      navigation = $(".navigation"),
      navigationItem = $(".navigation-item"),
      detailItem = $(".detail-item"),
      rotation,
      type = '_short';

    // prepare letters
    $('.headline').each(function() {
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });

    // prepare navigation and set navigation items on the right place
    navigationItem.each(function(index, elem) {
      TweenMax.set(elem, {
        left: navigation.width() / 2 - navigationItem.width() / 2 - 10,
        rotation: 90 + (index * 360 / navigationItem.length),
        transformOrigin: "50% " + navigation.width() / 2 + "px"
      });
      TweenMax.set($(elem).find('.rotate-holder'), {
        text: String(index * 360 / navigationItem.length)
      });
      TweenMax.set($(elem).find('.background-holder'), {
        rotation: -90 - (index * 360 / navigationItem.length),
      });
    });
    
    // set tween values
    function setTweenValues() {
      rotation = Number($(this).find('.rotate-holder').text());
    }

    // do tween
    function doTween(target) {

      var targetIndex = navigationItem.index(target),
        timeline = new TimelineMax();

      // add/remove class "active" from navigation & detail
      navigationItem.each(function() {
        $(this).removeClass('active');
        if ($(this).index() == $(target).index()) {
          $(this).addClass('active');
        }
      });
      detailItem.each(function() {
        $(this).removeClass('active');
        if ($(this).index() == $(target).index()) {
          $(this).addClass('active');
        }
      });

      timeline
        .to(navigation, 0.6, {
          rotation: -rotation + type,
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut
        })
        .staggerTo(navigationItem.find('.background-holder'), 0.6, {
          cycle: {
            //function that returns a value
            rotation: function(index, element) {
              return -90 - Number($(element).prev('.rotate-holder').text()) + rotation + type;
            }
          },
          transformOrigin: "50% 50%",
          ease: Sine.easeInOut,
        }, 0, '-=0.6')
        .staggerFromTo($('.active').find('.letter'), 0.3, {
          autoAlpha: 0,
          x: -100,
        },
        {
          autoAlpha: 1,
          x: 0,
          ease: Sine.easeInOut,
        }, 0.025, '-=0.3')
        .fromTo($('.active').find('.background'), 0.9, {
          autoAlpha: 0,
          x: -100,
        },
        {
          autoAlpha: 1,
          x: 0,
          ease: Sine.easeInOut,
        }, 0.05, '+=0.3');
    }

    // click/hover on items
    navigationItem.on('mouseenter', setTweenValues);
    navigationItem.on('click', function() { doTween($(this)); })

    // on load show slideshow as well as first "active" navigation/detail item
    TweenMax.to(slideshow, 1, { autoAlpha: 1 });
    TweenMax.to($('.active').find('.letter'), 0.7, { autoAlpha: 1, x: 0 });
    TweenMax.to($('.active').find('.background'), 0.7, { autoAlpha: 1, x: 0 });

  });

  // fast fix for resize window and refresh view, attention: not use in production, only for demo purposes!
  (function () {
  var width = window.innerWidth;

  window.addEventListener('resize', function () {
    if (window.innerWidth !== width) {
      window.location.reload(true);
    }
  });
  })();