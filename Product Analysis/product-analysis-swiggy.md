# Product Analysis — Swiggy

*(A visual version of this analysis is in `Product Analysis.excalidraw` in this same folder — open it in [excalidraw.com](https://excalidraw.com) or the VS Code Excalidraw extension.)*

## 1. What problem does this product solve?

Swiggy lets people order food from restaurants, groceries (via Instamart), and even send packages (via Genie) — all without planning ahead or leaving home. The core problem it solves is: *"I want something (food, groceries, a package delivered) right now, and I don't want to go get it myself."*

## 2. Top 10 features

1. Food delivery from restaurants
2. Instamart — grocery delivery in ~10 minutes
3. Genie — send a package via a rider
4. Dineout — book a restaurant table
5. Live order tracking on a map
6. Search & filters (cuisine, price, ratings, etc.)
7. Saved addresses & one-tap reorder
8. In-app payments (wallet, UPI, cards)
9. Coupons, offers & the Swiggy One subscription
10. Ratings & reviews

## 3. MVP — which 5 features in one week, and why

If I had to ship a first version in one week, I'd build only:

| # | Feature | Why it's first |
|---|---|---|
| 1 | Show restaurants and their menus | There's no app at all without something to order — every other feature depends on a restaurant list existing. Cheap to build with sample/seed data in week one. |
| 2 | Cart, checkout, and one payment method | Browsing without buying is just a catalog, not a shop. This proves the entire order flow works end to end, even with a single payment option — and it's the step where the business actually makes money. |
| 3 | Order status updates (placed → cooking → on the way → delivered) | People need to know their food is actually coming, even without a live map. This alone stops the most common complaint: "where is my order?" |
| 4 | Saving a delivery address | Without an address, there's no delivery — nothing else matters without this. One saved address per person is enough for week one; multiple addresses (home/work) can come later. |
| 5 | Assigning the order to a delivery rider | Someone has to physically carry the food. A simple "send to nearest free rider" rule is enough to start; smarter routing can be added once the basic loop works. |

**Deliberately left out of the MVP** (and why it's safe to wait): Instamart (needs its own warehouses — expensive infrastructure, unrelated to core food ordering), Genie (fewer people need it, reuses the same rider-assignment idea), Dineout (unrelated to delivery, feels like a second app), live map tracking (a nice-to-have on top of simple status updates), coupons/discounts (about retention, not the first order), ratings/reviews (need order history to exist first), group ordering (complex to build well, low initial demand), scheduled orders (most people want food *now*), and loyalty points (only useful once repeat customers exist).

## 4. Three improvements I'd make

1. **More accurate delivery time estimates.** A late delivery upsets people far less if they were told the truth about the wait upfront. People forgive a long wait they were warned about, not a surprise one — trust matters more for retention than any new feature would.
2. **Easier reordering of favorite meals.** Most people order the same few meals repeatedly, but a plain order-history list makes them search all over again each time. Making repeat orders faster is where a large share of revenue is made.
3. **Clearer pay breakdowns for delivery riders, and clearer fee breakdowns for restaurants.** Many rider complaints are about not understanding *how* their pay is calculated, not the amount itself — sudden changes with no explanation cause the most frustration. Similarly, restaurants often feel blindsided by how much of their earnings is taken; an itemized bill (commission, ads, discounts) builds trust and reduces partner churn. Both of these are within Swiggy's control to fix, without needing to out-compete anyone first.

These matter because they fix everyday annoyances for people who *already* use the app — and fixing those usually retains more users than shipping something new.
