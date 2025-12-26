// Basic Interactivity
import { db, collection, addDoc, auth, onAuthStateChanged, signOut } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {

    // Auth State Listener
    onAuthStateChanged(auth, (user) => {
        const loginLink = document.querySelector('a[href="login.html"]');
        if (user && loginLink) {
            // User is signed in
            loginLink.href = "#";
            loginLink.innerHTML = `👋 Hi, ${user.email.split('@')[0]}`;
            loginLink.title = "Click to Logout";
            loginLink.style.color = "#4CAF50";

            // Logout functionality
            loginLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm("Do you want to logout?")) {
                    signOut(auth).then(() => {
                        window.location.reload();
                    });
                }
            });

            // If Admin, add Admin Link
            if (user.email === 'admin@rlamsal.com') { // Hardcoded admin check
                const nav = document.querySelector('.nav-links');
                // Check if admin link already exists to prevent duplicates
                if (!document.querySelector('a[href="admin.html"]')) {
                    const adminLi = document.createElement('li');
                    adminLi.innerHTML = '<a href="admin.html" style="color:#FF6600; font-weight:bold">Admin Panel</a>';
                    nav.appendChild(adminLi);
                }
            }
        }
    });

    // Modal Logic
    const galleryModal = document.getElementById('galleryModal');
    const reviewModal = document.getElementById('reviewModal');
    const closeBtns = document.querySelectorAll('.close-modal, .close-modal-review');
    const modalTitle = document.getElementById('modalTitle');
    const modalGallery = document.getElementById('modalGallery');

    // Image Data Map (Generated from local file listing)
    const galleryData = {
        'birthday': [
            'BirthDay Gifts/WhatsApp Image 2025-12-10 at 22.20.47.jpeg'
        ],
        'kids': [
            'KIDS/WhatsApp Image 2025-12-10 at 22.20.46.jpeg',
            'KIDS/WhatsApp Image 2025-12-10 at 22.20.56 (1).jpeg',
            'KIDS/WhatsApp Image 2025-12-10 at 22.20.56.jpeg',
            'KIDS/WhatsApp Image 2025-12-10 at 22.20.58 (1).jpeg',
            'KIDS/WhatsApp Image 2025-12-10 at 22.20.59.jpeg'
        ],
        'stationery': [
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.49 (1).jpeg',
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.49.jpeg',
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.52.jpeg',
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.53.jpeg',
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.55.jpeg',
            'Regular Stationary /WhatsApp Image 2025-12-10 at 22.20.58.jpeg'
        ],
        'games': [
            'GAMES/WhatsApp Image 2025-12-10 at 22.20.50.jpeg'
        ],
        'books': [
            'books/book_2.png',
            'books/book_3.png',
            'books/book_4.png',
            'books/book_5.png',
            'books/book_6.png',
            'books/book_7.png',
            'books/book_8.png',
            'books/book_9.png',
            'books/book_10.png',
            'books/book_11.png',
            'books/book_12.png'
        ]
    };

    // Function to open Gallery Modal
    window.openGallery = (category) => {
        let title = '';

        switch (category) {
            case 'birthday': title = 'Birthday Gifts'; break;
            case 'kids': title = 'Kids Corner'; break;
            case 'stationery': title = 'Regular Stationery'; break;
            case 'games': title = 'Games & Sports'; break;
            case 'books': title = 'Books Collection'; break;
        }

        modalTitle.innerText = title;
        modalGallery.innerHTML = ''; // Clear previous

        const images = galleryData[category] || [];

        if (images.length === 0) {
            const msg = document.createElement('p');
            msg.style.gridColumn = "1 / -1";
            msg.style.textAlign = "center";
            msg.style.color = "#666";
            msg.innerText = "No images available for this category yet.";
            modalGallery.appendChild(msg);
        } else {
            images.forEach(imgSrc => {
                const item = document.createElement('div');
                item.className = 'gallery-item';

                const img = document.createElement('img');
                // Encode URI components to handle spaces and special chars
                const parts = imgSrc.split('/');
                const encodedPath = parts.map(part => encodeURIComponent(part)).join('/');

                img.src = encodedPath;
                img.alt = title + ' Image';
                img.loading = 'lazy'; // Improve performance

                // Add error handling for broken images
                img.onerror = function () {
                    this.parentElement.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;color:#888;font-size:0.8rem;padding:10px;text-align:center;">Image not found<br>' + imgSrc + '</div>';
                };

                item.appendChild(img);
                modalGallery.appendChild(item);
            });
        }

        galleryModal.classList.add('active');
    };

    // Attach click events to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            window.openGallery(category);
        });
    });

    // Review Modal
    window.openReviewModal = () => {
        reviewModal.classList.add('active');
    }

    // Close Modals
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryModal.classList.remove('active');
            reviewModal.classList.remove('active');
        });
    });

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target == galleryModal) galleryModal.classList.remove('active');
        if (e.target == reviewModal) reviewModal.classList.remove('active');
    });

    // Import Firebase functions from config - MOVED TO TOP
    // import { db, collection, addDoc } from './firebase-config.js';

    // Form Handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;

            // Collect form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => data[key] = value);

            // Add inputs manually if not using name attributes (which we should enable in HTML for FormData to work best, 
            // but for now we'll grab by type or just grab all inputs)
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                if (input.placeholder || input.name) {
                    let key = input.name || input.placeholder || 'field';
                    // Sanitize key
                    key = key.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                    data[key] = input.value;
                }
            });

            // Add timestamp
            data.timestamp = new Date();

            try {
                btn.innerText = 'Sending...';

                // Check if config is still placeholder
                // We can't easily check the export here without importing config, but errors will be caught.

                // Determine collection name based on form ID
                let collectionName = 'general_requests';
                if (form.id === 'stockForm') collectionName = 'stock_inquiries';
                if (form.id === 'requestForm') collectionName = 'item_requests';
                if (form.id === 'arrivalForm') collectionName = 'arrival_notifications';
                if (form.id === 'reviewForm') collectionName = 'reviews';

                // Send to Firestore
                await addDoc(collection(db, collectionName), data);

                // Success feedback
                btn.innerText = 'Sent!';
                btn.style.background = '#4CAF50';
                btn.style.borderColor = '#4CAF50';

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    form.reset();
                    if (form.closest('.modal')) {
                        form.closest('.modal').classList.remove('active');
                    }
                }, 2000);

                console.log(`Data sent to ${collectionName}:`, data);

            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Error sending data. \n\nMake sure you have added your Firebase API Keys in firebase-config.js! \n\nCheck console for details.");
                btn.innerText = 'Failed';
                setTimeout(() => btn.innerText = originalText, 3000);
            }
        });
    });
});
