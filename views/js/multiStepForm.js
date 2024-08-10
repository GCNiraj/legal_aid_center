var current_fs, next_fs, previous_fs; // fieldsets
var left, opacity, scale; // fieldset properties which we will animate
var animating; // flag to prevent quick multi-click glitches

document.querySelectorAll(".next").forEach(function (button) {
    button.addEventListener("click", function () {
        if (animating) return false;
        animating = true;
        
        current_fs = this.parentElement;
        next_fs = this.parentElement.nextElementSibling;

        // Activate next step on progress bar using the index of next_fs
        var progressbarItems = document.querySelectorAll("#progressbar li");
        progressbarItems[Array.prototype.indexOf.call(document.querySelectorAll("fieldset"), next_fs)].classList.add("active");

        // Show the next fieldset
        next_fs.style.display = "block";

        // Hide the current fieldset with style
        animateFieldset(current_fs, next_fs, 0, 0, function() {
            current_fs.style.display = "none";
            animating = false;
        });
    });
});

document.querySelectorAll(".previous").forEach(function (button) {
    button.addEventListener("click", function () {
        if (animating) return false;
        animating = true;
        
        current_fs = this.parentElement;
        previous_fs = this.parentElement.previousElementSibling;

        // De-activate current step on progress bar
        var progressbarItems = document.querySelectorAll("#progressbar li");
        progressbarItems[Array.prototype.indexOf.call(document.querySelectorAll("fieldset"), current_fs)].classList.remove("active");

        // Show the previous fieldset
        previous_fs.style.display = "block";

        // Hide the current fieldset with style
        animateFieldset(current_fs, previous_fs, 1, 0, function() {
            current_fs.style.display = "none";
            animating = false;
        });
    });
});

function animateFieldset(current_fs, next_fs, direction, duration, complete) {
    var start = null;

    function animateStep(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var now = Math.min(progress / duration, 1);

        if (direction === 0) { // next
            scale = 1 - (1 - now) * 0;
            left = (now * 0) + "%";
            opacity = 1;
        } else { // previous
            scale = 0.8 + (1 - now) * 0;
            left = ((1 - now) * 50) + "%";
            opacity = 0;
        }

        current_fs.style.transform = 'scale(' + scale + ')';
        current_fs.style.position = 'absolute';
        current_fs.style.left = left;
        current_fs.style.opacity = opacity;

        next_fs.style.transform = 'scale(' + scale + ')';
        next_fs.style.left = left;
        next_fs.style.opacity = opacity;

        if (progress < duration) {
            window.requestAnimationFrame(animateStep);
        } else {
            complete();
        }
    }

    window.requestAnimationFrame(animateStep);
}
