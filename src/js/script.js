$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
        responsive: [
          {
            breakpoint: 992,
            settings: {
              arrows: false
            }
            
          }
        ]
        
      });

      //Tabs

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

  function togleSlide(item) {
      $(item).each(function(i) {
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active')
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
        })
    })
  };

  togleSlide('.catalog-item__link');
  togleSlide('.catalog-item__back');

  //MODAL
  

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('fast');
  });
  $('.button_mini').on('click', function() {
    $('.overlay, #order').fadeIn('fast');
  });
  $('.modal__close').on('click', function() {
    $('.overlay, .modal').fadeOut()
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('fast'); 
    })
  });

  //VALIDATION

    function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Необходимо ввести не менее {0}-х символов!")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Нам нужен ваш email для связи с вами",
          email: "Ваш email адрес должен быть формата name@domain.com"
        }
      }
    });
  }

  validateForms('#consultation form');
  validateForms('#consultation-form');
  validateForms('#order form');

  //MASK FOR PHONE

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  //

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find('input').val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #Thx').fadeIn('slow');

      $('form').trigger('reset');
    });
    return false;
  });
});

