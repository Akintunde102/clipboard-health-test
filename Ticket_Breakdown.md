# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
### Assumptions
- I am assuming that a feature exist for a facility to accept an agent and add their own metaData . In this case, the function/controller that powers that  feature will be called `AcceptAgent` which has at least some complusory arguments called `agentId` and `facilityId`
- I am assuming that a function exist for getting the agent metadata, I am assuming this function is called `agentDetails` which has at least an argument called `agentId`.
- I am assuming that the codebase follows camelCase naming convention for variables.

### Ticket 1
- #### Acceptance criteria
  - Table must be called AgentCustomIds
  - Table should be joinable or populate-able from the `Agents` table
  - Table must have three columns or fields: `facility_id`, `agent_id` and `agent_custom_id`
- #### Time estimates
  - An hour
- #### Implementation details. 
   - #### Create a new table with name (AgentCustomIds) with the following columns or fields:
        - facility_id : correlates with ids of documents in thr facilities table
        - agent_id: correlates with ids of documents in the agents table
        - agent_custom_id: this field will contain the custom ids assigned by facilities to agents working with them


### Ticket 2
- #### Acceptance criteria
   - When the `acceptAgent` function is called with the customid, the `AgentCustomIds` table should be updated with a new document containing the agentId, customId and facilityId provided,
  - When the `acceptAgent` function is not called with the customid, the `AgentCustomIds` table should be not be updated with a new document 
- #### Time estimates
   - 2 hours
- #### Implementation details. 
   - #### Update the `acceptAgent` function to accept a new optional argument called custom Id
   - #### Update the `acceptAgent` function to update the AgentCustomIds table with the assigned custom id when the customId argument is provided


### Ticket 3
- #### Acceptance criteria
  - The `agentDetails` function should return the `agentCustomId` if the facility has an customId assigned.
  - The `agentDetails` function should return the `agentCustomId` as falsy if the facility has not assigned a customId.
- #### Time/effort estimates
  - 3 hours
- #### Implementation details. 
   - #### Update the `agentDetails` function to get the `agentCustomId` by making a join or a population call to the `AgentCustomIds` table from the `Agents` table


 