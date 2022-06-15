# CheckDeps

## Usage

Write in your launch-file
```js
IMPORT("CheckDeps");

new CheckDeps()
	//The entire API will be available under the API name.
	.add("name_api") 
	// Add a dependency with a custom callback. The return value of the callback will be available under the API name.
	.add("name_api_2", function (api) {
		return api.something;
	}) 
	// Add a dependency with options.
	.add("name_api_3", {
		/**
		 * Required dependency. If this API has not been loaded, the mod will not run.
		 * Optional parameter.
		 * Default: true
		 */
		required: false,
		/**
		 * Callback on successful loading of the API. The return value of the callback will be available under the API name.
		 * Optional parameter.
		 * Default: function (api) { return api }
		 */
		callback: function (api) {
			return api;
		},
		/**
		 * Callback if the API has not been loaded. The return value of the callback will be available under the API name.
		 * Optional parameter.
		 */
		fallback: function(){
			return {
				/* My scope */
				a:12
			}
		}
	})
	//Launch mod with builded scope
	.launch(function(scope){ Launch(scope); });
```
