document.getElementById("open-sidenav-button").addEventListener("click", function() {
            
    const sidenav = document.getElementById("sidenav");
    const open_sidenav_button = document.getElementById('open-sidenav-button');
    
    // Toggles button icon between ≡ and X
    open_sidenav_button
        .classList
        .toggle("change");
    
    // Prevents that multiple fast clicks 
    // break the the button icon and the sidenav sync
    const is_sidenav_open = sidenav.offsetWidth > 0;
    const is_change_style_applied = open_sidenav_button.classList.contains("change")
    if(is_sidenav_open && is_change_style_applied) {
        open_sidenav_button.classList.toggle("change");
    }
    
    // Adjusts the width of the sidenav
    let sidenav_width = sidenav.offsetWidth;
    sidenav_width = sidenav_width === 0 ? 10 : 0;
    sidenav.style.width = sidenav_width + "rem";

});

// Closes sidenav when browser is resized
window.addEventListener("resize", function() {
    if(window.innerWidth >= 768) {
    close_sidenav();
    }
});

// Closes sidenav when user clicks something else 
// not the sidenav or the open-sidenav-button
document.addEventListener("click", function(event) {
    const sidenav = document.getElementById("sidenav");
    const open_sidenav_button = document.getElementById("open-sidenav-button");
    const isClickInsideSidenav = sidenav.contains(event.target);
    const isClickOnOpenSidenavButton = open_sidenav_button.contains(event.target);
    if(!isClickInsideSidenav && 
        !isClickOnOpenSidenavButton &&
        sidenav.offsetWidth > 0) {
        close_sidenav();
        }
});

document.addEventListener("DOMContentLoaded", function() {
    adjust_flags_top_pos();
    window.addEventListener("resize", adjust_flags_top_pos);
});

function adjust_flags_top_pos() {

    const flags = document.getElementById("flags"); 
    const welcome_section_height_vh = 100;
    const current_viewport_width = window.innerWidth;
    
    // Convert navbar height from rem to vh
    const rem_in_px = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const navbar_height_rem = 4.4;
    const navbar_height_px = navbar_height_rem * rem_in_px;
    const navbar_height_vh = (navbar_height_px / window.innerHeight) * 100; //OK till here

    // Define min and max widths within the flags div will move vertically
    const min_width = 320;
    const max_width = 2560;
    
    // Normalize the current viewport width to a value between 0 and 1
    // current view port = min_width results in 0
    // current view port = max_width results in 1
    let normalized_width = (current_viewport_width - min_width) / (max_width - min_width);

    // Assure the result will be between 0 and 1 
    // even though the viewport is smaller or bigger than the min_width and max_width values
    normalized_width = Math.max(0, Math.min(normalized_width, 1));

    // Adjust multiplier
    const movement_range_vh = 14;

    // Define dynamic top position based on the viewport width, starting from 4.4rem off the navbar
    // As the viewport width decreases, move the flags div up; as it increases, move it down
    const dynamic_top_position_vh = navbar_height_vh + (normalized_width * movement_range_vh);

    // Apply the calculated value for the flags top property
    flags.style.top = `${dynamic_top_position_vh}vh`;

};

function close_sidenav() {
    const open_sidenav_button = document.getElementById("open-sidenav-button");
    const sidenav = document.getElementById("sidenav");
    sidenav.style.width = "0";
    open_sidenav_button.classList.remove("change");
}