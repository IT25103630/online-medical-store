// Mock data for the online medical store

const categories = [
    {id: 'c1', name: 'Prescription Medicines', icon: 'fa-prescription-bottle-medical'},
    {id: 'c2', name: 'Over the Counter (OTC)', icon: 'fa-capsules'},
    {id: 'c3', name: 'Personal Care', icon: 'fa-pump-soap'},
    {id: 'c4', name: 'Vitamins & Supplements', icon: 'fa-tablets'},
    {id: 'c5', name: 'Baby Care', icon: 'fa-baby'},
    {id: 'c6', name: 'Medical Devices', icon: 'fa-stethoscope'}
];

const products = [
    {
        id: 'p1',
        name: 'Amoxil 500mg (Amoxicillin)',
        category: 'c1',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Antibiotic used to treat a number of bacterial infections.',
        requiresPrescription: true,
        rating: 4.5,
        stock: 50
    },
    {
        id: 'p2',
        name: 'Paracetamol 500mg Tablets',
        category: 'c2',
        price: 5.49,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Pain reliever and a fever reducer.',
        requiresPrescription: false,
        rating: 4.8,
        stock: 120
    },
    {
        id: 'p3',
        name: 'Omega 3 Fish Oil 1000mg',
        category: 'c4',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1550572017-edb3f547c1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Supports heart, brain, and joint health.',
        requiresPrescription: false,
        rating: 4.6,
        stock: 85
    },
    {
        id: 'p4',
        name: 'Digital Thermometer',
        category: 'c6',
        price: 12.50,
        image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Accurate and rapid temperature reading.',
        requiresPrescription: false,
        rating: 4.2,
        stock: 30
    },
    {
        id: 'p5',
        name: 'Hydrating Facial Cleanser',
        category: 'c3',
        price: 18.00,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Gentle cleanser for daily use.',
        requiresPrescription: false,
        rating: 4.7,
        stock: 60
    },
    {
        id: 'p6',
        name: 'Lisinopril 10mg',
        category: 'c1',
        price: 22.99,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Medication used to treat high blood pressure.',
        requiresPrescription: true,
        rating: 4.4,
        stock: 45
    },
    {
        id: 'p7',
        name: 'Baby Diapers Size 3',
        category: 'c5',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1510464228965-0ae7af3ecad3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Ultra-absorbent baby diapers.',
        requiresPrescription: false,
        rating: 4.9,
        stock: 200
    },
    {
        id: 'p8',
        name: 'Vitamin C 500mg',
        category: 'c4',
        price: 14.50,
        image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        description: 'Immune system support.',
        requiresPrescription: false,
        rating: 4.5,
        stock: 150
    }
];

const doctors = [
    {
        id: 'doc1',
        name: 'Dr. Sarah Jenkins',
        specialty: 'General Practitioner',
        experience: '15 Years',
        image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.9,
        availableTimes: ['09:00 AM', '11:30 AM', '02:00 PM']
    },
    {
        id: 'doc2',
        name: 'Dr. Michael Chen',
        specialty: 'Cardiologist',
        experience: '12 Years',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 4.8,
        availableTimes: ['10:00 AM', '01:00 PM', '04:30 PM']
    },
    {
        id: 'doc3',
        name: 'Dr. Emily Rodriguez',
        specialty: 'Pediatrician',
        experience: '8 Years',
        image: 'https://images.unsplash.com/photo-1594824432258-f7ebf09f220f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        rating: 5.0,
        availableTimes: ['08:30 AM', '03:15 PM']
    }
];

// Helper to get products by category
function getProductsByCategory(categoryId) {
    if (categoryId === 'all') return products;
    return products.filter(p => p.category === categoryId);
}

// Global cart state (simulated)
let cart = JSON.parse(localStorage.getItem('medCart')) || [];

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountEl.textContent = totalItems;
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({productId, quantity, ...product});
    }

    localStorage.setItem('medCart', JSON.stringify(cart));
    updateCartCount();

    // Optional: Show toast notification
    showToast(`Added ${product.name} to cart`);
}

function showToast(message) {
    // Simple toast notification
    const toast = document.createElement('div');
    toast.className = 'toast animate-fade-in';
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--secondary);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 9999;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
