// Contact Info Loader - Load and apply contact information from central config
let contactData = null;

// Load contact information from JSON config
async function loadContactInfo() {
  try {
    const response = await fetch('./config/contact-info.json');
    if (!response.ok) throw new Error('Failed to load contact info');
    contactData = await response.json();
    applyContactInfo();
  } catch (error) {
    console.error('Error loading contact info:', error);
  }
}

// Apply contact info to page elements
function applyContactInfo() {
  if (!contactData) return;

  // Update phone numbers
  updatePhoneElements();
  
  // Update addresses
  updateAddressElements();
  
  // Update social links
  updateSocialLinks();
  
  // Update JSON-LD schema
  updateJsonLdSchema();
}

function updatePhoneElements() {
  // Update phone number links
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.href = `tel:${contactData.phone.replace(/\D/g, '')}`;
    if (!el.textContent.includes('Facebook') && !el.textContent.includes('Zalo')) {
      el.textContent = contactData.phoneDisplay;
    }
  });

  // Update phone display text
  document.querySelectorAll('.contact-phone, [data-contact-phone]').forEach(el => {
    el.textContent = contactData.phoneDisplay;
  });

  // Update in contact info sections
  document.querySelectorAll('[data-contact="phone"]').forEach(el => {
    el.textContent = contactData.phone;
  });
}

function updateAddressElements() {
  // Update HCM address
  const hcmLocation = contactData.locations.find(l => l.id === 'hcm');
  if (hcmLocation) {
    document.querySelectorAll('[data-address="hcm"]').forEach(el => {
      el.textContent = hcmLocation.addressShort;
    });
  }

  // Update Quảng Ngãi address
  const qnLocation = contactData.locations.find(l => l.id === 'quang-ngai');
  if (qnLocation) {
    document.querySelectorAll('[data-address="quang-ngai"]').forEach(el => {
      el.textContent = qnLocation.addressShort;
    });
  }

  // Update all addresses in footer/contact sections
  document.querySelectorAll('[data-all-addresses]').forEach(el => {
    const addresses = contactData.locations.map(l => l.addressShort).join('<br/>');
    el.innerHTML = addresses;
  });
}

function updateSocialLinks() {
  // Update social link URLs
  const socialMap = {
    'facebook': contactData.social.facebook,
    'instagram': contactData.social.instagram,
    'zalo': contactData.social.zalo,
    'messenger': contactData.social.messenger,
    'tiktok': contactData.social.tiktok
  };

  Object.entries(socialMap).forEach(([platform, url]) => {
    document.querySelectorAll(`a[data-social="${platform}"]`).forEach(el => {
      if (url && url !== '#') el.href = url;
    });
  });
}

function updateJsonLdSchema() {
  // Update JSON-LD schema with current contact data
  const existingScript = document.querySelector('script[type="application/ld+json"]');
  if (existingScript) {
    try {
      const schema = JSON.parse(existingScript.textContent);
      
      // Update phone
      if (schema.telephone) schema.telephone = contactData.phone;
      if (schema.contactPoint?.telephone) schema.contactPoint.telephone = contactData.phone;
      
      // Update locations
      if (schema.hasLocation && Array.isArray(schema.hasLocation)) {
        schema.hasLocation.forEach((location, index) => {
          const data = contactData.locations[index];
          if (data) {
            location.address.streetAddress = data.address;
          }
        });
      }
      
      // Update social media
      if (schema.sameAs && Array.isArray(schema.sameAs)) {
        schema.sameAs = [
          contactData.social.facebook,
          contactData.social.instagram,
          contactData.social.zalo
        ].filter(url => url && url !== '#');
      }
      
      existingScript.textContent = JSON.stringify(schema, null, 2);
    } catch (error) {
      console.error('Error updating JSON-LD schema:', error);
    }
  }
}

// Initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContactInfo);
} else {
  loadContactInfo();
}

// Export for use in other scripts
window.contactData = contactData;
window.loadContactInfo = loadContactInfo;
