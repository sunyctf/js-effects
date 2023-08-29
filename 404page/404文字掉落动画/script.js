const timeline = gsap.timeline({
    defaults: {
        duration: 1
    }
});
timeline
    .fromTo(
        ".search", {
            x: "-200px",
            y: "100px",
            opacity: 0
        }, {
            x: "200px",
            y: "-100px",
            rotate: 40,
            opacity: 1,
            yoyo: true
        }
    )
    .to("h1", {
        y: "0",
        ease: "bounce",
        opacity: 1
    })
    .to(".search", {
        x: "0",
        y: "0",
        rotate: 0,
        ease: "bounce"
    })
    .fromTo("h2", {
        opacity: 0
    }, {
        opacity: 1,
        delay: 0.2
    });