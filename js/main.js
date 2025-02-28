(function ($) {
    "use strict";

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".navbar").fadeIn("slow").css("display", "flex");
        } else {
            $(".navbar").fadeOut("slow").css("display", "none");
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on("click", function (event) {
        if (this.hash !== "") {
            event.preventDefault();

            $("html, body").animate(
                {
                    scrollTop: $(this.hash).offset().top - 45,
                },
                1500,
                "easeInOutExpo"
            );

            if ($(this).parents(".navbar-nav").length) {
                $(".navbar-nav .active").removeClass("active");
                $(this).closest("a").addClass("active");
            }
        }
    });

    // Small tags with pipe delimiters to chip elements
    $(document).ready(function () {
        $("small").each(function () {
            const text = $(this).text();
            if (text.includes("|")) {
                const items = text
                    .split("|")
                    .map((item) => item.trim())
                    .filter(Boolean);
                $(this).empty();

                items.forEach((item) => {
                    $("<span>").addClass("chip").text(item).appendTo($(this));
                });
            }
        });
    });

    // Portfolio image loading handler
    $(document).ready(function () {
        // Set minimum height for portfolio container to prevent layout shift
        $(".portfolio-container").css("min-height", "400px");

        // Process each portfolio item image
        $(".portfolio-item img").each(function () {
            const $img = $(this);

            // Set initial opacity to 0
            $img.css("opacity", "0");

            // Create and insert loading spinner
            const $parent = $img.parent();
            if ($parent.css("position") !== "relative") {
                $parent.css("position", "relative");
            }

            const $spinner = $('<div class="portfolio-loading-spinner"></div>');
            $parent.append($spinner);

            // Handle image loading
            if ($img[0].complete) {
                // Image already loaded from cache
                $img.css("opacity", "1");
                $spinner.remove();
            } else {
                // Image still loading
                $img.on("load", function () {
                    $(this).animate({ opacity: 1 }, 300);
                    $spinner.fadeOut(300, function () {
                        $(this).remove();
                    });
                });

                // Handle loading errors
                $img.on("error", function () {
                    $(this).animate({ opacity: 0.5 }, 300);
                    $spinner
                        .html('<i class="fa fa-exclamation-triangle"></i>')
                        .removeClass("portfolio-loading-spinner")
                        .addClass("portfolio-error-indicator");
                });
            }
        });
    });

    // Ensure Isotope layout updates after images load
    $(window).on("load", function () {
        // After all images have loaded, update Isotope layout
        $(".portfolio-container").isotope("layout");
    });

    $(document).ready(function () {
        // Reset button handler
        $("#resetMessageButton").on("click", function () {
            $("#message").val("").focus();
            $(this).hide();
        });

        // Show/hide reset button based on textarea content
        $("#message").on("input", function () {
            if ($(this).val().trim() !== "") {
                $("#resetMessageButton").show();
            } else {
                $("#resetMessageButton").hide();
            }
        });

        // Form submission with validation
        $("#contactForm").on("submit", function (e) {
            e.preventDefault();

            // Clear previous validation
            $(".invalid-feedback").remove();
            $(".is-invalid").removeClass("is-invalid");

            let isValid = true;
            const subject = $("#subject").val().trim();
            const message = $("#message").val().trim();

            // Subject validation
            if (subject === "") {
                isValid = false;
                $("#subject").addClass("is-invalid");
                $("#subject").after(
                    '<div class="invalid-feedback">Please enter a subject.</div>'
                );
            }

            // Message validation
            if (message === "") {
                isValid = false;
                $("#message").addClass("is-invalid");
                $("#message").after(
                    '<div class="invalid-feedback">Please enter a message.</div>'
                );
            }

            // If valid, send email
            if (isValid) {
                const email = "vsaravind01@gmail.com";
                const encodedSubject = encodeURIComponent(subject);
                const encodedMessage = encodeURIComponent(message);

                // Create mailto link with subject and body
                const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedMessage}`;

                // Open user's email client in a new tab
                window.open(mailtoLink, "_blank");
            }
        });
    });

    // Typed Initiate
    if ($(".typed-text-output").length == 1) {
        var typed_strings = $(".typed-text").text();
        var strings = typed_strings.split(",");
        // remove new line characters from each string
        strings = strings.map((str) =>
            str
                .replace("\n", " ")
                .replace("                        ", "")
                .replace("    ", "")
        );
        console.log(strings);
        var typed = new Typed(".typed-text-output", {
            strings: strings,
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true,
        });
    }

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $(".btn-play").click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $("#videoModal").on("shown.bs.modal", function (e) {
            $("#video").attr(
                "src",
                $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
            );
        });

        $("#videoModal").on("hide.bs.modal", function (e) {
            $("#video").attr("src", $videoSrc);
        });
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $(".scroll-to-bottom").fadeOut("slow");
        } else {
            $(".scroll-to-bottom").fadeIn("slow");
        }
    });

    // Skills
    $(".skill").waypoint(
        function () {
            $(".progress .progress-bar").each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + "%");
            });
        },
        { offset: "80%" }
    );

    // Portfolio isotope and filter
    var portfolioIsotope = $(".portfolio-container").isotope({
        itemSelector: ".portfolio-item",
        layoutMode: "fitRows",
    });
    $("#portfolio-flters li").on("click", function () {
        $("#portfolio-flters li").removeClass("active");
        $(this).addClass("active");

        portfolioIsotope.isotope({ filter: $(this).data("filter") });
    });

    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $(".back-to-top").fadeIn("slow");
        } else {
            $(".back-to-top").fadeOut("slow");
        }
    });
    $(".back-to-top").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
        return false;
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        items: 1,
    });
})(jQuery);
