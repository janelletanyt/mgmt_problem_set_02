# assessment.md
**Student**: Janelle Tan

## Q1: Where did the agent make you faster, and by how much?
The agent could compile all my requested frameworks and come up with a calculation to forecast the pricing of HDB resale flats.
Coming up with a calculation model would take significant expertise. 
However it is worthy to note that how the calculation was done was not specified - and therefore requires human verificaation.

## Q2: Where did it cost you time, and whose fault was that? 
I had to replace 'unit number' on the initial form with 'which floor' and 'number of bedrooms' 
While the unit number requirement was not something I asked for, it was also something that I did not specify to exclude in the guardrail. 
Unit number was not an input that was necessary since the data provided by the API does not consist of HDB's unit number
Instead, it was more relevant to include 'which floor' and 'number of bedrooms'

## Q3: Did it ever hand you something that looked right and was not?
Attempted to verify the results by keying in bogus HDB address, and final result still came up with a forecast value even though the address did not exist. 
Changed the prompt to only include real results based on the API and include a message when no result could be found. 

## Q4: What did you have to know in order to supervise it?
Some background knowledge of residential units is required to understand why the results came back simulated, and understanding that AI can sometimes produce simulated results. 
Hence, guardrails are required to eliminate such activities from happening.

## Q5: Which decisions did you keep, and should you have kept more or fewer?
I kept the amount of frameworks that were used to calculate the forecast value of the HDB in the next 1-10 years. 
However, domain expertise will inform me whether or not I should be keeping all the frameworks and that possibly having less frameworks will result in more accurate forecasting results. 

## Q6: Now scale it up: what does this mean for a team of thirty?
Having a team will help provide insights on whether or not this forecasting model would work and whether such risks should be undertaken to forecast the value of a HDB flat. 
