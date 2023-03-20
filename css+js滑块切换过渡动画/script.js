const globStates = {
    isCanChangeCurrSlider: false,
    isDev: 0,
    freeDragHeight: 200,
    slideSliceCount: 5,
    taglineSliceCount: 7,
    stSliceShift: (7 - 5) / 2, // slide vs tagline index shift
    mouseCursor: document.querySelector('.js-cursor'),
    controls: document.querySelector('.js-controls'),
    isDrag: false,
    isFirstSlide: true
};
let slides;
const jsMatrix = document.querySelectorAll('.js-matrix-r');

// drag down helper block
const DD = new(function() {
    const sNode = document.querySelector('.js-dd');
    const hint = sNode.querySelector('.js-dd-hint');
    const textWrap = sNode.querySelectorAll('.js-separate-text');

    function animHint() {
        globStates.isCanChangeCurrSlider = true;
        const circle = sNode.querySelector('.js-dd-cirlce');
        const dotsWrap = sNode.querySelector('.js-dd-dots');
        const ddATL = new TimelineMax({
            repeat: -1
        });
        const dotsWrapHeight = dotsWrap.offsetHeight;

        ddATL
            .to(circle, 0.3, {
                scale: .4,
                ease: 'Power1.easeInOut'
            }, 0.8)
            .to(dotsWrap, 0.8, {
                height: 1.,
                ease: 'Power3.easeInOut'
            }, '-=0.18')
            .to(circle, 0.5, {
                scale: 1.,
                ease: 'Power1.easeInOut'
            }, '+=.24')
            .to(dotsWrap, 1.0, {
                height: dotsWrapHeight,
                ease: 'Power1.easeInOut'
            }, '-=0.01');
    }

    function animateWords(words) {
        words.forEach(word => {
            const spans = splitTextInSpans(word);
            words.forEach((word) => {
                word.style.opacity = 1;
            });

            spans.forEach((spanItem, idx, spans) => {
                let tlWords = new TimelineMax();
                const delay = (.2 + ((Math.abs(spans.length / 2 - idx - .5)) / 20)).toFixed(2);

                tlWords
                    .set(spanItem, {
                        y: spanItem.clientHeight,
                        opacity: 1
                    })
                    .to(spanItem, 0.5, {
                        y: 0,
                        ease: 'Expo.easeOut'
                    }, delay);
            });
        });
    }

    function startAnimation() {
        hint.classList.add('active');
        setTimeout(() => {
            animateWords(textWrap);
        }, 200);
        setTimeout(() => {
            hint.classList.add('anim');
            animHint(this.sNode);
            slides.goToNextSlide(3, -1);
        }, 1000);
    }

    return {
        sNode,
        hint,
        textWrap,
        startAnimation
    };
})();

const contacts = new(function() {
    const btns = document.querySelectorAll('.js-contacts-btn .info__slot');
    const popup = document.querySelector('.js-popup');
    const slices = popup.querySelectorAll('.popup__slice');
    const animTL = new TimelineMax({
        reverse: true,
        paused: true
    });

    const iCards = document.querySelectorAll('.js-i-card');
    const cardLinks = document.querySelectorAll('.i-card__link');
    const linksATL = new TimelineMax({
        reverse: true,
        paused: true
    });
    const textsATL = new TimelineMax({
        reverse: true,
        paused: true
    });
    const spans = [];

    iCards.forEach((cardItem) => {
        const iCardTexts = cardItem.querySelectorAll('.js-separate-text');
        iCardTexts.forEach(item => {
            spans.push(splitTextInSpans(item));
        });
    });

    animTL
        .staggerFromTo(slices, .7, {
            x: '100%',
            ease: 'Power1.easeInOut'
        }, {
            x: '0%',
            ease: 'Power1.easeInOut'
        }, .07, 0);
    spans.forEach((spanRow, idx) => {
        textsATL.staggerFromTo(spans[idx], 0.3, {
            y: '100%',
            ease: 'Expo.easeOut'
        }, {
            y: '0%',
            ease: 'Expo.easeOut'
        }, .03, '-=.7');
    });
    linksATL
        .staggerFromTo(cardLinks, .7, {
            y: '100%',
            ease: 'Power3.easeOut'
        }, {
            y: '0%',
            ease: 'Power3.easeOut'
        }, .1, 1.3);

    btns.forEach(function(btnItem) {
        btnItem.onclick = function() {
            if (popup.classList.contains('open')) { //close
                closePopup(btnItem);
            } else {
                popup.classList.add('open');
                btnItem.parentNode.classList.add('btn-open');
                linksATL.timeScale(1).restart();
                animTL.restart();
                mouseCursor.cursor.classList.remove('light-mode');
                mouseCursor.cursor.classList.add('close', 'dark-mode');

                setTimeout(() => {
                    textsATL.timeScale(1).restart();
                }, 780);
            }
        };
    });

    popup.addEventListener('mousemove', function(evt) {
        if (popup.classList.contains('open') && evt.target.classList.contains('js-popup')) {
            mouseCursor.cursor.classList.add('close');
        } else {
            mouseCursor.cursor.classList.remove('close');
        }
    });

    popup.addEventListener('click', function(e) {
        if (e.target.classList.contains('js-popup')) {
            closePopup();
        }
    });

    function closePopup(btnItem) {
        popup.classList.remove('open');
        if (btnItem) {
            if (btnItem.classList.contains('js-black-mode')) {
                setTimeout(() => {
                    mouseCursor.cursor.classList.add('light-mode');
                }, 400);
            }
            btnItem.parentNode.classList.remove('btn-open');
        } else {
            document.querySelector('.btn-open').classList.remove('btn-open');
        }
        linksATL.timeScale(4).reverse();
        textsATL.timeScale(4).reverse();
        mouseCursor.cursor.classList.remove('close');

        setTimeout(() => {
            animTL.reverse();
        }, 200);
    }

    return {
        closePopup
    };
})();

const constorls = new(function() {
    const popup = document.querySelector('.js-popup');
    const sNode = document.querySelector('.js-controls');
    const upBtn = sNode.querySelector('.js-ctrl-w-up');
    const dnBtn = sNode.querySelector('.js-ctrl-w-dn');
    const bCtrl = sNode.querySelectorAll('.js-black-mode');
    const wCtrl = sNode.querySelectorAll('.js-white-mode');
    const animBlackCtrlTL = createCtrlAnim(bCtrl, wCtrl);
    const animWhiteCtrlTL = createCtrlAnim(wCtrl, bCtrl);

    function createCtrlAnim(ctrls, nextWrap) {
        return new TimelineMax({
                paused: true
            })
            .set(nextWrap, {
                className: '-=active'
            })
            .set(ctrls, {
                className: '+=active'
            })
            .fromTo(ctrls[0], .8, {
                y: '100%',
                ease: 'Power1.easeInOut'
            }, {
                y: '0%',
                ease: 'Power1.easeInOut'
            }, 0)
            .fromTo(ctrls[1], .8, {
                y: '-100%',
                ease: 'Power1.easeInOut'
            }, {
                y: '0%',
                ease: 'Power1.easeInOut'
            }, 0);
    }

    upBtn.addEventListener('click', function() {
        if (!popup.classList.contains('open')) {
            slides.goToNextSlide(3, -1);
        } else {
            contacts.closePopup(dnBtn);
        }
    });

    dnBtn.addEventListener('click', function() {
        if (!popup.classList.contains('open')) {
            slides.goToNextSlide(3, 1);
        } else {
            contacts.closePopup(dnBtn);
        }
    });

    return {
        upBtn,
        dnBtn,
        animBlackCtrlTL,
        animWhiteCtrlTL
    };
})();

const mouseCursor = new(function() {
    const body = document.querySelector('body');
    const cursorWrap = document.querySelector('.js-cursor-wrap');
    const cursor = document.querySelector('.js-cursor');
    const cursorLine = document.querySelector('.js-cursor-line');
    const jsBlackBlocks = document.querySelectorAll('.js-black-mode');
    const jsWhiteBlocks = document.querySelectorAll('.js-white-mode');
    const closeBtns = document.querySelectorAll('.js-contacts-btn .info__slot');
    const popup = document.querySelector('.js-popup');

    const targetMousePos = {
        x: 0,
        y: 0
    };
    const currMousePos = {
        x: 0,
        y: 0
    };

    let cursorLineHeight = 0;
    let targetCursorLineHeight = 0;
    let cursorLineTop = 0;
    let targetCursorLineTop = 0;

    setTimeout(() => {
        cursorWrap.classList.remove('hide');
    }, globStates.isDev ? 2000 : 4000);

    jsBlackBlocks.forEach(function(itemBlock) {
        itemBlock.addEventListener('mouseenter', function() {
            if (!itemBlock.parentNode.classList.contains('btn-open')) {
                removeThenAddClasses(cursor, 'dark-mode', 'light-mode');
            }
        });
        itemBlock.addEventListener('mouseleave', function() {
            if (!itemBlock.parentNode.classList.contains('btn-open')) {
                removeThenAddClasses(cursor, 'light-mode', 'dark-mode');
            }
        });
    });
    jsWhiteBlocks.forEach(function(itemBlock) {
        itemBlock.addEventListener('mouseenter', function() {
            removeThenAddClasses(cursor, 'light-mode', 'dark-mode');
        });
        itemBlock.addEventListener('mouseleave', function() {
            removeThenAddClasses(cursor, 'dark-mode', 'light-mode');
        });
    });

    closeBtns.forEach(function(itemSlot) {
        itemSlot.addEventListener('mouseenter', function() {
            if (popup.classList.contains('open')) {
                cursor.classList.add('close');
            }
        });
        itemSlot.addEventListener('mouseleave', function() {
            if (popup.classList.contains('open')) {
                cursor.classList.remove('close');
            }
        });
    });

    body.addEventListener('mousemove', setMouseCursor);
    body.addEventListener('touchmove', setMouseCursor);

    body.addEventListener('mousedown', function(e) {
        cursorLine.style.left = targetMousePos.x + 'px';
        cursorLine.style.transform = 'translateY(' + currMousePos.y + 'px)';
        cursor.classList.add('active');
    });
    body.addEventListener('mouseup', function(e) {
        cursor.classList.remove('active');
    });

    function resetCursorLine(dir) {
        if (globStates.isDrag) {
            const reset =
                new TimelineMax({
                    onComplete: function() {
                        cursorLineHeight = targetCursorLineHeight = 0;
                        cursorLineTop = targetCursorLineTop = 0;
                        mouseCursor.cursorLine.style = '';
                    }
                });

            if (dir === -1) {
                reset.to(mouseCursor.cursorLine, .26, {
                    height: 0
                });
            } else {
                const hh = parseFloat(mouseCursor.cursorLine.style.height);
                reset.to(mouseCursor.cursorLine, .26, {
                    height: 0,
                    y: parseFloat(mouseCursor.cursorLine.style.transform.slice(11)) + hh,
                    clearProps: 'y'
                });
            }
        }
    }

    function updCursorLineHeightAndTop(top) {
        if (globStates.isFirstSlide) {
            top = top > 0 ? 0 : top;
        }
        targetCursorLineHeight = Math.abs(top);
        targetCursorLineTop = top;
    }

    function setMouseCursor(evt) {
        let rect = body.getBoundingClientRect();
        targetMousePos.x = evt.clientX - rect.left;
        targetMousePos.y = evt.clientY - rect.top;
    }

    function calcCursorPos() {
        currMousePos.x += (targetMousePos.x - currMousePos.x) * .16;
        currMousePos.y += (targetMousePos.y - currMousePos.y) * .16;
        cursorWrap.style.transform = 'translate(' + currMousePos.x + 'px, ' + currMousePos.y + 'px)';

        if (globStates.isDrag) {
            cursorLineHeight += (targetCursorLineHeight - cursorLineHeight) * .16;
            cursorLineTop += (targetCursorLineTop - cursorLineTop) * .16;

            cursorLine.style.height = cursorLineHeight + 'px';
            cursorLine.style.top = cursorLineTop + 'px';

            if (cursorLineTop > 0) {
                cursorLine.style.top = '';
                cursorLine.style.bottom = cursorLineTop + 'px';
            }
        }
        requestAnimationFrame(calcCursorPos);
    }
    requestAnimationFrame(calcCursorPos);

    return {
        cursor,
        cursorLine,
        resetCursorLine,
        updCursorLineHeightAndTop
    };
})();

const preload = {
    sNode: document.querySelector('.js-preload'),
    pillarsATL: null,
    animate: function() {
        const preloadCounter = {
            count: 0
        };
        const pillars = this.sNode.querySelectorAll('.preload__pillar');
        this.pillarsATL = new TimelineMax({
            reverse: true,
            onComplete: DD.startAnimation
        });
        let countDisplay = this.sNode.querySelectorAll('.js-preload-counter');

        if (globStates.isDev) {
            this.pillarsATL.timeScale(7);
        } else {
            this.pillarsATL.timeScale(5);
        }

        this.pillarsATL
            .to(preloadCounter, 3.4, {
                count: 100,
                roundProps: 'count',
                ease: 'Power1.easeOut',
                onUpdate: counterHandler
            })
            .to(pillars[0], 2.1, {
                height: '60%',
                ease: 'Power1.easeOut'
            }, 1.35)
            .to(pillars[1], 2.3, {
                height: '72%',
                ease: 'Power1.easeOut'
            }, 0.85)
            .to(pillars[2], 2.0, {
                height: '100%',
                ease: 'Power1.easeOut'
            }, 0.1)
            .to(pillars[3], 2.3, {
                height: '84%',
                ease: 'Power1.easeOut'
            }, 0.55)
            .to(pillars[4], 2.1, {
                height: '70%',
                ease: 'Power1.easeOut'
            }, 1.15);

        function counterHandler() {
            countDisplay.forEach(function(item) {
                item.innerHTML = preloadCounter.count;
            });
        }
    }
};

const infoScene = new(function() {
    const sNode = document.querySelector('.js-info');
    const blackAsides = sNode.querySelectorAll('.js-aside-black');
    const whiteAsides = sNode.querySelectorAll('.js-aside-white');
    const bSlots = sNode.querySelectorAll('.js-aside-black .info__slot');
    const wSlots = sNode.querySelectorAll('.js-aside-white .info__slot');
    const animBlackSlotsTL = createSlotAnim(bSlots, blackAsides, whiteAsides);
    const animWhiteSlotsTL = createSlotAnim(wSlots, whiteAsides, blackAsides);

    /**
     * @param fourSlots - 4 domEl
     * @param currSlotsWrap
     * @param nextSlotsWraps
     * @returns new TimelineMax
     */
    function createSlotAnim(fourSlots, currSlotsWrap, nextSlotsWrap) {
        return new TimelineMax({
                paused: true
            })
            .set(nextSlotsWrap, {
                className: '-=active'
            })
            .set(currSlotsWrap, {
                className: '+=active'
            })
            .fromTo([fourSlots[1], fourSlots[3]], .8, {
                x: '-100%',
                ease: 'Power1.easeInOut'
            }, {
                x: '0%',
                ease: 'Power1.easeInOut'
            }, 0)
            .fromTo([fourSlots[0], fourSlots[2]], .7, {
                x: '-100%',
                ease: 'Power1.easeInOut'
            }, {
                x: '0%',
                ease: 'Power1.easeInOut'
            }, '-=.7');
    }

    return {
        sNode,
        animBlackSlotsTL,
        animWhiteSlotsTL
    };
})();

slides = new(function() {
    const allTaglines = document.querySelectorAll('.js-taglines .tagline');
    const allSlides = document.querySelectorAll('.js-slides .slide');
    let currSlide = document.querySelector('.slide.active-slide');
    const slidersCount = allSlides.length;
    let isFirstSlide = true;
    let draggedTarget = null;
    let nextSlide, prevSlide;

    function initSlider() {
        const nextSlideIdx = ((+currSlide.dataset['slideNum'] + 1) % slidersCount) || 1;
        const prevSlideIdx = (+currSlide.dataset['slideNum'] - 1) <= 0 ? slidersCount - 1 : +currSlide.dataset['slideNum'] - 1;

        nextSlide = document.querySelector('[data-slide-num="' + nextSlideIdx + '"]');
        prevSlide = document.querySelector('[data-slide-num="' + prevSlideIdx + '"]');

        nextSlide.classList.add('next');
        prevSlide.classList.add('prev');

        allTaglines[nextSlideIdx - 1].classList.add('next');
        allTaglines[prevSlideIdx - 1].classList.add('prev');

        initDragableSlices();
    }

    function initDragableSlices() {
        allSlides.forEach(function(slideItem) {
            const currSlices = slideItem.querySelectorAll('.slide__slice');

            currSlices.forEach(function(sliceElem) {
                sliceElem.dataset.top = 0;
                initDragObj(sliceElem);
            });
        });
    }

    function goToNextSlide(targetSliceNum, dir) {
        mouseCursor.resetCursorLine(dir, true);
        globStates.isDrag = false;
        document.onmouseup = document.ontouchcancel = null;
        document.onmousemove = document.ontouchmove = null;

        if (!globStates.isCanChangeCurrSlider) {
            return;
        }
        dir = dir || -1;

        currSlide = document.querySelector('.slide.active-slide');
        nextSlide = document.querySelector('.slide.next');
        prevSlide = document.querySelector('.slide.prev');
        const currSlideDigits = currSlide.querySelectorAll('.js-slide-num span');
        const nextSlideDigits = nextSlide.querySelectorAll('.js-slide-num span');
        const currSlideSlices = currSlide.querySelectorAll('.slide__slice');
        const nextSlideSlices = nextSlide.querySelectorAll('.slide__slice');

        const currentSlideSlicesATL = new TimelineMax({
            onComplete: onCompleteSlideChange
        });
        const startSliceNum = targetSliceNum - 2;
        const nextSlideIdx = +nextSlide.dataset['slideNum'];
        const prevSlideIdx = +prevSlide.dataset['slideNum'];
        const isNextSlideDark = nextSlide.classList.contains('dark-slide');

        const currTagline = isFirstSlide ? null : document.querySelector('[data-tagline-num="' + currSlide.dataset['slideNum'] + '"]');
        const nextTagline = document.querySelector('[data-tagline-num="' + nextSlide.dataset['slideNum'] + '"]');
        const currTaglineSlices = isFirstSlide ? null : currTagline.querySelectorAll('.tagline__slice');
        const nextTaglineSlices = nextTagline.querySelectorAll('.tagline__slice');

        globStates.isCanChangeCurrSlider = false;
        const currSortedSlideSlices = getSortedSlicesBySelectPos(currSlideSlices, startSliceNum);
        const nextSortedSlideSlices = getSortedSlicesBySelectPos(nextSlideSlices, startSliceNum);
        const currSortedTagline = isFirstSlide ? null : getSortedSlicesBySelectPos(currTaglineSlices, startSliceNum);
        const nextSortedTagline = getSortedSlicesBySelectPos(nextTaglineSlices, Math.ceil(startSliceNum / 2));

        if (dir === 1) {
            nextSlide.classList.add('top');
        }

        currentSlideSlicesATL
            .staggerTo(currSortedTagline, .6, {
                y: (dir * -100 + '%'),
                rotation: 0.0,
                ease: 'Power1.easeInOut'
            }, .06, 0)
            .staggerTo(currSortedSlideSlices, .7, {
                y: (dir * +100 + '%'),
                rotation: 0.0,
                ease: 'Power1.easeInOut'
            }, .08, 0)
            .staggerTo(nextSortedSlideSlices, .7, {
                y: '0%',
                rotation: 0.0,
                ease: 'Power1.easeInOut'
            }, .08, 0)
            .staggerTo(currSlideDigits, .8, {
                y: (dir * -104 + '%'),
                ease: 'Power1.easeInOut'
            }, .1, 0)
            .set(nextSlide, {
                className: '-=top'
            });

        if (isFirstSlide) {
            const preloadCounters = document.querySelectorAll('.js-preload-counter');
            for (let i = 0; i < preloadCounters.length; i++) {
                preloadCounters[i].classList.add('fade-out');
            }

            preload.pillarsATL.timeScale(7).reverse();
            DD.textWrap[0].childNodes[4].classList.add('hide');
            DD.textWrap[0].childNodes[5].classList.add('hide');
            DD.textWrap[0].childNodes[6].classList.add('hide');
            infoScene.sNode.classList.add('open-info');

            setTimeout(() => {
                infoScene.animWhiteSlotsTL.restart();
                constorls.animWhiteCtrlTL.restart();
            }, 2000);
        }

        setTimeout(() => {
            if (isNextSlideDark) {
                removeThenAddClasses(
                    [DD.sNode, nextTagline, infoScene.sNode, globStates.mouseCursor, globStates.controls, mouseCursor.cursorLine],
                    'dark-mode', 'light-mode'
                );
            } else {
                removeThenAddClasses(
                    [DD.sNode, nextTagline, infoScene.sNode, globStates.mouseCursor, globStates.controls, mouseCursor.cursorLine],
                    'light-mode', 'dark-mode'
                );
            }
        }, 240);

        function onCompleteSlideChange() {
            const newActiveIdx = (nextSlideIdx + 1) % slidersCount || 1;
            const newPrevIdx = (prevSlideIdx + (isFirstSlide ? 0 : 1)) % slidersCount || 1;
            const onCompleteATL = new TimelineMax({
                paused: true,
                reverse: true
            });

            currSlide.classList.remove('active-slide', 'orig-scale');
            nextSlide.classList.add('active-slide', 'orig-scale');
            nextSlide.classList.remove('next');
            prevSlide.classList.remove('prev');

            onCompleteATL
                .staggerFromTo(nextSortedTagline, .55, {
                    y: '100%',
                    ease: 'Power1.easeInOut'
                }, {
                    y: '0%',
                    ease: 'Power1.easeInOut',
                    clearProps: 'y'
                }, .05)
                .staggerFromTo(nextSlideDigits, .8, {
                    y: '100%',
                    ease: 'Power1.easeInOut'
                }, {
                    y: '0%',
                    ease: 'Power1.easeInOut',
                    clearProps: 'y'
                }, .1, 0);

            if (dir) {
                onCompleteATL.restart();
            } else {
                onCompleteATL.reverse();
            }

            if (!isFirstSlide) {
                if (isNextSlideDark) {
                    infoScene.animWhiteSlotsTL.restart();
                    constorls.animWhiteCtrlTL.restart();
                } else {
                    infoScene.animBlackSlotsTL.restart();
                    constorls.animBlackCtrlTL.restart();
                }
            }

            if (isFirstSlide) {
                isFirstSlide = false;
                globStates.isFirstSlide = false;
            } else {
                currTagline.classList.remove('active-slide');
            }
            nextTagline.classList.add('active-slide');
            nextTagline.classList.remove('next');

            allSlides[newActiveIdx].classList.add('next');
            allSlides[newPrevIdx].classList.add('prev');
            allTaglines[newActiveIdx - 1].classList.add('next');
            allTaglines[newPrevIdx - 1].classList.add('prev');

            currSortedSlideSlices.concat(nextSortedSlideSlices).forEach(function(sliceItem) {
                sliceItem.dataset.top = 0;
            });

            new TimelineMax()
                .to([currSortedSlideSlices, nextSortedSlideSlices], 0, {
                    clearProps: 'y'
                });

            setTimeout(() => {
                globStates.isCanChangeCurrSlider = true;
            }, 100);
        }
    }

    function initDragObj(elmnt) {
        let pos2 = 0,
            pos3 = 0,
            pos4 = 0,
            topPos = 0;
        elmnt.onmousedown = elmnt.ontouchstart = dragElement;

        let nextSlide, nextSlideSlices, nextElem;
        let taglineSlice, taglineSlicePrev, taglineSliceNext, currSlideDigits;

        function dragElement(e) {
            if (!globStates.isCanChangeCurrSlider) {
                return;
            }

            const sliceNum = elmnt.dataset['sliceNum'] - 1;
            currSlide = document.querySelector('.slide.active-slide');
            const currSlideNum = currSlide.dataset['slideNum'];
            currSlideDigits = currSlide.querySelectorAll('.js-slide-num span');

            e = e || window.event;

            const currTaglineSlices = document.querySelectorAll('[data-tagline-num="' + currSlideNum + '"] .tagline__slice');
            taglineSlice = currTaglineSlices[sliceNum + globStates.stSliceShift];
            taglineSliceNext = currTaglineSlices[sliceNum + globStates.stSliceShift + 1];
            taglineSlicePrev = currTaglineSlices[sliceNum + globStates.stSliceShift - 1];

            elmnt.parentNode.classList.remove('orig-scale');
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = document.ontouchcancel = stopDragElement;
            document.onmousemove = document.ontouchmove = startDragElement;

            draggedTarget = e.target;
            if (!draggedTarget.classList.contains('slide__slice')) {
                draggedTarget = draggedTarget.parentNode;
            }

            nextSlide = document.querySelector('.slide.next');
            nextSlideSlices = nextSlide.querySelectorAll('.slide__slice');
            nextElem = nextSlideSlices[sliceNum];
        }

        function startDragElement(e) {
            globStates.isDrag = true;
            e = e || window.event;
            // calculate the new cursor position:
            pos2 = pos4 - e.clientY;
            pos4 = e.clientY;
            topPos = +elmnt.dataset.top - pos2;
            mouseCursor.updCursorLineHeightAndTop(topPos);

            if (isFirstSlide) {
                topPos = topPos > 0 ? 0 : topPos;
            }

            elmnt.style.transform = 'translateY(' + (topPos) + 'px)';

            if (topPos < 0) {
                nextElem.style.transform = 'translateY(' + (window.innerHeight + topPos) + 'px)';
            } else {
                if (!isFirstSlide) {
                    nextElem.style.transform = 'translateY(' + (-window.innerHeight + topPos) + 'px)';
                }
            }

            elmnt.dataset.top = topPos;

            if (taglineSlice) {
                let taglineTop = map(topPos, 0, globStates.freeDragHeight, 0, 60);
                let taglineTopNext = map(topPos, 0, globStates.freeDragHeight, 0, 30);
                let taglineTopPrev = map(topPos, 0, globStates.freeDragHeight, 0, 15);
                taglineSlice.style.transform = 'translateY(' + -taglineTop + '%)';
                taglineSliceNext.style.transform = 'translateY(' + -taglineTopNext + '%)';
                taglineSlicePrev.style.transform = 'translateY(' + -taglineTopPrev + '%)';

                let slideDigitTop = map(topPos, 0, globStates.freeDragHeight, 0, 60);
                let slideDigitTopNext = map(topPos, 0, globStates.freeDragHeight, 0, 30);
                currSlideDigits[0].style.transform = 'translateY(' + -slideDigitTop + '%)';
                currSlideDigits[1].style.transform = 'translateY(' + -slideDigitTopNext + '%)';
            }

            if (topPos > 0) {
                nextSlide.classList.add('top');
            } else {
                nextSlide.classList.remove('top');
            }

            if (topPos < -globStates.freeDragHeight) {
                goToNextSlide(draggedTarget.dataset['sliceNum'], -1);
                pos2 = pos3 = topPos = 0;
            } else if (topPos > globStates.freeDragHeight) {
                pos2 = pos3 = topPos = 0;
                goToNextSlide(draggedTarget.dataset['sliceNum'], 1);
            }
        }

        function stopDragElement() {
            mouseCursor.resetCursorLine(topPos > 0 ? 1 : -1, false);
            globStates.isDrag = false;

            if (topPos < -globStates.freeDragHeight) {
                goToNextSlide(draggedTarget.dataset['sliceNum'], -1);
            } else if (topPos > globStates.freeDragHeight) {
                goToNextSlide(draggedTarget.dataset['sliceNum'], 1);
            } else {
                elmnt.parentNode.classList.add('orig-scale');
                new TimelineMax({
                        onComplete: slideBackCallback
                    })
                    .to([elmnt, taglineSlicePrev, taglineSliceNext, taglineSlice, currSlideDigits], .3, {
                        y: 0,
                        clearProps: 'y'
                    })
                    .to(nextElem, 0.3, {
                        y: (topPos < 0 ? '100%' : '-100%'),
                        clearProps: 'y'
                    }, 0);

                function slideBackCallback() {
                    elmnt.dataset.top = 0;
                }
            }
            /* stop moving when mouse button is released:*/
            document.onmouseup = document.ontouchcancel = null;
            document.onmousemove = document.ontouchmove = null;
        }

        pos2 = pos3 = topPos = 0;
    }

    return {
        allSlides,
        slidersCount,
        allTaglines,
        goToNextSlide,
        initSlider
    };
})(globStates);

/////////////////////////////////////////////////////

slides.initSlider();

setTimeout(() => {
    matrixStyleRounding(jsMatrix);
    preload.animate();
}, 200);

function splitTextInSpans(elem) {
    const letters = elem.textContent.split('');
    elem.innerHTML = '';
    return letters.map(letter => {
        const span = document.createElement('span');
        span.textContent = letter;
        elem.appendChild(span);
        return span;
    });
}

/**
 * @param currSlideSlices - array of slices for sorting
 * @param startSliceIdx - select position for sorting
 * @returns {Array} - sorted slices
 */
function getSortedSlicesBySelectPos(currSlideSlices, startSliceIdx) {
    const slicesCount = currSlideSlices.length;
    const sortedSlices = [];
    const posShift = (startSliceIdx - 1.5);
    let slicesNewOrder = [];

    // calc new positions for slide slices
    for (let i = slicesCount - 1; i >= 0; --i) {
        slicesNewOrder.push({
            idx: i,
            shift: Math.abs(slicesCount / 2 + posShift - i)
        });
    }

    slicesNewOrder
        .sort((a, b) => a.shift - b.shift)
        .forEach((item) => {
            sortedSlices.push(currSlideSlices[item.idx]);
        });

    return sortedSlices;
}

window.addEventListener('resize', function() {
    matrixStyleRounding(jsMatrix);
});

// recalc matrix (округление значений к integer)
function matrixStyleRounding(inObj) {
    if (inObj) {
        for (let i = 0; i < inObj.length; ++i) {
            const tmpObj = inObj[i];
            tmpObj.style.transform = '';
            let matrix = getComputedStyle(tmpObj).transform;
            matrix = matrix.slice(7, -1).split(' ').map(function(item) {
                return parseInt(item);
            });
            tmpObj.style.transform = 'matrix(' + matrix.join(',') + ')';
        }
    }
}

function map(target, start1, stop1, start2, stop2) {
    return ((target - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function removeThenAddClasses(domEl, removeClass, addClass) {
    if (Array.isArray(domEl)) {
        domEl.forEach(function(itemEl) {
            itemEl.classList.remove(removeClass);
            itemEl.classList.add(addClass);
        });
    } else {
        domEl.classList.remove(removeClass);
        domEl.classList.add(addClass);
    }
}