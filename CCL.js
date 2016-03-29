$JSKK.Class.create
(
	{
		$namespace:	'strappy',
		$name:		'CCL'
	}
)
(
	{
		version:			'1.1.0',
		Signal:
		{
			SWITCH:			'strappy.signal.ccl.switch',
			SPINNER_CHANGE:	'strappy.signal.ccl.spinner.change'
		},
		Type:
		{
			INSTRUCTION:	'strappy.type.ccl.instruction',
			CHANGE:			'strappy.type.ccl.change'
		}
	},
	{}
);