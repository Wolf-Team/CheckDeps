# CheckDeps

[en](README.md) | **ru**

## !!!WARNING!!!
**Вы не должны использовать "ConfigureMultiplayer", потому что CheckDeps использует его самостоятельно.**
  

## Usage

Напишите в вашем launch-файле
```js
IMPORT("CheckDeps");

new CheckDeps({
	name: "MyMode",
	version: "1.0.0",
	isClientOnly: false
})
	//Весь API будет доступен под именем API.
	.add("name_api") 
	// Добавить зависимость с настраиваемым обратным вызовом. Возвращаемое значение обратного вызова будет доступно под именем API.
	.add("name_api_2", function (api) {
		return api.something;
	}) 
	// Добавить зависимость с параметрами.
	.add("name_api_3", {
		/**
		 * Требуемая зависимость. Если этот API не загружен, мод не запустится.
		 * Опциональный параметр.
		 * По умолчанию: true
		 */
		required: false,
		/**
		 * Обратный вызов при успешной загрузке API. Возвращаемое значение обратного вызова будет доступно под именем API.
		 * Опциональный параметр.
		 * По умолчанию: function (api) { return api }
		 */
		callback: function (api) {
			return api;
		},
		/**
		 * Обратный вызов, если API не был загружен. Возвращаемое значение обратного вызова будет доступно под именем API.
		 * Опциональный параметр.
		 */
		fallback: function(){
			return {
				/* My scope */
				a:12
			}
		}
	})
	// Запустить мод с подготовленным пространством имён
	.launch(function(scope){
		Launch(scope);
	});
```
