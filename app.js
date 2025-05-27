// app.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Supabase client
    const supabaseUrl = 'https://rjgotbruhdursgcvnvaw.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJqZ290YnJ1aGR1cnNnY3ZudmF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMDY0ODIsImV4cCI6MjA2MTY4MjQ4Mn0.n6qLoWlDESyF51hRreY983ZTTjIVuqIzZOXaP7rWVAg';
    const supabase = supabase.createClient(supabaseUrl, supabaseKey);

    // DOM Elements
    const planContainer = document.getElementById('planContainer');
    const buyButtons = document.querySelectorAll('.buy-button');

    // Load plans from Supabase
    async function loadPlans() {
        try {
            const { data: plans, error } = await supabase
                .from('plans')
                .select('*');
            
            if (error) throw error;
            
            planContainer.innerHTML = plans.map(plan => `
                <div class="plan-card" data-plan-id="${plan.id}">
                    <div class="plan-badge">${plan.is_featured ? 'Featured' : 'Popular'}</div>
                    <h3>${plan.name}</h3>
                    <div class="price">$${plan.price}<span>/${plan.duration_days} days</span></div>
                    <ul>
                        ${plan.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <button class="buy-button">Get eSIM Now</button>
                </div>
            `).join('');

            // Add event listeners to new buttons
            document.querySelectorAll('.buy-button').forEach(button => {
                button.addEventListener('click', handlePurchase);
            });

        } catch (error) {
            console.error('Error loading plans:', error);
            planContainer.innerHTML = '<p>Error loading plans. Please try again later.</p>';
        }
    }

    // Handle purchase button click
    async function handlePurchase(event) {
        const planId = event.target.closest('.plan-card').dataset.planId;
        
        try {
            // Generate a mock activation code (in a real app, this would come from your backend)
            const activationCode = `WED-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(activationCode)}`;
            
            // Show success message
            alert(`Success! Your eSIM activation code is: ${activationCode}\n\nScan the QR code in your email to activate.`);
            
            // In a real app, you would save this to your database
            console.log('Mock purchase complete:', { planId, activationCode, qrCodeUrl });

        } catch (error) {
            console.error('Purchase error:', error);
            alert('Purchase failed. Please try again.');
        }
    }

    // Initialize animations
    function initAnimations() {
        // Plan card hover effects
        document.querySelectorAll('.plan-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
                card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
                card.style.boxShadow = '';
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    // Initialize the app
    loadPlans();
    initAnimations();

    // Feature card animations
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});