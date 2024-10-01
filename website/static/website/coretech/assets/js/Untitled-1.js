var fixer = fixer || {};
jQuery.fn.exists = function(e) {
    var i = [].slice.call(arguments, 1);
    return this.length && e.call(this, i), this
}, jQuery.fn.imgLoad = function(e) {
    return this.each((function() {
        e && (this.complete || $(this).height() > 0 ? e.apply(this) : $(this).on("load", (function() {
            e.apply(this)
        })))
    }))
}, fixer.utility = {
    isRTL: function() {
        return $("html").hasClass("rtl")
    },
    scrollToElement: function(e) {
        $("html, body").animate({
            scrollTop: $(e).offset().top
        }, 500)
    },
    htmlEncode: function(e) {
        return $("<textarea />").text(e).html()
    },
    htmlDecode: function(e) {
        return $("<textarea />").html(e).text()
    }
}, fixer.header = {
    header: $("header"),
    body: $("body"),
    breadcrumb: $(".breadcrumb"),
    headerNav: $("header nav"),
    mobileMenuBtn: $(".mobile-menu-icon"),
    headerNavItem: $(".nav-link"),
    langSelectionLink: $(".lang-selection-link"),
    searchLink: $(".search-link"),
    searchCloseLayer: $(".search-close-layer"),
    results: $(".search-results"),
    resultsJSON: null,
    inputKeyword: $("#keyword"),
    currentKeyword: "",
    timeoutSearch: null,
    innerHeight: window.innerHeight,
    openMobileMenu: function() {
        fixer.header.mobileMenuBtn.on("click", (function() {
            fixer.header.header.toggleClass("mobile-menu-opened"), fixer.header.header.removeClass("search-opened")
        }))
    },
    openSearch: function() {
        fixer.header.searchLink.on("click", (function() {
            fixer.header.header.toggleClass("search-opened"), $("#keyword").focus(), fixer.header.header.removeClass("mobile-menu-opened")
        })), fixer.header.searchCloseLayer.on("click", (function() {
            fixer.header.header.removeClass("search-opened"), fixer.header.body.removeClass("overflow-h")
        }))
    },
    touchableDeviceMobileMenu: function() {
        Modernizr.touchevents && (fixer.header.body.addClass("touchable-device"), fixer.header.headerNavItem.on("click", (function() {
            $(this).parent().toggleClass("mobile-accordion")
        })), fixer.header.langSelectionLink.on("click", (function() {
            $(this).parent().toggleClass("mobile-accordion")
        })))
    },
    headerSticky: function() {
        scroll = $(window).scrollTop(), scroll >= fixer.header.innerHeight ? (fixer.header.header.addClass("fixed"), fixer.header.breadcrumb.addClass("fixed")) : (fixer.header.breadcrumb.removeClass("fixed"), fixer.header.header.removeClass("fixed"))
    },
    onScroll: function() {
        var e = 0;
        $(window).scroll((function(i) {
            $(this).scrollTop() > fixer.header.innerHeight ? fixer.header.headerSticky() : (fixer.header.header.removeClass("fixed"), fixer.header.breadcrumb.removeClass("fixed"));
            var t = $(this).scrollTop();
            t > e ? (fixer.header.header.addClass("translateYzero"), $("header .nav-item").removeClass("mobile-accordion"), fixer.header.breadcrumb.addClass("translateYzero")) : (fixer.header.header.removeClass("translateYzero"), fixer.header.breadcrumb.removeClass("translateYzero")), e = t
        }))
    },
    bodyOverflowCheck: function() {
        $(".mobile-menu-icon, .search-link").on("click", (function() {
            fixer.header.header.hasClass("mobile-menu-opened") || fixer.header.header.hasClass("search-opened") ? fixer.header.body.addClass("overflow-h") : fixer.header.body.removeClass("overflow-h")
        }))
    },
    triggerSearch: function() {
        fixer.header.inputKeyword.on("change keyup", (function() {
            clearTimeout(fixer.header.timeoutSearch), fixer.header.inputKeyword.val() != fixer.header.currentKeyword && (fixer.header.timeoutSearch = setTimeout(fixer.header.getSearchResults.bind(this), 400))
        }))
    },
    getSearchResults: function() {
        $(".search-results .count").html(""), $(".search-result-text").html(""), $(".count-all").html(""), $(".count-vision-2030").html(""), $(".count-about-the-kingdom").html(""), $(".count-news-and-media").html("");
        var e = fixer.header.inputKeyword.val();
        fixer.header.currentKeyword = e, fixer.header.results.show();
        var i = fixer.header.inputKeyword.attr("data-ajax-method"),
            t = fixer.header.inputKeyword.attr("data-ajax-url");
        $.ajax({
            type: i,
            url: t,
            content: "application/json; charset=utf-8",
            dataType: "json",
            cache: !1,
            data: {
                lang: $("html").attr("lang"),
                keyword: e
            },
            success: function(e) {
                fixer.header.resultsJSON = e;
                var i = e.Count > 0 ? e.Count + " results" : "No result";
                $(".search-result-text").html(i), e.Count > 0 ? ($(".count-all").html(e.All.length), $(".count-vision-2030").html(e.Vision2030.length), $(".count-about-the-kingdom").html(e.AboutTheKingdom.length), $(".count-news-and-media").html(e.NewsAndMedia.length), fixer.header.results.find("ul li a").removeClass("active"), fixer.header.results.find("ul li:first-child a").addClass("active"), fixer.header.fillActiveSearchTab("All"), fixer.header.results.show()) : fixer.header.results.hide()
            }
        })
    },
    fillActiveSearchTab: function(e) {
        var i = fixer.header.results.find("ol");
        i.html("");
        for (var t = 0; t < fixer.header.resultsJSON[e].length; t++) i.append('<li><a href="' + fixer.header.resultsJSON[e][t].URL + '"><strong>' + fixer.header.resultsJSON[e][t].Title + "</strong><p>" + fixer.header.resultsJSON[e][t].Summary + "</p></a></li>")
    },
    clickSearchTab: function() {
        fixer.header.results.find("ul li a").click((function() {
            fixer.header.results.find("ul li a").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-json-property");
            fixer.header.fillActiveSearchTab(e)
        }))
    },
    init: function() {
        fixer.header.openMobileMenu(), fixer.header.openSearch(), fixer.header.touchableDeviceMobileMenu(), fixer.header.headerSticky(), fixer.header.onScroll(), fixer.header.bodyOverflowCheck(), fixer.header.triggerSearch(), fixer.header.clickSearchTab()
    }
}, fixer.socialShare = {
    facebookShare: function() {
        $(".facebook-share").on("click", (function() {
            window.open("https://www.facebook.com/sharer/sharer.php?u=" + document.URL, "", "height=550,width=525,left=100,top=100,menubar=0")
        }))
    },
    twitterShare: function() {
        $(".twitter-share").on("click", (function() {
            window.open("https://twitter.com/share?url=" + document.URL, "twitter-popup", "height=350,width=600")
        }))
    },
    whatsappShare: function() {
        $(".whatsapp-share").on("click", (function(e) {
            $(this).attr("data-text"), $(this).attr("data-phone");
            $(window).width() >= 1024 ? window.open("https://web.whatsapp.com/send?phone=&text=" + escape(document.title) + " " + encodeURIComponent(document.URL), "whatsapp-popup", "height=768,width=1024") : window.open("https://api.whatsapp.com/send?phone=&text=" + escape(document.title) + " " + encodeURIComponent(document.URL), "whatsapp-popup", "height=768,width=1024")
        }))
    },
    init: function() {
        fixer.socialShare.facebookShare(), fixer.socialShare.twitterShare(), fixer.socialShare.whatsappShare()
    }
}, fixer.tab = {
    init: function() {
        $(document).on("click", ".tabs a", (function() {
            if (null != $(this).attr("data-tab") && $($(this).attr("data-tab")).length > 0) {
                $(this).parent().find("a").removeClass("active"), $(this).addClass("active");
                var e = $(this).attr("data-tab");
                $(this).closest(".tab-wrapper").find(".tab-detail").hide(), $(e).show(), $(this).closest(".achievements-section").length > 0 && ($(e).find(".flip-card").each((function(e) {
                    $(this).removeClass("aos-animate"), setTimeout((function() {
                        $(this).addClass("aos-animate")
                    }), 1)
                })), setTimeout((function() {
                    var e = $(window).scrollTop();
                    $(window).scrollTop(e + 1)
                }), 250)), $(this).closest(".achievements-kpi-slider-section").length > 0 && ($(e).find(".flip-card").each((function(e) {
                    $(this).removeClass("aos-animate"), setTimeout((function() {
                        $(this).addClass("aos-animate")
                    }), 1)
                })), setTimeout((function() {
                    var e = $(window).scrollTop();
                    $(window).scrollTop(e + 1)
                }), 250)), $(this).closest(".giga-projects-section").length > 0 && ($(".giga-projects-section .tab-detail").removeClass("active-tab"), $(e).addClass("active-tab")), $(this).closest(".about-the-kingdom-section").length > 0 && ($(".about-the-kingdom-section .tab-detail").removeClass("active-tab"), $(e).addClass("active-tab")), $(this).closest(".multimedia-tab-wrapper").length > 0 && ($(".tab-detail").removeClass("active-tab"), $(e).addClass("active-tab"), fixer.multimedia.setIsotope(), fixer.utility.scrollToElement(".multimedia-container"))
            }
        }))
    }
}, fixer.sliderWithThumb = {
    bigSlider: null,
    thumbSlider: null,
    setBigSlider: function() {
        fixer.sliderWithThumb.bigSlider = $(".big-slider").on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".slider-with-thumb .current-slide", ".slider-with-thumb .total-slide")
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            dots: !1,
            nav: !0,
            mouseDrag: !1,
            touchDrag: !1,
            items: 1,
            center: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            navText: [`<span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span><img src="/dist/img/icons/prev-arrow.svg">`, `<img src="/dist/img/icons/next-arrow.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`]
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".slider-with-thumb .current-slide", ".slider-with-thumb .total-slide"), fixer.sliderWithThumb.bigSlideChanged(e)
        })).on("translate.owl.carousel", (function(e) {
            idx = e.item.index, $(".slider-with-thumb .owl-item").removeClass("passed"), $(".slider-with-thumb .owl-item").eq(idx - 1).addClass("passed")
        }))
    },
    setThumbSlider: function() {
        fixer.sliderWithThumb.thumbSlider = $(".thumb-slider").on("initialized.owl.carousel", (function(e) {})).owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: !1,
            dots: !1,
            nav: !1,
            mouseDrag: !0,
            touchDrag: !0,
            autoWidth: !0,
            center: !1,
            margin: 40,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            navText: [`<span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span><img src="/dist/img/icons/prev-arrow.svg">`, `<img src="/dist/img/icons/next-arrow.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`],
            responsive: {
                0: {
                    margin: 9
                },
                768: {
                    margin: 29
                },
                1440: {
                    margin: 34.5
                },
                1441: {
                    margin: 40
                }
            }
        }).on("changed.owl.carousel", (function(e) {})).on("translate.owl.carousel", (function(e) {
            idx = e.item.index
        }))
    },
    thumbSlideItemClick: function() {
        $(document).on("click", ".thumb-item", (function() {
            $(".thumb-item").removeClass("active"), $(this).addClass("active");
            var e = $(this).attr("data-index");
            fixer.sliderWithThumb.bigSlider.trigger("to.owl.carousel", [e, 600])
        }))
    },
    bigSlideChanged: function(e) {
        $(".thumb-item").removeClass("active"), fixer.sliderWithThumb.thumbSlider.trigger("to.owl.carousel", [e.item.index, 600]), setTimeout((function() {
            $(".thumb-slider .thumb-item").eq(e.item.index).addClass("active")
        }), 200)
    },
    init: function() {
        $(".slider-with-thumb").length > 0 && (fixer.sliderWithThumb.setThumbSlider(), fixer.sliderWithThumb.setBigSlider(), fixer.sliderWithThumb.thumbSlideItemClick())
    }
}, fixer.sliderPopup = {
    popupLink: null,
    popupCloseBtn: null,
    sliderPopupOpen: function() {
        fixer.sliderPopup.popupLink.on("click", (function() {
            var e = $(this).attr("data-popup-index");
            $(".slider-popup[data-popup-index=" + e + "]").addClass("opened")
        }))
    },
    sliderPopupClose: function() {
        fixer.sliderPopup.popupCloseBtn.on("click", (function() {
            $(".slider-popup").removeClass("opened")
        }))
    },
    init: function() {
        $(".popup-link").length > 0 && (fixer.sliderPopup.popupLink = $(".popup-link"), fixer.sliderPopup.popupCloseBtn = $(".slider-popup-close"), fixer.sliderPopup.sliderPopupOpen(), fixer.sliderPopup.sliderPopupClose())
    }
}, fixer.popup = {
    popupContainer: null,
    popupBox: null,
    popupCloseBtn: null,
    popupOverlay: null,
    popupOpen: function() {
        $(".flip-card .card-back .animated-link").on("click", (function() {
            var e = $(this).attr("data-popup-id"),
                i = $(this).parent().parent().parent().parent().find(".card-front").css("background-image").replace(/(?:^url\(["']?|["']?\)$)/g, "");
            $(".popup-box[data-popup-id=" + e + "]").find(".popup-img img").attr("src", i), $(".popup-box[data-popup-id=" + e + "]").addClass("popup-opened"), fixer.popup.popupContainer.addClass("popup-opened"), $("body").addClass("overflow-h")
        }))
    },
    popupClose: function() {
        [fixer.popup.popupCloseBtn, fixer.popup.popupOverlay].forEach((function(e) {
            e.on("click", (function() {
                fixer.popup.popupContainer.removeClass("popup-opened"), fixer.popup.popupBox.removeClass("popup-opened"), $("body").removeClass("overflow-h")
            }))
        }))
    },
    init: function() {
        $(".popup-container").length > 0 && (fixer.popup.popupContainer = $(".popup-container"), fixer.popup.popupBox = $(".popup-box"), fixer.popup.popupCloseBtn = $(".popup-close"), fixer.popup.popupOverlay = $(".popup-overlay"), fixer.popup.popupOpen(), fixer.popup.popupClose())
    }
}, fixer.slider1 = {
    visionSection: null,
    setSlider: function() {
        var e = fixer.slider1.visionSection.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".vision-programs-section .current-slide", ".vision-programs-section .total-slide"), fixer.sliderAnimationFix.init(e.target)
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            autoWidth: !0,
            dots: !1,
            nav: !0,
            loop: !0,
            center: !0,
            margin: 60,
            smartSpeed: 600,
            slideTransition: "ease-in-out",
            navText: ['<img src="/dist/img/icons/prev-arrow.svg">', '<img src="/dist/img/icons/next-arrow.svg">'],
            responsive: {
                0: {
                    margin: 20,
                    center: !0,
                    loop: !0
                },
                768: {
                    margin: 30,
                    center: !1
                },
                769: {
                    margin: 30,
                    center: !1
                },
                1440: {
                    margin: 40,
                    center: !1
                },
                1600: {
                    margin: 40,
                    center: !1
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".vision-programs-section .current-slide", ".vision-programs-section .total-slide"), $(".vision-programs-section .owl-item.cloned .flip-card").each((function() {
                0 == $(this).hasClass("aos-animate") && $(this).addClass("aos-animate")
            }))
        })).on("translate.owl.carousel", (function(e) {
            idx = e.item.index, $(".vision-programs-section .owl-item").removeClass("passed"), $(".vision-programs-section .owl-item").eq(idx - 1).addClass("passed"), $(".vision-programs-section .owl-item").removeClass("current")
        }));
        $(document).on("click", ".vision-programs-section .owl-prev", (function() {
            $(".vision-programs-section .owl-item").eq(idx).addClass("current")
        })), $(".slider-1-prev").on("click", (function() {
            e.trigger("prev.owl.carousel"), $(".vision-programs-section .owl-item").eq(idx).addClass("current")
        })), $(".slider-1-next").on("click", (function() {
            e.trigger("next.owl.carousel")
        }))
    },
    init: function() {
        $(".vision-programs-section").length > 0 && (fixer.slider1.visionSection = $(".vision-right .owl-carousel"), fixer.slider1.setSlider())
    }
}, fixer.slider2 = {
    gigaProjectsSliderContainer: null,
    gigaProjectsSlider: function() {
        fixer.slider2.gigaProjectsSliderContainer.owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: !0,
            dots: !0,
            nav: !1,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            autoplay: 6e3,
            autoplaySpeed: 1e3,
            autoplay: !0,
            mouseDrag: !1,
            touchDrag: !1,
            items: 1,
            center: !0
        })
    },
    init: function() {
        $(".giga-projects-section").length > 0 && (fixer.slider2.gigaProjectsSliderContainer = $(".project-background-slider"), fixer.slider2.gigaProjectsSlider(), $(window).resize((function() {
            if (window.innerWidth > 1279) {
                var e = $(".giga-projects-section .tabs").outerHeight();
                $(".giga-projects-section .tab-container").height(e)
            } else {
                var i = $(".giga-projects-section .tab-detail").outerHeight();
                $(".giga-projects-section .tab-container").height(i)
            }
        })).trigger("resize"))
    }
}, fixer.slider3 = {
    achievementsSliderContainer: null,
    achievementsSlider: function() {
        fixer.slider3.achievementsSliderContainer.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".achievements-section .current-slide", ".achievements-section .total-slide"), fixer.sliderAnimationFix.init(e.target)
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            autoWidth: !0,
            dots: !1,
            nav: !0,
            loop: !0,
            center: !0,
            margin: 60,
            smartSpeed: 600,
            slideTransition: "ease-in-out",
            navText: ['<img data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/prev-arrow-gray.svg"><span>PREV</span>', '<img data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/next-arrow-gray.svg"><span>NEXT</span>'],
            responsive: {
                0: {
                    margin: 20
                },
                768: {
                    margin: 30,
                    center: !1
                },
                1440: {
                    margin: 40,
                    center: !1
                },
                1600: {
                    margin: 40,
                    center: !1
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".achievements-section .current-slide", ".achievements-section .total-slide")
        }))
    },
    currentYearChange: function() {
        var e = $(".years-inner-container .tab"),
            i = $(".current-year-line");
        $(".years-inner-container .tab").on("click", (function(e) {
            var i = $(this).attr("data-year");
            $(".current-year-container").animate({
                opacity: 0
            }, {
                duration: 500,
                complete: function() {
                    $(".current-year-container p").html(i), $(".current-year-container").animate({
                        opacity: 1
                    }, 500)
                }
            })
        })), e.on("click", (function() {
            var e = $(this).position().top;
            i.css({
                top: e + "px"
            })
        }))
    },
    init: function() {
        $(".achievements-section").length > 0 && (fixer.slider3.achievementsSliderContainer = $(".achievements-slider"), fixer.slider3.achievementsSlider(), fixer.slider3.currentYearChange())
    }
}, fixer.slider4 = {
    newsSlider: null,
    newsSectionSlider: function() {
        fixer.slider4.newsSlider.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".news-section .current-slide", ".news-section .total-slide"), fixer.sliderAnimationFix.init(e.target)
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: !1,
            dots: !1,
            nav: !0,
            margin: 40,
            smartSpeed: 600,
            slideTransition: "ease-in-out",
            responsiveClass: !0,
            navText: ['<img src="/dist/img/icons/prev-arrow-gray.svg" data-aos="fade-right" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-bottom" data-aos-once="true"><span data-aos="fade-right" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-bottom" data-aos-once="true">PREV</span>', '<img src="/dist/img/icons/next-arrow-gray.svg" data-aos="fade-left" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-bottom" data-aos-once="true"><span data-aos="fade-left" data-aos-duration="500" data-aos-easing="linear" data-aos-anchor-placement="top-bottom" data-aos-once="true">NEXT</span>'],
            responsive: {
                0: {
                    center: !0,
                    autoWidth: !0,
                    loop: !0,
                    margin: 20
                },
                767: {
                    autoWidth: !0,
                    loop: !0,
                    center: !1,
                    margin: 20
                },
                768: {
                    autoWidth: !0,
                    loop: !0,
                    center: !1,
                    margin: 30
                },
                1279: {
                    margin: 20,
                    autoWidth: !0,
                    loop: !0
                },
                1280: {
                    items: 3,
                    autoWidth: !1,
                    loop: !1
                },
                1439: {},
                1440: {
                    items: 4,
                    autoWidth: !1,
                    loop: !1
                },
                1600: {
                    items: 4,
                    margin: 40,
                    autoWidth: !1,
                    loop: !1
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".news-section .current-slide", ".news-section .total-slide")
        }))
    },
    init: function() {
        $(".news-section").length > 0 && (fixer.slider4.newsSlider = $(".news-slider"), fixer.slider4.newsSectionSlider())
    }
}, fixer.slider5 = {
    slider5Container: null,
    setSlider: function() {
        fixer.slider5.slider5Container.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".slider-5 .current-slide", ".slider-5 .total-slide"), fixer.sliderAnimationFix.init(e.target)
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            autoWidth: !0,
            dots: !1,
            nav: !0,
            loop: !1,
            margin: 60,
            smartSpeed: 600,
            slideTransition: "ease-in-out",
            navText: [`<span data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true">${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span><img data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/prev-arrow-gray.svg">`, `<img data-aos="fade-left" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/next-arrow-gray.svg"><span data-aos="fade-left" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true">${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`],
            responsive: {
                0: {
                    margin: 20,
                    center: !0
                },
                768: {
                    margin: 30,
                    center: !1
                },
                1440: {
                    margin: 40,
                    center: !1
                },
                1600: {
                    margin: 40,
                    center: !1
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".slider-5 .current-slide", ".slider-5 .total-slide")
        }))
    },
    init: function() {
        $(".slider-5").length > 0 && (fixer.slider5.slider5Container = $(".slider-5 .owl-carousel"), fixer.slider5.setSlider())
    }
}, fixer.slider6 = {
    slider6Container: null,
    sliderInit: function() {
        fixer.slider6.slider6Container.owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: !0,
            dots: !1,
            nav: !0,
            autoWidth: !1,
            items: 5,
            margin: 30,
            smartSpeed: 900,
            slideTransition: "ease-in-out",
            navText: ['<img src="/dist/img/icons/prev-arrow-gray.svg">', '<img src="/dist/img/icons/next-arrow-gray.svg">'],
            responsive: {
                0: {
                    loop: !0,
                    autoWidth: !0,
                    center: !0,
                    margin: 20
                },
                768: {
                    loop: !1,
                    items: 3,
                    margin: 20
                },
                1024: {
                    loop: !1,
                    items: 4,
                    margin: 20
                },
                1440: {
                    loop: !1,
                    margin: 20
                },
                1441: {
                    loop: !1,
                    margin: 30
                }
            }
        })
    },
    init: function() {
        $(".slider-6").length > 0 && (fixer.slider6.slider6Container = $(".slider-6"), fixer.slider6.sliderInit())
    }
}, fixer.slider7 = {
    slider7Container: null,
    sliderInit: function() {
        fixer.slider7.slider7Container.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".section-5 .current-slide", ".section-5 .total-slide")
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: fixer.utility.isRTL(),
            nav: !0,
            dots: !1,
            autoWidth: !0,
            margin: 50,
            smartSpeed: 900,
            center: !0,
            autoPlay: !0,
            slideTransition: "ease-in-out",
            navText: [`<img src="/dist/img/icons/prev-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span>`, `<img src="/dist/img/icons/next-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`],
            responsive: {
                0: {
                    margin: 10
                },
                376: {
                    margin: 50
                },
                768: {},
                2550: {
                    margin: 50
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".section-5 .current-slide", ".section-5 .total-slide")
        }))
    },
    init: function() {
        $(".slider-7").length > 0 && (fixer.slider7.slider7Container = $(".slider-7"), fixer.slider7.sliderInit())
    }
}, fixer.section32Slider = {
    section32SliderContainer: null,
    swiperInit: function() {
        new Swiper(".section-3-2-slider", {
            direction: "horizontal",
            speed: 900,
            slidesPerView: "auto",
            navigation: {
                nextEl: ".section-3-2-slider-nav .swiper-button-next",
                prevEl: ".section-3-2-slider-nav .swiper-button-prev"
            },
            on: {
                init: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                },
                slideChange: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                }
            },
            breakpoints: {
                1920: {
                    spaceBetween: 40
                },
                1440: {
                    spaceBetween: 40
                },
                1280: {
                    spaceBetween: 30
                },
                768: {
                    spaceBetween: 20
                },
                0: {
                    spaceBetween: 10
                }
            }
        })
    },
    init: function() {
        $(".section-3-2-slider").length > 0 && (fixer.section32Slider.section32SliderContainer = $(".section-3-2-slider"), fixer.section32Slider.swiperInit())
    }
}, fixer.section6Swiper = {
    swiperInit: function() {
        new Swiper(".section-6-swiper-container .swiper", {
            direction: "horizontal",
            loop: !1,
            lazy: !1,
            speed: 600,
            slidesPerView: "auto",
            centeredSlides: "true",
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            on: {
                init: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                },
                slideChange: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                }
            },
            breakpoints: {
                1920: {
                    spaceBetween: 50
                },
                1440: {
                    spaceBetween: 40
                },
                1280: {
                    spaceBetween: 30
                },
                768: {
                    spaceBetween: 20
                },
                0: {
                    spaceBetween: 10
                }
            }
        })
    },
    init: function() {
        fixer.section6Swiper.swiperInit()
    }
}, fixer.objectiveSlider = {
    objectiveImgSliders: [],
    objectiveInfoSlider: [],
    objectiveNavSliders: [],
    objectiveSlider: function() {
        $(".objective-img-slider").each((function(e) {
            var i = "objective-img-slider-" + e;
            $(this).attr("id", i), $(this).attr("data-slider-index", e);
            var t = $("#" + i).owlCarousel({
                rtl: fixer.utility.isRTL(),
                items: 1,
                loop: !1,
                dots: !1,
                nav: !0,
                slideTransition: "ease-in-out",
                navText: [`<img src="/dist/img/icons/prev-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span>`, `<img src="/dist/img/icons/next-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`],
                responsive: {
                    0: {
                        nav: !1
                    },
                    1280: {
                        nav: !0
                    }
                }
            }).on("changed.owl.carousel", (function(i) {
                fixer.objectiveSlider.objectiveImageSlideChanged(i, e)
            }));
            fixer.objectiveSlider.objectiveImgSliders.push(t)
        })), $(".objective-info-slider").each((function(e) {
            var i = "objective-info-slider-" + e;
            $(this).attr("id", i), $(this).attr("data-slider-index", e);
            var t = $("#" + i).owlCarousel({
                rtl: fixer.utility.isRTL(),
                items: 1,
                loop: !1,
                dots: !1,
                nav: !1,
                autoHeight: !0,
                slideTransition: "ease-in-out"
            }).on("changed.owl.carousel", (function(i) {
                fixer.objectiveSlider.objectiveImageSlideChanged(i, e)
            }));
            fixer.objectiveSlider.objectiveInfoSlider.push(t)
        }))
    },
    infoTabClick: function() {
        $(".objective-info-container a").on("click", (function() {
            var e = $(this).closest(".objective-info-container").find(".swiper").attr("data-slider-index");
            $(this).closest(".objective-info-container").find("a").removeClass("active"), $(this).addClass("active");
            var i = $(this).attr("data-index");
            fixer.objectiveSlider.objectiveImgSliders[e].trigger("to.owl.carousel", [i, 900])
        }))
    },
    infoTabSwiper: function() {
        $(".objective-info-container .swiper").each((function(e) {
            var i = "nav-slider-" + e;
            $(this).attr("id", i), $(this).attr("data-slider-index", e);
            var t = new Swiper("#" + i, {
                direction: "horizontal",
                loop: !1,
                lazy: !1,
                speed: 600,
                slidesPerView: "auto",
                autoHeight: !0,
                slidesOffsetAfter: 100,
                on: {},
                breakpoints: {
                    1441: {
                        spaceBetween: 80
                    },
                    0: {
                        spaceBetween: 65
                    }
                }
            });
            fixer.objectiveSlider.objectiveNavSliders.push(t)
        })), $(".objective-info-container a").on("click", (function() {
            var e = $(this).closest(".objective-info-container").find(".swiper").attr("data-slider-index"),
                i = $(this).parent().index();
            fixer.objectiveSlider.objectiveNavSliders[e].slideTo(i, 1e3, !0)
        }))
    },
    objectiveImageSlideChanged: function(e, i) {
        $("#" + e.target.id).closest(".objective-slider-container").find(".objective-info-container").find("a").removeClass("active"), fixer.objectiveSlider.objectiveImgSliders[i].trigger("to.owl.carousel", [e.item.index, 900]), fixer.objectiveSlider.objectiveInfoSlider[i].trigger("to.owl.carousel", [e.item.index, 1e3]), setTimeout((function() {
            $("#" + e.target.id).closest(".objective-slider-container").find(".objective-info-container").find("a").eq(e.item.index).addClass("active"), fixer.objectiveSlider.objectiveNavSliders[i].slideTo(e.item.index, 1e3, !0)
        }), 200)
    },
    init: function() {
        $(".objectives-section").length > 0 && (fixer.objectiveSlider.objectiveSlider(), fixer.objectiveSlider.infoTabClick(), fixer.objectiveSlider.infoTabSwiper())
    }
}, fixer.projectWithNumberSlider = {
    slider: null,
    sliderInit: function() {
        fixer.projectWithNumberSlider.slider.owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: !0,
            dots: !1,
            nav: !1,
            autoWidth: !1,
            items: 5,
            margin: 30,
            smartSpeed: 900,
            slideTransition: "ease-in-out",
            responsive: {
                0: {
                    loop: !0,
                    autoWidth: !0,
                    center: !0,
                    margin: 20
                },
                768: {
                    loop: !1,
                    items: 3,
                    stagePadding: 55,
                    margin: 20
                },
                1024: {
                    loop: !1,
                    items: 4,
                    stagePadding: 55,
                    margin: 20
                },
                1440: {
                    loop: !1,
                    stagePadding: 140,
                    margin: 20,
                    items: 4
                },
                1920: {
                    loop: !1,
                    stagePadding: 130,
                    margin: 30,
                    items: 5
                }
            }
        })
    },
    init: function() {
        $(".project-in-numbers-slider").length > 0 && (fixer.projectWithNumberSlider.slider = $(".project-in-numbers-slider"), fixer.projectWithNumberSlider.sliderInit())
    }
}, fixer.section12 = {
    mainSwiper: null,
    mainSlider: function() {
        $(".section-12 .main-slider").each((function(e) {
            $(this).addClass(`main-slider-${e}`), fixer.section12.mainSwiper = new Swiper(`.section-12 .main-slider-${e}`, {
                direction: "horizontal",
                loop: !1,
                lazy: !1,
                speed: 600,
                slidesPerView: 1,
                allowTouchMove: !1,
                autoHeight: !0,
                effect: "fade"
            })
        }))
    },
    phaseSlider: function() {
        $(".section-12 .phase-slider").each((function(e) {
            $(this).addClass(`phase-slider-${e}`), $(this).closest(".phase-slider-container").find(".swiper-button-next").addClass(`swiper-next-${e}`), $(this).closest(".phase-slider-container").find(".swiper-button-prev").addClass(`swiper-prev-${e}`);
            new Swiper(`.section-12 .phase-slider-${e}`, {
                direction: "horizontal",
                loop: !1,
                lazy: !1,
                speed: 600,
                slidesPerView: "auto",
                navigation: {
                    nextEl: `.swiper-next-${e}`,
                    prevEl: `.swiper-prev-${e}`
                },
                breakpoints: {
                    1025: {
                        spaceBetween: 40,
                        centeredSlides: !1
                    },
                    0: {
                        spaceBetween: 20,
                        centeredSlides: !0
                    }
                },
                on: {
                    init: function() {
                        fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                    },
                    slideChange: function() {
                        fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                    }
                }
            })
        }))
    },
    phaseJumpHandler: function() {
        $(".selected-phase-1").on("click", (function() {
            fixer.section12.mainSwiper.slideTo(0, 600, !0)
        })), $(".selected-phase-2").on("click", (function() {
            fixer.section12.mainSwiper.slideTo(1, 600, !0)
        })), $(".selected-phase-3").on("click", (function() {
            fixer.section12.mainSwiper.slideTo(2, 600, !0)
        })), $(".selected-phase").on("click", (function() {
            var e = $(this).closest(".slider-container");
            fixer.utility.scrollToElement(e)
        }))
    },
    phaseSelect: function() {
        $(".phase-1 ul a").on("click", (function() {
            var e = $(this).attr("data-to-phase");
            fixer.section12.mainSwiper.slideNext(600, !0), $(".phase-2 li").removeClass("active"), $(`.phase-2 li[data-phase=${e}]`).addClass("active");
            var i = $(this).text().trim();
            $(".selected-phase-1").each((function() {
                $(this).text(i)
            }));
            var t = $(this).closest(".slider-container");
            fixer.utility.scrollToElement(t)
        })), $(".phase-2 ul a").on("click", (function() {
            var e = $(this).attr("data-to-phase");
            fixer.section12.mainSwiper.slideNext(600, !0), $(".phase-3 li").removeClass("active"), $(`.phase-3 li[data-phase=${e}]`).addClass("active");
            var i = $(this).text().trim();
            $(".selected-phase-2").each((function() {
                $(this).text(i)
            }));
            var t = $(this).closest(".slider-container");
            fixer.utility.scrollToElement(t)
        })), $(".phase-3 ul a").on("click", (function() {
            var e = $(this).attr("data-to-phase");
            fixer.section12.mainSwiper.slideNext(600, !0), $(".phase-4 .phase-slider-container").removeClass("active"), $(`.phase-4 .phase-slider-container[data-phase=${e}]`).addClass("active");
            var i = $(this).text().trim();
            $(".selected-phase-3").each((function() {
                $(this).text(i)
            }));
            var t = $(this).closest(".slider-container").find(".phase-slider-container.active");
            fixer.utility.scrollToElement(t)
        }))
    },
    init: function() {
        $(".section-12").length > 0 && (fixer.section12.mainSlider(), fixer.section12.phaseSlider(), fixer.section12.phaseJumpHandler(), fixer.section12.phaseSelect())
    }
}, fixer.postContainerSlider = {
    fixerImgGallery: null,
    sliderInit: function() {
        fixer.postContainerSlider.fixerImgGallery.each((function() {
            var e = $(this).find("figure").length,
                i = $(this);
            $(this).on("initialized.owl.carousel", (function(e) {
                setTimeout((function() {
                    fixer.postContainerSlider.setPositionForOwlDots(i)
                }), 1e3)
            })).owlCarousel({
                rtl: fixer.utility.isRTL(),
                dots: e > 1,
                touchDrag: e > 1,
                mouseDrag: e > 1,
                nav: !1,
                items: 1,
                loop: !1,
                smartSpeed: 900,
                margin: 50
            })
        }))
    },
    setPositionForOwlDots: function(e) {
        null == e && (e = $(".post-img-gallery")), e.find(".owl-item.active figure img").imgLoad((function() {
            var i = e.find(".owl-item.active figure img").height();
            e.find(".owl-dots").attr("style", "top: " + (Math.floor(i) - 30) + "px")
        }))
    },
    init: function() {
        $(".post-container").length > 0 && (fixer.postContainerSlider.fixerImgGallery = $(".post-img-gallery"), fixer.postContainerSlider.sliderInit()), $(window).resize((function() {
            fixer.postContainerSlider.setPositionForOwlDots()
        })).trigger("resize")
    }
}, fixer.home = {
    body: $("body"),
    homeHeroSection: $(".home-hero-slider"),
    owlCarousel: $(".owl-carousel"),
    backToTopBtn: $(".back-to-top"),
    heroSwiper: null,
    homeHeroSlider: function() {
        fixer.home.heroSwiper = new Swiper(".home-hero-slider", {
            loop: true,
            allowTouchMove: !1,
            slidesPerView: 1,
            speed: 1200,
            autoplay: !1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            effect: "fade",
            fadeEffect: {
                crossFade: !0
            },
            on: {
                init: function() {
                    this.$el.addClass("animation-trigger"), this.$el.find(".current-slide").text(this.realIndex + 1), this.$el.find(".total-slide").text(this.slides.length - 2)
                },
                slideChange: function() {
                    $(".home-hero-slider .current-slide").text(this.realIndex + 1), fixer.home.slideChanged()
                }
            }
        })
    },
    stopAllSliderVideos: function() {
        for (var e = document.querySelectorAll(".home-hero-slider video"), i = 0; i < e.length; i++) e[i].pause()
    },
    sliderVideoOnLoad: function() {
        var e = document.querySelector(".home-hero-slider .swiper-slide-active .hero-video");
        e.addEventListener("loadeddata", (i => {
            e.readyState >= 3 && (e.style.opacity = 1)
        }))
    },
    slideChanged: function() {
        fixer.home.stopAllSliderVideos(), setTimeout((function() {
            var e = document.querySelector(".home-hero-slider .swiper-slide-active .hero-video");
            e && (fixer.home.heroSwiper.autoplay.stop(), e.play(), e.onended = function() {
                setTimeout((function() {
                    fixer.home.heroSwiper.slideNext()
                }), 300), fixer.home.heroSwiper.autoplay.start(), e.currentTime = 0
            }), $(".home-hero-slider .swiper-slide-active .hero-video").length > 0 || fixer.home.heroSwiper.autoplay.start()
        }), 300)
    },
    resolutionChanged: function() {
        $(window).resize((function() {
            fixer.home.setVideoURLForResolution()
        }))
    },
    setVideoURLForResolution: function() {
        var e = window.innerWidth,
            i = $(".hero-video"),
            t = i.attr("src"),
            n = "";
        e >= 1441 ? t != (n = i.attr("data-video-1920")) && i.attr("src", n) : e > 768 && e <= 1440 ? t != (n = i.attr("data-video-1440")) && i.attr("src", n) : e > 376 && e <= 768 ? t != (n = i.attr("data-video-768")) && i.attr("src", n) : e <= 376 && t != (n = i.attr("data-video-376")) && i.attr("src", n)
    },
    kingdomTabChange: function() {
        var e = $(".about-the-kingdom-section .tab"),
            i = $(".tab-bg");
        e.eq(0).on("click", (function() {
            $("html").hasClass("ltr") ? i.css({
                left: "0"
            }) : i.css({
                right: "0"
            })
        })), e.eq(1).on("click", (function() {
            $("html").hasClass("ltr") ? i.css({
                left: "35.5%"
            }) : i.css({
                right: "35.5%"
            })
        })), e.eq(2).on("click", (function() {
            $("html").hasClass("ltr") ? i.css({
                left: "70%"
            }) : i.css({
                right: "70%"
            })
        }))
    },
    backToTop: function() {
        fixer.home.backToTopBtn.on("click", (function() {
            $("html, body").animate({
                scrollTop: 0
            }, 500)
        }))
    },
    scrollDown: function() {
        $(".scroll-to-explore").click((function() {
            $("html, body").animate({
                scrollTop: $(".vision-programs-section").offset().top
            }, 1e3)
        }))
    },
    init: function() {
        fixer.home.homeHeroSlider(), fixer.home.kingdomTabChange(), fixer.home.backToTop(), fixer.home.scrollDown(), fixer.home.setVideoURLForResolution(), fixer.home.resolutionChanged(), $(".home-hero-section").height(window.innerHeight), $(".discover-hero-section").height(window.innerHeight), $(window).resize((function() {
            $(".home-hero-section").height(window.innerHeight), $(".discover-hero-section").height(window.innerHeight)
        })).trigger("resize")
    }
}, fixer.investmentFund = {
    body: $(".body-invesment-fund"),
    init: function() {
        fixer.investmentFund.body.length > 0 && fixer.viewAllButtonX.init(".upcoming-events-section", ".view-all-btn")
    }
}, fixer.section6 = {
    section6Container: $(".section-6"),
    section6Slider: null,
    section6SliderInit: function() {
        fixer.section6.section6Slider.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".section-6 .current-slide", ".section-6 .total-slide")
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            loop: fixer.utility.isRTL(),
            nav: !0,
            dots: !1,
            autoWidth: !0,
            margin: 50,
            smartSpeed: 600,
            center: !0,
            slideTransition: "ease-in-out",
            navText: [`<img src="/dist/img/icons/prev-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span>`, `<img src="/dist/img/icons/next-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`],
            responsive: {
                0: {
                    margin: 10,
                    center: !0
                },
                376: {
                    margin: 50,
                    center: !0
                },
                768: {
                    center: !0
                },
                2550: {
                    margin: 50,
                    center: !0
                }
            }
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".section-6 .current-slide", ".section-6 .total-slide")
        }))
    },
    init: function() {
        fixer.section6.section6Container.length > 0 && (fixer.section6.section6Slider = $(".section-6-slider"), fixer.section6.section6SliderInit(), fixer.viewAllButtonX.init(".section-6", ".view-all-btn"))
    }
}, fixer.vision2030Landing = {
    visionSliderContainer: $(".vision-themes-slider"),
    governanceModelSlider: $(".governance-model-slider"),
    visionSlider: function() {
        fixer.vision2030Landing.visionSliderContainer.owlCarousel({
            rtl: fixer.utility.isRTL(),
            nav: !1,
            dots: !1,
            autoWidth: !0,
            responsive: {
                0: {
                    margin: 10,
                    center: !0,
                    loop: !0
                },
                376: {
                    margin: 16,
                    center: !0,
                    loop: !0
                },
                768: {
                    margin: 16,
                    center: !1,
                    loop: !1
                },
                769: {
                    margin: 26
                },
                1441: {
                    margin: 50
                }
            }
        })
    },
    governanceSlider: function() {
        fixer.vision2030Landing.governanceModelSlider.owlCarousel({
            rtl: fixer.utility.isRTL(),
            nav: !1,
            dots: !1,
            autoWidth: !0,
            responsive: {
                0: {
                    center: !0,
                    margin: 30,
                    loop: !0
                },
                768: {
                    center: !0,
                    loop: !0,
                    margin: 130
                },
                1280: {
                    center: !1,
                    loop: !1,
                    margin: 0
                }
            }
        })
    },
    init: function() {
        fixer.vision2030Landing.visionSlider(), fixer.vision2030Landing.governanceSlider(), $(window).resize((function() {
            $(".vision-2030-detail-hero-section").height(window.innerHeight)
        })).trigger("resize")
    }
}, fixer.projectDetail = {
    init: function() {}
}, fixer.news = {
    newsShowMoreButton: null,
    newsHiddenContent: null,
    showHiddenContent: function() {
        fixer.news.newsShowMoreButton.on("click", (function() {
            fixer.news.newsHiddenContent.slideToggle(600, "swing", (function() {
                fixer.news.newsShowMoreButton.toggleClass("showing-more")
            })), fixer.utility.scrollToElement(fixer.news.newsHiddenContent)
        }))
    },
    init: function() {
        $(".news-page-section").length > 0 && (fixer.news.newsShowMoreButton = $(".news-show-more-btn"), fixer.news.newsHiddenContent = $(".news-hidden-content"), fixer.news.showHiddenContent())
    }
}, fixer.peopleCulture = {
    readMoreBtn: null,
    hiddenContent: null,
    bordersSlider: null,
    showHiddenContent: function() {
        fixer.peopleCulture.readMoreBtn.on("click", (function() {
            fixer.peopleCulture.hiddenContent.slideToggle(600, "swing"), $(this).toggleClass("showing-more")
        }))
    },
    bordersSliderInit: function() {
        fixer.peopleCulture.bordersSlider.on("initialized.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".interactive-map .current-slide", ".interactive-map .total-slide")
        })).owlCarousel({
            rtl: fixer.utility.isRTL(),
            items: 1,
            loop: !1,
            autoWidth: !1,
            autoHeight: !0,
            margin: 20,
            dots: !1,
            nav: !0,
            smartSpeed: 100,
            animateIn: "fadeIn",
            animateOut: "fadeOut",
            navText: [`<span>${fixer.utility.isRTL()?"Ø§Ù„Ø³Ø§Ø¨Ù‚":"PREV"}</span><img data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/prev-arrow-gray.svg">`, `<img data-aos="fade-right" data-aos-duration="500" data-aos-anchor-placement="top-bottom" data-aos-easing="linear" data-aos-once="true" src="/dist/img/icons/next-arrow-gray.svg"><span>${fixer.utility.isRTL()?"Ø§Ù„ØªØ§Ù„ÙŠ":"NEXT"}</span>`]
        }).on("changed.owl.carousel", (function(e) {
            fixer.sliderPagination.sliderPagination(e, ".interactive-map .current-slide", ".interactive-map .total-slide");
            var i = e.item.index;
            $("#map-people-and-culture svg .path").removeClass("selected"), $('[data-no="' + (i + 1) + '"]').addClass("selected")
        }))
    },
    mapHover: function() {
        $("#map-people-and-culture svg .path").click((function() {
            $("#map-people-and-culture svg .path").removeClass("selected"), $(this).addClass("selected");
            var e = parseInt($(this).attr("data-no"));
            fixer.peopleCulture.bordersSlider.trigger("to.owl.carousel", e - 1)
        }))
    },
    mapPopup: function() {
        $("#map-people-and-culture svg .path").hover((function() {
            var e = $(this).attr("data-name"),
                i = $(this).attr("data-no"),
                t = $(this).offset(),
                n = t.left,
                r = t.top;
            if ("11" != i && "13" != i || (r -= 40), "1" == i && (n += 80), 0 == $(".map-hover-box").length) {
                var o = '<span class="map-hover-box" style="top:' + r + "px;left:" + n + 'px">' + e + "</span>";
                $("body").append(o)
            }
        }), (function() {
            $(".map-hover-box").remove()
        }))
    },
    init: function() {
        $(".cultural-diversity-section").length > 0 && (fixer.peopleCulture.readMoreBtn = $(".read-more-btn"), fixer.peopleCulture.hiddenContent = $(".hidden-content"), fixer.peopleCulture.showHiddenContent()), $(".interactive-map").length > 0 && (fixer.peopleCulture.bordersSlider = $(".borders-slider"), fixer.peopleCulture.bordersSliderInit(), $('[data-fancybox="images"]').fancybox({
            backFocus: !1
        })), fixer.peopleCulture.mapHover(), fixer.peopleCulture.mapPopup()
    }
}, fixer.eventsExperiences = {
    ShowMoreButton: null,
    HiddenContent: null,
    filterItem: null,
    filterOptions: null,
    showHiddenContent: function() {
        fixer.eventsExperiences.ShowMoreButton.on("click", (function() {
            fixer.eventsExperiences.HiddenContent.slideToggle(600, "swing", (function() {
                fixer.eventsExperiences.ShowMoreButton.toggleClass("showing-more")
            })), fixer.utility.scrollToElement(fixer.eventsExperiences.HiddenContent)
        }))
    },
    eventsExpFilter: function() {
        $(".filter-container ul li a").click((function() {
            var e = $(this).attr("data-filter");
            $(this).toggleClass("selected-filter"), $(".filter-options div[data-filter=" + e + "]").slideToggle()
        })), $(".filter-inner a").on("click", (function() {
            $(this).toggleClass("selected-option")
        }))
    },
    init: function() {
        $(".events-experiences-content-section").length > 0 && (fixer.eventsExperiences.ShowMoreButton = $(".show-more-btn"), fixer.eventsExperiences.HiddenContent = $(".hidden-content-container"), fixer.eventsExperiences.showHiddenContent(), fixer.eventsExperiences.eventsExpFilter())
    }
}, fixer.gigaProjects = {
    filter: function() {
        $(".filter-inner a").click((function() {
            $(".filter-inner a").removeClass("selected-option"), $(this).addClass("selected-option");
            var e = $(this).attr("data-filter");
            "All Sectors" != e ? ($(".giga-projects-content-inner .box-wrapper").hide(), $('[data-filter="' + e + '"]').show()) : $(".giga-projects-content-inner .box-wrapper").show()
        }))
    },
    init: function() {
        $(".body-giga-strategic-projects").length > 0 && fixer.gigaProjects.filter()
    }
}, fixer.multimedia = {
    setFancybox: function() {
        $('[data-fancybox="fig"]').fancybox({
            caption: function(e, i) {
                return $(this).closest("figure").find("figcaption").html()
            }
        })
    },
    setIsotope: function() {
        $(".active-tab .multimedia-grid").exists((function() {
            var e = $(".active-tab .multimedia-grid").isotope({
                itemSelector: ".grid-sizer",
                percentPosition: !0,
                masonry: {
                    columnWidth: ".grid-sizer"
                }
            });
            e = $(".active-tab .multimedia-grid").imagesLoaded((function() {
                e.isotope("layout")
            }));
            $(".multimedia-filter").on("click", "a", (function() {
                var i = $(this).attr("data-filter");
                e.isotope({
                    filter: i
                })
            })), $(".multimedia-filter").each((function(e, i) {
                var t = $(i);
                t.on("click", "a", (function() {
                    t.find(".selected-option").removeClass("selected-option"), $(this).addClass("selected-option")
                }))
            }))
        }))
    },
    filterOpen: function() {
        $(".filter-kind").on("click", (function() {
            $(this).toggleClass("filter-opened"), $(".multimedia-filter-container").slideToggle()
        }))
    },
    init: function() {
        $(".body-multimedia").length > 0 && (fixer.multimedia.setIsotope(), fixer.multimedia.setFancybox(), fixer.multimedia.filterOpen())
    }
}, fixer.sustainability = {
    heroHeight: function() {
        $(window).resize((function() {
            var e = $(window).height();
            $(".sustainability-hero-section").height(e)
        })).trigger("resize")
    },
    heroSlider: function() {
        new Swiper(".sustainability-hero-section", {
            direction: "horizontal",
            speed: 900,
            slidesPerView: 1,
            effect: "fade",
            navigation: {
                nextEl: ".hero-section-nav .swiper-button-next",
                prevEl: ".hero-section-nav .swiper-button-prev"
            },
            on: {
                init: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                },
                slideChange: function() {
                    fixer.sliderPagination.swiperPagination(this, ".current-slide", ".total-slide")
                }
            }
        })
    },
    messageSlider: function() {
        new Swiper(".message-swiper", {
            direction: "horizontal",
            speed: 900,
            autoplay: !0,
            delay: 8e3,
            slidesPerView: 1,
            effect: "fade",
            navigation: {
                nextEl: ".message-swiper .swiper-button-next",
                prevEl: ".message-swiper .swiper-button-prev"
            },
            pagination: {
                el: ".message-swiper .swiper-pagination",
                clickable: !0
            }
        })
    },
    scrollToSection: function() {
        $(".watch-stream").on("click", (function() {
            fixer.utility.scrollToElement(".section-8")
        }))
    },
    init: function() {
        $(".body-sustainability").length > 0 && (fixer.sustainability.heroHeight(), fixer.sustainability.heroSlider(), fixer.sustainability.messageSlider(), fixer.sustainability.scrollToSection())
    }
}, fixer.hideObjects = {
    init: function() {
        $(".fadeInUp-scroll").css({
            opacity: 0,
            transform: "translateY(100px)"
        })
    }
}, fixer.checkObjectsVisibility = {
    init: function() {
        $(".fadeInUp-scroll").each((function(e) {
            var i = $(this).offset().top;
            $(window).scrollTop() + $(window).outerHeight() > i - 100 ? $(this).addClass("visible") : $(this).removeClass("visible")
        }))
    }
}, fixer.viewAllButtonX = {
    setPosition: function(e, i) {
        var t = $(window).width();
        if (t > 840) {
            var n = $(e).find(".owl-item.active.center").width(),
                r = parseInt((t - n) / 2);
            $(e).find(i).css("right", r + "px")
        } else $(e).find(i).attr("style", "")
    },
    init: function(e, i) {
        fixer.viewAllButtonX.setPosition(e, i), $(window).resize((function() {
            fixer.viewAllButtonX.setPosition(e, i)
        })).trigger("resize")
    }
}, fixer.sliderPagination = {
    sliderPagination: function(e, i, t) {
        var n = e.item.index + 1 - e.relatedTarget._clones.length / 2,
            r = e.item.count;
        (n > r || 0 == n) && (n = r - n % r), n < 10 ? $(i).html("0" + n) : $(i).html(n), r < 10 ? $(t).html("0" + r) : $(t).html(r)
    },
    swiperPagination: function(e, i, t) {
        var n = e.realIndex + 1,
            r = e.slides.length;
        n < 10 ? $(i).html("0" + n) : $(i).html(n), r < 10 ? $(t).html("0" + r) : $(t).html(r)
    }
}, fixer.sliderAnimationFix = {
    init: function(e) {
        $("html").hasClass("ltr") ? $(e).find(".cloned").eq(2).find("div:first").attr("data-aos", "fade-right") : $(e).find(".cloned").eq(2).find("div:first").attr("data-aos", "fade-left")
    }
}, $(document).ready((function() {
    fixer.header.init(), fixer.socialShare.init(), fixer.tab.init(), fixer.sliderWithThumb.init(), fixer.sliderPopup.init(), fixer.popup.init(), fixer.section6Swiper.init(), fixer.objectiveSlider.init(), fixer.projectWithNumberSlider.init(), fixer.home.init(), fixer.investmentFund.init(), fixer.vision2030Landing.init(), fixer.projectDetail.init(), fixer.news.init(), fixer.postContainerSlider.init(), fixer.peopleCulture.init(), fixer.eventsExperiences.init(), fixer.gigaProjects.init(), fixer.multimedia.init(), fixer.sustainability.init(), fixer.slider1.init(), fixer.slider2.init(), fixer.slider3.init(), fixer.slider4.init(), fixer.slider5.init(), fixer.slider6.init(), fixer.slider7.init(), fixer.section32Slider.init(), fixer.section6.init(), fixer.section12.init(), AOS.init(), ($(".body-contact-us").length > 0 || $(".body-news").length > 0 || $(".body-static-page").length > 0 || $(".body-news-detail").length > 0 || $(".national-day").length > 0) && ($("header").addClass("bg-white-header"), $(".breadcrumb").addClass("white-header-breadcrumb"))
}));