# Improvement Report

## Summary
The user requested to send the booking information from the `bggiadinh.html` page to Zalo or Messenger. I have implemented a solution that captures the user's customized package details, passes them to the final booking page, and includes them in the message sent to the studio.

## Changes Made
1.  **`bggiadinh.html`**:
    *   Updated the "Tư Vấn & Đặt Lịch" button's `href` to `booking.html?package=family`. This leverages the existing logic on the booking page to pre-select the "Gia Đình" (Family) package.

2.  **`assets/js/bggiadinh.js`**:
    *   Added an event listener to the "Tư Vấn & Đặt Lịch" button.
    *   When the button is clicked, a `bookingDetails` object containing the number of members, makeup selections, chosen upgrades, and the final calculated price is created.
    *   This object is then stored in the browser's `localStorage` as a JSON string.

3.  **`assets/js/booking.js`**:
    *   Modified the `generateMessage` function to check for the `bookingDetails` item in `localStorage`.
    *   If the item exists, it's parsed, and a detailed summary of the custom package is created.
    *   This detailed summary is prepended to the standard booking information (name, phone, date, etc.).
    *   The `localStorage` item is removed after the message is generated and the Zalo/Messenger link is opened, ensuring that the data is used only once and doesn't persist for future bookings.

## Result
When a user now navigates from the family package calculator to the booking page and clicks to send a message via Zalo or Messenger, the message will contain all the specific details of the package they configured. This provides the studio with complete information, fulfilling the user's request.