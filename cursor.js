const site_wide_cursor = document.querySelector('.custom-cursor.site-wide');

// Create the star pointer dynamically
const pointer = document.createElement('div');
pointer.classList.add('pointer');
pointer.style.position = 'absolute';
pointer.style.top = '50%';
pointer.style.left = '50%';
pointer.style.transform = 'translate(-50%, -50%)';
pointer.style.fontSize = '20px';
pointer.style.color = 'black';
pointer.style.pointerEvents = 'none';
pointer.textContent = "★"; // Unicode Star
site_wide_cursor.appendChild(pointer);

// Event Listeners for cursor visibility and movement
document.addEventListener('mousemove', TrackCursor);
document.addEventListener('mousedown', () => {
	site_wide_cursor.classList.add('active');
	pointer.style.fontSize = '30px'; // Enlarge the star on mousedown
});
document.addEventListener('mouseup', () => {
	site_wide_cursor.classList.remove('active');
	pointer.style.fontSize = '20px'; // Reset the star size
});
document.addEventListener('mouseenter', () => {
	site_wide_cursor.style.display = 'block';
});
document.addEventListener('mouseleave', () => {
	site_wide_cursor.style.display = 'none';
});

// Function to track and position the cursor
function TrackCursor(evt) {
	const w = site_wide_cursor.clientWidth;
	const h = site_wide_cursor.clientHeight;

	site_wide_cursor.style.transform = 
		`translate(${evt.clientX - w / 2}px, ${evt.clientY - h / 2}px)`;
}