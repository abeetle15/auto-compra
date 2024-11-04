This is a project I made for my father's restaurant. He has a POS software that tracks the inventory of ingredients and he 
wanted to automate the process of planning the weekly grocery shopping. I created a simple html page where the restaurant
manager can upload a file that is provided by the POS software. This triggers a webhook in the automation platform n8n that
uses that data to compare it with a file where we establish the ideal stock the restaurant should have. This finally outputs
a file with the grocery list in a google drive folder for now
