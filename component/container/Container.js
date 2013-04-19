$JSKK.Class.create
(
	{
		$namespace:	'strappy.ccl.component.container',
		$name:		'Container',
		$extends:	'strappy.Component'
	}
)
(
	{},
	{
		events:
		{
			onChildReady:	true
		},
		state:
		{
			'private':
			{
				attachTo:		null,
				ref:			null,
				cmp:			null,
				signalKey:		null,
				cls:			null,
				style:			null,
				autoShow:		true,
				scrollable:		true,
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
				activeCard:		null
			}
		},
		components:
		{
			
		},
		stores:
		[
			
		],
		views:
		[
			'Main'
		],
		controllers:
		[
			'Main',
			'AutoLayout',
			'CardLayout',
			'HTMLLayout'
		]
	}
);