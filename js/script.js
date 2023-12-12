const params = {
    btnClassName: "header-bottom__btn",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
}

function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
        evt.target.classList.remove(params.disabledClassName, params.activeClassName);
        evt.target.removeEventListener("animationend", onDisable);
    }
}

function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
        const activeElements = document.querySelectorAll(`.${params.activeClassName}`);

        if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
            activeElements.forEach((current) => {
                if (current.classList.contains(params.btnClassName)) {
                    current.classList.remove(params.activeClassName);
                } else {
                    current.classList.add(params.disabledClassName);
                }
            });
        }

        if (evt.target.closest(`.${params.btnClassName}`)) {
            const btn = evt.target.closest(`.${params.btnClassName}`);
            const path = btn.dataset.path;
            const drop = document.querySelector(`[data-target="${path}"]`);

            btn.classList.toggle(params.activeClassName);

            if (!drop.classList.contains(params.activeClassName)) {
                drop.classList.add(params.activeClassName);
                drop.addEventListener("animationend", onDisable);
            } else {
                drop.classList.add(params.disabledClassName);
            }
        }
    });
}

setMenuListener();

document.querySelector('#burger').addEventListener('click', function() {
    document.querySelector('#header-nav__list').classList.add('nav-list__active');

    document.querySelector('.header-burger-closed').addEventListener('click', function() {
        document.querySelector('#header-nav__list').classList.remove('nav-list__active');
    });
});

window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#search-btn').addEventListener('click', function() {
        document.querySelector('#search-form__menu').classList.toggle('search-form-menu-is-active')
    })
    document.querySelector('#close-btn').addEventListener('click', function() {
        document.querySelector('#search-form__menu').classList.toggle('search-form-menu-is-active')
    })
})


const heroSwiper = new Swiper('.hero-swiper-container', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
        delay: 10000
    }
});

let gallerySlider = new Swiper(".slides-container", {
    slidesPerView: 1,
    grid: {
        rows: 1,
        fill: "row"
    },
    spaceBetween: 20,
    pagination: {
        el: ".gallery .gallery-right__pagination",
        type: "fraction"
    },
    navigation: {
        nextEl: ".btn-next",
        prevEl: ".btn-prev"
    },

    breakpoints: {
        569: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            grid: {
                rows: 2
            },
            spaceBetween: 30
        },

        1200: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            grid: {
                rows: 2
            },
            spaceBetween: 50
        }
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми 
    watchSlidesProgress: true,
    slideVisibleClass: 'slide-visible',

    on: {
        init: function() {
            this.slides.forEach(slide => {
                if (!slide.classList.contains('slide-visible')) {
                    slide.tabIndex = '-1';
                } else {
                    slide.tabIndex = '';
                }
            });
        },
        slideChange: function() {
            this.slides.forEach(slide => {
                if (!slide.classList.contains('slide-visible')) {
                    slide.tabIndex = '-1';
                } else {
                    slide.tabIndex = '';
                }
            });
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const selector = document.querySelector(".choices")

    const choices = new Choices(selector, {
        searchEnabled: false,
        shouldSort: false,
        classNames: {
            containerOuter: 'choices header_choices',
        },
    });

});

// tabs-catalog-header

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.catalog-tab__btn').forEach(function(catalogTabBtn) {
        catalogTabBtn.addEventListener('click', function(event) {
            const path = event.currentTarget.dataset.path

            document.querySelectorAll('.catalog-tab__btn').forEach(function(catalogTabBtn) {
                catalogTabBtn.classList.remove('catalog-tab-btn-active')
            });
            event.currentTarget.classList.add('catalog-tab-btn-active')

            document.querySelectorAll('.tab-content').forEach(function(tabContent) {
                tabContent.classList.remove('tab-content-active')
            });
            document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active')
        })
    })
});

// accordion

document.addEventListener('DOMContentLoaded', function() {
    $(".js-accordion").accordion({
        collapsible: true,
        active: 0,
        icons: false,
        heightStyle: 'content'
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.catalog-accordion-content__link').forEach(function(catalogAccordionContentLink) {
        catalogAccordionContentLink.addEventListener('click', function(event) {
            const path = event.currentTarget.dataset.path

            document.querySelectorAll('.catalog-accordion-content__link').forEach(function(catalogAccordionContentLink) {
                catalogAccordionContentLink.classList.remove('catalog-accordion-content-link-active')
            });
            event.currentTarget.classList.add('catalog-accordion-content-link-active')

            document.querySelectorAll('.catalog-accordion-content-tab').forEach(function(catalogAccordionContentTab) {
                catalogAccordionContentTab.classList.remove('catalog-accordion-content-tab-active')
            });
            document.querySelector(`[data-target="${path}"]`).classList.add('catalog-accordion-content-tab-active')
        })
    })
});

// events

(() => {
    const MOBILE_WIDTH = 586;
    const DESKTOP_WIDTH = 956;
    const btn = document.querySelector(".js-show");

    const sliderMobileParams = {
        paginationClassName: "events-pagination",
        cardsContainerName: "js-slider",
        cardsWrapName: "js-slides-wrap",
        card: "event-slide",
        hiddenClass: "is-hidden"
    };

    function getWindowWidth() {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.body.clientWidth,
            document.documentElement.clientWidth
        );
    }

    function activateMobileSlider(params) {
        const pagination = document.createElement("div");
        pagination.classList.add(params.paginationClassName);
        params.cardsContainer.append(pagination);

        params.cardsContainer.classList.add("swiper-container");
        params.cardsWrap.classList.add("swiper-wrapper");

        params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: {
                el: `.${params.cardsContainerName} .${params.paginationClassName}`
            },

            on: {
                beforeInit() {
                    document.querySelectorAll(`.${params.card}`).forEach((el) => {
                        el.classList.add("swiper-slide");
                    });
                },

                beforeDestroy() {
                    this.slides.forEach((el) => {
                        el.classList.remove("swiper-slide");
                        el.removeAttribute("role");
                        el.removeAttribute("aria-label");
                    });

                    this.pagination.el.remove();
                }
            }
        });
    }

    function destroyMobileSlider(params) {
        params.cardsSlider.destroy();
        params.cardsContainer.classList.remove("swiper-container");
        params.cardsWrap.classList.remove("swiper-wrapper");
        params.cardsWrap.removeAttribute("aria-live");
        params.cardsWrap.removeAttribute("id");
    }

    function setHiddenCards(params, windowWidth) {
        const cards = document.querySelectorAll(`.${params.card}`);
        let quantity = cards.length;

        if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
            quantity = 2;
        }

        if (windowWidth >= DESKTOP_WIDTH) {
            quantity = 3;
        }

        cards.forEach((card, i) => {
            card.classList.remove(params.hiddenClass);
            if (i >= quantity) {
                card.classList.add(params.hiddenClass);
            }
        });
    }

    function showCards(e) {
        const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

        e.target.style = "display: none";

        cards.forEach((card) => {
            card.classList.remove(sliderMobileParams.hiddenClass);
        });
    }

    function checkWindowWidthMobile(params) {
        const currentWidth = getWindowWidth();
        btn.style = "";
        params.cardsContainer = document.querySelector(
            `.${params.cardsContainerName}`
        );
        params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

        if (
            currentWidth <= MOBILE_WIDTH &&
            (!params.cardsSlider || params.cardsSlider.destroyed)
        ) {
            activateMobileSlider(params);
        } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
            destroyMobileSlider(params);
        }

        setHiddenCards(params, currentWidth);
    }

    checkWindowWidthMobile(sliderMobileParams);
    btn.addEventListener("click", showCards);

    window.addEventListener("resize", function() {
        checkWindowWidthMobile(sliderMobileParams);
    });
})();

// pubications
// checkbox

(() => {
    const checkBtn = document.querySelector('.js-check-heading');

    checkBtn.addEventListener('click', function() {
        this.classList.toggle('is-active');
    });
})();

// pub-slider

(() => {
    const MOBILE_WIDTH = 586;

    const sliderParamsNotMobile = {
        sliderWrap: "pub-js-slider-main",
        cardsContainerName: "pub-js-slider",
        cardsWrapName: "pub-js-slides-wrap",
        card: "pub-slide",
        paginationClassName: "pub-test-pagination",
        navClassName: "pub-test-navigation",
        navBtnClassName: "pub-nav-btn",
        navPrev: "pub-test-prev",
        navNext: "pub-test-next"
    };

    function getWindowWidth() {
        console.log(document.body.scrollWidth);
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.body.clientWidth,
            document.documentElement.clientWidth
        );
    }

    function activateSlider(params) {
        const navigation = document.createElement("div");
        const pagination = document.createElement("div");
        const navBtnPrev = document.createElement("button");
        const navBtnNext = document.createElement("button");

        navigation.classList.add(params.navClassName);

        navBtnPrev.classList.add(params.navBtnClassName);
        navBtnPrev.classList.add(params.navPrev);
        navigation.prepend(navBtnPrev);

        pagination.classList.add(params.paginationClassName);
        navigation.append(pagination);

        navBtnNext.classList.add(params.navBtnClassName);
        navBtnNext.classList.add(params.navNext);
        navigation.append(navBtnNext);

        params.sliderWrapElem.prepend(navigation);

        params.cardsContainer.classList.add("swiper-container");
        params.cardsWrap.classList.add("swiper-wrapper");

        params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
            slidesPerView: 2,
            // slidesPerGroup: 3,
            spaceBetween: 20,

            pagination: {
                el: `.${params.sliderWrap} .${params.paginationClassName}`,
                type: "fraction"
            },

            navigation: {
                nextEl: `.${params.navNext}`,
                prevEl: `.${params.navPrev}`
            },
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 34,
                },
                1000: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 50,
                },
                1250: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 50,
                }
            },

            on: {
                beforeInit() {
                    document.querySelectorAll(`.${params.card}`).forEach((el) => {
                        el.classList.add("swiper-slide");
                    });
                },

                beforeDestroy() {
                    this.slides.forEach((el) => {
                        el.classList.remove("swiper-slide");
                        el.removeAttribute("role");
                        el.removeAttribute("aria-label");
                    });

                    this.pagination.el.remove();
                    navigation.remove();
                }
            }
        });
    }

    function destroySlider(params) {
        params.cardsSlider.destroy();
        params.cardsContainer.classList.remove("swiper-container");
        params.cardsWrap.classList.remove("swiper-wrapper");
        params.cardsWrap.removeAttribute("aria-live");
        params.cardsWrap.removeAttribute("id");
    }

    function checkWindowWidth(params) {
        const currentWidth = getWindowWidth();
        params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
        params.cardsContainer = document.querySelector(
            `.${params.cardsContainerName}`
        );
        params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

        if (
            currentWidth > MOBILE_WIDTH &&
            (!params.cardsSlider || params.cardsSlider.destroyed)
        ) {
            activateSlider(params);
        } else if (currentWidth <= MOBILE_WIDTH && params.cardsSlider) {
            destroySlider(params);
        }
    }

    checkWindowWidth(sliderParamsNotMobile);

    window.addEventListener("resize", function() {
        checkWindowWidth(sliderParamsNotMobile);
    });
})();

// projects

(() => {

    tippy('#tooltip1', {
        content: "Пример современных тенденций - современная методология разработки",
        trigger: 'click',
        trigger: 'focus'
    });
    tippy('#tooltip2', {
        content: "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
        trigger: 'click',
        trigger: 'focus'
    });
    tippy('#tooltip3', {
        content: "В стремлении повысить качество",
        trigger: 'click',
        trigger: 'focus'
    });
})();


// partners

let partnersSwiper = new Swiper(".swiper", {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 50,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            slidesPerGroup: 1,
            spaceBetween: 0,
        },
        576: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 15,
        },
        768: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 34,
        },
        1024: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 50,
        },
        1200: {
            slidesPerView: 3,
            slidesPerGroup: 1,
            spaceBetween: 54,
        }

    },

    a11y: {
        prevSlideMessage: 'Предыдущий',
        nextSlideMessage: 'Следующий',
    }

});

// form

document.addEventListener('DOMContentLoaded', () => {

    const phone = document.querySelector("input[type='tel']");
    const im = new Inputmask("+7 (999)-999-99-99");
    im.mask(phone);

    new JustValidate('.contacts-form', {
        rules: {
            name: {
                required: true,
                minLength: 2,
                maxLength: 10,
            },
            tel: {
                required: true,
                function: (name, value) => {
                    const phone = selector.inputmask.unmaskedvalue()
                    return Number(phone) && phone.length === 10
                }
            },
        },
        messages: {
            name: 'Недопустимый формат',
            tel: 'Недопустимый формат',
        },


        submitHandler: function(form) {
            let formData = new FormData(form);

            fetch('mail.php', {
                    method: 'POST',
                    body: formData
                }).then(() => {
                    console.log('Отправлено');
                    form.reset();
                })
                .catch(() => console.log('Ошибка'));
        },

        colorWrong: '#D11616'
    })
});

// let validateForms = function(selector, rules, successModal, yaGoal) {
//     new window.JustValidate(selector, {
//         rules: rules,
//         submitHandler: function(form) {
//             let formData = new FormData(form);

//             let xhr = new XMLHttpRequest();

//             xhr.onreadystatechange = function() {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status === 200) {
//                         console.log('Отправлено');
//                     }
//                 }
//             }

//             xhr.open('POST', 'mail.php', true);
//             xhr.send(formData);

//             form.reset();

//         }
//     });
// }

ymaps.ready(init);

function init() {
    const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
        "map", {
            center: [55.75846806898367, 37.60108849999989],
            zoom: 14,
            controls: ['geolocationControl', 'zoomControl']
        }, {
            suppressMapOpenBlock: true,
            geolocationControlSize: "large",
            geolocationControlPosition: { top: "200px", right: "20px" },
            geolocationControlFloat: 'none',
            zoomControlSize: "small",
            zoomControlFloat: "none",
            zoomControlPosition: { top: "120px", right: "20px" }
        }
    );

    const myPlacemark = new ymaps.Placemark(
        [55.75846806898367, 37.60108849999989], {}, {
            iconLayout: "default#image",
            iconImageHref: "img/maps_icon.svg",
            iconImageSize: [20, 20],
            iconImageOffset: [-20, -40],
        }
    );

    myMap.geoObjects.add(myPlacemark);

    setTimeout(() => {
        myMap.container.fitToViewport();
    }, 5000);
}

window.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#tooltip1').addEventListener('click', function() {
        document.querySelector('#tooltip1-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip1-closed').addEventListener('click', function() {
        document.querySelector('#tooltip1-closed').classList.remove('tooltip-is-active')
    });
    document.querySelector('#tooltip2').addEventListener('click', function() {
        document.querySelector('#tooltip2-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip2-closed').addEventListener('click', function() {
        document.querySelector('#tooltip2-closed').classList.remove('tooltip-is-active')
    });
    document.querySelector('#tooltip3').addEventListener('click', function() {
        document.querySelector('#tooltip3-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip3-closed').addEventListener('click', function() {
        document.querySelector('#tooltip3-closed').classList.remove('tooltip-is-active')
    });


    document.querySelector('#tooltip1').addEventListener('focus', function() {
        document.querySelector('#tooltip1-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip1-closed').addEventListener('focus', function() {
        document.querySelector('#tooltip1-closed').classList.remove('tooltip-is-active')
    });
    document.querySelector('#tooltip2').addEventListener('focus', function() {
        document.querySelector('#tooltip2-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip2-closed').addEventListener('focus', function() {
        document.querySelector('#tooltip2-closed').classList.remove('tooltip-is-active')
    });
    document.querySelector('#tooltip3').addEventListener('focus', function() {
        document.querySelector('#tooltip3-closed').classList.toggle('tooltip-is-active')
    })
    document.querySelector('#tooltip3-closed').addEventListener('focus', function() {
        document.querySelector('#tooltip3-closed').classList.remove('tooltip-is-active')
    });
});

document.querySelectorAll('.js-scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        const href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const elementPosition = scrollTarget.getBoundingClientRect().top;

        window.scrollBy({
            top: elementPosition,
            behavior: 'smooth'
        });
    });
});

const gallerySlide = document.querySelectorAll('.gallery-slide');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const close = document.querySelectorAll('.modal-closed-btn');


gallerySlide.forEach((el) => {
    el.addEventListener('click', (e) => {
        let path = e.currentTarget.getAttribute('data-path');

        modals.forEach((el) => {
            el.classList.remove('modal-visible');
        });

        document.querySelector(`[data-target="${path}"]`).classList.add('modal-visible');
        modalOverlay.classList.add('modal-overlay-visible');
    });
});


close.forEach(function(o) {
    o.addEventListener('click', function() {
        modalOverlay.classList.remove('modal-overlay-visible');
        el.classList.remove('modal-visible');
    });
});