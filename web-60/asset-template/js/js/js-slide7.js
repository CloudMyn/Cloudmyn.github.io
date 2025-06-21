var splide;
        var tickAuto;
        var canSliding = true;
        var onSwipe = false;
        var alreadyReload = false;
        $(document).ready(function () {
          // animasi masuk tiap komponen
          if ($('.c-sampul-id').length) {
            // console.log(jsonSlide)
            setTimeout(function () {
              frameAnimation();
              runCustomElements();
              $('.c-sampul-id').attr('data-anim', 'zoom-in')
              $('.panggilan_mempelai_cli').attr('data-anim', 'zoom-in')
              $('#c-doa-id').attr('data-anim', 'zoom-in')
              $('#c-embed-map-id').attr('data-anim', 'zoom-in')
              $('#c-pengumuman-id').attr('data-anim', 'zoom-in')
              $('#c-ucapan-penutup-id').attr('data-anim', 'zoom-in')
              $('#htm-fun-div-id1').attr('data-anim', 'zoom-in')
              $('.btn-save-the-date').attr('data-anim', 'fade-up')
              runAnimationOrnamentSlide()
            }, 1900)
          }
          // end animasi masuk tiap komponen

          var urlParams = new URLSearchParams(window.location.search);
          var sectionName = urlParams.get('contoh');
          if (sectionName == 1) {
              $('#head_buat').show();
              $('#animasi_ucapan').remove();
          }



            // setTimeout(function() {
            //     loadUcapan();
            // }, 3000);



            splide = new Splide( '.splide-menu', {
                // type   : 'loop',
                perPage: 5,
                focus  : 'center',
                pagination : false,
                arrows     : false,
            });

            splide.mount();

            // let lastIndex = null;

            splide.on('click', function (event) {
                var slideIndex = event.index;
                translate = slideIndex*-100;
                // if (slideIndex === lastIndex) return;
                // lastIndex = slideIndex;
                // Move to the clicked slide with centered focus
                // console.log('slide index:'+slideIndex);
                slideTo(slideIndex*-100);
                splide.go(slideIndex);
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            });

            splide.on('active', function (event) {
                var slideIndex = event.index;
                var slideComponent = event.slide;
                // slideComponent.style.backgroundColor = 'red';
                var tagP = slideComponent.querySelector('p');
                // console.log(tagP)
                // tagP.style.color = '#000';
                // tagP.style.fontSize = '13px';
                // console.log("Atribut ID: "+tagP.getAttribute('id'));
                // doAnimation(tagP.getAttribute('id'));
            });

            splide.on('inactive', function (event) {
                var slideIndex = event.index;
                var slideComponent = event.slide;
                // slideComponent.style.backgroundColor = 'white';
                // var tagP = slideComponent.querySelector('p');
                // tagP.style.color = '#828282';
                // tagP.style.fontSize = '11px';
            });


            // Set isDragging to false when dragging ends
            splide.on('dragged', function () {
                draggedIndex = splide.index;
                // console.log('Currently dragged index:', draggedIndex);
                slideTo(draggedIndex*-100);
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);

                setTimeout(function () {
                    canSliding = true;
                }, 10);
            });

            splide.on('dragging', function () {
                canSliding = false;
                // console.log('on draging');
            });

            splide.on('move', (newIndex) => {
                splide.Components.Elements.slides.forEach((slide, index) => {
                    slide.classList.toggle('is-active', index === newIndex);
                });
            });

        });

        // lightGallery(document.getElementById('lightgallery'), {
        //     plugins: [lgZoom, lgThumbnail],
        //     speed: 500,
        //     // dynamic: true,
        //     // download: true,
        // });

        const lenghtGalery = $('.gallery-item').length

        if(lenghtGalery <= 3) {
          $('#galleryGrid').justifiedGallery({
            rowHeight: 120,
            lastRow: 'center',
            margins: 5
          });
        } else {
          $('#galleryGrid').justifiedGallery({
            rowHeight: 100,
            maxRowHeight: '110%',
            lastRow: 'center',
            margins: 5
          });
        }

        function initGridPopup() {
          $('#galleryGrid-popup').justifiedGallery({
            rowHeight: 150,
            lastRow: 'center',
            margins: 3
          });

          $('#galleryGrid-popup').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image',
            mainClass: 'mfp-img-mobile',
            gallery: {
              enabled: true,
              navigateByImgClick: true,
              preload: [0, 1]
            },
            zoom: {
              enabled: true,
              duration: 300,
              opener: function (element) {
                return element.find('img');
              }
            }
          });
        }

        $("#music_1").click(function () {
            var bool = $("#playAudio").prop("muted");
            $("#playAudio").prop("muted", !bool);
            $("#playAudioS").prop("muted", !bool);
            if (bool) {
                $('#svg_play').hide();
                $('#svg_pause').show();
            } else {
                $('#svg_play').show();
                $('#svg_pause').hide();
            }
        })


        var ticker = function () {
            if (autoPilot) {
                if (translate > maxTranslate) {
                    slide('next')
                } else {
                    slideTo(0)
                    splide.go(0);
                }
            }

        }

        var autoPilot = true;
        const pages = document.querySelectorAll(".page1");
        const translateAmount = 100;
        var numItems = $('.page1').length
        const maxTranslate = (-100 * numItems) + 100;
        let translate = 0;
        slide = (direction) => {
            startAnimHide()
            setTimeout(function () {
                direction === "next" ? translate -= translateAmount : translate += translateAmount;
                pages.forEach(page => {
                    page.style.transform = `translateY(${translate}%)`;
                    slideIndex = translate / 100*-1;
                    splide.go(slideIndex);
                    // console.log('translate:'+translate+'- index:'+slideIndex);
                });
                runAnimationOrnamentSlide()
                doAnimation(slideIndex)
                frameAnimation()
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            }, 1);
        }

        slideTo = (topage) => {

            startAnimHide()
            setTimeout(function () {
                translate = topage
                pages.forEach(
                    pages => (pages.style.transform = `translateY(${translate}%)`)
                );

                runAnimationOrnamentSlide()

                slideIndex = translate / 100 * -1;

                doAnimation(slideIndex);
                frameAnimation()
                clearInterval(tickAuto);
                tickAuto = window.setInterval(ticker, 8000);
            }, 1);
        }

        function frameAnimation() {
          // clear state
          $('.frame-border > img').removeAttr('data-anim').removeClass('has-animate').removeClass('animation-invisible');
          $('[class^="new_obj_"]').removeAttr('data-anim').removeClass('has-animate').removeClass('animation-invisible');
          anime.remove('.top-main');
          anime.remove('.bot-main');
          anime.remove('.right-main');
          anime.remove('.left-main');
          anime.remove('.top-left');
          anime.remove('.top-right');
          anime.remove('.bot-left');
          anime.remove('.bot-right');
          // end clear state

          anime({
            targets: '.top-main',
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.top_main?.duration ? jsonSlide.style?.top_main?.duration : 3500,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.top_main?.delay ? jsonSlide.style?.top_main?.delay : 800,
            complete: function () {
              if (jsonSlide.style?.top_main?.animation) $('.top-main').addClass('has-animate').attr('data-anim', jsonSlide.style?.top_main?.animation);
            }
          });

          anime({
            targets: '.bot-main',
            translateY: [100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.bot_main?.duration ? jsonSlide.style?.bot_main?.duration : 3500,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.bot_main?.delay ? jsonSlide.style?.bot_main?.delay : 800,
            complete: function () {
              if (jsonSlide.style?.bot_main?.animation) $('.bot-main').addClass('has-animate').attr('data-anim', jsonSlide.style?.bot_main?.animation);
            }
          });

          anime({
            targets: '.left-main',
            translateX: [-100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.left_main?.duration ? jsonSlide.style?.left_main?.duration : 3500,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.left_main?.delay ? jsonSlide.style?.left_main?.delay : 1100,
            complete: function () {
              if (jsonSlide.style?.left_main?.animation) $('.left-main').addClass('has-animate').attr('data-anim', jsonSlide.style?.left_main?.animation);
            }
          });

          anime({
            targets: '.right-main',
            translateX: [100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.right_main?.duration ? jsonSlide.style?.right_main?.duration : 3500,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.right_main?.delay ? jsonSlide.style?.right_main?.delay : 1100,
            complete: function () {
              if (jsonSlide.style?.right_main?.animation) $('.right-main').addClass('has-animate').attr('data-anim', jsonSlide.style?.right_main?.animation);
            }
          });

          anime({
            targets: '.top-left',
            translateX: [-100, 0],
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.top_left?.duration ? jsonSlide.style?.top_left?.duration : 3000,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.top_left?.delay ? jsonSlide.style?.top_left?.delay : 0,
            complete: function () {
              if (jsonSlide.style?.top_left?.animation) $('.top-left').addClass('has-animate').attr('data-anim', jsonSlide.style?.top_left?.animation);
            }
          });

          anime({
            targets: '.top-right',
            translateX: [100, 0],
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.top_right?.duration ? jsonSlide.style?.top_right?.duration : 3000,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.top_right?.delay ? jsonSlide.style?.top_right?.delay : 0,
            complete: function () {
              if (jsonSlide.style?.top_right?.animation) $('.top-right').addClass('has-animate').attr('data-anim', jsonSlide.style?.top_right?.animation);
            }
          });

          anime({
            targets: '.bot-left',
            translateX: [-200, 0],
            translateY: [200, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.bot_left?.duration ? jsonSlide.style?.bot_left?.duration : 3000,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.bot_left?.delay ? jsonSlide.style?.bot_left?.delay : 0,
            complete: function () {
              if (jsonSlide.style?.bot_left?.animation) $('.bot-left').addClass('has-animate').attr('data-anim', jsonSlide.style?.bot_left?.animation);
            }
          });

          anime({
            targets: '.bot-right',
            translateX: [200, 0],
            translateY: [200, 0],
            opacity: [0, 1],
            duration: jsonSlide.style?.bot_right?.duration ? jsonSlide.style?.bot_right?.duration : 3000,
            easing: 'easeOutExpo',
            delay: jsonSlide.style?.bot_right?.delay ? jsonSlide.style?.bot_right?.delay : 0,
            complete: function () {
              if (jsonSlide.style?.bot_right?.animation) $('.bot-right').addClass('has-animate').attr('data-anim', jsonSlide.style?.bot_right?.animation);
            }
          });

          // new obj
          jsonSlide?.animation?.forEach((element, index) => {
            $('.new_obj_' + index).addClass('has-animate').attr('data-anim', element.animation).attr('data-anim-duration', element.duration + 'ms');
          })
          // end new obj

        }

        function runCustomElements() {

          const createImageElement = (element, index) => `
            <img
              class="new_obj_${index}"
              src="${element?.src}" 
              alt="awal"
              data-anim="${element.animation}"
              data-anim-duration="${element.duration}ms"
              style="position: absolute;
              z-index: ${element?.['z-index']};
              top: ${element?.top};
              bottom: ${element?.bottom};
              left: ${element?.left};
              right: ${element?.right};
              width: ${element?.width};
              height: ${element?.height};">
          `;
          
          jsonSlide?.animation?.forEach((element, index) => {
            if (element?.frame) {
              const imageTemplate = createImageElement(element, index);

              if (element.frame == 'awal') {
                $('.awal1').append(imageTemplate);

                if (element['idle-animation']) { // Handle idle animation
                  $('.awal1 img:last-child').on('animationend', function () {
                    $(this).attr('data-anim', element['idle-animation']);
                    if (element['idle-animation-duration']) $(this).css('animation-duration', element['idle-animation-duration'] + 'ms');
                  });
                }
              }
              else if (element.frame == 'all') {
                if (element['exclude-frame'] !== 'awal') {
                  $('.awal1').append(imageTemplate);

                  if (element['idle-animation']) { // Handle idle animation
                    $('.awal1 img:last-child').on('animationend', function () {
                      $(this).attr('data-anim', element['idle-animation']);
                      if (element['idle-animation-duration']) $(this).css('animation-duration', element['idle-animation-duration'] + 'ms');
                    });
                  }

                }

                $('.page1:not(.awal1)').each(function () {
                  $(this).append(imageTemplate);

                  if (element['idle-animation']) { // Handle idle animation
                    $(this).find('img').on('animationend', function () {
                      $(this).attr('data-anim', element['idle-animation']);
                      if (element['idle-animation-duration']) $(this).css('animation-duration', element['idle-animation-duration'] + 'ms');
                    });
                  }

                });
              }

            }
          })

          // animation-style
          jsonSlide?.['animation-style']?.forEach((element) => {
            $('.' + element.class).attr('data-anim', element.animation).attr('data-anim-duration', element.duration + 'ms');
          })
          // end animation-style
        }


        function goToSlideId(slideClassId) {
            var slideElement = document.querySelector('.'+slideClassId);
            var slideElId = slideElement.id;
            if (slideElement) {
                var indexSlide = slideElId.slice(-2);
                splide.go(indexSlide-1);
                slideTo((indexSlide-1)*-100);
            }
        }


        // close modal
        $('.ucapan-slide-close').on('click', function () {
            closeEditModal('ucapan-slide');
        })



        let touchstartX = 0
        let touchendX = 0

        function checkDirection() {
            var selisih = touchstartX-touchendX;
            if (selisih < 0) {
                selisih = selisih*-1;
            }
            // console.log('Slisih sliding: '+selisih);
            if (selisih < 30) {
                return false;
            }

            onSwipe = true;
            setTimeout(function () {
                onSwipe = false;
            }, 100);

            if (canSliding) {
                if (touchendX < touchstartX) {
                    // alert('swiped left!')
                    // console.log('to LEFT');
                    if (translate > maxTranslate) {

                        if (autoPilot == false) {
                            slide('next')
                        } else {
                            showNotifScroll()
                        }
                    } else {
                        slideTo(0)
                        splide.go(0);
                    }
                    $('#tutorial-swipe').hide();

                }
                if (touchendX > touchstartX) {
                    // alert('swiped right!')
                    // console.log('to RIGHT');
                    if (translate < 0) {
                        if (autoPilot == false) {
                            slide('previous')
                        } else {
                            showNotifScroll()
                        }

                    }
                    $('#tutorial-swipe').hide();
                }
            }
        }


        var allPages = document.querySelector('.pages1');
        allPages.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenY
        })

        allPages.addEventListener('touchend', e => {
            touchendX = e.changedTouches[0].screenY
            // if (autoPilot == false) {
                checkDirection()
            // }

        })

        function showNotifScroll() {
            if ($('#notif-scroll').length == 0) {
                $('#splide').before('<div id="notif-scroll" style="bottom: 95px;opacity:0;background-color: #292929;position: fixed;right: 80px;font-size: 10px;padding: 5px;border-radius: 5px;color: #fff;">Matikan fitur auto scroll untuk melakukan manual scroll 👉</div>');
                anime({
                    targets: '#notif-scroll',
                    translateX: 20,
                    opacity: 1,
                    duration: 800,
                    easing: 'easeInOutQuad'
                });
                setTimeout(function() {
                    $('#notif-scroll').remove();
                }, 5000);
            }
        }

        function showMusic() {
            $("#menu-music-cont").toggle();
        }


        function runAutoScroll() {
            tickAuto = window.setInterval(ticker, 8000);
        }


        $('#auto_scroll1').on('click', function (e) {
            e.preventDefault();
            if (autoPilot) {
                $('#menu_auto_scroll').css('background-color', '#4970ea');
                autoPilot = false;
                $('#notif_scroll1').hide();
                $('#tutorial-swipe').show();
            } else {
                autoPilot = true;
                $('#menu_auto_scroll').css('background-color', 'transparent');
                $('#notif_scroll1').show();
                $('#tutorial-swipe').hide();
            }
        });


        function startAnimHide() {
            // return true;
            $('.pojok-kiri-atas1').removeClass('goyang-1')
            $('.kanan-bawah').removeClass('goyang-12')
            // $('.pojok-kiri-atas1').css('transform', 'translateY(129px)')

            // animate atas
            anime({
                targets: '.pojok-kiri-atas1',
                translateY: -180,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 500,
            });

            setTimeout(function () {
                anime({
                    targets: '.pojok-kiri-atas1',
                    translateY: 0,
                    opacity: 1,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            setTimeout(function () {
                $('.pojok-kiri-atas1').addClass('goyang-1')
            }, 2500);
            // end animate atas


            // animate bawah
            anime({
                targets: '.kanan-bawah',
                translateY: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 500,
            });

            setTimeout(function () {
                anime({
                    targets: '.kanan-bawah',
                    translateY: 0,
                    opacity: 1,
                    duration: 2000,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            setTimeout(function () {
                $('.kanan-bawah').addClass('goyang-12')
            }, 2500);
            // end animate bawah


            // animate tengah
            anime({
                targets: '.tengah-atas',
                translateY: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-atas',
                    translateY: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            anime({
                targets: '.tengah-bawah',
                translateY: -170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-bawah',
                    translateY: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);
            // end animate tengah


            // animate kiri-kanan
            anime({
                targets: '.tengah-kiri',
                translateX: -170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-kiri',
                    translateX: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            anime({
                targets: '.tengah-kanan',
                translateX: 170,
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-kanan',
                    translateX: 0,
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);
            // end animate kiri kanan

            // zoom
            anime({
                targets: '.tengah-zoom',
                scaleX: 0, // Scale factor for X axis
                scaleY: 0, // Scale factor for Y axis
                opacity: 0,
                easing: 'easeInOutQuad',
                duration: 800,
            });

            setTimeout(function () {
                anime({
                    targets: '.tengah-zoom',
                    scaleX: 1, // Scale factor for X axis
                    scaleY: 1, // Scale factor for Y axis
                    opacity: 1,
                    duration: 1300,
                    easing: 'easeInOutQuad'
                });
            }, 2000);

            // end zoom

        }


        function kembali() {
            // console.log('ISI FN KEMBALI');
        }





        // start on click
        var opened = false;
        $(".awal1").on("click", function () {
            if (!opened) {
                opened = true;
                // console.log('open undangan');
                let param = searchParams.get('kpd');
                $('#konfir_nama').val(param);
                $("#playAudio").get(0).play();
                $("#playAudioS").get(0).play(); //play musik
                runAutoScroll()
                slide('next')
                $('#buka-undangan').hide()
                toggleFullScreen(document.body)
                $('#menu_btn_1').show()
                $('#img-kado-buka').show();
                $('#btn_open').hide();
                // atur frame border bottom

                if (!jsonSlide.style.bot_main.bottom) {
                  $('.bot-main').css({ 'bottom': '0' });
                }else{
                  $('.bot-main').css({ 'bottom': (parseInt(jsonSlide.style.bot_main.bottom)) + 'px' });
                }

                if (!jsonSlide.style.bot_right.bottom) {
                  $('.bot-right').css({ 'bottom': '0' });
                }else{
                  $('.bot-right').css({ 'bottom': (parseInt(jsonSlide.style.bot_right.bottom)) + 'px' });
                }

                if (!jsonSlide.style.bot_left.bottom) {
                  console.log('jos1')
                  $('.bot-left').css({ 'bottom': '0' });
                }else{
                  $('.bot-left').css({ 'bottom': (parseInt(jsonSlide.style.bot_left.bottom)) + 'px' });
                }
            }
        });


        function toggleFullScreen(elem) {
            // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document
                    .msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document
                    .mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !==
                    undefined && !document.webkitIsFullScreen)) {
                if (elem.requestFullScreen) {
                    elem.requestFullScreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullScreen) {
                    elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
}

function next() {
    splide.go('>');
    translate = Math.max(translate - translateAmount, maxTranslate);
    pages.forEach(page => {
        page.style.transform = `translateY(${translate}%)`;
    });
    clearInterval(tickAuto);
    // tickAuto = window.setInterval(ticker, 8000);
}

function prev() {
    splide.go('<');
    translate = Math.min(translate + translateAmount, 0);
    pages.forEach(page => {
        page.style.transform = `translateY(${translate}%)`;
    });
    clearInterval(tickAuto);
    // tickAuto = window.setInterval(ticker, 8000);
}

function openPopupSlide(title, content, popup) {
  $('#popup-slide').show();

  $('#popup-slide-title').text(title);
  $('#popup-slide-content').html(content);

  if (popup == 'gallery'){
    initGridPopup()
  }

  anime({
    targets: '#popup-slide-body',
    translateY: 0,
    opacity: 1,
    duration: 500,
    easing: 'easeInOutSine'
  });
}

function closePopupSlide() {
  anime({
    targets: '#popup-slide-body',
    translateY: 400,
    opacity: 0,
    duration: 500,
    easing: 'easeInOutSine'
  });

  setTimeout(function () {
    $('#popup-slide').hide();
  }, 500);
}
