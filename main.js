requirejs.config
(
	{
		// paths
		// {
		// 	'strappy.ccl':	
		// }
	}
);
define
(
	'strappy/ccl',
	[
		'./CCL',
		'./trait/Containable',
		'./trait/Animatable',
		'./trait/Pluploadable',
		'./component/application/Controller',
		'./controller/Router',
		'./component/container/Container',
		'./component/container/controller/Main',
		'./component/container/controller/AutoLayout',
		'./component/container/controller/CardLayout',
		'./component/container/controller/HTMLLayout',
		'./component/container/view/Main',
		'./component/uploader/Uploader',
		'./component/uploader/controller/Main',
		'./component/uploader/view/Main'
	]
);