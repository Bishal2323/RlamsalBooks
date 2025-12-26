import { db, collection, getDocs, deleteDoc, doc, auth, onAuthStateChanged, signOut } from './firebase-config.js';

// Check Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Optional: Check if email is admin email
        const ADMIN_EMAIL = 'admin@rlamsal.com';
        if (user.email === ADMIN_EMAIL) {
            console.log("Admin logged in");
            loadAllData();
        } else {
            alert("Access Denied: You are not an admin.");
            window.location.href = 'index.html';
        }
    } else {
        // No user is signed in, redirect to login
        window.location.href = 'login.html';
    }
});

// Logout function
document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error("Logout error", error);
    });
});

async function loadAllData() {
    loadCollection('stock_inquiries', 'stockList');
    loadCollection('item_requests', 'requestList');
    loadCollection('arrival_notifications', 'arrivalList');
    loadCollection('reviews', 'reviewList');
}

async function loadCollection(collectionName, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = '<p>Loading...</p>';

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));

        if (querySnapshot.empty) {
            container.innerHTML = '<div class="empty-state">No records found.</div>';
            return;
        }

        container.innerHTML = ''; // Clear loading

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const id = docSnap.id;

            // Format timestamp if exists
            let timeString = 'Unknown Date';
            if (data.timestamp && data.timestamp.seconds) {
                timeString = new Date(data.timestamp.seconds * 1000).toLocaleString();
            } else if (data.timestamp instanceof Date) {
                timeString = data.timestamp.toLocaleString();
            }

            // Create Card HTML
            const card = document.createElement('div');
            card.className = 'data-card';

            // Generate content based on collection type
            let content = '';
            let replyInfo = '';

            if (collectionName === 'stock_inquiries') {
                content = `<strong>Item:</strong> ${data.item_name_description || 'N/A'}<br>
                           <strong>Phone:</strong> ${data.phone_number || 'N/A'}`;
                replyInfo = `mailto:?subject=Regarding your inquiry for ${data.item_name_description}&body=Hello ${data.your_name}, regarding your stock inquiry...`;
            } else if (collectionName === 'item_requests') {
                content = `<strong>Request:</strong> ${data.what_item_do_you_need_ || 'N/A'}<br>
                           <strong>Details:</strong> <span class="details">${data.any_specific_details_brand_color_etc__ || ''}</span>`;
            } else if (collectionName === 'arrival_notifications') {
                content = `<strong>Coming at:</strong> ${data.field || 'N/A'} (Input Time)<br>
                           <strong>Items:</strong> <span class="details">${data.list_items_to_prepare___ || ''}</span>`;
            } else if (collectionName === 'reviews') {
                content = `<strong>Rating:</strong> ${data.field || 'N/A'} Stars<br>
                           <strong>Review:</strong> "${data.share_your_experience___ || ''}"`;
            }

            // Common info
            const name = data.your_name || data.field || 'Customer';

            card.innerHTML = `
                <div class="info">
                    <div class="meta">${timeString} • ID: ${id.substr(0, 5)}</div>
                    <h3>${name}</h3>
                    <p>${content}</p>
                </div>
                <div class="actions">
                    ${collectionName !== 'reviews' ? `<button class="btn-reply" onclick="window.location.href='${replyInfo}'">Reply</button>` : ''}
                    <button class="btn-delete" onclick="deleteItem('${collectionName}', '${id}')">Delete</button>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading data:", error);
        container.innerHTML = `<p style="color:red">Error loading data. Check console.</p>`;
    }
}

// Global delete function
window.deleteItem = async function (colName, id) {
    if (confirm('Are you sure you want to delete this item?')) {
        try {
            await deleteDoc(doc(db, colName, id));
            // Reload the specific list
            let targetId = '';
            if (colName === 'stock_inquiries') targetId = 'stockList';
            if (colName === 'item_requests') targetId = 'requestList';
            if (colName === 'arrival_notifications') targetId = 'arrivalList';
            if (colName === 'reviews') targetId = 'reviewList';

            loadCollection(colName, targetId);
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to delete.");
        }
    }
}
