# predictions.md 

Finding 1
Where: https://mgmt-problem-set-02.vercel.app/, Step 3 "HDB Resale Valuation Forecast", the green "Live data.gov.sg Integration Active" banner and "Live Estate Median" tile.
What I did, what I saw: I entered Blk 123 Ang Mo Kio Ave 3, 3-Room, Storey 10–12, +10y and pressed View Valuation. The screen said "Live API" and "Analyzed 1,000 transactions in ANG MO KIO". In the Network panel, /api/resale for that query returned latestMonth: "2018-11". Toa Payoh 4-Room returned latestMonth: "2021-05". Punggol Executive (322 records) returned "2026-09". So whenever a town and flat type has more than 1,000 sales, the route keeps the oldest 1,000 and the "live" median is years out of date.
Which heuristic: 1, Visibility of system status.
Screen or system: System. The route caps and orders the upstream query, and the screen has no way to know the records are old because it never shows latestMonth.
Severity, and why: 4. Impact drove it: the headline number is wrong for the most common towns and flat types, and the user cannot tell, because the screen says "Live".
The repair: The route fetches the most recent transactions (sort by month descending, or filter to the last N years), and the result screen shows the period the data covers, e.g. "Based on 1,000 sales, Jan 2024 – Sep 2026".

Finding 2
Where: Step 3, "Live Historical CAGR" tile vs. "Valuation Framework Factor Attribution → 1. Past Trends (CAGR)".
What I did, what I saw: Same Ang Mo Kio 3-Room run. The tile showed "+1.2% p.a." and the attribution below it said "CAGR calculated at 3.2% p.a." (the route returned historicalCAGR: 3.2). Punggol 5-Room showed the same split: 1.4% vs 3.2%.
Which heuristic: 4, Consistency and standards.
Screen or system: Screen. The route sends one CAGR. The screen displays a different figure next to it without saying which one the projection uses.
Severity, and why: 3. Impact: two growth rates on one screen make a user doubt the whole forecast, and it happens on every result.
The repair: One CAGR is used and shown everywhere. If the projection uses a dampened rate, the screen labels it as that (e.g. "3.2% historical, 1.2% applied after momentum adjustment").

Finding 3
Where: Step 3, "10-Year Valuation Trajectory (tap to inspect)" tiles and the projected value card above them.
What I did, what I saw: On a result for Ang Mo Kio 3-Room, Storey 25+, +10y, I tapped "+3y 2029". The card said "Projected value in 2029 (+3y) $355,000, Estimated Range: $357,000 – $415,000", so the value sat below its own range. The subtitle at the top still said "Forecasted property value for 2036 (+10 years)".
Which heuristic: 1, Visibility of system status.
Screen or system: Screen. It already has the median and rate it needs. The value and range are computed inconsistently, and the subtitle is not updated.
Severity, and why: 3. Impact: a visibly impossible number on the main output. Frequency: it shows up whenever a user taps a year.
The repair: The range always brackets the projected value, from the same rate. The subtitle and card both name the year the user tapped.


## My predictions
The three findings I expect my groupmates to raise, and the severity I expect them to give each:
Finding 3 (value outside its own range after tapping a year), severity 3. It's on the main output and needs only one tap to see.
Finding 2 (two different CAGRs on the result screen), severity 2. Both numbers sit on one screen, but some will read it as a labelling slip rather than a trust problem.
Finding 5 (fake address only rejected at Step 3), severity 2. "Submit something that does not exist" is an explicit step in the brief, so everyone will try it.
The heuristic I think my product breaks worst: 1, Visibility of system status. The screen says "Live" over data that can end in 2018, labels a modelled number as the "Live Estate Median", and shows a value that contradicts its own range and year. The user can't tell what the system is actually basing its answer on.
The finding that would show my own evaluation was wrong: A groupmate on a phone reports that the first valuation after a long gap, or on throttled 3G, hangs on "Loading live HDB resale transaction data…" for more than 10 seconds with no timeout, error or retry, and rates it 3 or higher. I didn't test a cold start after a long gap, a real phone or 3G throttling (my requests returned in about 30–300 ms on a warm function), so I may have missed it.

Finding 4
Where: Step 1 address field, as it shows up in the Step 3 result.
What I did, what I saw: "Blk 1 Ang Mo Kio Ave 1" and "Blk 999 Ang Mo Kio Ave 9" (which doesn't exist) gave identical forecasts. The request only sends town, flat_type and storey. Lease decay was −4.20% for every 3-Room and −1.26% for every 5-Room, whatever the block or its age.
Which heuristic: 2, Match between system and the real world.
Screen or system: System. The route never receives the block, so it can't use lease commencement year, even though its records include lease_commence_date.
Severity, and why: 3. Impact: the form asks for a block and the methodology promises "lease decay … age of the building", but a 1970s block and a 2015 block get the same answer.
The repair: The block and street are matched to a real block (or the user picks lease start year), and lease decay uses that block's actual age. Otherwise the form stops asking for a block and says it estimates at town level.

Finding 5
Where: Step 1 → Step 2 → Step 3, invalid address.
What I did, what I saw: I typed "Blk 99999 Atlantis Street" and pressed Proceed. Step 1 accepted it and Step 2 showed my address above the full methodology. Only after "View Valuation" did Step 3 say "does not match any recognized Singapore HDB town". "Enter Valid Singapore HDB Address" took me back to Step 1 with the bad address still there and no highlight on the field.
Which heuristic: 5, Error prevention.
Screen or system: Screen. The town-matching message appears on the client, so Step 1 could run the same check before letting the user proceed.
Severity, and why: 2. Frequency is low (most users type a real address), but the user reads a whole step before being told.
The repair: Step 1 checks the town when the user presses Proceed (or offers a town dropdown/autocomplete). On return from the error, the address field is focused and marked.
