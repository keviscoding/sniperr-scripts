// FAQ Accordion
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

// Feature Tabs
document.querySelectorAll('.feature-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.feature-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.feature-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
});

// Platform Tabs (visual only for now)
document.querySelectorAll('.platform-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
    });
});
