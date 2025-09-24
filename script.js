// ===== CARROUSEL OBJECTIFS SÉJOURS DÉSERT =====
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.objectives-carousel .carousel-track');
    const slides = track ? Array.from(track.querySelectorAll('.carousel-slide')) : [];
    const prevBtn = document.querySelector('.objectives-carousel .carousel-btn.prev');
    const nextBtn = document.querySelector('.objectives-carousel .carousel-btn.next');
    let current = 0;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    if (prevBtn && nextBtn && slides.length) {
        prevBtn.addEventListener('click', function() {
            current = (current - 1 + slides.length) % slides.length;
            showSlide(current);
        });
        nextBtn.addEventListener('click', function() {
            current = (current + 1) % slides.length;
            showSlide(current);
        });
        showSlide(current);
    }
});
// ===== GESTION DES DROPDOWNS HEADER ET CONTENU =====

// Variable pour suivre le dropdown actuellement ouvert
let currentOpenDropdown = null;

// Fonction pour afficher le contenu correspondant à une section
function showContent(contentId) {
    console.log('Affichage du contenu:', contentId);
    
    // Masquer toutes les sections
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(contentId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Fermer tous les dropdowns
        if (currentOpenDropdown) {
            currentOpenDropdown.style.opacity = '0';
            currentOpenDropdown.style.visibility = 'hidden';
            currentOpenDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            currentOpenDropdown = null;
        }
        
        // Scroll vers le contenu
        setTimeout(() => {
            targetSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
        
        console.log('Section affichée:', contentId);
    } else {
        console.error('Section non trouvée:', contentId);
    }
}

// Fonction pour gérer les dropdowns du header (appelée depuis les liens de navigation)
function toggleHeaderSection(sectionId) {
    console.log('Ouverture dropdown header:', sectionId);
    
    // Trouver le dropdown correspondant
    const dropdown = document.getElementById(sectionId + '-dropdown');
    
    if (!dropdown) {
        console.error('Dropdown non trouvé:', sectionId + '-dropdown');
        return;
    }
    
    // Fermer le dropdown actuellement ouvert s'il est différent
    if (currentOpenDropdown && currentOpenDropdown !== dropdown) {
        currentOpenDropdown.style.opacity = '0';
        currentOpenDropdown.style.visibility = 'hidden';
        currentOpenDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
    }
    
    // Basculer l'état du dropdown cliqué
    if (dropdown.style.opacity === '1') {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
        currentOpenDropdown = null;
    } else {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateX(-50%) translateY(0)';
        currentOpenDropdown = dropdown;
    }
    
    console.log('Dropdown maintenant:', dropdown.style.opacity === '1' ? 'ouvert' : 'fermé');
}

// Fermer les dropdowns quand on clique ailleurs
document.addEventListener('click', function(event) {
    // Si le clic n'est pas sur un élément de navigation dropdown
    if (!event.target.closest('.nav-dropdown')) {
        if (currentOpenDropdown) {
            currentOpenDropdown.style.opacity = '0';
            currentOpenDropdown.style.visibility = 'hidden';
            currentOpenDropdown.style.transform = 'translateX(-50%) translateY(-10px)';
            currentOpenDropdown = null;
        }
    }
});

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de dropdown header chargé');
    
    // Définir les styles initiaux pour tous les dropdowns
    const allDropdowns = document.querySelectorAll('.header-dropdown');
    allDropdowns.forEach(dropdown => {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateX(-50%) translateY(-10px)';
        dropdown.style.transition = 'all 0.3s ease';
    });
    
    // Afficher la section d'accueil par défaut
    showContent('accueil-content');
    
    // Vérifier que les fonctions sont bien accessibles globalement
    window.toggleHeaderSection = toggleHeaderSection;
    window.showContent = showContent;
    
    console.log('Dropdowns initialisés:', allDropdowns.length);
    
    // Initialiser d'autres fonctionnalités
    initializeMobileMenu();
    initializeSmoothScrolling();
});

// ===== FONCTIONS UTILITAIRES =====

// Fonction pour gérer le menu mobile (si nécessaire plus tard)
function initializeMobileMenu() {
    console.log('Menu mobile initialisé');
    // Logique pour menu mobile à ajouter si nécessaire
}

// Fonction pour gérer le défilement fluide
function initializeSmoothScrolling() {
    console.log('Défilement fluide initialisé');
    
    // Ajouter un comportement de défilement fluide pour tous les liens internes
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== MENU MOBILE =====
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animation du hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Fermer le menu en cliquant sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                
                // Réinitialiser l'animation du hamburger
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// ===== NAVIGATION SMOOTH =====
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== GESTION DU SCROLL HEADER =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// ===== ANIMATIONS AU SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.formation-card, .service-card, .testimonial-card, .contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialiser les animations au chargement
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ===== UTILITAIRES =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== GESTION DES ERREURS =====
window.addEventListener('error', function(e) {
    console.warn('Erreur JavaScript détectée:', e.error);
});

// ===== DEBUG MODE (peut être supprimé en production) =====
const DEBUG = false;

if (DEBUG) {
    console.log('Script JavaScript chargé avec succès');
    console.log('Onglets initialisés:', document.querySelectorAll('.tab-btn').length);
    console.log('Sous-onglets initialisés:', document.querySelectorAll('.sub-tab-btn').length);
}

// ===== FONCTION ACCORDÉON =====
function toggleAccordion(header) {
    const accordionItem = header.parentElement;
    const content = accordionItem.querySelector('.accordion-content');
    const arrow = header.querySelector('.accordion-arrow');
    
    // Fermer tous les autres accordéons
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(item => {
        if (item !== accordionItem) {
            const otherContent = item.querySelector('.accordion-content');
            const otherHeader = item.querySelector('.accordion-header');
            const otherArrow = item.querySelector('.accordion-arrow');
            
            otherContent.classList.remove('active');
            otherHeader.classList.remove('active');
            if (otherArrow) {
                otherArrow.style.transform = 'rotate(0deg)';
            }
        }
    });
    
    // Toggle l'accordéon actuel
    const isActive = content.classList.contains('active');
    
    if (isActive) {
        // Fermer
        content.classList.remove('active');
        header.classList.remove('active');
        if (arrow) {
            arrow.style.transform = 'rotate(0deg)';
        }
    } else {
        // Ouvrir
        content.classList.add('active');
        header.classList.add('active');
        if (arrow) {
            arrow.style.transform = 'rotate(180deg)';
        }
        
        // Scroll fluide vers l'accordéon ouvert
        setTimeout(() => {
            header.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }
}

// ===== INITIALISATION DES ACCORDÉONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si les accordéons existent sur la page
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    if (accordionHeaders.length > 0) {
        console.log(`${accordionHeaders.length} accordéons initialisés`);
        
        // Optionnel : ouvrir le premier accordéon par défaut
        // accordionHeaders[0].click();
    }
    
    // Améliorer l'accessibilité des accordéons
    accordionHeaders.forEach((header, index) => {
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
        header.setAttribute('tabindex', '0');
        
        // Permettre l'utilisation du clavier (Enter et Espace)
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion(header);
            }
        });
        
        // Mettre à jour aria-expanded lors des clics
        header.addEventListener('click', function() {
            setTimeout(() => {
                const isActive = header.classList.contains('active');
                header.setAttribute('aria-expanded', isActive.toString());
            }, 100);
        });
    });
});

// ===== CARROUSEL DE TÉMOIGNAGES =====

let currentSlideIndex = 1;

// Fonction pour déplacer les slides
function moveSlide(direction) {
    currentSlideIndex += direction;
    
    const slides = document.querySelectorAll('.testimonial-card');
    const totalSlides = slides.length;
    
    // Gestion du bouclage
    if (currentSlideIndex > totalSlides) {
        currentSlideIndex = 1;
    } else if (currentSlideIndex < 1) {
        currentSlideIndex = totalSlides;
    }
    
    showSlide(currentSlideIndex);
}

// Fonction pour aller à un slide spécifique
function currentSlide(slideIndex) {
    currentSlideIndex = slideIndex;
    showSlide(currentSlideIndex);
}

// Fonction pour afficher un slide
function showSlide(slideIndex) {
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    // Masquer tous les slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Retirer l'état actif de tous les dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Afficher le slide actuel
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    
    // Activer le dot correspondant
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-rotation du carrousel
function startCarouselAutoRotation() {
    setInterval(() => {
        moveSlide(1);
    }, 6000); // Change de slide toutes les 6 secondes
}

// ===== GESTION DES MINI-CARROUSELS PAR SERVICE =====

// Objet pour stocker l'état de chaque mini-carrousel
const miniCarousels = {};

// Fonction pour déplacer les slides d'un mini-carrousel
function moveMiniSlide(carouselId, direction) {
    if (!miniCarousels[carouselId]) {
        miniCarousels[carouselId] = { currentIndex: 1 };
    }
    
    miniCarousels[carouselId].currentIndex += direction;
    
    const carousel = document.getElementById(carouselId);
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    // Gestion du bouclage
    if (miniCarousels[carouselId].currentIndex > totalSlides) {
        miniCarousels[carouselId].currentIndex = 1;
    } else if (miniCarousels[carouselId].currentIndex < 1) {
        miniCarousels[carouselId].currentIndex = totalSlides;
    }
    
    showMiniSlide(carouselId, miniCarousels[carouselId].currentIndex);
}

// Fonction pour aller à un slide spécifique d'un mini-carrousel
function currentMiniSlide(carouselId, slideIndex) {
    if (!miniCarousels[carouselId]) {
        miniCarousels[carouselId] = { currentIndex: 1 };
    }
    
    miniCarousels[carouselId].currentIndex = slideIndex;
    showMiniSlide(carouselId, slideIndex);
}

// Fonction pour afficher un slide d'un mini-carrousel
function showMiniSlide(carouselId, slideIndex) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.parentElement.querySelectorAll('.mini-dot');
    
    // Masquer tous les slides
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Retirer l'état actif de tous les dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Afficher le slide actuel
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    
    // Activer le dot correspondant
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-rotation des mini-carrousels
function startMiniCarouselAutoRotation() {
    const carouselIds = ['carousel-bien-etre', 'carousel-sommeil', 'carousel-sante', 'carousel-coaching'];
    
    carouselIds.forEach(carouselId => {
        if (document.getElementById(carouselId)) {
            // Initialiser le carrousel
            miniCarousels[carouselId] = { currentIndex: 1 };
            showMiniSlide(carouselId, 1);
            
            // Auto-rotation toutes les 8 secondes (décalage par carrousel)
            setTimeout(() => {
                setInterval(() => {
                    moveMiniSlide(carouselId, 1);
                }, 8000);
            }, carouselIds.indexOf(carouselId) * 2000); // Décalage de 2s entre chaque carrousel
        }
    });
}

// Initialiser le carrousel au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le carrousel principal existe sur la page
    if (document.querySelector('.testimonials-carousel')) {
        showSlide(currentSlideIndex);
        startCarouselAutoRotation();
    }
    
    // Initialiser les mini-carrousels sur la page services
    if (document.querySelector('.mini-carousel')) {
        startMiniCarouselAutoRotation();
    }
    
    // Initialiser l'effet d'overlay des destinations
    initializeDestinationOverlay();
});

// ===== EFFET OVERLAY DESTINATIONS =====
function initializeDestinationOverlay() {
    console.log('Initialisation destination overlay...');
    const destinationCards = document.querySelectorAll('.destination-card');
    const destinationSection = document.querySelector('.desert-destinations');
    
    console.log('Destinations trouvées:', destinationCards.length);
    console.log('Section trouvée:', !!destinationSection);
    
    if (!destinationSection) return;
    
    destinationCards.forEach((card, index) => {
        console.log('Configuration carte', index);
        const imageUrl = card.getAttribute('data-image');
        
        if (imageUrl) {
            card.addEventListener('mouseenter', function() {
                console.log('Mouse enter sur carte', index, imageUrl);
                
                // Supprimer la classe active de toutes les cartes
                destinationCards.forEach(c => c.classList.remove('active'));
                
                // Ajouter classe active à la carte survolée
                this.classList.add('active');
                
                // Changer le fond de la section
                destinationSection.style.backgroundImage = `url(${imageUrl})`;
                destinationSection.classList.add('has-background');
            });
            
            card.addEventListener('mouseleave', function() {
                console.log('Mouse leave sur carte', index);
                
                // Supprimer la classe active
                this.classList.remove('active');
                
                // Remettre le fond normal
                destinationSection.style.backgroundImage = '';
                destinationSection.classList.remove('has-background');
            });
        }
    });
}

// ===== NAVIGATION FLUIDE POUR SOMMAIRE SERVICES =====

// Fonction pour scroll fluide vers une section de service
function scrollToService(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        // Calculer la position avec un offset pour tenir compte du header
        const headerHeight = 80; // Ajustez selon la hauteur de votre header
        const targetPosition = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialiser la navigation du sommaire des services
function initServicesSummaryNavigation() {
    // Sélectionner tous les liens du sommaire
    const summaryLinks = document.querySelectorAll('.summary-item[href^="#"]');
    
    summaryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer l'ID de la cible
            const targetId = this.getAttribute('href').substring(1);
            
            // Scroll vers la section
            scrollToService(targetId);
            
            // Ajouter un effet visuel temporaire au lien cliqué
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Appeler l'initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser les fonctionnalités existantes
    if (typeof initializeDestinationOverlay === 'function') {
        initializeDestinationOverlay();
    }
    if (typeof initBackgroundCarousel === 'function') {
        initBackgroundCarousel();
    }
    
    // Initialiser la navigation du sommaire des services
    initServicesSummaryNavigation();
});