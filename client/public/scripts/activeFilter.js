if (window.location.pathname === '/' || window.location.pathname === '/search') {
    document.getElementById('filterAll').classList.add('active-filter');
} else if (window.location.pathname === '/1') {
    document.getElementById('filterSmall').classList.add('active-filter');
} else if (window.location.pathname === '/2') {
    document.getElementById('filterMedium').classList.add('active-filter');
} else if (window.location.pathname === '/3') {
    document.getElementById('filterLarge').classList.add('active-filter');
}
