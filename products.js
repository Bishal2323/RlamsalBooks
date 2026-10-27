// Product catalog shown on the homepage.
// To add a product: put a photo (about 720px wide, JPEG) in assets/img/products/ and add an entry below.
// `category` must be one of the keys in CATEGORIES.

export const CATEGORIES = {
    books: { label: 'Books', icon: '📚' },
    stationery: { label: 'Stationery', icon: '✏️' },
    kids: { label: 'Kids Corner', icon: '🧸' },
    gifts: { label: 'Birthday Gifts', icon: '🎁' },
    games: { label: 'Games & Sports', icon: '⚽' }
};

const IMG = 'assets/img/products/';

export const PRODUCTS = [
    // Books
    {
        id: 'nepali-literature-set', category: 'books',
        name: 'Nepali Literature Collection',
        description: 'Shirishko Phool, Yogmaya, Nathiya, Kara, Parityakta and more Nepali classics.',
        image: IMG + 'nepali-literature-set.jpg'
    },
    {
        id: 'eklo', category: 'books',
        name: 'Eklo (एक्लो)', author: 'Buddhisagar',
        description: 'Novel by the author of Karnali Blues and Phirphire.',
        image: IMG + 'eklo-buddhisagar.jpg'
    },
    {
        id: 'seto-dharti', category: 'books',
        name: 'Seto Dharti (सेतो धरती)', author: 'Amar Neupane',
        description: 'Madan Puraskar winning Nepali novel.',
        image: IMG + 'seto-dharti-amar-neupane.jpg'
    },
    {
        id: 'aithan', category: 'books',
        name: 'Aithan (ऐठन)', author: 'Vivek Ojha',
        description: 'Contemporary Nepali fiction.',
        image: IMG + 'aithan-vivek-ojha.jpg'
    },
    {
        id: 'atomic-habits', category: 'books',
        name: 'Atomic Habits', author: 'James Clear',
        description: 'The bestselling guide to building good habits and breaking bad ones.',
        image: IMG + 'atomic-habits.jpg'
    },
    {
        id: '48-laws-of-power', category: 'books',
        name: 'The 48 Laws of Power', author: 'Robert Greene',
        description: 'International bestseller on strategy and influence.',
        image: IMG + '48-laws-of-power.jpg'
    },
    {
        id: 'study-guides', category: 'books',
        name: 'Class 8–10 Study Guides',
        description: 'Guides, practice books and the 10-set "Old is Gold" for SEE preparation. Ask us for your class and subject.',
        image: null
    },

    // Stationery
    {
        id: 'peacock-notebook', category: 'stationery',
        name: 'Dancing Peacock Notebook',
        description: 'Kripa notebook with a bright peacock cover.',
        image: IMG + 'peacock-notebook.jpg'
    },
    {
        id: 'a4-drawing-book', category: 'stationery',
        name: 'A4 Art Drawing Book',
        description: 'Landscape drawing book for school art classes.',
        image: IMG + 'a4-art-drawing-book.jpg'
    },
    {
        id: 'spiral-notebook-colour', category: 'stationery',
        name: 'Spiral Notebook (Colour Cover)',
        description: 'Spiral-bound notebook that opens flat.',
        image: IMG + 'spiral-notebook-colour.jpg'
    },
    {
        id: 'spiral-notebook-smiley', category: 'stationery',
        name: 'Spiral Notebook (Smiley Cover)',
        description: 'Spiral-bound notebook with a fun smiley cover.',
        image: IMG + 'spiral-notebook-smiley.jpg'
    },
    {
        id: 'a5-clasp-notebook', category: 'stationery',
        name: 'A5 Premium Notebook',
        description: 'Hard-cover A5 notebook with a magnetic clasp. A good gift.',
        image: IMG + 'a5-clasp-notebook.jpg'
    },
    {
        id: 'two-tone-diary', category: 'stationery',
        name: 'Two-Tone Diary with Strap',
        description: 'Leather-look diary with a strap closure.',
        image: IMG + 'two-tone-diary.jpg'
    },

    // Kids
    {
        id: 'astronaut-pencil-box', category: 'kids',
        name: 'Astronaut Pencil Box',
        description: 'Space-themed pencil box with a built-in sharpener.',
        image: IMG + 'astronaut-pencil-box.jpg'
    },
    {
        id: 'space-bear-pencil-case', category: 'kids',
        name: 'Space Bear Pencil Case',
        description: 'Zip pencil case with a fun spinner badge.',
        image: IMG + 'space-bear-pencil-case.jpg'
    },
    {
        id: 'unicorn-pencil-pouch', category: 'kids',
        name: 'Unicorn "Good Luck" Pouch',
        description: 'Pink sequin pencil pouch with a unicorn badge.',
        image: IMG + 'unicorn-pencil-pouch.jpg'
    },
    {
        id: 'chocolate-toffee-jar', category: 'kids',
        name: 'Chocolate Toffees',
        description: 'Sold loose or by the jar.',
        image: IMG + 'chocolate-toffee-jar.jpg'
    },
    {
        id: 'kids-snack-tub', category: 'kids',
        name: 'Kids Treat Tub',
        description: 'Snack tub with a handle, popular for kids.',
        image: IMG + 'kids-snack-tub.jpg'
    },

    // Gifts
    {
        id: 'birthday-mug', category: 'gifts',
        name: 'Happy Birthday Mug Gift Box',
        description: 'Printed ceramic mug in a gift box with handles. Ready to give.',
        image: IMG + 'birthday-mug-gift-box.jpg'
    },

    // Games
    {
        id: 'rubiks-cube', category: 'games',
        name: "Rubik's Cube 3×3",
        description: 'Classic speed cube. We also stock footballs, volleyballs and cricket balls.',
        image: IMG + 'rubiks-cube-3x3.jpg'
    }
];
