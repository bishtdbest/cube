$(document).ready(function() {
  // sticky header 
  function handleHeaderScroll() {
      $('.header').toggleClass(
        'is-scrolled',
        $(window).scrollTop() > 200
      );
    }

    // Run on page load
    handleHeaderScroll();

    // Run on scroll
    $(window).on('scroll', function () {
      handleHeaderScroll();
    });
 
    // Hamburger Menu Toggle
    $('.hamburger').on('click', function() {
        $(this).toggleClass('active');
        $('header .nav, body').toggleClass('active');
        const expanded = $(this).attr('aria-expanded') === 'true' ? 'false' : 'true';
        $(this).attr('aria-expanded', expanded);
    });

    // Product slider 

 $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    arrows: true,
    dots: true,
    appendArrows: $('.slider-controls'),
    appendDots: $('.custom-dots'),
    prevArrow: $('.custom-prev'),
    nextArrow: $('.custom-next'),
    adaptiveHeight: true
  });

  $('.slider-nav-grid div').removeClass('active');
  $('.slider-nav-grid div').eq(0).addClass('active');

  $('.slider-nav-grid div').on('click', function () {
    const index = $(this).data('slide');

    $('.slider-for').slick('slickGoTo', index);

    $('.slider-nav-grid div').removeClass('active');
    $(this).addClass('active');
  });

  $('.slider-for').on('afterChange', function (event, slick, currentSlide) {
    $('.slider-nav-grid div').removeClass('active');
    $('.slider-nav-grid div')
      .eq(currentSlide)
      .addClass('active');
  });

// Product accordion 

var cartLinks = {
  "single_original": "https://example.com/cart?type=single&frag=original",
  "single_lily": "https://example.com/cart?type=single&frag=lily",
  "single_rose": "https://example.com/cart?type=single&frag=rose",

  // DOUBLE (9 combinations)
  "double_lily_original": "https://example.com/cart?type=double&frag1=lily&frag2=original",
  "double_lily_lily": "https://example.com/cart?type=double&frag1=lily&frag2=lily", 
  "double_lily_rose": "https://example.com/cart?type=double&frag1=lily&frag2=rose",
  "double_original_original": "https://example.com/cart?type=double&frag1=original&frag2=original",
  "double_original_lily": "https://example.com/cart?type=double&frag1=original&frag2=lily",
  "double_original_rose": "https://example.com/cart?type=double&frag1=original&frag2=rose",
  "double_rose_original": "https://example.com/cart?type=double&frag1=rose&frag2=original",
  "double_rose_lily": "https://example.com/cart?type=double&frag1=rose&frag2=lily",
  "double_rose_rose": "https://example.com/cart?type=double&frag1=rose&frag2=rose"
};

  // INITIAL STATE
  $("input[data-subscription]").prop("checked", false);
  $("input[data-subscription='single']").prop("checked", true);
  $("input[name='fragrance'][value='original']").prop("checked", true);
  $("input[name='fragrance1'][value='original']").prop("checked", true);
  $("input[name='fragrance2'][value='original']").prop("checked", true);
  
  $("input[type='radio']:checked").closest(".radio-label").addClass("active");
  
  $("#singleAccordion").addClass("active");
  $("#singleAccordion .accordion-body").show();
  $("#doubleAccordion").removeClass("active");
  $("#doubleAccordion .accordion-body").hide();

  function updateAddToCartLink() {
    var subscriptionType = $("input[data-subscription]:checked").attr("data-subscription");
    var key = "";

    console.log("Current subscription: " + subscriptionType);

    if (subscriptionType === "single") {
      var frag = $("input[name='fragrance']:checked").val();
      console.log("Single - Selected fragrance: " + frag);
      key = "single_" + frag;
    } else if (subscriptionType === "double") {
      var frag1 = $("input[name='fragrance1']:checked").val();
      var frag2 = $("input[name='fragrance2']:checked").val();
      
      console.log("Double - frag1: " + frag1 + ", frag2: " + frag2);
      
      if (frag1 && frag2) {
        var frags = [frag1, frag2].sort();
        key = "double_" + frags[0] + "_" + frags[1];
      }
    }

    var url = cartLinks[key] || "#";
    $("#addToCartLink").attr("href", url);
    console.log("Generated key: " + key + " | URL: " + url + "\n");
  }

  // Accordion header click
  $(".accordion-header").on("click", function (e) {
    if ($(e.target).closest("input[type='radio']").length) return;
    
    var $radio = $(this).find(".subscription-radio");
    $radio.prop("checked", true).trigger("change");
  });

  // Subscription radio change
  $(".subscription-radio").on("change", function () {
    var subscriptionType = $(this).attr("data-subscription");
    
    console.log("Subscription changed to: " + subscriptionType);
    
    $("input[data-subscription]").prop("checked", false);
    $(this).prop("checked", true);
    
    // Active class 
    $(".subscription-radio").closest(".radio-label").removeClass("active");
    $(this).closest(".radio-label").addClass("active");
    
    if (subscriptionType === "single") {
      $("#singleAccordion").addClass("active");
      $("#singleAccordion .accordion-body").slideDown(300);
      
      $("#doubleAccordion").removeClass("active");
      $("#doubleAccordion .accordion-body").slideUp(300);
    } else if (subscriptionType === "double") {
      $("#doubleAccordion").addClass("active");
      $("#doubleAccordion .accordion-body").slideDown(300);
      
      $("#singleAccordion").removeClass("active");
      $("#singleAccordion .accordion-body").slideUp(300);
    }

    var $accordion = $(this).closest(".accordion");
    var scrollTop = $accordion.offset().top - 100;
    $("html, body").animate({ scrollTop: scrollTop }, 300);

    setTimeout(function() {
      updateAddToCartLink();
    }, 50);
  });

  $(document).on("change", "input[type='radio']", function () {
    var $label = $(this).closest(".radio-label");
    var radioName = $(this).attr("name");
    
    $("input[name='" + radioName + "']").closest(".radio-label").removeClass("active");
    
    $label.addClass("active");
  });

  // Single fragrance change
  $(document).on("change", "input[name='fragrance']", function () {
    console.log("Single fragrance changed to: " + $(this).val());
    updateAddToCartLink();
  });

  // Double fragrance1 change
  $(document).on("change", "input[name='fragrance1']", function () {
    console.log("Fragrance1 changed to: " + $(this).val());
    updateAddToCartLink();
  });

  // Double fragrance2 change
  $(document).on("change", "input[name='fragrance2']", function () {
    console.log("Fragrance2 changed to: " + $(this).val());
    updateAddToCartLink();
  });

  // Add to cart click
  $(document).on("click", "#addToCartLink", function (e) {
    e.preventDefault();
    var url = $(this).attr("href");
    alert("Cart URL: " + url);
  });

  updateAddToCartLink();

  // Collection accordion list

  $(".accordion-list .accordion-item-body").hide();
 
  $(".accordion-list .accordion-item.active .accordion-item-body").show();

  $(".accordion-list").on("click", ".accordion-item-header", function (e) {
    e.preventDefault();
    
    var $currentItem = $(this).closest(".accordion-item");
    var $currentBody = $currentItem.find(".accordion-item-body");
    var isActive = $currentItem.hasClass("active");
    
    $(".accordion-list .accordion-item").removeClass("active");
    $(".accordion-list .accordion-item-body").slideUp(300);
    
    if (!isActive) {
      $currentItem.addClass("active");
      $currentBody.slideDown(300);
    }
  });


 function animateCounter($element, targetValue) {
    var currentValue = 0;
    var increment = targetValue / 50;  
    
    var interval = setInterval(function() {
      currentValue += increment;
      
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(interval);
      }
      
      $element.text(Math.floor(currentValue) + "%");
    }, 30);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var $element = $(entry.target);
        var targetValue = parseInt($element.data("target")); 
        
        animateCounter($element, targetValue);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  $(".stat-value").each(function() {
    observer.observe(this);
  });

});

