$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl',
		$name:		'Container',
		$extends:	strappy.Component
	}
)
(
	{},
	{
		events:
		{
			onChildReady:	true
		},
		config:
		{
			attachTo:		null,
			ref:			null,
			cmp:			null,
			signalKey:		null,
			cls:			null,
			style:			null,
			autoShow:		true,
			children:		null,
			/**
			 * The type of layout for the container.
			 * 
			 * Supported layout types:
			 * 
			 * * Auto
			 * * Card
			 * * HTML
			 * 
			 * @cfg layout {String}
			 */
			layout:			'auto'
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Default'
		],
		controllers:
		[
			'AutoLayout',
			'CardLayout',
			'HTMLLayout'
		]
	}
);