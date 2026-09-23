// GadgetHub Signature — Entry Point
import './styles.css';
import logoSrc from './assets/gadget-hub.png';

// Inject logo dynamically so webpack handles the asset path
const logoEl = document.getElementById('logo');
if (logoEl) {
  logoEl.src = logoSrc;
}

// Email notify button interaction
const btn = document.getElementById('notifyBtn');
const input = document.getElementById('emailInput');
const successMsg = document.getElementById('successMsg');

if (btn && input && successMsg) {
  btn.addEventListener('click', () => {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      input.style.borderColor = '#ff6b6b';
      input.focus();
      setTimeout(() => {
        input.style.borderColor = '';
      }, 1500);
      return;
    }

    // Success state
    btn.textContent = '✓ You\'re in!';
    btn.style.background = '#4db8f0';
    btn.disabled = true;
    input.disabled = true;
    successMsg.classList.add('visible');

    console.log(`Email captured: ${email}`);
  });

  // Reset border on input
  input.addEventListener('input', () => {
    input.style.borderColor = '';
  });
}
