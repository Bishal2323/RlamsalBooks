import { CATEGORIES, PRODUCTS } from './products.js';

const WHATSAPP_NUMBER = '9779846055675';

function whatsappLink(message) {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.getElementById('navLinks');

    const setMenuOpen = (open) => {
        navLinks.classList.toggle('open', open);
        menuBtn.classList.toggle('open', open);
        menuBtn.setAttribute('aria-expanded', String(open));
    };

    menuBtn.addEventListener('click', () => setMenuOpen(!navLinks.classList.contains('open')));
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

    // Modal Logic
    const galleryModal = document.getElementById('galleryModal');
    const modalTitle = document.getElementById('modalTitle');

    const openModal = (modal) => {
        modal.classList.add('active');
        document.body.classList.add('modal-open');
        modal.querySelector('.close-modal').focus();
    };

    const closeModals = () => {
        galleryModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    };

    // Products
    const productGrid = document.getElementById('productGrid');
    const productEmpty = document.getElementById('productEmpty');
    const productSearch = document.getElementById('productSearch');
    const filterBar = document.getElementById('categoryFilters');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxActions = document.getElementById('lightboxActions');
    let activeCategory = 'all';

    // Pre-fill the stock inquiry form and take the customer there
    const askInStore = (productName) => {
        closeModals();
        const stockForm = document.getElementById('stockForm');
        stockForm.item.value = productName;
        document.getElementById('stock-inquiry').scrollIntoView({ behavior: 'smooth' });
        stockForm.name.focus({ preventScroll: true });
    };

    const productActions = (product) => {
        const wrap = document.createElement('div');
        wrap.className = 'product-actions';

        const ask = document.createElement('button');
        ask.type = 'button';
        ask.className = 'btn btn-sm btn-primary';
        ask.textContent = 'Check stock';
        ask.addEventListener('click', () => askInStore(product.name));

        const wa = document.createElement('a');
        wa.className = 'btn btn-sm btn-whatsapp';
        wa.href = whatsappLink(`Namaste! Do you have "${product.name}" in stock?`);
        wa.target = '_blank';
        wa.rel = 'noopener';
        wa.textContent = 'WhatsApp';

        wrap.append(ask, wa);
        return wrap;
    };

    const openProduct = (product) => {
        lightboxImg.src = product.image;
        lightboxImg.alt = product.name;
        modalTitle.textContent = product.name;
        lightboxDesc.textContent = [product.author, product.description].filter(Boolean).join(' · ');
        lightboxActions.replaceChildren(...productActions(product).children);
        openModal(galleryModal);
    };

    const renderProductCard = (product) => {
        const card = document.createElement('article');
        card.className = 'product-card';

        const media = document.createElement(product.image ? 'button' : 'div');
        media.className = 'product-image';
        if (product.image) {
            media.type = 'button';
            media.setAttribute('aria-label', `View larger photo of ${product.name}`);
            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.onerror = () => {
                media.classList.add('no-photo');
                media.textContent = CATEGORIES[product.category].icon;
            };
            media.appendChild(img);
            media.addEventListener('click', () => openProduct(product));
        } else {
            media.classList.add('no-photo');
            media.textContent = CATEGORIES[product.category].icon;
        }

        const body = document.createElement('div');
        body.className = 'product-body';

        const tag = document.createElement('span');
        tag.className = 'product-tag';
        tag.textContent = CATEGORIES[product.category].label;

        const name = document.createElement('h3');
        name.textContent = product.name;

        body.append(tag, name);

        if (product.author) {
            const author = document.createElement('p');
            author.className = 'product-author';
            author.textContent = product.author;
            body.appendChild(author);
        }

        const desc = document.createElement('p');
        desc.className = 'product-desc';
        desc.textContent = product.description;

        body.append(desc, productActions(product));
        card.append(media, body);
        return card;
    };

    const renderProducts = () => {
        const term = productSearch.value.trim().toLowerCase();
        const matches = PRODUCTS.filter(p =>
            (activeCategory === 'all' || p.category === activeCategory) &&
            (!term || [p.name, p.author, p.description, CATEGORIES[p.category].label]
                .filter(Boolean).join(' ').toLowerCase().includes(term))
        );
        productGrid.replaceChildren(...matches.map(renderProductCard));
        productEmpty.hidden = matches.length > 0;
    };

    const addChip = (key, label) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chip' + (key === activeCategory ? ' active' : '');
        chip.textContent = label;
        chip.setAttribute('aria-pressed', String(key === activeCategory));
        chip.addEventListener('click', () => {
            activeCategory = key;
            filterBar.querySelectorAll('.chip').forEach(c => {
                c.classList.toggle('active', c === chip);
                c.setAttribute('aria-pressed', String(c === chip));
            });
            renderProducts();
        });
        filterBar.appendChild(chip);
    };

    addChip('all', 'All');
    Object.entries(CATEGORIES).forEach(([key, cat]) => addChip(key, `${cat.icon} ${cat.label}`));
    productSearch.addEventListener('input', renderProducts);
    document.getElementById('askMissing').addEventListener('click', (e) => {
        e.preventDefault();
        askInStore(productSearch.value.trim());
    });
    renderProducts();

    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => btn.addEventListener('click', closeModals));

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === galleryModal) closeModals();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModals();
            setMenuOpen(false);
        }
    });

    // Arrival date can't be in the past
    const arrivalDate = document.querySelector('#arrivalForm [name="arrivalDate"]');
    arrivalDate.min = toLocalDateString(new Date());

    // Form Handling
    // No server: each form turns into a WhatsApp message to the shop, ready to send.
    const formMessages = {
        stock: (f) => [
            'Namaste! Do you have this in stock?',
            `Item: ${f.item}`,
            `Name: ${f.name}`
        ],
        request: (f) => [
            'Namaste! Can you bring in this item for me?',
            `Item: ${f.item}`,
            f.details && `Details: ${f.details}`,
            `Name: ${f.name}`
        ],
        arrival: (f) => [
            "Namaste! I'm coming to the shop.",
            `Name: ${f.name}`,
            `When: ${f.arrivalDate} at ${f.arrivalTime}`,
            f.items && `Please keep ready: ${f.items}`
        ]
    };

    document.querySelectorAll('form[data-kind]').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const fields = {};
            new FormData(form).forEach((value, key) => fields[key] = String(value).trim());

            const message = formMessages[form.dataset.kind](fields).filter(Boolean).join('\n');
            window.open(whatsappLink(message), '_blank', 'noopener');

            const status = form.querySelector('.form-status');
            status.textContent = 'WhatsApp opened with your message. Tap send and we\'ll reply there.';
            status.className = 'form-status success';
            form.reset();
            setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 8000);
        });
    });
});

function toLocalDateString(date) {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
