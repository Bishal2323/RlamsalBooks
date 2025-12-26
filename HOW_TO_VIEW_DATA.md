# How to View Customer Data

Since your website is connected to **Firebase Firestore**, all data entered by users is saved instantly to the cloud. You do **not** need to install any tools on your computer to view it.

## 1. Login to Firebase Console
Go to this link: [https://console.firebase.google.com/](https://console.firebase.google.com/)

## 2. Open Your Project
Click on your project named **`r-lamsal-books-backend`**.

## 3. Go to Database
On the left sidebar, click on **Build** -> **Firestore Database**.

## 4. View Collections
You will see "Collections" (folders) created automatically as people submit forms:
- **`stock_inquiries`**: Requests from the "Do We Have It?" form.
- **`item_requests`**: Requests from the "New Item Request" form.
- **`arrival_notifications`**: Data from the "I'm Coming Soon" form.
- **`reviews`**: Community reviews.

## 5. View Details
Click on any ID (the weird letters/numbers like `76f...`) in the middle column to see the actual data (Name, Phone, Message) on the right side.

---
**Note on the "npm install" error**: You tried to install `firebase-tools`, which failed because of permission issues directly on your Mac. You don't need this tool just to view data! The web console above is much easier.
