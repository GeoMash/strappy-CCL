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
			layout:			'auto',
			layoutConfig:	null//,
			// relativeWrapper:false
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