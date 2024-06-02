(function($) {
  "use strict";

  /* Preloader */
  function preloader() {
    $(window).on('load', function() {
      $('#preloader').fadeOut('slow', function() {
        $(this).remove();
      });
    });
  }

  function topMenuStick() {
    var s = $("#sticker");
    var pos = s.position();
    $(window).on('scroll', function() {
        var windowpos = $(window).scrollTop();
        s.toggleClass("stick", windowpos > pos.top);
    });
}
  /* Language Dropdown Scroll */
  function languageDropdownScroll() {
    var languageDropdown = $("#language-dropdown");
    $(window).on('scroll', function() {
      var windowpos = $(window).scrollTop();
      languageDropdown.toggleClass("scroll", windowpos > 300);
    });
  }
  
  function changeLanguage(lang) {
    window.location.search = '?lang=' + lang;
}
  /* Navbar Nav */
  function navbarNav() {
    var mainMenu = $(".main-menu ul.navbar-nav li");
    mainMenu.on('click', function() {
      mainMenu.removeClass("active");
      $(this).addClass("active");
    });
  }

  /* Initialize WOW.js */
  function initWow() {
    new WOW().init();
  }

  /* Nivo Slider */
  function nivoSlider() {
    $('#ensign-nivoslider').nivoSlider({
      effect: 'random',
      slices: 15,
      boxCols: 12,
      boxRows: 9,
      animSpeed: 500,
      pauseTime: 5000,
      startSlide: 0,
      directionNav: true,
      controlNavThumbs: false,
      pauseOnHover: true,
      manualAdvance: false,
    });
  }

  /* Scrollspy */
  function scrollspy() {
    $('body').scrollspy({
      target: '.navbar-collapse',
      offset: 80
    });
  }

  /* Venobox */
  function venobox() {
    $('.venobox').venobox();
  }

  /* Page Scroll */
  function pageScroll() {
    $('a.page-scroll').on('click', function(event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 55
      }, 1500, 'easeInOutExpo');
      event.preventDefault();
    });
  }

 /* Back to Top Button */
function backToTopButton() {
    $(window).scroll(function() {
        $('.back-to-top').toggle($(this).scrollTop() > 100);
    });

    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });
}

// Additional function to show/hide back-to-top button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.querySelector('.back-to-top').classList.add('show');
    } else {
        document.querySelector('.back-to-top').classList.remove('show');
    }
}

// Additional function for smooth scrolling when clicking the button
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

  /* Parallax */
  function parallax() {
    $('.wellcome-area').parallax("50%", 0.4);
    $('.wellcome-text').parallax("50%", 0.6);
  }

  /* Panel Collapse */
  function panelCollapse() {
    var panelTest = $('.panel-heading a');
    panelTest.on('click', function() {
      panelTest.removeClass('active');
      $(this).addClass('active');
    });
  }

  /* Testimonial */
  var testimonies = {
    en: [
      "Philippe Durand: VERITAL has been an essential partner in optimizing our operations. Their technical expertise and commitment to quality have significantly improved our efficiency and compliance with standards.",
      "Nadia Belkacem: I am impressed by VERITAL's professionalism and commitment to customer satisfaction. Their team has been very responsive and has always met our needs in an efficient and professional manner.",
      "Youssef Hamdi: Working with VERITAL has been a very enriching experience. Their collaborative approach and willingness to understand our specific needs have been greatly appreciated. I highly recommend their services.",
      "Amina Khaldi: VERITAL has exceeded all our expectations in terms of control and quality. Their competent team and attention to detail have made all the difference in the success of our projects. We are extremely satisfied with their work.",
      "Omar Bencherif: I am grateful to VERITAL for their valuable assistance in achieving our compliance and security goals. Their expertise and commitment to excellence have been a true asset to our company.",
      "Sophia Meziani: VERITAL has been a trusted partner in our journey to continuous improvement. Their proactive approach and willingness to go the extra mile have been essential to ensuring the quality and compliance of our products.",
      "Karim Boudjellal: I highly recommend VERITAL's services to any company seeking reliable and efficient quality control solutions. Their competent team and commitment to excellence make them a valuable partner in our industry."
    ],
    fr: [
      "Philippe Durand: VERITAL a été un partenaire essentiel dans l'optimisation de nos opérations. Leur expertise technique et leur engagement envers la qualité ont considérablement amélioré notre efficacité et notre conformité aux normes.",
      "Nadia Belkacem: Je suis impressionnée par le professionnalisme et l'engagement de VERITAL envers la satisfaction du client. Leur équipe a été très réactive et a toujours répondu à nos besoins de manière efficace et professionnelle.",
      "Youssef Hamdi: Travailler avec VERITAL a été une expérience très enrichissante. Leur approche collaborative et leur volonté de comprendre nos besoins spécifiques ont été très appréciées. Je recommande vivement leurs services.",
      "Amina Khaldi: VERITAL a dépassé toutes nos attentes en matière de contrôle et de qualité. Leur équipe compétente et leur souci du détail ont fait toute la différence dans la réussite de nos projets. Nous sommes extrêmement satisfaits de leur travail.",
      "Omar Bencherif: Je suis reconnaissant envers VERITAL pour leur assistance précieuse dans la réalisation de nos objectifs de conformité et de sécurité. Leur expertise et leur engagement envers l'excellence ont été un véritable atout pour notre entreprise.",
      "Sophia Meziani: VERITAL a été un partenaire de confiance dans notre parcours vers l'amélioration continue. Leur approche proactive et leur volonté d'aller au-delà des attentes ont été essentielles pour garantir la qualité et la conformité de nos produits.",
      "Karim Boudjellal: Je recommande vivement les services de VERITAL à toute entreprise cherchant des solutions de contrôle de qualité fiables et efficaces. Leur équipe compétente et leur engagement envers l'excellence en font un partenaire précieux dans notre secteur d'activité."
    ],
    ar: [
      "فيليب دوراند: كانت فريطال شريكًا أساسيًا في تحسين عملياتنا. لقد ساهمت خبرتهم التقنية والتزامهم بالجودة بشكل كبير في تحسين كفاءتنا وامتثالنا للمعايير.",
      "نادية بلقاسم: أنا معجبة بالاحترافية والالتزام الذي تظهره فريطال تجاه رضا العملاء. كان فريقهم سريع الاستجابة ودائمًا ما يلبي احتياجاتنا بكفاءة ومهنية.",
      "يوسف حمدي: كان العمل مع فريطال تجربة مثرية للغاية. تقديرهم للتعاون واستعدادهم لفهم احتياجاتنا الخاصة كانت محل تقدير كبير. أوصي بشدة بخدماتهم.",
      "أمينة الخالدي: تجاوزت فريطال كل توقعاتنا فيما يتعلق بالرقابة والجودة. لقد جعل فريقهم المؤهل واهتمامهم بالتفاصيل الفارق في نجاح مشاريعنا. نحن راضون للغاية عن عملهم.",
      "عمر بن شريف: أنا ممتن لفريطال على مساعدتهم القيمة في تحقيق أهدافنا فيما يتعلق بالامتثال والأمان. كانت خبرتهم والتزامهم بالتميز موردًا حقيقيًا لشركتنا.",
      "صوفيا مزياني: كانت فريطال شريكًا موثوقًا به في رحلتنا نحو التحسين المستمر. نهجهم الاستباقي واستعدادهم لتجاوز التوقعات كانا أساسيين في ضمان جودة منتجاتنا ومطابقتها.",
      "كريم بوجلال: أوصي بشدة بخدمات فريطال لأي شركة تبحث عن حلول موثوقة وفعالة للرقابة على الجودة. يجعل فريقهم المؤهل والتزامهم بالتميز شريكًا قيمًا في مجالنا."
  ]  
  };
  
  // Function to display testimonies in a loop
  function displayTestimonies() {
    // Get the current language from the HTML element
    var currentLang = document.documentElement.lang || 'fr';
  
    var testimonialLoop = document.querySelector('.testimonial-loop');
    var index = 0;
  
    // Check if testimonies array for current language is not empty
    if (testimonies[currentLang].length > 0) {
      // Display testimonies in a loop
      setInterval(function() {
        testimonialLoop.innerHTML = "<div class='testimonial'>" + testimonies[currentLang][index] + "</div>";
        index = (index + 1) % testimonies[currentLang].length;
      }, 8000); // Change the duration (in milliseconds) to control the speed of testimonies rotation
    } else {
      console.error("Testimonies array is empty for language:", currentLang);
    }
  }
  
  // Call the function to start displaying testimonies
  displayTestimonies(); 
  /* Isotope */
  function isotopeInit() {
    $(window).on("load", function() {
      var $container = $('.awesome-project-content');
      $container.isotope({
        filter: '*',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      var pro_menu = $('.project-menu li a');
      pro_menu.on("click", function() {
        var pro_menu_active = $('.project-menu li a.active');
        pro_menu_active.removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        $container.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });
    });
  }

  /* Knob */
  function knobInit() {
    if (typeof($.fn.knob) !== 'undefined') {
      var knob_tex = $('.knob');
      knob_tex.each(function() {
        var $this = $(this),
            knobVal = $this.attr('data-rel');

        $this.knob({
          'draw': function() {
            $(this.i).val(this.cv + '%');
          }
        });

        $this.appear(function() {
          $({value: 0}).animate({value: knobVal}, {
            duration: 2000,
            easing: 'swing',
            step: function() {
              $this.val(Math.ceil(this.value)).trigger('change');
            }
          });
        }, {accX: 0, accY: -150});
      });
    }
  }

  /* Change Language */
  function changeLanguage(lang) {
    $('html').attr('lang', lang);

    const flagImage = document.getElementById("language-button");
    if (lang === 'en') {
      flagImage.style.backgroundImage = "url('img/blog/flag_en.png')";
    } else if (lang === 'fr') {
      flagImage.style.backgroundImage = "url('img/blog/flag_fr.png')";
    } else if (lang === 'ar') {
      flagImage.style.backgroundImage = "url('img/1/alg.png')";
    }

    // Additional actions based on the selected language
  }

  function changeLanguageButton() {
    $('.language-select').on('click', function() {
      var lang = $(this).data('lang');
      changeLanguage(lang);
    });
  }
/* Smooth Scroll Function */
function smoothScrollTo(targetId) {
  $('html, body').stop().animate({
    scrollTop: $('#' + targetId).offset().top - 55
  }, 1500, 'easeInOutExpo');
}

$(document).ready(function() {
  preloader();
  topMenuStick();
  languageDropdownScroll();
  navbarNav();
  initWow();
  nivoSlider();
  scrollspy();
  venobox();
  pageScroll();
  backToTopButton();
  parallax();
  panelCollapse();
  displayTestimonies();
  isotopeInit();
  knobInit();
  changeLanguageButton();

  // Smooth scroll for internal links except home link
  $('a[href^="#"]').on('click', function(event) {
      var target = $(this.hash);
      if (target.length) {
          event.preventDefault();
          $('html, body').animate({
              scrollTop: target.offset().top
          }, 1000);
      }
  });

  // Smooth scroll for ACCUEIL link
  $('a[href="/"]').on('click', function(event) {
   // event.preventDefault();
    smoothScrollTo('home'); // Replace 'home' with the id of your home section
  });
});

function getHeaderClass(divisionName) {
  console.log('Division Name:', divisionName); // Add this line
  switch (divisionName) {
      case 'Aero':
          return 'header-bg4';
      case 'Marine':
          return 'header-bg5';
      case 'CONTRÔLE DE QUALITÉ':
          return 'header-bg6';
      case 'INDUSTRIE':
          return 'header-bg7';
      case 'TRANSPORT FERROVIAIRE ET GUIDE':
          return 'header-bg8';
      case 'CONTROLE ET VERIFICATION DES CONTENEURS':
          return 'header-bg9';
      case 'INSPECTION TECHNIQUE DES ASCENSEURS':
          return 'header-bg10';
      // Add more cases for other divisions
      default:
          return ''; // Default class if no match found
  }
}
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('sus_submit').addEventListener('click', function (e) {
    e.preventDefault();
    const email = document.getElementById('sus_email').value;
    const msgSubmit = document.getElementById('msg_Submit');

    if (validateEmail(email)) {
      fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          msgSubmit.classList.remove('hidden');
          msgSubmit.innerHTML = 'Subscription successful!';
        } else {
          msgSubmit.classList.remove('hidden');
          msgSubmit.innerHTML = 'Subscription failed. Try again.';
        }
      });
    } else {
      msgSubmit.classList.remove('hidden');
      msgSubmit.innerHTML = 'Please enter a valid email address.';
    }
  });
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

})(jQuery);
