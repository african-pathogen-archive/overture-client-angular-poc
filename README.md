
## To run the application
- Step1: ``yarn install``
- Step2: ``yarn start``
- Step3: run the following command to disable CORS in the browswer session [windows_key+r] to open the open command window
- Step4: copy & paste this command ``chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security "http://localhost:4200/"`` in the above opened window.

## To generate the typescript client  (optional only required if the api-endpoints changes)
- ``java -jar openapi-generator-cli-6.0.1.jar generate -i ./song-swagger.json -g typescript-angular -o "C:\src\personal\overtue-client\nswag\song" --skip-validate-spec``
- ``java -jar openapi-generator-cli-6.0.1.jar generate -i ./ego-swagger.json -g typescript-angular -o "C:\src\personal\overtue-client\nswag\ego" --skip-validate-spec``
- ``java -jar openapi-generator-cli-6.0.1.jar generate -i ./maestro-swagger.json -g typescript-angular -o "C:\src\personal\overtue-client\nswag\maestro" --skip-validate-spec``
