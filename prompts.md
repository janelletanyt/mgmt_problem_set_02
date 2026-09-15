# PROMPTS.md - [GEEK AI]
- **Student:** [Janelle Tan] **Course:** MGMT 6110 **Problem Set 1**
- **User sentence** An enterprise seller or buyer opens this screen to list his agentic AI solution, and knows it worked when the AI concierge leads him to the marketplace. 
- **Live link** mgmt-problem-set-01.vercel.app

--

## Prompt 1 - The master prompt
```
ROLE: You are a senior front-end developer building a React web app.

GOAL: Build the front end of [GEEK AI] on the phone, an online marketplace for potential businesses who wants to use agentic AI in their workflow. They can use the marketplace as either an enterprise seller who wants to sell their agentic AI solutions, or - a customer who wants to adopt the seller’s agent. 

 1) [SCREEN 1]: Opens up to a chatbot to guide whether the user is either an enterprise seller or buyer who wants to adopt agentic AI. 
The chatbot should ask what AI software the business wants to sell, buy or explore. 
It should leave open ended questions on the purposes of the user exploring the marketplace and what role, industry or sector they are interested in. 
It should allow input for what problems the business currently faces and how they would like to solve it. 

 2) [SCREEN 2]: Opens up to a marketplace which reflects the following: 
What AI software or hardware the business is selling
how many years it has been functioning for and where is it based
it should also display recent clients or highlight well-known clients
Display any certification it has obtained
Pricing model (subscription / one-time fee)
Call to action for chat now / contact us / request a demo / watch a demo

 3) [SCREEN 3]: Opens up to a section that allows exploration by different business industries who are not sure what they require but wants to look at possible solutions. 
Customers will be able to filter by keyword search
Sort by industry or category
Sort by role of user 

*Make sure that each screen can be moved without needing to reload the page. That it can be interacted with and filter, sort, open tabs, with a form that updates what is shown and a toggle that is remembered.

OUTPUT: A running app. Keep every invented value in ONE data file of its own, with
 at least [10] rows, so the screen looks real. One component per screen or section.
 Move between screens without reloading the page. Readable on a phone at arm's
 length. When you are done, list the files you created and what each one holds.

GUARDRAILS: Screens and invented data only. Do NOT call the Gemini API or any
 other model. Do NOT call any outside service or fetch from any URL. No database,
 no login, no user accounts, no analytics. No features I did not list. No real
 company's name, logo, or trademark. Invented names and numbers only, nothing
 confidential.

CONTEXT: Individual Problem Set 1 for MGMT 6110 Human-AI Collaboration at SMU.
 Built in Google AI Studio, shared as a link, and opened on a phone by classmates
 in Week 3. I am not a programmer: when you make a choice I did not specify, say
 so in one line rather than burying it.
```

**What came back:** A running app, 8 files, preview loaded. 
It also added an annual -15% discount in the marketplace which I never asked for

## Prompt 2 - removing items I did not ask for
```
Some information that I did not ask for: 
In screen 1. Chatbot Guide
- Remove desktop toggle. The app is only meant for phone view 
- Remove Step 1 of 3. Intent & Needs profiling

In screen 2. Marketplace
- Remove monthly/annual toggle. I only want 1 fixed fee. 
- Remove detailed/compact toggle. I only want the detailed mode

In screen 3. Explore
- Make the dropdown menu swipeable. If the user does not intend to use it, they should be able to swipe away the dropdown menu so that it does not block the entire page view.
```

**What came back** Edited files removed the annual discount that I did not asked for.

# PROBLEM SET 2 - Put a real back end behind it

## What problem set 1 product could not do
```
Creating a marketplace required active user input and verification of private businesses. There is currently no available data which verifies private companies' certifications
```
***It was necessary to create a new product in order to make use of publicly available APIs***

## Prompt 1 - Creating the interface
```
Role: you are a senior front-end developer building a react web app.
Goal: build the front end of [ResaleForecast] on the phone, an app for Singaporean HDB resale flat home owners to find out the valuation of their HDB resale flat in the next 1-10 years.
[Screen 1]: Opens up to a fill-in form that a home owner can fill it which requests for the address of their HDB resale flat along with their unit number.
The form should also request which future year the home owner is interested in finding out, from 1-10 years.
[Screen 2]: shows the user what frameworks were being used to consider the valuation of their resale hdb flat in a concise manner.
Analyze Past Trends
Calculate growth rate: Find the Compound Annual Growth Rate (CAGR) from your 10-year data to see the average yearly percentage change.
Identify cycles: Look for past market booms or flat periods to understand how the flat reacted to broader economic changes. [1]
Apply Forecasting Models
Linear regression: Draw a baseline trend line using past prices to project a steady upward or downward path.
Time-series analysis: Use statistical tools like ARIMA (Autoregressive Integrated Moving Average) to capture seasonal patterns and momentum from the historical data.
Adjust for Property Specifics
Lease decay: Factor in the age of the building. HDB flats lose value as their 99-year lease shortens, especially past the 30-year mark.
Location and attributes: Weigh mature versus non-mature estates, proximity to MRT stations, and floor level, as these change the actual price growth compared to the general average. [1, 2]
Incorporate Macro Factors
Supply pressure: Factor in upcoming Build-To-Order (BTO) launches and flats reaching their Minimum Occupation Period (MOP), which can slow price growth.
Government policies: Account for cooling measures, interest rate shifts, and housing grant changes that cap or boost buyer demand.
[Screen 3]: Churns out the value of the home owner’s future property value based on an API that I will call in the next prompt after the interface is done.
GGUARDRAILS: do not fetch any details that I did not ask for in this prompt. No log in or user accounts required. No real company name, logo, or trademark. Nothing confidential.
CONTEXT: Individual Problem Set for MGMT 6110 Human-AI Collaboration at SMU.
Built in Google AI Studio, shared as a link, and opened on a phone by classmates
in Week 3. I am not a programmer: when you make a choice I did not specify, say
so in one line rather than burying it.
```

***What came back: 7 working files, with request for API*** 

## Prompt 2 - Including the backend API 
```
ROLE: You are a senior full-stack developer working in my existing project. Do not
rewrite what is already there; add to it.
GOAL: Perform valuation model with precision with
real data from [data.gov.sg], fetched through a serverless function of my own.
api/[resale].js—calls [https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=5
filtered on a named field, and with a sensible page size.
The braces need URL-encoding once this goes into code rather than a browser bar:
https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&filters={"town":"TAMPINES"}&limit=10000
], returns only the fields my screen
needs, and nothing else.
2) api/health.js—reports whether the credential is configured (keyConfigured) and
whether the upstream answered, including the HTTP status it returned. It must
never print the credential or any part of it.
3) On the screen, replace the hard-coded value with the live one, and decide what
the user sees in each of these four cases: the data is loading, the data is
empty, the upstream refused, and the upstream is unreachable. I want four
different sentences, not one spinner.
OUTPUT: Both functions at api/ in the PROJECT ROOT, siblings of package.json, never
inside src/. If this project has a server entry file, register the same two routes there too,
because that is the shape the preview can answer. If it has no server file, skip
that and tell me so rather than inventing one.
Make sure package.json contains "type": "module".
BEFORE the fetch, if the credential is missing or empty, return 503 with a message
naming the variable, and do not call the upstream at all. A missing variable is sent
as the word "undefined" and looks exactly like a wrong credential, so stop it early.
AFTER the fetch, check response.ok before reading the body. A refusal often has an
empty body, so calling .json() on it throws and my function dies with a 500 instead
of telling me what happened. On a non-2xx reply, return the upstream status and a
one-line reason in your own JSON.
Cache the response for [HOW LONG] with Cache-Control: s-maxage=[N],
stale-while-revalidate=[2N], matching how often the source actually changes.
In the footer, credit the source in the exact form the provider's licence asks for.
GUARDRAILS: Never write the credential into any file, comment or README. Never create
a variable whose name starts with VITE_. Never call the upstream from browser code;
every call happens inside api/. Never print the credential, or any part of it, in a
response or a log. No new npm packages. No database, no login. Leave every screen I
already have working exactly as it is.
CONTEXT: Deployed on Vercel from GitHub. The credential lives only in a Vercel
environment variable named [VARIABLE_NAME]. A real response from the endpoint
```

## What Came Back 
```
Things added that were not explicitly in your original prompt
Per your instruction ("when you make a choice I did not specify, say so in one line rather than burying it"), here is the honest list of extra design and convenience choices added:
API Health Diagnostic popup in the header: Added an "API Health" button at the top to let you inspect whether the upstream connection and API key are responding.
Quick sample buttons on Screen 1: Added 3 tap-to-autofill sample buttons (Toa Payoh, Bishan, Tampines) so classmates on mobile phones do not have to type full addresses.
10-Year trajectory buttons on Screen 3: Added clickable buttons (+1y through +10y) allowing users to preview future year estimates without re-submitting the form.
Expandable "Recent Transactions" table on Screen 3: Added an optional drawer at the bottom showing 5 sample transactions from data.gov.sg (month, flat type, storey, price).
Automatic town detector: Added logic to read the estate name from your free-text address so the data.gov.sg API knows which town to filter.
```

