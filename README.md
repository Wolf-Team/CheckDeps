# CheckDeps

## Usage

Write in your launch-file
```js
IMPORT("CheckDeps");

new CheckDeps()
	//The entire API will be available under the API name
	.add("name_api") 
	// Add a dependency with a custom callback. The return value of the callback will be available under the API name
	.add("name_api_2", function (api) {
		return api.something;
	}) 
	//Launch mod with builded scope
	.launch(scope => Launch(scope));
```
