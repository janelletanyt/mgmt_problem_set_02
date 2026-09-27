Heuristic evaluation by JANELLE TAN, Group 8
Tested on mobile and desktop, 28/09/2026, 11pm

WANG BEICHAO https://mma-deal-hub-w5.vercel.app/
Finding 1: Phone field accepts letters
Where: After clicking 'Select Contract" at the Test Phone Number field.
What I did, what I saw: I typed "Test User" as the name and "abcxyz" as the phone number. The field accepted the letters without any warning. I only found out it was wrong after clicking "Preview Demo Result".
Which heuristic: 5: Error Prevention.
Screen or system: Screen. The field knows it's meant for a phone number, so it can block anything that isn't one.
Severity, and why: 2, driven by how often it happens. Anyone who mistypes gets stopped, but only after they've finished the form.
The repair: The phone field only lets in digits, spaces and "+", and a phone opens a number keypad for it.
Finding 2: No way to review or undo a reservation
Where: The Demo Reservation form, then the "Demo Reservation Created" screen that follows.
What I did, what I saw: I filled in a valid name and number and clicked "Preview Demo Result". The reservation was created straight away, with no review step.
Which heuristic: 3: User Control and Freedom.
Screen or system: Screen. The entered details are already on the confirmation screen, so they can be shown for review first and passed back for editing.
Severity, and why: 3, driven by impact. In a real version, a wrong number or wrong contract would be locked in with no way back.
The repair: Visitors see a summary to confirm before the reservation is made, and they can edit or cancel it from the confirmation screen.
Finding 3: Labels that don't say what they mean
Where: The "Demo Reservation Created" screen, at the Demo Status box. Also the Sort dropdown on the listings page.
What I did, what I saw: After submitting, the status box said "Illustrative position: #3" with no explanation of what the position refers to.
Which heuristic: 2, Match Between the System and the Real World.
Screen or system: Screen. This is only a change of wording.
Severity, and why: 2, driven by impact. A visitor can't tell whether #3 is good news or what to expect next.
The repair: The status says in plain words what the number means and what happens next. The default sort's name tells visitors how the list is ordered.
Finding 4: No explanation of how a transfer works, and nothing to help compare deals
Where: The listings page, anywhere from the top banner to the cards.
What I did, what I saw: I looked for anything explaining what taking over a second-hand contract involves, such as who pays the gym, whether there's a transfer fee, and what happens when it ends, and found nothing.
Which heuristic: 10, Help and Documentation (also 7, Flexibility and Efficiency of Use).
Screen or system: Screen. The site already has each contract's monthly fee, usual fee, months left, disciplines and MRT station.
Severity, and why: 3, driven by impact. A first-time visitor can't judge whether a deal is safe or worth it, which is the decision the site is built for.
The repair: A short "How it works" section answers the main questions about transfers.


MOHAMMED RIZWAN KHAN https://evstations.vercel.app/ 
Finding 1: Battery level
1 · Where: at the battery − / + control in the header
2 · What I did, what I saw I raised the battery to 25% and reloaded. It went back to 20%. The control moves only in 5% steps and you can't type a number, so going from 20% to 80% takes 12 presses.
3 · Which heuristic 7, Flexibility and Efficiency of Use.
4 · Screen or system Screen. The browser can remember these settings, and the control can accept a typed value.
5 · Severity, and why 2, driven by the fact that it requires many clicks
6 · The repair A returning visitor finds their last battery level and can get to any battery level in one step.
Finding 2: The postal code box accepts letters
1 · Where: Screen 2, in the postal code search box next to
2 · What I did, what I saw: I cleared the box and it accepted the letters. When I pressed Check Availability, the only feedback was the browser pop-up "Please match the format requested.", which doesn't say what the format is.
3 · Which heuristic 5, Error Prevention.
4 · Screen or system Screen. The box already knows it wants exactly six digits.
5 · Severity, and why 2, driven by what it costs. It's easy to recover from, but anyone who mistypes gets a message that doesn't explain the fix.
6 · The repair The box accepts only digits, brings up a number keypad on phones, and if the entry is incomplete it says in plain words that a 6-digit Singapore postal code is needed.
Finding 3: The "nearest" list leaves out stations the site knows about
1 · Where: Screen 1, in the station list
2 · What I did, what I saw:With GPS active near Bedok, the site widened its search to 20 km and found only three stations. Nothing explains what "confirmed" means or why other stations are left out.
3 · Which heuristic 1, Visibility of System Status.
4 · Screen or system System. The filter that decides which stations count as "confirmed" is dropping ones that Screen 2 can see.
5 · Severity, and why 3, driven by the damage to standing. The "Closest to You" badge says this is the full picture, but the site's own live data shows a large station just as close that's missing from the list.
6 · The repair Every station within the searched radius that has live data appears on Screen 1. If any are left out, the screen says how many and why.


SHRIVIDHYA SRINIVASAN  https://parksg-seven.vercel.app 
Finding 1: Route gives no response Where: Orchard zone, Ngee Ann City card, the Route button What I did, what I saw: I pressed Route, nothing changed on the page. Which heuristic: 1, Visibility of System Status. Screen or system: Screen. The page knows the button was pressed. Severity, and why: 3, driven by how often it happens. Every card has a Route button. The repair: From the moment Route is pressed, the card shows that a route is being calculated. 
Finding 2: Carparks are listed by lot count, so the nearest ones are buried Where: Zone results list What I did, what I saw: There is no way to sort by distance. Which heuristic: 8, Aesthetic and Minimalist Design. Screen or system: Screen. The page already has the distance and lot count for every card. Severity, and why: 2, driven by how often it happens. Every visitor meets this list, but they can work around it by scrolling or searching. The repair: The first few cards are the closest carparks with space. Carparks far outside the zone are left out or clearly separated, and visitors can switch between nearest and most lots.  
Finding 3: Nothing explains the numbers, distances or badges Where: https://parksg-seven.vercel.app/, any zone, on the cards. What I did, what I saw: LTA / HDB / URA badges and the "Almost full" threshold are not explained, and there is no help or info link anywhere on the page. Which heuristic: 10, Help and Documentation. Screen or system: Screen. Severity, and why: 2, driven by whether people can learn around it. Most people will guess the number means free lots. The repair: Visitors can see, next to the cards, what the number counts, where distances are measured from, and what "Almost full" means.
