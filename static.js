document.addEventListener("DOMContentLoaded", function () {
    // Auto select inventory dropdown after successful usage
    let itemSelect = document.getElementById('item-select');
    if (itemSelect) {
        itemSelect.selectedIndex = 0;
    }

    // Scroll combat log to top new entry
    let combatLogList = document.getElementById('combat-log-list');
    if (combatLogList) {
        combatLogList.scrollTop = 0;
    }

    // Allow pressing enter to submit move
    let moveForm = document.getElementById('move-form');
    let moveSelect = document.getElementById('move-select');
    if (moveForm && moveSelect) {
        moveSelect.addEventListener('keydown', function (e) {
            if (e.key === "Enter") {
                moveForm.submit();
            }
        });
    }

    // Prevent double submits on forms
    document.querySelectorAll('form').forEach(function(f) {
        f.addEventListener('submit', function(e){
            if (f.classList.contains('disable-on-submit')) {
                f.querySelectorAll('button').forEach(b => b.disabled = true);
            }
        });
    });

    // Hide flash messages after 3 seconds
    let flashDiv = document.getElementById('flash-messages');
    if (flashDiv) {
        setTimeout(() => {
            flashDiv.style.display = "none";
        }, 3000);
    }
});